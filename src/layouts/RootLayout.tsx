import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@/components/shell/Header';
import { Footer } from '@/components/shell/Footer';
import { ConsentGate } from '@/components/shell/ConsentGate';
import { FloatingLauncher } from '@/components/shell/FloatingLauncher';

export const RootLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg)] text-[var(--text)] selection:bg-[var(--accent)] selection:text-[var(--accent-ink)]">
      {/* Skip to Content Link for Accessibility (WCAG 2.4.1) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 z-50 px-4 py-2 bg-[var(--accent)] text-[var(--accent-ink)] font-bold rounded-[var(--radius-sm)] shadow-lg"
      >
        Skip to main content
      </a>

      {/* Global Navigation Header */}
      <Header />

      {/* Main Page Area */}
      <main id="main-content" role="main" className="flex-1 w-full">
        <Outlet />
      </main>

      {/* Global Comprehensive Footer */}
      <Footer />

      {/* Floating launcher & Consent gate */}
      <FloatingLauncher />
      <ConsentGate />
    </div>
  );
};
