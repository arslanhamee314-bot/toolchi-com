"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Zap, Star, TrendingUp, AlertTriangle } from "lucide-react";
import { TOOLS_REGISTRY, ToolItem } from "@/lib/tools-registry";
import { getWorkflowsForTool } from "@/lib/workflows-registry";
import LucideIcon from "@/components/tools/LucideIcon";

interface SmartAssistPanelProps {
  activeTool?: ToolItem | null;
  qualityScore?: number | null; // 0-100
  warnings?: string[];
}

export default function SmartAssistPanel({ activeTool, qualityScore, warnings = [] }: SmartAssistPanelProps) {
  const relatedWorkflows = activeTool ? getWorkflowsForTool(activeTool.slug) : [];
  const relatedTools = activeTool
    ? TOOLS_REGISTRY.filter(
        (t) =>
          t.category === activeTool.category &&
          t.slug !== activeTool.slug
      ).slice(0, 4)
    : TOOLS_REGISTRY.filter((t) => t.popular).slice(0, 4);

  return (
    <aside className="flex flex-col h-full overflow-hidden bg-white dark:bg-card border-l border-border">
      {/* Panel Header */}
      <div className="px-4 py-4 border-b border-border shrink-0">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <p className="text-xs font-extrabold text-foreground">Smart Assist</p>
            <p className="text-[9px] text-muted-foreground">AI-powered suggestions</p>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-5">

        {/* Quality Score */}
        {qualityScore !== null && qualityScore !== undefined && (
          <div>
            <p className="text-[9px] font-extrabold text-muted-foreground uppercase tracking-wider mb-2">
              Quality Score
            </p>
            <div className="bg-background dark:bg-[#1a1f2e] border border-border rounded-2xl p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-foreground">Output Score</span>
                <span
                  className={`text-sm font-extrabold ${
                    qualityScore >= 80
                      ? "text-emerald-500"
                      : qualityScore >= 60
                      ? "text-amber-500"
                      : "text-red-500"
                  }`}
                >
                  {qualityScore}/100
                </span>
              </div>
              <div className="h-1.5 bg-border rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    qualityScore >= 80
                      ? "bg-emerald-500"
                      : qualityScore >= 60
                      ? "bg-amber-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${qualityScore}%` }}
                />
              </div>
              <p className="text-[9px] text-muted-foreground mt-1.5">
                {qualityScore >= 80
                  ? "Excellent output quality"
                  : qualityScore >= 60
                  ? "Good — some improvements possible"
                  : "Consider adjusting settings"}
              </p>
            </div>
          </div>
        )}

        {/* Warnings */}
        {warnings.length > 0 && (
          <div>
            <p className="text-[9px] font-extrabold text-muted-foreground uppercase tracking-wider mb-2">
              Warnings
            </p>
            <div className="space-y-2">
              {warnings.map((w, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 p-2.5 bg-amber-500/5 border border-amber-500/20 rounded-xl"
                >
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-foreground leading-relaxed">{w}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Active Tool Info */}
        {activeTool && (
          <div>
            <p className="text-[9px] font-extrabold text-muted-foreground uppercase tracking-wider mb-2">
              Current Tool
            </p>
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-3">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="h-6 w-6 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <LucideIcon name={activeTool.iconName} className="h-3.5 w-3.5" />
                </div>
                <span className="text-xs font-extrabold text-foreground">{activeTool.name}</span>
              </div>
              <p className="text-[10px] text-muted-foreground leading-relaxed">{activeTool.shortDesc}</p>
            </div>
          </div>
        )}

        {/* Related Workflows */}
        {relatedWorkflows.length > 0 && (
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <Zap className="h-3 w-3 text-primary" />
              <p className="text-[9px] font-extrabold text-muted-foreground uppercase tracking-wider">
                Related Workflows
              </p>
            </div>
            <div className="space-y-2">
              {relatedWorkflows.slice(0, 2).map((workflow) => (
                <Link
                  key={workflow.id}
                  href={`/workflows/${workflow.id}`}
                  className="flex items-center justify-between gap-2 p-2.5 bg-background dark:bg-[#1a1f2e] border border-border hover:border-primary/30 rounded-xl transition-all group"
                >
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-foreground truncate">{workflow.title}</p>
                    <p className="text-[9px] text-muted-foreground mt-0.5">
                      {workflow.steps.length} steps
                    </p>
                  </div>
                  <ArrowRight className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Next Best Actions — related tools */}
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <TrendingUp className="h-3 w-3 text-primary" />
            <p className="text-[9px] font-extrabold text-muted-foreground uppercase tracking-wider">
              {activeTool ? "Related Tools" : "Popular Tools"}
            </p>
          </div>
          <div className="space-y-1.5">
            {relatedTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="flex items-center gap-2 px-2.5 py-2 bg-background dark:bg-[#1a1f2e] border border-border hover:border-primary/30 hover:bg-primary/5 rounded-xl transition-all group"
              >
                <div className="h-5 w-5 rounded-lg bg-primary/5 border border-border/60 text-primary flex items-center justify-center shrink-0">
                  <LucideIcon name={tool.iconName} className="h-3 w-3" />
                </div>
                <span className="text-[10px] font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                  {tool.name}
                </span>
                <ArrowRight className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors ml-auto shrink-0" />
              </Link>
            ))}
          </div>
        </div>

        {/* Pro Upgrade CTA */}
        <div className="bg-gradient-to-br from-primary/10 to-[#14b8a6]/10 border border-primary/20 rounded-2xl p-4">
          <div className="flex items-center gap-1.5 mb-1.5">
            <Star className="h-3.5 w-3.5 text-primary" />
            <span className="text-[10px] font-extrabold text-primary uppercase tracking-wider">Toolchi Pro</span>
          </div>
          <p className="text-[10px] text-muted-foreground leading-relaxed mb-3">
            Unlock saved sessions, batch processing, advanced Smart Assist, and no ads.
          </p>
          <Link
            href="/pricing"
            className="block w-full text-center py-1.5 bg-primary hover:bg-[#6530ef] text-white text-[10px] font-extrabold rounded-xl transition-colors"
          >
            Upgrade to Pro →
          </Link>
        </div>

      </div>
    </aside>
  );
}
