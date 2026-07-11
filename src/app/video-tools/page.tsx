import CategoryLandingPage from "@/components/tools/CategoryLandingPage";

export const metadata = {
  title: "Free Video Tools Online - Cut, Crop, Resize, Convert & Loop | Toolchi",
  description: "Trim, crop, resize, mute, reverse, speed up, loop, and convert videos for web and social workflows.",
  alternates: { canonical: "/video-tools" },
};

export default function VideoToolsPage() {
  return (
    <CategoryLandingPage
      categoryIds={["video-tools"]}
      title="Video Tools"
      subtitle="Prepare short clips, web previews, loops, and social videos with guided browser-based utilities."
      iconName="Video"
      canonical="/video-tools"
      introTitle="Fast Video Utilities for Creators"
      intro="Video tasks are often simple but repetitive: trim, crop, mute, resize, convert, and loop. Toolchi keeps these workflows approachable with presets, Smart Assist recommendations, and next steps for GIF or WebM output."
      bestFor={["Short social clips", "Website background videos", "Muted previews", "Looping product demos"]}
      comparisons={[
        { label: "Social crop", benefit: "Choose ratios for vertical or square formats.", workflow: "Video Cropper -> Resize Video" },
        { label: "Web previews", benefit: "Create lightweight WebM or GIF versions.", workflow: "Video to WebM -> Video to GIF" },
        { label: "Clip cleanup", benefit: "Trim, mute, and adjust playback speed.", workflow: "Video Cutter -> Mute Video -> Video Speed" },
      ]}
      faqs={[
        { question: "Which format is best for websites?", answer: "WebM is usually lighter than GIF and works well for web previews." },
        { question: "Should I mute social preview videos?", answer: "Muted previews often load faster and avoid autoplay audio issues." },
      ]}
    />
  );
}
