import { I18n } from '@/types';

export interface Vacancy {
  id: string;
  title: I18n;
  department: string;
  branch: string;
  salaryBand: [number, number];
  type: string;
  summary: I18n;
  responsibilities: I18n[];
  requirements: I18n[];
  benefits: I18n[];
}

export interface ApprenticeStage {
  year: number;
  title: I18n;
  focus: I18n;
  milestones: I18n[];
  toolsIssued: string[];
}

export const CULTURE_PILLARS: { icon: string; title: I18n; description: I18n }[] = [
  {
    icon: '🚫💰',
    title: { en: 'Zero Upsell Commission Culture', hi: 'शून्य अपसेल कमीशन संस्कृति' },
    description: {
      en: 'Our technicians are never paid commissions or bonus incentives on parts sold. You are judged strictly on diagnostic accuracy, torque compliance, and customer trust.',
      hi: 'हमारे तकनीशियनों को कभी भी पुर्जे बेचने पर कमीशन नहीं दिया जाता। केवल सटीक निदान और काम की गुणवत्ता ही मायने रखती है।'
    }
  },
  {
    icon: '🛠️📐',
    title: { en: 'Full Calibrated Tooling Suite', hi: 'कंपनी द्वारा प्रदत्त कैलिब्रेटेड टूल्स' },
    description: {
      en: 'Never spend your own paycheck on torque wrenches or digital calipers. Torquewell equips you with a personal Snap-on/Norbar tool suite, calibrated annually to ISO 6789.',
      hi: 'अपने पैसे से टूल्स खरीदने की आवश्यकता नहीं। प्रत्येक तकनीशियन को प्रमाणित टूल्स किट दी जाती है।'
    }
  },
  {
    icon: '⚡🎓',
    title: { en: '100% Funded EV & Diagnostic Sponsorship', hi: '100% प्रायोजित उच्च प्रशिक्षण' },
    description: {
      en: 'We fully sponsor accredited high-voltage EV isolation, oscilloscope telemetry, and diagnostic certifications with paid study days.',
      hi: 'ईवी और हाई-वोल्टेज डायग्नोस्टिक प्रमाणन का पूरा खर्च कंपनी द्वारा वहन किया जाता है।'
    }
  },
  {
    icon: '⏱️🌿',
    title: { en: '4-Day Flexible Work Week', hi: '4-दिवसीय लचीला कार्य सप्ताह' },
    description: {
      en: 'Choose a 4× 9.5-hour compressed shift pattern with 3 consecutive days off every single week to spend with family and hobbies.',
      hi: 'सप्ताह में 4 दिन काम और 3 लगातार दिन की छुट्टी का विकल्प।'
    }
  }
];

export const APPRENTICE_ROADMAP: ApprenticeStage[] = [
  {
    year: 1,
    title: { en: 'Year 1: Workshop Metrology & Foundation', hi: 'वर्ष 1: कार्यशाला माप एवं बुनियादी कौशल' },
    focus: {
      en: 'Workshop safety, fluid dynamics, fastener torque science, and digital walkaround inspections.',
      hi: 'सुरक्षा नियम, फ्लूइड रिप्लेसमेंट, टॉर्क साइंस और डिजिटल निरीक्षण।'
    },
    milestones: [
      { en: 'Mastering the Norbar click torque wrench and ISO 6789 tolerance testing', hi: 'अंशांकित टॉर्क रिंच का सही उपयोग' },
      { en: 'Digital tyre tread depth profiling and 3-zone wear analysis', hi: 'टायर ट्रेड माप एवं वियर विश्लेषण' },
      { en: 'Safe hydraulic lift positioning and undercarriage vehicle stabilization', hi: 'सुरक्षित हाइड्रोलिक लिफ्ट संचालन' }
    ],
    toolsIssued: ['Personal Norbar 40–200 N·m Torque Wrench', 'Mitutoyo Digital Calipers', 'High-CRI Inspection Flood Wand']
  },
  {
    year: 2,
    title: { en: 'Year 2: Chassis, Brakes & Micrometer Precision', hi: 'वर्ष 2: चेसिस, ब्रेक एवं माइक्रोमीटर शुद्धता' },
    focus: {
      en: 'Brake friction replacement, disc runout dial-gauge measurement, and hydraulic bleeding.',
      hi: 'ब्रेक पैड/डिस्क रिप्लेसमेंट, डिस्क रनआउट मापन और हाइड्रोलिक ब्लीडिंग।'
    },
    milestones: [
      { en: 'Precision disc runout measurement within 0.03 mm factory runout tolerances', hi: '0.03 मिमी सटीकता के साथ डिस्क रनआउट टेस्ट' },
      { en: 'Brake fluid hygroscopic moisture probe and chemical boiling point analysis', hi: 'ब्रेक फ्लूइड बॉइलिंग पॉइंट परीक्षण' },
      { en: 'Suspension bushing deflection diagnosis using hydraulic pry jigs', hi: 'सस्पेंशन बुश व शॉकर्स की जांच' }
    ],
    toolsIssued: ['Starrett Magnetic Dial Indicator', 'Pneumatic Brake Caliper Retractor', 'Brake Fluid Boiling Tester']
  },
  {
    year: 3,
    title: { en: 'Year 3: Oscilloscope Telemetry & Diagnostics', hi: 'वर्ष 3: ऑसिलोस्कोप एवं डायग्नोस्टिक्स' },
    focus: {
      en: 'Electronic powertrain sensors, live CAN/LIN bus signal logging, and engine timing mechanics.',
      hi: 'सेंसर टेस्टिंग, कैन-बस सिग्नल्स और इंजन टाइमिंग मैकेनिक्स।'
    },
    milestones: [
      { en: 'Capturing 8-channel PicoScope waveforms on crank, cam, and injector pulse signals', hi: '8-चैनल वेवफॉर्म विश्लेषण' },
      { en: 'Interpreting live freeze-frame OBD-II sensor P-codes and fuel trim deviations', hi: 'ओबीडी लाइव डाटा और फ्यूल ट्रिम रीडिंग' },
      { en: 'Independent execution of timing belt and water pump overhaul procedures', hi: 'टाइमिंग बेल्ट और वाटर पंप ओवरहॉल' }
    ],
    toolsIssued: ['Automotive Digital Multimeter', 'Intake Vacuum Smoke Leak Detector', 'Camshaft Timing Lock Suite']
  },
  {
    year: 4,
    title: { en: 'Year 4: High-Voltage EV & Master Sign-Off', hi: 'वर्ष 4: ईवी विशेषज्ञता व मास्टर तकनीशियन' },
    focus: {
      en: 'High-voltage DC contactor isolation, battery pack thermal balancing, and final quality sign-off.',
      hi: 'हाई-वोल्टेज ईवी सिस्टम, बैटरी सेल बैलेंस और अंतिम क्वालिटी साइन-ऑफ।'
    },
    milestones: [
      { en: '1000V high-voltage isolation protocol certification and live zero-energy verification', hi: '1000V शून्य-ऊर्जा सुरक्षा सत्यापन' },
      { en: 'EV traction battery pack internal cell balance delta diagnostic sign-off', hi: 'ईवी ट्रैक्शन बैटरी सेल बैलेंस टेस्ट' },
      { en: 'Full qualification as an accredited Torquewell Independent Master Technician', hi: 'टॉर्कवेल प्रमाणित मास्टर तकनीशियन उपाधि' }
    ],
    toolsIssued: ['Fluke 1000V CAT-IV Insulated Tool Suite', 'High-Voltage Insulation Meter', 'Master Calibration Stamp']
  }
];

export const OPEN_VACANCIES: Vacancy[] = [
  {
    id: 'job-diag-master',
    title: { en: 'Lead Diagnostic Master Technician', hi: 'लीड डायग्नोस्टिक मास्टर तकनीशियन' },
    department: 'Diagnostics & Telemetry',
    branch: 'Torquewell Central',
    salaryBand: [48000, 58000],
    type: 'Full-time · 4-Day or 5-Day Option',
    summary: {
      en: 'Lead our diagnostic bay, utilizing 8-channel oscilloscopes, CAN-bus analyzers, and factory telematics to resolve complex faults without guess-work part swapping.',
      hi: 'जटिल इलेक्ट्रॉनिक और सेंसर फॉल्ट्स को आधुनिक उपकरणों से हल करने वाले मुख्य तकनीशियन।'
    },
    responsibilities: [
      { en: 'Perform deep-level waveform analysis on sensors, ignition, and fuel injection systems', hi: 'सेंसर व इग्निशन सिस्टम का वेवफॉर्म विश्लेषण' },
      { en: 'Mentor Level 2 and Level 3 apprentice technicians on diagnostic reasoning', hi: 'प्रशिक्षु तकनीशियनों को प्रशिक्षण प्रदान करना' },
      { en: 'Document physical evidence photos and oscilloscope captures for customer Proof Reports', hi: 'ग्राहक प्रूफ रिपोर्ट के लिए डिजिटल साक्ष्य तैयार करना' }
    ],
    requirements: [
      { en: 'Proven track record in automotive electrical fault finding and oscilloscope usage', hi: 'ऑटोमोटिव डायग्नोस्टिक्स व ऑसिलोस्कोप का मजबूत अनुभव' },
      { en: 'Commitment to evidence-first workshop standards and zero-upsell integrity', hi: 'पारदर्शी व ईमानदार कार्यशैली' }
    ],
    benefits: [
      { en: 'Full Snap-on & PicoScope master diagnostic tool suite provided', hi: 'प्रीमियम डायग्नोस्टिक टूल्स किट' },
      { en: '£48,000 – £58,000 base salary + annual workshop profit share', hi: 'प्रतिस्पर्धी वेतन + वार्षिक लाभ सहभागिता' },
      { en: 'Private healthcare, pension match to 8%, and 28 days paid holiday', hi: 'स्वास्थ्य बीमा व पेंशन' }
    ]
  },
  {
    id: 'job-ev-spec',
    title: { en: 'High-Voltage EV & Hybrid Technician', hi: 'हाई-वोल्टेज ईवी एवं हाइब्रिड तकनीशियन' },
    department: 'EV & Alternative Powertrains',
    branch: 'Torquewell South (EV)',
    salaryBand: [44000, 52000],
    type: 'Full-time',
    summary: {
      en: 'Work in our dedicated clean EV sanctuary on high-voltage battery safety, cooling loops, charging ports, and drive unit gearboxes.',
      hi: 'ईवी बैटरी, कूलिंग सिस्टम और चार्जिंग इंफ्रास्ट्रक्चर के विशेषज्ञ तकनीशियन।'
    },
    responsibilities: [
      { en: 'Execute safe high-voltage de-energisation and isolation certification', hi: 'हाई-वोल्टेज आइसोलेशन और सुरक्षा प्रोटोकॉल' },
      { en: 'Diagnose traction battery cell degradation, internal resistance, and balancing', hi: 'बैटरी सेल व इन्वर्टर का वैज्ञानिक परीक्षण' },
      { en: 'Service thermal management heat pumps and de-ionised coolant loops', hi: 'हीट पंप और कूलेंट लूप सर्विस' }
    ],
    requirements: [
      { en: 'Experience working on high-voltage automotive systems (EV/PHEV)', hi: 'ईवी/हाइब्रिड वाहनों पर कार्य का अनुभव' },
      { en: 'Meticulous safety mindset with respect for high-voltage procedures', hi: 'सुरक्षा मानकों का कड़ाई से पालन' }
    ],
    benefits: [
      { en: '1000V CAT-IV insulated tool suite and protective gear supplied', hi: '1000V इंसुलेटेड टूल्स और पीपीई' },
      { en: '£44,000 – £52,000 salary with scheduled annual skills reviews', hi: 'आकर्षक वेतन व वार्षिक समीक्षा' },
      { en: '4-day compressed work week available', hi: '4-दिवसीय कार्य सप्ताह का विकल्प' }
    ]
  },
  {
    id: 'job-mech-tech',
    title: { en: 'Vehicle Mechanical Technician', hi: 'व्हीकल मैकेनिकल तकनीशियन' },
    department: 'Chassis & Service Bays',
    branch: 'Torquewell Central & North',
    salaryBand: [36000, 44000],
    type: 'Full-time',
    summary: {
      en: 'Carry out precision servicing, suspension overhauls, brake renewals, and wheel alignments to factory torque specifications.',
      hi: 'सटीक सर्विसिंग, सस्पेंशन और ब्रेक ओवरहॉल करने वाले कुशल तकनीशियन।'
    },
    responsibilities: [
      { en: 'Execute scheduled logbook servicing and fluid flushes to strict procedures', hi: 'शेड्यूल सर्विसिंग और फ्लूइड्स रिप्लेसमेंट' },
      { en: 'Fit brake pads, discs, and suspension components with calibrated torque click verification', hi: 'अंशांकित टॉर्क के साथ पार्ट्स फिटिंग' },
      { en: 'Conduct 360° walkarounds and digital inspection camera measurements', hi: 'डिजिटल निरीक्षण और तस्वीरें लेना' }
    ],
    requirements: [
      { en: 'Qualified mechanical vehicle technician with clean driving license', hi: 'प्रमाणित मैकेनिकल तकनीशियन' },
      { en: 'Dedication to clean workmanship, proper fastener tightening, and tidy bays', hi: 'स्वच्छ और अनुशासित कार्यशैली' }
    ],
    benefits: [
      { en: 'Personal tool suite with annual torque calibration calibration', hi: 'व्यक्तिगत टूल्स किट' },
      { en: 'Overtime paid at 1.5× rate with zero mandatory weekend hours', hi: 'सप्ताहांत पर कोई बाध्यता नहीं' }
    ]
  },
  {
    id: 'job-apprentice',
    title: { en: 'Automotive Workshop Apprentice', hi: 'ऑटोमोटिव वर्कशॉप प्रशिक्षु' },
    department: 'Apprenticeship Academy',
    branch: 'All Branches',
    salaryBand: [22000, 26000],
    type: 'Full-time Apprenticeship · 4 Years',
    summary: {
      en: 'Start your career with one of the most respected independent precision garages. Full tuition paid, personal tool suite from Day 1, and 1-on-1 mentorship.',
      hi: 'अपने करियर की शुरुआत करें। 100% प्रायोजित शिक्षा, पहले दिन से टूल्स और व्यक्तिगत मार्गदर्शन।'
    },
    responsibilities: [
      { en: 'Learn precision inspection techniques, oil chemistry, and fastener torque standards', hi: 'निरीक्षण, ऑयल साइंस और टॉर्क तकनीक सीखना' },
      { en: 'Assist master technicians on brake, suspension, and diagnostic repairs', hi: 'मास्टर तकनीशियन के साथ मिलकर काम करना' },
      { en: 'Attend funded day-release college coursework toward accredited qualification', hi: 'अध्ययन और प्रमाणन हेतु प्रायोजित समय' }
    ],
    requirements: [
      { en: 'Enthusiasm for automotive engineering, hands-on mechanical curiosity, and reliability', hi: 'ऑटोमोबाइल इंजीनियरिंग के प्रति उत्साह और सीखने की ललक' },
      { en: 'GCSE Maths and English Grade 4/C or equivalent', hi: 'बुनियादी योग्यता' }
    ],
    benefits: [
      { en: '100% tuition and exam fees paid by Torquewell', hi: 'पूर्ण फीस प्रायोजन' },
      { en: '£22,000 – £26,000 above-standard apprentice wage with guaranteed annual raises', hi: 'मानक से बेहतर प्रशिक्षु वेतन' },
      { en: 'Guaranteed permanent Master Technician position upon graduation', hi: 'सफलतापूर्वक पूर्ण करने पर पक्की नौकरी' }
    ]
  }
];
