# qhshao17 Academic Homepage

Astro-based academic homepage for Qihao Shao (`qhshao17`).

## Design Goals

- Default English with full Chinese pages.
- Language preference and light/dark theme are saved in the browser.
- Multi-page structure for long-term maintenance.
- Research-first narrative centered on Agent Memory Benchmark.
- Engineering-lab flavor for systems work such as Qwen-vLLM optimization.
- GitHub Pages deployment without requiring a paid domain.

## Recommended Deployment

Use a project site first:

```text
https://No17Seventeen.github.io/qhshao17/
```

This avoids changing the current GitHub username. The site branding still uses:

```text
Qihao Shao · qhshao17 · QS17
```

If the GitHub username is later changed to `qhshao17`, the same site can be migrated to:

```text
https://qhshao17.github.io/
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
- Public CV source is `cv-public.tex`; the generated PDF is `public/assets/qihao-shao-cv-public.pdf`.

## Privacy

The public CV and website intentionally omit phone information.
