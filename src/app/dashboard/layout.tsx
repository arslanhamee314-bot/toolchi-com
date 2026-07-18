import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Developer Portal Dashboard - Toolchi",
  description: "Manage your Toolchi Developer API keys, monitor request statistics, and check subscription parameters.",
  alternates: {
    canonical: "/dashboard",
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
