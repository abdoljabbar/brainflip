// Brainflip — bundles prototype/ into ONE self-contained HTML file (fonts inlined as base64).
// Usage:
//   node tools/bundle.mjs         → dist/brainflip-level1.html (dev/preview)
//   node tools/bundle.mjs --prod  → dist/brainflip-level1.html (production: disables ?dev=1 cheats)
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const isProd = process.argv.includes('--prod');
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, 'prototype');
const out = join(root, 'dist', 'brainflip-level1.html');

let html = readFileSync(join(src, 'index.html'), 'utf8');

// <link rel="stylesheet" href="x.css"> → <style>…</style>, with url(../assets/…) fonts inlined
html = html.replace(/<link rel="stylesheet" href="([^"]+)">/g, (_, href) => {
  const cssPath = join(src, href);
  let css = readFileSync(cssPath, 'utf8');
  css = css.replace(/url\(([^)]+\.woff2)\)/g, (m, rel) => {
    const data = readFileSync(join(dirname(cssPath), rel)).toString('base64');
    return `url(data:font/woff2;base64,${data})`;
  });
  return `<style>\n${css}\n</style>`;
});

if (isProd) {
  html = html.replace('</head>', '<script>window.BF_PROD = true;</script>\n</head>');
}

// <script src="x.js"></script> → inline
html = html.replace(/<script src="([^"]+)"><\/script>/g, (_, s) => `<script>\n${readFileSync(join(src, s), 'utf8')}\n</script>`);

mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, html);
console.log(`wrote ${out} (${(html.length / 1024).toFixed(0)} KB${isProd ? ', PROD' : ''})`);
