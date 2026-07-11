import CategoryLandingPage from "@/components/tools/CategoryLandingPage";

export const metadata = {
  title: "Free Business Tools Online - Invoice, QR, Barcode & A/B Testing | Toolchi",
  description: "Create invoices, generate QR codes and barcodes, calculate A/B test significance, and prepare share links.",
  alternates: { canonical: "/business-tools" },
};

export default function BusinessToolsPage() {
  return (
    <CategoryLandingPage
      categoryIds={["operational"]}
      title="Business Tools"
      subtitle="Generate invoices, QR codes, barcodes, share links, placeholders, and simple growth calculations."
      iconName="BriefcaseBusiness"
      canonical="/business-tools"
      introTitle="Practical Utilities for Small Business Workflows"
      intro="Small teams need quick business assets without opening complex software. Toolchi helps generate invoices, QR codes, barcodes, campaign share links, placeholders, and A/B testing calculations from one clean interface."
      bestFor={["Freelancers", "Small shops", "Marketing teams", "Agencies"]}
      comparisons={[
        { label: "Client billing", benefit: "Create PDF invoices and add brand footer.", workflow: "Invoice Generator -> QR Generator" },
        { label: "Campaign links", benefit: "Create share URLs and QR codes.", workflow: "Share Link Creator -> QR Generator" },
        { label: "Experiment review", benefit: "Calculate A/B significance.", workflow: "A/B Test Calculator -> Share Link Creator" },
      ]}
      faqs={[
        { question: "Can I remove Toolchi branding?", answer: "Free outputs may include a subtle Toolchi stamp. Pro users can remove or customize branding." },
        { question: "Are invoices stored online?", answer: "No. The invoice builder runs locally unless a future cloud-save Pro feature is enabled." },
      ]}
    />
  );
}
