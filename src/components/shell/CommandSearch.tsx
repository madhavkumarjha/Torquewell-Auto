import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Wrench, ShieldAlert, FileText, Calendar } from 'lucide-react';

interface SearchItem {
  id: string;
  title: string;
  category: 'Pages' | 'Services' | 'Safety' | 'Tools';
  url: string;
  badge?: string;
  desc: string;
}

const SEARCH_ITEMS: SearchItem[] = [
  { id: 'home', title: 'Home Overview', category: 'Pages', url: '/', desc: 'The garage that shows evidence before repair' },
  { id: 'services', title: 'All Workshop Services', category: 'Pages', url: '/services', desc: 'Complete breakdown of all 14 workshop inspection bays' },
  { id: 'prices', title: 'Fair-Price Breakdown', category: 'Pages', url: '/prices', desc: 'Labour rates × hours, parts tiers, and authorization process' },
  { id: 'proof', title: 'Digital Proof Report', category: 'Pages', url: '/proof', desc: 'Micro-photos, calibrated micrometer readings, and urgency stamps' },
  { id: 'guide', title: 'Can I Still Drive It? (Symptom Guide)', category: 'Safety', url: '/guide', badge: 'Triage', desc: 'Immediate 2-minute safety check for warning lights and noises' },
  { id: 'help', title: 'Stuck? Emergency Help Now', category: 'Safety', url: '/help', badge: 'Critical', desc: '24/7 breakdown recovery dispatch and roadside safety steps' },
  { id: 'book', title: 'Book an Inspection', category: 'Tools', url: '/book', badge: 'Action', desc: 'Choose service, branch, and reserve your bay slot' },
  { id: 'brakes', title: 'Brakes & Hydraulic Check', category: 'Services', url: '/services/brakes', desc: 'Pads thickness (mm), disc runout, and fluid boiling test' },
  { id: 'tyres', title: 'Tyres & Wheel Alignment', category: 'Services', url: '/services/tyres', desc: 'Laser 4-wheel geometry and calibrated tread depth' },
  { id: 'ev', title: 'EV & High-Voltage Service', category: 'Services', url: '/ev', desc: 'Battery cell balance and high-voltage isolation checks' },
  { id: 'fleet', title: 'Fleet & Commercial Accounts', category: 'Services', url: '/fleet', desc: 'Uptime monitoring and centralized fleet invoices' },
  { id: 'journey', title: 'The Bay Board Live Tracker', category: 'Tools', url: '/journey', desc: 'Real-time vehicle repair progress through the 7 workshop stages' },
  { id: 'mileage', title: 'Mileage Milestone Map', category: 'Tools', url: '/mileage-map', desc: 'Preventive service intervals based on age and distance' },
];

interface CommandSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandSearch: React.FC<CommandSearchProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const filteredItems = useMemo(() => {
    if (!query.trim()) return SEARCH_ITEMS;
    const q = query.toLowerCase();
    return SEARCH_ITEMS.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredItems]);

  const handleSelect = (url: string) => {
    onClose();
    navigate(url);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === 'Enter' && filteredItems[selectedIndex]) {
      e.preventDefault();
      handleSelect(filteredItems[selectedIndex].url);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Site Search Command Palette"
      className="fixed inset-0 z-[100] flex items-start justify-center pt-20 sm:pt-28 px-4 bg-black/65 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-3xl bg-[var(--surface)] border border-[var(--line)] shadow-[0_24px_64px_-16px_rgba(0,0,0,0.5)] overflow-hidden text-[var(--text)] transition-all animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--line)]/70">
          <Search className="w-5 h-5 text-[var(--accent)] flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search services, symptoms, prices, or parts..."
            className="w-full bg-transparent text-sm sm:text-base text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-[var(--text-muted)] hover:text-[var(--text)] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--surface-2)] text-[var(--text-muted)] border border-[var(--line)]/60">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-sm text-[var(--text-muted)] space-y-2">
              <p>No results found for "{query}".</p>
              <p className="text-xs font-mono">Try searching "brakes", "warning", "price", or "help".</p>
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.url)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full text-left px-3.5 py-3 rounded-2xl flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[var(--surface-2)] text-[var(--accent)] shadow-xs'
                      : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`p-2 rounded-xl transition-colors ${
                        isSelected
                          ? 'bg-[var(--accent)] text-[var(--accent-ink)]'
                          : 'bg-[var(--surface-2)]/60 text-[var(--text-muted)]'
                      }`}
                    >
                      {item.category === 'Safety' && <ShieldAlert className="w-4 h-4" />}
                      {item.category === 'Services' && <Wrench className="w-4 h-4" />}
                      {item.category === 'Tools' && <Calendar className="w-4 h-4" />}
                      {item.category === 'Pages' && <FileText className="w-4 h-4" />}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-[var(--text)] truncate">
                          {item.title}
                        </span>
                        {item.badge && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono uppercase bg-[var(--accent)]/15 text-[var(--accent)] font-semibold">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[var(--text-muted)] truncate">{item.desc}</p>
                    </div>
                  </div>

                  <ArrowRight
                    className={`w-4 h-4 flex-shrink-0 transition-transform ${
                      isSelected ? 'translate-x-0.5 text-[var(--accent)]' : 'opacity-0'
                    }`}
                  />
                </button>
              );
            })
          )}
        </div>

        {/* Footer info bar */}
        <div className="px-4 py-2.5 bg-[var(--surface-2)]/50 border-t border-[var(--line)]/50 flex items-center justify-between text-[11px] text-[var(--text-muted)] font-mono">
          <div className="flex items-center gap-3">
            <span>↑↓ to navigate</span>
            <span>↵ to select</span>
          </div>
          <span className="text-[10px] text-[var(--accent)] font-semibold">
            TORQUEWELL COMMAND
          </span>
        </div>
      </div>
    </div>
  );
};
