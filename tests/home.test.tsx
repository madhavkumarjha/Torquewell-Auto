import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '@/routes/Home';

describe('Home Page Hero & Quick Tiles', () => {
  it('renders primary value proposition and all 4 quick-action route tiles', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // H1 Heading
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/The garage that shows the evidence/i);

    // 4 Priority Route Tiles
    expect(screen.getByRole('heading', { level: 3, name: /Can I still drive it\?/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /Stuck\? Help now/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /See the proof/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /Book a check/i })).toBeInTheDocument();

    // Trust markers
    expect(screen.getByText(/Photo Evidence/i)).toBeInTheDocument();
    expect(screen.getByText(/Micrometer Gauges/i)).toBeInTheDocument();
  });
});
