import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '@/store';
import { Badge } from '@/components/ui/Badge';

export default function Sitemap() {
  const { language } = useStore();
  const [search, setSearch] = useState('');

  const groups = [
    {
      category: { en: 'Core Services & Emergency', hi: 'मुख्य सेवाएं और आपातकाल' },
      routes: [
        { path: '/', title: { en: 'Home (Brand & Hero)', hi: 'होम पेज' }, desc: { en: 'Main landing page, value architecture and drive-in story', hi: 'मुख्य लैंडिंग पेज व ड्राइव-इन कहानी' } },
        { path: '/help', title: { en: 'Emergency Help Now', hi: 'आपातकालीन सहायता' }, desc: { en: 'Instant 1-click roadside dialling, safety checklist & towing guide', hi: 'सड़क किनारे आपातकालीन सहायता व सुरक्षा निर्देश' } },
        { path: '/book', title: { en: 'Book Workshop Appointment', hi: 'वर्कशॉप अपॉइंटमेंट बुक करें' }, desc: { en: '4-step interactive booking stepper with calendar .ics download', hi: '4-चरणीय बुकिंग विज़ार्ड और कैलेंडर डाउनलोड' } },
        { path: '/guide', title: { en: 'Symptom & Warning-Light Guide', hi: 'लक्षण व चेतावनी बत्ती गाइड' }, desc: { en: '5-step triage decision wizard & downloadable Symptom Sheet', hi: 'सुरक्षा निर्णय विज़ार्ड और डाउनलोड करने योग्य लक्षण पत्र' } },
        { path: '/contact', title: { en: 'Contact & Helpdesks', hi: 'संपर्क व सहायता केंद्र' }, desc: { en: 'Branch phone lines, routed inquiry form and directions', hi: 'शाखा फोन नंबर, पूछताछ फॉर्म और पते' } }
      ]
    },
    {
      category: { en: 'Workshop Services & Pricing', hi: 'वर्कशॉप सेवाएं व मूल्य' },
      routes: [
        { path: '/services', title: { en: 'Workshop Services Catalog', hi: 'सभी वर्कशॉप सेवाएं' }, desc: { en: '14 comprehensive maintenance services and inspection checks', hi: '14 रखरखाव सेवाएं और तकनीकी जांच' } },
        { path: '/menu', title: { en: 'Fixed-Scope Service Menu', hi: 'फिक्स-प्राइस सर्विस मेनू' }, desc: { en: 'Interim, Full, and Major packages with honest exclusion lists', hi: '3 निश्चित पैकेज और तुलना मैट्रिक्स' } },
        { path: '/prices', title: { en: 'Fair-Price Breakdown Estimator', hi: 'उचित मूल्य कैलकुलेटर' }, desc: { en: 'Labour hours, 3 parts tiers, and "Only what is needed now" toggle', hi: 'लेबर समय, 3 पार्ट्स स्तर और लागत ब्रेकडाउन' } }
      ]
    },
    {
      category: { en: 'Transparency & Evidence', hi: 'पारदर्शिता और साक्ष्य' },
      routes: [
        { path: '/journey', title: { en: 'The Bay Board & Repair Journey', hi: 'बे बोर्ड और मरम्मत यात्रा' }, desc: { en: 'Live 4-bay workshop telemetry simulator & 9-stage standard journey', hi: 'लाइव बे बोर्ड और 9-चरणीय मानक मरम्मत प्रक्रिया' } },
        { path: '/proof', title: { en: 'Digital Proof Report', hi: 'डिजिटल प्रूफ रिपोर्ट' }, desc: { en: 'Verified vehicle inspection with micrometer photos and wear gauges', hi: 'सत्यापित वाहन निरीक्षण रिपोर्ट और फोटो तुलना' } },
        { path: '/mileage-map', title: { en: 'The Mileage Map Roadmap', hi: 'माइलेज मैप सर्विस रोडमैप' }, desc: { en: 'Visual highway timeline spanning 0 to 160,000 km with "What can wait"', hi: 'सड़क समयरेखा और माइलेज चेकपॉइंट' } },
        { path: '/portal', title: { en: 'Garage Customer & Fleet Portal', hi: 'ग्राहक व फ्लीट पोर्टल' }, desc: { en: 'Digital logbook, pending repair approvals, VAT invoices & fleet view', hi: 'डिजिटल लॉगबुक, अनुमोदन और इनवॉइस पोर्टल' } }
      ]
    },
    {
      category: { en: 'Technical Education & Specialisms', hi: 'तकनीकी शिक्षा व विशेषज्ञताएं' },
      routes: [
        { path: '/know', title: { en: 'Know Your Car (Hub & Anatomy)', hi: 'अपनी कार को समझें' }, desc: { en: 'Interactive exploded car anatomy, tyre coin test & 20 technical guides', hi: 'इंटरएक्टिव कार एनाटॉमी और 20 तकनीकी लेख' } },
        { path: '/ev', title: { en: 'Electric & Hybrid Workshop', hi: 'इलेक्ट्रिक व हाइब्रिड वर्कशॉप' }, desc: { en: '1000V CAT III tooling specs, Battery SOH simulator & myth busters', hi: '1000V हाई-वोल्टेज टूल्स, बैटरी SOH और मिथक सच' } },
        { path: '/fleet', title: { en: 'Fleet & Commercial Van Care', hi: 'फ्लीट व कमर्शियल वैन केयर' }, desc: { en: '4-hour SLAs, ROI downtime calculator & corporate account onboarding', hi: '4-घंटे का SLA, डाउनटाइम कैलकुलेटर और फ्लीट खाते' } }
      ]
    },
    {
      category: { en: 'The Bay Team & Locations', hi: 'हमारी टीम और स्थान' },
      routes: [
        { path: '/crew', title: { en: 'The Bay Crew & Org Hierarchy', hi: 'वर्कशॉप टीम व संरचना' }, desc: { en: 'Workshop blueprint floor plan and accessible technician hierarchy', hi: 'वर्कशॉप फ्लोर प्लान और तकनीशियन प्रोफाइल' } },
        { path: '/locations', title: { en: 'Workshop Branch Locations', hi: 'वर्कशॉप शाखाएं' }, desc: { en: 'Central, North, and South EV facilities with charging and hours', hi: 'सेंट्रल, नॉर्थ और साउथ ईवी शाखाओं का विवरण' } },
        { path: '/careers', title: { en: 'Careers & Apprentice Academy', hi: 'करियर व शिक्षुता अकादमी' }, desc: { en: '4-year apprentice roadmap, issued tooling & open positions', hi: '4-वर्षीय शिक्षुता और खुली नौकरियां' } },
        { path: '/about', title: { en: 'About Torquewell Auto', hi: 'टॉर्कवेल ऑटो के बारे में' }, desc: { en: 'Tomas Hale story, operating principles & milestone progression', hi: 'संस्थापक की कहानी और मूल सिद्धांत' } }
      ]
    },
    {
      category: { en: 'Legal, Policies & Accessibility', hi: 'कानूनी नीतियां व सुलभता' },
      routes: [
        { path: '/policies', title: { en: 'Warranty & Workshop Policies', hi: 'वारंटी व कार्यशाला नीतियां' }, desc: { en: 'Written estimates, 4 parts tiers, Block Exemption & waste disposal', hi: 'लिखित कोटेशन, पार्ट्स वारंटी और ब्लॉक छूट' } },
        { path: '/privacy', title: { en: 'Privacy Policy & Zero Trackers', hi: 'गोपनीयता नीति' }, desc: { en: 'GDPR compliance, local storage preferences and data rights', hi: 'जीडीपीआर अनुपालन और शून्य ट्रैकर ढांचा' } },
        { path: '/terms', title: { en: 'Terms of Business Agreement', hi: 'सेवा की शर्तें' }, desc: { en: 'Workshop terms, Click Guarantee conditions and payment rules', hi: 'कार्यशाला नियम और अनुबंध शर्तें' } },
        { path: '/accessibility', title: { en: 'Accessibility Statement', hi: 'सुलभता वक्तव्य' }, desc: { en: 'WCAG 2.2 AA conformance, Calm Mode & physical accommodations', hi: 'WCAG 2.2 AA अनुपालन और काम मोड' } },
        { path: '/sitemap', title: { en: 'Complete Site Index (Sitemap)', hi: 'साइटमैप' }, desc: { en: 'Searchable directory of all 27 pages across the platform', hi: 'सभी 27 पेजों की खोज योग्य निर्देशिका' } }
      ]
    }
  ];

  const filteredGroups = useMemo(() => {
    if (!search.trim()) return groups;
    return groups.map(g => ({
      ...g,
      routes: g.routes.filter(r =>
        r.path.toLowerCase().includes(search.toLowerCase()) ||
        r.title.en.toLowerCase().includes(search.toLowerCase()) ||
        r.title.hi.toLowerCase().includes(search.toLowerCase()) ||
        r.desc.en.toLowerCase().includes(search.toLowerCase())
      )
    })).filter(g => g.routes.length > 0);
  }, [search]);

  return (
    <div className="space-y-10 py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="space-y-3 pb-6 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-2">
          <Badge variant="neutral" className="text-xs font-mono uppercase tracking-wider">
            27 Platform Routes
          </Badge>
          <span className="text-xs font-mono text-[var(--accent)] font-semibold">
            {language === 'hi' ? 'पूर्ण साइट अनुक्रमणिका' : 'Full Site Map Directory'}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif tracking-tight text-[var(--text)]">
          {language === 'hi' ? 'साइटमैप व नेविगेशन अनुक्रमणिका' : 'Complete HTML Sitemap'}
        </h1>
        <p className="text-sm text-[var(--text-muted)] max-w-2xl leading-relaxed">
          {language === 'hi'
            ? 'टॉर्कवेल ऑटो के सभी 27 पेजों और तकनीकी टूल्स की व्यवस्थित सूची।'
            : 'A complete, structured directory of every page, signature feature, and consumer tool across the platform.'}
        </p>

        {/* Search */}
        <div className="pt-2 max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={language === 'hi' ? 'पेज या विषय खोजें...' : 'Search pages (e.g. brakes, prices, ev, portal)...'}
            className="w-full bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded-xl px-4 py-2.5 text-xs text-[var(--text)] focus:ring-2 focus:ring-[var(--accent)] focus:outline-none"
          />
        </div>
      </div>

      {/* Grouped Routes Grid */}
      <div className="space-y-8">
        {filteredGroups.map((group, idx) => (
          <section key={idx} className="space-y-4">
            <h2 className="text-xl font-bold font-serif text-[var(--text)] pb-2 border-b border-[var(--border-subtle)]">
              {language === 'hi' ? group.category.hi : group.category.en}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.routes.map(r => (
                <Link
                  key={r.path}
                  to={r.path}
                  className="p-5 bg-[var(--surface-elevated)] border border-[var(--border-subtle)] hover:border-[var(--accent)]/60 rounded-2xl space-y-2 transition-all hover:shadow-md block group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] text-[var(--accent)] font-semibold px-2 py-0.5 rounded bg-[var(--surface-sunken)]">
                      {r.path}
                    </span>
                    <span className="text-xs text-[var(--text-muted)] group-hover:text-[var(--accent)] group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-sm text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                    {language === 'hi' ? r.title.hi : r.title.en}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    {language === 'hi' ? r.desc.hi : r.desc.en}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
