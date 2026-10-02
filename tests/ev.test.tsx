import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import EvHybrid from '@/routes/EvHybrid';

describe('Electric & Hybrid Workshop Capabilities (/ev)', () => {
  it('renders EV page header with certified badge and training placeholder note', () => {
    render(
      <MemoryRouter initialEntries={['/ev']}>
        <Routes>
          <Route path="/ev" element={<EvHybrid />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1, name: /Electric & Hybrid Workshop Capabilities/i })).toBeInTheDocument();
    expect(screen.getByText(/High-Voltage Bay Certified/i)).toBeInTheDocument();
    expect(screen.getByText(/Accreditation Standard Notice/i)).toBeInTheDocument();
  });

  it('renders 1,000V CAT III tooling equipment grid', () => {
    render(
      <MemoryRouter initialEntries={['/ev']}>
        <Routes>
          <Route path="/ev" element={<EvHybrid />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/1,000V CAT III Insulated Tool Set/i)).toBeInTheDocument();
    expect(screen.getByText(/Digital Battery Conductance & SOH Tester/i)).toBeInTheDocument();
    expect(screen.getByText(/Lockout \/ Tagout \(LOTO\) Isolation Bay/i)).toBeInTheDocument();
  });

  it('interacts with the Battery State-of-Health (SOH) diagnostic simulator', () => {
    render(
      <MemoryRouter initialEntries={['/ev']}>
        <Routes>
          <Route path="/ev" element={<EvHybrid />} />
        </Routes>
      </MemoryRouter>
    );

    const slider = screen.getByLabelText(/Adjust Simulated Battery State of Health/i);
    expect(slider).toBeInTheDocument();

    fireEvent.change(slider, { target: { value: '72' } });
    expect(screen.getByText('72%')).toBeInTheDocument();
    expect(screen.getByText(/Moderate Degradation/i)).toBeInTheDocument();
  });

  it('renders sourced EV myths and service scope boundaries', () => {
    render(
      <MemoryRouter initialEntries={['/ev']}>
        <Routes>
          <Route path="/ev" element={<EvHybrid />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Debunking Common EV & Battery Myths/i)).toBeInTheDocument();
    expect(screen.getByText(/What We Service vs What We Don’t Do/i)).toBeInTheDocument();
    expect(screen.getByText(/Opening sealed traction battery casing/i)).toBeInTheDocument();
  });
});
