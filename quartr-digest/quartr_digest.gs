/**
 * Quartr -> Email digest (the "watchman")
 *
 * Reads your subscribed "Quartr - Followed companies" calendar each morning
 * and saves a DRAFT digest of events landing in the look-ahead window, each
 * with a deep-link to pull the full report / audio / transcript in Quartr.
 * The draft lands in your Drafts folder addressed to you — review, edit, send
 * or bin it. Nothing is sent automatically.
 *
 * Design: detection only, deliberately dumb and deterministic. No LLM in this
 * loop. Enrichment ("pull the string") happens on demand via the Quartr link
 * in each row, or by handing the ticker to your Claude Code / SKILL.md routine.
 *
 * Setup:
 *   1. script.google.com -> New project -> paste this file.
 *   2. Run setupTrigger() once (authorise when prompted). That schedules the
 *      daily run and is the only thing you need to click.
 *   3. (Optional) Run dailyQuartrDigest() manually once to test.
 */

const CONFIG = {
  // The subscribed Quartr feed (read-only). This is your actual calendar ID.
  CALENDAR_ID: 'ut52ndidrlk6po044ojegrmcmh222dn4@import.calendar.google.com',

  // Where the digest goes.
  RECIPIENT: 'laurentbello@gmail.com',

  // How far ahead each run looks.
  LOOKAHEAD_HOURS: 36,

  // Draft even when nothing is scheduled? false = stay silent on quiet days.
  SEND_WHEN_EMPTY: false,

  // Timezone for grouping / display.
  TZ: 'Indian/Mauritius',

  // Remember already-sent events this many days before pruning state.
  STATE_RETENTION_DAYS: 30,
};

function dailyQuartrDigest() {
  const cal = CalendarApp.getCalendarById(CONFIG.CALENDAR_ID);
  if (!cal) {
    Logger.log('Calendar not found. Check CALENDAR_ID and that the feed is still subscribed.');
    return;
  }

  const now = new Date();
  const end = new Date(now.getTime() + CONFIG.LOOKAHEAD_HOURS * 3600 * 1000);
  // Small look-back so early-morning all-day events for "today" are still caught.
  const start = new Date(now.getTime() - 12 * 3600 * 1000);

  const events = cal.getEvents(start, end);
  const sent = loadSentState_();

  // Only events we haven't already emailed. This is the dedupe that lets the
  // job run daily (and re-run) without ever double-sending the same event.
  const fresh = events.filter(function (e) { return !sent[eventKey_(e)]; });

  if (fresh.length === 0) {
    if (CONFIG.SEND_WHEN_EMPTY) {
      GmailApp.createDraft(
        CONFIG.RECIPIENT,
        'Quartr digest - nothing scheduled',
        'No followed-company events in the next ' + CONFIG.LOOKAHEAD_HOURS + 'h.'
      );
    }
    return;
  }

  fresh.sort(function (a, b) { return a.getStartTime() - b.getStartTime(); });

  const html = buildHtml_(fresh);
  const subject = 'Quartr - ' + fresh.length + ' event' + (fresh.length > 1 ? 's' : '') +
    ' ahead (from ' + Utilities.formatDate(fresh[0].getStartTime(), CONFIG.TZ, 'd MMM') + ')';

  GmailApp.createDraft(CONFIG.RECIPIENT, subject, htmlToPlain_(html), { htmlBody: html });

  fresh.forEach(function (e) { sent[eventKey_(e)] = Date.now(); });
  saveSentState_(pruneState_(sent));
}

function buildHtml_(events) {
  const rows = events.map(function (e) {
    const when = e.isAllDayEvent()
      ? Utilities.formatDate(e.getStartTime(), CONFIG.TZ, 'EEE d MMM') + ' (time TBC)'
      : Utilities.formatDate(e.getStartTime(), CONFIG.TZ, 'EEE d MMM, HH:mm');
    const link = extractQuartrLink_(e.getDescription());
    const title = escapeHtml_(e.getTitle());
    const linkHtml = link
      ? ' &nbsp;&middot;&nbsp; <a href="' + link + '" style="color:#2563eb;text-decoration:none;">open in Quartr &#8599;</a>'
      : '';
    return '<tr>' +
      '<td style="padding:7px 14px 7px 0;white-space:nowrap;color:#666;font-size:13px;vertical-align:top;">' + when + '</td>' +
      '<td style="padding:7px 0;font-size:14px;color:#111;"><strong>' + title + '</strong>' + linkHtml + '</td>' +
      '</tr>';
  }).join('');

  return '' +
    '<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,sans-serif;max-width:640px;">' +
    '<p style="font-size:14px;color:#222;margin:0 0 12px;">Followed-company events landing in the next ' +
    CONFIG.LOOKAHEAD_HOURS + ' hours:</p>' +
    '<table style="border-collapse:collapse;width:100%;">' + rows + '</table>' +
    '<p style="font-size:12px;color:#999;margin-top:20px;line-height:1.5;">' +
    'Pull the string &rarr; open the Quartr link for report, audio and transcript. ' +
    'Dates are Quartr estimates and can shift. ' +
    'Source: your &ldquo;Quartr &ndash; Followed companies&rdquo; feed.</p>' +
    '</div>';
}

/** Pulls the first Quartr deep-link out of the event description HTML. */
function extractQuartrLink_(desc) {
  if (!desc) return '';
  const m = desc.match(/https:\/\/web\.quartr\.com\/link\/[^\s"'<>]+/);
  return m ? m[0] : '';
}

/** Stable per-occurrence key so recurring/updated events dedupe correctly. */
function eventKey_(e) {
  return e.getId() + '|' + e.getStartTime().toISOString();
}

function loadSentState_() {
  const raw = PropertiesService.getScriptProperties().getProperty('QUARTR_SENT');
  return raw ? JSON.parse(raw) : {};
}

function saveSentState_(obj) {
  PropertiesService.getScriptProperties().setProperty('QUARTR_SENT', JSON.stringify(obj));
}

function pruneState_(obj) {
  const cutoff = Date.now() - CONFIG.STATE_RETENTION_DAYS * 86400 * 1000;
  Object.keys(obj).forEach(function (k) { if (obj[k] < cutoff) delete obj[k]; });
  return obj;
}

function htmlToPlain_(html) {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function escapeHtml_(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** Run once to create the daily trigger (~06:30 Mauritius time). */
function setupTrigger() {
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === 'dailyQuartrDigest') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('dailyQuartrDigest')
    .timeBased()
    .everyDays(1)
    .atHour(6)
    .nearMinute(30)
    .inTimezone(CONFIG.TZ)
    .create();
  Logger.log('Trigger created: dailyQuartrDigest runs daily ~06:30 ' + CONFIG.TZ);
}
