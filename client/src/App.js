import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const Services = lazy(() => import('./pages/Services'));
const AircraftMaintenance = lazy(() => import('./pages/AircraftMaintenance'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const RequestQuote = lazy(() => import('./pages/RequestQuote'));

// Create placeholder components for remaining pages
const ProjectsCaseStudies = lazy(() => import('./pages/ProjectsCaseStudies'));
const CertificationsCompliance = lazy(() => import('./pages/CertificationsCompliance'));
const TeamLeadership = lazy(() => import('./pages/TeamLeadership'));
const BlogNews = lazy(() => import('./pages/BlogNews'));
const FAQs = lazy(() => import('./pages/FAQs'));
const Careers = lazy(() => import('./pages/Careers'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));

// Loading component
const LoadingPage = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-600 font-semibold">Loading...</p>
    </div>
  </div>
);

// Page transition wrapper
const PageTransition = ({ children }) => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// SEO Data for each page
const seoData = {
  '/': {
    title: 'Vertical Worx - Premier Helicopter Services | Hawaiian Islands Aviation',
    description: 'Professional helicopter services across the Hawaiian Islands. VIP transport, emergency medical, scenic tours, aircraft maintenance. When it\'s done right, it just WORX.',
    keywords: 'helicopter services Hawaii, VIP transport, emergency medical transport, scenic tours, aircraft maintenance, Kailua-Kona aviation',
    ogType: 'website'
  },
  '/about': {
    title: 'About Vertical Worx - Veteran-Operated Aviation Excellence | Hawaii',
    description: 'Learn about Vertical Worx - veteran-operated helicopter services with 15+ years of excellence in Hawaiian aviation. Safety first, precision always.',
    keywords: 'veteran operated helicopter services, Hawaii aviation company, helicopter safety, professional pilots',
    ogType: 'website'
  },
  '/services': {
    title: 'Helicopter Services - VIP Transport, Tours, Emergency | Vertical Worx',
    description: 'Comprehensive helicopter services: VIP transport, emergency medical, scenic tours, cargo operations, film production. Professional aviation solutions.',
    keywords: 'VIP helicopter transport, emergency medical helicopter, scenic helicopter tours, cargo helicopter services',
    ogType: 'website'
  },
  '/aircraft-maintenance': {
    title: 'Aircraft Maintenance Programs - Professional Helicopter Service | Vertical Worx',
    description: 'Professional aircraft maintenance programs. Scheduled maintenance, emergency repairs, condition monitoring. FAA certified repair station.',
    keywords: 'helicopter maintenance Hawaii, FAA repair station, aircraft inspections, emergency helicopter repair',
    ogType: 'website'
  },
  '/contact': {
    title: 'Contact Vertical Worx - 24/7 Emergency Helicopter Services | Hawaii',
    description: 'Contact Vertical Worx for all aviation needs. 24/7 emergency services available. Located in Kailua-Kona, serving all Hawaiian Islands.',
    keywords: '24/7 helicopter services, emergency helicopter Hawaii, helicopter contact Kailua-Kona',
    ogType: 'website'
  },
  '/request-quote': {
    title: 'Request Quote - Custom Helicopter Services | Vertical Worx Hawaii',
    description: 'Get a personalized quote for helicopter services. Fast response within 2 hours. Custom aviation solutions for your specific needs.',
    keywords: 'helicopter quote Hawaii, custom aviation services, helicopter pricing, aviation consultation',
    ogType: 'website'
  }
};

// Get current page SEO data
const getCurrentSEO = (pathname) => {
  return seoData[pathname] || seoData['/'];
};

// App component with routing
const AppContent = () => {
  const location = useLocation();
  const currentSEO = getCurrentSEO(location.pathname);
  const isAdminPage = location.pathname === '/admin-panel' || location.pathname === '/admin-login';

  return (
    <>
      {/* Dynamic SEO Head */}
      <Helmet>
        <title>{currentSEO.title}</title>
        <meta name="description" content={currentSEO.description} />
        <meta name="keywords" content={currentSEO.keywords} />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content={currentSEO.title} />
        <meta property="og:description" content={currentSEO.description} />
        <meta property="og:type" content={currentSEO.ogType} />
        <meta property="og:url" content={`https://wvx.aero${location.pathname}`} />
        <meta property="og:image" content="https://wvx.aero/images/og-helicopter.jpg" />
        <meta property="og:site_name" content="Vertical Worx" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={currentSEO.title} />
        <meta name="twitter:description" content={currentSEO.description} />
        <meta name="twitter:image" content="https://wvx.aero/images/twitter-helicopter.jpg" />
        
        {/* Additional Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Vertical Worx" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={`https://wvx.aero${location.pathname}`} />
        
        {/* Business Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Vertical Worx",
            "description": "Professional helicopter services across the Hawaiian Islands",
            "url": "https://wvx.aero",
            "telephone": "(808) 930-9826",
            "email": "info@wvx.aero",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "73 Uu Street",
              "addressLocality": "Kailua-Kona",
              "addressRegion": "HI",
              "postalCode": "96740",
              "addressCountry": "US"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "19.6400",
              "longitude": "-155.9969"
            },
            "openingHours": [
              "Mo-Fr 06:00-22:00",
              "Sa-Su 08:00-18:00"
            ],
            "serviceArea": {
              "@type": "Place",
              "name": "Hawaiian Islands"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Helicopter Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "VIP Helicopter Transport"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Emergency Medical Transport"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Scenic Helicopter Tours"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Aircraft Maintenance"
                  }
                }
              ]
            }
          })}
        </script>
        
        {/* Preload critical resources */}
        <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Helmet>

      <div>
        {!isAdminPage && <Navbar />}
        <PageTransition>
          <main className="overflow-hidden">
            <Suspense fallback={<LoadingPage />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/services" element={<Services />} />
                <Route path="/aircraft-maintenance" element={<AircraftMaintenance />} />
                <Route path="/projects-case-studies" element={<ProjectsCaseStudies />} />
                <Route path="/certifications-compliance" element={<CertificationsCompliance />} />
                <Route path="/request-quote" element={<RequestQuote />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/team-leadership" element={<TeamLeadership />} />
                <Route path="/blog-news" element={<BlogNews />} />
                <Route path="/faqs" element={<FAQs />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/admin-panel" element={
                  <ProtectedRoute>
                    <AdminPanel />
                  </ProtectedRoute>
                } />
                {/* Redirect old routes */}
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/maintenance" element={<AircraftMaintenance />} />
                <Route path="/quote" element={<RequestQuote />} />
                {/* 404 - Redirect to home for now */}
                <Route path="*" element={<Home />} />
              </Routes>
            </Suspense>
          </main>
        </PageTransition>
        {!isAdminPage && <Footer />}
        {/* Quick Action Buttons */}
        {!isAdminPage && (
          <>
            <div className="fixed bottom-6 right-6 z-50 space-y-3">
              {/* Emergency Contact */}
              <motion.a
                href="tel:(808)930-9826"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center justify-center w-14 h-14 bg-red-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
                title="Call Vertical Worx"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </motion.a>
              {/* Quote Request */}
              <motion.a
                href="/request-quote"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 20 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center justify-center w-14 h-14 bg-orange-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
                title="Request Quote"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </motion.a>
            </div>
            {/* Mobile-only call button */}
            <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-orange-500 to-red-600 p-4 z-40 md:hidden">
              <a
                href="tel:(808)930-9826"
                className="flex items-center justify-center w-full bg-white text-orange-600 py-3 rounded-lg font-semibold text-lg shadow-lg"
              >
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call Now - (808) 930-9826
              </a>
            </div>
          </>
        )}
      </div>
    </>
  );
};

// Main App component with Router
const App = () => {
  return (
    <HelmetProvider>
      <Router>
        <AppContent />
      </Router>
    </HelmetProvider>
  );
};

export default App; 