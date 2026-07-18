import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEO Auditing API Reference - Toolchi Docs",
  description: "API nodes to check redirect chains, parse sitemaps, and validate robots.txt crawl configurations.",
  alternates: {
    canonical: "/developers/seo-audit-api",
  },
};

export default function SeoAuditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
