import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { InspectionFinding } from '@/data/proof-reports';
import { MeasurementGauge } from './MeasurementGauge';
import { PhotoCompareModal } from './PhotoCompareModal';
import { Badge } from '@/components/ui/Badge';
import { Eye, HelpCircle, ArrowRight, Camera, Wrench } from 'lucide-react';
import { Locale } from '@/types';

interface FindingCardProps {
  finding: InspectionFinding;
  locale: Locale;
}

export const FindingCard: React.FC<FindingCardProps> = ({ finding, locale }) => {
  const [explainSimply, setExplainSimply] = useState(false);
  const [photoModalOpen, setPhotoModalOpen] = useState(false);

  const urgencyBadgeProps: Record<
    InspectionFinding['urgency'],
    { variant: 'now' | 'soon' | 'watch' | 'ok'; label: string }
  > = {
    now: { variant: 'now', label: locale === 'hi' ? 'तत्काल आवश्यक' : 'Needed Now' },
    soon: { variant: 'soon', label: locale === 'hi' ? 'शीघ्र (30 दिन)' : 'Soon' },
    watch: { variant: 'watch', label: locale === 'hi' ? 'निगरानी' : 'Watch' },
    ok: { variant: 'ok', label: locale === 'hi' ? 'पास / सामान्य' : 'Pass (OK)' }
  };

  const systemLabels: Record<string, { en: string; hi: string }> = {
    brakes: { en: 'Brakes & Hydraulics', hi: 'ब्रेक और हाइड्रोलिक्स' },
    tyres: { en: 'Tyres & Alignment', hi: 'टायर और अलाइनमेंट' },
    suspension: { en: 'Suspension & Steering', hi: 'सस्पेंशन और स्टीयरिंग' },
    fluids: { en: 'Fluids & Lubricants', hi: 'तरल पदार्थ और स्नेहक' },
    electrical: { en: 'Battery & Electrics', hi: 'बैटरी और इलेक्ट्रिकल' },
    powertrain: { en: 'Engine & Powertrain', hi: 'इंजन और पावरट्रेन' },
    chassis: { en: 'Underside & Chassis', hi: 'चेसिस और निचला भाग' },
    safety: { en: 'Road Safety Equipment', hi: 'सड़क सुरक्षा उपकरण' }
  };

  return (
    <div
      className={`border rounded-2xl p-6 transition-all bg-[var(--surface)] ${
        finding.urgency === 'now'
          ? 'border-red-500/40 shadow-sm shadow-red-500/5'
          : finding.urgency === 'soon'
          ? 'border-amber-500/40'
          : 'border-[var(--border)]'
      }`}
    >
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <Badge variant={urgencyBadgeProps[finding.urgency].variant}>
            {urgencyBadgeProps[finding.urgency].label}
          </Badge>
          <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[var(--surface-muted)] text-[var(--text-muted)] border border-[var(--border)]">
            {systemLabels[finding.system] ? systemLabels[finding.system][locale] : finding.system}
          </span>
        </div>

        {/* Explain Simply Toggle */}
        <button
          type="button"
          onClick={() => setExplainSimply((prev) => !prev)}
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-colors border ${
            explainSimply
              ? 'bg-[var(--accent)] text-[var(--accent-fg)] border-[var(--accent)]'
              : 'bg-[var(--surface-muted)] text-[var(--text-muted)] hover:text-[var(--text)] border-[var(--border)]'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          {explainSimply
            ? locale === 'hi'
              ? 'तकनीकी विवरण देखें'
              : 'Show Technical Spec'
            : locale === 'hi'
            ? 'सरल भाषा में समझें'
            : 'Explain Simply'}
        </button>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-[var(--text)] mb-3 leading-snug">
        {finding.title[locale]}
      </h3>

      {/* Measurement Gauge if applicable */}
      {finding.measured && (
        <div className="mb-5">
          <MeasurementGauge
            measured={finding.measured}
            urgency={finding.urgency}
            locale={locale}
          />
        </div>
      )}

      {/* Evidence Photo Preview & Modal Trigger */}
      {finding.comparison && (
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-[var(--surface-muted)] border border-[var(--border)]">
          <div className="flex items-center gap-3">
            <div className="w-16 h-12 rounded-lg overflow-hidden border border-[var(--border)] bg-black flex-shrink-0 flex items-center justify-center">
              <img
                src={finding.comparison.yourPartPhoto}
                alt="Worn part preview"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="text-xs font-semibold text-[var(--text)] flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-[var(--accent)]" />
                {locale === 'hi' ? 'डिजिटल माइक्रोमीटर फोटो उपलब्ध' : 'Digital Micrometer Inspection Photo'}
              </div>
              <div className="text-[11px] text-[var(--text-muted)]">
                {locale === 'hi'
                  ? 'आपके घिसे हुए पुर्जे और नए पुर्जे की सीधी तुलना देखें'
                  : 'Side-by-side comparison with factory new component spec'}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setPhotoModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[var(--surface)] hover:bg-[var(--accent)] hover:text-[var(--accent-fg)] border border-[var(--border)] transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            {locale === 'hi' ? 'पुर्जा देखें' : 'Show me the part'}
          </button>
        </div>
      )}

      {/* Description / Explanation Content */}
      <div className="space-y-3 text-sm text-[var(--text-muted)] leading-relaxed mb-5">
        <div>
          <strong className="text-[var(--text)] block text-xs font-semibold uppercase tracking-wider mb-1">
            {locale === 'hi' ? 'यह क्यों महत्वपूर्ण है:' : 'Why it matters:'}
          </strong>
          <p className={explainSimply ? 'text-[var(--text)] font-medium' : ''}>
            {explainSimply ? finding.simpleWhy[locale] : finding.why[locale]}
          </p>
        </div>

        {finding.urgency !== 'ok' && (
          <div className="pt-2 border-t border-[var(--border)]">
            <strong className="text-red-400 block text-xs font-semibold uppercase tracking-wider mb-1">
              {locale === 'hi' ? 'यदि आप प्रतीक्षा करते हैं:' : 'What happens if you wait:'}
            </strong>
            <p>{finding.ifWait[locale]}</p>
          </div>
        )}

        {finding.options && finding.options.length > 0 && (
          <div className="pt-2 border-t border-[var(--border)]">
            <strong className="text-[var(--text)] block text-xs font-semibold uppercase tracking-wider mb-1">
              {locale === 'hi' ? 'आपके विकल्प:' : 'Your options:'}
            </strong>
            <ul className="space-y-1 list-disc list-inside text-xs">
              {finding.options.map((opt, i) => (
                <li key={i}>{opt[locale]}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Deep-link Action to Fair-Price Calculator */}
      {finding.linkedJobId && (
        <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between">
          <span className="text-xs text-[var(--text-muted)]">
            {locale === 'hi'
              ? 'पारदर्शी लेबर घंटे और पुर्जों के स्तर की गणना देखें'
              : 'Calculate transparent parts tiers & labour rate'}
          </span>
          <Link
            to={`/prices?job=${finding.linkedJobId}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--accent)] hover:underline"
          >
            <Wrench className="w-3.5 h-3.5" />
            {locale === 'hi' ? 'उचित मूल्य ब्रेकडाउन देखें' : 'Calculate Fair-Price'}
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      )}

      {/* Photo Comparison Modal */}
      {finding.comparison && (
        <PhotoCompareModal
          isOpen={photoModalOpen}
          onClose={() => setPhotoModalOpen(false)}
          title={finding.title[locale]}
          comparison={finding.comparison}
          measuredNote={finding.why[locale]}
          locale={locale}
        />
      )}
    </div>
  );
};
