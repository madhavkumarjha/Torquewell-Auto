import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '@/components/ui/Logo';
import { siteConfig } from '@/config/site';
import { ShieldCheck, Phone, Wrench, Clock, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer
      role="contentinfo"
      className="bg-[var(--surface)] border-t border-[var(--line)] pt-16 pb-12 text-sm text-[var(--text-muted)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Logo showTagline />
            <p className="text-xs leading-relaxed max-w-sm text-[var(--text-muted)]">
              Independent multi-bay workshop network dedicated to total transparency. Every
              recommendation comes with photo proof, micrometer measurements, and clear price logic
              before a spanner is turned.
            </p>
            <div className="flex flex-col gap-2 pt-2 text-xs font-mono">
              <div className="flex items-center gap-2 text-[var(--text)]">
                <Phone className="w-4 h-4 text-[var(--accent)]" aria-hidden="true" />
                <span>Workshop: {siteConfig.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-[var(--critical)]">
                <Phone className="w-4 h-4" aria-hidden="true" />
                <span>Emergency Help: {siteConfig.roadsidePhone}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-[var(--text)] font-semibold">
              Explore
            </h2>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/services" className="hover:text-[var(--accent)] transition-colors">
                  All Services
                </Link>
              </li>
              <li>
                <Link to="/prices" className="hover:text-[var(--accent)] transition-colors">
                  Fair-Price Breakdown
                </Link>
              </li>
              <li>
                <Link to="/journey" className="hover:text-[var(--accent)] transition-colors">
                  The Bay Board
                </Link>
              </li>
              <li>
                <Link to="/mileage-map" className="hover:text-[var(--accent)] transition-colors">
                  Mileage Map Roadmap
                </Link>
              </li>
              <li>
                <Link to="/ev" className="hover:text-[var(--accent)] transition-colors">
                  EV & Hybrid Care
                </Link>
              </li>
              <li>
                <Link to="/know" className="hover:text-[var(--accent)] transition-colors">
                  Know Your Car Library
                </Link>
              </li>
            </ul>
          </div>

          {/* Workshop Network */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-[var(--text)] font-semibold">
              Locations
            </h2>
            <ul className="space-y-2 text-xs">
              {siteConfig.branches.map((b) => (
                <li key={b.id} className="flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[var(--accent)] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[var(--text)] font-medium block">{b.name}</span>
                    <span className="text-[11px] text-[var(--text-muted)]">{b.region}</span>
                  </div>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  to="/locations"
                  className="text-xs text-[var(--accent)] hover:underline font-medium"
                >
                  View bay facilities & hours →
                </Link>
              </li>
            </ul>
          </div>

          {/* Standards & Transparency */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-[var(--text)] font-semibold">
              Principles
            </h2>
            <ul className="space-y-2 text-xs">
              <li className="flex items-start gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[var(--teal)] mt-0.5 flex-shrink-0" />
                <span>Written estimates before any repair</span>
              </li>
              <li className="flex items-start gap-1.5">
                <Wrench className="w-3.5 h-3.5 text-[var(--teal)] mt-0.5 flex-shrink-0" />
                <span>Old parts returned on customer request</span>
              </li>
              <li className="flex items-start gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[var(--teal)] mt-0.5 flex-shrink-0" />
                <span>Urgency tiered: Now, Soon, Watch</span>
              </li>
              <li>
                <Link to="/policies" className="hover:text-[var(--accent)] transition-colors">
                  Warranty & Parts Policies
                </Link>
              </li>
              <li>
                <Link to="/portal" className="hover:text-[var(--accent)] transition-colors">
                  Customer Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Mandatory Safety Line Notice Banner (File 01 §5.3) */}
        <div
          role="note"
          aria-label="Safety advice"
          className="rounded-[var(--radius-md)] bg-[var(--surface-2)] border-l-4 border-[var(--critical)] p-4 text-xs leading-relaxed text-[var(--text)]"
        >
          <strong className="text-[var(--critical)] font-bold uppercase tracking-wider mr-2 font-mono">
            Safety Line:
          </strong>
          If your vehicle feels unsafe, pulls sharply, loses braking feel, or displays red warning
          lights, stop in a safe place and call roadside/emergency services immediately. This
          website provides guidance and repair management; it cannot diagnose mechanical faults remotely.
        </div>

        {/* Bottom Legal & Utility Bar */}
        <div className="pt-8 border-t border-[var(--line)] flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} Torquewell Auto Network. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-6">
            <Link to="/privacy" className="hover:text-[var(--text)] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-[var(--text)] transition-colors">
              Terms of Service
            </Link>
            <Link to="/accessibility" className="hover:text-[var(--text)] transition-colors">
              Accessibility
            </Link>
            <Link to="/sitemap" className="hover:text-[var(--text)] transition-colors">
              Sitemap
            </Link>
            <Link to="/careers" className="hover:text-[var(--text)] transition-colors">
              Careers
            </Link>
            <Link to="/contact" className="hover:text-[var(--text)] transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
