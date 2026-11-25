import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const publicDir = join(here, '..', 'public');
const assets = JSON.parse(readFileSync(join(here, 'icon-assets.json'), 'utf8'));

mkdirSync(publicDir, { recursive: true });
for (const [name, b64] of Object.entries(assets)) {
  writeFileSync(join(publicDir, name), Buffer.from(b64, 'base64'));
}
console.log('Wrote Viralaty favicon assets to public/: ' + Object.keys(assets).join(', '));
