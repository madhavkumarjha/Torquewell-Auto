import { Bay, Person } from '@/types';

export const WORKSHOP_BAYS: Bay[] = [
  {
    id: 'bay-reception',
    name: { en: 'Reception & Service Concierge', hi: 'रिसेप्शन एवं सर्विस लाउंज' },
    polygon: [
      [20, 20],
      [280, 20],
      [280, 160],
      [20, 160]
    ],
    equipment: [
      { en: 'Digital Intake Kiosk & Key Drop Lockers', hi: 'डिजिटल चेक-इन कियोस्क' },
      { en: 'Customer Quiet Lounge & Live Bay Monitor TV', hi: 'ग्राहक लाउंज व टीवी' },
      { en: 'Hearing Loop & Low-Sensory Seating Area', hi: 'एक्सेसिबल वेटिंग एरिया' }
    ],
    leadIds: ['person-maya', 'person-jordan'],
    headcount: 3
  },
  {
    id: 'bay-service-01',
    name: { en: 'Bay 01: Routine Service & Fluids', hi: 'बे 01: सर्विस एवं फ्लूइड्स' },
    polygon: [
      [310, 20],
      [570, 20],
      [570, 210],
      [310, 210]
    ],
    equipment: [
      { en: 'Rotary 4-Post 4.5T Hydraulic Hoist', hi: '4-पोस्ट हाइड्रोलिक होइस्ट' },
      { en: 'Pneumatic Waste Oil Vacuum Extraction Bar', hi: 'वैक्यूम ऑयल ड्रेन' },
      { en: 'Laser-Guided Fluid Metering Dispensers', hi: 'सटीक फ्लूइड डिस्पेंसर' }
    ],
    leadIds: ['person-marcus', 'person-jayden'],
    headcount: 3
  },
  {
    id: 'bay-brakes-02',
    name: { en: 'Bay 02: Brakes & Chassis Safety', hi: 'बे 02: ब्रेक व चेसिस' },
    polygon: [
      [600, 20],
      [860, 20],
      [860, 210],
      [600, 210]
    ],
    equipment: [
      { en: 'Ravaglioli In-Ground Scissor Lift', hi: 'ग्राउंड सिज़र लिफ्ट' },
      { en: 'Mitutoyo Digimatic 0.01mm Disc Calipers', hi: 'डिजिटल वर्नियर कैलिपर' },
      { en: 'Norbar Calibrated Click Torque Wrenches', hi: 'अंशांकित टॉर्क रिंच' }
    ],
    leadIds: ['person-tomas'],
    headcount: 2
  },
  {
    id: 'bay-diag-03',
    name: { en: 'Bay 03: Diagnostic & Telemetry Lab', hi: 'बे 03: डायग्नोस्टिक लैब' },
    polygon: [
      [890, 20],
      [1150, 20],
      [1150, 210],
      [890, 210]
    ],
    equipment: [
      { en: 'Bosch KTS 590 Master Diagnostic Interface', hi: 'बॉश मास्टर डायग्नोस्टिक्स' },
      { en: 'PicoScope 8-Channel Automotive Oscilloscope', hi: '8-चैनल ऑसिलोस्कोप' },
      { en: 'Midtronics Conductance Battery Analyzer', hi: 'बैटरी हेल्थ एनालाइजर' }
    ],
    leadIds: ['person-elena'],
    headcount: 2
  },
  {
    id: 'bay-ev-04',
    name: { en: 'Bay 04: High-Voltage EV & Hybrid Sanctuary', hi: 'बे 04: हाई-वोल्टेज ईवी' },
    polygon: [
      [310, 240],
      [570, 240],
      [570, 440],
      [310, 440]
    ],
    equipment: [
      { en: '1000V CAT-IV Insulated Tool Suite (IEC 60900)', hi: '1000V इंसुलेटेड टूल्स' },
      { en: 'High-Voltage Isolation Barrier & Safety Tether', hi: 'एचवी आइसोलेशन बैरियर' },
      { en: 'Fluke 1587 FC Insulation Multimeter', hi: 'इंसुलेशन मल्टीमीटर' }
    ],
    leadIds: ['person-rajesh', 'person-priya'],
    headcount: 2
  },
  {
    id: 'bay-align-05',
    name: { en: 'Bay 05: 3D Camera Wheel Alignment', hi: 'बे 05: 3D व्हील अलाइनमेंट' },
    polygon: [
      [600, 240],
      [860, 240],
      [860, 440],
      [600, 440]
    ],
    equipment: [
      { en: 'Hunter HawkEye Elite 3D Optical Alignment Tower', hi: '3D ऑप्टिकल अलाइनर' },
      { en: 'Laser Ride-Height Gauge System', hi: 'राइड-हाइट लेजर गेज' },
      { en: 'Subframe Center Calibration Jig', hi: 'सबफ्रेम सेंटरिंग जिग' }
    ],
    leadIds: ['person-tomas', 'person-marcus'],
    headcount: 2
  },
  {
    id: 'bay-parts-06',
    name: { en: 'Parts Room & Precision Tool Crib', hi: 'पार्ट्स एवं टूल रूम' },
    polygon: [
      [890, 240],
      [1150, 240],
      [1150, 440],
      [890, 440]
    ],
    equipment: [
      { en: 'Automated OE Parts Dispensary Rack', hi: 'स्वचालित पार्ट्स रैक' },
      { en: 'Annual Torque Wrench Calibration Rig (ISO 6789)', hi: 'टॉर्क कैलिब्रेशन रिग' },
      { en: 'Fastener Ultrasonic Ultrasonic Cleaning Bath', hi: 'अल्ट्रासोनिक क्लीनर' }
    ],
    leadIds: ['person-keith'],
    headcount: 2
  }
];

export const CREW_MEMBERS: Person[] = [
  {
    id: 'person-david',
    name: 'David Torres',
    role: { en: 'Founder & Technical Director', hi: 'संस्थापक एवं तकनीकी निदेशक' },
    kind: 'founder',
    branch: 'branch-central',
    languages: ['English', 'Spanish'],
    trainingPlaceholders: [
      'Chartered Mechanical Engineer (Industry Placeholder)',
      'IMI Master Automotive Accreditation (Placeholder)'
    ],
    bio: {
      en: 'Founded Torquewell on a single core promise: never replace a part without showing the customer physical evidence first.',
      hi: 'टॉर्कवेल की स्थापना इस वादे पर की: ग्राहक को सबूत दिखाए बिना कभी कोई पुर्जा न बदलें।'
    },
    portrait: 'DT'
  },
  {
    id: 'person-elena',
    name: 'Elena Rostova',
    role: { en: 'Lead Diagnostic & Systems Master Tech', hi: 'मास्टर डायग्नोस्टिक तकनीशियन' },
    kind: 'master',
    branch: 'branch-central',
    bay: 'bay-diag-03',
    reportsTo: 'person-david',
    languages: ['English', 'Russian', 'German'],
    trainingPlaceholders: [
      'Advanced Oscilloscope Waveform Diagnostics (Industry Placeholder)',
      'Bosch CAN/LIN Bus Master Certification (Placeholder)'
    ],
    bio: {
      en: 'Specialises in intermittent CAN bus faults, sensor signal attenuation, and tricky electrical gremlins that standard code readers miss.',
      hi: 'जटिल इलेक्ट्रॉनिक और सेंसर फॉल्ट्स को 8-चैनल ऑसिलोस्कोप से खोजने में पारंगत।'
    },
    portrait: 'ER'
  },
  {
    id: 'person-tomas',
    name: 'Tomas Hale',
    role: { en: 'Master Chassis & Safety Systems Tech', hi: 'मास्टर चेसिस व सेफ्टी तकनीशियन' },
    kind: 'master',
    branch: 'branch-central',
    bay: 'bay-brakes-02',
    reportsTo: 'person-david',
    languages: ['English'],
    trainingPlaceholders: [
      'Precision Torque & Fastener Metrology (ISO 6789 Certified)',
      'Advanced Dynamic Braking Analysis (Industry Placeholder)'
    ],
    bio: {
      en: 'Keeper of the Torquewell Click standard. Oversees daily calibration checks on all 36 digital and micrometer torque wrenches.',
      hi: 'टॉर्कवेल क्लिक गारंटी के प्रमुख। सभी टॉर्क टूल्स के दैनिक अंशांकन की देखरेख करते हैं।'
    },
    portrait: 'TH'
  },
  {
    id: 'person-rajesh',
    name: 'Rajesh Sharma',
    role: { en: 'High-Voltage EV & Hybrid Lead Specialist', hi: 'ईवी एवं हाइब्रिड लीड तकनीशियन' },
    kind: 'ev-tech',
    branch: 'branch-south',
    bay: 'bay-ev-04',
    reportsTo: 'person-david',
    languages: ['English', 'Hindi', 'Punjabi'],
    trainingPlaceholders: [
      'High-voltage training: placeholder — client to state real qualification',
      'EV Battery Pack Thermal Loop Diagnostics (Placeholder)'
    ],
    bio: {
      en: 'Leads our high-voltage sanctuary. Dedicated to safe DC contactor isolation, cell balance telemetry, and inverter cooling maintenance.',
      hi: 'हाई-वोल्टेज बैटरी सेल बैलेंस, इन्वर्टर कूलिंग और सुरक्षित ईवी सर्विसिंग के विशेषज्ञ।'
    },
    portrait: 'RS'
  },
  {
    id: 'person-marcus',
    name: 'Marcus Vance',
    role: { en: 'Senior Mechanical Systems Technician', hi: 'सीनियर मैकेनिकल तकनीशियन' },
    kind: 'tech',
    branch: 'branch-central',
    bay: 'bay-service-01',
    reportsTo: 'person-tomas',
    languages: ['English'],
    trainingPlaceholders: [
      'Dual-Clutch & Planetary Transmission Rebuild (Industry Placeholder)',
      'Timing Belt & Valve Interference Geometry (Placeholder)'
    ],
    bio: {
      en: 'Over 14 years of powertrain spanner experience. Fast, methodical, and obsessive about clean threads and factory torque specs.',
      hi: 'इंजन व ट्रांसमिशन के 14+ वर्षों के अनुभवी। स्वच्छ थ्रेड्स और सटीक टॉर्क के लिए प्रतिबद्ध।'
    },
    portrait: 'MV'
  },
  {
    id: 'person-maya',
    name: 'Maya Sterling',
    role: { en: 'Customer Experience & Service Concierge', hi: 'सर्विस सलाहकार एवं कस्टमर लीड' },
    kind: 'advisor',
    branch: 'branch-central',
    bay: 'bay-reception',
    reportsTo: 'person-david',
    languages: ['English', 'French'],
    trainingPlaceholders: [
      'Plain-English Technical Communication (Industry Benchmark)',
      'Consumer Rights & Transparent Authorisation (Charter)'
    ],
    bio: {
      en: 'Translates complex engineering findings into straightforward, respectful plain English so you always feel empowered.',
      hi: 'तकनीकी जटिलताओं को सरल, स्पष्ट भाषा में समझाने में दक्ष ताकि आप सही निर्णय ले सकें।'
    },
    portrait: 'MS'
  },
  {
    id: 'person-jordan',
    name: 'Jordan Lee',
    role: { en: 'Service Intake & Dispatch Advisor', hi: 'सर्विस चेक-इन सलाहकार' },
    kind: 'advisor',
    branch: 'branch-north',
    bay: 'bay-reception',
    reportsTo: 'person-maya',
    languages: ['English', 'Cantonese'],
    trainingPlaceholders: [
      'Digital Vehicle Intake Protocol',
      'Customer Telemetry Dispatch Systems'
    ],
    bio: {
      en: 'Manages live Bay Board updates and ensures digital proof reports reach your phone the instant measurements are captured.',
      hi: 'डिजिटल प्रूफ रिपोर्ट तुरंत ग्राहक तक पहुंचाना और बे बोर्ड अपडेट सुनिश्चित करना।'
    },
    portrait: 'JL'
  },
  {
    id: 'person-keith',
    name: 'Keith Holloway',
    role: { en: 'Parts Logistics & Calibration Manager', hi: 'पार्ट्स व कैलिब्रेशन मैनेजर' },
    kind: 'parts',
    branch: 'branch-central',
    bay: 'bay-parts-06',
    reportsTo: 'person-david',
    languages: ['English'],
    trainingPlaceholders: [
      'ISO 17025 Tool Calibration Metrology',
      'OE Supply Chain Authenticity Verification'
    ],
    bio: {
      en: 'Verifies every component that enters our bays. If a bolt or sensor is not authentic OE or approved OEM-grade, it never touches a car.',
      hi: 'प्रत्येक पुर्जे की प्रामाणिकता की जांच करते हैं। केवल स्वीकृत ओई-ग्रेड पुर्जे ही स्वीकार किए जाते हैं।'
    },
    portrait: 'KH'
  },
  {
    id: 'person-jayden',
    name: 'Jayden Chen',
    role: { en: 'Year 3 Apprentice Technician', hi: 'वर्ष 3 प्रशिक्षु तकनीशियन' },
    kind: 'apprentice',
    branch: 'branch-central',
    bay: 'bay-service-01',
    reportsTo: 'person-marcus',
    languages: ['English', 'Mandarin'],
    trainingPlaceholders: [
      'IMI Level 3 Apprenticeship Pathway (In Progress)',
      'Digital Vernier & Micrometer Measurement Standard'
    ],
    bio: {
      en: 'Mentored by Marcus Vance. Specialises in oil sampling, digital brake disc runout measurements, and tyre wear telemetry.',
      hi: 'मार्कस के मार्गदर्शन में कार्यरत। ऑयल सैंपलिंग और डिस्क रनआउट माप में कुशल।'
    },
    portrait: 'JC'
  },
  {
    id: 'person-priya',
    name: 'Priya Nair',
    role: { en: 'Year 2 EV Apprentice Technician', hi: 'वर्ष 2 ईवी प्रशिक्षु' },
    kind: 'apprentice',
    branch: 'branch-south',
    bay: 'bay-ev-04',
    reportsTo: 'person-rajesh',
    languages: ['English', 'Malayalam', 'Hindi'],
    trainingPlaceholders: [
      'High-voltage safety assistant: placeholder — client to state real qualification',
      'Automotive Electrical Circuits & Insulation Principles'
    ],
    bio: {
      en: 'Training under Rajesh Sharma on high-voltage containment protocols, charging port diagnostics, and cooling loop flushing.',
      hi: 'राजेश शर्मा के साथ ईवी चार्जिंग पोर्ट और कूलेंट फ्लश डायग्नोस्टिक्स का प्रशिक्षण ले रही हैं।'
    },
    portrait: 'PN'
  }
];
