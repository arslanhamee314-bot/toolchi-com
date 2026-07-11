"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, Check, Sparkles, HelpCircle, ShieldCheck } from "lucide-react";
import { getDictionary } from "@/i18n/dictionary";
import { isProUser, setProUser } from "@/lib/pro-features";

export default function PricingPage() {
  const pathname = usePathname();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("monthly");
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isPro, setIsPro] = useState(false);
  
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [waitlistLoading, setWaitlistLoading] = useState(false);

  // Detect locale
  const locale = pathname.startsWith("/ur") ? "ur" : pathname.startsWith("/tr") ? "tr" : "en";
  const dict = getDictionary(locale);
  const isRtl = locale === "ur";

  useEffect(() => {
    setIsPro(isProUser());
    const handler = () => setIsPro(isProUser());
    window.addEventListener("toolchi_pro_change", handler);
    return () => window.removeEventListener("toolchi_pro_change", handler);
  }, []);

  const plans = [
    {
      id: "free",
      name: "Free Sandbox",
      price: 0,
      description: "Ideal for basic client-side formatting and light image diagnostics.",
      features: [
        "100% Client-Side Sandbox",
        "Single File conversions",
        "Standard Image compressor (max 5MB)",
        "Standard PDF tools (max 3 files)",
        "Local Secure browser logs only"
      ],
      cta: "Current Active Plan"
    },
    {
      id: "creator",
      name: "Creator Pro Suite",
      price: billingCycle === "monthly" ? 9 : 7,
      description: "Optimized for bloggers, content marketers, and dynamic publishing engines.",
      features: [
        "Everything in Free Sandbox",
        "Remove Toolchi branding",
        "Custom branding watermarks",
        "Batch conversions (up to 20 files)",
        "Hi-Res bulk compression (max 25MB)",
        "Batch PDF tools (merge/split unlimited)",
        "Advanced custom AI outline builders",
        "No Ad banners (Ad-Free Workspace)",
        "Secure cloud backups history (optional)"
      ],
      cta: isProUser() ? "Active Pro Account ✨" : "Join Pro Waitlist",
      popular: true
    },
    {
      id: "developer",
      name: "Developer API Plus",
      price: billingCycle === "monthly" ? 29 : 23,
      description: "For engineering teams automating file conversions and text statistics.",
      features: [
        "Everything in Creator Pro Suite",
        "Cloud API credentials (25,000 reqs/mo)",
        "Webhook response receivers",
        "Priority dedicated API servers",
        "24/7 Slack support channel",
        "Multi-user team dashboard settings"
      ],
      cta: "Request API Access"
    }
  ];

  const handleCheckoutSim = (planId: string) => {
    if (planId === "free") return;
    
    // Check if previously registered locally
    const saved = localStorage.getItem(`waitlist_${planId}`);
    if (saved) {
      setEmail(saved);
      setSubmitted(true);
    } else {
      setEmail("");
      setSubmitted(false);
    }
    
    setSelectedPlan(planId);
  };

  const handleSubmitWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setWaitlistLoading(true);
    setTimeout(() => {
      setWaitlistLoading(false);
      setSubmitted(true);
      
      // Save locally
      localStorage.setItem(`waitlist_${selectedPlan}`, email);
      
      // Fire confetti effect
      import("canvas-confetti").then((m) => {
        m.default({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      });
    }, 800);
  };

  const handleDirectSimUpgrade = () => {
    setProUser(true);
    setSubmitted(true);
    import("canvas-confetti").then((m) => {
      m.default({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    });
  };

  const getLocalizedLink = (href: string) => {
    if (locale === "en") return href;
    return `/${locale}${href}`;
  };

  return (
    <div className={`py-12 px-4 sm:px-6 max-w-5xl mx-auto w-full relative overflow-hidden ${isRtl ? "text-right" : "text-left"}`} dir={isRtl ? "rtl" : "ltr"}>
      {/* Background glow checks */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-[#7d4dff]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="flex flex-col gap-8 text-center relative z-10">
        
        {/* Navigation header */}
        <div className={`flex justify-between items-center border-b border-border/40 pb-6 ${isRtl ? "text-right flex-row-reverse" : "text-left"}`}>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-primary/10 text-primary border border-primary/20 rounded-xl flex items-center justify-center">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">{dict.pricing.title}</h1>
              <p className="text-3xs sm:text-2xs text-muted-foreground mt-0.5">{dict.pricing.subtitle}</p>
            </div>
          </div>
          <Link 
            href={getLocalizedLink("/")}
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors bg-card border border-border px-3 py-1.5 rounded-lg shrink-0 animate-none"
          >
            <ArrowLeft className="h-4.5 w-4.5" /> {dict.common.backToDashboard}
          </Link>
        </div>

        {/* Pricing Header */}
        <div className="max-w-2xl mx-auto space-y-3 mt-4">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-none">Transparent, Flexible Plans</h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            All basic local tools are free. Support Toolchi development and unlock high-performance batch pipelines, bigger file capabilities, and ad-free interfaces.
          </p>
        </div>

        {/* Toggle billing cycle */}
        <div className="flex items-center justify-center gap-3 mt-2 select-none">
          <button 
            onClick={() => setBillingCycle("monthly")}
            className={`px-3 py-1.5 text-3xs font-extrabold rounded-xl transition-all ${billingCycle === "monthly" ? "bg-primary text-white" : "bg-neutral-100 dark:bg-neutral-800 text-muted-foreground"}`}
          >
            {dict.pricing.billingMonthly}
          </button>
          <button 
            onClick={() => setBillingCycle("annually")}
            className={`px-3 py-1.5 text-3xs font-extrabold rounded-xl transition-all flex items-center gap-1 ${billingCycle === "annually" ? "bg-primary text-white" : "bg-neutral-100 dark:bg-neutral-800 text-muted-foreground"}`}
          >
            {dict.pricing.billingAnnually} <span className="bg-emerald-500 text-white text-[8px] px-1 rounded-md font-bold uppercase tracking-wider">{dict.pricing.savePercent}</span>
          </button>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch mt-6">
          {plans.map((p) => {
            const isActivePro = p.id === "creator" && isPro;
            return (
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
                      : (p.popular || isActivePro)
                        ? "bg-primary hover:bg-[#6530ef] text-white shadow-md shadow-[#7d4dff]/15" 
                        : "bg-[#7d4dff]/10 text-primary hover:bg-[#7d4dff]/15 border border-[#7d4dff]/20"
                  }`}
                >
                  {isActivePro ? "Active Pro Account ✨" : p.cta}
                </button>
              </article>
            );
          })}
        </div>

        {/* Lead capture / waitlist dialog modal */}
        {selectedPlan && selectedPlan !== "free" && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white dark:bg-card border border-border rounded-3xl p-6 sm:p-8 max-w-md w-full text-center space-y-5 shadow-2xl animate-in scale-in-95 duration-200">
              
              {submitted ? (
                <>
                  <div className="h-12 w-12 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
                    <Check className="h-6 w-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-base sm:text-lg font-extrabold text-foreground">Status Verified! 🎉</h3>
                    <p className="text-2xs sm:text-xs text-muted-foreground leading-relaxed">
                      We have simulated your upgrade successfully. The mock waitlist status is saved, and your browser is running with full **Toolchi Creator Pro Suite** unlocked!
                    </p>
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedPlan(null);
                      setSubmitted(false);
                    }}
                    className="w-full py-2.5 bg-neutral-900 border border-border hover:border-neutral-700 text-white font-bold text-xs rounded-xl cursor-pointer"
                  >
                    Done
                  </button>
                </>
              ) : (
                <>
                  <div className="h-12 w-12 bg-[#7d4dff]/10 text-primary border border-[#7d4dff]/20 rounded-full flex items-center justify-center mx-auto">
                    <Sparkles className="h-6 w-6 animate-pulse" />
                  </div>
                  
                  <div className="space-y-1.5">
                    <h3 className="text-base sm:text-lg font-extrabold text-foreground">{dict.pricing.joinWaitlist}</h3>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      Toolchi Pro plans are currently in active beta. Upgrade instantly using the mock simulator below, or save your email to join the queue.
                    </p>
                  </div>

                  <form onSubmit={handleSubmitWaitlist} className="space-y-4 text-left">
                    <div className="space-y-1.5">
                      <label className="text-3xs font-extrabold text-muted-foreground uppercase tracking-wider block">Full Name</label>
                      <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. John Doe"
                        className="w-full px-4 py-2.5 text-xs bg-neutral-50 dark:bg-card border border-border rounded-xl focus:outline-hidden focus:border-primary transition-colors text-foreground animate-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-3xs font-extrabold text-muted-foreground uppercase tracking-wider block">Email Address *</label>
                      <input 
                        type="email" 
                        required
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. john@example.com"
                        className="w-full px-4 py-2.5 text-xs bg-neutral-50 dark:bg-card border border-border rounded-xl focus:outline-hidden focus:border-primary transition-colors text-foreground animate-none"
                      />
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button 
                        type="button"
                        onClick={() => setSelectedPlan(null)}
                        className="flex-1 py-2.5 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-foreground font-bold text-xs rounded-xl cursor-pointer transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit"
                        disabled={waitlistLoading}
                        className="flex-1 py-2.5 bg-primary hover:bg-[#6530ef] text-white font-extrabold text-xs rounded-xl shadow-md shadow-[#7d4dff]/15 flex items-center justify-center gap-1 hover:scale-103 active:scale-97 transition-all cursor-pointer disabled:opacity-50"
                      >
                        {waitlistLoading ? "Submitting..." : dict.pricing.checkoutSpot}
                      </button>
                    </div>
                  </form>

                  {/* Simulator Quick Action */}
                  <div className="border-t border-border/40 pt-4 flex flex-col gap-2">
                    <span className="text-[9px] font-extrabold text-muted-foreground uppercase tracking-wider block">Developer Sandbox Bypass</span>
                    <button
                      onClick={handleDirectSimUpgrade}
                      className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-95 transition-all"
                    >
                      <Sparkles className="h-3.5 w-3.5 animate-bounce" /> Simulate Direct Pro Upgrade
                    </button>
                  </div>
                </>
              )}

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
