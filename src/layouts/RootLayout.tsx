import { Outlet, Link } from 'react-router-dom';

export const RootLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg)] text-[var(--text)]">
      {/* Minimal Header Landmark */}
      <header role="banner" className="border-b border-[var(--line)] py-3 px-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Link to="/" className="text-xl font-bold tracking-tight text-[var(--text)]">
            Torquewell Auto
          </Link>
          <div className="flex gap-4 items-center">
            <Link to="/help" className="text-sm font-semibold text-[var(--critical)]">
              Stuck? Help now
            </Link>
            <Link to="/book" className="text-sm font-semibold text-[var(--accent)]">
              Book
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main id="main-content" role="main" className="flex-1 max-w-7xl mx-auto w-full p-6">
        <Outlet />
      </main>

      {/* Minimal Footer Landmark */}
      <footer role="contentinfo" className="border-t border-[var(--line)] py-6 px-6 text-sm text-[var(--text-muted)]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-4">
          <p>© {new Date().getFullYear()} Torquewell Auto. Proof, not promises.</p>
          <p>If your vehicle feels unsafe, stop in a safe place and call emergency services.</p>
        </div>
      </footer>
    </div>
  );
};
