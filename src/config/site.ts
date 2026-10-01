import { SiteConfig } from '@/types';

export const siteConfig: SiteConfig = {
  brandName: 'Torquewell Auto',
  tagline: {
    en: 'Proof, not promises.',
    hi: 'सबूत, वादे नहीं।',
  },
  leadPersonId: 'tomas-hale',
  branches: [
    { id: 'branch-north', name: 'Branch North', region: 'North District' },
    { id: 'branch-central', name: 'Branch Central', region: 'Central Workshop' },
    { id: 'branch-south', name: 'Branch South', region: 'South Fleet Hub' },
  ],
  phone: '+44 800 876 5432',
  roadsidePhone: '+44 800 876 5433',
  locales: ['en', 'hi'],
  defaultUnits: 'metric',
  currency: '£',
  labourRate: 90,
  indexable: true,
};
