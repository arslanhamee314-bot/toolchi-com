import CategoryLandingPage from "@/components/tools/CategoryLandingPage";

export const metadata = {
  title: "Free SEO Tools Online - Sitemap, Robots, Redirect & Gzip | Toolchi",
  description: "Run technical SEO checks for robots.txt, XML sitemaps, redirects, SSL, gzip, AMP, and responsive layouts.",
  alternates: { canonical: "/seo-tools" },
};

export default function SeoToolsPage() {
  return (
    <CategoryLandingPage
      categoryIds={["webmaster", "performance"]}
      title="SEO & Webmaster Tools"
      subtitle="Audit crawl access, redirects, sitemap health, HTTPS status, compression, AMP pages, and responsive layouts."
      iconName="SearchCheck"
      canonical="/seo-tools"
      introTitle="Technical SEO Checks Without the Noise"
      intro="Technical SEO work needs clear signals, not raw dumps. Toolchi organizes robots, sitemap, SSL, redirects, gzip, and responsive checks into guided workflows with crawl-readiness suggestions and related next actions."
      bestFor={["Website launch audits", "Crawl and indexing checks", "Redirect cleanup", "Performance diagnostics"]}
      comparisons={[
        { label: "Indexing issues", benefit: "Check robots.txt and sitemap availability.", workflow: "Robots Checker -> Sitemap Validator" },
        { label: "HTTPS trust", benefit: "Inspect SSL status and expiry risk.", workflow: "SSL Checker -> Site Down Checker" },
        { label: "Redirect chains", benefit: "Trace hops and identify SEO waste.", workflow: "Redirect Checker -> Gzip Checker" },
      ]}
      faqs={[
        { question: "Which SEO tools should I run first?", answer: "Start with robots.txt, sitemap, SSL, and redirects. These affect crawling, trust, and page discovery." },
        { question: "Does Toolchi replace Search Console?", answer: "No. Toolchi helps diagnose common technical issues quickly, then you should validate indexing in Google Search Console." },
      ]}
    />
  );
}
