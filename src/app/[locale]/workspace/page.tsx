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

  return {
    title: locale === "ur" ? "ورک اسپیس - Toolchi" : "Çalışma Alanı - Toolchi",
    description: "Multi-tool smart workspace dashboard.",
    alternates: {
      canonical: `/${locale}/workspace`,
    },
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
