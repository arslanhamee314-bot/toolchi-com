import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Developer API Playground Docs - Toolchi",
  description: "Interactive API playground documentation to test Toolchi programmatic workflows and API tokens locally.",
  alternates: {
    canonical: "/docs/api",
  },
};

export default function DocsApiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
