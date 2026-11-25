// Copies the single-file build into www/ (Capacitor's webDir) for the Android app.
import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
mkdirSync(join(root, 'www'), { recursive: true });
copyFileSync(join(root, 'dist', 'brainflip-level1.html'), join(root, 'www', 'index.html'));
console.log('www/index.html ready');
