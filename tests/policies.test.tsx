import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Policies from '@/routes/Policies';

describe('Warranty, Parts & Workshop Policies (/policies)', () => {
  it('renders Policies page header and all 6 policy sections', () => {
    render(
      <MemoryRouter initialEntries={['/policies']}>
        <Routes>
          <Route path="/policies" element={<Policies />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1, name: /Warranty, Parts & Workshop Policies/i })).toBeInTheDocument();
    expect(screen.getByText(/1. Written Estimate & Prior Authorisation Policy/i)).toBeInTheDocument();
    expect(screen.getByText(/2. The 4 Parts Tiers & Warranty Terms/i)).toBeInTheDocument();
    expect(screen.getByText(/3. Returned Parts Inspection Policy/i)).toBeInTheDocument();
    expect(screen.getByText(/4. Motor Vehicle Block Exemption & New-Car Warranty/i)).toBeInTheDocument();
    expect(screen.getByText(/5. Environmental & Hazardous Waste Handling/i)).toBeInTheDocument();
    expect(screen.getByText(/6. Complaints Procedure & Alternative Dispute Resolution/i)).toBeInTheDocument();
  });

  it('triggers copy policy summary button', () => {
    render(
      <MemoryRouter initialEntries={['/policies']}>
        <Routes>
          <Route path="/policies" element={<Policies />} />
        </Routes>
      </MemoryRouter>
    );

    const copyBtn = screen.getByRole('button', { name: /Copy Summary/i });
    fireEvent.click(copyBtn);
    expect(screen.getByText(/✓ Copied/i)).toBeInTheDocument();
  });
});
