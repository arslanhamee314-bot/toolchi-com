export const DEFAULT_TOOL_UPDATE_DATE = "2026-07-18";

export const TOOL_UPDATED_DATES: Record<string, string> = {
  "gif-maker": "2026-07-18",
  "video-to-gif": "2026-07-18",
  "webp-to-jpg": "2026-07-18",
  "resize-image": "2026-07-18",
  "text-counter": "2026-07-18",
  "ssl-checker": "2026-07-18",
  "xml-sitemap-validator": "2026-07-18",
  "merge-pdf": "2026-07-15",
  "compress-image": "2026-07-15",
  "json-formatter": "2026-07-12",
  "robots-txt-checker": "2026-07-10",
  "redirect-checker": "2026-07-10",
};

export const getToolLastUpdatedDate = (slug: string): string => {
  return TOOL_UPDATED_DATES[slug] || DEFAULT_TOOL_UPDATE_DATE;
};

export const formatLastUpdatedDate = (dateStr: string): string => {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "July 18, 2026";
  }
};
