import { useParams, Link } from 'react-router-dom';
import { getServiceBySlug } from '@/data/services';
import { usePrefs } from '@/store/prefs';
import { Locale } from '@/types';
import {
  Clock,
  Wrench,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Calendar
} from 'lucide-react';

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { locale } = usePrefs() as { locale: Locale };
  const service = slug ? getServiceBySlug(slug) : undefined;

  if (!service) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-bold text-[var(--text)]">
          {locale === 'hi' ? 'सेवा नहीं मिली' : 'Service Not Found'}
        </h1>
        <p className="text-sm text-[var(--text-muted)]">
          {locale === 'hi'
            ? 'अनुरोधित कार्यशाला सेवा उपलब्ध नहीं है।'
            : 'The requested workshop service bay could not be found.'}
        </p>
        <Link
          to="/services"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[var(--accent)] text-[var(--accent-fg)]"
        >
          {locale === 'hi' ? 'सभी 14 सेवाएं देखें' : 'View All 14 Services'}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
        <Link to="/" className="hover:text-[var(--text)]">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to="/services" className="hover:text-[var(--text)]">Services</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[var(--text)] font-semibold truncate">{service.name[locale]}</span>
      </nav>

      {/* Hero Header Card */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[var(--border)]">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent)] font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              {locale === 'hi' ? 'टॉर्कवेल कार्यशाला बे' : 'Torquewell Calibrated Service Bay'}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text)] mt-2">
              {service.name[locale]}
            </h1>
            <p className="text-sm text-[var(--text-muted)] mt-2 max-w-xl leading-relaxed">
              {service.summary[locale]}
            </p>
          </div>

          {/* Quick Booking Button & Rates */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-4 p-4 rounded-xl bg-[var(--surface-muted)] border border-[var(--border)] flex-shrink-0">
            <div>
              <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase block">
                {locale === 'hi' ? 'सांकेतिक मूल्य' : 'Indicative Range'}
              </span>
              <div className="text-2xl font-mono font-bold text-[var(--text)]">
                £{service.priceBand[0]} – £{service.priceBand[1]}
              </div>
              <span className="text-[11px] font-mono text-[var(--text-muted)] flex items-center gap-1 mt-0.5">
                <Clock className="w-3 h-3" />
                {service.timeRangeMin[0]}–{service.timeRangeMin[1]} min bay time
              </span>
            </div>

            <Link
              to={`/book?service=${service.slug}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-[var(--accent)] text-[var(--accent-fg)] hover:opacity-90 transition-opacity shadow-sm w-full sm:w-auto"
            >
              <Calendar className="w-4 h-4" />
              {locale === 'hi' ? 'यह सेवा बुक करें' : 'Book This Service'}
            </Link>
          </div>
        </div>

        {/* Parts Tiers Strip */}
        <div className="pt-4 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[var(--text-muted)] font-semibold">
            {locale === 'hi' ? 'प्रमाणित पुर्जों के विकल्प:' : 'Certified Parts Tiers:'}
          </span>
          {service.partsOptions.map((opt, i) => (
            <span
              key={i}
              className="px-2.5 py-1 rounded-md bg-[var(--surface-muted)] border border-[var(--border)] font-mono text-[11px] text-[var(--text)]"
            >
              {opt}
            </span>
          ))}
        </div>
      </div>

      {/* 2-Column Details: What it covers & Signs you need it */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: What this service covers */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-base font-bold text-[var(--text)]">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <h2>{locale === 'hi' ? 'इस सेवा में क्या शामिल है' : 'What This Service Covers'}</h2>
          </div>
          <ul className="space-y-3 text-xs sm:text-sm text-[var(--text)]">
            {service.covers.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-[var(--surface-muted)]">
                <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                <span className="leading-snug">{item[locale]}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Signs you may need this service */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-base font-bold text-[var(--text)]">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <h2>{locale === 'hi' ? 'लक्षण: आपको इसकी आवश्यकता कब हो सकती है' : 'Signs You May Need This Service'}</h2>
          </div>
          <ul className="space-y-3 text-xs sm:text-sm text-[var(--text-muted)]">
            {service.signs.map((sign, idx) => (
              <li key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-[var(--surface-muted)] border border-amber-500/20">
                <span className="text-amber-500 font-bold mt-0.5">●</span>
                <span className="leading-snug text-[var(--text)]">{sign[locale]}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Lift Checks & Inspection Verification */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-base font-bold text-[var(--text)]">
          <Wrench className="w-5 h-5 text-[var(--accent)]" />
          <h2>{locale === 'hi' ? 'लिफ्ट पर हमारे तकनीशियन क्या जांचते हैं' : 'Checks Performed by Our Technician on the Lift'}</h2>
        </div>
        <p className="text-xs text-[var(--text-muted)] leading-relaxed">
          {locale === 'hi'
            ? 'हम केवल पुर्जे नहीं बदलते, बल्कि संपूर्ण प्रणाली का कैलिब्रेटेड परीक्षण करते हैं और डिजिटल प्रूफ रिपोर्ट में परिणाम रिकॉर्ड करते हैं।'
            : 'Every check is documented with photo telemetry and micrometer readings in your Digital Proof Report before any work commences.'}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {service.checks.map((chk, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-[var(--surface-muted)] border border-[var(--border)] text-xs text-[var(--text)] flex items-start gap-2.5 font-medium"
            >
              <span className="text-[var(--accent)] font-mono">[{idx + 1}]</span>
              <span>{chk[locale]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Questions to Ask Us */}
      <div className="bg-[var(--surface-muted)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-base font-bold text-[var(--text)]">
          <HelpCircle className="w-5 h-5 text-[var(--accent)]" />
          <h2>{locale === 'hi' ? 'हमसे पूछने योग्य पारदर्शी सवाल' : 'Questions to Ask Our Service Advisor'}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {service.askUs.map((ask, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-xs font-semibold text-[var(--text)] leading-relaxed"
            >
              "{ask[locale]}"
            </div>
          ))}
        </div>
      </div>

      {/* Related Services Links */}
      {service.related.length > 0 && (
        <div className="pt-4 border-t border-[var(--border)] space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--text-muted)]">
            {locale === 'hi' ? 'संबंधित कार्यशाला सेवाएं:' : 'Related Workshop Services:'}
          </h3>
          <div className="flex flex-wrap gap-3">
            {service.related.map((relSlug) => {
              const rel = getServiceBySlug(relSlug);
              if (!rel) return null;
              return (
                <Link
                  key={relSlug}
                  to={`/services/${relSlug}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[var(--surface)] hover:bg-[var(--surface-muted)] border border-[var(--border)] text-[var(--text)] transition-colors"
                >
                  <span>{rel.name[locale]}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--accent)]" />
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
