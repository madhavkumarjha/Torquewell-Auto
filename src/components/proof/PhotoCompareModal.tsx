import React, { useEffect } from 'react';
import { X, ZoomIn, ShieldCheck, AlertTriangle } from 'lucide-react';
import { Locale } from '@/types';

interface PhotoCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  comparison: {
    yourPartPhoto: string;
    newPartPhoto: string;
    yourLabel: { en: string; hi: string };
    newLabel: { en: string; hi: string };
  };
  measuredNote: string;
  locale: Locale;
}

export const PhotoCompareModal: React.FC<PhotoCompareModalProps> = ({
  isOpen,
  onClose,
  title,
  comparison,
  measuredNote,
  locale
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="compare-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
    >
      <div className="relative w-full max-w-4xl bg-[var(--surface)] border border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)] bg-[var(--surface-muted)]">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)]">
              <ZoomIn className="w-5 h-5" />
            </span>
            <div>
              <h2 id="compare-modal-title" className="text-lg font-bold text-[var(--text)]">
                {title}
              </h2>
              <p className="text-xs font-mono text-[var(--text-muted)]">
                {locale === 'hi'
                  ? 'डिजिटल माइक्रोमीटर फोटो तुलना · आपका पुर्जा बनाम नया पुर्जा'
                  : 'Digital Micrometer Visual Comparison · Your Component vs Factory New Benchmark'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface)] rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Side-by-side Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Your Component */}
            <div className="border border-red-500/30 rounded-xl overflow-hidden bg-red-950/10 p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-red-400 bg-red-500/10 px-2.5 py-1 rounded-md border border-red-500/20">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {comparison.yourLabel[locale]}
                </span>
                <span className="text-[11px] font-mono text-[var(--text-muted)]">
                  {locale === 'hi' ? 'कैलिपर से मापा गया' : 'Caliper Verified'}
                </span>
              </div>

              <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-red-500/20 bg-black flex items-center justify-center">
                <img
                  src={comparison.yourPartPhoto}
                  alt={comparison.yourLabel[locale]}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="mt-3 text-xs text-[var(--text-muted)]">
                <strong className="text-red-400 font-semibold">
                  {locale === 'hi' ? 'अवलोकन:' : 'Finding observation:'}
                </strong>{' '}
                {measuredNote}
              </div>
            </div>

            {/* Right: New Factory Spec Component */}
            <div className="border border-emerald-500/30 rounded-xl overflow-hidden bg-emerald-950/10 p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {comparison.newLabel[locale]}
                </span>
                <span className="text-[11px] font-mono text-[var(--text-muted)]">
                  {locale === 'hi' ? 'फैक्ट्री मानक' : 'TorqueSpec Benchmark'}
                </span>
              </div>

              <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-emerald-500/20 bg-black flex items-center justify-center">
                <img
                  src={comparison.newPartPhoto}
                  alt={comparison.newLabel[locale]}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="mt-3 text-xs text-[var(--text-muted)]">
                <strong className="text-emerald-400 font-semibold">
                  {locale === 'hi' ? 'मानक विशिष्टता:' : 'Benchmark spec:'}
                </strong>{' '}
                {locale === 'hi'
                  ? 'फैक्ट्री मानक पुर्जा पूर्ण घर्षण सामग्री और पूर्ण सुरक्षा मार्जिन प्रदान करता है।'
                  : 'Factory standard replacement provides full friction thickness, chamfered noise suppression, and 24-month warranty.'}
              </div>
            </div>
          </div>

          {/* Calibrated Advice Footer */}
          <div className="p-4 rounded-xl bg-[var(--surface-muted)] border border-[var(--border)] text-xs flex items-center justify-between">
            <span className="text-[var(--text-muted)]">
              {locale === 'hi'
                ? 'टॉर्कवेल ऑटो प्रतिज्ञा: सभी बदले गए पुराने पुर्जे आपकी मांग पर हैंडओवर के समय दिखाए जाते हैं।'
                : 'Torquewell Auto Standard: All removed components are retained for customer inspection upon vehicle collection.'}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-[var(--surface)] hover:bg-[var(--border)] text-[var(--text)] font-semibold transition-colors"
            >
              {locale === 'hi' ? 'बंद करें' : 'Close View'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
