import { I18n, Powertrain } from '@/types';

export interface MilestoneItem {
  id: string;
  title: I18n;
  basis: 'distance' | 'time' | 'condition';
  targetKm: number;
  everyMonths?: number;
  appliesTo: Powertrain[];
  costBand: [number, number];
  why: I18n;
  canWait: I18n;
  evidencePrompt: I18n;
  consequenceOfNeglect: I18n;
  safetyCritical: boolean;
}

export type DrivingStyle = 'standard' | 'city' | 'towing';

export const MILESTONES: MilestoneItem[] = [
  {
    id: 'm-10k-oil',
    title: { en: 'Engine Oil & Filter Service', hi: 'इंजन ऑयल व फिल्टर सर्विस' },
    basis: 'distance',
    targetKm: 10000,
    everyMonths: 12,
    appliesTo: ['petrol', 'diesel', 'hybrid'],
    costBand: [85, 135],
    safetyCritical: false,
    why: {
      en: 'Motor oil shears down chemically under heat and collects soot, unburnt fuel, and moisture. Clean oil preserves piston rings, bearings, and turbochargers.',
      hi: 'मोटर ऑयल गर्मी में पतला होकर कालिख व ईंधन जमा करता है। ताजा तेल पिस्टन रिंग्स, बेयरिंग और टर्बोचार्जर की सुरक्षा करता है।'
    },
    canWait: {
      en: 'Can safely wait 1,000–1,500 km only if dipstick inspection confirms clear amber color and correct level. Never exceed 12 months due to additive package oxidation.',
      hi: 'यदि तेल का रंग साफ है और स्तर सही है तो 1,000-1,500 किमी तक प्रतीक्षा संभव है। पर 12 माह से अधिक कभी न टालें।'
    },
    evidencePrompt: {
      en: 'Ask us to show you: Optical blotter paper spot test showing particulate dispersion and current oil viscosity reading.',
      hi: 'हमसे पूछें: तेल की शुद्धता और चिपचिपाहट जांचने वाला ब्लॉटर पेपर स्पॉट टेस्ट।'
    },
    consequenceOfNeglect: {
      en: 'Sludge formation, turbocharger oil feed starvation, premature timing chain stretch, and increased fuel consumption.',
      hi: 'इंजन में कीचड़ (स्लज) जमना, टर्बोचार्जर विफलता और समय से पहले टाइमिंग चेन का घिसना।'
    }
  },
  {
    id: 'm-10k-tyres',
    title: { en: 'Tyre Rotation & Tread Caliper Scan', hi: 'टायर रोटेशन व ट्रेड स्कैन' },
    basis: 'condition',
    targetKm: 10000,
    everyMonths: 12,
    appliesTo: ['petrol', 'diesel', 'hybrid', 'ev'],
    costBand: [35, 60],
    safetyCritical: true,
    why: {
      en: 'Front tyres steer and bear engine weight, wearing 2× faster on drive axles. Rotating tyres balances tread depth and prevents irregular shoulder cupping.',
      hi: 'आगे के टायर स्टीयरिंग और वजन के कारण दोगुना तेजी से घिसते हैं। रोटेशन से सभी टायरों की उम्र बराबर बढ़ती है।'
    },
    canWait: {
      en: 'Can safely wait if digital gauge confirms outer, center, and inner tread depths are within 0.8 mm across all four wheels.',
      hi: 'यदि सभी टायरों के ट्रेड में 0.8 मिमी से कम का अंतर है तो रोटेशन को टाला जा सकता है।'
    },
    evidencePrompt: {
      en: 'Ask us to show you: Digital 3-zone tread depth gauge readout across all 4 tyres + spare tyre inflation pressure.',
      hi: 'हमसे पूछें: सभी 4 टायरों का 3-ज़ोन डिजिटल ट्रेड डेप्th प्रिंटआउट।'
    },
    consequenceOfNeglect: {
      en: 'Premature tyre replacement, increased road noise from scalloped treads, and reduced wet-weather aquaplaning resistance.',
      hi: 'टायरों का असमय घिसना, सड़क पर शोर और बारिश में फिसलने का खतरा।'
    }
  },
  {
    id: 'm-20k-cabin',
    title: { en: 'Cabin Pollen Filter & HVAC Cleanse', hi: 'केबिन एयर फिल्टर व एसी सफाई' },
    basis: 'time',
    targetKm: 20000,
    everyMonths: 12,
    appliesTo: ['petrol', 'diesel', 'hybrid', 'ev'],
    costBand: [40, 75],
    safetyCritical: false,
    why: {
      en: 'The cabin filter traps PM2.5 particulates, diesel soot, pollen, and roadway dust before air enters your cabin.',
      hi: 'केबिन फिल्टर हवा से धूल, परागकण और प्रदूषण को अंदर आने से रोकता है।'
    },
    canWait: {
      en: 'Can safely wait 3–6 months if there is zero cabin musty odour and demisting fan performance remains strong.',
      hi: 'यदि कोई दुर्गंध नहीं है और ब्लोअर सही काम कर रहा है तो 3-6 महीने सुरक्षित प्रतीक्षा की जा सकती है।'
    },
    evidencePrompt: {
      en: 'Ask us to show you: The removed pleated filter element compared against a fresh white OE micro-filter.',
      hi: 'हमसे पूछें: पुराने काले हो चुके फिल्टर की नए सफेद फिल्टर से तुलना।'
    },
    consequenceOfNeglect: {
      en: 'Blower motor motor strain, foggy windshields during humid weather, musty bacterial smells, and poor HVAC airflow.',
      hi: 'ब्लोअर मोटर पर दबाव, बारिश में शीशों पर धुंध जमना और एसी से दुर्गंध आना।'
    }
  },
  {
    id: 'm-20k-ev-port',
    title: { en: 'EV High-Voltage Port & Interlock Scan', hi: 'ईवी हाई-वोल्टेज पोर्ट व इंटरलॉक स्कैन' },
    basis: 'condition',
    targetKm: 20000,
    everyMonths: 12,
    appliesTo: ['hybrid', 'ev'],
    costBand: [55, 95],
    safetyCritical: true,
    why: {
      en: 'Inspects CCS2/Type-2 charge port pins for arc pitting, water intrusion seals, thermal sensor calibration, and orange HV cable sheathing.',
      hi: 'चार्जिंग पोर्ट पिन, वाटरप्रूफ सील और हाई-वोल्टेज केबल की सुरक्षा का विस्तृत निरीक्षण।'
    },
    canWait: {
      en: 'Do not postpone if rapid-charging throws connection errors. Otherwise follows scheduled annual electrical safety check.',
      hi: 'यदि फास्ट चार्जिंग में कोई समस्या नहीं है तो नियमित वार्षिक जांच के साथ ही कराएं।'
    },
    evidencePrompt: {
      en: 'Ask us to show you: Macro-lens photos of charge port copper contacts and pilot line resistance diagnostic logs.',
      hi: 'हमसे पूछें: चार्जिंग पोर्ट पिन की हाई-रेजोल्यूशन तस्वीरें और डायग्नोस्टिक रिपोर्ट।'
    },
    consequenceOfNeglect: {
      en: 'Overheating charge pins causing reduced charging speeds, connector weld failures, or rapid-charger lockout.',
      hi: 'चार्जिंग पिन का गर्म होना, धीमी चार्जिंग और पोर्ट क्षति।'
    }
  },
  {
    id: 'm-30k-brake-fluid',
    title: { en: 'Brake Fluid Hygroscopic Flush', hi: 'ब्रेक फ्लूइड फ्लश (मॉइस्चर टेस्ट)' },
    basis: 'time',
    targetKm: 30000,
    everyMonths: 24,
    appliesTo: ['petrol', 'diesel', 'hybrid', 'ev'],
    costBand: [65, 95],
    safetyCritical: true,
    why: {
      en: 'Brake fluid is hygroscopic — it absorbs moisture directly through micro-pores in rubber brake flex-hoses. As water content rises above 3%, boiling point drops precipitously, risking vapor-lock pedal fade.',
      hi: 'ब्रेक फ्लूइड हवा से नमी सोखता है। 3% से अधिक नमी होने पर तेज ब्रेकिंग में पेडल स्पंज जैसा होकर ब्रेक फेल होने का जोखिम रहता है।'
    },
    canWait: {
      en: 'Cannot wait if moisture exceeds 2.5% on boiling-point tester. Can safely wait only if digital moisture probe reads under 1.5% and fluid is clear.',
      hi: 'यदि नमी 1.5% से कम है तो कुछ माह प्रतीक्षा संभव है; 2.5% से अधिक होने पर तुरंत बदलना आवश्यक है।'
    },
    evidencePrompt: {
      en: 'Ask us to show you: The digital boiling point tester readout (DOT 4 minimum safe threshold is 180°C).',
      hi: 'हमसे पूछें: डिजिटल बॉइलिंग पॉइंट टेस्टर का तापमान (न्यूनतम सुरक्षित मान 180°C)।'
    },
    consequenceOfNeglect: {
      en: 'Brake fade during prolonged downhill or emergency stops, plus internal corrosion of expensive ABS/ESP hydraulic valves.',
      hi: 'आपातकालीन ब्रेकिंग में ब्रेक फेलियर और एबीएस यूनिट में जंग लगना।'
    }
  },
  {
    id: 'm-40k-air-filter',
    title: { en: 'Engine Air Intake Filter Replacement', hi: 'इंजन एयर फिल्टर प्रतिस्थापन' },
    basis: 'distance',
    targetKm: 40000,
    everyMonths: 24,
    appliesTo: ['petrol', 'diesel', 'hybrid'],
    costBand: [45, 80],
    safetyCritical: false,
    why: {
      en: 'Restores unrestricted laminar airflow to intake manifold, protecting mass airflow (MAF) sensors and maintaining optimal combustion lambda ratio.',
      hi: 'इंजन को स्वच्छ हवा प्रदान करता है, जिससे माइलेज और पिकअप दोनों बेहतर रहते हैं।'
    },
    canWait: {
      en: 'Can safely wait 5,000 km if backlit inspection shows light transmission through pleats and airbox is free from gravel.',
      hi: 'यदि फिल्टर की परतों से रोशनी आर-पार दिख रही है तो 5,000 किमी तक सुरक्षित चलाया जा सकता है।'
    },
    evidencePrompt: {
      en: 'Ask us to show you: Backlit photo of filter media displaying particulate restriction vs clean boundary.',
      hi: 'हमसे पूछें: फिल्टर परतों में रोशनी डालकर ली गई स्थिति फोटो।'
    },
    consequenceOfNeglect: {
      en: 'Sluggish throttle response, 3–6% reduced fuel economy, and dirt contamination of hot-wire airflow sensors.',
      hi: 'माइलेज में 3-6% गिरावट और पिकअप में कमी।'
    }
  },
  {
    id: 'm-40k-diesel-fuel',
    title: { en: 'Diesel Fuel Filter & Water Trap Drain', hi: 'डीजल फ्यूल फिल्टर व वाटर ट्रैप' },
    basis: 'distance',
    targetKm: 40000,
    everyMonths: 24,
    appliesTo: ['diesel'],
    costBand: [75, 120],
    safetyCritical: true,
    why: {
      en: 'Common-rail diesel systems run at 2,000+ bar injection pressure. The fuel filter traps micro-water droplets and 2-micron particulates before they score pump plungers.',
      hi: 'कॉमन-रेल डीजल सिस्टम 2000+ बार प्रेशर पर काम करता है। फिल्टर पानी और महीन कणों से फ्यूल पंप को बचाता है।'
    },
    canWait: {
      en: 'Do not postpone past 40,000 km. Contaminated fuel ruins high-pressure pumps and piezoelectric injectors costing £2,000+.',
      hi: 'इसे 40,000 किमी से अधिक न टालें। खराब डीजल से लाखों रुपये का पंप और इंजेक्टर खराब हो सकता है।'
    },
    evidencePrompt: {
      en: 'Ask us to show you: Fuel filter housing drain bowl sediment check and fuel rail pressure sensor diagnostic stability.',
      hi: 'हमसे पूछें: फिल्टर बाउल में पानी की जांच और फ्यूल रेल प्रेशर रीडिंग।'
    },
    consequenceOfNeglect: {
      en: 'High-pressure fuel pump swarf catastrophe, fuel injector tip seizure, and engine non-start.',
      hi: 'हाई-प्रेशर पंप फेलियर और वाहन का अचानक बंद होना।'
    }
  },
  {
    id: 'm-60k-transmission',
    title: { en: 'Transmission & Differential Fluid Renewal', hi: 'ट्रांसमिशन व डिफरेंशियल फ्लूइड' },
    basis: 'distance',
    targetKm: 60000,
    everyMonths: 36,
    appliesTo: ['petrol', 'diesel', 'hybrid', 'ev'],
    costBand: [120, 210],
    safetyCritical: false,
    why: {
      en: 'Even sealed-for-life gearboxes experience clutch friction wear, thermal breakdown, and metallic shearing in gearsets.',
      hi: 'गियरबॉक्स ऑयल समय के साथ घर्षण और गर्मी के कारण अपनी चिपचिपाहट खो देता है।'
    },
    canWait: {
      en: 'Can safely wait 10,000 km for gentle highway commuters. Should be performed strictly on time for vehicles used for urban stop-and-go or towing.',
      hi: 'हाइवे ड्राइविंग वाले वाहनों के लिए 10,000 किमी टल सकता है, भारी ट्रैफिक वालों को समय पर कराना चाहिए।'
    },
    evidencePrompt: {
      en: 'Ask us to show you: Drain plug magnet inspection photo showing clutch metallic fuzz level vs clean specification.',
      hi: 'हमसे पूछें: ड्रेन प्लग चुंबक पर चिपके धातु कणों की फोटो।'
    },
    consequenceOfNeglect: {
      en: 'Jerky transmission shifts, clutch slippage, torque converter shudder, and costly gearbox overhaul.',
      hi: 'गियर बदलने में झटके लगना और ट्रांसमिशन क्लच खराब होना।'
    }
  },
  {
    id: 'm-60k-spark-std',
    title: { en: 'Standard Spark Plugs Replacement', hi: 'स्पार्क प्लग (कॉपर/निकल) सर्विस' },
    basis: 'distance',
    targetKm: 60000,
    everyMonths: 36,
    appliesTo: ['petrol', 'hybrid'],
    costBand: [80, 140],
    safetyCritical: false,
    why: {
      en: 'Worn electrode gap increases voltage demand on ignition coils, causing misfires under heavy throttle load.',
      hi: 'प्लग का गैप बढ़ जाने से इग्निशन कॉइल पर दबाव बढ़ता है और इंजन मिसफायर करता है।'
    },
    canWait: {
      en: 'Can safely wait if live OBD misfire counters read zero and feeler gauge shows electrode gap within ±0.05 mm of factory spec.',
      hi: 'यदि कोई मिसफायर कोड नहीं है और प्लग गैप सही है तो कुछ हजार किमी प्रतीक्षा संभव है।'
    },
    evidencePrompt: {
      en: 'Ask us to show you: Feeler gauge measurement photo across all 4 spark plug electrode gaps.',
      hi: 'हमसे पूछें: सभी स्पार्क प्लग के इलेक्ट्रोड गैप की फिलर गेज फोटो।'
    },
    consequenceOfNeglect: {
      en: 'Ignition coil pack burnout, unburnt fuel washing into catalytic converter, and rough cold idle.',
      hi: 'इग्निशन कॉइल का जलना और कैटेलिटिक कनवर्टर को नुकसान।'
    }
  },
  {
    id: 'm-80k-coolant',
    title: { en: 'Engine & Inverter Coolant Chemical Flush', hi: 'इंजन व इनवर्टर कूलेंट फ्लश' },
    basis: 'time',
    targetKm: 80000,
    everyMonths: 48,
    appliesTo: ['petrol', 'diesel', 'hybrid', 'ev'],
    costBand: [95, 155],
    safetyCritical: true,
    why: {
      en: 'Coolant corrosion inhibitors deplete over 4–5 years. Acidic coolant oxidizes aluminium cylinder heads, heater cores, and EV battery cooling plates.',
      hi: 'कूलेंट में मौजूद जंग-रोधी रसायन 4 साल में समाप्त हो जाते हैं, जिससे अंदर से धातु गलने लगती है।'
    },
    canWait: {
      en: 'Can safely wait if optical refractometer confirms freeze protection to -35°C and chemical pH strip reads alkaline between 7.5 and 8.5.',
      hi: 'यदि रिफ्रैक्टोमीटर पर फ्रीज पॉइंट -35°C और pH मान 7.5-8.5 है तो सुरक्षित प्रतीक्षा की जा सकती है।'
    },
    evidencePrompt: {
      en: 'Ask us to show you: Optical refractometer scale photo and litmus pH test strip colour match.',
      hi: 'हमसे पूछें: कूलेंट का ऑप्टिकल रिफ्रैक्टोमीटर और pH स्ट्रिप टेस्ट परिणाम।'
    },
    consequenceOfNeglect: {
      en: 'Internal aluminium head gasket electrolysis, water pump seal erosion, and heater matrix clogging.',
      hi: 'वाटर पंप सील खराब होना, इंजन ओवरहीटिंग और हीटर कोर जाम होना।'
    }
  },
  {
    id: 'm-80k-suspension',
    title: { en: 'Suspension Bushing & Damper Health Audit', hi: 'सस्पेंशन बुश व शॉक-एब्जॉर्बर जांच' },
    basis: 'condition',
    targetKm: 80000,
    everyMonths: 48,
    appliesTo: ['petrol', 'diesel', 'hybrid', 'ev'],
    costBand: [110, 240],
    safetyCritical: true,
    why: {
      en: 'Rubber compliance bushings perish from ozone, salt, and pothole impacts. Dampers lose nitrogen gas pressure, lengthening braking distances.',
      hi: 'सस्पेंशन बुश कटने से गाड़ी में आवाज आती है और शॉकर्स कमजोर होने से ब्रेकिंग दूरी बढ़ जाती है।'
    },
    canWait: {
      en: 'Can safely wait if rubber bushes show surface micro-checking only without torn bonded centers, and damper bodies are dry.',
      hi: 'यदि बुश फटे नहीं हैं और शॉकर्स से कोई तेल रिसाव नहीं है तो बदलना टाल सकते हैं।'
    },
    evidencePrompt: {
      en: 'Ask us to show you: Pry-bar deflection video demonstrating rubber displacement and damper body wipe test.',
      hi: 'हमसे पूछें: सस्पेंशन बुश में प्ले और शॉक-एब्जॉर्बर तेल रिसाव की वीडियो/फोटो।'
    },
    consequenceOfNeglect: {
      en: 'Increased emergency stopping distances (up to 2–3 meters), clunking over speed bumps, and rapid uneven tyre feathering.',
      hi: 'गाड़ी में खड़खड़ की आवाज, टायरों का असमान घिसना और आपातकालीन ब्रेकिंग दूरी बढ़ना।'
    }
  },
  {
    id: 'm-100k-iridium',
    title: { en: 'Long-Life Iridium Spark Plugs', hi: 'लॉन्ग-लाइफ इरिडियम स्पार्क प्लग' },
    basis: 'distance',
    targetKm: 100000,
    everyMonths: 60,
    appliesTo: ['petrol', 'hybrid'],
    costBand: [110, 185],
    safetyCritical: false,
    why: {
      en: 'Ultra-fine laser-welded iridium pins maintain exact gap up to 100k km, ensuring crisp combustion in high-compression engines.',
      hi: 'इरिडियम प्लग 1 लाख किमी तक सटीक स्पार्क देते हैं जिससे बेहतरीन पावर और माइलेज मिलती है।'
    },
    canWait: {
      en: 'Can safely wait 5,000 km if no ignition stumble or hesitation occurs during high-gear low-RPM acceleration.',
      hi: 'यदि गाड़ी बिना किसी हिचकिचाहट के सुचारू चल रही है तो 5,000 किमी तक टाल सकते हैं।'
    },
    evidencePrompt: {
      en: 'Ask us to show you: Removed plug ground electrode wear profile vs factory specified spark gap.',
      hi: 'हमसे पूछें: पुराने इरिडियम प्लग की घिसावट और नए प्लग का अंतर।'
    },
    consequenceOfNeglect: {
      en: 'Engine stutter on motorways, hard starting during winter mornings, and increased exhaust emissions.',
      hi: 'सर्दियों में देर से स्टार्ट होना, पिकअप गिरना और प्रदूषण बढ़ना।'
    }
  },
  {
    id: 'm-100k-12v-battery',
    title: { en: '12V AGM / EFB Auxiliary Battery Test', hi: '12V ऑग्जिलरी बैटरी टेस्ट व प्रतिस्थापन' },
    basis: 'time',
    targetKm: 100000,
    everyMonths: 48,
    appliesTo: ['petrol', 'diesel', 'hybrid', 'ev'],
    costBand: [90, 160],
    safetyCritical: true,
    why: {
      en: 'Even on modern EVs, the 12V battery powers safety computers, contactors, and lighting. Battery conductance drops significantly after 4–5 years.',
      hi: 'ईवी सहित सभी कारों में 12V बैटरी सुरक्षा कंप्यूटर और स्टार्टर को चलाती है। 4-5 साल में इसकी क्षमता घट जाती है।'
    },
    canWait: {
      en: 'Can safely wait if digital conductance analyzer rates battery health above 80% State of Health (SoH) and cold cranking amps exceed 550A.',
      hi: 'यदि डिजिटल टेस्टर पर बैटरी स्वास्थ्य (SoH) 80% से अधिक है तो बदलना सुरक्षित टाल सकते हैं।'
    },
    evidencePrompt: {
      en: 'Ask us to show you: Midtronics battery conductance receipt with measured Cold Cranking Amps (CCA) vs rating.',
      hi: 'हमसे पूछें: डिजिटल बैटरी टेस्टर की प्रिंटेड टेस्ट रसीद।'
    },
    consequenceOfNeglect: {
      en: 'Stranded vehicle non-start on cold mornings, power steering failure, or EV contactors unable to close.',
      hi: 'सुबह कार का स्टार्ट न होना और अचानक बीच रास्ते में बंद हो जाना।'
    }
  },
  {
    id: 'm-100k-ev-battery-soh',
    title: { en: 'EV High-Voltage Traction Battery SoH Scan', hi: 'ईवी ट्रैक्शन बैटरी सेल बैलेंस व SoH' },
    basis: 'condition',
    targetKm: 100000,
    everyMonths: 48,
    appliesTo: ['hybrid', 'ev'],
    costBand: [70, 120],
    safetyCritical: false,
    why: {
      en: 'Comprehensive cell voltage delta analysis (checking variance < 15mV across all cell groups) and pack internal resistance verification.',
      hi: 'सभी बैटरी सेल के वोल्टेज अंतर और समग्र बैटरी स्वास्थ्य (SoH) का वैज्ञानिक परीक्षण।'
    },
    canWait: {
      en: 'Follows normal annual diagnostic check. Postpone if EV range estimate matches original dashboard target within 5%.',
      hi: 'यदि ड्राइविंग रेंज सामान्य है तो इसे सामान्य सर्विस के साथ कभी भी करा सकते हैं।'
    },
    evidencePrompt: {
      en: 'Ask us to show you: 96-cell live voltage bar chart and pack internal resistance milliohm report.',
      hi: 'हमसे पूछें: 96-सेल लाइव वोल्टेज ग्राफ और इंटरनल रेजिस्टेंस रिपोर्ट।'
    },
    consequenceOfNeglect: {
      en: 'Premature degraded pack capacity, unexpected sudden range drop on highway journeys, and cell balancing lag.',
      hi: 'बैटरी क्षमता में असमय गिरावट और अचानक रेंज कम होना।'
    }
  },
  {
    id: 'm-120k-timing-belt',
    title: { en: 'Timing Belt & Water Pump Replacement Kit', hi: 'टाइमिंग बेल्ट व वाटर पंप किट' },
    basis: 'distance',
    targetKm: 120000,
    everyMonths: 72,
    appliesTo: ['petrol', 'diesel'],
    costBand: [380, 620],
    safetyCritical: true,
    why: {
      en: 'On interference engines, a snapped timing belt causes pistons to smash into open valves, destroying the entire engine within milliseconds.',
      hi: 'इंटरफेरेंस इंजन में टाइमिंग बेल्ट टूटने पर पिस्टन और वाल्व आपस में टकरा जाते हैं, जिससे पूरा इंजन नष्ट हो जाता है।'
    },
    canWait: {
      en: 'CRITICAL: DO NOT WAIT past manufacturer age/mileage ceiling. Belts degrade from inside rubber tooth cords with zero warning sound.',
      hi: 'अत्यंत महत्वपूर्ण: इसे कभी न टालें। बेल्ट अंदर से बिना किसी आवाज के अचानक टूट सकती है।'
    },
    evidencePrompt: {
      en: 'Ask us to show you: Visual inspection of belt tooth shear integrity and tensioner pulley bearing play.',
      hi: 'हमसे पूछें: बेल्ट के दांतों की स्थिति और टेंशनर बेयरिंग प्ले की जांच।'
    },
    consequenceOfNeglect: {
      en: 'Catastrophic engine failure requiring complete engine cylinder head rebuild or crate replacement (£3,500+).',
      hi: 'इंजन का पूरी तरह नष्ट होना और कई लाख रुपये का भारी नुकसान।'
    }
  },
  {
    id: 'm-120k-dpf-ash',
    title: { en: 'Diesel Particulate Filter (DPF) Ash Mass Audit', hi: 'डीजल पार्टिकुलेट फिल्टर (DPF) ऐश जांच' },
    basis: 'condition',
    targetKm: 120000,
    everyMonths: 72,
    appliesTo: ['diesel'],
    costBand: [65, 110],
    safetyCritical: false,
    why: {
      en: 'Soot burns off during active regeneration, but incombustible oil ash remains in the DPF honeycomb permanently, increasing exhaust back-pressure.',
      hi: 'डीजल फिल्टर में राख (ऐश) जमा होने से एग्जॉस्ट बैक-प्रेशर बढ़ता है और पिकअप गिरता है।'
    },
    canWait: {
      en: 'Can safely wait if live differential pressure sensor reads under 8 mbar at idle and ash mass calculation is under 45 grams.',
      hi: 'यदि आइडल पर डिफरेंशियल प्रेशर 8 mbar से कम है तो सफाई को टाला जा सकता है।'
    },
    evidencePrompt: {
      en: 'Ask us to show you: Live OBD-II differential pressure transducer graph at 2,500 RPM vs factory back-pressure spec.',
      hi: 'हमसे पूछें: 2,500 आरपीएम पर डीपीएफ सेंसर का लाइव प्रेशर ग्राफ।'
    },
    consequenceOfNeglect: {
      en: 'DPF blockage forcing limp-mode, turbocharger thrust bearing oil seal failure, and high MOT emission failure.',
      hi: 'गाड़ी का लिम्प-मोड (धीमी गति) में चले जाना और टर्बोचार्जर को नुकसान।'
    }
  },
  {
    id: 'm-160k-ev-drive-unit',
    title: { en: 'EV Drive Unit Reduction Gear Fluid Renewal', hi: 'ईवी ड्राइव यूनिट रिडक्शन गियर ऑयल' },
    basis: 'distance',
    targetKm: 160000,
    everyMonths: 96,
    appliesTo: ['ev'],
    costBand: [140, 220],
    safetyCritical: false,
    why: {
      en: 'The single-speed planetary reduction gearbox spins at up to 16,000 RPM. Fresh fluid prevents bearing micro-spalling and cools rotor internals.',
      hi: 'ईवी का रिडक्शन गियर 16,000 आरपीएम तक घूमता है। नया ऑयल गियर बेयरिंग को घिसने से बचाता है।'
    },
    canWait: {
      en: 'Can wait if factory fill is inspected as translucent without burnt smell or metallic shimmer in sample vial.',
      hi: 'यदि तेल का रंग साफ है और कोई बदबू नहीं है तो प्रतीक्षा की जा सकती है।'
    },
    evidencePrompt: {
      en: 'Ask us to show you: Sample vial of drained drive unit synthetic fluid compared to fresh factory spec lubricant.',
      hi: 'हमसे पूछें: निकाले गए गियर ऑयल के नमूने की नए ऑयल से शुद्धता तुलना।'
    },
    consequenceOfNeglect: {
      en: 'High-frequency electric motor whine, planetary gear whine, and drive motor bearing failure.',
      hi: 'मोटर से सीटी जैसी तेज आवाज आना और ड्राइव यूनिट की खराबी।'
    }
  }
];

export function getMilestonesForPowertrain(powertrain: Powertrain): MilestoneItem[] {
  return MILESTONES.filter((m) => m.appliesTo.includes(powertrain)).sort((a, b) => a.targetKm - b.targetKm);
}

export function evaluateMilestoneUrgency(
  milestone: MilestoneItem,
  currentKm: number,
  drivingStyle: DrivingStyle = 'standard'
): 'due' | 'soon' | 'watch' | 'completed' {
  // Severe city driving or towing brings wear forward by ~20%
  const multiplier = drivingStyle === 'city' ? 0.85 : drivingStyle === 'towing' ? 0.75 : 1.0;
  const effectiveTarget = milestone.targetKm * multiplier;

  if (currentKm >= effectiveTarget + 4000) {
    return 'completed';
  }
  if (currentKm >= effectiveTarget - 2000 && currentKm <= effectiveTarget + 4000) {
    return 'due';
  }
  if (currentKm < effectiveTarget - 2000 && effectiveTarget - currentKm <= 8000) {
    return 'soon';
  }
  return 'watch';
}
