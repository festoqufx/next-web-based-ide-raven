export const DEFAULT_HTML = `<main class="wrap">
  <div class="card">
    <div class="card-inner">
      <div class="badge font-mono">01 / FEATURE</div>
      <h2 class="title">Monochrome IDE</h2>
      <p class="desc">A minimal, fast, and focused sandbox for crafting web interfaces.</p>
      <button class="btn btn-primary" id="btn-1">
        <span>Execute</span>
        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  </div>

  <div class="card">
    <div class="card-inner">
      <div class="badge font-mono">02 / INTERACTION</div>
      <h2 class="title">Live Feedback</h2>
      <p class="desc">Real-time compilation with instant console output and error detection.</p>
      <button class="btn btn-outline" id="btn-2">
        <span>Log Output</span>
        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none">
          <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
          <path d="M13 2v7h7"/>
        </svg>
      </button>
    </div>
  </div>
</main>`;

export const DEFAULT_CSS = `:root {
  --bg-color: #000000;
  --surface-color: #09090b;
  --border-color: #27272a;
  --text-primary: #ffffff;
  --text-secondary: #a1a1aa;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background-color: var(--bg-color);
  color: var(--text-primary);
  min-h: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.wrap {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  max-width: 720px;
  width: 100%;
}

.card {
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 24px;
  transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  border-color: #52525b;
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(255, 255, 255, 0.03);
}

.badge {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.15em;
  color: #71717a;
  margin-bottom: 12px;
}

.title {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 8px;
  color: var(--text-primary);
}

.desc {
  font-size: 13px;
  line-height: 1.6;
  color: var(--text-secondary);
  margin-bottom: 20px;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  font-size: 13px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-primary {
  background: #ffffff;
  color: #000000;
  border: 1px solid #ffffff;
}

.btn-primary:hover {
  background: #e4e4e7;
  border-color: #e4e4e7;
}

.btn-outline {
  background: transparent;
  color: #ffffff;
  border: 1px solid #3f3f46;
}

.btn-outline:hover {
  background: #18181b;
  border-color: #52525b;
}`;

export const DEFAULT_JS = `// Interactive button actions with live console feedback
document.getElementById("btn-1").addEventListener("click", () => {
  console.log("Action triggered: Execute initialized successfully.");
});

document.getElementById("btn-2").addEventListener("click", () => {
  console.log("Console Log: Live preview state synchronized.");
  console.warn("System Notice: Monochrome styling applied.");
});`;

export const PRESET_TEMPLATES = [
  {
    id: "default",
    name: "Monochrome Cards",
    html: DEFAULT_HTML,
    css: DEFAULT_CSS,
    js: DEFAULT_JS,
  },
  {
    id: "minimal_hero",
    name: "Minimal Hero Section",
    html: `<header class="hero">
  <div class="tag">MONOCHROME EDITION</div>
  <h1 class="headline">Design Without Distraction</h1>
  <p class="subhead">A high-contrast workspace engineered for focus, elegance, and extreme performance.</p>
  <div class="cta-group">
    <button class="btn btn-main" id="btn-hero">Get Started</button>
    <button class="btn btn-sub" id="btn-docs">Documentation</button>
  </div>
</header>`,
    css: `body {
  background: #000;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 32px;
}
.hero {
  text-align: center;
  max-width: 600px;
}
.tag {
  display: inline-block;
  font-family: monospace;
  font-size: 11px;
  letter-spacing: 0.2em;
  padding: 4px 12px;
  border: 1px solid #333;
  border-radius: 20px;
  color: #888;
  margin-bottom: 20px;
}
.headline {
  font-size: 42px;
  font-weight: 800;
  letter-spacing: -0.04em;
  margin-bottom: 16px;
}
.subhead {
  font-size: 16px;
  color: #a1a1aa;
  line-height: 1.6;
  margin-bottom: 32px;
}
.cta-group {
  display: flex;
  gap: 12px;
  justify-content: center;
}
.btn {
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.btn-main {
  background: #fff;
  color: #000;
  border: none;
}
.btn-main:hover {
  background: #ccc;
}
.btn-sub {
  background: transparent;
  color: #fff;
  border: 1px solid #333;
}
.btn-sub:hover {
  background: #111;
  border-color: #666;
}`,
    js: `document.getElementById("btn-hero").addEventListener("click", () => {
  console.log("Hero CTA clicked! Welcome to Monochrome IDE.");
});
document.getElementById("btn-docs").addEventListener("click", () => {
  console.log("Opening documentation...");
});`,
  },
  {
    id: "interactive_counter",
    name: "Interactive Counter",
    html: `<div class="counter-card">
  <span class="label">COUNTER</span>
  <h1 id="count-value">0</h1>
  <div class="btn-grid">
    <button id="btn-decrement">-</button>
    <button id="btn-reset">Reset</button>
    <button id="btn-increment">+</button>
  </div>
</div>`,
    css: `body {
  background: #09090b;
  color: #fafafa;
  font-family: monospace;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
.counter-card {
  background: #000;
  border: 1px solid #27272a;
  padding: 40px;
  border-radius: 16px;
  text-align: center;
  width: 320px;
}
.label {
  font-size: 12px;
  color: #71717a;
  letter-spacing: 0.2em;
}
#count-value {
  font-size: 64px;
  margin: 20px 0;
  font-weight: 700;
}
.btn-grid {
  display: flex;
  gap: 8px;
}
button {
  flex: 1;
  padding: 10px;
  background: #18181b;
  color: #fff;
  border: 1px solid #27272a;
  border-radius: 8px;
  cursor: pointer;
  font-family: inherit;
  font-weight: bold;
}
button:hover {
  background: #27272a;
}`,
    js: `let count = 0;
const val = document.getElementById("count-value");
document.getElementById("btn-increment").addEventListener("click", () => {
  count++;
  val.innerText = count;
  console.log("Count increased to:", count);
});
document.getElementById("btn-decrement").addEventListener("click", () => {
  count--;
  val.innerText = count;
  console.log("Count decreased to:", count);
});
document.getElementById("btn-reset").addEventListener("click", () => {
  count = 0;
  val.innerText = count;
  console.log("Count reset to 0");
});`,
  },
];

export const CODE_TYPES = ["html", "css", "javascript"];

export const CODE_LABELS = {
  html: "HTML Markup",
  css: "CSS Styles",
  javascript: "JS Logic",
};

export const CODE_FILENAMES = {
  html: "index.html",
  css: "styles.css",
  javascript: "script.js",
};
