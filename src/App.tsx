import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "@/shared/contexts";
import { Navbar, Footer, ScrollToTop, ScrollToTopButton } from "@/shared/layout";
import PageTransition from "@/components/PageTransition";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { initGA, usePageTracking } from "@/lib/analytics";

// Lazy load all page components for better code splitting
const Home = lazy(() => import("@/features/home/Home"));
const About = lazy(() => import("@/features/about/About"));
const Services = lazy(() => import("@/features/services/Services"));
const Testimonials = lazy(() => import("@/features/testimonials/Testimonials"));
const Partners = lazy(() => import("@/features/partners/Partners"));
const Contact = lazy(() => import("@/features/contact/Contact"));
const FAQ = lazy(() => import("@/features/faq/FAQ"));
const OrderExams = lazy(() => import("@/features/order/OrderExams"));
const NotFound = lazy(() => import("@/features/not-found/NotFound"));

const queryClient = new QueryClient();

// Component to handle analytics tracking
const AnalyticsTracker = () => {
  usePageTracking();
  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <>
      <AnalyticsTracker />
      <Suspense fallback={<LoadingSpinner />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/about" element={<PageTransition><About /></PageTransition>} />
            <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
            <Route path="/testimonials" element={<PageTransition><Testimonials /></PageTransition>} />
            <Route path="/partners" element={<PageTransition><Partners /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
            <Route path="/faq" element={<PageTransition><FAQ /></PageTransition>} />
            <Route path="/order" element={<PageTransition><OrderExams /></PageTransition>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </>
  );
};

const App = () => {
  // Initialize Google Analytics on app mount
  useEffect(() => {
    initGA();
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <LanguageProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              <Navbar />
              <AnimatedRoutes />
              <Footer />
              <ScrollToTopButton />
            </BrowserRouter>
          </LanguageProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
