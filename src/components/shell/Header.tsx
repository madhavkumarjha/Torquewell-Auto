import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Logo } from '@/components/ui/Logo';
import { GlobalControls } from './GlobalControls';
import { CommandSearch } from './CommandSearch';
import { Search, ArrowRight, Menu, X, AlertCircle, Calendar } from 'lucide-react';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // 90% Frequently used waypoints (Antigravity Rule 1)
  const primaryLinks = [
    { to: '/services', label: 'Services' },
    { to: '/prices', label: 'Prices' },
    { to: '/proof', label: 'Proof' },
    { to: '/guide', label: 'Symptom Guide' },
  ];

  // Secondary items accessed via mobile drawer or command search
  const secondaryLinks = [
    { to: '/journey', label: 'Bay Board' },
    { to: '/mileage-map', label: 'Mileage Map' },
    { to: '/ev', label: 'EV & Hybrid' },
    { to: '/fleet', label: 'Fleet' },
    { to: '/crew', label: 'Crew' },
    { to: '/know', label: 'Know Your Car' },
  ];

  // Subtle floating elevation on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut listener for Cmd+K / Ctrl+K and custom event
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    const handleCustomOpen = () => setSearchOpen(true);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('tw:open-command-palette', handleCustomOpen);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('tw:open-command-palette', handleCustomOpen);
    };
  }, []);

  return (
    <>
      {/* Detached Antigravity Floating Header Container */}
      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-50 pointer-events-none transition-all duration-300 px-3 sm:px-6 lg:px-8 ${
          scrolled ? 'pt-2.5 sm:pt-3' : 'pt-4 sm:pt-5'
        }`}
      >
        <div
          className={`pointer-events-auto max-w-6xl mx-auto h-14 sm:h-16 px-3 sm:px-6 rounded-full border flex items-center justify-between gap-3 sm:gap-4 transition-all duration-300 ${
            scrolled
              ? 'bg-[var(--surface)]/90 backdrop-blur-xl border-[var(--line)] shadow-[0_16px_36px_-12px_rgba(0,0,0,0.4)]'
              : 'bg-[var(--surface)]/75 backdrop-blur-lg border-[var(--line)]/70 shadow-[0_12px_30px_-10px_rgba(0,0,0,0.25)]'
          }`}
        >
          {/* 1. BRAND IDENTITY */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* 2. AIRY 90% WAYPOINTS (Rule 1 & Rule 4: Whitespace is King) */}
          <nav
            role="navigation"
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-1.5 text-xs font-semibold tracking-wide"
          >
            {primaryLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-full transition-all duration-150 ${
                    isActive
                      ? 'bg-[var(--surface-2)] text-[var(--accent)] font-bold shadow-xs'
                      : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]/60'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* 3. FUNCTIONAL SEARCH + GROUPED UTILITIES + PRIMARY CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Functional Expanding Search Trigger (Rule 3) */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-full bg-[var(--surface-2)]/60 border border-[var(--line)]/50 text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--line)] text-xs transition-all cursor-pointer group"
              title="Search site, services, warning lights (⌘K)"
              aria-label="Search"
            >
              <Search className="w-3.5 h-3.5 group-hover:text-[var(--accent)] transition-colors flex-shrink-0" />
              <span className="hidden xl:inline font-mono text-[11px] text-[var(--text-muted)]">
                Search...
              </span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.2 rounded text-[10px] font-mono bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--line)]/60">
                ⌘K
              </kbd>
            </button>

            {/* Consolidated Secondary Dropdowns: Globe (Region/Language) & Settings (Theme/Calm) */}
            <div className="hidden sm:flex items-center">
              <GlobalControls />
            </div>

            {/* Subtle Help Now Pill (Ensures 1-Click Access without visual clutter) */}
            <Link
              to="/help"
              id="header-help-pill"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[var(--critical)] border border-[var(--critical)]/40 hover:bg-[var(--critical)]/10 active:scale-95 transition-all"
              aria-label="Emergency Breakdown Assistance: Help now"
              title="Roadside breakdown & emergency steps"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--critical)] animate-pulse" />
              <span>Help now</span>
            </Link>

            {/* Standout Primary CTA (Rule 1: Only 1 primary CTA stands out) */}
            <Link
              to="/book"
              id="header-book-pill"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] font-bold text-xs tracking-wide shadow-sm hover:brightness-110 active:scale-95 transition-all select-none"
              aria-label="Book a check"
            >
              <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Book</span>
              <ArrowRight className="w-3 h-3 hidden sm:inline" />
            </Link>

            {/* Mobile Hamburger (Rule 5: Only 3 visible items on mobile) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-full text-[var(--text)] hover:bg-[var(--surface-2)] transition-colors cursor-pointer"
              aria-label="Toggle navigation drawer"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Lightweight Mobile Float Drawer */}
        {mobileMenuOpen && (
          <div className="pointer-events-auto lg:hidden max-w-6xl mx-auto mt-2 p-5 rounded-3xl bg-[var(--surface)]/95 backdrop-blur-2xl border border-[var(--line)] shadow-2xl space-y-4 animate-in fade-in slide-in-from-top-3 duration-200">
            {/* Mobile Emergency Quick-Link */}
            <Link
              to="/help"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-2xl bg-[var(--critical)]/10 border border-[var(--critical)]/30 text-[var(--critical)] font-bold text-xs"
            >
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span>Stuck on the road? Emergency Help Now</span>
              </div>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Primary Waypoints */}
            <div className="space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)] block px-2 py-1 font-semibold">
                Explore
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {[...primaryLinks, ...secondaryLinks].map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                        isActive
                          ? 'bg-[var(--surface-2)] text-[var(--accent)] font-bold'
                          : 'text-[var(--text-muted)] hover:bg-[var(--surface-2)] hover:text-[var(--text)]'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Grouped Mobile Preferences */}
            <div className="pt-3 border-t border-[var(--line)]/60 flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-semibold">
                Preferences
              </span>
              <GlobalControls />
            </div>
          </div>
        )}
      </header>

      {/* Real Keyboard-Driven Command Palette Dialog */}
      <CommandSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};
