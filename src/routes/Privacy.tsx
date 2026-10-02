import { useStore } from '@/store';
import { Badge } from '@/components/ui/Badge';

export default function Privacy() {
  const { language } = useStore();

  return (
    <div className="space-y-10 py-8 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="space-y-3 pb-6 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-2">
          <Badge variant="neutral" className="text-xs font-mono uppercase tracking-wider">
            Zero-Tracker Architecture
          </Badge>
          <span className="text-xs font-mono text-[var(--text-muted)]">
            Last Updated: 2026-10-01
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif tracking-tight text-[var(--text)]">
          {language === 'hi' ? 'गोपनीयता नीति' : 'Privacy Notice & Data Protection'}
        </h1>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed">
          {language === 'hi'
            ? 'टॉर्कवेल ऑटो शून्य थर्ड-पार्टी विज्ञापन ट्रैकर्स के सिद्धांत पर काम करता है। आपका व्यक्तिगत और वाहन डेटा पूरी तरह सुरक्षित है।'
            : 'How Torquewell Auto collects, processes, and protects your personal and vehicle data under GDPR and the Data Protection Act 2018.'}
        </p>
      </div>

      {/* Content Sections */}
      <div className="space-y-8 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
        <section className="bg-[var(--surface-elevated)] p-6 sm:p-8 rounded-2xl border border-[var(--border-subtle)] space-y-3 shadow-sm">
          <h2 className="text-lg font-bold font-serif text-[var(--text)]">
            {language === 'hi' ? '1. हमारा गोपनीयता-प्रथम वादा' : '1. Privacy-by-Design Architecture'}
          </h2>
          <p>
            {language === 'hi'
              ? 'हम किसी भी तृतीय-पक्ष विज्ञापन नेटवर्क या ट्रैकिंग कुकीज़ का उपयोग नहीं करते हैं। आपकी साइट प्राथमिकताएं (भाषा, इकाइयां, डार्क/लाइट थीम, काम मोड) विशेष रूप से आपके ब्राउज़र के स्थानीय स्टोरेज में संग्रहीत की जाती हैं।'
              : 'Torquewell Auto does not deploy third-party advertising cookies, behavioural tracking pixels, or cross-site data brokers. Your site preferences (language, metric/imperial units, theme, Calm Mode) remain strictly inside your browser local storage.'}
          </p>
        </section>

        <section className="bg-[var(--surface-elevated)] p-6 sm:p-8 rounded-2xl border border-[var(--border-subtle)] space-y-3 shadow-sm">
          <h2 className="text-lg font-bold font-serif text-[var(--text)]">
            {language === 'hi' ? '2. हम कौन सा डेटा संसाधित करते हैं' : '2. What Data We Collect & Process'}
          </h2>
          <p>
            {language === 'hi'
              ? 'जब आप कोई सर्विस बुक करते हैं या हमारे पोर्टल का उपयोग करते हैं, तो हम निम्नलिखित आवश्यक जानकारी संसाधित करते हैं:'
              : 'When you book a workshop appointment, request a quote, or access the digital customer portal, we process:'}
          </p>
          <ul className="list-disc list-inside space-y-1 text-[var(--text)]">
            <li>{language === 'hi' ? 'वाहन विवरण: पंजीकरण प्लेट, मेक/मॉडल, माइलेज और ओडोमीटर रीडिंग।' : 'Vehicle data: Registration plate, make/model, powertrain, mileage and service telemetry.'}</li>
            <li>{language === 'hi' ? 'संपर्क जानकारी: आपका नाम, टेलीफोन नंबर (एसएमएस बे अपडेट के लिए), और ईमेल पता।' : 'Contact details: Full name, telephone number (for SMS repair stage notifications), and email address.'}</li>
            <li>{language === 'hi' ? 'साक्ष्य अभिलेख: निरीक्षण फोटो, माइक्रोमीटर रीडिंग और हस्ताक्षरित मरम्मत अनुमोदन।' : 'Audit records: Inspection photographs, gauge readings, and timestamped digital approvals.'}</li>
          </ul>
        </section>

        <section className="bg-[var(--surface-elevated)] p-6 sm:p-8 rounded-2xl border border-[var(--border-subtle)] space-y-3 shadow-sm">
          <h2 className="text-lg font-bold font-serif text-[var(--text)]">
            {language === 'hi' ? '3. आपके कानूनी अधिकार (GDPR)' : '3. Your Statutory GDPR Rights'}
          </h2>
          <p>
            {language === 'hi'
              ? 'आपको अपने डेटा तक पहुंचने, उसमें सुधार करने, उसे मिटाने या पोर्टेबल प्रारूप में डाउनलोड करने का पूरा अधिकार है।'
              : 'You possess statutory rights of access, rectification, data portability, and erasure. To request a full export or deletion of your service records, email privacy@torquewellauto.co.uk.'}
          </p>
        </section>

        <section className="bg-[var(--surface-sunken)] p-6 rounded-2xl border border-[var(--border-subtle)] space-y-2 text-xs">
          <strong className="text-[var(--text)] block font-mono uppercase">
            {language === 'hi' ? 'डेमो प्रकटीकरण:' : 'Demonstration Portfolio Notice:'}
          </strong>
          <p>
            {language === 'hi'
              ? 'इस प्रदर्शन प्लेटफॉर्म पर दिखाए गए सभी वाहन रिकॉर्ड (जैसे टीडब्ल्यू68 एकेजेड) और ग्राहक प्रोफाइल (सैम कार्टर) पूरी तरह से काल्पनिक हैं।'
              : 'Sample records depicted across the Garage Portal and Proof Reports (e.g. Sam Carter / TW68 AKZ) are fictional illustrative customer profiles used for demonstration purposes.'}
          </p>
        </section>
      </div>
    </div>
  );
}
