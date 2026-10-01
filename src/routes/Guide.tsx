import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { usePrefsStore } from '@/store/prefs';
import { GuideState } from '@/types';
import {
  RED_FLAGS,
  WARNING_LIGHTS,
  SYMPTOMS,
  TRIGGERS,
  evaluateGuideTriage,
} from '@/data/guide-rules';
import { SymptomSheet } from '@/components/guide/SymptomSheet';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  ShieldAlert,
  Search,
  RotateCcw,
  Printer,
  ChevronRight,
  Info,
  Calendar,
  CheckCircle2,
  Wrench,
  HelpCircle,
} from 'lucide-react';

export default function Guide() {
  const { locale } = usePrefsStore();

  // Wizard state
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [guideState, setGuideState] = useState<GuideState>({
    redFlags: [],
    powertrain: 'petrol',
    ageBand: '3-6 yrs',
    mileageKm: 60000,
    symptoms: [],
    lights: [],
    triggers: [],
    duration: '<1d',
    recent: [],
    locale,
  });

  const [searchFilter, setSearchFilter] = useState('');
  const [activeTab, setActiveTab] = useState<'lights' | 'symptoms'>('lights');
  const [sheetOpen, setSheetOpen] = useState(false);
  const [showLogicDrawer, setShowLogicDrawer] = useState(false);

  // Evaluate result dynamically based on current selections
  const result = useMemo(() => {
    return evaluateGuideTriage(guideState);
  }, [guideState]);

  // Filtered warning lights and symptoms for step 3
  const filteredLights = useMemo(() => {
    if (!searchFilter.trim()) return WARNING_LIGHTS;
    const q = searchFilter.toLowerCase();
    return WARNING_LIGHTS.filter(
      (l) => l.name.en.toLowerCase().includes(q) || l.desc.en.toLowerCase().includes(q) || l.name.hi.includes(q)
    );
  }, [searchFilter]);

  const filteredSymptoms = useMemo(() => {
    if (!searchFilter.trim()) return SYMPTOMS;
    const q = searchFilter.toLowerCase();
    return SYMPTOMS.filter(
      (s) => s.label.en.toLowerCase().includes(q) || s.desc.en.toLowerCase().includes(q) || s.label.hi.includes(q)
    );
  }, [searchFilter]);

  // Toggle selection helpers
  const toggleRedFlag = (id: string) => {
    setGuideState((prev) => {
      const exists = prev.redFlags.includes(id);
      const nextFlags = exists ? prev.redFlags.filter((f) => f !== id) : [...prev.redFlags, id];
      return { ...prev, redFlags: nextFlags };
    });
  };

  const toggleLight = (id: string) => {
    setGuideState((prev) => {
      const exists = prev.lights.includes(id);
      return {
        ...prev,
        lights: exists ? prev.lights.filter((l) => l !== id) : [...prev.lights, id],
      };
    });
  };

  const toggleSymptom = (id: string) => {
    setGuideState((prev) => {
      const exists = prev.symptoms.includes(id);
      return {
        ...prev,
        symptoms: exists ? prev.symptoms.filter((s) => s !== id) : [...prev.symptoms, id],
      };
    });
  };

  const toggleTrigger = (id: string) => {
    setGuideState((prev) => {
      const exists = prev.triggers.includes(id);
      return {
        ...prev,
        triggers: exists ? prev.triggers.filter((t) => t !== id) : [...prev.triggers, id],
      };
    });
  };

  const handleReset = () => {
    setGuideState({
      redFlags: [],
      powertrain: 'petrol',
      ageBand: '3-6 yrs',
      mileageKm: 60000,
      symptoms: [],
      lights: [],
      triggers: [],
      duration: '<1d',
      recent: [],
      locale,
    });
    setStep(1);
    setSearchFilter('');
  };

  // Immediate jump to Stop Result if red flag selected
  const hasActiveRedFlag = guideState.redFlags.length > 0;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* 1. TOP HEADER & MANDATORY SAFETY LINE */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface-2)] border border-[var(--line)] text-xs font-mono text-[var(--accent)] font-semibold tracking-wider uppercase">
          <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
          {locale === 'en' ? 'FEATURE 02 · SAFETY TRIAGE' : 'फीचर ०२ · सुरक्षा जांच'}
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[var(--text)]">
          {locale === 'en' ? 'Can I still drive it?' : 'क्या मैं अब भी गाड़ी चला सकता हूँ?'}
        </h1>

        <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed">
          {locale === 'en'
            ? 'Got a sudden warning light, vibration, or unfamiliar noise? Answer 4 quick questions to receive a clear safety rating and a printable sheet for any mechanic.'
            : 'अचानक कोई वार्निंग लाइट जली या अजीब आवाज आई? 4 छोटे सवालों के जवाब दें और तुरंत सुरक्षा रेटिंग व मैकेनिक के लिए लक्षण पत्र पाएं।'}
        </p>

        {/* Persistent Emergency Hotline Pill */}
        <div className="p-3.5 rounded-2xl bg-[var(--critical)]/10 border border-[var(--critical)]/30 flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-[var(--critical)] font-semibold">
            <ShieldAlert className="w-4 h-4 flex-shrink-0" />
            <span>
              {locale === 'en'
                ? 'Vehicle broken down or unsafe to steer right now?'
                : 'गाड़ी सड़क पर बंद हो गई है या स्टीयरिंग काम नहीं कर रहा?'}
            </span>
          </div>
          <Link
            to="/help"
            className="px-3 py-1.5 rounded-xl bg-[var(--critical)] text-white font-bold tracking-wide hover:brightness-110 transition-all select-none"
          >
            {locale === 'en' ? 'Emergency Help Now →' : 'आपातकालीन सहायता →'}
          </Link>
        </div>
      </div>

      {/* 2. PROGRESS STEPPER */}
      <div className="flex items-center justify-between border-b border-[var(--line)]/70 pb-4">
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
          {[
            { n: 1, title: locale === 'en' ? '1. Red Flags' : '१. खतरे' },
            { n: 2, title: locale === 'en' ? '2. Vehicle' : '२. वाहन' },
            { n: 3, title: locale === 'en' ? '3. Symptoms' : '३. लक्षण' },
            { n: 4, title: locale === 'en' ? '4. Triggers' : '४. स्थितियां' },
            { n: 5, title: locale === 'en' ? '5. Result' : '५. परिणाम' },
          ].map((s) => (
            <button
              key={s.n}
              onClick={() => setStep(s.n as any)}
              className={`flex items-center gap-1.5 py-1 px-2.5 rounded-lg transition-colors cursor-pointer ${
                step === s.n
                  ? 'bg-[var(--accent)] text-[var(--accent-ink)] font-bold'
                  : step > s.n
                  ? 'text-[var(--text)] font-semibold'
                  : 'opacity-50'
              }`}
            >
              <span>{s.title}</span>
            </button>
          ))}
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1 text-xs text-[var(--text-muted)] hover:text-[var(--text)] transition-colors cursor-pointer font-mono"
          title="Reset guide to beginning"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{locale === 'en' ? 'Reset' : 'रीसेट'}</span>
        </button>
      </div>

      {/* 3. STEP 1: RED-FLAG IMMEDIATE HAZARD CHECK */}
      {step === 1 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[var(--text)] flex items-center gap-2">
              <span className="text-[var(--critical)]">⚠</span>
              <span>
                {locale === 'en' ? 'Step 1: Check for Critical Red Flags' : 'चरण १: गंभीर लाल झंडा खतरों की जांच करें'}
              </span>
            </h2>
            <p className="text-sm text-[var(--text-muted)]">
              {locale === 'en'
                ? 'If ANY of these conditions apply, stop driving immediately. Do not attempt roadside work.'
                : 'यदि इनमें से कोई भी स्थिति है, तो तुरंत गाड़ी चलाना बंद करें। सड़क पर मरम्मत न करें।'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {RED_FLAGS.map((rf) => {
              const selected = guideState.redFlags.includes(rf.id);
              return (
                <div
                  key={rf.id}
                  onClick={() => toggleRedFlag(rf.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer select-none flex items-start gap-3 ${
                    selected
                      ? 'bg-[var(--critical)]/15 border-[var(--critical)] text-[var(--text)] shadow-sm'
                      : 'bg-[var(--surface)] border-[var(--line)] hover:border-[var(--line)]/90 hover:bg-[var(--surface-2)]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center border mt-0.5 flex-shrink-0 transition-colors ${
                      selected
                        ? 'bg-[var(--critical)] border-[var(--critical)] text-white'
                        : 'border-[var(--line)] bg-[var(--surface-2)]'
                    }`}
                  >
                    {selected && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-bold text-sm text-[var(--text)]">{rf.label[locale]}</h3>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">{rf.desc[locale]}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[var(--line)]">
            <span className="text-xs text-[var(--text-muted)]">
              {hasActiveRedFlag
                ? locale === 'en'
                  ? 'Red flag selected: Vehicle will be rated STOP NOW'
                  : 'खतरा चुना गया: वाहन को तुरंत रोकने की सलाह दी जाएगी'
                : locale === 'en'
                ? 'No red flags? Proceed to vehicle details.'
                : 'कोई गंभीर खतरा नहीं? वाहन विवरण पर आगे बढ़ें।'}
            </span>

            <button
              onClick={() => setStep(hasActiveRedFlag ? 5 : 2)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] font-bold text-xs tracking-wider uppercase hover:brightness-110 transition-all cursor-pointer shadow-md"
            >
              <span>{hasActiveRedFlag ? (locale === 'en' ? 'View Stop Instructions' : 'रोकने के निर्देश देखें') : (locale === 'en' ? 'Continue to Vehicle' : 'वाहन विवरण भरें')}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 4. STEP 2: VEHICLE PARAMETERS */}
      {step === 2 && (
        <div className="space-y-6 animate-in fade-in duration-200 max-w-3xl">
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[var(--text)]">
              {locale === 'en' ? 'Step 2: Tell us about your vehicle' : 'चरण २: अपने वाहन के बारे में बताएं'}
            </h2>
            <p className="text-sm text-[var(--text-muted)]">
              {locale === 'en'
                ? 'No registration or personal details needed. Powertrain helps identify relevant systems.'
                : 'नंबर प्लेट या व्यक्तिगत विवरण की आवश्यकता नहीं। केवल सामान्य प्रकार चुनें।'}
            </p>
          </div>

          <div className="space-y-4">
            <label className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold block">
              {locale === 'en' ? 'Powertrain Type' : 'पावरट्रेन प्रकार'}
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(['petrol', 'diesel', 'hybrid', 'ev'] as const).map((type) => {
                const active = guideState.powertrain === type;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setGuideState((prev) => ({ ...prev, powertrain: type }))}
                    className={`p-3.5 rounded-2xl border text-center font-bold text-sm uppercase font-mono transition-all cursor-pointer ${
                      active
                        ? 'bg-[var(--accent)] text-[var(--accent-ink)] border-[var(--accent)] shadow-md'
                        : 'bg-[var(--surface)] border-[var(--line)] text-[var(--text)] hover:bg-[var(--surface-2)]'
                    }`}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="space-y-2">
              <label className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold block">
                {locale === 'en' ? 'Approximate Vehicle Age' : 'वाहन की अनुमानित आयु'}
              </label>
              <select
                value={guideState.ageBand}
                onChange={(e) => setGuideState((prev) => ({ ...prev, ageBand: e.target.value }))}
                className="w-full p-3 rounded-xl bg-[var(--surface-2)] border border-[var(--line)] text-sm text-[var(--text)] focus:outline-none"
              >
                <option value="0-3 yrs">Under 3 years (0–3 yrs)</option>
                <option value="3-6 yrs">3 to 6 years</option>
                <option value="7-10 yrs">7 to 10 years</option>
                <option value="10+ yrs">Over 10 years</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold block">
                {locale === 'en' ? 'Approximate Mileage' : 'अनुमानित माइलेज'}
              </label>
              <select
                value={guideState.mileageKm}
                onChange={(e) => setGuideState((prev) => ({ ...prev, mileageKm: Number(e.target.value) }))}
                className="w-full p-3 rounded-xl bg-[var(--surface-2)] border border-[var(--line)] text-sm text-[var(--text)] focus:outline-none"
              >
                <option value={30000}>Under 30,000 km (&lt;18,000 mi)</option>
                <option value={60000}>30,000 – 60,000 km (18k–37k mi)</option>
                <option value={100000}>60,000 – 100,000 km (37k–62k mi)</option>
                <option value={150000}>Over 100,000 km (&gt;62,000 mi)</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-[var(--line)]">
            <button
              onClick={() => setStep(1)}
              className="text-xs font-mono uppercase text-[var(--text-muted)] hover:text-[var(--text)] transition-colors cursor-pointer"
            >
              ← Back
            </button>

            <button
              onClick={() => setStep(3)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] font-bold text-xs tracking-wider uppercase hover:brightness-110 transition-all cursor-pointer shadow-md"
            >
              <span>{locale === 'en' ? 'Choose Warning Light / Symptom' : 'लक्षण / लाइट चुनें'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 5. STEP 3: WARNING LIGHT & SYMPTOM PICKER */}
      {step === 3 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold font-display text-[var(--text)]">
                {locale === 'en' ? 'Step 3: What symbol or symptom are you noticing?' : 'चरण ३: कौन सा लक्षण या सिंबल दिखाई दे रहा है?'}
              </h2>
              <p className="text-sm text-[var(--text-muted)]">
                {locale === 'en' ? 'Select all symbols and sensations that apply.' : 'सभी संबंधित सिंबल और लक्षण चुनें।'}
              </p>
            </div>

            {/* Search Input Bar */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder={locale === 'en' ? 'Filter by name or symbol...' : 'नाम या सिंबल से खोजें...'}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-[var(--surface-2)] border border-[var(--line)] text-xs text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none"
              />
            </div>
          </div>

          {/* Segmented Picker Tabs */}
          <div className="flex items-center gap-2 border-b border-[var(--line)] pb-3">
            <button
              type="button"
              onClick={() => setActiveTab('lights')}
              className={`px-4 py-2 rounded-xl font-bold text-xs uppercase font-mono tracking-wider transition-all cursor-pointer ${
                activeTab === 'lights'
                  ? 'bg-[var(--accent)] text-[var(--accent-ink)]'
                  : 'bg-[var(--surface-2)] text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              {locale === 'en' ? `Dashboard Warning Lights (${guideState.lights.length} selected)` : `चेतावनी लाइट्स (${guideState.lights.length})`}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('symptoms')}
              className={`px-4 py-2 rounded-xl font-bold text-xs uppercase font-mono tracking-wider transition-all cursor-pointer ${
                activeTab === 'symptoms'
                  ? 'bg-[var(--accent)] text-[var(--accent-ink)]'
                  : 'bg-[var(--surface-2)] text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              {locale === 'en' ? `Physical Symptoms (${guideState.symptoms.length} selected)` : `शारीरिक लक्षण (${guideState.symptoms.length})`}
            </button>
          </div>

          {/* TAB 1: 16 WARNING LIGHTS GRID */}
          {activeTab === 'lights' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
              {filteredLights.map((light) => {
                const isSelected = guideState.lights.includes(light.id);
                return (
                  <div
                    key={light.id}
                    onClick={() => toggleLight(light.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer select-none flex flex-col justify-between gap-3 ${
                      isSelected
                        ? 'bg-[var(--surface-2)] border-[var(--accent)] ring-1 ring-[var(--accent)] shadow-sm'
                        : 'bg-[var(--surface)] border-[var(--line)] hover:border-[var(--line)]/80 hover:bg-[var(--surface-2)]/50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 rounded-xl bg-[var(--surface-2)] border border-[var(--line)]/50 flex items-center justify-center p-1.5 flex-shrink-0">
                        <img src={light.svgPath} alt={light.name.en} className="w-full h-full object-contain" />
                      </div>
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'bg-[var(--accent)] border-[var(--accent)]' : 'border-[var(--line)]'
                        }`}
                      >
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-ink)]" />}
                      </div>
                    </div>

                    <div className="space-y-0.5">
                      <h4 className="font-bold text-xs text-[var(--text)]">{light.name[locale]}</h4>
                      <p className="text-[11px] text-[var(--text-muted)] leading-tight">{light.desc[locale]}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 2: SYMPTOMS GRID */}
          {activeTab === 'symptoms' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {filteredSymptoms.map((symptom) => {
                const isSelected = guideState.symptoms.includes(symptom.id);
                return (
                  <div
                    key={symptom.id}
                    onClick={() => toggleSymptom(symptom.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer select-none flex items-start gap-3 ${
                      isSelected
                        ? 'bg-[var(--surface-2)] border-[var(--accent)] ring-1 ring-[var(--accent)] shadow-sm'
                        : 'bg-[var(--surface)] border-[var(--line)] hover:border-[var(--line)]/80 hover:bg-[var(--surface-2)]/50'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center mt-0.5 flex-shrink-0 ${
                        isSelected ? 'bg-[var(--accent)] border-[var(--accent)]' : 'border-[var(--line)]'
                      }`}
                    >
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-ink)]" />}
                    </div>

                    <div className="space-y-1">
                      <span className="font-bold text-xs text-[var(--text)] block">{symptom.label[locale]}</span>
                      <p className="text-xs text-[var(--text-muted)] leading-relaxed">{symptom.desc[locale]}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="flex items-center justify-between pt-6 border-t border-[var(--line)]">
            <button
              onClick={() => setStep(2)}
              className="text-xs font-mono uppercase text-[var(--text-muted)] hover:text-[var(--text)] transition-colors cursor-pointer"
            >
              ← Back
            </button>

            <button
              onClick={() => setStep(4)}
              disabled={guideState.lights.length === 0 && guideState.symptoms.length === 0}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-xs tracking-wider uppercase transition-all shadow-md ${
                guideState.lights.length > 0 || guideState.symptoms.length > 0
                  ? 'bg-[var(--accent)] text-[var(--accent-ink)] hover:brightness-110 cursor-pointer'
                  : 'bg-[var(--surface-2)] text-[var(--text-muted)] opacity-50 cursor-not-allowed'
              }`}
            >
              <span>{locale === 'en' ? 'Continue to Triggers' : 'स्थितियों का चयन करें'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 6. STEP 4: TRIGGERS & DURATION */}
      {step === 4 && (
        <div className="space-y-6 animate-in fade-in duration-200 max-w-3xl">
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[var(--text)]">
              {locale === 'en' ? 'Step 4: When does this occur?' : 'चरण ४: यह समस्या कब उत्पन्न होती है?'}
            </h2>
            <p className="text-sm text-[var(--text-muted)]">
              {locale === 'en'
                ? 'Helps mechanics reproduce the issue during workshop test drives.'
                : 'यह जानकारी मैकेनिक को वर्कशॉप में समस्या की सही पहचान करने में मदद करती है।'}
            </p>
          </div>

          <div className="space-y-4">
            <label className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold block">
              {locale === 'en' ? 'Driving Condition Trigger' : 'चालन स्थिति ट्रिगर'}
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TRIGGERS.map((t) => {
                const isSelected = guideState.triggers.includes(t.id);
                return (
                  <div
                    key={t.id}
                    onClick={() => toggleTrigger(t.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer select-none flex items-center gap-3 ${
                      isSelected
                        ? 'bg-[var(--accent)]/15 border-[var(--accent)] text-[var(--text)]'
                        : 'bg-[var(--surface)] border-[var(--line)] hover:bg-[var(--surface-2)]'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected ? 'bg-[var(--accent)] border-[var(--accent)]' : 'border-[var(--line)]'
                      }`}
                    >
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-ink)]" />}
                    </div>
                    <span className="text-xs font-semibold">{t.label[locale]}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <label className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold block">
              {locale === 'en' ? 'How long has this been occurring?' : 'यह समस्या कितने समय से है?'}
            </label>

            <div className="grid grid-cols-3 gap-3">
              {[
                { id: '<1d', label: 'Less than 24h' },
                { id: '1-7d', label: '1 to 7 days' },
                { id: '>1w', label: 'Over 1 week' },
              ].map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setGuideState((prev) => ({ ...prev, duration: d.id as any }))}
                  className={`p-3 rounded-xl border text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                    guideState.duration === d.id
                      ? 'bg-[var(--accent)] text-[var(--accent-ink)] border-[var(--accent)]'
                      : 'bg-[var(--surface)] border-[var(--line)] text-[var(--text-muted)] hover:bg-[var(--surface-2)]'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-[var(--line)]">
            <button
              onClick={() => setStep(3)}
              className="text-xs font-mono uppercase text-[var(--text-muted)] hover:text-[var(--text)] transition-colors cursor-pointer"
            >
              ← Back
            </button>

            <button
              onClick={() => setStep(5)}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] font-bold text-xs tracking-wider uppercase hover:brightness-110 transition-all cursor-pointer shadow-lg"
            >
              <span>{locale === 'en' ? 'Calculate Safety Rating' : 'सुरक्षा रेटिंग देखें'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 7. STEP 5: FINAL CALIBRATED RESULT SCREEN */}
      {step === 5 && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Urgency Badge Banner & Dial Needle */}
          <div
            className={`p-6 sm:p-8 rounded-3xl border shadow-xl relative overflow-hidden ${
              result.level === 'stop'
                ? 'bg-[var(--critical)]/10 border-[var(--critical)] text-[var(--text)]'
                : result.level === 'careful'
                ? 'bg-[var(--amber)]/10 border-[var(--amber)] text-[var(--text)]'
                : 'bg-[var(--surface)] border-[var(--line)] text-[var(--text)]'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="space-y-2">
                <Badge
                  variant={
                    result.level === 'stop' ? 'now' : result.level === 'careful' ? 'soon' : 'watch'
                  }
                >
                  {result.level === 'stop'
                    ? 'STOP NOW · UNSAFE TO DRIVE'
                    : result.level === 'careful'
                    ? 'DRIVE CAREFULLY TO WORKSHOP'
                    : 'BOOK THIS WEEK'}
                </Badge>

                <h2 className="text-2xl sm:text-4xl font-extrabold font-display">
                  {result.level === 'stop'
                    ? locale === 'en'
                      ? 'Do not drive this vehicle further.'
                      : 'इस वाहन को आगे न चलाएं।'
                    : result.level === 'careful'
                    ? locale === 'en'
                      ? 'Safe for short direct drive to workshop.'
                      : 'वर्कशॉप तक सीधी धीमी गति में चलाना सुरक्षित है।'
                    : locale === 'en'
                    ? 'Safe for local driving; plan check this week.'
                    : 'स्थानीय ड्राइविंग सुरक्षित है; इस सप्ताह जांच कराएं।'}
                </h2>

                <p className="text-sm text-[var(--text-muted)] max-w-xl">
                  {result.level === 'stop'
                    ? locale === 'en'
                      ? 'A critical component (braking hydraulics, steering control, or severe overheating) poses an active danger to you and other road users.'
                      : 'ब्रेक, स्टीयरिंग या ओवरहीटिंग से गंभीर सड़क खतरा उत्पन्न हो सकता है। सुरक्षित स्थान पर रुकें।'
                    : locale === 'en'
                    ? 'Avoid high-speed motorways, heavy cargo loads, or spirited acceleration until fully evaluated on a diagnostic lift.'
                    : 'निरीक्षण होने तक तेज रफ्तार और भारी वजन से बचें।'}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap sm:flex-col gap-3 flex-shrink-0">
                <button
                  onClick={() => setSheetOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[var(--surface-2)] border border-[var(--line)] text-xs font-bold hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all cursor-pointer shadow-sm"
                >
                  <Printer className="w-4 h-4" />
                  <span>{locale === 'en' ? 'Download Symptom Sheet' : 'लक्षण पत्र डाउनलोड करें'}</span>
                </button>

                {result.level === 'stop' ? (
                  <Link
                    to="/help"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[var(--critical)] text-white text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all shadow-md"
                  >
                    <ShieldAlert className="w-4 h-4" />
                    <span>{locale === 'en' ? 'Call Roadside Recovery' : 'रिकवरी वाहन बुलाएं'}</span>
                  </Link>
                ) : (
                  <Link
                    to="/book"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all shadow-md"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>{locale === 'en' ? 'Book a Bay Check' : 'बे निरीक्षण बुक करें'}</span>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Detailed Recommendations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Areas Technician Will Inspect */}
            <Card className="p-6 space-y-4 bg-[var(--surface)] border border-[var(--line)]">
              <div className="flex items-center gap-2 text-[var(--accent)]">
                <Wrench className="w-5 h-5" />
                <h3 className="font-bold text-base font-display text-[var(--text)]">
                  {locale === 'en' ? 'Areas a Technician Will Inspect' : 'मैकेनिक द्वारा जांचे जाने वाले हिस्से'}
                </h3>
              </div>
              <ul className="space-y-2.5 text-xs text-[var(--text)]">
                {result.areas.map((area, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-1.5 flex-shrink-0" />
                    <span className="leading-relaxed">{area[locale]}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* What to Tell Mechanic */}
            <Card className="p-6 space-y-4 bg-[var(--surface)] border border-[var(--line)]">
              <div className="flex items-center gap-2 text-[var(--teal)]">
                <HelpCircle className="w-5 h-5" />
                <h3 className="font-bold text-base font-display text-[var(--text)]">
                  {locale === 'en' ? 'What to Tell the Mechanic' : 'मैकेनिक को क्या बताएं'}
                </h3>
              </div>
              <ul className="space-y-2.5 text-xs text-[var(--text-muted)]">
                {result.note.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--teal)] mt-1.5 flex-shrink-0" />
                    <span className="leading-relaxed text-[var(--text)]">{item[locale]}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Questions to Ask Any Mechanic */}
          <Card className="p-6 space-y-3 bg-[var(--surface-2)]/60 border border-[var(--line)]">
            <h3 className="font-bold text-sm font-display text-[var(--text)]">
              {locale === 'en' ? 'Questions to Ask Before Authorising Work' : 'काम शुरू कराने से पहले पूछने योग्य प्रश्न'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[var(--text-muted)]">
              {result.ask.map((q, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-[var(--accent)] font-bold">Q{i + 1}:</span>
                  <span>{q[locale]}</span>
                </div>
              ))}
              <div className="flex items-start gap-2">
                <span className="text-[var(--accent)] font-bold">Q3:</span>
                <span>
                  {locale === 'en'
                    ? 'Can you show me the measured physical dimension vs the manufacturer threshold?'
                    : 'क्या आप पुर्जे का वास्तविक नाप और निर्माता की सीमा दिखा सकते हैं?'}
                </span>
              </div>
            </div>
          </Card>

          {/* "How This Decision Logic Works" Transparency Drawer */}
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] overflow-hidden">
            <button
              onClick={() => setShowLogicDrawer(!showLogicDrawer)}
              className="w-full p-4 flex items-center justify-between text-xs font-semibold text-[var(--text)] hover:bg-[var(--surface-2)] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-[var(--accent)]" />
                <span>
                  {locale === 'en' ? 'How this decision logic works (Transparency Guarantee)' : 'यह निर्णय प्रणाली कैसे काम करती है (पारदर्शिता गारंटी)'}
                </span>
              </div>
              <span className="font-mono text-xs text-[var(--text-muted)]">
                {showLogicDrawer ? 'Hide [-]' : 'Expand [+]'}
              </span>
            </button>

            {showLogicDrawer && (
              <div className="p-4 border-t border-[var(--line)]/60 text-xs text-[var(--text-muted)] space-y-2 bg-[var(--surface-2)]/40 font-mono">
                <p>
                  • <strong>Rule Priority 1 (Safety First):</strong> If any red-flag hazard is selected (loss of brakes, loss of steering, steam, raw fuel odour), the engine immediately assigns level <code>STOP</code> without evaluating secondary comfort inputs.
                </p>
                <p>
                  • <strong>Rule Priority 2:</strong> When multiple conflicting symptoms are reported, the algorithm chooses the strictest safety category to eliminate road risk.
                </p>
                <p>
                  • <strong>No Upselling:</strong> This tool makes zero network requests and does not use diagnostic guesswork.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mandatory Safety Line (Persistent Across All Steps) */}
      <div className="text-center pt-8 border-t border-[var(--line)]/60 text-xs text-[var(--text-muted)] space-y-1">
        <p className="font-semibold text-[var(--text)]">
          {locale === 'en'
            ? 'Indicative only · Not a diagnosis or quotation · An in-person technician inspection and written estimate come first.'
            : 'केवल सांकेतिक · यह कोई अंतिम डायग्नोसिस या कोटेशन नहीं है · इन-पर्सन जांच और लिखित अनुमान पहले आवश्यक है।'}
        </p>
        <p>
          {locale === 'en'
            ? 'This website cannot diagnose mechanical or electrical faults without physical workshop equipment.'
            : 'यह वेबसाइट बिना भौतिक उपकरणों के वाहन की तकनीकी जांच नहीं कर सकती।'}
        </p>
      </div>

      {/* Symptom Sheet Modal */}
      <SymptomSheet
        state={guideState}
        result={result}
        isOpen={sheetOpen}
        onClose={() => setSheetOpen(false)}
        locale={locale}
      />
    </div>
  );
}
