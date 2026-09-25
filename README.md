# zzh6 — Fedora 风格终端个人主页

一个 Fedora / GNOME 风格的交互式终端个人主页,纯静态 HTML/CSS/JS,无需构建。

灵感来源:

- [0l1v3rr/0l1v3rr.github.io](https://github.com/0l1v3rr/0l1v3rr.github.io)(Kali Linux 终端)
- [RuoxiangXu/terminal-personal-website](https://github.com/RuoxiangXu/terminal-personal-website)

## 特性

- 🖥️ Fedora Workstation 开机动画 + `fastfetch` 系统信息横幅
- ⌨️ 可交互命令行:`help` / `about` / `skills` / `projects` / `contact` / `fastfetch` / `sudo` / `coffee` 等
- ✅ Tab 自动补全(带 ghost text 预览)
- 🔄 ↑↓ 命令历史(localStorage 持久化)
- 🪟 GNOME 顶栏 + 可最大化的终端窗口
- 📱 移动端适配

## 自定义

所有个人信息集中在 `script.js` 顶部的 `config` 对象中,修改即可:

```js
const config = {
  user: "zzh",
  name: "handsomezhuzhu",
  github: "https://github.com/handsomezhuzhu",
  email: "you@example.com",
  about: [...],
  skills: {...},
  projects: [...],
};
```

## 本地预览

直接双击 `index.html`,或:

```sh
npx serve .
```

## 部署 (GitHub Pages)

仓库 Settings → Pages → Source 选择 `main` 分支根目录即可,无需任何构建步骤。

## License

MIT
