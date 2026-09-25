# zzh6 — terminal-style personal homepage

A clean, glassmorphic terminal homepage with Fedora-blue accents. Pure HTML/CSS/JS — no build step.

Inspired by [0l1v3rr/0l1v3rr.github.io](https://github.com/0l1v3rr/0l1v3rr.github.io) and [RuoxiangXu/terminal-personal-website](https://github.com/RuoxiangXu/terminal-personal-website).

## Features

- Boot sequence + welcome banner
- Interactive commands: `help`, `about`, `education`, `projects`, `contact`, `cat`, `theme`, `sudo`, `coffee`, ...
- Tab autocompletion with ghost text
- ↑↓ command history (persisted in localStorage)
- Dark / light theme toggle (`theme` command or the titlebar button)
- Mobile friendly

## Customize

Everything personal lives in the `config` object at the top of `script.js` — name, role, email, links, projects. Edit and push.

## Local preview

```sh
npm install
npm run dev      # dev server with hot reload
npm run build    # production build -> dist/
npm run preview  # preview the production build
```

## Deployment

`npm run build` outputs a plain static site to `dist/` — drop it onto any static host (Nginx, Vercel, Netlify, Cloudflare Pages, ...). Served from the domain root (`base: "/"`).

## License

MIT
