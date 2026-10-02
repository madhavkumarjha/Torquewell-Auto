import { useState } from 'react';
import { useStore } from '@/store';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function Policies() {
  const { language } = useStore();
  const [copied, setCopied] = useState(false);

  const sections = [
    {
      id: 'written-estimate',
      title: { en: '1. Written Estimate & Prior Authorisation Policy', hi: '1. लिखित कोटेशन और पूर्व अनुमति नीति' },
      badge: 'Zero Surprise Guarantee',
      content: {
        en: 'Under our Click Guarantee, no technician will turn a spanner or fit a replacement part without a prior binding written estimate signed or digitally authorized by the customer. If unexpected wear or a seized fastener is discovered during strip-down, work pauses immediately, photographic evidence is sent to your portal/SMS, and explicit variation consent is required before proceeding.',
        hi: 'हमारी क्लिक गारंटी के तहत, ग्राहक की लिखित या डिजिटल सहमति के बिना कोई भी पुर्जा नहीं बदला जाएगा। यदि काम के दौरान कोई अतिरिक्त खराबी पाई जाती है, तो काम तुरंत रोककर आपको फोटो साक्ष्य भेजा जाएगा और आपकी मंजूरी के बाद ही काम आगे बढ़ेगा।'
      }
    },
    {
      id: 'parts-warranty',
      title: { en: '2. The 4 Parts Tiers & Warranty Terms', hi: '2. पार्ट्स के 4 स्तर और वारंटी शर्तें' },
      badge: '12 to 24 Months Coverage',
      content: {
        en: 'We offer 4 clear parts categories with full transparency:\n• TorqueSpec OE (Original Equipment): Carmaker genuine parts backed by 24-month / 24,000 km warranty.\n• OE-Equivalent (Tier-1 Suppliers): Manufactured by OEM suppliers (Bosch, Brembo, Mann, Bilstein) with identical metallurgy and 24-month warranty.\n• Quality Aftermarket: Certified replacement parts complying with ECE R90 and ISO standards with 12-month warranty.\n• Remanufactured: Rebuilt alternators, steering racks, and gearboxes with 12-month eco-warranty.',
        hi: 'हम 4 स्पष्ट पार्ट्स श्रेणियां प्रदान करते हैं:\n• TorqueSpec OE: ओरिजिनल पार्ट्स, 24 महीने की वारंटी।\n• OE-समतुल्य: टियर-1 कंपनियों (Bosch, Brembo) द्वारा निर्मित, समान गुणवत्ता और 24 महीने की वारंटी।\n• आफ्टरमार्केट: ECE R90 प्रमाणित पार्ट्स, 12 महीने की वारंटी।\n• रीमैन्युफैक्चर्ड: फैक्ट्री रीबिल्ट पार्ट्स, 12 महीने की पर्यावरण वारंटी।'
      }
    },
    {
      id: 'returned-parts',
      title: { en: '3. Returned Parts Inspection Policy', hi: '3. बदले गए पार्ट्स वापसी नीति' },
      badge: 'Complete Transparency',
      content: {
        en: 'Every customer is entitled to inspect and keep all replaced components. Worn brake pads, timing belts, and filters are sealed in clear protective bags and placed in your boot at vehicle handover, unless components are subject to mandatory environmental surcharge exchange (e.g. 12V lead-acid batteries or remanufactured steering racks).',
        hi: 'प्रत्येक ग्राहक को बदले गए पुर्जे देखने और अपने साथ ले जाने का पूरा अधिकार है। पुराने ब्रेक पैड और फिल्टर प्लास्टिक बैग में सील करके आपकी डिक्की में रखे जाते हैं, जब तक कि वे अनिवार्य रीसाइक्लिंग एक्सचेंज के तहत न हों।'
      }
    },
    {
      id: 'block-exemption',
      title: { en: '4. Motor Vehicle Block Exemption & New-Car Warranty', hi: '4. मोटर वाहन ब्लॉक छूट और नई कार वारंटी सुरक्षा' },
      badge: 'Statutory Consumer Right',
      content: {
        en: 'Under Motor Vehicle Block Exemption Regulations (MVBER), vehicle manufacturers cannot invalidate your new-car warranty simply because servicing was performed at an independent workshop, provided service intervals and OE-matching quality parts meet manufacturer schedules. We stamp and log all digital service records accurately.',
        hi: 'मोटर वाहन ब्लॉक छूट नियमों के तहत, स्वतंत्र वर्कशॉप में सर्विस कराने से आपकी नई कार की वारंटी रद्द नहीं होती, बशर्ते निर्माता के दिशानिर्देशों और OE-गुणवत्ता वाले पार्ट्स का पालन किया गया हो।'
      }
    },
    {
      id: 'environmental-waste',
      title: { en: '5. Environmental & Hazardous Waste Handling', hi: '5. पर्यावरण और खतरनाक कचरा प्रबंधन' },
      badge: 'Zero Landfill Protocol',
      content: {
        en: 'Torquewell operates under strict hazardous waste compliance licenses. 100% of drained motor oil is sent to licensed refining plants, worn tyres undergo cryogenic crumb-rubber retreading, glycol coolants are chemically neutralized, and scrap iron rotors are recycled into structural steel.',
        hi: 'टॉर्कवेल सख्त पर्यावरण नियमों का पालन करता है। इस्तेमाल किए गए तेल का 100% रिफाइनिंग प्लांट्स में भेजा जाता है, पुराने टायरों का पुनर्चक्रण होता है और धातु डिस्क को रीसायकल किया जाता है।'
      }
    },
    {
      id: 'complaints-resolution',
      title: { en: '6. Complaints Procedure & Alternative Dispute Resolution', hi: '6. शिकायत निवारण और समाधान प्रक्रिया' },
      badge: '5-Day Resolution SLA',
      content: {
        en: 'If you are dissatisfied with any aspect of our service, we commit to acknowledging your concern within 4 business hours and completing an independent master technician reinspection within 5 business days. We subscribe to accredited Alternative Dispute Resolution (ADR) codes of practice.',
        hi: 'यदि आप हमारी सेवा से असंतुष्ट हैं, तो हम 4 व्यावसायिक घंटों में आपकी शिकायत दर्ज करेंगे और 5 दिनों में स्वतंत्र मास्टर तकनीशियन द्वारा पुनः निरीक्षण कर समाधान प्रदान करेंगे।'
      }
    }
  ];

  const handlePrint = () => {
    window.print();
  };

  const handleCopySummary = () => {
    const text = sections.map(s => `${language === 'hi' ? s.title.hi : s.title.en}\n${language === 'hi' ? s.content.hi : s.content.en}`).join('\n\n');
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-12 py-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[var(--border-subtle)]">
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-semibold">
              {language === 'hi' ? 'उपभोक्ता अधिकार व नीतियां' : 'Consumer Rights & Policies'}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif tracking-tight text-[var(--text)]">
            {language === 'hi' ? 'वारंटी, पुर्जे व कार्यशाला नीतियां' : 'Warranty, Parts & Workshop Policies'}
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
            {language === 'hi'
              ? 'लिखित कोटेशन, पार्ट्स वारंटी स्तर, ब्लॉक छूट नियम और कचरा निपटान के लिए हमारे पारदर्शी मानक।'
              : 'Our legally binding commitments regarding written authorisations, parts tiers, environmental handling, and statutory consumer rights.'}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button variant="secondary" onClick={handleCopySummary} className="text-xs">
            {copied ? (language === 'hi' ? '✓ कॉपी हुआ' : '✓ Copied') : (language === 'hi' ? 'नीति सारांश कॉपी करें' : 'Copy Summary')}
          </Button>
          <Button variant="secondary" onClick={handlePrint} className="text-xs">
            {language === 'hi' ? '🖨️ A4 प्रिंट करें' : '🖨️ Print Policies'}
          </Button>
        </div>
      </div>

      {/* Policy Sections */}
      <div className="space-y-8">
        {sections.map(section => (
          <article
            key={section.id}
            id={section.id}
            className="bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[var(--border-subtle)]">
              <h2 className="text-xl font-bold font-serif text-[var(--text)]">
                {language === 'hi' ? section.title.hi : section.title.en}
              </h2>
              <Badge variant="neutral" className="text-[10px] font-mono self-start sm:self-auto">
                {section.badge}
              </Badge>
            </div>

            <div className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed space-y-2 whitespace-pre-line">
              {language === 'hi' ? section.content.hi : section.content.en}
            </div>
          </article>
        ))}
      </div>

      {/* Legal & Regulatory Notice */}
      <footer className="p-4 bg-[var(--surface-sunken)] rounded-xl border border-[var(--border-subtle)] text-xs text-[var(--text-muted)] text-center space-y-1">
        <p>
          {language === 'hi'
            ? 'टॉर्कवेल ऑटो नीतियां उपभोक्ता अधिकार अधिनियम 2015 और मोटर वाहन ब्लॉक छूट विनियमों का पूर्ण पालन करती हैं।'
            : 'Torquewell Auto policies comply with the Consumer Rights Act 2015, Motor Vehicle Block Exemption Regulations, and Environmental Protection standards.'}
        </p>
      </footer>
    </div>
  );
}
