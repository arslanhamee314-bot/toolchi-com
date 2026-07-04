"use client";

import React, { useState } from "react";
import { Copy, Check, Share2, Send, MessageSquare } from "lucide-react";

export default function ShareLinkCreator() {
  const [targetUrl, setTargetUrl] = useState("https://toolchi.online");
  const [text, setText] = useState("Check out these secure client-side browser utilities!");
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const encodedUrl = encodeURIComponent(targetUrl);
  const encodedText = encodeURIComponent(text);

  const channels = [
    {
      name: "Twitter / X",
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
      iconName: "Send"
    },
    {
      name: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      iconName: "Share2"
    },
    {
      name: "LinkedIn",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      iconName: "Share2"
    },
    {
      name: "WhatsApp",
      url: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`,
      iconName: "MessageSquare"
    },
    {
      name: "Telegram",
      url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
      iconName: "Send"
    }
  ];

  const handleCopy = (shareUrl: string, name: string) => {
    navigator.clipboard.writeText(shareUrl);
    setCopiedIndex(name);
    setTimeout(() => setCopiedIndex(null), 2000);
    import("canvas-confetti").then((m) => m.default({ particleCount: 30, spread: 50, origin: { y: 0.85 } }));
  };

  return (
    <div className="flex flex-col gap-6 text-foreground text-xs">
      
      <div className="flex flex-col gap-2">
        <label className="font-bold text-sm block">Create Social Share Links</label>
        <p className="text-muted leading-relaxed text-3xs">Encode targets links and custom messages into platform-ready URL structures.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-muted block text-3xs font-bold uppercase mb-1">Destination URL</label>
          <input
            type="text"
            value={targetUrl}
            onChange={(e) => setTargetUrl(e.target.value)}
            className="w-full px-4 py-2.5 bg-white dark:bg-card border border-border rounded-xl outline-none focus:border-[#7d4dff]"
          />
        </div>
        <div>
          <label className="text-muted block text-3xs font-bold uppercase mb-1">Share Message</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-4 py-2.5 bg-white dark:bg-card border border-border rounded-xl outline-none focus:border-[#7d4dff]"
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-2">
        <span className="font-bold text-[10px] text-muted uppercase tracking-wider">Generated Share Channels:</span>
        
        <div className="flex flex-col gap-2">
          {channels.map((ch) => (
            <div key={ch.name} className="flex justify-between items-center p-3 rounded-xl border border-border bg-white dark:bg-card/40">
              <div className="flex flex-col">
                <span className="font-bold text-3xs">{ch.name}</span>
                <span className="text-[10px] text-muted truncate max-w-[280px] font-mono mt-0.5">{ch.url}</span>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => handleCopy(ch.url, ch.name)}
                  className="p-2 border border-border bg-white dark:bg-card rounded-lg hover:border-[#7d4dff] text-muted hover:text-foreground transition-colors cursor-pointer"
                  title="Copy link"
                >
                  {copiedIndex === ch.name ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
                <a
                  href={ch.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 font-bold bg-[#7d4dff] hover:bg-[#6530ef] text-white text-3xs rounded-lg transition-colors flex items-center gap-1 select-none"
                >
                  Open Share
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
