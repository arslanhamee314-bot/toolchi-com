"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";

interface AdUnitProps {
  slot?: string;
  format?: string;
  responsive?: boolean;
  className?: string;
}

export default function AdUnit({ slot, format = "auto", responsive = true, className = "" }: AdUnitProps) {
  const [mounted, setMounted] = useState(false);
  const [adBlocked, setAdBlocked] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if google adsense script has run or been blocked
    try {
      if (typeof window !== "undefined") {
        const w = window as any;
        w.adsbygoogle = w.adsbygoogle || [];
        w.adsbygoogle.push({});
      }
    } catch (e) {
      setAdBlocked(true);
    }
  }, []);

  const isDev = 
    process.env.NODE_ENV === "development" || 
    !process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 
    process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID.includes("XXXXXX");

  if (!mounted) {
    return <div className={`my-6 mx-auto w-full max-w-4xl text-center select-none ${className}`} style={{ minHeight: "100px" }} />;
  }

  return (
    <div className={`my-6 mx-auto w-full max-w-4xl text-center select-none ${className}`}>
      {/* AdSense ins element */}
      <ins
        className="adsbygoogle block"
        style={{ display: "block" }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-XXXXXXXXXXXXX"}
        data-ad-slot={slot || process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID || "XXXXXXXXXX"}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
      
      {/* Dev Mode Placeholder / Fallback Sponsor Card */}
      {isDev && (
        <div className="bg-neutral-50 dark:bg-card border border-dashed border-border/80 p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
          <div className="flex items-center gap-3 text-left">
            <div className="h-9 w-9 bg-primary/10 text-primary border border-primary/20 rounded-xl flex items-center justify-center">
              <Sparkles className="h-4.5 w-4.5" />
            </div>
            <div>
              <span className="text-[9px] font-extrabold text-[#7d4dff] uppercase tracking-wider">Sponsored Sponsor Area</span>
              <h4 className="font-extrabold text-xs text-foreground mt-0.5">Advertise with Toolchi</h4>
              <p className="text-[10px] text-muted-foreground leading-normal mt-0.5">Reach 1M+ web developers, creators, and technical users daily.</p>
            </div>
          </div>
          <Link 
            href="/contact" 
            className="px-4 py-2 bg-[#7d4dff] hover:bg-[#6530ef] text-white font-extrabold text-3xs rounded-xl shadow-xs shrink-0 cursor-pointer"
          >
            Book Sponsor Space
          </Link>
        </div>
      )}
    </div>
  );
}


