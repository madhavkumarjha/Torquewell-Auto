import { I18n } from '@/types';

export interface StoryChapter {
  n: number;
  stage: string;
  title: I18n;
  who: I18n;
  desc: I18n;
  checks: I18n[];
  evidence: string[];
  activeLayers: string[];
  callout: {
    part: string;
    xPercent: number;
    yPercent: number;
    label: I18n;
    detail: I18n;
  };
}

export const STORY_CHAPTERS: StoryChapter[] = [
  {
    n: 1,
    stage: 'arrival',
    title: { en: 'Arrival & Digital Check-In', hi: 'आगमन एवं डिजिटल चेक-इन' },
    who: { en: 'Service Advisor', hi: 'सर्विस सलाहकार' },
    desc: {
      en: 'Vehicle enters the dedicated intake bay. We log initial mileage, check warning lights, and confirm your reported concerns in writing.',
      hi: 'वाहन इंटेक बे में प्रवेश करता है। हम माइलेज, वार्निंग लाइट्स और आपकी चिंताओं को डिजिटल रूप से दर्ज करते हैं।',
    },
    checks: [
      { en: 'Odometer mileage confirmation', hi: 'ओडोमीटर माइलेज सत्यापन' },
      { en: 'Key drop & driver concern logging', hi: 'चालक की शिकायतों का विवरण' },
    ],
    evidence: ['CHECKIN-LOG-01', 'DASH-SCAN-PHOTO'],
    activeLayers: ['body'],
    callout: {
      part: 'driver-intake',
      xPercent: 78,
      yPercent: 45,
      label: { en: 'Intake Bay 01', hi: 'इंटेक बे ०१' },
      detail: { en: 'Fob logged & initial diagnostics read', hi: 'डायग्नोस्टिक्स स्कैन प्रारंभ' },
    },
  },
  {
    n: 2,
    stage: 'walkaround',
    title: { en: '360° Walk-Around & Body Scan', hi: '३६०° वॉक-अराउंड एवं बॉडी स्कैन' },
    who: { en: 'Vehicle Inspector', hi: 'वाहन निरीक्षक' },
    desc: {
      en: 'A high-definition 360-degree walk-around records every exterior panel, glass condition, and tyre profile before any bay work begins.',
      hi: 'काम शुरू होने से पहले बाहरी बॉडी पैनल्स, शीशे और टायरों की स्थिति का ३६०-डिग्री रिकॉर्ड तैयार किया जाता है।',
    },
    checks: [
      { en: 'All 4 tyre outer tread conditions', hi: 'चारों टायरों की बाहरी स्थिति' },
      { en: 'Windscreen & lighting lens integrity', hi: 'विंडस्क्रीन और लाइट लेंस की जांच' },
    ],
    evidence: ['WALK-360-HD', 'PANEL-INTEGRITY-MAP'],
    activeLayers: ['body', 'wheels'],
    callout: {
      part: 'exterior-scan',
      xPercent: 84,
      yPercent: 62,
      label: { en: 'HD Body Scan', hi: 'एचडी बॉडी स्कैन' },
      detail: { en: 'Pre-existing marks verified and recorded', hi: 'वाहन की पूर्व स्थिति सत्यापित' },
    },
  },
  {
    n: 3,
    stage: 'lift',
    title: { en: 'Lift & Calibrated Inspection', hi: 'लिफ्ट एवं कैलिब्रेटेड निरीक्षण' },
    who: { en: 'Master Technician', hi: 'मास्टर तकनीशियन' },
    desc: {
      en: 'Vehicle is raised on a two-post hydraulic lift. Technicians apply laser micrometers to brake pads, disc runout, and suspension arms.',
      hi: 'वाहन को हाइड्रोलिक लिफ्ट पर उठाया जाता है। ब्रेक पैड, डिस्क और सस्पेंशन की माइक्रोमीटर से सटीक जांच होती है।',
    },
    checks: [
      { en: 'Digital micrometer pad measurement', hi: 'डिजिटल माइक्रोमीटर पैड माप' },
      { en: 'Brake disc rotor thickness & runout', hi: 'ब्रेक डिस्क रोटर मोटाई' },
      { en: 'Ball joint & control arm play', hi: 'कंट्रोल आर्म और बॉल जॉइंट जांच' },
    ],
    evidence: ['MEASURE: PADS 2.5 mm', 'ROTOR-RUNOUT: 0.02 mm'],
    activeLayers: ['chassis', 'wheels', 'brakes', 'suspension'],
    callout: {
      part: 'front-brake-rotor',
      xPercent: 32,
      yPercent: 70,
      label: { en: 'Front Left Brake Assembly', hi: 'आगे का बायां ब्रेक सेट' },
      detail: { en: 'Friction pad at 2.5 mm (Threshold: 3.0 mm)', hi: 'पैड २.५ मिमी पर (सीमा: ३.० मिमी)' },
    },
  },
  {
    n: 4,
    stage: 'photo-evidence',
    title: { en: 'Macro Photo Evidence Capture', hi: 'मैक्रो फोटो प्रमाण रिकॉर्डिंग' },
    who: { en: 'Diagnostic Specialist', hi: 'डायग्नोस्टिक विशेषज्ञ' },
    desc: {
      en: 'No guesswork. We photograph every finding with illuminated macro lenses showing exact wear tabs, fluid seepage, or micro-cracks.',
      hi: 'कोई अनुमान नहीं। हम घिसे हुए पुर्जों, तेल रिसाव या दरारों की हाई-रिज़ॉल्यूशन मैक्रो तस्वीरें लेते हैं।',
    },
    checks: [
      { en: 'Macro photo of worn brake friction pad', hi: 'घिसे ब्रेक पैड की मैक्रो फोटो' },
      { en: 'Underbody oil pan gasket seal photo', hi: 'ऑयल पैन गैस्केट सील की फोटो' },
    ],
    evidence: ['PHOTO-MACRO-PAD-L2', 'PHOTO-CHASSIS-BUSH-04'],
    activeLayers: ['brakes', 'engine', 'exhaust'],
    callout: {
      part: 'macro-camera',
      xPercent: 34,
      yPercent: 68,
      label: { en: 'Calibrated Photo Proof', hi: 'कैलिब्रेटेड फोटो प्रमाण' },
      detail: { en: 'Side-by-side: your worn pad vs brand new spec', hi: 'आपके पुराने पैड की नए से तुलना' },
    },
  },
  {
    n: 5,
    stage: 'report-approval',
    title: { en: 'Digital Proof Report & Authorization', hi: 'डिजिटल प्रूफ रिपोर्ट एवं ग्राहक स्वीकृति' },
    who: { en: 'Service Advisor', hi: 'सर्विस सलाहकार' },
    desc: {
      en: 'You receive an interactive Proof Report on your phone. See the photos, calibrated measurements, and price logic before approving a single bolt.',
      hi: 'आपके फोन पर डिजिटल रिपोर्ट पहुंचती है। काम शुरू कराने से पहले तस्वीरें, नाप और पारदर्शी मूल्य देखें।',
    },
    checks: [
      { en: 'Urgency classification (Now / Soon / Watch)', hi: 'तात्कालिकता वर्गीकरण (अब / जल्द / निगरानी)' },
      { en: 'Labour hours × workshop rate transparency', hi: 'श्रम घंटे × निर्धारित वर्कशॉप दर' },
    ],
    evidence: ['DIGITAL-ESTIMATE-OK', 'CUSTOMER-APP-TOKEN'],
    activeLayers: ['body', 'chassis'],
    callout: {
      part: 'report-portal',
      xPercent: 55,
      yPercent: 42,
      label: { en: 'Customer Approval Terminal', hi: 'ग्राहक स्वीकृति पोर्टल' },
      detail: { en: 'Itemized approval: choose what is needed now', hi: 'मदवार स्वीकृति: वही चुनें जो अभी जरूरी है' },
    },
  },
  {
    n: 6,
    stage: 'parts',
    title: { en: 'OE & Tested Component Staging', hi: 'ओई एवं परीक्षित स्पेयर पार्ट्स' },
    who: { en: 'Parts Specialist', hi: 'पार्ट्स विशेषज्ञ' },
    desc: {
      en: 'Components are pulled from certified OE and OE-equivalent inventory. Part numbers, batch codes, and manufacturer warranty certificates are logged.',
      hi: 'प्रमाणित ओरिजिनल एवं ओई-समतुल्य पार्ट्स निकाले जाते हैं। बैच नंबर और वारंटी प्रमाण पत्र दर्ज किए जाते हैं।',
    },
    checks: [
      { en: 'OE friction material formulation match', hi: 'ओई घर्षण सामग्री विशिष्टता' },
      { en: 'Wear sensor wiring harness replacement', hi: 'नया वियर सेंसर वायर हार्नेस' },
    ],
    evidence: ['PART-BATCH-CERT-90R', 'WARRANTY-24M-LOG'],
    activeLayers: ['engine', 'electrics', 'brakes'],
    callout: {
      part: 'parts-rack',
      xPercent: 28,
      yPercent: 52,
      label: { en: 'Certified Parts Kit', hi: 'प्रमाणित पार्ट्स किट' },
      detail: { en: 'OE-spec ceramic pads with stainless shims', hi: 'स्टेनलेस शिम्स सहित ओई सिरेमिक पैड्स' },
    },
  },
  {
    n: 7,
    stage: 'repair',
    title: { en: 'Torque-Calibrated Installation', hi: 'टॉर्क-कैलिब्रेटेड इंस्टॉलेशन' },
    who: { en: 'Master Technician', hi: 'मास्टर तकनीशियन' },
    desc: {
      en: 'The repair ends with the signature click. Every bolt is tightened using a calibrated digital torque wrench to the exact manufacturer specification.',
      hi: 'काम का समापन सटीक क्लिक के साथ होता है। हर बोल्ट को डिजिटल टॉर्क रिंच से निर्माता के नाप अनुसार कसा जाता है।',
    },
    checks: [
      { en: 'Caliper carrier bolt: 140 N·m verified', hi: 'कैलिपर कैरियर बोल्ट: १४० न्यूटन-मीटर सत्यापित' },
      { en: 'Guide pin silicone lubrication check', hi: 'गाइड पिन सिलिकॉन स्नेहन जांच' },
    ],
    evidence: ['TORQUE-CLICK-VERIFIED: 140 N·m', 'DIGITAL-WRENCH-LOG-BAY04'],
    activeLayers: ['chassis', 'wheels', 'brakes', 'suspension'],
    callout: {
      part: 'torque-wrench',
      xPercent: 32,
      yPercent: 70,
      label: { en: 'The Verified Click', hi: 'सत्यापित क्लिक' },
      detail: { en: 'Torque dial clicks at exactly 140 N·m', hi: 'टॉर्क डायल १४० न्यूटन-मीटर पर क्लिक करता है' },
    },
  },
  {
    n: 8,
    stage: 'road-test',
    title: { en: 'Deceleration Road Test & QC', hi: 'सड़क परीक्षण एवं गुणवत्ता जांच' },
    who: { en: 'Workshop Manager', hi: 'वर्कशॉप प्रबंधक' },
    desc: {
      en: 'A controlled road test verifies smooth pedal feel, emergency brake bedding, zero ABS warnings, and razor-straight directional tracking.',
      hi: 'नियंत्रित सड़क परीक्षण में ब्रेक पेडल का अहसास, सही रुकने की दूरी और सीधी ट्रैकिंग की पुष्टि की जाती है।',
    },
    checks: [
      { en: 'G-meter deceleration stopping distance', hi: 'जी-मीटर ब्रेकिंग दूरी परीक्षण' },
      { en: 'Electronic fault code clearing scan', hi: 'कंप्यूटर स्कैन दोष कोड रीसेट' },
    ],
    evidence: ['ROAD-TEST-PASS', 'OBD-ZERO-FAULTS'],
    activeLayers: ['body', 'wheels', 'chassis'],
    callout: {
      part: 'qc-test',
      xPercent: 72,
      yPercent: 70,
      label: { en: 'Dynamic Road Check', hi: 'डायनामिक रोड चेक' },
      detail: { en: 'Deceleration curve meets factory standard', hi: 'ब्रेकिंग क्षमता मानक अनुसार सत्यापित' },
    },
  },
  {
    n: 9,
    stage: 'handover',
    title: { en: 'Transparent Handover & Digital Logbook', hi: 'पारदर्शी हैंडओवर एवं डिजिटल लॉगबुक' },
    who: { en: 'Service Advisor', hi: 'सर्विस सलाहकार' },
    desc: {
      en: 'We hand back your keys along with your old replaced parts in an inspection box. Your digital logbook is stamped with permanent evidence.',
      hi: 'हम आपकी चाबी के साथ पुराने बदले हुए पार्ट्स बॉक्स में वापस करते हैं। डिजिटल लॉगबुक में पक्का रिकॉर्ड जुड़ता है।',
    },
    checks: [
      { en: 'Returned parts presented to customer', hi: 'पुराने पार्ट्स ग्राहक को दिखाए गए' },
      { en: 'Digital logbook stamped with proof photos', hi: 'डिजिटल लॉगबुक में फोटो रिकॉर्ड दर्ज' },
    ],
    evidence: ['OLD-PARTS-BOX-HANDOVER', 'LOGBOOK-STAMP-TW68'],
    activeLayers: ['body'],
    callout: {
      part: 'handover-desk',
      xPercent: 76,
      yPercent: 44,
      label: { en: 'Proof Handover', hi: 'प्रमाण हैंडओवर' },
      detail: { en: 'Inspection box with old parts returned', hi: 'पुराने पार्ट्स बॉक्स में वापस' },
    },
  },
];
