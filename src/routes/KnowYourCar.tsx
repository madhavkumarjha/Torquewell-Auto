import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '@/store';
import { ARTICLES } from '@/data/articles';
import { CarAnatomyVisualizer } from '@/components/know/CarAnatomyVisualizer';
import { TyreTreadWidget } from '@/components/know/TyreTreadWidget';
import { PrintableChecklistModal } from '@/components/know/PrintableChecklistModal';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function KnowYourCar() {
  const { language } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [selectedDepth, setSelectedDepth] = useState<'s30' | 'm3' | 'deep'>('s30');
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    ARTICLES.forEach(a => a.tags.forEach(t => tagSet.add(t)));
    return ['all', ...Array.from(tagSet)];
  }, []);

  // Filter articles by search query and tag
  const filteredArticles = useMemo(() => {
    return ARTICLES.filter(article => {
      const title = language === 'hi' ? article.title.hi : article.title.en;
      const snippet = language === 'hi' ? article.layers[selectedDepth].hi : article.layers[selectedDepth].en;
      const matchesSearch =
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        snippet.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTag = selectedTag === 'all' || article.tags.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [searchQuery, selectedTag, selectedDepth, language]);

  return (
    <div className="space-y-12 py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[var(--border-subtle)]">
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-semibold">
              {language === 'hi' ? 'फ़ीचर 07 · अपनी कार को जानें' : 'Feature 07 · Technical Education'}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif tracking-tight text-[var(--text)]">
            {language === 'hi' ? 'अपनी कार को समझें' : 'Know Your Car'}
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed">
            {language === 'hi'
              ? 'जटिल वर्कशॉप शब्दों को स्पष्टता में बदलें। 3 पढ़ने की गहराई, इंटरएक्टिव पुर्जे और मैकेनिक से पूछने वाले सवाल।'
              : 'Turns confusing automotive jargon into clarity and confidence. Explanations at 3 reading depths, interactive component views, and questions to ask any mechanic.'}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Button
            variant="secondary"
            onClick={() => setIsChecklistOpen(true)}
            className="text-xs sm:text-sm font-medium"
          >
            📋 {language === 'hi' ? '5 जरूरी सवाल चेकलिस्ट' : '5 Questions to Ask Any Mechanic'}
          </Button>
        </div>
      </div>

      {/* 1. Interactive Car Anatomy Subsystems Visualizer */}
      <section aria-label="Interactive Car Anatomy">
        <CarAnatomyVisualizer />
      </section>

      {/* 2. Interactive Tyre Tread Coin Check Widget */}
      <section aria-label="Tyre Tread Depth Visualizer">
        <TyreTreadWidget />
      </section>

      {/* 3. Article Library Search & Tag Filters */}
      <section className="space-y-8 pt-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold font-serif">
              {language === 'hi' ? 'तकनीकी गाइड व लेख लाइब्रेरी (20 लेख)' : 'Technical Guide & Article Library'}
            </h2>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              {language === 'hi'
                ? 'सभी लेख स्वतंत्र इंजीनियरिंग मानकों और उपभोक्ता संरक्षण नियमों पर आधारित हैं।'
                : 'All articles are reviewed against public engineering standards and consumer rights frameworks.'}
            </p>
          </div>

          {/* Depth Level Switcher */}
          <div className="flex items-center gap-1.5 bg-[var(--surface-elevated)] p-1 rounded-xl border border-[var(--border-subtle)] self-start md:self-auto">
            <span className="text-[11px] font-mono text-[var(--text-muted)] px-2">
              {language === 'hi' ? 'पठन स्तर:' : 'Depth:'}
            </span>
            <button
              type="button"
              onClick={() => setSelectedDepth('s30')}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                selectedDepth === 's30'
                  ? 'bg-[var(--accent)] text-[var(--accent-ink)] font-semibold'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              {language === 'hi' ? '30 सेकंड' : '30-Sec'}
            </button>
            <button
              type="button"
              onClick={() => setSelectedDepth('m3')}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                selectedDepth === 'm3'
                  ? 'bg-[var(--accent)] text-[var(--accent-ink)] font-semibold'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              {language === 'hi' ? '3 मिनट' : '3-Min'}
            </button>
            <button
              type="button"
              onClick={() => setSelectedDepth('deep')}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                selectedDepth === 'deep'
                  ? 'bg-[var(--accent)] text-[var(--accent-ink)] font-semibold'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              {language === 'hi' ? 'विस्तृत (Deep)' : 'Deep Dive'}
            </button>
          </div>
        </div>

        {/* Search Bar & Tag Filter Pills */}
        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                language === 'hi'
                  ? 'लेख खोजें (उदा. ब्रेक, टायर, बैटरी, 0W-20, चेक इंजन, ईवी)...'
                  : 'Search technical guides (e.g. brakes, tyres, battery, 0W-20, check engine, EV)...'
              }
              className="w-full bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded-xl py-3 pl-11 pr-4 text-sm text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all"
            />
            <span className="absolute left-4 top-3.5 text-[var(--text-muted)] text-base">🔍</span>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-3 text-xs text-[var(--text-muted)] hover:text-[var(--text)]"
              >
                ✕ Clear
              </button>
            )}
          </div>

          {/* Tags */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {allTags.map(tag => (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedTag === tag
                    ? 'bg-[var(--accent)] text-[var(--accent-contrast)] font-semibold shadow-sm'
                    : 'bg-[var(--surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text)]'
                }`}
              >
                {tag === 'all' ? (language === 'hi' ? 'सभी विषय' : 'All Topics') : tag}
              </button>
            ))}
          </div>
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map(article => (
            <article
              key={article.slug}
              className="bg-[var(--surface-elevated)] border border-[var(--border-subtle)] hover:border-[var(--accent)]/50 rounded-2xl p-6 flex flex-col justify-between space-y-4 transition-all duration-200 hover:shadow-lg group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1.5">
                    {article.tags.slice(0, 2).map(tag => (
                      <Badge key={tag} variant="neutral" className="text-[10px] uppercase font-mono">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-[var(--text-muted)]">
                    {selectedDepth === 's30' ? '⚡ 30s' : selectedDepth === 'm3' ? '⏱️ 3 min' : '🔬 Deep'}
                  </span>
                </div>

                <h3 className="text-lg font-bold font-serif group-hover:text-[var(--accent)] transition-colors leading-snug">
                  <Link to={`/know/${article.slug}`}>
                    {language === 'hi' ? article.title.hi : article.title.en}
                  </Link>
                </h3>

                <p className="text-xs text-[var(--text-muted)] line-clamp-3 leading-relaxed">
                  {language === 'hi' ? article.layers[selectedDepth].hi : article.layers[selectedDepth].en}
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs">
                <span className="text-[var(--text-muted)] font-mono text-[11px]">
                  ❓ {article.askMechanic.length} {language === 'hi' ? 'पूछने योग्य सवाल' : 'Mechanic questions'}
                </span>
                <Link
                  to={`/know/${article.slug}`}
                  className="font-medium text-[var(--accent)] group-hover:underline flex items-center gap-1"
                >
                  <span>{language === 'hi' ? 'गाइड पढ़ें' : 'Read Guide'}</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12 bg-[var(--surface-sunken)] rounded-2xl border border-[var(--border-subtle)] space-y-3">
            <p className="text-sm font-medium text-[var(--text)]">
              {language === 'hi' ? 'कोई मेल खाता लेख नहीं मिला।' : 'No matching technical articles found.'}
            </p>
            <Button variant="secondary" onClick={() => { setSearchQuery(''); setSelectedTag('all'); }}>
              {language === 'hi' ? 'फ़िल्टर रीसेट करें' : 'Reset Filters'}
            </Button>
          </div>
        )}
      </section>

      {/* Persistent Educational Disclaimer */}
      <footer className="p-4 bg-[var(--surface-sunken)] rounded-xl border border-[var(--border-subtle)] text-xs text-[var(--text-muted)] text-center">
        <p>
          {language === 'hi'
            ? 'सामान्य तकनीकी जानकारी · यह व्यक्तिगत निदान नहीं है। किसी भी वाहन-विशिष्ट समस्या के लिए योग्य तकनीशियन से परामर्श लें।'
            : 'General educational information · Not a vehicle diagnosis or price quotation · An in-person inspection and written estimate come first.'}
        </p>
      </footer>

      {/* 5 Questions Modal */}
      <PrintableChecklistModal
        isOpen={isChecklistOpen}
        onClose={() => setIsChecklistOpen(false)}
      />
    </div>
  );
}
