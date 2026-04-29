// One-shot config for generating the PROJECT_DOCUMENTATION.pdf via md-to-pdf.
// Tuned for an internal Notion-import / share-with-stakeholders document.
module.exports = {
  pdf_options: {
    format: "A4",
    margin: {
      top: "20mm",
      right: "16mm",
      bottom: "20mm",
      left: "16mm",
    },
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: `
      <div style="font-size:9px; color:#6b7280; width:100%; padding:0 16mm; display:flex; justify-content:space-between;">
        <span>TalentPop QA App — Project Documentation</span>
        <span class="date"></span>
      </div>`,
    footerTemplate: `
      <div style="font-size:9px; color:#6b7280; width:100%; padding:0 16mm; display:flex; justify-content:space-between;">
        <span>Confidential — Internal use only</span>
        <span><span class="pageNumber"></span> / <span class="totalPages"></span></span>
      </div>`,
  },
  css: `
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      font-size: 11pt;
      line-height: 1.55;
      color: #1f2937;
    }
    h1 {
      color: #163143;
      border-bottom: 2px solid #69C920;
      padding-bottom: 0.3em;
      margin-top: 0;
      page-break-after: avoid;
    }
    h2 {
      color: #163143;
      border-bottom: 1px solid #D7E6E7;
      padding-bottom: 0.25em;
      margin-top: 1.6em;
      page-break-after: avoid;
    }
    h3 {
      color: #163143;
      margin-top: 1.2em;
      page-break-after: avoid;
    }
    a { color: #2563eb; text-decoration: none; }
    code {
      background: #F1F5F5;
      padding: 0.1em 0.35em;
      border-radius: 3px;
      font-size: 0.92em;
      color: #163143;
    }
    pre {
      background: #F8FAFA;
      border: 1px solid #D7E6E7;
      border-radius: 6px;
      padding: 12px 14px;
      font-size: 9.5pt;
      line-height: 1.45;
      page-break-inside: avoid;
    }
    pre code {
      background: transparent;
      padding: 0;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      margin: 0.6em 0;
      font-size: 10pt;
      page-break-inside: avoid;
    }
    th, td {
      border: 1px solid #D7E6E7;
      padding: 7px 10px;
      text-align: left;
      vertical-align: top;
    }
    th {
      background: #F1F5F5;
      color: #163143;
      font-weight: 600;
    }
    tr:nth-child(even) td { background: #FBFCFC; }
    blockquote {
      border-left: 3px solid #69C920;
      background: #F6FBF1;
      margin: 0.7em 0;
      padding: 8px 14px;
      color: #163143;
      page-break-inside: avoid;
    }
    hr {
      border: none;
      border-top: 1px solid #D7E6E7;
      margin: 1.6em 0;
    }
    ul, ol { padding-left: 1.4em; }
    li { margin: 0.2em 0; }
    /* Avoid orphan headings by keeping a heading attached to its first paragraph */
    h1 + *, h2 + *, h3 + * { page-break-before: avoid; }
  `,
};
