export type Locale = 'en' | 'hi';
export type UnitSystem = 'metric' | 'imperial';
export type I18n = { en: string; hi: string };
export type Urgency = 'now' | 'soon' | 'watch' | 'ok';
export type Powertrain = 'petrol' | 'diesel' | 'hybrid' | 'ev';

export interface SiteConfig {
  brandName: string;
  tagline: I18n;
  leadPersonId: string;
  branches: { id: string; name: string; region: string }[];
  phone: string;
  roadsidePhone: string;
  locales: Locale[];
  defaultUnits: UnitSystem;
  currency: string;
  labourRate: number;
  indexable: boolean;
}

export interface Service {
  slug: string;
  name: I18n;
  summary: I18n;
  icon: string;
  image: string;
  covers: I18n[];
  signs: I18n[];
  checks: I18n[];
  timeRangeMin: [number, number];
  priceBand: [number, number];
  partsOptions: string[];
  askUs: I18n[];
  related: string[];
}

export interface Package {
  id: string;
  name: I18n;
  included: I18n[];
  notIncluded: I18n[];
  timeRangeMin: [number, number];
  priceBand: [number, number];
  assumptions: I18n[];
  appliesTo: Powertrain[];
}

export interface GuideState {
  redFlags: string[];
  powertrain: Powertrain;
  ageBand: string;
  mileageKm: number;
  symptoms: string[];
  lights: string[];
  triggers: string[];
  duration: '<1d' | '1-7d' | '>1w';
  recent: string[];
  locale: Locale;
}

export interface GuideRule {
  id: string;
  when: (s: GuideState) => boolean;
  level: GuideResult['level'];
  priority: number;
  areas: string[];
}

export interface GuideResult {
  level: 'stop' | 'careful' | 'week' | 'routine' | 'info';
  areas: I18n[];
  note: I18n[];
  ask: I18n[];
  bring: string[];
  disclaimerId: string;
}

export interface JourneyStage {
  id: string;
  title: I18n;
  ownerRole: string;
  youReceive: I18n[];
  youDecide?: I18n;
  durationRange: { minMin: number; maxMin: number };
}

export interface RepairJob {
  id: string;
  stage: string;
  updatedAt: string;
  note?: I18n;
  waitingOnCustomer?: boolean;
}

export interface Finding {
  id: string;
  system: string;
  title: I18n;
  urgency: Urgency;
  measured?: { value: number; min: number; unit: 'mm' | 'bar' | 'V' | '%' };
  photos: string[];
  why: I18n;
  ifWait: I18n;
  options: I18n[];
}

export interface PriceLine {
  findingId: string;
  labourHours: [number, number];
  parts: Record<'oe' | 'oeq' | 'aftermarket' | 'reman', [number, number]>;
  consumables: [number, number];
  disposal: [number, number];
  warrantyMonths: Record<string, number>;
  currency: string;
}

export interface Milestone {
  id: string;
  title: I18n;
  basis: 'distance' | 'time' | 'condition';
  everyKm?: number;
  everyMonths?: number;
  appliesTo: Powertrain[];
  costBand: [number, number];
  canWait: I18n;
  why: I18n;
}

export interface Bay {
  id: string;
  name: I18n;
  polygon: number[][];
  equipment: I18n[];
  leadIds: string[];
  headcount: number;
}

export interface Person {
  id: string;
  name: string;
  role: I18n;
  kind: 'founder' | 'manager' | 'master' | 'tech' | 'ev-tech' | 'apprentice' | 'advisor' | 'parts';
  branch: string;
  bay?: string;
  reportsTo?: string;
  languages: string[];
  trainingPlaceholders: string[];
  bio: I18n;
  portrait: string;
}

export interface Branch {
  id: string;
  name: string;
  hours: string;
  services: string[];
  evCharging: boolean;
  accessibility: I18n[];
}

export interface Article {
  slug: string;
  tags: string[];
  title: I18n;
  layers: { s30: I18n; m3: I18n; deep: I18n };
  diagram?: string;
  glossary: string[];
  askMechanic: I18n[];
  sources: string[];
  reviewedOn: string;
}

export interface LogEntry {
  id: string;
  date: string;
  mileageKm: number;
  title: I18n;
  findings: string[];
  invoiceId?: string;
  evidence: string[];
}

export interface FleetVehicle {
  id: string;
  label: string;
  nextDue: string;
  status: 'ok' | 'due' | 'in-shop';
  downtimeDays: number;
}

export interface AssetEntry {
  id: string;
  path: string;
  prompt?: string;
  size: string;
  status: 'generated' | 'fallback' | 'pending';
  alt: I18n;
}
