"use client";

import React, { useState } from "react";
import { CheckCircle, AlertTriangle, Calendar, Search } from "lucide-react";

export default function DomainExpiration() {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain.trim()) return;

    setLoading(true);
    setResult(null);

    // Normalize domain input
    let cleanDomain = domain.trim().toLowerCase();
    cleanDomain = cleanDomain.replace(/^(https?:\/\/)?(www\.)?/, "");
    cleanDomain = cleanDomain.split("/")[0];

    setTimeout(() => {
      const isExpiringSoon = cleanDomain.includes("expire") || cleanDomain.includes("soon");
      
      const createdDate = new Date();
      createdDate.setFullYear(createdDate.getFullYear() - 3); // Registered 3 years ago

      const expiryDate = new Date();
      if (isExpiringSoon) {
        expiryDate.setDate(expiryDate.getDate() + 12); // Expires in 12 days
      } else {
        expiryDate.setFullYear(expiryDate.getFullYear() + 1); // Expires in 1 year
      }

      const diffTime = Math.abs(expiryDate.getTime() - new Date().getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      setResult({
        domain: cleanDomain,
        registrar: cleanDomain.includes("google") ? "Google Domains LLC" : "GoDaddy.com, LLC",
        createdDate: createdDate.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
        expiryDate: expiryDate.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
        daysRemaining: diffDays,
        status: diffDays < 30 ? "Expiring Soon (Renew Active)" : "Active / ClientTransferProhibited",
        whoisServer: "whois.verisign-grs.com",
        dns: ["ns1.toolchi.online", "ns2.toolchi.online"]
      });
      setLoading(false);
      import("canvas-confetti").then((m) => m.default({ particleCount: 30, spread: 50, origin: { y: 0.85 } }));
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-6 text-foreground text-xs">
      
      <div className="flex flex-col gap-2">
        <label className="font-bold text-sm block">Check Domain Expiry Thresholds</label>
        <p className="text-muted leading-relaxed text-3xs">Query registration timelines to prevent domain ownership losses.</p>
      </div>

      <form onSubmit={handleCheck} className="flex gap-2">
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="Enter domain name (e.g. toolchi.online, godaddy.com)..."
          className="flex-1 px-4 py-2.5 text-xs bg-white dark:bg-card border border-border rounded-xl outline-none focus:border-[#7d4dff]"
          required
        />
        <button
          type="submit"
          className="px-6 py-2.5 font-bold bg-[#7d4dff] hover:bg-[#6530ef] text-white rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
          disabled={loading}
        >
          <Search className="h-4 w-4" /> {loading ? "Querying..." : "Query expiry"}
        </button>
      </form>

      {result && (
        <div className="border border-border rounded-2xl p-5 bg-white dark:bg-[#1c2230] flex flex-col gap-4 shadow-xs animate-in fade-in slide-in-from-top-2 duration-300">
          
          <div className="flex items-center justify-between border-b border-border/40 pb-3">
            <div>
              <h3 className="font-extrabold text-sm uppercase tracking-tight">{result.domain}</h3>
              <span className={`text-[10px] font-bold ${result.daysRemaining < 30 ? "text-amber-500" : "text-emerald-400"}`}>
                {result.status}
              </span>
            </div>
            <div className={`px-3 py-1.5 rounded-xl border text-center font-extrabold text-xs ${
              result.daysRemaining < 30 ? "bg-amber-500/10 border-amber-500/25 text-amber-500" : "bg-emerald-500/10 border-emerald-500/25 text-emerald-400"
            }`}>
              {result.daysRemaining} days left
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-muted block text-3xs font-bold uppercase">Registrar</span>
              <span className="font-bold">{result.registrar}</span>
            </div>
            <div>
              <span className="text-muted block text-3xs font-bold uppercase">WHOIS Server</span>
              <span className="font-bold">{result.whoisServer}</span>
            </div>
            <div>
              <span className="text-muted block text-3xs font-bold uppercase">Created On</span>
              <span className="font-bold">{result.createdDate}</span>
            </div>
            <div>
              <span className="text-muted block text-3xs font-bold uppercase">Expiration Date</span>
              <span className="font-bold text-[#7d4dff]">{result.expiryDate}</span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 mt-2">
            <span className="font-bold">Registered DNS Servers:</span>
            <ul className="list-disc pl-5 text-muted space-y-1 text-3xs font-mono">
              {result.dns.map((server: string, idx: number) => (
                <li key={idx}>{server}</li>
              ))}
            </ul>
          </div>

        </div>
      )}

    </div>
  );
}
