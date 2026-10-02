import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { WORKSHOP_SERVICES } from '@/data/services';
import { SERVICE_PACKAGES } from '@/data/packages';
import { downloadIcsFile } from '@/lib/ics';
import { usePrefs } from '@/store/prefs';
import { Locale, Powertrain } from '@/types';
import {
  Car,
  Wrench,
  Calendar as CalendarIcon,
  CheckCircle2,
  Clock,
  MapPin,
  FileCheck,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export default function Book() {
  const { locale } = usePrefs() as { locale: Locale };
  const [searchParams] = useSearchParams();

  // Wizard step: 1 (Vehicle) -> 2 (Service) -> 3 (Branch & Slot) -> 4 (Contact) -> 5 (Confirmation)
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [regPlate, setRegPlate] = useState('TW68 AKZ');
  const [vehicleModel, setVehicleModel] = useState('TorqueSpec Urban 1.4');
  const [year, setYear] = useState('2018');
  const [powertrain, setPowertrain] = useState<Powertrain>('petrol');
  const [odometer, setOdometer] = useState('96,400');

  const initialService = searchParams.get('service') || searchParams.get('package') || 'brakes';
  const [selectedService, setSelectedService] = useState(initialService);

  const [branch, setBranch] = useState('branch-central');
  const [bookingDate, setBookingDate] = useState('2026-10-05');
  const [timeSlot, setTimeSlot] = useState('08:30');
  const [dropoffMode, setDropoffMode] = useState<'wait' | 'drop' | 'courtesy'>('drop');

  const [customerName, setCustomerName] = useState('Sam Carter');
  const [customerPhone, setCustomerPhone] = useState('+44 7700 900482');
  const [customerEmail, setCustomerEmail] = useState('sam.carter@example.com');
  const [consentAuthorisation, setConsentAuthorisation] = useState(true);

  // Generated confirmation reference
  const [bookingReference, setBookingReference] = useState('TW-BKG-84920');

  const branches = [
    { id: 'branch-central', name: 'Torquewell Central (Bay 04)', address: '14 Industrial Way, Central Bay' },
    { id: 'branch-north', name: 'Torquewell North (Bay 02)', address: '8 Northern Ring Road, North Depot' },
    { id: 'branch-south', name: 'Torquewell South (Bay 05 EV)', address: '22 South Energy Park, South Branch' }
  ];

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 4) {
      // Generate booking reference
      const ref = `TW-BKG-${Math.floor(10000 + Math.random() * 90000)}`;
      setBookingReference(ref);
      setCurrentStep(5);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleDownloadCalendar = () => {
    const selectedBranchObj = branches.find((b) => b.id === branch) || branches[0];
    const serviceName =
      WORKSHOP_SERVICES.find((s) => s.slug === selectedService)?.name.en ||
      SERVICE_PACKAGES.find((p) => p.id === selectedService)?.name.en ||
      'Workshop Inspection & Service';

    downloadIcsFile({
      title: `Torquewell Auto: ${serviceName} (${bookingReference})`,
      description: `Appointment for ${vehicleModel} (${regPlate}). Please bring locking wheel nut key and service logbook.`,
      location: selectedBranchObj.address,
      startDate: bookingDate,
      startTime: timeSlot,
      durationMinutes: 120
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent)] font-semibold flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4" />
          {locale === 'hi' ? 'शून्य-आश्चर्य कार्यशाला आरक्षण' : 'Zero-Surprise Workshop Reservation'}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text)]">
          {locale === 'hi' ? 'कार्यशाला निरीक्षण बुक करें' : 'Book a Workshop Visit'}
        </h1>
        <p className="text-sm text-[var(--text-muted)] max-w-xl mx-auto leading-relaxed">
          {locale === 'hi'
            ? 'अपनी सुविधानुसार बे और समय चुनें। लिखित अनुमान और सहमति के बिना कोई काम शुरू नहीं किया जाएगा।'
            : 'Reserve your calibrated inspection bay. No work begins until you inspect the digital proof report and approve the written estimate.'}
        </p>
      </div>

      {/* 4-Step Stepper Header */}
      {currentStep < 5 && (
        <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono">
          {[
            { step: 1, label: { en: '1. Vehicle', hi: '1. वाहन' } },
            { step: 2, label: { en: '2. Service', hi: '2. सेवा' } },
            { step: 3, label: { en: '3. Bay Slot', hi: '3. समय' } },
            { step: 4, label: { en: '4. Contact', hi: '4. संपर्क' } }
          ].map((item) => (
            <div
              key={item.step}
              className={`p-2.5 rounded-xl border transition-all ${
                currentStep === item.step
                  ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--text)] font-bold'
                  : currentStep > item.step
                  ? 'border-emerald-500/30 text-emerald-500 bg-emerald-500/5'
                  : 'border-[var(--border)] text-[var(--text-muted)] bg-[var(--surface-muted)]'
              }`}
            >
              {item.label[locale]}
            </div>
          ))}
        </div>
      )}

      {/* Step Container Form */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 shadow-sm">
        {/* STEP 1: Vehicle */}
        {currentStep === 1 && (
          <form onSubmit={handleNext} className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-[var(--text)] flex items-center gap-2">
                <Car className="w-5 h-5 text-[var(--accent)]" />
                {locale === 'hi' ? 'कदम 1: अपने वाहन का विवरण दर्ज करें' : 'Step 1: Vehicle & Registration Details'}
              </h2>
              <p className="text-xs text-[var(--text-muted)] mt-1">
                {locale === 'hi'
                  ? 'सटीक तेल विनिर्देश और पुर्जों के कैटलॉग मिलान के लिए आवश्यक।'
                  : 'Needed for exact fluid capacities and verified parts catalog matching.'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="book-reg-plate" className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-1">
                  {locale === 'hi' ? 'पंजीकरण संख्या (नंबर प्लेट)' : 'Registration Number Plate'}
                </label>
                <input
                  id="book-reg-plate"
                  aria-label="Registration Number Plate"
                  type="text"
                  required
                  value={regPlate}
                  onChange={(e) => setRegPlate(e.target.value.toUpperCase())}
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--surface-muted)] border border-[var(--border)] text-[var(--text)] font-mono font-bold text-sm tracking-widest uppercase focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                />
              </div>

              <div>
                <label htmlFor="book-vehicle-model" className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-1">
                  {locale === 'hi' ? 'वाहन मॉडल (उदा. TorqueSpec 1.4)' : 'Make & Model'}
                </label>
                <input
                  id="book-vehicle-model"
                  aria-label="Make & Model"
                  type="text"
                  required
                  value={vehicleModel}
                  onChange={(e) => setVehicleModel(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--surface-muted)] border border-[var(--border)] text-[var(--text)] text-sm focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                />
              </div>

              <div>
                <label htmlFor="book-manufacture-year" className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-1">
                  {locale === 'hi' ? 'निर्माण वर्ष' : 'Manufacture Year'}
                </label>
                <input
                  id="book-manufacture-year"
                  aria-label="Manufacture Year"
                  type="number"
                  required
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--surface-muted)] border border-[var(--border)] text-[var(--text)] text-sm focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                />
              </div>

              <div>
                <label htmlFor="book-odometer" className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-1">
                  {locale === 'hi' ? 'ओडोमीटर रीडिंग (किमी)' : 'Current Odometer (km)'}
                </label>
                <input
                  id="book-odometer"
                  aria-label="Current Odometer"
                  type="text"
                  required
                  value={odometer}
                  onChange={(e) => setOdometer(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--surface-muted)] border border-[var(--border)] text-[var(--text)] text-sm focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-1">
                  {locale === 'hi' ? 'पावरट्रेन प्रकार' : 'Powertrain Type'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['petrol', 'diesel', 'hybrid', 'ev'] as Powertrain[]).map((pt) => (
                    <button
                      key={pt}
                      type="button"
                      onClick={() => setPowertrain(pt)}
                      className={`p-2.5 rounded-xl border text-xs font-mono font-bold capitalize transition-all ${
                        powertrain === pt
                          ? 'border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-fg)]'
                          : 'border-[var(--border)] bg-[var(--surface-muted)] text-[var(--text)] hover:border-[var(--border-strong)]'
                      }`}
                    >
                      {pt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--border)] flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl font-bold text-xs bg-[var(--accent)] text-[var(--accent-fg)] hover:opacity-90 transition-opacity"
              >
                {locale === 'hi' ? 'आगे बढ़ें: सेवा चुनें →' : 'Continue to Service Need →'}
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: Service Need */}
        {currentStep === 2 && (
          <form onSubmit={handleNext} className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-[var(--text)] flex items-center gap-2">
                <Wrench className="w-5 h-5 text-[var(--accent)]" />
                {locale === 'hi' ? 'कदम 2: आवश्यक कार्यशाला सेवा चुनें' : 'Step 2: Choose Service Bay or Package'}
              </h2>
              <p className="text-xs text-[var(--text-muted)] mt-1">
                {locale === 'hi'
                  ? 'नियत पैकेज या 14 विशेष कार्यशाला सेवाओं में से चुनें।'
                  : 'Select an all-inclusive package or a dedicated bay service.'}
              </p>
            </div>

            {/* Packages vs Individual Services Selector */}
            <div className="space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] block">
                {locale === 'hi' ? 'नियत-दायरा सर्विस पैकेज:' : 'Fixed-Scope Service Packages:'}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {SERVICE_PACKAGES.map((pkg) => (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedService(pkg.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedService === pkg.id
                        ? 'border-[var(--accent)] bg-[var(--surface-muted)] ring-2 ring-[var(--accent)]/20'
                        : 'border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-strong)]'
                    }`}
                  >
                    <div className="font-bold text-xs text-[var(--text)] mb-1">
                      {pkg.name[locale]}
                    </div>
                    <div className="font-mono text-sm text-[var(--accent)] font-bold">
                      £{pkg.priceBand[0]} – £{pkg.priceBand[1]}
                    </div>
                  </div>
                ))}
              </div>

              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] block pt-2">
                {locale === 'hi' ? 'विशिष्ट कार्यशाला बे:' : 'Dedicated Service Bays:'}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-64 overflow-y-auto pr-1">
                {WORKSHOP_SERVICES.map((s) => (
                  <div
                    key={s.slug}
                    onClick={() => setSelectedService(s.slug)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      selectedService === s.slug
                        ? 'border-[var(--accent)] bg-[var(--surface-muted)] ring-2 ring-[var(--accent)]/20'
                        : 'border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-strong)]'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-xs text-[var(--text)]">{s.name[locale]}</div>
                      <div className="text-[11px] font-mono text-[var(--text-muted)]">
                        £{s.priceBand[0]}–£{s.priceBand[1]} · {s.timeRangeMin[0]} min
                      </div>
                    </div>
                    {selectedService === s.slug && (
                      <CheckCircle2 className="w-4 h-4 text-[var(--accent)]" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="px-4 py-2 rounded-xl text-xs font-semibold border border-[var(--border)] hover:bg-[var(--surface-muted)] text-[var(--text)]"
              >
                ← {locale === 'hi' ? 'पीछे' : 'Back'}
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl font-bold text-xs bg-[var(--accent)] text-[var(--accent-fg)] hover:opacity-90 transition-opacity"
              >
                {locale === 'hi' ? 'आगे बढ़ें: शाखा और समय →' : 'Continue to Bay Slot →'}
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: Branch, Date & Slot */}
        {currentStep === 3 && (
          <form onSubmit={handleNext} className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-[var(--text)] flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[var(--accent)]" />
                {locale === 'hi' ? 'कदम 3: शाखा, तारीख और ड्रॉप-ऑफ मोड' : 'Step 3: Branch, Date & Attendance Mode'}
              </h2>
              <p className="text-xs text-[var(--text-muted)] mt-1">
                {locale === 'hi'
                  ? 'अपनी पसंदीदा कार्यशाला शाखा और समय स्लॉट का चयन करें।'
                  : 'Select your preferred workshop branch and timing.'}
              </p>
            </div>

            {/* Branch selector */}
            <div className="space-y-3">
              <label className="block text-xs font-mono text-[var(--text-muted)] uppercase">
                {locale === 'hi' ? 'कार्यशाला शाखा' : 'Workshop Branch'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {branches.map((b) => (
                  <div
                    key={b.id}
                    onClick={() => setBranch(b.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      branch === b.id
                        ? 'border-[var(--accent)] bg-[var(--surface-muted)] ring-2 ring-[var(--accent)]/20'
                        : 'border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-strong)]'
                    }`}
                  >
                    <div className="font-bold text-xs text-[var(--text)]">{b.name}</div>
                    <div className="text-[11px] text-[var(--text-muted)] mt-1 leading-snug">
                      {b.address}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Date and Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="book-date" className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-1">
                  {locale === 'hi' ? 'आरक्षण तिथि' : 'Preferred Date'}
                </label>
                <input
                  id="book-date"
                  aria-label="Preferred Date"
                  type="date"
                  required
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--surface-muted)] border border-[var(--border)] text-[var(--text)] text-sm focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                />
              </div>

              <div>
                <label htmlFor="book-timeslot" className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-1">
                  {locale === 'hi' ? 'प्रारंभिक स्लॉट' : 'Arrival Time Slot'}
                </label>
                <select
                  id="book-timeslot"
                  aria-label="Arrival Time Slot"
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--surface-muted)] border border-[var(--border)] text-[var(--text)] text-sm focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                >
                  <option value="08:30">08:30 AM (Early Drop / Express Bay)</option>
                  <option value="11:30">11:30 AM (Mid-day Calibration)</option>
                  <option value="14:30">02:30 PM (Afternoon Rapid Slot)</option>
                </select>
              </div>
            </div>

            {/* Attendance Mode */}
            <div>
              <label className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-2">
                {locale === 'hi' ? 'उपस्थिति मोड' : 'Attendance Preference'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'drop', label: { en: 'Day Drop-off', hi: 'दिन भर छोड़ें' }, desc: { en: 'Pick up before 18:00', hi: 'शाम 6 बजे से पहले लें' } },
                  { id: 'wait', label: { en: 'While You Wait', hi: 'प्रतीक्षा करें' }, desc: { en: 'Quiet Wi-Fi lounge', hi: 'शांत लाउंज और वाईफाई' } },
                  { id: 'courtesy', label: { en: 'Courtesy Car', hi: 'कोर्टसी कार' }, desc: { en: 'Clean loaner vehicle', hi: 'मुफ्त विकल्प वाहन' } }
                ].map((mode) => (
                  <div
                    key={mode.id}
                    onClick={() => setDropoffMode(mode.id as any)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      dropoffMode === mode.id
                        ? 'border-[var(--accent)] bg-[var(--surface-muted)] ring-2 ring-[var(--accent)]/20'
                        : 'border-[var(--border)] bg-[var(--surface)]'
                    }`}
                  >
                    <div className="font-bold text-xs text-[var(--text)]">{mode.label[locale]}</div>
                    <div className="text-[10px] text-[var(--text-muted)] mt-0.5">{mode.desc[locale]}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-4 py-2 rounded-xl text-xs font-semibold border border-[var(--border)] hover:bg-[var(--surface-muted)] text-[var(--text)]"
              >
                ← {locale === 'hi' ? 'पीछे' : 'Back'}
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl font-bold text-xs bg-[var(--accent)] text-[var(--accent-fg)] hover:opacity-90 transition-opacity"
              >
                {locale === 'hi' ? 'आगे बढ़ें: संपर्क विवरण →' : 'Continue to Contact →'}
              </button>
            </div>
          </form>
        )}

        {/* STEP 4: Contact & Consent */}
        {currentStep === 4 && (
          <form onSubmit={handleNext} className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-[var(--text)] flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-[var(--accent)]" />
                {locale === 'hi' ? 'कदम 4: संपर्क विवरण और सहमति' : 'Step 4: Contact & Written Authorisation Notice'}
              </h2>
              <p className="text-xs text-[var(--text-muted)] mt-1">
                {locale === 'hi'
                  ? 'निरीक्षण रिपोर्ट और डिजिटल अनुमान एसएमएस/ईमेल पर भेजे जाएंगे।'
                  : 'Your digital proof report and estimate approval link will be sent here.'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label htmlFor="book-customer-name" className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-1">
                  {locale === 'hi' ? 'पूरा नाम' : 'Full Name'}
                </label>
                <input
                  id="book-customer-name"
                  aria-label="Full Name"
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--surface-muted)] border border-[var(--border)] text-[var(--text)] text-sm focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                />
              </div>

              <div>
                <label htmlFor="book-customer-phone" className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-1">
                  {locale === 'hi' ? 'मोबाइल फोन नंबर (एसएमएस अलर्ट)' : 'Mobile Phone (SMS Proof Alerts)'}
                </label>
                <input
                  id="book-customer-phone"
                  aria-label="Mobile Phone"
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--surface-muted)] border border-[var(--border)] text-[var(--text)] text-sm focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                />
              </div>

              <div>
                <label htmlFor="book-customer-email" className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-1">
                  {locale === 'hi' ? 'ईमेल पता' : 'Email Address'}
                </label>
                <input
                  id="book-customer-email"
                  aria-label="Email Address"
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--surface-muted)] border border-[var(--border)] text-[var(--text)] text-sm focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                />
              </div>
            </div>

            {/* Authorisation Policy Consent Box */}
            <div className="p-4 rounded-xl bg-[var(--surface-muted)] border border-[var(--border)] flex items-start gap-3">
              <input
                type="checkbox"
                id="consent-check"
                required
                checked={consentAuthorisation}
                onChange={(e) => setConsentAuthorisation(e.target.checked)}
                className="mt-1 rounded text-[var(--accent)] focus:ring-[var(--accent)]"
              />
              <label htmlFor="consent-check" className="text-xs text-[var(--text)] leading-relaxed cursor-pointer">
                <strong>{locale === 'hi' ? 'लिखित अनुमोदन की गारंटी:' : 'Written Authorisation Commitment:'}</strong>{' '}
                {locale === 'hi'
                  ? 'मैं समझता हूं कि टॉर्कवेल ऑटो केवल प्रारंभिक निरीक्षण करेगा। मेरी स्पष्ट लिखित सहमति और फोटो प्रमाण के बिना कोई अतिरिक्त मरम्मत कार्य या बिलिंग नहीं की जाएगी।'
                  : 'I understand that Torquewell Auto will perform an initial digital inspection first. No repair work will commence without my explicit digital signature on an itemised estimate.'}
              </label>
            </div>

            <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="px-4 py-2 rounded-xl text-xs font-semibold border border-[var(--border)] hover:bg-[var(--surface-muted)] text-[var(--text)]"
              >
                ← {locale === 'hi' ? 'पीछे' : 'Back'}
              </button>
              <button
                type="submit"
                className="px-8 py-3 rounded-xl font-bold text-xs bg-[var(--accent)] text-[var(--accent-fg)] hover:opacity-90 transition-opacity shadow-md"
              >
                {locale === 'hi' ? 'आरक्षण की पुष्टि करें ✓' : 'Confirm Workshop Reservation ✓'}
              </button>
            </div>
          </form>
        )}

        {/* STEP 5: Confirmation Pass */}
        {currentStep === 5 && (
          <div className="space-y-8 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-4 pb-6 border-b border-[var(--border)]">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-500 font-bold">
                  {locale === 'hi' ? 'आरक्षण सत्यापित' : 'Booking Confirmed'}
                </span>
                <h2 className="text-2xl font-extrabold text-[var(--text)] mt-0.5">
                  {locale === 'hi' ? 'आपकी कार्यशाला बे आरक्षित है' : 'Your Service Bay is Reserved'}
                </h2>
                <p className="text-xs text-[var(--text-muted)] mt-1">
                  {locale === 'hi'
                    ? `संदर्भ संख्या: ${bookingReference} · पुष्टि एसएमएस ${customerPhone} पर भेजा गया`
                    : `Reference: ${bookingReference} · Confirmation sent to ${customerPhone}`}
                </p>
              </div>
            </div>

            {/* Booking Summary Box */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-xl bg-[var(--surface-muted)] border border-[var(--border)] text-xs">
              <div>
                <span className="text-[11px] font-mono text-[var(--text-muted)] block uppercase">
                  {locale === 'hi' ? 'वाहन' : 'Vehicle'}
                </span>
                <strong className="text-sm text-[var(--text)]">{vehicleModel}</strong>
                <span className="block font-mono text-amber-500 mt-0.5 font-bold">{regPlate}</span>
              </div>
              <div>
                <span className="text-[11px] font-mono text-[var(--text-muted)] block uppercase">
                  {locale === 'hi' ? 'तारीख और समय' : 'Date & Time'}
                </span>
                <strong className="text-sm text-[var(--text)]">{bookingDate}</strong>
                <span className="block font-mono text-[var(--text-muted)] mt-0.5">{timeSlot}</span>
              </div>
              <div>
                <span className="text-[11px] font-mono text-[var(--text-muted)] block uppercase">
                  {locale === 'hi' ? 'शाखा बे' : 'Branch Location'}
                </span>
                <strong className="text-sm text-[var(--text)]">
                  {branches.find((b) => b.id === branch)?.name || 'Central Bay'}
                </strong>
              </div>
              <div>
                <span className="text-[11px] font-mono text-[var(--text-muted)] block uppercase">
                  {locale === 'hi' ? 'ग्राहक' : 'Customer'}
                </span>
                <strong className="text-sm text-[var(--text)]">{customerName}</strong>
              </div>
            </div>

            {/* What to bring on the day */}
            <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] space-y-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-[var(--text)] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-500" />
                {locale === 'hi' ? 'आगमन पर क्या साथ लाएं (चेकलिस्ट):' : 'What to Bring on the Day Checklist:'}
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[var(--text-muted)]">
                <li className="p-3 rounded-lg bg-[var(--surface-muted)] border border-[var(--border)]">
                  <strong className="text-[var(--text)] block mb-1">1. Locking Wheel Nut Key</strong>
                  Crucial for removing alloy wheels to measure brake disc runout.
                </li>
                <li className="p-3 rounded-lg bg-[var(--surface-muted)] border border-[var(--border)]">
                  <strong className="text-[var(--text)] block mb-1">2. Service Handbook</strong>
                  For physical warranty calibration and genuine workshop stamp.
                </li>
                <li className="p-3 rounded-lg bg-[var(--surface-muted)] border border-[var(--border)]">
                  <strong className="text-[var(--text)] block mb-1">3. Vehicle Key Fob</strong>
                  Including any secondary key if remote battery testing is requested.
                </li>
              </ul>
            </div>

            {/* Actions: Download Calendar & Bay Board link */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleDownloadCalendar}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-xs bg-[var(--accent)] text-[var(--accent-fg)] hover:opacity-90 transition-opacity shadow-sm"
              >
                <CalendarIcon className="w-4 h-4" />
                {locale === 'hi' ? 'कैलेंडर में जोड़ें (.ICS)' : 'Add to Calendar (.ics download)'}
              </button>

              <Link
                to="/journey"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-xs border border-[var(--border)] hover:bg-[var(--surface-muted)] text-[var(--text)] transition-colors"
              >
                <Clock className="w-4 h-4 text-[var(--accent)]" />
                {locale === 'hi' ? 'लाइव बे बोर्ड पर स्थिति देखें' : 'View on Bay Board'}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
