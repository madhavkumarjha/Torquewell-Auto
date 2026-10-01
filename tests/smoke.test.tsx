import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '@/App';

describe('Application Smoke Test', () => {
  it('renders root layout and routes without crashing', async () => {
    render(<App />);
    const brandElements = await screen.findAllByText(/Torquewell/i);
    expect(brandElements.length).toBeGreaterThanOrEqual(1);

    // Help now and Book pills must be reachable in 1 click
    expect(screen.getByRole('link', { name: /Help now/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Book/i })).toBeInTheDocument();

    // Default home view heading
    expect(screen.getByRole('heading', { level: 1, name: /Home/i })).toBeInTheDocument();
  });
});
