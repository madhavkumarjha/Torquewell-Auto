import { useStore } from '@/store';
import { Badge } from '@/components/ui/Badge';

export default function Terms() {
  const { language } = useStore();

  return (
    <div className="space-y-10 py-8 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="space-y-3 pb-6 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-2">
          <Badge variant="neutral" className="text-xs font-mono uppercase tracking-wider">
            Standard Workshop Terms
          </Badge>
          <span className="text-xs font-mono text-[var(--text-muted)]">
            Effective: 2026-10-01
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif tracking-tight text-[var(--text)]">
          {language === 'hi' ? 'सेवा की शर्तें' : 'Terms of Business & Workshop Agreement'}
        </h1>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed">
          {language === 'hi'
            ? 'टॉर्कवेल ऑटो और हमारे ग्राहकों के बीच कानूनी रूप से बाध्यकारी कार्यशाला अनुबंध और शर्तें।'
            : 'The contractual terms governing automotive inspection, written estimates, parts warranties, and vehicle repair services.'}
        </p>
      </div>

      {/* Terms Sections */}
      <div className="space-y-8 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
        <section className="bg-[var(--surface-elevated)] p-6 sm:p-8 rounded-2xl border border-[var(--border-subtle)] space-y-3 shadow-sm">
          <h2 className="text-lg font-bold font-serif text-[var(--text)]">
            {language === 'hi' ? '1. अनुबंध और लिखित कोटेशन' : '1. Binding Estimates & Authorization'}
          </h2>
          <p>
            {language === 'hi'
              ? 'सभी कार्यशाला सेवाएं लिखित कोटेशन के आधार पर की जाती हैं। ग्राहक की स्पष्ट डिजिटल या हस्ताक्षरित स्वीकृति के बिना कोई अतिरिक्त शुल्क नहीं लगाया जा सकता है।'
              : 'All vehicle repairs are performed under binding written estimates. No work beyond the agreed scope will be executed without prior customer approval. All quoted prices include itemized labour hours, selected parts tiers, consumables, and applicable VAT.'}
          </p>
        </section>

        <section className="bg-[var(--surface-elevated)] p-6 sm:p-8 rounded-2xl border border-[var(--border-subtle)] space-y-3 shadow-sm">
          <h2 className="text-lg font-bold font-serif text-[var(--text)]">
            {language === 'hi' ? '2. क्लिक गारंटी और वारंटी' : '2. The Click Guarantee Warranty Terms'}
          </h2>
          <p>
            {language === 'hi'
              ? 'टॉर्कवेल ऑटो 12 से 24 महीने की पार्ट्स और लेबर वारंटी प्रदान करता है। वारंटी सामान्य घिसाव (जैसे ब्रेक पैड) या ग्राहक द्वारा किए गए अनधिकृत संशोधनों पर लागू नहीं होती है।'
              : 'Fitted components carry warranty terms ranging from 12 to 24 months based on the selected parts tier (OE: 24m / 24,000 km, Aftermarket: 12m). Warranty claims cover defective materials and incorrect assembly workmanship.'}
          </p>
        </section>

        <section className="bg-[var(--surface-elevated)] p-6 sm:p-8 rounded-2xl border border-[var(--border-subtle)] space-y-3 shadow-sm">
          <h2 className="text-lg font-bold font-serif text-[var(--text)]">
            {language === 'hi' ? '3. भुगतान और वाहन का संग्रह' : '3. Payment Terms & Vehicle Collection'}
          </h2>
          <p>
            {language === 'hi'
              ? 'वाहन सौंपे जाने से पहले पूर्ण भुगतान देय होता है। हम सभी प्रमुख डेबिट/क्रेडिट कार्ड, बैंक ट्रांसफर और स्वीकृत कॉर्पोरेट फ्लीट इनवॉइसिंग स्वीकार करते हैं।'
              : 'Full payment of the finalized itemized invoice is required upon vehicle handover. For approved corporate fleet clients, invoices are payable on 30-day net terms under a consolidated monthly billing agreement.'}
          </p>
        </section>

        <section className="bg-[var(--surface-elevated)] p-6 sm:p-8 rounded-2xl border border-[var(--border-subtle)] space-y-3 shadow-sm">
          <h2 className="text-lg font-bold font-serif text-[var(--text)]">
            {language === 'hi' ? '4. दायित्व की सीमा' : '4. Limitation of Liability'}
          </h2>
          <p>
            {language === 'hi'
              ? 'टॉर्कवेल ऑटो उपभोक्ता अधिकार अधिनियम 2015 के तहत उचित देखभाल और कौशल के साथ सभी सेवाएं करने की गारंटी देता है।'
              : 'Nothing in these Terms limits or excludes statutory consumer rights under the Consumer Rights Act 2015. Services are performed with reasonable engineering care and ISO 6789 calibrated equipment.'}
          </p>
        </section>
      </div>
    </div>
  );
}
