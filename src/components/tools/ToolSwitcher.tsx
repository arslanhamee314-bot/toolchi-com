"use client";

import React from "react";
import CaseConverter from "./CaseConverter";
import TextCounter from "./TextCounter";
import LoremIpsum from "./LoremIpsum";
import JsonFormatter from "./JsonFormatter";
import Base64Converter from "./Base64Converter";
import UrlEncoder from "./UrlEncoder";
import HashGenerator from "./HashGenerator";
import QrGenerator from "./QrGenerator";
import MergePdf from "./MergePdf";
import ColorConverter from "./ColorConverter";
import Calculator from "./Calculator";
import InvoiceGenerator from "./InvoiceGenerator";
import AiDetector from "./AiDetector";

interface ToolSwitcherProps {
  slug: string;
}

export default function ToolSwitcher({ slug }: ToolSwitcherProps) {
  switch (slug) {
    // 1. Text Tools
    case "case-converter":
      return <CaseConverter />;
    case "text-counter":
      return <TextCounter />;
    case "lorem-ipsum":
      return <LoremIpsum />;

    // 2. Dev Tools
    case "json-formatter":
      return <JsonFormatter />;
    case "base64":
      return <Base64Converter />;
    case "url-encoder":
      return <UrlEncoder />;
    case "hash-generator":
      return <HashGenerator />;
    case "qr-generator":
      return <QrGenerator />;

    // 3. PDF Tools
    case "merge-pdf":
    case "split-pdf":
    case "rotate-pdf":
    case "compress-pdf":
      // Reusing MergePdf layout for other stubs, but supporting the core MergePdf fully!
      return <MergePdf />;

    // 4. Color Tools
    case "color-converter":
      return <ColorConverter />;

    // 5. Math Tools
    case "calculator":
      return <Calculator />;

    // 6. Business Tools
    case "invoice-generator":
      return <InvoiceGenerator />;

    // 7. AI Tools
    case "ai-detector":
      return <AiDetector />;

    default:
      return (
        <div className="p-8 text-center border border-dashed border-border rounded-2xl text-muted-foreground bg-neutral-950/20 text-xs">
          Interactive UI for "{slug}" is under active development. Stubs are pre-wired.
        </div>
      );
  }
}
