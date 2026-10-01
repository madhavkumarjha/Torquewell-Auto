import { I18n } from '@/types';

export interface BranchDetail {
  id: string;
  name: string;
  tagline: I18n;
  address: string;
  city: string;
  postcode: string;
  phone: string;
  hours: string;
  baysCount: number;
  managerName: string;
  services: string[];
  equipment: I18n[];
  evCharging: boolean;
  evChargingDetails: I18n;
  accessibility: I18n[];
  directions: I18n;
  coordinates: { x: number; y: number }; // SVG map canvas relative %
}

export const WORKSHOP_BRANCHES: BranchDetail[] = [
  {
    id: 'branch-central',
    name: 'Torquewell Central (Flagship)',
    tagline: {
      en: '8-Bay Precision Facility · Full Mechanical, Chassis & Fleet LCV',
      hi: '8-बे मुख्य कार्यशाला · पूर्ण मैकेनिकल, चेसिस एवं फ्लीट सर्विस'
    },
    address: '14 Precision Way, Industrial Park',
    city: 'London',
    postcode: 'EC1A 4JQ',
    phone: '+44 (0) 20 7946 0192',
    hours: 'Mon–Fri: 07:30 – 18:30 · Sat: 08:00 – 14:00 · Sun: Emergency roadside only',
    baysCount: 8,
    managerName: 'David Torres & Maya Sterling',
    services: [
      'Logbook Servicing',
      'Brake Safety Overhaul',
      'Diagnostic Lab & Oscilloscope',
      'Commercial Fleet LCV',
      '3D 4-Wheel Alignment',
      'MOT Prep & Calibration'
    ],
    equipment: [
      { en: 'Rotary 4.5T Heavy Duty Hoists', hi: '4.5T भारी हाइड्रोलिक लिफ्ट' },
      { en: 'Hunter 3D Laser Alignment Tower', hi: 'हंटर 3D लेजर अलाइनर' },
      { en: 'PicoScope 8-Channel Diagnostic Suite', hi: '8-चैनल डायग्नोस्टिक लैब' },
      { en: 'Dedicated Parts Room & Calibration Rig', hi: 'अंशांकन कक्ष' }
    ],
    evCharging: true,
    evChargingDetails: {
      en: '2× 50kW DC Rapid Chargers + 4× 22kW Type 2 AC Customer Bays',
      hi: '2× 50kW DC फास्ट चार्जर + 4× 22kW AC चार्जिंग बे'
    },
    accessibility: [
      { en: 'Full step-free ground floor customer entrance and bay observation deck', hi: 'स्टेप-फ्री प्रवेश द्वार' },
      { en: 'Induction hearing loop in customer reception area', hi: 'हियरिंग लूप सुविधा' },
      { en: 'Dedicated accessible parking bays immediately adjacent to entrance', hi: 'सुलभ पार्किंग स्थल' },
      { en: 'Quiet sensory waiting area with complimentary Wi-Fi and live tracking', hi: 'शांत वेटिंग लाउंज' }
    ],
    directions: {
      en: 'Located 2 minutes off the A10 Junction. Take Gateway Way and follow signs for Torquewell Auto Flagship.',
      hi: 'A10 जंक्शन से 2 मिनट। गेटवे वे लें और टॉर्कवेल ऑटो मुख्य बोर्ड का पालन करें।'
    },
    coordinates: { x: 50, y: 45 }
  },
  {
    id: 'branch-north',
    name: 'Torquewell North (Chassis & Tyres)',
    tagline: {
      en: '6-Bay Specialist Hub · Alignment, Suspension & High-Performance Tyres',
      hi: '6-बे विशेषज्ञ केंद्र · व्हील अलाइनमेंट, सस्पेंशन व टायर्स'
    },
    address: '88 Wayfarer Boulevard, Northgate',
    city: 'London',
    postcode: 'N12 8TR',
    phone: '+44 (0) 20 7946 0411',
    hours: 'Mon–Fri: 08:00 – 18:00 · Sat: 08:30 – 15:00 · Sun: Closed',
    baysCount: 6,
    managerName: 'Elena Rostova & Jordan Lee',
    services: [
      '3D 4-Wheel Laser Alignment',
      'Suspension & Bushing Overhauls',
      'Tyre Laser Tread Health & Fitting',
      'Brake Disc Micrometer Refacing',
      'Steering Rack Geometry Tuning'
    ],
    equipment: [
      { en: 'Corghi Touchless Tyre Mount & Road-Force Balancer', hi: 'टचलेस टायर माउंटिंग' },
      { en: 'Hunter Hawkeye Elite Optical System', hi: 'ऑप्टिकल अलाइनमेंट टावर' },
      { en: 'Dial Gauge Axial Bearing Play Rig', hi: 'डायल गेज बेयरिंग रिग' }
    ],
    evCharging: true,
    evChargingDetails: {
      en: '2× 22kW Type 2 AC Customer Courtesy Chargers',
      hi: '2× 22kW AC चार्जिंग पॉइंट'
    },
    accessibility: [
      { en: 'Step-free ramped access to customer waiting lounge', hi: 'रैंप सहित स्टेप-फ्री पहुंच' },
      { en: 'Braille and high-contrast digital wayfinding in lounge', hi: 'ब्रेल व हाई-कंट्रास्ट साइनेज' },
      { en: 'Accessible restroom with automated door assist', hi: 'सुलभ शौचालय' }
    ],
    directions: {
      en: 'Directly off North Circular (A406). Turn at Northgate Commerce Park, third unit on the left.',
      hi: 'नॉर्थ सर्कुलर (A406) से सीधे। नॉर्थगेट पार्क में मुड़ें, बाईं ओर तीसरी यूनिट।'
    },
    coordinates: { x: 38, y: 25 }
  },
  {
    id: 'branch-south',
    name: 'Torquewell South (High-Voltage EV & Hybrid)',
    tagline: {
      en: '5-Bay EV Sanctuary · High-Voltage Isolation, Battery Health & Inverter Thermal Systems',
      hi: '5-बे हाई-वोल्टेज ईवी केंद्र · बैटरी स्वास्थ्य व इन्वर्टर कूलिंग'
    },
    address: '42 Volt Parkway, Technology Corridor',
    city: 'London',
    postcode: 'SE10 9ER',
    phone: '+44 (0) 20 7946 0883',
    hours: 'Mon–Fri: 08:00 – 18:00 · Sat: 09:00 – 13:00 · Sun: Closed',
    baysCount: 5,
    managerName: 'Rajesh Sharma',
    services: [
      'EV Battery State of Health (SoH) Diagnostics',
      'High-Voltage Cable & Port Safety Inspection',
      'Hybrid Inverter Cooling Fluid De-Ionised Flush',
      'Regenerative Braking Calibration',
      'Air Conditioning Heat Pump Servicing'
    ],
    equipment: [
      { en: '1000V CAT-IV Full Insulated Tool Suite (IEC 60900)', hi: '1000V इंसुलेटेड टूल्स' },
      { en: 'Dedicated High-Voltage Isolation Safety Bay', hi: 'सुरक्षित एचवी आइसोलेशन बे' },
      { en: 'Fluke Megohmmeter Insulation Resistance Tester', hi: 'इंसुलेशन रेजिस्टेंस टेस्टर' },
      { en: 'Battery Pack Differential Voltage Analyzer', hi: 'सेल वोल्टेज एनालाइजर' }
    ],
    evCharging: true,
    evChargingDetails: {
      en: '4× 150kW Ultra-Rapid DC Chargers + 4× 22kW AC Destination Chargers',
      hi: '4× 150kW अल्ट्रा-रैपिड DC चार्जर्स + 4× 22kW AC'
    },
    accessibility: [
      { en: 'Step-free level access throughout reception, lounge, and EV charging plazas', hi: 'पूर्णतः लेवल स्टेप-फ्री पहुंच' },
      { en: 'Assisted charging cables with counterbalanced overhead arms', hi: 'असिस्टेड चार्जिंग केबल' },
      { en: 'Low-sensory quiet work cubicles for customers waiting during services', hi: 'शांत कार्यस्थल केबिन' }
    ],
    directions: {
      en: 'Located next to the Green Tech Innovation Hub. Take Junction 3 of South Expressway.',
      hi: 'ग्रीन टेक हब के बगल में। साउथ एक्सप्रेसवे के जंक्शन 3 से पहुंचें।'
    },
    coordinates: { x: 62, y: 70 }
  }
];
