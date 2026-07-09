"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Sparkles, HelpCircle, ShieldCheck } from "lucide-react";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("monthly");
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans = [
    {
      id: "free",
      name: "Free Sandbox",
      price: 0,
      description: "Ideal for casual developer diagnostic checks and fast minor edits.",
      features: [
        "100% Client-side privacy",
        "Max 50MB file size uploads",
        "Access to all 100+ basic tools",
        "Community support access",
        "Zero server analytics uploads"
      ],
      cta: "Current Active Plan",
      popular: false
    },
    {
      id: "pro",
      name: "Developer Pro",
      price: billingCycle === "monthly" ? 9 : 7,
      description: "Built for power users, marketers, and professional web developers.",
      features: [
        "Everything in Free plan",
        "Max 2GB file size uploads",
        "Batch file conversions & merges",
        "Priority CPU multithread threads",
        "Pro preset configs for compression",
        "Priority email assistance (24h)"
      ],
      cta: "Upgrade to Pro",
      popular: true
    },
    {
      id: "enterprise",
      name: "SaaS Enterprise",
      price: billingCycle === "monthly" ? 49 : 39,
      description: "Designed for business integrations and automated API workflows.",
      features: [
        "Everything in Developer Pro",
        "Unlimited file sizes supported",
        "Custom REST API integrations",
        "Dedicated webhook endpoints",
        "99.9% Uptime compliance SLAs",
        "Custom contract agreements"
      ],
      cta: "Contact Enterprise",
      popular: false
    }
  ];

  const handleCheckoutSim = (planId: string) => {
    setSelectedPlan(planId);
  };

  return (
    <div className="py-12 px-4 sm:px-6 max-w-6xl mx-auto w-full relative overflow-hidden">
      {/* Background glow checks */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-[#7d4dff]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="flex flex-col gap-10 z-10 relative text-center">
        {/* Navigation header */}
        <div className="flex justify-between items-center border-b border-border/40 pb-6 text-left">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-primary/10 text-primary border border-primary/20 rounded-xl flex items-center justify-center">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">Flexible Premium Plans</h1>
              <p className="text-3xs sm:text-2xs text-muted-foreground mt-0.5">Scale your document, audio, image, and video workflows easily.</p>
            </div>
          </div>
          <Link 
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors bg-card border border-border px-3 py-1.5 rounded-lg shrink-0"
          >
            <ArrowLeft className="h-4.5 w-4.5" /> Back to Dashboard
          </Link>
        </div>

        {/* Title */}
        <div className="space-y-3 max-w-xl mx-auto mt-4">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-none">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Choose the plan that suits your developer requirements. All local client-side processing remains completely free.
          </p>
        </div>

        {/* Toggle billing cycle */}
        <div className="flex items-center justify-center gap-3 mt-2 select-none">
          <button 
            onClick={() => setBillingCycle("monthly")}
            className={`px-3 py-1.5 text-3xs font-extrabold rounded-xl transition-all ${billingCycle === "monthly" ? "bg-primary text-white" : "bg-neutral-100 dark:bg-neutral-800 text-muted-foreground"}`}
          >
            Monthly Billing
          </button>
          <button 
            onClick={() => setBillingCycle("annually")}
            className={`px-3 py-1.5 text-3xs font-extrabold rounded-xl transition-all flex items-center gap-1 ${billingCycle === "annually" ? "bg-primary text-white" : "bg-neutral-100 dark:bg-neutral-800 text-muted-foreground"}`}
          >
            Annually Billing <span className="bg-emerald-500 text-white text-[8px] px-1 rounded-md font-bold uppercase tracking-wider">Save 20%</span>
          </button>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch mt-6">
          {plans.map((p) => (
            <article 
              key={p.id}
              className={`bg-white dark:bg-card border rounded-[28px] p-6 flex flex-col items-start text-left relative transition-all duration-300 ${p.popular ? "border-primary shadow-lg shadow-[#7d4dff]/5" : "border-border"}`}
            >
              {p.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-white text-[9px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-xs">
                  Most Popular
                </span>
              )}
              
              <div className="space-y-1.5 w-full border-b border-border/40 pb-5 mb-5">
                <h3 className="font-extrabold text-base text-foreground tracking-tight">{p.name}</h3>
                <p className="text-[10px] text-muted-foreground leading-relaxed">{p.description}</p>
                <div className="flex items-baseline gap-1 mt-4">
                  <span className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">${p.price}</span>
                  <span className="text-3xs text-muted-foreground">/{billingCycle === "monthly" ? "mo" : "mo, billed annually"}</span>
                </div>
              </div>

              <ul className="space-y-2.5 flex-1 w-full text-2xs mb-6">
                {p.features.map((f, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-muted-foreground leading-relaxed">
                    <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleCheckoutSim(p.id)}
                className={`w-full py-2.5 rounded-xl font-extrabold text-xs text-center cursor-pointer transition-colors shadow-xs ${
                  p.id === "free" 
                    ? "bg-neutral-100 dark:bg-neutral-800 text-muted-foreground cursor-default" 
                    : p.popular 
                      ? "bg-primary hover:bg-[#6530ef] text-white shadow-md shadow-[#7d4dff]/15" 
                      : "bg-[#7d4dff]/10 text-primary hover:bg-[#7d4dff]/15 border border-[#7d4dff]/20"
                }`}
              >
                {p.cta}
              </button>
            </article>
          ))}
        </div>

        {/* Simulated Checkout Modal */}
        {selectedPlan && selectedPlan !== "free" && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white dark:bg-card border border-border rounded-3xl p-6 sm:p-8 max-w-md w-full text-center space-y-4 shadow-2xl animate-in scale-in-95 duration-200">
              <Check className="h-12 w-12 text-emerald-500 mx-auto bg-emerald-500/10 p-2 rounded-full border border-emerald-500/20" />
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-foreground">Interactive Stripe Sandbox</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mt-1.5">
                  This checkout is a simulation. Toolchi's Premium subscriptions can be integrated here using standard Stripe Checkout redirect triggers.
                </p>
              </div>
              <div className="bg-neutral-50 dark:bg-[#1a202c] border border-border p-4 rounded-2xl text-left text-2xs space-y-1.5">
                <div className="flex justify-between font-bold">
                  <span>Selected Subscription:</span>
                  <span className="text-[#7d4dff] uppercase font-extrabold">{selectedPlan} Plan</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Billing Cycle:</span>
                  <span>{billingCycle === "monthly" ? "Monthly" : "Annually (Save 20%)"}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setSelectedPlan(null)}
                  className="flex-1 py-2.5 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-foreground font-bold text-xs rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <a 
                  href="https://stripe.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 bg-primary hover:bg-[#6530ef] text-white font-extrabold text-xs rounded-xl text-center cursor-pointer shadow-sm shadow-[#7d4dff]/10"
                >
                  Visit Stripe website
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Pricing FAQ Section */}
        <section className="border-t border-border/40 pt-10 mt-6 text-left max-w-3xl mx-auto space-y-6">
          <h3 className="text-lg font-extrabold text-foreground flex items-center gap-1.5">
            <HelpCircle className="h-5 w-5 text-primary" /> Pricing FAQ
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs md:text-sm text-muted-foreground">
            <div className="space-y-1">
              <h4 className="font-bold text-foreground text-xs">Can I continue to use Toolchi for free?</h4>
              <p className="text-2xs sm:text-xs leading-relaxed">
                Absolutely. All standard client-side features (including PDF split/merge, image optimization, QR code generation, spelling checkers, resolution testers) remain completely free.
              </p>
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-foreground text-xs">Why is there a paid Developer Pro plan?</h4>
              <p className="text-2xs sm:text-xs leading-relaxed">
                Running high-efficiency parallel compression algorithms and providing servers to deliver sitemaps, domains, and webhook connections incurs server maintenance payloads. Pro fees help support sustainable development.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
