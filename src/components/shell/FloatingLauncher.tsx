import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, PhoneCall } from 'lucide-react';
import { siteConfig } from '@/config/site';

export const FloatingLauncher: React.FC = () => {
  return (
    <aside
      aria-label="Quick Actions"
      className="fixed bottom-5 right-5 z-40 flex flex-col gap-2 items-end sm:hidden"
    >
      {/* Quick Direct Roadside Call */}
      <a
        href={`tel:${siteConfig.roadsidePhone}`}
        className="w-12 h-12 rounded-full bg-[var(--critical)] text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all"
        title="Emergency breakdown helpline"
        aria-label="Direct emergency helpline"
      >
        <PhoneCall className="w-5 h-5" aria-hidden="true" />
      </a>

      {/* Guide Shortcut */}
      <Link
        to="/guide"
        className="px-3.5 py-1.5 rounded-full bg-[var(--surface-2)] border border-[var(--line)] text-xs font-semibold text-[var(--text)] shadow-md flex items-center gap-1.5 hover:bg-[var(--line)] transition-colors"
        aria-label="Can I still drive it? Symptom guide"
      >
        <HelpCircle className="w-3.5 h-3.5 text-[var(--teal)]" aria-hidden="true" />
        <span>Can I drive it?</span>
      </Link>
    </aside>
  );
};
