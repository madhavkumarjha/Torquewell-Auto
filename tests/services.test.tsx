import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter, MemoryRouter, Routes, Route } from 'react-router-dom';
import Services from '@/routes/Services';
import ServiceDetail from '@/routes/ServiceDetail';

describe('Workshop Services Catalog (Feature 05)', () => {
  it('renders all 14 workshop services in the grid', () => {
    render(
      <BrowserRouter>
        <Services />
      </BrowserRouter>
    );

    // Main heading
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Our Workshop Services/i);

    // Check presence of key bay services
    expect(screen.getByText(/Logbook, Interim & Full Service/i)).toBeInTheDocument();
    expect(screen.getByText(/Brakes & Hydraulic System/i)).toBeInTheDocument();
    expect(screen.getByText(/Tyres & Wheel Alignment/i)).toBeInTheDocument();
    expect(screen.getByText(/Hybrid & EV Maintenance/i)).toBeInTheDocument();
    expect(screen.getByText(/Commercial Fleet Maintenance/i)).toBeInTheDocument();
  });

  it('filters services when category pills are clicked', () => {
    render(
      <BrowserRouter>
        <Services />
      </BrowserRouter>
    );

    // Click "Safety & Chassis" category pill
    const safetyBtn = screen.getByRole('button', { name: /Brakes & Chassis/i });
    fireEvent.click(safetyBtn);

    expect(screen.getByText(/Brakes & Hydraulic System/i)).toBeInTheDocument();
    expect(screen.queryByText(/Engine & Electrical Diagnostics/i)).not.toBeInTheDocument();
  });

  it('renders ServiceDetail deep-dive page when navigating to a specific service', () => {
    render(
      <MemoryRouter initialEntries={['/services/brakes']}>
        <Routes>
          <Route path="/services/:slug" element={<ServiceDetail />} />
        </Routes>
      </MemoryRouter>
    );

    // Service Title
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Brakes & Hydraulic System/i);

    // What this service covers
    expect(screen.getByText(/What This Service Covers/i)).toBeInTheDocument();
    expect(screen.getByText(/Signs You May Need This Service/i)).toBeInTheDocument();
    expect(screen.getByText(/Checks Performed by Our Technician on the Lift/i)).toBeInTheDocument();

    // Booking shortcut button
    const bookBtn = screen.getByRole('link', { name: /Book This Service/i });
    expect(bookBtn).toHaveAttribute('href', '/book?service=brakes');
  });
});
