import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Toolchi Developer Hub - Local-First API Platform",
  description: "Leverage Toolchi's optimized web utilities via server-side and browser-client API nodes. Fast image operations, PDF manipulation, and content analysis.",
  alternates: {
    canonical: "/developers",
  },
};

export default function DevelopersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
