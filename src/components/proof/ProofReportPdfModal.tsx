import React, { useEffect } from 'react';
import { X, Printer, Check, Copy, Shield, FileText } from 'lucide-react';
import { VehicleReport } from '@/data/proof-reports';
import { Locale } from '@/types';

interface ProofReportPdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: VehicleReport;
  locale: Locale;
}

export const ProofReportPdfModal: React.FC<ProofReportPdfModalProps> = ({
  isOpen,
  onClose,
  report,
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

  const handleCopy = () => {
    const text = `TORQUEWELL AUTO — DIGITAL PROOF REPORT
Vehicle: ${report.vehicleModel} (${report.regPlate})
Date: ${report.inspectionDate} | Odometer: ${report.odometerKm} km
Technician: ${report.technicianName} [${report.technicianTorqueId}]

FINDINGS SUMMARY:
${report.findings
  .map(
    (f) =>
      `[${f.urgency.toUpperCase()}] ${f.title[locale]} ${
        f.measured ? `(${f.measured.value} ${f.measured.unit} vs min ${f.measured.min} ${f.measured.unit})` : ''
      }`
  )
  .join('\n')}

DISCLAIMER: Indicative digital report only. A written technician estimate and authorization are required prior to undertaking any repairs.`;

    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdf-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
    >
      <div className="relative w-full max-w-4xl bg-white text-neutral-900 border border-neutral-300 rounded-2xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col font-sans print:fixed print:inset-0 print:m-0 print:p-0 print:border-none print:shadow-none print:max-h-none print:max-w-none">
        {/* Modal Top Bar (Hidden during print) */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-neutral-200 bg-neutral-100 print:hidden">
          <div className="flex items-center gap-2 text-sm font-semibold text-neutral-800">
            <FileText className="w-4 h-4 text-emerald-600" />
            {locale === 'hi' ? 'डिजिटल प्रूफ रिपोर्ट (A4 प्रिंट प्रीव्यू)' : 'Digital Proof Report (Print & PDF Preview)'}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-300 text-xs font-semibold bg-white hover:bg-neutral-50 transition-colors text-neutral-700"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? (locale === 'hi' ? 'कॉपी हो गया' : 'Copied') : locale === 'hi' ? 'टेक्स्ट कॉपी करें' : 'Copy Summary'}
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

        {/* Printable Document Body */}
        <div className="p-8 overflow-y-auto flex-1 space-y-6 text-sm">
          {/* Letterhead Header */}
          <div className="flex flex-col sm:flex-row items-start justify-between border-b-2 border-neutral-900 pb-4 gap-4">
            <div>
              <div className="font-bold text-2xl tracking-tight text-neutral-900">
                TORQUEWELL <span className="text-amber-600">AUTO</span>
              </div>
              <div className="text-xs text-neutral-600 font-mono">
                PRECISION INDEPENDENT WORKSHOPS · CALIBRATED DIGITAL INSPECTION
              </div>
              <div className="text-xs text-neutral-500 mt-1">
                {report.branchName} · Support: +44 (0) 20 7946 0991
              </div>
            </div>

            <div className="text-left sm:text-right font-mono text-xs text-neutral-700 space-y-1">
              <div>
                <strong>REPORT ID:</strong> {report.id.toUpperCase()}
              </div>
              <div>
                <strong>DATE:</strong> {report.inspectionDate}
              </div>
              <div>
                <strong>TORQUE KEY:</strong> {report.technicianTorqueId}
              </div>
            </div>
          </div>

          {/* Vehicle Metadata Box */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-neutral-50 border border-neutral-200">
            <div>
              <span className="block text-[11px] font-mono uppercase text-neutral-500">
                {locale === 'hi' ? 'वाहन विवरण' : 'Vehicle'}
              </span>
              <strong className="text-sm text-neutral-900">{report.vehicleModel}</strong>
            </div>
            <div>
              <span className="block text-[11px] font-mono uppercase text-neutral-500">
                {locale === 'hi' ? 'पंजीकरण संख्या' : 'Registration'}
              </span>
              <strong className="font-mono text-sm px-2 py-0.5 rounded bg-amber-100 border border-amber-300 text-amber-900 inline-block mt-0.5">
                {report.regPlate}
              </strong>
            </div>
            <div>
              <span className="block text-[11px] font-mono uppercase text-neutral-500">
                {locale === 'hi' ? 'ओडोमीटर रीडिंग' : 'Odometer'}
              </span>
              <strong className="font-mono text-sm text-neutral-900">
                {report.odometerKm.toLocaleString()} km
              </strong>
            </div>
            <div>
              <span className="block text-[11px] font-mono uppercase text-neutral-500">
                {locale === 'hi' ? 'निरीक्षक तकनीशियन' : 'Technician'}
              </span>
              <strong className="text-sm text-neutral-900">{report.technicianName}</strong>
            </div>
          </div>

          {/* Summary Executive Overview */}
          <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-950 text-xs leading-relaxed">
            <strong className="font-bold block text-sm mb-1 text-amber-900">
              {locale === 'hi' ? 'कार्यकारी निरीक्षण सारांश:' : 'Executive Inspection Summary:'}
            </strong>
            {report.summaryNote[locale]}
          </div>

          {/* Findings Table */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-neutral-900 mb-2">
              {locale === 'hi' ? 'जांचे गए बिंदु और मापन विवरण' : 'Detailed Checkpoints & Micrometer Measurements'}
            </h3>
            <table className="w-full text-left border-collapse border border-neutral-300 text-xs">
              <thead>
                <tr className="bg-neutral-100 border-b border-neutral-300">
                  <th className="p-2.5 font-bold text-neutral-700">Urgency</th>
                  <th className="p-2.5 font-bold text-neutral-700">System</th>
                  <th className="p-2.5 font-bold text-neutral-700">Inspection Check</th>
                  <th className="p-2.5 font-bold text-neutral-700">Measured vs Spec</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {report.findings.map((f) => (
                  <tr key={f.id} className="hover:bg-neutral-50">
                    <td className="p-2.5 font-mono font-bold">
                      {f.urgency === 'now' && <span className="text-red-600">● NOW</span>}
                      {f.urgency === 'soon' && <span className="text-amber-600">▲ SOON</span>}
                      {f.urgency === 'watch' && <span className="text-blue-600">◆ WATCH</span>}
                      {f.urgency === 'ok' && <span className="text-emerald-600">✓ PASS</span>}
                    </td>
                    <td className="p-2.5 uppercase font-mono text-[11px] text-neutral-600">
                      {f.system}
                    </td>
                    <td className="p-2.5">
                      <div className="font-semibold text-neutral-900">{f.title[locale]}</div>
                      <div className="text-[11px] text-neutral-600 mt-0.5">{f.why[locale]}</div>
                    </td>
                    <td className="p-2.5 font-mono whitespace-nowrap">
                      {f.measured ? (
                        <div>
                          <strong className={f.urgency === 'now' ? 'text-red-600' : 'text-neutral-900'}>
                            {f.measured.value} {f.measured.unit}
                          </strong>
                          <span className="text-[10px] text-neutral-500 block">
                            (Min: {f.measured.min} {f.measured.unit})
                          </span>
                        </div>
                      ) : (
                        <span className="text-neutral-400">Visual</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Technician Calibration Sign-off & Torque Guarantee */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-neutral-300">
            <div className="p-4 rounded-lg border border-neutral-200 bg-neutral-50 space-y-1">
              <span className="text-[11px] font-mono uppercase text-neutral-500 block">
                Torquewell Click Guarantee
              </span>
              <div className="font-bold text-xs text-neutral-900 flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-emerald-600" />
                All fasteners torqued to manufacturer specification with calibrated click.
              </div>
              <div className="text-[11px] text-neutral-600 font-mono mt-1">
                Calibration Certificate: ISO/IEC 17025 Compliant · ID: {report.technicianTorqueId}
              </div>
            </div>

            <div className="border border-neutral-300 rounded-lg p-4 flex flex-col justify-between">
              <span className="text-[11px] font-mono uppercase text-neutral-500">
                Lead Technician Verification Sign-off
              </span>
              <div className="font-serif italic text-base text-neutral-800 my-2">
                {report.technicianName}
              </div>
              <div className="text-[10px] font-mono text-neutral-500 border-t border-neutral-200 pt-1">
                Digitally Authenticated Signature · {report.inspectionDate}
              </div>
            </div>
          </div>

          {/* Mandatory Safety Disclaimer per File 01 */}
          <div className="pt-4 border-t-2 border-neutral-300 text-[10px] text-neutral-500 leading-normal">
            <strong>MANDATORY NOTICE:</strong> This digital report is based on physical workshop inspection and calibrated diagnostic telemetry at the timestamp noted above. It is indicative only and does not constitute a final binding quotation or guarantee against uninspected component failure. No repairs will be executed without prior written customer authorization of an itemized estimate.
          </div>
        </div>
      </div>
    </div>
  );
};
