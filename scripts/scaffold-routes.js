import fs from 'fs';
import path from 'path';

const routesDir = path.resolve('src', 'routes');
if (!fs.existsSync(routesDir)) {
  fs.mkdirSync(routesDir, { recursive: true });
}

const pages = [
  { file: 'Home.tsx', title: 'Home', route: '/' },
  { file: 'About.tsx', title: 'About Torquewell Auto', route: '/about' },
  { file: 'Services.tsx', title: 'Our Services', route: '/services' },
  { file: 'ServiceDetail.tsx', title: 'Service Details', route: '/services/:slug' },
  { file: 'Guide.tsx', title: 'Symptom & Warning-Light Guide', route: '/guide' },
  { file: 'Book.tsx', title: 'Book a Workshop Visit', route: '/book' },
  { file: 'Help.tsx', title: 'Stuck? Help now (Roadside)', route: '/help' },
  { file: 'Journey.tsx', title: 'The Bay Board & Repair Journey', route: '/journey' },
  { file: 'Proof.tsx', title: 'Proof Report Sample', route: '/proof' },
  { file: 'Prices.tsx', title: 'Fair-Price Breakdown', route: '/prices' },
  { file: 'Menu.tsx', title: 'Service Menu & Packages', route: '/menu' },
  { file: 'MileageMap.tsx', title: 'The Mileage Map', route: '/mileage-map' },
  { file: 'EvHybrid.tsx', title: 'EV & Hybrid Care', route: '/ev' },
  { file: 'Fleet.tsx', title: 'Fleet & Business Maintenance', route: '/fleet' },
  { file: 'Crew.tsx', title: 'The Bay Crew', route: '/crew' },
  { file: 'Locations.tsx', title: 'Workshop Locations', route: '/locations' },
  { file: 'KnowYourCar.tsx', title: 'Know Your Car', route: '/know' },
  { file: 'ArticleDetail.tsx', title: 'Article Detail', route: '/know/:slug' },
  { file: 'Portal.tsx', title: 'Garage Customer Portal', route: '/portal' },
  { file: 'Policies.tsx', title: 'Warranty, Parts & Policies', route: '/policies' },
  { file: 'Careers.tsx', title: 'Careers & Apprenticeships', route: '/careers' },
  { file: 'Contact.tsx', title: 'Contact Us', route: '/contact' },
  { file: 'Privacy.tsx', title: 'Privacy Policy', route: '/privacy' },
  { file: 'Terms.tsx', title: 'Terms of Service', route: '/terms' },
  { file: 'Accessibility.tsx', title: 'Accessibility Statement', route: '/accessibility' },
  { file: 'Sitemap.tsx', title: 'Sitemap', route: '/sitemap' },
  { file: 'NotFound.tsx', title: '404 — Wrong Turn', route: '*' },
];

for (const p of pages) {
  const componentName = p.file.replace('.tsx', '');
  const content = `export default function ${componentName}() {
  return (
    <div className="space-y-4 py-8">
      <h1 className="text-3xl font-bold tracking-tight">${p.title}</h1>
      <p className="font-mono text-sm opacity-70">Route: ${p.route}</p>
    </div>
  );
}
`;
  fs.writeFileSync(path.join(routesDir, p.file), content, 'utf8');
}

console.log(`Updated ${pages.length} placeholder routes.`);
