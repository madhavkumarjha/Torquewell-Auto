import React, { useState } from 'react';
import { X, AlertTriangle, ShieldAlert } from 'lucide-react';
import { PortalApprovalItem } from '@/data/portal';
import { Locale } from '@/types';
import { Button } from '@/components/ui/Button';

interface RiskAcknowledgementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmDecline: (item: PortalApprovalItem, reason: string) => void;
  item: PortalApprovalItem | null;
  locale: Locale;
}

export const RiskAcknowledgementModal: React.FC<RiskAcknowledgementModalProps> = ({
  isOpen,
  onClose,
  onConfirmDecline,
  item,
  locale
}) => {
  const [acknowledged, setAcknowledged] = useState(false);
  const [reason, setReason] = useState('');

  if (!isOpen || !item) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!acknowledged) return;
    onConfirmDecline(item, reason);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="risk-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
    >
      <div className="relative w-full max-w-lg bg-card border-2 border-destructive/80 text-foreground rounded-2xl shadow-2xl p-6 md:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-border/40 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center text-xl font-bold">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h3 id="risk-modal-title" className="text-xl font-bold tracking-tight text-destructive">
                {locale === 'hi' ? 'सुरक्षा जोखिम पावती अनिवार्य' : 'Safety Risk Acknowledgement Required'}
              </h3>
              <div className="text-xs text-muted-foreground font-mono">
                Mandatory Consumer Protection Safety Protocol
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-muted-foreground hover:text-foreground"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Warning details */}
        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/30 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-destructive uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4" />
            Declining Safety-Critical Work: {item.title[locale]}
          </div>
          <p className="text-xs leading-relaxed text-foreground">
            {item.riskIfDeclined[locale]}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-semibold text-foreground">
              {locale === 'hi' ? 'काम स्थगित करने का कारण (वैकल्पिक)' : 'Reason for Postponing / Declining (Optional)'}
            </label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. Planning to perform repair next month or at another branch"
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground"
            />
          </div>

          {/* Mandatory Checkbox */}
          <label className="flex items-start gap-2.5 p-3 rounded-lg border border-border bg-muted/30 cursor-pointer">
            <input
              type="checkbox"
              required
              checked={acknowledged}
              onChange={(e) => setAcknowledged(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded text-primary focus:ring-primary"
              id="acknowledge-safety-risk-checkbox"
            />
            <span className="text-xs text-foreground leading-relaxed">
              {locale === 'hi'
                ? 'मैं स्वीकार करता हूँ कि इस सुरक्षा-संबंधित पुर्जे को न बदलने से होने वाले जोखिमों की पूरी जानकारी तकनीशियन द्वारा मुझे दे दी गई है।'
                : 'I understand that this component is worn beyond factory discard limits and I assume responsibility for operating the vehicle without this repair.'}
            </span>
          </label>

          <div className="pt-2 flex items-center justify-end gap-2">
            <Button variant="outline" size="sm" type="button" onClick={onClose}>
              {locale === 'hi' ? 'रद्द करें (काम जारी रखें)' : 'Cancel (Keep Pending)'}
            </Button>
            <Button
              variant="primary"
              size="sm"
              type="submit"
              disabled={!acknowledged}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            >
              {locale === 'hi' ? 'जोखिम पावती दर्ज करें' : 'Confirm & Decline'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
