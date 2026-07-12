import React from "react";
import type { Metadata } from "next";
import PricingPageContent from "@/components/pricing/PricingPageContent";

export const metadata: Metadata = {
  title: "Toolchi Pro Pricing - Flexible & Transparent Plans",
  description: "View pricing details for Toolchi Creator Pro and Developer API plans. Unlock batch compressions, sitemaps, custom watermarks, and unlimited tabs.",
  alternates: {
    canonical: "/pricing",
    languages: {
      en: "/pricing",
      ur: "/ur/pricing",
      tr: "/tr/pricing",
      "x-default": "/pricing"
    }
  },
  openGraph: {
    title: "Toolchi Pro Pricing - Flexible & Transparent Plans",
    description: "Unlock batch compressions, custom watermarks, unlimited workspace tabs, and high-performance developer APIs.",
    url: "https://toolchi.online/pricing",
    siteName: "Toolchi",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://toolchi.online/logo.jpg", width: 800, height: 800, alt: "Toolchi Logo" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Toolchi Pro Pricing - Flexible & Transparent Plans",
    description: "Unlock batch compressions, custom watermarks, unlimited workspace tabs, and high-performance developer APIs.",
    images: ["https://toolchi.online/logo.jpg"]
  }
};

export default function PricingPage() {
  return <PricingPageContent />;
}
