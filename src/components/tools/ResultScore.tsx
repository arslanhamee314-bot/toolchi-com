"use client";

import React from "react";

interface ResultScoreProps {
  score: number;
  metricTitle: string;
  details?: string;
  className?: string;
}

export default function ResultScore({
  score,
  metricTitle,
  details,
  className = "",
}: ResultScoreProps) {
  // Determine color theme based on score value
  let trackColor = "stroke-neutral-200 dark:stroke-neutral-800";
  let strokeColor = "stroke-primary";
  let textColor = "text-primary";
  let bgColor = "bg-primary/5";

  if (score >= 85) {
    strokeColor = "stroke-emerald-500";
    textColor = "text-emerald-500";
    bgColor = "bg-emerald-500/5";
  } else if (score >= 60) {
    strokeColor = "stroke-amber-500";
    textColor = "text-amber-500";
    bgColor = "bg-amber-500/5";
  } else {
    strokeColor = "stroke-red-500";
    textColor = "text-red-500";
    bgColor = "bg-red-500/5";
  }

  // Ring circumference calculator (r=18 -> 2*pi*r = 113.1)
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div
      className={`flex items-center gap-4 p-4 bg-white dark:bg-card border border-border/60 rounded-2xl ${className}`}
    >
      {/* Circle Gauge SVG */}
      <div className="relative h-12 w-12 shrink-0 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="24"
            cy="24"
            r={radius}
            className={`${trackColor}`}
            strokeWidth="3.5"
            fill="transparent"
          />
          <circle
            cx="24"
            cy="24"
            r={radius}
            className={`${strokeColor} transition-all duration-500 ease-out`}
            strokeWidth="3.5"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <span className={`absolute text-[10px] font-black ${textColor}`}>
          {score}%
        </span>
      </div>

      <div className="text-left min-w-0">
        <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
          {metricTitle}
        </h4>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span
            className={`text-2xs font-extrabold px-1.5 py-0.5 rounded-md ${bgColor} ${textColor}`}
          >
            {score >= 85 ? "Excellent" : score >= 60 ? "Balanced" : "Needs Review"}
          </span>
          {details && (
            <p className="text-3xs text-muted-foreground truncate">{details}</p>
          )}
        </div>
      </div>
    </div>
  );
}
