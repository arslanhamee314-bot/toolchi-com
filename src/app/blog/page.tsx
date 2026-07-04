"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { BLOG_POSTS, BLOG_CATEGORIES, BlogPost } from "@/lib/blog-registry";
import { BookOpen, Calendar, Clock, User, Mail, Sparkles, ChevronRight } from "lucide-react";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [emailInput, setEmailInput] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Extract featured post (first item)
  const featuredPost = useMemo(() => BLOG_POSTS[0], []);

  // Filter posts based on selected category (excluding the featured post from the grid list unless filtered)
  const gridPosts = useMemo(() => {
    let list = BLOG_POSTS;
    if (selectedCategory !== "all") {
      list = list.filter((p) => p.category === selectedCategory);
    } else {
      // Exclude featured post from grid on "All" view to prevent duplicate display
      list = list.filter((p) => p.slug !== featuredPost.slug);
    }
    return list;
  }, [selectedCategory, featuredPost]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setIsSubscribed(true);
    setEmailInput("");
  };

  return (
    <div className="min-h-screen bg-[#f6f7fb] dark:bg-[#11141c] py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        
        {/* 1. Blog Hero Header */}
        <section className="flex flex-col gap-3 border-b border-border pb-8">
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

        {/* 2. Main Blog Layout (Split Column Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Area: Featured & Post Grid (Col Span 8) */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            
            {/* Category Filter Chips */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
              {BLOG_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 text-xs font-semibold rounded-full border transition-all shrink-0 cursor-pointer active:scale-95 ${
                    selectedCategory === cat.id
                      ? "bg-[#7d4dff] border-[#7d4dff] text-white shadow-lg shadow-[#7d4dff]/10"
                      : "bg-white dark:bg-card border-border hover:border-[#7d4dff] text-muted hover:text-foreground"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Featured Post Card (Only shown on "All" filter) */}
            {selectedCategory === "all" && featuredPost && (
              <article className="bg-white dark:bg-card border border-border rounded-3xl overflow-hidden card-shadow flex flex-col md:flex-row group transition-all-ease">
                <div className={`w-full md:w-1/2 min-h-60 bg-gradient-to-tr ${featuredPost.thumbnailGradient} relative flex items-center justify-center p-8 text-white text-5xl font-extrabold select-none`}>
                  📰
                </div>
                <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between gap-5">
                  <div className="flex flex-col gap-3">
                    <span className="text-3xs font-extrabold text-[#7d4dff] bg-[#f3eeff] dark:bg-[#251e1c] px-2.5 py-1 rounded-md w-fit uppercase tracking-wider">
                      Featured Guide
                    </span>
                    <h2 className="text-lg md:text-xl font-extrabold text-foreground group-hover:text-[#7d4dff] transition-colors leading-snug">
                      <Link href={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
                    </h2>
                    <p className="text-xs text-muted leading-relaxed line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-3xs font-bold text-muted border-t border-border/40 pt-4 mt-auto">
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {featuredPost.readTime}</span>
                    <span>{featuredPost.date}</span>
                  </div>
                </div>
              </article>
            )}

            {/* Grid Posts list */}
            {gridPosts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {gridPosts.map((post) => (
                  <article 
                    key={post.slug} 
                    className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden card-shadow flex flex-col justify-between min-h-96 group transition-all-ease"
                  >
                    <div className={`h-40 bg-gradient-to-tr ${post.thumbnailGradient} flex items-center justify-center text-white text-4xl select-none`}>
                      📝
                    </div>
                    <div className="p-5 flex-1 flex flex-col gap-3.5 justify-between">
                      <div className="flex flex-col gap-2.5">
                        <span className="text-3xs font-extrabold text-[#7d4dff] bg-[#f3eeff] dark:bg-[#251e1c] px-2.5 py-1 rounded-md w-fit uppercase tracking-wider">
                          {post.category}
                        </span>
                        <h3 className="font-extrabold text-sm text-foreground group-hover:text-[#7d4dff] transition-colors leading-snug">
                          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                        </h3>
                        <p className="text-xs text-muted leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-3xs font-bold text-muted border-t border-border/40 pt-4 mt-auto">
                        <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {post.readTime}</span>
                        <span>{post.date}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white dark:bg-card border border-border rounded-2xl text-muted text-xs">
                No articles found under this filter check.
              </div>
            )}

          </div>

          {/* Right Area: Sidebar Column (Col Span 4) */}
          <aside className="lg:col-span-4 flex flex-col gap-6">
            
            {/* 1. Newsletter Signup block */}
            <div className="bg-[#f3eeff] dark:bg-[#201c2e] border border-[#e8ddff]/80 dark:border-border/60 rounded-3xl p-6 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-[#7d4dff]" />
                <h3 className="font-extrabold text-sm text-foreground">Webmaster Weekly</h3>
              </div>
              <p className="text-xs text-muted leading-relaxed">
                Join 5,000+ developers getting our vetted free speed tutorials and security audits directly to their inbox.
              </p>
              
              {isSubscribed ? (
                <div className="bg-emerald-500/10 text-emerald-500 text-xs font-bold p-3.5 rounded-xl border border-emerald-500/25 text-center">
                  🎉 Thanks for subscribing!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Enter your email..."
                    className="w-full px-4 py-2.5 text-xs bg-white dark:bg-card border border-border rounded-xl outline-none focus:border-[#7d4dff] text-foreground"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 text-xs font-extrabold bg-[#7d4dff] hover:bg-[#6530ef] text-white rounded-xl shadow-md transition-colors cursor-pointer"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>

            {/* 2. Popular Guides list */}
            <div className="bg-white dark:bg-card border border-border rounded-3xl p-6 flex flex-col gap-4 card-shadow">
              <h3 className="font-extrabold text-sm text-foreground border-b border-border pb-2">
                Popular Guides
              </h3>
              <div className="flex flex-col gap-4 text-xs font-semibold">
                <Link href="/tools/qr-generator" className="hover:text-[#7d4dff] flex justify-between items-center group">
                  <span>1. Generate Custom QR Codes</span>
                  <ChevronRight className="h-4 w-4 text-muted group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link href="/tools/ai-detector" className="hover:text-[#7d4dff] flex justify-between items-center group">
                  <span>2. Bypass AI Writing Filters</span>
                  <ChevronRight className="h-4 w-4 text-muted group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link href="/tools/merge-pdf" className="hover:text-[#7d4dff] flex justify-between items-center group">
                  <span>3. Merge PDF Files Locally</span>
                  <ChevronRight className="h-4 w-4 text-muted group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>

          </aside>

        </div>

      </div>
    </div>
  );
}
