import React from "react";
import Link from "next/link";
import { BookOpen, ChevronRight } from "lucide-react";
import BlogContent from "@/components/blog/BlogContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Toolchi Blog - Webmaster Guides, SEO Optimization, & Performance Tips",
  description: "Insights, guides, and tutorials from Toolchi designers, developers, and security auditors. Learn image optimization, PDF compression, and local speed tricks.",
  alternates: {
    canonical: "/blog",
  }
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#f6f7fb] dark:bg-[#11141c] py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        
        {/* 1. Blog Hero Header */}
        <section className="flex flex-col gap-3 border-b border-border pb-8 text-left">
          <nav className="flex items-center gap-1.5 text-3xs font-semibold text-muted uppercase tracking-wider mb-2">
            <Link href="/" className="hover:text-[#7d4dff] transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3 shrink-0" />
            <span className="text-foreground">Blog</span>
          </nav>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-[#7d4dff]/10 text-[#7d4dff] border border-[#7d4dff]/20 rounded-xl flex items-center justify-center">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">Toolchi Blog</h1>
              <p className="text-xs sm:text-sm text-muted mt-1 leading-relaxed max-w-xl">
                Insights, guides, and tutorials from our webmasters, designers, and developers.
              </p>
            </div>
          </div>
        </section>

        {/* 2. Blog Client Area */}
        <BlogContent />

      </div>
    </div>
  );
}
