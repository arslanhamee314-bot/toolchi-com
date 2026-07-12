import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Link from "next/link";
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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
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
          <footer className="border-t border-border bg-white dark:bg-card py-8 px-6 print:hidden">
            <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-4 select-none">
              <p>&copy; {new Date().getFullYear()} Toolchi. All-in-one free online tools. All processing occurs locally.</p>
              <div className="flex gap-4 flex-wrap justify-center sm:justify-start">
                <Link href="/about" className="hover:underline hover:text-foreground">About Us</Link>
                <Link href="/contact" className="hover:underline hover:text-foreground">Contact Us</Link>
                <Link href="/privacy" className="hover:underline hover:text-foreground">Privacy Policy</Link>
                <Link href="/terms" className="hover:underline hover:text-foreground">Terms of Use</Link>
              </div>
            </div>
          </footer>
        </InteractionProvider>
      </body>
    </html>
  );
}
