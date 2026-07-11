"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import { getWorkflowsForTool, WorkflowItem } from "@/lib/workflows-registry";
import LucideIcon from "@/components/tools/LucideIcon";

interface RelatedWorkflowBlockProps {
  toolSlug: string;
}

export default function RelatedWorkflowBlock({ toolSlug }: RelatedWorkflowBlockProps) {
  const workflows = getWorkflowsForTool(toolSlug);
  if (workflows.length === 0) return null;

  return (
    <div className="flex flex-col gap-4 p-5 bg-gradient-to-br from-primary/5 to-[#14b8a6]/5 border border-primary/15 rounded-3xl">
      <div className="flex items-center gap-2">
        <div className="h-6 w-6 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
          <Zap className="h-3.5 w-3.5" />
        </div>
        <div>
          <h3 className="text-sm font-extrabold text-foreground">This tool is part of a Workflow</h3>
          <p className="text-[10px] text-muted-foreground">Open the full step-by-step pipeline in Workspace</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {workflows.slice(0, 2).map((workflow) => (
          <WorkflowRow key={workflow.id} workflow={workflow} currentSlug={toolSlug} />
        ))}
      </div>

      <Link
        href={`/workspace?workflow=${workflows[0].id}`}
        className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-[#6530ef] text-white text-xs font-extrabold rounded-xl transition-all active:scale-95 w-fit"
      >
        Open in Workspace <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}

function WorkflowRow({ workflow, currentSlug }: { workflow: WorkflowItem; currentSlug: string }) {
  return (
    <div className="bg-white dark:bg-card border border-border rounded-2xl p-3">
      <div className="flex items-center justify-between mb-2">
        <div>
          <span className={`text-[9px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded ${workflow.color} ${workflow.accentColor}`}>
            {workflow.category}
          </span>
          <p className="text-xs font-extrabold text-foreground mt-1">{workflow.title}</p>
        </div>
        <Link
          href={`/workflows/${workflow.id}`}
          className="text-[10px] font-bold text-primary hover:underline flex items-center gap-0.5 shrink-0"
        >
          Guide <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      {/* Step chain */}
      <div className="flex items-center gap-1 flex-wrap">
        {workflow.steps.map((step, idx) => (
          <React.Fragment key={step.slug + idx}>
            <Link
              href={`/tools/${step.slug}`}
              className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[9px] font-bold transition-all ${
                step.slug === currentSlug
                  ? "bg-primary text-white"
                  : "bg-background dark:bg-[#1a1f2e] border border-border text-foreground hover:border-primary/40"
              }`}
            >
              <LucideIcon name={step.icon} className="h-2.5 w-2.5" />
              {step.label}
            </Link>
            {idx < workflow.steps.length - 1 && (
              <ArrowRight className="h-2.5 w-2.5 text-muted-foreground/40 shrink-0" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
