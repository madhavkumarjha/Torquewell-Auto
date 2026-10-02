import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { usePrefsStore } from '@/store/prefs';
import {
  BayJob,
  INITIAL_BAY_JOBS,
  JOURNEY_STAGES
} from '@/data/bay-board';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

export default function Journey() {
  const { locale } = usePrefsStore();
  const [bayJobs, setBayJobs] = useState<BayJob[]>(INITIAL_BAY_JOBS);
  const [selectedJobId, setSelectedJobId] = useState<string>(INITIAL_BAY_JOBS[0].id);
  const [selectedStageDrawer, setSelectedStageDrawer] = useState<number | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [isTvMode, setIsTvMode] = useState<boolean>(false);
  const [previewChannel, setPreviewChannel] = useState<'sms' | 'email'>('sms');
  const [simulationTick, setSimulationTick] = useState<number>(0);
  const [notificationToast, setNotificationToast] = useState<string | null>(null);

  const selectedJob = bayJobs.find((j) => j.id === selectedJobId) || bayJobs[0];
  const activeStageInfo = JOURNEY_STAGES.find((s) => s.stageNumber === selectedJob.currentStageNumber) || JOURNEY_STAGES[0];

  // Simulation: advance selected or active bay job
  const handleSimulateProgress = () => {
    setBayJobs((prev) =>
      prev.map((job) => {
        if (job.id === selectedJob.id) {
          // If waiting on customer, simulate customer approving
          if (job.waitingOnCustomer) {
            setNotificationToast(
              locale === 'hi'
                ? `ग्राहक अनुमोदन प्राप्त हुआ: ${job.token} के पुर्जे फिटिंग आरंभ!`
                : `Customer approval received for ${job.token}! Proceeding to parts fitting.`
            );
            return {
              ...job,
              waitingOnCustomer: false,
              currentStageNumber: Math.min(job.currentStageNumber + 1, 9),
              elapsedMinutes: job.elapsedMinutes + 12,
              statusNote: {
                en: 'Customer approved brake pad replacement. Master technician fitting OE-equivalent pads.',
                hi: 'ग्राहक ने पैड बदलने की अनुमति दी। मास्टर तकनीशियन पुर्जे लगा रहे हैं।'
              }
            };
          }
          // Otherwise advance stage
          const nextStage = job.currentStageNumber < 9 ? job.currentStageNumber + 1 : 1;
          const nextStageObj = JOURNEY_STAGES.find((s) => s.stageNumber === nextStage);
          const isNextWaiting = nextStage === 5;
          setNotificationToast(
            locale === 'hi'
              ? `${job.token} चरण ${nextStage} (${nextStageObj?.title.hi}) में प्रवेश कर चुका है।`
              : `${job.token} advanced to Stage ${nextStage}: ${nextStageObj?.title.en}`
          );
          return {
            ...job,
            currentStageNumber: nextStage,
            waitingOnCustomer: isNextWaiting,
            elapsedMinutes: nextStage === 1 ? 5 : job.elapsedMinutes + 15,
            statusNote: isNextWaiting
              ? {
                  en: 'Digital Proof Report dispatched. Waiting on customer approval.',
                  hi: 'डिजिटल प्रूफ रिपोर्ट भेजी गई। ग्राहक अनुमोदन की प्रतीक्षा है।'
                }
              : {
                  en: `Advancing smoothly through ${nextStageObj?.title.en}. All telemetry parameters normal.`,
                  hi: `${nextStageObj?.title.hi} सुचारू रूप से जारी। सभी मापदंड सामान्य हैं।`
                }
          };
        }
        return job;
      })
    );
    setSimulationTick((t) => t + 1);
  };

  // Auto-dismiss toast
  useEffect(() => {
    if (notificationToast) {
      const timer = setTimeout(() => setNotificationToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [notificationToast, simulationTick]);

  const filteredJobs = bayJobs.filter((job) => {
    if (filterType === 'all') return true;
    return job.jobType === filterType;
  });

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isTvMode
          ? 'bg-neutral-950 text-white p-4 md:p-8'
          : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-background text-foreground space-y-10 py-8'
      }`}
      role="region"
      aria-label="Workshop Bay Board"
    >
      {/* Live Notification Banner */}
      <AnimatePresence>
        {notificationToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-4 z-50 bg-primary text-primary-foreground px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-primary-foreground/20 text-sm font-medium"
            role="status"
            aria-live="polite"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span>{notificationToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {locale === 'hi' ? 'लाइव कार्यशाला बे बोर्ड' : 'LIVE WORKSHOP TELEMETRY'}
            </span>
            <span className="text-xs font-mono text-muted-foreground">ISO 6789 Calibrated</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            {locale === 'hi' ? 'द बे बोर्ड एवं रिपेयर यात्रा' : 'The Bay Board & Repair Journey'}
          </h1>
          <p className="text-sm md:text-base text-muted-foreground mt-1 max-w-2xl">
            {locale === 'hi'
              ? 'हमारे वर्कशॉप बे में वास्तविक समय की पारदर्शिता। प्रत्येक चरण का दस्तावेजीकरण और लाइव टेलीमेट्री।'
              : 'Complete visibility into our workshop bays. Follow jobs across 9 calibrated stages with photographic evidence and zero guesswork.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSimulateProgress}
            className="border-dashed border-primary/50 text-xs font-medium"
            id="simulate-progress-btn"
          >
            <span className="text-primary mr-1">▶</span>
            {locale === 'hi' ? 'बे प्रगति सिमुलेट करें' : 'Simulate Bay Progress'}
          </Button>

          <Button
            variant={isTvMode ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setIsTvMode(!isTvMode)}
            className="text-xs font-medium"
            id="tv-mode-toggle"
          >
            {isTvMode ? '📺 Exit TV Mode' : '📺 TV / Kiosk Display'}
          </Button>
        </div>
      </div>

      {/* Job Type Filter Chips */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-muted-foreground mr-1">
          {locale === 'hi' ? 'फ़िल्टर:' : 'Filter Bays:'}
        </span>
        {[
          { id: 'all', label: locale === 'hi' ? 'सभी बे (4)' : 'All Active Bays (4)' },
          { id: 'routine', label: locale === 'hi' ? 'नियमित सर्विस' : 'Routine Service' },
          { id: 'brakes', label: locale === 'hi' ? 'ब्रेक व चेसिस' : 'Brakes & Chassis' },
          { id: 'ev', label: locale === 'hi' ? 'ईवी / हाइब्रिड' : 'High-Voltage EV' },
          { id: 'diagnostics', label: locale === 'hi' ? 'कमर्शियल एलसीवी' : 'Commercial LCV' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterType(tab.id)}
            className={`px-3 py-1 text-xs rounded-full font-medium transition-all ${
              filterType === tab.id
                ? 'bg-primary text-primary-foreground shadow-sm'
                : isTvMode
                ? 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                : 'bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid of Live Bay Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredJobs.map((job) => {
          const isSelected = job.id === selectedJob.id;
          const stageObj = JOURNEY_STAGES.find((s) => s.stageNumber === job.currentStageNumber);
          const percent = Math.round((job.currentStageNumber / 9) * 100);

          return (
            <div
              key={job.id}
              onClick={() => setSelectedJobId(job.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedJobId(job.id);
                }
              }}
              role="button"
              tabIndex={0}
              className={`text-left p-4 rounded-xl border cursor-pointer transition-all duration-200 relative overflow-hidden ${
                isSelected
                  ? isTvMode
                    ? 'bg-neutral-900 border-primary ring-2 ring-primary/40 shadow-lg'
                    : 'bg-card border-primary ring-2 ring-primary/30 shadow-md'
                  : isTvMode
                  ? 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900'
                  : 'bg-card/70 border-border/60 hover:border-border hover:bg-card'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold tracking-wider px-2 py-0.5 rounded bg-muted text-foreground">
                  {job.bayNumber.split(' ')[0]} {job.bayNumber.split(' ')[1]}
                </span>
                {job.waitingOnCustomer ? (
                  <Badge variant="soon" className="text-[10px] animate-pulse">
                    ⚠️ {locale === 'hi' ? 'अनुमोदन प्रतीक्षित' : 'Waiting on Customer'}
                  </Badge>
                ) : (
                  <Badge variant="neutral" className="text-[10px]">
                    Stage {job.currentStageNumber}/9
                  </Badge>
                )}
              </div>

              {/* Vehicle & Reg */}
              <div className="mb-3">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-sm font-extrabold tracking-wider text-primary">
                    {job.token}
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    {job.regPlate}
                  </span>
                </div>
                <div className="text-xs font-semibold truncate text-foreground">
                  {job.vehicleModel}
                </div>
                <div className="text-[11px] text-muted-foreground truncate">
                  {job.customerName}
                </div>
              </div>

              {/* Progress bar */}
              <div className="space-y-1 mb-3">
                <div className="flex justify-between text-[11px] text-muted-foreground">
                  <span className="font-medium text-foreground">{stageObj?.title[locale]}</span>
                  <span>{percent}%</span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${
                      job.waitingOnCustomer ? 'bg-amber-500' : 'bg-primary'
                    }`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>

              {/* Time & Evidence */}
              <div className="pt-2 border-t border-border/40 flex items-center justify-between text-[11px] text-muted-foreground">
                <span>⏱ {job.elapsedMinutes}m / ~{job.estimatedMinutesTotal}m</span>
                <span>📷 {job.photoEvidenceCount} photos</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Bay Job Detailed Inspection View */}
      <Card className={`p-6 md:p-8 ${isTvMode ? 'bg-neutral-900 border-neutral-800' : ''}`}>
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-border/40 pb-6 mb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase px-2 py-0.5 rounded bg-primary/10 text-primary font-bold">
                {selectedJob.bayNumber}
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                Branch: {selectedJob.branchName}
              </span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-3">
              <span>{selectedJob.vehicleModel}</span>
              <span className="font-mono text-sm px-2.5 py-1 rounded bg-muted border border-border">
                {selectedJob.regPlate}
              </span>
            </h2>
            <div className="text-xs text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-1">
              <span>👤 {selectedJob.customerName}</span>
              <span>🔧 Assigned: <strong className="text-foreground">{selectedJob.technicianName}</strong></span>
              <span className="font-mono">ID: {selectedJob.technicianTorqueId}</span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="text-right">
              <div className="text-xs text-muted-foreground">
                {locale === 'hi' ? 'सक्रिय चरण' : 'Active Stage'}
              </div>
              <div className="text-lg font-bold text-primary">
                Stage {selectedJob.currentStageNumber} of 9: {activeStageInfo.title[locale]}
              </div>
            </div>
            {selectedJob.waitingOnCustomer && (
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="primary"
                  onClick={handleSimulateProgress}
                  className="bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold"
                >
                  ✓ {locale === 'hi' ? 'ग्राहक अनुमोदन दर्ज करें' : 'Simulate Customer Approval'}
                </Button>
                <Link to="/proof">
                  <Button size="sm" variant="outline" className="text-xs">
                    {locale === 'hi' ? 'प्रूफ रिपोर्ट देखें' : 'View Proof Report'}
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* 9-Stage Progress Stepper Bar */}
        <div className="mb-8">
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
            {JOURNEY_STAGES.map((s) => {
              const isPast = s.stageNumber < selectedJob.currentStageNumber;
              const isCurrent = s.stageNumber === selectedJob.currentStageNumber;

              return (
                <div
                  key={s.id}
                  onClick={() => setSelectedStageDrawer(s.stageNumber)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedStageDrawer(s.stageNumber);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  className={`p-2.5 rounded-lg border text-center cursor-pointer transition-all ${
                    isCurrent
                      ? 'border-primary bg-primary/10 ring-2 ring-primary/40'
                      : isPast
                      ? 'border-emerald-500/40 bg-emerald-500/5 text-muted-foreground'
                      : 'border-border/40 bg-card/40 opacity-60 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-center mb-1">
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        isCurrent
                          ? 'bg-primary text-primary-foreground animate-pulse'
                          : isPast
                          ? 'bg-emerald-500 text-white'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {isPast ? '✓' : s.stageNumber}
                    </span>
                  </div>
                  <div className="text-[11px] font-semibold truncate leading-tight">
                    {s.title[locale]}
                  </div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">{s.timeEst}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Stage Deep Dive Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Column 1: Live Status & Telemetry */}
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-muted/40 border border-border/60">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                {locale === 'hi' ? 'वर्तमान स्थिति विवरण' : 'Live Status Note'}
              </div>
              <p className="text-sm font-medium leading-relaxed">
                {selectedJob.statusNote[locale]}
              </p>
              <div className="mt-3 pt-3 border-t border-border/40 text-xs font-mono text-muted-foreground">
                📡 {selectedJob.recentTelemetry}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-muted/40 border border-border/60 space-y-2">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {locale === 'hi' ? 'अंशांकित उपकरण' : 'Calibrated Tooling In Use'}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeStageInfo.toolsUsed.map((tool, idx) => (
                  <span
                    key={idx}
                    className="inline-block px-2.5 py-1 text-[11px] rounded-md bg-background border border-border font-medium"
                  >
                    🛠 {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: What You Receive & Decisions */}
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-muted/40 border border-border/60 space-y-2">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {locale === 'hi' ? 'ग्राहक को क्या मिलता है' : 'What You Receive at this Stage'}
              </div>
              <ul className="space-y-2 text-xs">
                {activeStageInfo.youReceive.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>{item[locale]}</span>
                  </li>
                ))}
              </ul>
            </div>

            {activeStageInfo.youDecide && (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-2">
                <div className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                  {locale === 'hi' ? 'आप क्या निर्णय लेते हैं' : 'Decisions Required From You'}
                </div>
                <p className="text-xs leading-relaxed text-foreground">
                  {activeStageInfo.youDecide[locale]}
                </p>
              </div>
            )}
          </div>

          {/* Column 3: Notification Mock Preview */}
          <div className="p-4 rounded-xl bg-muted/40 border border-border/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {locale === 'hi' ? 'अधिसूचना पूर्वावलोकन' : 'Live Notification Mock'}
              </span>
              <div className="flex items-center gap-1 bg-background p-0.5 rounded-lg border border-border text-[11px]">
                <button
                  onClick={() => setPreviewChannel('sms')}
                  className={`px-2 py-0.5 rounded font-medium ${
                    previewChannel === 'sms' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
                  }`}
                >
                  SMS
                </button>
                <button
                  onClick={() => setPreviewChannel('email')}
                  className={`px-2 py-0.5 rounded font-medium ${
                    previewChannel === 'email' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
                  }`}
                >
                  Email
                </button>
              </div>
            </div>

            {previewChannel === 'sms' ? (
              <div className="p-3 rounded-lg bg-background border border-border font-mono text-xs space-y-1.5 shadow-inner">
                <div className="text-[10px] text-muted-foreground flex items-center justify-between">
                  <span>📱 TORQUEWELL</span>
                  <span>Now</span>
                </div>
                <p className="text-xs text-foreground leading-relaxed">
                  {activeStageInfo.smsPreview[locale]}
                </p>
              </div>
            ) : (
              <div className="p-3 rounded-lg bg-background border border-border text-xs space-y-2 shadow-inner">
                <div className="text-[10px] text-muted-foreground border-b border-border/50 pb-1">
                  <strong>Subject:</strong> Torquewell Bay Update: {activeStageInfo.title[locale]}
                </div>
                <p className="text-xs text-foreground leading-relaxed">
                  {activeStageInfo.emailPreview[locale]}
                </p>
              </div>
            )}
            <div className="text-[10px] text-muted-foreground italic">
              {locale === 'hi'
                ? '*यह एक सिमुलेटेड पूर्वावलोकन है। वास्तविक संदेश एसएमएस सहमति के बाद ही भेजे जाते हैं।'
                : '*Real notification templates shown for transparency. Zero unsolicited marketing.'}
            </div>
          </div>
        </div>
      </Card>

      {/* The 9-Stage Standard Repair Journey (Interactive Drawers/Explainer) */}
      <div className="space-y-4 pt-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {locale === 'hi' ? 'मानक 9-चरणीय मरम्मत प्रक्रिया' : 'The 9-Stage Standard Repair Journey'}
          </h2>
          <p className="text-sm text-muted-foreground">
            {locale === 'hi'
              ? 'प्रत्येक चरण की भूमिका, अवधि और आपके अधिकारों का विस्तृत विवरण।'
              : 'Click any stage below to inspect the technician role, tools, customer decisions, and typical time ranges.'}
          </p>
        </div>

        <div className="space-y-2.5">
          {JOURNEY_STAGES.map((stage) => {
            const isExpanded = selectedStageDrawer === stage.stageNumber;

            return (
              <div
                key={stage.id}
                className="border border-border/60 rounded-xl overflow-hidden bg-card/60 transition-colors"
              >
                <button
                  onClick={() => setSelectedStageDrawer(isExpanded ? null : stage.stageNumber)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-muted/30 transition-colors"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center">
                      0{stage.stageNumber}
                    </span>
                    <div>
                      <span className="font-semibold text-sm text-foreground">
                        {stage.title[locale]}
                      </span>
                      <span className="ml-3 text-xs text-muted-foreground hidden sm:inline">
                        — {stage.ownerRole[locale]}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>⏱ {stage.timeEst}</span>
                    <span className="text-base font-bold text-muted-foreground">
                      {isExpanded ? '−' : '+'}
                    </span>
                  </div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-5 pb-5 pt-1 border-t border-border/30 bg-muted/20"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs mt-3">
                        <div>
                          <div className="font-semibold text-muted-foreground mb-1">
                            {locale === 'hi' ? 'उत्तरदायी तकनीशियन' : 'Technician Owner'}
                          </div>
                          <div className="font-medium text-foreground">{stage.ownerRole[locale]}</div>
                          <div className="text-muted-foreground mt-1">
                            Range: {stage.durationRange.minMin}–{stage.durationRange.maxMin} mins
                          </div>
                        </div>

                        <div>
                          <div className="font-semibold text-muted-foreground mb-1">
                            {locale === 'hi' ? 'आपको क्या मिलता है' : 'What You Receive'}
                          </div>
                          <ul className="space-y-1">
                            {stage.youReceive.map((item, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-emerald-500 font-bold">✓</span>
                                <span>{item[locale]}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <div className="font-semibold text-muted-foreground mb-1">
                            {locale === 'hi' ? 'आप क्या तय करते हैं' : 'You Decide'}
                          </div>
                          <p className="text-muted-foreground leading-relaxed">
                            {stage.youDecide
                              ? stage.youDecide[locale]
                              : locale === 'hi'
                              ? 'कोई तत्काल निर्णय नहीं; तकनीशियन पूर्व-स्वीकृत प्रक्रिया जारी रखता है।'
                              : 'No action needed; technician executes pre-agreed scope under warranty.'}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* Compliance & Privacy Notice */}
      <div className="p-4 rounded-xl bg-muted/40 border border-border/40 text-xs text-muted-foreground flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <strong className="text-foreground">Workshop Privacy Policy:</strong> In-lounge wall displays show anonymised tokens (e.g. JOB-TW68). Customer full names are masked in public areas.
        </div>
        <div className="flex items-center gap-3">
          <Link to="/policies" className="text-primary hover:underline font-medium">
            Privacy Charter
          </Link>
          <Link to="/book" className="text-primary hover:underline font-medium">
            Book Bay Visit
          </Link>
        </div>
      </div>
    </div>
  );
}
