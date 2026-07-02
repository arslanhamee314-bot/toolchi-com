import React from "react";
import { Shield, Sparkles, Cpu, Lock, CheckCircle } from "lucide-react";
import ToolsDirectory from "@/components/tools/ToolsDirectory";
import ToolsSlider from "@/components/tools/ToolsSlider";

// Page level metadata for homepage (pre-rendered for Google)
export const metadata = {
  title: "Toolchi — 100% Client-Side Web Utilities & PDF tools",
  description: "Toolchi: all-in-one browser tools for text, developer, PDF, image, color, math, and business — 100% client-side. Fast, private, secure.",
};

export default function HomePage() {
  return (
    <div className="flex-1 flex flex-col py-12 md:py-20 px-4 sm:px-6 relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full z-10 flex flex-col gap-16">
        
        {/* 1. Hero Brand Panel */}
        <section className="text-center max-w-3xl mx-auto flex flex-col items-center gap-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-[10px] font-bold uppercase tracking-wider text-primary border border-primary/20 bg-primary/5">
            <Sparkles className="h-3.5 w-3.5" /> 100% Private Browser Utilities
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-clip-text text-neutral-900 dark:text-neutral-100 leading-none">
            Every utility you use,<br />
            <span className="bg-clip-text text-linear-to-r from-primary via-indigo-400 to-purple-500">
              in one secure place
            </span>
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
            Text transformations, JSON formatting, local PDF merging, color system conversions, and math calculators. All processed on your device.
          </p>
        </section>

        {/* 1.5 Highlights Slideshow */}
        <section className="relative w-full z-20 animate-in fade-in slide-in-from-bottom-3 duration-500">
          <ToolsSlider />
        </section>

        {/* 2. Tools Directory Component (Filtered Cards & Search) */}
        <section className="relative">
          <ToolsDirectory />
        </section>

        {/* 3. E-E-A-T Trust Promise (#about) */}
        <section id="about" className="glass rounded-3xl border p-6 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8 scroll-mt-24">
          <div className="flex flex-col gap-5 justify-center">
            <div className="h-10 w-10 bg-primary/10 text-primary border border-primary/20 rounded-xl flex items-center justify-center">
              <Shield className="h-5 w-5" />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight leading-tight">
              Our Zero-Data <br />
              <span className="text-primary">Privacy Promise</span>
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
              Unlike traditional utility sites that upload your PDFs, images, and texts to cloud storage buckets, Toolchi processes **everything locally** using client-side JavaScript. 
            </p>
            <ul className="flex flex-col gap-3 text-xs text-muted-foreground font-semibold">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" /> No files ever leave your local computer
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" /> Zero database tracking of input texts or transactions
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" /> Fully compatible with secure, offline environments
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-card border border-border/80 flex flex-col gap-3">
              <Lock className="h-5 w-5 text-indigo-400" />
              <h4 className="font-bold text-sm text-foreground">Browser Processing</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                By loading compiled JS bundles into your viewport memory, Toolchi operations are executed sandbox-style within your browser.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-card border border-border/80 flex flex-col gap-3">
              <Cpu className="h-5 w-5 text-purple-400" />
              <h4 className="font-bold text-sm text-foreground">Wasm & Canvas</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Complex PDF merges or image conversions leverage WebAssembly code layers and HTML5 canvases, maintaining processing speed.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Platform FAQs Hub */}
        <section className="flex flex-col gap-6">
          <div className="text-center max-w-xl mx-auto flex flex-col gap-2">
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground">Frequently Asked Questions</h2>
            <p className="text-xs text-muted-foreground">General information regarding how the Toolchi platform processes browser utilities.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm max-w-4xl mx-auto w-full">
            <div className="glass p-6 rounded-2xl border flex flex-col gap-2">
              <h4 className="font-bold text-foreground text-xs md:text-sm">How can Toolchi modify PDFs without uploading them?</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                We load client-side libraries (like `pdf-lib`) directly into your browser tab. When you drag and drop your PDFs to merge or split them, the JavaScript interpreter compiles the PDF streams natively in RAM, producing an instant download link.
              </p>
            </div>

            <div className="glass p-6 rounded-2xl border flex flex-col gap-2">
              <h4 className="font-bold text-foreground text-xs md:text-sm">Does the tool work offline?</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Yes! Once the webpage is loaded initially, all computations (casing transforms, formatting, conversions) work completely offline since they require no external APIs or network calls.
              </p>
            </div>

            <div className="glass p-6 rounded-2xl border flex flex-col gap-2">
              <h4 className="font-bold text-foreground text-xs md:text-sm">Are there any file count or upload limit caps?</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Since we do not host or store your assets on remote hardware servers, there are no artificial pricing plans or upload caps. Your limits are only bounded by your local computer's processor speed and available memory.
              </p>
            </div>

            <div className="glass p-6 rounded-2xl border flex flex-col gap-2">
              <h4 className="font-bold text-foreground text-xs md:text-sm">How can I suggest new browser utilities?</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                We are actively expanding our tools directory! If you need developer, text, math, or PDF utilities added to our list, reach out to our support channel via `support@toolchi.online`.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
