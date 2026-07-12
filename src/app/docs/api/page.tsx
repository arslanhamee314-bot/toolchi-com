"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Terminal, Key, Code, Play, CheckCircle, ArrowLeft, RefreshCw, AlertCircle, Copy } from "lucide-react";
import Header from "@/components/Header";

interface Endpoint {

  id: string;
  method: string;
  path: string;
  category: string;
  title: string;
  desc: string;
  defaultPayload: Record<string, any>;
  liveUrl: string;
}

export default function ApiDocsPlayground() {
  const [selectedLang, setSelectedLang] = useState<"curl" | "node" | "python">("curl");
  const [activeEndpointId, setActiveEndpointId] = useState("ai-title");
  const [payloadText, setPayloadText] = useState("");
  const [responseJson, setResponseJson] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const endpoints: Endpoint[] = [
    {
      id: "ai-title",
      method: "POST",
      path: "/api/v1/ai/title-generator",
      category: "AI / Blogging",
      title: "Generate Blog Titles",
      desc: "Returns 5 high-impact blog title ideas based on a target topic and style tone.",
      defaultPayload: {
        topic: "NextJS 15 static rendering",
        tone: "professional"
      },
      liveUrl: "/api/v1/ai/title-generator"
    },
    {
      id: "ai-outline",
      method: "POST",
      path: "/api/v1/ai/outline-generator",
      category: "AI / Blogging",
      title: "Generate Outline Structure",
      desc: "Creates structured H2, H3 heading segments for content draft outlines.",
      defaultPayload: {
        topic: "React Compiler optimization guides",
        depth: "detailed"
      },
      liveUrl: "/api/v1/ai/outline-generator"
    },
    {
      id: "seo-robots",
      method: "POST",
      path: "/api/v1/seo/robots-check",
      category: "SEO / Webmaster",
      title: "Check Robots.txt Presence",
      desc: "Validates if robots.txt files exist on target domains and identifies sitemaps.",
      defaultPayload: {
        domain: "github.com"
      },
      liveUrl: "/api/v1/seo/robots-check"
    },
    {
      id: "seo-sitemap",
      method: "POST",
      path: "/api/v1/seo/sitemap-validate",
      category: "SEO / Webmaster",
      title: "Sitemap XML Validator",
      desc: "Validates sitemap schema structures and returns total mapped URLs.",
      defaultPayload: {
        url: "https://toolchi.online/sitemap.xml"
      },
      liveUrl: "/api/v1/seo/sitemap-validate"
    },
    {
      id: "seo-redirect",
      method: "POST",
      path: "/api/v1/seo/redirect-check",
      category: "SEO / Webmaster",
      title: "Redirect Chain Auditor",
      desc: "Audits redirect path hops to find loop cycles and final HTTP codes.",
      defaultPayload: {
        url: "http://toolchi.online"
      },
      liveUrl: "/api/v1/seo/redirect-check"
    }
  ];

  const activeEndpoint = endpoints.find(e => e.id === activeEndpointId) || endpoints[0];

  // Initialize payload text on switch
  React.useEffect(() => {
    setPayloadText(JSON.stringify(activeEndpoint.defaultPayload, null, 2));
    setResponseJson(null);
  }, [activeEndpointId]);

  const handleRunRequest = async () => {
    setLoading(true);
    setResponseJson(null);
    try {
      const parsedBody = JSON.parse(payloadText);
      const res = await fetch(activeEndpoint.liveUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(parsedBody)
      });
      const data = await res.json();
      setResponseJson(data);
    } catch (err: any) {
      setResponseJson({
        error: "Execution failed",
        reason: err.message,
        tip: "Please verify that the JSON syntax in your payload editor is fully valid."
      });
    } finally {
      setLoading(false);
    }
  };

  const getCodeSnippet = () => {
    const payloadStr = payloadText.trim();
    if (selectedLang === "curl") {
      return `curl -X POST https://toolchi.online${activeEndpoint.path} \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer tc_live_xxxxxx" \\
  -d '${payloadStr.replace(/\n/g, " ").replace(/\s+/g, " ")}'`;
    }
    if (selectedLang === "node") {
      return `const res = await fetch("https://toolchi.online${activeEndpoint.path}", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer tc_live_xxxxxx"
  },
  body: JSON.stringify(${payloadStr})
});
const data = await res.json();
console.log(data);`;
    }
    return `import requests

url = "https://toolchi.online${activeEndpoint.path}"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer tc_live_xxxxxx"
}
payload = ${payloadStr}

response = requests.post(url, json=payload, headers=headers)
print(response.json())`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getCodeSnippet());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0b0f19] text-foreground transition-colors">
      <Header />

      <main className="max-w-6xl mx-auto px-6 py-12 flex flex-col gap-8">
        <Link href="/developers" className="flex items-center gap-2 text-xs font-bold text-[#7d4dff] hover:underline w-fit">
          <ArrowLeft className="h-4 w-4" /> Back to Developer Portal
        </Link>

        {/* Title */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-black text-[#111827] dark:text-white">API Playground & Interactive Docs</h1>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Test Toolchi endpoints directly in your browser. Configure parameters on the left and see live JSON responses on the right.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar selector */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <span className="text-3xs font-extrabold text-muted-foreground uppercase tracking-widest select-none">Available Endpoints</span>
            <div className="flex flex-col gap-1.5">
              {endpoints.map((ep) => (
                <button
                  key={ep.id}
                  onClick={() => setActiveEndpointId(ep.id)}
                  className={`w-full text-left p-3.5 rounded-2xl border text-xs transition-all cursor-pointer ${
                    ep.id === activeEndpointId
                      ? "bg-primary/5 border-primary text-primary font-bold shadow-xs"
                      : "bg-neutral-50/50 dark:bg-card/25 border-border hover:border-neutral-400 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="text-[9px] font-extrabold uppercase tracking-wide opacity-75 block mb-1">{ep.category}</span>
                  <div className="flex items-center gap-1.5 justify-between">
                    <span className="font-extrabold">{ep.title}</span>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 border border-border/40 rounded-md">POST</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="p-4 bg-amber-500/5 text-amber-500 rounded-2xl border border-amber-500/10 text-3xs leading-relaxed font-semibold mt-4">
              Sandbox endpoints are open for testing. Production API keys, rate limits, and usage logging should be enabled before public launch.
            </div>
          </div>

          {/* Left Column: API Detail & Code */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="border border-border/80 rounded-3xl p-5 bg-neutral-50/40 dark:bg-card/20 space-y-4">
              <div>
                <h3 className="font-black text-base text-[#111827] dark:text-white">{activeEndpoint.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mt-1">{activeEndpoint.desc}</p>
              </div>

              <div className="flex items-center gap-2 font-mono text-[10px] font-bold">
                <span className="px-2 py-1 bg-primary text-white rounded-md">POST</span>
                <span className="text-muted-foreground">https://toolchi.online{activeEndpoint.path}</span>
              </div>
            </div>

            {/* Language tabs & Snippet */}
            <div className="border border-border/80 rounded-3xl overflow-hidden bg-neutral-950 text-white shadow-md">
              <div className="flex justify-between items-center bg-neutral-900 border-b border-border/30 px-4 py-2">
                <div className="flex gap-2">
                  {(["curl", "node", "python"] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setSelectedLang(lang)}
                      className={`text-[10px] font-bold uppercase py-1 px-2.5 rounded-lg cursor-pointer transition-all ${
                        selectedLang === lang ? "bg-white/10 text-white" : "text-muted-foreground hover:text-white"
                      }`}
                    >
                      {lang === "node" ? "NodeJS" : lang}
                    </button>
                  ))}
                </div>
                <button
                  onClick={copyToClipboard}
                  className="p-1 hover:bg-white/10 rounded-lg text-muted-foreground hover:text-white transition-colors cursor-pointer"
                  title="Copy to Clipboard"
                >
                  {copied ? <CheckCircle className="h-4.5 w-4.5 text-emerald-400" /> : <Copy className="h-4.5 w-4.5" />}
                </button>
              </div>
              <pre className="p-4 overflow-x-auto text-[9px] font-mono leading-relaxed text-indigo-300 whitespace-pre">
                {getCodeSnippet()}
              </pre>
            </div>

            {/* Payload Editor */}
            <div className="flex flex-col gap-2">
              <span className="text-3xs font-extrabold text-muted-foreground uppercase tracking-widest block">Payload Parameters</span>
              <textarea
                value={payloadText}
                onChange={(e) => setPayloadText(e.target.value)}
                rows={5}
                className="w-full p-4 bg-neutral-950 text-emerald-400 font-mono text-[10px] border border-border/80 rounded-2xl outline-none focus:border-primary shadow-xs leading-relaxed"
              />
            </div>

            <button
              onClick={handleRunRequest}
              disabled={loading}
              className="w-full py-3 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-2xl flex items-center justify-center gap-2 shadow-md shadow-primary/10 transition-all cursor-pointer active:scale-98 disabled:opacity-50"
            >
              {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
              <span>Run Request Query</span>
            </button>
          </div>

          {/* Right Column: Execution Response */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <span className="text-3xs font-extrabold text-muted-foreground uppercase tracking-widest select-none">API Execution Response</span>

            <div className="border border-border/80 bg-neutral-950 text-white rounded-3xl p-5 min-h-[300px] flex flex-col relative overflow-hidden shadow-md">
              <div className="absolute top-3.5 right-3.5 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] text-muted-foreground font-mono">Live Logs</span>
              </div>

              {responseJson ? (
                <pre className="text-[9px] font-mono text-emerald-400 leading-relaxed overflow-x-auto whitespace-pre-wrap flex-1 mt-4">
                  {JSON.stringify(responseJson, null, 2)}
                </pre>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center gap-2 text-muted-foreground select-none">
                  {loading ? (
                    <>
                      <RefreshCw className="h-8 w-8 text-primary animate-spin" />
                      <span className="text-[10px] font-extrabold uppercase tracking-wider">Awaiting server callback...</span>
                    </>
                  ) : (
                    <>
                      <Terminal className="h-8 w-8 text-muted-foreground/35" />
                      <div>
                        <h5 className="text-2xs font-extrabold text-foreground uppercase">Console Ready</h5>
                        <p className="text-3xs mt-1 leading-normal max-w-[200px] mx-auto text-muted-foreground/80">Configure request params and click Run Query to trigger API handlers.</p>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Complete Spec Documentation */}
        <section className="border-t border-border/60 pt-12 mt-8 space-y-10 text-left">
          
          {/* Quickstart */}
          <div className="space-y-4">
            <h2 className="text-xl font-black text-[#111827] dark:text-white flex items-center gap-2">
              <Code className="h-5 w-5 text-primary" /> 1. Quickstart (Get Started in 60 Seconds)
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Integrating Toolchi automation in your codebase is simple. Follow these steps to trigger your first query:
            </p>
            <ol className="list-decimal pl-5 text-xs text-muted-foreground space-y-2">
              <li>Navigate to the <Link href="/dashboard" className="text-primary hover:underline font-semibold">Developer Console Dashboard</Link>.</li>
              <li>Click the <strong>"Generate New API Key"</strong> button to compile your sandbox key (`tc_live_...` or `tc_test_...`).</li>
              <li>Copy the token and attach it as a Bearer credentials token in the authorization headers of your POST requests.</li>
            </ol>
          </div>

          {/* Authentication specs */}
          <div className="space-y-4">
            <h2 className="text-xl font-black text-[#111827] dark:text-white flex items-center gap-2">
              <Key className="h-5 w-5 text-primary" /> 2. Authentication Flow
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              All API requests directed to Toolchi server endpoints must include a secure authorization bearer token. Queries containing missing or invalid keys will fail with a `401 Unauthorized` response code.
            </p>
            <div className="bg-neutral-950 text-indigo-300 p-4 rounded-2xl font-mono text-[10px] leading-relaxed">
              Authorization: Bearer tc_live_your_actual_key_here
            </div>
          </div>

          {/* Response Status Codes */}
          <div className="space-y-4">
            <h2 className="text-xl font-black text-[#111827] dark:text-white flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-primary" /> 3. Response Status Codes Reference
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Our REST endpoints utilize standard HTTP status indicators to communicate response status:
            </p>
            <div className="overflow-x-auto border border-border/80 rounded-2xl">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-neutral-50 dark:bg-card border-b border-border/80 font-bold text-foreground">
                    <th className="p-3">Status Code</th>
                    <th className="p-3">Meaning</th>
                    <th className="p-3">Description / Mitigation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40 text-muted-foreground">
                  <tr>
                    <td className="p-3 font-mono font-bold text-emerald-500">200 OK</td>
                    <td className="p-3 font-semibold text-foreground">Success</td>
                    <td className="p-3 leading-relaxed">The request completed successfully. Results are returned in the payload body.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono font-bold text-amber-500">400 Bad Request</td>
                    <td className="p-3 font-semibold text-foreground">Invalid Payload</td>
                    <td className="p-3 leading-relaxed">Required parameters are missing, or JSON input formatting contains syntax errors.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono font-bold text-rose-500">401 Unauthorized</td>
                    <td className="p-3 font-semibold text-foreground">Access Denied</td>
                    <td className="p-3 leading-relaxed">The Authorization header is missing, malformed, or using an inactive API key.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono font-bold text-rose-400">429 Too Many Requests</td>
                    <td className="p-3 font-semibold text-foreground">Rate Limit Exceeded</td>
                    <td className="p-3 leading-relaxed">Your monthly request allocation has been exhausted. Upgrade your plan to increase limits.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Rate Limits */}
          <div className="space-y-4">
            <h2 className="text-xl font-black text-[#111827] dark:text-white flex items-center gap-2">
              <Terminal className="h-5 w-5 text-primary" /> 4. Rate Limits & Throttling
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              API allocation is reset on the first day of each calendar month. The standard **Developer API Plus** plan provides a quota of <strong>25,000 requests/month</strong>. Standard headers are appended to all endpoints to monitor usage margins:
            </p>
            <ul className="list-disc pl-5 text-xs text-muted-foreground space-y-1 leading-relaxed">
              <li><code className="bg-neutral-100 dark:bg-card px-1 py-0.5 rounded text-foreground font-mono">X-RateLimit-Limit</code>: Total allowed requests inside the current billing cycle.</li>
              <li><code className="bg-neutral-100 dark:bg-card px-1 py-0.5 rounded text-foreground font-mono">X-RateLimit-Remaining</code>: Number of requests remaining for the active calendar month.</li>
            </ul>
          </div>

          {/* Webhooks sample */}
          <div className="space-y-4 pb-8">
            <h2 className="text-xl font-black text-[#111827] dark:text-white flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" /> 5. Webhooks & Event Receivers
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Register a destination Webhook URL in your Developer Console to receive asynchronous callback triggers. Once long-running operations (like bulk video conversions) complete, we transmit a POST request with the following JSON format:
            </p>
            <pre className="bg-neutral-950 text-emerald-400 p-4 rounded-2xl font-mono text-[9px] leading-relaxed overflow-x-auto">
{`{
  "event": "tool.completed",
  "timestamp": 1783588755,
  "payload": {
    "tool_slug": "compress-image",
    "status": "success",
    "output_file": {
      "name": "hero-optimized.webp",
      "size_bytes": 104857,
      "url": "https://api.toolchi.online/outputs/f837d7a8-44fa-41ea-bfcf-7a3891b29a28"
    }
  }
}`}
            </pre>
          </div>

        </section>
      </main>
    </div>
  );
}
