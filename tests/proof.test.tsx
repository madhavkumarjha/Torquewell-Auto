import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Proof from '@/routes/Proof';

describe('Digital Proof Report (Feature 03)', () => {
  it('renders default sample report with vehicle metadata and donut summary', () => {
    render(
      <BrowserRouter>
        <Proof />
      </BrowserRouter>
    );

    // Main heading
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Digital Proof Report/i);

    // Vehicle details badge
    expect(screen.getAllByText(/TW68 AKZ/i).length).toBeGreaterThanOrEqual(1);

    // Donut summary checks total
    expect(screen.getByText(/Checks Total/i)).toBeInTheDocument();

    // Urgency buttons
    expect(screen.getAllByText(/Needed Now/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Soon \(30 Days\)/i).length).toBeGreaterThanOrEqual(1);
  });

  it('filters finding cards when clicking an urgency category in DonutSummary', () => {
    render(
      <BrowserRouter>
        <Proof />
      </BrowserRouter>
    );

    // Initially multiple cards appear
    expect(screen.getByText(/Front brake friction pads worn past limit/i)).toBeInTheDocument();

    // Click "Needed Now" filter button
    const nowBtn = screen.getByRole('button', { name: /Needed Now/i });
    fireEvent.click(nowBtn);

    // Only "now" finding should be shown
    expect(screen.getByText(/Front brake friction pads worn past limit/i)).toBeInTheDocument();
    // Soon finding should not be displayed
    expect(screen.queryByText(/Brake fluid hygroscopic moisture content elevated/i)).not.toBeInTheDocument();

    // Reset filter
    const resetBtn = screen.getByRole('button', { name: /Show all checkpoints/i });
    fireEvent.click(resetBtn);
    expect(screen.getByText(/Brake fluid hygroscopic moisture content elevated/i)).toBeInTheDocument();
  });

  it('toggles Explain Simply plain-language text on a finding card', () => {
    render(
      <BrowserRouter>
        <Proof />
      </BrowserRouter>
    );

    const explainBtns = screen.getAllByRole('button', { name: /Explain Simply/i });
    expect(explainBtns.length).toBeGreaterThan(0);

    // Click first Explain Simply button
    fireEvent.click(explainBtns[0]);

    // Plain English explanation should now be visible
    expect(
      screen.getByText(/The brake pad friction layer is nearly completely gone/i)
    ).toBeInTheDocument();

    // Toggle button label switches to Show Technical Spec
    expect(screen.getByRole('button', { name: /Show Technical Spec/i })).toBeInTheDocument();
  });

  it('opens and closes the Photo Comparison modal', () => {
    render(
      <BrowserRouter>
        <Proof />
      </BrowserRouter>
    );

    const showPartBtns = screen.getAllByRole('button', { name: /Show me the part/i });
    expect(showPartBtns.length).toBeGreaterThan(0);

    // Click "Show me the part"
    fireEvent.click(showPartBtns[0]);

    // Modal dialog should open
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/Your Component vs Factory New Benchmark/i)).toBeInTheDocument();

    // Close modal
    const closeBtn = screen.getByRole('button', { name: /Close View/i });
    fireEvent.click(closeBtn);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens the printable Proof Report PDF preview modal', () => {
    render(
      <BrowserRouter>
        <Proof />
      </BrowserRouter>
    );

    const pdfBtn = screen.getByRole('button', { name: /View \/ Print Proof PDF/i });
    fireEvent.click(pdfBtn);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/Detailed Checkpoints & Micrometer Measurements/i)).toBeInTheDocument();
  });
});
