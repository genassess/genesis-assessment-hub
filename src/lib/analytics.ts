import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Google Analytics Measurement ID - Replace with your actual ID
// For privacy-friendly alternatives, see comments below
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || "";

// Initialize Google Analytics
export const initGA = () => {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined") return;

  // Load gtag script
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  }
  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID, {
    anonymize_ip: true, // Privacy enhancement
    cookie_flags: "SameSite=None;Secure",
  });

  // Make gtag available globally
  (window as unknown as { gtag: typeof gtag }).gtag = gtag;
};

// Track page views
export const trackPageView = (path: string) => {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined") return;
  
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (gtag) {
    gtag("config", GA_MEASUREMENT_ID, {
      page_path: path,
    });
  }
};

// Track custom events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined") return;

  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (gtag) {
    gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Hook to track page views on route changes
export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);
};

// Declare global types
declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

/*
 * PRIVACY-FRIENDLY ALTERNATIVES:
 * 
 * 1. Plausible Analytics (plausible.io)
 *    - Add to index.html:
 *    <script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
 * 
 * 2. Umami (umami.is) - Self-hosted option
 *    - Add to index.html:
 *    <script async src="https://your-umami-instance.com/script.js" data-website-id="your-website-id"></script>
 * 
 * 3. Fathom Analytics (usefathom.com)
 *    - Add to index.html:
 *    <script src="https://cdn.usefathom.com/script.js" data-site="YOUR_SITE_ID" defer></script>
 * 
 * These alternatives are GDPR-compliant by default and don't require cookie consent banners.
 */
