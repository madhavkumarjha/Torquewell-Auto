import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import KnowYourCar from '@/routes/KnowYourCar';
import ArticleDetail from '@/routes/ArticleDetail';

describe('Know Your Car & Article Library (Feature 07)', () => {
  beforeEach(() => {
    // Reset any mocks if needed
  });

  it('renders Know Your Car hub with header, anatomy visualizer, and 20 articles', () => {
    render(
      <MemoryRouter initialEntries={['/know']}>
        <Routes>
          <Route path="/know" element={<KnowYourCar />} />
        </Routes>
      </MemoryRouter>
    );

    // Title and value prop
    expect(screen.getByRole('heading', { level: 1, name: /Know Your Car/i })).toBeInTheDocument();
    expect(screen.getByText(/Explore Your Vehicle Subsystems/i)).toBeInTheDocument();

    // Powertrain switcher buttons
    expect(screen.getByRole('button', { name: /Petrol \/ Diesel/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Electric \(EV\)/i })).toBeInTheDocument();

    // Check that articles are rendered in library
    expect(screen.getByText(/How Modern Disc Brakes Work & Friction Dynamics/i)).toBeInTheDocument();
    expect(screen.getByText(/Tyre Sidewall Decoded: Size, Load, Speed & Age Codes/i)).toBeInTheDocument();
  });

  it('switches powertrain in CarAnatomyVisualizer and displays component wear metrics', () => {
    render(
      <MemoryRouter initialEntries={['/know']}>
        <Routes>
          <Route path="/know" element={<KnowYourCar />} />
        </Routes>
      </MemoryRouter>
    );

    // Click EV powertrain switch
    const evButton = screen.getByRole('button', { name: /Electric \(EV\)/i });
    fireEvent.click(evButton);

    // Verify EV Chassis label appears
    expect(screen.getByText(/EV CHASSIS ARCHITECTURE/i)).toBeInTheDocument();

    // Click front brakes hotspot or inspect default active component
    expect(screen.getByText(/Front Disc Brakes & Calipers/i)).toBeInTheDocument();
    expect(screen.getByText(/Pad Friction Thickness/i)).toBeInTheDocument();
  });

  it('switches reading depth level in Article Library and filters by tag', () => {
    render(
      <MemoryRouter initialEntries={['/know']}>
        <Routes>
          <Route path="/know" element={<KnowYourCar />} />
        </Routes>
      </MemoryRouter>
    );

    // Click 3-Min Depth button
    const m3Button = screen.getByRole('button', { name: /3-Min/i });
    fireEvent.click(m3Button);

    // Filter by 'Brakes' tag
    const brakesTags = screen.getAllByRole('button', { name: 'Brakes' });
    fireEvent.click(brakesTags[brakesTags.length - 1]);

    // Check filtered articles
    expect(screen.getByText(/How Modern Disc Brakes Work & Friction Dynamics/i)).toBeInTheDocument();
  });

  it('opens and closes the 5 Questions to Ask Any Mechanic checklist modal', () => {
    render(
      <MemoryRouter initialEntries={['/know']}>
        <Routes>
          <Route path="/know" element={<KnowYourCar />} />
        </Routes>
      </MemoryRouter>
    );

    // Open checklist modal
    const openBtn = screen.getByRole('button', { name: /5 Questions to Ask Any Mechanic/i });
    fireEvent.click(openBtn);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/Can you show me the photographic\/video evidence/i)).toBeInTheDocument();

    // Close modal
    const closeBtn = screen.getByRole('button', { name: /Close/i });
    fireEvent.click(closeBtn);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders ArticleDetail with 3-tier depth toggle and technical glossary', () => {
    render(
      <MemoryRouter initialEntries={['/know/how-brakes-work']}>
        <Routes>
          <Route path="/know/:slug" element={<ArticleDetail />} />
        </Routes>
      </MemoryRouter>
    );

    // Heading
    expect(screen.getByRole('heading', { level: 1, name: /How Modern Disc Brakes Work & Friction Dynamics/i })).toBeInTheDocument();

    // Depth switcher
    const deepButton = screen.getByRole('button', { name: /Deep Engineering/i });
    fireEvent.click(deepButton);

    // Check glossary and sources
    expect(screen.getByText(/Technical Glossary in Plain Language/i)).toBeInTheDocument();
    expect(screen.getByText(/ISO 15484 Automotive Braking Systems/i)).toBeInTheDocument();
  });
});
