/* ============================================================
 * handsomezhuzhu — terminal homepage
 * All personal info lives in `config` below — edit freely.
 * ============================================================ */

const config = {
  user: "visitor",
  host: "fedora",
  name: "handsomezhuzhu",
  role: "CS undergraduate @ School of Computer Science, Sun Yat-sen University",
  location: "China",
  email: "zhuzihan@zhuzihan.com",
  github: "https://github.com/handsomezhuzhu",
  website: "https://zhuzihan.com/",
  repo: "https://github.com/handsomezhuzhu/zzh6",
  about: [
    "Hey, I'm <b>handsomezhuzhu</b> 👋",
    "",
    "An undergraduate student at the <b>School of Computer Science</b>,",
    "<b>Sun Yat-sen University</b>, based in China.",
    "",
    "I like building small, useful web services and living in the",
    "terminal. This site is my little corner of the internet —",
    "a Fedora-flavored shell you can poke around in.",
    "",
    "Type <span class='c-blue'>projects</span> to see what I've built,",
    "or <span class='c-blue'>contact</span> to get in touch.",
  ],
  education: {
    school: "Sun Yat-sen University",
    dept: "School of Computer Science",
    degree: "Undergraduate",
  },
  projects: [
    {
      name: "Status Probe",
      desc: "Service status & uptime probe dashboard for zhuzihan.com",
      url: "https://status.zhuzihan.com/",
    },
    {
      name: "API Health Check",
      desc: "Lightweight endpoint monitor for API availability testing",
      url: "https://api-test.zhuzihan.com/",
    },
    {
      name: "Temporary 2FA",
      desc: "A temporary two-factor authentication helper",
      url: "https://2fa.zhuzihan.com/",
    },
    {
      name: "File Courier Cabinet",
      desc: "File transfer & temporary storage cabinet",
      url: "https://file.zhuzihan.com/",
    },
  ],
};

/* virtual files (for `ls` / `cat`) */
const files = {
  "README.md":
    `Welcome to ${config.name}'s terminal.\nTry <span class="c-blue">help</span>, <span class="c-blue">about</span>, or <span class="c-blue">projects</span>.`,
  "about.txt":
    `${config.name} — ${config.role}, based in ${config.location}.`,
  "education.txt":
    `${config.education.school}, ${config.education.dept}, ${config.education.degree}.`,
};

/* ---------------- helpers ---------------- */
const ASCII_ART = [
  "██╗  ██╗ █████╗ ███╗   ██╗██████╗ ███████╗ ██████╗ ███╗   ███╗███████╗███████╗██╗  ██╗██╗   ██╗███████╗██╗  ██╗██╗   ██╗",
  "██║  ██║██╔══██╗████╗  ██║██╔══██╗██╔════╝██╔═══██╗████╗ ████║██╔════╝╚══███╔╝██║  ██║██║   ██║╚══███╔╝██║  ██║██║   ██║",
  "███████║███████║██╔██╗ ██║██║  ██║███████╗██║   ██║██╔████╔██║█████╗    ███╔╝ ███████║██║   ██║  ███╔╝ ███████║██║   ██║",
  "██╔══██║██╔══██║██║╚██╗██║██║  ██║╚════██║██║   ██║██║╚██╔╝██║██╔══╝   ███╔╝  ██╔══██║██║   ██║ ███╔╝  ██╔══██║██║   ██║",
  "██║  ██║██║  ██║██║ ╚████║██████╔╝███████║╚██████╔╝██║ ╚═╝ ██║███████╗███████╗██║  ██║╚██████╔╝███████╗██║  ██║╚██████╔╝",
  "╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝ ╚══════╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝ ╚═════╝",
].join("\n");

const $ = (sel) => document.querySelector(sel);
const output = $("#output");
const terminal = $("#terminal");
const hiddenInput = $("#hidden-input");
const typedSpan = $("#typed");
const ghostSpan = $("#ghost");
const cursorEl = $("#cursor");

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function print(html) {
  const div = document.createElement("div");
  div.className = "line";
  div.innerHTML = html;
  output.appendChild(div);
  terminal.scrollTop = terminal.scrollHeight;
}

function openLink(url) {
  setTimeout(() => window.open(url, "_blank")?.focus(), 800);
  return `opening <a href="${url}" target="_blank" rel="noreferrer noopener">${url}</a> ...`;
}

function banner() {
  return [
    `<pre class="ascii-art" aria-label="handsomezhuzhu">${ASCII_ART}</pre>`,
    `${config.role}`,
    `${config.location} · <a href="${config.github}" target="_blank" rel="noreferrer noopener">github</a> · <a href="${config.website}" target="_blank" rel="noreferrer noopener">website</a> · <a href="mailto:${config.email}">email</a>`,
    "",
    `Welcome to my terminal. <span class="c-dim">(Fedora Web Edition)</span>`,
    `Type <span class="c-blue c-bold">help</span> to list commands, <span class="c-blue">about</span> to learn more about me.`,
    `<span class="c-dim">Tab autocompletes, ↑↓ recalls history, Ctrl+L clears the screen.</span>`,
  ].join("\n");
}

/* ---------------- command registry ---------------- */
const commandNames = () =>
  Object.keys(commands).filter((k) => !k.startsWith("_"));

const commands = {
  help: {
    desc: "list all commands",
    run() {
      const names = commandNames();
      const width = Math.max(...names.map((n) => n.length)) + 2;
      return [
        `<span class="c-bold">available commands</span>`,
        "",
        ...names.map(
          (n) =>
            `  <span class="c-blue">${n.padEnd(width)}</span><span class="c-dim">${commands[n].desc}</span>`
        ),
      ].join("\n");
    },
  },
  welcome: { desc: "show the welcome banner", run: banner },
  about: { desc: "who am I", run: () => config.about.join("\n") },
  education: {
    desc: "my education",
    run() {
      const e = config.education;
      return [
        `<span class="c-blue c-bold">${e.school}</span>`,
        `  ${e.dept}`,
        `  ${e.degree}`,
      ].join("\n");
    },
  },
  projects: {
    desc: "things I've built",
    run() {
      return config.projects
        .map(
          (p, i) =>
            `<span class="c-yellow">${i + 1}.</span> <span class="c-blue c-bold">${esc(p.name)}</span>\n   <span class="c-dim">${esc(p.desc)}</span>\n   <a href="${p.url}" target="_blank" rel="noreferrer noopener">${p.url}</a>`
        )
        .join("\n\n");
    },
  },
  contact: {
    desc: "how to reach me",
    run() {
      return [
        `email    <a href="mailto:${config.email}">${config.email}</a>`,
        `github   <a href="${config.github}" target="_blank" rel="noreferrer noopener">${config.github}</a>`,
        `website  <a href="${config.website}" target="_blank" rel="noreferrer noopener">${config.website}</a>`,
        "",
        `<span class="c-dim">or run</span> <span class="c-blue">email</span><span class="c-dim">,</span> <span class="c-blue">github</span><span class="c-dim">,</span> <span class="c-blue">gui</span> <span class="c-dim">to jump right there.</span>`,
      ].join("\n");
    },
  },
  github: { desc: "open my GitHub profile", run: () => openLink(config.github) },
  gui: { desc: "open my main website", run: () => openLink(config.website) },
  repo: { desc: "view this site's source code", run: () => openLink(config.repo) },
  email: { desc: "send me an email", run: () => openLink("mailto:" + config.email) },
  ls: {
    desc: "list files",
    run: () =>
      Object.keys(files)
        .map((f) => `<span class="c-blue">${f}</span>`)
        .join("   ") +
      `\n<span class="c-dim">try</span> cat README.md`,
  },
  cat: {
    desc: "print a file, e.g. cat about.txt",
    run(args) {
      if (!args[0]) return `<span class="c-red">usage:</span> cat &lt;file&gt;`;
      const f = files[args[0]];
      return f !== undefined
        ? f
        : `<span class="c-red">cat: ${esc(args[0])}: no such file</span>`;
    },
  },
  echo: { desc: "print arguments", run: (args) => esc(args.join(" ")) },
  pwd: { desc: "print working directory", run: () => "/home/" + config.user },
  whoami: { desc: "print current user", run: () => "visitor — welcome to my site :)" },
  date: { desc: "current date & time", run: () => new Date().toString() },
  uname: {
    desc: "system information",
    run: () => "fedora-web 6.x x86_64 — 100% HTML, no kernel panic",
  },
  history: {
    desc: "command history",
    run: () =>
      history.map((h, i) => `  ${String(i + 1).padStart(3)}  ${esc(h)}`).join("\n"),
  },
  theme: {
    desc: "toggle dark / light theme",
    run: () => (toggleTheme(), `switched to ${document.body.classList.contains("light") ? "light" : "dark"} theme`),
  },
  sudo: {
    desc: "run a command as root (maybe)",
    run(args) {
      if (args[0] === "rm") return `<span class="c-red">nice try. this page stays.</span>`;
      return `<span class="c-red">visitor is not in the sudoers file. This incident will be reported.</span> 📝`;
    },
  },
  coffee: {
    desc: "brew a fresh cup",
    run() {
      return [
        "      ( (",
        "       ) )",
        "    .........",
        "    |       |___",
        "    |       |_|  |",
        "    |  ☕   |___|",
        "     \\________/",
        "",
        "<span class='c-green'>your coffee is ready. enjoy!</span>",
      ].join("\n");
    },
  },
  exit: { desc: "close the session", run: () => "there is no escape — but closing the tab works." },
  clear: { desc: "clear the terminal", run: () => "__CLEAR__" },
};

/* ---------------- terminal interaction ---------------- */
let history = JSON.parse(localStorage.getItem("zzh6_history") || "[]");
let histIdx = history.length;
let currentInput = "";

const promptHTML = `<span class="p-bracket">[</span><span class="p-user">${config.user}</span><span class="p-at">@</span><span class="p-host">${config.host}</span> <span class="p-dir">~</span><span class="p-bracket">]</span><span class="p-dollar">$</span>`;

function renderInput() {
  typedSpan.textContent = currentInput;
  ghostSpan.textContent = "";
  if (currentInput && document.activeElement === hiddenInput) {
    const match = commandNames()
      .sort()
      .find((c) => c.startsWith(currentInput) && c !== currentInput);
    if (match) ghostSpan.textContent = match.slice(currentInput.length);
  }
}

function execCommand(raw) {
  const line = raw.trim();
  print(`<span class="cmd-line">${promptHTML} <span class="typed-cmd">${esc(raw)}</span></span>`);

  if (line) {
    history.push(raw);
    if (history.length > 100) history.shift();
    localStorage.setItem("zzh6_history", JSON.stringify(history));
  }
  histIdx = history.length;

  if (!line) return;

  const [name, ...args] = line.split(/\s+/);
  const cmd = commands[name];
  if (cmd) {
    const result = cmd.run(args);
    if (result === "__CLEAR__") output.innerHTML = "";
    else if (result) print(result);
  } else {
    print(
      `<span class="c-red">bash: ${esc(name)}: command not found</span> <span class="c-dim">— try</span> <span class="c-blue">help</span>`
    );
  }
}

hiddenInput.addEventListener("input", () => {
  currentInput = hiddenInput.value.replace(/\n/g, "");
  renderInput();
});

hiddenInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const raw = currentInput;
    currentInput = "";
    hiddenInput.value = "";
    renderInput();
    execCommand(raw);
  } else if (e.key === "Tab") {
    e.preventDefault();
    const match = commandNames()
      .sort()
      .find((c) => c.startsWith(currentInput) && c !== currentInput);
    if (match && currentInput) {
      currentInput = match;
      hiddenInput.value = match;
      renderInput();
    }
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    if (histIdx > 0) {
      histIdx--;
      currentInput = history[histIdx] || "";
      hiddenInput.value = currentInput;
      renderInput();
    }
  } else if (e.key === "ArrowDown") {
    e.preventDefault();
    if (histIdx < history.length) {
      histIdx++;
      currentInput = history[histIdx] || "";
      hiddenInput.value = currentInput;
      renderInput();
    }
  } else if (e.key === "l" && e.ctrlKey) {
    e.preventDefault();
    output.innerHTML = "";
  } else if (e.key === "c" && e.ctrlKey) {
    print(`${promptHTML} <span class="typed-cmd">${esc(currentInput)}</span>^C`);
    currentInput = "";
    hiddenInput.value = "";
    renderInput();
  }
});

terminal.addEventListener("click", () => hiddenInput.focus());
document.addEventListener("click", () => {
  if (!window.getSelection().toString()) hiddenInput.focus();
});

/* ---------------- theme ---------------- */
function toggleTheme() {
  document.body.classList.toggle("light");
  localStorage.setItem(
    "zzh6_theme",
    document.body.classList.contains("light") ? "light" : "dark"
  );
}
if (localStorage.getItem("zzh6_theme") === "light") {
  document.body.classList.add("light");
}
$("#btn-theme").addEventListener("click", (e) => {
  e.stopPropagation();
  toggleTheme();
});

/* ---------------- window buttons ---------------- */
$("#btn-max").addEventListener("click", (e) => {
  e.stopPropagation();
  $("#window").classList.toggle("maximized");
});
$("#btn-min").addEventListener("click", (e) => {
  e.stopPropagation();
  print(`<span class="c-dim">[ minimized for 0.3 seconds — did you miss me? ]</span>`);
  hiddenInput.focus();
});
$("#btn-close").addEventListener("click", (e) => {
  e.stopPropagation();
  output.innerHTML = "";
  print(`<span class="c-dim">[ session closed — just kidding, you can't get rid of me that easily. ]</span>`);
  hiddenInput.focus();
});

/* ---------------- boot sequence ---------------- */
const BOOT_LINES = [
  `<span class="c-dim">[</span> SYSTEM <span class="c-dim">]</span> booting fedora web edition...`,
  `<span class="c-dim">[</span> SYSTEM <span class="c-dim">]</span> mounting /home/visitor`,
  `<span class="c-dim">[</span> <span class="c-green">OK</span> <span class="c-dim">]</span> loaded profile: handsomezhuzhu`,
  `<span class="c-dim">[</span> <span class="c-green">OK</span> <span class="c-dim">]</span> terminal ready`,
];

async function boot() {
  cursorEl.classList.add("no-blink");
  for (const line of BOOT_LINES) {
    print(line);
    await new Promise((r) => setTimeout(r, 220));
  }
  await new Promise((r) => setTimeout(r, 500));
  output.innerHTML = "";
  print(banner());
  print("");
  cursorEl.classList.remove("no-blink");
  hiddenInput.focus();
}

boot();
