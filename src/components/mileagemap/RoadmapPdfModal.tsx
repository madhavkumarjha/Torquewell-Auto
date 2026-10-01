import React, { useEffect } from 'react';
import { X, Printer, Check, Copy, Calendar, Shield } from 'lucide-react';
import { MilestoneItem, evaluateMilestoneUrgency, DrivingStyle } from '@/data/mileage-map';
import { Locale, Powertrain, UnitSystem } from '@/types';
import { formatDistance } from '@/lib/units';

interface RoadmapPdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  powertrain: Powertrain;
  currentKm: number;
  drivingStyle: DrivingStyle;
  milestones: MilestoneItem[];
  units: UnitSystem;
  locale: Locale;
}

export const RoadmapPdfModal: React.FC<RoadmapPdfModalProps> = ({
  isOpen,
  onClose,
  powertrain,
  currentKm,
  drivingStyle,
  milestones,
  units,
  locale
}) => {
  const [copied, setCopied] = React.useState(false);

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

  const handlePrint = () => {
    try {
      window.print();
    } catch {}
  };

  const currentDisplayDist = formatDistance(currentKm, units);

  const handleCopy = () => {
    const lines = [
      `TORQUEWELL AUTO — SERVICE MILEAGE ROADMAP`,
      `Powertrain: ${powertrain.toUpperCase()} | Odometer: ${currentDisplayDist}`,
      `Driving Style Profile: ${drivingStyle.toUpperCase()}`,
      `Date Generated: ${new Date().toISOString().split('T')[0]}`,
      '',
      'UPCOMING & RECOMMENDED MILESTONES:'
    ];

    milestones.forEach((m) => {
      const urgency = evaluateMilestoneUrgency(m, currentKm, drivingStyle);
      const dist = formatDistance(m.targetKm, units);
      lines.push(
        `[${urgency.toUpperCase()}] ${dist} — ${m.title[locale]} (Est: £${m.costBand[0]}–£${m.costBand[1]})`
      );
      lines.push(`   Basis: ${m.basis} | Why: ${m.why[locale]}`);
      lines.push(`   What Can Wait: ${m.canWait[locale]}`);
      lines.push('');
    });

    lines.push(
      'MANDATORY NOTICE: Generic intervals for planning. Your vehicle handbook overrides generic guidance. No work executed without written authorisation.'
    );

    navigator.clipboard?.writeText(lines.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="roadmap-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
    >
      <div className="relative w-full max-w-4xl bg-white text-neutral-900 border border-neutral-300 rounded-2xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col font-sans print:fixed print:inset-0 print:m-0 print:p-0 print:border-none print:shadow-none print:max-h-none print:max-w-none">
        {/* Top Controls Bar */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-neutral-200 bg-neutral-100 print:hidden">
          <div className="flex items-center gap-2 text-sm font-semibold text-neutral-800">
            <Calendar className="w-4 h-4 text-emerald-600" />
            <span id="roadmap-modal-title">
              {locale === 'hi' ? 'सर्विस रोडमैप दस्तावेज़ (प्रिंट व PDF)' : 'Service Roadmap Dossier (Print & PDF)'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-300 text-xs font-semibold bg-white hover:bg-neutral-50 transition-colors text-neutral-700"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? (locale === 'hi' ? 'कॉपी हो गया' : 'Copied') : locale === 'hi' ? 'कॉपी सारांश' : 'Copy Summary'}
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold bg-neutral-900 text-white hover:bg-neutral-800 transition-colors shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              {locale === 'hi' ? 'प्रिंट / PDF सेव करें' : 'Print / Save PDF'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-neutral-500 hover:text-neutral-900 rounded-lg transition-colors ml-2"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Content */}
        <div className="p-8 overflow-y-auto flex-1 space-y-6 text-sm">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start justify-between border-b-2 border-neutral-900 pb-4 gap-4">
            <div>
              <div className="font-bold text-2xl tracking-tight text-neutral-900">
                TORQUEWELL <span className="text-amber-600">AUTO</span>
              </div>
              <div className="text-xs text-neutral-600 font-mono">
                PRECISION INDEPENDENT WORKSHOPS · PREVENTATIVE MAINTENANCE ROADMAP
              </div>
              <div className="text-xs text-neutral-500 mt-1">
                Transparency Charter: We never replace parts with safe remaining service life.
              </div>
            </div>

            <div className="text-left sm:text-right font-mono text-xs text-neutral-700 space-y-1">
              <div>
                <strong>DOC ID:</strong> TQ-MAP-{Date.now().toString().slice(-6)}
              </div>
              <div>
                <strong>DATE:</strong> {new Date().toISOString().split('T')[0]}
              </div>
              <div>
                <strong>SCHEDULE:</strong> PUBLIC GUIDANCE V2.4
              </div>
            </div>
          </div>

          {/* Vehicle Metadata Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-neutral-50 border border-neutral-200">
            <div>
              <span className="block text-[11px] font-mono uppercase text-neutral-500">
                {locale === 'hi' ? 'पावरट्रेन' : 'Powertrain'}
              </span>
              <strong className="text-sm uppercase text-neutral-900">{powertrain}</strong>
            </div>
            <div>
              <span className="block text-[11px] font-mono uppercase text-neutral-500">
                {locale === 'hi' ? 'वर्तमान ओडोमीटर' : 'Current Odometer'}
              </span>
              <strong className="font-mono text-sm text-neutral-900">{currentDisplayDist}</strong>
            </div>
            <div>
              <span className="block text-[11px] font-mono uppercase text-neutral-500">
                {locale === 'hi' ? 'ड्राइविंग शैली' : 'Driving Profile'}
              </span>
              <strong className="text-sm capitalize text-neutral-900">{drivingStyle}</strong>
            </div>
            <div>
              <span className="block text-[11px] font-mono uppercase text-neutral-500">
                {locale === 'hi' ? 'सक्रिय माइलस्टोन' : 'Milestones Plotted'}
              </span>
              <strong className="font-mono text-sm text-neutral-900">{milestones.length} checkpoints</strong>
            </div>
          </div>

          {/* Milestones Schedule Table */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-neutral-900 mb-2">
              {locale === 'hi' ? 'माइलेज के अनुसार सर्विस सूची' : 'Mileage & Age Milestones Schedule'}
            </h3>
            <table className="w-full text-left border-collapse border border-neutral-300 text-xs">
              <thead>
                <tr className="bg-neutral-100 border-b border-neutral-300">
                  <th className="p-2.5 font-bold text-neutral-700">Target</th>
                  <th className="p-2.5 font-bold text-neutral-700">Status</th>
                  <th className="p-2.5 font-bold text-neutral-700">Service Milestone & Why</th>
                  <th className="p-2.5 font-bold text-neutral-700">What Can Safely Wait</th>
                  <th className="p-2.5 font-bold text-neutral-700">Cost Band</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {milestones.map((m) => {
                  const urgency = evaluateMilestoneUrgency(m, currentKm, drivingStyle);
                  const dist = formatDistance(m.targetKm, units);

                  return (
                    <tr key={m.id} className="hover:bg-neutral-50">
                      <td className="p-2.5 font-mono font-bold whitespace-nowrap text-neutral-900">
                        {dist}
                        {m.everyMonths && (
                          <span className="block text-[10px] text-neutral-500 font-normal">
                            or {m.everyMonths} mos
                          </span>
                        )}
                      </td>
                      <td className="p-2.5 font-mono font-bold text-xs whitespace-nowrap">
                        {urgency === 'due' && <span className="text-amber-600">● DUE NOW</span>}
                        {urgency === 'soon' && <span className="text-yellow-600">▲ SOON</span>}
                        {urgency === 'watch' && <span className="text-blue-600">◆ WATCH</span>}
                        {urgency === 'completed' && <span className="text-emerald-600">✓ COMPLETED</span>}
                      </td>
                      <td className="p-2.5">
                        <div className="font-semibold text-neutral-900">{m.title[locale]}</div>
                        <div className="text-[11px] text-neutral-600 mt-0.5">{m.why[locale]}</div>
                      </td>
                      <td className="p-2.5 text-[11px] text-neutral-600">
                        {m.canWait[locale]}
                      </td>
                      <td className="p-2.5 font-mono whitespace-nowrap text-neutral-900 font-medium">
                        £{m.costBand[0]} – £{m.costBand[1]}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Calibrated Questions to Ask Any Workshop */}
          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2">
            <div className="font-bold text-xs uppercase tracking-wider text-neutral-800 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-600" />
              {locale === 'hi' ? 'किसी भी गैरेज से पूछे जाने वाले 3 प्रश्न' : '3 Questions to Ask Any Workshop Before Paying'}
            </div>
            <ol className="list-decimal pl-5 text-xs text-neutral-700 space-y-1">
              <li><strong>Can you show me the physical measurement?</strong> (Never replace brake pads or tyres on mileage alone without a millimeter vernier measurement).</li>
              <li><strong>Is this time-based or wear-based?</strong> (Brake fluid absorbs moisture over time; timing belts degrade by age; spark plugs wear by distance).</li>
              <li><strong>What is the consequence if this safely waits until my next routine service?</strong> (An honest technician will distinguish between safety-critical failure and cosmetic/routine wear).</li>
            </ol>
          </div>

          {/* Mandatory Disclaimer */}
          <div className="pt-4 border-t-2 border-neutral-300 text-[10px] text-neutral-500 leading-normal">
            <strong>MANUFACTURER DISCLAIMER:</strong> This preventative maintenance roadmap is prepared for reference planning using generic industry standards. It does not replace or supersede the specific service intervals mandated by your vehicle manufacturer handbook. All cost ranges are indicative and exclude specialized diagnostic labour.
          </div>
        </div>
      </div>
    </div>
  );
};
