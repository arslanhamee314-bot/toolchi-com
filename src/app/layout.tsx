import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Toolchi - Free Online Web & Developer Tools Directory",
  description: "Explore Toolchi's complete all-in-one suite of free online web, developer, PDF, and productivity tools. 100% secure, local, and private.",
  metadataBase: new URL("https://toolchi.online"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/logo.jpg",
    shortcut: "/logo.jpg",
    apple: "/logo.jpg",
  },
  openGraph: {
    title: "Toolchi - Free Online Web & Developer Tools Directory",
    description: "Explore Toolchi's complete all-in-one suite of free online web, developer, PDF, and productivity tools. 100% secure, local, and private.",
    url: "/",
    siteName: "Toolchi",
    locale: "en_US",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts Inter for Toolchi design accuracy */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
              <body className="antialiased min-h-screen flex flex-col bg-[#f6f7fb] dark:bg-[#11141c] text-black dark:text-white">
        
        {/* Header Navigation */}
        <Header />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col">
          {children}
        </main>

        {/* Trust Footer */}
        <footer className="border-t border-border bg-white dark:bg-card py-8 px-6 print:hidden">
          <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-4 select-none">
            <p>© {new Date().getFullYear()} Toolchi. All-in-one free online tools. All processing occurs locally.</p>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:underline hover:text-foreground">Privacy Policy</Link>
              <Link href="/terms" className="hover:underline hover:text-foreground">Terms of Use</Link>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}
