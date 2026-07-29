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
