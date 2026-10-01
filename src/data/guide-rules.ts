import { GuideState, GuideResult, I18n } from '@/types';

export interface WarningLightDef {
  id: string;
  name: I18n;
  color: 'red' | 'amber';
  svgPath: string;
  desc: I18n;
  defaultUrgency: 'stop' | 'careful' | 'week' | 'routine';
}

export interface RedFlagDef {
  id: string;
  label: I18n;
  desc: I18n;
}

export interface SymptomDef {
  id: string;
  category: 'sound' | 'feeling' | 'smell' | 'fluid' | 'start';
  label: I18n;
  desc: I18n;
  urgency: 'stop' | 'careful' | 'week' | 'routine';
}

export const RED_FLAGS: RedFlagDef[] = [
  {
    id: 'brake-soft',
    label: {
      en: 'Brake pedal feels soft, spongy, or sinks to floor',
      hi: 'ब्रेक पेडल बहुत नरम है या नीचे तक धंस जाता है',
    },
    desc: {
      en: 'Immediate hydraulic pressure loss or severe fluid leak. Vehicle cannot stop safely.',
      hi: 'हाइड्रोलिक दबाव की तत्काल हानि या गंभीर रिसाव। वाहन सुरक्षित रूप से रुक नहीं सकता।',
    },
  },
  {
    id: 'steering-loss',
    label: {
      en: 'Sudden loss of steering control or heavy lock-up',
      hi: 'स्टीयरिंग नियंत्रण का अचानक समाप्त होना या भारी जाम होना',
    },
    desc: {
      en: 'Power steering rack or hydraulic belt failure. Dangerous to navigate traffic.',
      hi: 'पावर स्टीयरिंग रैक या बेल्ट विफलता। वाहन मोड़ना अत्यंत खतरनाक है।',
    },
  },
  {
    id: 'oil-pressure-red',
    label: {
      en: 'Red oil pressure can light is illuminated',
      hi: 'लाल तेल दबाव चेतावनी लाइट जल रही है',
    },
    desc: {
      en: 'Internal engine oil starvation. Engine will seize within minutes if driven.',
      hi: 'इंजन में तेल का दबाव समाप्त हो गया है। चलाने पर इंजन सीज हो सकता है।',
    },
  },
  {
    id: 'temp-steam',
    label: {
      en: 'Temperature gauge in red, warning buzzer, or steam from hood',
      hi: 'तापमान सुई लाल निशान पर या बोनट से भाप निकल रही है',
    },
    desc: {
      en: 'Extreme overheating. Risk of head gasket rupture or permanent engine warp.',
      hi: 'गंभीर ओवरहीटिंग। इंजन हेड गैस्केट फटने का अत्यधिक जोखिम।',
    },
  },
  {
    id: 'smoke-fuel-smell',
    label: {
      en: 'Visible smoke or strong raw fuel smell inside vehicle',
      hi: 'वाहन के अंदर घना धुआं या कच्चे ईंधन की तेज गंध',
    },
    desc: {
      en: 'Active fuel line leak or electrical short circuit. High fire risk.',
      hi: 'ईंधन लाइन रिसाव या बिजली शॉर्ट सर्किट। आग लगने का खतरा।',
    },
  },
  {
    id: 'ev-hv-warning',
    label: {
      en: 'EV/Hybrid high-voltage fault with burning odour',
      hi: 'ईवी/हाइब्रिड उच्च वोल्टेज खराबी और जलने की गंध',
    },
    desc: {
      en: 'High-voltage traction battery or inverter thermal alert. Do not charge or enter cabin.',
      hi: 'उच्च वोल्टेज बैटरी या इन्वर्टर थर्मल अलर्ट। तुरंत सुरक्षित दूरी बनाएं।',
    },
  },
];

export const WARNING_LIGHTS: WarningLightDef[] = [
  {
    id: 'oil-pressure',
    name: { en: 'Oil Pressure Alert', hi: 'इंजन तेल दबाव' },
    color: 'red',
    svgPath: '/img/icons/lights/oil-pressure.svg',
    desc: { en: 'Low oil pressure. Stop immediately.', hi: 'तेल का दबाव कम। तुरंत वाहन रोकें।' },
    defaultUrgency: 'stop',
  },
  {
    id: 'engine-temp',
    name: { en: 'Coolant Temperature', hi: 'शीतलक तापमान' },
    color: 'red',
    svgPath: '/img/icons/lights/engine-temp.svg',
    desc: { en: 'Severe engine overheating.', hi: 'इंजन अधिक गर्म हो रहा है।' },
    defaultUrgency: 'stop',
  },
  {
    id: 'brake-system',
    name: { en: 'Brake Warning', hi: 'ब्रेक चेतावनी' },
    color: 'red',
    svgPath: '/img/icons/lights/brake-system.svg',
    desc: { en: 'Hydraulic fault or low brake fluid.', hi: 'हाइड्रोलिक खराबी या कम ब्रेक ऑयल।' },
    defaultUrgency: 'stop',
  },
  {
    id: 'battery-charge',
    name: { en: 'Alternator / Charging', hi: 'बैटरी चार्जिंग' },
    color: 'red',
    svgPath: '/img/icons/lights/battery-charge.svg',
    desc: { en: 'Charging system offline. Car will stall.', hi: 'चार्जिंग बंद। कार अचानक बंद हो सकती है।' },
    defaultUrgency: 'careful',
  },
  {
    id: 'power-steering',
    name: { en: 'Power Steering', hi: 'पावर स्टीयरिंग' },
    color: 'red',
    svgPath: '/img/icons/lights/power-steering.svg',
    desc: { en: 'Steering assist failure.', hi: 'स्टीयरिंग सहायता विफल।' },
    defaultUrgency: 'stop',
  },
  {
    id: 'airbag-srs',
    name: { en: 'Airbag / SRS', hi: 'एयरबैग एसआरएस' },
    color: 'red',
    svgPath: '/img/icons/lights/airbag-srs.svg',
    desc: { en: 'Safety restraints deactivated.', hi: 'सुरक्षा संयम निष्क्रिय।' },
    defaultUrgency: 'week',
  },
  {
    id: 'check-engine',
    name: { en: 'Check Engine (MIL)', hi: 'इंजन जांच लाइट' },
    color: 'amber',
    svgPath: '/img/icons/lights/check-engine.svg',
    desc: { en: 'Engine/emissions control fault.', hi: 'इंजन या उत्सर्जन सेंसर दोष।' },
    defaultUrgency: 'week',
  },
  {
    id: 'abs',
    name: { en: 'Anti-lock Brakes (ABS)', hi: 'एबीएस सिस्टम' },
    color: 'amber',
    svgPath: '/img/icons/lights/abs.svg',
    desc: { en: 'Normal braking works; anti-skid offline.', hi: 'सामान्य ब्रेक कार्यरत; एंटी-स्किड बंद।' },
    defaultUrgency: 'careful',
  },
  {
    id: 'tyre-pressure',
    name: { en: 'Tyre Pressure (TPMS)', hi: 'टायर हवा दबाव' },
    color: 'amber',
    svgPath: '/img/icons/lights/tyre-pressure.svg',
    desc: { en: 'Low pressure in one or more tyres.', hi: 'एक या अधिक टायरों में हवा कम।' },
    defaultUrgency: 'careful',
  },
  {
    id: 'traction-esp',
    name: { en: 'Traction / Stability', hi: 'ट्रैक्शन स्थिरता' },
    color: 'amber',
    svgPath: '/img/icons/lights/traction-esp.svg',
    desc: { en: 'Stability control inactive or engaged.', hi: 'स्थिरता नियंत्रण निष्क्रिय।' },
    defaultUrgency: 'careful',
  },
  {
    id: 'glow-plug',
    name: { en: 'Glow Plug (Diesel)', hi: 'ग्लो प्लग' },
    color: 'amber',
    svgPath: '/img/icons/lights/glow-plug.svg',
    desc: { en: 'Diesel pre-heating or engine management.', hi: 'डीजल प्री-हीटिंग दोष।' },
    defaultUrgency: 'week',
  },
  {
    id: 'dpf',
    name: { en: 'Particulate Filter (DPF)', hi: 'पार्टिकुलेट फिल्टर' },
    color: 'amber',
    svgPath: '/img/icons/lights/dpf.svg',
    desc: { en: 'Exhaust soot filter regeneration needed.', hi: 'सूट फिल्टर सफाई की आवश्यकता।' },
    defaultUrgency: 'week',
  },
  {
    id: 'coolant-level',
    name: { en: 'Coolant Level Low', hi: 'कम शीतलक स्तर' },
    color: 'amber',
    svgPath: '/img/icons/lights/coolant-level.svg',
    desc: { en: 'Radiator reservoir level below min.', hi: 'रेडिएटर में कूलेंट न्यूनतम से कम।' },
    defaultUrgency: 'careful',
  },
  {
    id: 'transmission',
    name: { en: 'Gearbox / Transmission', hi: 'गियरबॉक्स खराबी' },
    color: 'amber',
    svgPath: '/img/icons/lights/transmission.svg',
    desc: { en: 'Automatic gearbox limp mode.', hi: 'ऑटोमैटिक गियरबॉक्स लिम्प मोड।' },
    defaultUrgency: 'careful',
  },
  {
    id: 'ev-high-voltage',
    name: { en: 'EV Electrical System', hi: 'ईवी विद्युत प्रणाली' },
    color: 'red',
    svgPath: '/img/icons/lights/ev-high-voltage.svg',
    desc: { en: 'Electric drivetrain fault.', hi: 'इलेक्ट्रिक ड्राइवट्रेन खराबी।' },
    defaultUrgency: 'stop',
  },
  {
    id: 'service-due',
    name: { en: 'Scheduled Service Due', hi: 'नियमित सर्विस देय' },
    color: 'amber',
    svgPath: '/img/icons/lights/service-due.svg',
    desc: { en: 'Routine maintenance mileage reached.', hi: 'नियमित रखरखाव का समय पूरा।' },
    defaultUrgency: 'routine',
  },
];

export const SYMPTOMS: SymptomDef[] = [
  {
    id: 'squeal-braking',
    category: 'sound',
    label: { en: 'High-pitched squeal when pressing brakes', hi: 'ब्रेक दबाने पर तीखी सीटी की आवाज' },
    desc: { en: 'Friction pad wear indicators making contact with rotor.', hi: 'ब्रेक पैड घिसाव चेतावनी पिन डिस्क को छू रही है।' },
    urgency: 'week',
  },
  {
    id: 'grind-braking',
    category: 'sound',
    label: { en: 'Harsh metallic grinding sound while braking', hi: 'ब्रेक लगाते समय धातु घिसने की आवाज' },
    desc: { en: 'Brake friction material fully worn; metal backing plate contacting rotor.', hi: 'पैड पूरी तरह खत्म; प्लेट सीधे डिस्क पर रगड़ रही है।' },
    urgency: 'stop',
  },
  {
    id: 'steering-vibration',
    category: 'feeling',
    label: { en: 'Vibration in steering wheel at 80–110 km/h', hi: '80–110 किमी/घंटा पर स्टीयरिंग में कंपन' },
    desc: { en: 'Front wheel assembly imbalance or tire deformity.', hi: 'आगे के पहियों का असंतुलन या टायर विकृति।' },
    urgency: 'careful',
  },
  {
    id: 'pulling-one-side',
    category: 'feeling',
    label: { en: 'Car constantly drifts or pulls to one side', hi: 'कार लगातार एक तरफ खिंचती है' },
    desc: { en: 'Wheel alignment out of spec or uneven tire pressure.', hi: 'व्हील संरेखण बिगड़ा हुआ या असमान हवा दबाव।' },
    urgency: 'careful',
  },
  {
    id: 'sweet-smell',
    category: 'smell',
    label: { en: 'Syrupy sweet smell from vents or hood', hi: 'एसी या बोनट से मीठी चाशनी जैसी गंध' },
    desc: { en: 'Engine coolant leaking from radiator hose or heater core.', hi: 'रेडिएटर या हीटर कोर से कूलेंट रिसाव।' },
    urgency: 'careful',
  },
  {
    id: 'green-blue-puddle',
    category: 'fluid',
    label: { en: 'Bright green, pink, or blue puddle under front bumper', hi: 'बम्पर के नीचे हरा, गुलाबी या नीला तरल' },
    desc: { en: 'Cooling system leak. Overheating risk if level drops.', hi: 'कूलिंग सिस्टम रिसाव। कूलेंट कम होने पर खतरा।' },
    urgency: 'careful',
  },
  {
    id: 'dark-oil-puddle',
    category: 'fluid',
    label: { en: 'Dark brown or black slippery puddle under engine', hi: 'इंजन के नीचे काला गाढ़ा तेल रिसाव' },
    desc: { en: 'Engine oil sump plug, filter seal, or gasket seepage.', hi: 'इंजन ऑयल संम्प या फिल्टर सील से रिसाव।' },
    urgency: 'careful',
  },
  {
    id: 'engine-shaking',
    category: 'feeling',
    label: { en: 'Rough idle, heavy shudder, or sudden power drop', hi: 'इंजन का भारी कंपन या अचानक शक्ति में कमी' },
    desc: { en: 'Cylinder misfire, ignition coil, or fuel delivery fault.', hi: 'सिलेंडर मिसफायर या इग्निशन कॉइल खराबी।' },
    urgency: 'careful',
  },
];

export const TRIGGERS = [
  { id: 'cold', label: { en: 'First thing in morning / cold start', hi: 'सुबह पहली शुरुआत / ठंडे इंजन पर' } },
  { id: 'braking', label: { en: 'Only when applying brakes', hi: 'केवल ब्रेक लगाने पर' } },
  { id: 'turning', label: { en: 'When turning full lock', hi: 'स्टीयरिंग पूरा मोड़ने पर' } },
  { id: 'speed', label: { en: 'Only at highway speeds (>80 km/h)', hi: 'केवल तेज गति (>80 किमी/घंटा) पर' } },
  { id: 'ac', label: { en: 'When Air Conditioning is on', hi: 'जब एसी चालू हो' } },
  { id: 'continuous', label: { en: 'Continuous / all the time', hi: 'लगातार / हर समय' } },
];

/**
 * Transparent Safety Decision Engine
 * Always prioritizes driver safety: chooses strictest level when conflicting.
 */
export function evaluateGuideTriage(state: GuideState): GuideResult {
  // 1. RULE: Absolute Red-Flag Check
  if (state.redFlags && state.redFlags.length > 0) {
    return {
      level: 'stop',
      areas: [
        { en: 'Braking hydraulics and master cylinder', hi: 'ब्रेक हाइड्रोलिक्स और मास्टर सिलेंडर' },
        { en: 'Steering rack, tie-rods, and EPS control unit', hi: 'स्टीयरिंग रैक और इलेक्ट्रॉनिक कंट्रोल' },
        { en: 'Engine lubrication and cooling circuit', hi: 'इंजन स्नेहन और कूलिंग सर्किट' },
      ],
      note: [
        { en: 'Critical red-flag condition reported. Do not operate on public roads.', hi: 'गंभीर लाल झंडा स्थिति दर्ज की गई। सार्वजनिक सड़कों पर न चलाएं।' },
        { en: 'Turn on hazard flashers and guide vehicle to a safe verge if moving.', hi: 'हैज़र्ड लाइट चालू करें और वाहन को सुरक्षित स्थान पर रोकें।' },
        { en: 'Request flatbed recovery. Do not attempt roadside hydraulic repairs.', hi: 'फ्लैटबेड रिकवरी वाहन बुलाएं। सड़क पर हाइड्रोलिक मरम्मत न करें।' },
      ],
      ask: [
        { en: 'What was the hydraulic pressure reading on the test bench?', hi: 'टेस्ट बेंच पर हाइड्रोलिक दबाव कितना था?' },
        { en: 'Is flatbed recovery mandatory for this steering/brake state?', hi: 'क्या इस स्थिति में फ्लैटबेड रिकवरी अनिवार्य है?' },
      ],
      bring: ['Vehicle registration document', 'Locking wheel nut key', 'Insurance policy roadside number'],
      disclaimerId: 'safety-critical-stop',
    };
  }

  // 2. RULE: Red Warning Lights (Oil, Temp, Brake)
  const hasCriticalRedLight = state.lights?.some((l) =>
    ['oil-pressure', 'engine-temp', 'brake-system', 'ev-high-voltage'].includes(l)
  );
  if (hasCriticalRedLight) {
    return {
      level: 'stop',
      areas: [
        { en: 'Oil pressure sensor and oil pump pressure delivery', hi: 'ऑयल प्रेशर सेंसर और पंप डिलीवरी' },
        { en: 'Radiator pressure cap, water pump, and thermostat', hi: 'रेडिएटर कैप, वॉटर पंप और थर्मोस्टेट' },
        { en: 'Brake fluid reservoir level and caliper seals', hi: 'ब्रेक ऑयल स्तर और कैलिपर सील' },
      ],
      note: [
        { en: 'Red dashboard symbols require immediate engine shutdown.', hi: 'लाल डैशबोर्ड लाइट दिखने पर तुरंत इंजन बंद करें।' },
        { en: 'Running without oil or coolant causes catastrophic internal seizure.', hi: 'बिना तेल या कूलेंट के चलने से इंजन पूरी तरह नष्ट हो सकता है।' },
      ],
      ask: [
        { en: 'Did the engine sustain heat deformation on the cylinder head?', hi: 'क्या सिलेंडर हेड पर अत्यधिक गर्मी का असर हुआ है?' },
        { en: 'Can you show me the diagnostic trouble code (DTC) printout?', hi: 'क्या आप मुझे स्कैन डायग्नोस्टिक कोड प्रिंटआउट दिखा सकते हैं?' },
      ],
      bring: ['Vehicle handbook', 'Recent service invoices', 'Tow driver drop-off note'],
      disclaimerId: 'dashboard-red-light',
    };
  }

  // 3. RULE: Metallic grinding while braking
  if (state.symptoms?.includes('grind-braking')) {
    return {
      level: 'stop',
      areas: [
        { en: 'Front and rear brake disc rotors for scoring grooves', hi: 'आगे और पीछे के ब्रेक डिस्क रोटर' },
        { en: 'Friction pad backing plates and caliper slider pins', hi: 'पैड प्लेट्स और कैलिपर स्लाइडर पिन' },
      ],
      note: [
        { en: 'Metal-on-metal contact means stopping distances are severely extended.', hi: 'धातु घिसने का अर्थ है रुकने की दूरी काफी बढ़ चुकी है।' },
        { en: 'Discs likely require micrometer thickness check and potential replacement.', hi: 'डिस्क की मोटाई माइक्रोमीटर से नापकर बदलने की आवश्यकता होगी।' },
      ],
      ask: [
        { en: 'What is the remaining disc thickness vs the manufacturer minimum stamp?', hi: 'डिस्क की बची हुई मोटाई न्यूनतम सीमा से कितनी है?' },
        { en: 'Are OE-equivalent pads available with a warranty?', hi: 'क्या वारंटी वाले ओई-समतुल्य पैड उपलब्ध हैं?' },
      ],
      bring: ['Car keys', 'Locking wheel nut key'],
      disclaimerId: 'brakes-metal-grind',
    };
  }

  // 4. RULE: Flashing Engine Light or Engine Shaking
  if (state.lights?.includes('check-engine') && state.symptoms?.includes('engine-shaking')) {
    return {
      level: 'careful',
      areas: [
        { en: 'Ignition coils and spark plugs', hi: 'इग्निशन कॉइल और स्पार्क प्लग' },
        { en: 'High-pressure fuel injectors and intake vacuum hoses', hi: 'फ्यूल इंजेक्टर और वैक्यूम पाइप' },
        { en: 'Catalytic converter exhaust temperature', hi: 'कैटेलिटिक कन्वर्टर निकास तापमान' },
      ],
      note: [
        { en: 'Active engine misfire. Unburnt fuel entering exhaust can ruin catalytic converter.', hi: 'सक्रिय मिसफायर। कच्चा ईंधन साइलेंसर कैटेलिटिक कन्वर्टर को नुकसान पहुंचा सकता है।' },
        { en: 'Drive under 50 km/h with gentle throttle straight to the workshop.', hi: 'हल्के पैर से 50 किमी/घंटा से नीचे सीधे वर्कशॉप जाएं।' },
      ],
      ask: [
        { en: 'Which cylinder threw the misfire fault code (P0300–P0304)?', hi: 'किस सिलेंडर में मिसफायर कोड दर्ज हुआ है?' },
        { en: 'Is the catalytic converter inlet showing heat discolouration?', hi: 'क्या कैटेलिटिक कन्वर्टर सुरक्षित है?' },
      ],
      bring: ['Fuel grade receipt', 'Service record'],
      disclaimerId: 'misfire-warning',
    };
  }

  // 5. RULE: Brakes squeal only (without grinding)
  if (state.symptoms?.includes('squeal-braking') && !state.symptoms?.includes('grind-braking')) {
    return {
      level: 'week',
      areas: [
        { en: 'Brake pad friction material thickness (mm)', hi: 'ब्रेक पैड घिसाव मोटाई (मिमी)' },
        { en: 'Anti-squeal shims and hardware clips', hi: 'एंटी-स्क्वील शिम और क्लिप्स' },
      ],
      note: [
        { en: 'Friction pads have reached acoustic wear tab (~2.5–3.0 mm remaining).', hi: 'पैड चेतावनी पिन तक घिस चुके हैं (~2.5–3.0 मिमी शेष)।' },
        { en: 'Safe for local driving this week, but plan replacement soon.', hi: 'इस सप्ताह स्थानीय ड्राइविंग सुरक्षित है, पर जल्द बदलाव कराएं।' },
      ],
      ask: [
        { en: 'What is the measured pad thickness on inner and outer sides?', hi: 'अंदर और बाहर के पैड की नापी गई मोटाई कितनी है?' },
      ],
      bring: ['Wheel lock nut key'],
      disclaimerId: 'brake-pads-wear',
    };
  }

  // 6. RULE: Tyre pressure or Steering pull
  if (state.lights?.includes('tyre-pressure') || state.symptoms?.includes('pulling-one-side')) {
    return {
      level: 'careful',
      areas: [
        { en: 'Cold tyre pressure and bead seal integrity', hi: 'ठंडे टायर का हवा दबाव और बीड सील' },
        { en: 'Tread depth measurement across inner, centre, and outer ribs', hi: 'ट्रेड गहराई माप (अंदर, मध्य, बाहर)' },
        { en: 'Laser 4-wheel alignment geometry', hi: 'लेजर 4-पहिया संरेखण' },
      ],
      note: [
        { en: 'Inspect tyre sidewalls for bulges or foreign nails before highway driving.', hi: 'हाईवे पर जाने से पहले टायर में कील या उभार की जांच करें।' },
      ],
      ask: [
        { en: 'Did the tyre fail due to puncture or bead rim corrosion?', hi: 'क्या रिसाव पंक्चर या रिम जंग की वजह से है?' },
      ],
      bring: ['Tyre warranty booklet if available'],
      disclaimerId: 'tyres-alignment',
    };
  }

  // 7. RULE: Scheduled Service or Routine
  if (state.lights?.includes('service-due')) {
    return {
      level: 'routine',
      areas: [
        { en: 'Engine oil and filter change', hi: 'इंजन तेल और फिल्टर परिवर्तन' },
        { en: 'Air, cabin pollen, and fuel filters', hi: 'हवा, केबिन और ईंधन फिल्टर' },
        { en: 'Full 36-point safety check', hi: 'संपूर्ण 36-बिंदु सुरक्षा निरीक्षण' },
      ],
      note: [
        { en: 'Routine scheduled mileage reached. Safe to plan booking in upcoming 2 weeks.', hi: 'नियमित माइलेज पूरा हुआ। अगले 2 सप्ताह में सर्विस बुक करें।' },
      ],
      ask: [
        { en: 'Do you use manufacturer-specified oil viscosity grade?', hi: 'क्या आप निर्माता-अनुमोदित ऑयल ग्रेड का उपयोग करते हैं?' },
      ],
      bring: ['Service logbook for technician stamp'],
      disclaimerId: 'routine-service',
    };
  }

  // Default: Indicative inspection guidance
  return {
    level: 'week',
    areas: [
      { en: 'Electronic OBD-II diagnostic scan', hi: 'इलेक्ट्रॉनिक ओबीडी-2 स्कैन' },
      { en: 'Underbody visual and suspension inspection', hi: 'वाहन के नीचे सस्पेंशन और विजुअल जांच' },
    ],
    note: [
      { en: 'Vehicle is operational but requires calibrated inspection to prevent secondary wear.', hi: 'वाहन चालू स्थिति में है पर आगे के नुकसान से बचने हेतु जांच कराएं।' },
    ],
    ask: [
      { en: 'Can I see the photo evidence of any component recommended for repair?', hi: 'क्या मुझे बदलने वाले पार्ट्स की फोटो दिखाई जाएगी?' },
    ],
    bring: ['Registration papers', 'Key with locking fob'],
    disclaimerId: 'standard-assessment',
  };
}
