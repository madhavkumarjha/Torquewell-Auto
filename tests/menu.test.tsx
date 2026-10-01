import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Menu from '@/routes/Menu';

describe('Service Menu & Packages Comparison', () => {
  it('renders all 3 service packages with honest included and not-included sections', () => {
    render(
      <BrowserRouter>
        <Menu />
      </BrowserRouter>
    );

    // Title
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Service Menu & Package Comparison/i);

    // 3 Packages
    expect(screen.getAllByText(/Essential Interim Service/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Comprehensive Full Service/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Signature Major Calibration/i).length).toBeGreaterThanOrEqual(1);

    // Honest "What is NOT Included" scope labels
    const notIncludedHeadings = screen.getAllByText(/What is NOT Included \(Honest Scope\):/i);
    expect(notIncludedHeadings.length).toBe(3);
  });

  it('renders and toggles the side-by-side comparison matrix table', () => {
    render(
      <BrowserRouter>
        <Menu />
      </BrowserRouter>
    );

    expect(screen.getByText(/Checklist Side-by-Side Comparison Matrix/i)).toBeInTheDocument();
    expect(screen.getByText(/Synthetic Engine Oil & OEM Filter Replacement/i)).toBeInTheDocument();

    // Toggle collapse
    const toggleBtn = screen.getByRole('button', { name: /Collapse Matrix/i });
    fireEvent.click(toggleBtn);

    expect(screen.queryByText(/Synthetic Engine Oil & OEM Filter Replacement/i)).not.toBeInTheDocument();
  });
});
