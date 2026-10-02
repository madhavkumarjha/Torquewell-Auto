import { useState } from 'react';
import { usePrefs } from '@/store/prefs';
import { Badge } from '@/components/ui/Badge';

export function TyreTreadWidget() {
  const { locale: language } = usePrefs();
  const [depthMm, setDepthMm] = useState<number>(3.5);

  const getStatus = (depth: number) => {
    if (depth <= 1.6) {
      return {
        badge: 'now' as const,
        label: { en: 'URGENT: At/Below Legal Limit (Replace Now)', hi: 'अत्यंत जरूरी: कानूनी सीमा पर/नीचे (तुरंत बदलें)' },
        stoppingDelta: '+70%',
        risk: { en: 'Extreme hydroplaning risk. Dangerous wet braking.', hi: 'अत्यधिक हाइड्रोप्लेनिंग का खतरा। गीली सड़क पर ब्रेक विफल होने का जोखिम।' }
      };
    }
    if (depth < 3.0) {
      return {
        badge: 'soon' as const,
        label: { en: 'REPLACE SOON: Wet Grip Severely Compromised', hi: 'जल्द बदलें: गीली सड़क पर पकड़ बहुत कमजोर' },
        stoppingDelta: '+40%',
        risk: { en: 'Water evacuation slows significantly. Stopping distance increases.', hi: 'पानी निकलने की गति धीमी। रुकने की दूरी बढ़ जाती है।' }
      };
    }
    if (depth < 5.0) {
      return {
        badge: 'watch' as const,
        label: { en: 'WATCH: Moderate Wear (Monitor Closely)', hi: 'नजर रखें: मध्यम घिसाव (नियमित जांचें)' },
        stoppingDelta: '+15%',
        risk: { en: 'Adequate daily grip. Plan replacement in next 6-12 months.', hi: 'दैनिक उपयोग के लिए पर्याप्त। अगले 6-12 महीनों में बदलने की योजना बनाएं।' }
      };
    }
    return {
      badge: 'ok' as const,
      label: { en: 'OPTIMAL: Excellent Tread Depth', hi: 'उत्कृष्ट: उत्तम ट्रेड गहराई' },
      stoppingDelta: 'Baseline',
      risk: { en: 'Maximum water drainage and cornering traction.', hi: 'अधिकतम जल निकासी और सुरक्षित ग्रिप।' }
    };
  };

  const status = getStatus(depthMm);

  return (
    <div className="bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[var(--border-subtle)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-semibold">
              {language === 'hi' ? 'इंटरएक्टिव टूल' : 'Interactive Tread Gauge'}
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold font-serif">
            {language === 'hi' ? 'सिक्का व ट्रेड गहराई सुरक्षा सिम्युलेटर' : 'Tyre Tread Depth & Safety Visualizer'}
          </h3>
        </div>
        <Badge variant={status.badge} className="self-start md:self-auto py-1 px-3 text-xs">
          {language === 'hi' ? status.label.hi : status.label.en}
        </Badge>
      </div>

      {/* Interactive Slider */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label htmlFor="tread-slider" className="text-sm font-medium text-[var(--text)]">
            {language === 'hi' ? 'ट्रेड गहराई समायोजित करें:' : 'Adjust Tread Groove Depth:'}
          </label>
          <span className="text-2xl font-mono font-bold text-[var(--accent)]">
            {depthMm.toFixed(1)} mm
          </span>
        </div>

        <input
          id="tread-slider"
          type="range"
          min="1.0"
          max="8.5"
          step="0.1"
          value={depthMm}
          onChange={(e) => setDepthMm(parseFloat(e.target.value))}
          className="w-full h-3 bg-[var(--surface-sunken)] rounded-lg appearance-none cursor-pointer accent-[var(--accent)]"
        />

        <div className="flex justify-between text-xs font-mono text-[var(--text-muted)]">
          <span>1.0mm <span className="opacity-75">({language === 'hi' ? 'अवैध' : 'Bald'})</span></span>
          <span className="text-red-400 font-bold">1.6mm <span className="opacity-90 font-normal">({language === 'hi' ? 'कानूनी सीमा' : 'Legal Limit'})</span></span>
          <span className="text-amber-400 font-bold">3.0mm <span className="opacity-90 font-normal">({language === 'hi' ? 'सुरक्षा सीमा' : 'Safety Floor'})</span></span>
          <span>8.0mm <span className="opacity-75">({language === 'hi' ? 'नया' : 'New'})</span></span>
        </div>
      </div>

      {/* Visual Groove Representation */}
      <div className="bg-[var(--surface-sunken)] p-6 rounded-xl border border-[var(--border-subtle)] grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* SVG Tyre Groove Cross Section */}
        <div className="md:col-span-1 flex flex-col items-center justify-center">
          <div className="w-36 h-36 relative bg-[var(--surface-elevated)] rounded-xl border border-[var(--border-subtle)] flex items-end justify-center p-3 overflow-hidden">
            {/* Rubber Block */}
            <div className="w-full flex items-end justify-around gap-1 h-full">
              <div
                className="w-7 bg-neutral-700 rounded-t-sm transition-all duration-200"
                style={{ height: `${(depthMm / 8.5) * 80 + 15}%` }}
              />
              <div
                className="w-7 bg-neutral-700 rounded-t-sm transition-all duration-200"
                style={{ height: `${(depthMm / 8.5) * 80 + 15}%` }}
              />
              <div
                className="w-7 bg-neutral-700 rounded-t-sm transition-all duration-200"
                style={{ height: `${(depthMm / 8.5) * 80 + 15}%` }}
              />
            </div>

            {/* 20p / 1-Euro coin outer band guide */}
            <div
              className={`absolute top-4 border-2 border-dashed rounded-full w-16 h-16 flex items-center justify-center text-[10px] font-mono text-center transition-all ${
                depthMm >= 3.0 ? 'border-emerald-500 text-emerald-400 opacity-80' : 'border-red-500 text-red-400 opacity-90'
              }`}
            >
              {depthMm >= 3.0 ? 'Rim Hidden (Safe)' : 'Outer Rim Visible!'}
            </div>
          </div>
          <span className="text-[11px] font-mono text-[var(--text-muted)] mt-2">
            {language === 'hi' ? '20p / 1€ सिक्का टेस्ट गाइड' : '20p / 1€ Coin Check Test'}
          </span>
        </div>

        {/* Safety Impact Metrics */}
        <div className="md:col-span-2 space-y-3">
          <div className="p-3 bg-[var(--surface-elevated)] rounded-lg border border-[var(--border-subtle)] flex items-center justify-between">
            <span className="text-xs text-[var(--text-muted)]">
              {language === 'hi' ? 'गीली सड़क पर ब्रेकिंग दूरी प्रभाव:' : 'Wet Stopping Distance Delta:'}
            </span>
            <span className={`font-mono text-sm font-bold ${depthMm < 3.0 ? 'text-red-400' : 'text-emerald-400'}`}>
              {status.stoppingDelta} vs New
            </span>
          </div>

          <div className="p-3 bg-[var(--surface-elevated)] rounded-lg border border-[var(--border-subtle)] text-xs space-y-1">
            <strong className="text-[var(--text)] block">
              {language === 'hi' ? 'सुरक्षा विश्लेषण:' : 'Hydrodynamic Analysis:'}
            </strong>
            <p className="text-[var(--text-muted)] leading-relaxed">
              {language === 'hi' ? status.risk.hi : status.risk.en}
            </p>
          </div>

          <p className="text-[11px] text-[var(--text-muted)] italic">
            {language === 'hi'
              ? 'टिप: यदि आप 20p या 1 यूरो का सिक्का मुख्य खांचे में डालते हैं और बाहरी किनारा दिखाई देता है, तो आपके टायर तुरंत बदले जाने चाहिए।'
              : 'Tip: Place a 20p or 1-Euro coin into the main tread grooves. If the outer band is visible, your tyres are below safe limits and need replacement.'}
          </p>
        </div>
      </div>
    </div>
  );
}
