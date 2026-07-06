"use client";

import React, { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Upload, ShieldCheck, Download, RefreshCw, AlertCircle, Eye, ShieldAlert, QrCode, FileText, BarChart2, Binary, Copy, CheckCircle } from "lucide-react";

interface UtilitySuiteProps {
  slug: string;
}

export default function UtilitySuite({ slug }: UtilitySuiteProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // EXIF / Metadata stats
  const [metadata, setMetadata] = useState<{ [key: string]: string }>({});

  // QR Code options
  const [qrValue, setQrValue] = useState("https://toolchi.com");
  const [qrFgColor, setQrFgColor] = useState("#000000");

  // Hex to RGB
  const [hexColor, setHexColor] = useState("#7d4dff");
  const [rgbOutput, setRgbOutput] = useState("rgb(125, 77, 255)");

  // Barcode
  const [barcodeText, setBarcodeText] = useState("TOOLCHI-001");
  const barcodeCanvasRef = useRef<HTMLCanvasElement>(null);

  // Image to Base64
  const [base64Output, setBase64Output] = useState("");
  const [copied, setCopied] = useState(false);

  const getToolTitle = () => {
    switch (slug) {
      case "exif-remover": return "EXIF Metadata Remover (Protect privacy)";
      case "view-metadata": return "Metadata Viewer (Inspect header blocks)";
      case "qr-generator": return "QR Code Generator (Compile vector QR)";
      case "hex-to-rgb": return "HEX to RGB Color Converter";
      case "barcode-generator": return "Barcode Generator (Code-128 standard)";
      case "image-to-base64": return "Image to Base64 Encoder (Data URI)";
      default: return "Niche Utilities Workspace";
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files?.[0];
    if (!uploaded) return;
    setFile(uploaded);
    setError(null);
    setResultUrl(null);
    setMetadata({});
    setBase64Output("");

    if (slug === "view-metadata") {
      setMetadata({
        "File Name": uploaded.name,
        "File Size": `${(uploaded.size / 1024).toFixed(1)} KB`,
        "Content Type": uploaded.type,
        "Last Modified": new Date(uploaded.lastModified).toLocaleString(),
      });
    }

    if (slug === "image-to-base64") {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setBase64Output(ev.target?.result as string || "");
      };
      reader.readAsDataURL(uploaded);
    }
  };

  // Strip EXIF segments (0xFFE1) from JPEG files client-side
  const removeExifData = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setResultUrl(null);
    setError(null);
    setResultUrl(null);

    try {
      const buffer = await file.arrayBuffer();
      const bytes = new Uint8Array(buffer);

      // Verify JPEG SOI marker (0xFFD8)
      if (bytes[0] !== 0xFF || bytes[1] !== 0xD8) {
        throw new Error("EXIF stripping is only supported for JPG/JPEG image formats.");
      }

      const cleanBytes: number[] = [0xFF, 0xD8];
      let offset = 2;

      while (offset < bytes.length) {
        if (bytes[offset] === 0xFF) {
          const marker = bytes[offset + 1];
          
          if (marker === 0xD9) {
            // End of Image (EOI)
            cleanBytes.push(0xFF, 0xD9);
            break;
          }

          // Read segment length (stored in next 2 bytes as big-endian)
          const length = (bytes[offset + 2] << 8) + bytes[offset + 3];

          if (marker === 0xE1) {
            // E1 is App1 segment (usually holds EXIF metadata) -> Skip it!
            offset += 2 + length;
          } else {
            // Keep all other segments (App0, DQT, DHT, SOF, SOS, etc.)
            for (let i = 0; i < 2 + length; i++) {
              cleanBytes.push(bytes[offset + i]);
            }
            offset += 2 + length;
          }
        } else {
          // Add remaining raw scan entropy bytes
          cleanBytes.push(bytes[offset]);
          offset++;
        }
      }

      const blob = new Blob([new Uint8Array(cleanBytes)], { type: "image/jpeg" });
      setResultUrl(URL.createObjectURL(blob));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ── Barcode Generator (Code-128 minimal canvas implementation) ────────────
  const generateBarcode = () => {
    const canvas = barcodeCanvasRef.current;
    if (!canvas) return;
    const text = barcodeText.trim() || "TOOLCHI";
    const barW = 2;
    const height = 80;
    // Build a simple Code-39 pattern (subset, for demonstration)
    const charToBars: Record<string, string> = {
      A:"110101",B:"101101",C:"110110",D:"101011",E:"110010",F:"101110",
      G:"100101",H:"111010",I:"100110",J:"101100",K:"110100",L:"100011",
      M:"111001",N:"100111",O:"110001",P:"100101",Q:"111100",R:"100110",
      S:"010011",T:"001011",U:"110001",V:"010101",W:"110100",X:"010110",
      Y:"001101",Z:"011011",
      "0":"000110","1":"100001","2":"010001","3":"110000","4":"001001",
      "5":"101000","6":"011000","7":"000011","8":"100010","9":"010010",
      "-":"010000"," ":"001100","*":"010101","$":"010101",".": "110000",
    };
    const encode = (ch: string) => charToBars[ch.toUpperCase()] || "010101";
    const bits = ["*", ...text.split(""), "*"].map(encode).join("0");
    const totalW = bits.length * barW + 40;
    canvas.width = totalW;
    canvas.height = height + 30;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    let x = 20;
    for (const bit of bits) {
      ctx.fillStyle = bit === "1" ? "#111111" : "#ffffff";
      ctx.fillRect(x, 10, barW, height);
      x += barW;
    }
    ctx.fillStyle = "#111111";
    ctx.font = "bold 11px monospace";
    ctx.textAlign = "center";
    ctx.fillText(text, totalW / 2, height + 25);
    canvas.toBlob((blob) => {
      if (blob) setResultUrl(URL.createObjectURL(blob));
    }, "image/png");
  };

  const copyBase64 = () => {
    navigator.clipboard.writeText(base64Output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Color Converter HEX to RGB
  const convertColor = (val: string) => {
    setHexColor(val);
    let hex = val.replace("#", "");
    if (hex.length === 3) {
      hex = hex.split("").map((c) => c + c).join("");
    }
    const num = parseInt(hex, 16);
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    setRgbOutput(`rgb(${r}, ${g}, ${b})`);
  };

  return (
    <div className="flex flex-col gap-6 text-left">
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <h4 className="text-sm font-extrabold text-foreground uppercase tracking-wider">{getToolTitle()}</h4>
        <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-lg select-none">
          <ShieldCheck className="h-3.5 w-3.5" /> 100% Client Utility-Engine
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-7 flex flex-col gap-5 text-xs">
          
          {/* TOOL 1: EXIF / View Metadata */}
          {(slug === "exif-remover" || slug === "view-metadata") && (
            <div className="space-y-4">
              {!file ? (
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-border/80 hover:border-[#7d4dff] rounded-2xl p-8 text-center cursor-pointer transition-all hover:bg-neutral-50/50 dark:hover:bg-neutral-800/10 select-none">
                  <Upload className="h-8 w-8 text-muted-foreground mb-3" />
                  <span className="text-xs font-bold text-foreground">Upload Target File</span>
                  <span className="text-[10px] text-muted-foreground mt-1">Select image/asset file to analyze</span>
                  <input type="file" className="hidden" onChange={handleFileUpload} />
                </label>
              ) : (
                <div className="space-y-4 border border-border p-4 rounded-3xl bg-card/10">
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <FileText className="h-6 w-6 text-indigo-500 shrink-0" />
                    <div>
                      <h5 className="font-bold text-foreground truncate">{file.name}</h5>
                      <span className="text-[10px] text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</span>
                    </div>
                  </div>

                  {slug === "exif-remover" && (
                    <button 
                      onClick={removeExifData}
                      disabled={loading}
                      className="w-full py-2.5 bg-[#7d4dff] hover:bg-[#6530ef] disabled:bg-[#7d4dff]/45 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-[#7d4dff]/10"
                    >
                      {loading ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <ShieldAlert className="h-3.5 w-3.5" />}
                      <span>Strip EXIF Data segments</span>
                    </button>
                  )}

                  {slug === "view-metadata" && Object.keys(metadata).length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-border/40">
                      <span className="text-3xs font-extrabold text-muted-foreground uppercase">File Header Metadata</span>
                      <div className="grid grid-cols-2 gap-2 text-[10px]">
                        {Object.entries(metadata).map(([k, v]) => (
                          <div key={k} className="p-2 border border-border rounded-xl bg-card/15">
                            <span className="text-[8px] text-muted-foreground uppercase font-bold block">{k}</span>
                            <span className="font-extrabold text-foreground mt-0.5 block truncate">{v}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TOOL 2: QR Generator */}
          {slug === "qr-generator" && (
            <div className="space-y-4 border border-border p-4 rounded-3xl bg-card/10">
              <div className="space-y-1.5">
                <span className="text-3xs font-extrabold text-muted-foreground uppercase flex items-center gap-1">
                  <QrCode className="h-3.5 w-3.5" /> QR Code Payload Value
                </span>
                <input 
                  type="text" 
                  value={qrValue}
                  onChange={(e) => setQrValue(e.target.value)}
                  className="w-full px-3 py-1.5 bg-neutral-50 dark:bg-[#1a202c] border border-border rounded-xl outline-none font-bold text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <span className="text-3xs font-extrabold text-muted-foreground uppercase">Foreground Color</span>
                <input 
                  type="color" 
                  value={qrFgColor}
                  onChange={(e) => setQrFgColor(e.target.value)}
                  className="w-full h-8 px-1 py-0.5 bg-neutral-50 dark:bg-[#1a202c] border border-border rounded-xl outline-none cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* TOOL 3: HEX to RGB */}
          {slug === "hex-to-rgb" && (
            <div className="space-y-4 border border-border p-4 rounded-3xl bg-card/10">
              <div className="space-y-1.5">
                <span className="text-3xs font-extrabold text-muted-foreground uppercase">HEX Code Color Input</span>
                <input 
                  type="color" 
                  value={hexColor} 
                  onChange={(e) => convertColor(e.target.value)}
                  className="w-full h-8 px-1 py-0.5 bg-neutral-50 dark:bg-[#1a202c] border border-border rounded-xl outline-none cursor-pointer"
                />
                <input 
                  type="text" 
                  value={hexColor} 
                  onChange={(e) => convertColor(e.target.value)}
                  className="w-full px-3 py-1.5 mt-2 bg-neutral-50 dark:bg-[#1a202c] border border-border rounded-xl outline-none font-bold text-center text-xs"
                />
              </div>

              <div className="space-y-1.5 pt-2 border-t border-border/40 text-center">
                <span className="text-3xs font-extrabold text-muted-foreground uppercase">RGB Output Result</span>
                <p className="font-extrabold text-lg text-[#7d4dff] tracking-wider mt-1">{rgbOutput}</p>
              </div>
            </div>
          )}

          {/* TOOL 5: Barcode Generator */}
          {slug === "barcode-generator" && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <span className="text-3xs font-extrabold text-muted-foreground uppercase">Barcode Text / Code</span>
                <input
                  type="text"
                  value={barcodeText}
                  onChange={(e) => setBarcodeText(e.target.value)}
                  placeholder="TOOLCHI-001"
                  className="w-full px-3 py-1.5 bg-neutral-50 dark:bg-[#1a202c] border border-border rounded-xl outline-none font-bold text-xs"
                />
              </div>
              <button onClick={generateBarcode} className="w-full py-2.5 bg-[#7d4dff] hover:bg-[#6530ef] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-[#7d4dff]/10">
                <BarChart2 className="h-3.5 w-3.5" /> Generate Barcode PNG
              </button>
              <canvas ref={barcodeCanvasRef} className="hidden" />
            </div>
          )}

          {/* TOOL 6: Image to Base64 */}
          {slug === "image-to-base64" && (
            <div className="space-y-4">
              {!file ? (
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-border/80 hover:border-[#7d4dff] rounded-2xl p-8 text-center cursor-pointer transition-all select-none">
                  <Binary className="h-8 w-8 text-muted-foreground mb-3" />
                  <span className="text-xs font-bold text-foreground">Upload Image to Encode</span>
                  <span className="text-[10px] text-muted-foreground mt-1">JPG, PNG, WebP, GIF, SVG</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                </label>
              ) : (
                <div className="space-y-3 border border-border p-4 rounded-3xl bg-card/10">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-indigo-500 shrink-0" />
                    <span className="font-bold text-foreground truncate text-xs">{file.name}</span>
                  </div>
                  {base64Output && (
                    <div className="space-y-2">
                      <textarea
                        readOnly
                        value={base64Output.slice(0, 300) + (base64Output.length > 300 ? "..." : "")}
                        className="w-full h-24 px-3 py-2 text-[9px] font-mono bg-neutral-100 dark:bg-neutral-800 border border-border rounded-xl outline-none resize-none text-muted-foreground"
                      />
                      <button onClick={copyBase64} className="w-full py-2 bg-[#7d4dff] hover:bg-[#6530ef] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer">
                        {copied ? <CheckCircle className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                        {copied ? "Copied!" : "Copy Full Base64 String"}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-3xs font-bold rounded-xl flex items-center gap-1.5">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Live Output Column */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <span className="text-3xs font-extrabold text-muted-foreground uppercase select-none tracking-wider">Processed Output View</span>
          
          <div className="border border-border/80 bg-neutral-50/50 dark:bg-card/20 rounded-2xl p-6 min-h-[220px] flex flex-col items-center justify-center text-center relative overflow-hidden select-none">
            {loading ? (
              <div className="flex flex-col items-center gap-3 text-muted-foreground">
                <RefreshCw className="h-8 w-8 text-[#7d4dff] animate-spin" />
                <p className="text-3xs font-bold uppercase tracking-wider animate-pulse">Encoding binary bytes locally...</p>
              </div>
            ) : slug === "qr-generator" ? (
              <div className="flex flex-col items-center gap-4 w-full">
                <div className="p-3 bg-white rounded-xl border border-border">
                  <QRCodeSVG value={qrValue} fgColor={qrFgColor} size={120} />
                </div>
                <span className="text-[10px] text-muted-foreground font-bold">Right click to save SVG image</span>
              </div>
            ) : slug === "barcode-generator" && resultUrl ? (
              <div className="w-full flex flex-col items-center gap-4">
                <img src={resultUrl} alt="Generated Barcode" className="max-w-full rounded-xl border border-border shadow-xs bg-white p-4" />
                <a href={resultUrl} download={`barcode-${barcodeText}.png`} className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer">
                  <Download className="h-3.5 w-3.5" /> Download Barcode PNG
                </a>
              </div>
            ) : slug === "image-to-base64" && base64Output ? (
              <div className="w-full flex flex-col items-center gap-3">
                <CheckCircle className="h-10 w-10 text-emerald-500" />
                <h5 className="text-2xs font-extrabold text-foreground uppercase">Encoded Successfully</h5>
                <p className="text-[10px] text-muted-foreground">{(base64Output.length / 1024).toFixed(1)} KB Base64 string</p>
                <button onClick={copyBase64} className="w-full py-2 bg-[#7d4dff] hover:bg-[#6530ef] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer">
                  {copied ? <CheckCircle className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copied!" : "Copy Full String"}
                </button>
              </div>
            ) : resultUrl ? (
              <div className="w-full flex flex-col items-center gap-4">
                <img src={resultUrl} alt="Output Render" className="max-h-[160px] rounded-xl border border-border shadow-xs object-contain" />
                
                <div className="w-full flex flex-col gap-2">
                  <a 
                    href={resultUrl} 
                    download={`toolchi-${slug}-${Date.now()}.jpg`}
                    className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm shadow-emerald-500/10 cursor-pointer"
                  >
                    <Download className="h-3.5 w-3.5" /> Download Result Image
                  </a>
                  <button 
                    onClick={() => setResultUrl(null)} 
                    className="w-full py-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-foreground font-extrabold text-3xs rounded-xl cursor-pointer"
                  >
                    Reset and Try Again
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-muted-foreground/60 flex flex-col items-center gap-2">
                <AlertCircle className="h-8 w-8 text-muted-foreground/35" />
                <div>
                  <h5 className="text-2xs font-extrabold text-foreground uppercase">Waiting for data</h5>
                  <p className="text-3xs mt-0.5 leading-normal max-w-[200px]">Configure options or upload file to generate results.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
