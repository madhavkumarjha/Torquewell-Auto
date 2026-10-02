import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useStore } from '@/store';
import { ARTICLES } from '@/data/articles';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { language } = useStore();
  const [depth, setDepth] = useState<'s30' | 'm3' | 'deep'>('m3');
  const [copied, setCopied] = useState(false);

  const articleIndex = ARTICLES.findIndex(a => a.slug === slug);
  const article = ARTICLES[articleIndex];

  if (!article) {
    return (
      <div className="py-16 text-center max-w-xl mx-auto space-y-4">
        <h1 className="text-3xl font-bold font-serif">Article Not Found</h1>
        <p className="text-sm text-[var(--text-muted)]">
          The requested technical guide does not exist in our library.
        </p>
        <Button variant="primary" onClick={() => navigate('/know')}>
          Back to Know Your Car Hub
        </Button>
      </div>
    );
  }

  const prevArticle = articleIndex > 0 ? ARTICLES[articleIndex - 1] : null;
  const nextArticle = articleIndex < ARTICLES.length - 1 ? ARTICLES[articleIndex + 1] : null;

  const handleCopyQuestions = () => {
    const text = article.askMechanic.map((q, i) => `${i + 1}. ${language === 'hi' ? q.hi : q.en}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-10 py-8 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[var(--text-muted)] font-mono">
        <Link to="/" className="hover:text-[var(--text)]">Home</Link>
        <span>/</span>
        <Link to="/know" className="hover:text-[var(--text)]">{language === 'hi' ? 'अपनी कार को समझें' : 'Know Your Car'}</Link>
        <span>/</span>
        <span className="text-[var(--text)] truncate max-w-[200px] sm:max-w-none font-semibold">
          {language === 'hi' ? article.title.hi : article.title.en}
        </span>
      </nav>

      {/* Article Header */}
      <header className="space-y-4 pb-6 border-b border-[var(--border-subtle)]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {article.tags.map(tag => (
              <Badge key={tag} variant="neutral" className="text-[11px] uppercase font-mono">
                {tag}
              </Badge>
            ))}
          </div>
          <span className="text-xs font-mono text-[var(--text-muted)]">
            {language === 'hi' ? 'समीक्षा तिथि:' : 'Reviewed on:'} {article.reviewedOn}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif tracking-tight text-[var(--text)] leading-tight">
          {language === 'hi' ? article.title.hi : article.title.en}
        </h1>

        {/* 3-Depth Reading Switcher */}
        <div className="pt-2">
          <div className="bg-[var(--surface-sunken)] p-1.5 rounded-2xl border border-[var(--border-subtle)] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
            <span className="text-xs font-mono font-medium text-[var(--text-muted)] px-3 py-1">
              {language === 'hi' ? 'पठन गहराई चुनें:' : 'Select Reading Depth:'}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setDepth('s30')}
                className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                  depth === 's30'
                    ? 'bg-[var(--accent)] text-[var(--accent-ink)] font-bold shadow-sm'
                    : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                }`}
              >
                ⚡ {language === 'hi' ? '30-सेकंड सारांश' : '30-Sec Glance'}
              </button>
              <button
                type="button"
                onClick={() => setDepth('m3')}
                className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                  depth === 'm3'
                    ? 'bg-[var(--accent)] text-[var(--accent-ink)] font-bold shadow-sm'
                    : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                }`}
              >
                ⏱️ {language === 'hi' ? '3-मिनट व्यावहारिक' : '3-Min Practical'}
              </button>
              <button
                type="button"
                onClick={() => setDepth('deep')}
                className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                  depth === 'deep'
                    ? 'bg-[var(--accent)] text-[var(--accent-ink)] font-bold shadow-sm'
                    : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                }`}
              >
                🔬 {language === 'hi' ? 'इंजीनियरिंग डीप-डाइव' : 'Deep Engineering'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Article Content Stage */}
      <main className="space-y-8">
        {/* Rendered Layer Content */}
        <div className="bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)] text-xs font-mono text-[var(--text-muted)]">
            <span className="text-[var(--accent)] uppercase font-semibold">
              {depth === 's30' ? 'Executive 30-Second Summary' : depth === 'm3' ? 'Comprehensive Practical Explainer' : 'Deep Technical Mechanics & Physics'}
            </span>
            <span>{depth === 's30' ? 'Reading time ~30s' : depth === 'm3' ? 'Reading time ~3 min' : 'Engineering Level'}</span>
          </div>

          <div className="prose prose-invert max-w-none text-base leading-relaxed text-[var(--text)] space-y-4">
            {(language === 'hi' ? article.layers[depth].hi : article.layers[depth].en)
              .split('\n\n')
              .map((para, idx) => (
                <p key={idx} className="whitespace-pre-line">
                  {para}
                </p>
              ))}
          </div>
        </div>

        {/* Technical Glossary Box */}
        {article.glossary && article.glossary.length > 0 && (
          <div className="bg-[var(--surface-sunken)] border border-[var(--border-subtle)] rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-base">📖</span>
              <h2 className="text-base font-bold font-serif">
                {language === 'hi' ? 'तकनीकी शब्दावली व परिभाषाएं' : 'Technical Glossary in Plain Language'}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {article.glossary.map((item, idx) => {
                const [term, def] = item.split(': ');
                return (
                  <div key={idx} className="p-3 bg-[var(--surface-elevated)] rounded-xl border border-[var(--border-subtle)] text-xs space-y-1">
                    <strong className="text-[var(--accent)] font-mono block">{term}</strong>
                    <span className="text-[var(--text-muted)]">{def}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* What to Ask Your Mechanic Checklist Card */}
        <div className="bg-[var(--surface-elevated)] border-2 border-[var(--accent)]/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-subtle)]">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-semibold">
                {language === 'hi' ? 'वर्कशॉप वार्तालाप टूल' : 'Workshop Conversation Tool'}
              </span>
              <h2 className="text-xl font-bold font-serif mt-1">
                {language === 'hi' ? 'अपने मैकेनिक से पूछने वाले सवाल' : 'Questions to Ask Your Mechanic'}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="secondary" onClick={handleCopyQuestions} className="text-xs">
                {copied ? (language === 'hi' ? '✓ कॉपी हुआ' : '✓ Copied') : (language === 'hi' ? 'कॉपी करें' : 'Copy List')}
              </Button>
              <Button variant="secondary" onClick={handlePrint} className="text-xs">
                {language === 'hi' ? 'प्रिंट' : 'Print'}
              </Button>
            </div>
          </div>

          <ol className="space-y-3">
            {article.askMechanic.map((q, idx) => (
              <li key={idx} className="p-3.5 bg-[var(--surface-sunken)] rounded-xl border border-[var(--border-subtle)] flex items-start gap-3 text-sm">
                <span className="w-5 h-5 rounded-full bg-[var(--accent)] text-[var(--accent-contrast)] text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="text-[var(--text)] font-medium">
                  {language === 'hi' ? q.hi : q.en}
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* Sources & Standards List */}
        <div className="p-4 bg-[var(--surface-sunken)] rounded-xl border border-[var(--border-subtle)] text-xs text-[var(--text-muted)] space-y-2">
          <strong className="text-[var(--text)] block font-mono uppercase tracking-wider">
            {language === 'hi' ? 'सत्यापित तकनीकी स्रोत व मानक:' : 'Factual Sources & Engineering Standards:'}
          </strong>
          <ul className="list-disc list-inside space-y-1 font-mono text-[11px]">
            {article.sources.map((src, idx) => (
              <li key={idx}>{src}</li>
            ))}
          </ul>
        </div>

        {/* Next / Previous Article Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-[var(--border-subtle)]">
          {prevArticle ? (
            <Link
              to={`/know/${prevArticle.slug}`}
              className="p-4 bg-[var(--surface-elevated)] border border-[var(--border-subtle)] hover:border-[var(--accent)] rounded-xl space-y-1 transition-all group"
            >
              <span className="text-[11px] font-mono text-[var(--text-muted)]">← {language === 'hi' ? 'पिछला लेख' : 'Previous Article'}</span>
              <p className="font-serif font-bold text-sm text-[var(--text)] group-hover:text-[var(--accent)] truncate">
                {language === 'hi' ? prevArticle.title.hi : prevArticle.title.en}
              </p>
            </Link>
          ) : <div />}

          {nextArticle && (
            <Link
              to={`/know/${nextArticle.slug}`}
              className="p-4 bg-[var(--surface-elevated)] border border-[var(--border-subtle)] hover:border-[var(--accent)] rounded-xl space-y-1 text-right transition-all group sm:col-start-2"
            >
              <span className="text-[11px] font-mono text-[var(--text-muted)]">{language === 'hi' ? 'अगला लेख' : 'Next Article'} →</span>
              <p className="font-serif font-bold text-sm text-[var(--text)] group-hover:text-[var(--accent)] truncate">
                {language === 'hi' ? nextArticle.title.hi : nextArticle.title.en}
              </p>
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}
