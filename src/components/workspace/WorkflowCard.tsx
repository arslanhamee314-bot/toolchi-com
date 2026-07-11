"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { WorkflowItem } from "@/lib/workflows-registry";
import LucideIcon from "@/components/tools/LucideIcon";

interface WorkflowCardProps {
  workflow: WorkflowItem;
  onOpenInWorkspace?: (workflow: WorkflowItem) => void;
  compact?: boolean;
}

export default function WorkflowCard({ workflow, onOpenInWorkspace, compact = false }: WorkflowCardProps) {
  return (
    <div className={`group relative bg-white dark:bg-card border border-border rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/30 ${compact ? "p-4" : "p-5"}`}>
      {/* Subtle gradient glow top */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex flex-col gap-1">
          <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wider ${workflow.color} ${workflow.accentColor} w-fit`}>
            {workflow.category}
          </div>
          <h3 className={`font-extrabold text-foreground tracking-tight leading-tight ${compact ? "text-sm" : "text-base"}`}>
            {workflow.title}
          </h3>
          {!compact && (
            <p className="text-[11px] text-muted-foreground leading-relaxed mt-0.5">
              {workflow.description}
            </p>
          )}
        </div>
      </div>

      {/* Steps Chain */}
      <div className="flex items-center gap-1 flex-wrap mb-4">
        {workflow.steps.map((step, idx) => (
          <React.Fragment key={step.slug + idx}>
            <Link
              href={`/tools/${step.slug}`}
              className="flex items-center gap-1.5 bg-background dark:bg-[#1a1f2e] border border-border/70 hover:border-primary/40 hover:bg-primary/5 px-2.5 py-1.5 rounded-xl text-[10px] font-bold text-foreground transition-all duration-200 group/step"
            >
              <LucideIcon
                name={step.icon}
                className="h-3 w-3 text-muted-foreground group-hover/step:text-primary transition-colors"
              />
              <span className="truncate max-w-[80px]">{step.label}</span>
            </Link>
            {idx < workflow.steps.length - 1 && (
              <ArrowRight className="h-3 w-3 text-muted-foreground/40 shrink-0 hidden sm:block" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {onOpenInWorkspace && (
          <button
            onClick={() => onOpenInWorkspace(workflow)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-primary hover:bg-[#6530ef] text-white text-[10px] font-extrabold rounded-xl transition-all duration-200 active:scale-95 cursor-pointer"
          >
            Open in Workspace
          </button>
        )}
        <Link
          href={`/workflows/${workflow.id}`}
          className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground hover:text-primary transition-colors px-2 py-1.5"
        >
          View Guide <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}
