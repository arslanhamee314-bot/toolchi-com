import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF Manipulations API Reference - Toolchi Docs",
  description: "API schemas and specifications to programmatically merge, split, and compress PDF documents securely.",
  alternates: {
    canonical: "/developers/pdf-tools-api",
  },
};

export default function PdfToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
