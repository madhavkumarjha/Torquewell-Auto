import fs from 'fs';
import path from 'path';

const enPath = path.resolve('src', 'i18n', 'en', 'common.json');
const hiPath = path.resolve('src', 'i18n', 'hi', 'common.json');

if (!fs.existsSync(enPath) || !fs.existsSync(hiPath)) {
  console.error('Missing en or hi common.json dictionaries!');
  process.exit(1);
}

const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const hi = JSON.parse(fs.readFileSync(hiPath, 'utf8'));

function getKeys(obj, prefix = '') {
  let keys = [];
  for (const k in obj) {
    const nextKey = prefix ? `${prefix}.${k}` : k;
    if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
      keys = keys.concat(getKeys(obj[k], nextKey));
    } else {
      keys.push(nextKey);
    }
  }
  return keys;
}

const enKeys = new Set(getKeys(en));
const hiKeys = new Set(getKeys(hi));

let missingInHi = [];
for (const k of enKeys) {
  if (!hiKeys.has(k)) missingInHi.push(k);
}

let missingInEn = [];
for (const k of hiKeys) {
  if (!enKeys.has(k)) missingInEn.push(k);
}

if (missingInHi.length > 0 || missingInEn.length > 0) {
  if (missingInHi.length) console.error('Keys in EN missing in HI:', missingInHi);
  if (missingInEn.length) console.error('Keys in HI missing in EN:', missingInEn);
  process.exit(1);
} else {
  console.log(`i18n parity check passed: ${enKeys.size} keys aligned between EN and HI.`);
}
