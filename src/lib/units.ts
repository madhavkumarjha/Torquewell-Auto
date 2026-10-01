import { UnitSystem } from '@/types';

export function kmToMiles(km: number): number {
  return km * 0.621371;
}

export function milesToKm(miles: number): number {
  return miles / 0.621371;
}

export function mmToInches(mm: number): number {
  return mm * 0.0393701;
}

export function inchesToMm(inches: number): number {
  return inches / 0.0393701;
}

export function barToPsi(bar: number): number {
  return bar * 14.5038;
}

export function psiToBar(psi: number): number {
  return psi / 14.5038;
}

export function litresToGallons(litres: number): number {
  return litres * 0.219969; // Imperial gallons
}

export function gallonsToLitres(gallons: number): number {
  return gallons / 0.219969;
}

export function celsiusToFahrenheit(c: number): number {
  return (c * 9) / 5 + 32;
}

export function fahrenheitToCelsius(f: number): number {
  return ((f - 32) * 5) / 9;
}

export function formatDistance(km: number, units: UnitSystem): string {
  if (units === 'imperial') {
    const mi = Math.round(kmToMiles(km));
    return `${mi.toLocaleString()} mi`;
  }
  return `${Math.round(km).toLocaleString()} km`;
}

export function formatLength(mm: number, units: UnitSystem): string {
  if (units === 'imperial') {
    const inches = mmToInches(mm);
    return `${inches.toFixed(2)} in`;
  }
  return `${mm.toFixed(1)} mm`;
}

export function formatPressure(bar: number, units: UnitSystem): string {
  if (units === 'imperial') {
    const psi = Math.round(barToPsi(bar));
    return `${psi} psi`;
  }
  return `${bar.toFixed(1)} bar`;
}

export function formatVolume(litres: number, units: UnitSystem): string {
  if (units === 'imperial') {
    const gal = litresToGallons(litres);
    return `${gal.toFixed(1)} gal`;
  }
  return `${litres.toFixed(1)} L`;
}

export function formatTemp(celsius: number, units: UnitSystem): string {
  if (units === 'imperial') {
    const f = Math.round(celsiusToFahrenheit(celsius));
    return `${f}°F`;
  }
  return `${Math.round(celsius)}°C`;
}

export function formatMoney(amount: number, currency = '£'): string {
  return `${currency}${amount.toLocaleString('en-GB', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
}
