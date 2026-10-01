import fs from 'fs';
import path from 'path';

const carDir = path.resolve('public', 'img', 'car');
const layersDir = path.join(carDir, 'layers');

if (!fs.existsSync(layersDir)) {
  fs.mkdirSync(layersDir, { recursive: true });
}

// 1. Generic Car Silhouette Base (Hatchback profile, modern, clean, zero OEM badges)
const baseSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" fill="none">
  <!-- Vehicle Silhouette Outline -->
  <path d="M120 280 C110 280 100 270 100 255 L104 220 C108 190 140 180 180 178 L260 170 C310 170 360 110 440 110 L580 110 C620 110 650 140 670 180 L700 220 C715 240 710 270 690 280 Z" fill="#1B1E23" stroke="#30353E" stroke-width="2.5" />
  <!-- Underbody rocker panel -->
  <path d="M100 275 L200 275 M310 275 L530 275 M640 275 L695 275" stroke="#98A2AE" stroke-width="4" stroke-linecap="round" />
  <!-- Window Glass Area -->
  <path d="M330 175 L380 125 L500 125 L500 175 Z" fill="#121417" stroke="#30353E" stroke-width="1.5" />
  <path d="M515 175 L515 125 L575 125 C605 125 628 145 640 175 Z" fill="#121417" stroke="#30353E" stroke-width="1.5" />
</svg>`;
fs.writeFileSync(path.join(carDir, 'base.svg'), baseSvg.trim(), 'utf8');

// 8 Discrete SVG Layers
const layers = [
  {
    id: 'chassis',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" fill="none">
  <path d="M140 270 L660 270 M180 255 L620 255 M240 255 L240 270 M560 255 L560 270" stroke="#3DB7A8" stroke-width="3.5" stroke-linecap="round" />
  <rect x="230" y="258" width="340" height="8" rx="2" fill="#3DB7A8" fill-opacity="0.3" />
</svg>`
  },
  {
    id: 'wheels',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" fill="none">
  <!-- Front Wheel Assembly -->
  <g transform="translate(255, 275)">
    <circle cx="0" cy="0" r="54" fill="#14171A" stroke="#30353E" stroke-width="8" />
    <circle cx="0" cy="0" r="42" fill="#1B1E23" stroke="#98A2AE" stroke-width="1.5" />
    <circle cx="0" cy="0" r="28" fill="#252930" stroke="#C6E84B" stroke-width="1.5" stroke-dasharray="6 4" />
    <circle cx="0" cy="0" r="8" fill="#121417" stroke="#C6E84B" stroke-width="2" />
  </g>
  <!-- Rear Wheel Assembly -->
  <g transform="translate(585, 275)">
    <circle cx="0" cy="0" r="54" fill="#14171A" stroke="#30353E" stroke-width="8" />
    <circle cx="0" cy="0" r="42" fill="#1B1E23" stroke="#98A2AE" stroke-width="1.5" />
    <circle cx="0" cy="0" r="28" fill="#252930" stroke="#C6E84B" stroke-width="1.5" stroke-dasharray="6 4" />
    <circle cx="0" cy="0" r="8" fill="#121417" stroke="#C6E84B" stroke-width="2" />
  </g>
</svg>`
  },
  {
    id: 'brakes',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" fill="none">
  <!-- Front Brake Caliper & Rotor -->
  <g transform="translate(255, 275)">
    <circle cx="0" cy="0" r="34" stroke="#98A2AE" stroke-width="3" stroke-dasharray="4 2" />
    <path d="M-24 -24 A32 32 0 0 1 -4 -32" stroke="#FF5D5D" stroke-width="10" stroke-linecap="round" />
  </g>
  <!-- Rear Brake Drum / Disc -->
  <g transform="translate(585, 275)">
    <circle cx="0" cy="0" r="30" stroke="#98A2AE" stroke-width="2.5" />
    <path d="M-20 -20 A28 28 0 0 1 -4 -28" stroke="#3DB7A8" stroke-width="8" stroke-linecap="round" />
  </g>
</svg>`
  },
  {
    id: 'suspension',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" fill="none">
  <!-- Front MacPherson Strut & Coil Spring -->
  <g transform="translate(255, 220)">
    <line x1="0" y1="-30" x2="0" y2="40" stroke="#F2A93B" stroke-width="4" stroke-linecap="round" />
    <path d="M-8 -20 Q8 -15 -8 -10 Q8 -5 -8 0 Q8 5 -8 10 Q8 15 0 25" stroke="#F2A93B" stroke-width="2.5" fill="none" />
  </g>
  <!-- Rear Shock Absorber & Torsion Spring -->
  <g transform="translate(585, 220)">
    <line x1="0" y1="-25" x2="0" y2="40" stroke="#F2A93B" stroke-width="4" stroke-linecap="round" />
    <path d="M-6 -15 Q6 -10 -6 -5 Q6 0 -6 5 Q6 10 0 20" stroke="#F2A93B" stroke-width="2.5" fill="none" />
  </g>
</svg>`
  },
  {
    id: 'engine',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" fill="none">
  <!-- Transverse Engine Block & Cylinder Head in Bay -->
  <g transform="translate(190, 200)">
    <rect x="0" y="0" width="80" height="55" rx="6" fill="#252930" stroke="#C6E84B" stroke-width="2" />
    <line x1="12" y1="12" x2="68" y2="12" stroke="#98A2AE" stroke-width="3" stroke-linecap="round" />
    <rect x="15" y="24" width="50" height="24" rx="3" fill="#121417" stroke="#30353E" stroke-width="1.5" />
    <!-- Cam pulley -->
    <circle cx="15" cy="12" r="6" fill="#C6E84B" />
  </g>
</svg>`
  },
  {
    id: 'electrics',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" fill="none">
  <!-- 12V Battery, ECU & Wire Harness Routing -->
  <rect x="150" y="195" width="28" height="22" rx="3" fill="#1B1E23" stroke="#3DB7A8" stroke-width="2" />
  <path d="M178 206 L280 206 L340 180 L620 180" stroke="#3DB7A8" stroke-width="2" stroke-dasharray="4 4" />
  <circle cx="340" cy="180" r="4" fill="#3DB7A8" />
  <circle cx="620" cy="180" r="4" fill="#3DB7A8" />
</svg>`
  },
  {
    id: 'exhaust',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" fill="none">
  <!-- Exhaust Manifold, Cat/DPF, Centre Pipe, and Rear Silencer -->
  <path d="M260 250 L300 270 L520 270 L650 270 L680 275" stroke="#98A2AE" stroke-width="4" stroke-linecap="round" />
  <rect x="330" y="264" width="45" height="12" rx="3" fill="#252930" stroke="#98A2AE" stroke-width="1.5" />
  <rect x="630" y="262" width="40" height="16" rx="4" fill="#252930" stroke="#98A2AE" stroke-width="1.5" />
</svg>`
  },
  {
    id: 'body',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" fill="none">
  <!-- Outer Body Panels, Bonnet / Hood, Doors, and Roof -->
  <path d="M120 250 C110 250 100 240 100 225 L104 200 C108 170 140 160 180 158 L260 150 C310 150 360 90 440 90 L580 90 C620 90 650 120 670 160 L700 200 C715 220 710 250 690 260 Z" fill="#1B1E23" fill-opacity="0.85" stroke="#C6E84B" stroke-width="2" />
  <!-- Door shut lines -->
  <line x1="390" y1="150" x2="380" y2="260" stroke="#30353E" stroke-width="2" />
  <line x1="530" y1="150" x2="520" y2="260" stroke="#30353E" stroke-width="2" />
</svg>`
  }
];

layers.forEach(l => {
  fs.writeFileSync(path.join(layersDir, `${l.id}.svg`), l.svg.trim(), 'utf8');
});

console.log(`Generated car base and ${layers.length} layers in ${carDir}`);
