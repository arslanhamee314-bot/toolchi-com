import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import WorkspaceShell from "@/components/workspace/WorkspaceShell";

interface LocalizedWorkspaceProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ tool?: string }>;
}

export async function generateMetadata({ params }: LocalizedWorkspaceProps) {
  const { locale } = await params;
  const validLocales = ["ur", "tr"];
  if (!validLocales.includes(locale)) return {};

  const title = locale === "ur" ? "ورک اسپیس - Toolchi" : "Çalışma Alanı - Toolchi";
  const description = locale === "ur" 
    ? "ٹولچی ورک اسپیس - ایک سمارٹ ڈیش بورڈ میں متعدد ٹولز کھولیں۔" 
    : "Toolchi Çalışma Alanı - Akıllı bir panoda birden fazla araç açın.";
  const url = `https://toolchi.online/${locale}/workspace`;

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/workspace`,
      languages: {
        en: "/workspace",
        ur: "/ur/workspace",
        tr: "/tr/workspace",
        "x-default": "/workspace"
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

export default async function LocalizedWorkspacePage({ params, searchParams }: LocalizedWorkspaceProps) {
  const { locale } = await params;
  const { tool } = await searchParams;

  const validLocales = ["ur", "tr"];
  if (!validLocales.includes(locale)) {
    notFound();
  }

  return (
    <Suspense fallback={null}>
      <WorkspaceShell initialSlug={tool} />
    </Suspense>
  );
}
