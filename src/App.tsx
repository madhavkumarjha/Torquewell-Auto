import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RootLayout } from '@/layouts/RootLayout';

// Lazy-loaded route components
const Home = lazy(() => import('@/routes/Home'));
const About = lazy(() => import('@/routes/About'));
const Services = lazy(() => import('@/routes/Services'));
const ServiceDetail = lazy(() => import('@/routes/ServiceDetail'));
const Guide = lazy(() => import('@/routes/Guide'));
const Book = lazy(() => import('@/routes/Book'));
const Help = lazy(() => import('@/routes/Help'));
const Journey = lazy(() => import('@/routes/Journey'));
const Proof = lazy(() => import('@/routes/Proof'));
const Prices = lazy(() => import('@/routes/Prices'));
const Menu = lazy(() => import('@/routes/Menu'));
const MileageMap = lazy(() => import('@/routes/MileageMap'));
const EvHybrid = lazy(() => import('@/routes/EvHybrid'));
const Fleet = lazy(() => import('@/routes/Fleet'));
const Crew = lazy(() => import('@/routes/Crew'));
const Locations = lazy(() => import('@/routes/Locations'));
const KnowYourCar = lazy(() => import('@/routes/KnowYourCar'));
const ArticleDetail = lazy(() => import('@/routes/ArticleDetail'));
const Portal = lazy(() => import('@/routes/Portal'));
const Policies = lazy(() => import('@/routes/Policies'));
const Careers = lazy(() => import('@/routes/Careers'));
const Contact = lazy(() => import('@/routes/Contact'));
const Privacy = lazy(() => import('@/routes/Privacy'));
const Terms = lazy(() => import('@/routes/Terms'));
const Accessibility = lazy(() => import('@/routes/Accessibility'));
const Sitemap = lazy(() => import('@/routes/Sitemap'));
const NotFound = lazy(() => import('@/routes/NotFound'));

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--accent)] border-t-transparent" />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="services/:slug" element={<ServiceDetail />} />
            <Route path="guide" element={<Guide />} />
            <Route path="book" element={<Book />} />
            <Route path="help" element={<Help />} />
            <Route path="journey" element={<Journey />} />
            <Route path="proof" element={<Proof />} />
            <Route path="prices" element={<Prices />} />
            <Route path="menu" element={<Menu />} />
            <Route path="mileage-map" element={<MileageMap />} />
            <Route path="ev" element={<EvHybrid />} />
            <Route path="fleet" element={<Fleet />} />
            <Route path="crew" element={<Crew />} />
            <Route path="locations" element={<Locations />} />
            <Route path="know" element={<KnowYourCar />} />
            <Route path="know/:slug" element={<ArticleDetail />} />
            <Route path="portal" element={<Portal />} />
            <Route path="policies" element={<Policies />} />
            <Route path="careers" element={<Careers />} />
            <Route path="contact" element={<Contact />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="terms" element={<Terms />} />
            <Route path="accessibility" element={<Accessibility />} />
            <Route path="sitemap" element={<Sitemap />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
