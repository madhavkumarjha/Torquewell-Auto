import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '@/store';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function Fleet() {
  const { language } = useStore();

  // ROI Calculator State
  const [fleetSize, setFleetSize] = useState<number>(8);
  const [downtimeCostPerDay, setDowntimeCostPerDay] = useState<number>(350);
  const [annualMiles, setAnnualMiles] = useState<number>(25000);

  // Corporate Form State
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [vanCount, setVanCount] = useState('5-15');
  const [inquiryRef, setInquiryRef] = useState('');

  // Driver Defect Simulator State
  const [defectSubmitted, setDefectSubmitted] = useState(false);
  const [defectVehicle, setDefectVehicle] = useState('TW72 FLT');
  const [defectType, setDefectType] = useState('Brake shudder under heavy load');

  // ROI Math
  const estimatedDaysSaved = Math.round(fleetSize * 1.8);
  const annualDowntimeSavings = estimatedDaysSaved * downtimeCostPerDay;
  const preventativeEfficiency = Math.round(fleetSize * 420);
  const totalAnnualBenefit = annualDowntimeSavings + preventativeEfficiency;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `TW-FLT-${Math.floor(1000 + Math.random() * 9000)}`;
    setInquiryRef(ref);
    setFormSubmitted(true);
  };

  const handleDefectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDefectSubmitted(true);
    setTimeout(() => setDefectSubmitted(false), 4000);
  };

  const packages = [
    {
      id: 'quarterly-safety',
      name: { en: 'Quarterly Commercial Van Safety Inspection', hi: 'तिमाही वाणिज्यिक वैन सुरक्षा निरीक्षण' },
      interval: { en: 'Every 3 Months / 10,000 km', hi: 'हर 3 महीने / 10,000 किमी' },
      price: '£85 + VAT',
      checks: [
        { en: 'Brake pad and disc micrometer wear check (both axles)', hi: 'दोनों एक्सल पर ब्रेक पैड और डिस्क माइक्रोमीटर जांच' },
        { en: 'Tyre tread depth, cold pressures & sidewall damage check', hi: 'टायर ट्रेड गहराई, हवा का दबाव और साइडवॉल क्षति जांच' },
        { en: 'Steering rack ball joints, drop links & wheel bearing play', hi: 'स्टीयरिंग रैक, बॉल जॉइंट्स और व्हील बेयरिंग प्ले जांच' },
        { en: 'Cargo door latches, seatbelts & emergency safety kit', hi: 'कार्गो डोर लैच, सीटबेल्ट और आपातकालीन सुरक्षा किट' }
      ]
    },
    {
      id: 'annual-major',
      name: { en: 'Annual Fleet MOT & Major Logbook Service', hi: 'वार्षिक फ्लीट MOT और प्रमुख लॉगबुक सर्विस' },
      interval: { en: 'Every 12 Months / 30,000 km', hi: 'हर 12 महीने / 30,000 किमी' },
      price: '£220 + VAT',
      checks: [
        { en: 'Full synthetic oil and high-efficiency filter renewal', hi: 'सिंथेटिक तेल और ऑयल फिल्टर का पूर्ण नवीनीकरण' },
        { en: 'Brake fluid pressure bleed & hygroscopic moisture test', hi: 'ब्रेक द्रव प्रेशर ब्लीड और नमी परीक्षण' },
        { en: 'Transmission fluid, auxiliary drive belts & cooling circuit flush', hi: 'ट्रांसमिशन फ्लूइड, बेल्ट और कूलिंग सर्किट जांच' },
        { en: 'Full OBD-II multi-ECU health scan and freeze-frame logging', hi: 'पूर्ण OBD-II ECU स्कैन और फॉल्ट लॉगिंग' }
      ]
    },
    {
      id: 'ev-commercial',
      name: { en: 'e-LCV High-Voltage Commercial Maintenance', hi: 'इलेक्ट्रिक कमर्शियल वैन (e-LCV) मेंटेनेंस' },
      interval: { en: 'Every 12 Months / 25,000 km', hi: 'हर 12 महीने / 25,000 किमी' },
      price: '£180 + VAT',
      checks: [
        { en: 'High-voltage battery State of Health (SOH) & cell delta test', hi: 'हाई-वोल्टेज बैटरी SOH और सेल वोल्टेज बैलेंसिंग जांच' },
        { en: '1000V orange harness insulation resistance verification (>500MΩ)', hi: '1000V ऑरेंज केबल इंसुलेशन रेजिस्टेंस जांच' },
        { en: 'Regenerative braking caliper dismantling, slide clean & lube', hi: 'रीजेनेरेटिव ब्रेक कैलीपर डिसमेंटलिंग और लुब्रिकेशन' },
        { en: 'Dielectric battery thermal cooling loop pressure test', hi: 'डाइइलेक्ट्रिक बैटरी कूलिंग लूप प्रेशर टेस्ट' }
      ]
    }
  ];

  return (
    <div className="space-y-12 py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-md space-y-6">
        <div className="flex items-center gap-3">
          <Badge variant="neutral" className="text-xs font-mono uppercase tracking-wider py-1 px-3">
            🚚 Commercial Fleet Care
          </Badge>
          <span className="text-xs font-mono text-[var(--accent)] font-semibold">
            {language === 'hi' ? 'अपटाइम एश्योरेंस गारंटी' : 'Zero-Unscheduled-Downtime SLA'}
          </span>
        </div>

        <div className="max-w-3xl space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif tracking-tight text-[var(--text)]">
            {language === 'hi'
              ? 'फ्लीट और वाणिज्यिक वाहन रखरखाव'
              : 'Fleet & Commercial Van Maintenance'}
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed">
            {language === 'hi'
              ? 'स्थानीय व्यवसायों और वैन फ्लीट के लिए अधिकतम अपटाइम, 4-घंटे का सर्विस टर्नअराउंड, मासिक समेकित वैट इनवॉइसिंग और डिजिटल ड्राइवर डिफेक्ट रिपोर्टिंग।'
              : 'Uptime-focused commercial maintenance for local business fleets. Guaranteed morning bay allocation, 4-hour minor turnaround SLAs, consolidated VAT invoicing, and mobile driver defect reporting.'}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[var(--border-subtle)]">
          <div className="p-3 bg-[var(--surface-sunken)] rounded-xl border border-[var(--border-subtle)] text-center">
            <span className="text-2xl font-bold font-mono text-[var(--accent)]">4-Hour</span>
            <p className="text-[11px] text-[var(--text-muted)] mt-1">{language === 'hi' ? 'माइनर सर्विस SLA' : 'Minor Service SLA'}</p>
          </div>
          <div className="p-3 bg-[var(--surface-sunken)] rounded-xl border border-[var(--border-subtle)] text-center">
            <span className="text-2xl font-bold font-mono text-[var(--accent)]">07:30 AM</span>
            <p className="text-[11px] text-[var(--text-muted)] mt-1">{language === 'hi' ? 'प्राथमिकता बे आवंटन' : 'Priority Bay Drop'}</p>
          </div>
          <div className="p-3 bg-[var(--surface-sunken)] rounded-xl border border-[var(--border-subtle)] text-center">
            <span className="text-2xl font-bold font-mono text-[var(--accent)]">0%</span>
            <p className="text-[11px] text-[var(--text-muted)] mt-1">{language === 'hi' ? 'अपसेल कमीशन' : 'Upsell Commission'}</p>
          </div>
          <div className="p-3 bg-[var(--surface-sunken)] rounded-xl border border-[var(--border-subtle)] text-center">
            <span className="text-2xl font-bold font-mono text-[var(--accent)]">1 Invoice</span>
            <p className="text-[11px] text-[var(--text-muted)] mt-1">{language === 'hi' ? 'मासिक समेकित बिल' : 'Monthly VAT Bill'}</p>
          </div>
        </div>

        <div className="pt-2 flex flex-wrap items-center gap-4">
          <a href="#onboarding-form">
            <Button variant="primary" className="text-sm font-semibold">
              📝 {language === 'hi' ? 'कॉर्पोरेट खाता शुरू करें' : 'Open Corporate Fleet Account'}
            </Button>
          </a>
          <Link to="/portal">
            <Button variant="secondary" className="text-sm">
              {language === 'hi' ? 'फ्लीट पोर्टल डेमो देखें →' : 'View Fleet Portal Demo →'}
            </Button>
          </Link>
        </div>
      </div>

      {/* 1. Interactive Fleet ROI & Downtime Cost Calculator */}
      <section className="bg-[var(--surface-sunken)] border border-[var(--border-subtle)] rounded-3xl p-6 md:p-10 space-y-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[var(--border-subtle)]">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-semibold">
              {language === 'hi' ? 'व्यावसायिक बचत कैलकुलेटर' : 'Business Financial Model'}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-serif mt-1">
              {language === 'hi' ? 'फ्लीट डाउनटाइम और आरओआई (ROI) कैलकुलेटर' : 'Fleet Downtime & Maintenance ROI Calculator'}
            </h2>
          </div>
          <Badge variant="ok" className="self-start md:self-auto py-1 px-3 text-xs">
            {language === 'hi' ? 'अनुमानित वार्षिक बचत' : 'Projected Annual Savings'}
          </Badge>
        </div>

        {/* Inputs & Output Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Sliders (Left 7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Fleet Size */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <label htmlFor="fleet-size-slider" className="font-medium text-[var(--text)]">
                  {language === 'hi' ? 'फ्लीट में वाहनों की संख्या:' : 'Number of Fleet Commercial Vehicles:'}
                </label>
                <span className="font-mono font-bold text-lg text-[var(--accent)]">{fleetSize} vans</span>
              </div>
              <input
                id="fleet-size-slider"
                type="range"
                min="2"
                max="50"
                step="1"
                value={fleetSize}
                onChange={(e) => setFleetSize(parseInt(e.target.value, 10))}
                className="w-full h-2.5 bg-[var(--surface-elevated)] rounded-lg appearance-none cursor-pointer accent-[var(--accent)]"
              />
              <div className="flex justify-between text-[11px] font-mono text-[var(--text-muted)]">
                <span>2 vans</span>
                <span>25 vans</span>
                <span>50 vans</span>
              </div>
            </div>

            {/* Daily Downtime Cost */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <label htmlFor="downtime-cost-slider" className="font-medium text-[var(--text)]">
                  {language === 'hi' ? 'प्रति वैन दैनिक डाउनटाइम लागत (ड्राइवर वेतन + खोया राजस्व):' : 'Estimated Cost per Day of Vehicle Downtime:'}
                </label>
                <span className="font-mono font-bold text-lg text-[var(--accent)]">£{downtimeCostPerDay}/day</span>
              </div>
              <input
                id="downtime-cost-slider"
                type="range"
                min="150"
                max="750"
                step="25"
                value={downtimeCostPerDay}
                onChange={(e) => setDowntimeCostPerDay(parseInt(e.target.value, 10))}
                className="w-full h-2.5 bg-[var(--surface-elevated)] rounded-lg appearance-none cursor-pointer accent-[var(--accent)]"
              />
              <div className="flex justify-between text-[11px] font-mono text-[var(--text-muted)]">
                <span>£150/day (Courier)</span>
                <span>£400/day (Trade Service)</span>
                <span>£750/day (Heavy Plant)</span>
              </div>
            </div>

            {/* Annual Distance */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <label htmlFor="annual-miles-slider" className="font-medium text-[var(--text)]">
                  {language === 'hi' ? 'प्रति वाहन औसत वार्षिक माइलेज:' : 'Average Annual Distance per Vehicle:'}
                </label>
                <span className="font-mono font-bold text-lg text-[var(--accent)]">{annualMiles.toLocaleString()} miles</span>
              </div>
              <input
                id="annual-miles-slider"
                type="range"
                min="10000"
                max="60000"
                step="5000"
                value={annualMiles}
                onChange={(e) => setAnnualMiles(parseInt(e.target.value, 10))}
                className="w-full h-2.5 bg-[var(--surface-elevated)] rounded-lg appearance-none cursor-pointer accent-[var(--accent)]"
              />
              <div className="flex justify-between text-[11px] font-mono text-[var(--text-muted)]">
                <span>10k mi</span>
                <span>35k mi</span>
                <span>60k mi</span>
              </div>
            </div>
          </div>

          {/* KPI Output Card (Right 5 Cols) */}
          <div className="lg:col-span-5 bg-[var(--surface-elevated)] border-2 border-[var(--accent)]/40 rounded-2xl p-6 space-y-4 shadow-md text-center">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-semibold">
              {language === 'hi' ? 'अनुमानित कुल वित्तीय लाभ' : 'Estimated Annual Financial Benefit'}
            </span>
            <div className="text-4xl sm:text-5xl font-mono font-extrabold text-[var(--accent)]">
              £{totalAnnualBenefit.toLocaleString()}
            </div>
            <p className="text-xs text-[var(--text-muted)]">
              {language === 'hi'
                ? 'निवारक टोक-स्पेसिफिकेशन सर्विसिंग और 4-घंटे के टर्नअराउंड से होने वाला शुद्ध लाभ।'
                : 'Net operational gain from reduced roadside breakdowns and rapid workshop turnaround.'}
            </p>

            <div className="pt-3 border-t border-[var(--border-subtle)] grid grid-cols-2 gap-2 text-left text-xs">
              <div className="p-2.5 bg-[var(--surface-sunken)] rounded-lg">
                <span className="text-[11px] text-[var(--text-muted)] block">
                  {language === 'hi' ? 'बचाए गए दिन:' : 'Avoided Downtime:'}
                </span>
                <strong className="font-mono text-emerald-400">{estimatedDaysSaved} days/year</strong>
              </div>
              <div className="p-2.5 bg-[var(--surface-sunken)] rounded-lg">
                <span className="text-[11px] text-[var(--text-muted)] block">
                  {language === 'hi' ? 'ईंधन/टायर दक्षता:' : 'Parts Efficiency:'}
                </span>
                <strong className="font-mono text-[var(--accent)]">£{preventativeEfficiency.toLocaleString()}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Commercial Fleet Packages */}
      <section className="space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-semibold">
            {language === 'hi' ? 'सर्विस पैकेज' : 'Transparent Maintenance Tiers'}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold font-serif">
            {language === 'hi' ? 'वाणिज्यिक फ्लीट अनुपालन पैकेज' : 'Commercial Fleet Compliance Packages'}
          </h2>
          <p className="text-sm text-[var(--text-muted)] max-w-2xl">
            {language === 'hi'
              ? 'बिना किसी छिपे शुल्क के निश्चित-कार्यक्षेत्र पैकेज। प्रत्येक कार्य पर लिखित साक्ष्य टोकन प्रदान किए जाते हैं।'
              : 'Fixed-scope maintenance packages designed for roadworthiness audit compliance with zero unauthorized additions.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded-2xl p-6 flex flex-col justify-between space-y-6 shadow-sm hover:border-[var(--accent)]/40 transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
                  <span className="text-xs font-mono text-[var(--accent)] font-semibold uppercase">
                    {language === 'hi' ? pkg.interval.hi : pkg.interval.en}
                  </span>
                  <span className="text-lg font-mono font-bold text-[var(--text)]">
                    {pkg.price}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-lg text-[var(--text)] leading-snug">
                  {language === 'hi' ? pkg.name.hi : pkg.name.en}
                </h3>

                <ul className="space-y-2 text-xs text-[var(--text-muted)]">
                  {pkg.checks.map((c, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold shrink-0">✓</span>
                      <span>{language === 'hi' ? c.hi : c.en}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a href="#onboarding-form" className="block pt-4 border-t border-[var(--border-subtle)]">
                <Button variant="secondary" className="w-full text-xs font-medium">
                  {language === 'hi' ? 'इस पैकेज पर चर्चा करें →' : 'Select Package in Proposal →'}
                </Button>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Driver-Reported Defect Triage Workflow Demo */}
      <section className="bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded-3xl p-6 md:p-10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-subtle)]">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-semibold">
                {language === 'hi' ? 'मोबाइल ड्राइवर टूल डेमो' : 'Mobile Driver Defect Logging'}
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold font-serif mt-1">
              {language === 'hi' ? 'ड्राइवर डिफेक्ट रिपोर्टिंग फ्लो (दैनिक वैन चेक)' : 'Driver Daily Defect Submission Flow'}
            </h3>
          </div>
          <Badge variant="neutral" className="text-xs font-mono self-start sm:self-auto">
            Live Workshop Sync
          </Badge>
        </div>

        <p className="text-xs text-[var(--text-muted)] max-w-2xl">
          {language === 'hi'
            ? 'आपके डिलीवरी ड्राइवर अपने स्मार्टफोन से सीधे वर्कशॉप में किसी भी लक्षण की सूचना दे सकते हैं। इससे छोटी समस्याएं बड़ी खराबी बनने से पहले ठीक हो जाती हैं।'
            : 'Van drivers submit rapid defect reports via mobile in under 45 seconds. The bay crew prepares replacement parts before the van arrives at 07:30.'}
        </p>

        <form onSubmit={handleDefectSubmit} className="bg-[var(--surface-sunken)] p-6 rounded-2xl border border-[var(--border-subtle)] grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <div className="space-y-1.5">
            <label htmlFor="defect-vehicle" className="text-xs font-mono text-[var(--text-muted)]">
              {language === 'hi' ? 'वाहन पंजीकरण (Plate):' : 'Vehicle Plate:'}
            </label>
            <input
              id="defect-vehicle"
              type="text"
              value={defectVehicle}
              onChange={(e) => setDefectVehicle(e.target.value)}
              className="w-full bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded-lg px-3 py-2 text-xs font-mono text-[var(--text)] uppercase font-bold"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="defect-type" className="text-xs font-mono text-[var(--text-muted)]">
              {language === 'hi' ? 'देखा गया लक्षण / समस्या:' : 'Reported Defect Symptom:'}
            </label>
            <select
              id="defect-type"
              value={defectType}
              onChange={(e) => setDefectType(e.target.value)}
              className="w-full bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded-lg px-3 py-2 text-xs text-[var(--text)]"
            >
              <option value="Brake shudder under heavy load">Brake shudder under heavy load</option>
              <option value="Yellow tyre pressure TPMS light">Yellow tyre pressure TPMS light</option>
              <option value="Front suspension knock over dips">Front suspension knock over dips</option>
              <option value="Rear sliding door latch sticking">Rear sliding door latch sticking</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <Button type="submit" variant="primary" className="w-full text-xs py-2.5">
              {defectSubmitted ? '✓ Logged to Bay Crew!' : '🚀 Submit Defect to Workshop'}
            </Button>
          </div>
        </form>
      </section>

      {/* 4. Corporate Account Onboarding & Proposal Form */}
      <section id="onboarding-form" className="bg-[var(--surface-elevated)] border-2 border-[var(--accent)]/30 rounded-3xl p-8 md:p-12 space-y-6 shadow-lg">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-semibold">
            {language === 'hi' ? 'खाता आवेदन' : 'Corporate Account Application'}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold font-serif mt-1">
            {language === 'hi' ? 'अपनी फ्लीट के लिए कॉर्पोरेट प्रस्ताव प्राप्त करें' : 'Open a Fleet Account or Request a SLA Proposal'}
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
            {language === 'hi'
              ? 'फॉर्म भरें — हमारे फ्लीट मैनेजर 2 व्यावसायिक घंटों में अनुकूलित प्रस्ताव और क्रेडिट शर्तों के साथ संपर्क करेंगे।'
              : 'Complete this form to receive a tailored SLA agreement, consolidated billing rates, and priority bay onboarding.'}
          </p>
        </div>

        {formSubmitted ? (
          <div className="p-8 bg-[var(--surface-sunken)] rounded-2xl border border-emerald-500/40 text-center space-y-4 animate-in fade-in">
            <span className="text-4xl">🎉</span>
            <h3 className="text-2xl font-bold font-serif text-[var(--text)]">
              {language === 'hi' ? 'फ्लीट आवेदन प्राप्त हुआ!' : 'Corporate Inquiry Received!'}
            </h3>
            <p className="text-xs text-[var(--text-muted)] max-w-md mx-auto">
              {language === 'hi'
                ? `आपका संदर्भ नंबर #${inquiryRef} है। हमारी फ्लीट टीम 2 कार्य घंटों में आपसे संपर्क करेगी।`
                : `Your reference code is #${inquiryRef}. Our commercial lead will contact ${contactName || 'your team'} within 2 business hours.`}
            </p>
            <div className="pt-2">
              <Button variant="secondary" onClick={() => setFormSubmitted(false)} className="text-xs">
                {language === 'hi' ? 'नया फॉर्म भरें' : 'Submit Another Inquiry'}
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label htmlFor="company-name" className="text-xs font-medium text-[var(--text)]">
                {language === 'hi' ? 'कंपनी का नाम *' : 'Company / Trading Name *'}
              </label>
              <input
                id="company-name"
                required
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Apex Express Couriers Ltd"
                className="w-full bg-[var(--surface-sunken)] border border-[var(--border-subtle)] rounded-xl px-4 py-2.5 text-sm text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="contact-name" className="text-xs font-medium text-[var(--text)]">
                {language === 'hi' ? 'संपर्क व्यक्ति का नाम *' : 'Fleet Manager / Contact Name *'}
              </label>
              <input
                id="contact-name"
                required
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="e.g. Sarah Jenkins"
                className="w-full bg-[var(--surface-sunken)] border border-[var(--border-subtle)] rounded-xl px-4 py-2.5 text-sm text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="email" className="text-xs font-medium text-[var(--text)]">
                {language === 'hi' ? 'व्यावसायिक ईमेल *' : 'Business Email Address *'}
              </label>
              <input
                id="email"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="s.jenkins@apexexpress.co.uk"
                className="w-full bg-[var(--surface-sunken)] border border-[var(--border-subtle)] rounded-xl px-4 py-2.5 text-sm text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="phone" className="text-xs font-medium text-[var(--text)]">
                {language === 'hi' ? 'फोन नंबर *' : 'Direct Telephone Number *'}
              </label>
              <input
                id="phone"
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="020 7946 0888"
                className="w-full bg-[var(--surface-sunken)] border border-[var(--border-subtle)] rounded-xl px-4 py-2.5 text-sm text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label htmlFor="van-count" className="text-xs font-medium text-[var(--text)]">
                {language === 'hi' ? 'वाहन फ्लीट आकार' : 'Approximate Fleet Size:'}
              </label>
              <select
                id="van-count"
                value={vanCount}
                onChange={(e) => setVanCount(e.target.value)}
                className="w-full bg-[var(--surface-sunken)] border border-[var(--border-subtle)] rounded-xl px-4 py-2.5 text-sm text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              >
                <option value="1-4">Small Fleet (1–4 vans)</option>
                <option value="5-15">Mid Fleet (5–15 vans)</option>
                <option value="16-40">Large Fleet (16–40 vans)</option>
                <option value="40+">Enterprise Fleet (40+ commercial vehicles)</option>
              </select>
            </div>

            <div className="sm:col-span-2 pt-2">
              <Button type="submit" variant="primary" className="w-full text-sm font-semibold py-3">
                {language === 'hi' ? 'प्रस्ताव अनुरोध सबमिट करें →' : 'Request Corporate Fleet SLA Proposal →'}
              </Button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}
