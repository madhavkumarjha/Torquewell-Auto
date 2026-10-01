import { I18n, Urgency } from '@/types';

export type PartsTierKey = 'oe' | 'oeq' | 'aftermarket';

export interface PartsTierOption {
  key: PartsTierKey;
  label: I18n;
  warrantyMonths: number;
  description: I18n;
}

export const PARTS_TIERS: PartsTierOption[] = [
  {
    key: 'oe',
    label: { en: 'TorqueSpec OE (Original Equipment)', hi: 'टॉर्कस्पेक ओई (मूल उपकरण)' },
    warrantyMonths: 24,
    description: {
      en: 'Factory benchmark component made by the first-tier manufacturer that supplies vehicle assembly plants. Highest metallurgy and compound density.',
      hi: 'फैक्ट्री मानक पुर्जा जो वाहन निर्माण संयंत्रों को आपूर्ति करने वाले निर्माता द्वारा बनाया जाता है।'
    }
  },
  {
    key: 'oeq',
    label: { en: 'OE-Equivalent (Matching Quality)', hi: 'ओई-समतुल्य (समान गुणवत्ता)' },
    warrantyMonths: 24,
    description: {
      en: 'Certified to exact dimensional and performance specifications of the original component by tier-1 European aftermarket manufacturers.',
      hi: 'यूरोपीय निर्माताओं द्वारा मूल पुर्जे के सटीक माप और सुरक्षा मानकों पर प्रमाणित।'
    }
  },
  {
    key: 'aftermarket',
    label: { en: 'Quality Aftermarket (Budget Verified)', hi: 'गुणवत्ता आफ्टरमार्केट (बजट प्रमाणित)' },
    warrantyMonths: 12,
    description: {
      en: 'Safety-certified replacement part meeting full regulatory standards. Ideal for older vehicles or economical ownership budgets.',
      hi: 'सभी सुरक्षा मानकों को पूरा करने वाला किफायती विकल्प। पुराने वाहनों के लिए उपयुक्त।'
    }
  }
];

export interface FairPriceJob {
  id: string;
  findingId?: string;
  name: I18n;
  category: 'brakes' | 'tyres' | 'fluids' | 'electrical' | 'suspension' | 'service';
  urgency: Urgency;
  labourHours: [number, number]; // [minHours, maxHours]
  partsPrices: Record<PartsTierKey, [number, number]>; // [minPrice, maxPrice] in GBP
  consumables: [number, number];
  disposal: [number, number];
  vatRate: number; // 0.20 for 20% VAT
  whatCouldChangeThis: I18n[];
  whatCanWait: I18n;
  includedSteps: I18n[];
}

export const FAIR_PRICE_JOBS: FairPriceJob[] = [
  {
    id: 'job-front-pads-discs',
    findingId: 'f-bd-02',
    name: {
      en: 'Front Brake Pads & Discs (Rotors) Replacement',
      hi: 'फ्रंट ब्रेक पैड और डिस्क रोटर प्रतिस्थापन'
    },
    category: 'brakes',
    urgency: 'soon',
    labourHours: [1.2, 1.8],
    partsPrices: {
      oe: [210, 290],
      oeq: [150, 210],
      aftermarket: [110, 160]
    },
    consumables: [12, 18],
    disposal: [6, 8],
    vatRate: 0.20,
    whatCouldChangeThis: [
      {
        en: 'Heavily corroded caliper slider pins requiring ultrasonic solvent cleaning or replacement pins (+0.3 hrs).',
        hi: 'जंग लगे कैलिपर स्लाइडर पिन की सफाई या नया पिन लगाने में अतिरिक्त समय लग सकता है (+0.3 घंटे)।'
      },
      {
        en: 'Wheel hub mating surface corrosion requiring wire-wheel cleaning to achieve 0.02 mm runout specification.',
        hi: 'सटीक 0.02 मिमी रोटर रनआउट प्राप्त करने के लिए व्हील हब से जंग हटाना आवश्यक होता है।'
      }
    ],
    whatCanWait: {
      en: 'Rear brakes have 5.0 mm remaining (>50% life). They do NOT need replacement today and can safely wait 20,000 km.',
      hi: 'पीछे के ब्रेक में 5.0 मिमी घर्षण बाकी है (>50% जीवन)। उन्हें आज बदलने की कोई आवश्यकता नहीं है।'
    },
    includedSteps: [
      { en: 'Remove wheels and inspect hydraulic flexi hoses for cracking', hi: 'पहिए उतारें और हाइड्रोलिक होज की जांच करें' },
      { en: 'Measure and record old disc discard thickness & caliper pin play', hi: 'पुरानी डिस्क मोटाई और पिन ढीलेपन का माप लें' },
      { en: 'Wire-brush wheel hub to bare metal and apply ceramic anti-seize', hi: 'व्हील हब साफ करें और सिरेमिक एंटी-सीज लगाएं' },
      { en: 'Fit new discs and new pads with anti-squeal shims and new hardware', hi: 'नई डिस्क, नए पैड और एंटी-स्क्वील शिम फिट करें' },
      { en: 'Torque caliper carrier bolts to factory spec with verified click', hi: 'कैलिपर कैरियर बोल्ट को फैक्ट्री मान पर लॉक करें' },
      { en: 'Clean brake dust, road test vehicle, and perform initial bed-in cycle', hi: 'धूल साफ करें, रोड टेस्ट लें और बेड-इन प्रक्रिया पूरी करें' }
    ]
  },
  {
    id: 'job-front-pads',
    findingId: 'f-bp-01',
    name: {
      en: 'Front Brake Friction Pads Replacement (Pads Only)',
      hi: 'फ्रंट ब्रेक पैड प्रतिस्थापन (केवल पैड)'
    },
    category: 'brakes',
    urgency: 'now',
    labourHours: [0.7, 1.1],
    partsPrices: {
      oe: [75, 110],
      oeq: [50, 75],
      aftermarket: [35, 55]
    },
    consumables: [6, 10],
    disposal: [3, 5],
    vatRate: 0.20,
    whatCouldChangeThis: [
      {
        en: 'If rotor disc thickness is below 20.0 mm discard limit upon caliper removal, discs must also be replaced for safety.',
        hi: 'यदि डिस्क हटाने पर मोटाई 20.0 मिमी से कम पाई गई तो सुरक्षा के लिए डिस्क बदलना अनिवार्य होगा।'
      }
    ],
    whatCanWait: {
      en: 'If rotor disc is true and thick enough, disc replacement can safely wait.',
      hi: 'यदि डिस्क की सतह समतल और मोटी है, तो डिस्क को बाद के लिए टाला जा सकता है।'
    },
    includedSteps: [
      { en: 'Remove front calipers and extract worn pads', hi: 'कैलिपर खोलें और पुराने पैड निकालें' },
      { en: 'Clean caliper slider channels and lubricate with high-temp grease', hi: 'स्लाइडर चैनल साफ करें और ग्रीस लगाएं' },
      { en: 'Install new pad set with new retaining clips and shims', hi: 'नए पैड और क्लिप फिट करें' },
      { en: 'Torque wheel bolts in star pattern with calibrated click tool', hi: 'पहियों के नट को स्टार पैटर्न में टॉर्क से कसें' }
    ]
  },
  {
    id: 'job-tyres-front',
    findingId: 'f-ty-03',
    name: {
      en: 'Front Tyres Replacement Pair + 4-Wheel Laser Alignment',
      hi: 'आगे के 2 टायर प्रतिस्थापन + 4-व्हील लेजर अलाइनमेंट'
    },
    category: 'tyres',
    urgency: 'soon',
    labourHours: [0.8, 1.2],
    partsPrices: {
      oe: [210, 280],
      oeq: [150, 210],
      aftermarket: [110, 150]
    },
    consumables: [8, 14],
    disposal: [6, 8],
    vatRate: 0.20,
    whatCouldChangeThis: [
      {
        en: 'Seized steering tie rod adjusting sleeves requiring induction heat freeing (+0.3 hrs).',
        hi: 'टाई रॉड आस्तीन में जंग होने पर उसे गर्म कर खोलने में अतिरिक्त समय लग सकता है (+0.3 घंटे)।'
      }
    ],
    whatCanWait: {
      en: 'Rear tyres are at 4.5 mm (over 20,000 km life remaining) and do not need replacement.',
      hi: 'पीछे के टायर 4.5 मिमी हैं और उन्हें बदलने की कोई जरूरत नहीं है।'
    },
    includedSteps: [
      { en: 'Dismount worn tyres and inspect alloy rim bead seat for corrosion', hi: 'पुराने टायर उतारें और रिम बीड की जांच करें' },
      { en: 'Fit new rubber or metal valves and balance wheels on digital dynamic balancer', hi: 'नए वाल्व लगाएं और डिजिटल बैलेंसिंग करें' },
      { en: 'Mount wheels and torque lug nuts to verified manufacturer setting', hi: 'पहियों को टॉर्क से कसें' },
      { en: 'Attach 4-wheel laser optical heads and adjust front toe and camber', hi: 'लेजर ऑप्टिकल हेड लगाएं और अलाइनमेंट सेट करें' }
    ]
  },
  {
    id: 'job-brake-fluid',
    findingId: 'f-fl-04',
    name: {
      en: 'Hydraulic Brake Fluid System Pressure Bleed & Flush',
      hi: 'हाइड्रोलिक ब्रेक फ्लुइड प्रेशर फ्लश और ब्लीडिंग'
    },
    category: 'fluids',
    urgency: 'soon',
    labourHours: [0.6, 0.9],
    partsPrices: {
      oe: [24, 34],
      oeq: [18, 26],
      aftermarket: [14, 20]
    },
    consumables: [4, 8],
    disposal: [4, 6],
    vatRate: 0.20,
    whatCouldChangeThis: [
      {
        en: 'Corroded bleed nipples requiring penetrating fluid soak or micro-torch heating to prevent snapping.',
        hi: 'ब्लीड निप्पल पर जंग होने पर टूटने से बचाने के लिए विशेष तरल की आवश्यकता हो सकती है।'
      }
    ],
    whatCanWait: {
      en: 'Can wait 30–60 days before harsh winter or track driving.',
      hi: 'सर्दियों से पहले 30-60 दिनों तक टाला जा सकता है।'
    },
    includedSteps: [
      { en: 'Siphon old degraded fluid from master cylinder reservoir', hi: 'पुराना तेल मास्टर सिलेंडर से निकालें' },
      { en: 'Connect 1.5 bar pneumatic pressure bleeder with fresh low-viscosity DOT 4 fluid', hi: 'न्यूमैटिक प्रेशर ब्लीडर से ताजा तेल भरें' },
      { en: 'Flush lines in sequence from furthest wheel to nearest until clear fluid emerges', hi: 'सभी 4 पहियों से क्रमबद्ध पुराना तेल बाहर निकालें' },
      { en: 'Verify firm brake pedal resistance and test for absolute zero leaks under 50 bar test', hi: 'पेडल की मजबूती और 50 बार दबाव पर रिसाव की जांच करें' }
    ]
  },
  {
    id: 'job-battery-replace',
    findingId: 'f-el-06',
    name: {
      en: '12V Auxiliary Battery Replacement & BMS Registration',
      hi: '12V ऑक्जिलरी बैटरी प्रतिस्थापन और बीएमएस कोडिंग'
    },
    category: 'electrical',
    urgency: 'watch',
    labourHours: [0.4, 0.7],
    partsPrices: {
      oe: [140, 190],
      oeq: [105, 145],
      aftermarket: [80, 110]
    },
    consumables: [4, 6],
    disposal: [4, 6],
    vatRate: 0.20,
    whatCouldChangeThis: [
      {
        en: 'Recoding battery serial number in Battery Monitoring System (BMS) via OBD scan tool is included.',
        hi: 'स्कैन टूल से बीएमएस में नई बैटरी को कोड करना शामिल है।'
      }
    ],
    whatCanWait: {
      en: 'Current battery has 78% health. It will start fine throughout summer. Safe to defer until autumn.',
      hi: 'वर्तमान बैटरी 78% स्वस्थ है। गर्मियों में ठीक चलेगी। पतझड़ तक टालना पूरी तरह सुरक्षित है।'
    },
    includedSteps: [
      { en: 'Connect memory-saver to retain vehicle clock and radio presets', hi: 'मेमोरी सेवर लगाकर रेडियो और घड़ी की सेटिंग सुरक्षित रखें' },
      { en: 'Remove old battery and neutralise tray corrosion', hi: 'पुरानी बैटरी निकालें और ट्रे साफ करें' },
      { en: 'Install new sealed calcium/AGM battery and torque terminals', hi: 'नई बैटरी लगाएं और टर्मिनल टाइट करें' },
      { en: 'Register new battery capacity with onboard engine computer', hi: 'कार के कंप्यूटर में नई बैटरी पंजीकृत करें' }
    ]
  }
];

export const QUESTIONS_TO_ASK_ANY_GARAGE: I18n[] = [
  {
    en: 'Will you show me the worn parts (with micrometers or gauges) before disposing of them?',
    hi: 'क्या आप पुराने पुर्जे फेंकने से पहले उनकी माप और तस्वीर मुझे दिखाएंगे?'
  },
  {
    en: 'What brand and part tier is quoted, and what is the exact warranty duration in writing?',
    hi: 'कोटेशन में किस ब्रांड और टियर का पुर्जा है, और लिखित में कितनी वारंटी है?'
  },
  {
    en: 'Will you call and receive my explicit permission before doing any work not listed on this estimate?',
    hi: 'क्या इस एस्टीमेट से बाहर का कोई काम करने से पहले आप मुझसे लिखित सहमति लेंगे?'
  },
  {
    en: 'Are wheel lug nuts torqued with a calibrated torque wrench or an impact gun?',
    hi: 'क्या पहियों के नट को कैलिब्रेटेड टॉर्क रिंच से कसा गया है या इम्पैक्ट गन से?'
  },
  {
    en: 'Which items are strictly safety-critical today, and which can safely wait for my next visit?',
    hi: 'कौन सा काम आज ही कराना अनिवार्य है, और किसे अगली बार तक सुरक्षित रूप से टाला जा सकता है?'
  }
];

export function calculateJobCost(
  job: FairPriceJob,
  tier: PartsTierKey,
  labourRatePerHour: number = 90
) {
  const [minHours, maxHours] = job.labourHours;
  const minLabour = minHours * labourRatePerHour;
  const maxLabour = maxHours * labourRatePerHour;

  const [minParts, maxParts] = job.partsPrices[tier];
  const [minConsumables, maxConsumables] = job.consumables;
  const [minDisposal, maxDisposal] = job.disposal;

  const minSubtotal = minLabour + minParts + minConsumables + minDisposal;
  const maxSubtotal = maxLabour + maxParts + maxConsumables + maxDisposal;

  const minVat = minSubtotal * job.vatRate;
  const maxVat = maxSubtotal * job.vatRate;

  const minTotal = minSubtotal + minVat;
  const maxTotal = maxSubtotal + maxVat;

  return {
    minLabour,
    maxLabour,
    minParts,
    maxParts,
    minConsumables,
    maxConsumables,
    minDisposal,
    maxDisposal,
    minSubtotal,
    maxSubtotal,
    minVat,
    maxVat,
    minTotal,
    maxTotal,
    avgLabour: (minLabour + maxLabour) / 2,
    avgParts: (minParts + maxParts) / 2,
    avgConsumables: (minConsumables + maxConsumables) / 2,
    avgDisposal: (minDisposal + maxDisposal) / 2,
    avgTotal: (minTotal + maxTotal) / 2
  };
}
