import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Fleet from '@/routes/Fleet';

describe('Fleet & Commercial Services (/fleet)', () => {
  it('renders Fleet page header with SLAs and value architecture', () => {
    render(
      <MemoryRouter initialEntries={['/fleet']}>
        <Routes>
          <Route path="/fleet" element={<Fleet />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1, name: /Fleet & Commercial Van Maintenance/i })).toBeInTheDocument();
    expect(screen.getByText('4-Hour')).toBeInTheDocument();
    expect(screen.getByText('07:30 AM')).toBeInTheDocument();
  });

  it('adjusts Fleet ROI and downtime calculator inputs and updates projected savings', () => {
    render(
      <MemoryRouter initialEntries={['/fleet']}>
        <Routes>
          <Route path="/fleet" element={<Fleet />} />
        </Routes>
      </MemoryRouter>
    );

    const fleetSlider = screen.getByLabelText(/Number of Fleet Commercial Vehicles/i);
    fireEvent.change(fleetSlider, { target: { value: '15' } });

    expect(screen.getByText('15 vans')).toBeInTheDocument();
    expect(screen.getByText(/Estimated Annual Financial Benefit/i)).toBeInTheDocument();
  });

  it('renders commercial fleet maintenance packages', () => {
    render(
      <MemoryRouter initialEntries={['/fleet']}>
        <Routes>
          <Route path="/fleet" element={<Fleet />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Quarterly Commercial Van Safety Inspection/i)).toBeInTheDocument();
    expect(screen.getByText(/Annual Fleet MOT & Major Logbook Service/i)).toBeInTheDocument();
    expect(screen.getByText(/e-LCV High-Voltage Commercial Maintenance/i)).toBeInTheDocument();
  });

  it('simulates driver daily defect reporting form submission', () => {
    render(
      <MemoryRouter initialEntries={['/fleet']}>
        <Routes>
          <Route path="/fleet" element={<Fleet />} />
        </Routes>
      </MemoryRouter>
    );

    const submitDefectBtn = screen.getByRole('button', { name: /Submit Defect to Workshop/i });
    fireEvent.click(submitDefectBtn);

    expect(screen.getByText(/✓ Logged to Bay Crew!/i)).toBeInTheDocument();
  });

  it('submits corporate fleet account application form and displays confirmation reference', () => {
    render(
      <MemoryRouter initialEntries={['/fleet']}>
        <Routes>
          <Route path="/fleet" element={<Fleet />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Apex Express Couriers/i), { target: { value: 'Metro Express Ltd' } });
    fireEvent.change(screen.getByPlaceholderText(/Sarah Jenkins/i), { target: { value: 'David Miller' } });
    fireEvent.change(screen.getByPlaceholderText(/s.jenkins@apexexpress.co.uk/i), { target: { value: 'd.miller@metroexpress.co.uk' } });
    fireEvent.change(screen.getByPlaceholderText(/020 7946 0888/i), { target: { value: '07700 900123' } });

    const submitProposalBtn = screen.getByRole('button', { name: /Request Corporate Fleet SLA Proposal/i });
    fireEvent.click(submitProposalBtn);

    expect(screen.getByText(/Corporate Inquiry Received!/i)).toBeInTheDocument();
    expect(screen.getByText(/TW-FLT-/i)).toBeInTheDocument();
  });
});
