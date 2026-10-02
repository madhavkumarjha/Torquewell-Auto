import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import About from '@/routes/About';

describe('About Torquewell Auto (/about)', () => {
  it('renders About page header and founding purpose', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <Routes>
          <Route path="/about" element={<About />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1, name: /The Garage Built on Verifiable Evidence/i })).toBeInTheDocument();
    expect(screen.getByText(/The Torquewell Standard/i)).toBeInTheDocument();
  });

  it('renders 4 core operating principles', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <Routes>
          <Route path="/about" element={<About />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Calibrated Evidence First/i)).toBeInTheDocument();
    expect(screen.getByText(/Zero Sales Commissions/i)).toBeInTheDocument();
    expect(screen.getByText(/Precision Torque Engineering/i)).toBeInTheDocument();
    expect(screen.getByText(/100% Responsible Recycling/i)).toBeInTheDocument();
  });

  it('renders Tomas Hale founder story and milestone timeline', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <Routes>
          <Route path="/about" element={<About />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Tomas Hale')).toBeInTheDocument();
    expect(screen.getByText(/Founder & Master Technician/i)).toBeInTheDocument();
    expect(screen.getByText(/Founded in North Yard/i)).toBeInTheDocument();
    expect(screen.getByText(/The Click Guarantee Launch/i)).toBeInTheDocument();
  });
});
