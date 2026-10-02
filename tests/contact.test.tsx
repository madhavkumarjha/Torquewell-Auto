import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Contact from '@/routes/Contact';

describe('Contact & Helpdesks (/contact)', () => {
  it('renders Contact page header and categorized contact cards', () => {
    render(
      <MemoryRouter initialEntries={['/contact']}>
        <Routes>
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1, name: /Contact Torquewell Auto/i })).toBeInTheDocument();
    expect(screen.getByText(/24\/7 Roadside Assistance/i)).toBeInTheDocument();
    expect(screen.getByText('0800 867 783 (Toll Free)')).toBeInTheDocument();
    expect(screen.getByText(/Workshop Bookings & Quotes/i)).toBeInTheDocument();
  });

  it('submits routed contact inquiry form and renders confirmation code', () => {
    render(
      <MemoryRouter initialEntries={['/contact']}>
        <Routes>
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Alex Morgan/i), { target: { value: 'Rachel Green' } });
    fireEvent.change(screen.getByPlaceholderText(/07700 900123/i), { target: { value: '07700 900456' } });
    fireEvent.change(screen.getByPlaceholderText(/alex@example.com/i), { target: { value: 'rachel@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Tell us about symptoms/i), { target: { value: 'Need annual full service quote for hybrid vehicle' } });

    const submitBtn = screen.getByRole('button', { name: /Send Inquiry Message/i });
    fireEvent.click(submitBtn);

    expect(screen.getByText(/Message Sent Successfully!/i)).toBeInTheDocument();
    expect(screen.getByText(/TW-MSG-/i)).toBeInTheDocument();
  });
});
