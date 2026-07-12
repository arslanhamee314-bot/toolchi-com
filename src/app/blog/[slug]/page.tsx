import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS, getPostBySlug } from "@/lib/blog-registry";
import { Calendar, Clock, User, ChevronRight, ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import AdUnit from "@/components/AdUnit";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

// Generate dynamic metadata for blog articles for high conversion social cards
export async function generateMetadata({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    return {
      title: "Article Not Found - Toolchi",
      description: "The requested blog article could not be found.",
    };
  }

  return {
    title: `${post.title} | Toolchi Blog`,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      siteName: "Toolchi",
      type: "article",
      publishedTime: new Date(post.date).toISOString(),
      images: [
        {
          url: "/logo.jpg",
          width: 800,
          height: 800,
          alt: post.title,
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: ["/logo.jpg"],
    }
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  // Pre-compile JSON-LD schema for the blog post
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `https://toolchi.online/blog/${post.slug}#blogposting`,
        "headline": post.title,
        "description": post.excerpt,
        "datePublished": new Date(post.date).toISOString(),
        "author": {
          "@type": "Person",
          "name": post.author.name,
          "jobTitle": post.author.role
        },
        "publisher": {
          "@type": "Organization",
          "name": "Toolchi",
          "logo": {
            "@type": "ImageObject",
            "url": "https://toolchi.online/logo.jpg"
          }
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://toolchi.online/blog/${post.slug}`
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#f6f7fb] dark:bg-[#11141c] py-12 px-6">
      {/* Blog Schema Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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

        {post.thumbnail && (
          <div className="w-full h-48 sm:h-80 md:h-[360px] rounded-3xl overflow-hidden relative shadow-md select-none bg-neutral-100 dark:bg-neutral-800 shrink-0">
            <img 
              src={post.thumbnail} 
              alt={post.title} 
              className="w-full h-full object-cover" 
            />
          </div>
        )}

        {/* Dynamic HTML rendering */}
        <article className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-foreground/80 leading-relaxed flex flex-col gap-6">
          <p className="font-semibold text-[#20242d] dark:text-[#f6f7fb] text-sm leading-relaxed">
            {post.excerpt}
          </p>
          <AdUnit slot="5492810472" />
          <div dangerouslySetInnerHTML={{ __html: post.content }} className="space-y-4" />
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
