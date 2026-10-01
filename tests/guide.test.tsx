import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Guide from '@/routes/Guide';
import { evaluateGuideTriage } from '@/data/guide-rules';
import { GuideState } from '@/types';

describe('Symptom & Warning-Light Guide (Feature 02)', () => {
  it('deterministic rule engine returns STOP when any critical red flag is present', () => {
    const stateWithRedFlag: GuideState = {
      redFlags: ['brake-soft'],
      powertrain: 'petrol',
      ageBand: '3-6 yrs',
      mileageKm: 60000,
      symptoms: ['squeal-braking'],
      lights: ['check-engine'],
      triggers: ['braking'],
      duration: '<1d',
      recent: [],
      locale: 'en',
    };

    const result = evaluateGuideTriage(stateWithRedFlag);
    expect(result.level).toBe('stop');
    expect(result.areas.length).toBeGreaterThan(0);
    expect(result.note[0].en).toContain('Critical red-flag condition');
  });

  it('evaluates brake squeal without grinding as WEEK urgency', () => {
    const stateSquealOnly: GuideState = {
      redFlags: [],
      powertrain: 'petrol',
      ageBand: '3-6 yrs',
      mileageKm: 40000,
      symptoms: ['squeal-braking'],
      lights: [],
      triggers: ['braking'],
      duration: '1-7d',
      recent: [],
      locale: 'en',
    };

    const result = evaluateGuideTriage(stateSquealOnly);
    expect(result.level).toBe('week');
    expect(result.areas[0].en).toContain('Brake pad friction material thickness');
  });

  it('renders Guide page with disclaimer and emergency assistance banner', () => {
    render(
      <BrowserRouter>
        <Guide />
      </BrowserRouter>
    );

    // H1 Heading
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Can I still drive it\?/i);

    // Emergency shortcut banner
    expect(screen.getByText(/Emergency Help Now/i)).toBeInTheDocument();

    // Mandatory disclaimer line
    expect(screen.getByText(/Indicative only · Not a diagnosis or quotation/i)).toBeInTheDocument();

    // Red flag options
    expect(screen.getByText(/Brake pedal feels soft, spongy, or sinks to floor/i)).toBeInTheDocument();
    expect(screen.getByText(/Sudden loss of steering control/i)).toBeInTheDocument();
  });

  it('navigates through red flag selection to Stop result screen', () => {
    render(
      <BrowserRouter>
        <Guide />
      </BrowserRouter>
    );

    // Click on soft brake red flag
    const softBrakeItem = screen.getByText(/Brake pedal feels soft, spongy, or sinks to floor/i);
    fireEvent.click(softBrakeItem);

    // Click "View Stop Instructions"
    const nextBtn = screen.getByRole('button', { name: /View Stop Instructions/i });
    fireEvent.click(nextBtn);

    // Must show STOP NOW banner
    expect(screen.getByText(/STOP NOW · UNSAFE TO DRIVE/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Call Roadside Recovery/i })).toBeInTheDocument();
  });
});
