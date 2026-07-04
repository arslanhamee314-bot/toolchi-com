export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  category: string;
  readTime: string;
  date: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  thumbnailGradient: string; // Dynamic CSS gradient representing card thumbnails
}

export const BLOG_CATEGORIES = [
  { id: "all", name: "All Articles" },
  { id: "webmaster", name: "Webmaster Guides" },
  { id: "performance", name: "Performance Tips" },
  { id: "ai", name: "AI & Innovation" }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "essential-tools-for-webmasters",
    title: "Essential Webmaster Tools for Performance and Security in 2026",
    excerpt: "Discover the critical client-side utilities every webmaster needs to monitor SSL availability, index sitemaps, and test responsive grids.",
    category: "webmaster",
    readTime: "5 min read",
    date: "July 2, 2026",
    author: {
      name: "Alex Rivera",
      role: "Lead SEO Engineer",
      avatar: "AR"
    },
    thumbnailGradient: "from-purple-500 to-indigo-600"
  },
  {
    slug: "how-to-compress-images-without-quality-loss",
    title: "How to Compress Web Images Natively Without Sacrificing Visual Quality",
    excerpt: "Images make up over 60% of average page weight. Learn how quantizing PNGs and WebPs client-side can double your page loading speeds.",
    category: "performance",
    readTime: "4 min read",
    date: "June 28, 2026",
    author: {
      name: "Marcus Vance",
      role: "Front-End Lead",
      avatar: "MV"
    },
    thumbnailGradient: "from-pink-500 to-rose-600"
  },
  {
    slug: "bypassing-ai-detectors-local-humanization",
    title: "Bypassing Modern AI Content Detectors: The Mechanics of Sentence Burstiness",
    excerpt: "Typical AI content detectors trace uniform sentence structures. Delve into the linguistic parameters needed to humanize articles natively.",
    category: "ai",
    readTime: "6 min read",
    date: "June 25, 2026",
    author: {
      name: "Elena Rostova",
      role: "AI Ethics Specialist",
      avatar: "ER"
    },
    thumbnailGradient: "from-blue-500 to-teal-600"
  },
  {
    slug: "understanding-ssl-checking-trust-chains",
    title: "Understanding SSL Handshakes and Verifying Trust Certificate Chains",
    excerpt: "A broken SSL cert triggers safety warnings. Learn how to verify certificate expiration thresholds and cipher compatibility step-by-step.",
    category: "webmaster",
    readTime: "3 min read",
    date: "June 20, 2026",
    author: {
      name: "Alex Rivera",
      role: "Lead SEO Engineer",
      avatar: "AR"
    },
    thumbnailGradient: "from-violet-500 to-fuchsia-600"
  }
];

export const getPostBySlug = (slug: string) => {
  return BLOG_POSTS.find(p => p.slug === slug);
};
