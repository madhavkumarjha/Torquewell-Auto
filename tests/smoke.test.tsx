import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '@/App';

describe('Application Smoke Test', () => {
  it('renders root layout and routes without crashing', async () => {
    render(<App />);
    const brandElements = await screen.findAllByText(/Torquewell Auto/i);
    expect(brandElements.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/Stuck\? Help now/i)).toBeInTheDocument();
    expect(screen.getByText(/Book/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: /Home/i })).toBeInTheDocument();
  });
});
