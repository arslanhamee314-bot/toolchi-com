"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Terminal, Key, Code, Database, Plus, Trash2, Eye, EyeOff, CheckCircle, RefreshCw, AlertCircle, Play } from "lucide-react";

interface ApiKey {

  id: string;
  name: string;
  key: string;
  scope: string;
  created: string;
  requests: number;
}

export default function DeveloperDashboard() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyScope, setNewKeyScope] = useState("live");
  const [showKeyVal, setShowKeyVal] = useState<Record<string, boolean>>({});
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  
  // Webhook Simulator States
  const [webhookUrl, setWebhookUrl] = useState("");
  const [webhookSaved, setWebhookSaved] = useState(false);
  const [webhookLogs, setWebhookLogs] = useState<{ id: string; event: string; url: string; time: string; status: string }[]>([]);

  // Load from localstorage
  useEffect(() => {
    const saved = localStorage.getItem("toolchi_api_keys");
    if (saved) {
      setKeys(JSON.parse(saved));
    } else {
      const defaultKeys: ApiKey[] = [
        {
          id: "key_1",
          name: "SaaS App Production",
          key: "tc_live_73f9821adbc38d9e29a10b",
          scope: "live",
          created: "2026-07-02",
          requests: 485
        },
        {
          id: "key_2",
          name: "Local Testing sandbox",
          key: "tc_test_9048a12bc983e18a992a77",
          scope: "test",
          created: "2026-07-08",
          requests: 12
        }
      ];
      setKeys(defaultKeys);
      localStorage.setItem("toolchi_api_keys", JSON.stringify(defaultKeys));
    }

    // Default Webhook Logs
    setWebhookLogs([
      { id: "log_1", event: "job.completed", url: "https://mysaas.com/callbacks", time: "10 mins ago", status: "200 OK" },
      { id: "log_2", event: "job.started", url: "https://mysaas.com/callbacks", time: "12 mins ago", status: "200 OK" }
    ]);
  }, []);

  const saveKeys = (updatedKeys: ApiKey[]) => {
    setKeys(updatedKeys);
    localStorage.setItem("toolchi_api_keys", JSON.stringify(updatedKeys));
  };

  const handleGenerateKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName) return;

    const randomHex = Array.from({ length: 22 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
    const newKeyStr = `tc_${newKeyScope}_${randomHex}`;
    
    const newKeyItem: ApiKey = {
      id: "key_" + Date.now(),
      name: newKeyName,
      key: newKeyStr,
      scope: newKeyScope,
      created: new Date().toISOString().split("T")[0],
      requests: 0
    };

    const updated = [newKeyItem, ...keys];
    saveKeys(updated);
    setNewKeyName("");
    import("canvas-confetti").then((m) => m.default({ particleCount: 30, spread: 60 }));
  };

  const handleRevokeKey = (id: string) => {
    const updated = keys.filter(k => k.id !== id);
    saveKeys(updated);
  };

  const toggleShowKey = (id: string) => {
    setShowKeyVal(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopyKey = (keyStr: string) => {
    navigator.clipboard.writeText(keyStr);
    setCopiedKey(keyStr);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSaveWebhook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!webhookUrl) return;
    setWebhookSaved(true);
    setTimeout(() => setWebhookSaved(false), 3000);

    const newLog = {
      id: "log_" + Date.now(),
      event: "webhook.registered",
      url: webhookUrl,
      time: "Just now",
      status: "201 Created"
    };
    setWebhookLogs([newLog, ...webhookLogs]);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0b0f19] text-foreground transition-colors selection:bg-primary/20">

      <main className="max-w-6xl mx-auto px-6 py-12 flex flex-col gap-10">
        
        {/* Upper Dashboard Meta */}
        <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mt-4 border-b border-border/40 pb-6">
          <div className="space-y-1">
            <span className="text-2xs font-extrabold text-primary uppercase tracking-widest">Developer Console</span>
            <h1 className="text-3xl font-black text-[#111827] dark:text-white">API Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-3xs text-muted-foreground font-bold">Billing Plan: <strong className="text-foreground font-extrabold">Free Sandbox</strong></span>
            <Link href="/pricing" className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-3xs font-bold rounded-xl transition-all shadow-sm">
              Upgrade Limits
            </Link>
          </div>
        </section>

        {/* Dashboard Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
          <div className="p-5 border border-border/80 bg-neutral-50/40 dark:bg-card/25 rounded-3xl space-y-2 shadow-xs">
            <span className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-widest block">API Requests</span>
            <h3 className="text-2xl font-black text-[#111827] dark:text-white">497 <span className="text-xs text-muted-foreground font-normal">/ 1,000</span></h3>
            <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-primary h-full w-[49%]" />
            </div>
          </div>
          <div className="p-5 border border-border/80 bg-neutral-50/40 dark:bg-card/25 rounded-3xl space-y-2 shadow-xs">
            <span className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-widest block">Error Rate</span>
            <h3 className="text-2xl font-black text-emerald-500">0.04%</h3>
            <span className="text-3xs text-muted-foreground">Average callback status: 200 OK</span>
          </div>
          <div className="p-5 border border-border/80 bg-neutral-50/40 dark:bg-card/25 rounded-3xl space-y-2 shadow-xs">
            <span className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-widest block">Active Webhooks</span>
            <h3 className="text-2xl font-black text-[#111827] dark:text-white">1</h3>
            <span className="text-3xs text-muted-foreground">Trigger callbacks operational</span>
          </div>
          <div className="p-5 border border-border/80 bg-neutral-50/40 dark:bg-card/25 rounded-3xl space-y-2 shadow-xs">
            <span className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-widest block">Rate Priority</span>
            <h3 className="text-2xl font-black text-amber-500">Standard</h3>
            <span className="text-3xs text-muted-foreground">15 requests/min limit</span>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: API Keys Generator and List */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <div className="border border-border/80 rounded-3xl p-6 bg-white dark:bg-card/20 space-y-6 shadow-xs">
              <div className="flex justify-between items-center border-b border-border/40 pb-3">
                <div className="space-y-0.5">
                  <h3 className="font-black text-base text-[#111827] dark:text-white">API Authentication Keys</h3>
                  <p className="text-3xs text-muted-foreground">Secure your requests by appending bearer headers using these tokens.</p>
                </div>
              </div>

              {/* Form to generate */}
              <form onSubmit={handleGenerateKey} className="flex flex-col sm:flex-row gap-3 items-end">
                <div className="flex-1 space-y-2 w-full">
                  <label htmlFor="keyNameInput" className="text-3xs font-semibold text-muted-foreground uppercase">Key Descriptor Name</label>
                  <input
                    id="keyNameInput"
                    type="text"
                    required
                    placeholder="e.g. My Website App"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-900 border border-border text-xs rounded-xl outline-none focus:border-primary text-foreground font-semibold"
                  />
                </div>
                <div className="space-y-2 w-full sm:w-32">
                  <label htmlFor="keyScopeSelect" className="text-3xs font-semibold text-muted-foreground uppercase">Scope Environment</label>
                  <select
                    id="keyScopeSelect"
                    value={newKeyScope}
                    onChange={(e) => setNewKeyScope(e.target.value)}
                    className="w-full px-3 py-2.5 bg-neutral-50 dark:bg-neutral-900 border border-border text-xs rounded-xl outline-none focus:border-primary text-foreground font-semibold"
                  >
                    <option value="live">tc_live</option>
                    <option value="test">tc_test</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-sm flex items-center gap-1.5 shrink-0 w-full sm:w-auto justify-center active:scale-95"
                >
                  <Plus className="h-4 w-4" /> Generate Key
                </button>
              </form>

              {/* Keys list */}
              <div className="flex flex-col gap-3 max-h-80 overflow-y-auto divide-y divide-border/20">
                {keys.map((keyItem) => {
                  const visible = showKeyVal[keyItem.id] || false;
                  return (
                    <div key={keyItem.id} className="pt-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4 text-xs font-semibold">
                      <div className="space-y-1">
                        <span className="font-extrabold text-foreground">{keyItem.name}</span>
                        <div className="flex items-center gap-2">
                          <span className={`text-[8px] font-extrabold px-1.5 py-0.5 rounded-md ${
                            keyItem.scope === "live" ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" : "bg-blue-500/10 text-blue-500 border border-blue-500/20"
                          }`}>
                            {keyItem.scope.toUpperCase()}
                          </span>
                          <span className="text-[10px] text-muted-foreground">Generated {keyItem.created}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <div className="flex-1 font-mono text-[10px] p-2 bg-neutral-50 dark:bg-neutral-950 rounded-xl border border-border/40 select-all overflow-x-auto whitespace-nowrap min-w-48 text-[#7d4dff]">
                          {visible ? keyItem.key : `${keyItem.key.substring(0, 8)}********************`}
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => toggleShowKey(keyItem.id)}
                            className="p-2 border border-border/80 hover:bg-neutral-50 dark:hover:bg-neutral-900 rounded-xl text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                            title={visible ? "Hide Key" : "Show Key"}
                          >
                            {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                          <button
                            onClick={() => handleCopyKey(keyItem.key)}
                            className="p-2 border border-border/80 hover:bg-neutral-50 dark:hover:bg-neutral-900 rounded-xl text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                            title="Copy Key"
                          >
                            {copiedKey === keyItem.key ? <CheckCircle className="h-4 w-4 text-emerald-500" /> : <Code className="h-4 w-4" />}
                          </button>
                          <button
                            onClick={() => handleRevokeKey(keyItem.id)}
                            className="p-2 border border-border/80 hover:bg-rose-500/10 text-muted-foreground hover:text-rose-400 rounded-xl cursor-pointer transition-colors"
                            title="Revoke Key"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {keys.length === 0 && (
                  <div className="text-center py-6 text-muted-foreground/60 text-3xs flex flex-col items-center gap-2 select-none">
                    <Key className="h-8 w-8 text-muted-foreground/20" />
                    <span>No active API tokens found. Generate one to authenticate.</span>
                  </div>
                )}
              </div>
            </div>

            {/* API Usage logs */}
            <div className="border border-border/80 rounded-3xl p-6 bg-white dark:bg-card/20 space-y-4 shadow-xs">
              <div>
                <h3 className="font-black text-base text-[#111827] dark:text-white">API Endpoint Query Logs</h3>
                <p className="text-3xs text-muted-foreground">List of recent requests processed on Next.js backend API routes.</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-3xs font-semibold text-muted-foreground">
                  <thead>
                    <tr className="border-b border-border/40 text-[9px] uppercase tracking-wider">
                      <th className="py-2.5 pb-2 text-[#111827] dark:text-white">Time</th>
                      <th className="py-2.5 pb-2 text-[#111827] dark:text-white">Endpoint</th>
                      <th className="py-2.5 pb-2 text-[#111827] dark:text-white">Status</th>
                      <th className="py-2.5 pb-2 text-[#111827] dark:text-white">Execution</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/25">
                    <tr>
                      <td className="py-2.5">Just now</td>
                      <td className="py-2.5 font-mono text-[9px] text-[#7d4dff]">POST /api/v1/ai/title-generator</td>
                      <td className="py-2.5"><span className="text-emerald-500">200 OK</span></td>
                      <td className="py-2.5">142ms</td>
                    </tr>
                    <tr>
                      <td className="py-2.5">3 mins ago</td>
                      <td className="py-2.5 font-mono text-[9px] text-[#7d4dff]">POST /api/v1/seo/robots-check</td>
                      <td className="py-2.5"><span className="text-emerald-500">200 OK</span></td>
                      <td className="py-2.5">310ms</td>
                    </tr>
                    <tr>
                      <td className="py-2.5">15 mins ago</td>
                      <td className="py-2.5 font-mono text-[9px] text-[#7d4dff]">POST /api/v1/seo/redirect-check</td>
                      <td className="py-2.5"><span className="text-emerald-500">301 Moved</span></td>
                      <td className="py-2.5">244ms</td>
                    </tr>
                    <tr>
                      <td className="py-2.5">1 hr ago</td>
                      <td className="py-2.5 font-mono text-[9px] text-[#7d4dff]">POST /api/v1/ai/outline-generator</td>
                      <td className="py-2.5"><span className="text-emerald-500">200 OK</span></td>
                      <td className="py-2.5">165ms</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column: Webhook Simulator Config */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="border border-border/80 rounded-3xl p-6 bg-white dark:bg-card/20 space-y-4 shadow-xs">
              <div className="space-y-1">
                <h3 className="font-black text-base text-[#111827] dark:text-white">Webhook Integration</h3>
                <p className="text-3xs text-muted-foreground">Register callback URL listeners to receive automated completion notifications.</p>
              </div>

              <form onSubmit={handleSaveWebhook} className="flex flex-col gap-3">
                <input
                  type="url"
                  required
                  placeholder="https://yourdomain.com/callbacks"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-900 border border-border text-xs rounded-xl outline-none focus:border-primary text-foreground font-semibold"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-sm active:scale-95"
                >
                  {webhookSaved ? "Saved callback link!" : "Save Webhook Link"}
                </button>
              </form>

              {/* Webhook logs */}
              <div className="space-y-2 pt-4 border-t border-border/40">
                <span className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-widest block mb-2.5">Webhook Trigger Logs</span>
                <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
                  {webhookLogs.map((wl) => (
                    <div key={wl.id} className="p-3 bg-neutral-50 dark:bg-neutral-950 border border-border/40 rounded-xl text-3xs font-semibold text-muted-foreground leading-normal flex flex-col gap-1">
                      <div className="flex justify-between items-center">
                        <span className="font-extrabold text-[#7d4dff]">{wl.event}</span>
                        <span className="text-emerald-500 font-bold">{wl.status}</span>
                      </div>
                      <div className="text-[9px] text-muted-foreground truncate">{wl.url}</div>
                      <div className="text-[8px] text-muted-foreground/60">{wl.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

