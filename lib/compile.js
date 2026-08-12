/**
 * Builds a standalone HTML document from the separate HTML / CSS / JS panes.
 * Shared by both the desktop and mobile editors to keep behaviour consistent.
 */
export const compile = ({ html = "", css = "", js = "" }) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    ${css}
  </style>
</head>
<body>
  <div>${html}</div>
  <script>
    ${js}
  </script>
</body>
</html>`;
