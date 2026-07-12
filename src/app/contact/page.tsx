"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, MessageSquare, Send, CheckCircle2, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setLoading(true);
    
    // Simulate contact form submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    }, 1000);
  };

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
            <div>
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

        {/* Contact Page Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Information Column (Left) */}
          <div className="md:col-span-5 flex flex-col gap-6 text-left">
            <div className="space-y-3">
              <h2 className="text-xl font-extrabold text-foreground tracking-tight">How can we help?</h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Have inquiries about Toolchi's browser engines, recommendations for new file utilities, or concerns about compliance policies?
              </p>
            </div>

            <div className="flex flex-col gap-4 border border-border p-5 rounded-3xl bg-card/10">
              <div className="flex items-start gap-3.5 text-xs">
                <Mail className="h-5 w-5 text-[#7d4dff] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-extrabold text-foreground">Direct Email Routing</h4>
                  <p className="text-muted-foreground"><span className="font-bold text-foreground">Support:</span> support@toolchi.online</p>
                  <p className="text-muted-foreground"><span className="font-bold text-foreground">Sales & Billing:</span> sales@toolchi.online</p>
                  <p className="text-muted-foreground"><span className="font-bold text-foreground">Security Desk:</span> security@toolchi.online</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-xs border-t border-border/40 pt-4">
                <Clock className="h-5 w-5 text-[#7d4dff] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <h4 className="font-extrabold text-foreground">Response SLA & Hours</h4>
                  <p className="text-muted-foreground leading-normal">
                    Mon - Fri: 9 AM - 6 PM UTC<br />
                    <span className="font-semibold text-emerald-500">24-Hour Response SLA Guaranteed</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-xs border-t border-border/40 pt-4">
                <MapPin className="h-5 w-5 text-[#7d4dff] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <h4 className="font-extrabold text-foreground">Location</h4>
                  <p className="text-muted-foreground leading-normal">Toolchi Inc. (Client-Side Privacy Suite)<br />Virtual HQ, Delaware, USA</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-xs border-t border-border/40 pt-4">
                <MessageSquare className="h-5 w-5 text-[#7d4dff] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <h4 className="font-extrabold text-foreground">Developer Feedback</h4>
                  <a href="https://github.com/arslanhamee314-bot" className="text-[#7d4dff] hover:underline">GitHub Issues Directory</a>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column (Right) */}
          <div className="md:col-span-7">
            {submitted ? (
              <div className="bg-emerald-500/5 border border-emerald-500/15 rounded-3xl p-8 text-center flex flex-col items-center gap-4">
                <CheckCircle2 className="h-12 w-12 text-emerald-500" />
                <div>
                  <h3 className="text-base font-extrabold text-foreground">Message Sent Successfully!</h3>
                  <p className="text-xs text-muted-foreground leading-normal mt-1 max-w-[340px] mx-auto">
                    Thank you for contacting us. We appreciate your interest in Toolchi. Our engineering team will review your submission and reply shortly.
                  </p>
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs rounded-xl shadow-md shadow-emerald-500/10 cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="border border-border rounded-3xl p-6 sm:p-8 bg-white dark:bg-card flex flex-col gap-4 text-left">
                <h3 className="font-extrabold text-sm text-foreground uppercase tracking-wider">Submit Feedback Form</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <span className="text-3xs font-extrabold text-muted-foreground uppercase">Your Name</span>
                    <input 
                      type="text" 
                      required 
                      value={name} 
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-[#1a202c] border border-border rounded-xl outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-3xs font-extrabold text-muted-foreground uppercase">Email Address</span>
                    <input 
                      type="email" 
                      required 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. name@example.com"
                      className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-[#1a202c] border border-border rounded-xl outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-3xs font-extrabold text-muted-foreground uppercase">Subject</span>
                  <input 
                    type="text" 
                    value={subject} 
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Custom tool request"
                    className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-[#1a202c] border border-border rounded-xl outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <span className="text-3xs font-extrabold text-muted-foreground uppercase">Message / Description</span>
                  <textarea 
                    required 
                    rows={4}
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your issue or suggestion here..."
                    className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-[#1a202c] border border-border rounded-xl outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 bg-[#7d4dff] hover:bg-[#6530ef] disabled:bg-[#7d4dff]/40 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-[#7d4dff]/10 transition-colors"
                >
                  {loading ? <span className="h-4.5 w-4.5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send className="h-3.5 w-3.5" />}
                  <span>Submit Message Request</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
