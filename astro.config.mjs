import { defineConfig } from 'astro/config';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// Load local development vars from .dev.vars.
const __dirname = dirname(fileURLToPath(import.meta.url));
const devVarsPath = join(__dirname, '.dev.vars');

if (existsSync(devVarsPath)) {
  const content = readFileSync(devVarsPath, 'utf-8');
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim();
    if (!(key in process.env)) process.env[key] = val;
  }
}

export default defineConfig({
  output: 'static',
});
