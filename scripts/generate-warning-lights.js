import fs from 'fs';
import path from 'path';

const lightsDir = path.resolve('public', 'img', 'icons', 'lights');
if (!fs.existsSync(lightsDir)) {
  fs.mkdirSync(lightsDir, { recursive: true });
}

// 16 Original Redraw Warning Lights (48px grid, rounded caps, 2.5px stroke, non-OEM)
const lights = [
  {
    id: 'oil-pressure',
    color: '#FF5D5D',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="#FF5D5D" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M8 28h16l6-10h6a4 4 0 0 1 4 4v4h-6" />
  <path d="M12 28v8h12v-8" />
  <path d="M6 36h24" />
  <circle cx="38" cy="18" r="1.5" fill="#FF5D5D" />
  <path d="M38 12c-2 3-3 4-3 6a3 3 0 0 0 6 0c0-2-1-3-3-6z" fill="#FF5D5D" />
</svg>`
  },
  {
    id: 'engine-temp',
    color: '#FF5D5D',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="#FF5D5D" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M20 10v16.5a6 6 0 1 0 8 0V10a4 4 0 1 0-8 0z" />
  <circle cx="24" cy="32" r="3" fill="#FF5D5D" />
  <path d="M24 16v13" stroke-width="2" />
  <path d="M30 12h4M30 18h4" />
  <path d="M10 40c4-2 8-2 12 0s8 2 12 0 8-2 12 0" />
</svg>`
  },
  {
    id: 'brake-system',
    color: '#FF5D5D',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="#FF5D5D" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="24" cy="24" r="13" />
  <path d="M24 17v8M24 29.5v.5" stroke-width="3" />
  <path d="M7 16a18 18 0 0 0 0 16" />
  <path d="M41 16a18 18 0 0 1 0 16" />
</svg>`
  },
  {
    id: 'battery-charge',
    color: '#FF5D5D',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="#FF5D5D" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
  <rect x="8" y="16" width="32" height="22" rx="3" />
  <path d="M14 11v5M34 11v5" stroke-width="3" />
  <path d="M14 27h6M17 24v6M30 27h4" />
</svg>`
  },
  {
    id: 'power-steering',
    color: '#FF5D5D',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="#FF5D5D" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="22" cy="24" r="14" />
  <circle cx="22" cy="24" r="3" fill="#FF5D5D" />
  <path d="M8 24h11M25 24h11M22 27v11" />
  <path d="M41 17v8M41 29.5v.5" stroke="#FF5D5D" stroke-width="3" />
</svg>`
  },
  {
    id: 'airbag-srs',
    color: '#FF5D5D',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="#FF5D5D" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="15" cy="14" r="4" />
  <path d="M8 38v-8a6 6 0 0 1 6-6h3l5 14" />
  <circle cx="31" cy="22" r="9" />
  <path d="M28 20a4 4 0 0 1 6 4" stroke-width="2" />
</svg>`
  },
  {
    id: 'check-engine',
    color: '#F2A93B',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="#F2A93B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M6 22h4v14H6z" />
  <path d="M10 20l4-4h18l4 4h4v6h-4v8h-6v4H16v-4h-6z" />
  <path d="M20 12v4M26 12v4M34 26h4" />
</svg>`
  },
  {
    id: 'abs',
    color: '#F2A93B',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="#F2A93B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="24" cy="24" r="14" />
  <path d="M7 16a18 18 0 0 0 0 16M41 16a18 18 0 0 1 0 16" />
  <text x="24" y="27" font-family="'DM Mono', monospace" font-size="9" font-weight="700" text-anchor="middle" fill="#F2A93B" stroke="none">ABS</text>
</svg>`
  },
  {
    id: 'tyre-pressure',
    color: '#F2A93B',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="#F2A93B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 16c-3 8-3 16 0 20M36 16c3 8 3 16 0 20" />
  <path d="M12 36c3 2 9 2 12 2s9 0 12-2" />
  <path d="M12 38h24" stroke-dasharray="3 3" />
  <path d="M24 17v8M24 29.5v.5" stroke-width="3" />
</svg>`
  },
  {
    id: 'traction-esp',
    color: '#F2A93B',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="#F2A93B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
  <rect x="14" y="10" width="20" height="12" rx="3" />
  <circle cx="17" cy="22" r="3" fill="#F2A93B" />
  <circle cx="31" cy="22" r="3" fill="#F2A93B" />
  <path d="M16 30c-4 2-4 6 0 8s4 6 0 8M32 30c-4 2-4 6 0 8s4 6 0 8" />
</svg>`
  },
  {
    id: 'glow-plug',
    color: '#F2A93B',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="#F2A93B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M10 28c0-8 6-12 10-4 4-8 10-4 10 4 0 5-4 8-9 8h-2c-5 0-9-3-9-8z" />
  <path d="M16 28c0-5 3-7 5-2 2-5 5-2 5 2" stroke-width="2" />
</svg>`
  },
  {
    id: 'dpf',
    color: '#F2A93B',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="#F2A93B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
  <rect x="12" y="14" width="24" height="20" rx="4" />
  <path d="M6 24h6M36 24h6" />
  <circle cx="18" cy="20" r="1.5" fill="#F2A93B" />
  <circle cx="24" cy="20" r="1.5" fill="#F2A93B" />
  <circle cx="30" cy="20" r="1.5" fill="#F2A93B" />
  <circle cx="21" cy="27" r="1.5" fill="#F2A93B" />
  <circle cx="27" cy="27" r="1.5" fill="#F2A93B" />
</svg>`
  },
  {
    id: 'coolant-level',
    color: '#F2A93B',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="#F2A93B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
  <rect x="10" y="16" width="28" height="22" rx="3" />
  <path d="M20 10h8v6h-8z" />
  <path d="M14 28c4-2 6 2 10 0s6 2 10 0" stroke-width="2" />
  <path d="M14 33c4-2 6 2 10 0s6 2 10 0" stroke-width="2" />
</svg>`
  },
  {
    id: 'transmission',
    color: '#F2A93B',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="#F2A93B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="24" cy="24" r="11" />
  <path d="M24 7v4M24 37v4M7 24h4M37 24h4M12 12l3 3M33 33l3 3M12 36l3-3M33 15l3-3" stroke-width="3" />
  <path d="M24 18v7M24 29.5v.5" stroke-width="2.5" />
</svg>`
  },
  {
    id: 'ev-high-voltage',
    color: '#FF5D5D',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="#FF5D5D" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
  <rect x="8" y="16" width="32" height="20" rx="4" />
  <path d="M4 22h4M4 30h4M40 22h4M40 30h4" />
  <path d="M26 20l-5 6h4l-3 6 7-7h-4l3-5z" fill="#FF5D5D" stroke="none" />
</svg>`
  },
  {
    id: 'service-due',
    color: '#F2A93B',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="#F2A93B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M36 12a8 8 0 0 0-11 1l-13 13a4 4 0 1 0 6 6l13-13a8 8 0 0 0 5-7z" />
  <circle cx="15" cy="33" r="2" fill="#F2A93B" />
</svg>`
  }
];

lights.forEach(l => {
  const filePath = path.join(lightsDir, `${l.id}.svg`);
  fs.writeFileSync(filePath, l.svg.trim(), 'utf8');
});

console.log(`Generated ${lights.length} original warning light icons in ${lightsDir}`);
