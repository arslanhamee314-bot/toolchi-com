import React, { Suspense } from "react";
import WorkspaceShell from "@/components/workspace/WorkspaceShell";

export const metadata = {
  title: "Toolchi Workspace - Multi-Tool Dashboard | Free AI, PDF, Image & Dev Tools",
  description: "Open multiple tools in one smart workspace. Follow guided workflows, get Smart Assist suggestions, and finish tasks faster - all free, no signup, runs in browser.",
  alternates: {
    canonical: "/workspace",
  },
  openGraph: {
    title: "Toolchi Workspace - Smart Multi-Tool Dashboard",
    description: "Open multiple tools in tabs, follow smart workflows, and finish tasks faster. Free, no signup.",
    url: "/workspace",
    siteName: "Toolchi",
    type: "website",
  },
};

interface WorkspacePageProps {
  searchParams: Promise<{ tool?: string; workflow?: string }>;
}

export default async function WorkspacePage({ searchParams }: WorkspacePageProps) {
  const { tool, workflow } = await searchParams;
  return (
    <Suspense fallback={null}>
      <WorkspaceShell initialSlug={tool} workflowId={workflow} />
    </Suspense>
  );
}
