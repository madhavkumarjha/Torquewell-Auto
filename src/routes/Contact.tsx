import { useState } from 'react';
import { useStore } from '@/store';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function Contact() {
  const { language } = useStore();
  const [category, setCategory] = useState('booking');
  const [branch, setBranch] = useState('central');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [plate, setPlate] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [refCode, setRefCode] = useState('');

  const contactCards = [
    {
      id: 'roadside',
      icon: '🚨',
      title: { en: '24/7 Roadside Assistance', hi: '24/7 सड़क किनारे आपातकालीन सहायता' },
      info: '0800 867 783 (Toll Free)',
      sub: { en: 'Instant breakdown dispatch & recovery', hi: 'तत्काल ब्रेकडाउन व रिकवरी सहायता' },
      action: 'tel:0800867783'
    },
    {
      id: 'bookings',
      icon: '📅',
      title: { en: 'Workshop Bookings & Quotes', hi: 'वर्कशॉप बुकिंग व कोटेशन' },
      info: '020 7946 0192',
      sub: { en: 'Mon–Sat: 08:00–18:00', hi: 'सोम–शनि: 08:00–18:00' },
      action: 'tel:02079460192'
    },
    {
      id: 'fleet',
      icon: '🚚',
      title: { en: 'Commercial Fleet Accounts', hi: 'कमर्शियल फ्लीट खाते' },
      info: 'fleet@torquewellauto.co.uk',
      sub: { en: 'Dedicated account manager & SLAs', hi: 'समर्पित फ्लीट मैनेजर' },
      action: 'mailto:fleet@torquewellauto.co.uk'
    },
    {
      id: 'careers',
      icon: '🎓',
      title: { en: 'Apprentice Academy & Careers', hi: 'शिक्षुता अकादमी और करियर' },
      info: 'careers@torquewellauto.co.uk',
      sub: { en: 'Technician recruitment team', hi: 'तकनीशियन भर्ती टीम' },
      action: 'mailto:careers@torquewellauto.co.uk'
    }
  ];

  const branches = [
    {
      id: 'central',
      name: { en: 'Branch Central (Hub & Alignment Rig)', hi: 'ब्रांच सेंट्रल (मुख्य केंद्र व अलाइनमेंट)' },
      address: '14 Industrial Way, Central District, London EC1A 1BB',
      phone: '020 7946 0192',
      bays: '8 Bays · 4-Wheel Alignment · Tyre Bay'
    },
    {
      id: 'north',
      name: { en: 'Branch North (Diagnostics & Fleet)', hi: 'ब्रांच नॉर्थ (डायग्नोस्टिक्स व फ्लीट)' },
      address: '88 North Circular Road, London N12 8QQ',
      phone: '020 7946 0194',
      bays: '6 Bays · Fleet Drop-off · Pre-MOT Rig'
    },
    {
      id: 'south',
      name: { en: 'Branch South EV (High-Voltage Centre)', hi: 'ब्रांच साउथ ईवी (हाई-वोल्टेज केंद्र)' },
      address: '42 Southwark Business Park, London SE1 0AA',
      phone: '020 7946 0198',
      bays: '5 Bays · 2x DC Rapid Chargers · 1,000V LOTO Isolation Bay'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = `TW-MSG-${Math.floor(1000 + Math.random() * 9000)}`;
    setRefCode(code);
    setSubmitted(true);
  };

  return (
    <div className="space-y-12 py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="space-y-3 pb-6 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)]" />
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-semibold">
            {language === 'hi' ? 'संपर्क व सहायता' : 'Get in Touch'}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif tracking-tight text-[var(--text)]">
          {language === 'hi' ? 'हमसे संपर्क करें' : 'Contact Torquewell Auto'}
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-2xl leading-relaxed">
          {language === 'hi'
            ? 'आपातकालीन सहायता, वर्कशॉप बुकिंग, फ्लीट अनुबंध या तकनीशियन भर्ती के लिए हमारी टीम से जुड़ें।'
            : 'Whether you need roadside recovery, service quotes, fleet onboarding, or apprentice inquiries, our team is ready.'}
        </p>
      </div>

      {/* 1. Categorized Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {contactCards.map(card => (
          <a
            key={card.id}
            href={card.action}
            className="bg-[var(--surface-elevated)] border border-[var(--border-subtle)] hover:border-[var(--accent)]/50 rounded-2xl p-6 space-y-3 transition-all hover:shadow-md block group"
          >
            <div className="text-2xl">{card.icon}</div>
            <h3 className="font-serif font-bold text-base text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
              {language === 'hi' ? card.title.hi : card.title.en}
            </h3>
            <p className="font-mono text-sm font-bold text-[var(--text)]">
              {card.info}
            </p>
            <p className="text-xs text-[var(--text-muted)]">
              {language === 'hi' ? card.sub.hi : card.sub.en}
            </p>
          </a>
        ))}
      </div>

      {/* 2. Contact Form & Workshop Locations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Form (7 Cols) */}
        <div className="lg:col-span-7 bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div>
            <h2 className="text-2xl font-bold font-serif text-[var(--text)]">
              {language === 'hi' ? 'सीधा संदेश भेजें' : 'Send a Routed Inquiry'}
            </h2>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              {language === 'hi' ? 'हम सामान्यतः 2 व्यावसायिक घंटों में उत्तर देते हैं।' : 'We respond within 2 business hours during workshop opening times.'}
            </p>
          </div>

          {submitted ? (
            <div className="p-8 bg-[var(--surface-sunken)] rounded-2xl border border-emerald-500/40 text-center space-y-4 animate-in fade-in">
              <span className="text-4xl">📨</span>
              <h3 className="text-xl font-bold font-serif text-[var(--text)]">
                {language === 'hi' ? 'संदेश सफलतापूर्वक प्राप्त हुआ!' : 'Message Sent Successfully!'}
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                {language === 'hi'
                  ? `आपका संदर्भ कोड #${refCode} है। हमारे सर्विस एडवाइजर शीघ्र ही आपसे संपर्क करेंगे।`
                  : `Your reference code is #${refCode}. A service advisor will reach out to ${email || 'your email'} shortly.`}
              </p>
              <Button variant="secondary" onClick={() => setSubmitted(false)} className="text-xs">
                {language === 'hi' ? 'दूसरा संदेश भेजें' : 'Send Another Message'}
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="contact-category" className="font-medium text-[var(--text)]">
                    {language === 'hi' ? 'पूछताछ का विषय *' : 'Inquiry Topic *'}
                  </label>
                  <select
                    id="contact-category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[var(--surface-sunken)] border border-[var(--border-subtle)] rounded-xl px-3 py-2.5 text-xs text-[var(--text)]"
                  >
                    <option value="booking">Workshop Booking / Estimate</option>
                    <option value="fleet">Fleet & Commercial Services</option>
                    <option value="careers">Apprenticeships & Careers</option>
                    <option value="complaints">Customer Feedback / Complaints</option>
                    <option value="other">General Question</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-branch" className="font-medium text-[var(--text)]">
                    {language === 'hi' ? 'पसंदीदा ब्रांच *' : 'Preferred Workshop Branch *'}
                  </label>
                  <select
                    id="contact-branch"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full bg-[var(--surface-sunken)] border border-[var(--border-subtle)] rounded-xl px-3 py-2.5 text-xs text-[var(--text)]"
                  >
                    <option value="central">Branch Central (London EC1A)</option>
                    <option value="north">Branch North (London N12)</option>
                    <option value="south">Branch South EV (London SE1)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="sender-name" className="font-medium text-[var(--text)]">
                    {language === 'hi' ? 'आपका नाम *' : 'Your Full Name *'}
                  </label>
                  <input
                    id="sender-name"
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className="w-full bg-[var(--surface-sunken)] border border-[var(--border-subtle)] rounded-xl px-3 py-2.5 text-xs text-[var(--text)] focus:ring-1 focus:ring-[var(--accent)]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="sender-phone" className="font-medium text-[var(--text)]">
                    {language === 'hi' ? 'फोन नंबर *' : 'Telephone Number *'}
                  </label>
                  <input
                    id="sender-phone"
                    required
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="07700 900123"
                    className="w-full bg-[var(--surface-sunken)] border border-[var(--border-subtle)] rounded-xl px-3 py-2.5 text-xs text-[var(--text)] focus:ring-1 focus:ring-[var(--accent)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="sender-email" className="font-medium text-[var(--text)]">
                    {language === 'hi' ? 'ईमेल पता *' : 'Email Address *'}
                  </label>
                  <input
                    id="sender-email"
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className="w-full bg-[var(--surface-sunken)] border border-[var(--border-subtle)] rounded-xl px-3 py-2.5 text-xs text-[var(--text)] focus:ring-1 focus:ring-[var(--accent)]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="sender-plate" className="font-medium text-[var(--text)]">
                    {language === 'hi' ? 'वाहन नंबर (वैकल्पिक)' : 'Vehicle Registration (Optional)'}
                  </label>
                  <input
                    id="sender-plate"
                    type="text"
                    value={plate}
                    onChange={(e) => setPlate(e.target.value)}
                    placeholder="e.g. TW68 AKZ"
                    className="w-full bg-[var(--surface-sunken)] border border-[var(--border-subtle)] rounded-xl px-3 py-2.5 text-xs font-mono uppercase text-[var(--text)] focus:ring-1 focus:ring-[var(--accent)]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="sender-message" className="font-medium text-[var(--text)]">
                  {language === 'hi' ? 'संदेश / विवरण *' : 'How can we help? *'}
                </label>
                <textarea
                  id="sender-message"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about symptoms, mileage, or required service..."
                  className="w-full bg-[var(--surface-sunken)] border border-[var(--border-subtle)] rounded-xl p-3 text-xs text-[var(--text)] focus:ring-1 focus:ring-[var(--accent)]"
                />
              </div>

              <Button type="submit" variant="primary" className="w-full text-xs font-semibold py-3">
                {language === 'hi' ? 'संदेश सबमिट करें →' : 'Send Inquiry Message →'}
              </Button>
            </form>
          )}
        </div>

        {/* Workshop Branches (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold font-serif text-[var(--text)]">
              {language === 'hi' ? 'हमारे वर्कशॉप केंद्र' : 'Our Regional Workshop Centres'}
            </h3>
            <p className="text-xs text-[var(--text-muted)]">
              All branches equipped with ISO 6789 calibrated tooling.
            </p>
          </div>

          <div className="space-y-4">
            {branches.map(b => (
              <div
                key={b.id}
                className="p-5 bg-[var(--surface-sunken)] rounded-2xl border border-[var(--border-subtle)] space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-[var(--text)] font-serif">
                    {language === 'hi' ? b.name.hi : b.name.en}
                  </h4>
                  <Badge variant="neutral" className="text-[10px] font-mono">
                    Open Mon-Sat
                  </Badge>
                </div>
                <p className="text-[var(--text-muted)]">
                  📍 {b.address}
                </p>
                <p className="font-mono text-[var(--accent)] font-semibold">
                  📞 {b.phone}
                </p>
                <p className="text-[11px] text-[var(--text-muted)] pt-1 border-t border-[var(--border-subtle)]">
                  ⚙️ {b.bays}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
