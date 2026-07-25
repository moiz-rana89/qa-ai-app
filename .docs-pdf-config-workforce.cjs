// Workforce App PDF config — same styling as the main docs config but with
// a Workforce-App-specific header.
const baseConfig = require("./.docs-pdf-config.cjs");

module.exports = {
  ...baseConfig,
  pdf_options: {
    ...baseConfig.pdf_options,
    headerTemplate: `
      <div style="font-size:9px; color:#6b7280; width:100%; padding:0 16mm; display:flex; justify-content:space-between;">
        <span>Workforce App — Project Documentation</span>
        <span class="date"></span>
      </div>`,
  },
};
