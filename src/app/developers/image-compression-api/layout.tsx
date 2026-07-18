import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Optimization API Reference - Toolchi Docs",
  description: "Reference guide for Toolchi's programmatic image resizer and WebP/AVIF file compression endpoints.",
  alternates: {
    canonical: "/developers/image-compression-api",
  },
};

export default function ImageCompressionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
