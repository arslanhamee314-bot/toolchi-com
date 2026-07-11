import React from "react";
import { notFound } from "next/navigation";
import HomeLayout from "@/components/home/HomeLayout";
import { getDictionary } from "@/i18n/dictionary";

interface LocalizedPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: LocalizedPageProps) {
  const { locale } = await params;
  const validLocales = ["ur", "tr"];
  if (!validLocales.includes(locale)) return {};

  const dict = getDictionary(locale);
  return {
    title: `${dict.homepage.title} - Toolchi`,
    description: dict.homepage.subtitle,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/",
        ur: "/ur",
        tr: "/tr",
        "x-default": "/"
      }
    },
  };

}

export async function generateStaticParams() {
  return [{ locale: "ur" }, { locale: "tr" }];
}

export default async function LocalizedHomePage({ params }: LocalizedPageProps) {
  const { locale } = await params;
  const validLocales = ["ur", "tr"];
  if (!validLocales.includes(locale)) {
    notFound();
  }

  return <HomeLayout locale={locale} />;
}
