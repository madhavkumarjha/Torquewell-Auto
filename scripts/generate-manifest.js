import fs from 'fs';
import path from 'path';

const manifestPath = path.resolve('assets', 'manifest.json');
const assetsDir = path.dirname(manifestPath);

if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

const assets = [
  {
    id: "logo-primary",
    path: "public/logo-primary.svg",
    prompt: "Torquewell primary logo with 5-point lug-nut bolt ring, needle click-notch, and dual typography",
    size: "vector",
    status: "ready",
    alt: {
      en: "Torquewell Auto logo with calibrated lug bolt ring and needle click mark",
      hi: "टॉर्कवेल ऑटो लोगो - कैलिब्रेटेड व्हील नट और टॉर्क सुई"
    }
  },
  {
    id: "logo-mark",
    path: "public/logo-mark.svg",
    prompt: "Standalone 5-point lug bolt pattern ring and torque needle",
    size: "vector",
    status: "ready",
    alt: {
      en: "Torquewell Auto emblem",
      hi: "टॉर्कवेल ऑटो प्रतीक चिन्ह"
    }
  },
  {
    id: "logo-mono-dark",
    path: "public/logo-mono-dark.svg",
    prompt: "Monochrome light logo for dark graphite surfaces",
    size: "vector",
    status: "ready",
    alt: {
      en: "Torquewell Auto monochrome dark logo",
      hi: "टॉर्कवेल ऑटो मोनोक्रोम डार्क लोगो"
    }
  },
  {
    id: "logo-mono-light",
    path: "public/logo-mono-light.svg",
    prompt: "Monochrome dark ink logo for light paper surfaces",
    size: "vector",
    status: "ready",
    alt: {
      en: "Torquewell Auto monochrome light logo",
      hi: "टॉर्कवेल ऑटो मोनोक्रोम लाइट लोगो"
    }
  },
  {
    id: "logo-stacked",
    path: "public/logo-stacked.svg",
    prompt: "Stacked centered logo layout for vertical headers and badges",
    size: "vector",
    status: "ready",
    alt: {
      en: "Torquewell Auto stacked logo",
      hi: "टॉर्कवेल ऑटो स्टैक्ड लोगो"
    }
  },
  {
    id: "logo-click",
    path: "public/logo-click.svg",
    prompt: "Animated logo mark SVG featuring 72-degree ratchet rotation and tactile click flash",
    size: "vector",
    status: "ready",
    alt: {
      en: "Animated Torquewell bolt ring ratcheting to verified click",
      hi: "एनिमेटेड टॉर्कवेल बोल्ट रिंग क्लिक सत्यापन"
    }
  },
  {
    id: "favicon-svg",
    path: "public/favicon.svg",
    prompt: "Adaptive SVG favicon for browser tabs with dark/light scheme support",
    size: "vector",
    status: "ready",
    alt: {
      en: "Torquewell Auto adaptive favicon",
      hi: "टॉर्कवेल ऑटो फेविकॉन"
    }
  },
  {
    id: "hero-01",
    path: "public/img/hero/hero-01.svg",
    prompt: "Cinematic modern garage bay with vehicle on lift, overhead task lighting, and calibrated torque dial readout",
    size: "1920x1080",
    status: "ready",
    alt: {
      en: "Modern independent garage bay with vehicle on lift, overhead task lighting, and calibrated torque dial readout",
      hi: "लिफ्ट पर आधुनिक वाहन, वर्कशॉप टास्क लाइट और कैलिब्रेटेड टॉर्क डायल"
    }
  },
  {
    id: "pattern-tread",
    path: "public/img/pattern/tread.svg",
    prompt: "Subtle directional tyre tread pattern tile",
    size: "vector",
    status: "ready",
    alt: {
      en: "Directional tyre tread pattern texture",
      hi: "टायर ट्रेड पैटर्न टेक्सचर"
    }
  },
  {
    id: "pattern-ticks",
    path: "public/img/pattern/ticks.svg",
    prompt: "Calibrated micrometer tick-scale ruler texture pattern",
    size: "vector",
    status: "ready",
    alt: {
      en: "Calibrated micrometer tick-scale pattern",
      hi: "माइक्रोमीटर टिक-स्केल पैटर्न"
    }
  },
  {
    id: "car-base",
    path: "public/img/car/base.svg",
    prompt: "Generic unbranded hatchback car coordinate blueprint base silhouette",
    size: "vector",
    status: "ready",
    alt: {
      en: "Generic car coordinate blueprint outline",
      hi: "कार की सामान्य ब्लूप्रिंट रूपरेखा"
    }
  },
  {
    id: "car-chassis",
    path: "public/img/car/layers/chassis.svg",
    prompt: "Generic car high-strength steel chassis frame floor pan",
    size: "vector",
    status: "ready",
    alt: {
      en: "Chassis structural subframe",
      hi: "चेसिस सबफ्रेम"
    }
  },
  {
    id: "car-wheels",
    path: "public/img/car/layers/wheels.svg",
    prompt: "Precision wheel hubs, ventilated disc rotors, and radial tyres",
    size: "vector",
    status: "ready",
    alt: {
      en: "Wheel hubs and tyres",
      hi: "पहिए और टायर"
    }
  },
  {
    id: "car-brakes",
    path: "public/img/car/layers/brakes.svg",
    prompt: "Dual-circuit hydraulic brake lines, master cylinder, and calipers",
    size: "vector",
    status: "ready",
    alt: {
      en: "Brake hydraulic lines and calipers",
      hi: "ब्रेक हाइड्रोलिक्स व कैलीपर्स"
    }
  },
  {
    id: "car-suspension",
    path: "public/img/car/layers/suspension.svg",
    prompt: "Front MacPherson struts, coil springs, and rear multi-link dampers",
    size: "vector",
    status: "ready",
    alt: {
      en: "Suspension struts and dampers",
      hi: "सस्पेंशन स्ट्रट्स और डैम्पर्स"
    }
  },
  {
    id: "car-engine",
    path: "public/img/car/layers/engine.svg",
    prompt: "Combustion engine block and transaxle assembly",
    size: "vector",
    status: "ready",
    alt: {
      en: "Engine powertrain assembly",
      hi: "इंजन पावरट्रेन असेंबली"
    }
  },
  {
    id: "car-electrics",
    path: "public/img/car/layers/electrics.svg",
    prompt: "12V auxiliary AGM battery, alternator, and wiring harness",
    size: "vector",
    status: "ready",
    alt: {
      en: "Electrical wiring harness",
      hi: "इलेक्ट्रिकल वायरिंग हार्नेस"
    }
  },
  {
    id: "car-exhaust",
    path: "public/img/car/layers/exhaust.svg",
    prompt: "Stainless steel exhaust pipe, catalytic converter, and muffler",
    size: "vector",
    status: "ready",
    alt: {
      en: "Exhaust emission line",
      hi: "एग्जॉस्ट लाइन"
    }
  },
  {
    id: "car-body",
    path: "public/img/car/layers/body.svg",
    prompt: "Lightweight outer body panels and glass canopy",
    size: "vector",
    status: "ready",
    alt: {
      en: "Outer body shell",
      hi: "बाहरी बॉडी शेल"
    }
  },
  {
    id: "proof-pad-worn",
    path: "public/img/proof/pad-worn.svg",
    prompt: "Macro technical cross-section of severely worn brake pad measuring 2.5 mm",
    size: "vector",
    status: "ready",
    alt: {
      en: "Worn brake pad friction lining measured at 2.5 mm",
      hi: "घिसा हुआ ब्रेक पैड (2.5 मिमी माप)"
    }
  },
  {
    id: "proof-pad-new",
    path: "public/img/proof/pad-new.svg",
    prompt: "Benchmark brand new factory brake pad measuring 12.0 mm thickness",
    size: "vector",
    status: "ready",
    alt: {
      en: "Factory new brake pad measuring 12.0 mm",
      hi: "फैक्ट्री नया ब्रेक पैड (12.0 मिमी माप)"
    }
  },
  {
    id: "proof-disc-worn",
    path: "public/img/proof/disc-worn.svg",
    prompt: "Cast iron brake disc rotor with heavy outer wear lip and 20.4 mm thickness",
    size: "vector",
    status: "ready",
    alt: {
      en: "Worn brake disc with outer lip below discard limit",
      hi: "घिसी हुई ब्रेक डिस्क (लिप और न्यूनतम सीमा)"
    }
  },
  {
    id: "proof-disc-new",
    path: "public/img/proof/disc-new.svg",
    prompt: "Precision ground ventilated brake disc rotor measuring 24.0 mm",
    size: "vector",
    status: "ready",
    alt: {
      en: "New precision ground ventilated brake disc",
      hi: "नई वेंटिलेटेड ब्रेक डिस्क"
    }
  },
  {
    id: "proof-tyre-worn",
    path: "public/img/proof/tyre-worn.svg",
    prompt: "Worn tyre tread profile measuring 3.1 mm with water evacuation loss",
    size: "vector",
    status: "ready",
    alt: {
      en: "Worn tyre tread profile measuring 3.1 mm",
      hi: "घिसा हुआ टायर ट्रेड (3.1 मिमी)"
    }
  },
  {
    id: "proof-tyre-new",
    path: "public/img/proof/tyre-new.svg",
    prompt: "Deep new radial tyre tread profile measuring 8.0 mm",
    size: "vector",
    status: "ready",
    alt: {
      en: "New radial tyre tread profile at 8.0 mm",
      hi: "नया टायर ट्रेड (8.0 मिमी)"
    }
  },
  {
    id: "proof-battery-tester",
    path: "public/img/proof/battery-tester.svg",
    prompt: "Digital conductance battery tester screen showing 12.4V and 78% SOH",
    size: "vector",
    status: "ready",
    alt: {
      en: "Digital battery conductance analyzer readout",
      hi: "डिजिटल बैटरी विश्लेषक स्क्रीन"
    }
  },
  {
    id: "proof-fluid-tester",
    path: "public/img/proof/fluid-tester.svg",
    prompt: "Digital optical refractometer boiling point tester reading 158°C",
    size: "vector",
    status: "ready",
    alt: {
      en: "Digital brake fluid boiling point tester display",
      hi: "डिजिटल ब्रेक द्रव क्वथनांक डिस्प्ले"
    }
  }
];

const manifest = {
  version: "1.0.0",
  description: "Asset registry for Torquewell Auto",
  assets: assets
};

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
console.log(`Generated assets/manifest.json with ${assets.length} verified assets.`);
