/**
 * Builds a standalone HTML document from the separate HTML / CSS / JS panes.
 * Intercepts console logs and errors to notify parent window via postMessage.
 */
export const compile = ({ html = "", css = "", js = "", compileId = "" }) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    ${css}
  </style>
  <script>
    (function() {
      const IDE_COMPILE_ID = ${JSON.stringify(compileId)};

      function sendLog(level, args) {
        try {
          const serialized = Array.from(args).map(arg => {
            if (typeof arg === "object") {
              try { return JSON.stringify(arg); } catch(e) { return String(arg); }
            }
            return String(arg);
          });
          window.parent.postMessage({
            type: 'IDE_CONSOLE_LOG',
            compileId: IDE_COMPILE_ID,
            level,
            args: serialized,
            timestamp: new Date().toLocaleTimeString()
          }, '*');
        } catch(e) {}
      }

      ['log', 'warn', 'error', 'info'].forEach(level => {
        const original = console[level];
        console[level] = function(...args) {
          sendLog(level, args);
          if (original) original.apply(console, args);
        };
      });

      window.addEventListener('error', function(e) {
        sendLog('error', [e.message + ' (' + e.filename + ':' + e.lineno + ')']);
      });

      window.addEventListener('unhandledrejection', function(e) {
        const reason = e && e.reason ? e.reason : 'Unhandled promise rejection';
        sendLog('error', [reason && reason.stack ? reason.stack : String(reason)]);
      });
    })();
  </script>
</head>
<body>
  ${html}
  <script>
    try {
      ${js}
    } catch(err) {
      console.error(err.stack || err.message || err);
    }
  </script>
</body>
</html>`;
