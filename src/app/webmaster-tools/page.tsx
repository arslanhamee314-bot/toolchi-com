import CategoryLandingPage from "@/components/tools/CategoryLandingPage";

export const metadata = {
  title: "Free Webmaster Tools Online - SSL, Robots, Sitemap & Uptime | Toolchi",
  description: "Check SSL certificates, robots.txt, XML sitemaps, uptime, domains, redirects, and responsive layouts with Toolchi.",
  alternates: { canonical: "/webmaster-tools" },
};

export default function WebmasterToolsPage() {
  return (
    <CategoryLandingPage
      categoryIds={["webmaster", "performance"]}
      title="Webmaster Tools"
      subtitle="Monitor site availability, crawl rules, HTTPS trust, domain expiry, redirects, and mobile rendering readiness."
      iconName="Globe2"
      canonical="/webmaster-tools"
      introTitle="Operational Checks for Site Owners"
      intro="Webmasters need quick diagnostics for trust, indexing, performance, and availability. Toolchi groups the checks into clear, action-oriented utilities with explanations and related workflows instead of overwhelming reports."
      bestFor={["Site owners", "SEO consultants", "Agencies", "Technical support teams"]}
      comparisons={[
        { label: "Site health", benefit: "Check SSL, uptime, and domain expiry.", workflow: "SSL Checker -> Site Down Checker -> Domain Expiration" },
        { label: "Crawl setup", benefit: "Validate robots and sitemap files.", workflow: "Robots Checker -> Sitemap Validator" },
        { label: "Launch QA", benefit: "Check responsive views and redirect rules.", workflow: "Responsive Checker -> Redirect Checker" },
      ]}
      faqs={[
        { question: "How often should webmasters run checks?", answer: "Run launch checks before publishing, then repeat SSL, uptime, and sitemap checks monthly." },
        { question: "Are these checks enough for enterprise monitoring?", answer: "They are useful diagnostics. For enterprise monitoring, combine Toolchi with scheduled uptime and log monitoring." },
      ]}
    />
  );
}
