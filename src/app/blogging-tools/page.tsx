import CategoryLandingPage from "@/components/tools/CategoryLandingPage";

export const metadata = {
  title: "Free Blogging Tools Online - Titles, Outlines, Word Count & Images | Toolchi",
  description: "Plan, write, polish, count, and optimize blog content with Toolchi's AI writing, image, and SEO utility workflows.",
  alternates: { canonical: "/blogging-tools" },
};

export default function BloggingToolsPage() {
  return (
    <CategoryLandingPage
      categoryIds={["ai", "developer", "optimize", "transform"]}
      title="Blogging Tools"
      subtitle="Generate ideas, polish drafts, count words, prepare images, and optimize publishing assets from one browser workspace."
      iconName="Newspaper"
      canonical="/blogging-tools"
      introTitle="A Practical Toolkit for Bloggers and Creators"
      intro="Blogging requires more than writing. You need titles, outlines, readability checks, optimized images, metadata, and clean publishing assets. Toolchi brings these small but frequent tasks together so creators can move from draft to publish-ready faster."
      bestFor={["Blog title and outline planning", "Readability and word-count checks", "Blog image compression", "SEO publishing workflows"]}
      comparisons={[
        { label: "Draft planning", benefit: "Generate title angles and content structures.", workflow: "AI Suite -> Word Counter" },
        { label: "Image publishing", benefit: "Resize, compress, and convert images.", workflow: "Resize Image -> Compress Image -> JPG to WebP" },
        { label: "Content polish", benefit: "Improve tone, sentence variety, and formatting.", workflow: "AI Writing Analyzer -> Case Converter" },
      ]}
      faqs={[
        { question: "Can Toolchi help write a full blog post?", answer: "Toolchi helps plan, summarize, rewrite, count, and polish content. You still control the final writing and editorial quality." },
        { question: "Why include image tools for blogging?", answer: "Large images slow pages and hurt user experience. Compressing and converting blog images can improve load speed." },
      ]}
    />
  );
}
