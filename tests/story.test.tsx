import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { DriveInStory } from '@/components/story/DriveInStory';
import { STORY_CHAPTERS } from '@/data/drive-story';

describe('Drive-In to Drive-Out Story (Feature 01)', () => {
  it('renders all 9 story stages and initial arrival chapter', () => {
    render(
      <BrowserRouter>
        <DriveInStory />
      </BrowserRouter>
    );

    // Section title
    expect(screen.getByRole('heading', { level: 2, name: /Drive-In to Drive-Out/i })).toBeInTheDocument();

    // Stage 1 initial title
    expect(screen.getByText(/Arrival & Digital Check-In/i)).toBeInTheDocument();
    expect(screen.getByText(/Service Advisor/i)).toBeInTheDocument();

    // Stage 1 evidence
    expect(screen.getByText(/CHECKIN-LOG-01/i)).toBeInTheDocument();

    // Skip to Proof link
    expect(screen.getByRole('link', { name: /Skip to Proof Report/i })).toBeInTheDocument();
  });

  it('navigates through chapters when clicking Next Stage', () => {
    render(
      <BrowserRouter>
        <DriveInStory />
      </BrowserRouter>
    );

    // Click Next Stage
    const nextBtn = screen.getByRole('button', { name: /Next Stage/i });
    fireEvent.click(nextBtn);

    // Stage 2 must now be visible
    expect(screen.getByText(/360° Walk-Around & Body Scan/i)).toBeInTheDocument();
    expect(screen.getByText(/Vehicle Inspector/i)).toBeInTheDocument();
  });

  it('contains all 9 valid chapter specs with checks and evidence in dataset', () => {
    expect(STORY_CHAPTERS.length).toBe(9);
    STORY_CHAPTERS.forEach((ch) => {
      expect(ch.n).toBeGreaterThan(0);
      expect(ch.title.en).toBeTruthy();
      expect(ch.title.hi).toBeTruthy();
      expect(ch.checks.length).toBeGreaterThan(0);
      expect(ch.evidence.length).toBeGreaterThan(0);
    });
  });
});
