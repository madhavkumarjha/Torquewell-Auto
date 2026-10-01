import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MileageMap from '@/routes/MileageMap';

describe('The Mileage Map (Feature 08)', () => {
  it('renders heading, visual road timeline, and science of what can safely wait', () => {
    render(
      <BrowserRouter>
        <MileageMap />
      </BrowserRouter>
    );

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/The Mileage Map/i);
    expect(screen.getByRole('heading', { level: 2, name: /Visual Road-Path Timeline/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /The Science of "What Can Safely Wait"/i })).toBeInTheDocument();

    // Educational cards
    expect(screen.getByRole('heading', { level: 3, name: /Time-Based/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /Distance-Based/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /Condition-Based/i })).toBeInTheDocument();
  });

  it('switches powertrain to EV and updates available milestone checkpoints', () => {
    render(
      <BrowserRouter>
        <MileageMap />
      </BrowserRouter>
    );

    // Click Full EV
    const evBtn = screen.getByRole('button', { name: /Full EV/i });
    fireEvent.click(evBtn);

    // EV specific items should be present on roadmap
    expect(screen.getByText(/EV High-Voltage Port & Interlock Scan/i)).toBeInTheDocument();
  });

  it('adjusts odometer presets and displays milestone deep dive', () => {
    render(
      <BrowserRouter>
        <MileageMap />
      </BrowserRouter>
    );

    // Click 15,000 km preset
    const presetBtn = screen.getByRole('button', { name: /15,000 km \(New\)/i });
    fireEvent.click(presetBtn);

    // Selected milestone panel should have Why It Matters and What Can Safely Wait
    expect(screen.getByText(/Why It Matters/i)).toBeInTheDocument();
    expect(screen.getByText(/What Can Safely Wait\?/i)).toBeInTheDocument();
    expect(screen.getByText(/Ask Us To Show You The Evidence/i)).toBeInTheDocument();

    // Add to calendar button should exist
    expect(screen.getByRole('button', { name: /Add to Calendar/i })).toBeInTheDocument();
  });

  it('opens and closes the Roadmap PDF export preview dialog', () => {
    render(
      <BrowserRouter>
        <MileageMap />
      </BrowserRouter>
    );

    const pdfBtn = screen.getByRole('button', { name: /Download Roadmap PDF/i });
    fireEvent.click(pdfBtn);

    // Modal should be opened
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/Service Roadmap Dossier/i)).toBeInTheDocument();

    // Close button
    const closeBtn = screen.getByRole('button', { name: /Close dialog/i });
    fireEvent.click(closeBtn);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
