"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Sparkles, Combine, ShieldAlert } from "lucide-react";

interface SlideItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  bgGradient: string;
  icon: React.ReactNode;
}

export default function ToolsSlider() {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides: SlideItem[] = [
    {
      id: 1,
      title: "Consolidate Reports",
      subtitle: "Secure PDF Merging",
      description: "Combine multiple PDF documents into a single organized file entirely inside your browser. No files are uploaded to any server.",
      ctaText: "Merge PDFs Now",
      ctaLink: "/tools/merge-pdf",
      bgGradient: "from-violet-500/10 to-indigo-500/5 dark:from-violet-500/20 dark:to-indigo-500/5",
      icon: <Combine className="h-10 w-10 text-violet-500 dark:text-violet-400" />
    },
    {
      id: 2,
      title: "Validate API Payloads",
      subtitle: "JSON Formatter & Linter",
      description: "Format, validate, and minify nested JSON structures. Identify parse failures on-the-fly using our local client-side interpreter.",
      ctaText: "Format JSON",
      ctaLink: "/tools/json-formatter",
      bgGradient: "from-blue-500/10 to-indigo-500/5 dark:from-blue-500/20 dark:to-indigo-500/5",
      icon: <Sparkles className="h-10 w-10 text-blue-500 dark:text-blue-400" />
    },
    {
      id: 3,
      title: "100% Client-Side Processing",
      subtitle: "Uncompromising Privacy",
      description: "All file conversions, text formatting, and cryptographic hashes occur locally in your tab memory. No transactions leave your machine.",
      ctaText: "Read Our Promise",
      ctaLink: "#about",
      bgGradient: "from-emerald-500/10 to-indigo-500/5 dark:from-emerald-500/20 dark:to-indigo-500/5",
      icon: <ShieldAlert className="h-10 w-10 text-emerald-500 dark:text-emerald-400" />
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-3xl border border-border glass bg-card/25 shadow-xl group">
      
      {/* Slides Container */}
      <div 
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${activeSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div 
            key={slide.id} 
            className={`w-full shrink-0 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 bg-gradient-to-tr ${slide.bgGradient}`}
          >
            <div className="flex-1 flex flex-col gap-3.5 items-start">
              <span className="text-3xs font-extrabold text-primary uppercase tracking-wider bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-md">
                {slide.subtitle}
              </span>
              <h2 className="text-xl md:text-3xl font-extrabold text-foreground tracking-tight leading-none">
                {slide.title}
              </h2>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed max-w-xl">
                {slide.description}
              </p>
              <Link 
                href={slide.ctaLink}
                className="mt-2 px-5 py-2.5 text-xs font-bold bg-primary text-primary-foreground rounded-xl hover:scale-105 active:scale-95 transition-all shadow-md shadow-primary/15"
              >
                {slide.ctaText} →
              </Link>
            </div>

            <div className="h-24 w-24 shrink-0 rounded-2xl bg-card border border-border/80 flex items-center justify-center shadow-inner">
              {slide.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Slide Navigation Arrows */}
      <button 
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-card/80 hover:bg-card border border-border text-muted-foreground hover:text-foreground rounded-xl shadow-md transition-colors z-20 cursor-pointer"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button 
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-card/80 hover:bg-card border border-border text-muted-foreground hover:text-foreground rounded-xl shadow-md transition-colors z-20 cursor-pointer"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      {/* Indicator Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveSlide(i)}
            className={`h-1.5 rounded-full transition-all cursor-pointer ${
              activeSlide === i ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/45"
            }`}
          />
        ))}
      </div>

    </div>
  );
}
