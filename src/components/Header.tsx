"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { getDictionary } from "@/i18n/dictionary";

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "ur", name: "اردو" },
  { code: "tr", name: "Türkçe" }
];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  // Detect locale
  const locale = pathname.startsWith("/ur") ? "ur" : pathname.startsWith("/tr") ? "tr" : "en";
  const dict = getDictionary(locale);
  const isRtl = locale === "ur";

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setLangDropdownOpen(false);
  };

  // Rewrite paths on locale switch
  const handleLocaleChange = (targetLang: string) => {
    setLangDropdownOpen(false);
    setIsMenuOpen(false);
    if (targetLang === locale) return;

    // Strip current locale prefix
    let stripped = pathname;
    if (pathname.startsWith("/ur")) {
      stripped = pathname.replace(/^\/ur/, "") || "/";
    } else if (pathname.startsWith("/tr")) {
      stripped = pathname.replace(/^\/tr/, "") || "/";
    }

    if (!stripped.startsWith("/")) {
      stripped = "/" + stripped;
    }

    // Build target path
    const targetPath = targetLang === "en" ? stripped : `/${targetLang}${stripped}`;
    router.push(targetPath);
  };

  const getLocalizedLink = (href: string) => {
    if (locale === "en") return href;
    return `/${locale}${href}`;
  };

  return (
    <header className="sticky top-4 z-40 max-w-6xl mx-auto w-[calc(100%-2rem)] rounded-2xl border border-border/80 bg-white/40 dark:bg-[#151923]/40 backdrop-blur-md shadow-xs transition-all duration-300 print:hidden">
      <div className={`flex items-center justify-between px-6 py-3.5 ${isRtl ? "flex-row-reverse" : ""}`}>
        
        {/* Logo/Brand link */}
        <Link href={getLocalizedLink("/")} onClick={closeMenu} className={`flex items-center gap-2.5 group select-none shrink-0 ${isRtl ? "flex-row-reverse" : ""}`}>
          <Image 
            src="/logo.jpg" 
            alt="Toolchi Logo" 
            width={40}
            height={40}
            className="rounded-lg border border-border/80 shadow-xs group-hover:scale-105 transition-transform" 
          />
          <span className="font-extrabold text-base text-[#20242d] dark:text-[#f6f7fb] tracking-tight">Toolchi</span>
        </Link>


        {/* Right side container holding both Nav and Controls */}
        <div className={`hidden md:flex items-center gap-6 ${isRtl ? "mr-auto ml-0 flex-row-reverse" : "ml-auto"}`}>
          {/* Navigation links (Desktop) */}
          <nav className={`flex items-center gap-6 text-xs font-bold text-[#363c48] dark:text-[#a0a8b9] ${isRtl ? "flex-row-reverse" : ""}`}>
            <Link href={getLocalizedLink("/")} className="hover:text-[#7d4dff] transition-colors">{dict.common.home}</Link>
            <Link href={getLocalizedLink("/tools")} className="hover:text-[#7d4dff] transition-colors">{dict.common.tools}</Link>
            <Link href={getLocalizedLink("/workspace")} className="flex items-center gap-1 text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-xl hover:bg-primary/15 transition-colors">{dict.common.workspace} ✨</Link>
            <Link href={getLocalizedLink("/blog")} className="hover:text-[#7d4dff] transition-colors">{dict.common.blog}</Link>
            <Link href={getLocalizedLink("/pricing")} className="hover:text-[#7d4dff] transition-colors">{dict.common.pricing}</Link>
            <Link href="/developers" className="hover:text-[#7d4dff] transition-colors">Developers</Link>
          </nav>


          <div className="flex items-center gap-3">
            {/* Language Switcher Dropdown (Desktop) */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen((v) => !v)}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-border bg-white dark:bg-card hover:bg-neutral-50 dark:hover:bg-neutral-900 text-foreground text-xs font-semibold rounded-xl cursor-pointer transition-colors active:scale-95"
              >
                <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="capitalize">{LANGUAGES.find(l => l.code === locale)?.name}</span>
                <ChevronDown className="h-3 w-3 text-muted-foreground" />
              </button>

              {langDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setLangDropdownOpen(false)} />
                  <div className={`absolute top-full mt-2 w-32 bg-white dark:bg-card border border-border rounded-xl shadow-xl py-1 z-20 ${isRtl ? "left-0" : "right-0"}`}>
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLocaleChange(lang.code)}
                        className={`w-full px-4 py-2 text-left text-xs font-semibold hover:bg-neutral-50 dark:hover:bg-[#1a1f2e] cursor-pointer ${
                          lang.code === locale ? "text-primary bg-primary/5" : "text-foreground"
                        }`}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Controls Row (Hamburger + ThemeToggle) */}
        <div className={`flex md:hidden items-center gap-2 ${isRtl ? "flex-row-reverse" : ""}`}>
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
        <div className="md:hidden border-t border-border bg-white/97 dark:bg-[#151923]/97 backdrop-blur-lg animate-in slide-in-from-top-4 duration-200">
          <div className="px-6 py-6 flex flex-col gap-5">
            {/* Mobile Nav Links */}
            <nav className={`flex flex-col gap-3 text-xs font-bold text-[#363c48] dark:text-[#a0a8b9] ${isRtl ? "text-right" : "text-left"}`}>
              <Link href={getLocalizedLink("/")} onClick={closeMenu} className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg hover:text-[#7d4dff] transition-colors">
                {dict.common.home}
              </Link>
              <Link href={getLocalizedLink("/tools")} onClick={closeMenu} className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg hover:text-[#7d4dff] transition-colors">
                {dict.common.tools}
              </Link>
              <Link href={getLocalizedLink("/workspace")} onClick={closeMenu} className="p-2 bg-primary/10 text-primary border border-primary/20 rounded-lg hover:bg-primary/15 transition-colors">
                {dict.common.workspace} ✨
              </Link>
              <Link href={getLocalizedLink("/blog")} onClick={closeMenu} className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg hover:text-[#7d4dff] transition-colors">
                {dict.common.blog}
              </Link>
              <Link href={getLocalizedLink("/pricing")} onClick={closeMenu} className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg hover:text-[#7d4dff] transition-colors">
                {dict.common.pricing}
              </Link>
              <Link href="/developers" onClick={closeMenu} className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg hover:text-[#7d4dff] transition-colors">
                Developers
              </Link>
            </nav>


            {/* Mobile Language Switcher Section */}
            <div className="border-t border-border/40 pt-4">
              <span className="text-[9px] font-extrabold text-muted-foreground uppercase tracking-wider block mb-2.5">Select Language</span>
              <div className="grid grid-cols-3 gap-2">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLocaleChange(lang.code)}
                    className={`py-2 text-[10px] font-bold rounded-xl border text-center transition-all cursor-pointer ${
                      lang.code === locale
                        ? "bg-primary text-white border-primary"
                        : "bg-neutral-50 dark:bg-card border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>

  );
}

