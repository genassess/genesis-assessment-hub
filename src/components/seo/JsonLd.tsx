import { useEffect } from "react";

interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export const JsonLd = ({ data }: JsonLdProps) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(data);
    script.id = `json-ld-${JSON.stringify(data).slice(0, 20).replace(/[^a-zA-Z0-9]/g, "")}`;
    
    // Remove existing script with same id if exists
    const existing = document.getElementById(script.id);
    if (existing) {
      existing.remove();
    }
    
    document.head.appendChild(script);
    
    return () => {
      const scriptToRemove = document.getElementById(script.id);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [data]);

  return null;
};

// Organization Schema
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Genesis Examinations",
  description: "Trusted educational assessment solutions for South Sudan",
  url: "https://genesisexams.ss",
  logo: "https://genesisexams.ss/logo.png",
  foundingDate: "2020",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Juba",
    addressCountry: "South Sudan",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+211-XXX-XXXX",
    contactType: "customer service",
    availableLanguage: ["English", "Arabic"],
  },
  sameAs: [],
};

// LocalBusiness Schema
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Genesis Examinations",
  description: "Professional examination services for educational institutions in South Sudan",
  url: "https://genesisexams.ss",
  image: "https://genesisexams.ss/og-image.png",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Juba",
    addressLocality: "Juba",
    addressCountry: "SS",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "4.8594",
    longitude: "31.5713",
  },
  telephone: "+211-XXX-XXXX",
  priceRange: "$$",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "17:00",
  },
  areaServed: {
    "@type": "Country",
    name: "South Sudan",
  },
};

// FAQ Schema Generator
export const generateFaqSchema = (faqs: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
});

// Service Schema Generator
export const generateServiceSchema = (services: { name: string; description: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  provider: {
    "@type": "Organization",
    name: "Genesis Examinations",
  },
  serviceType: "Educational Assessment",
  areaServed: {
    "@type": "Country",
    name: "South Sudan",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Examination Services",
    itemListElement: services.map((service, index) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.name,
        description: service.description,
      },
      position: index + 1,
    })),
  },
});

// WebPage Schema
export const generateWebPageSchema = (
  name: string,
  description: string,
  url: string
) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  name,
  description,
  url,
  isPartOf: {
    "@type": "WebSite",
    name: "Genesis Examinations",
    url: "https://genesisexams.ss",
  },
  publisher: {
    "@type": "Organization",
    name: "Genesis Examinations",
  },
});

export default JsonLd;
