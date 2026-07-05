"use client";

import React from "react";

interface LoadSampleButtonProps {
  slug: string;
}

export default function LoadSampleButton({ slug }: LoadSampleButtonProps) {
  const handleLoadSample = () => {
    window.dispatchEvent(
      new CustomEvent("load-sample", {
        detail: { slug },
      })
    );
  };

  return (
    <div className="mt-4 pt-4 border-t border-border/40 flex justify-end print:hidden">
      <button
        onClick={handleLoadSample}
        className="px-4 py-2 text-3xs font-extrabold bg-[#7d4dff] hover:bg-[#6530ef] active:scale-95 transition-all text-white rounded-lg shadow-sm cursor-pointer select-none flex items-center gap-1.5"
      >
        <span>⚡ Load Demo / Sample Data</span>
      </button>
    </div>
  );
}
