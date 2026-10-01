import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Book from '@/routes/Book';

describe('Workshop Booking Stepper Wizard (Feature 06)', () => {
  it('navigates through 4 steps and displays verified confirmation pass with reference', () => {
    render(
      <BrowserRouter>
        <Book />
      </BrowserRouter>
    );

    // Initial heading & Step 1
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Book a Workshop Visit/i);
    expect(screen.getByText(/Step 1: Vehicle & Registration Details/i)).toBeInTheDocument();

    // Advance to Step 2
    fireEvent.click(screen.getByRole('button', { name: /Continue to Service Need/i }));
    expect(screen.getByText(/Step 2: Choose Service Bay or Package/i)).toBeInTheDocument();

    // Advance to Step 3
    fireEvent.click(screen.getByRole('button', { name: /Continue to Bay Slot/i }));
    expect(screen.getByText(/Step 3: Branch, Date & Attendance Mode/i)).toBeInTheDocument();

    // Advance to Step 4
    fireEvent.click(screen.getByRole('button', { name: /Continue to Contact/i }));
    expect(screen.getByText(/Step 4: Contact & Written Authorisation Notice/i)).toBeInTheDocument();

    // Submit booking on Step 4
    fireEvent.click(screen.getByRole('button', { name: /Confirm Workshop Reservation/i }));

    // Step 5: Confirmation Pass
    expect(screen.getByText(/Booking Confirmed/i)).toBeInTheDocument();
    expect(screen.getByText(/Your Service Bay is Reserved/i)).toBeInTheDocument();
    expect(screen.getByText(/What to Bring on the Day Checklist:/i)).toBeInTheDocument();

    // Calendar download button
    const calendarBtn = screen.getByRole('button', { name: /Add to Calendar/i });
    expect(calendarBtn).toBeInTheDocument();
  });
});
