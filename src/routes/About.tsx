import { Link } from 'react-router-dom';
import { useStore } from '@/store';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function About() {
  const { language } = useStore();

  const principles = [
    {
      icon: '🔍',
      title: { en: 'Calibrated Evidence First', hi: 'सत्यापित साक्ष्य पहले' },
      description: {
        en: 'No spanner turns and no repair is recommended without verifiable micrometer photos, OBD-II freeze frames, and clear discard limits.',
        hi: 'बिना माइक्रोमीटर फोटो, OBD-II फ्रीज-फ्रेम और स्पष्ट सीमा विनिर्देश के कोई काम शुरू नहीं किया जाता।'
      }
    },
    {
      icon: '🛡️',
      title: { en: 'Zero Sales Commissions', hi: 'शून्य बिक्री कमीशन' },
      description: {
        en: 'Our technicians are paid fair, transparent hourly salaries with zero incentive to upsell unnecessary parts or services.',
        hi: 'हमारे तकनीशियनों को निश्चित वेतन मिलता है; गैर-जरूरी पार्ट्स बेचने का कोई कमीशन या दबाव नहीं होता।'
      }
    },
    {
      icon: '⚡',
      title: { en: 'Precision Torque Engineering', hi: 'सटीक टॉर्क इंजीनियरिंग' },
      description: {
        en: 'Every critical fastener is torqued to exact manufacturer Newton-metres using ISO 6789 annually calibrated digital torque wrenches.',
        hi: 'प्रत्येक महत्वपूर्ण बोल्ट को वार्षिक रूप से कैलिब्रेटेड डिजिटल टॉर्क रिंच से निर्माता के अनुसार कसा जाता है।'
      }
    },
    {
      icon: '🌱',
      title: { en: '100% Responsible Recycling', hi: '100% पर्यावरण-अनुकूल निपटान' },
      description: {
        en: 'Every drop of drained engine oil, coolant, and worn rubber tyre is tracked through licensed environmental neutralization facilities.',
        hi: 'प्रयुक्त इंजन ऑयल, कूलेंट और टायरों का लाइसेंस प्राप्त पर्यावरण केंद्रों पर पुनर्चक्रण किया जाता है।'
      }
    }
  ];

  const milestones = [
    {
      year: '2016',
      title: { en: 'Founded in North Yard', hi: 'नॉर्थ यार्ड में स्थापना' },
      text: {
        en: 'Master Technician Tomas Hale opens a 3-bay independent workshop based on a single radical rule: show the customer the worn part and the micrometer before replacing it.',
        hi: 'मास्टर तकनीशियन टॉमस हेल ने एक सिद्धांत पर 3-बे वर्कशॉप शुरू की: बदलने से पहले ग्राहक को घिसा हुआ पार्ट और माप दिखाएं।'
      }
    },
    {
      year: '2019',
      title: { en: 'The Click Guarantee Launch', hi: 'क्लिक गारंटी की शुरुआत' },
      text: {
        en: 'Formalized our binding written estimate policy and digital proof tokens, guaranteeing zero unauthorized additions to customer invoices.',
        hi: 'लिखित कोटेशन और डिजिटल साक्ष्य नीति लागू की, जिससे बिना पूर्व अनुमति के कोई शुल्क न जुड़ना सुनिश्चित हुआ।'
      }
    },
    {
      year: '2022',
      title: { en: 'EV High-Voltage Academy', hi: 'ईवी हाई-वोल्टेज अकादमी' },
      text: {
        en: 'Opened the South EV facility with dedicated 1,000V insulated isolation bays and 100% funded EV technician apprenticeships.',
        hi: 'साउथ ईवी सुविधा शुरू की, जिसमें 1,000V इंसुलेटेड आइसोलेशन बे और पूर्ण प्रायोजित ईवी शिक्षुता शामिल है।'
      }
    },
    {
      year: '2025',
      title: { en: 'Digital Garage Portal & Expansion', hi: 'डिजिटल गैराज पोर्टल व विस्तार' },
      text: {
        en: 'Launched transparent digital logbooks, live Bay Board progress tracking, and 3 regional fully-equipped workshop facilities.',
        hi: 'डिजिटल लॉगबुक, लाइव बे बोर्ड ट्रैकिंग और 3 क्षेत्रीय पूर्ण-सुसज्जित वर्कशॉप केंद्रों का विस्तार।'
      }
    }
  ];

  return (
    <div className="space-y-12 py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Header */}
      <div className="bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-md space-y-6">
        <div className="flex items-center gap-3">
          <Badge variant="neutral" className="text-xs font-mono uppercase tracking-wider py-1 px-3">
            🔧 The Torquewell Standard
          </Badge>
          <span className="text-xs font-mono text-[var(--accent)] font-semibold">
            {language === 'hi' ? 'हमारी कहानी और सिद्धांत' : 'Our Story & Purpose'}
          </span>
        </div>

        <div className="max-w-3xl space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif tracking-tight text-[var(--text)]">
            {language === 'hi'
              ? 'साक्ष्य पर निर्मित गैराज'
              : 'The Garage Built on Verifiable Evidence.'}
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed">
            {language === 'hi'
              ? 'टॉर्कवेल ऑटो की स्थापना एक सरल विचार से हुई थी: गैराज और कार मालिक के बीच विश्वास को पुनर्स्थापित करना। कोई तकनीकी शब्दावली का भ्रम नहीं, कोई अनधिकृत बिल नहीं।'
              : 'Torquewell Auto was founded on a singular premise: automotive repair should never require blind trust. We replace asymmetric jargon with calibrated measurements, photographic evidence, and written consent.'}
          </p>
        </div>

        <div className="pt-2 flex flex-wrap items-center gap-4">
          <Link to="/crew">
            <Button variant="primary" className="text-sm font-semibold">
              👥 {language === 'hi' ? 'हमारी बे टीम से मिलें' : 'Meet The Bay Crew'}
            </Button>
          </Link>
          <Link to="/policies">
            <Button variant="secondary" className="text-sm">
              {language === 'hi' ? 'हमारी वारंटी व नीतियां →' : 'Our Policies & Warranty →'}
            </Button>
          </Link>
        </div>
      </div>

      {/* 1. Core Principles Grid */}
      <section className="space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-semibold">
            {language === 'hi' ? 'मूल सिद्धांत' : 'Core Operating Principles'}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold font-serif">
            {language === 'hi' ? 'हम अन्य वर्कशॉप से अलग क्यों हैं' : 'How We Engineer Complete Trust'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {principles.map((p, idx) => (
            <div
              key={idx}
              className="bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded-2xl p-6 space-y-3 shadow-sm hover:border-[var(--accent)]/40 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-[var(--surface-sunken)] border border-[var(--border-subtle)] text-xl flex items-center justify-center">
                {p.icon}
              </div>
              <h3 className="font-serif font-bold text-lg text-[var(--text)]">
                {language === 'hi' ? p.title.hi : p.title.en}
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                {language === 'hi' ? p.description.hi : p.description.en}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Tomas Hale Founder Story */}
      <section className="bg-[var(--surface-sunken)] border border-[var(--border-subtle)] rounded-3xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-4 flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-40 h-40 rounded-full border-4 border-[var(--accent)] bg-[var(--surface-elevated)] flex items-center justify-center text-5xl shadow-lg">
            👨‍🔧
          </div>
          <div>
            <h3 className="text-xl font-bold font-serif text-[var(--text)]">Tomas Hale</h3>
            <span className="text-xs font-mono text-[var(--accent)]">
              {language === 'hi' ? 'संस्थापक और मास्टर तकनीशियन' : 'Founder & Master Technician'}
            </span>
          </div>
          <Badge variant="neutral" className="text-[11px] font-mono">
            30+ Years Workshop Experience
          </Badge>
        </div>

        <div className="lg:col-span-8 space-y-4 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-semibold block">
            {language === 'hi' ? 'संस्थापक का संदेश' : 'Founder Note'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[var(--text)]">
            {language === 'hi'
              ? '"यदि आप साक्ष्य नहीं दिखा सकते, तो आप मरम्मत की सिफारिश नहीं कर सकते।"'
              : '"If you cannot show the customer the evidence, you should not be recommending the repair."'}
          </h2>
          <p>
            {language === 'hi'
              ? 'तीन दशकों तक मोटर व्यापार में काम करने के बाद, मैंने देखा कि ग्राहक अक्सर डरे हुए या भ्रमित रहते थे। वर्कशॉप ऐसे शब्दों का इस्तेमाल करती थीं जिन्हें कोई नहीं समझता था और बिल में अप्रत्याशित शुल्क जोड़ देती थीं।'
              : 'After three decades on workshop floors, I witnessed first-hand why ordinary motorists felt anxiety when visiting a garage. Cryptic terminology, opaque estimates, and sudden surprises on collection day eroded public trust.'}
          </p>
          <p>
            {language === 'hi'
              ? 'टॉर्कवेल ऑटो की स्थापना इस चक्र को समाप्त करने के लिए हुई थी। हम हर बोल्ट को सही टॉर्क पर कसते हैं, हर घिसे हुए पुर्जे को मापते हैं और काम शुरू करने से पहले लिखित सहमति लेते हैं। यह कोई विपणन वादा नहीं है — यह हमारी कार्यप्रणाली है।'
              : 'Torquewell Auto was built to eradicate that experience entirely. We measure every worn component with digital micrometers, photograph the evidence, and obtain clear written authorization before a single spanner turns. That is the Click Guarantee.'}
          </p>
        </div>
      </section>

      {/* 3. Milestone Timeline */}
      <section className="space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-semibold">
            {language === 'hi' ? 'विकास यात्रा' : 'Our Progression'}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold font-serif">
            {language === 'hi' ? 'विश्वास और विस्तार के 10 वर्ष' : 'A Decade of Calibrated Progress'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {milestones.map((m, idx) => (
            <div
              key={idx}
              className="bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded-2xl p-6 space-y-2.5 shadow-sm"
            >
              <span className="text-2xl font-mono font-bold text-[var(--accent)]">
                {m.year}
              </span>
              <h3 className="font-serif font-bold text-base text-[var(--text)]">
                {language === 'hi' ? m.title.hi : m.title.en}
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                {language === 'hi' ? m.text.hi : m.text.en}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <div className="p-8 bg-[var(--surface-sunken)] rounded-3xl border border-[var(--border-subtle)] text-center space-y-4">
        <h3 className="text-2xl font-bold font-serif">
          {language === 'hi' ? 'अंतर का अनुभव करें' : 'Experience the Torquewell Difference'}
        </h3>
        <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-xl mx-auto">
          {language === 'hi'
            ? 'अपनी अगली सर्विस बुक करें और देखें कि साक्ष्य-आधारित कार्यशाला कैसी होनी चाहिए।'
            : 'Book your vehicle in with our master technicians and see the evidence before any spanner turns.'}
        </p>
        <Link to="/book">
          <Button variant="primary" className="text-sm font-semibold px-8 py-3">
            {language === 'hi' ? 'सर्विस स्लॉट बुक करें →' : 'Book Workshop Appointment →'}
          </Button>
        </Link>
      </div>
    </div>
  );
}
