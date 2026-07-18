import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { InteractionProvider } from "@/components/ui/InteractionProvider";
import CustomCursor from "@/components/ui/CustomCursor";
import CommandPalette from "@/components/workspace/CommandPalette";
import KeyboardShortcutsModal from "@/components/workspace/KeyboardShortcutsModal";
import { ToastProvider } from "@/components/workspace/ToastProvider";
import RouteProgress from "@/components/tools/RouteProgress";
import { Suspense } from "react";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Toolchi - Free Online Web & Developer Tools Directory",
  description: "Explore Toolchi's complete all-in-one suite of free online web, developer, PDF, and productivity tools. 100% secure, local, and private.",
  metadataBase: new URL("https://toolchi.online"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
      "en-GB": "/?locale=en-gb",
      "en-CA": "/?locale=en-ca",
      "en-AU": "/?locale=en-au",
      "en-IN": "/?locale=en-in",
    }
  },
  openGraph: {
    title: "Toolchi - Free Online Web & Developer Tools Directory",
    description: "Explore Toolchi's complete all-in-one suite of free online web, developer, PDF, and productivity tools. 100% secure, local, and private.",
    url: "https://toolchi.online",
    siteName: "Toolchi",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/logo.jpg",
        width: 800,
        height: 800,
        alt: "Toolchi Logo",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Toolchi - Free Online Web & Developer Tools Directory",
    description: "Explore Toolchi's complete all-in-one suite of free online web, developer, PDF, and productivity tools. 100% secure, local, and private.",
    images: ["/logo.jpg"],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Toolchi",
    url: "https://toolchi.online",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://toolchi.online/tools?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Toolchi",
    url: "https://toolchi.online",
    logo: "https://toolchi.online/favicon.ico",
  };

  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased min-h-screen flex flex-col bg-[#f6f7fb] dark:bg-[#11141c] text-black dark:text-white">
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }} 
        />
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} 
        />
        <InteractionProvider>
          {/* Custom Cursor layer for desktop users */}
          <CustomCursor />

          <Suspense fallback={null}>
            <RouteProgress />
          </Suspense>

          {/* Global Command Palette — Ctrl+K / Cmd+K */}
          <CommandPalette />

          {/* Global Keyboard Shortcuts Modal — Press '?' */}
          <KeyboardShortcutsModal />

          {/* Google Analytics (GA4) Tag */}
          {process.env.NEXT_PUBLIC_GA_ID && (
            <>
              <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
                strategy="afterInteractive"
              />
              <Script id="google-analytics" strategy="afterInteractive">
                {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `}
              </Script>
            </>
          )}

          {/* Google AdSense Script */}
          {process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID && (
            <Script
              async
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`}
              crossOrigin="anonymous"
              strategy="lazyOnload"
            />
          )}

          {/* Header Navigation */}
          <Header />

          {/* Main Content Area */}
          <ToastProvider>
            <main className="flex-1 flex flex-col">
              {children}
            </main>
          </ToastProvider>

          {/* Trust Footer */}
          <footer className="border-t border-border bg-white dark:bg-[#151923] py-12 px-6 print:hidden mt-auto">
            <div className="mx-auto max-w-6xl flex flex-col gap-10">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                
                {/* Column 1: Brand Info */}
                <div className="md:col-span-4 space-y-4 text-left">
                  <Link href="/" className="flex items-center gap-2.5 group select-none">
                    <Image 
                      src="/logo.jpg" 
                      alt="Toolchi Logo" 
                      width={36}
                      height={36}
                      className="rounded-lg border border-border shadow-xs group-hover:scale-105 transition-transform" 
                    />
                    <span className="font-extrabold text-sm text-[#20242d] dark:text-[#f6f7fb] tracking-tight">Toolchi</span>
                  </Link>
                  <p className="text-3xs sm:text-2xs text-muted-foreground leading-relaxed">
                    Toolchi is a privacy-first, 100% serverless browser tools dashboard. All processing runs locally on your browser.
                  </p>
                  {/* Social Links */}
                  <div className="flex items-center gap-3 pt-1">
                    <a href="https://github.com/arslanhamee314-bot" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-neutral-50 hover:bg-neutral-100 dark:bg-card dark:hover:bg-neutral-800 border border-border text-muted-foreground hover:text-foreground transition-all cursor-pointer">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" clipRule="evenodd" /></svg>
                    </a>
                  </div>
                </div>

                {/* Column 2: Tools Links */}
                <div className="md:col-span-3 space-y-3 text-left">
                  <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-foreground">Suite Utilities</h4>
                  <ul className="space-y-2 text-3xs sm:text-2xs font-semibold">
                    <li><Link href="/tools/compress-image" className="text-muted-foreground hover:text-primary transition-colors">Image Compressor</Link></li>
                    <li><Link href="/tools/merge-pdf" className="text-muted-foreground hover:text-primary transition-colors">Merge PDF Documents</Link></li>
                    <li><Link href="/tools/json-formatter" className="text-muted-foreground hover:text-primary transition-colors">JSON Code Formatter</Link></li>
                    <li><Link href="/tools/ai-detector" className="text-muted-foreground hover:text-primary transition-colors">AI Writing Detector</Link></li>
                  </ul>
                </div>

                {/* Column 3: Company */}
                <div className="md:col-span-2 space-y-3 text-left">
                  <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-foreground">Resources</h4>
                  <ul className="space-y-2 text-3xs sm:text-2xs font-semibold">
                    <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
                    <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
                    <li><Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog Insights</Link></li>
                    <li><Link href="/pricing" className="text-muted-foreground hover:text-primary transition-colors">Pro Pricing</Link></li>
                  </ul>
                </div>

                {/* Column 4: Newsletter */}
                <div className="md:col-span-3 space-y-3 text-left">
                  <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-foreground">Weekly Updates</h4>
                  <p className="text-3xs text-muted-foreground leading-relaxed">
                    Get free developer guides and security audit tips in your inbox.
                  </p>
                  <div className="flex gap-2">
                    <input 
                      type="email" 
                      placeholder="Email address..." 
                      className="px-3 py-2 text-3xs bg-neutral-50 dark:bg-card border border-border rounded-xl focus:outline-hidden text-foreground w-full placeholder:text-muted-foreground/60"
                    />
                    <button 
                      type="button"
                      className="px-3.5 py-2 bg-primary hover:bg-[#6530ef] text-white text-3xs font-extrabold rounded-xl transition-all cursor-pointer shadow-xs active:scale-95 shrink-0"
                    >
                      Join
                    </button>
                  </div>
                </div>

              </div>

              {/* Lower Section */}
              <div className="border-t border-border/40 pt-6 flex flex-col sm:flex-row items-center justify-between text-3xs text-muted-foreground gap-4">
                <p>&copy; {new Date().getFullYear()} Toolchi. All rights reserved. Locally executed.</p>
                <div className="flex gap-4 font-semibold">
                  <Link href="/privacy" className="hover:underline hover:text-foreground">Privacy Policy</Link>
                  <Link href="/terms" className="hover:underline hover:text-foreground">Terms of Use</Link>
                </div>
              </div>

            </div>
          </footer>
        </InteractionProvider>

      </body>
    </html>
  );
}
