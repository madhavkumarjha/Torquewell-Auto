import fs from 'fs';
import path from 'path';

const denylistPath = path.resolve('scripts', 'denylist.txt');
if (!fs.existsSync(denylistPath)) {
  console.log('No denylist found, skipping check.');
  process.exit(0);
}

const denylist = fs
  .readFileSync(denylistPath, 'utf8')
  .split('\n')
  .map((line) => line.trim())
  .filter((line) => line && !line.startsWith('#'));

const scanDirs = ['src', 'public'];
let hasViolations = false;

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  for (const term of denylist) {
    if (content.toLowerCase().includes(term.toLowerCase())) {
      console.error(`[DENYLIST VIOLATION] Found prohibited term "${term}" in ${filePath}`);
      hasViolations = true;
    }
  }
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath);
    } else if (/\.(tsx?|jsx?|json|html|css|md)$/.test(entry.name)) {
      scanFile(fullPath);
    }
  }
}

for (const dir of scanDirs) {
  walkDir(path.resolve(dir));
}

if (hasViolations) {
  console.error('\nDenylist check failed! Remove prohibited terms before building.');
  process.exit(1);
} else {
  console.log('Denylist check passed: zero prohibited terms found.');
}
