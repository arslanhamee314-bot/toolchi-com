"use client";

import React from "react";

// 1. Existing Tools
import CaseConverter from "./CaseConverter";
import TextCounter from "./TextCounter";
import LoremIpsum from "./LoremIpsum";
import JsonFormatter from "./JsonFormatter";
import Base64Converter from "./Base64Converter";
import UrlEncoder from "./UrlEncoder";
import HashGenerator from "./HashGenerator";
import QrGenerator from "./QrGenerator";
import MergePdf from "./MergePdf";
import SplitPdf from "./SplitPdf";
import ColorConverter from "./ColorConverter";
import Calculator from "./Calculator";
import InvoiceGenerator from "./InvoiceGenerator";
import AiDetector from "./AiDetector";

// 2. Newly Implemented Webmaster & Performance Tools
import GzipCompression from "./GzipCompression";
import RobotsChecker from "./RobotsChecker";
import FaviconGenerator from "./FaviconGenerator";
import SslChecker from "./SslChecker";
import SitemapValidator from "./SitemapValidator";
import ResponsiveChecker from "./ResponsiveChecker";
import DomainExpiration from "./DomainExpiration";
import ImageCompressor from "./ImageCompressor";
import DummyImageGen from "./DummyImageGen";
import RedirectChecker from "./RedirectChecker";
import SiteDownChecker from "./SiteDownChecker";
import AbTestCalculator from "./AbTestCalculator";
import SpellChecker from "./SpellChecker";
import ScreenResolution from "./ScreenResolution";
import ShareLinkCreator from "./ShareLinkCreator";
import MultipleUrlOpener from "./MultipleUrlOpener";
import Minifier from "./Minifier";
import Unminifier from "./Unminifier";
import AmpValidator from "./AmpValidator";
import GifMakerSuite from "./GifMakerSuite";
import DomainGenerator from "./DomainGenerator";

interface ToolSwitcherProps {
  slug: string;
}

export default function ToolSwitcher({ slug }: ToolSwitcherProps) {
  switch (slug) {
    // === GIF MAKER SUITE ===
    case "gif-maker":
    case "video-to-gif":
    case "gif-to-mp4":
    case "gif-to-webm":
    case "gif-to-mov":
    case "webp-to-gif":
    case "apng-to-gif":
    case "avif-to-gif":
    case "jxl-to-gif":
    case "svg-to-gif":
    case "gif-analyzer":
      return <GifMakerSuite slug={slug} />;

    // === 1. WEBMASTER TOOLS ===
    case "robots-txt-checker":
      return <RobotsChecker />;
    case "favicon-generator":
      return <FaviconGenerator />;
    case "ssl-checker":
      return <SslChecker />;
    case "xml-sitemap-validator":
      return <SitemapValidator />;
    case "responsive-checker":
      return <ResponsiveChecker />;
    case "domain-expiration-checker":
      return <DomainExpiration />;

    // === 2. PERFORMANCE TOOLS ===
    case "gzip-compression":
      return <GzipCompression />;
    case "compress-image":
      return <ImageCompressor />;
    case "dummy-image-generator":
      return <DummyImageGen />;
    case "redirect-checker":
      return <RedirectChecker />;
    case "site-down-checker":
      return <SiteDownChecker />;
    case "ab-test-calculator":
      return <AbTestCalculator />;
    case "qr-generator":
      return <QrGenerator />;
    case "spell-checker":
      return <SpellChecker />;

    // === 3. OPERATIONAL TOOLS ===
    case "screen-resolution":
      return <ScreenResolution />;
    case "share-link-creator":
      return <ShareLinkCreator />;
    case "lorem-ipsum":
      return <LoremIpsum />;
    case "multiple-url-opener":
      return <MultipleUrlOpener />;
    case "minify-code":
      return <Minifier />;
    case "unminify-code":
      return <Unminifier />;
    case "amp-validator":
      return <AmpValidator />;
    case "domain-generator":
      return <DomainGenerator />;

    // === 4. PDF TOOLS (FROM CODEBASE) ===
    case "merge-pdf":
    case "rotate-pdf":
    case "compress-pdf":
      return <MergePdf />;
    case "split-pdf":
      return <SplitPdf />;

    // === 5. DEVELOPER & CASING TOOLS (FROM CODEBASE) ===
    case "case-converter":
      return <CaseConverter />;
    case "text-counter":
      return <TextCounter />;
    case "json-formatter":
      return <JsonFormatter />;
    case "base64":
      return <Base64Converter />;
    case "url-encoder":
      return <UrlEncoder />;
    case "hash-generator":
      return <HashGenerator />;
    case "color-converter":
      return <ColorConverter />;
    case "calculator":
      return <Calculator />;
    case "invoice-generator":
      return <InvoiceGenerator />;

    // === 6. AI UTILITIES ===
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
