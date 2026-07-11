import CategoryLandingPage from "@/components/tools/CategoryLandingPage";

export const metadata = {
  title: "Free Audio Tools Online - Cut, Convert, Merge, Speed & Denoise | Toolchi",
  description: "Cut, convert, merge, speed-adjust, and clean audio files directly in your browser.",
  alternates: { canonical: "/audio-tools" },
};

export default function AudioToolsPage() {
  return (
    <CategoryLandingPage
      categoryIds={["audio"]}
      title="Audio Tools"
      subtitle="Edit, merge, convert, denoise, and speed-adjust audio for podcasts, clips, and web assets."
      iconName="AudioWaveform"
      canonical="/audio-tools"
      introTitle="Simple Audio Workflows Without Heavy Software"
      intro="Not every audio task needs a full editing suite. Toolchi provides lightweight audio utilities for trimming clips, merging tracks, changing speed, converting formats, and reducing noise."
      bestFor={["Podcast clips", "Voice notes", "Course previews", "Lightweight web audio"]}
      comparisons={[
        { label: "Voice cleanup", benefit: "Trim silence and reduce noise.", workflow: "Audio Cutter -> Audio Denoise" },
        { label: "Learning audio", benefit: "Adjust playback speed for lessons.", workflow: "Audio Speed -> Audio Converter" },
        { label: "Compilation", benefit: "Join tracks and export a single file.", workflow: "Merge Audio -> Audio Converter" },
      ]}
      faqs={[
        { question: "What bitrate should I use for voice?", answer: "For spoken content, MP3 around 128kbps is often enough." },
        { question: "Can Toolchi remove all background noise?", answer: "It can reduce simple hiss and background noise, but very noisy recordings may still need manual editing." },
      ]}
    />
  );
}
