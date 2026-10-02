import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePrefsStore } from '@/store/prefs';
import {
  getMilestonesForPowertrain,
  evaluateMilestoneUrgency,
  MilestoneItem,
  DrivingStyle
} from '@/data/mileage-map';
import { Powertrain } from '@/types';
import { formatDistance, kmToMiles, milesToKm } from '@/lib/units';
import { downloadIcsFile } from '@/lib/ics';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { RoadmapPdfModal } from '@/components/mileagemap/RoadmapPdfModal';

export default function MileageMap() {
  const { locale, units, setUnits } = usePrefsStore();
  const [powertrain, setPowertrain] = useState<Powertrain>('petrol');
  const [currentKm, setCurrentKm] = useState<number>(45000);
  const [drivingStyle, setDrivingStyle] = useState<DrivingStyle>('standard');
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string>('m-40k-air-filter');
  const [isPdfModalOpen, setIsPdfModalOpen] = useState<boolean>(false);
  const [activeEducationTab, setActiveEducationTab] = useState<'time' | 'distance' | 'condition'>('condition');

  const filteredMilestones = getMilestonesForPowertrain(powertrain);
  const selectedMilestone =
    filteredMilestones.find((m) => m.id === selectedMilestoneId) || filteredMilestones[0];

  // Convert km to current display unit for slider
  const maxKm = 160000;
  const currentDisplayValue = Math.round(units === 'imperial' ? kmToMiles(currentKm) : currentKm);
  const maxDisplayValue = Math.round(units === 'imperial' ? kmToMiles(maxKm) : maxKm);
  const unitLabel = units === 'imperial' ? 'miles' : 'km';

  // Handle slider changes converting back to km if imperial
  const handleSliderChange = (displayVal: number) => {
    if (units === 'imperial') {
      setCurrentKm(Math.round(milesToKm(displayVal)));
    } else {
      setCurrentKm(displayVal);
    }
  };

  const handleDownloadIcs = (milestone: MilestoneItem) => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30); // 30 days ahead
    const dateStr = targetDate.toISOString().split('T')[0];

    downloadIcsFile(
      {
        title: `Torquewell Auto: ${milestone.title[locale]} (${milestone.targetKm}km Milestone)`,
        description: `Service Milestone: ${milestone.title[locale]}\\nWhy: ${milestone.why[locale]}\\nGuidance: ${milestone.canWait[locale]}`,
        location: 'Torquewell Auto Precision Workshop',
        startDate: dateStr,
        startTime: '09:00',
        durationMinutes: 120
      },
      `torquewell-milestone-${milestone.id}.ics`
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 py-8" role="region" aria-label="Mileage Map Road Visualizer">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
              FEATURE 08 · PREVENTATIVE MAINTENANCE
            </span>
            <span className="text-xs font-mono text-muted-foreground">0 – 160,000 km Roadmap</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            {locale === 'hi' ? 'द माइलेज मैप' : 'The Mileage Map'}
          </h1>
          <p className="text-sm md:text-base text-muted-foreground mt-1 max-w-2xl">
            {locale === 'hi'
              ? 'आपकी कार के लिए अनुकूलित सर्विस माइलस्टोन। जानें कि क्या अभी आवश्यक है, क्या आने वाला है और क्या सुरक्षित रूप से टाला जा सकता है।'
              : 'Interactive road-path timeline for your car. Understand what is due now, what is coming up, and what can safely wait based on verified wear.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Unit Toggle */}
          <div className="inline-flex p-0.5 rounded-lg border border-border bg-muted/40 text-xs">
            <button
              onClick={() => setUnits('metric')}
              className={`px-3 py-1 rounded-md font-semibold transition-all ${
                units === 'metric' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground'
              }`}
            >
              Metric (km)
            </button>
            <button
              onClick={() => setUnits('imperial')}
              className={`px-3 py-1 rounded-md font-semibold transition-all ${
                units === 'imperial' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground'
              }`}
            >
              Miles (mi)
            </button>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsPdfModalOpen(true)}
            id="download-roadmap-pdf-btn"
          >
            📄 {locale === 'hi' ? 'रोडमैप PDF डाउनलोड करें' : 'Download Roadmap PDF'}
          </Button>
        </div>
      </div>

      {/* Configuration Strip (Powertrain, Driving Style, Odometer) */}
      <Card className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Powertrain Picker */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {locale === 'hi' ? '1. पावरट्रेन चुनें' : '1. Select Powertrain'}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'petrol' as Powertrain, label: 'Petrol', icon: '⛽' },
                { id: 'diesel' as Powertrain, label: 'Diesel', icon: '🛢️' },
                { id: 'hybrid' as Powertrain, label: 'Hybrid', icon: '⚡🔋' },
                { id: 'ev' as Powertrain, label: 'Full EV', icon: '🔌' }
              ].map((pt) => (
                <button
                  key={pt.id}
                  onClick={() => setPowertrain(pt.id)}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    powertrain === pt.id
                      ? 'border-primary bg-primary/10 text-primary font-bold shadow-sm'
                      : 'border-border/60 hover:border-border text-muted-foreground'
                  }`}
                >
                  <div className="text-base">{pt.icon}</div>
                  <div className="text-xs mt-1">{pt.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Driving Style */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {locale === 'hi' ? '2. ड्राइविंग प्रोफाइल' : '2. Driving Style'}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'standard' as DrivingStyle, label: 'Standard', desc: 'Mixed / Highway' },
                { id: 'city' as DrivingStyle, label: 'City Heavy', desc: 'Stop & Go (+15%)' },
                { id: 'towing' as DrivingStyle, label: 'Towing / Hills', desc: 'Heavy load (+25%)' }
              ].map((style) => (
                <button
                  key={style.id}
                  onClick={() => setDrivingStyle(style.id)}
                  className={`p-2 rounded-xl border text-left transition-all ${
                    drivingStyle === style.id
                      ? 'border-primary bg-primary/10 text-primary font-bold shadow-sm'
                      : 'border-border/60 hover:border-border text-muted-foreground'
                  }`}
                >
                  <div className="text-xs font-bold">{style.label}</div>
                  <div className="text-[10px] text-muted-foreground">{style.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Odometer Quick Presets */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {locale === 'hi' ? '3. त्वरित माइलेज प्रीसेट' : '3. Odometer Presets'}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: '15,000 km (New)', km: 15000 },
                { label: '45,000 km (Commuter)', km: 45000 },
                { label: '85,000 km (Mid-Life)', km: 85000 },
                { label: '125,000 km (Veteran)', km: 125000 }
              ].map((preset) => (
                <button
                  key={preset.km}
                  onClick={() => setCurrentKm(preset.km)}
                  className={`p-2 rounded-xl border text-xs text-center font-medium transition-all ${
                    currentKm === preset.km
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border/60 hover:border-border text-muted-foreground'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Current Odometer Slider */}
        <div className="pt-4 border-t border-border/40 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">
              {locale === 'hi' ? 'वर्तमान वाहन ओडोमीटर रीडिंग:' : 'Current Vehicle Odometer:'}
            </span>
            <span className="font-mono text-lg font-bold text-primary">
              {formatDistance(currentKm, units)}
            </span>
          </div>

          <div className="relative flex items-center">
            <input
              type="range"
              min={0}
              max={maxDisplayValue}
              step={units === 'imperial' ? 1000 : 2000}
              value={currentDisplayValue}
              onChange={(e) => handleSliderChange(Number(e.target.value))}
              className="w-full h-2.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              aria-label="Current Vehicle Odometer Slider"
              id="odometer-range-slider"
            />
          </div>

          <div className="flex justify-between text-[11px] font-mono text-muted-foreground">
            <span>0 {unitLabel}</span>
            <span>{Math.round(maxDisplayValue / 2)} {unitLabel}</span>
            <span>{maxDisplayValue} {unitLabel}</span>
          </div>
        </div>
      </Card>

      {/* Visual Road Path Timeline */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight">
              {locale === 'hi' ? 'रोड-पाथ टाइमलाइन' : 'Visual Road-Path Timeline'}
            </h2>
            <p className="text-xs text-muted-foreground">
              {locale === 'hi'
                ? 'नीचे दिए गए सड़क मार्ग पर क्लिक करके किसी भी सर्विस माइलस्टोन की जांच करें।'
                : 'Click any node along the highway to inspect interval rules, "what can wait" advice, and verified evidence requirements.'}
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-amber-500 font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
              Due Now
            </span>
            <span className="flex items-center gap-1.5 text-yellow-500 font-medium">
              <span className="w-2 h-2 rounded-full bg-yellow-500" />
              Soon
            </span>
            <span className="flex items-center gap-1.5 text-emerald-500 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Passed
            </span>
          </div>
        </div>

        {/* Highway Strip Layout */}
        <div className="relative rounded-2xl bg-neutral-900 border border-neutral-800 p-6 md:p-8 overflow-x-auto shadow-2xl">
          {/* Asphalt Road Canvas */}
          <div className="min-w-[900px] relative py-8">
            {/* Road Surface */}
            <div className="h-16 w-full bg-neutral-800 rounded-xl relative flex items-center shadow-inner border border-neutral-700">
              {/* Center dashed line */}
              <div className="w-full border-t-2 border-dashed border-yellow-400/50" />

              {/* Current Car Marker */}
              {(() => {
                const percent = Math.min(Math.max((currentKm / maxKm) * 100, 0), 100);
                return (
                  <div
                    className="absolute -top-7 -translate-x-1/2 flex flex-col items-center pointer-events-none transition-all duration-300 z-20"
                    style={{ left: `${percent}%` }}
                  >
                    <span className="px-2 py-0.5 rounded-md bg-primary text-primary-foreground font-mono text-[10px] font-bold shadow-md">
                      YOU ({formatDistance(currentKm, units)})
                    </span>
                    <span className="text-xl">🚗</span>
                    <div className="w-0.5 h-6 bg-primary" />
                  </div>
                );
              })()}
            </div>

            {/* Milestones along the road */}
            <div className="relative h-28 mt-4">
              {filteredMilestones.map((m) => {
                const urgency = evaluateMilestoneUrgency(m, currentKm, drivingStyle);
                const percent = Math.min(Math.max((m.targetKm / maxKm) * 100, 2), 98);
                const isSelected = m.id === selectedMilestone.id;
                const distFormatted = formatDistance(m.targetKm, units);

                let dotColor = 'bg-neutral-600 border-neutral-500';
                if (urgency === 'due') dotColor = 'bg-amber-500 border-amber-300 ring-4 ring-amber-500/30 animate-pulse';
                else if (urgency === 'soon') dotColor = 'bg-yellow-400 border-yellow-200 ring-2 ring-yellow-400/20';
                else if (urgency === 'completed') dotColor = 'bg-emerald-500 border-emerald-300';
                else dotColor = 'bg-sky-500 border-sky-300';

                return (
                  <div
                    key={m.id}
                    className="absolute -top-12 -translate-x-1/2 flex flex-col items-center group cursor-pointer z-10"
                    style={{ left: `${percent}%` }}
                    onClick={() => setSelectedMilestoneId(m.id)}
                  >
                    {/* Node Pin */}
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] font-bold text-white transition-transform ${dotColor} ${
                        isSelected ? 'scale-125 ring-4 ring-primary' : 'hover:scale-110'
                      }`}
                    >
                      {urgency === 'completed' ? '✓' : ''}
                    </div>

                    {/* Node Tag */}
                    <div
                      className={`mt-2 p-1.5 rounded-lg border text-center transition-all ${
                        isSelected
                          ? 'bg-primary text-primary-foreground border-primary shadow-lg scale-105'
                          : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:bg-neutral-700'
                      }`}
                    >
                      <div className="font-mono text-[10px] font-bold whitespace-nowrap">
                        {distFormatted}
                      </div>
                      <div className="text-[10px] font-medium max-w-[90px] truncate">
                        {m.title[locale]}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Selected Milestone Inspection Panel */}
      <Card className="p-6 md:p-8 space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-border/40 pb-6">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-bold">
                {formatDistance(selectedMilestone.targetKm, units)}
              </span>
              {(() => {
                const urgency = evaluateMilestoneUrgency(selectedMilestone, currentKm, drivingStyle);
                const badgeVariant =
                  urgency === 'due'
                    ? 'now'
                    : urgency === 'soon'
                    ? 'soon'
                    : urgency === 'completed'
                    ? 'ok'
                    : 'watch';
                return <Badge variant={badgeVariant}>{urgency.toUpperCase()}</Badge>;
              })()}
              <Badge variant="neutral" className="text-xs capitalize font-mono">
                Basis: {selectedMilestone.basis}
              </Badge>
              {selectedMilestone.safetyCritical && (
                <Badge variant="now" className="text-xs">
                  🛡 Safety Critical
                </Badge>
              )}
            </div>

            <h3 className="text-2xl font-bold tracking-tight">
              {selectedMilestone.title[locale]}
            </h3>
            <div className="text-xs text-muted-foreground flex items-center gap-3">
              <span>Estimated Cost Band: <strong className="text-foreground">£{selectedMilestone.costBand[0]} – £{selectedMilestone.costBand[1]}</strong></span>
              {selectedMilestone.everyMonths && (
                <span>Interval: Every {selectedMilestone.everyMonths} months</span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDownloadIcs(selectedMilestone)}
              className="text-xs"
            >
              📅 {locale === 'hi' ? 'कैलेंडर में जोड़ें (.ics)' : 'Add to Calendar (.ics)'}
            </Button>
            <Link to="/book">
              <Button variant="primary" size="sm" className="text-xs">
                {locale === 'hi' ? 'सर्विस बुक करें' : 'Book This Service'}
              </Button>
            </Link>
          </div>
        </div>

        {/* 3 Detail Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column 1: Why It Matters */}
          <div className="p-4 rounded-xl bg-muted/40 border border-border/60 space-y-2">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {locale === 'hi' ? 'यह क्यों महत्वपूर्ण है' : 'Why It Matters'}
            </div>
            <p className="text-xs leading-relaxed text-foreground">
              {selectedMilestone.why[locale]}
            </p>
            <div className="pt-2 border-t border-border/40 text-[11px] text-destructive">
              <strong>Risk of Neglect:</strong> {selectedMilestone.consequenceOfNeglect[locale]}
            </div>
          </div>

          {/* Column 2: What Can Safely Wait */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-2">
            <div className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              {locale === 'hi' ? 'क्या सुरक्षित रूप से टल सकता है?' : 'What Can Safely Wait?'}
            </div>
            <p className="text-xs leading-relaxed text-foreground">
              {selectedMilestone.canWait[locale]}
            </p>
          </div>

          {/* Column 3: Ask Us To Show You The Evidence */}
          <div className="p-4 rounded-xl bg-muted/40 border border-border/60 space-y-2">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {locale === 'hi' ? 'सबूत मांगने का अधिकार' : 'Ask Us To Show You The Evidence'}
            </div>
            <p className="text-xs leading-relaxed text-foreground">
              {selectedMilestone.evidencePrompt[locale]}
            </p>
            <div className="pt-2 border-t border-border/40 text-[11px] text-muted-foreground font-mono">
              Calibrated vernier or digital probe readout provided before spanner work.
            </div>
          </div>
        </div>
      </Card>

      {/* Educational Section: "What Can Safely Wait" Explained */}
      <div className="space-y-4 pt-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {locale === 'hi' ? 'क्या बदला जाना चाहिए और क्या रुक सकता है?' : 'The Science of "What Can Safely Wait"'}
          </h2>
          <p className="text-sm text-muted-foreground">
            {locale === 'hi'
              ? 'गैरेज अक्सर हर चीज को तुरंत बदलने का दबाव डालते हैं। यहाँ जानें कि समय, माइलेज और वास्तविक टूट-फूट में क्या अंतर है।'
              : 'Garages often push urgent replacements blindly. Understand the scientific difference between time-based degradation, mechanical distance wear, and physical condition wear.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Time-Based */}
          <div
            onClick={() => setActiveEducationTab('time')}
            className={`p-5 rounded-xl border cursor-pointer transition-all ${
              activeEducationTab === 'time'
                ? 'border-primary bg-primary/10 shadow-sm'
                : 'border-border/60 bg-card/60 hover:border-border'
            }`}
          >
            <div className="text-2xl mb-2">⏳</div>
            <h3 className="font-bold text-base text-foreground mb-1">
              {locale === 'hi' ? 'समय आधारित (Time-Based)' : 'Time-Based Degradation'}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {locale === 'hi'
                ? 'ब्रेक फ्लूइड, कूलेंट और 12V बैटरी कार खड़ी रहने पर भी हवा की नमी और ऑक्सीकरण से खराब होते हैं। माइलेज कम होने पर भी इन्हें 2-4 साल में जांचना आवश्यक है।'
                : 'Brake fluid, coolant corrosion inhibitors, and 12V batteries degrade through atmospheric moisture absorption and oxidation regardless of whether the car drives 1,000 km or 20,000 km per year.'}
            </p>
          </div>

          {/* Card 2: Distance-Based */}
          <div
            onClick={() => setActiveEducationTab('distance')}
            className={`p-5 rounded-xl border cursor-pointer transition-all ${
              activeEducationTab === 'distance'
                ? 'border-primary bg-primary/10 shadow-sm'
                : 'border-border/60 bg-card/60 hover:border-border'
            }`}
          >
            <div className="text-2xl mb-2">🛣️</div>
            <h3 className="font-bold text-base text-foreground mb-1">
              {locale === 'hi' ? 'दूरी आधारित (Distance-Based)' : 'Distance-Based Mechanical Wear'}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {locale === 'hi'
                ? 'स्पार्क प्लग, एयर फिल्टर और टाइमिंग बेल्ट इंजन के घूमने और हवा खींचने से घिसते हैं। इन्हें निर्धारित माइलेज तक सुरक्षित रूप से चलाया जा सकता है।'
                : 'Spark plug electrode gaps, engine air intake filtration, and transmission gear shearing wear strictly in proportion to engine revolutions and miles traveled.'}
            </p>
          </div>

          {/* Card 3: Condition-Based */}
          <div
            onClick={() => setActiveEducationTab('condition')}
            className={`p-5 rounded-xl border cursor-pointer transition-all ${
              activeEducationTab === 'condition'
                ? 'border-primary bg-primary/10 shadow-sm'
                : 'border-border/60 bg-card/60 hover:border-border'
            }`}
          >
            <div className="text-2xl mb-2">🔬</div>
            <h3 className="font-bold text-base text-foreground mb-1">
              {locale === 'hi' ? 'स्थिति आधारित (Condition-Based)' : 'Condition-Based (Wear Gauge)'}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {locale === 'hi'
                ? 'ब्रेक पैड, डिस्क और टायर कभी भी केवल माइलेज पर न बदलें! जब तक डिजिटल कैलिपर पर मोटाई सुरक्षित सीमा (3 मिमी) से ऊपर है, वे पूरी तरह सुरक्षित हैं।'
                : 'Brake pads, discs, and tyres should NEVER be replaced on arbitrary mileage schedules! As long as vernier calipers measure above the 3.0 mm safety threshold, replacement can safely wait.'}
            </p>
          </div>
        </div>
      </div>

      {/* Mandatory Public Guidance Notice */}
      <div className="p-4 rounded-xl bg-muted/40 border border-border/40 text-xs text-muted-foreground flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <strong className="text-foreground">Official Precedence Notice:</strong> Generic intervals shown for preventative planning. Your specific vehicle manufacturer handbook overrides all generic advice.
        </div>
        <div className="flex items-center gap-3">
          <Link to="/prices" className="text-primary hover:underline font-medium">
            Fair-Price Estimator
          </Link>
          <Link to="/proof" className="text-primary hover:underline font-medium">
            Sample Proof Report
          </Link>
        </div>
      </div>

      {/* PDF Modal */}
      <RoadmapPdfModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        powertrain={powertrain}
        currentKm={currentKm}
        drivingStyle={drivingStyle}
        milestones={filteredMilestones}
        units={units}
        locale={locale}
      />
    </div>
  );
}
