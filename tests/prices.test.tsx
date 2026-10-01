import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Prices from '@/routes/Prices';

describe('Fair-Price Breakdown (Feature 04)', () => {
  it('renders Fair-Price page with baseline workshop rate and parts tiers', () => {
    render(
      <BrowserRouter>
        <Prices />
      </BrowserRouter>
    );

    // Heading
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Fair-Price Breakdown/i);

    // Workshop rate note
    expect(screen.getByText(/Baseline workshop rate: £90\/hr/i)).toBeInTheDocument();

    // 3 Parts tiers present
    expect(screen.getAllByText(/TorqueSpec OE \(Original Equipment\)/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/OE-Equivalent \(Matching Quality\)/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Quality Aftermarket \(Budget Verified\)/i).length).toBeGreaterThanOrEqual(1);
  });

  it('switches parts tier and updates warranty duration badge', () => {
    render(
      <BrowserRouter>
        <Prices />
      </BrowserRouter>
    );

    // Click Aftermarket tier
    const aftermarketBtn = screen.getByRole('button', { name: /Quality Aftermarket/i });
    fireEvent.click(aftermarketBtn);

    // Warranty should reflect 12 Months
    expect(screen.getByText(/12 Months Written Warranty/i)).toBeInTheDocument();
  });

  it('toggles "Only what is needed now" switch to recalculate subtotal without non-urgent items', () => {
    render(
      <BrowserRouter>
        <Prices />
      </BrowserRouter>
    );

    const neededNowSwitch = screen.getByRole('switch', { name: /Only what's needed now/i });
    expect(neededNowSwitch).toHaveAttribute('aria-checked', 'false');

    // Click switch
    fireEvent.click(neededNowSwitch);
    expect(neededNowSwitch).toHaveAttribute('aria-checked', 'true');

    // Soon and watch items should be filtered out
    expect(screen.queryByText(/Hydraulic Brake Fluid System Pressure Bleed/i)).not.toBeInTheDocument();
  });

  it('toggles the 5 Questions to Ask Any Garage checklist', () => {
    render(
      <BrowserRouter>
        <Prices />
      </BrowserRouter>
    );

    const questionsBtn = screen.getByRole('button', { name: /5 Questions to Ask Any Garage/i });
    fireEvent.click(questionsBtn);

    expect(
      screen.getByText(/Will you show me the worn parts \(with micrometers or gauges\)/i)
    ).toBeInTheDocument();
  });

  it('opens Estimate Breakdown PDF modal', () => {
    render(
      <BrowserRouter>
        <Prices />
      </BrowserRouter>
    );

    const downloadBtn = screen.getByRole('button', { name: /Download Estimate PDF/i });
    fireEvent.click(downloadBtn);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/TORQUEWELL AUTO · ESTIMATE BREAKDOWN/i)).toBeInTheDocument();
  });
});
