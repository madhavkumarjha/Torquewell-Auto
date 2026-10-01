import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Journey from '@/routes/Journey';

describe('The Bay Board & Repair Journey (Feature 03)', () => {
  it('renders 4 active workshop bay cards and 9-stage journey', () => {
    render(
      <BrowserRouter>
        <Journey />
      </BrowserRouter>
    );

    // Page Title
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/The Bay Board & Repair Journey/i);

    // Active bays tokens
    expect(screen.getByText('JOB-TW68')).toBeInTheDocument();
    expect(screen.getByText('JOB-TQ21')).toBeInTheDocument();
    expect(screen.getByText('JOB-TW24')).toBeInTheDocument();
    expect(screen.getByText('JOB-TW72')).toBeInTheDocument();

    // 9-Stage explainer section
    expect(screen.getByRole('heading', { level: 2, name: /The 9-Stage Standard Repair Journey/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Intake & Digital Check-In/i).length).toBeGreaterThan(0);
  });

  it('allows selecting different bay jobs and simulates bay stage progression', () => {
    render(
      <BrowserRouter>
        <Journey />
      </BrowserRouter>
    );

    // Initially selected job is TW68 AKZ which is waiting on customer (Stage 5)
    expect(screen.getAllByText(/TW68 AKZ/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Waiting on Customer/i).length).toBeGreaterThan(0);

    // Simulate progress: resolves customer approval
    const simulateBtn = screen.getByRole('button', { name: /Simulate Bay Progress/i });
    fireEvent.click(simulateBtn);

    // Toast notification should display progress
    expect(screen.getByRole('status')).toBeInTheDocument();

    // Switch to another bay job: TQ21
    fireEvent.click(screen.getByText('JOB-TQ21'));
    expect(screen.getAllByText(/TQ21 NXR/i).length).toBeGreaterThan(0);
  });

  it('toggles TV / Kiosk display mode and expands journey stage drawers', () => {
    render(
      <BrowserRouter>
        <Journey />
      </BrowserRouter>
    );

    // Toggle TV mode
    const tvBtn = screen.getByRole('button', { name: /TV \/ Kiosk Display/i });
    fireEvent.click(tvBtn);
    expect(screen.getByRole('button', { name: /Exit TV Mode/i })).toBeInTheDocument();

    // Toggle back
    fireEvent.click(screen.getByRole('button', { name: /Exit TV Mode/i }));
    expect(screen.getByRole('button', { name: /TV \/ Kiosk Display/i })).toBeInTheDocument();

    // Expand Stage 1 drawer
    const stage1Btn = screen.getByRole('button', { name: /01.*Intake & Digital Check-In/i });
    fireEvent.click(stage1Btn);
    expect(screen.getAllByText(/Service Concierge & Lead Advisor/i).length).toBeGreaterThan(0);
  });
});
