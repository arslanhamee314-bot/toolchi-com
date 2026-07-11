"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Rocket } from "lucide-react";

interface Action {
  slug: string;
  name: string;
  description: string;
}

interface NextBestActionsProps {
  actions: Action[];
  className?: string;
}

export default function NextBestActions({
  actions,
  className = "",
}: NextBestActionsProps) {
  return (
    <div className={`space-y-2.5 text-left ${className}`}>
      <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
        <Rocket className="h-3.5 w-3.5" />
        Recommended Next Steps
      </span>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {actions.slice(0, 3).map((action) => (
          <Link
            key={action.slug}
            href={`/tools/${action.slug}`}
            className="flex flex-col justify-between p-3 rounded-2xl bg-white dark:bg-card border border-border/60 hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200 group cursor-pointer"
          >
            <div className="space-y-1">
              <h5 className="text-[10px] font-extrabold text-foreground group-hover:text-primary transition-colors">
                {action.name}
              </h5>
              <p className="text-[9px] text-muted-foreground leading-normal line-clamp-2">
                {action.description}
              </p>
            </div>
            <div className="flex items-center gap-1 text-[9px] font-extrabold text-primary/80 group-hover:text-primary mt-2">
              Run Tool <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
