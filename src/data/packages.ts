import { Package, I18n } from '@/types';

export interface ComparisonCriterion {
  id: string;
  category: I18n;
  label: I18n;
  essential: boolean;
  full: boolean;
  major: boolean;
}

export const COMPARISON_CRITERIA: ComparisonCriterion[] = [
  {
    id: 'oil-filter',
    category: { en: 'Engine & Fluids', hi: 'इंजन और तरल पदार्थ' },
    label: { en: 'Synthetic Engine Oil & OEM Filter Replacement', hi: 'सिंथेटिक इंजन तेल और ओईएम फिल्टर प्रतिस्थापन' },
    essential: true,
    full: true,
    major: true
  },
  {
    id: 'sump-washer',
    category: { en: 'Engine & Fluids', hi: 'इंजन और तरल पदार्थ' },
    label: { en: 'New Sump Plug Washer Torqued to Spec', hi: 'संप प्लग वॉशर बदला और टॉर्क पर लॉक' },
    essential: true,
    full: true,
    major: true
  },
  {
    id: 'air-filter',
    category: { en: 'Engine & Fluids', hi: 'इंजन और तरल पदार्थ' },
    label: { en: 'Engine Air Intake Filter Replacement', hi: 'इंजन एयर इनटेक फिल्टर प्रतिस्थापन' },
    essential: false,
    full: true,
    major: true
  },
  {
    id: 'cabin-filter',
    category: { en: 'Cabin Comfort', hi: 'केबिन आराम' },
    label: { en: 'Pollen / Activated Carbon Cabin Filter Replacement', hi: 'पोलन / कार्बन केबिन फिल्टर प्रतिस्थापन' },
    essential: false,
    full: true,
    major: true
  },
  {
    id: 'spark-plugs',
    category: { en: 'Ignition & Fuel', hi: 'इग्निशन और ईंधन' },
    label: { en: 'Spark Plugs (Petrol) or Fuel Filter (Diesel) Replacement', hi: 'स्पार्क प्लग (पेट्रोल) या ईंधन फिल्टर (डीजल) प्रतिस्थापन' },
    essential: false,
    full: false,
    major: true
  },
  {
    id: 'brake-fluid',
    category: { en: 'Braking & Hydraulics', hi: 'ब्रेक और हाइड्रोलिक्स' },
    label: { en: 'Hydraulic Brake Fluid Moisture Boil Test', hi: 'हाइड्रोलिक ब्रेक तेल क्वथनांक परीक्षण' },
    essential: true,
    full: true,
    major: true
  },
  {
    id: 'brake-strip',
    category: { en: 'Braking & Hydraulics', hi: 'ब्रेक और हाइड्रोलिक्स' },
    label: { en: 'Wheels Removed & Full Caliper Slider De-dusting', hi: 'पहिए उतारकर कैलिपर स्लाइडर सफाई और ग्रीसिंग' },
    essential: false,
    full: true,
    major: true
  },
  {
    id: 'coolant-test',
    category: { en: 'Engine & Fluids', hi: 'इंजन और तरल पदार्थ' },
    label: { en: 'Refractometer Coolant Freeze & pH Protection Test', hi: 'कूलेंट ठंड और अम्लीयता सुरक्षा परीक्षण' },
    essential: true,
    full: true,
    major: true
  },
  {
    id: 'battery-conductance',
    category: { en: 'Electrical', hi: 'इलेक्ट्रिकल' },
    label: { en: 'Digital Battery Conductance & Charging Alternator Test', hi: 'डिजिटल बैटरी स्वास्थ्य और अल्टरनेटर परीक्षण' },
    essential: true,
    full: true,
    major: true
  },
  {
    id: 'laser-alignment',
    category: { en: 'Tyres & Alignment', hi: 'टायर और अलाइनमेंट' },
    label: { en: '4-Wheel Laser Geometry Alignment Pre-Check', hi: '4-व्हील लेजर अलाइनमेंट प्री-चेक' },
    essential: false,
    full: false,
    major: true
  },
  {
    id: 'obd-diagnostic-scan',
    category: { en: 'Diagnostics & Software', hi: 'डायग्नोस्टिक्स' },
    label: { en: 'Full Vehicle OBD-II Fault Code Scan & Reset', hi: 'पूर्ण वाहन ओबीडी-II फॉल्ट कोड स्कैन' },
    essential: false,
    full: true,
    major: true
  },
  {
    id: 'proof-report',
    category: { en: 'Transparency & Evidence', hi: 'पारदर्शिता और प्रमाण' },
    label: { en: 'Digital Proof Report with Wear Measurements & Photos', hi: 'माप और तस्वीरों के साथ डिजिटल प्रूफ रिपोर्ट' },
    essential: true,
    full: true,
    major: true
  }
];

export const SERVICE_PACKAGES: Package[] = [
  {
    id: 'pkg-essential',
    name: {
      en: 'Essential Interim Service',
      hi: 'आवश्यक अंतरिम सर्विस'
    },
    included: [
      { en: 'Premium synthetic oil change matched to OEM specification', hi: 'ओईएम विनिर्देश अनुसार प्रीमियम सिंथेटिक तेल' },
      { en: 'OEM-specification oil filter and new sump washer', hi: 'ओईएम-मानक तेल फिल्टर और नया संप वॉशर' },
      { en: 'Brake fluid boiling point refractometer safety test', hi: 'ब्रेक द्रव क्वथनांक रिफ्रैक्टोमीटर सुरक्षा परीक्षण' },
      { en: 'Coolant freeze protection & reserve alkalinity test', hi: 'कूलेंट ठंड से सुरक्षा और गुणवत्ता जांच' },
      { en: 'Digital battery conductance test with State of Health report', hi: 'डिजिटल बैटरी स्वास्थ्य परीक्षण रिपोर्ट' },
      { en: 'Tyre tread depth gauge scans on all 4 corners + spare', hi: 'सभी 4 टायरों और स्पेयर का डिजिटल ट्रेड माप' },
      { en: 'Digital Proof Report with caliper measurements', hi: 'कैलिपर माप के साथ डिजिटल प्रूफ रिपोर्ट' }
    ],
    notIncluded: [
      { en: 'Engine air intake filter replacement', hi: 'इंजन एयर फिल्टर प्रतिस्थापन' },
      { en: 'Cabin pollen / allergen filter replacement', hi: 'केबिन पोलन फिल्टर प्रतिस्थापन' },
      { en: 'Spark plugs (petrol) or fuel filter (diesel)', hi: 'स्पार्क प्लग या डीजल फ्यूल फिल्टर' },
      { en: 'Wheel removal and brake caliper disassembly', hi: 'पहिए उतारना और कैलिपर खोलकर सफाई' },
      { en: 'Laser 4-wheel alignment adjustment', hi: 'लेजर 4-व्हील अलाइनमेंट समायोजन' }
    ],
    timeRangeMin: [60, 90],
    priceBand: [95, 145],
    assumptions: [
      { en: 'Based on standard 4-cylinder engines requiring up to 4.5 litres of synthetic oil.', hi: '4.5 लीटर तक तेल की आवश्यकता वाले मानक 4-सिलेंडर इंजनों पर आधारित।' },
      { en: 'Specialist low-SAPS or manufacturer-specific long-life oils quoted transparently if required.', hi: 'विशेष लॉन्ग-लाइफ तेलों की आवश्यकता होने पर पहले सूचित किया जाएगा।' }
    ],
    appliesTo: ['petrol', 'diesel', 'hybrid']
  },
  {
    id: 'pkg-full',
    name: {
      en: 'Comprehensive Full Service',
      hi: 'व्यापक पूर्ण सर्विस'
    },
    included: [
      { en: 'Everything in Essential Interim Service', hi: 'आवश्यक अंतरिम सर्विस की सभी चीजें शामिल' },
      { en: 'New engine air intake filter replacement', hi: 'नया इंजन एयर फिल्टर प्रतिस्थापन' },
      { en: 'New cabin pollen/activated carbon filter replacement', hi: 'नया केबिन पोलन/कार्बन फिल्टर प्रतिस्थापन' },
      { en: 'All 4 road wheels removed for caliper slider clean and pad measure', hi: 'सभी 4 पहिए उतारकर ब्रेक कैलिपर की पूरी सफाई और माप' },
      { en: 'Full vehicle OBD-II diagnostic multi-module scan', hi: 'पूर्ण वाहन ओबीडी-II डायग्नोस्टिक स्कैन' },
      { en: 'Underside chassis suspension ball joints pry-bar deflection test', hi: 'निचले सस्पेंशन जोड़ों का लचीलापन परीक्षण' },
      { en: 'Auxiliary drive belt tension and rib wear inspection', hi: 'ऑक्जिलरी ड्राइव बेल्ट खिंचाव और घिसाव जांच' }
    ],
    notIncluded: [
      { en: 'Spark plugs replacement (unless requested or due by handbook)', hi: 'स्पार्क प्लग प्रतिस्थापन (जब तक आवश्यक न हो)' },
      { en: 'Gearbox or transmission fluid drain & fill', hi: 'गियरबॉक्स ऑयल बदलना' },
      { en: 'Laser 4-wheel alignment geometry adjustment', hi: 'लेजर 4-व्हील अलाइनमेंट समायोजन' }
    ],
    timeRangeMin: [120, 180],
    priceBand: [175, 260],
    assumptions: [
      { en: 'Covers standard hatchbacks, saloons, and compact SUVs up to 2.0L.', hi: '2.0L तक की मानक कारों और एसयूवी को कवर करता है।' },
      { en: 'All replaced filters and removed parts kept for customer inspection.', hi: 'सभी बदले गए पुर्जे ग्राहक के निरीक्षण के लिए रखे जाते हैं।' }
    ],
    appliesTo: ['petrol', 'diesel', 'hybrid']
  },
  {
    id: 'pkg-major',
    name: {
      en: 'Signature Major Calibration',
      hi: 'सिग्नेचर मेजर कैलिब्रेशन सर्विस'
    },
    included: [
      { en: 'Everything in Comprehensive Full Service', hi: 'व्यापक पूर्ण सर्विस की सभी चीजें शामिल' },
      { en: 'Long-life spark plugs (petrol) or inline fuel filter (diesel)', hi: 'लॉन्ग-लाइफ स्पार्क प्लग या डीजल फ्यूल फिल्टर प्रतिस्थापन' },
      { en: 'Brake fluid complete hydraulic pressure flush and bleed', hi: 'ब्रेक द्रव का संपूर्ण प्रेशर फ्लश और ब्लीडिंग' },
      { en: '4-wheel laser alignment geometry inspection and toe adjustment', hi: '4-व्हील लेजर अलाइनमेंट जांच और समायोजन' },
      { en: 'Coolant freeze protection drain, flush, and refill', hi: 'कूलेंट फ्लश और नया शीत-रोधी द्रव भराव' },
      { en: 'Throttle body bore de-coking and idle calibration', hi: 'थ्रॉटल बॉडी सफाई और आइडल कैलिब्रेशन' },
      { en: 'Comprehensive 15-minute diagnostic road test with logbook stamp', hi: '15-मिनट का विस्तृत रोड टेस्ट और लॉगबुक स्टैम्प' }
    ],
    notIncluded: [
      { en: 'Cam belt / timing belt replacement (quoted separately if due by age/km)', hi: 'टाइमिंग बेल्ट प्रतिस्थापन (यदि देय हो तो अलग से कोटेड)' },
      { en: 'Clutch or transmission mechanical overhaul', hi: 'क्लच या गियरबॉक्स ओवरहाल' }
    ],
    timeRangeMin: [210, 300],
    priceBand: [280, 420],
    assumptions: [
      { en: 'Recommended every 24 months or 40,000 km.', hi: 'हर 24 महीने या 40,000 किमी पर अनुशंसित।' },
      { en: 'Includes Torquewell 24-Month Quality Workmanship Guarantee.', hi: 'टॉर्कवेल 24 महीने की गुणवत्ता कारीगरी गारंटी शामिल है।' }
    ],
    appliesTo: ['petrol', 'diesel', 'hybrid']
  }
];
