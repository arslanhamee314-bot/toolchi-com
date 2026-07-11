import React from "react";
import { notFound } from "next/navigation";
import BlogPostPage from "@/app/blog/[slug]/page";
import { BLOG_POSTS, getPostBySlug } from "@/lib/blog-registry";

interface LocalizedBlogPostProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: LocalizedBlogPostProps) {
  const { locale, slug } = await params;
  const validLocales = ["ur", "tr"];
  if (!validLocales.includes(locale)) return {};

  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} | Toolchi Blog`,
    description: post.excerpt,
    alternates: {
      canonical: `/${locale}/blog/${post.slug}`,
    },
  };
}

export async function generateStaticParams() {
  const paths: { locale: string; slug: string }[] = [];
  const locales = ["ur", "tr"];
  for (const locale of locales) {
    for (const post of BLOG_POSTS) {
      paths.push({ locale, slug: post.slug });
    }
  }
  return paths;
}

export default async function LocalizedBlogPostPage({ params }: LocalizedBlogPostProps) {
  const { locale, slug } = await params;
  const validLocales = ["ur", "tr"];
  if (!validLocales.includes(locale)) {
    notFound();
  }

  return <BlogPostPage params={Promise.resolve({ slug })} />;
}
