import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Logo } from '@/components/ui/Logo';
import { GlobalControls } from './GlobalControls';
import { AlertCircle, Calendar, Menu as MenuIcon, X, Search } from 'lucide-react';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '/services', label: 'Services' },
    { to: '/prices', label: 'Prices' },
    { to: '/journey', label: 'Bay Board' },
    { to: '/mileage-map', label: 'Mileage Map' },
    { to: '/ev', label: 'EV & Hybrid' },
    { to: '/fleet', label: 'Fleet' },
    { to: '/crew', label: 'Crew' },
    { to: '/know', label: 'Know Your Car' },
  ];

  return (
    <header
      role="banner"
      className="sticky top-0 z-50 w-full border-b border-[var(--line)] bg-[var(--bg)]/95 backdrop-blur-md transition-all"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Logo />

        {/* Desktop Nav */}
        <nav
          role="navigation"
          aria-label="Main Navigation"
          className="hidden lg:flex items-center gap-6 text-sm font-medium text-[var(--text-muted)]"
        >
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `transition-colors hover:text-[var(--accent)] ${
                  isActive ? 'text-[var(--accent)] font-semibold' : ''
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-3">
          {/* Quick search shortcut */}
          <button
            className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-[var(--radius-sm)] border border-[var(--line)] text-xs text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)] transition-colors cursor-pointer"
            title="Search pages and articles (⌘K)"
            aria-label="Quick Search"
            onClick={() => {
              // Command palette trigger
              window.dispatchEvent(new CustomEvent('tw:open-command-palette'));
            }}
          >
            <Search className="w-3.5 h-3.5" aria-hidden="true" />
            <kbd className="font-mono text-[10px] bg-[var(--surface)] px-1 rounded border border-[var(--line)]">
              ⌘K
            </kbd>
          </button>

          {/* Global Preferences: Units, Language, Theme, Calm */}
          <div className="hidden md:flex">
            <GlobalControls />
          </div>

          {/* CRITICAL PRIORITY: Help Now Pill (1-Click Reachable Everywhere) */}
          <Link
            to="/help"
            id="header-help-pill"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-[var(--critical)] text-white hover:brightness-110 active:scale-95 transition-all shadow-sm"
            aria-label="Emergency Breakdown Assistance: Stuck? Help now"
          >
            <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Help now</span>
          </Link>

          {/* Book Pill */}
          <Link
            to="/book"
            id="header-book-pill"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-[var(--accent)] text-[var(--accent-ink)] hover:brightness-105 active:scale-95 transition-all shadow-sm"
            aria-label="Book a workshop inspection or service"
          >
            <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Book</span>
          </Link>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-[var(--radius-sm)] text-[var(--text)] hover:bg-[var(--surface-2)] focus:outline-none"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <MenuIcon className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[var(--line)] bg-[var(--surface)] p-5 space-y-4 animate-in fade-in slide-in-from-top-2">
          <nav className="flex flex-col gap-3">
            {navLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `text-base py-1 px-2 rounded-[var(--radius-sm)] transition-colors ${
                    isActive
                      ? 'bg-[var(--surface-2)] text-[var(--accent)] font-semibold'
                      : 'text-[var(--text)] hover:bg-[var(--surface-2)]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="pt-3 border-t border-[var(--line)] flex justify-between items-center">
            <span className="text-xs text-[var(--text-muted)] font-mono uppercase">
              Preferences
            </span>
            <GlobalControls />
          </div>
        </div>
      )}
    </header>
  );
};
