import { I18n } from '@/types';

export interface BayJob {
  id: string;
  token: string;
  regPlate: string;
  vehicleModel: string;
  customerName: string;
  branchName: string;
  bayNumber: string;
  technicianName: string;
  technicianTorqueId: string;
  jobType: 'routine' | 'brakes' | 'diagnostics' | 'ev';
  currentStageNumber: number; // 1 to 9
  elapsedMinutes: number;
  estimatedMinutesTotal: number;
  statusNote: I18n;
  waitingOnCustomer: boolean;
  photoEvidenceCount: number;
  completedChecksCount: number;
  totalChecksCount: number;
  recentTelemetry: string;
}

export interface JourneyStageDetail {
  id: string;
  stageNumber: number;
  title: I18n;
  ownerRole: I18n;
  timeEst: string;
  durationRange: { minMin: number; maxMin: number };
  youReceive: I18n[];
  youDecide?: I18n;
  toolsUsed: string[];
  smsPreview: I18n;
  emailPreview: I18n;
}

export const JOURNEY_STAGES: JourneyStageDetail[] = [
  {
    id: 'stage-1-intake',
    stageNumber: 1,
    title: { en: 'Intake & Digital Check-In', hi: 'डिजिटल चेक-इन' },
    ownerRole: { en: 'Service Concierge & Lead Advisor', hi: 'सर्विस सलाहकार' },
    timeEst: '10 min',
    durationRange: { minMin: 8, maxMin: 15 },
    youReceive: [
      { en: 'Digital intake confirmation SMS with live Bay Board tracking link', hi: 'लाइव बे बोर्ड ट्रैकिंग लिंक के साथ डिजिटल एसएमएस' },
      { en: 'Key drop security verification and seat/steering wheel protective covers fitted', hi: 'सुरक्षा कवर और की-ड्रॉप सत्यापन' }
    ],
    youDecide: {
      en: 'Confirm daytime contact preference (SMS or WhatsApp) and collection deadline',
      hi: 'दिन के समय संपर्क प्राथमिकता (एसएमएस या व्हाट्सएप) और वाहन वापसी समय की पुष्टि'
    },
    toolsUsed: ['TorqueTab Mobile Intake Terminal', 'OBD-II VIN Auto-Scanner', 'Protective Seat Shroud'],
    smsPreview: {
      en: 'Torquewell Auto: Your vehicle is checked in at Bay 04. Track live bay status at torquewell.co.uk/journey',
      hi: 'टॉर्कवेल ऑटो: आपका वाहन बे 04 में चेक-इन हो चुका है। लाइव स्थिति देखें: torquewell.co.uk/journey'
    },
    emailPreview: {
      en: 'Check-in confirmed. Master technician assigned: Tomas Hale (TQ-CAL-8842). Target handover window: 16:30.',
      hi: 'चेक-इन पुष्ट हुआ। मास्टर तकनीशियन: टॉमस हेल (TQ-CAL-8842)। अनुमानित डिलीवरी: 16:30।'
    }
  },
  {
    id: 'stage-2-walkaround',
    stageNumber: 2,
    title: { en: '360° Walkaround & Body Scan', hi: '360° बॉडी स्कैन' },
    ownerRole: { en: 'Vehicle Inspector', hi: 'वाहन निरीक्षक' },
    timeEst: '10 min',
    durationRange: { minMin: 10, maxMin: 15 },
    youReceive: [
      { en: 'High-definition 16-point exterior photos documenting pre-existing bodywork and wheel rims', hi: 'मौजूदा बॉडीवर्क और रिम्स का 16-पॉइंट फोटो दस्तावेजीकरण' },
      { en: 'Tyre tread depth preliminary laser scan across all four tyres + spare', hi: 'सभी चार टायरों और स्पेयर का लेजर ट्रेड डेप्थ स्कैन' }
    ],
    toolsUsed: ['High-CRI Inspection Floodlight', 'Handheld Laser Tread Scanner', 'Digital Condition Tablet'],
    smsPreview: {
      en: 'Torquewell: 360° walkaround complete. All 16 body panels photographed and archived to your file.',
      hi: 'टॉर्कवेल: 360° वॉकअराउंड पूर्ण। सभी 16 बॉडी पैनल की फोटो सुरक्षित संग्रहीत की गईं।'
    },
    emailPreview: {
      en: 'Body & rim scan uploaded. Zero new cosmetic transit marks recorded. Proceeding to hydraulic lift elevation.',
      hi: 'बॉडी व रिम स्कैन अपलोड किया गया। कोई नया खरोंच निशान नहीं। हाइड्रोलिक लिफ्ट एलिवेशन की ओर अग्रसर।'
    }
  },
  {
    id: 'stage-3-lift',
    stageNumber: 3,
    title: { en: 'Hydraulic Lift Elevation', hi: 'हाइड्रोलिक लिफ्ट एलिवेशन' },
    ownerRole: { en: 'Chassis Technician', hi: 'चेसिस तकनीशियन' },
    timeEst: '15 min',
    durationRange: { minMin: 10, maxMin: 20 },
    youReceive: [
      { en: 'Underbody chassis health inspection photos (exhaust, undertrays, subframe mountings)', hi: 'अंडरबॉडी चेसिस स्वास्थ्य तस्वीरें (एग्जॉस्ट, सबफ्रेम, सस्पेंशन बुश)' },
      { en: 'Suspension ball-joint and wheel bearing axial play dial-gauge test report', hi: 'सस्पेंशन बॉल-जॉइंट और व्हील बेयरिंग डायल-गेज प्ले रिपोर्ट' }
    ],
    toolsUsed: ['4-Post Rotary Hydraulic Hoist', 'Dial Test Indicator (0.01mm resolution)', 'High-Lumen Under-Chassis Wand'],
    smsPreview: {
      en: 'Torquewell: Vehicle elevated on Bay 04 hoist. Undercarriage, suspension, and brake fluid line inspection in progress.',
      hi: 'टॉर्कवेल: वाहन बे 04 होइस्ट पर उठाया गया। अंडरकैरिज, सस्पेंशन और फ्लूइड लाइनों का निरीक्षण जारी।'
    },
    emailPreview: {
      en: 'Hoist inspection in progress. Chassis integrity verified sound. Wheel removal initiated for multi-point caliper measurements.',
      hi: 'होइस्ट निरीक्षण प्रगति पर। चेसिस सुरक्षा सत्यापित। कैलिपर माप हेतु पहिए हटाए जा रहे हैं।'
    }
  },
  {
    id: 'stage-4-caliper-scan',
    stageNumber: 4,
    title: { en: 'Multi-Point Caliper Scan', hi: 'मल्टी-पॉइंट स्कैन' },
    ownerRole: { en: 'Diagnostic Master Technician', hi: 'डायग्नोस्टिक मास्टर तकनीशियन' },
    timeEst: '30 min',
    durationRange: { minMin: 25, maxMin: 40 },
    youReceive: [
      { en: 'Digital micrometer brake disc thickness and pad friction lining measurements (accurate to 0.05 mm)', hi: 'डिजिटल माइक्रोमीटर ब्रेक डिस्क मोटाई और पैड लाइनिंग माप (0.05 मिमी सटीकता)' },
      { en: 'Brake fluid hygroscopic boiling point test and optical battery health conductance readout', hi: 'ब्रेक फ्लूइड बॉइलिंग पॉइंट टेस्ट और बैटरी कंडक्टेंस प्रिंटआउट' }
    ],
    toolsUsed: ['Mitutoyo Digimatic Vernier Caliper', 'DOT 4 Moisture Boiling Point Tester', 'Midtronics Conductance Battery Analyzer'],
    smsPreview: {
      en: 'Torquewell: 32-point inspection complete. Front brake pad thickness: 2.1mm (min 3.0mm). Proof report generating now.',
      hi: 'टॉर्कवेल: 32-पॉइंट निरीक्षण पूरा। फ्रंट ब्रेक पैड: 2.1mm (न्यूनतम 3.0mm)। प्रूफ रिपोर्ट तैयार हो रही है।'
    },
    emailPreview: {
      en: 'Your Digital Proof Report is ready with 6 measurement photos and microscopic brake disc runout readouts.',
      hi: 'आपकी डिजिटल प्रूफ रिपोर्ट तैयार है, जिसमें 6 माप तस्वीरें और डिस्क रनआउट विवरण शामिल हैं।'
    }
  },
  {
    id: 'stage-5-approval',
    stageNumber: 5,
    title: { en: 'Customer Digital Approval', hi: 'ग्राहक डिजिटल अनुमोदन' },
    ownerRole: { en: 'Customer & Service Advisor', hi: 'ग्राहक एवं सर्विस सलाहकार' },
    timeEst: 'Pending Customer',
    durationRange: { minMin: 15, maxMin: 60 },
    youReceive: [
      { en: 'Interactive Digital Proof Report with transparent parts tier pricing (OE vs OE-equivalent)', hi: 'पारदर्शी पार्ट्स टियर मूल्य निर्धारण के साथ डिजिटल प्रूफ रिपोर्ट' },
      { en: 'Clear itemised breakdown showing labour, parts, and consumables with zero hidden fees', hi: 'श्रम, पुर्जे और उपभोग्य सामग्रियों का स्पष्ट विवरण' }
    ],
    youDecide: {
      en: 'Approve or decline individual line items with 1-click cryptographic consent. No surprise invoices.',
      hi: '1-क्लिक डिजिटल सहमति के साथ कार्य को स्वीकृत या स्थगित करें। कोई अप्रत्याशित बिल नहीं।'
    },
    toolsUsed: ['TorqueWell Customer Portal Web App', 'SMS Consent Token Gate', 'Cryptographic Audit Trail'],
    smsPreview: {
      en: 'Torquewell Action Required: Front pads worn below safety limit. Review photos & authorise repair at torquewell.co.uk/proof',
      hi: 'टॉर्कवेल सूचना: फ्रंट पैड सुरक्षा सीमा से कम। तस्वीरें देखें और स्वीकृति दें: torquewell.co.uk/proof'
    },
    emailPreview: {
      en: 'Pending authorisation: Review itemised breakdown for Front Brake Pads (£135–£165). Work paused until your approval.',
      hi: 'स्वीकृति लंबित: फ्रंट ब्रेक पैड (£135–£165) का विस्तृत ब्योरा देखें। आपकी अनुमति तक काम रुका हुआ है।'
    }
  },
  {
    id: 'stage-6-spanner-work',
    stageNumber: 6,
    title: { en: 'Spanner Work & Part Fitting', hi: 'पुर्जा प्रतिस्थापन' },
    ownerRole: { en: 'Mechanical Technician', hi: 'मैकेनिकल तकनीशियन' },
    timeEst: '45 min',
    durationRange: { minMin: 35, maxMin: 60 },
    youReceive: [
      { en: 'Fresh OE-specification replacement components unboxed, verified, and photographed prior to installation', hi: 'मूल पुर्जों की अनबॉक्सिंग व स्थापना पूर्व फोटो सत्यापन' },
      { en: 'Old worn parts tagged with serial QR code and retained in your collection box if requested', hi: 'पुराने बदले गए पुर्जे पारदर्शी बॉक्स में सुरक्षित' }
    ],
    toolsUsed: ['Snap-on Pneumatic Ratchet', 'Piston Wind-Back Caliper Tool', 'Anti-Corrosion Ceramic Brake Paste'],
    smsPreview: {
      en: 'Torquewell: Customer approval received. New OE-equivalent Brembo pads and wear sensors currently being fitted.',
      hi: 'टॉर्कवेल: स्वीकृति प्राप्त हुई। नए ओई-समतुल्य ब्रेम्बो पैड और सेंसर फिट किए जा रहे हैं।'
    },
    emailPreview: {
      en: 'Parts installation underway on Bay 04. New pad friction material thickness: 12.0 mm (brand new). Old parts placed in return box.',
      hi: 'बे 04 पर फिटिंग कार्य प्रगति पर। नए पैड की मोटाई: 12.0 मिमी। पुराने पुर्जे निरीक्षण बॉक्स में रखे गए।'
    }
  },
  {
    id: 'stage-7-torque-verification',
    stageNumber: 7,
    title: { en: 'Calibrated Torque Verification', hi: 'टॉर्क सत्यापन' },
    ownerRole: { en: 'Master Quality Inspector', hi: 'क्वालिटी निरीक्षक' },
    timeEst: '15 min',
    durationRange: { minMin: 12, maxMin: 20 },
    youReceive: [
      { en: 'Torque Audit Log recording exact N·m applied to caliper carrier bolts and road wheel lug nuts', hi: 'कैलिपर कैरियर और व्हील नट्स पर लागू सटीक N·m टॉर्क रिकॉर्ड' },
      { en: 'Annual calibration certificate ID for the specific Norbar torque wrench utilized', hi: 'उपयोग किए गए टॉर्क रिंच का वार्षिक अंशांकन प्रमाणपत्र कोड' }
    ],
    toolsUsed: ['Norbar Pro-300 Calibrated Click Torque Wrench (ISO 6789:2017)', 'Digital Angle Torque Gauge', 'Tamper-Evident Torque Seal Paint'],
    smsPreview: {
      en: 'Torquewell: Calibrated torque click verification completed. Caliper carrier torqued to 110 N·m. Wheels torqued to 120 N·m.',
      hi: 'टॉर्कवेल: कैलिब्रेटेड टॉर्क क्लिक सत्यापन पूर्ण। कैलिपर कैरियर 110 N·m और पहिए 120 N·m पर लॉक किए गए।'
    },
    emailPreview: {
      en: 'Torque verification signed off by Tomas Hale. Calibrated tool certificate #TQ-CAL-8842 attached to digital job dossier.',
      hi: 'टॉमस हेल द्वारा टॉर्क ऑडिट सत्यापित। कैलिब्रेटेड टूल प्रमाणपत्र #TQ-CAL-8842 डिजिटल डोजियर में संलग्न।'
    }
  },
  {
    id: 'stage-8-road-test',
    stageNumber: 8,
    title: { en: 'Diagnostic Road Test', hi: 'डायग्नोस्टिक रोड टेस्ट' },
    ownerRole: { en: 'Lead Diagnostic Road Tester', hi: 'रोड टेस्ट लीड' },
    timeEst: '20 min',
    durationRange: { minMin: 15, maxMin: 25 },
    youReceive: [
      { en: '15-minute standardized dynamic test route checking ABS pulse response, steering centering, and pedal firmness', hi: '15-मिनट का डायनेमिक रोड टेस्ट: एबीएस प्रतिक्रिया, स्टीयरिंग संरेखण और पैडल दृढ़ता' },
      { en: 'Live OBD-II freeze-frame sensor scan confirming zero pending diagnostic trouble codes (DTCs)', hi: 'शून्य लंबित फॉल्ट कोड की पुष्टि के साथ लाइव ओबीडी सेंसर स्कैन' }
    ],
    toolsUsed: ['Bosch KTS Diagnostic Data Logger', 'Decelerometer Dynamic Brake Meter', 'Standardized Urban & Dual-Carriageway Loop'],
    smsPreview: {
      en: 'Torquewell: Road test underway. Deceleration verified at 0.78g with zero brake shudder or drift.',
      hi: 'टॉर्कवेल: रोड टेस्ट जारी। ब्रेकिंग दक्षता 0.78g सत्यापित, शून्य कंपन अथवा विचलन।'
    },
    emailPreview: {
      en: 'Road test completed successfully. Brake pedal travel is firm and linear. Steering wheel remains dead-center under hard deceleration.',
      hi: 'सड़क परीक्षण सफलतापूर्वक संपन्न। ब्रेक पेडल प्रतिक्रिया सटीक व स्थिर है।'
    }
  },
  {
    id: 'stage-9-handover',
    stageNumber: 9,
    title: { en: 'Evidence Dossier Handover', hi: 'डिजिटल हैंडओवर' },
    ownerRole: { en: 'Customer Experience Manager', hi: 'कस्टमर रिलेशनशिप मैनेजर' },
    timeEst: '10 min',
    durationRange: { minMin: 10, maxMin: 15 },
    youReceive: [
      { en: 'Digital Proof Dossier PDF with all before/after photos, calibration certificates, and 12-month warranty seal', hi: 'सभी फोटो, अंशांकन प्रमाणपत्र और 12-माह वारंटी के साथ डिजिटल प्रूफ डोजियर' },
      { en: 'Complimentary tyre pressure check and windshield washer fluid reservoir top-up', hi: 'मानार्थ टायर प्रेशर व विंडशील्ड वॉशर फ्लूइड टॉप-अप' }
    ],
    toolsUsed: ['Proof Dossier Archival Generator', 'Contactless Key Pickup Locker', 'Digital Receipt Gateway'],
    smsPreview: {
      en: 'Torquewell: Your vehicle is ready for collection! View final invoice and PDF evidence dossier at torquewell.co.uk/portal',
      hi: 'टॉर्कवेल: आपका वाहन संग्रह के लिए तैयार है! अंतिम बिल व पीडीएफ डोजियर देखें: torquewell.co.uk/portal'
    },
    emailPreview: {
      en: 'Vehicle ready for collection. Total invoice: £145.00 incl. VAT. 12-Month / 12,000-mile warranty activated on fitted parts.',
      hi: 'वाहन तैयार है। कुल बिल: £145.00 (वैट सहित)। बदले गए पुर्जों पर 12 महीने की वारंटी सक्रिय।'
    }
  }
];

export const INITIAL_BAY_JOBS: BayJob[] = [
  {
    id: 'bay-tw68akz',
    token: 'JOB-TW68',
    regPlate: 'TW68 AKZ',
    vehicleModel: 'TorqueSpec Urban 1.4 Hatchback',
    customerName: 'Sam Carter',
    branchName: 'Torquewell Central',
    bayNumber: 'Bay 04 (Service & Brakes)',
    technicianName: 'Tomas Hale (Master Tech #01)',
    technicianTorqueId: 'TQ-CAL-8842',
    jobType: 'brakes',
    currentStageNumber: 5, // Customer Approval
    elapsedMinutes: 48,
    estimatedMinutesTotal: 90,
    statusNote: {
      en: 'Digital Proof Report dispatched. Waiting on customer approval for front brake pad replacement.',
      hi: 'डिजिटल प्रूफ रिपोर्ट भेजी गई। फ्रंट ब्रेक पैड बदलने पर ग्राहक की स्वीकृति की प्रतीक्षा है।'
    },
    waitingOnCustomer: true,
    photoEvidenceCount: 6,
    completedChecksCount: 28,
    totalChecksCount: 32,
    recentTelemetry: 'Brake Disc Runout: 0.02mm (within 0.05mm factory spec)'
  },
  {
    id: 'bay-tq21nxr',
    token: 'JOB-TQ21',
    regPlate: 'TQ21 NXR',
    vehicleModel: 'TorqueSpec Tourer 2.0D Estate',
    customerName: 'Marcus Vance',
    branchName: 'Torquewell North',
    bayNumber: 'Bay 02 (Chassis & Alignment)',
    technicianName: 'Elena Rostova (Diagnostic Tech #04)',
    technicianTorqueId: 'TQ-CAL-9912',
    jobType: 'routine',
    currentStageNumber: 7, // Torque Click & Calibration
    elapsedMinutes: 72,
    estimatedMinutesTotal: 105,
    statusNote: {
      en: 'Front brake discs fitted. Torquing caliper carrier bolts to factory 110 N·m specification with calibrated click.',
      hi: 'नई डिस्क लगाई गई। कैलिपर कैरियर बोल्ट को फैक्ट्री 110 N·m मान पर टॉर्क से लॉक किया जा रहा है।'
    },
    waitingOnCustomer: false,
    photoEvidenceCount: 8,
    completedChecksCount: 34,
    totalChecksCount: 36,
    recentTelemetry: 'Carrier Bolt Torque: 110.4 N·m (verified Norbar #TQ-CAL-9912)'
  },
  {
    id: 'bay-tw24hyb',
    token: 'JOB-TW24',
    regPlate: 'TW24 HYB',
    vehicleModel: 'TorqueSpec EcoPulse 1.8 Hybrid',
    customerName: 'Aarav Patel',
    branchName: 'Torquewell South (EV)',
    bayNumber: 'Bay 05 (High-Voltage EV)',
    technicianName: 'Rajesh Sharma (EV/Hybrid Lead #03)',
    technicianTorqueId: 'TQ-EV-7721',
    jobType: 'ev',
    currentStageNumber: 8, // Road Test & Quality Gate
    elapsedMinutes: 85,
    estimatedMinutesTotal: 95,
    statusNote: {
      en: 'High-voltage inverter thermal flush complete. Conducting 15-minute regenerative braking road test.',
      hi: 'हाइब्रिड इन्वर्टर कूलिंग फ्लश पूर्ण। 15-मिनट का रीजेनरेटिव ब्रेकिंग रोड टेस्ट जारी है।'
    },
    waitingOnCustomer: false,
    photoEvidenceCount: 5,
    completedChecksCount: 30,
    totalChecksCount: 30,
    recentTelemetry: 'Regen Deceleration: 0.28g capture rate, Inverter temp: 42°C'
  },
  {
    id: 'bay-tw72flt',
    token: 'JOB-TW72',
    regPlate: 'TW72 FLT',
    vehicleModel: 'TorqueSpec Cargo Van 2.0 TDI',
    customerName: 'Apex Logistics (Fleet #12)',
    branchName: 'Torquewell Central',
    bayNumber: 'Bay 01 (Commercial LCV)',
    technicianName: 'Marcus Vance & Apprentice Jay',
    technicianTorqueId: 'TQ-CAL-3310',
    jobType: 'diagnostics',
    currentStageNumber: 6, // Spanner Work
    elapsedMinutes: 65,
    estimatedMinutesTotal: 120,
    statusNote: {
      en: 'Rear suspension dampers being replaced. Fasteners penetrating soak completed.',
      hi: 'रियर सस्पेंशन डैम्पर बदले जा रहे हैं। फास्टनर सोक प्रक्रिया पूरी हुई।'
    },
    waitingOnCustomer: false,
    photoEvidenceCount: 4,
    completedChecksCount: 22,
    totalChecksCount: 40,
    recentTelemetry: 'Damper gas rebound pressure: 1.2 bar (spec min 2.0 bar)'
  }
];

export const STAGE_TITLES = JOURNEY_STAGES.map((s) => ({
  n: s.stageNumber,
  title: s.title,
  timeEst: s.timeEst
}));
