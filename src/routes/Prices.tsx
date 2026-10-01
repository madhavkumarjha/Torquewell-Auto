import { useSearchParams, Link } from 'react-router-dom';
import { FairPriceEstimator } from '@/components/prices/FairPriceEstimator';
import { usePrefs } from '@/store/prefs';
import { Wrench, Clock, ShieldCheck, Scale, FileText, ArrowRight } from 'lucide-react';

export default function Prices() {
  const { locale } = usePrefs();
  const [searchParams] = useSearchParams();
  const initialJobId = searchParams.get('job') || undefined;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[var(--border)]">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent)] font-semibold flex items-center gap-1.5">
            <Scale className="w-4 h-4" />
            {locale === 'hi' ? 'शून्य आश्चर्य · पारदर्शी मूल्य निर्धारण' : 'Zero Surprise Pricing Architecture'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text)] mt-2">
            {locale === 'hi' ? 'उचित मूल्य ब्रेकडाउन' : 'Fair-Price Breakdown'}
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-2 max-w-2xl leading-relaxed">
            {locale === 'hi'
              ? 'लेबर समय × प्रमाणित कार्यशाला दर, पुर्जों के 3 स्तर और लिखित अनुमोदन की गारंटी। आप निर्णय लेते हैं कि क्या काम कराना है और क्या सुरक्षित रूप से टाला जा सकता है।'
              : 'Standardized factory repair hours × clear £90/hr baseline rate, with certified parts in 3 tiers. See the price logic before any spanners turn.'}
          </p>
        </div>

        <Link
          to="/proof"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs border border-[var(--border)] hover:bg-[var(--surface-muted)] text-[var(--text)] transition-colors flex-shrink-0"
        >
          <FileText className="w-4 h-4 text-[var(--accent)]" />
          {locale === 'hi' ? 'निरीक्षण फोटो प्रमाण देखें' : 'View Inspection Proof First'}
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Interactive Estimator Component */}
      <FairPriceEstimator initialJobId={initialJobId} locale={locale} />

      {/* 3 Core Principles of Torquewell Pricing */}
      <div className="pt-8 border-t border-[var(--border)] space-y-6">
        <h2 className="text-xl font-bold text-[var(--text)]">
          {locale === 'hi' ? 'टॉर्कवेल मूल्य निर्धारण के 3 स्तंभ' : 'How Torquewell Calculates Your Price'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[var(--text)]">
              {locale === 'hi' ? '1. मानकीकृत फैक्ट्री लेबर समय' : '1. Standardised Factory Hours'}
            </h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              {locale === 'hi'
                ? 'हम लेबर घंटे का अनुमान हवा में नहीं लगाते। प्रत्येक कार्य के लिए निर्माता द्वारा प्रकाशित आधिकारिक फ्लैट-रेट समय को आधार बनाया जाता है।'
                : 'We do not guess repair duration. Labour hours are referenced directly from independent automotive standard flat-rate guides.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
              <Wrench className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[var(--text)]">
              {locale === 'hi' ? '2. आपकी पसंद के पुर्जों के स्तर' : '2. Your Choice of Certified Parts'}
            </h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              {locale === 'hi'
                ? 'फैक्ट्री ओई, ओई-समतुल्य या गुणवत्ता आफ्टरमार्केट—आप अपनी जरूरत और बजट के अनुसार पुर्जा चुनते हैं। सभी पर लिखित वारंटी मिलती है।'
                : 'Choose between factory Original Equipment, OE-Equivalent, or quality aftermarket replacement tiers. Every tier comes with transparent warranty terms.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[var(--text)]">
              {locale === 'hi' ? '3. लिखित सहमति के बिना कोई बिल नहीं' : '3. Written Authorization Rule'}
            </h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              {locale === 'hi'
                ? 'यदि किसी बोल्ट के टूटने या छिपे हुए घिसाव के कारण कोई अतिरिक्त काम आवश्यक होता है, तो तकनीशियन काम शुरू करने से पहले फोटो के साथ आपकी अनुमति लेंगे।'
                : 'If unexpected findings or seized fasteners emerge during disassembly, we never proceed without sending photographic evidence and receiving your written consent.'}
            </p>
          </div>
        </div>
      </div>

      {/* Mandatory Statutory Notice */}
      <div className="p-5 rounded-2xl bg-[var(--surface-muted)] border border-[var(--border)] text-xs text-[var(--text-muted)] leading-relaxed">
        <strong className="text-[var(--text)] block mb-1">
          {locale === 'hi' ? 'वैधानिक मूल्य प्रकटीकरण:' : 'Statutory Pricing Transparency Disclosure:'}
        </strong>
        {locale === 'hi'
          ? 'इस पृष्ठ पर प्रदर्शित अनुमान मानक मॉडल कार्यशाला दरों (£90/घंटा) और सांकेतिक पुर्जों की कीमतों पर आधारित हैं। सभी वास्तविक मरम्मत कार्यों के लिए आपके वाहन के विशिष्ट चेसिस नंबर और वास्तविक निरीक्षण के बाद लिखित अनुमान जारी किया जाता है।'
          : 'All figures shown are indicative estimates calculated at our baseline workshop labour rate of £90/hr including 20% VAT. A binding written quotation matched to your specific vehicle chassis and initial strip-down state will always be provided for signature before repairs begin.'}
      </div>
    </div>
  );
}
