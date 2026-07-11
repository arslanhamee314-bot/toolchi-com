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

  return {
    title: locale === "ur" ? "قیمتیں - Toolchi Pro" : "Fiyatlandırma - Toolchi Pro",
    description: "Toolchi Creator Pro Suite pricing details.",
    alternates: {
      canonical: `/${locale}/pricing`,
    },
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
