"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, Search } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleSearchSubmit = (val: string) => {
    if (!val.trim()) {
      router.push("/");
    } else {
      router.push(`/?search=${encodeURIComponent(val)}`);
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/90 dark:bg-card/90 backdrop-blur-md print:hidden">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
        
        {/* Logo/Brand link */}
        <Link href="/" onClick={closeMenu} className="flex items-center gap-2.5 group select-none shrink-0">
          <img 
            src="/logo.jpg" 
            alt="Toolchi Logo" 
            className="h-10 w-10 rounded-lg border border-border/80 shadow-xs group-hover:scale-105 transition-transform" 
          />
          <span className="font-extrabold text-base text-[#20242d] dark:text-[#f6f7fb] tracking-tight">Toolchi</span>
        </Link>

        {/* Right side container holding both Nav and Controls */}
        <div className="hidden md:flex items-center gap-8 ml-auto">
          {/* Navigation links (Desktop) */}
          <nav className="flex items-center gap-6 text-xs font-bold text-[#363c48] dark:text-[#a0a8b9]">
            <Link href="/" className="hover:text-[#7d4dff] transition-colors">Home</Link>
            <Link href="/tools" className="hover:text-[#7d4dff] transition-colors">Tools</Link>
            <Link href="/#categories" className="hover:text-[#7d4dff] transition-colors">Categories</Link>
            <Link href="/#popular-tools" className="hover:text-[#7d4dff] transition-colors">Popular</Link>
            <Link href="/#recent-tools" className="hover:text-[#7d4dff] transition-colors">New</Link>
            <Link href="/blog" className="hover:text-[#7d4dff] transition-colors">Blogs</Link>
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit(searchVal)}
              className="hidden lg:block w-36 px-3 py-1.5 text-xs bg-neutral-100 dark:bg-neutral-800 border border-border rounded-lg outline-none focus:border-primary/50 text-foreground"
            />
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Controls Row (Hamburger + ThemeToggle) */}
        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />
          <button
            onClick={toggleMenu}
            className="p-2 border border-border bg-white dark:bg-card hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-all duration-200 cursor-pointer text-muted hover:text-foreground shrink-0 active:scale-95"
            aria-label="Toggle Navigation Menu"
          >
            {isMenuOpen ? <X className="h-4.5 w-4.5 text-primary" /> : <Menu className="h-4.5 w-4.5 text-foreground" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Sidebar Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-white/95 dark:bg-card/95 backdrop-blur-lg animate-in slide-in-from-top-4 duration-200">
          <div className="px-6 py-6 flex flex-col gap-5">
            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="Search tools..." 
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit(searchVal)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-neutral-100 dark:bg-neutral-800 border border-border rounded-xl outline-none focus:border-primary/50 text-foreground"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            </div>

            {/* Mobile Nav Links */}
            <nav className="flex flex-col gap-3.5 text-xs font-bold text-[#363c48] dark:text-[#a0a8b9]">
              <Link href="/" onClick={closeMenu} className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg hover:text-[#7d4dff] transition-colors">
                Home
              </Link>
              <Link href="/tools" onClick={closeMenu} className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg hover:text-[#7d4dff] transition-colors">
                Tools
              </Link>
              <Link href="/#categories" onClick={closeMenu} className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg hover:text-[#7d4dff] transition-colors">
                Categories
              </Link>
              <Link href="/#popular-tools" onClick={closeMenu} className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg hover:text-[#7d4dff] transition-colors">
                Popular Tools
              </Link>
              <Link href="/#recent-tools" onClick={closeMenu} className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg hover:text-[#7d4dff] transition-colors">
                New Releases
              </Link>
              <Link href="/blog" onClick={closeMenu} className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg hover:text-[#7d4dff] transition-colors">
                Blogs
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
