export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface/40">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <p className="font-display font-semibold text-fg">Dataroma Global</p>
        <p className="mt-4 text-xs leading-relaxed text-fg-faint">
          © {new Date().getFullYear()} Dataroma Global. Data is derived from
          public 13F and fund filings and is provided for research purposes
          only. It may contain errors or be out of date. Nothing on this site
          constitutes investment advice.
        </p>
      </div>
    </footer>
  );
}
