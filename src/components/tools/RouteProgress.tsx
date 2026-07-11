"use client";

import React from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function RouteProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [active, setActive] = React.useState(false);

  React.useEffect(() => {
    setActive(true);
    const timeout = window.setTimeout(() => setActive(false), 450);
    return () => window.clearTimeout(timeout);
  }, [pathname, searchParams]);

  return (
    <div className="fixed left-0 right-0 top-0 z-[9998] h-0.5 overflow-hidden print:hidden">
      <div
        className={`h-full bg-gradient-to-r from-primary via-[#14b8a6] to-primary transition-all duration-500 ${
          active ? "w-full opacity-100" : "w-0 opacity-0"
        }`}
      />
    </div>
  );
}
