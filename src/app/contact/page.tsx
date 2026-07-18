import React from "react";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import ContactContent from "@/components/contact/ContactContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Support & Feedback - Toolchi",
  description: "Get in touch with Toolchi support desk or submit feedback. Suggest new offline tools, report issues, or query pricing details.",
  alternates: {
    canonical: "/contact",
  }
};

export default function ContactPage() {
  return (
    <div className="py-12 px-4 sm:px-6 max-w-5xl mx-auto w-full relative overflow-hidden">
      {/* Background glow checks */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[450px] h-[450px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="flex flex-col gap-12 z-10 relative">
        {/* Navigation header */}
        <div className="flex justify-between items-center border-b border-border/40 pb-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-[#7d4dff]/10 text-[#7d4dff] border border-[#7d4dff]/20 rounded-xl flex items-center justify-center">
              <Mail className="h-5 w-5" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">Contact Support</h1>
              <p className="text-xs text-muted-foreground mt-1">Get in touch with our system administrators</p>
            </div>
          </div>
          <Link 
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors bg-card border border-border px-3 py-1.5 rounded-lg"
          >
            <ArrowLeft className="h-4.5 w-4.5" /> Back to Dashboard
          </Link>
        </div>

        {/* Contact Page Form & Info Columns (Client Side component) */}
        <ContactContent />

      </div>
    </div>
  );
}
