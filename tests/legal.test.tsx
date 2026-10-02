import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Privacy from '@/routes/Privacy';
import Terms from '@/routes/Terms';
import Accessibility from '@/routes/Accessibility';
import Sitemap from '@/routes/Sitemap';
import NotFound from '@/routes/NotFound';

describe('Legal & Utility Routes', () => {
  it('renders Privacy Notice with zero-tracker disclosure', () => {
    render(
      <MemoryRouter initialEntries={['/privacy']}>
        <Routes>
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1, name: /Privacy Notice/i })).toBeInTheDocument();
    expect(screen.getByText(/Zero-Tracker Architecture/i)).toBeInTheDocument();
    expect(screen.getByText(/Your Statutory GDPR Rights/i)).toBeInTheDocument();
  });

  it('renders Terms of Business Agreement', () => {
    render(
      <MemoryRouter initialEntries={['/terms']}>
        <Routes>
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1, name: /Terms of Business & Workshop Agreement/i })).toBeInTheDocument();
    expect(screen.getByText(/1. Binding Estimates & Authorization/i)).toBeInTheDocument();
  });

  it('renders Accessibility statement and toggles Calm Mode', () => {
    render(
      <MemoryRouter initialEntries={['/accessibility']}>
        <Routes>
          <Route path="/accessibility" element={<Accessibility />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1, name: /Accessibility Statement/i })).toBeInTheDocument();
    expect(screen.getByText(/WCAG 2.2 AA Conformance/i)).toBeInTheDocument();

    const calmBtn = screen.getByRole('button', { name: /Enable Calm Mode|Calm Mode Active/i });
    expect(calmBtn).toBeInTheDocument();
    fireEvent.click(calmBtn);
  });

  it('renders Sitemap and filters routes via search input', () => {
    render(
      <MemoryRouter initialEntries={['/sitemap']}>
        <Routes>
          <Route path="/sitemap" element={<Sitemap />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1, name: /Complete HTML Sitemap/i })).toBeInTheDocument();
    expect(screen.getByText('27 Platform Routes')).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText(/Search pages/i);
    fireEvent.change(searchInput, { target: { value: 'Prices' } });

    expect(screen.getByText(/Fair-Price Breakdown Estimator/i)).toBeInTheDocument();
  });

  it('renders 404 NotFound with search and quick return actions', () => {
    render(
      <MemoryRouter initialEntries={['/random-unknown-page']}>
        <Routes>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: /Wrong turn/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Return Home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Emergency Help Now/i })).toBeInTheDocument();
  });
});
