/**
 * Lightweight HTML, CSS, and JavaScript code beautifier/formatter.
 */

export function formatHtml(html) {
  if (!html) return "";
  let formatted = "";
  let indent = 0;
  const tab = "  ";

  // Basic tag splitting & indentation
  const tokens = html
    .replace(/>\s*</g, ">\n<")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  for (let token of tokens) {
    if (token.match(/^<\//)) {
      // Closing tag
      indent = Math.max(0, indent - 1);
      formatted += tab.repeat(indent) + token + "\n";
    } else if (
      token.match(/^<[^\/]/) &&
      !token.match(/\/>$/) &&
      !token.match(/^<(img|input|br|hr|meta|link|param|area|base|col|embed|source|track|wbr)/i) &&
      !token.includes("</")
    ) {
      // Opening tag
      formatted += tab.repeat(indent) + token + "\n";
      indent++;
    } else {
      // Self-closing tag or text
      formatted += tab.repeat(indent) + token + "\n";
    }
  }

  return formatted.trim();
}

export function formatCss(css) {
  if (!css) return "";
  let formatted = "";
  let indent = 0;
  const tab = "  ";

  const lines = css
    .replace(/\{/g, " {\n")
    .replace(/\}/g, "\n}\n")
    .replace(/;/g, ";\n")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  for (let line of lines) {
    if (line === "}") {
      indent = Math.max(0, indent - 1);
      formatted += tab.repeat(indent) + "}\n";
    } else if (line.endsWith("{")) {
      formatted += tab.repeat(indent) + line + "\n";
      indent++;
    } else {
      formatted += tab.repeat(indent) + line + "\n";
    }
  }

  return formatted.trim();
}

export function formatJs(js) {
  if (!js) return "";
  let formatted = "";
  let indent = 0;
  const tab = "  ";

  const lines = js
    .replace(/\{/g, " {\n")
    .replace(/\}/g, "\n}\n")
    .replace(/;/g, ";\n")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  for (let line of lines) {
    if (line.startsWith("}")) {
      indent = Math.max(0, indent - 1);
      formatted += tab.repeat(indent) + line + "\n";
    } else if (line.endsWith("{")) {
      formatted += tab.repeat(indent) + line + "\n";
      indent++;
    } else {
      formatted += tab.repeat(indent) + line + "\n";
    }
  }

  return formatted.trim();
}

export function formatCode({ html, css, js }) {
  return {
    html: formatHtml(html),
    css: formatCss(css),
    js: formatJs(js),
  };
}
