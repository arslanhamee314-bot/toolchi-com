export interface WorkflowStep {
  slug: string;
  label: string;
  icon: string; // Lucide icon name
}

export interface WorkflowItem {
  id: string;
  title: string;
  description: string;
  category: "image" | "pdf" | "ai" | "developer" | "seo" | "social" | "business";
  color: string; // tailwind bg color token
  accentColor: string; // tailwind text color token
  steps: WorkflowStep[];
  seoTitle: string;
  seoDescription: string;
  howTo: string[];
  faqs: { question: string; answer: string }[];
}

export const WORKFLOWS: WorkflowItem[] = [
  {
    id: "blog-image-optimization",
    title: "Blog Image Workflow",
    description: "Prepare images for your blog in one seamless pipeline: resize, compress, convert, and label.",
    category: "image",
    color: "bg-emerald-500/10",
    accentColor: "text-emerald-600 dark:text-emerald-400",
    steps: [
      { slug: "resize-image", label: "Resize Image", icon: "Maximize2" },
      { slug: "png-optimizer", label: "Compress PNG/JPG", icon: "Gauge" },
      { slug: "jpg-to-webp", label: "Convert to WebP", icon: "ArrowLeftRight" },
      { slug: "write-on-image", label: "Add Caption", icon: "Type" },
    ],
    seoTitle: "Blog Image Optimization Workflow — Resize, Compress & Convert | Toolchi",
    seoDescription: "Optimize blog images step by step: resize to ideal dimensions, compress without quality loss, convert to WebP for faster load, and add captions — all free in browser.",
    howTo: [
      "Start by uploading your image to the Resize Image tool and setting your target width (e.g., 1200px for blog heroes).",
      "Pass the resized image into the PNG/JPG Optimizer to reduce file size without visible quality loss.",
      "Convert the compressed image to WebP format for best browser compatibility and speed.",
      "Optionally add a caption or watermark using the Write on Image tool before downloading.",
    ],
    faqs: [
      { question: "What is the ideal image size for blog posts?", answer: "Most blogs recommend 1200×628px for hero images. For in-content images, 800px width is a safe default. Always compress below 200 KB for fast page load." },
      { question: "Why should I convert images to WebP?", answer: "WebP is 25–34% smaller than PNG or JPEG at the same visual quality, improving Core Web Vitals scores and SEO ranking." },
      { question: "Does this workflow require any uploads?", answer: "No. All operations run entirely inside your browser. Your files never leave your device." },
    ],
  },
  {
    id: "pdf-merge-compress",
    title: "PDF Sharing Workflow",
    description: "Combine, optimize, and organize PDFs before sharing via email or cloud storage.",
    category: "pdf",
    color: "bg-teal-500/10",
    accentColor: "text-teal-600 dark:text-teal-400",
    steps: [
      { slug: "merge-pdf", label: "Merge PDFs", icon: "Layers" },
      { slug: "compress-pdf", label: "Compress PDF", icon: "Zap" },
      { slug: "split-pdf", label: "Split if Needed", icon: "Scissors" },
    ],
    seoTitle: "PDF Merge & Compress Workflow — Combine and Optimize PDFs | Toolchi",
    seoDescription: "Merge multiple PDFs into one, compress the combined file for email size limits, and split pages as needed — entirely private, all in browser.",
    howTo: [
      "Upload all PDF files you want to combine into the Merge PDF tool and arrange the page order.",
      "Download the merged PDF and pass it into the Compress PDF tool to reduce file size for email.",
      "If the final document is still large, use Split PDF to break it into smaller chunks.",
    ],
    faqs: [
      { question: "What is the email attachment size limit?", answer: "Most email providers (Gmail, Outlook) have a 25 MB attachment limit. Compressing your PDF below this ensures reliable delivery." },
      { question: "Does merging PDFs reduce quality?", answer: "No. The Merge PDF tool preserves all text, images, and formatting from the source files at full resolution." },
    ],
  },
  {
    id: "ai-blog-writing",
    title: "AI Blog Writing Workflow",
    description: "Plan, write, and optimize blog content end-to-end using Toolchi's AI content utilities.",
    category: "ai",
    color: "bg-purple-500/10",
    accentColor: "text-purple-600 dark:text-purple-400",
    steps: [
      { slug: "ai-suite", label: "Generate Title & Outline", icon: "Sparkles" },
      { slug: "ai-suite", label: "Draft Paragraphs", icon: "PenLine" },
      { slug: "text-counter", label: "Count Words / SEO Length", icon: "BarChart2" },
      { slug: "case-converter", label: "Format Headings", icon: "Type" },
    ],
    seoTitle: "AI Blog Writing Workflow — Plan, Draft & Optimize Content | Toolchi",
    seoDescription: "Use Toolchi's AI Suite to generate blog titles, outlines, and paragraph drafts. Then optimize with word count and heading formatters — all free.",
    howTo: [
      "Open the AI Suite and use the Blog Title Generator to brainstorm headline ideas based on your topic.",
      "Use the Blog Outline Generator to map out your H2 and H3 structure.",
      "Write or paste your draft paragraphs, then use the AI Rewriter to improve clarity.",
      "Use the Text Counter to check word count, reading time, and SEO meta description length.",
      "Format all headings with the Case Converter for consistent Title Case or Sentence case.",
    ],
    faqs: [
      { question: "Is the AI writing tool free?", answer: "Yes. The full AI Suite including title generator, outline builder, and paragraph rewriter is free on Toolchi." },
      { question: "How long should a blog post be for SEO?", answer: "Long-form content (1500–2500 words) typically ranks better for informational queries. Use the Text Counter to track your word count." },
    ],
  },
  {
    id: "json-cleanup",
    title: "Developer Cleanup Workflow",
    description: "Format, validate, minify, and hash your code for production-ready output.",
    category: "developer",
    color: "bg-blue-500/10",
    accentColor: "text-blue-600 dark:text-blue-400",
    steps: [
      { slug: "json-formatter", label: "Format & Validate JSON", icon: "FileJson" },
      { slug: "minifier", label: "Minify JS / CSS", icon: "Zap" },
      { slug: "hash-generator", label: "Generate File Hash", icon: "Hash" },
      { slug: "base64-converter", label: "Encode to Base64", icon: "Binary" },
    ],
    seoTitle: "Developer Cleanup Workflow — Format, Minify & Hash Code | Toolchi",
    seoDescription: "Format and validate JSON, minify JavaScript and CSS for production, generate file hashes for integrity checks, and encode payloads to Base64 — all in browser.",
    howTo: [
      "Paste your raw JSON into the JSON Formatter to validate structure and beautify with proper indentation.",
      "Copy your JavaScript or CSS into the Minifier to strip whitespace and comments for production builds.",
      "Run the Hash Generator on your output file to produce an MD5/SHA256 checksum for integrity verification.",
      "Use the Base64 Converter to encode binary data or credentials for safe API payloads.",
    ],
    faqs: [
      { question: "Why should I minify JavaScript and CSS?", answer: "Minification removes unnecessary characters, reducing file size by 20–60%. This directly improves page load speed and Core Web Vitals scores." },
      { question: "When should I use a file hash?", answer: "File hashes are used to verify integrity — ensuring a file hasn't been corrupted or tampered with. Common in deployments and API integrations." },
    ],
  },
  {
    id: "seo-website-audit",
    title: "SEO Audit Workflow",
    description: "Run a complete technical SEO health check across SSL, robots, sitemap, and redirects.",
    category: "seo",
    color: "bg-amber-500/10",
    accentColor: "text-amber-600 dark:text-amber-400",
    steps: [
      { slug: "ssl-checker", label: "Check SSL Certificate", icon: "ShieldCheck" },
      { slug: "robots-checker", label: "Validate Robots.txt", icon: "Bot" },
      { slug: "sitemap-validator", label: "Validate Sitemap", icon: "Map" },
      { slug: "redirect-checker", label: "Check Redirects", icon: "ArrowRightLeft" },
    ],
    seoTitle: "SEO Website Audit Workflow — SSL, Robots, Sitemap & Redirects | Toolchi",
    seoDescription: "Audit your website's technical SEO in minutes: check SSL expiry, validate robots.txt directives, verify sitemap structure, and trace redirect chains — all free.",
    howTo: [
      "Start with the SSL Checker to verify your certificate is valid and check when it expires.",
      "Use the Robots.txt Checker to validate your crawler directives and identify blocked important pages.",
      "Run the Sitemap Validator to confirm all URLs are accessible and properly structured.",
      "Use the Redirect Checker to trace redirect chains and identify any redirect loops harming crawl budget.",
    ],
    faqs: [
      { question: "How often should I run an SEO audit?", answer: "Run a full technical audit at least monthly. Monitor SSL expiry weekly if your certificate expires within 30 days." },
      { question: "Does a misconfigured robots.txt hurt rankings?", answer: "Yes. Accidentally blocking important pages in robots.txt can prevent Google from crawling and indexing them, causing ranking drops." },
    ],
  },
  {
    id: "social-media-assets",
    title: "Social Media Assets Workflow",
    description: "Create, resize, and optimize all image assets for social platforms in one pipeline.",
    category: "social",
    color: "bg-pink-500/10",
    accentColor: "text-pink-600 dark:text-pink-400",
    steps: [
      { slug: "resize-image", label: "Resize for Platform", icon: "Maximize2" },
      { slug: "watermark-image", label: "Add Watermark/Logo", icon: "ShieldAlert" },
      { slug: "write-on-image", label: "Add Text Overlay", icon: "Type" },
      { slug: "png-optimizer", label: "Compress for Upload", icon: "Gauge" },
    ],
    seoTitle: "Social Media Image Workflow — Resize, Watermark & Optimize | Toolchi",
    seoDescription: "Prepare social media images: resize to platform-specific dimensions, add watermarks and text overlays, compress for fast upload — all free, all in browser.",
    howTo: [
      "Resize your image to match target platform dimensions (e.g., 1200×630 for LinkedIn, 1080×1080 for Instagram).",
      "Add your brand watermark or logo using the Watermark Image tool.",
      "Overlay any promotional text or hashtags with the Write on Image tool.",
      "Compress the final image for fast upload speeds using the PNG/JPG Optimizer.",
    ],
    faqs: [
      { question: "What size images does LinkedIn recommend?", answer: "LinkedIn recommends 1200×627px for shared article images and 1200×1200px for square images. Maximum file size is 5 MB." },
      { question: "Should I add a watermark to all social images?", answer: "Adding a subtle watermark protects your original content and increases brand recognition when images are shared." },
    ],
  },
  {
    id: "invoice-and-qr-business",
    title: "Business Tools Workflow",
    description: "Generate professional invoices, QR codes, and barcodes for your business in one session.",
    category: "business",
    color: "bg-orange-500/10",
    accentColor: "text-orange-600 dark:text-orange-400",
    steps: [
      { slug: "invoice-generator", label: "Create Invoice", icon: "Receipt" },
      { slug: "qr-generator", label: "Generate QR Code", icon: "QrCode" },
      { slug: "barcode-generator", label: "Generate Barcode", icon: "BarChart" },
    ],
    seoTitle: "Business Tools Workflow — Invoice, QR Code & Barcode Generator | Toolchi",
    seoDescription: "Create professional PDF invoices, generate scannable QR codes, and produce barcodes for your products — all free, no signup, runs in browser.",
    howTo: [
      "Use the Invoice Generator to create a professional PDF invoice with your business details, line items, and totals.",
      "Generate a QR code for your website, payment link, or contact info using the QR Generator.",
      "Create product barcodes (Code-128 format) using the Barcode Generator for inventory or packaging.",
    ],
    faqs: [
      { question: "Can I reuse my invoice template?", answer: "The invoice generator saves your last entries in browser storage so you can quickly generate repeat invoices with minor changes." },
      { question: "What formats are QR codes available in?", answer: "Toolchi generates QR codes as PNG files at high resolution, suitable for print and digital use." },
    ],
  },
];

export function getWorkflowById(id: string): WorkflowItem | undefined {
  return WORKFLOWS.find((w) => w.id === id);
}

export function getWorkflowsForTool(slug: string): WorkflowItem[] {
  return WORKFLOWS.filter((w) => w.steps.some((s) => s.slug === slug));
}
