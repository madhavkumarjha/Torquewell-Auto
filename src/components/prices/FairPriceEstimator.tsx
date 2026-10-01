import React, { useState, useMemo } from 'react';
import {
  FAIR_PRICE_JOBS,
  PARTS_TIERS,
  PartsTierKey,
  calculateJobCost,
  QUESTIONS_TO_ASK_ANY_GARAGE
} from '@/data/fair-prices';
import { Badge } from '@/components/ui/Badge';
import {
  ShieldCheck,
  FileText,
  HelpCircle,
  Info,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Locale } from '@/types';

interface FairPriceEstimatorProps {
  initialJobId?: string;
  locale: Locale;
}

export const FairPriceEstimator: React.FC<FairPriceEstimatorProps> = ({
  initialJobId,
  locale
}) => {
  const [selectedJobIds, setSelectedJobIds] = useState<string[]>(() =>
    initialJobId ? [initialJobId] : ['job-front-pads-discs', 'job-brake-fluid']
  );
  const [selectedTier, setSelectedTier] = useState<PartsTierKey>('oe');
  const [onlyNeededNow, setOnlyNeededNow] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [pdfModalOpen, setPdfModalOpen] = useState(false);

  const labourRatePerHour = 90; // Standard baseline workshop rate £90/hr

  // Filter jobs based on "Only what's needed now"
  const availableJobs = useMemo(() => {
    if (onlyNeededNow) {
      return FAIR_PRICE_JOBS.filter((j) => j.urgency === 'now');
    }
    return FAIR_PRICE_JOBS;
  }, [onlyNeededNow]);

  // Active jobs that are both selected and available under current filter
  const activeJobs = useMemo(() => {
    return availableJobs.filter((j) => selectedJobIds.includes(j.id));
  }, [availableJobs, selectedJobIds]);

  const toggleJob = (id: string) => {
    setSelectedJobIds((prev) =>
      prev.includes(id) ? prev.filter((j) => j !== id) : [...prev, id]
    );
  };

  // Aggregate calculations
  const totals = useMemo(() => {
    let minLabour = 0;
    let maxLabour = 0;
    let minParts = 0;
    let maxParts = 0;
    let minConsumables = 0;
    let maxConsumables = 0;
    let minDisposal = 0;
    let maxDisposal = 0;
    let minSubtotal = 0;
    let maxSubtotal = 0;
    let minVat = 0;
    let maxVat = 0;
    let minTotal = 0;
    let maxTotal = 0;
    let totalHoursMin = 0;
    let totalHoursMax = 0;

    activeJobs.forEach((job) => {
      const cost = calculateJobCost(job, selectedTier, labourRatePerHour);
      minLabour += cost.minLabour;
      maxLabour += cost.maxLabour;
      minParts += cost.minParts;
      maxParts += cost.maxParts;
      minConsumables += cost.minConsumables;
      maxConsumables += cost.maxConsumables;
      minDisposal += cost.minDisposal;
      maxDisposal += cost.maxDisposal;
      minSubtotal += cost.minSubtotal;
      maxSubtotal += cost.maxSubtotal;
      minVat += cost.minVat;
      maxVat += cost.maxVat;
      minTotal += cost.minTotal;
      maxTotal += cost.maxTotal;
      totalHoursMin += job.labourHours[0];
      totalHoursMax += job.labourHours[1];
    });

    const avgTotal = (minTotal + maxTotal) / 2 || 1;
    const avgLabour = (minLabour + maxLabour) / 2;
    const avgParts = (minParts + maxParts) / 2;
    const avgConsumables = (minConsumables + maxConsumables) / 2;
    const avgDisposal = (minDisposal + maxDisposal) / 2;
    const avgVat = (minVat + maxVat) / 2;

    const labourPct = (avgLabour / avgTotal) * 100;
    const partsPct = (avgParts / avgTotal) * 100;
    const consumablesPct = ((avgConsumables + avgDisposal) / avgTotal) * 100;
    const vatPct = (avgVat / avgTotal) * 100;

    return {
      minLabour,
      maxLabour,
      minParts,
      maxParts,
      minConsumables,
      maxConsumables,
      minDisposal,
      maxDisposal,
      minSubtotal,
      maxSubtotal,
      minVat,
      maxVat,
      minTotal,
      maxTotal,
      totalHoursMin,
      totalHoursMax,
      labourPct,
      partsPct,
      consumablesPct,
      vatPct
    };
  }, [activeJobs, selectedTier]);

  const currentTierObj = PARTS_TIERS.find((t) => t.key === selectedTier) || PARTS_TIERS[0];

  return (
    <div className="space-y-8">
      {/* Top Filter Controls */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[var(--border)]">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent)] font-semibold">
              {locale === 'hi' ? 'पारदर्शी मूल्य मॉडल' : 'Transparent Pricing Engine'}
            </span>
            <h2 className="text-xl font-bold text-[var(--text)] mt-1">
              {locale === 'hi'
                ? 'उचित मूल्य अनुमानक: लेबर घंटे × पुर्जों के स्तर'
                : 'Fair-Price Breakdown: Labour Hours × Parts Tiers'}
            </h2>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              {locale === 'hi'
                ? `मानक कार्यशाला दर: £${labourRatePerHour}/घंटा · कोई छिपा हुआ शुल्क नहीं · लिखित सहमति से पहले कोई काम नहीं`
                : `Baseline workshop rate: £${labourRatePerHour}/hr · Zero hidden markups · Written authorization first`}
            </p>
          </div>

          {/* "Only what's needed now" Interactive Toggle */}
          <div className="flex items-center gap-3 bg-[var(--surface-muted)] border border-[var(--border)] p-2 rounded-xl">
            <button
              type="button"
              onClick={() => setOnlyNeededNow((prev) => !prev)}
              role="switch"
              aria-label="Only what's needed now"
              aria-checked={onlyNeededNow}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                onlyNeededNow ? 'bg-red-500' : 'bg-neutral-600'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  onlyNeededNow ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
            <div className="text-xs">
              <span className="font-bold text-[var(--text)] block">
                {locale === 'hi' ? 'केवल तत्काल आवश्यक (Now)' : "Only what's needed now"}
              </span>
              <span className="text-[11px] text-[var(--text-muted)]">
                {locale === 'hi' ? 'सुरक्षित रूप से टाले जा सकने वाले काम हटाएं' : 'Excludes soon/watch items'}
              </span>
            </div>
          </div>
        </div>

        {/* Parts Tier Selection Tabs */}
        <div className="pt-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              {locale === 'hi' ? 'पुर्जों का स्तर चुनें:' : 'Select Certified Parts Tier:'}
            </span>
            <span className="text-xs font-mono text-[var(--accent)] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              {currentTierObj.warrantyMonths} {locale === 'hi' ? 'महीने लिखित वारंटी' : 'Months Written Warranty'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {PARTS_TIERS.map((tier) => (
              <button
                key={tier.key}
                type="button"
                onClick={() => setSelectedTier(tier.key)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  selectedTier === tier.key
                    ? 'border-[var(--accent)] ring-2 ring-[var(--accent)]/20 bg-[var(--accent)]/5'
                    : 'border-[var(--border)] hover:border-[var(--border-strong)] bg-[var(--surface-muted)]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-sm text-[var(--text)]">
                    {tier.label[locale]}
                  </span>
                  <Badge variant={tier.key === 'oe' ? 'ok' : 'neutral'}>
                    {tier.warrantyMonths}M
                  </Badge>
                </div>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  {tier.description[locale]}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Job Checkbox Selection Grid */}
        <div className="pt-6 mt-6 border-t border-[var(--border)]">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] block mb-3">
            {locale === 'hi' ? 'अनुमान में शामिल मरम्मत कार्य:' : 'Select Repair Items to Include:'}
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {availableJobs.map((job) => {
              const isSelected = selectedJobIds.includes(job.id);
              const jobCost = calculateJobCost(job, selectedTier, labourRatePerHour);
              return (
                <div
                  key={job.id}
                  onClick={() => toggleJob(job.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                    isSelected
                      ? 'border-[var(--accent)] bg-[var(--surface-muted)]'
                      : 'border-[var(--border)] opacity-60 hover:opacity-100 bg-[var(--surface)]'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => {}} // Handled by div click
                    className="mt-1 rounded text-[var(--accent)] focus:ring-[var(--accent)]"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="font-semibold text-xs text-[var(--text)] truncate">
                        {job.name[locale]}
                      </span>
                      <Badge variant={job.urgency}>{job.urgency.toUpperCase()}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
                      <span>
                        {job.labourHours[0]}–{job.labourHours[1]} hrs
                      </span>
                      <span className="font-bold text-[var(--text)]">
                        £{jobCost.minTotal.toFixed(0)}–£{jobCost.maxTotal.toFixed(0)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Calculation & Stacked Bar Breakdown */}
      {activeJobs.length === 0 ? (
        <div className="p-8 text-center border border-dashed border-[var(--border)] rounded-2xl bg-[var(--surface-muted)] text-[var(--text-muted)]">
          <AlertCircle className="w-8 h-8 mx-auto mb-2 text-amber-500" />
          <p className="font-semibold text-sm text-[var(--text)]">
            {locale === 'hi' ? 'कोई मरम्मत कार्य चयनित नहीं है' : 'No repair items selected'}
          </p>
          <p className="text-xs mt-1">
            {locale === 'hi'
              ? 'अनुमान देखने के लिए ऊपर दिए गए कार्यों में से चुनें।'
              : 'Check one or more items above to view the transparent price breakdown.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Stacked Cost Visual & Itemised Table */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stacked Cost Bar Card */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  {locale === 'hi' ? 'लागत वितरण (अनुपातिक)' : 'Proportional Cost Distribution'}
                </span>
                <span className="text-xs font-mono text-[var(--text-muted)]">
                  {locale === 'hi' ? 'कुल कार्य समय:' : 'Estimated bay time:'}{' '}
                  <strong className="text-[var(--text)]">
                    {totals.totalHoursMin.toFixed(1)}–{totals.totalHoursMax.toFixed(1)} hrs
                  </strong>
                </span>
              </div>

              {/* Stacked Bar Visual */}
              <div className="w-full h-8 rounded-xl overflow-hidden flex border border-[var(--border)] my-3 bg-neutral-900 select-none">
                {/* Labour Segment */}
                <div
                  style={{ width: `${totals.labourPct}%` }}
                  className="bg-amber-500 h-full flex items-center justify-center text-[10px] font-bold text-black overflow-hidden px-1 transition-all"
                  title={`Labour: £${totals.minLabour.toFixed(0)} - £${totals.maxLabour.toFixed(0)}`}
                >
                  {totals.labourPct > 15 ? 'Labour' : ''}
                </div>
                {/* Parts Segment */}
                <div
                  style={{ width: `${totals.partsPct}%` }}
                  className="bg-sky-500 h-full flex items-center justify-center text-[10px] font-bold text-black overflow-hidden px-1 transition-all"
                  title={`Parts: £${totals.minParts.toFixed(0)} - £${totals.maxParts.toFixed(0)}`}
                >
                  {totals.partsPct > 15 ? 'Parts' : ''}
                </div>
                {/* Consumables Segment */}
                <div
                  style={{ width: `${totals.consumablesPct}%` }}
                  className="bg-emerald-500 h-full flex items-center justify-center text-[10px] font-bold text-black overflow-hidden px-1 transition-all"
                  title={`Consumables: £${(totals.minConsumables + totals.minDisposal).toFixed(0)}`}
                >
                  {totals.consumablesPct > 10 ? 'Misc' : ''}
                </div>
                {/* VAT Segment */}
                <div
                  style={{ width: `${totals.vatPct}%` }}
                  className="bg-neutral-600 h-full flex items-center justify-center text-[10px] font-bold text-white overflow-hidden px-1 transition-all"
                  title={`VAT (20%): £${totals.minVat.toFixed(0)} - £${totals.maxVat.toFixed(0)}`}
                >
                  {totals.vatPct > 10 ? 'VAT' : ''}
                </div>
              </div>

              {/* Legend with numbers */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-amber-500 flex-shrink-0" />
                  <span className="text-[var(--text-muted)]">
                    Labour: <strong className="text-[var(--text)]">£{totals.minLabour.toFixed(0)}–£{totals.maxLabour.toFixed(0)}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-sky-500 flex-shrink-0" />
                  <span className="text-[var(--text-muted)]">
                    Parts: <strong className="text-[var(--text)]">£{totals.minParts.toFixed(0)}–£{totals.maxParts.toFixed(0)}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-emerald-500 flex-shrink-0" />
                  <span className="text-[var(--text-muted)]">
                    Consumables: <strong className="text-[var(--text)]">£{(totals.minConsumables + totals.minDisposal).toFixed(0)}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-neutral-600 flex-shrink-0" />
                  <span className="text-[var(--text-muted)]">
                    VAT (20%): <strong className="text-[var(--text)]">£{totals.minVat.toFixed(0)}–£{totals.maxVat.toFixed(0)}</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Itemised Calculation Table */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 shadow-sm overflow-x-auto">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--text)] mb-4">
                {locale === 'hi' ? 'मदवार पारदर्शी लागत विवरण' : 'Itemised Line-by-Line Breakdown'}
              </h3>

              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[var(--border)] text-[var(--text-muted)]">
                    <th className="pb-3 font-semibold">Service Item</th>
                    <th className="pb-3 font-semibold font-mono">Labour (hrs × £90)</th>
                    <th className="pb-3 font-semibold font-mono">Parts ({selectedTier.toUpperCase()})</th>
                    <th className="pb-3 font-semibold font-mono">Consumables &amp; Disp</th>
                    <th className="pb-3 font-semibold font-mono text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {activeJobs.map((job) => {
                    const c = calculateJobCost(job, selectedTier, labourRatePerHour);
                    return (
                      <tr key={job.id} className="hover:bg-[var(--surface-muted)]">
                        <td className="py-3 font-medium text-[var(--text)]">
                          {job.name[locale]}
                        </td>
                        <td className="py-3 font-mono text-[var(--text-muted)]">
                          {job.labourHours[0]}–{job.labourHours[1]} h (£{c.minLabour.toFixed(0)}–£{c.maxLabour.toFixed(0)})
                        </td>
                        <td className="py-3 font-mono text-[var(--text-muted)]">
                          £{c.minParts.toFixed(0)}–£{c.maxParts.toFixed(0)}
                        </td>
                        <td className="py-3 font-mono text-[var(--text-muted)]">
                          £{(c.minConsumables + c.minDisposal).toFixed(0)}–£{(c.maxConsumables + c.maxDisposal).toFixed(0)}
                        </td>
                        <td className="py-3 font-mono font-bold text-[var(--text)] text-right">
                          £{c.minSubtotal.toFixed(0)}–£{c.maxSubtotal.toFixed(0)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-[var(--border)] font-bold text-sm">
                    <td colSpan={4} className="pt-4 text-[var(--text)]">
                      {locale === 'hi' ? 'कुल अनुमान (वैट सहित):' : 'Estimated Total (inc. 20% VAT):'}
                    </td>
                    <td className="pt-4 font-mono text-right text-[var(--accent)] text-base">
                      £{totals.minTotal.toFixed(0)} – £{totals.maxTotal.toFixed(0)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Right Col: Grand Total Summary Card & Actions */}
          <div className="space-y-6">
            {/* Grand Total Price Card */}
            <div className="bg-[var(--surface)] border-2 border-[var(--accent)]/40 rounded-2xl p-6 shadow-md flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent)] font-semibold block mb-1">
                  {locale === 'hi' ? 'लिखित अनुमोदन आवश्यक' : 'Written Authorization Baseline'}
                </span>
                <div className="text-3xl font-mono font-bold text-[var(--text)] tracking-tight">
                  £{totals.minTotal.toFixed(0)} – £{totals.maxTotal.toFixed(0)}
                </div>
                <p className="text-xs text-[var(--text-muted)] mt-1">
                  {locale === 'hi'
                    ? `चुना गया स्तर: ${currentTierObj.label[locale]} · ${currentTierObj.warrantyMonths} महीने वारंटी`
                    : `Selected: ${currentTierObj.label[locale]} · ${currentTierObj.warrantyMonths}M Warranty`}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-6 border-t border-[var(--border)] space-y-3">
                <button
                  type="button"
                  onClick={() => setPdfModalOpen(true)}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs bg-[var(--accent)] text-[var(--accent-fg)] hover:opacity-95 transition-opacity shadow-sm"
                >
                  <FileText className="w-4 h-4" />
                  {locale === 'hi' ? 'अनुमान ब्रेकडाउन PDF डाउनलोड करें' : 'Download Estimate PDF'}
                </button>

                <button
                  type="button"
                  onClick={() => setShowQuestions((prev) => !prev)}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-semibold text-xs border border-[var(--border)] hover:bg-[var(--surface-muted)] text-[var(--text)] transition-colors"
                >
                  <HelpCircle className="w-4 h-4 text-[var(--accent)]" />
                  {showQuestions
                    ? locale === 'hi'
                      ? 'सवाल छिपाएं'
                      : 'Hide Garage Questions'
                    : locale === 'hi'
                    ? 'किसी भी गैराज से पूछने योग्य 5 सवाल'
                    : '5 Questions to Ask Any Garage'}
                </button>
              </div>
            </div>

            {/* "What Could Change This" Transparency Card */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5 text-xs space-y-3">
              <div className="flex items-center gap-2 text-[var(--text)] font-bold">
                <Info className="w-4 h-4 text-amber-500" />
                {locale === 'hi' ? 'यह अनुमान कब बदल सकता है?' : 'What could change this estimate?'}
              </div>
              <ul className="space-y-2 list-disc list-inside text-[var(--text-muted)] leading-relaxed">
                {activeJobs.flatMap((j) => j.whatCouldChangeThis).slice(0, 3).map((w, idx) => (
                  <li key={idx}>{w[locale]}</li>
                ))}
                <li>
                  {locale === 'hi'
                    ? 'अतिरिक्त काम पाए जाने पर, तकनीशियन काम शुरू करने से पहले आपको फोटो प्रमाण के साथ फोन करेंगे।'
                    : 'If unexpected stripped bolts or seized fasteners occur, the technician calls you with photo proof before turning another spanner.'}
                </li>
              </ul>
            </div>

            {/* "What Can Safely Wait" Transparency Card */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5 text-xs space-y-3">
              <div className="flex items-center gap-2 text-[var(--text)] font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                {locale === 'hi' ? 'क्या सुरक्षित रूप से टाला जा सकता है?' : 'What can safely wait?'}
              </div>
              <p className="text-[var(--text-muted)] leading-relaxed">
                {activeJobs.find((j) => j.whatCanWait)?.whatCanWait[locale] ||
                  (locale === 'hi'
                    ? 'गैर-जरूरी पुर्जे अगली सर्विस तक सुरक्षित रूप से रखे जा सकते हैं।'
                    : 'Items marked Soon or Watch can safely wait for your next service interval.')}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 5 Questions to Ask Any Garage Drawer */}
      {showQuestions && (
        <div className="bg-[var(--surface)] border border-[var(--accent)]/30 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 text-base font-bold text-[var(--text)] mb-3">
            <HelpCircle className="w-5 h-5 text-[var(--accent)]" />
            {locale === 'hi'
              ? 'किसी भी गैराज से पूछने योग्य 5 पारदर्शी सवाल'
              : '5 Questions to Ask Any Garage (Consumer Protection Checklist)'}
          </div>
          <p className="text-xs text-[var(--text-muted)] mb-4">
            {locale === 'hi'
              ? 'चाहे आप टॉर्कवेल ऑटो चुनें या कोई अन्य कार्यशाला, ये सवाल आपको अनावश्यक खर्चों से बचाते हैं:'
              : 'Whether you service with Torquewell Auto or another independent garage, asking these questions protects you from surprise bills and low-grade parts:'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {QUESTIONS_TO_ASK_ANY_GARAGE.map((q, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-[var(--surface-muted)] border border-[var(--border)] flex items-start gap-3"
              >
                <span className="w-6 h-6 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] font-bold font-mono text-xs flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </span>
                <span className="text-xs font-semibold text-[var(--text)] leading-snug">
                  {q[locale]}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Estimate Breakdown PDF Modal */}
      {pdfModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
          <div className="relative w-full max-w-3xl bg-white text-neutral-900 border border-neutral-300 rounded-2xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-4 mb-4">
              <div>
                <h3 className="font-bold text-xl text-neutral-900">
                  TORQUEWELL AUTO · ESTIMATE BREAKDOWN
                </h3>
                <p className="text-xs text-neutral-500 font-mono">
                  Transparent Parts Tiers &amp; Labour Hours Summary
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    try {
                      window.print();
                    } catch {}
                  }}
                  className="px-3 py-1.5 rounded-lg bg-neutral-900 text-white font-bold text-xs"
                >
                  Print
                </button>
                <button
                  type="button"
                  onClick={() => setPdfModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg border text-xs font-semibold text-neutral-700"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3 bg-neutral-100 rounded-lg">
                <strong>Selected Tier:</strong> {currentTierObj.label.en} ({currentTierObj.warrantyMonths} Months Warranty)
              </div>

              <table className="w-full text-left border-collapse border border-neutral-300">
                <thead>
                  <tr className="bg-neutral-100">
                    <th className="p-2">Item</th>
                    <th className="p-2">Labour (hrs)</th>
                    <th className="p-2">Parts</th>
                    <th className="p-2 text-right">Range (inc VAT)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {activeJobs.map((j) => {
                    const c = calculateJobCost(j, selectedTier, labourRatePerHour);
                    return (
                      <tr key={j.id}>
                        <td className="p-2 font-semibold">{j.name.en}</td>
                        <td className="p-2">{j.labourHours[0]}–{j.labourHours[1]} h</td>
                        <td className="p-2">£{c.minParts.toFixed(0)}–£{c.maxParts.toFixed(0)}</td>
                        <td className="p-2 text-right font-mono font-bold">
                          £{c.minTotal.toFixed(0)}–£{c.maxTotal.toFixed(0)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className="text-right text-base font-bold font-mono pt-2">
                Total Estimate: £{totals.minTotal.toFixed(0)} – £{totals.maxTotal.toFixed(0)}
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded text-amber-900 text-[10px]">
                NOTICE: This is an indicative estimate based on baseline workshop hours. Written customer authorization is strictly required before turning any spanners. No unapproved work will ever be carried out.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
