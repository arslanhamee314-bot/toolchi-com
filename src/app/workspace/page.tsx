import React, { Suspense } from "react";
import Link from "next/link";
import WorkspaceShell from "@/components/workspace/WorkspaceShell";

export const metadata = {
  title: "Toolchi Workspace - Multi-Tool Dashboard | Free AI, PDF, Image & Dev Tools",
  description: "Open multiple tools in one smart workspace. Follow guided workflows, get Smart Assist suggestions, and finish tasks faster - all free, no signup, runs in browser.",
  alternates: {
    canonical: "/workspace",
    languages: {
      en: "/workspace",
      ur: "/ur/workspace",
      tr: "/tr/workspace",
      "x-default": "/workspace"
    }
  },
  openGraph: {
    title: "Toolchi Workspace - Smart Multi-Tool Dashboard",
    description: "Open multiple tools in tabs, follow smart workflows, and finish tasks faster. Free, no signup.",
    url: "https://toolchi.online/workspace",
    siteName: "Toolchi",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://toolchi.online/logo.jpg", width: 800, height: 800, alt: "Toolchi Logo" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Toolchi Workspace - Smart Multi-Tool Dashboard",
    description: "Open multiple tools in tabs, follow smart workflows, and finish tasks faster. Free, no signup.",
    images: ["https://toolchi.online/logo.jpg"]
  }
};

interface WorkspacePageProps {
  searchParams: Promise<{ tool?: string; workflow?: string }>;
}

export default async function WorkspacePage({ searchParams }: WorkspacePageProps) {
  const { tool, workflow } = await searchParams;
  return (
    <>
      <Suspense fallback={null}>
        <WorkspaceShell initialSlug={tool} workflowId={workflow} />
      </Suspense>

      {/* Static SEO Crawlable Content (Visually Hidden to prevent UI clutter) */}
      <div 
        className="absolute opacity-0 pointer-events-none h-0 w-0 overflow-hidden" 
        aria-hidden="true"
      >
        <header>
          <h1>Toolchi Smart Multi-Tool Workspace</h1>
          <p>
            Welcome to the Toolchi Workspace. This interactive dashboard allows you to open multiple tools in a single browser session, follow workflows, and manage tasks client-side without any server-side file uploads.
          </p>
        </header>

        <section>
          <h2>Key Workspace Benefits</h2>
          <ul>
            <li>Open up to 3 tools in browser tabs simultaneously.</li>
            <li>Guided workflows for image compression, PDF merging, coding, and AI rephrasing.</li>
            <li>Smart Assist suggestions tailored to your open utility tools.</li>
            <li>Complete offline security - once loaded, the workspace works without internet.</li>
          </ul>
        </section>

        <section>
          <h2>Frequently Asked Questions (FAQs)</h2>
          <div>
            <h3>How do I open tools in the workspace?</h3>
            <p>You can use the search bar or the Navigator panel on the left to select any utility.</p>
          </div>
          <div>
            <h3>Are my file buffers saved?</h3>
            <p>No, all operations execute in sandbox memory. We do not store or send files to Vercel or remote hosts.</p>
          </div>
          <div>
            <h3>What are guided workflows?</h3>
            <p>Workflows let you link multiple tasks, e.g., converting video to GIF, crop it, and then watermark it sequentially.</p>
          </div>
        </section>

        <section>
          <h2>Popular Tool Suites & Quick Links</h2>
          <ul>
            <li><Link href="/pdf-tools">PDF & Document Suite</Link></li>
            <li><Link href="/image-tools">Image Workspace</Link></li>
            <li><Link href="/developers/seo-audit-api">SEO Audit APIs</Link></li>
            <li><Link href="/pricing">Pricing & Plans</Link></li>
            <li><Link href="/docs/api">Developer Docs</Link></li>
            <li><Link href="/about">About Toolchi</Link></li>
          </ul>
        </section>
      </div>
    </>
  );
}
