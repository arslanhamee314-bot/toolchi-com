import React from "react";
import { notFound } from "next/navigation";
import BlogPage from "@/app/blog/page";

interface LocalizedBlogProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: LocalizedBlogProps) {
  const { locale } = await params;
  const validLocales = ["ur", "tr"];
  if (!validLocales.includes(locale)) return {};

  return {
    title: locale === "ur" ? "بلاگ - Toolchi" : "Blog - Toolchi",
    description: "Insights, guides, and tutorials from Toolchi.",
    alternates: {
      canonical: `/${locale}/blog`,
    },
  };
}

export async function generateStaticParams() {
  return [{ locale: "ur" }, { locale: "tr" }];
}

export default async function LocalizedBlogPage({ params }: LocalizedBlogProps) {
  const { locale } = await params;
  const validLocales = ["ur", "tr"];
  if (!validLocales.includes(locale)) {
    notFound();
  }

  return <BlogPage />;
}
