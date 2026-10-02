import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '@/store';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function EvHybrid() {
  const { language } = useStore();
  const [simulatedSOH, setSimulatedSOH] = useState<number>(88);
  const [selectedMyth, setSelectedMyth] = useState<number>(0);

  const toolingList = [
    {
      name: { en: '1,000V CAT III Insulated Tool Set', hi: '1,000V CAT III इंसुलेटेड टूल सेट' },
      spec: 'IEC 60900 / VDE Certified',
      description: {
        en: 'Individually tested spanners, socket sets, and screwdrivers insulated to 10,000V AC for safe high-voltage mechanical service.',
        hi: '10,000V एसी तक परीक्षित इंसुलेटेड स्पैनर और सॉकेट, जो हाई-वोल्टेज सर्विस में पूर्ण सुरक्षा देते हैं।'
      }
    },
    {
      name: { en: 'Digital Battery Conductance & SOH Tester', hi: 'डिजिटल बैटरी कंडक्टेंस व SOH टेस्टर' },
      spec: 'AC Milliohm Conductance Scan',
      description: {
        en: 'Measures battery pack health, individual cell millivolt delta imbalances, and internal ionic resistance without thermal stress.',
        hi: 'बैटरी पैक हेल्थ, सेल वोल्टेज में अंतर और आंतरिक प्रतिरोध को बिना थर्मल दबाव के मापता है।'
      }
    },
    {
      name: { en: 'Lockout / Tagout (LOTO) Isolation Bay', hi: 'लॉकआउट / टैगआउट (LOTO) आइसोलेशन बे' },
      spec: 'BS EN 50110 High-Voltage Protocol',
      description: {
        en: 'Physical perimeter barrier chains, calibrated voltage-absence proximity probes, and padlocked manual service disconnect boxes.',
        hi: 'शारीरिक बैरियर चेन, वोल्टेज-अनुपस्थिति जांच उपकरण और मैनुअल सर्विस डिस्कनेक्ट लॉक बॉक्स।'
      }
    },
    {
      name: { en: 'Fluke High-Voltage Insulation Multimeter', hi: 'हाई-वोल्टेज इंसुलेशन मल्टीमीटर' },
      spec: '500V / 1000V DC Mega-Ohm Range',
      description: {
        en: 'Verifies insulation resistance across orange cables and chassis ground datums exceeds 500 Megohms.',
        hi: 'ऑरेंज हाई-वोल्टेज केबल और चेसिस ग्राउंड के बीच 500 मेगा-ओम से अधिक इंसुलेशन की पुष्टि करता है।'
      }
    },
    {
      name: { en: 'High-Resolution Thermal Imaging Camera', hi: 'उच्च-रिजोल्यूशन थर्मल इमेजिंग कैमरा' },
      spec: '±1°C Thermal Sensitivity',
      description: {
        en: 'Identifies micro-resistance hotspots across battery busbars, contactor relays, and high-voltage charging ports.',
        hi: 'बैटरी बसबार, रिले और चार्जिंग पोर्ट में सूक्ष्म गर्मी के हॉटस्पॉट्स की तुरंत पहचान करता है।'
      }
    },
    {
      name: { en: 'Dielectric Rescue Hook & First-Aid Post', hi: 'डाइइलेक्ट्रिक रेस्क्यू हुक व सुरक्षा पोस्ट' },
      spec: '45kV Rated Non-Conductive Hook',
      description: {
        en: 'Permanent dedicated high-voltage safety rescue equipment stationed at every electrified service bay.',
        hi: 'प्रत्येक इलेक्ट्रिफाइड सर्विस बे पर तैनात 45kV सुरक्षा रेस्क्यू उपकरण और फर्स्ट-एड पोस्ट।'
      }
    }
  ];

  const mythsList = [
    {
      id: 1,
      myth: {
        en: '"EV battery packs degrade rapidly and must be replaced every 3–5 years."',
        hi: '"ईवी बैटरी जल्दी खराब हो जाती है और हर 3-5 साल में बदलनी पड़ती है।"'
      },
      fact: {
        en: 'Independent real-world telemetry across 15,000+ electrified vehicles demonstrates modern liquid-cooled lithium batteries retain over 85–90% capacity after 200,000+ kilometres of driving.',
        hi: '15,000+ वाहनों के वास्तविक आंकड़ों से साबित होता है कि लिक्विड-कूल्ड लिथियम बैटरी 200,000+ किमी के बाद भी 85-90% से अधिक क्षमता बनाए रखती हैं।'
      },
      source: 'Geotab Real-World EV Fleet Battery Health Analysis'
    },
    {
      id: 2,
      myth: {
        en: '"Electric vehicles catch fire more frequently than petrol or diesel cars."',
        hi: '"पेट्रोल या डीजल कारों की तुलना में इलेक्ट्रिक कारों में अधिक आग लगती है।"'
      },
      fact: {
        en: 'Official statistical data from the US National Transportation Safety Board (NTSB) and Swedish Civil Contingencies Agency (MSB) reveals ICE petrol cars experience approximately 1,530 fires per 100k vehicles, compared to only 25 fires per 100k for Battery Electric Vehicles.',
        hi: 'आधिकारिक परिवहन सुरक्षा आंकड़ों (NTSB / MSB) के अनुसार प्रति 100,000 वाहनों में पेट्रोल कारों में 1,530 आग की घटनाएं होती हैं, जबकि ईवी में केवल 25।'
      },
      source: 'NTSB & MSB National Vehicle Incident Data'
    },
    {
      id: 3,
      myth: {
        en: '"You cannot drive or charge an EV in heavy rain or drive through puddles."',
        hi: '"भारी बारिश में या पानी भरे रास्तों पर ईवी नहीं चलाई या चार्ज की जा सकती।"'
      },
      fact: {
        en: 'EV battery enclosures and charging sockets are hermetically sealed to IP67/IP6K9K standards. Sophisticated ground-fault interrupt (GFI) sensors automatically isolate high voltage within milliseconds if moisture breach is detected.',
        hi: 'ईवी बैटरी एनक्लोजर और चार्जिंग सॉकेट IP67 वाटरप्रूफ मानकों पर सील होते हैं। नमी का पता चलने पर सुरक्षा सेंसर मिलीसेकंड में बिजली बंद कर देते हैं।'
      },
      source: 'IEC 61851 Electric Vehicle Conductive Charging System'
    },
    {
      id: 4,
      myth: {
        en: '"Electric cars require zero maintenance because they have no engine oil."',
        hi: '"इलेक्ट्रिक कारों में इंजन ऑयल न होने के कारण किसी रखरखाव की आवश्यकता नहीं होती।"'
      },
      fact: {
        en: 'While oil changes are eliminated, EVs require specialised suspension care (carrying 300+ kg extra battery mass), annual brake caliper slide lubrication (preventing rust seizure from regen underuse), cabin air purification, and dielectric battery coolant flushes.',
        hi: 'तेल बदलने की जरूरत नहीं होती, लेकिन अतिरिक्त वजन के कारण सस्पेंशन, रीजेन ब्रेकिंग के कारण ब्रेक कैलीपर लुब्रिकेशन और बैटरी कूलेंट फ्लश बहुत जरूरी हैं।'
      },
      source: 'IMI Electric & Hybrid Vehicle Maintenance Guidelines'
    }
  ];

  return (
    <div className="space-y-12 py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Header */}
      <div className="bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-md space-y-6">
        <div className="flex items-center gap-3">
          <Badge variant="ok" className="text-xs font-mono uppercase tracking-wider py-1 px-3">
            ⚡ High-Voltage Bay Certified
          </Badge>
          <span className="text-xs font-mono text-[var(--accent)] font-semibold">
            {language === 'hi' ? 'ईवी व हाइब्रिड वर्कशॉप' : 'Electrified Powertrain Center'}
          </span>
        </div>

        <div className="max-w-3xl space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif tracking-tight text-[var(--text)]">
            {language === 'hi'
              ? 'इलेक्ट्रिक व हाइब्रिड वर्कशॉप क्षमताएं'
              : 'Electric & Hybrid Workshop Capabilities'}
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed">
            {language === 'hi'
              ? 'हाई-वोल्टेज सुरक्षा प्रोटोकॉल, बैटरी स्टेट-ऑफ-हेल्थ डायग्नोस्टिक्स, और भारी वजन वाले इलेक्ट्रिक वाहनों के लिए विशेष टॉर्क सस्पेंशन व ब्रेक सर्विस।'
              : 'Precision high-voltage isolation protocols, digital battery State-of-Health diagnostics, and calibrated torque maintenance tailored for high-voltage electrified vehicles.'}
          </p>
        </div>

        {/* Training Certification Disclosure Note */}
        <div className="p-4 bg-[var(--surface-sunken)] rounded-xl border border-amber-500/30 text-xs text-[var(--text-muted)] flex items-start gap-3">
          <span className="text-amber-500 text-base shrink-0">⚠️</span>
          <p>
            <strong className="text-[var(--text)]">
              {language === 'hi' ? 'प्रमाणन मानक सूचना:' : 'Accreditation Standard Notice:'}
            </strong>{' '}
            {language === 'hi'
              ? 'हाई-वोल्टेज प्रशिक्षण विनिर्देश: प्लेसहोल्डर — ग्राहक को वास्तविक राष्ट्रीय योग्यता (जैसे IMI Level 4 High-Voltage) दर्शानी है। सभी प्रक्रियाएं 1,000V इंसुलेशन मानकों का पालन करती हैं।'
              : 'High-voltage training specification: placeholder — client to state real qualification standards (e.g. IMI Level 4 High Voltage). All live vehicle procedures strictly adhere to 1,000V CAT III safety rules.'}
          </p>
        </div>

        <div className="pt-2 flex flex-wrap items-center gap-4">
          <Link to="/book">
            <Button variant="primary" className="text-sm font-semibold">
              ⚡ {language === 'hi' ? 'ईवी स्वास्थ्य जांच बुक करें' : 'Book EV & Hybrid Health Check'}
            </Button>
          </Link>
          <Link to="/know/ev-maintenance-basics">
            <Button variant="secondary" className="text-sm">
              {language === 'hi' ? 'ईवी रखरखाव गाइड पढ़ें →' : 'Read EV Maintenance Guide →'}
            </Button>
          </Link>
        </div>
      </div>

      {/* 1. High-Voltage Workshop Tooling Grid */}
      <section className="space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-semibold">
            {language === 'hi' ? 'सुरक्षा उपकरण' : 'Workshop Tooling Specs'}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold font-serif">
            {language === 'hi' ? 'समर्पित 1,000V हाई-वोल्टेज टूलिंग व बे सुरक्षा' : 'Dedicated High-Voltage Equipment & Bay Safety'}
          </h2>
          <p className="text-sm text-[var(--text-muted)] max-w-2xl">
            {language === 'hi'
              ? '400V से 800V ट्रैक्शन बैटरी सिस्टम पर काम करने के लिए विशेष गैर-प्रवाहकीय उपकरण और कड़े आइसोलेशन प्रोटोकॉल अनिवार्य हैं।'
              : 'Servicing 400V–800V traction systems mandates VDE-certified non-conductive tooling and lock-out isolation perimeters.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {toolingList.map((tool, idx) => (
            <div
              key={idx}
              className="bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded-2xl p-6 space-y-3 shadow-sm hover:border-[var(--accent)]/40 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-xl bg-[var(--surface-sunken)] border border-[var(--border-subtle)] text-xs font-mono font-bold flex items-center justify-center text-[var(--accent)]">
                  0{idx + 1}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--surface-sunken)] border border-[var(--border-subtle)] text-[var(--text-muted)]">
                  {tool.spec}
                </span>
              </div>
              <h3 className="font-serif font-bold text-base text-[var(--text)]">
                {language === 'hi' ? tool.name.hi : tool.name.en}
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                {language === 'hi' ? tool.description.hi : tool.description.en}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Interactive Battery State-of-Health (SOH) Simulator */}
      <section className="bg-[var(--surface-sunken)] border border-[var(--border-subtle)] rounded-3xl p-6 md:p-10 space-y-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[var(--border-subtle)]">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-semibold">
              {language === 'hi' ? 'लाइव डायग्नोस्टिक सिम्युलेटर' : 'Live Diagnostic Simulator'}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-serif mt-1">
              {language === 'hi' ? 'बैटरी स्टेट-ऑफ-हेल्थ (SOH) और सेल बैलेंसिंग' : 'Battery State-of-Health & Cell Imbalance Analysis'}
            </h2>
          </div>
          <Badge variant={simulatedSOH >= 80 ? 'ok' : simulatedSOH >= 70 ? 'watch' : 'now'} className="text-xs px-3 py-1.5 self-start md:self-auto">
            {simulatedSOH >= 80
              ? (language === 'hi' ? 'स्वस्थ बैटरी पैक (OK)' : 'Healthy Pack (SOH ≥ 80%)')
              : simulatedSOH >= 70
              ? (language === 'hi' ? 'मध्यम गिरावट (Watch)' : 'Moderate Degradation (Watch)')
              : (language === 'hi' ? 'वारंटी सीमा स्तर (Now)' : 'Capacity Floor (Now)')}
          </Badge>
        </div>

        {/* SOH Slider */}
        <div className="space-y-4 max-w-2xl">
          <div className="flex items-center justify-between">
            <label htmlFor="soh-slider" className="text-sm font-medium text-[var(--text)]">
              {language === 'hi' ? 'सिम्युलेटेड बैटरी स्वास्थ्य (SOH) बदलें:' : 'Adjust Simulated Battery State of Health:'}
            </label>
            <span className="text-3xl font-mono font-bold text-[var(--accent)]">
              {simulatedSOH}%
            </span>
          </div>

          <input
            id="soh-slider"
            type="range"
            min="65"
            max="100"
            step="1"
            value={simulatedSOH}
            onChange={(e) => setSimulatedSOH(parseInt(e.target.value, 10))}
            className="w-full h-3 bg-[var(--surface-elevated)] rounded-lg appearance-none cursor-pointer accent-[var(--accent)]"
          />

          <div className="flex justify-between text-xs font-mono text-[var(--text-muted)]">
            <span className="text-red-400">70% ({language === 'hi' ? 'वारंटी सीमा' : 'Warranty Threshold'})</span>
            <span>85% ({language === 'hi' ? '150k किमी औसत' : '150k km Typical'})</span>
            <span className="text-emerald-400">100% ({language === 'hi' ? 'फैक्ट्री नया' : 'Factory New'})</span>
          </div>
        </div>

        {/* Telemetry Readout Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-[var(--surface-elevated)] rounded-xl border border-[var(--border-subtle)] space-y-1">
            <span className="text-[11px] font-mono text-[var(--text-muted)]">
              {language === 'hi' ? 'सेल वोल्टेज डेल्टा (Imbalance)' : 'Cell Delta Voltage'}
            </span>
            <p className="text-xl font-mono font-bold text-[var(--text)]">
              {simulatedSOH >= 85 ? '8 mV' : simulatedSOH >= 75 ? '18 mV' : '34 mV'}
            </p>
            <span className={`text-[10px] font-mono ${simulatedSOH >= 85 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {simulatedSOH >= 85 ? '✓ Balanced (<15mV)' : '⚠️ Active cell balance due'}
            </span>
          </div>

          <div className="p-4 bg-[var(--surface-elevated)] rounded-xl border border-[var(--border-subtle)] space-y-1">
            <span className="text-[11px] font-mono text-[var(--text-muted)]">
              {language === 'hi' ? 'अनुमानित वास्तविक रेंज' : 'Estimated Real-World Range'}
            </span>
            <p className="text-xl font-mono font-bold text-[var(--text)]">
              {Math.round((simulatedSOH / 100) * 450)} km
            </p>
            <span className="text-[10px] font-mono text-[var(--text-muted)]">
              (from 450 km WLTP rating)
            </span>
          </div>

          <div className="p-4 bg-[var(--surface-elevated)] rounded-xl border border-[var(--border-subtle)] space-y-1">
            <span className="text-[11px] font-mono text-[var(--text-muted)]">
              {language === 'hi' ? 'आंतरिक प्रतिरोध' : 'Internal AC Resistance'}
            </span>
            <p className="text-xl font-mono font-bold text-[var(--text)]">
              {(0.22 + (100 - simulatedSOH) * 0.008).toFixed(2)} mΩ
            </p>
            <span className="text-[10px] font-mono text-[var(--text-muted)]">
              Low resistance = fast DC charging
            </span>
          </div>
        </div>
      </section>

      {/* 3. Engineering Focus: Tyres & Brakes on EVs */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded-2xl p-6 md:p-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent)] font-semibold uppercase">
            <span>⚙️</span>
            <span>{language === 'hi' ? 'उच्च टॉर्क व भारी वजन' : 'Instant Torque Dynamics'}</span>
          </div>
          <h3 className="text-xl font-bold font-serif">
            {language === 'hi' ? 'ईवी में टायर 20-30% तेजी से क्यों घिसते हैं?' : 'Why Tyres Wear 20–30% Faster on EVs'}
          </h3>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
            {language === 'hi'
              ? 'इलेक्ट्रिक मोटर्स 0 RPM से ही अधिकतम टॉर्क प्रदान करती हैं। 300-500 किग्रा भारी बैटरी वजन के साथ मिलकर, यह हर त्वरण पर टायर के संपर्क पैच पर भारी घर्षण डालता है। हम समर्पित HL (हाई लोड) और ईवी-विशिष्ट टायरों की फिटिंग करते हैं।'
              : 'Electric motors deliver 100% peak torque at 0 RPM. Combined with 300–500 kg of additional traction battery mass, every standing start subjects the rubber contact patch to intense shear forces. We fit certified HL (High Load) and EV-optimised low-noise compounds.'}
          </p>
        </div>

        <div className="bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded-2xl p-6 md:p-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent)] font-semibold uppercase">
            <span>🛑</span>
            <span>{language === 'hi' ? 'रीजेन ब्रेकिंग व जंग' : 'Regenerative Paradox'}</span>
          </div>
          <h3 className="text-xl font-bold font-serif">
            {language === 'hi' ? 'रीजेनेरेटिव ब्रेकिंग और डिस्क में जंग का खतरा' : 'Why EV Brakes Seize from Lack of Use'}
          </h3>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
            {language === 'hi'
              ? 'क्योंकि मोटर 80%+ ब्रेकिंग संभाल लेती है, पारंपरिक घर्षण ब्रेक पैड का उपयोग बहुत कम होता है। गर्मी न मिलने से डिस्क पर नमी और नमक से जंग लगने लगती है और कैलीपर पिन जाम हो जाते हैं। हमारी ईवी सर्विस में कैलीपर की पूरी सफाई और लुब्रिकेशन शामिल है।'
              : 'Because electric motors absorb over 80% of braking kinetic energy, mechanical friction pads are rarely used. Without frictional heat, moisture and road salt cause iron discs to corrode and caliper slide pins to seize. Our dedicated EV service strips, cleans, and lubricates all slider hardware.'}
          </p>
        </div>
      </section>

      {/* 4. Sourced EV Myths vs Verified Facts */}
      <section className="space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-semibold">
            {language === 'hi' ? 'तथ्य बनाम मिथक' : 'Evidence-Based Facts'}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold font-serif">
            {language === 'hi' ? 'ईवी मिथक और सत्यापित वैज्ञानिक सच' : 'Debunking Common EV & Battery Myths'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mythsList.map((m, idx) => (
            <div
              key={m.id}
              onClick={() => setSelectedMyth(idx)}
              className={`cursor-pointer p-6 rounded-2xl border transition-all space-y-3 ${
                selectedMyth === idx
                  ? 'bg-[var(--surface-elevated)] border-[var(--accent)] shadow-md'
                  : 'bg-[var(--surface-sunken)] border-[var(--border-subtle)] hover:border-[var(--border)]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase font-bold text-red-400">
                  ❌ Myth 0{idx + 1}
                </span>
                <span className="text-[11px] font-mono text-[var(--text-muted)]">
                  Verified Fact ✓
                </span>
              </div>
              <h3 className="text-sm font-bold text-[var(--text)] italic font-serif">
                {language === 'hi' ? m.myth.hi : m.myth.en}
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed pt-2 border-t border-[var(--border-subtle)]">
                <strong className="text-emerald-400 block mb-1">
                  {language === 'hi' ? 'सत्यापित तथ्य:' : 'Engineering Reality:'}
                </strong>
                {language === 'hi' ? m.fact.hi : m.fact.en}
              </p>
              <span className="text-[10px] font-mono text-[var(--accent)] block pt-1">
                Source: {m.source}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Service Scope Boundaries */}
      <section className="bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded-3xl p-6 md:p-8 space-y-6">
        <div>
          <h3 className="text-xl md:text-2xl font-bold font-serif">
            {language === 'hi' ? 'हम क्या सर्विस करते हैं और हमारी सीमाएं' : 'What We Service vs What We Don’t Do'}
          </h3>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            {language === 'hi'
              ? 'आपकी फैक्ट्री वारंटी और सुरक्षा की रक्षा के लिए हमारी स्पष्ट सीमाएं।'
              : 'Clear service boundaries designed to protect your vehicle safety and manufacturer warranty integrity.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="p-4 bg-[var(--surface-sunken)] rounded-xl border border-emerald-500/30 space-y-2">
            <h4 className="font-bold text-emerald-400 font-mono text-sm">
              ✓ {language === 'hi' ? 'हम क्या करते हैं (What We Do):' : 'What We Service & Inspect:'}
            </h4>
            <ul className="space-y-1.5 text-[var(--text)] list-disc list-inside">
              <li>{language === 'hi' ? 'डिजिटल बैटरी SOH और सेल वोल्टेज बैलेंसिंग टेस्ट' : 'Digital Battery State of Health (SOH) and cell delta balancing'}</li>
              <li>{language === 'hi' ? 'हाई-वोल्टेज केबल आइसोलेशन और इंसुलेशन जांच (>500 MΩ)' : 'High-voltage cable insulation resistance testing (>500 MΩ)'}</li>
              <li>{language === 'hi' ? 'रीजेन ब्रेक कैलीपर डिसमेंटलिंग, सफाई और लुब्रिकेशन' : 'Brake caliper slide pin servicing & rust band scale removal'}</li>
              <li>{language === 'hi' ? 'डाइइलेक्ट्रिक लो-कंडक्टिविटी बैटरी कूलेंट फ्लश' : 'Dielectric battery thermal cooling circuit vacuum flush'}</li>
              <li>{language === 'hi' ? '12V ऑक्जिलरी AGM बैटरी और DCDC कनवर्टर टेस्ट' : '12V auxiliary AGM battery and DC-DC converter diagnostics'}</li>
              <li>{language === 'hi' ? 'HL-रेटेड ईवी टायर फिटिंग और 4-व्हील लेजर अलाइनमेंट' : 'HL-rated tyre fitting and precision 4-wheel alignment'}</li>
            </ul>
          </div>

          <div className="p-4 bg-[var(--surface-sunken)] rounded-xl border border-red-500/30 space-y-2">
            <h4 className="font-bold text-red-400 font-mono text-sm">
              ✕ {language === 'hi' ? 'हम क्या नहीं करते (What We Don’t Do):' : 'Boundaries (What We Do NOT Do):'}
            </h4>
            <ul className="space-y-1.5 text-[var(--text)] list-disc list-inside">
              <li>{language === 'hi' ? 'सील किए गए बैटरी पैक को खोलना (फैक्ट्री वारंटी सुरक्षा)' : 'Opening sealed traction battery casing (voids OEM warranty)'}</li>
              <li>{language === 'hi' ? 'अनधिकृत स्पीड या पावर सॉफ़्टवेयर ट्यूनिंग/हैक' : 'Speed limiter modification or unauthorized firmware tampering'}</li>
              <li>{language === 'hi' ? 'गैर-मानक आफ्टरमार्केट हाई-वोल्टेज वायर स्प्लिसिंग' : 'Non-compliant high-voltage harness splicing'}</li>
              <li>{language === 'hi' ? 'क्षतिग्रस्त लिथियम पाउच सेल की अनधिकृत मरम्मत' : 'Repairing swollen or punctured lithium pouch cells'}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <div className="p-8 bg-[var(--surface-sunken)] rounded-3xl border border-[var(--border-subtle)] text-center space-y-4">
        <h3 className="text-2xl font-bold font-serif">
          {language === 'hi' ? 'अपनी ईवी या हाइब्रिड के लिए समय तय करें' : 'Ready for Your EV or Hybrid Inspection?'}
        </h3>
        <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-xl mx-auto">
          {language === 'hi'
            ? 'हमेशा लिखित कोटेशन, बिना अनुमति अतिरिक्त काम न करने की गारंटी और विस्तृत डिजिटल रिपोर्ट।'
            : 'Written estimate, photographic evidence, and calibrated torque on every fastener.'}
        </p>
        <Link to="/book">
          <Button variant="primary" className="text-sm font-semibold px-8 py-3">
            {language === 'hi' ? 'वर्कशॉप स्लॉट बुक करें →' : 'Book Workshop Appointment →'}
          </Button>
        </Link>
      </div>
    </div>
  );
}
