import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

function createPNG(width, height, drawFn) {
  // RGBA buffer with filter byte 0 per row
  const rowSize = 1 + width * 4;
  const raw = Buffer.alloc(rowSize * height);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    raw[rowOffset] = 0; // Filter: None
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = drawFn(x, y, width, height);
      const pixelOffset = rowOffset + 1 + x * 4;
      raw[pixelOffset] = r;
      raw[pixelOffset + 1] = g;
      raw[pixelOffset + 2] = b;
      raw[pixelOffset + 3] = a;
    }
  }

  const compressed = zlib.deflateSync(raw);

  // PNG header
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // Bit depth: 8
  ihdr[9] = 6; // Color type: RGBA
  ihdr[10] = 0; // Compression: deflate
  ihdr[11] = 0; // Filter: standard
  ihdr[12] = 0; // Interlace: none

  const ihdrChunk = makeChunk('IHDR', ihdr);
  const idatChunk = makeChunk('IDAT', compressed);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function makeChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(4 + 4 + len + 4);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);

  const crc = crc32(chunk.subarray(4, 8 + len));
  chunk.writeInt32BE(crc, 8 + len);
  return chunk;
}

// CRC32 implementation
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) | 0;
}

// Brand icon drawer: Dark background (#121417), lime bolt ring and center dial (#C6E84B)
function drawBrandIcon(x, y, w, h) {
  const cx = w / 2;
  const cy = h / 2;
  const dx = x - cx;
  const dy = y - cy;
  const dist = Math.sqrt(dx * dx + dy * dy);

  // Background rounded rect
  const bgRadius = w * 0.2;
  const inBg = (
    Math.abs(dx) <= cx - bgRadius ||
    Math.abs(dy) <= cy - bgRadius ||
    Math.hypot(Math.max(0, Math.abs(dx) - (cx - bgRadius)), Math.max(0, Math.abs(dy) - (cy - bgRadius))) <= bgRadius
  );

  if (!inBg) return [0, 0, 0, 0];

  // Outer ring radius
  const ringR = w * 0.38;
  const ringWidth = w * 0.055;
  const onRing = Math.abs(dist - ringR) <= ringWidth / 2;

  // Lug nut bolt coordinates (5-point pattern)
  const boltR = ringR;
  const boltSize = w * 0.05;
  let onBolt = false;
  for (let i = 0; i < 5; i++) {
    const angle = (i * 72 - 90) * (Math.PI / 180);
    const bx = cx + boltR * Math.cos(angle);
    const by = cy + boltR * Math.sin(angle);
    if (Math.hypot(x - bx, y - by) <= boltSize) {
      onBolt = true;
      break;
    }
  }

  // Center hub & needle
  const hubR = w * 0.1;
  const onHub = dist <= hubR;
  const onCenterPin = dist <= hubR * 0.35;

  // Needle pointing to 2 o'clock (~35 deg from vertical)
  const needleAngle = -45 * (Math.PI / 180);
  const proj = dx * Math.cos(needleAngle + Math.PI/2) + dy * Math.sin(needleAngle + Math.PI/2);
  const along = dx * Math.cos(needleAngle) + dy * Math.sin(needleAngle);
  const onNeedle = along >= 0 && along <= ringR * 0.8 && Math.abs(proj) <= w * 0.025;

  // Lime: #C6E84B -> [198, 232, 75]
  // Dark: #121417 -> [18, 20, 23]
  if (onCenterPin) return [18, 20, 23, 255];
  if (onHub || onNeedle || onBolt || onRing) return [198, 232, 75, 255];

  return [18, 20, 23, 255];
}

const publicDir = path.resolve('public');

// Generate 180x180 apple-touch-icon
const appleTouch = createPNG(180, 180, drawBrandIcon);
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), appleTouch);

// Generate 192x192 PWA icon
const icon192 = createPNG(192, 192, drawBrandIcon);
fs.writeFileSync(path.join(publicDir, 'icon-192.png'), icon192);

// Generate 512x512 PWA icon
const icon512 = createPNG(512, 512, drawBrandIcon);
fs.writeFileSync(path.join(publicDir, 'icon-512.png'), icon512);

// Generate 512x512 Maskable icon (with more safe-area padding)
function drawMaskableIcon(x, y, w, h) {
  // Pure dark background fills full bleed
  const cx = w / 2;
  const cy = h / 2;
  const dx = x - cx;
  const dy = y - cy;
  const dist = Math.sqrt(dx * dx + dy * dy);

  // Scaled down by 0.75 for safe mask zone
  const ringR = w * 0.28;
  const ringWidth = w * 0.045;
  const onRing = Math.abs(dist - ringR) <= ringWidth / 2;

  const boltR = ringR;
  const boltSize = w * 0.04;
  let onBolt = false;
  for (let i = 0; i < 5; i++) {
    const angle = (i * 72 - 90) * (Math.PI / 180);
    const bx = cx + boltR * Math.cos(angle);
    const by = cy + boltR * Math.sin(angle);
    if (Math.hypot(x - bx, y - by) <= boltSize) {
      onBolt = true;
      break;
    }
  }

  const hubR = w * 0.075;
  const onHub = dist <= hubR;
  const onCenterPin = dist <= hubR * 0.35;

  const needleAngle = -45 * (Math.PI / 180);
  const proj = dx * Math.cos(needleAngle + Math.PI/2) + dy * Math.sin(needleAngle + Math.PI/2);
  const along = dx * Math.cos(needleAngle) + dy * Math.sin(needleAngle);
  const onNeedle = along >= 0 && along <= ringR * 0.8 && Math.abs(proj) <= w * 0.02;

  if (onCenterPin) return [18, 20, 23, 255];
  if (onHub || onNeedle || onBolt || onRing) return [198, 232, 75, 255];
  return [18, 20, 23, 255];
}

const maskable512 = createPNG(512, 512, drawMaskableIcon);
fs.writeFileSync(path.join(publicDir, 'maskable-512.png'), maskable512);

// Favicon ICO (Windows ICO containing 32x32 PNG)
const icon32 = createPNG(32, 32, drawBrandIcon);
const icoHeader = Buffer.alloc(6 + 16);
icoHeader.writeUInt16LE(0, 0); // reserved
icoHeader.writeUInt16LE(1, 2); // type: ICO
icoHeader.writeUInt16LE(1, 4); // 1 image

icoHeader.writeUInt8(32, 6); // width
icoHeader.writeUInt8(32, 7); // height
icoHeader.writeUInt8(0, 8);  // palette
icoHeader.writeUInt8(0, 9);  // reserved
icoHeader.writeUInt16LE(1, 10); // color planes
icoHeader.writeUInt16LE(32, 12); // bits per pixel
icoHeader.writeUInt32LE(icon32.length, 14); // image size in bytes
icoHeader.writeUInt32LE(22, 18); // offset to image data

fs.writeFileSync(path.join(publicDir, 'favicon.ico'), Buffer.concat([icoHeader, icon32]));

console.log('Successfully generated all brand icon deliverables: apple-touch-icon.png, icon-192.png, icon-512.png, maskable-512.png, favicon.ico');
