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

  const title = tool.seoTitle;
  const description = tool.seoDescription;
  const url = `https://toolchi.online/tools/${tool.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/tools/${tool.slug}`,
      languages: {
        en: `/tools/${tool.slug}`,
        ur: `/ur/tools/${tool.slug}`,
        tr: `/tr/tools/${tool.slug}`,
        "x-default": `/tools/${tool.slug}`
      }
    },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      siteName: "Toolchi",
      images: [
        {
          url: `https://toolchi.online/og/${tool.slug}.png`,
          width: 1200,
          height: 630,
          alt: tool.name,
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`https://toolchi.online/og/${tool.slug}.png`]
    }
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
