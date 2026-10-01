import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '@/App';

describe('Application Smoke Test', () => {
  it('renders root layout and routes without crashing', async () => {
    render(<App />);
    const brandElements = await screen.findAllByText(/Torquewell/i);
    expect(brandElements.length).toBeGreaterThanOrEqual(1);

    // Help now and Book pills must be reachable in 1 click
    const helpLinks = screen.getAllByRole('link', { name: /Help now/i });
    expect(helpLinks.length).toBeGreaterThanOrEqual(1);

    const bookLinks = screen.getAllByRole('link', { name: /Book/i });
    expect(bookLinks.length).toBeGreaterThanOrEqual(1);

    // Default home view heading
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/The garage that shows the evidence/i);
  });
});
