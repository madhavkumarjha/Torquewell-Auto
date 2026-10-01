import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Help from '@/routes/Help';

describe('Help Now Page (/help)', () => {
  it('renders emergency hotline and critical safety checklists', () => {
    render(
      <BrowserRouter>
        <Help />
      </BrowserRouter>
    );

    // Headline
    expect(screen.getByRole('heading', { level: 1, name: /Stuck or feeling unsafe\?/i })).toBeInTheDocument();

    // Call block with emergency telephone
    expect(screen.getByRole('link', { name: /Call emergency line/i })).toBeInTheDocument();

    // Key checklists
    expect(screen.getByText(/1\. Stop Safely Checklist/i)).toBeInTheDocument();
    expect(screen.getByText(/2\. Do NOT Attempt at Roadside/i)).toBeInTheDocument();
    expect(screen.getByText(/3\. What to Tell the Operator/i)).toBeInTheDocument();
    expect(screen.getByText(/EV & Hybrid Specific Safety/i)).toBeInTheDocument();
  });
});
