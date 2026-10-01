import fs from 'fs';
import path from 'path';

const manifestPath = path.resolve('assets', 'manifest.json');
const assetsDir = path.dirname(manifestPath);

if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

const initialManifest = {
  version: '1.0.0',
  description: 'Asset registry for Torquewell Auto',
  assets: [],
};

fs.writeFileSync(manifestPath, JSON.stringify(initialManifest, null, 2), 'utf8');
console.log('Generated initial assets/manifest.json');
