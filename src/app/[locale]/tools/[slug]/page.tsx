import React from "react";
import { notFound } from "next/navigation";
import { getToolBySlug, TOOLS_REGISTRY } from "@/lib/tools-registry";
import { getLocalizedTool } from "@/lib/tools-i18n";
import ToolLayout from "@/components/tools/ToolLayout";

interface LocalizedToolProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: LocalizedToolProps) {
  const { locale, slug } = await params;
  const validLocales = ["ur", "tr"];
  if (!validLocales.includes(locale)) return {};

  const tool = getToolBySlug(slug);
  if (!tool) return {};

  const localized = getLocalizedTool(slug, locale);
  return {
    title: localized?.seoTitle || tool.seoTitle,
    description: localized?.seoDescription || tool.seoDescription,
    alternates: {
      canonical: `/${locale}/tools/${tool.slug}`,
      languages: {
        en: `/tools/${tool.slug}`,
        ur: `/ur/tools/${tool.slug}`,
        tr: `/tr/tools/${tool.slug}`,
        "x-default": `/tools/${tool.slug}`
      }
    },
  };

}

export async function generateStaticParams() {
  const paths: { locale: string; slug: string }[] = [];
  const locales = ["ur", "tr"];
  for (const locale of locales) {
    for (const tool of TOOLS_REGISTRY) {
      paths.push({ locale, slug: tool.slug });
    }
  }
  return paths;
}

export default async function LocalizedToolPage({ params }: LocalizedToolProps) {
  const { locale, slug } = await params;
  const validLocales = ["ur", "tr"];
  if (!validLocales.includes(locale)) {
    notFound();
  }

  const tool = getToolBySlug(slug);
  if (!tool) {
    notFound();
  }

  return <ToolLayout slug={slug} locale={locale} />;
}
