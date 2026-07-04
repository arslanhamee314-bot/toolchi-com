import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Toolchi Web Tools Directory – Recreated Structure",
  description: "Effective (Free) Tools to Help You Manage and Improve Your Website. 100% client-side web master, performance, and operational tools.",
  metadataBase: new URL("https://www.toolchi.online"),
  alternates: {
    canonical: "/webtools/",
  },
  openGraph: {
    title: "Toolchi Web Tools Directory – Recreated Structure",
    description: "Effective (Free) Tools to Help You Manage and Improve Your Website. 100% client-side web master, performance, and operational tools.",
    url: "/webtools/",
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
      <body className="antialiased min-h-screen flex flex-col bg-[#f6f7fb] dark:bg-[#11141c] text-foreground">
        
        {/* Header Navigation */}
        <header className="sticky top-0 z-40 border-b border-border bg-white/90 dark:bg-card/90 backdrop-blur-md">
          <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
            
            {/* Logo/Brand link */}
            <Link href="/" className="flex items-center gap-2.5 group select-none shrink-0">
              <img 
                src="/logo.jpg" 
                alt="Toolchi Logo" 
                className="h-7 w-7 rounded-lg border border-border/80 shadow-xs group-hover:scale-105 transition-transform" 
              />
              <span className="font-extrabold text-base text-[#20242d] dark:text-[#f6f7fb] tracking-tight">Toolchi</span>
            </Link>

            {/* Navigation links */}
            <nav className="hidden md:flex items-center gap-5 text-sm font-semibold text-[#363c48] dark:text-[#a0a8b9]">
              <Link href="/" className="hover:text-foreground transition-colors">Guides</Link>
              <Link href="/" className="hover:text-foreground transition-colors">Reviews</Link>
              <Link href="/" className="flex items-center hover:text-foreground transition-colors">
                Coupons 
                <span className="bg-[#7d4dff] text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full ml-1 shrink-0">
                  99+
                </span>
              </Link>
              <Link href="/tools" className="text-[#7d4dff] hover:text-[#6530ef] transition-colors">Tools</Link>
              <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
            </nav>

            {/* Header actions */}
            <div className="flex items-center gap-3 shrink-0">
              <input 
                type="text" 
                placeholder="Search..." 
                className="hidden lg:block w-36 px-3 py-1.5 text-xs bg-neutral-100 dark:bg-neutral-800 border border-border rounded-lg outline-none focus:border-primary/50 text-foreground"
              />
              <button className="locale-btn">US$</button>
              <button className="locale-btn">EN</button>
            </div>

          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col">
          {children}
        </main>

        {/* Trust Footer */}
        <footer className="border-t border-border bg-white dark:bg-card py-8 px-6">
          <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between text-xs text-muted gap-4">
            <p>Recreated structural reference based on the visible page design.</p>
            <p>
              Source:{" "}
              <a 
                href="https://www.toolchi.online/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="underline hover:text-foreground"
              >
                toolchi.online
              </a>
            </p>
          </div>
        </footer>

      </body>
    </html>
  );
}
