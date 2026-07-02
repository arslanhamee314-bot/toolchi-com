import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Toolchi — Fast Browser Utilities & Online Tools Platform",
  description: "Toolchi: all-in-one browser utilities for text, PDF, developer, image, color, math, and business. 100% secure client-side local execution.",
  metadataBase: new URL("https://toolchi.online"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Toolchi — Fast Browser Utilities & Online Tools Platform",
    description: "100% local, client-side online tools suite. Merge PDFs, format JSON, convert color spaces, analyze text case, and generate invoices instantly.",
    url: "/",
    siteName: "Toolchi",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Toolchi — Fast Browser Utilities & Online Tools Platform",
    description: "Convert, merge, format, and generate data locally in your browser. Complete privacy guarantee.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Google Fonts Outfit */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/20">
        
        {/* Header Navigation */}
        <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
          <div className="mx-auto max-w-7xl flex items-center justify-between px-4 py-4 sm:px-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-tr from-primary to-primary/80 text-primary-foreground font-bold shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
                T
              </div>
              <div>
                <div className="text-base font-bold leading-tight tracking-tight text-white">Toolchi</div>
                <div className="text-[10px] text-muted-foreground font-medium">100% Client-Side Tools</div>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <Link href="/tools" className="hover:text-foreground transition-colors">All Tools</Link>
              <Link href="/#categories" className="hover:text-foreground transition-colors">Categories</Link>
              <Link href="/#about" className="hover:text-foreground transition-colors">Privacy Promise</Link>
            </nav>

            <div className="flex items-center gap-3">
              <Link 
                href="/tools" 
                className="px-4 py-2 text-xs font-bold bg-neutral-900 border border-border hover:border-neutral-700 text-white rounded-xl transition-all active:scale-95 shadow-xs"
              >
                Browse Directory
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col">
          {children}
        </main>

        {/* Trust Footer */}
        <footer className="border-t border-border bg-card/20 py-12 px-6">
          <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 text-sm">
            
            {/* Column 1: Brand & Security Reassurance */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-md bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs">
                  T
                </div>
                <span className="font-bold text-white tracking-tight">Toolchi</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Toolchi runs entirely in your web browser. All file merges, conversions, text modifications, and data encodings happen locally. No data leaves your device.
              </p>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-semibold w-fit border border-emerald-500/20">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                100% Local Processing
              </div>
            </div>

            {/* Column 2: Categories */}
            <div className="flex flex-col gap-3">
              <span className="font-bold text-white uppercase text-xs tracking-wider">Tool Categories</span>
              <ul className="space-y-2 text-xs text-muted-foreground font-medium">
                <li><Link href="/#pdf" className="hover:text-foreground transition-colors">PDF Merging & Compacting</Link></li>
                <li><Link href="/#text" className="hover:text-foreground transition-colors">Casing & Word Counters</Link></li>
                <li><Link href="/#dev" className="hover:text-foreground transition-colors">JSON & Developer Utilities</Link></li>
                <li><Link href="/#color" className="hover:text-foreground transition-colors">Color Format Translators</Link></li>
              </ul>
            </div>

            {/* Column 3: Trust & Company */}
            <div className="flex flex-col gap-3">
              <span className="font-bold text-white uppercase text-xs tracking-wider">Privacy & Trust</span>
              <ul className="space-y-2 text-xs text-muted-foreground font-medium">
                <li><Link href="/#about" className="hover:text-foreground transition-colors">Our Privacy Promise</Link></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Security Disclosures</a></li>
              </ul>
            </div>

            {/* Column 4: Quick Links */}
            <div className="flex flex-col gap-3">
              <span className="font-bold text-white uppercase text-xs tracking-wider">Site Directory</span>
              <ul className="space-y-2 text-xs text-muted-foreground font-medium">
                <li><Link href="/tools" className="hover:text-foreground transition-colors">All 25+ Tools Directory</Link></li>
                <li><Link href="/sitemap.xml" className="hover:text-foreground transition-colors">XML Sitemap</Link></li>
                <li><a href="mailto:support@toolchi.online" className="hover:text-foreground transition-colors">Contact Support</a></li>
              </ul>
            </div>

          </div>

          <div className="mx-auto max-w-7xl border-t border-border/60 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground gap-4">
            <p>© {new Date().getFullYear()} Toolchi. Runs entirely inside your browser. No files are stored.</p>
            <div className="flex gap-4">
              <span>Security Rating: SSL Certified</span>
              <span>•</span>
              <span>Version 2.0 (Next.js SEO Edition)</span>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}
