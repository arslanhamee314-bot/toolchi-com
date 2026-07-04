import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Toolchi Web Tools Directory – Recreated Structure",
  description: "Effective (Free) Tools to Help You Manage and Improve Your Website. 100% client-side web master, performance, and operational tools.",
  metadataBase: new URL("https://www.toolchi.online"),
  alternates: {
    canonical: "/webtools/",
  },
  icons: {
    icon: "/logo.jpg",
    shortcut: "/logo.jpg",
    apple: "/logo.jpg",
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
              <body className="antialiased min-h-screen flex flex-col bg-[#f6f7fb] dark:bg-[#11141c] text-black dark:text-white">
        
        {/* Header Navigation */}
        <Header />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col">
          {children}
        </main>

        {/* Trust Footer */}
        <footer className="border-t border-border bg-white dark:bg-card py-8 px-6 print:hidden">
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
