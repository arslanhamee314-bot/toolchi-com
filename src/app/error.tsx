"use client";

import ErrorFallback from "@/components/tools/ErrorFallback";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <ErrorFallback reset={reset} />;
}
