"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Upload, Play, Download, Terminal } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface ToolItem {
  slug: string;
  name: string;
  category: string;
  shortDesc: string;
  iconName: string;
  longDesc: string;
  howToUse: string[];
  faqs: FAQItem[];
}

interface TutorialGalleryProps {
  tool: ToolItem;
}

export default function TutorialGallery({ tool }: TutorialGalleryProps) {
  const [activeStep, setActiveStep] = useState(0);
  const steps = tool.howToUse;

  if (!steps || steps.length === 0) return null;

  const nextStep = () => {
    setActiveStep((prev) => (prev + 1) % steps.length);
  };

  const prevStep = () => {
    setActiveStep((prev) => (prev - 1 + steps.length) % steps.length);
  };

  // Render a simulated visual mockup representing the current step's action
  const renderStepMockup = (index: number) => {
    const stepNumber = index + 1;
    const isFirst = stepNumber === 1;
    const isLast = stepNumber === steps.length;
    const isMiddle = !isFirst && !isLast;

    return (
      <div className="w-full h-[220px] rounded-2xl bg-neutral-900 border border-border/80 flex flex-col overflow-hidden relative shadow-inner">
        {/* Browser Top Bar */}
        <div className="h-7 bg-neutral-950 border-b border-border/60 flex items-center px-4 gap-1.5 shrink-0 justify-between">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-red-500/80"></span>
            <span className="h-2 w-2 rounded-full bg-yellow-500/80"></span>
            <span className="h-2 w-2 rounded-full bg-green-500/80"></span>
          </div>
          <div className="flex items-center gap-1 px-3 py-0.5 rounded bg-neutral-900 border border-border/20 text-[9px] text-muted-foreground w-40 justify-center">
            <Terminal className="h-2.5 w-2.5" /> toolchi.online/sandbox
          </div>
          <div className="w-10"></div>
        </div>

        {/* Browser Page Body Simulator */}
        <div className="flex-1 p-5 flex flex-col items-center justify-center bg-radial from-neutral-900 to-neutral-950 text-white relative">
          
          {/* STEP 1: Upload / Input Interface Simulator */}
          {isFirst && (
            <div className="w-full max-w-[280px] border border-dashed border-primary/50 bg-primary/5 rounded-xl p-4 flex flex-col items-center justify-center gap-2 text-center animate-pulse">
              <div className="h-8 w-8 bg-primary/20 text-primary border border-primary/30 rounded-lg flex items-center justify-center animate-bounce">
                <Upload className="h-4 w-4" />
              </div>
              <div className="space-y-1">
                <div className="h-2 w-24 bg-primary/30 rounded mx-auto"></div>
                <div className="h-1.5 w-32 bg-primary/20 rounded mx-auto"></div>
              </div>
              <span className="text-[9px] font-bold text-primary mt-1 border border-primary/30 px-2 py-0.5 rounded-full bg-primary/10">
                DROP FILE HERE
              </span>
            </div>
          )}

          {/* STEP 2: Active Processing Simulator */}
          {isMiddle && (
            <div className="w-full max-w-[280px] bg-card border border-border rounded-xl p-4 flex flex-col gap-2.5">
              <div className="space-y-1.5">
                <div className="h-2 w-2/3 bg-neutral-800 rounded"></div>
                <div className="h-2 w-full bg-neutral-800 rounded"></div>
              </div>
              <div className="h-8 w-full bg-primary/95 text-primary-foreground font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 shadow-md shadow-primary/25 cursor-pointer relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                <Play className="h-3 w-3 fill-current" /> CLICK TO GENERATE
              </div>
              <div className="flex justify-between items-center text-[9px] text-muted-foreground pt-1 border-t border-border/20">
                <span>Secure local compile</span>
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
              </div>
            </div>
          )}

          {/* STEP 3: Complete & Download Simulator */}
          {isLast && (
            <div className="w-full max-w-[280px] bg-emerald-950/20 border border-emerald-500/40 rounded-xl p-5 flex flex-col items-center justify-center gap-3 text-center">
              <div className="h-10 w-10 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center animate-bounce">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M20 6 9 17l-5-5"/></svg>
              </div>
              <div className="space-y-1">
                <h4 className="text-2xs font-extrabold text-emerald-400 uppercase tracking-wider">Conversion Successful</h4>
                <p className="text-[10px] text-muted-foreground">Ready to download locally</p>
              </div>
              <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-3xs rounded-full flex items-center gap-1 shadow-md shadow-emerald-500/20 cursor-pointer">
                <Download className="h-3.5 w-3.5" /> DOWNLOAD FILE
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="border border-border/60 bg-white/40 dark:bg-card/25 rounded-2xl p-5 flex flex-col gap-5 w-full relative overflow-hidden">
      <div className="absolute top-0 right-0 p-3 flex gap-2 pointer-events-none">
        <span className="inline-flex items-center gap-1 text-[9px] font-extrabold text-primary bg-primary/5 border border-primary/15 px-2 py-0.5 rounded-md uppercase tracking-wider">
          Visual Walkthrough
        </span>
      </div>

      <div className="flex flex-col gap-1.5">
        <h3 className="text-sm font-extrabold text-foreground tracking-tight">Interactive Usage Guide</h3>
        <p className="text-3xs text-muted-foreground uppercase tracking-wider">Step-by-step interactive mockup tutorial</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
        {/* Step Guide Text Details */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="h-5 w-5 bg-primary text-primary-foreground font-bold text-3xs rounded-full flex items-center justify-center shrink-0">
              {activeStep + 1}
            </span>
            <span className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-widest">
              Step {activeStep + 1} of {steps.length}
            </span>
          </div>

          <p className="text-xs md:text-sm text-foreground font-semibold leading-relaxed min-h-[50px] animate-in fade-in slide-in-from-left-2 duration-300">
            {steps[activeStep]}
          </p>

          {/* Navigation Controls */}
          <div className="flex gap-2">
            <button
              onClick={prevStep}
              className="p-2 border border-border bg-white dark:bg-card hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl text-muted-foreground hover:text-foreground active:scale-95 transition-all cursor-pointer"
              aria-label="Previous step"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={nextStep}
              className="p-2 border border-border bg-white dark:bg-card hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl text-muted-foreground hover:text-foreground active:scale-95 transition-all cursor-pointer"
              aria-label="Next step"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Dynamic Simulated Mockup Screen */}
        <div className="md:col-span-3 w-full">
          {renderStepMockup(activeStep)}
        </div>
      </div>

      {/* Progress Line */}
      <div className="h-1 bg-neutral-200 dark:bg-neutral-800 rounded-full w-full overflow-hidden mt-1">
        <div 
          className="h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
        />
      </div>
    </div>
  );
}
