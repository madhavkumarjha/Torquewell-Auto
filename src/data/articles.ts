import type { Article } from '@/types';

export const ARTICLES: Article[] = [
  {
    slug: 'how-brakes-work',
    tags: ['Brakes', 'Safety', 'Powertrain'],
    title: {
      en: 'How Modern Disc Brakes Work & Friction Dynamics',
      hi: 'आधुनिक डिस्क ब्रेक कैसे काम करते हैं और घर्षण गतिशीलता'
    },
    layers: {
      s30: {
        en: 'Hydraulic pressure from your brake pedal squeezes high-friction pads against spinning metal brake discs. This converts kinetic vehicle energy into extreme heat (up to 600°C), safely slowing the vehicle down. Pads and discs wear out gradually with every stop.',
        hi: 'आपके ब्रेक पैडल से हाइड्रोलिक दबाव उच्च-घर्षण पैड को घूमती हुई धातु ब्रेक डिस्क पर दबाता है। यह वाहन की गतिज ऊर्जा को अत्यधिक गर्मी (600 डिग्री सेल्सियस तक) में बदलता है, जिससे वाहन सुरक्षित रूप से धीमा होता है।'
      },
      m3: {
        en: 'When you press the brake pedal, a brake booster amplifies foot force and moves hydraulic fluid through reinforced steel brake lines into the calipers at each wheel. Each caliper contains hydraulic pistons that clamp a pair of friction brake pads against both sides of a cast-iron or carbon-ceramic brake disc.\n\nFrictional drag creates stopping torque. Because kinetic energy is transformed into thermal energy, modern brake discs feature internal ventilation cooling vanes to channel air and dissipate heat rapidly. Over time, friction material sacrificial thickness decreases, and disc rotor thickness thins until safety discard limits are reached.',
        hi: 'जब आप ब्रेक पैडल दबाते हैं, तो ब्रेक बूस्टर पैर के बल को बढ़ाता है और हाइड्रोलिक द्रव को पहियों के कैलीपर्स में पहुंचाता है। प्रत्येक कैलीपर में पिस्टन होते हैं जो घर्षण ब्रेक पैड को डिस्क पर दबाते हैं। घर्षण से थर्मल ऊर्जा उत्पन्न होती है, और नियमित उपयोग से पैड और डिस्क धीरे-धीरे घिस जाते हैं।'
      },
      deep: {
        en: 'The braking system operates under Pascal’s principle: fluid in a closed hydraulic circuit exerts equal pressure in all directions. The Master Cylinder translates linear pedal displacement into 800–1,500 psi of hydraulic line pressure. Caliper pistons apply normal force FN across pad friction material, generating tangential friction force Ff = μ FN, where μ represents the dynamic friction coefficient (typically 0.35–0.45 for ceramic/semi-metallic compounds).\n\nKinetic energy Ek = 0.5 * m * v^2 dissipated during high-speed decels creates intense thermal gradients. Brake fade occurs if temperatures exceed the resin binding threshold, causing outgassing that forms a microscopic gaseous cushion between pad and rotor, dropping friction coefficients drastically. Calibrated torque inspection verifies that caliper slide pins and torque-bracket mounting bolts meet exact factory Newton-metre specifications.',
        hi: 'ब्रेकिंग सिस्टम पास्कल के नियम पर काम करता है: बंद हाइड्रोलिक सर्किट में द्रव सभी दिशाओं में समान दबाव डालता है। मास्टर सिलेंडर पैडल गति को 800–1,500 psi दबाव में बदलता है। कैलीपर पिस्टन पैड सामग्री पर बल लगाते हैं जिससे घर्षण बल उत्पन्न होता है। उच्च तापमान पर ब्रेक फेड से बचने के लिए वेंटिलेटेड डिस्क और सही टॉर्क विनिर्देश अनिवार्य हैं।'
      }
    },
    diagram: 'brakes-schematic',
    glossary: [
      'Brake Caliper: The hydraulic clamp assembly housing pistons and pads.',
      'Rotor / Disc: The rotating cast iron wheel plate clamped by the pads.',
      'Brake Fade: Temporary loss of stopping power due to excessive thermal build-up.'
    ],
    askMechanic: [
      { en: 'What is the remaining friction material thickness in millimetres on both inner and outer pads?', hi: 'भीतरी और बाहरी दोनों पैड पर मिलीमीटर में घर्षण सामग्री की शेष मोटाई क्या है?' },
      { en: 'Have the brake discs reached their minimum manufacturer discard thickness stamped on the hub edge?', hi: 'क्या ब्रेक डिस्क हब किनारे पर मुहर लगी न्यूनतम निर्माता सीमा तक पहुंच गई हैं?' },
      { en: 'Were the caliper guide slide pins cleaned, lubricated, and torqued to manufacturer spec?', hi: 'क्या कैलीपर गाइड पिन साफ, लुब्रिकेट और सही टॉर्क पर कसे गए?' }
    ],
    sources: ['ISO 15484 Automotive Braking Systems', 'DVSA MOT Inspection Manual (Section 1: Brakes)'],
    reviewedOn: '2026-06-15'
  },
  {
    slug: 'reading-brake-pad-wear',
    tags: ['Brakes', 'Safety', 'Costs'],
    title: {
      en: 'Reading Brake Pad & Disc Wear: Measurement Standards',
      hi: 'ब्रेक पैड और डिस्क घिसाव पढ़ना: मापन मानक'
    },
    layers: {
      s30: {
        en: 'New brake pads start at 10–12 mm of friction compound. At 3.0 mm, replacement is due soon. At 2.0 mm or below, replacement is urgent to prevent metal-on-metal disc gouging and severe stopping distance increases.',
        hi: 'नए ब्रेक पैड 10–12 मिमी घर्षण सामग्री से शुरू होते हैं। 3.0 मिमी पर, प्रतिस्थापन जल्द ही आवश्यक है। 2.0 मिमी या उससे कम पर, धातु-से-धातु नुकसान और दुर्घटना से बचने के लिए तत्काल बदलना आवश्यक है।'
      },
      m3: {
        en: 'Workshop technicians use precision vernier depth micrometers to gauge pad thickness across four points per axle (inner and outer pads on left and right wheels). Uneven wear between inner and outer pads signals sticking caliper slider pins or a seized piston.\n\nDiscs also wear down, developing an outer lip. Discs are stamped with a minimum thickness (Min Thk) spec on the rotor edge (e.g. 22.0 mm on a 24.0 mm nominal rotor). Once thinned beyond this tolerance, the disc cannot dissipate braking heat safely and risks heat cracking under heavy stops.',
        hi: 'वर्कशॉप तकनीशियन सटीक वर्नियर माइक्रोमीटर का उपयोग करके पैड की मोटाई मापते हैं। भीतरी और बाहरी पैड के बीच असमान घिसाव कैलीपर स्लाइडर पिन के जाम होने का संकेत देता है। डिस्क पर न्यूनतम मोटाई (Min Thk) अंकित होती है; इससे पतली होने पर डिस्क गर्मी सहन नहीं कर सकती।'
      },
      deep: {
        en: 'Friction linings wear through abrasive, adhesive, and thermal shear degradation. As pad thickness drops below 3.0 mm, thermal insulation between the friction surface and backing plate degrades rapidly. Thermal transfer directly into the caliper piston elevates brake fluid temperature, risking localized fluid boiling (vapour lock).\n\nRotor thickness variation (RTV) exceeding 0.015 mm causes brake pedal pulsation and high-frequency steering shudder. Torquewell technicians inspect pad taper wear and micrometer disc runout with a dial indicator gauge before recommending either pad replacement or combined pad-and-rotor renewal.',
        hi: 'घर्षण परतें घिसाव से पतली होती हैं। जब मोटाई 3.0 मिमी से कम हो जाती है, तो थर्मल इन्सुलेशन कम हो जाता है, जिससे कैलीपर पिस्टन और ब्रेक द्रव में गर्मी सीधे स्थानांतरित होती है। 0.015 मिमी से अधिक रोटर भिन्नता ब्रेक पैडल कंपन का कारण बनती है।'
      }
    },
    diagram: 'pad-micrometer',
    glossary: [
      'Vernier Micrometer: Precision tool measuring thickness down to 0.01 mm.',
      'Rotor Lip: The un-swept outer edge of a worn brake disc.',
      'Vapour Lock: Loss of braking force caused by boiling brake fluid vaporizing in lines.'
    ],
    askMechanic: [
      { en: 'Can you show me the micrometer readout photo compared to the discard minimum?', hi: 'क्या आप मुझे न्यूनतम सीमा की तुलना में माइक्रोमीटर रीडिंग फोटो दिखा सकते हैं?' },
      { en: 'Is the wear pattern symmetrical across both left and right brake assemblies?', hi: 'क्या बाएं और दाएं दोनों ब्रेक असेंबली में घिसाव समान है?' },
      { en: 'Are new caliper mounting hardware clips and anti-rattle shims included in the quote?', hi: 'क्या कोटेशन में नए हार्डवेयर क्लिप और एंटी-रैटल शिम शामिल हैं?' }
    ],
    sources: ['TUV Rheinland Brake Component Wear Guidelines', 'SAE J2982 Brake Pad Wear Standards'],
    reviewedOn: '2026-07-10'
  },
  {
    slug: 'brake-fluid-hygroscopic',
    tags: ['Brakes', 'Safety', 'Maintenance'],
    title: {
      en: 'Brake Fluid: Why Moisture Degrades Stopping Force',
      hi: 'ब्रेक द्रव: नमी से रुकने की क्षमता क्यों घटती है'
    },
    layers: {
      s30: {
        en: 'Brake fluid is hygroscopic — it naturally absorbs moisture from atmospheric humidity through microscopic hose pores and seals. Water lowers its boiling point, leading to spongy pedals and dangerous brake failure on steep hills or emergency stops.',
        hi: 'ब्रेक फ्लूइड हाइग्रोस्कोपिक होता है — यह हवा से नमी सोखता है। पानी इसके क्वथनांक (boiling point) को कम कर देता है, जिससे आपातकालीन ब्रेकिंग के दौरान पैडल स्पंजी हो जाता है और ब्रेक फेल होने का खतरा रहता है।'
      },
      m3: {
        en: 'DOT 3 and DOT 4 glycol-ether fluids have a dry boiling point above 230°C when fresh from a sealed bottle. Over 2 to 3 years, fluid absorbs 3% to 4% water by volume, dropping its wet boiling point to approximately 140°C–155°C.\n\nDuring hard braking, caliper temperatures easily exceed 160°C. Water in the fluid boils into compressible steam pockets. Because steam compresses while liquid does not, pressing the brake pedal compresses the steam bubble instead of moving the caliper piston, causing the pedal to sink straight to the floorboard.',
        hi: 'ताजा DOT 4 ब्रेक द्रव का सूखा क्वथनांक 230°C से ऊपर होता है। 2 से 3 वर्षों में यह नमी सोख लेता है और इसका क्वथनांक 150°C तक गिर जाता है। तेज ब्रेकिंग के दौरान यह नमी भाप बन जाती है, जिससे पैडल फर्श तक दबने लगता है।'
      },
      deep: {
        en: 'Hygroscopic absorption occurs via diffusion across flexible EPDM elastomer brake hoses and reservoir cap micro-vents at a steady rate of roughly 1.5% moisture content per year. Digital conductance boiling-point refractometers accurately measure fluid health.\n\nBeyond boiling hazards, absorbed water reacts with glycol ethers to produce acidic compounds that corrode ABS hydraulic modulator valve solenoids and pit caliper piston bores. Flushing the system every 24–36 months with pressure bleeding ensures pure hydraulic integrity and zero air entrapment.',
        hi: 'नमी का अवशोषण लचीली होज़ के माध्यम से प्रति वर्ष लगभग 1.5% की दर से होता है। डिजिटल रिफ्रैक्टोमीटर द्रव स्वास्थ्य को मापते हैं। नमी से ABS सोलेनोइड और कैलीपर बोर में जंग भी लगती है। हर 24-36 महीने में फ्लश करना अनिवार्य है।'
      }
    },
    diagram: 'fluid-tester',
    glossary: [
      'Hygroscopic: The property of readily attracting and absorbing water from moisture.',
      'Wet Boiling Point: Fluid boiling temperature after absorbing 3.7% water.',
      'ABS Modulator: The electronic valve block managing rapid anti-lock pulses.'
    ],
    askMechanic: [
      { en: 'What was the digital boiling point tester reading on my reservoir sample?', hi: 'मेरे रिज़र्वोयर सैंपल पर डिजिटल बॉयलिंग पॉइंट टेस्टर रीडिंग क्या थी?' },
      { en: 'Will you perform a full pressure bleed through all 4 wheel calipers including the ABS pump?', hi: 'क्या आप ABS पंप सहित सभी 4 पहिया कैलीपर्स पर पूर्ण प्रेशर ब्लीड करेंगे?' },
      { en: 'What DOT specification fluid is required by my vehicle manufacturer handbook?', hi: 'मेरे वाहन हैंडबुक के अनुसार किस DOT विनिर्देश द्रव की आवश्यकता है?' }
    ],
    sources: ['FMVSS No. 116 Motor Vehicle Brake Fluids', 'ISO 4925 Road Vehicles Brake Fluids'],
    reviewedOn: '2026-08-01'
  },
  {
    slug: 'tyre-sidewall-decoded',
    tags: ['Tyres', 'Safety'],
    title: {
      en: 'Tyre Sidewall Decoded: Size, Load, Speed & Age Codes',
      hi: 'टायर साइडवॉल डिकोड: आकार, भार, गति और आयु कोड'
    },
    layers: {
      s30: {
        en: 'The alphanumeric string on your tyre (e.g. 205/55 R16 91V) reveals its width in mm, aspect ratio percentage, radial construction, rim diameter in inches, load index rating, and maximum speed certification.',
        hi: 'टायर पर लिखा कोड (जैसे 205/55 R16 91V) इसकी चौड़ाई (मिमी), पहलू अनुपात, रिम व्यास (इंच), भार क्षमता और अधिकतम गति सीमा को दर्शाता है।'
      },
      m3: {
        en: 'Breaking down a typical tyre mark "205/55 R16 91V":\n- 205: Cross-section width in millimetres.\n- 55: Aspect ratio (sidewall height is 55% of width, i.e., 112.75 mm).\n- R: Radial construction.\n- 16: Wheel rim diameter in inches.\n- 91: Load index (91 corresponds to 615 kg max load per tyre).\n- V: Speed rating (V denotes certified performance up to 240 km/h / 149 mph).\n\nAlso look for the 4-digit DOT date code (e.g. "2823" indicates the tyre was manufactured in the 28th week of 2023). Tyres older than 6–10 years should be replaced regardless of tread depth due to rubber oxidation hardening.',
        hi: '205/55 R16 91V का अर्थ है: 205 मिमी चौड़ाई, 55% साइडवॉल अनुपात, रेडियल निर्माण, 16 इंच रिम, 615 किग्रा भार क्षमता और 240 किमी/घंटा गति रेटिंग। 4-अंकीय DOT कोड (उदा. 2823) निर्माण का सप्ताह और वर्ष बताता है।'
      },
      deep: {
        en: 'In addition to geometric parameters, sidewalls provide UTQG (Uniform Tire Quality Grading) ratings: Treadwear (e.g. 300 vs 500 baseline), Traction (AA, A, B, C for wet straight-line braking), and Temperature (A, B, C for thermal dissipation resistance).\n\nFor EVs, tyres frequently carry ‘EV’, ‘HL’ (High Load capacity), or acoustic foam inserts designed to support 250–500 kg greater battery curb weight without sidewall squirm, and to minimise cabin road cavity resonance at 200 Hz.',
        hi: 'साइडवॉल पर ट्रैक्शन और टेम्परेचर रेटिंग भी होती है। ईवी के लिए विशेष टायर भारी वजन सहन करने और केबिन में कंपन शोर कम करने के लिए बनाए जाते हैं।'
      }
    },
    diagram: 'tyre-sidewall',
    glossary: [
      'Aspect Ratio: Sidewall height expressed as a percentage of tread width.',
      'Load Index: Numerical code specifying maximum load capacity per wheel.',
      'DOT Date Stamp: 4-digit code (WWYY) identifying manufacturing date.'
    ],
    askMechanic: [
      { en: 'Does the load index and speed rating on new tyres match or exceed my door-pillar placard?', hi: 'क्या नए टायरों पर लोड इंडेक्स और स्पीड रेटिंग मेरे वाहन विनिर्देशों से मेल खाती है?' },
      { en: 'What are the DOT date codes on the tyres you are installing from stock?', hi: 'स्टॉक से लगाए जा रहे टायरों पर DOT निर्माण तिथि कोड क्या हैं?' },
      { en: 'Are EV-optimised or low-rolling-resistance compounds recommended for my powertrain?', hi: 'क्या मेरे वाहन के लिए कम रोलिंग-प्रतिरोध वाले टायर अनुशंसित हैं?' }
    ],
    sources: ['ETRTO Standards Manual', 'TyreSafe UK Tyre Markings Guide'],
    reviewedOn: '2026-05-20'
  },
  {
    slug: 'tread-depth-safety',
    tags: ['Tyres', 'Safety', 'Maintenance'],
    title: {
      en: 'Tread Depth, Hydroplaning & Wet Stopping Distances',
      hi: 'ट्रेड गहराई, हाइड्रोप्लेनिंग और गीली सड़क पर ब्रेकिंग दूरी'
    },
    layers: {
      s30: {
        en: 'While legal minimum tread is often 1.6 mm across many regions, wet braking safety degrades drastically below 3.0 mm. At 1.6 mm on wet roads, stopping distance from 100 km/h increases by over two full car lengths.',
        hi: 'कानूनी न्यूनतम ट्रेड 1.6 मिमी हो सकती है, लेकिन 3.0 मिमी से नीचे गीली सड़क पर रुकने की क्षमता तेजी से गिरती है। 1.6 मिमी पर गीली सड़क पर ब्रेकिंग दूरी दो पूरी कार की लंबाई बढ़ जाती है।'
      },
      m3: {
        en: 'Tyre tread grooves act as hydraulic pumps, evacuating standing water from between the rubber contact patch and the road surface at up to 30 litres per second at 80 km/h.\n\nAs grooves wear down, water evacuation volume falls exponentially. When water cannot be dispersed fast enough, hydraulic pressure builds in front of the tyre, lifting the tread off the road on a thin film of water. This is hydroplaning (aquaplaning), resulting in complete loss of steering and braking control.',
        hi: 'टायर के खांचे सड़क पर खड़े पानी को बाहर निकालते हैं। जब खांचे घिस जाते हैं, तो पानी निकलने की गति कम हो जाती है और टायर पानी की पतली परत पर तैरने लगता है, जिससे स्टीयरिंग और ब्रेक का नियंत्रण पूरी तरह खो जाता है।'
      },
      deep: {
        en: 'Hydrodynamic pressure lifts the tyre when drainage channels become overwhelmed. At 8.0 mm (new tyre), drainage channels sustain maximum laminar evacuation.\n\nAt 3.0 mm, wet braking distance from 80 km/h increases by approximately 8 metres compared to new rubber. At the 1.6 mm legal wear bar, wet stopping distance lengthens by up to 18 metres. Technicians measure tread across the central three-quarters of the breadth using digital depth gauges.',
        hi: 'हाइड्रोप्लेनिंग तब शुरू होती है जब पानी का दबाव टायर को सड़क से ऊपर उठा देता है। 3.0 मिमी पर गीली सड़क पर रुकने की दूरी 8 मीटर बढ़ जाती है, और 1.6 मिमी पर 18 मीटर तक बढ़ जाती है।'
      }
    },
    diagram: 'tread-gauge',
    glossary: [
      'Hydroplaning: Total loss of traction when tyres ride atop standing water.',
      'Wear Bar (TWI): Moulded 1.6 mm raised bridges inside tyre grooves.',
      'Contact Patch: The postcard-sized footprint of rubber meeting the road.'
    ],
    askMechanic: [
      { en: 'What are the tread depth measurements across inner, centre, and outer tread ribs?', hi: 'भीतरी, मध्य और बाहरी रिब्स पर ट्रेड गहराई माप क्या हैं?' },
      { en: 'Is there shoulder feathering or camber wear indicating an alignment problem?', hi: 'क्या अलाइनमेंट समस्या का संकेत देने वाला असमान घिसाव है?' },
      { en: 'Are tyre pressures adjusted to the cold door-jamb specification?', hi: 'क्या टायर का दबाव निर्माता विनिर्देश के अनुसार समायोजित किया गया है?' }
    ],
    sources: ['MIRA Proving Ground Wet Grip Test Data', 'ISO 23671 Passenger Car Tyres Wet Grip'],
    reviewedOn: '2026-06-25'
  },
  {
    slug: 'wheel-alignment-explained',
    tags: ['Suspension & Steering', 'Tyres', 'Costs'],
    title: {
      en: 'Camber, Caster & Toe: Wheel Alignment Explained',
      hi: 'कैम्बर, कास्टर और टो: व्हील अलाइनमेंट की पूरी जानकारी'
    },
    layers: {
      s30: {
        en: 'Wheel alignment adjusts the angles of your wheels so they roll perfectly parallel to each other and perpendicular to the road. Misalignment causes rapid uneven tyre wear, pulling to one side, and higher fuel or battery consumption.',
        hi: 'व्हील अलाइनमेंट पहियों के कोणों को समायोजित करता है ताकि वे समानांतर चलें। गलत अलाइनमेंट से टायर तेजी से घिसते हैं, कार एक तरफ खिंचती है और माइलेज कम होता है।'
      },
      m3: {
        en: 'Three primary geometric angles are adjusted during a 4-wheel alignment:\n1. **Toe**: The inward or outward angle of tyres viewed from above (like looking down at your feet). Incorrect toe is the number one cause of rapid tyre scrub.\n2. **Camber**: The inward (negative) or outward (positive) tilt of tyres viewed from the front. Excessive negative camber wears out inner tyre shoulders.\n3. **Caster**: The forward or backward tilt of the steering axis pivot viewed from the side. Caster provides high-speed straight-line stability and self-centring steering feel.',
        hi: 'तीन प्रमुख कोण होते हैं:\n1. **टो**: ऊपर से देखने पर पहियों का अंदर या बाहर झुकाव।\n2. **कैम्बर**: सामने से देखने पर पहियों का लंबवत झुकाव।\n3. **कास्टर**: साइड से स्टीयरिंग अक्ष का झुकाव, जो कार को सीधे रखने में मदद करता है।'
      },
      deep: {
        en: 'Modern computerised alignment rigs use high-definition digital cameras and infrared targets clamped to all four wheel rims to measure spatial thrust angle, individual toe, steering axis inclination (SAI), and included angle against vehicle chassis datums.\n\nEven 1.5 mm of toe deviation forces the tyre to scrub sideways by roughly 10 metres for every kilometre travelled. For Advanced Driver Assistance Systems (ADAS) equipped vehicles, rear thrust angle calibration is mandatory so lane-keep assist cameras align with the true mechanical direction of travel.',
        hi: 'आधुनिक 4-पहिया लेजर अलाइनमेंट कंप्यूटर कैमरे और रिफ्लेक्टर का उपयोग करके थ्रस्ट एंगल और टो को मापते हैं। थोड़ा सा विचलन भी टायर को साइडवे घिसता है।'
      }
    },
    diagram: 'alignment-angles',
    glossary: [
      'Toe-in / Toe-out: Direction tyres point relative to the vehicle centreline.',
      'Camber: Vertical tilt angle of the wheel relative to road surface.',
      'Thrust Angle: Angle between rear axle line and geometric vehicle centreline.'
    ],
    askMechanic: [
      { en: 'Can I see the before-and-after colour printout showing measured degrees and minutes?', hi: 'क्या मैं डिग्री और मिनट दिखाने वाला बिफोर-आफ्टर प्रिंटआउट देख सकता हूँ?' },
      { en: 'Did you inspect ball joints, tie rod ends, and suspension bushes before performing the alignment?', hi: 'क्या अलाइनमेंट करने से पहले बॉल जॉइंट्स और बुश की जांच की गई थी?' },
      { en: 'Was the steering angle sensor (SAS) zero-point calibrated after adjusting toe?', hi: 'क्या टो समायोजित करने के बाद स्टीयरिंग एंगल सेंसर कैलिब्रेट किया गया था?' }
    ],
    sources: ['SAE J670 Vehicle Dynamics Terminology', 'Hunter Engineering Wheel Alignment Fundamentals'],
    reviewedOn: '2026-07-18'
  },
  {
    slug: 'why-car-pulls-to-one-side',
    tags: ['Suspension & Steering', 'Tyres', 'Safety'],
    title: {
      en: 'Why a Car Pulls to One Side: 6 Root Causes',
      hi: 'कार एक तरफ क्यों खिंचती है: 6 मुख्य कारण'
    },
    layers: {
      s30: {
        en: 'A pulling vehicle is usually caused by unequal tyre pressure, uneven wheel alignment, dragging brake calipers, suspension bushing wear, tyre conicity, or road crown slope.',
        hi: 'कार का एक तरफ खिंचना आमतौर पर असमान टायर दबाव, खराब अलाइनमेंट, जाम ब्रेक कैलीपर, सस्पेंशन बुश घिसाव या सड़क की ढलान के कारण होता है।'
      },
      m3: {
        en: 'If your steering wheel pulls towards the verge or oncoming lane when driving on a flat road, check these steps in order:\n1. **Tyre Pressure**: A tyre with 5–10 psi lower pressure creates greater rolling resistance, pulling the car toward the soft tyre.\n2. **Wheel Alignment**: Uneven caster or camber angles between left and right wheels.\n3. **Seized Brake Caliper**: A sticky caliper piston continuously drags the pad against one rotor, pulling the vehicle and generating noticeable heat and a hot metal smell.\n4. **Worn Suspension Bushes**: Broken control arm rubber allows the wheel hub to shift under load.\n5. **Tyre Conicity**: Manufacturing belt anomalies causing a cone-like rolling tendency.',
        hi: 'समतल सड़क पर कार खिंचने के कारण: 1. असमान टायर दबाव, 2. गलत अलाइनमेंट, 3. जाम ब्रेक कैलीपर जो लगातार पहिए को रोकता है, 4. सस्पेंशन बुश का टूटना, 5. टायर का असमान घिसाव।'
      },
      deep: {
        en: 'Diagnostic procedure isolates hydraulic vs mechanical drag: technician measures hub temperatures with an infrared pyrometer after a road test. A delta > 25°C between left and right brake assemblies confirms dragging caliper pistons or collapsed flexible brake hose liner behaving as a one-way check valve.\n\nCross-camber differences exceeding 0.5° or cross-caster differences exceeding 0.75° will cause dynamic pull towards the side with more positive camber or less positive caster.',
        hi: 'डायग्नोस्टिक में इन्फ्रारेड पायरोमीटर से पहिए का तापमान मापा जाता है। 25 डिग्री से अधिक का अंतर जाम ब्रेक का प्रमाण है।'
      }
    },
    diagram: 'pull-causes',
    glossary: [
      'Road Crown: The cambered slope of asphalt engineered for water drainage.',
      'Tyre Conicity: Internal steel belt bias causing lateral force generation.',
      'Control Arm Bush: Rubber vibration-damping mount isolating suspension from frame.'
    ],
    askMechanic: [
      { en: 'Did you check brake disc temperatures with an infrared thermometer to rule out caliper drag?', hi: 'क्या आपने कैलीपर ड्रैग की जांच के लिए इन्फ्रारेड थर्मामीटर से तापमान मापा?' },
      { en: 'What was the cross-camber and cross-caster split on the alignment report?', hi: 'अलाइनमेंट रिपोर्ट पर क्रॉस-कैम्बर और क्रॉस-कास्टर अंतर क्या था?' },
      { en: 'Are the lower control arm bushings showing any tearing or fluid leaks?', hi: 'क्या निचले कंट्रोल आर्म बुशिंग में कोई दरार या रिसाव है?' }
    ],
    sources: ['TMC Recommended Practice RP 642 Chassis Diagnostics', 'AA Vehicle Triage Manual'],
    reviewedOn: '2026-07-22'
  },
  {
    slug: 'warning-lights-overview',
    tags: ['Safety', 'Diagnostics'],
    title: {
      en: 'What Dashboard Warning Lights Mean: Triage Guide',
      hi: 'डैशबोर्ड चेतावनी बत्तियाँ: सुरक्षा और प्राथमिकता गाइड'
    },
    layers: {
      s30: {
        en: 'Dashboard warning lights follow universal traffic-light safety colours: RED means stop immediately in a safe location. AMBER / YELLOW means an advisory or fault requiring prompt inspection. GREEN / BLUE indicates active operational systems.',
        hi: 'डैशबोर्ड बत्तियाँ तीन रंगों में होती हैं: लाल (RED) का अर्थ है सुरक्षित स्थान पर तुरंत रुकें। पीला (AMBER) का अर्थ है जल्द जांच कराएं। हरा/नीला सामान्य सिस्टम सक्रिय होने का संकेत है।'
      },
      m3: {
        en: 'Understanding light colours prevents catastrophic breakdowns:\n- **RED Lights**: Serious safety or mechanical hazard. Oil pressure warning, brake hydraulic loss, battery charge alternator failure, engine overheat, airbag SRS fault, or EV high-voltage isolation fault. Do not keep driving.\n- **AMBER Lights**: Fault detected by engine or chassis ECU. Steady check engine light, ABS deactivated, tyre pressure loss (TPMS), traction control off, glow plug preheat, or emission DPF filter regeneration required.\n- **GREEN / BLUE**: Information only (Headlight high beam, cruise control active, lane assist on, EV ready mode).',
        hi: 'लाल बत्ती: गंभीर खतरा। तेल का दबाव, ब्रेक द्रव की कमी या इंजन गर्म होना। तुरंत रुकें। पीली बत्ती: चेतावनी, जैसे चेक इंजन या ABS। जल्द जांच कराएं। हरी बत्ती: सिस्टम सक्रिय है।'
      },
      deep: {
        en: 'Upon turning the ignition on, all dash symbols illuminate during the "bulb check" self-test before extinguishing within 2–5 seconds as ECUs complete diagnostic handshakes over CAN-bus and LIN-bus networks.\n\nA symbol remaining illuminated triggers a Diagnostic Trouble Code (DTC) stored in freeze-frame non-volatile memory. Red warning illuminates when monitored thresholds breach immediate safety criteria (e.g. oil pressure transducer drops below 5 psi at idle).',
        hi: 'इग्निशन चालू करने पर सभी बत्तियां 2-5 सेकंड के लिए जलती हैं। यदि कोई बत्ती जलती रहती है, तो ECU फॉल्ट कोड (DTC) स्टोर करता है।'
      }
    },
    diagram: 'lights-matrix',
    glossary: [
      'CAN-bus: Controller Area Network connecting in-vehicle computers.',
      'DTC: Diagnostic Trouble Code (alphanumeric fault identifier).',
      'ECU: Electronic Control Unit managing automotive subsystems.'
    ],
    askMechanic: [
      { en: 'Can you provide the exact alphanumeric Diagnostic Trouble Codes (DTCs) and freeze-frame data?', hi: 'क्या आप सटीक फॉल्ट कोड (DTC) और फ्रीज-फ्रेम डेटा प्रदान कर सकते हैं?' },
      { en: 'Is this fault actively current or a historical stored intermittent code?', hi: 'क्या यह फॉल्ट वर्तमान में सक्रिय है या पुराना इंटरमिटेंट कोड है?' },
      { en: 'Will you perform bidirectional actuator testing before replacing any sensor?', hi: 'क्या सेंसर बदलने से पहले बायडायरेक्शनल टेस्टिंग की जाएगी?' }
    ],
    sources: ['ISO 2575 Road Vehicles Warning Symbols', 'SAE J1979 E/E Diagnostic Test Modes'],
    reviewedOn: '2026-08-05'
  },
  {
    slug: 'check-engine-light-guide',
    tags: ['Diagnostics', 'Engine & Powertrain', 'Emissions'],
    title: {
      en: 'Check Engine Light: Steady vs Flashing & OBD-II Codes',
      hi: 'चेक इंजन लाइट: स्थिर बनाम चमकती बत्ती और OBD-II कोड'
    },
    layers: {
      s30: {
        en: 'A STEADY amber check engine light means an emissions or engine management fault has been detected — drive calmly to a workshop soon. A FLASHING check engine light signals a severe misfire that can melt your expensive catalytic converter — stop driving immediately.',
        hi: 'स्थिर (Steady) पीली बत्ती का अर्थ है इंजन सिस्टम में फॉल्ट — जल्द वर्कशॉप जाएं। चमकती (Flashing) बत्ती का अर्थ है गंभीर मिसफायर जिससे कैटेलिटिक कन्वर्टर खराब हो सकता है — तुरंत रुकें।'
      },
      m3: {
        en: 'The On-Board Diagnostics II (OBD-II) system constantly monitors engine combustion, air-fuel ratios, ignition timing, and exhaust emissions.\n\nWhen a sensor (e.g. oxygen sensor, mass air flow sensor, camshaft position sensor) reads out-of-range values over two consecutive drive cycles, the ECU illuminates the light and logs a five-digit code (e.g. P0300 Random Misfire, P0420 Catalyst Efficiency Below Threshold).\n\nIf the light flashes, unburned fuel is entering the exhaust pipe and burning inside the catalytic converter at over 1,000°C, risking melted substrate and exhaust fire.',
        hi: 'OBD-II सिस्टम इंजन दहन और उत्सर्जन पर नजर रखता है। यदि सेंसर गलत मान दर्ज करता है, तो चेक इंजन लाइट जलती है। यदि यह चमकती (flash) है, तो बिना जला हुआ ईंधन साइलेंसर में जाकर आग या कन्वर्टर पिघलने का खतरा पैदा करता है।'
      },
      deep: {
        en: 'Misfire detection algorithms measure micro-variations in crankshaft rotational acceleration between cylinder firing events using the 60-2 tooth reluctor wheel and crank sensor. A misfire rate exceeding 2% triggers an emissions DTC; a rate exceeding 10% initiates continuous MIL (Malfunction Indicator Lamp) flashing to protect the post-manifold catalytic converter.\n\nTechnicians evaluate short-term and long-term fuel trim (STFT/LTFT) parameters; trim values exceeding +/- 10% indicate vacuum leaks or fuel injector delivery disparities.',
        hi: 'क्रैंकशाफ्ट सेंसर प्रति सिलेंडर दहन त्वरण को मापता है। 10% से अधिक मिसफायर दर पर बत्ती तेजी से चमकने लगती है ताकि कैटेलिटिक कनवर्टर सुरक्षित रहे।'
      }
    },
    diagram: 'obd-misfire',
    glossary: [
      'OBD-II: Standardised automotive diagnostic protocol since 1996.',
      'Catalytic Converter: Exhaust device converting CO, HC, and NOx into harmless gases.',
      'Fuel Trim: ECU percentage adjustment to nominal injector pulse width.'
    ],
    askMechanic: [
      { en: 'What are the Long-Term Fuel Trim (LTFT) percentages on Bank 1 and Bank 2?', hi: 'बैंक 1 और बैंक 2 पर लॉन्ग-टर्म फ्यूल ट्रिम प्रतिशत क्या हैं?' },
      { en: 'Was a smoke-machine pressure test performed to check for intake manifold vacuum leaks?', hi: 'क्या इनटेक मैनिफोल्ड वैक्यूम लीक की जांच के लिए स्मोक टेस्ट किया गया?' },
      { en: 'Did live misfire count data isolate a specific cylinder (e.g., P0301 vs P0300)?', hi: 'क्या लाइव डेटा ने किसी विशेष सिलेंडर के मिसफायर की पहचान की?' }
    ],
    sources: ['EPA OBD-II Regulatory Compliance Guide', 'SAE J2012 Diagnostic Trouble Code Definitions'],
    reviewedOn: '2026-06-30'
  },
  {
    slug: 'cold-weather-battery-problems',
    tags: ['Battery & Electrics', 'Maintenance'],
    title: {
      en: 'Why 12V Batteries Struggle in Cold Weather: Chemical Truth',
      hi: 'सर्दियों में 12V बैटरी कमजोर क्यों पड़ती है: रासायनिक सच'
    },
    layers: {
      s30: {
        en: 'Cold temperatures slow down battery chemical reactions, reducing available cranking power by up to 50% at -10°C, while cold, thick engine oil simultaneously demands twice as much power to crank the starter motor.',
        hi: 'ठंडे तापमान में बैटरी की रासायनिक प्रतिक्रियाएं धीमी हो जाती हैं, जिससे -10°C पर क्षमता 50% तक गिर जाती है, जबकि गाढ़ा इंजन तेल स्टार्टर पर दोगुना भार डालता है।'
      },
      m3: {
        en: 'A standard 12-volt lead-acid or AGM (Absorbent Glass Mat) battery relies on electrochemical reactions between lead plates and sulphuric acid electrolyte to generate Cold Cranking Amps (CCA).\n\nAt 0°C, a healthy battery loses roughly 20–30% of its rated cranking amps. At -18°C, capacity drops to ~50%. If the battery is already 4 to 5 years old and has internal plate sulfation, it cannot provide the 300–500 amps required to turn over cold engine pistons, leaving you stranded with a rapid "clicking" starter solenoid sound.',
        hi: 'बैटरी लेड प्लेट्स और सल्फ्यूरिक एसिड के बीच रासायनिक प्रतिक्रिया से काम करती है। 0°C पर बैटरी 30% क्षमता खो देती है। यदि बैटरी 4-5 साल पुरानी है, तो यह स्टार्टर मोटर को घुमाने के लिए आवश्यक 300-500 एम्पीयर नहीं दे पाती।'
      },
      deep: {
        en: 'Ionic mobility in lead-acid cells decreases with temperature, causing internal electrolyte resistance (Ri) to rise sharply. This induces severe voltage sag during high-amperage discharge.\n\nDigital conductance testers inject an AC micro-signal to measure dynamic conductance (Siemens), accurately predicting State of Health (SOH) and cold cranking capability without requiring thermal discharge stress.',
        hi: 'तापमान घटने से बैटरी का आंतरिक प्रतिरोध बढ़ जाता है। डिजिटल कंडक्टेंस टेस्टर बैटरी के स्वास्थ्य (SOH) और कोल्ड क्रैंकिंग एम्प्स (CCA) की सटीक जांच करते हैं।'
      }
    },
    diagram: 'battery-conductance',
    glossary: [
      'CCA: Cold Cranking Amps (amperage delivered at -18°C for 30 seconds).',
      'AGM: Absorbent Glass Mat advanced battery with porous micro-glass fleece.',
      'Sulfation: Accumulation of lead sulphate crystals on plates reducing active surface area.'
    ],
    askMechanic: [
      { en: 'What was the measured Cold Cranking Amps (CCA) versus the rated factory spec?', hi: 'फैक्ट्री विनिर्देश की तुलना में मापा गया CCA क्या था?' },
      { en: 'What is the resting voltage and alternator charging voltage under load (headlights/heaters on)?', hi: 'रेस्टिंग वोल्टेज और लोड के तहत अल्टरनेटर चार्जिंग वोल्टेज क्या है?' },
      { en: 'Is the battery an AGM or EFB type required for vehicle stop-start systems?', hi: 'क्या यह स्टॉप-स्टार्ट सिस्टम के लिए आवश्यक AGM या EFB बैटरी है?' }
    ],
    sources: ['Battery Council International (BCI) Technical Manual', 'SAE J537 Storage Battery Testing'],
    reviewedOn: '2026-07-05'
  },
  {
    slug: 'engine-oil-grades-viscosity',
    tags: ['Engine & Powertrain', 'Maintenance'],
    title: {
      en: 'Engine Oil Grades & Viscosity in Plain Language: 0W-20 to 5W-30',
      hi: 'इंजन ऑयल ग्रेड और विस्कोसिटी: 0W-20 से 5W-30 की समझ'
    },
    layers: {
      s30: {
        en: 'Oil grades like "5W-30" define oil viscosity (thickness). The first number with "W" represents cold winter flow rate at engine start-up; the second number represents high-temperature protection at 100°C engine operating heat.',
        hi: '5W-30 जैसे ऑयल ग्रेड चिपचिपापन (viscosity) दर्शाते हैं। "W" के साथ पहला नंबर सर्दियों में शुरुआती बहाव दर बताता है; दूसरा नंबर 100°C पर इंजन सुरक्षा दर्शाता है।'
      },
      m3: {
        en: 'Engine oil performs four vital tasks: lubricating moving metal surfaces, cooling internal components, cleaning combustion soot, and sealing cylinder piston rings.\n\nIn "0W-20":\n- **0W**: Extremely thin at sub-zero cold starts, enabling rapid oil pump circulation to overhead camshafts in under 2 seconds.\n- **20**: Kinetic viscosity rating at full engine operating temperature (100°C).\n\nModern tight-tolerance engines and hybrid powertrains (which restart their petrol engine frequently while driving) mandate ultra-low viscosity synthetic oils like 0W-16 or 0W-20 with OEM-specific approvals.',
        hi: 'इंजन ऑयल 4 काम करता है: चिकनाई, ठंडा रखना, सफाई और सीलिंग। 0W-20 में 0W सर्दियों में त्वरित प्रवाह देता है ताकि 2 सेकंड में तेल सभी हिस्सों तक पहुंचे, और 20 ऑपरेटिंग तापमान पर सुरक्षा देता है।'
      },
      deep: {
        en: 'Viscosity Index Improvers (VII polymer chains) expand as temperature rises to prevent excessive thermal thinning. High Temperature High Shear (HTHS) viscosity measured at 150°C defines journal bearing hydrodynamic oil film thickness.\n\nLow SAPS (Sulphated Ash, Phosphorus, and Sulphur) formulations protect modern Diesel Particulate Filters (DPF) and Gasoline Particulate Filters (GPF) from irreversible chemical ash poisoning.',
        hi: 'सिंथेटिक तेल में विशेष पॉलीमर होते हैं। लो SAPS ऑयल एग्जॉस्ट DPF फिल्टर को राख से बंद होने से बचाते हैं।'
      }
    },
    diagram: 'oil-viscosity',
    glossary: [
      'Viscosity: A fluid’s resistance to gradual deformation by shear or tensile stress.',
      'SAPS: Sulphated Ash, Phosphorus, Sulphur limits for exhaust filter protection.',
      'HTHS: High Temperature High Shear viscosity parameter measuring film strength.'
    ],
    askMechanic: [
      { en: 'Does the oil being used meet the exact OEM specification number required in my logbook?', hi: 'क्या इस्तेमाल किया जा रहा तेल मेरे हैंडबुक में दिए सटीक OEM विनिर्देश से मेल खाता है?' },
      { en: 'Did you replace the sump drain plug crush washer and torque it to exact spec?', hi: 'क्या आपने नाली प्लग वॉशर बदला और इसे सही टॉर्क पर कसा?' },
      { en: 'Was a genuine OE or equivalent high-efficiency oil filter element fitted?', hi: 'क्या उच्च गुणवत्ता वाला ओरिजिनल ऑयल फ़िल्टर लगाया गया?' }
    ],
    sources: ['API Engine Oil Licensing & Certification System (EOLCS)', 'ACEA European Oil Sequences'],
    reviewedOn: '2026-08-10'
  },
  {
    slug: 'coolant-and-overheating',
    tags: ['Cooling System', 'Engine & Powertrain', 'Safety'],
    title: {
      en: 'Engine Cooling, Thermostats & Overheating Prevention',
      hi: 'इंजन कूलिंग, थर्मोस्टेट और ओवरहीटिंग से बचाव'
    },
    layers: {
      s30: {
        en: 'Your car’s cooling circuit circulates a 50/50 mix of demineralised water and ethylene glycol coolant to keep the engine at an optimal 90°C. If your temp gauge enters the red zone, pull over immediately to prevent a blown head gasket or cracked engine block.',
        hi: 'कूलिंग सिस्टम 50/50 पानी और ग्लाइकोल कूलेंट के मिश्रण से इंजन को 90°C पर बनाए रखता है। यदि तापमान कांटा लाल क्षेत्र में जाए, तो तुरंत रुकें ताकि इंजन ब्लॉक खराब न हो।'
      },
      m3: {
        en: 'A water pump driven by the engine serpentine belt or electric motor circulates coolant through water jackets in the engine cylinder head and block. When cold, a spring-loaded wax thermostat remains closed to warm the engine rapidly.\n\nOnce reaching ~88°C, the thermostat opens, routing hot liquid through the radiator where airflow and electric cooling fans dissipate the heat. The radiator expansion tank cap is pressurized (typically 1.1 to 1.4 bar), which raises the coolant boiling point to over 125°C.',
        hi: 'वाटर पंप कूलेंट को इंजन में घुमाता है। थर्मोस्टेट 88°C पर खुलता है और गर्म द्रव को रेडिएटर में भेजता है जहां पंखा इसे ठंडा करता है। प्रेशराइज्ड कैप कूलेंट के उबलने के तापमान को 125°C तक बढ़ा देती है।'
      },
      deep: {
        en: 'Organic Acid Technology (OAT) and Hybrid OAT (HOAT) coolants contain carboxylate corrosion inhibitors that form microscopic passivation layers over aluminium cylinder heads, preventing galvanic corrosion and water pump cavitation erosion.\n\nCoolant pressure decay testing (pressurizing the cold system to 1.2 bar with a manual hand pump) reveals hairline radiator tank seam splits, heater matrix seepage, and head gasket cylinder-to-water-jacket breaches without engine operation.',
        hi: 'OAT कूलेंट एल्यूमीनियम घटकों को जंग से बचाते हैं। कूलेंट प्रेशर टेस्ट 1.2 बार दबाव डालकर सूक्ष्म रिसाव की पहचान करता है।'
      }
    },
    diagram: 'cooling-circuit',
    glossary: [
      'Thermostat: Temperature-sensitive wax valve regulating coolant flow to radiator.',
      'OAT: Organic Acid Technology long-life silicate-free coolant formula.',
      'Cavitation: Rapid formation and collapse of vapour bubbles eroding water pump impellers.'
    ],
    askMechanic: [
      { en: 'What was the refractometer glycol concentration percentage and freezing protection level?', hi: 'रिफ्रैक्टोमीटर ग्लाइकोल एकाग्रता और फ्रीजिंग सुरक्षा स्तर क्या था?' },
      { en: 'Did the cooling system pass a 15-minute static 1.2 bar pressure decay test?', hi: 'क्या सिस्टम ने 15 मिनट का 1.2 बार प्रेशर टेस्ट पास किया?' },
      { en: 'Is the radiator electric cooling fan high-speed stage switching on at designated ECU temperatures?', hi: 'क्या इलेक्ट्रिक कूलिंग फैन सही तापमान पर चालू हो रहा है?' }
    ],
    sources: ['ASTM D3306 Engine Coolant Standards', 'SAE J814 Engine Coolants Guide'],
    reviewedOn: '2026-07-28'
  },
  {
    slug: 'suspension-wear-signs',
    tags: ['Suspension & Steering', 'Safety', 'Costs'],
    title: {
      en: 'Signs of Worn Suspension: Shocks, Struts & Bushings',
      hi: 'सस्पेंशन घिसाव के लक्षण: शॉक एब्जॉर्बर, स्ट्रट्स और बुश'
    },
    layers: {
      s30: {
        en: 'Suspension components keep tyres planted on the road over bumps and during cornering. Worn shocks or torn rubber bushings cause knocking noises over speed bumps, excessive body roll in turns, nose-diving during braking, and cupped tyre wear.',
        hi: 'सस्पेंशन पहियों को सड़क पर स्थिर रखता है। खराब शॉकर्स या टूटे बुश गड्ढों पर खटखट की आवाज, मोड़ पर अत्यधिक झुकाव, ब्रेक लगाने पर आगे झुकना और टायरों का असमान घिसाव पैदा करते हैं।'
      },
      m3: {
        en: 'A car suspension relies on coil springs to support vehicle weight and shock absorbers (dampers) to control spring oscillations. Without shocks, hitting one bump would cause the car to bounce continuously like a pogo stick.\n\nKey wear signs:\n1. **Oil Misting/Leaks**: Fluid leaking down the outer shock absorber tube indicates a blown hydraulic seal.\n2. **Knocking/Clunking**: Rubber control arm bushings or stabilizer anti-roll bar drop links have perished, allowing metal-on-metal contact over rough tarmac.\n3. **Bounce Test**: Pushing down hard on a vehicle corner should see it rebound once and settle immediately; bouncing 2–3 times proves worn damper valving.',
        hi: 'स्प्रिंग्स कार का वजन संभालते हैं और शॉक एब्जॉर्बर उछाल को नियंत्रित करते हैं। लक्षण: शॉकर्स से तेल रिसाव, गड्ढों पर खटखट की आवाज और कार का बार-बार उछलना।'
      },
      deep: {
        en: 'Hydraulic mono-tube and twin-tube dampers use high-pressure nitrogen gas (15–30 bar) and multi-stage velocity-sensitive shim stacks to generate damping force. As internal piston seal rings wear, hydraulic oil bypasses the valving orifices, causing damping degradation and tyre hop.\n\nTyre hop allows the wheel to leave the asphalt intermittently for milliseconds, increasing braking distances on uneven surfaces by up to 15% and preventing ABS sensors from reading stable wheel deceleration.',
        hi: 'खराब शॉक एब्जॉर्बर पहिए को सड़क से उछलने देते हैं, जिससे असमान सड़कों पर रुकने की दूरी 15% तक बढ़ जाती है।'
      }
    },
    diagram: 'strut-assembly',
    glossary: [
      'Damper / Shock Absorber: Hydraulic velocity-sensitive device controlling spring oscillation.',
      'Drop Link: Ball-jointed rod linking anti-roll stabilizer bar to suspension strut.',
      'Cupping Wear: Scalloped dips around the tyre circumference caused by bouncing.'
    ],
    askMechanic: [
      { en: 'Are the shock absorber shaft chrome rods free of pitting and hydraulic seal weeping?', hi: 'क्या शॉक एब्जॉर्बर रॉड पर कोई जंग या तेल रिसाव है?' },
      { en: 'Were the anti-roll bar drop links and ball joints checked under load with a pry bar?', hi: 'क्या ड्रॉप लिंक्स और बॉल जॉइंट्स की जांच लोड के तहत की गई थी?' },
      { en: 'Will you perform a 4-wheel alignment after replacing struts or control arms?', hi: 'क्या स्ट्रट्स बदलने के बाद 4-व्हील अलाइनमेंट किया जाएगा?' }
    ],
    sources: ['KYB Technical Suspension Guide', 'SAE J1583 Suspension Dynamics'],
    reviewedOn: '2026-06-18'
  },
  {
    slug: 'ev-maintenance-basics',
    tags: ['EV & Hybrid', 'Maintenance', 'Safety'],
    title: {
      en: 'EV & Hybrid Maintenance: What’s Different vs Petrol Cars',
      hi: 'ईवी और हाइब्रिड रखरखाव: पेट्रोल कारों से क्या अलग है'
    },
    layers: {
      s30: {
        en: 'Electric Vehicles eliminate engine oil changes, spark plugs, timing belts, and exhaust systems. However, they require specialist high-voltage safety checks, dedicated battery cooling loop maintenance, heavier tyre wear management, and brake caliper anti-seize care.',
        hi: 'इलेक्ट्रिक वाहनों में इंजन ऑयल, स्पार्क प्लग और साइलेंसर नहीं होते। लेकिन इनमें हाई-वोल्टेज सुरक्षा, बैटरी कूलेंट फ्लश, भारी वजन के कारण टायर रखरखाव और ब्रेक कैलीपर सफाई आवश्यक है।'
      },
      m3: {
        en: 'While internal combustion engines contain hundreds of reciprocating moving parts, an EV powertrain relies on a high-voltage traction battery pack, power inverter, and electric drive motors.\n\nCritical EV maintenance includes:\n- **High-Voltage Cabling & Isolation**: Verifying orange high-voltage harnesses and interlock circuits for insulation resistance.\n- **Battery Coolant**: Low-conductivity dielectric fluid flushes to maintain battery cell temperature.\n- **Brake Discs & Calipers**: Because regenerative braking handles 80%+ of deceleration, mechanical friction brakes are used lightly and can seize or corrode without annual slider lubrication.\n- **Cabin Hepa Filters & A/C**: Heat pump systems manage both cabin comfort and high-voltage battery thermal conditioning.',
        hi: 'ईवी में इंजन के बदले हाई-वोल्टेज बैटरी, इन्वर्टर और मोटर होती है। मुख्य रखरखाव: ऑरेंज हाई-वोल्टेज केबल की जांच, बैटरी कूलेंट, जंग से बचाने के लिए ब्रेक कैलीपर सर्विस और केबिन HEPA फिल्टर।'
      },
      deep: {
        en: 'EV diagnostic protocols require High-Voltage certified technicians using 1,000V CAT III/IV insulated tools. Technicians test battery State of Health (SOH) by interrogating the Battery Management System (BMS) for individual cell millivolt delta spread (ideally < 15 mV) and internal resistance.\n\nDielectric battery coolants must maintain high electrical resistivity to avoid conductive short-circuits in the event of internal heat-exchanger plate breaches.',
        hi: 'ईवी डायग्नोस्टिक्स के लिए प्रमाणित तकनीशियन 1,000V इंसुलेटेड टूल्स का उपयोग करते हैं और बैटरी सेल वोल्टेज में अंतर (सेल डेल्टा < 15mV) की जांच करते हैं।'
      }
    },
    diagram: 'ev-powertrain',
    glossary: [
      'Inverter: High-power electronics converting DC battery power to 3-phase AC motor drive.',
      'Dielectric Coolant: Non-electrically conductive fluid managing battery thermal packs.',
      'BMS: Battery Management System computer balancing cell voltages and temperature.'
    ],
    askMechanic: [
      { en: 'What is the certified high-voltage training level of the technician working on my EV?', hi: 'मेरी ईवी पर काम कर रहे तकनीशियन का हाई-वोल्टेज प्रशिक्षण स्तर क्या है?' },
      { en: 'Can you provide a battery State of Health (SOH) percentage printout with cell delta voltage?', hi: 'क्या आप सेल डेल्टा वोल्टेज के साथ बैटरी स्टेट ऑफ हेल्थ (SOH) प्रिंटआउट दे सकते हैं?' },
      { en: 'Were the mechanical brake calipers stripped and lubricated to prevent corrosion from regen underuse?', hi: 'क्या रीजेन ब्रेकिंग के कारण ब्रेक कैलीपर को जंग से बचाने के लिए लुब्रिकेट किया गया?' }
    ],
    sources: ['IMI EV Technician National Occupational Standards', 'SAE J2344 Electric Vehicle Safety Guidelines'],
    reviewedOn: '2026-08-12'
  },
  {
    slug: 'regenerative-braking-pads',
    tags: ['EV & Hybrid', 'Brakes', 'Maintenance'],
    title: {
      en: 'Regenerative Braking, Friction Pads & Disc Corrosion',
      hi: 'रीजेनेरेटिव ब्रेकिंग, घर्षण पैड और डिस्क जंग की समस्या'
    },
    layers: {
      s30: {
        en: 'Regenerative braking reverses electric motors to capture kinetic energy during slowing, returning power to the battery. Because friction pads are used rarely, brake discs can corrode from road salt and moisture, leading to caliper slider seizure if neglected.',
        hi: 'रीजेनेरेटिव ब्रेकिंग धीमा होने पर मोटर को उल्टी दिशा में चलाकर बैटरी चार्ज करती है। घर्षण ब्रेक का कम उपयोग होने से डिस्क में जंग लग सकती है और कैलीपर जाम हो सकते हैं।'
      },
      m3: {
        en: 'In an EV or hybrid, when you lift off the accelerator or lightly press the brake pedal, the motor turns into a generator, creating electromagnetic drag that slows the car.\n\nThis dramatically extends brake pad lifespan (often lasting 80,000–120,000 km). However, this creates a hidden hazard: lack of frictional heat allows moisture, grit, and road salt to pit the cast-iron rotor surfaces. Caliper slide pins dry out and seize, causing the pads to bind, reduce vehicle range, and fail annual safety inspections due to surface rust banding.',
        hi: 'ईवी में ब्रेक पैड 80,000-120,000 किमी तक चल सकते हैं। लेकिन कम उपयोग के कारण डिस्क पर जंग लग सकती है और स्लाइडर पिन सूखकर जाम हो सकते हैं, जिससे रेंज घटती है।'
      },
      deep: {
        en: 'Braking blending logic smoothly transitions from regenerative deceleration to hydraulic friction clamping during panic stops or when the traction battery is at 100% State of Charge (where regen is electronically throttled to protect cells).\n\nTorquewell performs dedicated EV brake clean-and-slide maintenance: dismantling caliper carrier brackets, removing rust scale, polishing slider pins, and applying high-temperature ceramic synthetic grease.',
        hi: 'इलेक्ट्रॉनिक ब्रेक बूस्टर रीजेन और घर्षण ब्रेक के बीच संतुलन बनाता है। टॉर्कवेल तकनीशियन कैलीपर ब्रैकेट को खोलकर जंग साफ करते हैं और सिरेमिक ग्रीस लगाते हैं।'
      }
    },
    diagram: 'regen-brake-blending',
    glossary: [
      'Regen Blending: Computer-controlled coordination between electric motor drag and hydraulic pads.',
      'Caliper Seizure: Mechanical jamming of caliper pistons or pins due to corrosion and dry grease.',
      'Rust Banding: Severe concentric circular corrosion rings on un-swept brake discs.'
    ],
    askMechanic: [
      { en: 'Did you physically strip, clean, and grease the caliper slider pins and pad abutment clips?', hi: 'क्या आपने कैलीपर स्लाइडर पिन और पैड क्लिप्स को खोलकर साफ और ग्रीस किया?' },
      { en: 'What percentage of the friction disc surface area is clean and free of pitting rust bands?', hi: 'डिस्क का कितना प्रतिशत हिस्सा साफ और जंग-मुक्त है?' },
      { en: 'Is the brake pedal simulator and stroke sensor calibrated for smooth regen blending?', hi: 'क्या ब्रेक पैडल स्ट्रोक सेंसर सुचारू रीजेन के लिए कैलिब्रेटेड है?' }
    ],
    sources: ['SAE J2990 Hybrid and EV Safety and Braking Systems', 'Brembo EV Friction Maintenance Protocol'],
    reviewedOn: '2026-07-15'
  },
  {
    slug: 'ev-charging-battery-myths',
    tags: ['EV & Hybrid', 'Battery & Electrics'],
    title: {
      en: 'EV Charging Habits & Battery Health Myths Debunked',
      hi: 'ईवी चार्जिंग आदतें और बैटरी लाइफ के मिथक व सच'
    },
    layers: {
      s30: {
        en: 'Modern EV traction batteries last hundreds of thousands of kilometres. For daily driving, charging to 80% and avoiding prolonged rest at 100% or 0% State of Charge minimises lithium-ion degradation and preserves maximum range for years.',
        hi: 'आधुनिक ईवी बैटरी कई लाख किलोमीटर चलती है। दैनिक उपयोग के लिए 80% तक चार्ज करना और 100% या 0% पर लंबे समय तक न छोड़ना बैटरी जीवन को लंबा बनाता है।'
      },
      m3: {
        en: 'Common EV battery myths and verified facts:\n- **Myth 1**: "EV batteries must be replaced every 3–5 years." **Fact**: Real-world fleet telemetry shows modern liquid-cooled lithium batteries retain over 85–90% capacity after 200,000+ km.\n- **Myth 2**: "Fast DC charging destroys batteries instantly." **Fact**: Occasional DC rapid charging is safely managed by active thermal cooling; only continuous high-temperature rapid charging causes minor incremental wear.\n- **Myth 3**: "Always charge to 100%." **Fact**: For NMC chemistry, charging to 80% daily and reserving 100% for long road trips minimizes high-voltage stress.',
        hi: 'मिथक 1: बैटरी 3-5 साल में बदलनी पड़ती है (सच: 200,000+ किमी पर भी 85-90% क्षमता रहती है)। मिथक 2: फास्ट चार्जिंग तुरंत नुकसान करती है (सच: थर्मल मैनेजमेंट सुरक्षित रखता है)। 80% दैनिक चार्जिंग सर्वोत्तम है।'
      },
      deep: {
        en: 'Lithium-ion degradation operates through Calendar Aging (parasitic electrolyte oxidation occurring over time as a function of temperature and high SoC) and Cycle Aging (mechanical micro-cracking of cathode particles and lithium plating during high C-rate low-temperature fast charging).\n\nLithium Iron Phosphate (LFP) chemistries exhibit high thermal stability and can be charged to 100% weekly for BMS calibration, whereas Nickel Manganese Cobalt (NMC) chemistries benefit from an 80% daily ceiling to minimize transition-metal dissolution.',
        hi: 'लिथियम आयन बैटरी में कैलेंडर एजिंग और साइकिल एजिंग दो प्रक्रियाएं होती हैं। LFP बैटरी को 100% चार्ज किया जा सकता है, जबकि NMC बैटरी के लिए 80% दैनिक चार्ज आदर्श है।'
      }
    },
    diagram: 'battery-degradation',
    glossary: [
      'SoC: State of Charge (current battery percentage).',
      'SEI Layer: Solid Electrolyte Interphase passivation layer on battery anode.',
      'LFP / NMC: Lithium Iron Phosphate vs Nickel Manganese Cobalt battery chemistry.'
    ],
    askMechanic: [
      { en: 'What is my vehicle Battery Chemistry type (LFP vs NMC) and recommended daily charge limit?', hi: 'मेरे वाहन का बैटरी प्रकार (LFP या NMC) और अनुशंसित दैनिक चार्ज सीमा क्या है?' },
      { en: 'What is the current SOH (State of Health) percentage readout from the BMS?', hi: 'BMS से वर्तमान स्टेट ऑफ हेल्थ (SOH) प्रतिशत क्या है?' },
      { en: 'Is the high-voltage battery thermal management cooling circuit operating at correct pressures?', hi: 'क्या बैटरी कूलिंग सर्किट सही दबाव पर काम कर रहा है?' }
    ],
    sources: ['Geotab Real-World EV Battery Degradation Telemetry', 'NREL Lithium-ion Battery Lifetime Modeling'],
    reviewedOn: '2026-08-15'
  },
  {
    slug: 'used-car-pre-purchase-checklist',
    tags: ['Safety', 'Costs', 'Maintenance'],
    title: {
      en: 'Used Car Pre-Purchase Inspection: What to Look For',
      hi: 'पुरानी कार खरीदने से पहले जांच: 10 जरूरी बातें'
    },
    layers: {
      s30: {
        en: 'An independent pre-purchase inspection uncovers concealed accident chassis damage, flood corrosion, odometer tampering, impending gearbox failure, and worn suspension before you hand over cash.',
        hi: 'खरीद से पहले स्वतंत्र जांच छिपी हुई दुर्घटना क्षति, पानी में डूबने की जंग, मीटर में हेरफेर और गियरबॉक्स या सस्पेंशन की खराबी को सामने लाती है।'
      },
      m3: {
        en: 'Key checkpoints during a vehicle inspection:\n1. **Body & Paint**: Use a digital paint thickness gauge to spot resprayed panels and heavy body filler over accident repairs.\n2. **Underbody Inspection**: Lift the car to check for chassis rust, oil and coolant leaks, split rubber CV boot gaiters, and frame rail warping.\n3. **Diagnostic Scan**: Plug in an OBD-II scanner to read historical and pending fault codes, mileage stored in multiple ECUs (ABS/Transmission vs Instrument Cluster), and readiness monitors.\n4. **Road Test**: Check for straight tracking, gearbox shift smoothness, clutch bite point, and lack of vibration under hard braking.',
        hi: 'मुख्य जांच: 1. डिजिटल पेंट गेज से एक्सीडेंट और रीस्प्रे की जांच, 2. लिफ्ट पर चेसिस और तेल रिसाव की जांच, 3. OBD-II स्कैनर से सभी कंप्यूटरों में माइलेज और फॉल्ट कोड की पुष्टि, 4. रोड टेस्ट।'
      },
      deep: {
        en: 'A comprehensive inspection assesses structural unibody integrity across A, B, and C-pillars using magnetic and ultrasound eddy-current thickness testers. Paint depth exceeding 250 microns indicates polyester body filler.\n\nECU interrogation checks OBD-II readiness monitors to ensure fault codes were not erased 10 minutes before the test drive, and compares wheel speed pulse odometry across ABS and TCM modules to detect odometer clocking.',
        hi: 'पेंट की मोटाई 250 माइक्रोन से अधिक होने पर बॉडी फिलर का पता चलता है। OBD-II स्कैनर यह भी जांचता है कि फॉल्ट कोड छुपाने के लिए हाल ही में रीसेट तो नहीं किए गए।'
      }
    },
    diagram: 'inspection-checkpoints',
    glossary: [
      'Paint Depth Gauge: Magnetic/eddy device measuring coating thickness in microns.',
      'CV Boot: Flexible rubber bellow sealing constant velocity joint grease.',
      'Readiness Monitors: Internal ECU self-tests verifying emission components.'
    ],
    askMechanic: [
      { en: 'Are all OBD-II emission readiness monitors in a completed "Ready" status?', hi: 'क्या सभी OBD-II मॉनिटर "Ready" स्थिति में हैं?' },
      { en: 'Did you find evidence of overspray, filler, or non-factory spot welds on inner structural pillars?', hi: 'क्या भीतरी पिलर पर बॉडी फिलर या गैर-फैक्ट्री वेल्डिंग के निशान हैं?' },
      { en: 'What is the estimated cost of repairs for items that will need attention within the next 6 months?', hi: 'अगले 6 महीनों में आवश्यक मरम्मत का अनुमानित खर्च क्या होगा?' }
    ],
    sources: ['Trading Standards Used Vehicle Inspection Standards', 'DEKRA Used Car Quality Report'],
    reviewedOn: '2026-06-10'
  },
  {
    slug: 'how-garage-pricing-works',
    tags: ['Costs', 'Safety'],
    title: {
      en: 'How Pricing Works at a Quality Garage: Labour & Parts',
      hi: 'वर्कशॉप बिलिंग और कीमतें कैसे तय होती हैं: लेबर और पार्ट्स'
    },
    layers: {
      s30: {
        en: 'A fair garage quote is composed of four clear pillars: standard book labour hours multiplied by the hourly rate, parts cost by selected tier, consumable supplies, and mandatory VAT. You should always receive a written quote before work begins.',
        hi: 'ईमानदार वर्कशॉप कोटेशन 4 भागों से बनता है: मानक लेबर घंटे × प्रति घंटा दर, चुने गए पार्ट्स की कीमत, कंज्यूमेबल्स, और वैट (VAT)। काम शुरू होने से पहले लिखित कोटेशन अवश्य लें।'
      },
      m3: {
        en: 'Understanding the line items on your automotive repair bill:\n- **Labour Hours**: Quality garages use industry-standard flat-rate time guides (e.g. Autodata/ICME) allocating fixed time per job (e.g. front brake pads = 0.8 hours). You pay the agreed hours regardless of whether the technician finishes slightly faster or hits a stubborn bolt.\n- **Parts**: High-integrity workshops offer clear tiers (OE Original, OE-Equivalent, Quality Aftermarket) with explicit warranty durations.\n- **Consumables & Environmental**: Covers brake cleaner, penetrating fluid, shop rags, and certified hazardous waste disposal (waste oil, filters, coolant).\n- **Written Approval**: No extra spanner should turn without prior phone or digital written consent.',
        hi: 'लेबर घंटे मानक ऑटोमेटा गाइड पर आधारित होते हैं। पार्ट्स में तीन विकल्प (OE, OE-समतुल्य, आफ्टरमार्केट) वारंटी के साथ मिलने चाहिए। अतिरिक्त काम बिना लिखित अनुमति के कभी नहीं किया जाना चाहिए।'
      },
      deep: {
        en: 'Workshop hourly rates cover overheads: technician ongoing training certifications, high-voltage tooling depreciation, annual torque wrench calibration (ISO 6789), diagnostic scan tool software subscriptions, and commercial public liability insurance.\n\nTorquewell’s Fair-Price architecture breaks down line-item labour, exact parts margins, disposal fees, and 20% VAT transparently, backed by our Click Guarantee: zero unauthorised upsells and written evidence with every recommendation.',
        hi: 'प्रति घंटा दर में टूल्स का कैलिब्रेशन, सॉफ्टवेयर सब्सक्रिप्शन, बीमा और तकनीशियन प्रशिक्षण शामिल होता है। टॉर्कवेल बिना पूर्व अनुमति के कोई काम नहीं करता।'
      }
    },
    diagram: 'pricing-breakdown',
    glossary: [
      'Flat-Rate Hours: Industry-standard published repair time allocations per vehicle model.',
      'OE (Original Equipment): Parts produced by the exact manufacturer supplying the factory.',
      'Click Guarantee: Written estimate and photographic evidence warranty promise.'
    ],
    askMechanic: [
      { en: 'Does this quote reflect standard flat-rate guide hours or actual clock time?', hi: 'क्या यह कोटेशन मानक फ्लैट-रेट गाइड घंटों पर आधारित है?' },
      { en: 'What parts warranty duration is attached to each component line item?', hi: 'प्रत्येक पार्ट्स लाइन आइटम से कितनी वारंटी जुड़ी है?' },
      { en: 'Will you guarantee that no additional work will be undertaken without my prior written authorization?', hi: 'क्या आप गारंटी देंगे कि मेरी पूर्व लिखित अनुमति के बिना कोई अतिरिक्त काम नहीं होगा?' }
    ],
    sources: ['Competition & Markets Authority (CMA) Motor Vehicle Block Exemption Regulations', 'Consumer Rights Act Standards'],
    reviewedOn: '2026-07-30'
  },
  {
    slug: 'parts-tiers-oe-aftermarket',
    tags: ['Costs', 'Maintenance'],
    title: {
      en: 'Parts Tiers Explained: OE vs OE-Equivalent vs Aftermarket',
      hi: 'पार्ट्स के प्रकार: ओरिजिनल (OE), समतुल्य और आफ्टरमार्केट'
    },
    layers: {
      s30: {
        en: 'Original Equipment (OE) parts are identical to factory assembly with carmaker branding. OE-Equivalent parts are made by the same tier-1 suppliers (e.g. Bosch, Brembo, Valeo) without vehicle logo markup. Quality Aftermarket offers proven durability at lower cost.',
        hi: 'OE पार्ट्स कार निर्माता ब्रांडिंग के साथ आते हैं। OE-समतुल्य पार्ट्स वही टियर-1 कंपनियां (जैसे Bosch, Brembo) बनाती हैं बिना कार लोगो की अतिरिक्त लागत के। आफ्टरमार्केट कम बजट में अच्छा विकल्प है।'
      },
      m3: {
        en: 'When approving repairs, choosing the right parts tier matches your budget and vehicle age:\n1. **TorqueSpec OE (Original Equipment)**: Exact factory components with carmaker stamp and full 24-month manufacturer warranty. Ideal for newer cars and factory warranty protection.\n2. **OE-Equivalent (Tier-1 Suppliers)**: Manufactured by companies like Mann, Ferodo, NGK, or Bilstein who supply car factories. Same metallurgy, friction compound, and 24-month warranty at 20–30% lower price.\n3. **Quality Aftermarket**: Built by certified replacement manufacturers compliant with safety regulations (e.g. ECE R90 for brakes). Backed by 12-month warranty, perfect for older vehicles.\n4. **Remanufactured**: Factory rebuilt components (alternators, steering racks, gearboxes) with worn internals replaced, providing eco-friendly savings.',
        hi: 'पार्ट्स विकल्प:\n1. OE: 24 महीने वारंटी, ओरिजिनल स्पेयर।\n2. OE-समतुल्य: बॉश, ब्रेम्बो जैसी टियर-1 कंपनियों द्वारा निर्मित, समान गुणवत्ता लेकिन 20-30% कम कीमत।\n3. आफ्टरमार्केट: 12 महीने वारंटी, बजट अनुकूल।\n4. रीमैन्युफैक्चर्ड: फैक्ट्री रीबिल्ट।'
      },
      deep: {
        en: 'Under European and UK Motor Vehicle Block Exemption Regulations (MVBER), consumers possess the statutory right to have vehicles serviced with OE-matching quality parts without invalidating manufacturer new-vehicle warranties, provided the garage follows OEM service schedules.\n\nBrake friction linings must satisfy ECE R90 type approval, certifying that friction coefficient variation across temperature and speed remains within +/- 15% of original homologated specifications.',
        hi: 'मोटर वाहन ब्लॉक छूट नियमों के तहत OE-समतुल्य पार्ट्स का उपयोग करने से कार की नई वारंटी रद्द नहीं होती। सभी ब्रेक पैड्स ECE R90 सुरक्षा मानकों का पालन करते हैं।'
      }
    },
    diagram: 'parts-tiers',
    glossary: [
      'MVBER: Motor Vehicle Block Exemption Regulation safeguarding consumer repair choice.',
      'ECE R90: International regulation mandating replacement brake performance parity.',
      'Tier-1 Supplier: Companies manufacturing primary assemblies directly for automakers.'
    ],
    askMechanic: [
      { en: 'Which Tier-1 brand manufactured this OE-equivalent component (e.g., Brembo, Bosch, Mann)?', hi: 'किस टियर-1 ब्रांड ने यह OE-समतुल्य घटक बनाया (जैसे ब्रेम्बो, बॉश)?' },
      { en: 'Do replacement brake pads carry the official ECE R90 homologation stamp?', hi: 'क्या ब्रेक पैड पर आधिकारिक ECE R90 सुरक्षा मुहर है?' },
      { en: 'Can I inspect the old worn parts in a sealed bag upon collecting my vehicle?', hi: 'क्या मैं गाड़ी लेते समय बदले गए पुराने पार्ट्स देख सकता हूँ?' }
    ],
    sources: ['European Commission Regulation (EU) No 461/2010 (MVBER)', 'ECE Regulation 90 Replacement Brake Linings'],
    reviewedOn: '2026-08-08'
  },
  {
    slug: 'questions-to-ask-any-mechanic',
    tags: ['Safety', 'Costs', 'Maintenance'],
    title: {
      en: 'Top 5 Questions to Ask Any Mechanic Before Authorising Work',
      hi: 'काम कराने से पहले किसी भी मैकेनिक से पूछने वाले 5 जरूरी सवाल'
    },
    layers: {
      s30: {
        en: 'Protect your wallet and safety by asking for written estimates, photographic evidence of worn parts, micrometer measurements, warranty terms, and a firm promise of no unauthorised work.',
        hi: 'अपने पैसे और सुरक्षा के लिए लिखित कोटेशन, घिसे हुए पार्ट्स की फोटो, माइक्रोमीटर माप, वारंटी अवधि और बिना अनुमति अतिरिक्त काम न करने की गारंटी मांगें।'
      },
      m3: {
        en: 'Before signing or approving any automotive repair, ask these 5 essential questions:\n1. **"Can you show me the photographic or video evidence and exact measurement?"** A good garage will show you the micrometer on the brake pad or tyre gauge on the tread.\n2. **"Is this repair an immediate safety issue (Now), advisory for the near future (Soon), or can it safely wait (Watch)?"** Don’t let non-urgent items be pushed as emergencies.\n3. **"Will you provide a binding written estimate before turning a spanner?"**\n4. **"What brand and warranty tier are you fitting to my car?"**\n5. **"Can you place the old replaced parts in my boot for handover inspection?"** Transparent garages welcome this.',
        hi: '5 मुख्य सवाल:\n1. क्या आप मुझे फोटो/वीडियो और सटीक माप दिखा सकते हैं?\n2. क्या यह तुरंत जरूरी है (Now) या बाद में कराया जा सकता है (Watch)?\n3. क्या आप लिखित कोटेशन देंगे?\n4. पार्ट्स पर कितनी वारंटी है?\n5. क्या आप बदले गए पुराने पार्ट्स मुझे दिखा सकते हैं?'
      },
      deep: {
        en: 'Under Consumer Rights protection legislation, services must be performed with reasonable care and skill, and pricing must adhere to agreed estimates unless a variation is explicitly authorised in advance.\n\nDemanding verifiable evidence tokens (calibrated gauge measurements, OBD-II freeze-frame logs, and returned worn components) eliminates asymmetric information, holding workshops to strict technical accountability.',
        hi: 'उपभोक्ता संरक्षण कानूनों के तहत, मरम्मत लिखित सहमति के अनुसार होनी चाहिए। डिजिटल साक्ष्य और पुराने पार्ट्स की जांच वर्कशॉप को जिम्मेदार बनाए रखती है।'
      }
    },
    diagram: '5-questions-checklist',
    glossary: [
      'Asymmetric Information: When one party in a transaction holds more technical data than the customer.',
      'Evidence Token: Calibrated digital photo or scan reading documenting wear before repair.',
      'Binding Estimate: Written contract capping maximum cost for specified scope of work.'
    ],
    askMechanic: [
      { en: 'Will you document my approval digitally with a timestamped breakdown?', hi: 'क्या आप टाइमस्टैम्प के साथ मेरी मंजूरी को डिजिटल रूप से दर्ज करेंगे?' },
      { en: 'If an unexpected seized bolt occurs during strip-down, will you call me immediately before proceeding?', hi: 'यदि काम के दौरान कोई अतिरिक्त समस्या आती है, तो क्या आप आगे बढ़ने से पहले तुरंत फोन करेंगे?' },
      { en: 'Does my final invoice clearly separate labour hours, parts costs, consumables, and VAT?', hi: 'क्या अंतिम बिल में लेबर, पार्ट्स, कंज्यूमेबल्स और वैट स्पष्ट रूप से अलग-अलग दिखाए गए हैं?' }
    ],
    sources: ['UK Motor Ombudsman Code of Practice for Service and Repair', 'Consumer Rights Act 2015 Guidelines'],
    reviewedOn: '2026-08-18'
  }
];
