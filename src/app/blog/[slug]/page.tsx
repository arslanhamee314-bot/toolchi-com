import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS, getPostBySlug } from "@/lib/blog-registry";
import { Calendar, Clock, User, ChevronRight, ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#f6f7fb] dark:bg-[#11141c] py-12 px-6">
      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-3xs font-semibold text-muted uppercase tracking-wider">
          <Link href="/" className="hover:text-[#7d4dff] transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <Link href="/blog" className="hover:text-[#7d4dff] transition-colors">Blog</Link>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <span className="text-foreground truncate max-w-[200px]">{post.title}</span>
        </nav>

        {/* Action Button: Back to Blog */}
        <Link 
          href="/blog" 
          className="flex items-center gap-1.5 text-xs font-bold text-[#7d4dff] hover:text-[#6530ef] transition-colors w-fit select-none"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Articles
        </Link>

        {/* Article Meta Banner */}
        <header className="flex flex-col gap-4">
          <span className="text-3xs font-extrabold text-[#7d4dff] bg-[#f3eeff] dark:bg-[#251e1c] px-2.5 py-1 rounded-md w-fit uppercase tracking-wider">
            {post.category}
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-snug">
            {post.title}
          </h1>

          {/* Author info row */}
          <div className="flex items-center gap-4 text-xs text-muted border-b border-border pb-6 mt-2">
            <div className="h-10 w-10 rounded-full bg-[#7d4dff]/10 border border-[#7d4dff]/20 text-[#7d4dff] font-bold text-sm flex items-center justify-center select-none">
              {post.author.avatar}
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-foreground">{post.author.name}</span>
              <span className="text-[10px] text-muted-foreground">{post.author.role}</span>
            </div>
            <div className="ml-auto flex items-center gap-4 text-[10px] font-bold">
              <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {post.readTime}</span>
              <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {post.date}</span>
            </div>
          </div>
        </header>

        {/* Article content markdown mock */}
        <article className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-foreground/80 leading-relaxed flex flex-col gap-6">
          <p className="font-semibold text-[#20242d] dark:text-[#f6f7fb] text-sm leading-relaxed">
            {post.excerpt}
          </p>

          <h2 className="text-base sm:text-lg font-extrabold text-[#20242d] dark:text-[#f6f7fb] mt-4 tracking-tight">
            1. Why Client-Side Execution Matters
          </h2>
          <p>
            Standard utility sites process payloads (like your PDFs or JSON configurations) on remote databases. This introduces security liabilities and potential data privacy breaches. By using client-side JavaScript libraries natively, files are processed inside your browser tab without upload pipelines.
          </p>

          <h2 className="text-base sm:text-lg font-extrabold text-[#20242d] dark:text-[#f6f7fb] mt-4 tracking-tight">
            2. The Core Optimization checklist
          </h2>
          <p>
            To audit speed and compliance markers, make sure you configure these elements:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Robots.txt</strong>: Map allowed directory parameters for index crawlers.</li>
            <li><strong>SSL Certificates</strong>: Verify handshake encryptions periodically.</li>
            <li><strong>Responsive Widths</strong>: Audit viewport wraps across layout resolutions.</li>
            <li><strong>Image Payloads</strong>: Quantize PNG and JPEG weights locally.</li>
          </ul>

          <div className="p-5 bg-[#f3eeff] dark:bg-[#1a1725] border border-[#e8ddff]/80 dark:border-border/60 rounded-2xl flex items-center gap-3.5 mt-4">
            <div className="h-10 w-10 rounded-xl bg-[#7d4dff]/10 text-[#7d4dff] flex items-center justify-center border border-[#7d4dff]/20">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-foreground">100% Privacy Guarantee</h4>
              <p className="text-[10px] text-muted leading-relaxed">
                All checker processes run sandbox-style within your tab viewport. No external requests are triggered.
              </p>
            </div>
          </div>
        </article>

        {/* Next article link */}
        <div className="border-t border-border pt-8 mt-6 flex justify-between">
          <Link 
            href="/blog"
            className="px-4 py-2.5 text-xs font-bold bg-white dark:bg-card border border-border text-foreground hover:bg-neutral-100 rounded-xl transition-all select-none"
          >
            ← View All Articles
          </Link>
          <Link 
            href="/"
            className="px-4 py-2.5 text-xs font-bold bg-[#7d4dff] hover:bg-[#6530ef] text-white rounded-xl transition-all select-none shadow-sm shadow-[#7d4dff]/15"
          >
            Launch Utilities →
          </Link>
        </div>

      </div>
    </div>
  );
}
