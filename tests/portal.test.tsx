import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Portal from '@/routes/Portal';

describe('Garage Customer Portal (Feature 06)', () => {
  it('renders client portal header with Sam Carter and vehicle details', () => {
    render(
      <BrowserRouter>
        <Portal />
      </BrowserRouter>
    );

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/TorqueSpec Urban 1\.4/i);
    expect(screen.getByText(/TW68 AKZ/i)).toBeInTheDocument();
    expect(screen.getByText(/SAM CARTER/i)).toBeInTheDocument();
    expect(screen.getByText(/Vehicle Health/i)).toBeInTheDocument();
  });

  it('navigates to Logbook and displays verified service history', () => {
    render(
      <BrowserRouter>
        <Portal />
      </BrowserRouter>
    );

    // Switch to Logbook tab
    const logbookBtn = screen.getByRole('button', { name: /Service Logbook/i });
    fireEvent.click(logbookBtn);

    expect(screen.getByRole('heading', { level: 2, name: /Verified Service History Logbook/i })).toBeInTheDocument();
    expect(screen.getByText(/Annual Precision Inspection & Proof Dossier/i)).toBeInTheDocument();
    expect(screen.getByText(/Tomas Hale/i)).toBeInTheDocument();
  });

  it('authorises a pending repair item in the Approvals tab', () => {
    render(
      <BrowserRouter>
        <Portal />
      </BrowserRouter>
    );

    // Switch to Approvals tab via banner button
    const approvalsBtn = screen.getByRole('button', { name: /Review Approvals/i });
    fireEvent.click(approvalsBtn);

    expect(screen.getByRole('heading', { level: 2, name: /Pending Repair Authorisations/i })).toBeInTheDocument();
    expect(screen.getByText(/Front Brake Friction Lining Replacement/i)).toBeInTheDocument();

    // Click Authorise on front pads (£145)
    const authBtn = screen.getByRole('button', { name: /Authorise \(£145\)/i });
    fireEvent.click(authBtn);

    // Should update status
    expect(screen.getByText(/Authorized & Dispatched to Bay 04/i)).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('triggers Risk Acknowledgement Modal when declining a safety-critical item', () => {
    render(
      <BrowserRouter>
        <Portal />
      </BrowserRouter>
    );

    // Switch to Approvals tab
    fireEvent.click(screen.getByRole('button', { name: /Review Approvals/i }));

    // Click Decline Work on safety critical front pads
    const declineBtns = screen.getAllByRole('button', { name: /Decline Work/i });
    fireEvent.click(declineBtns[0]);

    // Modal dialog should open with safety risk warning
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/Safety Risk Acknowledgement Required/i)).toBeInTheDocument();

    // Check mandatory risk acknowledgement checkbox
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    // Click Confirm & Decline
    const confirmBtn = screen.getByRole('button', { name: /Confirm & Decline/i });
    fireEvent.click(confirmBtn);

    // Dialog closes and item marked declined
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByText(/Declined by Client \(Safety Risk Acknowledged\)/i)).toBeInTheDocument();
  });

  it('opens itemised invoice PDF preview modal in Invoices tab', () => {
    render(
      <BrowserRouter>
        <Portal />
      </BrowserRouter>
    );

    // Switch to Invoices tab
    const invTabBtn = screen.getByRole('button', { name: /Invoices/i });
    fireEvent.click(invTabBtn);

    expect(screen.getByRole('heading', { level: 2, name: /Official Itemised VAT Invoices/i })).toBeInTheDocument();

    // Click first View PDF button
    const viewPdfBtns = screen.getAllByRole('button', { name: /View PDF/i });
    fireEvent.click(viewPdfBtns[0]);

    // Invoice dialog should appear
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/Official VAT Invoice/i)).toBeInTheDocument();

    // Close invoice modal
    const closeBtn = screen.getByRole('button', { name: /Close dialog/i });
    fireEvent.click(closeBtn);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders Business Fleet tab with vehicles table and uptime KPI', () => {
    render(
      <BrowserRouter>
        <Portal />
      </BrowserRouter>
    );

    // Switch to Fleet tab
    const fleetBtn = screen.getByRole('button', { name: /Business Fleet/i });
    fireEvent.click(fleetBtn);

    expect(screen.getByRole('heading', { level: 2, name: /Commercial Fleet Telemetry & Uptime/i })).toBeInTheDocument();
    expect(screen.getByText(/Active Fleet Uptime/i)).toBeInTheDocument();
    expect(screen.getAllByText(/TW72 FLT/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/TQ21 NXR/i).length).toBeGreaterThan(0);
  });
});
