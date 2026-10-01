import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Crew from '@/routes/Crew';

describe('The Bay Crew & Technical Hierarchy (Feature 05)', () => {
  it('renders heading, bay blueprint floor map, and crew members', () => {
    render(
      <BrowserRouter>
        <Crew />
      </BrowserRouter>
    );

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/The Bay Crew/i);
    expect(screen.getByRole('img', { name: /Workshop Floor Plan Blueprint/i })).toBeInTheDocument();
    expect(screen.getByText(/ZONE SPOTLIGHT/i)).toBeInTheDocument();
  });

  it('switches to Org Hierarchy Tree view and displays role="tree" structure', () => {
    render(
      <BrowserRouter>
        <Crew />
      </BrowserRouter>
    );

    // Switch to tree mode
    const treeBtn = screen.getByRole('button', { name: /Org Hierarchy/i });
    fireEvent.click(treeBtn);

    expect(screen.getByRole('tree', { name: /Torquewell Technical Hierarchy/i })).toBeInTheDocument();
    expect(screen.getByText('David Torres')).toBeInTheDocument();
    expect(screen.getByText(/Founder & Technical Director/i)).toBeInTheDocument();
  });

  it('switches to Team Roster and filters by search query', () => {
    render(
      <BrowserRouter>
        <Crew />
      </BrowserRouter>
    );

    // Switch to grid mode
    const gridBtn = screen.getByRole('button', { name: /Team Roster/i });
    fireEvent.click(gridBtn);

    // Search input
    const searchInput = screen.getByPlaceholderText(/Search team by name/i);
    fireEvent.change(searchInput, { target: { value: 'Elena' } });

    expect(screen.getByText('Elena Rostova')).toBeInTheDocument();
    expect(screen.queryByText('Marcus Vance')).not.toBeInTheDocument();
  });

  it('opens and closes crew member detail modal', () => {
    render(
      <BrowserRouter>
        <Crew />
      </BrowserRouter>
    );

    // Switch to grid mode
    fireEvent.click(screen.getByRole('button', { name: /Team Roster/i }));

    // Click on David Torres card
    fireEvent.click(screen.getByText('David Torres'));

    // Modal dialog should be displayed
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/Background & Workshop Focus/i)).toBeInTheDocument();

    // Close dialog
    fireEvent.click(screen.getByRole('button', { name: /Close dialog/i }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
