# qhshao17 Homepage

Astro-based homepage for Qihao Shao.

## Design Goals

- Default English with full Chinese pages.
- Language preference and light/dark theme are saved in the browser.
- Multi-page structure for long-term maintenance.
- Research-first narrative centered on Agent Memory Benchmark.
- Engineering-lab flavor for systems work such as Qwen-vLLM optimization.

## Recommended Deployment

Use a project site first:

```text
https://No17Seventeen.github.io/qhshao17/
```

The included workflow `.github/workflows/deploy.yml` builds the Astro site and deploys `dist/` to GitHub Pages after pushes to `main`.

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

On Windows PowerShell in this workspace, the verified commands were:

```powershell
npm.cmd install --registry=https://registry.npmmirror.com
$env:ASTRO_TELEMETRY_DISABLED='1'; npm.cmd run build
$env:ASTRO_TELEMETRY_DISABLED='1'; npm.cmd run dev -- --host 127.0.0.1 --port 4321
```

## Content Maintenance

- Main bilingual text lives in `src/data/site.js`.
- Notes are Markdown files under `src/pages/en/notes/` and `src/pages/zh/notes/`.
- Replace `public/assets/portrait.jpg` with a half-body portrait when available.
- Public CV sources are `cv-public.tex` and `cv-public-zh.tex`.
- Generated CV PDFs are `public/assets/qihao-shao-cv-en.pdf` and `public/assets/qihao-shao-cv-zh.pdf`.
- CV PDFs use `public/assets/cv-photo.jpg`; the homepage portrait uses `public/assets/portrait.jpg`.

## Privacy

The public CV and website intentionally omit phone information.
