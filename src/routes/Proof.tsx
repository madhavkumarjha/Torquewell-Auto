import { useState, useMemo } from 'react';
import { SAMPLE_REPORTS, VehicleReport, getReportUrgencyStats } from '@/data/proof-reports';
import { DonutSummary } from '@/components/proof/DonutSummary';
import { FindingCard } from '@/components/proof/FindingCard';
import { ProofReportPdfModal } from '@/components/proof/ProofReportPdfModal';
import { usePrefs } from '@/store/prefs';
import { Urgency, Locale } from '@/types';
import { FileText, Search, ShieldCheck, AlertTriangle } from 'lucide-react';

export default function Proof() {
  const { locale } = usePrefs() as { locale: Locale };
  const [selectedReportId, setSelectedReportId] = useState<string>('report-tw68akz');
  const [activeUrgency, setActiveUrgency] = useState<Urgency | 'all'>('all');
  const [activeSystem, setActiveSystem] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [pdfModalOpen, setPdfModalOpen] = useState(false);

  const currentReport: VehicleReport = useMemo(() => {
    return SAMPLE_REPORTS.find((r) => r.id === selectedReportId) || SAMPLE_REPORTS[0];
  }, [selectedReportId]);

  const stats = useMemo(() => {
    return getReportUrgencyStats(currentReport.findings);
  }, [currentReport]);

  // Systems present in this report
  const availableSystems = useMemo(() => {
    const set = new Set<string>();
    currentReport.findings.forEach((f) => set.add(f.system));
    return Array.from(set);
  }, [currentReport]);

  // Filtered findings
  const filteredFindings = useMemo(() => {
    return currentReport.findings.filter((f) => {
      // Urgency filter
      if (activeUrgency !== 'all' && f.urgency !== activeUrgency) return false;
      // System filter
      if (activeSystem !== 'all' && f.system !== activeSystem) return false;
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = (f.title[locale] || f.title.en).toLowerCase().includes(q);
        const matchesWhy = (f.why[locale] || f.why.en).toLowerCase().includes(q);
        if (!matchesTitle && !matchesWhy) return false;
      }
      return true;
    });
  }, [currentReport, activeUrgency, activeSystem, searchQuery, locale]);

  const systemLabels: Record<string, { en: string; hi: string }> = {
    brakes: { en: 'Brakes', hi: 'ब्रेक' },
    tyres: { en: 'Tyres', hi: 'टायर' },
    suspension: { en: 'Suspension', hi: 'सस्पेंशन' },
    fluids: { en: 'Fluids', hi: 'फ्लुइड्स' },
    electrical: { en: 'Electrical', hi: 'इलेक्ट्रिकल' },
    powertrain: { en: 'Powertrain', hi: 'पावरट्रेन' },
    chassis: { en: 'Chassis', hi: 'चेसिस' },
    safety: { en: 'Safety', hi: 'सुरक्षा' }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Hero Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[var(--border)]">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent)] font-semibold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            {locale === 'hi' ? 'हस्ताक्षरित डिजिटल निरीक्षण' : 'Calibrated Digital Vehicle Inspection'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text)] mt-2">
            {locale === 'hi' ? 'डिजिटल प्रूफ रिपोर्ट' : 'Digital Proof Report Sample'}
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-2 max-w-2xl leading-relaxed">
            {locale === 'hi'
              ? 'टॉर्कवेल ऑटो हर स्पैनर चलाने से पहले डिजिटल माइक्रोमीटर माप, क्लोज-अप तस्वीरें और स्पष्ट वर्गीकरण प्रदान करता है।'
              : 'Every measurement, photo, and wear threshold verified before a single spanner is turned. Transparent urgency ratings with zero pressure.'}
          </p>
        </div>

        {/* Download PDF CTA */}
        <button
          type="button"
          onClick={() => setPdfModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-[var(--accent)] text-[var(--accent-fg)] hover:opacity-90 transition-opacity shadow-sm flex-shrink-0"
        >
          <FileText className="w-4 h-4" />
          {locale === 'hi' ? 'प्रूफ रिपोर्ट PDF देखें / प्रिंट करें' : 'View / Print Proof PDF'}
        </button>
      </div>

      {/* Vehicle Switcher Bar */}
      <div className="bg-[var(--surface-muted)] border border-[var(--border)] rounded-2xl p-4 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
            {locale === 'hi' ? 'नमूना निरीक्षण वाहन चुनें:' : 'Select Sample Inspected Vehicle:'}
          </span>
          <span className="text-xs font-mono text-[var(--text-muted)]">
            {locale === 'hi' ? '3 वास्तविक कार्यशाला रिपोर्ट' : '3 realistic workshop inspection cases'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {SAMPLE_REPORTS.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => {
                setSelectedReportId(r.id);
                setActiveUrgency('all');
                setActiveSystem('all');
              }}
              className={`p-4 rounded-xl border text-left transition-all ${
                selectedReportId === r.id
                  ? 'border-[var(--accent)] ring-2 ring-[var(--accent)]/20 bg-[var(--surface)] shadow-sm'
                  : 'border-[var(--border)] hover:border-[var(--border-strong)] bg-[var(--surface)] opacity-70 hover:opacity-100'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20">
                  {r.regPlate}
                </span>
                <span className="text-[11px] font-mono text-[var(--text-muted)]">
                  {r.year} · {r.odometerKm.toLocaleString()} km
                </span>
              </div>
              <div className="font-bold text-sm text-[var(--text)] truncate">{r.vehicleModel}</div>
              <div className="text-[11px] text-[var(--text-muted)] mt-1 truncate">
                {r.customerName} · {r.branchName}
              </div>
            </button>
          ))}
        </div>

        {/* Selected Vehicle Detail Card */}
        <div className="pt-4 border-t border-[var(--border)] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-[11px] font-mono text-[var(--text-muted)] block">
              {locale === 'hi' ? 'निरीक्षण तिथि' : 'Inspection Date'}
            </span>
            <strong className="text-[var(--text)] font-mono">{currentReport.inspectionDate}</strong>
          </div>
          <div>
            <span className="text-[11px] font-mono text-[var(--text-muted)] block">
              {locale === 'hi' ? 'जांचकर्ता तकनीशियन' : 'Lead Technician'}
            </span>
            <strong className="text-[var(--text)]">{currentReport.technicianName}</strong>
          </div>
          <div>
            <span className="text-[11px] font-mono text-[var(--text-muted)] block">
              {locale === 'hi' ? 'टॉर्क अंशांकन कुंजी' : 'Torque Calibration Key'}
            </span>
            <strong className="text-[var(--accent)] font-mono">{currentReport.technicianTorqueId}</strong>
          </div>
          <div>
            <span className="text-[11px] font-mono text-[var(--text-muted)] block">
              {locale === 'hi' ? 'कार्यशाला शाखा' : 'Service Bay'}
            </span>
            <strong className="text-[var(--text)]">{currentReport.branchName}</strong>
          </div>
        </div>
      </div>

      {/* Summary Donut + Urgent Filter Widget */}
      <DonutSummary
        counts={stats}
        activeUrgency={activeUrgency}
        onSelectUrgency={setActiveUrgency}
        locale={locale}
      />

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* System tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          <button
            type="button"
            onClick={() => setActiveSystem('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors border ${
              activeSystem === 'all'
                ? 'bg-[var(--accent)] text-[var(--accent-fg)] border-[var(--accent)]'
                : 'bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text)] border-[var(--border)]'
            }`}
          >
            {locale === 'hi' ? 'सभी प्रणालियाँ' : 'All Systems'}
          </button>
          {availableSystems.map((sys) => (
            <button
              key={sys}
              type="button"
              onClick={() => setActiveSystem(sys)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors border ${
                activeSystem === sys
                  ? 'bg-[var(--accent)] text-[var(--accent-fg)] border-[var(--accent)]'
                  : 'bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text)] border-[var(--border)]'
              }`}
            >
              {systemLabels[sys] ? (systemLabels[sys][locale] || systemLabels[sys].en) : sys}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-[var(--text-muted)] pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={locale === 'hi' ? 'बिंदु या पुर्जा खोजें...' : 'Search findings...'}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl text-xs bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
          />
        </div>
      </div>

      {/* Findings Cards Grid */}
      {filteredFindings.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface)]">
          <AlertTriangle className="w-8 h-8 mx-auto text-amber-500 mb-2" />
          <p className="text-sm font-semibold text-[var(--text)]">
            {locale === 'hi' ? 'कोई परिणाम नहीं मिला' : 'No findings match your filter'}
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveUrgency('all');
              setActiveSystem('all');
              setSearchQuery('');
            }}
            className="mt-3 text-xs font-bold text-[var(--accent)] hover:underline"
          >
            {locale === 'hi' ? 'सभी फिल्टर रीसेट करें' : 'Reset all filters'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredFindings.map((finding) => (
            <FindingCard key={finding.id} finding={finding} locale={locale} />
          ))}
        </div>
      )}

      {/* Mandatory Disclaimer Box per File 01 */}
      <div className="p-5 rounded-2xl bg-[var(--surface-muted)] border border-[var(--border)] text-xs text-[var(--text-muted)] leading-relaxed">
        <strong className="text-[var(--text)] block mb-1">
          {locale === 'hi' ? 'वैधानिक निरीक्षण सूचना:' : 'Mandatory Diagnostic Transparency Notice:'}
        </strong>
        {locale === 'hi'
          ? 'यह डिजिटल रिपोर्ट केवल सांकेतिक स्थिति दर्शाती है। यह कोई अंतिम तकनीकी मरम्मत निदान या कोटेशन नहीं है। किसी भी मरम्मत को शुरू करने से पहले व्यक्तिगत तकनीशियन निरीक्षण और लिखित कार्य अनुमान अनिवार्य है।'
          : 'This sample report reflects indicative measurements obtained from standardized workshop telemetry. It does not constitute a binding repair quotation or vehicle-specific warranty. An in-person technician inspection and written estimate must precede any authorized repair work.'}
      </div>

      {/* PDF Export Modal */}
      <ProofReportPdfModal
        isOpen={pdfModalOpen}
        onClose={() => setPdfModalOpen(false)}
        report={currentReport}
        locale={locale}
      />
    </div>
  );
}
