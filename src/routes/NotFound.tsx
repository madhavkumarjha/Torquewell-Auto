import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '@/store';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  const { language } = useStore();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/know?q=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <div className="py-16 sm:py-24 max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-8 animate-in fade-in duration-300">
      <div className="space-y-3">
        <span className="font-mono text-5xl sm:text-6xl font-extrabold text-[var(--accent)] tracking-widest block">
          404
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif text-[var(--text)]">
          {language === 'hi' ? 'गलत मोड़! चलिए आपको सही रास्ते पर लाते हैं।' : 'Wrong turn. Let’s get you back on the road.'}
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-lg mx-auto">
          {language === 'hi'
            ? 'आप जिस पेज को ढूंढ रहे हैं वह मौजूद नहीं है या स्थानांतरित कर दिया गया है।'
            : 'The page or resource you requested could not be located. Use the search or navigation below.'}
        </p>
      </div>

      {/* Quick Search Bar */}
      <form onSubmit={handleSearch} className="max-w-md mx-auto flex items-center gap-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={language === 'hi' ? 'सेवाएं या लेख खोजें...' : 'Search services, guides, prices...'}
          className="flex-1 bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded-xl px-4 py-2.5 text-xs text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
        />
        <Button type="submit" variant="primary" className="text-xs px-4">
          {language === 'hi' ? 'खोजें' : 'Search'}
        </Button>
      </form>

      {/* Quick Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Link to="/">
          <Button variant="secondary" className="text-xs">
            🏠 {language === 'hi' ? 'होम पेज' : 'Return Home'}
          </Button>
        </Link>
        <Link to="/help">
          <Button variant="primary" className="text-xs">
            🚨 {language === 'hi' ? 'आपातकालीन सहायता (Help Now)' : 'Emergency Help Now'}
          </Button>
        </Link>
        <Link to="/book">
          <Button variant="secondary" className="text-xs">
            📅 {language === 'hi' ? 'सर्विस बुक करें' : 'Book Service'}
          </Button>
        </Link>
        <Link to="/guide">
          <Button variant="secondary" className="text-xs">
            🔍 {language === 'hi' ? 'लक्षण गाइड' : 'Symptom Guide'}
          </Button>
        </Link>
      </div>

      {/* Emergency Roadside Hotline Card */}
      <div className="p-4 bg-[var(--surface-sunken)] rounded-2xl border border-[var(--border-subtle)] max-w-md mx-auto text-xs text-[var(--text-muted)] space-y-1">
        <p className="font-bold text-[var(--text)]">
          {language === 'hi' ? 'सड़क पर फंसे हैं? 24/7 रोडसाइड हेल्पलाइन:' : 'Stranded on the road? 24/7 Breakdown Hotline:'}
        </p>
        <a href="tel:0800867783" className="font-mono text-sm text-[var(--accent)] font-bold hover:underline block">
          0800 867 783 (Toll Free)
        </a>
      </div>
    </div>
  );
}
