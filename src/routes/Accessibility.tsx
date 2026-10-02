import { useStore } from '@/store';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function Accessibility() {
  const { language, calmMode, setCalmMode } = useStore();

  const digitalFeatures = [
    {
      title: { en: 'Calm Mode', hi: 'काम मोड (Calm Mode)' },
      desc: {
        en: 'Disables animations, stops dynamic canvas transitions, enlarges base font sizes, and increases color contrast across all pages.',
        hi: 'एनिमेशन बंद करता है, फ़ॉन्ट आकार बढ़ाता है और सभी पेजों पर रंग कंट्रास्ट सुधारता है।'
      }
    },
    {
      title: { en: 'Full Keyboard Navigation', hi: 'पूर्ण कीबोर्ड नेविगेशन' },
      desc: {
        en: 'All interactive elements, command palette (⌘K), car anatomy pins, and repair drawers are 100% operable via Tab, Enter, Space, and Arrow keys.',
        hi: 'कमांड पैलेट (⌘K), हॉटस्पॉट और मेनू कीबोर्ड (Tab, Space, Enter) द्वारा संचालित किए जा सकते हैं।'
      }
    },
    {
      title: { en: 'Screen Reader Optimisations', hi: 'स्क्रीन रीडर अनुकूलन' },
      desc: {
        en: 'Semantic HTML5 landmarks (header, nav, main, aside, footer), ARIA live-regions, descriptive alt text on all SVG diagrams, and table fallbacks.',
        hi: 'सिमेंटिक HTML5 संरचना, ARIA लाइव-रीजन और सभी तकनीकी आरेखों पर वर्णनात्मक विवरण।'
      }
    },
    {
      title: { en: 'Independent Language & Units', hi: 'स्वतंत्र भाषा व इकाइयां' },
      desc: {
        en: 'Switch between English and Hindi, and Metric (km/mm) and Imperial (mi/in) independently at any time.',
        hi: 'अंग्रेजी और हिंदी, तथा मीट्रिक व इंपीरियल इकाइयों के बीच कभी भी स्वतंत्र रूप से स्विच करें।'
      }
    }
  ];

  const physicalFeatures = [
    { en: 'Step-free level access and automated wide sliding entrance doors at all 3 branches', hi: 'सभी 3 शाखाओं पर सीढ़ी-रहित रैंप और चौड़े स्वचालित दरवाजे' },
    { en: 'Induction hearing loops fitted at customer service reception desks', hi: 'रिसेप्शन डेस्क पर इंडक्शन हियरिंग लूप प्रणाली' },
    { en: 'Accessible customer waiting lounges with low-height counters and accessible restrooms', hi: 'सुलभ ग्राहक प्रतीक्षा लाउंज और सुलभ शौचालय' },
    { en: 'Designated disabled parking bays situated directly outside workshop reception', hi: 'वर्कशॉप रिसेप्शन के ठीक बाहर आरक्षित पार्किंग बे' }
  ];

  return (
    <div className="space-y-10 py-8 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="space-y-3 pb-6 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-2">
          <Badge variant="ok" className="text-xs font-mono uppercase tracking-wider">
            WCAG 2.2 AA Conformance
          </Badge>
          <span className="text-xs font-mono text-[var(--text-muted)]">
            Verified Accessible
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif tracking-tight text-[var(--text)]">
          {language === 'hi' ? 'सुलभता व पहुंच वक्तव्य' : 'Accessibility Statement'}
        </h1>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed">
          {language === 'hi'
            ? 'टॉर्कवेल ऑटो हमारी डिजिटल सेवाओं और भौतिक वर्कशॉप केंद्रों को सभी ग्राहकों के लिए सुलभ बनाने के लिए प्रतिबद्ध है।'
            : 'Our commitment to ensuring digital experiences and physical workshop facilities are fully accessible to every motorist.'}
        </p>
      </div>

      {/* Quick Calm Mode Toggle Card */}
      <div className="p-6 bg-[var(--surface-elevated)] border-2 border-[var(--accent)]/40 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div>
          <h2 className="font-serif font-bold text-lg text-[var(--text)]">
            {language === 'hi' ? 'काम मोड (Calm Mode) चालू करें' : 'Toggle Calm Mode Instantly'}
          </h2>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            {calmMode
              ? (language === 'hi' ? 'काम मोड वर्तमान में सक्रिय है (कम गति, उच्च कंट्रास्ट)।' : 'Calm Mode is currently ACTIVE (reduced motion, higher contrast).')
              : (language === 'hi' ? 'सरल दृश्य, कम गति और बड़े टेक्स्ट के लिए काम मोड सक्षम करें।' : 'Enable simplified layout, static fallbacks, and larger text.')}
          </p>
        </div>
        <Button
          variant={calmMode ? 'primary' : 'secondary'}
          onClick={() => setCalmMode(!calmMode)}
          className="text-xs font-semibold shrink-0"
        >
          {calmMode ? '✓ Calm Mode Active' : 'Enable Calm Mode'}
        </Button>
      </div>

      {/* Digital Accessibility Features Grid */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold font-serif text-[var(--text)]">
          {language === 'hi' ? 'डिजिटल प्लेटफॉर्म सुलभता सुविधाएं' : 'Digital Platform Accessibility Features'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {digitalFeatures.map((f, i) => (
            <div key={i} className="p-5 bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded-xl space-y-2 text-xs">
              <h3 className="font-bold text-sm text-[var(--text)] font-serif">{language === 'hi' ? f.title.hi : f.title.en}</h3>
              <p className="text-[var(--text-muted)] leading-relaxed">{language === 'hi' ? f.desc.hi : f.desc.en}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Physical Workshop Accessibility */}
      <section className="bg-[var(--surface-sunken)] p-6 sm:p-8 rounded-2xl border border-[var(--border-subtle)] space-y-4">
        <h2 className="text-xl font-bold font-serif text-[var(--text)]">
          {language === 'hi' ? 'भौतिक वर्कशॉप केंद्रों में सुलभता' : 'Physical Workshop Accessibility Standards'}
        </h2>
        <ul className="space-y-2 text-xs text-[var(--text)]">
          {physicalFeatures.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="text-emerald-400 font-bold shrink-0">✓</span>
              <span>{language === 'hi' ? item.hi : item.en}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Feedback Contact */}
      <footer className="p-6 bg-[var(--surface-elevated)] rounded-2xl border border-[var(--border-subtle)] text-xs text-[var(--text-muted)] space-y-2">
        <strong className="text-[var(--text)] block text-sm font-serif">
          {language === 'hi' ? 'सुलभता प्रतिक्रिया और सहायता' : 'Accessibility Feedback & Assistance'}
        </strong>
        <p>
          {language === 'hi'
            ? 'यदि आपको इस वेबसाइट या हमारी किसी शाखा में कोई बाधा आती है, तो कृपया access@torquewellauto.co.uk पर संपर्क करें।'
            : 'If you encounter any accessibility barrier on this site or in our workshops, please email access@torquewellauto.co.uk or call 020 7946 0192.'}
        </p>
      </footer>
    </div>
  );
}
