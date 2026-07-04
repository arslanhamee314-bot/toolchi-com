"use client";

import Image from "next/image";

export default function Logo() {
  // Replace src with your actual logo file path if needed
  return (
    <div className="flex items-center">
      <Image
        src="/logo.jpg"
        alt="Toolchi Logo"
        width={28}
        height={28}
        className="mr-2 rounded"
      />
      <span className="text-lg font-bold text-foreground">Toolchi</span>
    </div>
  );
}
