import React, { useEffect } from 'react';
import { X, Printer, Check, Copy, FileText, Shield } from 'lucide-react';
import { PortalInvoice, PORTAL_CLIENT } from '@/data/portal';
import { Locale } from '@/types';

interface InvoicePdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: PortalInvoice | null;
  locale: Locale;
}

export const InvoicePdfModal: React.FC<InvoicePdfModalProps> = ({
  isOpen,
  onClose,
  invoice,
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

  if (!isOpen || !invoice) return null;

  const handlePrint = () => {
    try {
      window.print();
    } catch {}
  };

  const handleCopy = () => {
    const text = `TORQUEWELL AUTO — VAT INVOICE ${invoice.id}
Client: ${PORTAL_CLIENT.name} | Vehicle: ${invoice.vehicleModel} (${invoice.regPlate})
Date: ${invoice.date} | Branch: ${invoice.branchName}

ITEMS:
${invoice.items.map((i) => `${i.description[locale]} — £${i.total.toFixed(2)}`).join('\n')}

Subtotal: £${invoice.subtotal.toFixed(2)}
VAT (20%): £${invoice.vatAmount.toFixed(2)}
TOTAL PAID: £${invoice.grandTotal.toFixed(2)}
Status: ${invoice.paymentStatus.toUpperCase()} | Warranty: ${invoice.warrantyMonths} Months Parts & Labour`;

    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="invoice-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
    >
      <div className="relative w-full max-w-3xl bg-white text-neutral-900 border border-neutral-300 rounded-2xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col font-sans print:fixed print:inset-0 print:m-0 print:p-0 print:border-none print:shadow-none print:max-h-none print:max-w-none">
        {/* Controls Bar */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-neutral-200 bg-neutral-100 print:hidden">
          <div className="flex items-center gap-2 text-sm font-semibold text-neutral-800">
            <FileText className="w-4 h-4 text-emerald-600" />
            <span id="invoice-modal-title">
              {locale === 'hi' ? `वैट चालान ${invoice.id}` : `Official VAT Invoice ${invoice.id}`}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-300 text-xs font-semibold bg-white hover:bg-neutral-50 transition-colors text-neutral-700"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? (locale === 'hi' ? 'कॉपी हो गया' : 'Copied') : locale === 'hi' ? 'कॉपी सारांश' : 'Copy'}
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

        {/* Printable Body */}
        <div className="p-8 overflow-y-auto flex-1 space-y-6 text-sm">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start justify-between border-b-2 border-neutral-900 pb-4 gap-4">
            <div>
              <div className="font-bold text-2xl tracking-tight text-neutral-900">
                TORQUEWELL <span className="text-amber-600">AUTO</span>
              </div>
              <div className="text-xs text-neutral-600 font-mono">
                PRECISION INDEPENDENT WORKSHOPS · VAT REG: GB 982 4410 88
              </div>
              <div className="text-xs text-neutral-500 mt-1">
                {invoice.branchName} · Tel: +44 (0) 20 7946 0192
              </div>
            </div>

            <div className="text-left sm:text-right font-mono text-xs text-neutral-700 space-y-1">
              <div>
                <strong>INVOICE NO:</strong> {invoice.id}
              </div>
              <div>
                <strong>DATE:</strong> {invoice.date}
              </div>
              <div>
                <strong>TORQUE ID:</strong> {invoice.technicianTorqueId}
              </div>
            </div>
          </div>

          {/* Client & Vehicle Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-neutral-50 border border-neutral-200">
            <div>
              <span className="block text-[11px] font-mono uppercase text-neutral-500">Bill To</span>
              <strong className="text-sm text-neutral-900">{PORTAL_CLIENT.name}</strong>
              <div className="text-xs text-neutral-500">{PORTAL_CLIENT.email}</div>
            </div>
            <div>
              <span className="block text-[11px] font-mono uppercase text-neutral-500">Vehicle</span>
              <strong className="text-sm text-neutral-900">{invoice.vehicleModel}</strong>
              <div className="text-xs font-mono text-neutral-600 font-semibold">{invoice.regPlate}</div>
            </div>
            <div>
              <span className="block text-[11px] font-mono uppercase text-neutral-500">Status</span>
              <strong className="font-mono text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 uppercase inline-block">
                {invoice.paymentStatus}
              </strong>
            </div>
            <div>
              <span className="block text-[11px] font-mono uppercase text-neutral-500">Warranty</span>
              <strong className="text-xs text-neutral-900">
                {invoice.warrantyMonths} Months / 12,000 Miles
              </strong>
            </div>
          </div>

          {/* Itemised Table */}
          <div>
            <table className="w-full text-left border-collapse border border-neutral-300 text-xs">
              <thead>
                <tr className="bg-neutral-100 border-b border-neutral-300">
                  <th className="p-2.5 font-bold text-neutral-700">Description</th>
                  <th className="p-2.5 font-bold text-neutral-700">Category</th>
                  <th className="p-2.5 font-bold text-neutral-700 text-right">Qty</th>
                  <th className="p-2.5 font-bold text-neutral-700 text-right">Rate (£)</th>
                  <th className="p-2.5 font-bold text-neutral-700 text-right">Amount (£)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {invoice.items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-neutral-50">
                    <td className="p-2.5 font-medium text-neutral-900">
                      {item.description[locale]}
                    </td>
                    <td className="p-2.5 font-mono text-[11px] uppercase text-neutral-500">
                      {item.category}
                    </td>
                    <td className="p-2.5 text-right font-mono text-neutral-700">
                      {item.qty}
                    </td>
                    <td className="p-2.5 text-right font-mono text-neutral-700">
                      £{item.unitPrice.toFixed(2)}
                    </td>
                    <td className="p-2.5 text-right font-mono font-bold text-neutral-900">
                      £{item.total.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-neutral-400 bg-neutral-50 font-mono">
                  <td colSpan={4} className="p-2 text-right font-semibold text-neutral-700">Subtotal:</td>
                  <td className="p-2 text-right font-bold text-neutral-900">£{invoice.subtotal.toFixed(2)}</td>
                </tr>
                <tr className="bg-neutral-50 font-mono">
                  <td colSpan={4} className="p-2 text-right font-semibold text-neutral-700">VAT (20.0%):</td>
                  <td className="p-2 text-right font-bold text-neutral-900">£{invoice.vatAmount.toFixed(2)}</td>
                </tr>
                <tr className="bg-neutral-100 font-mono text-sm border-t border-neutral-300">
                  <td colSpan={4} className="p-2.5 text-right font-extrabold text-neutral-900">Total Paid:</td>
                  <td className="p-2.5 text-right font-extrabold text-neutral-900">£{invoice.grandTotal.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Warranty & Click Guarantee Seal */}
          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-1 text-xs">
            <div className="font-bold text-neutral-900 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-600" />
              12-Month / 12,000-Mile Nationwide Parts & Labour Warranty
            </div>
            <div className="text-neutral-600 text-[11px] leading-relaxed">
              All fitted parts and spanner work covered under the Torquewell Precision Charter. All fasteners torqued to manufacturer specifications with calibrated click.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
