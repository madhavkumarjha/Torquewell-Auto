import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { WORKSHOP_SERVICES } from '@/data/services';
import { usePrefs } from '@/store/prefs';
import { Locale } from '@/types';
import {
  Wrench,
  Search,
  Clock,
  ArrowRight,
  ShieldCheck,
  Disc,
  CircleDot,
  Layers,
  Cpu,
  Cog,
  Wind,
  Zap,
  Flame,
  Thermometer,
  BatteryCharging,
  Shield,
  FileCheck,
  Truck
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Wrench,
  Disc,
  CircleDot,
  Layers,
  Cpu,
  Cog,
  Wind,
  Zap,
  Flame,
  Thermometer,
  BatteryCharging,
  Shield,
  FileCheck,
  Truck
};

export default function Services() {
  const { locale } = usePrefs() as { locale: Locale };
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'routine' | 'safety' | 'powertrain' | 'specialty'>('all');

  const categories = [
    { id: 'all', label: { en: 'All 14 Services', hi: 'सभी 14 सेवाएं' } },
    { id: 'routine', label: { en: 'Routine Care', hi: 'नियमित देखभाल' } },
    { id: 'safety', label: { en: 'Brakes & Chassis', hi: 'ब्रेक और चेसिस' } },
    { id: 'powertrain', label: { en: 'Engine & Electrical', hi: 'इंजन और इलेक्ट्रिकल' } },
    { id: 'specialty', label: { en: 'Specialty & Fleet', hi: 'विशेषज्ञ और फ्लीट' } }
  ];

  const getCategoryForService = (slug: string) => {
    if (['service', 'air-conditioning', 'inspection-prep'].includes(slug)) return 'routine';
    if (['brakes', 'tyres-alignment', 'suspension-steering'].includes(slug)) return 'safety';
    if (['diagnostics', 'clutch-transmission', 'battery-electrics', 'exhaust-emissions', 'cooling'].includes(slug))
      return 'powertrain';
    return 'specialty';
  };

  const filteredServices = useMemo(() => {
    return WORKSHOP_SERVICES.filter((s) => {
      if (selectedCategory !== 'all' && getCategoryForService(s.slug) !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const nameMatch = (s.name[locale] || s.name.en).toLowerCase().includes(q);
        const summaryMatch = (s.summary[locale] || s.summary.en).toLowerCase().includes(q);
        const signsMatch = s.signs.some((sign) =>
          (sign[locale] || sign.en).toLowerCase().includes(q)
        );
        if (!nameMatch && !summaryMatch && !signsMatch) return false;
      }
      return true;
    });
  }, [selectedCategory, searchQuery, locale]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[var(--border)]">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent)] font-semibold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            {locale === 'hi' ? '14 विशिष्ट कार्यशाला बे' : '14 Precision Workshop Bays'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text)] mt-2">
            {locale === 'hi' ? 'कार्यशाला सेवाएं' : 'Our Workshop Services'}
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-2 max-w-2xl leading-relaxed">
            {locale === 'hi'
              ? 'प्रत्येक कार्य के लिए मानकीकृत लेबर समय, पारदर्शी मूल्य सीमा और डिजिटल फोटो प्रमाण। कोई अनावश्यक बदलाव नहीं।'
              : 'Every bay operates under our Click Guarantee. Transparent price bands, indicative repair hours, and verifiable digital photo evidence.'}
          </p>
        </div>

        <Link
          to="/menu"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-[var(--accent)] text-[var(--accent-fg)] hover:opacity-90 transition-opacity shadow-sm flex-shrink-0"
        >
          {locale === 'hi' ? 'सर्विस पैकेज तुलना देखें' : 'Compare Service Packages'}
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelectedCategory(c.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors border ${
                selectedCategory === c.id
                  ? 'bg-[var(--accent)] text-[var(--accent-fg)] border-[var(--accent)]'
                  : 'bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text)] border-[var(--border)]'
              }`}
            >
              {c.label[locale]}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-[var(--text-muted)] pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={locale === 'hi' ? 'लक्षण या सेवा खोजें...' : 'Search by symptom or service...'}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl text-xs bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
          />
        </div>
      </div>

      {/* Services Grid (14 Services) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => {
          const IconComp = ICON_MAP[service.icon] || Wrench;
          return (
            <div
              key={service.slug}
              className="bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-strong)] rounded-2xl p-6 transition-all shadow-sm hover:shadow-md flex flex-col justify-between group"
            >
              <div>
                {/* Card Top: Icon & Indicative Time */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--text-muted)] bg-[var(--surface-muted)] px-2.5 py-1 rounded-full border border-[var(--border)]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>
                      {Math.floor(service.timeRangeMin[0] / 60)}–{Math.ceil(service.timeRangeMin[1] / 60)} hrs
                    </span>
                  </div>
                </div>

                {/* Service Name */}
                <h2 className="text-lg font-bold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors mb-2">
                  {service.name[locale]}
                </h2>

                {/* Summary */}
                <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4">
                  {service.summary[locale]}
                </p>

                {/* Checklist Preview */}
                <div className="space-y-1.5 mb-5 border-t border-[var(--border)] pt-3">
                  <span className="text-[11px] font-mono uppercase text-[var(--text-muted)] block">
                    {locale === 'hi' ? 'जांच में शामिल:' : 'Key checks include:'}
                  </span>
                  <ul className="text-xs text-[var(--text)] space-y-1">
                    {service.covers.slice(0, 2).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[var(--accent)] mt-0.5">✓</span>
                        <span className="line-clamp-1">{item[locale]}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer: Price Band & Link */}
              <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[var(--text-muted)] block uppercase">
                    {locale === 'hi' ? 'सांकेतिक मूल्य सीमा' : 'Indicative Range'}
                  </span>
                  <span className="font-mono font-bold text-base text-[var(--text)]">
                    £{service.priceBand[0]} – £{service.priceBand[1]}
                  </span>
                </div>

                <Link
                  to={`/services/${service.slug}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[var(--surface-muted)] hover:bg-[var(--accent)] hover:text-[var(--accent-fg)] text-[var(--text)] border border-[var(--border)] transition-colors"
                >
                  {locale === 'hi' ? 'विवरण' : 'Details'}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Educational Banner */}
      <div className="p-6 rounded-2xl bg-[var(--surface-muted)] border border-[var(--border)] text-xs text-[var(--text-muted)] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <strong className="text-[var(--text)] block text-sm mb-1">
            {locale === 'hi' ? 'निश्चित नहीं कि आपके वाहन को क्या चाहिए?' : 'Not sure what your vehicle needs?'}
          </strong>
          {locale === 'hi'
            ? 'हमारा 2-मिनट का लक्षण और चेतावनी-लाइट गाइड आपको बताएगा कि क्या गाड़ी चलाना सुरक्षित है।'
            : 'Use our 2-minute transparent safety triage guide before booking.'}
        </div>
        <Link
          to="/guide"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[var(--surface)] text-[var(--text)] border border-[var(--border)] hover:border-[var(--accent)] transition-colors flex-shrink-0"
        >
          {locale === 'hi' ? 'लक्षण गाइड खोलें' : 'Launch Symptom Guide'}
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
