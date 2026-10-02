import { I18n, Urgency } from '@/types';

export interface PortalApprovalItem {
  id: string;
  findingId: string;
  system: string;
  title: I18n;
  urgency: Urgency;
  cost: number;
  partsTier: 'oe' | 'oeq' | 'aftermarket';
  why: I18n;
  riskIfDeclined: I18n;
  photoUrl: string;
  status: 'pending' | 'approved' | 'declined';
}

export interface PortalLogEntry {
  id: string;
  date: string;
  mileageKm: number;
  branchName: string;
  technicianName: string;
  technicianTorqueId: string;
  serviceTitle: I18n;
  findingsCount: number;
  totalCost: number;
  invoiceId: string;
  summary: I18n;
  evidenceTags: string[];
}

export interface PortalInvoice {
  id: string;
  date: string;
  vehicleModel: string;
  regPlate: string;
  branchName: string;
  technicianTorqueId: string;
  items: {
    description: I18n;
    category: 'labour' | 'parts' | 'consumables' | 'disposal';
    qty: number;
    unitPrice: number;
    total: number;
  }[];
  subtotal: number;
  vatRate: number; // 0.20
  vatAmount: number;
  grandTotal: number;
  paymentStatus: 'paid' | 'pending';
  warrantyMonths: number;
}

export interface PortalReminder {
  id: string;
  title: I18n;
  type: 'mileage' | 'date';
  dueText: I18n;
  urgency: 'soon' | 'watch';
  recommendedService: string;
}

export interface FleetVehicleDetail {
  id: string;
  regPlate: string;
  label: string;
  model: string;
  currentKm: number;
  nextDueKm: number;
  nextDueDate: string;
  status: 'ok' | 'due' | 'in-shop';
  downtimeDaysThisQuarter: number;
  assignedDriver: string;
  recentDefect?: I18n;
}

export interface PortalMessage {
  id: string;
  sender: 'technician' | 'customer' | 'system';
  senderName: string;
  timestamp: string;
  content: I18n;
  badge?: string;
}

export const PORTAL_CLIENT = {
  name: 'Sam Carter',
  email: 'sam.carter@example.co.uk',
  phone: '+44 7700 900482',
  clientSince: '2023',
  vehicle: {
    model: 'TorqueSpec Urban 1.4 Hatchback',
    year: 2021,
    regPlate: 'TW68 AKZ',
    vin: 'TW9984UK20210892',
    engineCode: '1.4L TSI EA211 Turbo',
    currentMileageKm: 48250,
    paintCode: 'Titanium Grey Met',
    transmission: '6-Speed Manual',
    warrantyValidUntil: '2026-10-14'
  }
};

export const INITIAL_APPROVALS: PortalApprovalItem[] = [
  {
    id: 'appr-01',
    findingId: 'f-front-pads',
    system: 'Brakes',
    title: {
      en: 'Front Brake Friction Lining Replacement',
      hi: 'फ्रंट ब्रेक पैड प्रतिस्थापन'
    },
    urgency: 'now',
    cost: 145,
    partsTier: 'oeq',
    why: {
      en: 'Measured pad friction material is 2.1 mm (discard limit is 3.0 mm). High risk of metal-to-metal contact with rotor.',
      hi: 'पैड की मोटाई 2.1 मिमी बची है (सुरक्षित सीमा 3.0 मिमी)। डिस्क को नुकसान का गंभीर जोखिम।'
    },
    riskIfDeclined: {
      en: 'Severe brake fade, scoring of front brake discs requiring complete rotor replacement (£280+), and potential MOT failure.',
      hi: 'ब्रेक फेलियर का जोखिम और डिस्क खराब होने से £280+ का अतिरिक्त खर्च।'
    },
    photoUrl: '/img/proof/pad-worn.svg',
    status: 'pending'
  },
  {
    id: 'appr-02',
    findingId: 'f-brake-fluid',
    system: 'Fluids',
    title: {
      en: 'DOT 4 Brake Fluid Hygroscopic Flush',
      hi: 'ब्रेक फ्लूइड मॉइस्चर फ्लश'
    },
    urgency: 'soon',
    cost: 75,
    partsTier: 'oe',
    why: {
      en: 'Moisture content measured at 2.8% on digital boiling point probe. Boiling point degraded to 162°C.',
      hi: 'ब्रेक फ्लूइड में नमी 2.8% तक बढ़ चुकी है। बॉइलिंग पॉइंट घटकर 162°C रह गया है।'
    },
    riskIfDeclined: {
      en: 'Spongy brake pedal under sustained heavy braking down hills, plus internal corrosion of ABS solenoid valves.',
      hi: 'तेज ब्रेकिंग में पेडल का दबना और एबीएस सिस्टम में आंतरिक जंग लगना।'
    },
    photoUrl: '/img/proof/fluid-tester.svg',
    status: 'pending'
  }
];

export const PORTAL_LOGBOOK: PortalLogEntry[] = [
  {
    id: 'log-48k',
    date: '2026-09-18',
    mileageKm: 48250,
    branchName: 'Torquewell Central',
    technicianName: 'Tomas Hale (Master Tech)',
    technicianTorqueId: 'TQ-CAL-8842',
    serviceTitle: {
      en: 'Annual Precision Inspection & Proof Dossier',
      hi: 'वार्षिक प्रेसिजन निरीक्षण एवं प्रूफ डोजियर'
    },
    findingsCount: 3,
    totalCost: 185,
    invoiceId: 'INV-2026-091',
    summary: {
      en: 'Engine oil flushed and replaced with 5W-30 Synthetic. 32-point calibrated micrometer inspection completed.',
      hi: 'इंजन ऑयल बदला गया। 32-पॉइंट अंशांकित माइक्रोमीटर निरीक्षण पूर्ण हुआ।'
    },
    evidenceTags: ['32 Checkpoints', '6 Calibrated Photos', 'Torque Audit Log Signed']
  },
  {
    id: 'log-36k',
    date: '2025-10-12',
    mileageKm: 36100,
    branchName: 'Torquewell Central',
    technicianName: 'Marcus Vance',
    technicianTorqueId: 'TQ-CAL-3310',
    serviceTitle: {
      en: 'Major Logbook Service & Spark Plugs',
      hi: 'मेजर सर्विस एवं स्पार्क प्लग'
    },
    findingsCount: 2,
    totalCost: 310,
    invoiceId: 'INV-2025-089',
    summary: {
      en: 'Full 4-cylinder iridium spark plugs renewed. Intake air filter and cabin pollen microfilter replaced.',
      hi: '4-सिलेंडर इरिडियम स्पार्क प्लग और एयर फिल्टर बदले गए।'
    },
    evidenceTags: ['Feeler Gauge 0.8mm Gap Photo', 'Intake Airbox Sanitised', 'Zero DTCs']
  },
  {
    id: 'log-24k',
    date: '2024-09-29',
    mileageKm: 24200,
    branchName: 'Torquewell North',
    technicianName: 'Elena Rostova',
    technicianTorqueId: 'TQ-CAL-9912',
    serviceTitle: {
      en: 'Interim Service & 3D Wheel Alignment',
      hi: 'अंतरिम सर्विस व 3D अलाइनमेंट'
    },
    findingsCount: 1,
    totalCost: 195,
    invoiceId: 'INV-2024-412',
    summary: {
      en: 'Front toe alignment adjusted by 0.12° on Hunter 3D optical tower. Tyre rotation completed.',
      hi: 'हंटर 3D टावर पर फ्रंट टो अलाइनमेंट ठीक किया गया। टायर रोटेशन संपन्न।'
    },
    evidenceTags: ['Hunter 3D Printout', 'Tread Depth Laser Scan', 'Lug Nuts 120 N·m']
  }
];

export const PORTAL_INVOICES: PortalInvoice[] = [
  {
    id: 'INV-2026-091',
    date: '2026-09-18',
    vehicleModel: 'TorqueSpec Urban 1.4',
    regPlate: 'TW68 AKZ',
    branchName: 'Torquewell Central',
    technicianTorqueId: 'TQ-CAL-8842',
    items: [
      {
        description: { en: 'Annual Inspection & Diagnostic Scans', hi: 'वार्षिक निरीक्षण व डायग्नोस्टिक्स' },
        category: 'labour',
        qty: 1.0,
        unitPrice: 85,
        total: 85
      },
      {
        description: { en: 'Castrol Edge 5W-30 Fully Synthetic (4.2L)', hi: 'सिंथेटिक इंजन ऑयल (4.2L)' },
        category: 'parts',
        qty: 1,
        unitPrice: 48,
        total: 48
      },
      {
        description: { en: 'Mann OE-Spec Oil Filter Cartridge', hi: 'ऑयल फिल्टर कार्ट्रिज' },
        category: 'parts',
        qty: 1,
        unitPrice: 14,
        total: 14
      },
      {
        description: { en: 'Environmental Waste Disposal & Crush Ring', hi: 'पर्यावरण अपशिष्ट निपटान' },
        category: 'consumables',
        qty: 1,
        unitPrice: 7,
        total: 7
      }
    ],
    subtotal: 154,
    vatRate: 0.2,
    vatAmount: 30.8,
    grandTotal: 184.8,
    paymentStatus: 'paid',
    warrantyMonths: 12
  },
  {
    id: 'INV-2025-089',
    date: '2025-10-12',
    vehicleModel: 'TorqueSpec Urban 1.4',
    regPlate: 'TW68 AKZ',
    branchName: 'Torquewell Central',
    technicianTorqueId: 'TQ-CAL-3310',
    items: [
      {
        description: { en: 'Major Service Labour (Spark & Filters)', hi: 'मेजर सर्विस श्रम' },
        category: 'labour',
        qty: 1.8,
        unitPrice: 85,
        total: 153
      },
      {
        description: { en: 'NGK Laser Iridium Spark Plugs (Set of 4)', hi: 'इरिडियम स्पार्क प्लग (4 का सेट)' },
        category: 'parts',
        qty: 1,
        unitPrice: 62,
        total: 62
      },
      {
        description: { en: 'Cabin Bio-Functional Pollen Filter', hi: 'केबिन एयर फिल्टर' },
        category: 'parts',
        qty: 1,
        unitPrice: 28,
        total: 28
      },
      {
        description: { en: 'Engine Air Intake Pleated Filter', hi: 'इंजन एयर फिल्टर' },
        category: 'parts',
        qty: 1,
        unitPrice: 22,
        total: 22
      }
    ],
    subtotal: 265,
    vatRate: 0.2,
    vatAmount: 53.0,
    grandTotal: 318.0,
    paymentStatus: 'paid',
    warrantyMonths: 12
  }
];

export const PORTAL_REMINDERS: PortalReminder[] = [
  {
    id: 'rem-mot',
    title: { en: 'Annual MOT Safety Inspection', hi: 'वार्षिक एमओटी सुरक्षा जांच' },
    type: 'date',
    dueText: { en: 'Due in 38 days (Nov 08, 2026)', hi: '38 दिनों में देय (8 नवंबर 2026)' },
    urgency: 'soon',
    recommendedService: 'MOT Preparation & Certification'
  },
  {
    id: 'rem-pollen',
    title: { en: 'Cabin Pollen Filter & HVAC Cleanse', hi: 'केबिन एयर फिल्टर एवं एसी सफाई' },
    type: 'mileage',
    dueText: { en: 'Due at 52,000 km (~3,750 km remaining)', hi: '52,000 किमी पर देय (~3,750 किमी शेष)' },
    urgency: 'watch',
    recommendedService: 'A/C Refresh & Cabin Air'
  }
];

export const FLEET_VEHICLES: FleetVehicleDetail[] = [
  {
    id: 'flt-01',
    regPlate: 'TW72 FLT',
    label: 'Transit Custom 2.0 TDI (Van #01)',
    model: 'TorqueSpec Cargo Van 2.0',
    currentKm: 74200,
    nextDueKm: 80000,
    nextDueDate: '2026-11-15',
    status: 'in-shop',
    downtimeDaysThisQuarter: 1.5,
    assignedDriver: 'Liam Henderson (Logistics)',
    recentDefect: {
      en: 'Rear suspension damper misting detected during Bay 01 spanner work.',
      hi: 'बे 01 पर रियर सस्पेंशन डैम्पर में तेल रिसाव पाया गया।'
    }
  },
  {
    id: 'flt-02',
    regPlate: 'TQ21 NXR',
    label: 'Tourer Estate 2.0D (Van #02)',
    model: 'TorqueSpec Tourer 2.0D',
    currentKm: 62400,
    nextDueKm: 65000,
    nextDueDate: '2026-10-22',
    status: 'due',
    downtimeDaysThisQuarter: 0,
    assignedDriver: 'Sophia Patel (Regional Ops)',
    recentDefect: {
      en: 'Front brake wear indicator lit on dashboard yesterday.',
      hi: 'डैशबोर्ड पर फ्रंट ब्रेक वियर इंडिकेटर जला।'
    }
  },
  {
    id: 'flt-03',
    regPlate: 'TW24 HYB',
    label: 'EcoPulse Hybrid (Staff Pool)',
    model: 'TorqueSpec EcoPulse 1.8',
    currentKm: 28100,
    nextDueKm: 35000,
    nextDueDate: '2027-01-10',
    status: 'ok',
    downtimeDaysThisQuarter: 0.5,
    assignedDriver: 'Pool Vehicle #A'
  },
  {
    id: 'flt-04',
    regPlate: 'TW23 VAN',
    label: 'Cargo L2 Heavy (Van #04)',
    model: 'TorqueSpec LCV Max',
    currentKm: 91400,
    nextDueKm: 95000,
    nextDueDate: '2026-12-05',
    status: 'ok',
    downtimeDaysThisQuarter: 2.0,
    assignedDriver: 'Carlos Mendez'
  }
];

export const PORTAL_MESSAGES: PortalMessage[] = [
  {
    id: 'msg-01',
    sender: 'system',
    senderName: 'Torquewell Telemetry',
    timestamp: 'Today · 14:15',
    content: {
      en: 'Vehicle TW68 AKZ elevated on Bay 04 hoist. Digital micrometer measurements recorded.',
      hi: 'वाहन TW68 AKZ बे 04 होइस्ट पर उठाया गया। डिजिटल माइक्रोमीटर माप रिकॉर्ड किया गया।'
    },
    badge: 'TELEMETRY'
  },
  {
    id: 'msg-02',
    sender: 'technician',
    senderName: 'Tomas Hale (Master Tech #01)',
    timestamp: 'Today · 14:32',
    content: {
      en: 'Hi Sam, your front brake friction lining has worn down to 2.1 mm (factory discard limit is 3.0 mm). I have generated the Proof Report with photos and submitted an approval request below.',
      hi: 'नमस्ते सैम, आपके फ्रंट ब्रेक पैड 2.1 मिमी तक घिस चुके हैं। मैंने तस्वीरों के साथ प्रूफ रिपोर्ट तैयार की है और नीचे अनुमोदन अनुरोध भेजा है।'
    }
  },
  {
    id: 'msg-03',
    sender: 'customer',
    senderName: 'Sam Carter',
    timestamp: 'Today · 14:40',
    content: {
      en: 'Thanks Tomas, reviewing the photos now. Are the brake discs still within thickness spec or do they need replacing too?',
      hi: 'धन्यवाद टॉमस, तस्वीरें देख रहा हूँ। क्या ब्रेक डिस्क अभी ठीक है या उसे भी बदलना पड़ेगा?'
    }
  },
  {
    id: 'msg-04',
    sender: 'technician',
    senderName: 'Tomas Hale (Master Tech #01)',
    timestamp: 'Today · 14:45',
    content: {
      en: 'Great news: The discs measured 21.8 mm with only 0.02 mm runout (well above the 20.0 mm minimum). They can safely stay for another 25,000 km. Only the friction pads require fitting.',
      hi: 'अच्छी खबर: डिस्क की मोटाई 21.8 मिमी है जो 20.0 मिमी की न्यूनतम सीमा से काफी अधिक है। केवल पैड बदलने की आवश्यकता है।'
    }
  }
];
