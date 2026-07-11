"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, ShieldCheck, X, CreditCard, Lock, Check } from "lucide-react";
import { isProUser, setProUser } from "@/lib/pro-features";
import { useToast } from "./ToastProvider";

interface ProGateProps {
  feature: "removeBranding" | "batchProcessing" | "unlimitedTabs" | "advancedSmartAssist" | "savedPresets";
  children: React.ReactNode;
  inline?: boolean;
}

export default function ProGate({ feature, children, inline = false }: ProGateProps) {
  const [isPro, setIsPro] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [cardNumber, setCardNumber] = useState("4242 4242 4242 4242");
  const [cardExpiry, setCardExpiry] = useState("12/28");
  const [cardCvc, setCardCvc] = useState("424");
  const { showToast } = useToast();

  useEffect(() => {
    setIsPro(isProUser());
    const handler = () => setIsPro(isProUser());
    window.addEventListener("toolchi_pro_change", handler);
    return () => window.removeEventListener("toolchi_pro_change", handler);
  }, []);

  const handleSimulateUpgrade = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutLoading(true);
    setTimeout(() => {
      setCheckoutLoading(false);
      setCheckoutSuccess(true);
      setProUser(true);
      showToast("Upgrade successful! Pro features unlocked.", "success");
      
      // Fire confetti
      import("canvas-confetti").then((m) => {
        m.default({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      });
    }, 1200);
  };

  if (isPro) return <>{children}</>;

  return (
    <>
      <div 
        className={`relative group ${inline ? "inline-block" : "w-full"}`}
        onClickCapture={(e) => {
          if (!isPro) {
            e.preventDefault();
            e.stopPropagation();
            setModalOpen(true);
          }
        }}
      >
        {/* Blurred/disabled content */}
        <div className="select-none pointer-events-none opacity-50 filter blur-[1.5px] transition-all">
          {children}
        </div>

        {/* Lock overlay label */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/5 dark:bg-white/5 rounded-2xl cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/95 text-white text-[10px] font-extrabold uppercase rounded-full shadow-lg tracking-wider animate-pulse">
            <Sparkles className="h-3 w-3" /> Pro Feature
          </span>
        </div>
      </div>

      {/* Checkout Simulator Modal */}
      {modalOpen && (
        <>
          <div 
            className="fixed inset-0 z-[250] bg-black/60 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
          />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[251] w-full max-w-[420px] px-4">
            <div className="bg-white dark:bg-[#171c26] border border-border rounded-[28px] p-6 shadow-2xl space-y-6 relative overflow-hidden">
              
              {/* Close Button */}
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground cursor-pointer p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <X className="h-4 w-4" />
              </button>

              {checkoutSuccess ? (
                <div className="text-center py-6 space-y-4">
                  <div className="h-16 w-16 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
                    <Check className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-foreground">Welcome to Toolchi Pro! 🎉</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                      Your mock payment was verified successfully. All premium features, custom branding, and unlimited tabs are now unlocked.
                    </p>
                  </div>
                  <button
                    onClick={() => setModalOpen(false)}
                    className="w-full py-3 bg-primary hover:bg-[#6530ef] text-white font-extrabold text-xs rounded-xl shadow-lg shadow-primary/20 cursor-pointer active:scale-95 transition-all"
                  >
                    Start Using Pro
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex flex-col items-center text-center gap-3 mt-2">
                    <div className="h-12 w-12 bg-primary/10 text-primary border border-primary/20 rounded-2xl flex items-center justify-center">
                      <Sparkles className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold text-foreground">Unlock Creator Pro Suite</h3>
                      <p className="text-[10px] text-muted-foreground mt-1 max-w-[280px]">
                        Get custom branding, unlimited tabs, batch processing, and ad-free workspace.
                      </p>
                    </div>
                  </div>

                  {/* Pricing Badge */}
                  <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] font-extrabold text-primary uppercase tracking-widest">Creator Pro</span>
                      <p className="text-xs font-bold text-foreground">Early Bird Access</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-extrabold text-foreground">$7<span className="text-[10px] text-muted-foreground font-normal">/mo</span></p>
                      <p className="text-[9px] text-muted-foreground">Billed annually ($84)</p>
                    </div>
                  </div>

                  {/* Mock Checkout Form */}
                  <form onSubmit={handleSimulateUpgrade} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-extrabold text-muted-foreground uppercase tracking-wider block">Card Details</label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="Card Number"
                          className="w-full pl-10 pr-4 py-2.5 text-xs bg-neutral-50 dark:bg-card border border-border rounded-xl focus:outline-none focus:border-primary text-foreground font-mono"
                        />
                        <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-extrabold text-muted-foreground uppercase tracking-wider block">Expiry</label>
                        <input
                          type="text"
                          required
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/YY"
                          className="w-full px-4 py-2.5 text-xs bg-neutral-50 dark:bg-card border border-border rounded-xl focus:outline-none focus:border-primary text-foreground font-mono"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-extrabold text-muted-foreground uppercase tracking-wider block">CVC</label>
                        <input
                          type="password"
                          required
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          placeholder="123"
                          className="w-full px-4 py-2.5 text-xs bg-neutral-50 dark:bg-card border border-border rounded-xl focus:outline-none focus:border-primary text-foreground font-mono"
                        />
                      </div>
                    </div>

                    {/* Security hint */}
                    <div className="flex items-center gap-1.5 text-[9px] text-muted-foreground justify-center">
                      <Lock className="h-3 w-3" /> Secure Stripe Sandbox. Mock payment details accepted.
                    </div>

                    <button
                      type="submit"
                      disabled={checkoutLoading}
                      className="w-full py-3 bg-primary hover:bg-[#6530ef] text-white font-extrabold text-xs rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 transition-all active:scale-95 mt-2"
                    >
                      {checkoutLoading ? (
                        "Processing payment..."
                      ) : (
                        <>
                          <ShieldCheck className="h-4 w-4" /> Upgrade to Pro ($7/mo)
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}

            </div>
          </div>
        </>
      )}
    </>
  );
}
