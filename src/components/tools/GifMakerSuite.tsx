"use client";

import React, { useState, useRef, useEffect } from "react";
import { GIFEncoder } from "@/lib/gif-encoder";
import { Upload, Film, FileImage, ShieldCheck, Download, Play, Pause, RefreshCw, AlertCircle, BarChart2 } from "lucide-react";

interface GifMakerSuiteProps {
  slug: string;
}

interface UploadedFile {
  name: string;
  url: string;
  delayMs: number;
}

export default function GifMakerSuite({ slug }: GifMakerSuiteProps) {
  // Common states
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [delay, setDelay] = useState<number>(200); // Frame delay in ms

  // Video-to-GIF states
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(3);
  const [fps, setFps] = useState<number>(10);
  const videoRef = useRef<HTMLVideoElement>(null);

  // GIF-to-Video states
  const [gifUrl, setGifUrl] = useState<string | null>(null);
  const [gifWidth, setGifWidth] = useState<number>(300);
  const [gifHeight, setGifHeight] = useState<number>(300);
  
  // GIF Analyzer states
  const [analysisReport, setAnalysisReport] = useState<{
    width: number;
    height: number;
    frameCount: number;
    delays: number[];
    isAnimated: boolean;
    fileSize: number;
  } | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Reset state when tool changes
  useEffect(() => {
    setFiles([]);
    setResultUrl(null);
    setError(null);
    setVideoUrl(null);
    setGifUrl(null);
    setAnalysisReport(null);
  }, [slug]);

  // Translate Slug into title
  const getToolTitle = () => {
    switch (slug) {
      case "gif-maker": return "GIF Maker (Images to Animated GIF)";
      case "video-to-gif": return "Video to GIF Converter";
      case "gif-to-mp4": return "GIF to MP4 Converter";
      case "gif-to-webm": return "GIF to WebM Converter";
      case "gif-to-mov": return "GIF to MOV Converter";
      case "webp-to-gif": return "WebP to GIF Converter";
      case "apng-to-gif": return "APNG to GIF Converter";
      case "avif-to-gif": return "AVIF to GIF Converter";
      case "jxl-to-gif": return "JXL to GIF Converter";
      case "svg-to-gif": return "SVG to GIF Converter";
      case "gif-analyzer": return "GIF Analyzer & Info Inspector";
      default: return "GIF Tool Room";
    }
  };

  // Handle multi-image uploads for GIF Maker
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const uploaded: UploadedFile[] = [];
    const filesArray = Array.from(e.target.files);

    filesArray.forEach((file) => {
      uploaded.push({
        name: file.name,
        url: URL.createObjectURL(file),
        delayMs: delay,
      });
    });

    setFiles((prev) => [...prev, ...uploaded]);
    setError(null);
  };

  // Compile GIF from uploaded images
  const compileGifFromImages = async () => {
    if (files.length < 2) {
      setError("Please upload at least 2 images to generate an animated GIF.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Create helper image elements to draw onto canvas
      const loadedImages = await Promise.all(
        files.map((file) => {
          return new Promise<HTMLImageElement>((resolve, reject) => {
            const img = new Image();
            img.src = file.url;
            img.onload = () => resolve(img);
            img.onerror = reject;
          });
        })
      );

      // Determine dimensions (use dimensions of first image)
      const width = loadedImages[0].naturalWidth || 400;
      const height = loadedImages[0].naturalHeight || 300;

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      if (!ctx) throw new Error("Could not create canvas context");

      // Initialize encoder
      const encoder = new GIFEncoder(width, height, delay, 0);

      // Draw and add each frame
      loadedImages.forEach((img) => {
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        const imgData = ctx.getImageData(0, 0, width, height);
        encoder.addFrame(imgData.data);
      });

      // Export blob
      const gifBlob = encoder.build();
      const gifUrl = URL.createObjectURL(gifBlob);
      setResultUrl(gifUrl);
    } catch (err: any) {
      setError("An error occurred during GIF generation: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Video-to-GIF processing
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setVideoUrl(URL.createObjectURL(file));
    setError(null);
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setVideoDuration(videoRef.current.duration);
      setEndTime(Math.min(3, videoRef.current.duration));
    }
  };

  const compileVideoToGif = async () => {
    if (!videoRef.current || !videoUrl) return;
    setLoading(true);
    setError(null);

    const video = videoRef.current;
    const duration = endTime - startTime;
    const frameCount = Math.floor(duration * fps);
    const interval = 1 / fps;

    try {
      const width = video.videoWidth || 400;
      const height = video.videoHeight || 300;

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas context creation failed");

      const encoder = new GIFEncoder(width, height, 1000 / fps, 0);

      // Seek video to frame indices and capture
      for (let i = 0; i < frameCount; i++) {
        const time = startTime + i * interval;
        video.currentTime = time;

        // Wait for video seek to complete
        await new Promise<void>((resolve) => {
          const onSeeked = () => {
            video.removeEventListener("seeked", onSeeked);
            resolve();
          };
          video.addEventListener("seeked", onSeeked);
        });

        ctx.drawImage(video, 0, 0, width, height);
        const imgData = ctx.getImageData(0, 0, width, height);
        encoder.addFrame(imgData.data);
      }

      const gifBlob = encoder.build();
      setResultUrl(URL.createObjectURL(gifBlob));
    } catch (err: any) {
      setError("Failed to convert video: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // GIF-to-Video recording (MP4/WebM/MOV)
  const handleGifUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setGifUrl(URL.createObjectURL(file));
    setError(null);

    // Read image dimensions
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      setGifWidth(img.naturalWidth || 300);
      setGifHeight(img.naturalHeight || 300);
    };
  };

  const recordGifToVideo = async () => {
    if (!gifUrl) return;
    setLoading(true);
    setError(null);

    try {
      const canvas = document.createElement("canvas");
      canvas.width = gifWidth;
      canvas.height = gifHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas context creation failed");

      const img = new Image();
      img.src = gifUrl;
      await new Promise((resolve) => (img.onload = resolve));

      // Draw onto canvas
      ctx.drawImage(img, 0, 0, gifWidth, gifHeight);

      // Capture canvas stream and record via MediaRecorder
      const stream = canvas.captureStream(30);
      
      let mimeType = "video/webm";
      let extension = "webm";
      if (slug === "gif-to-mp4") {
        mimeType = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
        extension = "mp4";
        // Fallback checks
        if (!MediaRecorder.isTypeSupported(mimeType)) {
          mimeType = "video/webm;codecs=h264";
        }
      } else if (slug === "gif-to-mov") {
        mimeType = "video/quicktime";
        extension = "mov";
        if (!MediaRecorder.isTypeSupported(mimeType)) {
          mimeType = "video/webm";
          extension = "webm";
        }
      }

      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = "video/webm";
      }

      const chunks: Blob[] = [];
      const mediaRecorder = new MediaRecorder(stream, { mimeType });

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const videoBlob = new Blob(chunks, { type: mimeType });
        setResultUrl(URL.createObjectURL(videoBlob));
        setLoading(false);
      };

      // Record a 3 second loop
      mediaRecorder.start();
      
      const startTimeStamp = Date.now();
      const interval = setInterval(() => {
        // Redraw canvas
        ctx.clearRect(0, 0, gifWidth, gifHeight);
        ctx.drawImage(img, 0, 0, gifWidth, gifHeight);
        
        if (Date.now() - startTimeStamp > 3000) {
          clearInterval(interval);
          mediaRecorder.stop();
        }
      }, 33);
    } catch (err: any) {
      setError("Recording failed: " + err.message);
      setLoading(false);
    }
  };

  // Convert WebP/APNG/AVIF/SVG to GIF
  const handleGenericImageToGifUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);
    setResultUrl(null);

    try {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Failed to load image format."));
      });

      const width = img.naturalWidth || 400;
      const height = img.naturalHeight || 300;

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas context creation failed");

      // Draw image
      ctx.drawImage(img, 0, 0, width, height);
      
      // Simple 2-frame animation to loop static asset (or draw single frame)
      const encoder = new GIFEncoder(width, height, delay, 0);
      const imgData = ctx.getImageData(0, 0, width, height);
      encoder.addFrame(imgData.data);
      encoder.addFrame(imgData.data); // Duplicate frame to make it animatable if supported

      const gifBlob = encoder.build();
      setResultUrl(URL.createObjectURL(gifBlob));
    } catch (err: any) {
      setError("Format conversion failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Binary GIF Analyzer
  const handleGifAnalysisUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const buffer = event.target?.result as ArrayBuffer;
        const view = new DataView(buffer);
        const bytes = new Uint8Array(buffer);

        // Verify GIF signature
        const signature = String.fromCharCode(bytes[0], bytes[1], bytes[2], bytes[3], bytes[4], bytes[5]);
        if (signature !== "GIF89a" && signature !== "GIF87a") {
          throw new Error("Invalid GIF signature. Please upload a valid .gif image.");
        }

        // Logical Screen Dimensions
        const width = view.getUint16(6, true);
        const height = view.getUint16(8, true);

        // Scan blocks to count frames and delay intervals
        let frameCount = 0;
        const delays: number[] = [];
        let offset = 13; // Skip header and logical screen descriptor

        // Skip Global Color Table if present
        const packedField = bytes[10];
        const gctPresent = (packedField & 0x80) !== 0;
        if (gctPresent) {
          const gctSize = 3 * Math.pow(2, (packedField & 0x07) + 1);
          offset += gctSize;
        }

        // Scan blocks
        while (offset < bytes.length) {
          const blockId = bytes[offset];
          if (blockId === 0x2C) {
            // Image Descriptor (Frame Start)
            frameCount++;
            offset += 10; // Skip descriptor block
            
            // Skip Local Color Table if present
            const localPacked = bytes[offset - 1];
            const lctPresent = (localPacked & 0x80) !== 0;
            if (lctPresent) {
              const lctSize = 3 * Math.pow(2, (localPacked & 0x07) + 1);
              offset += lctSize;
            }
            
            offset++; // Skip LZW min code size
            
            // Skip data blocks
            while (offset < bytes.length && bytes[offset] !== 0) {
              offset += bytes[offset] + 1;
            }
            offset++; // Skip block terminator
          } else if (blockId === 0x21) {
            // Extension Block
            const extLabel = bytes[offset + 1];
            if (extLabel === 0xF9) {
              // Graphic Control Extension (Contains delay)
              const delayTime = view.getUint16(offset + 4, true);
              delays.push(delayTime * 10); // convert hundredths of a sec to ms
              offset += 8;
            } else {
              // General Extension Block
              offset += 2;
              while (offset < bytes.length && bytes[offset] !== 0) {
                offset += bytes[offset] + 1;
              }
              offset++;
            }
          } else if (blockId === 0x3B) {
            // Trailer (EOF)
            break;
          } else {
            offset++;
          }
        }

        setAnalysisReport({
          width,
          height,
          frameCount,
          delays,
          isAnimated: frameCount > 1,
          fileSize: file.size,
        });
      } catch (err: any) {
        setError(err.message);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="flex flex-col gap-6 text-left">
      
      {/* Title Header */}
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <h4 className="text-sm font-extrabold text-foreground uppercase tracking-wider">{getToolTitle()}</h4>
        <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-lg select-none">
          <ShieldCheck className="h-3.5 w-3.5" /> 100% Secure Client Run
        </span>
      </div>

      {/* Main workspace container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Workspace controls (Left) */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          
          {/* TOOL 1: GIF Maker */}
          {slug === "gif-maker" && (
            <div className="space-y-4">
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-border/80 hover:border-[#7d4dff] rounded-2xl p-8 text-center cursor-pointer transition-all hover:bg-neutral-50/50 dark:hover:bg-neutral-800/10 select-none">
                <FileImage className="h-8 w-8 text-muted-foreground mb-3" />
                <span className="text-xs font-bold text-foreground">Upload Multiple Images</span>
                <span className="text-[10px] text-muted-foreground mt-1">Select PNG/JPG/WebP files to stitch into GIF</span>
                <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>

              {files.length > 0 && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-foreground">Uploaded Frames ({files.length})</span>
                    <button onClick={() => setFiles([])} className="text-red-500 hover:underline cursor-pointer">Clear All</button>
                  </div>
                  
                  {/* Image frames gallery */}
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5 max-h-[160px] overflow-y-auto p-1.5 border border-border rounded-xl">
                    {files.map((file, idx) => (
                      <div key={idx} className="relative group rounded-lg overflow-hidden border border-border bg-card aspect-square">
                        <img src={file.url} alt={`Frame ${idx}`} className="h-full w-full object-cover" />
                        <span className="absolute bottom-1 right-1 bg-black/70 text-white font-extrabold text-[8px] px-1 rounded">
                          #{idx + 1}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Tuning Parameters */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border border-border p-4 rounded-2xl">
                    <div className="space-y-1.5">
                      <span className="text-3xs font-extrabold text-muted-foreground uppercase">Frame Delay (ms)</span>
                      <input 
                        type="number" 
                        value={delay} 
                        onChange={(e) => setDelay(Number(e.target.value))} 
                        className="w-full px-3 py-1.5 text-xs bg-neutral-50 dark:bg-[#1a202c] border border-border rounded-xl outline-none"
                      />
                    </div>
                    <div className="flex items-end">
                      <button 
                        onClick={compileGifFromImages}
                        disabled={loading}
                        className="w-full py-2 bg-[#7d4dff] hover:bg-[#6530ef] disabled:bg-[#7d4dff]/45 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-[#7d4dff]/10"
                      >
                        {loading ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <Play className="h-3.5 w-3.5" />}
                        <span>Compile Animated GIF</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TOOL 2: Video to GIF */}
          {slug === "video-to-gif" && (
            <div className="space-y-4">
              {!videoUrl ? (
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-border/80 hover:border-[#7d4dff] rounded-2xl p-8 text-center cursor-pointer transition-all hover:bg-neutral-50/50 dark:hover:bg-neutral-800/10 select-none">
                  <Film className="h-8 w-8 text-muted-foreground mb-3" />
                  <span className="text-xs font-bold text-foreground">Upload Video File</span>
                  <span className="text-[10px] text-muted-foreground mt-1">Select MP4, WebM, or MOV formats</span>
                  <input type="file" accept="video/*" className="hidden" onChange={handleVideoUpload} />
                </label>
              ) : (
                <div className="space-y-4 border border-border p-4 rounded-3xl">
                  {/* Invisible / Hidden Video tag to capture canvas frames */}
                  <video 
                    ref={videoRef} 
                    src={videoUrl} 
                    onLoadedMetadata={handleLoadedMetadata}
                    controls 
                    className="w-full rounded-2xl border border-border max-h-[220px] bg-black"
                  />

                  {/* Split video timeline parameters */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <span className="text-3xs font-extrabold text-muted-foreground uppercase">Start (s)</span>
                      <input 
                        type="number" 
                        step="0.1" 
                        min="0"
                        max={videoDuration}
                        value={startTime} 
                        onChange={(e) => setStartTime(Number(e.target.value))} 
                        className="w-full px-3 py-1.5 text-xs bg-neutral-50 dark:bg-[#1a202c] border border-border rounded-xl outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-3xs font-extrabold text-muted-foreground uppercase">End (s)</span>
                      <input 
                        type="number" 
                        step="0.1" 
                        min="0"
                        max={videoDuration}
                        value={endTime} 
                        onChange={(e) => setEndTime(Number(e.target.value))} 
                        className="w-full px-3 py-1.5 text-xs bg-neutral-50 dark:bg-[#1a202c] border border-border rounded-xl outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-3xs font-extrabold text-muted-foreground uppercase">FPS (Frames/sec)</span>
                      <input 
                        type="number" 
                        min="2"
                        max="15"
                        value={fps} 
                        onChange={(e) => setFps(Number(e.target.value))} 
                        className="w-full px-3 py-1.5 text-xs bg-neutral-50 dark:bg-[#1a202c] border border-border rounded-xl outline-none"
                      />
                    </div>
                  </div>

                  <button 
                    onClick={compileVideoToGif}
                    disabled={loading}
                    className="w-full py-2.5 bg-[#7d4dff] hover:bg-[#6530ef] disabled:bg-[#7d4dff]/45 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-[#7d4dff]/10"
                  >
                    {loading ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <Play className="h-3.5 w-3.5" />}
                    <span>Compile Video into GIF</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TOOL 3-5: GIF to Video (MP4 / WebM / MOV) */}
          {(slug === "gif-to-mp4" || slug === "gif-to-webm" || slug === "gif-to-mov") && (
            <div className="space-y-4">
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-border/80 hover:border-[#7d4dff] rounded-2xl p-8 text-center cursor-pointer transition-all hover:bg-neutral-50/50 dark:hover:bg-neutral-800/10 select-none">
                <FileImage className="h-8 w-8 text-muted-foreground mb-3" />
                <span className="text-xs font-bold text-foreground">Upload Animated GIF</span>
                <span className="text-[10px] text-muted-foreground mt-1">Select .gif file to record into video format</span>
                <input type="file" accept="image/gif" className="hidden" onChange={handleGifUpload} />
              </label>

              {gifUrl && (
                <div className="space-y-4 border border-border p-4 rounded-3xl text-center">
                  <img src={gifUrl} alt="Source GIF" className="max-h-[160px] mx-auto rounded-xl border border-border" />
                  
                  <button 
                    onClick={recordGifToVideo}
                    disabled={loading}
                    className="w-full py-2.5 bg-[#7d4dff] hover:bg-[#6530ef] disabled:bg-[#7d4dff]/45 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-[#7d4dff]/10"
                  >
                    {loading ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <Play className="h-3.5 w-3.5" />}
                    <span>Compile into {slug.replace("gif-to-", "").toUpperCase()} Video</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TOOL 6-10: WebP/APNG/AVIF/JXL/SVG to GIF */}
          {(slug === "webp-to-gif" || slug === "apng-to-gif" || slug === "avif-to-gif" || slug === "jxl-to-gif" || slug === "svg-to-gif") && (
            <div className="space-y-4">
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-border/80 hover:border-[#7d4dff] rounded-2xl p-8 text-center cursor-pointer transition-all hover:bg-neutral-50/50 dark:hover:bg-neutral-800/10 select-none">
                <FileImage className="h-8 w-8 text-muted-foreground mb-3" />
                <span className="text-xs font-bold text-foreground">Upload {slug.split("-to-")[0].toUpperCase()} File</span>
                <span className="text-[10px] text-muted-foreground mt-1">Select source file to convert to animated GIF format</span>
                <input type="file" accept={`image/${slug.split("-to-")[0]}, image/*`} className="hidden" onChange={handleGenericImageToGifUpload} />
              </label>
            </div>
          )}

          {/* TOOL 11: GIF Analyzer */}
          {slug === "gif-analyzer" && (
            <div className="space-y-4">
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-border/80 hover:border-[#7d4dff] rounded-2xl p-8 text-center cursor-pointer transition-all hover:bg-neutral-50/50 dark:hover:bg-neutral-800/10 select-none">
                <BarChart2 className="h-8 w-8 text-muted-foreground mb-3" />
                <span className="text-xs font-bold text-foreground">Upload GIF for Analysis</span>
                <span className="text-[10px] text-muted-foreground mt-1">Select .gif file to inspect header and frames metadata</span>
                <input type="file" accept="image/gif" className="hidden" onChange={handleGifAnalysisUpload} />
              </label>

              {analysisReport && (
                <div className="border border-border rounded-2xl overflow-hidden text-xs">
                  <div className="bg-[#f8fafc] dark:bg-[#1a202c] px-4 py-3 border-b border-border font-bold text-foreground flex items-center gap-1.5">
                    <BarChart2 className="h-4 w-4 text-primary" /> Analysis Metadata Report
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-muted-foreground uppercase font-bold">Image Resolution</span>
                        <p className="font-extrabold text-foreground">{analysisReport.width} x {analysisReport.height} px</p>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-muted-foreground uppercase font-bold">Total Frames</span>
                        <p className="font-extrabold text-foreground">{analysisReport.frameCount} frames</p>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-muted-foreground uppercase font-bold">File Size</span>
                        <p className="font-extrabold text-foreground">{(analysisReport.fileSize / 1024).toFixed(1)} KB</p>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-muted-foreground uppercase font-bold">Is Animated?</span>
                        <p className={`font-extrabold ${analysisReport.isAnimated ? "text-emerald-500" : "text-amber-500"}`}>
                          {analysisReport.isAnimated ? "Yes (Looping)" : "No (Static)"}
                        </p>
                      </div>
                    </div>
                    {analysisReport.delays.length > 0 && (
                      <div className="pt-2.5 border-t border-border/40">
                        <span className="text-[10px] text-muted-foreground uppercase font-bold">Frame Delays</span>
                        <p className="font-extrabold text-foreground mt-1 max-h-[80px] overflow-y-auto leading-relaxed">
                          {analysisReport.delays.slice(0, 10).map((d, i) => `Frame #${i + 1}: ${d}ms`).join(", ")}
                          {analysisReport.delays.length > 10 && " ..."}
                        </p>
                      </div>
                    )}
                  </div>
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

        {/* Workspace Live output area (Right) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <span className="text-3xs font-extrabold text-muted-foreground uppercase select-none tracking-wider">Live Workspace Output</span>
          
          <div className="border border-border/80 bg-neutral-50/50 dark:bg-card/20 rounded-2xl p-6 min-h-[220px] flex flex-col items-center justify-center text-center relative overflow-hidden select-none">
            {loading ? (
              <div className="flex flex-col items-center gap-3 text-muted-foreground">
                <RefreshCw className="h-8 w-8 text-[#7d4dff] animate-spin" />
                <p className="text-3xs font-bold uppercase tracking-wider animate-pulse">Encoding Binary Blob...</p>
              </div>
            ) : resultUrl ? (
              <div className="w-full flex flex-col items-center gap-4">
                
                {/* Result view */}
                {slug.includes("to-mp4") || slug.includes("to-webm") || slug.includes("to-mov") ? (
                  <video src={resultUrl} controls autoPlay loop className="max-h-[160px] rounded-xl border border-border shadow-xs bg-black" />
                ) : (
                  <img src={resultUrl} alt="Output Render" className="max-h-[160px] rounded-xl border border-border shadow-xs object-contain" />
                )}

                <div className="w-full flex flex-col gap-2 print:hidden">
                  <a 
                    href={resultUrl} 
                    download={`toolchi-${slug}-${Date.now()}.${
                      slug.includes("to-mp4") ? "mp4" :
                      slug.includes("to-webm") ? "webm" :
                      slug.includes("to-mov") ? "mov" : "gif"
                    }`}
                    className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm shadow-emerald-500/10 cursor-pointer"
                  >
                    <Download className="h-3.5 w-3.5" /> Download Result File
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
                  <p className="text-3xs mt-0.5 leading-normal max-w-[200px]">Upload files and click Compile to inspect output render here.</p>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
