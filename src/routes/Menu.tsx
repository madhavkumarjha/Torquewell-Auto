import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SERVICE_PACKAGES, COMPARISON_CRITERIA } from '@/data/packages';
import { usePrefs } from '@/store/prefs';
import { Locale } from '@/types';
import {
  Check,
  X,
  Clock,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Layers,
  HelpCircle
} from 'lucide-react';

export default function Menu() {
  const { locale } = usePrefs() as { locale: Locale };
  const [showMatrix, setShowMatrix] = useState(true);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[var(--border)]">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent)] font-semibold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            {locale === 'hi' ? 'नियत-दायरा पारदर्शी पैकेज' : 'Fixed-Scope Service Packages'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text)] mt-2">
            {locale === 'hi' ? 'सर्विस मेनू और पैकेज तुलना' : 'Service Menu & Package Comparison'}
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-2 max-w-2xl leading-relaxed">
            {locale === 'hi'
              ? 'स्पष्ट मूल्य सीमाएं, शून्य फर्जी छूट। हम स्पष्ट रूप से बताते हैं कि प्रत्येक पैकेज में क्या शामिल है और क्या शामिल नहीं है।'
              : 'Clear price ranges with exact assumptions. No bogus discounts or inflated original prices. We tell you upfront what is included and what is not.'}
          </p>
        </div>

        <Link
          to="/prices"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs border border-[var(--border)] hover:bg-[var(--surface-muted)] text-[var(--text)] transition-colors flex-shrink-0"
        >
          {locale === 'hi' ? 'उचित मूल्य अनुमानक खोलें' : 'Open Fair-Price Estimator'}
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 3 Primary Package Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SERVICE_PACKAGES.map((pkg, idx) => {
          const isFeatured = pkg.id === 'pkg-full';
          return (
            <div
              key={pkg.id}
              className={`rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all bg-[var(--surface)] ${
                isFeatured
                  ? 'border-2 border-[var(--accent)] shadow-lg shadow-[var(--accent)]/5 relative'
                  : 'border border-[var(--border)] shadow-sm'
              }`}
            >
              {isFeatured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[var(--accent)] text-[var(--accent-fg)] font-mono text-[10px] font-bold tracking-wider uppercase">
                  {locale === 'hi' ? 'सर्वाधिक लोकप्रिय' : 'Most Popular Annual Choice'}
                </div>
              )}

              <div>
                {/* Package Header */}
                <div className="mb-4">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)]">
                    Tier 0{idx + 1}
                  </span>
                  <h2 className="text-xl font-bold text-[var(--text)] mt-1">
                    {pkg.name[locale]}
                  </h2>
                </div>

                {/* Price & Duration */}
                <div className="p-4 rounded-xl bg-[var(--surface-muted)] border border-[var(--border)] mb-6">
                  <div className="text-2xl font-mono font-bold text-[var(--text)]">
                    £{pkg.priceBand[0]} – £{pkg.priceBand[1]}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--text-muted)] mt-1">
                    <Clock className="w-3.5 h-3.5 text-[var(--accent)]" />
                    <span>
                      {pkg.timeRangeMin[0]}–{pkg.timeRangeMin[1]} mins bay time
                    </span>
                  </div>
                </div>

                {/* What's INCLUDED */}
                <div className="space-y-3 mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-500 block">
                    {locale === 'hi' ? '✓ क्या शामिल है:' : '✓ What is Included:'}
                  </span>
                  <ul className="space-y-2 text-xs text-[var(--text)]">
                    {pkg.included.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{item[locale]}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What's NOT INCLUDED (Transparency) */}
                <div className="space-y-3 mb-6 pt-4 border-t border-[var(--border)]">
                  <span className="text-xs font-bold uppercase tracking-wider text-red-400 block">
                    {locale === 'hi' ? '✗ क्या शामिल नहीं है (पारदर्शिता):' : '✗ What is NOT Included (Honest Scope):'}
                  </span>
                  <ul className="space-y-2 text-xs text-[var(--text-muted)]">
                    {pkg.notIncluded.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <X className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{item[locale]}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-[var(--border)]">
                <Link
                  to={`/book?package=${pkg.id}`}
                  className={`w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs transition-opacity shadow-sm ${
                    isFeatured
                      ? 'bg-[var(--accent)] text-[var(--accent-fg)] hover:opacity-95'
                      : 'bg-[var(--surface-muted)] hover:bg-[var(--border)] text-[var(--text)] border border-[var(--border)]'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  {locale === 'hi' ? 'यह पैकेज बुक करें' : 'Book This Package'}
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Side-by-Side Comparison Matrix */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[var(--accent)]" />
            <h2 className="text-xl font-bold text-[var(--text)]">
              {locale === 'hi' ? 'विस्तृत चेकलिस्ट तुलना तालिका' : 'Checklist Side-by-Side Comparison Matrix'}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setShowMatrix((prev) => !prev)}
            className="text-xs font-bold text-[var(--accent)] hover:underline self-start sm:self-auto"
          >
            {showMatrix
              ? locale === 'hi' ? 'तालिका संक्षिप्त करें' : 'Collapse Matrix'
              : locale === 'hi' ? 'तालिका दिखाएं' : 'Show Full Matrix'}
          </button>
        </div>

        {showMatrix && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-[var(--border)] text-[var(--text-muted)]">
                  <th className="pb-3 pr-4 font-semibold">Service Checkpoint</th>
                  <th className="pb-3 px-4 font-bold text-[var(--text)] text-center w-28">Essential</th>
                  <th className="pb-3 px-4 font-bold text-[var(--accent)] text-center w-28">Full</th>
                  <th className="pb-3 px-4 font-bold text-[var(--text)] text-center w-28">Major</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {COMPARISON_CRITERIA.map((criterion) => (
                  <tr key={criterion.id} className="hover:bg-[var(--surface-muted)]">
                    <td className="py-3 pr-4 text-[var(--text)]">
                      <span className="font-semibold block">{criterion.label[locale]}</span>
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">
                        {criterion.category[locale]}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      {criterion.essential ? (
                        <Check className="w-4 h-4 text-emerald-500 mx-auto" />
                      ) : (
                        <span className="text-neutral-500">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center bg-[var(--accent)]/5">
                      {criterion.full ? (
                        <Check className="w-4 h-4 text-emerald-500 mx-auto" />
                      ) : (
                        <span className="text-neutral-500">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {criterion.major ? (
                        <Check className="w-4 h-4 text-emerald-500 mx-auto" />
                      ) : (
                        <span className="text-neutral-500">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Honest Workshop Policy Callout */}
      <div className="p-6 rounded-2xl bg-[var(--surface-muted)] border border-[var(--border)] text-xs text-[var(--text-muted)] space-y-2">
        <strong className="text-[var(--text)] text-sm flex items-center gap-1.5 font-bold">
          <HelpCircle className="w-4 h-4 text-[var(--accent)]" />
          {locale === 'hi' ? 'हमारी पैकेज नीति:' : 'Our Fixed-Scope Pricing Policy:'}
        </strong>
        <p className="leading-relaxed">
          {locale === 'hi'
            ? 'हम कभी भी प्रारंभिक मूल्य को कृत्रिम रूप से बढ़ाकर "30% की छूट" का दावा नहीं करते। कीमतें वास्तविक मानक घंटों और वास्तविक पुर्जों की लागत पर आधारित हैं।'
            : 'We do not inflate baseline rates to advertise artificial "30% OFF seasonal specials." All package figures reflect genuine standard manufacturer flat-rate hours and premium fluid specifications.'}
        </p>
      </div>
    </div>
  );
}
