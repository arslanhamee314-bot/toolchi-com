import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Blogging API Reference - Toolchi Docs",
  description: "Learn how to integrate Toolchi's programmatic AI content generator and outline generator API endpoints.",
  alternates: {
    canonical: "/developers/ai-blogging-api",
  },
};

export default function AiBloggingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
