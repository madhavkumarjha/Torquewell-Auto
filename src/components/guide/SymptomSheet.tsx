import React from 'react';
import { GuideState, GuideResult } from '@/types';
import { WARNING_LIGHTS, SYMPTOMS, RED_FLAGS } from '@/data/guide-rules';
import { Printer, Copy, Check, X, ShieldAlert, AlertTriangle, FileText } from 'lucide-react';

interface SymptomSheetProps {
  state: GuideState;
  result: GuideResult;
  isOpen: boolean;
  onClose: () => void;
  locale: 'en' | 'hi';
}

export const SymptomSheet: React.FC<SymptomSheetProps> = ({
  state,
  result,
  isOpen,
  onClose,
  locale,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const selectedLights = WARNING_LIGHTS.filter((l) => state.lights?.includes(l.id));
  const selectedSymptoms = SYMPTOMS.filter((s) => state.symptoms?.includes(s.id));
  const selectedRedFlags = RED_FLAGS.filter((r) => state.redFlags?.includes(r.id));

  const textSummary = `TORQUEWELL AUTO — DRIVER SYMPTOM SUMMARY
Date: ${new Date().toLocaleDateString()}
Vehicle Powertrain: ${state.powertrain.toUpperCase()}
Safety Level: ${result.level.toUpperCase()}

Reported Symptoms:
${selectedRedFlags.map((r) => `• [CRITICAL] ${r.label.en}`).join('\n')}
${selectedLights.map((l) => `• [WARNING LIGHT] ${l.name.en}`).join('\n')}
${selectedSymptoms.map((s) => `• [SYMPTOM] ${s.label.en}`).join('\n')}

Technician Inspection Areas:
${result.areas.map((a) => `• ${a.en}`).join('\n')}

What to Note & Tell Mechanic:
${result.note.map((n) => `• ${n.en}`).join('\n')}

Questions to Ask:
${result.ask.map((q) => `• ${q.en}`).join('\n')}

*Notice: Indicative only. Not a formal diagnosis or repair quote. Physical workshop inspection required.*`;

  const handleCopy = () => {
    navigator.clipboard.writeText(textSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Symptom Sheet for Technician"
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl max-h-[92vh] flex flex-col rounded-3xl bg-[var(--surface)] border border-[var(--line)] shadow-2xl overflow-hidden text-[var(--text)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header toolbar (no-print) */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--line)] bg-[var(--surface-2)]/60 print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[var(--accent)]" />
            <span className="font-display font-bold text-base">
              {locale === 'en' ? 'Symptom Sheet for Technician' : 'मैकेनिक के लिए लक्षण पत्र'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-xs font-semibold hover:border-[var(--accent)] transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[var(--accent)]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? (locale === 'en' ? 'Copied' : 'कॉपी किया गया') : (locale === 'en' ? 'Copy Text' : 'टेक्स्ट कॉपी करें')}</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[var(--accent)] text-[var(--accent-ink)] text-xs font-bold hover:brightness-110 transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{locale === 'en' ? 'Print / Save PDF' : 'प्रिंट / पीडीएफ सेव करें'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-[var(--line)]/50 text-[var(--text-muted)] hover:text-[var(--text)] transition-colors cursor-pointer ml-2"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Sheet Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-sm bg-[var(--surface)] print:p-0 print:text-black">
          {/* Document Top Banner */}
          <div className="flex items-start justify-between border-b border-[var(--line)] pb-5">
            <div>
              <span className="font-mono text-xs text-[var(--accent)] font-bold tracking-widest uppercase block mb-1">
                TORQUEWELL AUTO · EVIDENCE PROTOCOL
              </span>
              <h2 className="text-2xl font-extrabold font-display">
                {locale === 'en' ? 'Vehicle Triage & Symptom Sheet' : 'वाहन जांच एवं लक्षण विवरण'}
              </h2>
              <p className="text-xs text-[var(--text-muted)] mt-1">
                {locale === 'en'
                  ? 'Present this sheet to any automotive technician to explain symptoms without confusion.'
                  : 'बिना किसी संकोच के किसी भी मैकेनिक को अपनी गाड़ी की समस्या स्पष्ट समझाने के लिए यह पत्र दिखाएं।'}
              </p>
            </div>

            <div className="text-right">
              <span className="font-mono text-xs text-[var(--text-muted)] block">
                {new Date().toLocaleDateString(locale === 'en' ? 'en-GB' : 'hi-IN')}
              </span>
              <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full font-mono text-[11px] uppercase font-bold bg-[var(--surface-2)] text-[var(--accent)] border border-[var(--line)]">
                {state.powertrain.toUpperCase()} · {result.level.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Safety Rating Banner */}
          <div
            className={`p-4 rounded-2xl border flex items-center gap-3.5 ${
              result.level === 'stop'
                ? 'bg-[var(--critical)]/10 border-[var(--critical)] text-[var(--critical)]'
                : result.level === 'careful'
                ? 'bg-[var(--amber)]/10 border-[var(--amber)] text-[var(--amber)]'
                : 'bg-[var(--teal)]/10 border-[var(--teal)] text-[var(--teal)]'
            }`}
          >
            {result.level === 'stop' ? (
              <ShieldAlert className="w-6 h-6 flex-shrink-0" />
            ) : (
              <AlertTriangle className="w-6 h-6 flex-shrink-0" />
            )}
            <div>
              <span className="font-bold text-sm uppercase font-mono block">
                {locale === 'en' ? `Recommended Action: ${result.level.toUpperCase()}` : `सिफारिश: ${result.level.toUpperCase()}`}
              </span>
              <span className="text-xs">
                {result.level === 'stop'
                  ? locale === 'en'
                    ? 'Do not drive further. Park vehicle safely on verge and arrange recovery transport.'
                    : 'गाड़ी आगे न चलाएं। सुरक्षित स्थान पर पार्क करें और रिकवरी वाहन की व्यवस्था करें।'
                  : locale === 'en'
                  ? 'Drive with caution directly to service bay. Avoid harsh acceleration or high speeds.'
                  : 'सावधानी से सीधे सर्विस सेंटर जाएं। तेज गति और अचानक ब्रेक लगाने से बचें।'}
              </span>
            </div>
          </div>

          {/* Reported Conditions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Symptoms list */}
            <div className="p-4 rounded-2xl bg-[var(--surface-2)]/50 border border-[var(--line)]/60 space-y-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-bold block">
                {locale === 'en' ? 'Reported Symptoms & Observations' : 'दर्ज किए गए लक्षण एवं संकेत'}
              </span>
              <ul className="space-y-1.5 text-xs">
                {selectedRedFlags.map((r) => (
                  <li key={r.id} className="text-[var(--critical)] font-semibold flex items-center gap-1.5">
                    <span>⚠</span> {r.label[locale]}
                  </li>
                ))}
                {selectedLights.map((l) => (
                  <li key={l.id} className="text-[var(--text)] flex items-center gap-1.5">
                    <span>•</span> {locale === 'en' ? `Warning Light: ${l.name.en}` : `चेतावनी लाइट: ${l.name.hi}`}
                  </li>
                ))}
                {selectedSymptoms.map((s) => (
                  <li key={s.id} className="text-[var(--text)] flex items-center gap-1.5">
                    <span>•</span> {s.label[locale]}
                  </li>
                ))}
              </ul>
            </div>

            {/* Areas for Technician to Inspect */}
            <div className="p-4 rounded-2xl bg-[var(--surface-2)]/50 border border-[var(--line)]/60 space-y-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--accent)] font-bold block">
                {locale === 'en' ? 'Areas Technician Should Inspect' : 'मैकेनिक द्वारा जांचे जाने वाले प्रमुख हिस्से'}
              </span>
              <ul className="space-y-1.5 text-xs text-[var(--text)]">
                {result.areas.map((a, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-[var(--accent)] font-bold">✓</span>
                    <span>{a[locale]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Questions to Ask & Notes */}
          <div className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <h3 className="font-bold text-sm font-display text-[var(--text)]">
                {locale === 'en' ? 'What to Tell the Technician' : 'मैकेनिक को क्या बताएं'}
              </h3>
              <ul className="space-y-1 text-xs text-[var(--text-muted)] list-disc pl-4">
                {result.note.map((n, i) => (
                  <li key={i}>{n[locale]}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-1.5">
              <h3 className="font-bold text-sm font-display text-[var(--text)]">
                {locale === 'en' ? 'Questions to Ask Before Approving Repairs' : 'काम शुरू कराने से पहले जरूरी सवाल'}
              </h3>
              <ul className="space-y-1 text-xs text-[var(--text-muted)] list-disc pl-4">
                {result.ask.map((q, i) => (
                  <li key={i}>{q[locale]}</li>
                ))}
                <li>{locale === 'en' ? 'Can you provide photo evidence of worn components before replacement?' : 'क्या आप बदलने से पहले पुराने खराब पार्ट्स की फोटो दिखाएंगे?'}</li>
              </ul>
            </div>
          </div>

          {/* Mandatory Safety Line & Disclaimers */}
          <div className="pt-6 border-t border-[var(--line)] text-[11px] text-[var(--text-muted)] space-y-1.5">
            <p className="font-semibold text-[var(--text)]">
              {locale === 'en'
                ? 'Indicative only · Not a diagnosis or quotation · An in-person inspection and written estimate come first.'
                : 'केवल सांकेतिक · यह कोई अंतिम डायग्नोसिस या कोटेशन नहीं है · इन-पर्सन जांच और लिखित अनुमान पहले आवश्यक है।'}
            </p>
            <p>
              {locale === 'en'
                ? 'This website cannot diagnose mechanical or electrical faults without physical equipment. Never work beneath a vehicle supported only by a jack.'
                : 'यह वेबसाइट बिना भौतिक उपकरणों के वाहन की तकनीकी जांच नहीं कर सकती। केवल जैक पर टिकी गाड़ी के नीचे कभी न जाएं।'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
