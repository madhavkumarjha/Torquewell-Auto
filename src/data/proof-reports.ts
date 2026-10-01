import { I18n, Urgency } from '@/types';

export interface InspectionFinding {
  id: string;
  system: 'brakes' | 'tyres' | 'suspension' | 'fluids' | 'electrical' | 'powertrain' | 'chassis' | 'safety';
  title: I18n;
  urgency: Urgency;
  measured?: {
    value: number;
    min: number;
    nominal?: number;
    unit: 'mm' | 'bar' | 'V' | '%' | '°C';
    label: I18n;
  };
  photos: string[];
  comparison?: {
    yourPartPhoto: string;
    newPartPhoto: string;
    yourLabel: I18n;
    newLabel: I18n;
  };
  why: I18n;
  simpleWhy: I18n;
  ifWait: I18n;
  options: I18n[];
  linkedJobId?: string;
}

export interface VehicleReport {
  id: string;
  regPlate: string;
  vehicleModel: string;
  year: number;
  odometerKm: number;
  customerName: string;
  inspectionDate: string;
  technicianName: string;
  technicianTorqueId: string;
  branchName: string;
  summaryNote: I18n;
  findings: InspectionFinding[];
}

export const SAMPLE_REPORTS: VehicleReport[] = [
  {
    id: 'report-tw68akz',
    regPlate: 'TW68 AKZ',
    vehicleModel: 'TorqueSpec Urban 1.4 Hatchback',
    year: 2018,
    odometerKm: 96420,
    customerName: 'Sam Carter',
    inspectionDate: '2026-09-28',
    technicianName: 'Tomas Hale (Master Tech #01)',
    technicianTorqueId: 'TQ-CAL-8842',
    branchName: 'Torquewell Central (Bay 04)',
    summaryNote: {
      en: 'Routine 96,000 km digital inspection completed. Critical friction loss on front brake pads requires replacement before road use. Front tyres and brake fluid require attention within 30 days.',
      hi: '96,000 किमी डिजिटल निरीक्षण पूरा हुआ। फ्रंट ब्रेक पैड में अत्यधिक घिसाव के कारण सड़क पर उपयोग से पहले बदलना आवश्यक है। फ्रंट टायर और ब्रेक फ्लुइड पर 30 दिनों में ध्यान दें।'
    },
    findings: [
      {
        id: 'f-bp-01',
        system: 'brakes',
        title: {
          en: 'Front brake friction pads worn past limit',
          hi: 'फ्रंट ब्रेक पैड सीमा से अधिक घिस चुके हैं'
        },
        urgency: 'now',
        measured: {
          value: 2.5,
          min: 3.0,
          nominal: 12.0,
          unit: 'mm',
          label: { en: 'Friction Material Remaining', hi: 'शेष घर्षण सामग्री' }
        },
        photos: ['/img/proof/brake-pad-worn.svg'],
        comparison: {
          yourPartPhoto: '/img/proof/brake-pad-worn.svg',
          newPartPhoto: '/img/proof/brake-pad-new.svg',
          yourLabel: { en: 'Your Pad (2.5 mm remaining)', hi: 'आपका पैड (2.5 मिमी शेष)' },
          newLabel: { en: 'New Pad (12.0 mm factory spec)', hi: 'नया पैड (12.0 मिमी फैक्ट्री स्पेक)' }
        },
        why: {
          en: 'Hydraulic caliper micrometer reading indicates 2.5 mm of compound remaining. Below the 3.0 mm structural wear safety line, the steel backing plate risks metal-on-metal contact with the rotor disc, which causes severe heat glazing and extended stopping distance.',
          hi: 'कैलिपर माइक्रोमीटर रीडिंग में 2.5 मिमी सामग्री बची है। 3.0 मिमी की न्यूनतम सुरक्षा सीमा से नीचे आने पर स्टील प्लेट सीधे डिस्क से टकराने का खतरा रहता है, जिससे ब्रेक फेल होने का जोखिम बढ़ता है।'
        },
        simpleWhy: {
          en: 'The brake pad friction layer is nearly completely gone. If not replaced now, bare metal will grind into the brake disc, reducing braking power and doubling repair costs.',
          hi: 'ब्रेक पैड लगभग पूरी तरह घिस चुका है। यदि इसे अभी नहीं बदला गया तो धातु डिस्क को खुरच देगी और लागत दोगुनी हो जाएगी।'
        },
        ifWait: {
          en: 'The steel backing plate will score and ruin the brake rotors within 500–1,000 km, leading to brake fade, vibration through the pedal, and increased emergency stopping distance.',
          hi: '500-1000 किमी में स्टील प्लेट ब्रेक डिस्क को स्थायी नुकसान पहुंचाएगी, जिससे पेडल कांपेगा और रुकने की दूरी बढ़ेगी।'
        },
        options: [
          {
            en: 'Replace front brake pads with TorqueSpec OE or OE-equivalent compound (Recommended immediately)',
            hi: 'टॉर्कस्पेक ओई या समकक्ष फ्रंट ब्रेक पैड अभी बदलें (तत्काल अनुशंसित)'
          },
          {
            en: 'Combined front brake pad and rotor replacement package for optimal bedding and 24-month warranty',
            hi: 'बेहतर प्रदर्शन और 24 महीने की वारंटी के लिए पैड और डिस्क दोनों एक साथ बदलें'
          }
        ],
        linkedJobId: 'job-front-pads'
      },
      {
        id: 'f-bd-02',
        system: 'brakes',
        title: {
          en: 'Front brake rotor disc thickness near discard threshold',
          hi: 'फ्रंट ब्रेक रोटर डिस्क की मोटाई न्यूनतम सीमा के करीब'
        },
        urgency: 'soon',
        measured: {
          value: 20.4,
          min: 20.0,
          nominal: 24.0,
          unit: 'mm',
          label: { en: 'Rotor Plate Thickness', hi: 'रोटर डिस्क मोटाई' }
        },
        photos: ['/img/proof/brake-disc-worn.svg'],
        comparison: {
          yourPartPhoto: '/img/proof/brake-disc-worn.svg',
          newPartPhoto: '/img/proof/brake-disc-new.svg',
          yourLabel: { en: 'Your Rotor (20.4 mm with 0.9 mm lip)', hi: 'आपकी डिस्क (20.4 मिमी और किनारा)' },
          newLabel: { en: 'New Precision Rotor (24.0 mm nominal)', hi: 'नई प्रिसिजन डिस्क (24.0 मिमी)' }
        },
        why: {
          en: 'Vernier micrometer reading shows 20.4 mm disc thickness with an outer rim lip of 0.9 mm. Manufacturer discard minimum is 20.0 mm. Thin rotors dissipate kinetic heat poorly, risking thermal warp under sustained downhill braking.',
          hi: 'वर्नियर माइक्रोमीटर रीडिंग 20.4 मिमी दर्शाती है जबकि न्यूनतम सीमा 20.0 मिमी है। पतली डिस्क गर्मी को तेजी से नहीं निकाल पाती जिससे ढलान पर मुड़ने का खतरा रहता है।'
        },
        simpleWhy: {
          en: 'The metal disc is getting thin from friction wear. While still legal today, it will drop below the safe minimum during the lifespan of your next pads.',
          hi: 'धातु की डिस्क घिसकर पतली हो रही है। आज कानूनी सीमा में है, लेकिन नए पैड के साथ यह जल्द ही सीमा पार कर जाएगी।'
        },
        ifWait: {
          en: 'Can safely complete another 2,000–3,000 km, but fitting new pads onto an old lipped rotor can cause early squealing and uneven pad wear.',
          hi: 'अगले 2,000-3,000 किमी सुरक्षित रूप से चल सकती है, लेकिन नई पैड के साथ घिसी डिस्क लगाने से आवाज आ सकती है।'
        },
        options: [
          {
            en: 'Replace together with front pads for unified labour rate and optimal bed-in',
            hi: 'कम लेबर चार्ज और सर्वोत्तम प्रदर्शन के लिए पैड के साथ ही बदलें'
          },
          {
            en: 'Defer to next scheduled inspection in 3,000 km (monitor lip closely)',
            hi: 'अगले 3,000 किमी के निरीक्षण तक टालें'
          }
        ],
        linkedJobId: 'job-front-pads-discs'
      },
      {
        id: 'f-ty-03',
        system: 'tyres',
        title: {
          en: 'Front tyre tread depth approaching wet grip threshold',
          hi: 'फ्रंट टायर ट्रेड की गहराई बारिश की पकड़ सीमा के करीब'
        },
        urgency: 'soon',
        measured: {
          value: 3.1,
          min: 1.6,
          nominal: 8.0,
          unit: 'mm',
          label: { en: 'Centre Groove Tread Depth', hi: 'मुख्य खांचे की ट्रेड गहराई' }
        },
        photos: ['/img/proof/tyre-tread-worn.svg'],
        comparison: {
          yourPartPhoto: '/img/proof/tyre-tread-worn.svg',
          newPartPhoto: '/img/proof/tyre-tread-new.svg',
          yourLabel: { en: 'Your Tread (3.1 mm depth)', hi: 'आपका ट्रेड (3.1 मिमी गहराई)' },
          newLabel: { en: 'New Tread (8.0 mm deep grooves)', hi: 'नया ट्रेड (8.0 मिमी गहरे खांचे)' }
        },
        why: {
          en: 'Depth gauge records 3.1 mm in primary circumferential water evacuation channels. While above the 1.6 mm legal minimum, braking distance on wet bitumen at 80 km/h increases by approximately 40% compared to new tyres.',
          hi: 'गहराई गेज 3.1 मिमी दर्शाता है। यद्यपि यह 1.6 मिमी की कानूनी सीमा से ऊपर है, लेकिन गीली सड़क पर 80 किमी/घंटा की गति पर रुकने की दूरी 40% तक बढ़ जाती है।'
        },
        simpleWhy: {
          en: 'Your front tyres are getting smooth. They pass legal tests today, but grip in heavy rain is noticeably reduced.',
          hi: 'आपके आगे के टायर घिस रहे हैं। आज वे कानूनी रूप से पास हैं, लेकिन भारी बारिश में पानी हटाने की क्षमता कम हो गई है।'
        },
        ifWait: {
          en: 'Risk of hydroplaning increases during heavy rainfall. Wear will cross the 1.6 mm legal minimum within 4,000–6,000 km.',
          hi: 'बारिश में गाड़ी फिसलने का खतरा रहता है। 4,000-6,000 किमी में यह कानूनी सीमा 1.6 मिमी से नीचे चला जाएगा।'
        },
        options: [
          {
            en: 'Replace front tyre pair and perform calibrated 4-wheel laser alignment',
            hi: 'आगे के दोनों टायर बदलें और 4-व्हील लेजर अलाइनमेंट कराएं'
          },
          {
            en: 'Rotate front tyres to rear axle to balance tyre wear across all 4 corners',
            hi: 'समान घिसाव के लिए आगे के टायरों को पीछे बदलें'
          }
        ],
        linkedJobId: 'job-tyres-front'
      },
      {
        id: 'f-fl-04',
        system: 'fluids',
        title: {
          en: 'Brake fluid hygroscopic moisture content elevated',
          hi: 'ब्रेक फ्लुइड में नमी की मात्रा सुरक्षित सीमा से अधिक'
        },
        urgency: 'soon',
        measured: {
          value: 158,
          min: 180,
          nominal: 260,
          unit: '°C',
          label: { en: 'Vapour Boiling Point', hi: 'द्रव वाष्प क्वथनांक' }
        },
        photos: ['/img/proof/fluid-test.svg'],
        why: {
          en: 'Digital boiling point tester measures 158°C boiling point with 3.2% moisture absorption (DOT 4 specification requires minimum 180°C wet boiling point). Moisture lowers the fluid vapour barrier, leading to vapor lock pedal sponge under hard braking.',
          hi: 'डिजिटल टेस्टर 158°C क्वथनांक और 3.2% नमी मापता है (न्यूनतम 180°C आवश्यक है)। नमी से भारी ब्रेक लगाने पर पेडल स्पंजी हो सकता है।'
        },
        simpleWhy: {
          en: 'Brake fluid naturally absorbs water from the air over time. Too much water means the fluid can boil during emergency stops, making the pedal feel soft.',
          hi: 'ब्रेक का तेल हवा से नमी सोख लेता है। ज्यादा पानी होने से आपातकालीन ब्रेक लगाने पर तेल उबल सकता है और पेडल ढीला महसूस होगा।'
        },
        ifWait: {
          en: 'Internal corrosion of brake master cylinder and ABS hydraulic modulator valves accelerates over 6–12 months.',
          hi: '6-12 महीनों में एबीएस वाल्व और मास्टर सिलेंडर के अंदर जंग लगने का खतरा बढ़ जाता है।'
        },
        options: [
          {
            en: 'Complete hydraulic system pressure flush with fresh low-viscosity DOT 4 fluid',
            hi: 'ताजे लो-विस्कोसिटी DOT 4 फ्लुइड के साथ पूरे सिस्टम को फ्लश और ब्लीड करें'
          },
          {
            en: 'Re-test in 60 days before seasonal temperature drops',
            hi: '60 दिनों में दोबारा परीक्षण करें'
          }
        ],
        linkedJobId: 'job-brake-fluid'
      },
      {
        id: 'f-su-05',
        system: 'suspension',
        title: {
          en: 'Front lower control arm rubber bushes superficial perishing',
          hi: 'फ्रंट लोअर कंट्रोल आर्म रबर बुश में हल्की दरारें'
        },
        urgency: 'watch',
        measured: {
          value: 0.8,
          min: 2.5,
          unit: 'mm',
          label: { en: 'Joint Free-play Deflection', hi: 'जोड़ का लचीलापन' }
        },
        photos: ['/img/proof/battery-test.svg'],
        why: {
          en: 'Visual inspection reveals micro-crazing on outer rubber bonding surfaces. Radial pry deflection test shows 0.8 mm movement, well within the 2.5 mm MOT/RWC service rejection threshold.',
          hi: 'रबर पर बाहरी सूक्ष्म दरारें दिख रही हैं। लचीलापन 0.8 मिमी मापा गया जो 2.5 मिमी की अधिकतम सीमा से काफी कम है।'
        },
        simpleWhy: {
          en: 'The rubber cushions connecting the front wheels to the chassis are beginning to show age cracks, but are still firm and safe today.',
          hi: 'पहियों को जोड़ने वाले रबर बुश पर उम्र के कारण दरारें दिख रही हैं, लेकिन अभी वे पूरी तरह सुरक्षित हैं।'
        },
        ifWait: {
          en: 'Safe to monitor over the next 10,000–15,000 km. Replace only when excessive movement or knocking over bumps develops.',
          hi: 'अगले 10,000-15,000 किमी तक सुरक्षित है। खट-खट की आवाज आने पर ही बदलें।'
        },
        options: [
          {
            en: 'Record photographic baseline and re-inspect at next scheduled service (Recommended)',
            hi: 'तस्वीर रिकॉर्ड में रखें और अगली सर्विस पर दोबारा जांचें (अनुशंसित)'
          },
          {
            en: 'Proactive replacement if planning long-distance heavy touring',
            hi: 'लंबी यात्रा की योजना होने पर ही पहले से बदलें'
          }
        ]
      },
      {
        id: 'f-el-06',
        system: 'electrical',
        title: {
          en: '12V lead-acid auxiliary battery cold cranking reserve low',
          hi: '12V बैटरी कोल्ड क्रैंकिंग क्षमता में कमी'
        },
        urgency: 'watch',
        measured: {
          value: 12.41,
          min: 12.0,
          nominal: 12.7,
          unit: 'V',
          label: { en: 'Resting Terminal Voltage', hi: 'रेस्टिंग टर्मिनल वोल्टेज' }
        },
        photos: ['/img/proof/battery-test.svg'],
        why: {
          en: 'Conductance analyzer records 470 A CCA available against 600 A factory EN rating (78% State of Health). Resting open-circuit voltage is 12.41 V. Battery retains charge but will exhibit sluggish starting during freezing winter mornings.',
          hi: 'कंडक्टेंस एनालाइजर 600A के मुकाबले 470A सीसीए मापता है (78% स्वास्थ्य)। सर्दियों की सुबह स्टार्ट होने में समय ले सकती है।'
        },
        simpleWhy: {
          en: 'Your 12-volt battery is 4 years old. It starts the engine fine in mild weather, but cold winter temperatures may drain its remaining capacity.',
          hi: 'आपकी बैटरी 4 साल पुरानी है। सामान्य मौसम में ठीक है, लेकिन कड़ाके की ठंड में धोखा दे सकती है।'
        },
        ifWait: {
          en: 'Will operate reliably through spring and summer; recommend battery condition test before winter season.',
          hi: 'गर्मियों में ठीक चलेगी; सर्दी शुरू होने से पहले दोबारा जांच कराएं।'
        },
        options: [
          {
            en: 'Full multi-stage workshop recharge and terminal anti-corrosion treatment',
            hi: 'बैटरी को वर्कशॉप चार्जर पर पूरा चार्ज करें और टर्मिनल साफ करें'
          },
          {
            en: 'Proactive replacement with 36-month warranty battery before winter',
            hi: 'सर्दियों से पहले 36 महीने वारंटी वाली नई बैटरी लगवाएं'
          }
        ],
        linkedJobId: 'job-battery-replace'
      },
      {
        id: 'f-bp-07',
        system: 'brakes',
        title: {
          en: 'Rear brake pads & discs wear condition',
          hi: 'रियर ब्रेक पैड और डिस्क की स्थिति'
        },
        urgency: 'ok',
        measured: {
          value: 5.0,
          min: 3.0,
          nominal: 10.0,
          unit: 'mm',
          label: { en: 'Rear Pad Thickness', hi: 'रियर पैड मोटाई' }
        },
        photos: ['/img/proof/brake-pad-new.svg'],
        why: {
          en: 'Rear pads measured at 5.0 mm remaining. Rear solid discs measured at 9.8 mm (minimum discard 8.4 mm). Caliper slider pins free of corrosion and boot seals fully intact.',
          hi: 'रियर पैड 5.0 मिमी और डिस्क 9.8 मिमी (न्यूनतम 8.4 मिमी) पाई गई। कैलिपर पिन और सील पूरी तरह सुरक्षित हैं।'
        },
        simpleWhy: {
          en: 'The rear brakes have over 50% life remaining and need no work.',
          hi: 'पीछे के ब्रेक में 50% से अधिक जीवन बचा है, किसी काम की आवश्यकता नहीं है।'
        },
        ifWait: {
          en: 'Next inspection recommended in 20,000 km.',
          hi: 'अगले 20,000 किमी बाद जांच की सलाह दी जाती है।'
        },
        options: [
          {
            en: 'No action required · Retain in vehicle digital record',
            hi: 'कोई कार्रवाई आवश्यक नहीं · डिजिटल रिकॉर्ड में रखें'
          }
        ]
      },
      {
        id: 'f-pw-08',
        system: 'powertrain',
        title: {
          en: 'Engine oil level, clarity & sump plug seal torque',
          hi: 'इंजन ऑयल का स्तर, स्पष्टता और नाप'
        },
        urgency: 'ok',
        measured: {
          value: 98,
          min: 80,
          nominal: 100,
          unit: '%',
          label: { en: 'Dipstick Capacity Fill', hi: 'डिपस्टिक क्षमता भराव' }
        },
        photos: ['/img/proof/fluid-test.svg'],
        why: {
          en: 'Oil dipstick level exactly at upper hatched mark. Refractometer test reveals clean synthetic detergent package without fuel dilution. Sump plug torqued to verified 28 N·m specification with fresh copper crush washer.',
          hi: 'तेल का स्तर ऊपरी निशान पर है। सिंथेटिक डिटर्जेंट साफ है और बिना किसी मिलावट के है। संप प्लग 28 N·m पर लॉक किया गया।'
        },
        simpleWhy: {
          en: 'Engine oil is at the proper level and clean.',
          hi: 'इंजन ऑयल का स्तर सही है और बिल्कुल साफ है।'
        },
        ifWait: {
          en: 'Scheduled for change at next 15,000 km interval.',
          hi: 'अगले 15,000 किमी के अंतराल पर बदलने के लिए निर्धारित।'
        },
        options: [
          {
            en: 'No action required',
            hi: 'कोई कार्रवाई आवश्यक नहीं'
          }
        ]
      },
      {
        id: 'f-cl-09',
        system: 'fluids',
        title: {
          en: 'Engine coolant freeze protection & reserve alkalinity',
          hi: 'इंजन कूलेंट ठंड से सुरक्षा और गुणवत्ता'
        },
        urgency: 'ok',
        measured: {
          value: -34,
          min: -25,
          unit: '°C',
          label: { en: 'Frost Protection Temperature', hi: 'शीत सुरक्षा तापमान' }
        },
        photos: ['/img/proof/fluid-test.svg'],
        why: {
          en: 'Optical refractometer shows 50/50 ethylene glycol concentration providing freeze protection down to -34°C. Litmus pH test indicates 8.2 (optimal corrosion protection for aluminium cylinder heads).',
          hi: 'रिफ्रैक्टोमीटर -34°C तक ठंड से सुरक्षा दर्शाता है। लिटमस pH 8.2 है, जो एल्यूमीनियम के लिए सर्वोत्तम है।'
        },
        simpleWhy: {
          en: 'Coolant protects against freezing and internal rust.',
          hi: 'कूलेंट जमने और अंदरूनी जंग से सुरक्षित रखता है।'
        },
        ifWait: {
          en: 'Valid for another 24 months.',
          hi: 'अगले 24 महीने तक सुरक्षित।'
        },
        options: [{ en: 'No action required', hi: 'कोई कार्रवाई आवश्यक नहीं' }]
      },
      {
        id: 'f-ex-10',
        system: 'chassis',
        title: {
          en: 'Exhaust line joints, hangers & catalytic heat shield',
          hi: 'एग्जॉस्ट लाइन जोड़, हैंगर और हीट शील्ड'
        },
        urgency: 'ok',
        measured: {
          value: 0,
          min: 0,
          unit: 'bar',
          label: { en: 'Exhaust Gas Leak Pressure', hi: 'निकास गैस रिसाव दबाव' }
        },
        photos: ['/img/proof/brake-disc-new.svg'],
        why: {
          en: 'Full underside visual inspection with smoke leak detector confirmed airtight joints from turbo downpipe to rear tailpipe. All 4 rubber isolation hangers pliable without dry-rot.',
          hi: 'स्मोक डिटेक्टर से जांच में निकास प्रणाली पूरी तरह वायुरोधी पाई गई। सभी 4 रबर हैंगर सुरक्षित हैं।'
        },
        simpleWhy: {
          en: 'The exhaust system is tight, quiet, and securely mounted.',
          hi: 'एग्जॉस्ट सिस्टम सुरक्षित, शांत और अच्छी स्थिति में है।'
        },
        ifWait: { en: 'Next visual check at annual inspection.', hi: 'वार्षिक निरीक्षण पर अगली जांच।' },
        options: [{ en: 'No action required', hi: 'कोई कार्रवाई आवश्यक नहीं' }]
      }
    ]
  },
  {
    id: 'report-tq21nxr',
    regPlate: 'TQ21 NXR',
    vehicleModel: 'TorqueSpec Tourer 2.0 Diesel Estate',
    year: 2021,
    odometerKm: 62150,
    customerName: 'Marcus Vance',
    inspectionDate: '2026-09-30',
    technicianName: 'Elena Rostova (Diagnostic Tech #04)',
    technicianTorqueId: 'TQ-CAL-9912',
    branchName: 'Torquewell North (Bay 02)',
    summaryNote: {
      en: 'Mid-term brake and driveline health check. Front disc runout exceeds lateral tolerance, explaining customer brake pedal pulsing at motorway speeds. Rear suspension and powertrain in excellent health.',
      hi: 'मध्यम अवधि ब्रेक और ड्राइवलाइन जांच। फ्रंट डिस्क का लैटरल रनआउट सीमा से बाहर है जिससे हाइवे पर ब्रेक पेडल कांपता है। रियर सस्पेंशन और इंजन बेहतरीन स्थिति में हैं।'
    },
    findings: [
      {
        id: 'f-disc-runout',
        system: 'brakes',
        title: {
          en: 'Front brake disc excessive lateral runout (brake judder)',
          hi: 'फ्रंट ब्रेक डिस्क में अत्यधिक लैटरल रनआउट (कंपन)'
        },
        urgency: 'now',
        measured: {
          value: 0.08,
          min: 0.03,
          nominal: 0.01,
          unit: 'mm',
          label: { en: 'Dial Indicator Runout', hi: 'डायल इंडिकेटर रनआउट' }
        },
        photos: ['/img/proof/brake-disc-worn.svg'],
        why: {
          en: 'Magnetic dial gauge measures 0.08 mm lateral deviation on front offside disc face (maximum allowable workshop tolerance 0.03 mm). This variation induces thickness variation (DTV) causing high-speed pedal pulsing.',
          hi: 'मैग्नेटिक डायल गेज 0.08 मिमी विचलन रिकॉर्ड करता है (अनुमेय सीमा 0.03 मिमी)। यह असंतुलन ब्रेक लगाने पर पेडल में झटका पैदा करता है।'
        },
        simpleWhy: {
          en: 'The front brake disc has warped slightly, which causes the steering wheel or pedal to shake when slowing down from speed.',
          hi: 'आगे की ब्रेक डिस्क हल्की मुड़ गई है, जिससे तेज गति से ब्रेक लगाने पर पेडल और स्टीयरिंग कांपते हैं।'
        },
        ifWait: {
          en: 'Vibration will prematurely wear wheel bearings, tie-rod ends, and steering rack seals.',
          hi: 'कंपन से पहिए के बेयरिंग और स्टीयरिंग रैक को जल्दी नुकसान पहुंचेगा।'
        },
        options: [
          {
            en: 'Replace front brake discs pair and fit matching TorqueSpec pads',
            hi: 'आगे की दोनों ब्रेक डिस्क और नई पैड बदलें'
          }
        ],
        linkedJobId: 'job-front-pads-discs'
      },
      {
        id: 'f-dpf-diff',
        system: 'powertrain',
        title: {
          en: 'Diesel particulate filter soot load and differential pressure',
          hi: 'डीजल पार्टिकुलेट फिल्टर दबाव और कालिख स्तर'
        },
        urgency: 'watch',
        measured: {
          value: 14,
          min: 35,
          unit: '%',
          label: { en: 'Soot Mass Saturation', hi: 'कालिख संतृप्ति स्तर' }
        },
        photos: ['/img/proof/fluid-test.svg'],
        why: {
          en: 'Scan-tool differential pressure sensor reads 8 mbar at idle. Soot accumulation calculated at 14 g (regeneration threshold 35 g). Active regeneration cycle initiated within past 220 km.',
          hi: 'स्कैन टूल सेंसर 8 mbar दबाव मापता है। कालिख 14 ग्राम है (पुनर्जनन सीमा 35 ग्राम)। हाल ही में स्वतः सफाई चक्र पूरा हुआ है।'
        },
        simpleWhy: {
          en: 'The exhaust soot filter is clean and regenerating properly.',
          hi: 'एग्जॉस्ट का पार्टिकुलेट फिल्टर साफ है और सही तरीके से काम कर रहा है।'
        },
        ifWait: {
          en: 'Continue periodic motorway runs above 60 km/h to maintain passive regeneration.',
          hi: 'सफाई बनाए रखने के लिए समय-समय पर खुली सड़क पर गाड़ी चलाएं।'
        },
        options: [{ en: 'No action required', hi: 'कोई कार्रवाई आवश्यक नहीं' }]
      }
    ]
  },
  {
    id: 'report-tw24hyb',
    regPlate: 'TW24 HYB',
    vehicleModel: 'TorqueSpec EcoPulse Hybrid 1.8',
    year: 2024,
    odometerKm: 34100,
    customerName: 'Aarav Patel',
    inspectionDate: '2026-10-01',
    technicianName: 'Rajesh Sharma (EV/Hybrid Specialist #03)',
    technicianTorqueId: 'TQ-EV-7721',
    branchName: 'Torquewell South (Bay 05 EV)',
    summaryNote: {
      en: 'High-voltage hybrid battery cell balance and inverter cooling loop verification. Traction battery cell delta is exceptionally low (0.012 V). Regenerative brake pads show minimal wear.',
      hi: 'हाई-वोल्टेज हाइब्रिड बैटरी सेल संतुलन और इन्वर्टर कूलिंग लूप जांच। ट्रैक्शन बैटरी सेल डेल्टा मात्र 0.012 V है जो उत्कृष्ट है। रीजेनरेटिव ब्रेक पैड में बहुत कम घिसाव है।'
    },
    findings: [
      {
        id: 'f-hv-cell-delta',
        system: 'electrical',
        title: {
          en: 'High-voltage traction battery cell voltage variance (cell balance)',
          hi: 'हाई-वोल्टेज बैटरी सेल वोल्टेज संतुलन (सेल डेल्टा)'
        },
        urgency: 'ok',
        measured: {
          value: 0.012,
          min: 0.05,
          nominal: 0.01,
          unit: 'V',
          label: { en: 'Max-to-Min Cell Deviation', hi: 'अधिकतम से न्यूनतम सेल विचलन' }
        },
        photos: ['/img/proof/battery-test.svg'],
        why: {
          en: 'Live telemetry scan across all 28 NiMH battery modules shows max 0.012 V delta between highest and lowest cell under 40 A discharge load. Internal resistance uniform across all blocks.',
          hi: 'सभी 28 बैटरी मॉड्यूल में अधिकतम 0.012 V का ही अंतर है। सभी ब्लॉकों में आंतरिक प्रतिरोध एक समान है।'
        },
        simpleWhy: {
          en: 'Your hybrid battery cells are working in near-perfect harmony, giving full electric efficiency.',
          hi: 'आपकी हाइब्रिड बैटरी के सभी सेल बेहतरीन संतुलन में काम कर रहे हैं।'
        },
        ifWait: { en: 'Re-test annually or every 20,000 km.', hi: 'वार्षिक या हर 20,000 किमी पर दोबारा जांचें।' },
        options: [{ en: 'No action required', hi: 'कोई कार्रवाई आवश्यक नहीं' }]
      },
      {
        id: 'f-inverter-coolant',
        system: 'fluids',
        title: {
          en: 'Hybrid inverter power electronics dedicated cooling loop',
          hi: 'हाइब्रिड इन्वर्टर इलेक्ट्रॉनिक्स कूलिंग लूप'
        },
        urgency: 'ok',
        measured: {
          value: 100,
          min: 90,
          unit: '%',
          label: { en: 'Independent Expansion Reservoir', hi: 'विस्तार जलाशय स्तर' }
        },
        photos: ['/img/proof/fluid-test.svg'],
        why: {
          en: 'Secondary electric water pump tested via bidirectional actuation. Reservoir level optimal and zero dielectric conductivity degradation.',
          hi: 'इलेक्ट्रिक वॉटर पंप का परीक्षण सफल रहा। जलाशय का स्तर सही है और कोई खराबी नहीं है।'
        },
        simpleWhy: {
          en: 'The cooling system keeping the hybrid computer cool is in perfect condition.',
          hi: 'हाइब्रिड कंप्यूटर को ठंडा रखने वाला कूलिंग सिस्टम पूरी तरह ठीक है।'
        },
        ifWait: { en: 'Service due at 80,000 km handbook interval.', hi: '80,000 किमी पर सर्विस निर्धारित।' },
        options: [{ en: 'No action required', hi: 'कोई कार्रवाई आवश्यक नहीं' }]
      }
    ]
  }
];

export function getReportUrgencyStats(findings: InspectionFinding[]) {
  const counts = { now: 0, soon: 0, watch: 0, ok: 0, total: 0 };
  findings.forEach((f) => {
    counts[f.urgency]++;
    counts.total++;
  });
  return counts;
}
