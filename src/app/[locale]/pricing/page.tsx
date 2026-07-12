import React from "react";
import { notFound } from "next/navigation";
import PricingPage from "@/app/pricing/page";

interface LocalizedPricingProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: LocalizedPricingProps) {
  const { locale } = await params;
  const validLocales = ["ur", "tr"];
  if (!validLocales.includes(locale)) return {};

  const title = locale === "ur" ? "قیمتیں - Toolchi Pro" : "Fiyatlandırma - Toolchi Pro";
  const description = locale === "ur"
    ? "ٹولچی پرو قیمتوں کے پیکیجز اور تفصیلات۔"
    : "Toolchi Pro fiyatlandırma detayları ve paketleri.";
  const url = `https://toolchi.online/${locale}/pricing`;

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/pricing`,
      languages: {
        en: "/pricing",
        ur: "/ur/pricing",
        tr: "/tr/pricing",
        "x-default": "/pricing"
      }
    },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      siteName: "Toolchi",
      images: [{ url: "https://toolchi.online/logo.jpg", width: 800, height: 800, alt: "Toolchi Logo" }]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://toolchi.online/logo.jpg"]
    }
  };
}

export async function generateStaticParams() {
  return [{ locale: "ur" }, { locale: "tr" }];
}

export default async function LocalizedPricingPage({ params }: LocalizedPricingProps) {
  const { locale } = await params;
  const validLocales = ["ur", "tr"];
  if (!validLocales.includes(locale)) {
    notFound();
  }

  return <PricingPage />;
}
