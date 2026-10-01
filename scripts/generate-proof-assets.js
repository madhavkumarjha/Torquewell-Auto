import fs from 'fs';
import path from 'path';

const outDir = path.resolve('public', 'img', 'proof');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// 1. Worn Brake Pad (2.5 mm friction material vs backing plate)
const padWornSvg = `<svg viewBox="0 0 400 300" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Worn brake pad inspection photo showing 2.5 mm friction material">
  <defs>
    <linearGradient id="metal-dark" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#334155" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>
    <linearGradient id="friction-worn" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#78350f" />
      <stop offset="100%" stop-color="#451a03" />
    </linearGradient>
    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#334155" stroke-width="0.5" stroke-opacity="0.3"/>
    </pattern>
  </defs>

  <rect width="400" height="300" fill="#090d16" />
  <rect width="400" height="300" fill="url(#grid)" />

  <!-- Calibration scale header -->
  <g opacity="0.6">
    <line x1="30" y1="35" x2="370" y2="35" stroke="#94a3b8" stroke-width="1" />
    <path d="M 30 30 L 30 40 M 80 32 L 80 38 M 130 32 L 130 38 M 180 32 L 180 38 M 230 32 L 230 38 M 280 32 L 280 38 M 330 32 L 330 38 M 370 30 L 370 40" stroke="#94a3b8" stroke-width="1" />
    <text x="30" y="25" fill="#94a3b8" font-family="monospace" font-size="9">0 mm</text>
    <text x="350" y="25" fill="#94a3b8" font-family="monospace" font-size="9">MICROMETER</text>
  </g>

  <!-- Steel Backing Plate (6 mm) -->
  <rect x="70" y="80" width="260" height="42" rx="4" fill="url(#metal-dark)" stroke="#64748b" stroke-width="2" />
  <circle cx="95" cy="101" r="5" fill="#090d16" stroke="#475569" stroke-width="1.5" />
  <circle cx="305" cy="101" r="5" fill="#090d16" stroke="#475569" stroke-width="1.5" />
  <text x="135" y="105" fill="#94a3b8" font-family="monospace" font-size="10" letter-spacing="1">STEEL BACKING PLATE (6.0 mm)</text>

  <!-- Worn Friction Layer (thin 2.5 mm band) -->
  <rect x="90" y="122" width="220" height="24" rx="2" fill="url(#friction-worn)" stroke="#dc2626" stroke-width="2" />
  <line x1="140" y1="126" x2="160" y2="142" stroke="#b91c1c" stroke-width="1" />
  <line x1="240" y1="124" x2="255" y2="140" stroke="#b91c1c" stroke-width="1" />
  <line x1="200" y1="122" x2="200" y2="146" stroke="#10b981" stroke-dasharray="2 2" stroke-width="1" />

  <!-- Caliper Measurement Callout -->
  <g transform="translate(140, 160)">
    <line x1="0" y1="-38" x2="0" y2="25" stroke="#ef4444" stroke-width="1.5" />
    <line x1="120" y1="-14" x2="120" y2="25" stroke="#ef4444" stroke-width="1.5" />
    <line x1="0" y1="20" x2="120" y2="20" stroke="#ef4444" stroke-width="1.5" marker-start="url(#dot)" />
    
    <rect x="25" y="6" width="70" height="28" rx="4" fill="#ef4444" />
    <text x="60" y="24" fill="#ffffff" font-family="monospace" font-weight="bold" font-size="12" text-anchor="middle">2.5 mm</text>
  </g>

  <!-- Urgency Tag -->
  <g transform="translate(40, 235)">
    <rect width="320" height="38" rx="6" fill="#450a0a" stroke="#ef4444" stroke-width="1" />
    <circle cx="20" cy="19" r="6" fill="#ef4444" />
    <text x="36" y="23" fill="#fca5a5" font-family="sans-serif" font-weight="bold" font-size="11">MEASUREMENT: 2.5 mm · MINIMUM LIMIT: 3.0 mm (NOW)</text>
  </g>
</svg>`;

// 2. New Brake Pad (12.0 mm friction material)
const padNewSvg = `<svg viewBox="0 0 400 300" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Brand new brake pad reference photo showing 12.0 mm friction material">
  <defs>
    <linearGradient id="metal-plate" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#334155" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>
    <linearGradient id="friction-new" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#475569" />
      <stop offset="100%" stop-color="#1e293b" />
    </linearGradient>
    <pattern id="grid-new" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#334155" stroke-width="0.5" stroke-opacity="0.3"/>
    </pattern>
  </defs>

  <rect width="400" height="300" fill="#090d16" />
  <rect width="400" height="300" fill="url(#grid-new)" />

  <!-- Calibration scale header -->
  <g opacity="0.6">
    <line x1="30" y1="35" x2="370" y2="35" stroke="#94a3b8" stroke-width="1" />
    <path d="M 30 30 L 30 40 M 80 32 L 80 38 M 130 32 L 130 38 M 180 32 L 180 38 M 230 32 L 230 38 M 280 32 L 280 38 M 330 32 L 330 38 M 370 30 L 370 40" stroke="#94a3b8" stroke-width="1" />
    <text x="30" y="25" fill="#94a3b8" font-family="monospace" font-size="9">FACTORY BENCHMARK SPEC</text>
    <text x="350" y="25" fill="#94a3b8" font-family="monospace" font-size="9">TORQUESPEC</text>
  </g>

  <!-- Steel Backing Plate (6 mm) with Anti-squeal shim -->
  <rect x="70" y="65" width="260" height="42" rx="4" fill="url(#metal-plate)" stroke="#64748b" stroke-width="2" />
  <rect x="80" y="62" width="240" height="6" rx="2" fill="#0ea5e9" opacity="0.8" />
  <circle cx="95" cy="86" r="5" fill="#090d16" stroke="#475569" stroke-width="1.5" />
  <circle cx="305" cy="86" r="5" fill="#090d16" stroke="#475569" stroke-width="1.5" />
  <text x="130" y="90" fill="#94a3b8" font-family="monospace" font-size="10" letter-spacing="1">STEEL BACKING + ANTI-SQUEAL SHIM</text>

  <!-- New Full Friction Layer (12.0 mm) with central dust expansion slot -->
  <rect x="90" y="107" width="220" height="85" rx="3" fill="url(#friction-new)" stroke="#10b981" stroke-width="2" />
  
  <!-- Expansion slot -->
  <rect x="196" y="107" width="8" height="65" fill="#090d16" />
  <!-- Chamfers -->
  <polygon points="90,172 105,192 90,192" fill="#090d16" />
  <polygon points="310,172 295,192 310,192" fill="#090d16" />

  <!-- Caliper Measurement Callout -->
  <g transform="translate(325, 107)">
    <line x1="5" y1="0" x2="25" y2="0" stroke="#10b981" stroke-width="1.5" />
    <line x1="5" y1="85" x2="25" y2="85" stroke="#10b981" stroke-width="1.5" />
    <line x1="20" y1="0" x2="20" y2="85" stroke="#10b981" stroke-width="1.5" />
    
    <rect x="30" y="28" width="40" height="26" rx="4" fill="#10b981" />
    <text x="50" y="45" fill="#090d16" font-family="monospace" font-weight="bold" font-size="11" text-anchor="middle">12.0</text>
  </g>

  <!-- Spec Tag -->
  <g transform="translate(40, 235)">
    <rect width="320" height="38" rx="6" fill="#064e3b" stroke="#10b981" stroke-width="1" />
    <circle cx="20" cy="19" r="6" fill="#10b981" />
    <text x="36" y="23" fill="#a7f3d0" font-family="sans-serif" font-weight="bold" font-size="11">FACTORY SPEC: 12.0 mm NEW · FULL WEAR MARGIN (OK)</text>
  </g>
</svg>`;

// 3. Worn Brake Rotor (Scoring & Edge Lip)
const discWornSvg = `<svg viewBox="0 0 400 300" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Worn brake rotor disc cross-section showing 20.4 mm thickness and outer lip">
  <rect width="400" height="300" fill="#090d16" />
  <circle cx="150" cy="150" r="110" fill="none" stroke="#334155" stroke-width="38" />
  <circle cx="150" cy="150" r="128" fill="none" stroke="#ef4444" stroke-width="4" stroke-dasharray="8 4" />
  <!-- Scoring lines -->
  <circle cx="150" cy="150" r="102" fill="none" stroke="#1e293b" stroke-width="2" />
  <circle cx="150" cy="150" r="118" fill="none" stroke="#1e293b" stroke-width="3" />
  <!-- Center hub -->
  <circle cx="150" cy="150" r="55" fill="#1e293b" stroke="#475569" stroke-width="2" />
  <circle cx="150" cy="150" r="20" fill="#090d16" />
  <circle cx="125" cy="130" r="5" fill="#475569" />
  <circle cx="175" cy="130" r="5" fill="#475569" />
  <circle cx="175" cy="170" r="5" fill="#475569" />
  <circle cx="125" cy="170" r="5" fill="#475569" />

  <!-- Callouts -->
  <g transform="translate(265, 80)">
    <line x1="-35" y1="30" x2="10" y2="10" stroke="#f59e0b" stroke-width="1.5" />
    <rect x="15" y="-5" width="115" height="32" rx="4" fill="#78350f" stroke="#f59e0b" />
    <text x="22" y="15" fill="#fde68a" font-family="monospace" font-size="10">LIP: 0.9 mm HIGH</text>
  </g>

  <g transform="translate(265, 150)">
    <line x1="-25" y1="0" x2="10" y2="0" stroke="#ef4444" stroke-width="1.5" />
    <rect x="15" y="-15" width="115" height="42" rx="4" fill="#450a0a" stroke="#ef4444" />
    <text x="22" y="2" fill="#fca5a5" font-family="monospace" font-size="10">THICKNESS: 20.4 mm</text>
    <text x="22" y="18" fill="#94a3b8" font-family="monospace" font-size="9">MIN LIMIT: 20.0 mm</text>
  </g>

  <g transform="translate(40, 260)">
    <text x="0" y="0" fill="#f59e0b" font-family="sans-serif" font-weight="bold" font-size="11">ROTOR SURFACE: MODERATE SCORING &amp; DISCARD LIP REACHED</text>
  </g>
</svg>`;

// 4. New Brake Rotor
const discNewSvg = `<svg viewBox="0 0 400 300" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Brand new precision ground brake disc rotor showing 24.0 mm nominal thickness">
  <rect width="400" height="300" fill="#090d16" />
  <circle cx="150" cy="150" r="110" fill="none" stroke="#475569" stroke-width="38" />
  <!-- Precision cross-hatch ground finish -->
  <circle cx="150" cy="150" r="128" fill="none" stroke="#10b981" stroke-width="2" />
  <circle cx="150" cy="150" r="92" fill="none" stroke="#10b981" stroke-width="1.5" />
  <circle cx="150" cy="150" r="55" fill="#334155" stroke="#64748b" stroke-width="2" />
  <circle cx="150" cy="150" r="20" fill="#090d16" />
  <circle cx="125" cy="130" r="5" fill="#64748b" />
  <circle cx="175" cy="130" r="5" fill="#64748b" />
  <circle cx="175" cy="170" r="5" fill="#64748b" />
  <circle cx="125" cy="170" r="5" fill="#64748b" />

  <!-- Callouts -->
  <g transform="translate(265, 130)">
    <line x1="-25" y1="20" x2="10" y2="20" stroke="#10b981" stroke-width="1.5" />
    <rect x="15" y="0" width="115" height="42" rx="4" fill="#064e3b" stroke="#10b981" />
    <text x="22" y="18" fill="#a7f3d0" font-family="monospace" font-size="10">NOMINAL: 24.0 mm</text>
    <text x="22" y="32" fill="#6ee7b7" font-family="monospace" font-size="9">RUNOUT &lt; 0.02 mm</text>
  </g>

  <g transform="translate(40, 260)">
    <text x="0" y="0" fill="#10b981" font-family="sans-serif" font-weight="bold" font-size="11">PRECISION GROUND VENTILATED ROTOR · FACTORY TOLERANCE (OK)</text>
  </g>
</svg>`;

// 5. Worn Tyre Tread (3.1 mm)
const tyreWornSvg = `<svg viewBox="0 0 400 300" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Worn tyre tread depth gauge inspection photo showing 3.1 mm depth">
  <rect width="400" height="300" fill="#090d16" />
  <!-- Tyre Rubber Cross section -->
  <path d="M 40 180 L 70 180 L 80 130 L 105 130 L 115 180 L 160 180 L 170 130 L 195 130 L 205 180 L 250 180 L 260 130 L 285 130 L 295 180 L 360 180 L 360 230 L 40 230 Z" fill="#1e293b" stroke="#334155" stroke-width="2" />
  <!-- Tread wear bar indicator -->
  <rect x="175" y="160" width="15" height="20" fill="#f59e0b" />
  <line x1="40" y1="160" x2="360" y2="160" stroke="#f59e0b" stroke-dasharray="4 4" stroke-width="1" />
  <text x="40" y="152" fill="#f59e0b" font-family="monospace" font-size="9">1.6 mm LEGAL MINIMUM</text>

  <!-- Calibrated Tread Depth Probe -->
  <g transform="translate(93, 70)">
    <rect x="-4" y="0" width="8" height="60" fill="#38bdf8" />
    <polygon points="0,60 -4,50 4,50" fill="#0284c7" />
    <rect x="-35" y="-35" width="70" height="35" rx="4" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5" />
    <text x="0" y="-12" fill="#38bdf8" font-family="monospace" font-weight="bold" font-size="14" text-anchor="middle">3.1 mm</text>
  </g>

  <g transform="translate(40, 260)">
    <text x="0" y="0" fill="#f59e0b" font-family="sans-serif" font-weight="bold" font-size="11">MEASURED: 3.1 mm · WET WEATHER GRIP REDUCED (SOON)</text>
  </g>
</svg>`;

// 6. New Tyre Tread (8.0 mm)
const tyreNewSvg = `<svg viewBox="0 0 400 300" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Brand new tyre tread cross-section showing 8.0 mm deep grooves">
  <rect width="400" height="300" fill="#090d16" />
  <!-- Deep tyre grooves -->
  <path d="M 40 210 L 70 210 L 80 85 L 105 85 L 115 210 L 160 210 L 170 85 L 195 85 L 205 210 L 250 210 L 260 85 L 285 85 L 295 210 L 360 210 L 360 240 L 40 240 Z" fill="#1e293b" stroke="#475569" stroke-width="2" />
  <!-- Tread depth probe -->
  <g transform="translate(93, 25)">
    <rect x="-4" y="0" width="8" height="60" fill="#10b981" />
    <polygon points="0,60 -4,50 4,50" fill="#059669" />
    <rect x="-35" y="-25" width="70" height="30" rx="4" fill="#064e3b" stroke="#10b981" stroke-width="1.5" />
    <text x="0" y="-6" fill="#a7f3d0" font-family="monospace" font-weight="bold" font-size="14" text-anchor="middle">8.0 mm</text>
  </g>

  <g transform="translate(40, 265)">
    <text x="0" y="0" fill="#10b981" font-family="sans-serif" font-weight="bold" font-size="11">NEW TYRE TREAD DEPTH: 8.0 mm · MAXIMUM WATER DISPERSAL (OK)</text>
  </g>
</svg>`;

// 7. Battery conductance tester readout
const batteryTestSvg = `<svg viewBox="0 0 400 300" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Digital battery conductance analyzer screen showing 12.4 V resting voltage and 78% SOH">
  <rect width="400" height="300" fill="#090d16" />
  <!-- Handheld Diagnostic Housing -->
  <rect x="50" y="30" width="300" height="230" rx="16" fill="#1e293b" stroke="#475569" stroke-width="3" />
  <!-- LCD Screen -->
  <rect x="75" y="55" width="250" height="150" rx="6" fill="#022c22" stroke="#065f46" stroke-width="2" />

  <text x="90" y="80" fill="#34d399" font-family="monospace" font-size="10">TORQUEWELL LAB CONDUCTANCE v4.2</text>
  <line x1="90" y1="88" x2="310" y2="88" stroke="#065f46" stroke-width="1" />

  <text x="90" y="115" fill="#6ee7b7" font-family="monospace" font-size="11">VOLTAGE REST:</text>
  <text x="210" y="115" fill="#34d399" font-family="monospace" font-weight="bold" font-size="16">12.41 V</text>

  <text x="90" y="145" fill="#6ee7b7" font-family="monospace" font-size="11">MEASURED CCA:</text>
  <text x="210" y="145" fill="#f59e0b" font-family="monospace" font-weight="bold" font-size="16">470 A</text>
  <text x="90" y="162" fill="#94a3b8" font-family="monospace" font-size="9">(RATED: 600 A CCA EN)</text>

  <text x="90" y="188" fill="#6ee7b7" font-family="monospace" font-size="11">STATE OF HEALTH:</text>
  <text x="210" y="188" fill="#f59e0b" font-family="monospace" font-weight="bold" font-size="16">78% (WATCH)</text>

  <g transform="translate(100, 230)">
    <circle cx="20" cy="15" r="5" fill="#f59e0b" />
    <text x="35" y="19" fill="#fde68a" font-family="monospace" font-size="10">RECHARGE &amp; MONITOR FOR WINTER</text>
  </g>
</svg>`;

// 8. Brake fluid refractometer / boiling tester
const fluidTestSvg = `<svg viewBox="0 0 400 300" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Digital brake fluid boiling tester reading 158 degrees C with 3.2% moisture content">
  <rect width="400" height="300" fill="#090d16" />
  <rect x="50" y="30" width="300" height="230" rx="16" fill="#1e293b" stroke="#475569" stroke-width="3" />
  <!-- LCD Screen -->
  <rect x="75" y="55" width="250" height="150" rx="6" fill="#172554" stroke="#1e40af" stroke-width="2" />

  <text x="90" y="80" fill="#60a5fa" font-family="monospace" font-size="10">HYDRAULIC BOILING TESTER</text>
  <line x1="90" y1="88" x2="310" y2="88" stroke="#1e40af" stroke-width="1" />

  <text x="90" y="115" fill="#93c5fd" font-family="monospace" font-size="11">BOILING POINT:</text>
  <text x="200" y="115" fill="#f59e0b" font-family="monospace" font-weight="bold" font-size="18">158 °C</text>
  <text x="90" y="132" fill="#94a3b8" font-family="monospace" font-size="9">(MIN SAFE BOILING: 180 °C)</text>

  <text x="90" y="160" fill="#93c5fd" font-family="monospace" font-size="11">WATER CONTENT:</text>
  <text x="200" y="160" fill="#f59e0b" font-family="monospace" font-weight="bold" font-size="16">3.2%</text>
  <text x="90" y="177" fill="#94a3b8" font-family="monospace" font-size="9">(DOT 4 FRESH: &lt; 1.5%)</text>

  <g transform="translate(100, 230)">
    <circle cx="20" cy="15" r="5" fill="#f59e0b" />
    <text x="35" y="19" fill="#fde68a" font-family="monospace" font-size="10">HYDROSCOPIC CONTAMINATION DETECTED</text>
  </g>
</svg>`;

const files = [
  { name: 'brake-pad-worn.svg', content: padWornSvg },
  { name: 'brake-pad-new.svg', content: padNewSvg },
  { name: 'brake-disc-worn.svg', content: discWornSvg },
  { name: 'brake-disc-new.svg', content: discNewSvg },
  { name: 'tyre-tread-worn.svg', content: tyreWornSvg },
  { name: 'tyre-tread-new.svg', content: tyreNewSvg },
  { name: 'battery-test.svg', content: batteryTestSvg },
  { name: 'fluid-test.svg', content: fluidTestSvg }
];

for (const f of files) {
  fs.writeFileSync(path.join(outDir, f.name), f.content, 'utf8');
  console.log(`Generated: public/img/proof/${f.name}`);
}
