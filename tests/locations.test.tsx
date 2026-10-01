import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Locations from '@/routes/Locations';

describe('Workshop Locations (Feature 05 & Site Architecture)', () => {
  it('renders heading, regional SVG map, and 3 active workshop branches', () => {
    render(
      <BrowserRouter>
        <Locations />
      </BrowserRouter>
    );

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Workshop Locations/i);
    expect(screen.getByRole('img', { name: /Regional Map of Torquewell Locations/i })).toBeInTheDocument();

    // Check 3 branch titles in page
    expect(screen.getAllByText(/Torquewell Central/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Torquewell North/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Torquewell South/i).length).toBeGreaterThan(0);
  });

  it('allows selecting a branch and displays its accessibility and EV charging specs', () => {
    render(
      <BrowserRouter>
        <Locations />
      </BrowserRouter>
    );

    // Select South EV branch
    const southBtns = screen.getAllByText(/Torquewell South/i);
    fireEvent.click(southBtns[0]);

    expect(screen.getAllByText(/5-Bay EV Sanctuary/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/150kW Ultra-Rapid DC Chargers/i)).toBeInTheDocument();
    expect(screen.getByText(/Accessibility & Facilities/i)).toBeInTheDocument();
  });
});
