/* ============================================================
 * Fedora 风格终端个人主页
 * 灵感来源:
 *   - https://github.com/0l1v3rr/0l1v3rr.github.io (Kali 终端)
 *   - https://github.com/RuoxiangXu/terminal-personal-website
 *
 * 个人信息全部集中在下面这个 config 对象里，改它就行。
 * ============================================================ */

const config = {
  user: "zzh",
  host: "fedora",
  name: "handsomezhuzhu",
  tagline: "开发者 / Linux 爱好者",
  github: "https://github.com/handsomezhuzhu",
  repo: "https://github.com/handsomezhuzhu/zzh6",
  email: "you@example.com", // TODO: 改成你的邮箱
  about: [
    "你好，我是 <b>handsomezhuzhu</b>。",
    "",
    "一个喜欢折腾的开发者，日常混迹于终端与编辑器之间，",
    "主力系统是 <b>Fedora Workstation</b>。",
    "",
    "兴趣方向：Web 开发、Linux、开源工具与自动化。",
  ],
  skills: {
    "Languages": ["JavaScript / TypeScript", "Python", "C", "Bash"],
    "Frontend": ["React", "Vue", "Tailwind CSS"],
    "Backend & Ops": ["Node.js", "Docker", "Nginx", "Git"],
    "Environment": ["Fedora", "GNOME", "VS Code", "Neovim"],
  },
  projects: [
    { name: "zzh6", desc: "本主页 —— Fedora 风格终端个人网站", url: "https://github.com/handsomezhuzhu/zzh6" },
    // { name: "项目名", desc: "一句话介绍", url: "https://..." },
  ],
};

/* ---------------- Fedora ASCII Logo (fastfetch 风格) ---------------- */
const FEDORA_LOGO = [
  "             .',;::::;,'.         ",
  "         .';:cccccccccccc:;,.     ",
  "      .;cccccccccccccccccccc;.    ",
  "    .:cccccccccccccccccccccccc:.  ",
  "  .;ccccccccccccc;.:dddl:.;cccc;. ",
  " .:ccccccccccccc;OWMKOOXMWd;cccc:.",
  " .:ccccccccccccc;KMMc;cc;xMMc;cccc:",
  " ,cccccccccccccc;MMM.;cc;;WW:;cccc,",
  " :cccccccccccccc;MMM.;cccccccccccc:",
  " :ccccccc;oxOOOo;MMM000k.;cccccccc:",
  " cccccc;0MMKxdd:;MMMkddc.;cccccccc;",
  " ccccc;XMO';cccc;MMM.;cccccccccccc;",
  " ccccc;MMo;ccccc;MMW.;cccccccccccc;",
  " ccccc;0MNc.ccc.xMMd;ccccccccccccc;",
  " cccccc;dNMWXXXWM0:;cccccccccccccc;",
  " ccccccccc;.;odl:.;ccccccccccccccc; ",
  " ccccccccccccccccccccccccccccccc:'  ",
  " :cccccccccccccccccccccccccc:;.     ",
  "   ':cccccccccccccccc::;,.          ",
];

/* ---------------- 工具函数 ---------------- */
const $ = (sel) => document.querySelector(sel);
const output = $("#output");
const terminal = $("#terminal");
const hiddenInput = $("#hidden-input");
const typedSpan = $("#typed");
const ghostSpan = $("#ghost");
const cursorEl = $("#cursor");

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function print(html, cls = "") {
  const div = document.createElement("div");
  div.className = "line " + cls;
  div.innerHTML = html;
  output.appendChild(div);
  scrollToBottom();
}

function printLines(html) {
  print(html);
}

function scrollToBottom() {
  terminal.scrollTop = terminal.scrollHeight;
}

function openLink(url) {
  setTimeout(() => window.open(url, "_blank")?.focus(), 800);
  return `正在打开 <a href="${url}" target="_blank" rel="noreferrer noopener">${url}</a> ...`;
}

/* fastfetch 样式: logo + 信息并排 */
function renderFastfetch() {
  const uptime = "0 天 0 小时 (刚开机)";
  const info = [
    [`<span class="c-blue c-bold">${config.user}@${config.host}</span>`, null],
    ["─".repeat(18), null],
    ["OS", "Fedora Workstation 42 x86_64"],
    ["Host", "handsomezhuzhu.github.io/zzh6"],
    ["Kernel", "6.x-custom"],
    ["Uptime", uptime],
    ["Shell", "bash (web 版)"],
    ["DE", "GNOME 48"],
    ["Terminal", "gnome-terminal"],
    ["CPU", "100% 好奇心"],
    ["Memory", "装满了想法 / 还有空余"],
    ["", ""],
    ["Name", config.name],
    ["Role", config.tagline],
    ["GitHub", `<a href="${config.github}" target="_blank" rel="noreferrer noopener">${config.github}</a>`],
  ];

  const rows = [];
  const logoWidth = Math.max(...FEDORA_LOGO.map((l) => l.length));
  const n = Math.max(FEDORA_LOGO.length, info.length);
  for (let i = 0; i < n; i++) {
    const logo = (FEDORA_LOGO[i] || "").padEnd(logoWidth);
    let right = "";
    if (info[i]) {
      if (info[i][1] === null) {
        right = info[i][0];
      } else if (info[i][0]) {
        right = `<span class="ff-key">${esc(info[i][0])}</span><span class="ff-sep">:</span>${info[i][1]}`;
      }
    }
    rows.push(
      `<span class="c-blue">${esc(logo)}</span>  ${right}`
    );
  }
  print(rows.join("\n"));
}

/* ---------------- 命令注册表 ---------------- */
const commandNames = () =>
  Object.keys(commands).filter((k) => !k.startsWith("_"));

const commands = {
  help: {
    desc: "查看所有可用命令",
    run() {
      const names = commandNames();
      const width = Math.max(...names.map((n) => n.length)) + 2;
      const lines = names.map(
        (n) => `  <span class="c-blue">${n.padEnd(width)}</span><span class="c-dim">${commands[n].desc}</span>`
      );
      return lines.join("\n");
    },
  },
  fastfetch: { desc: "显示系统信息 (别名: neofetch)", run: () => (renderFastfetch(), "") },
  neofetch: { desc: "fastfetch 的别名", run: () => commands.fastfetch.run() },
  about: { desc: "关于我", run: () => config.about.join("\n") },
  skills: {
    desc: "技术栈",
    run() {
      return Object.entries(config.skills)
        .map(([k, v]) => `<span class="c-blue c-bold">${k}</span>\n  ${v.join(" · ")}`)
        .join("\n\n");
    },
  },
  projects: {
    desc: "我的项目",
    run() {
      if (!config.projects.length) return "还没有公开项目,敬请期待。";
      return config.projects
        .map(
          (p) =>
            `  <span class="c-blue c-bold">${esc(p.name)}</span> - ${esc(p.desc)}\n    <a href="${p.url}" target="_blank" rel="noreferrer noopener">${p.url}</a>`
        )
        .join("\n\n");
    },
  },
  contact: {
    desc: "联系方式",
    run() {
      return [
        "📧 Email:  " + `<a href="mailto:${config.email}">${config.email}</a>`,
        "🐙 GitHub: " + `<a href="${config.github}" target="_blank" rel="noreferrer noopener">${config.github}</a>`,
        "",
        "输入 <span class='c-blue'>email</span> 或 <span class='c-blue'>github</span> 可直接跳转。",
      ].join("\n");
    },
  },
  github: { desc: "打开我的 GitHub", run: () => openLink(config.github) },
  repo: { desc: "打开本站源码仓库", run: () => openLink(config.repo) },
  email: { desc: "给我发邮件", run: () => openLink("mailto:" + config.email) },
  motd: {
    desc: "显示欢迎信息",
    run: () => commands._motd(),
    _skip: false,
  },
  whoami: { desc: "你是谁", run: () => "guest (但在我眼里你是特别的)" },
  pwd: { desc: "当前目录", run: () => "/home/" + config.user },
  ls: {
    desc: "列出文件",
    run: () =>
      `<span class="c-blue c-bold">about.txt  skills.txt  projects/  contact.txt</span>  <span class="c-dim">← 其实都是命令,试试</span>`,
  },
  echo: { desc: "复读机", run: (args) => esc(args.join(" ")) },
  date: { desc: "当前时间", run: () => new Date().toString() },
  uname: { desc: "系统信息", run: () => "Linux fedora 6.x-custom #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux" },
  history: {
    desc: "命令历史",
    run: () => history.map((h, i) => `  ${String(i + 1).padStart(3)}  ${esc(h)}`).join("\n"),
  },
  sudo: {
    desc: "获得 root 权限 (大概)",
    run(args) {
      if (args[0] === "rm" && args.includes("-rf")) {
        return `<span class="c-red">拒绝执行: 这个页面是无辜的。</span>`;
      }
      if (args[0] === "dnf" && args[1] === "install") {
        return `正在安装 ${esc(args.slice(2).join(" ") || "空气")} ... <span class="c-green">完毕!</span> (并没有)`;
      }
      return `<span class="c-red">guest 不在 sudoers 文件中,此事将被记录。</span> 📝`;
    },
  },
  dnf: { desc: "Fedora 包管理器", run: (args) => commands.sudo.run(["dnf", ...args]) },
  coffee: {
    desc: "煮一杯咖啡",
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
        "<span class='c-green'>咖啡煮好了,请慢用!</span>",
      ].join("\n");
    },
  },
  exit: { desc: "退出终端", run: () => "这里没有出口,你哪儿也去不了 (试试关闭页面)。" },
  clear: { desc: "清空终端", run: () => "__CLEAR__" },
};

commands._motd = () =>
  [
    `<span class="c-blue c-bold">Fedora Workstation 42 (Web Edition)</span>`,
    `欢迎使用 <b>${config.name}</b> 的个人主页。`,
    "",
    `输入 <span class="c-blue">help</span> 查看所有命令,输入 <span class="c-blue">about</span> 了解我。`,
    `支持 <span class="c-dim">Tab</span> 补全、<span class="c-dim">↑↓</span> 历史、<span class="c-dim">Ctrl+L</span> 清屏。`,
  ].join("\n");

/* ---------------- 终端交互逻辑 ---------------- */
let history = JSON.parse(localStorage.getItem("zzh6_history") || "[]");
let histIdx = history.length;
let currentInput = "";

const promptHTML = `<span class="p-bracket">[</span><span class="p-user">${config.user}</span><span class="p-at">@</span><span class="p-host">${config.host}</span> <span class="p-dir">~</span><span class="p-bracket">]</span><span class="p-dollar">$</span>`;

function renderInput() {
  typedSpan.textContent = currentInput;
  // ghost text 补全提示
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
    if (result === "__CLEAR__") {
      output.innerHTML = "";
    } else if (result) {
      print(result);
    }
  } else {
    print(`<span class="c-red">bash: ${esc(name)}: 未找到命令</span> (输入 <span class="c-blue">help</span> 查看可用命令)`);
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
document.addEventListener("click", (e) => {
  if (!window.getSelection().toString()) hiddenInput.focus();
});

/* ---------------- GNOME 顶栏时钟 ---------------- */
function tickClock() {
  const now = new Date();
  const week = ["日", "一", "二", "三", "四", "五", "六"][now.getDay()];
  const pad = (n) => String(n).padStart(2, "0");
  $("#topbar-clock").textContent =
    `周${week} ${now.getMonth() + 1}月${now.getDate()}日 ${pad(now.getHours())}:${pad(now.getMinutes())}`;
}
setInterval(tickClock, 1000);
tickClock();

/* ---------------- 窗口按钮 ---------------- */
$("#btn-max").addEventListener("click", (e) => {
  e.stopPropagation();
  $("#window").classList.toggle("maximized");
});
$("#btn-close").addEventListener("click", (e) => {
  e.stopPropagation();
  output.innerHTML = "";
  print(`<span class="c-dim">[ 会话已结束 — 开玩笑的,Fedora 才不会轻易关机。按任意键继续 ]</span>`);
  hiddenInput.focus();
});

/* ---------------- 开机启动动画 ---------------- */
const BOOT_LINES = [
  "[ <span class='c-green'>  OK  </span> ] Started GNOME Display Manager.",
  "[ <span class='c-green'>  OK  </span> ] Reached target Graphical Interface.",
  "[ <span class='c-green'>  OK  </span> ] Started handsomezhuzhu's homepage service.",
  "",
  "Fedora Workstation 42 (Web Edition)",
  "Kernel 6.x-custom on an x86_64 (tty1)",
  "",
];

async function boot() {
  cursorEl.classList.add("no-blink");
  for (const line of BOOT_LINES) {
    print(line);
    await new Promise((r) => setTimeout(r, 160));
  }
  await new Promise((r) => setTimeout(r, 400));
  output.innerHTML = "";
  renderFastfetch();
  print("");
  print(commands._motd());
  print("");
  cursorEl.classList.remove("no-blink");
  hiddenInput.focus();
}

boot();
