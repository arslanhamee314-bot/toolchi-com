import CategoryLandingPage from "@/components/tools/CategoryLandingPage";

export const metadata = {
  title: "Free GIF Tools Online - Make, Convert, Optimize & Split GIFs | Toolchi",
  description: "Create GIFs, convert video to GIF, optimize GIF size, split frames, and convert GIF to MP4/WebM.",
  alternates: { canonical: "/gif-tools" },
};

export default function GifToolsPage() {
  return (
    <CategoryLandingPage
      categoryIds={["gif-maker", "split", "optimize"]}
      title="GIF Tools"
      subtitle="Create, convert, analyze, optimize, and split animated GIFs and related formats."
      iconName="Film"
      canonical="/gif-tools"
      introTitle="Animation Tools for Web and Social Sharing"
      intro="GIFs are easy to share but can become heavy quickly. Toolchi combines GIF creation, conversion, optimization, and frame extraction with recommendations for file size, frame rate, and web readiness."
      bestFor={["Animated tutorials", "Reaction GIFs", "Product loops", "Frame extraction"]}
      comparisons={[
        { label: "Create animation", benefit: "Build GIFs from images or videos.", workflow: "GIF Maker -> GIF Optimizer" },
        { label: "Reduce size", benefit: "Lower FPS or convert to MP4/WebM.", workflow: "GIF Optimizer -> GIF to MP4" },
        { label: "Extract frames", benefit: "Split GIF/APNG/WebP into frames.", workflow: "GIF Splitter -> Write on Image" },
      ]}
      faqs={[
        { question: "Why are GIF files so large?", answer: "GIFs store many frames with limited compression. WebM or MP4 is usually better for long animations." },
        { question: "What FPS is good for web GIFs?", answer: "For many web previews, 10-15 FPS balances smoothness and file size." },
      ]}
    />
  );
}
