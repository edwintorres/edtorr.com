// tiny-agent — github.com/edwintorres/tiny-agent

// src/styles.js
var styles = (
  /* css */
  `
  :host {
    --ags-bg: #ffffff;
    --ags-fg: #1a1a1a;
    --ags-muted: #5a6473;
    --ags-border: #d8dee5;
    --ags-accent: #2c5fb3;
    --ags-accent-fg: #ffffff;
    --ags-warn-bg: #fff8db;
    --ags-warn-border: #c9a227;
    --ags-canvas-bg: #fafbfc;
    --ags-canvas-border: #d8dee5;
    --ags-log-bg: #1e1e1e;
    --ags-log-fg: #d4d4d4;
    --ags-log-accent: #4ec9b0;
    --ags-log-tool: #dcdcaa;
    --ags-log-error: #f48771;
    --ags-radius: 8px;
    --ags-font: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    --ags-mono: ui-monospace, SFMono-Regular, "Cascadia Mono", Menlo, monospace;

    display: block;
    color: var(--ags-fg);
    font-family: var(--ags-font);
    font-size: 16px;
    line-height: 1.5;
    box-sizing: border-box;
  }

  *, *::before, *::after { box-sizing: border-box; }

  .ags-card {
    border: 1px solid var(--ags-border);
    border-radius: var(--ags-radius);
    padding: 1rem 1.25rem 1.25rem;
    background: var(--ags-bg);
  }

  .ags-title {
    margin: 0 0 0.5rem;
    font-size: 1.1rem;
    font-weight: 600;
  }

  .ags-warning {
    background: var(--ags-warn-bg);
    border-left: 3px solid var(--ags-warn-border);
    border-radius: 4px;
    padding: 0.6rem 0.75rem;
    font-size: 0.85rem;
    margin-bottom: 1rem;
    color: var(--ags-fg);
  }

  .ags-field { margin-bottom: 0.75rem; }
  .ags-label {
    display: block;
    font-size: 0.85rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
    color: var(--ags-muted);
  }

  .ags-key, .ags-prompt {
    width: 100%;
    padding: 0.5rem 0.6rem;
    border: 1px solid var(--ags-border);
    border-radius: 4px;
    font: inherit;
    color: var(--ags-fg);
    background: var(--ags-bg);
  }

  .ags-prompt {
    resize: vertical;
    min-height: 3.5em;
  }

  .ags-code-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
    border-bottom: 1px solid var(--ags-border);
    padding-bottom: 0.2rem;
  }
  .ags-tabs {
    display: flex;
    gap: 0.15rem;
  }
  .ags-tab {
    font: inherit;
    font-size: 0.85rem;
    padding: 0.35rem 0.85rem;
    border: 1px solid var(--ags-border);
    border-bottom: none;
    border-radius: 4px 4px 0 0;
    background: #eef0f3;
    color: var(--ags-muted);
    cursor: pointer;
    margin-bottom: -1px;
  }
  .ags-tab[aria-selected="true"] {
    background: var(--ags-bg);
    color: var(--ags-fg);
    font-weight: 600;
    border-bottom: 1px solid var(--ags-bg);
  }
  .ags-code-note {
    font-size: 0.8rem;
    color: var(--ags-muted);
    margin: 0.4rem 0 0.35rem;
  }
  .ags-editor {
    position: relative;
    height: 18em;
    border: 1px solid var(--ags-border);
    border-radius: 4px;
    background: #fbfcfd;
    overflow: hidden;
  }
  .ags-editor-pre,
  .ags-code,
  .ags-tools-code {
    margin: 0;
    padding: 0.6rem 0.7rem;
    font-family: var(--ags-mono);
    font-size: 0.78rem;
    line-height: 1.55;
    box-sizing: border-box;
    white-space: pre;
    word-wrap: normal;
    overflow: auto;
    tab-size: 2;
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: 0;
    background: transparent;
  }
  .ags-editor-pre {
    pointer-events: none;
    color: var(--ags-fg);
    z-index: 1;
  }
  .ags-editor-pre code {
    font: inherit;
    display: block;
    min-height: 100%;
  }
  .ags-code,
  .ags-tools-code {
    color: transparent;
    caret-color: var(--ags-fg);
    resize: none;
    z-index: 2;
    outline: none;
  }
  .ags-code:focus,
  .ags-tools-code:focus {
    box-shadow: inset 0 0 0 2px rgba(44, 95, 179, 0.25);
  }

  .ags-tok-keyword { color: #0050b3; font-weight: 600; }
  .ags-tok-string  { color: #008f4d; }
  .ags-tok-comment { color: #6a737d; font-style: italic; }
  .ags-tok-number  { color: #aa5500; }
  .ags-tok-ident   { color: inherit; }
  .ags-panel[hidden] { display: none; }
  .ags-reset-active {
    font: inherit;
    font-size: 0.8rem;
    padding: 0.2rem 0.55rem;
    border: 1px solid var(--ags-border);
    border-radius: 4px;
    background: var(--ags-bg);
    color: var(--ags-fg);
    cursor: pointer;
  }

  .ags-toolbar {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .ags-run, .ags-clear {
    font: inherit;
    padding: 0.5rem 0.95rem;
    border: 1px solid var(--ags-border);
    border-radius: 4px;
    cursor: pointer;
  }

  .ags-run {
    background: var(--ags-accent);
    color: var(--ags-accent-fg);
    border-color: var(--ags-accent);
  }
  .ags-run:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .ags-clear {
    background: var(--ags-bg);
    color: var(--ags-fg);
  }

  .ags-section-label {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--ags-muted);
    margin: 0.75rem 0 0.35rem;
  }

  .ags-canvas {
    min-height: 120px;
    border: 1px dashed var(--ags-canvas-border);
    border-radius: 4px;
    padding: 0.6rem;
    background: var(--ags-canvas-bg);
    transition: background 0.3s ease;
  }

  .ags-note {
    display: inline-block;
    padding: 0.45rem 0.7rem;
    margin: 0.25rem;
    background: #ffeb6e;
    border-radius: 3px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12);
    transform: rotate(-1deg);
    font-size: 0.9rem;
    color: #1a1a1a;
  }

  .ags-log {
    font-family: var(--ags-mono);
    font-size: 0.8rem;
    line-height: 1.5;
    background: var(--ags-log-bg);
    color: var(--ags-log-fg);
    padding: 0.75rem;
    border-radius: 4px;
    max-height: 240px;
    overflow-y: auto;
    white-space: pre-wrap;
  }
  .ags-log-empty {
    color: var(--ags-muted);
    font-style: italic;
  }
  .ags-log-turn { color: var(--ags-log-accent); margin-top: 0.5rem; }
  .ags-log-turn:first-child { margin-top: 0; }
  .ags-log-text { color: var(--ags-log-fg); }
  .ags-log-tool { color: var(--ags-log-tool); }
  .ags-log-error { color: var(--ags-log-error); }
`
);

// src/tools.js
var defaultTools = `// Available in this scope:
//   canvas \u2014 the agent's HTMLElement (a <div> inside the widget)

const tools = [
  {
    name: "add_note",
    description: "Add a sticky note to the canvas with given text and optional color.",
    input_schema: {
      type: "object",
      properties: {
        text:  { type: "string", description: "Text on the note." },
        color: { type: "string", description: "Optional CSS color." },
      },
      required: ["text"],
    },
  },
  {
    name: "change_background",
    description: "Change the canvas background color.",
    input_schema: {
      type: "object",
      properties: { color: { type: "string", description: "CSS color." } },
      required: ["color"],
    },
  },
  {
    name: "clear_canvas",
    description: "Remove every note and reset the canvas background.",
    input_schema: { type: "object", properties: {} },
  },
  {
    name: "count_notes",
    description: "Return how many notes are currently on the canvas.",
    input_schema: { type: "object", properties: {} },
  },
];

function runTool(name, input) {
  if (name === "add_note") {
    if (!input.text) throw new Error("add_note requires 'text'.");
    const span = canvas.ownerDocument.createElement("span");
    span.className = "ags-note";
    span.textContent = input.text;
    if (input.color) span.style.background = input.color;
    canvas.appendChild(span);
    return \`Added note "\${input.text}".\`;
  }
  if (name === "change_background") {
    if (!input.color) throw new Error("change_background requires 'color'.");
    canvas.style.background = input.color;
    return \`Background set to \${input.color}.\`;
  }
  if (name === "clear_canvas") {
    while (canvas.firstChild) canvas.removeChild(canvas.firstChild);
    canvas.style.background = "";
    return "Canvas cleared.";
  }
  if (name === "count_notes") {
    return String(canvas.querySelectorAll(".ags-note").length);
  }
  throw new Error(\`Unknown tool: \${name}\`);
}
`;
function compileTools(code, canvas) {
  const fn = new Function("canvas", `${code}
return { tools, runTool };`);
  return fn(canvas);
}

// src/agent.js
var defaultAgent = `async function agent({ apiKey, model, prompt, tools, runTool, log }) {
  const messages = [{ role: "user", content: prompt }];
  let turn = 0;
  while (turn++ < 20) {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true",
      },
      body: JSON.stringify({ model, max_tokens: 1024, tools, messages }),
    });
    if (!res.ok) throw new Error(\`API \${res.status}: \${await res.text()}\`);
    const data = await res.json();
    messages.push({ role: "assistant", content: data.content });
    log(data);
    if (data.stop_reason !== "tool_use") return;
    messages.push({
      role: "user",
      content: data.content
        .filter((b) => b.type === "tool_use")
        .map((b) => ({
          type: "tool_result",
          tool_use_id: b.id,
          content: runTool(b.name, b.input),
        })),
    });
  }
}`;
var AsyncFunction = Object.getPrototypeOf(async function() {
}).constructor;
async function runAgentCode(code, ctx) {
  const fn = new AsyncFunction("ctx", `${code}
return agent(ctx);`);
  return fn(ctx);
}

// src/i18n.js
var i18n = {
  en: {
    title: "Try it live",
    warning: "Your API key stays in this browser tab. It is sent only to api.anthropic.com. Bring your own key. Anthropic will charge your account for usage.",
    apiKeyLabel: "Anthropic API key",
    apiKeyPlaceholder: "sk-ant-...",
    promptLabel: "Instruction for the agent",
    codeLabel: "Code (editable)",
    codeNoteAgent: "This is the actual loop that runs when you click Run. Edit it.",
    codeNoteTools: "Schemas the model sees, plus the handlers that run when it calls them. The variable canvas is available in scope.",
    tabAgent: "Agent",
    tabTools: "Tools",
    resetAgentButton: "Reset agent",
    resetToolsButton: "Reset tools",
    runButton: "Run agent",
    clearButton: "Clear canvas",
    canvasLabel: "The agent's browser canvas",
    logLabel: "Loop log",
    emptyLog: "No runs yet.",
    needKey: "Please paste your Anthropic API key.",
    needPrompt: "Please write an instruction.",
    defaultPrompt: "Add a note for each weekday: Monday, Tuesday, Wednesday, Thursday, Friday. Use a different color for each. Then change the canvas background to a soft pastel.",
    logTurn: (n) => `--- Turn ${n} ---`,
    logModelPrefix: "model:",
    logToolCallPrefix: "tool call:",
    logToolResultPrefix: "tool result:",
    logErrorPrefix: "error:",
    logDone: "Done."
  },
  es: {
    title: "Pru\xE9balo en vivo",
    warning: "Tu API key se queda en esta pesta\xF1a del navegador. Solo se env\xEDa a api.anthropic.com. Trae tu propia key. Anthropic va a cobrar tu cuenta por el uso.",
    apiKeyLabel: "API key de Anthropic",
    apiKeyPlaceholder: "sk-ant-...",
    promptLabel: "Instrucci\xF3n para el agente",
    codeLabel: "C\xF3digo (editable)",
    codeNoteAgent: "Este es el loop que se ejecuta cuando pulsas Correr. Ed\xEDtalo.",
    codeNoteTools: "Los esquemas que ve el modelo, m\xE1s los handlers que se ejecutan cuando los llama. La variable canvas est\xE1 disponible en el alcance.",
    tabAgent: "Agente",
    tabTools: "Herramientas",
    resetAgentButton: "Restaurar agente",
    resetToolsButton: "Restaurar herramientas",
    runButton: "Correr el agente",
    clearButton: "Limpiar el lienzo",
    canvasLabel: "El lienzo del navegador para el agente",
    logLabel: "Log del loop",
    emptyLog: "Sin corridas todav\xEDa.",
    needKey: "Por favor pega tu API key de Anthropic.",
    needPrompt: "Por favor escribe una instrucci\xF3n.",
    defaultPrompt: "Agrega una nota por cada d\xEDa de la semana: lunes, martes, mi\xE9rcoles, jueves, viernes. Que cada una tenga un color distinto. Despu\xE9s cambia el fondo del lienzo a un color pastel suave.",
    logTurn: (n) => `--- Turno ${n} ---`,
    logModelPrefix: "modelo:",
    logToolCallPrefix: "llamada a herramienta:",
    logToolResultPrefix: "resultado:",
    logErrorPrefix: "error:",
    logDone: "Listo."
  }
};
function resolveLang(el) {
  const raw = el.getAttribute?.("lang") || document.documentElement.getAttribute("lang") || "en";
  const base = String(raw).toLowerCase().split("-")[0];
  return base === "es" ? "es" : "en";
}

// src/syntax.js
var KEYWORDS = /* @__PURE__ */ new Set([
  "async",
  "await",
  "break",
  "case",
  "catch",
  "class",
  "const",
  "continue",
  "default",
  "delete",
  "do",
  "else",
  "export",
  "extends",
  "finally",
  "for",
  "from",
  "function",
  "if",
  "import",
  "in",
  "instanceof",
  "let",
  "new",
  "of",
  "return",
  "static",
  "switch",
  "this",
  "throw",
  "try",
  "typeof",
  "var",
  "void",
  "while",
  "yield",
  "true",
  "false",
  "null",
  "undefined",
  "as"
]);
var HTML_ENT = { "&": "&amp;", "<": "&lt;", ">": "&gt;" };
function escapeHtml(s) {
  return s.replace(/[&<>]/g, (c) => HTML_ENT[c]);
}
function span(kind, text) {
  return `<span class="ags-tok-${kind}">${escapeHtml(text)}</span>`;
}
var IDENT_START = /[A-Za-z_$]/;
var IDENT_PART = /[A-Za-z0-9_$]/;
var DIGIT = /[0-9]/;
var NUMBER_PART = /[0-9._eE+-]/;
function tokenize(code) {
  let out = "";
  let i = 0;
  const n = code.length;
  while (i < n) {
    const c = code[i];
    if (c === "/" && code[i + 1] === "/") {
      const end = code.indexOf("\n", i);
      const j = end === -1 ? n : end;
      out += span("comment", code.slice(i, j));
      i = j;
      continue;
    }
    if (c === "/" && code[i + 1] === "*") {
      const end = code.indexOf("*/", i + 2);
      const j = end === -1 ? n : end + 2;
      out += span("comment", code.slice(i, j));
      i = j;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") {
      const quote = c;
      let j = i + 1;
      while (j < n && code[j] !== quote) {
        if (code[j] === "\\" && j + 1 < n) j++;
        j++;
      }
      if (j < n) j++;
      out += span("string", code.slice(i, j));
      i = j;
      continue;
    }
    if (IDENT_START.test(c)) {
      let j = i + 1;
      while (j < n && IDENT_PART.test(code[j])) j++;
      const word = code.slice(i, j);
      out += span(KEYWORDS.has(word) ? "keyword" : "ident", word);
      i = j;
      continue;
    }
    if (DIGIT.test(c)) {
      let j = i + 1;
      while (j < n && NUMBER_PART.test(code[j])) j++;
      out += span("number", code.slice(i, j));
      i = j;
      continue;
    }
    out += escapeHtml(c);
    i++;
  }
  return out;
}

// src/tiny-agent.js
var DEFAULT_MODEL = "claude-haiku-4-5";
var TinyAgent = class extends HTMLElement {
  static get observedAttributes() {
    return ["lang", "model"];
  }
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._runPromise = null;
    this._rendered = false;
    this._activeTab = "agent";
  }
  connectedCallback() {
    if (this._rendered) return;
    this._render();
    this._wire();
    this._rendered = true;
  }
  attributeChangedCallback(name) {
    if (!this._rendered) return;
    if (name === "lang") this._applyLabels();
  }
  /** Current agent code (Agent tab textarea). */
  get code() {
    return this.shadowRoot.querySelector(".ags-code").value;
  }
  set code(value) {
    this.shadowRoot.querySelector(".ags-code").value = value;
    if (this._rendered) this._paintEditor("agent");
  }
  /** Current tools code (Tools tab textarea). */
  get toolsCode() {
    return this.shadowRoot.querySelector(".ags-tools-code").value;
  }
  set toolsCode(value) {
    this.shadowRoot.querySelector(".ags-tools-code").value = value;
    if (this._rendered) this._paintEditor("tools");
  }
  _render() {
    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="ags-card">
        <h3 class="ags-title"></h3>
        <div class="ags-warning"></div>

        <div class="ags-field">
          <label class="ags-label ags-key-label" for="ags-key-input"></label>
          <input class="ags-key" id="ags-key-input" type="password" autocomplete="off" />
        </div>

        <div class="ags-field">
          <label class="ags-label ags-prompt-label" for="ags-prompt-input"></label>
          <textarea class="ags-prompt" id="ags-prompt-input" rows="3"></textarea>
        </div>

        <div class="ags-field">
          <div class="ags-code-header">
            <div class="ags-tabs" role="tablist">
              <button class="ags-tab ags-tab-agent" role="tab" type="button" data-tab="agent" aria-selected="true"></button>
              <button class="ags-tab ags-tab-tools" role="tab" type="button" data-tab="tools" aria-selected="false"></button>
            </div>
            <button class="ags-reset-active" type="button"></button>
          </div>

          <div class="ags-panel ags-panel-agent">
            <div class="ags-code-note ags-code-note-agent"></div>
            <div class="ags-editor">
              <pre class="ags-editor-pre" aria-hidden="true"><code class="ags-editor-code"></code></pre>
              <textarea class="ags-code" id="ags-code-input" spellcheck="false"></textarea>
            </div>
          </div>

          <div class="ags-panel ags-panel-tools" hidden>
            <div class="ags-code-note ags-code-note-tools"></div>
            <div class="ags-editor">
              <pre class="ags-editor-pre" aria-hidden="true"><code class="ags-editor-code"></code></pre>
              <textarea class="ags-tools-code" id="ags-tools-code-input" spellcheck="false"></textarea>
            </div>
          </div>
        </div>

        <div class="ags-toolbar">
          <button class="ags-run" type="button"></button>
          <button class="ags-clear" type="button"></button>
        </div>

        <div class="ags-section-label ags-canvas-label"></div>
        <div class="ags-canvas"></div>

        <div class="ags-section-label ags-log-label"></div>
        <div class="ags-log" aria-live="polite"></div>
      </div>
    `;
    this.shadowRoot.querySelector(".ags-code").value = defaultAgent;
    this.shadowRoot.querySelector(".ags-tools-code").value = defaultTools;
    this._paintEditor("agent");
    this._paintEditor("tools");
    this._applyLabels({ resetPrompt: true, resetLog: true });
  }
  _paintEditor(which) {
    const panel = this.shadowRoot.querySelector(`.ags-panel-${which}`);
    const ta = panel.querySelector("textarea");
    const code = panel.querySelector(".ags-editor-code");
    code.innerHTML = tokenize(ta.value) + "\n";
  }
  _syncEditorScroll(textarea, pre) {
    pre.scrollTop = textarea.scrollTop;
    pre.scrollLeft = textarea.scrollLeft;
  }
  _applyLabels({ resetPrompt = false, resetLog = false } = {}) {
    const t = i18n[resolveLang(this)];
    const root = this.shadowRoot;
    root.querySelector(".ags-title").textContent = t.title;
    root.querySelector(".ags-warning").textContent = t.warning;
    root.querySelector(".ags-key-label").textContent = t.apiKeyLabel;
    root.querySelector(".ags-key").placeholder = t.apiKeyPlaceholder;
    root.querySelector(".ags-prompt-label").textContent = t.promptLabel;
    root.querySelector(".ags-tab-agent").textContent = t.tabAgent;
    root.querySelector(".ags-tab-tools").textContent = t.tabTools;
    root.querySelector(".ags-code-note-agent").textContent = t.codeNoteAgent;
    root.querySelector(".ags-code-note-tools").textContent = t.codeNoteTools;
    root.querySelector(".ags-run").textContent = t.runButton;
    root.querySelector(".ags-clear").textContent = t.clearButton;
    root.querySelector(".ags-canvas-label").textContent = t.canvasLabel;
    root.querySelector(".ags-log-label").textContent = t.logLabel;
    this._refreshResetLabel();
    if (resetPrompt) {
      root.querySelector(".ags-prompt").value = t.defaultPrompt;
    }
    if (resetLog) {
      const log = root.querySelector(".ags-log");
      log.innerHTML = `<span class="ags-log-empty">${t.emptyLog}</span>`;
    }
  }
  _refreshResetLabel() {
    const t = i18n[resolveLang(this)];
    const $reset = this.shadowRoot.querySelector(".ags-reset-active");
    $reset.textContent = this._activeTab === "tools" ? t.resetToolsButton : t.resetAgentButton;
  }
  _wire() {
    const root = this.shadowRoot;
    const $run = root.querySelector(".ags-run");
    const $clear = root.querySelector(".ags-clear");
    const $reset = root.querySelector(".ags-reset-active");
    const tabs = root.querySelectorAll(".ags-tab");
    const $panelAgent = root.querySelector(".ags-panel-agent");
    const $panelTools = root.querySelector(".ags-panel-tools");
    tabs.forEach(
      (tab) => tab.addEventListener("click", () => {
        this._activeTab = tab.dataset.tab === "tools" ? "tools" : "agent";
        root.querySelector(".ags-tab-agent").setAttribute("aria-selected", String(this._activeTab === "agent"));
        root.querySelector(".ags-tab-tools").setAttribute("aria-selected", String(this._activeTab === "tools"));
        $panelAgent.hidden = this._activeTab !== "agent";
        $panelTools.hidden = this._activeTab !== "tools";
        this._refreshResetLabel();
      })
    );
    for (const which of ["agent", "tools"]) {
      const panel = root.querySelector(`.ags-panel-${which}`);
      const ta = panel.querySelector("textarea");
      const pre = panel.querySelector(".ags-editor-pre");
      ta.addEventListener("input", () => this._paintEditor(which));
      ta.addEventListener("scroll", () => this._syncEditorScroll(ta, pre));
    }
    $run.addEventListener("click", () => {
      this._runPromise = this.run();
    });
    $clear.addEventListener("click", () => {
      const canvas = root.querySelector(".ags-canvas");
      while (canvas.firstChild) canvas.removeChild(canvas.firstChild);
      canvas.style.background = "";
      const log = root.querySelector(".ags-log");
      log.innerHTML = "";
    });
    $reset.addEventListener("click", () => {
      if (this._activeTab === "tools") {
        root.querySelector(".ags-tools-code").value = defaultTools;
        this._paintEditor("tools");
      } else {
        root.querySelector(".ags-code").value = defaultAgent;
        this._paintEditor("agent");
      }
    });
  }
  /**
   * Run one full agent loop using the key, prompt, agent code, and tools code
   * currently in the form. Errors are surfaced in the log.
   */
  async run() {
    const t = i18n[resolveLang(this)];
    const $key = this.shadowRoot.querySelector(".ags-key");
    const $prompt = this.shadowRoot.querySelector(".ags-prompt");
    const $code = this.shadowRoot.querySelector(".ags-code");
    const $toolsCode = this.shadowRoot.querySelector(".ags-tools-code");
    const $run = this.shadowRoot.querySelector(".ags-run");
    const $log = this.shadowRoot.querySelector(".ags-log");
    const $canvas = this.shadowRoot.querySelector(".ags-canvas");
    const apiKey = ($key.value || "").trim();
    const prompt = ($prompt.value || "").trim();
    const agentCode = $code.value || defaultAgent;
    const toolsCode = $toolsCode.value || defaultTools;
    $log.innerHTML = "";
    if (!apiKey) {
      this._logLine($log, t.needKey, "ags-log-error");
      return;
    }
    if (!prompt) {
      this._logLine($log, t.needPrompt, "ags-log-error");
      return;
    }
    let tools;
    let runTool;
    try {
      ({ tools, runTool } = compileTools(toolsCode, $canvas));
    } catch (err) {
      this._logLine($log, `${t.logErrorPrefix} tools: ${err.message || err}`, "ags-log-error");
      return;
    }
    const model = this.getAttribute("model") || DEFAULT_MODEL;
    let turn = 0;
    $run.disabled = true;
    try {
      await runAgentCode(agentCode, {
        apiKey,
        model,
        prompt,
        tools,
        runTool: (name, input) => {
          const result = runTool(name, input);
          this._logLine($log, `${t.logToolResultPrefix} ${result}`, "ags-log-tool");
          return result;
        },
        log: (data) => {
          turn += 1;
          this._logLine($log, t.logTurn(turn), "ags-log-turn");
          for (const block of data.content || []) {
            if (block.type === "text" && typeof block.text === "string" && block.text.trim()) {
              this._logLine($log, `${t.logModelPrefix} ${block.text}`, "ags-log-text");
            } else if (block.type === "tool_use") {
              this._logLine(
                $log,
                `${t.logToolCallPrefix} ${block.name}(${JSON.stringify(block.input)})`,
                "ags-log-tool"
              );
            }
          }
          if (data.stop_reason !== "tool_use") {
            this._logLine($log, t.logDone, "ags-log-turn");
          }
        }
      });
    } catch (err) {
      this._logLine($log, `${t.logErrorPrefix} ${err.message || err}`, "ags-log-error");
    } finally {
      $run.disabled = false;
    }
  }
  _logLine(logEl, text, cls) {
    const div = document.createElement("div");
    if (cls) div.className = cls;
    div.textContent = text;
    logEl.appendChild(div);
    logEl.scrollTop = logEl.scrollHeight;
  }
};
if (typeof customElements !== "undefined" && !customElements.get("tiny-agent")) {
  customElements.define("tiny-agent", TinyAgent);
}
export {
  TinyAgent
};
