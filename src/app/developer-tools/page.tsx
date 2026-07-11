import CategoryLandingPage from "@/components/tools/CategoryLandingPage";

export const metadata = {
  title: "Free Developer Tools Online - JSON, Base64, Hash & Minify | Toolchi",
  description: "Format JSON, encode Base64, generate hashes, minify code, convert colors, and clean developer payloads locally in your browser.",
  alternates: { canonical: "/developer-tools" },
};

export default function DeveloperToolsPage() {
  return (
    <CategoryLandingPage
      categoryIds={["developer"]}
      title="Developer Tools"
      subtitle="Clean, validate, encode, hash, and prepare code snippets or API payloads without sending them to a server."
      iconName="Code2"
      canonical="/developer-tools"
      introTitle="Private Utilities for Everyday Development"
      intro="Developer utilities often handle tokens, payloads, configuration files, and snippets that should not be pasted into unknown cloud tools. Toolchi keeps formatting, encoding, hashing, and minification workflows in the browser while adding Smart Assist, quality scores, and next best actions."
      bestFor={["Debugging API responses", "Preparing production code", "Encoding payloads safely", "Checking hashes and file integrity"]}
      comparisons={[
        { label: "Messy JSON", benefit: "Format, validate, and score readability.", workflow: "JSON Formatter -> Minifier -> Hash Generator" },
        { label: "Encoded payloads", benefit: "Convert Base64, URL encode, and preview outputs.", workflow: "Base64 -> URL Encoder -> Hash Generator" },
        { label: "Production assets", benefit: "Minify and estimate compression savings.", workflow: "Minifier -> Gzip Checker" },
      ]}
      faqs={[
        { question: "Are developer inputs uploaded?", answer: "No. Core formatting, encoding, and hashing actions run locally in your browser." },
        { question: "Can Toolchi help with API payload cleanup?", answer: "Yes. Use JSON Formatter, Base64, URL Encoder, and Hash Generator together for API debugging workflows." },
      ]}
    />
  );
}
