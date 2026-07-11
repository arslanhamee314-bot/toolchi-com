"use client";

import React, { useState, useRef, useEffect } from "react";
import { Upload, Film, Scissors, Crop, Maximize, Play, Pause, Download, RefreshCw, AlertCircle, ShieldCheck } from "lucide-react";
import SmartAssist from "./SmartAssist";
import PresetSelector from "./PresetSelector";
import ResultScore from "./ResultScore";
import NextBestActions from "./NextBestActions";

interface VideoSuiteProps {
  slug: string;
}

export default function VideoSuite({ slug }: VideoSuiteProps) {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [reversing, setReversing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState("standard");
  const [resultScoreValue, setResultScoreValue] = useState<number | null>(null);

  // Video properties
  const [duration, setDuration] = useState(0);
  const [videoWidth, setVideoWidth] = useState(640);
  const [videoHeight, setVideoHeight] = useState(360);

  // Settings
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(3);
  const [cropX, setCropX] = useState(0);
  const [cropY, setCropY] = useState(0);
  const [cropW, setCropW] = useState(300);
  const [cropH, setCropH] = useState(300);
  const [scaleWidth, setScaleWidth] = useState(480);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [muteAudio, setMuteAudio] = useState(false);
  const [loopCount, setLoopCount] = useState(3);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getToolTitle = () => {
    switch (slug) {
      case "video-cutter": return "Video Cutter (Trim durations locally)";
      case "video-cropper": return "Video Cropper (Crop visible frames)";
      case "resize-video": return "Video Resizer (Change aspect ratio / dimensions)";
      case "video-to-webp":
      case "video-to-webm": return "Video Converter (Export WebM format locally)";
      case "reverse-video": return "Reverse Video (Play video backwards)";
      case "mute-video": return "Mute Video (Remove audio track)";
      case "video-speed": return "Video Speed (Change playback rate)";
      case "video-loop": return "Video Loop (Record seamless looped segment)";
      default: return "Video Processing Workspace";
    }
  };

  const getPresetsForSlug = () => {
    if (slug === "video-cutter" || slug === "video-cropper" || slug === "resize-video") {
      return [
        { id: "standard", name: "Standard (Original)", description: "No scale modification" },
        { id: "hd_720", name: "HD Ready (720p)", description: "Standard high definition" },
        { id: "sd_480", name: "Web friendly (480p)", description: "Perfect balance for web loading" }
      ];
    }
    if (slug === "video-loop") {
      return [
        { id: "standard", name: "Double Loop (2x)", description: "Repeat twice" },
        { id: "loop_3", name: "Triple Loop (3x)", description: "Repeat three times" },
        { id: "loop_5", name: "High Loop (5x)", description: "Repeat five times" }
      ];
    }
    if (slug === "video-speed") {
      return [
        { id: "standard", name: "Normal (1.0x)", description: "Standard playback speed" },
        { id: "fast", name: "Fast Tempo (1.5x)", description: "Speed up rate" },
        { id: "slow", name: "Slow Tempo (0.75x)", description: "Slow down rate" }
      ];
    }
    return [];
  };

  const handleSelectPreset = (presetId: string) => {
    setSelectedPreset(presetId);
    setResultUrl(null);
    setResultScoreValue(null);

    if (slug === "video-cutter" || slug === "video-cropper" || slug === "resize-video") {
      if (presetId === "hd_720") {
        setScaleWidth(1280);
      } else if (presetId === "sd_480") {
        setScaleWidth(854);
      } else {
        setScaleWidth(videoWidth);
      }
    } else if (slug === "video-loop") {
      if (presetId === "loop_3") {
        setLoopCount(3);
      } else if (presetId === "loop_5") {
        setLoopCount(5);
      } else {
        setLoopCount(2);
      }
    } else if (slug === "video-speed") {
      if (presetId === "fast") {
        setPlaybackSpeed(1.5);
      } else if (presetId === "slow") {
        setPlaybackSpeed(0.75);
      } else {
        setPlaybackSpeed(1.0);
      }
    }
  };

  useEffect(() => {
    setVideoUrl(null);
    setResultUrl(null);
    setError(null);
  }, [slug]);

  const handleFiles = (fileList: FileList) => {
    const file = fileList[0];
    if (!file) return;
    setVideoUrl(URL.createObjectURL(file));
    setError(null);
    setResultUrl(null);
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) handleFiles(e.target.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setEndTime(Math.min(5, videoRef.current.duration));
      setVideoWidth(videoRef.current.videoWidth || 640);
      setVideoHeight(videoRef.current.videoHeight || 360);
      setCropW(Math.min(300, videoRef.current.videoWidth || 300));
      setCropH(Math.min(300, videoRef.current.videoHeight || 300));
      setScaleWidth(Math.round((videoRef.current.videoWidth || 640) * 0.75));
    }
  };

  const runVideoProcessing = async () => {
    if (!videoRef.current || !videoUrl) return;

    setLoading(true);
    setError(null);
    setResultUrl(null);

    const video = videoRef.current;

    // --- Reverse Video: buffer frames then replay in reverse ---
    if (slug === "reverse-video") {
      try {
        setReversing(true);
        const segDuration = endTime - startTime;
        const fps = 15;
        const frameCount = Math.round(segDuration * fps);
        const frames: ImageData[] = [];
        const sampleCanvas = document.createElement("canvas");
        sampleCanvas.width = videoWidth;
        sampleCanvas.height = videoHeight;
        const sCtx = sampleCanvas.getContext("2d")!;

        for (let i = 0; i < frameCount; i++) {
          const t = startTime + (i / fps);
          video.currentTime = t;
          await new Promise<void>((res) => { const h = () => { video.removeEventListener("seeked", h); res(); }; video.addEventListener("seeked", h); });
          sCtx.drawImage(video, 0, 0, videoWidth, videoHeight);
          frames.push(sCtx.getImageData(0, 0, videoWidth, videoHeight));
        }

        frames.reverse();
        const outCanvas = document.createElement("canvas");
        outCanvas.width = videoWidth;
        outCanvas.height = videoHeight;
        const oCtx = outCanvas.getContext("2d")!;
        const stream = outCanvas.captureStream(fps);
        const recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
        const chunks: Blob[] = [];
        recorder.ondataavailable = (e) => { if (e.data.size > 0) chunks.push(e.data); };
        recorder.onstop = () => {
          setResultUrl(URL.createObjectURL(new Blob(chunks, { type: "video/webm" })));
          
          let score = 100;
          if (segDuration > 8) score -= 20;
          setResultScoreValue(score);

          setLoading(false);
          setReversing(false);
        };
        recorder.start();
        for (const frame of frames) {
          oCtx.putImageData(frame, 0, 0);
          await new Promise<void>((res) => setTimeout(res, 1000 / fps));
        }
        recorder.stop();
        return;
      } catch (err: any) {
        setError("Reverse failed: " + err.message);
        setLoading(false);
        setReversing(false);
        return;
      }
    }

    // Target dimensions
    let destW = videoWidth;
    let destH = videoHeight;

    if (slug === "video-cropper") {
      destW = cropW;
      destH = cropH;
    } else if (slug === "resize-video") {
      destW = scaleWidth;
      destH = Math.round(scaleWidth * (videoHeight / videoWidth));
    }

    const canvas = document.createElement("canvas");
    canvas.width = destW;
    canvas.height = destH;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setError("Canvas context allocation failed.");
      setLoading(false);
      return;
    }

    try {
      const stream = canvas.captureStream(30);
      const mimeType = "video/webm";
      const chunks: Blob[] = [];
      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorder.ondataavailable = (e) => { if (e.data.size > 0) chunks.push(e.data); };
      mediaRecorder.onstop = () => {
        setResultUrl(URL.createObjectURL(new Blob(chunks, { type: mimeType })));

        let score = 100;
        const processedDuration = (endTime - startTime);
        if (processedDuration > 10) score -= 20; // Too heavy
        if (destW > 1280) score -= 15; // High resolution
        if (muteAudio || slug === "mute-video") score += 5; // Good for web compression
        setResultScoreValue(Math.min(100, score));

        setLoading(false);
      };

      video.currentTime = startTime;
      await new Promise<void>((resolve) => {
        const onSeeked = () => { video.removeEventListener("seeked", onSeeked); resolve(); };
        video.addEventListener("seeked", onSeeked);
      });

      video.muted = muteAudio || slug === "mute-video";
      video.playbackRate = (slug === "video-speed") ? playbackSpeed : 1.0;
      video.play();
      mediaRecorder.start();

      const startMs = Date.now();
      const segMs = (endTime - startTime) * 1000;
      const totalMs = (slug === "video-loop") ? segMs * loopCount : segMs;
      let loopsDone = 0;

      const drawLoop = setInterval(async () => {
        const elapsed = Date.now() - startMs;

        // For video-loop: reset when one loop segment is done
        if (slug === "video-loop" && (Date.now() - startMs) >= segMs * (loopsDone + 1)) {
          loopsDone++;
          if (loopsDone < loopCount) {
            video.currentTime = startTime;
          }
        }

        if (elapsed >= totalMs || video.paused) {
          clearInterval(drawLoop);
          video.pause();
          mediaRecorder.stop();
          return;
        }
        ctx.clearRect(0, 0, destW, destH);
        if (slug === "video-cropper") {
          ctx.drawImage(video, cropX, cropY, cropW, cropH, 0, 0, destW, destH);
        } else {
          ctx.drawImage(video, 0, 0, destW, destH);
        }
      }, 33);
    } catch (err: any) {
      setError("Processing failed: " + err.message);
      setLoading(false);
    }
  };

  // Dynamic Smart Assist recommendations
  let recommendation = "Mute audio tracks if you are building web banners.";
  let reason = "Videos with silent tracks compress significantly better and can autoplay without user interaction.";
  let nextStep = "Toggle Strip audio checkbox";

  if (slug === "video-cropper") {
    recommendation = "Crop to exact matching layout aspect ratios.";
    reason = "Cropping without correct target scaling causes visible edge stretching on high-DPI viewports.";
    nextStep = "Upload video and select viewport coordinates";
  } else if (slug === "resize-video") {
    recommendation = "Downscale HD video width for lightning-fast page loading.";
    reason = "Downscaling 1080p source video clips to 480p standard definition saves up to 75% file weight.";
    nextStep = "Select resize dimensions";
  } else if (slug.includes("video-to-")) {
    recommendation = "Export WebM file for native HTML5 embedding.";
    reason = "WebM is standard modern royalty-free web video. It has 40% better compression than traditional MP4 formats.";
    nextStep = "Choose WebM format output";
  } else if (slug === "reverse-video") {
    recommendation = "Trim segments below 3 seconds for reversing.";
    reason = "Reversing video draws each frame to canvas sequentially. Long clips require high RAM usage and delay processing.";
    nextStep = "Set segment trim markers";
  } else if (slug === "mute-video") {
    recommendation = "Completely purge sound streams.";
    reason = "Purging audio tracks allows mobile browsers to autoplay video loops automatically inside columns.";
    nextStep = "Process muted video";
  } else if (slug === "video-speed") {
    recommendation = "Resample at native frame rates.";
    reason = "Changing playback speeds can result in stuttering if frame durations are not properly aligned.";
    nextStep = "Adjust speed slider";
  } else if (slug === "video-loop") {
    recommendation = "Match loop repetitions to target user viewport timelines.";
    reason = "Too many loop repeats increase the final video runtime, inflating file sizes.";
    nextStep = "Set loop count repeats";
  }

  const nextActions = [
    { slug: "video-to-gif", name: "Video to GIF", description: "Convert high-fidelity video clips into looping web-friendly GIF files." },
    { slug: "video-cropper", name: "Video Cropper", description: "Adjust aspect ratios and crop visible coordinates locally." },
    { slug: "video-cutter", name: "Video Cutter", description: "Trim precise timestamps and durations in-browser." }
  ];

  const presetsList = getPresetsForSlug();

  return (
    <div className="flex flex-col gap-6 text-foreground text-xs text-left">
      
      {/* Smart Assist Panel */}
      <SmartAssist recommendation={recommendation} reason={reason} nextStep={nextStep} />

      {/* Title Header */}
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">{getToolTitle()}</h4>
        <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-lg select-none">
          <ShieldCheck className="h-3.5 w-3.5" /> 100% Client Video Engine
        </span>
      </div>

      {/* Presets Selector */}
      {presetsList.length > 0 && (
        <div className="border-b border-border/40 pb-4">
          <PresetSelector presets={presetsList} selectedPresetId={selectedPreset} onSelect={handleSelectPreset} />
        </div>
      )}

      {/* Main workspace container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {!videoUrl ? (
            <label 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all bg-neutral-950/40 hover:bg-neutral-950/80 select-none ${
                isDragging 
                  ? "border-primary bg-primary/5 dark:bg-primary/10 scale-[0.99] animate-pulse" 
                  : "border-border/80 hover:border-primary"
              }`}
            >
              <Film className="h-8 w-8 text-muted-foreground mb-3" />
              <span className="text-xs font-bold text-white">
                {isDragging ? "Drop your video here" : "Upload Video File"}
              </span>
              <span className="text-[10px] text-muted-foreground mt-1">Select MP4, WebM, or MOV format</span>
              <input type="file" accept="video/*" className="hidden" onChange={handleVideoUpload} />
            </label>
          ) : (
            <div className="space-y-4 border border-border p-4 rounded-3xl bg-neutral-50 dark:bg-neutral-900/35">
              <video 
                ref={videoRef}
                src={videoUrl}
                onLoadedMetadata={handleMetadata}
                controls
                className="w-full rounded-2xl border border-border max-h-[220px] bg-black"
              />

              {/* Adjust Parameters based on Tool */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border border-border/50 p-4 rounded-2xl">
                
                {/* Time Trim Range */}
                <div className="space-y-1.5 col-span-2 grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <span className="text-3xs font-extrabold text-muted-foreground uppercase">Start trim (s)</span>
                    <input 
                      type="number" 
                      step="0.1" 
                      min="0"
                      max={duration}
                      value={startTime}
                      onChange={(e) => setStartTime(Number(e.target.value))}
                      className="w-full px-3 py-1.5 text-xs bg-neutral-900 border border-border rounded-xl outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-3xs font-extrabold text-muted-foreground uppercase">End trim (s)</span>
                    <input 
                      type="number" 
                      step="0.1" 
                      min="0"
                      max={duration}
                      value={endTime}
                      onChange={(e) => setEndTime(Number(e.target.value))}
                      className="w-full px-3 py-1.5 text-xs bg-neutral-900 border border-border rounded-xl outline-none"
                    />
                  </div>
                </div>

                {/* Cropping viewport */}
                {slug === "video-cropper" && (
                  <div className="space-y-3 col-span-2 pt-2 border-t border-border/40 grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <span className="text-3xs font-extrabold text-muted-foreground uppercase">Crop X Offset</span>
                      <input 
                        type="number" 
                        max={videoWidth}
                        value={cropX}
                        onChange={(e) => setCropX(Number(e.target.value))}
                        className="w-full px-3 py-1.5 text-xs bg-neutral-900 border border-border rounded-xl outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-3xs font-extrabold text-muted-foreground uppercase">Crop Y Offset</span>
                      <input 
                        type="number" 
                        max={videoHeight}
                        value={cropY}
                        onChange={(e) => setCropY(Number(e.target.value))}
                        className="w-full px-3 py-1.5 text-xs bg-neutral-900 border border-border rounded-xl outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-3xs font-extrabold text-muted-foreground uppercase">Crop Width</span>
                      <input 
                        type="number" 
                        max={videoWidth}
                        value={cropW}
                        onChange={(e) => setCropW(Number(e.target.value))}
                        className="w-full px-3 py-1.5 text-xs bg-neutral-900 border border-border rounded-xl outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-3xs font-extrabold text-muted-foreground uppercase">Crop Height</span>
                      <input 
                        type="number" 
                        max={videoHeight}
                        value={cropH}
                        onChange={(e) => setCropH(Number(e.target.value))}
                        className="w-full px-3 py-1.5 text-xs bg-neutral-900 border border-border rounded-xl outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* Speed control */}
                {(slug === "video-speed") && (
                  <div className="space-y-1.5 col-span-2 pt-2 border-t border-border/40">
                    <span className="text-3xs font-extrabold text-muted-foreground uppercase">Playback Speed ({playbackSpeed}x)</span>
                    <input type="range" min="0.25" max="4" step="0.25" value={playbackSpeed} onChange={(e) => setPlaybackSpeed(Number(e.target.value))} className="w-full accent-primary" />
                  </div>
                )}

                {/* Loop count control */}
                {slug === "video-loop" && (
                  <div className="space-y-1.5 col-span-2 pt-2 border-t border-border/40">
                    <span className="text-3xs font-extrabold text-muted-foreground uppercase">Loop Repetitions ({loopCount}x)</span>
                    <input type="range" min="2" max="8" step="1" value={loopCount} onChange={(e) => setLoopCount(Number(e.target.value))} className="w-full accent-primary" />
                    <p className="text-[10px] text-muted-foreground">The segment will play {loopCount} times in the output file.</p>
                  </div>
                )}

                {/* Mute toggle */}
                {(slug === "mute-video" || slug === "video-cutter" || slug === "resize-video") && (
                  <div className="col-span-2 flex items-center gap-2 pt-2 border-t border-border/40">
                    <input type="checkbox" id="muteAudio" checked={muteAudio} onChange={(e) => setMuteAudio(e.target.checked)} className="accent-primary" />
                    <label htmlFor="muteAudio" className="text-3xs font-extrabold text-muted-foreground uppercase cursor-pointer">Strip audio from output</label>
                  </div>
                )}

              </div>

              <button 
                onClick={runVideoProcessing}
                disabled={loading}
                className="w-full py-2.5 bg-primary hover:bg-primary-hover disabled:opacity-50 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-primary/10"
              >
                {loading ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <Scissors className="h-3.5 w-3.5" />}
                <span>Process Video Output</span>
              </button>
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
          <span className="text-3xs font-extrabold text-muted-foreground uppercase select-none tracking-wider">Processed Video Render</span>
          
          <div className="border border-border/80 bg-neutral-50/50 dark:bg-card/25 rounded-2xl p-6 min-h-[220px] flex flex-col items-center justify-center text-center relative overflow-hidden select-none">
            {loading ? (
              <div className="flex flex-col items-center gap-3 text-muted-foreground">
                <RefreshCw className="h-8 w-8 text-primary animate-spin" />
                <p className="text-3xs font-bold uppercase tracking-wider animate-pulse">{reversing ? "Drawing Canvas Frames in Reverse..." : "Encoding Frame Loops Client-Side..."}</p>
              </div>
            ) : resultUrl ? (
              <div className="w-full flex flex-col items-center gap-5">
                <video src={resultUrl} controls autoPlay loop className="max-h-[160px] rounded-xl border border-border shadow-xs bg-black" />

                {resultScoreValue !== null && (
                  <ResultScore score={resultScoreValue} metricTitle="Video Quality & Speed Index" details="Measures segment duration bounds, target dimensions, and tracks compression weight ratios." />
                )}
                
                <div className="w-full flex flex-col gap-2">
                  <a 
                    href={resultUrl} 
                    download={`toolchi-${slug}-${Date.now()}.webm`}
                    className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm shadow-emerald-500/10 cursor-pointer"
                  >
                    <Download className="h-3.5 w-3.5" /> Download WebM Video
                  </a>
                  <button 
                    onClick={() => {
                      setResultUrl(null);
                      setResultScoreValue(null);
                    }} 
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
                  <h5 className="text-2xs font-extrabold text-foreground uppercase">Waiting for video</h5>
                  <p className="text-3xs mt-0.5 leading-normal max-w-[200px]">Upload a video and configure timeline ranges to compile.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Next Best Actions */}
      <NextBestActions actions={nextActions} />
    </div>
  );
}
