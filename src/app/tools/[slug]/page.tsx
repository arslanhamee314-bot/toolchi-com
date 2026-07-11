import React from "react";
import { getToolBySlug, TOOLS_REGISTRY } from "@/lib/tools-registry";
import ToolLayout from "@/components/tools/ToolLayout";

interface ToolPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return {
      title: "Tool Not Found | Toolchi",
      description: "The requested browser utility could not be found.",
    };
  }

  return {
    title: tool.seoTitle,
    description: tool.seoDescription,
    alternates: {
      canonical: `/tools/${tool.slug}`,
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
  return TOOLS_REGISTRY.map((tool) => ({
    slug: tool.slug,
  }));
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  return <ToolLayout slug={slug} locale="en" />;
}
