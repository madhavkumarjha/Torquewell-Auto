import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { usePrefsStore } from '@/store/prefs';
import {
  CULTURE_PILLARS,
  APPRENTICE_ROADMAP,
  OPEN_VACANCIES,
  Vacancy
} from '@/data/careers';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

export default function Careers() {
  const { locale } = usePrefsStore();
  const [selectedVacancy, setSelectedVacancy] = useState<Vacancy | null>(null);
  const [activeApprenticeYear, setActiveApprenticeYear] = useState<number>(1);
  const [applicationSubmitted, setApplicationSubmitted] = useState<boolean>(false);
  const [applicantName, setApplicantName] = useState<string>('');
  const [applicantEmail, setApplicantEmail] = useState<string>('');
  const [applicantPhone, setApplicantPhone] = useState<string>('');
  const [applicantNote, setApplicantNote] = useState<string>('');

  const currentApprenticeStage =
    APPRENTICE_ROADMAP.find((s) => s.year === activeApprenticeYear) || APPRENTICE_ROADMAP[0];

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantEmail) return;
    setApplicationSubmitted(true);
  };

  const handleCloseModal = () => {
    setSelectedVacancy(null);
    setApplicationSubmitted(false);
    setApplicantName('');
    setApplicantEmail('');
    setApplicantPhone('');
    setApplicantNote('');
  };

  return (
    <div className="space-y-12 py-6" role="region" aria-label="Careers and Apprenticeships">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
              CULTURE · INTEGRITY · APPRENTICESHIP
            </span>
            <span className="text-xs font-mono text-muted-foreground">ISO 6789 Metrology Standards</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            {locale === 'hi' ? 'करियर एवं प्रशिक्षुता' : 'Careers & Apprenticeships'}
          </h1>
          <p className="text-sm md:text-base text-muted-foreground mt-1 max-w-2xl">
            {locale === 'hi'
              ? 'बिना कमीशन के ईमानदार कार्यशाला। हम तकनीशियनों को व्यक्तिगत प्रमाणित उपकरण, प्रायोजित ईवी प्रशिक्षण और सम्मानजनक वेतन देते हैं।'
              : 'The garage that respects the technician craft. Zero upsell pressure, employer-provided calibrated tool suites, funded EV certifications, and a 4-day work week.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a href="#vacancies">
            <Button variant="primary" size="sm" id="view-open-roles-btn">
              💼 {locale === 'hi' ? 'खुले पद देखें' : 'View Open Roles (4)'}
            </Button>
          </a>
          <Link to="/crew">
            <Button variant="outline" size="sm">
              👥 {locale === 'hi' ? 'मौजूदा टीम' : 'Meet The Crew'}
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 Core Culture Pillars */}
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {locale === 'hi' ? 'तकनीशियन टॉर्कवेल क्यों चुनते हैं?' : 'Why Technicians Thrive at Torquewell'}
          </h2>
          <p className="text-xs text-muted-foreground">
            {locale === 'hi'
              ? 'पारंपरिक गैरेज का दबाव छोड़कर शुद्ध तकनीकी उत्कृष्टता और ग्राहक विश्वास पर ध्यान केंद्रित करें।'
              : 'Leaving behind traditional dealership pressure to focus on pure engineering craftsmanship.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {CULTURE_PILLARS.map((col, idx) => (
            <Card key={idx} className="p-5 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="text-3xl">{col.icon}</div>
                <h3 className="font-bold text-base text-foreground leading-snug">
                  {col.title[locale]}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {col.description[locale]}
                </p>
              </div>
              <div className="pt-2 text-[10px] font-mono text-primary font-semibold">
                Torquewell Standard ✓
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 4-Year Apprentice Progression Roadmap */}
      <Card className="p-6 md:p-8 space-y-6">
        <div className="border-b border-border/40 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="font-mono text-xs font-bold text-primary px-2.5 py-0.5 rounded bg-primary/10">
              ACADEMY ROADMAP
            </span>
            <h2 className="text-2xl font-bold tracking-tight mt-1">
              {locale === 'hi' ? '4-वर्षीय प्रशिक्षु प्रगति मार्ग' : 'The 4-Year Apprentice Progression Pathway'}
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {locale === 'hi'
                ? 'माप-विज्ञान की बुनियादी समझ से लेकर प्रमाणित स्वतंत्र मास्टर तकनीशियन बनने तक का सफर।'
                : 'From fundamental fastener metrology to certified High-Voltage Master Technician.'}
            </p>
          </div>

          {/* Stepper Year Buttons */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-muted/60 border border-border">
            {[1, 2, 3, 4].map((year) => (
              <button
                key={year}
                onClick={() => setActiveApprenticeYear(year)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeApprenticeYear === year
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Year {year}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Year Deep Dive Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column 1: Focus */}
          <div className="p-4 rounded-xl bg-muted/40 border border-border/60 space-y-2">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Stage Overview: Year {currentApprenticeStage.year}
            </div>
            <h3 className="text-lg font-bold text-foreground">
              {currentApprenticeStage.title[locale]}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {currentApprenticeStage.focus[locale]}
            </p>
          </div>

          {/* Column 2: Milestones */}
          <div className="p-4 rounded-xl bg-muted/40 border border-border/60 space-y-2">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {locale === 'hi' ? 'प्रमुख सीखने के लक्ष्य' : 'Key Learning Milestones'}
            </div>
            <ul className="space-y-1.5 text-xs text-foreground">
              {currentApprenticeStage.milestones.map((m, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>{m[locale]}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Tools Issued */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-2">
            <div className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              {locale === 'hi' ? 'कंपनी द्वारा प्रदत्त उपकरण' : 'Personal Calibrated Tools Issued'}
            </div>
            <ul className="space-y-1.5 text-xs text-foreground">
              {currentApprenticeStage.toolsIssued.map((tool, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-primary font-bold">🛠️</span>
                  <span>{tool}</span>
                </li>
              ))}
            </ul>
            <div className="text-[10px] text-muted-foreground pt-1 italic">
              *Tools are permanently retained by apprentice upon graduation.
            </div>
          </div>
        </div>
      </Card>

      {/* Open Vacancies Section */}
      <div id="vacancies" className="space-y-4 pt-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {locale === 'hi' ? 'वर्तमान में उपलब्ध रिक्तियां' : 'Current Open Positions'}
          </h2>
          <p className="text-xs text-muted-foreground">
            {locale === 'hi'
              ? 'पारदर्शी वेतनमान। कोई छिपे हुए बोनस नहीं, केवल स्पष्ट अनुबंध।'
              : 'Transparent compensation bands. Apply online with zero recruitment agency intermediaries.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {OPEN_VACANCIES.map((vacancy) => (
            <Card key={vacancy.id} className="p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-bold">
                    £{vacancy.salaryBand[0].toLocaleString()} – £{vacancy.salaryBand[1].toLocaleString()}
                  </span>
                  <Badge variant="neutral" className="text-[10px]">
                    {vacancy.type.split('·')[0]}
                  </Badge>
                </div>

                <div>
                  <h3 className="font-bold text-lg text-foreground">{vacancy.title[locale]}</h3>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {vacancy.department} · {vacancy.branch}
                  </div>
                </div>

                <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                  {vacancy.summary[locale]}
                </p>

                <div className="space-y-1 pt-2 border-t border-border/40">
                  <div className="text-[11px] font-semibold text-foreground">Key Benefits:</div>
                  <div className="flex flex-wrap gap-1">
                    {vacancy.benefits.map((b, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-[10px] bg-muted text-muted-foreground font-medium"
                      >
                        ✓ {b[locale].slice(0, 30)}...
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border/40">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setSelectedVacancy(vacancy)}
                  className="w-full text-xs"
                >
                  {locale === 'hi' ? 'ऑनलाइन आवेदन करें' : 'Apply Online for this Role'} &rarr;
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Application Modal */}
      <AnimatePresence>
        {selectedVacancy && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="vacancy-modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl p-6 md:p-8 space-y-6"
            >
              <div className="flex items-start justify-between border-b border-border/40 pb-4">
                <div>
                  <h3 id="vacancy-modal-title" className="text-xl font-bold tracking-tight">
                    {selectedVacancy.title[locale]}
                  </h3>
                  <div className="text-xs text-primary font-semibold mt-0.5">
                    {selectedVacancy.branch} · £{selectedVacancy.salaryBand[0].toLocaleString()}–£{selectedVacancy.salaryBand[1].toLocaleString()}
                  </div>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground"
                  aria-label="Close dialog"
                >
                  ✕
                </button>
              </div>

              {applicationSubmitted ? (
                <div className="text-center py-6 space-y-3" role="status">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center text-2xl font-bold">
                    ✓
                  </div>
                  <h4 className="text-lg font-bold text-foreground">
                    {locale === 'hi' ? 'आवेदन सफलतापूर्वक प्राप्त हुआ' : 'Application Received'}
                  </h4>
                  <p className="text-xs text-muted-foreground max-w-xs mx-auto leading-relaxed">
                    {locale === 'hi'
                      ? `धन्यवाद ${applicantName}! हमारी तकनीकी टीम 48 घंटों में आपके ईमेल पर संपर्क करेगी।`
                      : `Thank you ${applicantName}! David Torres and the workshop leads will review your application and respond within 48 hours.`}
                  </p>
                  <div className="font-mono text-[11px] text-muted-foreground pt-2">
                    Reference ID: TQ-APP-{Date.now().toString().slice(-6)}
                  </div>
                  <Button variant="outline" size="sm" onClick={handleCloseModal} className="mt-4">
                    Close
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleApplySubmit} className="space-y-4 text-xs">
                  <div className="space-y-1">
                    <label className="font-bold text-foreground">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      placeholder="e.g. Liam Walker"
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-bold text-foreground">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={applicantEmail}
                        onChange={(e) => setApplicantEmail(e.target.value)}
                        placeholder="you@domain.com"
                        className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-foreground">Phone Number</label>
                      <input
                        type="tel"
                        value={applicantPhone}
                        onChange={(e) => setApplicantPhone(e.target.value)}
                        placeholder="+44 7..."
                        className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-foreground">
                      {locale === 'hi' ? 'संक्षिप्त अनुभव या संदेश' : 'Brief Experience & Certifications'}
                    </label>
                    <textarea
                      rows={3}
                      value={applicantNote}
                      onChange={(e) => setApplicantNote(e.target.value)}
                      placeholder="Tell us about your background, tools, and why Torquewell fits you..."
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-2">
                    <Button variant="outline" size="sm" type="button" onClick={handleCloseModal}>
                      Cancel
                    </Button>
                    <Button variant="primary" size="sm" type="submit">
                      Submit Application &rarr;
                    </Button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
