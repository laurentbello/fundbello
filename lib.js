const fs = require('fs');
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        AlignmentType, LevelFormat, HeadingLevel, BorderStyle, WidthType,
        ShadingType, PageNumber, Header, Footer, PageBreak } = require('docx');

const NAVY = "1F3864", BLUE = "2E75B6", LIGHT = "D9E2F3", GREY = "595959", GREEN = "2E7D32", RED = "B00020";
const border = { style: BorderStyle.SINGLE, size: 1, color: "BFBFBF" };
const borders = { top: border, bottom: border, left: border, right: border };

const H1 = t => new Paragraph({ heading: HeadingLevel.HEADING_1, children:[new TextRun(t)] });
const H2 = t => new Paragraph({ heading: HeadingLevel.HEADING_2, children:[new TextRun(t)] });
const P  = (t, o={}) => new Paragraph({ spacing:{after:120, line:276}, children:[new TextRun({text:t, ...o})] });
const bullet = t => new Paragraph({ numbering:{reference:"bullets", level:0}, spacing:{after:60, line:276}, children:[new TextRun(t)] });
const leadBullet = (lead, rest) => new Paragraph({ numbering:{reference:"bullets", level:0}, spacing:{after:60, line:276},
  children:[ new TextRun({text:lead+": ", bold:true}), new TextRun(rest) ] });
const hr = () => new Paragraph({ spacing:{after:120}, border:{ bottom:{ style:BorderStyle.SINGLE, size:6, color:BLUE, space:1 } }, children:[new TextRun("")] });
const moatBox = (rating, tail) => new Paragraph({ spacing:{before:120, after:120}, shading:{fill:LIGHT, type:ShadingType.CLEAR},
  children:[ new TextRun({text:`Moat rating: ${rating} / 10`, bold:true, size:28, color:NAVY}), new TextRun({text:"  — "+tail, size:22}) ] });

function cell(text, {w, head=false, fill, bold=false, align=AlignmentType.LEFT, color}={}){
  return new TableCell({ borders, width:{size:w, type:WidthType.DXA},
    shading:{ fill: fill || (head?NAVY:"FFFFFF"), type:ShadingType.CLEAR },
    margins:{top:80,bottom:80,left:120,right:120},
    children:[ new Paragraph({ alignment:align, children:[ new TextRun({ text, bold: head||bold, color: head?"FFFFFF":(color||"000000"), size:20 }) ] }) ] });
}
function table(rows, colWidths){
  const total = colWidths.reduce((a,b)=>a+b,0);
  return new Table({ width:{size:total, type:WidthType.DXA}, columnWidths:colWidths,
    rows: rows.map((r,ri)=> new TableRow({ children: r.map(c=> cell(c.t, {w:c.w, head: ri===0, fill:c.fill, bold:c.bold, align:c.align, color:c.color}) ) })) });
}
function coverTable(rows){ return table(rows.map(r=>r.map(c=>({t:c, w:3120}))), [3120,3120,3120]); }

function makeDoc(headerTitle, children){
  return new Document({
    styles: {
      default: { document: { run: { font: "Arial", size: 22 } } },
      paragraphStyles: [
        { id:"Heading1", name:"Heading 1", basedOn:"Normal", next:"Normal", quickFormat:true,
          run:{ size:30, bold:true, font:"Arial", color:NAVY }, paragraph:{ spacing:{before:260, after:140}, outlineLevel:0 } },
        { id:"Heading2", name:"Heading 2", basedOn:"Normal", next:"Normal", quickFormat:true,
          run:{ size:24, bold:true, font:"Arial", color:BLUE }, paragraph:{ spacing:{before:160, after:80}, outlineLevel:1 } },
      ]
    },
    numbering: { config: [ { reference:"bullets", levels:[{ level:0, format:LevelFormat.BULLET, text:"\u2022", alignment:AlignmentType.LEFT, style:{ paragraph:{ indent:{ left:540, hanging:280 } } } }] } ] },
    sections: [{
      properties: { page: { size:{ width:12240, height:15840 }, margin:{ top:1440, right:1440, bottom:1440, left:1440 } } },
      headers: { default: new Header({ children:[ new Paragraph({ alignment:AlignmentType.RIGHT,
        children:[ new TextRun({text:headerTitle, size:16, color:GREY}) ],
        border:{ bottom:{ style:BorderStyle.SINGLE, size:4, color:"BFBFBF", space:1 } } }) ] }) },
      footers: { default: new Footer({ children:[ new Paragraph({ alignment:AlignmentType.CENTER,
        children:[ new TextRun({text:"IWP Portfolio Research  |  Page ", size:16, color:GREY}), new TextRun({ children:[PageNumber.CURRENT], size:16, color:GREY }) ] }) ] }) },
      children
    }]
  });
}

function cover(children, {tag, name, sub, snapshotRows, preparedFor}){
  children.push(new Paragraph({ spacing:{before:1000, after:0}, children:[ new TextRun({text:"EQUITY RESEARCH REPORT", bold:true, size:28, color:BLUE}) ] }));
  children.push(new Paragraph({ spacing:{before:200, after:0}, children:[ new TextRun({text:name, bold:true, size:52, color:NAVY}) ] }));
  children.push(new Paragraph({ spacing:{before:60, after:300}, children:[ new TextRun({text:sub, size:22, color:GREY}) ] }));
  children.push(coverTable(snapshotRows));
  children.push(new Paragraph({ spacing:{before:300}, children:[ new TextRun({text:preparedFor, italics:true, size:20, color:GREY}) ] }));
  children.push(new Paragraph({ children:[ new TextRun({text:"Data as of late May 2026. Informational research only — not investment advice. Verify figures before acting.", italics:true, size:18, color:GREY}) ] }));
  children.push(new Paragraph({ children:[ new PageBreak() ] }));
}

function disclaimer(children){
  children.push(new Paragraph({ spacing:{before:200}, children:[ new TextRun({text:"Disclaimer", bold:true, size:20, color:GREY}) ]}));
  children.push(new Paragraph({ children:[ new TextRun({text:"This report is for informational and educational purposes only and does not constitute investment advice, a recommendation, or an offer to buy or sell any security. Figures are drawn from public sources and company disclosures as of late May 2026 and should be independently verified. Past performance is not indicative of future results.", italics:true, size:18, color:GREY}) ]}));
}

function save(doc, path){ return Packer.toBuffer(doc).then(buf => { fs.writeFileSync(path, buf); console.log("written "+path); }); }

module.exports = { H1,H2,P,bullet,leadBullet,hr,moatBox,table,cover,disclaimer,makeDoc,save,
  AlignmentType, GREEN, RED, NAVY, BLUE };
