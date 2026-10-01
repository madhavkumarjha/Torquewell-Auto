import { Service } from '@/types';

export const WORKSHOP_SERVICES: Service[] = [
  {
    slug: 'service',
    name: {
      en: 'Logbook, Interim & Full Service',
      hi: 'लॉगबुक, अंतरिम और पूर्ण सर्विस'
    },
    summary: {
      en: 'Manufacturer-schedule servicing with verified torque settings and digital evidence.',
      hi: 'निर्माता के शेड्यूल अनुसार सर्विसिंग, सत्यापित टॉर्क सेटिंग्स और डिजिटल प्रमाण।'
    },
    icon: 'Wrench',
    image: '/img/hero/hero-01.svg',
    covers: [
      { en: 'Synthetic oil drain and calibrated torque sump plug seal', hi: 'सिंथेटिक तेल निकासी और टॉर्क संप प्लग सील' },
      { en: 'OEM-grade oil filter, sump washer, and pollen cabin filter', hi: 'ओईएम-ग्रेड तेल फिल्टर और केबिन फिल्टर' },
      { en: '45-point mechanical, electrical, and tyre tread safety scan', hi: '45-बिंदु यांत्रिक, विद्युत और टायर सुरक्षा स्कैन' },
      { en: 'Digital battery health conductance test and fluid boiling points', hi: 'डिजिटल बैटरी स्वास्थ्य और द्रव क्वथनांक परीक्षण' }
    ],
    signs: [
      { en: 'Service warning light or countdown message on instrument cluster', hi: 'डैशबोर्ड पर सर्विस चेतावनी लाइट या संदेश' },
      { en: 'Over 12 months or 15,000 km since previous certified service', hi: 'पिछली सर्विस को 12 महीने या 15,000 किमी से अधिक समय' },
      { en: 'Sluggish cold start or decreased fuel efficiency', hi: 'ठंड में देर से स्टार्ट होना या माइलेज में कमी' }
    ],
    checks: [
      { en: 'Engine oil level, viscosity, and seal integrity', hi: 'इंजन तेल का स्तर, चिपचिपापन और सील' },
      { en: 'Air filter and spark plugs/glow plugs condition', hi: 'एयर फिल्टर और स्पार्क/ग्लो प्लग की स्थिति' },
      { en: 'Brake fluid hygroscopic moisture percentage', hi: 'ब्रेक द्रव में नमी का प्रतिशत' },
      { en: 'Underbody chassis fasteners and suspension ball joints', hi: 'निचले चेसिस बोल्ट और सस्पेंशन बॉल जॉइंट्स' }
    ],
    timeRangeMin: [90, 240],
    priceBand: [140, 280],
    partsOptions: ['TorqueSpec OE', 'OE-Equivalent', 'Quality Aftermarket'],
    askUs: [
      { en: 'Will you keep my old spark plugs and filters to show me?', hi: 'क्या आप पुराने प्लग और फिल्टर मुझे दिखाने के लिए रखेंगे?' },
      { en: 'Does this service protect my manufacturer statutory warranty?', hi: 'क्या इस सर्विस से मेरी वाहन वारंटी सुरक्षित रहेगी?' }
    ],
    related: ['brakes', 'cooling', 'battery-electrics']
  },
  {
    slug: 'brakes',
    name: {
      en: 'Brakes & Hydraulic System',
      hi: 'ब्रेक और हाइड्रोलिक प्रणाली'
    },
    covers: [
      { en: 'Disc micrometer thickness and lateral runout measurement', hi: 'डिस्क माइक्रोमीटर मोटाई और रनआउट मापन' },
      { en: 'Pad friction depth inspection and caliper slider lubrication', hi: 'पैड घर्षण गहराई और कैलिपर स्लाइडर ग्रीसिंग' },
      { en: 'Brake fluid boiling point refractometer test and pressure bleed', hi: 'ब्रेक द्रव क्वथनांक परीक्षण और प्रेशर ब्लीड' },
      { en: 'Handbrake cable adjustment and ABS electronic valve scan', hi: 'हैंडब्रेक केबल समायोजन और एबीएस इलेक्ट्रॉनिक स्कैन' }
    ],
    summary: {
      en: 'Pads, discs, hydraulic pressure flush, and dial-gauge runout verification.',
      hi: 'पैड, डिस्क, हाइड्रोलिक प्रेशर फ्लश और डायल-गेज रनआउट सत्यापन।'
    },
    icon: 'Disc',
    image: '/img/proof/brake-pad-worn.svg',
    signs: [
      { en: 'High-pitched squealing or grinding noise when applying brakes', hi: 'ब्रेक लगाने पर चीखने या रगड़ने की तेज आवाज' },
      { en: 'Steering wheel vibration or pulsing brake pedal at motorway speeds', hi: 'तेज गति पर ब्रेक लगाने पर स्टीयरिंग या पेडल में कंपन' },
      { en: 'Spongy brake pedal requiring extra foot travel to stop', hi: 'स्पंजी पेडल जिससे रुकने में ज्यादा दबाव लगाना पड़े' }
    ],
    checks: [
      { en: 'Front and rear pad friction thickness (minimum 3.0 mm)', hi: 'आगे और पीछे के पैड की मोटाई (न्यूनतम 3.0 मिमी)' },
      { en: 'Rotor disc discard thickness and outer lip height', hi: 'रोटर डिस्क की मोटाई और बाहरी किनारे की ऊंचाई' },
      { en: 'Flexible rubber brake hoses for cracks or bulges', hi: 'रबर ब्रेक होज में दरारें या सूजन' },
      { en: 'Caliper piston boot seals for fluid weeping', hi: 'कैलिपर पिस्टन सील से रिसाव की जांच' }
    ],
    timeRangeMin: [60, 180],
    priceBand: [95, 340],
    partsOptions: ['TorqueSpec OE', 'OE-Equivalent', 'High-Carbon Rotors'],
    askUs: [
      { en: 'Can you show me the micrometer reading on my brake discs?', hi: 'क्या आप मुझे माइक्रोमीटर पर डिस्क की रीडिंग दिखा सकते हैं?' }
    ],
    related: ['tyres-alignment', 'suspension-steering']
  },
  {
    slug: 'tyres-alignment',
    name: {
      en: 'Tyres & Wheel Alignment',
      hi: 'टायर और व्हील अलाइनमेंट'
    },
    summary: {
      en: 'Laser 4-wheel geometry alignment, tread depth gauge scans, and precision dynamic balancing.',
      hi: 'लेजर 4-व्हील ज्यामिति अलाइनमेंट, ट्रेड गहराई स्कैन और डिजिटल व्हील बैलेंसिंग।'
    },
    icon: 'CircleDot',
    image: '/img/proof/tyre-tread-worn.svg',
    covers: [
      { en: 'Digital tread depth gauge scanning across 3 tyre zones', hi: '3 क्षेत्रों में डिजिटल ट्रेड गहराई मापन' },
      { en: '4-wheel optical laser toe, camber, and caster adjustment', hi: '4-व्हील ऑप्टिकल लेजर टो, कैम्बर और कैस्टर सेटिंग' },
      { en: 'Dynamic digital spin balancing to eliminate 100 km/h shimmy', hi: 'हाई-स्पीड स्टीयरिंग कंपन हटाने के लिए बैलेंसिंग' },
      { en: 'Tyre Pressure Monitoring System (TPMS) sensor battery scan', hi: 'टीपीएमएस सेंसर बैटरी और प्रेशर कैलिब्रेशन' }
    ],
    signs: [
      { en: 'Car steadily pulls or drifts to one side on flat roads', hi: 'सपाट सड़क पर गाड़ी का एक तरफ खिंचना' },
      { en: 'Uneven or rapid tyre wear on inner or outer shoulders', hi: 'टायर के भीतरी या बाहरी किनारे का ज्यादा घिसना' },
      { en: 'Steering wheel off-centre when driving straight', hi: 'सीधे चलते समय स्टीयरिंग का तिरछा रहना' }
    ],
    checks: [
      { en: 'Tread depth relative to 1.6 mm legal minimum and 3.0 mm wet limit', hi: '1.6 मिमी कानूनी सीमा और 3.0 मिमी गीली सीमा के सापेक्ष गहराई' },
      { en: 'Tyre DOT manufacture date code and sidewall perishing', hi: 'टायर निर्माण तिथि कोड और साइडवॉल दरारें' },
      { en: 'Rim bead seat corrosion and valve stem seals', hi: 'रिम बीड जंग और वाल्व सील' }
    ],
    timeRangeMin: [30, 90],
    priceBand: [45, 260],
    partsOptions: ['Premium Touring', 'Mid-Range Eco', 'All-Season Compound'],
    askUs: [
      { en: 'Will you provide a printed before-and-after laser alignment sheet?', hi: 'क्या आप अलाइनमेंट से पहले और बाद की प्रिंटेड रिपोर्ट देंगे?' }
    ],
    related: ['suspension-steering', 'brakes']
  },
  {
    slug: 'suspension-steering',
    name: {
      en: 'Suspension & Steering',
      hi: 'सस्पेंशन और स्टीयरिंग'
    },
    summary: {
      en: 'Damper hydraulic leak tests, coil spring inspection, and control arm bush deflection checks.',
      hi: 'डैम्पर रिसाव परीक्षण, कॉइल स्प्रिंग जांच और कंट्रोल आर्म बुश लचीलापन परीक्षण।'
    },
    icon: 'Layers',
    image: '/img/car/layers/suspension.svg',
    covers: [
      { en: 'Hydraulic shock absorber bounce rate and misting check', hi: 'शॉक एब्जॉर्बर बाउंस दर और तेल रिसाव जांच' },
      { en: 'Coil spring fracture and protective powder coat check', hi: 'कॉइल स्प्रिंग टूटने और कोटिंग की जांच' },
      { en: 'Pry-bar deflection measurement on control arm rubber bushes', hi: 'कंट्रोल आर्म रबर बुश का लचीलापन मापन' },
      { en: 'Steering rack tie-rod end and anti-roll bar link ball joints', hi: 'स्टीयरिंग टाई-रॉड और एंटी-रोल बार बॉल जॉइंट्स' }
    ],
    signs: [
      { en: 'Dull thud or knocking noise when driving over speed humps', hi: 'स्पीड ब्रेकर या गड्ढों पर खट-खट की आवाज' },
      { en: 'Excessive body roll around corners or nose-diving under braking', hi: 'मोड़ों पर गाड़ी का ज्यादा झुकना या ब्रेक पर आगे दबना' },
      { en: 'Vague steering feel or free play in the steering wheel', hi: 'स्टीयरिंग में ढीलापन या देरी से प्रतिक्रिया' }
    ],
    checks: [
      { en: 'Damper piston rod chrome pitting and seal integrity', hi: 'डैम्पर पिस्टन रॉड पर जंग और सील' },
      { en: 'Lower wishbone bonding rubber for splitting or detachment', hi: 'विशबोन रबर में दरारें या अलग होना' },
      { en: 'Wheel bearing radial play and audible hum test', hi: 'व्हील बेयरिंग में ढीलापन और आवाज की जांच' }
    ],
    timeRangeMin: [60, 240],
    priceBand: [85, 380],
    partsOptions: ['TorqueSpec OE', 'Heavy-Duty Reinforced'],
    askUs: [
      { en: 'Can I see the play in the joint while the car is on the lift?', hi: 'क्या मैं लिफ्ट पर गाड़ी के जोड़ का ढीलापन देख सकता हूँ?' }
    ],
    related: ['tyres-alignment', 'brakes']
  },
  {
    slug: 'diagnostics',
    name: {
      en: 'Engine & Electrical Diagnostics',
      hi: 'इंजन और इलेक्ट्रिकल डायग्नोस्टिक्स'
    },
    summary: {
      en: 'Deep OBD-II multi-module scan plus oscilloscope live signal waveform analysis.',
      hi: 'डीप ओबीडी-II मल्टी-मॉड्यूल स्कैन और ऑसिलोस्कोप लाइव वेवफॉर्म विश्लेषण।'
    },
    icon: 'Cpu',
    image: '/img/proof/battery-test.svg',
    covers: [
      { en: 'Full system DTC fault code readout across engine, ABS, and SRS', hi: 'इंजन, एबीएस और एयरबैग के सभी फॉल्ट कोड स्कैन' },
      { en: 'Live sensor telemetry graphing (O2, MAF, rail pressure, throttle)', hi: 'लाइव सेंसर डेटा ग्राफिंग (ऑक्सीजन, एमएएफ, प्रेशर)' },
      { en: 'Lab oscilloscope circuit waveform capture to verify signal integrity', hi: 'सिग्नल जांच के लिए लैब ऑसिलोस्कोप वेवफॉर्म' },
      { en: 'Bidirectional actuator testing of solenoids, pumps, and flaps', hi: 'सोलेनोइड और पंपों का सक्रिय परीक्षण' }
    ],
    signs: [
      { en: 'Check Engine light illuminated (steady amber or flashing)', hi: 'चेक इंजन लाइट का जलना (स्थिर या ब्लिंक)' },
      { en: 'Engine hesitation, misfires, or sudden loss of acceleration', hi: 'इंजन का रुक-रुक कर चलना या पिकअप में कमी' },
      { en: 'Vehicle enters limp-home reduced power mode', hi: 'गाड़ी का लिम्प-होम कम पावर मोड में जाना' }
    ],
    checks: [
      { en: 'Freeze-frame operational conditions recorded at fault trigger', hi: 'फॉल्ट के समय रिकॉर्ड किया गया फ्रीज-फ्रेम डेटा' },
      { en: 'Fuel trim percentages (short-term & long-term STFT/LTFT)', hi: 'फ्यूल ट्रिम प्रतिशत (एसटीएफटी/एलटीएफटी)' },
      { en: 'Wiring harness continuity and ground resistance check', hi: 'वायरिंग निरंतरता और ग्राउंड प्रतिरोध जांच' }
    ],
    timeRangeMin: [60, 120],
    priceBand: [85, 150],
    partsOptions: ['OEM Sensors', 'Direct-Fit Harnesses'],
    askUs: [
      { en: 'Will you explain the difference between a fault code and root cause?', hi: 'क्या आप फॉल्ट कोड और असली खराबी का अंतर समझाएंगे?' }
    ],
    related: ['exhaust-emissions', 'battery-electrics']
  },
  {
    slug: 'clutch-transmission',
    name: {
      en: 'Clutch & Transmission',
      hi: 'क्लच और ट्रांसमिशन'
    },
    summary: {
      en: 'Dual-mass flywheel deflection, clutch slip diagnostics, and transmission fluid service.',
      hi: 'ड्यूल-मास फ्लाईव्हील जांच, क्लच स्लिप डायग्नोसिस और गियरबॉक्स ऑयल सर्विस।'
    },
    icon: 'Cog',
    image: '/img/car/layers/engine.svg',
    covers: [
      { en: 'Manual gearbox fluid drain, magnet inspection, and refill', hi: 'मैनुअल गियरबॉक्स ऑयल निकासी और मैग्नेट जांच' },
      { en: 'Automatic/DSG mechatronic fluid and external filter replacement', hi: 'ऑटोमैटिक/डीएसजी ऑयल और फिल्टर प्रतिस्थापन' },
      { en: 'Clutch release bearing and concentric slave cylinder hydraulic check', hi: 'क्लच रिलीज बेयरिंग और स्लेव सिलेंडर जांच' },
      { en: 'Drive axle CV joints, boots, and transmission output seals', hi: 'ड्राइव एक्सल सीवी जॉइंट्स, बूट्स और सील' }
    ],
    signs: [
      { en: 'Engine revs rise without proportional acceleration (clutch slipping)', hi: 'इंजन रेव बढ़ना लेकिन गाड़ी की गति न बढ़ना (क्लच स्लिप)' },
      { en: 'Difficulty engaging gears when stationary with engine idling', hi: 'गाड़ी खड़ी होने पर गियर डालने में कठिनाई' },
      { en: 'Chatter or shudder through pedal during takeoff', hi: 'गाड़ी उठाते समय पेडल में कंपन या झटके' }
    ],
    checks: [
      { en: 'Clutch bite point travel and pedal return spring', hi: 'क्लच बाइट पॉइंट और पेडल स्प्रिंग' },
      { en: 'Transmission casing gasket weeping and seal leaks', hi: 'ट्रांसमिशन केसिंग से तेल रिसाव' },
      { en: 'Driveshaft rotational lash and CV boot grease seals', hi: 'ड्राइवशाफ्ट ढीलापन और सीवी बूट ग्रीस सील' }
    ],
    timeRangeMin: [90, 360],
    priceBand: [90, 550],
    partsOptions: ['TorqueSpec OE Clutch Kit', 'LUK/Sachs Benchmark'],
    askUs: [
      { en: 'Do you recommend replacing the dual-mass flywheel with the clutch?', hi: 'क्या क्लच के साथ ड्यूल-मास फ्लाईव्हील भी बदलना चाहिए?' }
    ],
    related: ['service', 'diagnostics']
  },
  {
    slug: 'air-conditioning',
    name: {
      en: 'Air-Conditioning Refresh & Regas',
      hi: 'एयर कंडीशनिंग रिफ्रेश और रीगैस'
    },
    summary: {
      en: 'Refrigerant vacuum leak detection, UV dye scan, compressor test, and anti-bacterial cabin sanitation.',
      hi: 'वैक्यूम लीक डिटेक्शन, यूवी डाई स्कैन, कंप्रेसर टेस्ट और एंटी-बैक्टीरियल केबिन सफाई।'
    },
    icon: 'Wind',
    image: '/img/hero/hero-01.svg',
    covers: [
      { en: 'Refrigerant recovery, digital mass weigh-in, and correct spec refill', hi: 'पुराना रेफ्रिजरेंट निकालना और सटीक वजन से नया भरना' },
      { en: 'Negative pressure 20-minute vacuum decay leak verification', hi: '20 मिनट का वैक्यूम डीके लीक परीक्षण' },
      { en: 'Compressor clutch engagement test and low/high side pressures', hi: 'कंप्रेसर क्लच और लो/हाई प्रेशर गेज परीक्षण' },
      { en: 'Ultrasonic evaporator core anti-odour and allergen decontamination', hi: 'इवेपोरेटर कोर की एंटी-बैक्टीरियल सफाई' }
    ],
    signs: [
      { en: 'Vents blow warm air even with A/C button engaged and dialed to max cold', hi: 'एसी ऑन होने पर भी वेंट्स से गर्म हवा आना' },
      { en: 'Musty or damp odour when first turning on ventilation', hi: 'एसी चालू करते ही सीलन या दुर्गंध आना' },
      { en: 'Windows fog up on rainy days and clear exceptionally slowly', hi: 'बारिश में खिड़कियों से धुंध धीरे-धीरे हटना' }
    ],
    checks: [
      { en: 'Condenser radiator matrix for stone damage and fin corrosion', hi: 'कंडेंसर रेडिएटर पर पत्थरों की चोट या जंग' },
      { en: 'Cabin pollen filter particulate loading', hi: 'केबिन पोलन फिल्टर की धूल स्थिति' },
      { en: 'Centre air vent discharge temperature (target: 4–7 °C)', hi: 'वेंट से निकलने वाली हवा का तापमान (लक्ष्य: 4-7 °C)' }
    ],
    timeRangeMin: [45, 90],
    priceBand: [75, 180],
    partsOptions: ['R134a Refrigerant', 'R1234yf Eco-Refrigerant', 'Activated Carbon Cabin Filter'],
    askUs: [
      { en: 'Does my car use traditional R134a or newer R1234yf gas?', hi: 'मेरी कार में R134a गैस लगती है या नई R1234yf?' }
    ],
    related: ['cooling', 'service']
  },
  {
    slug: 'battery-electrics',
    name: {
      en: 'Battery & Electrical Systems',
      hi: 'बैटरी और इलेक्ट्रिकल सिस्टम'
    },
    summary: {
      en: 'Digital conductance battery testing, alternator diode ripple scan, and starter motor draw analysis.',
      hi: 'डिजिटल कंडक्टेंस बैटरी परीक्षण, अल्टरनेटर रिपल स्कैन और स्टार्टर करंट विश्लेषण।'
    },
    icon: 'Zap',
    image: '/img/proof/battery-test.svg',
    covers: [
      { en: 'Cold cranking amps (CCA) test and State of Health (SOH) percentage', hi: 'कोल्ड क्रैंकिंग एम्प्स (CCA) और 78%+ स्वास्थ्य मापन' },
      { en: 'Alternator charging voltage under full electrical load', hi: 'पूर्ण लोड पर अल्टरनेटर चार्जिंग वोल्टेज' },
      { en: 'Starter motor current draw during engine ignition cycle', hi: 'स्टार्ट करते समय स्टार्टर मोटर का करंट लोड' },
      { en: 'Parasitic dark-current battery drain test when vehicle locked', hi: 'गाड़ी बंद होने पर बैटरी ड्रेन करंट की जांच' }
    ],
    signs: [
      { en: 'Slow, struggling engine crank on cold mornings', hi: 'सर्दियों की सुबह इंजन का धीरे-धीरे घूमना' },
      { en: 'Battery charge warning light illuminates while driving', hi: 'चलते समय बैटरी चार्ज चेतावनी लाइट जलना' },
      { en: 'Interior lights or headlamps dim noticeably at idle', hi: 'गाड़ी रुकने पर हेडलाइट्स का धीमा पड़ना' }
    ],
    checks: [
      { en: 'Resting terminal open-circuit voltage (12.6 V benchmark)', hi: 'रेस्टिंग वोल्टेज (12.6 V मानक)' },
      { en: 'Battery terminal posts for lead sulphate corrosion', hi: 'बैटरी टर्मिनलों पर सफेद जंग की जांच' },
      { en: 'Main engine ground strap resistance (< 0.2 ohms)', hi: 'इंजन ग्राउंड स्ट्रैप का प्रतिरोध' }
    ],
    timeRangeMin: [30, 90],
    priceBand: [40, 195],
    partsOptions: ['EFB Stop-Start', 'AGM High-Reserve', 'Standard Calcium'],
    askUs: [
      { en: 'Do you code the new battery serial number into the car computer (BMS)?', hi: 'क्या आप नई बैटरी को कार के कंप्यूटर में कोड करते हैं?' }
    ],
    related: ['diagnostics', 'hybrid-ev']
  },
  {
    slug: 'exhaust-emissions',
    name: {
      en: 'Exhaust & Emissions Compliance',
      hi: 'एग्जॉस्ट और उत्सर्जन अनुपालन'
    },
    summary: {
      en: 'Catalytic converter efficiency, DPF differential pressure, and emissions gas test verification.',
      hi: 'कैटेलिटिक कन्वर्टर क्षमता, डीपीएफ दबाव और उत्सर्जन गैस परीक्षण सत्यापन।'
    },
    icon: 'Flame',
    image: '/img/car/layers/exhaust.svg',
    covers: [
      { en: 'Smoke machine exhaust pipe leak test from turbo manifold to tip', hi: 'टर्बो से टेलपाइप तक स्मोक मशीन से रिसाव जांच' },
      { en: 'Diesel Particulate Filter (DPF) soot loading and regeneration test', hi: 'डीजल पार्टिकुलेट फिल्टर (DPF) कालिख और सफाई चक्र' },
      { en: 'Catalytic converter temperature drop and lambda sensor response', hi: 'कैटेलिटिक कनवर्टर और लैम्ब्डा सेंसर प्रतिक्रिया' },
      { en: 'Exhaust rubber hanger isolation and heat shield security', hi: 'एग्जॉस्ट रबर हैंगर और हीट शील्ड की मजबूती' }
    ],
    signs: [
      { en: 'Loud blowing or roaring sound underneath during acceleration', hi: 'एक्सिलरेटर दबाने पर नीचे से तेज गर्जना या फुसफुसाहट' },
      { en: 'Exhaust or chemical odour entering passenger cabin', hi: 'कार के केबिन में धुएं या रसायन की गंध आना' },
      { en: 'DPF warning symbol or emissions fault message on dashboard', hi: 'डैशबोर्ड पर डीपीएफ या एमिशन चेतावनी का आना' }
    ],
    checks: [
      { en: 'Lambda oxygen sensor upstream/downstream voltage oscillations', hi: 'ऑक्सीजन सेंसर वोल्टेज का उतार-चढ़ाव' },
      { en: 'Exhaust flexi pipe steel mesh for fraying or carbon soot marks', hi: 'फ्लेक्सी पाइप पर कालिख के निशान' },
      { en: 'Catalytic heat shields for loose corroded fasteners', hi: 'हीट शील्ड के ढीले बोल्ट' }
    ],
    timeRangeMin: [45, 180],
    priceBand: [60, 320],
    partsOptions: ['Stainless Steel Direct-Fit', 'OEM Catalysts'],
    askUs: [
      { en: 'Can my DPF filter be cleaned rather than replaced?', hi: 'क्या मेरे डीपीएफ को बदलने के बजाय साफ किया जा सकता है?' }
    ],
    related: ['diagnostics', 'service']
  },
  {
    slug: 'cooling',
    name: {
      en: 'Engine Cooling System',
      hi: 'इंजन कूलिंग सिस्टम'
    },
    summary: {
      en: 'Coolant freeze protection, pressure decay leak test, radiator flow, and thermostat actuation.',
      hi: 'कूलेंट ठंड से सुरक्षा, प्रेशर लीक टेस्ट, रेडिएटर फ्लो और थर्मोस्टेट संचालन जांच।'
    },
    icon: 'Thermometer',
    image: '/img/proof/fluid-test.svg',
    covers: [
      { en: 'Refractometer ethylene glycol concentration and freeze protection test', hi: 'ग्लाइकोल सांद्रता और -34°C शीत सुरक्षा मापन' },
      { en: '1.2 bar cooling system pressure decay test to reveal hairline leaks', hi: 'बारीक रिसाव खोजने के लिए 1.2 बार प्रेशर टेस्ट' },
      { en: 'Thermostat opening temperature and electric radiator fan actuation', hi: 'थर्मोस्टेट खुलने का तापमान और पंखे का संचालन' },
      { en: 'Water pump shaft play and heater matrix cabin flow verification', hi: 'वॉटर पंप शाफ्ट ढीलापन और हीटर मैट्रिक्स फ्लो' }
    ],
    signs: [
      { en: 'Engine temperature gauge climbs into the red zone or shows warning', hi: 'तापमान गेज का लाल निशान में जाना या चेतावनी' },
      { en: 'Sweet pancake-like syrup odour when getting out of the car', hi: 'गाड़ी से बाहर निकलने पर मीठी गंध महसूस होना' },
      { en: 'Pink, blue, or green fluid puddles forming under the front bumper', hi: 'आगे के बम्पर के नीचे रंगीन तरल का टपकना' }
    ],
    checks: [
      { en: 'Radiator plastic end tanks for hairline pressure cracks', hi: 'रेडिएटर प्लास्टिक टैंक में बारीक दरारें' },
      { en: 'Silicone and rubber coolant hoses for spongy softening', hi: 'कूलेंट होज का ढीला या चिपचिपा होना' },
      { en: 'Expansion bottle pressure cap pressure relief spring rating', hi: 'दबाव कैप की स्प्रिंग का सही मान' }
    ],
    timeRangeMin: [45, 180],
    priceBand: [65, 290],
    partsOptions: ['OAT Long-Life Coolant', 'OEM Thermostats', 'All-Alloy Radiators'],
    askUs: [
      { en: 'Why is it critical not to mix green and red coolant types?', hi: 'हरे और लाल कूलेंट को आपस में क्यों नहीं मिलाना चाहिए?' }
    ],
    related: ['service', 'air-conditioning']
  },
  {
    slug: 'hybrid-ev',
    name: {
      en: 'Hybrid & EV Maintenance',
      hi: 'हाइब्रिड और ईवी रखरखाव'
    },
    summary: {
      en: 'High-voltage safety isolation, battery cell variance scanning, and thermal loop maintenance.',
      hi: 'हाई-वोल्टेज सुरक्षा आइसोलेशन, बैटरी सेल संतुलन स्कैन और थर्मल कूलिंग लूप रखरखाव।'
    },
    icon: 'BatteryCharging',
    image: '/img/proof/battery-test.svg',
    covers: [
      { en: 'Traction battery individual cell voltage delta telemetry scan', hi: 'ट्रैक्शन बैटरी सेल वोल्टेज डेल्टा टेलीमेट्री स्कैन' },
      { en: 'Inverter power electronics dedicated electric cooling loop flush', hi: 'इन्वर्टर इलेक्ट्रॉनिक्स कूलिंग लूप फ्लश' },
      { en: 'Regenerative braking pad thickness and hydraulic slider maintenance', hi: 'रीजेनरेटिव ब्रेक पैड और कैलिपर स्लाइडर सर्विस' },
      { en: 'High-voltage orange cable isolation resistance and connector check', hi: 'हाई-वोल्टेज ऑरेंज केबल्स और कनेक्टर्स की जांच' }
    ],
    signs: [
      { en: 'Noticeable drop in electric-only range under identical driving style', hi: 'समान ड्राइविंग पर भी इलेक्ट्रिक रेंज में गिरावट' },
      { en: 'Hybrid system warning symbol or turtle reduced power icon', hi: 'हाइब्रिड सिस्टम चेतावनी या कछुआ आइकन आना' },
      { en: 'Cooling fan runs continuously and loudly near rear passenger seats', hi: 'पिछली सीट के पास बैटरी कूलिंग फैन का तेज चलना' }
    ],
    checks: [
      { en: 'High-voltage manual service plug interlock integrity', hi: 'हाई-वोल्टेज सर्विस प्लग इंटरलॉक सुरक्षा' },
      { en: '12V auxiliary AGM battery supporting onboard computers', hi: 'कंप्यूटर चलाने वाली 12V ऑक्जिलरी बैटरी' },
      { en: 'Electric air-conditioning compressor dielectric oil purity', hi: 'इलेक्ट्रिक एसी कंप्रेसर तेल की शुद्धता' }
    ],
    timeRangeMin: [60, 180],
    priceBand: [110, 310],
    partsOptions: ['Dielectric Coolants', 'OEM Hybrid Filtration'],
    askUs: [
      { en: 'Do you follow certified high-voltage isolation safety protocols?', hi: 'क्या आप प्रमाणित हाई-वोल्टेज सुरक्षा नियमों का पालन करते हैं?' }
    ],
    related: ['brakes', 'tyres-alignment']
  },
  {
    slug: 'pre-purchase',
    name: {
      en: 'Pre-Purchase Independent Inspection',
      hi: 'खरीद-पूर्व स्वतंत्र वाहन निरीक्षण'
    },
    summary: {
      en: '140-point unbiased inspection before you buy, with paint depth, lift scan, and full road test.',
      hi: 'खरीदने से पहले 140-बिंदु निष्पक्ष जांच, पेंट मोटाई, लिफ्ट स्कैन और रोड टेस्ट सहित।'
    },
    icon: 'Shield',
    image: '/img/hero/hero-01.svg',
    covers: [
      { en: 'Electronic paint depth gauge scan across all panels for accident filler', hi: 'हादसे के बाद लगे पुट्टी और रिपेंट के लिए पेंट डेप्थ स्कैन' },
      { en: 'Workshop hydraulic lift underside rust and structural chassis review', hi: 'लिफ्ट पर जंग और चेसिस संरचना की पूरी जांच' },
      { en: 'OBD-II computer scan for hidden cleared fault codes and mileage sync', hi: 'छिपे हुए फॉल्ट कोड और वास्तविक ओडोमीटर सिंक जांच' },
      { en: '15-minute diagnostic road test checking driveline and braking', hi: 'ड्राइवलाइन और ब्रेक का 15-मिनट का डायग्नोस्टिक रोड टेस्ट' }
    ],
    signs: [
      { en: 'Considering buying a private or dealership used vehicle', hi: 'यूज्ड कार खरीदने का विचार कर रहे हैं' },
      { en: 'Seller claims full service history but lacks physical stamped invoices', hi: 'विक्रेता सर्विस हिस्ट्री का दावा करता है पर बिल नहीं हैं' },
      { en: 'Vehicle displays uneven panel gaps or mismatched tyre brands', hi: 'बॉडी पैनल में असमान गैप या अलग-अलग ब्रांड के टायर' }
    ],
    checks: [
      { en: 'Chassis subframe collision alignment and factory spot welds', hi: 'चेसिस सबफ्रेम अलाइनमेंट और ओरिजिनल स्पॉट वेल्ड्स' },
      { en: 'Engine oil cap for emulsified mayonnaise coolant leakage', hi: 'इंजन कैप पर कूलेंट रिसाव के सफेद झाग की जांच' },
      { en: 'Full report delivered digitally within 2 hours of inspection', hi: 'निरीक्षण के 2 घंटे के भीतर डिजिटल रिपोर्ट उपलब्ध' }
    ],
    timeRangeMin: [90, 150],
    priceBand: [130, 220],
    partsOptions: ['Digital Evidence Dossier', 'Immediate Phone Debrief with Tech'],
    askUs: [
      { en: 'Can the technician speak with me on the phone directly after the test?', hi: 'क्या जांच के बाद तकनीशियन मुझसे सीधे फोन पर बात करेंगे?' }
    ],
    related: ['service', 'inspection-prep']
  },
  {
    slug: 'inspection-prep',
    name: {
      en: 'Periodic Roadworthiness Inspection Prep',
      hi: 'आवधिक सड़क योग्यता निरीक्षण तैयारी'
    },
    summary: {
      en: 'Pre-inspection audit covering all statutory criteria so your vehicle passes first time.',
      hi: 'सभी वैधानिक मानदंडों का प्री-ऑडिट ताकि आपका वाहन पहली बार में पास हो।'
    },
    icon: 'FileCheck',
    image: '/img/car/base.svg',
    covers: [
      { en: 'Headlamp optical beam aim and levelling motor calibration', hi: 'हेडलाइट बीम फोकस और लेवलिंग मोटर कैलिब्रेशन' },
      { en: 'Emissions opacity and gas analyzer pre-screen test', hi: 'उत्सर्जन गैस विश्लेषक से प्री-स्क्रीनिंग टेस्ट' },
      { en: 'Brake roller efficiency test and balance percentage across axle', hi: 'ब्रेक रोलर क्षमता और एक्सल पर संतुलन प्रतिशत' },
      { en: 'Windscreen chip safety zones, wipers, and horn operation', hi: 'विंडस्क्रीन चिप जोन, वाइपर और हॉर्न की जांच' }
    ],
    signs: [
      { en: 'Annual statutory vehicle inspection due within the next 30 days', hi: 'वार्षिक वैधानिक वाहन निरीक्षण 30 दिनों में देय है' },
      { en: 'Small dashboard warning light illuminated intermittently', hi: 'डैशबोर्ड पर बीच-बीच में कोई चेतावनी लाइट जलना' },
      { en: 'Wiper blades smearing water or leaving unwiped streaks', hi: 'वाइपर ब्लेड द्वारा कांच पर पानी के निशान छोड़ना' }
    ],
    checks: [
      { en: 'All exterior bulb illuminations including number plate lights', hi: 'नंबर प्लेट सहित सभी बाहरी बल्बों का जलना' },
      { en: 'Seatbelt pretensioners and retractor locking mechanism', hi: 'सीटबेल्ट प्रीटेंशनर और लॉकिंग तंत्र' },
      { en: 'Underside structural rust within 30 cm of suspension mounts', hi: 'सस्पेंशन माउंट्स के पास संरचनात्मक जंग की जांच' }
    ],
    timeRangeMin: [45, 90],
    priceBand: [50, 95],
    partsOptions: ['Fast-Replacement Bulbs & Wipers', 'Re-Test Guarantee'],
    askUs: [
      { en: 'If an item fails the pre-check, will you contact me with prices first?', hi: 'यदि कोई खराबी मिलती है, तो क्या आप पहले मुझे खर्च बताएंगे?' }
    ],
    related: ['brakes', 'tyres-alignment']
  },
  {
    slug: 'fleet',
    name: {
      en: 'Commercial Fleet Maintenance',
      hi: 'कमर्शियल फ्लीट रखरखाव'
    },
    summary: {
      en: 'Dedicated fleet turnaround bays, consolidated monthly billing, and driver defect logging.',
      hi: 'डेडिकेटेड फ्लीट बे, मासिक समेकित बिलिंग और ड्राइवर डिफेक्ट ट्रैकिंग।'
    },
    icon: 'Truck',
    image: '/img/car/layers/chassis.svg',
    covers: [
      { en: 'Priority morning bay scheduling to minimise commercial van downtime', hi: 'डाउनटाइम घटाने के लिए प्राथमिकता सुबह की बे शेड्यूलिंग' },
      { en: 'Digital driver defect reporting and fast-track rectification', hi: 'डिजिटल ड्राइवर डिफेक्ट रिपोर्टिंग और त्वरित समाधान' },
      { en: 'Consolidated VAT monthly statement invoices with itemised PO matching', hi: 'मदवार पीओ मिलान के साथ समेकित मासिक वैट इनवॉइस' },
      { en: 'Tailored preventative maintenance roadmaps based on quarterly mileage', hi: 'तिमाही माइलेज के आधार पर निवारक मेंटेनेंस प्लान' }
    ],
    signs: [
      { en: 'Managing 3 to 50 company cars, light commercial vans, or pool vehicles', hi: '3 से 50 कंपनी कारों या वैन के बेड़े का प्रबंधन' },
      { en: 'Frustrated by unexpected workshop delays and lack of repair proof', hi: 'कार्यशाला में देरी और प्रमाण की कमी से असंतुष्ट' },
      { en: 'Requiring consistent national servicing standards across multiple drivers', hi: 'सभी चालकों के लिए मानकीकृत सर्विसिंग की आवश्यकता' }
    ],
    checks: [
      { en: 'Commercial payload tyre load-rating and wear monitoring', hi: 'कमर्शियल पेलोड टायर लोड-रेटिंग और घिसाव' },
      { en: 'Heavy-duty braking system thermal endurance checks', hi: 'हैवी-ड्यूटी ब्रेकिंग सिस्टम क्षमता' },
      { en: 'Fleet management portal access with vehicle service timelines', hi: 'फ्लीट पोर्टल पर वाहन सर्विस टाइमलाइन की सुविधा' }
    ],
    timeRangeMin: [60, 240],
    priceBand: [85, 320],
    partsOptions: ['Fleet Preferred Rates', 'Dedicated Account Manager'],
    askUs: [
      { en: 'Can you provide a dedicated technician team for our van fleet?', hi: 'क्या आप हमारे वैन बेड़े के लिए समर्पित टीम दे सकते हैं?' }
    ],
    related: ['service', 'brakes']
  }
];

export function getServiceBySlug(slug: string): Service | undefined {
  return WORKSHOP_SERVICES.find((s) => s.slug === slug);
}
