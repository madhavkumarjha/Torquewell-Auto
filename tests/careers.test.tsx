import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Careers from '@/routes/Careers';

describe('Careers & Apprenticeships (Feature 05 & Academy)', () => {
  it('renders culture pillars, 4-year apprentice roadmap, and open positions', () => {
    render(
      <BrowserRouter>
        <Careers />
      </BrowserRouter>
    );

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Careers & Apprenticeships/i);

    // Culture pillars
    expect(screen.getByText(/Zero Upsell Commission Culture/i)).toBeInTheDocument();
    expect(screen.getByText(/Full Calibrated Tooling Suite/i)).toBeInTheDocument();

    // 4-Year Apprentice Roadmap
    expect(screen.getByRole('heading', { level: 2, name: /4-Year Apprentice Progression Pathway/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Year 1/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Year 2/i })).toBeInTheDocument();

    // Open positions
    expect(screen.getByRole('heading', { level: 2, name: /Current Open Positions/i })).toBeInTheDocument();
    expect(screen.getByText(/Lead Diagnostic Master Technician/i)).toBeInTheDocument();
  });

  it('steps through apprentice years and displays issued calibrated tools', () => {
    render(
      <BrowserRouter>
        <Careers />
      </BrowserRouter>
    );

    // Click Year 2
    fireEvent.click(screen.getByRole('button', { name: /Year 2/i }));
    expect(screen.getByText(/Starrett Magnetic Dial Indicator/i)).toBeInTheDocument();

    // Click Year 4
    fireEvent.click(screen.getByRole('button', { name: /Year 4/i }));
    expect(screen.getByText(/Fluke 1000V CAT-IV Insulated Tool Suite/i)).toBeInTheDocument();
  });

  it('opens vacancy application modal and submits form with confirmation', () => {
    render(
      <BrowserRouter>
        <Careers />
      </BrowserRouter>
    );

    // Click Apply on first role
    const applyBtns = screen.getAllByRole('button', { name: /Apply Online/i });
    fireEvent.click(applyBtns[0]);

    // Modal opens
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    // Fill form
    fireEvent.change(screen.getByPlaceholderText(/e\.g\. Liam Walker/i), {
      target: { value: 'Alex Morgan' }
    });
    fireEvent.change(screen.getByPlaceholderText(/you@domain\.com/i), {
      target: { value: 'alex@example.com' }
    });

    // Submit
    fireEvent.click(screen.getByRole('button', { name: /Submit Application/i }));

    // Confirmation
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText(/Application Received/i)).toBeInTheDocument();
  });
});
