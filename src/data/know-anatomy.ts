import type { I18n, Powertrain } from '@/types';

export interface AnatomyHotspot {
  id: string;
  name: I18n;
  category: 'brakes' | 'powertrain' | 'suspension' | 'cooling' | 'tyres' | 'electrics' | 'exhaust';
  x: number; // percentage coordinates 0-100 on generic car silhouette
  y: number;
  appliesTo: Powertrain[];
  wearMetric?: {
    label: I18n;
    nominal: string;
    threshold: string;
    unit: string;
  };
  functionSummary: I18n;
  failureSigns: I18n[];
  maintenanceInterval: I18n;
  relatedArticleSlug: string;
}

export const ANATOMY_HOTSPOTS: AnatomyHotspot[] = [
  {
    id: 'front-brakes',
    name: { en: 'Front Disc Brakes & Calipers', hi: 'फ्रंट डिस्क ब्रेक और कैलीपर्स' },
    category: 'brakes',
    x: 24,
    y: 72,
    appliesTo: ['petrol', 'diesel', 'hybrid', 'ev'],
    wearMetric: {
      label: { en: 'Pad Friction Thickness', hi: 'पैड घर्षण मोटाई' },
      nominal: '12.0',
      threshold: '3.0',
      unit: 'mm'
    },
    functionSummary: {
      en: 'Handles 70% of vehicle braking force. Clamps high-friction pads against ventilated cast iron rotors to convert kinetic energy into heat.',
      hi: 'वाहन की 70% ब्रेकिंग शक्ति संभालता है। गतिज ऊर्जा को गर्मी में बदलने के लिए वेंटिलेटेड रोटर पर पैड दबाता है।'
    },
    failureSigns: [
      { en: 'High-pitched metallic squealing when braking', hi: 'ब्रेक लगाते समय धातु जैसी तीखी आवाज' },
      { en: 'Steering wheel shudder or vibration during high-speed stops', hi: 'तेज गति में ब्रेक लगाने पर स्टीयरिंग में कंपन' },
      { en: 'Brake pedal feels spongy or sinks low', hi: 'ब्रेक पैडल का स्पंजी महसूस होना' }
    ],
    maintenanceInterval: {
      en: 'Inspect every 12 months / 15,000 km. Replace pads at ≤ 3.0 mm.',
      hi: 'हर 12 महीने / 15,000 किमी पर जांचें। ≤ 3.0 मिमी पर पैड बदलें।'
    },
    relatedArticleSlug: 'how-brakes-work'
  },
  {
    id: 'rear-brakes',
    name: { en: 'Rear Brakes & Electronic Parking Brake', hi: 'रियर ब्रेक और इलेक्ट्रॉनिक पार्किंग ब्रेक' },
    category: 'brakes',
    x: 82,
    y: 72,
    appliesTo: ['petrol', 'diesel', 'hybrid', 'ev'],
    wearMetric: {
      label: { en: 'Pad Friction Thickness', hi: 'पैड घर्षण मोटाई' },
      nominal: '10.0',
      threshold: '2.5',
      unit: 'mm'
    },
    functionSummary: {
      en: 'Stabilises vehicle trajectory during hard braking and provides electromechanical parking lock on rear hubs.',
      hi: 'तेज ब्रेकिंग के दौरान वाहन को स्थिर रखता है और पिछले पहियों पर पार्किंग लॉक प्रदान करता है।'
    },
    failureSigns: [
      { en: 'Scraping or grinding noise from rear axle', hi: 'रियर एक्सल से घिसने की आवाज' },
      { en: 'Electronic parking brake warning light on dash', hi: 'डैशबोर्ड पर पार्किंग ब्रेक चेतावनी बत्ती' },
      { en: 'Rear wheels hot to the touch after driving', hi: 'ड्राइविंग के बाद पिछले पहियों का अत्यधिक गर्म होना' }
    ],
    maintenanceInterval: {
      en: 'Inspect every service. Slide pins cleaned and lubricated annually.',
      hi: 'हर सर्विस में जांचें। स्लाइडर पिन को सालाना साफ और लुब्रिकेट करें।'
    },
    relatedArticleSlug: 'reading-brake-pad-wear'
  },
  {
    id: 'ice-engine',
    name: { en: 'Combustion Engine & Overhead Camshafts', hi: 'दहन इंजन और ओवरहेड कैमशाफ्ट' },
    category: 'powertrain',
    x: 28,
    y: 45,
    appliesTo: ['petrol', 'diesel'],
    wearMetric: {
      label: { en: 'Oil Viscosity Breakdown', hi: 'ऑयल विस्कोसिटी गिरावट' },
      nominal: '0W-20 / 5W-30',
      threshold: '12,000 km / 12 mo',
      unit: 'interval'
    },
    functionSummary: {
      en: 'Converts chemical fuel combustion into rotational torque through pistons, crankshaft, and precision valve timing.',
      hi: 'पिस्टन, क्रैंकशाफ्ट और टाइमिंग वाल्व के जरिए ईंधन दहन को टॉर्क में बदलता है।'
    },
    failureSigns: [
      { en: 'Amber Check Engine warning light illuminated', hi: 'पीली चेक इंजन चेतावनी बत्ती' },
      { en: 'Engine ticking, tapping, or rough idle', hi: 'इंजन से खटखट की आवाज या कंपन' },
      { en: 'Blue, black, or white exhaust smoke', hi: 'नीला, काला या सफेद धुआं' }
    ],
    maintenanceInterval: {
      en: 'Synthetic oil and filter renewal every 12 months or 12,000–15,000 km.',
      hi: 'हर 12 महीने या 12,000–15,000 किमी पर तेल और फिल्टर बदलें।'
    },
    relatedArticleSlug: 'engine-oil-grades-viscosity'
  },
  {
    id: 'ev-traction-battery',
    name: { en: 'High-Voltage Traction Battery Pack (400V–800V)', hi: 'हाई-वोल्टेज ट्रैक्शन बैटरी पैक (400V–800V)' },
    category: 'powertrain',
    x: 52,
    y: 68,
    appliesTo: ['ev', 'hybrid'],
    wearMetric: {
      label: { en: 'State of Health (SOH)', hi: 'स्टेट ऑफ हेल्थ (SOH)' },
      nominal: '100',
      threshold: '70',
      unit: '%'
    },
    functionSummary: {
      en: 'Lithium-ion cell modules sealed in an underbody aluminium structural enclosure. Powers electric drive motors via high-voltage DC-to-AC inverters.',
      hi: 'एल्यूमीनियम एनक्लोजर में सील किए गए लिथियम-आयन मॉड्यूल, जो इलेक्ट्रिक ड्राइव मोटर्स को ऊर्जा देते हैं।'
    },
    failureSigns: [
      { en: 'Sudden drop in predicted range at moderate speeds', hi: 'सामान्य गति में अनुमानित रेंज में अचानक गिरावट' },
      { en: 'High-voltage isolation fault warning on instrument cluster', hi: 'हाई-वोल्टेज आइसोलेशन फॉल्ट चेतावनी' },
      { en: 'DC fast charge rate heavily throttled', hi: 'डीसी फास्ट चार्जिंग गति का बहुत धीमा होना' }
    ],
    maintenanceInterval: {
      en: 'Digital SOH conductance & cell delta voltage scan every 24 months.',
      hi: 'हर 24 महीने में डिजिटल SOH और सेल वोल्टेज अंतर की जांच।'
    },
    relatedArticleSlug: 'ev-charging-battery-myths'
  },
  {
    id: 'electric-drive-motor',
    name: { en: 'Electric Drive Motor & Inverter Assembly', hi: 'इलेक्ट्रिक ड्राइव मोटर और इन्वर्टर' },
    category: 'powertrain',
    x: 26,
    y: 52,
    appliesTo: ['ev', 'hybrid'],
    functionSummary: {
      en: 'Permanent-magnet synchronous motor providing instantaneous torque. Reverses during braking to generate regenerative electricity.',
      hi: 'तत्काल टॉर्क देने वाली परमानेंट-मैग्नेट मोटर, जो ब्रेकिंग के दौरान रीजेनेरेटिव बिजली बनाती है।'
    },
    failureSigns: [
      { en: 'High-pitched whine or grinding under acceleration', hi: 'त्वरण के दौरान तेज सीटी जैसी या घिसने की आवाज' },
      { en: 'Loss of regenerative braking strength', hi: 'रीजेनेरेटिव ब्रेकिंग क्षमता में कमी' }
    ],
    maintenanceInterval: {
      en: 'Reduction gearbox fluid check every 60,000–100,000 km.',
      hi: 'हर 60,000–100,000 किमी पर रिडक्शन गियरबॉक्स फ्लूइड की जांच।'
    },
    relatedArticleSlug: 'regenerative-braking-pads'
  },
  {
    id: 'front-suspension',
    name: { en: 'MacPherson Struts & Coil Springs', hi: 'मैकफर्सन स्ट्रट्स और कॉइल स्प्रिंग्स' },
    category: 'suspension',
    x: 25,
    y: 62,
    appliesTo: ['petrol', 'diesel', 'hybrid', 'ev'],
    wearMetric: {
      label: { en: 'Damper Hydraulic Seal Integrity', hi: 'डैम्पर हाइड्रोलिक सील अखंडता' },
      nominal: 'Dry Tube',
      threshold: 'Oil Weep / Misting',
      unit: 'visual'
    },
    functionSummary: {
      en: 'Absorbs road impact vibrations and keeps tyre contact patches firmly pinned to asphalt for directional stability.',
      hi: 'सड़क के झटकों को सोखता है और स्थिरता के लिए टायर को सड़क पर बनाए रखता है।'
    },
    failureSigns: [
      { en: 'Knocking over speed bumps or manhole covers', hi: 'गड्ढों और स्पीड ब्रेकर पर खटखट की आवाज' },
      { en: 'Car floats or bounces multiple times after dips', hi: 'गड्ढे के बाद कार का बार-बार उछलना' },
      { en: 'Uneven cupped tyre tread wear patterns', hi: 'टायरों का असमान उछाल घिसाव' }
    ],
    maintenanceInterval: {
      en: 'Inspect dampers and top mounts every 20,000 km.',
      hi: 'हर 20,000 किमी पर डैम्पर्स और टॉप माउंट की जांच करें।'
    },
    relatedArticleSlug: 'suspension-wear-signs'
  },
  {
    id: 'steering-rack',
    name: { en: 'Electric Power Steering Rack & Track Rods', hi: 'इलेक्ट्रिक पावर स्टीयरिंग रैक और ट्रैक रॉड्स' },
    category: 'suspension',
    x: 32,
    y: 60,
    appliesTo: ['petrol', 'diesel', 'hybrid', 'ev'],
    functionSummary: {
      en: 'Translates driver hand movement on steering wheel into precise wheel angle turning with electric servo assistance.',
      hi: 'स्टीयरिंग व्हील की गति को इलेक्ट्रिक मोटर सहायता से पहियों के सटीक मोड़ में बदलता है।'
    },
    failureSigns: [
      { en: 'Steering pulls to one side on level road', hi: 'समतल सड़क पर गाड़ी का एक तरफ खिंचना' },
      { en: 'Play or clunking in steering wheel centre position', hi: 'स्टीयरिंग व्हील के बीच में ढीलापन या आवाज' },
      { en: 'Power steering warning light on dash', hi: 'पावर स्टीयरिंग चेतावनी बत्ती' }
    ],
    maintenanceInterval: {
      en: 'Check ball joints and track rod ends at every inspection.',
      hi: 'हर निरीक्षण पर बॉल जॉइंट्स और ट्रैक रॉड एंड्स की जांच करें।'
    },
    relatedArticleSlug: 'why-car-pulls-to-one-side'
  },
  {
    id: 'radiator-cooling',
    name: { en: 'Radiator, Coolant Loop & Expansion Tank', hi: 'रेडिएटर, कूलेंट लूप और विस्तार टैंक' },
    category: 'cooling',
    x: 16,
    y: 50,
    appliesTo: ['petrol', 'diesel', 'hybrid', 'ev'],
    wearMetric: {
      label: { en: 'Coolant Freezing Protection', hi: 'कूलेंट फ्रीजिंग सुरक्षा' },
      nominal: '-36',
      threshold: '-20',
      unit: '°C'
    },
    functionSummary: {
      en: 'Regulates powertrain and battery thermal temperature using ethylene glycol or dielectric coolant circulating through heat exchangers.',
      hi: 'हीट एक्सचेंजर के माध्यम से कूलेंट प्रसारित करके इंजन और बैटरी का तापमान नियंत्रित करता है।'
    },
    failureSigns: [
      { en: 'Engine temperature needle rising into red warning zone', hi: 'तापमान कांटा लाल चेतावनी क्षेत्र में जाना' },
      { en: 'Sweet pancake smell from engine bay or vents', hi: 'इंजन से मीठी खुशबूदार महक (कूलेंट रिसाव)' },
      { en: 'Puddle of bright pink, green, or blue liquid under front bumper', hi: 'बंपर के नीचे गुलाबी, हरे या नीले तरल का जमाव' }
    ],
    maintenanceInterval: {
      en: 'Coolant concentration test annually; full drain & flush every 36–60 months.',
      hi: 'सालाना कूलेंट एकाग्रता जांच; हर 3-5 साल में पूर्ण फ्लश।'
    },
    relatedArticleSlug: 'coolant-and-overheating'
  },
  {
    id: 'tyres-wheels',
    name: { en: 'Radial Tyres, TPMS Sensors & 4-Wheel Geometry', hi: 'रेडियल टायर, TPMS सेंसर और 4-व्हील ज्योमेट्री' },
    category: 'tyres',
    x: 24,
    y: 80,
    appliesTo: ['petrol', 'diesel', 'hybrid', 'ev'],
    wearMetric: {
      label: { en: 'Tread Groove Depth', hi: 'ट्रेड ग्रूव गहराई' },
      nominal: '8.0',
      threshold: '3.0',
      unit: 'mm'
    },
    functionSummary: {
      en: 'The sole 4 contact patches connecting vehicle to tarmac. Governs braking distance, wet grip hydroplaning resistance, and directional stability.',
      hi: 'कार को सड़क से जोड़ने वाले एकमात्र संपर्क बिंदु। ब्रेकिंग दूरी और गीली सड़क पर पकड़ तय करते हैं।'
    },
    failureSigns: [
      { en: 'Inner or outer shoulder premature tyre baldness', hi: 'टायर के एक किनारे का समय से पहले घिस जाना' },
      { en: 'Yellow TPMS tyre pressure light illuminated', hi: 'पीली TPMS टायर प्रेशर लाइट का जलना' },
      { en: 'Vibration felt through chassis at motorway speeds', hi: 'हाईवे गति पर कंपन महसूस होना' }
    ],
    maintenanceInterval: {
      en: 'Check cold pressures monthly. 4-wheel alignment check annually.',
      hi: 'महीने में एक बार हवा का दबाव जांचें। सालाना 4-व्हील अलाइनमेंट।'
    },
    relatedArticleSlug: 'tread-depth-safety'
  },
  {
    id: '12v-battery',
    name: { en: '12-Volt Auxiliary AGM / Lead-Acid Battery', hi: '12-वोल्ट ऑक्जिलरी AGM / लेड-एसिड बैटरी' },
    category: 'electrics',
    x: 20,
    y: 42,
    appliesTo: ['petrol', 'diesel', 'hybrid', 'ev'],
    wearMetric: {
      label: { en: 'Cold Cranking Amps (CCA)', hi: 'कोल्ड क्रैंकिंग एम्प्स (CCA)' },
      nominal: '680',
      threshold: '450',
      unit: 'A'
    },
    functionSummary: {
      en: 'Powers starter motor on ICE cars and boots high-voltage contactor relays and computer ECUs in EVs and hybrids.',
      hi: 'पेट्रोल कारों में स्टार्टर मोटर और ईवी में हाई-वोल्टेज रिले व कंप्यूटरों को चालू करता है।'
    },
    failureSigns: [
      { en: 'Slow engine crank or clicking solenoid in cold weather', hi: 'सर्दियों में धीमी स्टार्टिंग या क्लिक की आवाज' },
      { en: 'Multiple random electrical error codes across dash', hi: 'डैशबोर्ड पर कई तरह की रैंडम त्रुटियां' },
      { en: 'Red battery charging warning light on dash', hi: 'लाल बैटरी चार्जिंग चेतावनी बत्ती' }
    ],
    maintenanceInterval: {
      en: 'Digital conductance SOH test at every annual service.',
      hi: 'हर वार्षिक सर्विस पर डिजिटल कंडक्टेंस टेस्ट।'
    },
    relatedArticleSlug: 'cold-weather-battery-problems'
  },
  {
    id: 'catalytic-converter',
    name: { en: 'Catalytic Converter & Exhaust Particulate Filter', hi: 'कैटेलिटिक कन्वर्टर और एग्जॉस्ट फिल्टर' },
    category: 'exhaust',
    x: 58,
    y: 74,
    appliesTo: ['petrol', 'diesel'],
    functionSummary: {
      en: 'Converts harmful carbon monoxide, unburnt hydrocarbons, and nitrogen oxides into carbon dioxide, nitrogen, and water vapour.',
      hi: 'हानिकारक गैसों को कार्बन डाइऑक्साइड और जलवाष्प में बदलता है।'
    },
    failureSigns: [
      { en: 'Flashing check engine light (imminent catalytic damage)', hi: 'चमकती चेक इंजन लाइट (कन्वर्टर को नुकसान का खतरा)' },
      { en: 'Rattling noise from underbody when revving engine', hi: 'इंजन रेव करने पर नीचे से खड़खड़ाहट' },
      { en: 'Sulphur rotten-egg odour from exhaust pipe', hi: 'साइलेंसर से सड़े अंडे जैसी गंध' }
    ],
    maintenanceInterval: {
      en: 'Inspect exhaust hangers and heat shields at every service.',
      hi: 'हर सर्विस में एग्जॉस्ट हैंगर और हीट शील्ड की जांच करें।'
    },
    relatedArticleSlug: 'check-engine-light-guide'
  }
];
