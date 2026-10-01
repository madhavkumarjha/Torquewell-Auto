import { describe, it, expect } from 'vitest';
import {
  kmToMiles,
  milesToKm,
  mmToInches,
  inchesToMm,
  formatDistance,
  formatLength,
  formatPressure,
  formatMoney,
} from './units';

describe('units conversion and formatting', () => {
  it('round-trips km and miles accurately', () => {
    const originalKm = 100;
    const miles = kmToMiles(originalKm);
    const backToKm = milesToKm(miles);
    expect(backToKm).toBeCloseTo(originalKm, 4);
  });

  it('round-trips mm and inches accurately', () => {
    const originalMm = 2.5;
    const inches = mmToInches(originalMm);
    const backToMm = inchesToMm(inches);
    expect(backToMm).toBeCloseTo(originalMm, 4);
  });

  it('formats distance in metric and imperial', () => {
    expect(formatDistance(10000, 'metric')).toBe('10,000 km');
    expect(formatDistance(10000, 'imperial')).toBe('6,214 mi');
  });

  it('formats length with required precision (mm: 1 dp, in: 2 dp)', () => {
    expect(formatLength(2.5, 'metric')).toBe('2.5 mm');
    expect(formatLength(2.5, 'imperial')).toBe('0.10 in');
  });

  it('formats pressure correctly', () => {
    expect(formatPressure(2.2, 'metric')).toBe('2.2 bar');
    expect(formatPressure(2.2, 'imperial')).toBe('32 psi');
  });

  it('formats currency correctly', () => {
    expect(formatMoney(150, '£')).toBe('£150');
  });
});
