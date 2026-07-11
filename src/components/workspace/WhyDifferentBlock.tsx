"use client";

import React from "react";
import Link from "next/link";
import { Zap, Shield, GitBranch } from "lucide-react";

export default function WhyDifferentBlock() {
  const points = [
    {
      icon: <Zap className="h-5 w-5" />,
      color: "bg-primary/10 text-primary",
      title: "Multi-Tool Tabs",
      desc: "Open Image Compressor, PDF Merger, and JSON Formatter simultaneously — no tab switching, no lost progress. Work like a pro.",
    },
    {
      icon: <GitBranch className="h-5 w-5" />,
      color: "bg-teal-500/10 text-teal-500",
      title: "Smart Workflow Chains",
      desc: "Tools connect to each other. Compress → Convert → Add Caption, all in one seamless workflow. Output flows to the next tool automatically.",
    },
    {
      icon: <Shield className="h-5 w-5" />,
      color: "bg-emerald-500/10 text-emerald-500",
      title: "100% Client-Side Privacy",
      desc: "Every operation runs inside your browser. Your files, your data, your PDF — never uploaded, never seen by any server. Zero leaks.",
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-card border-t border-border/40">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="flex flex-col gap-3 text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-[10px] font-extrabold uppercase rounded-full tracking-wider mx-auto">
            Why Toolchi is Different
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Not just individual tools.<br />
            <span className="text-primary">A smart productivity workspace.</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Most tool websites are one-tool-per-page. Toolchi is built for creators, developers, and webmasters who need to get multiple things done — fast.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {points.map((pt, i) => (
            <div
              key={i}
              className="flex flex-col gap-4 p-6 bg-background dark:bg-[#1a1f2e] border border-border rounded-3xl hover:border-primary/30 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
            >
              <div className={`h-11 w-11 rounded-2xl ${pt.color} flex items-center justify-center`}>
                {pt.icon}
              </div>
              <div>
                <h3 className="text-base font-extrabold text-foreground mb-1.5">{pt.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{pt.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/workspace"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-[#6530ef] text-white font-extrabold text-sm rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-95"
          >
            Try the Workspace Free →
          </Link>
        </div>
      </div>
    </section>
  );
}
