import React from "react";
import * as Icons from "lucide-react";

interface LucideIconProps {
  name: string;
  className?: string;
}

export default function LucideIcon({ name, className }: LucideIconProps) {
  // Safe lookup for Lucide icon components
  const IconComponent = (Icons as any)[name];
  
  if (!IconComponent) {
    // Fallback icon if lookup fails
    return <Icons.HelpCircle className={className} />;
  }

  return <IconComponent className={className} />;
}
