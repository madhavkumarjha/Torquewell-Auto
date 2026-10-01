import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@/components/shell/Header';
import { Footer } from '@/components/shell/Footer';
import { ConsentGate } from '@/components/shell/ConsentGate';
import { FloatingLauncher } from '@/components/shell/FloatingLauncher';
import { InitialLoader } from '@/components/motion/InitialLoader';
import { TorqueCursor } from '@/components/motion/TorqueCursor';
import { ScrollProgress } from '@/components/motion/ScrollProgress';
import { PageTransition } from '@/components/motion/PageTransition';

export const RootLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg)] text-[var(--text)] selection:bg-[var(--accent)] selection:text-[var(--accent-ink)]">
      {/* Accessibility: Skip to Content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 z-50 px-4 py-2 bg-[var(--accent)] text-[var(--accent-ink)] font-bold rounded-[var(--radius-sm)] shadow-lg"
      >
        Skip to main content
      </a>

      {/* Motion Delights: Loader, Cursor Follower & Scroll Ruler */}
      <InitialLoader />
      <TorqueCursor />
      <ScrollProgress />

      {/* Global Navigation Header */}
      <Header />

      {/* Page Content with Click-Through Transition */}
      <main id="main-content" role="main" className="flex-1 w-full pt-20 sm:pt-24">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Mobile Floating Action Launcher & Consent Gate */}
      <FloatingLauncher />
      <ConsentGate />
    </div>
  );
};
