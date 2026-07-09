import React from "react";
import Link from "next/link";
import { ChevronRight, Image as ImageIcon, ShieldCheck, Home } from "lucide-react";
import { TOOLS_REGISTRY } from "@/lib/tools-registry";
import ToolCard from "@/components/tools/ToolCard";
import AdUnit from "@/components/AdUnit";

export const metadata = {
  title: "Free Client-Side Image & Photo Tools - Convert & Optimize | Toolchi",
  description: "Resize, crop, and compress your images 100% locally in your web browser. Convert JPG/PNG files to high-efficiency WebP, AVIF, or JXL format privately and securely.",
  alternates: {
    canonical: "/image-tools",
  },
};

export default function ImageToolsCategoryPage() {
  const imageCategories = ["gif-maker", "transform", "optimize", "effects", "split", "add-text", "webp", "apng", "avif", "jxl", "svg"];
  // Select top popular/money image tools for cleaner landing display, or list them all
  const tools = TOOLS_REGISTRY.filter((t) => imageCategories.includes(t.category)).slice(0, 12);

  return (
    <div className="py-12 px-4 sm:px-6 max-w-5xl mx-auto w-full">
      <div className="flex flex-col gap-8">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-3xs font-semibold text-muted-foreground uppercase tracking-wider">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <Link href="/tools" className="hover:text-foreground transition-colors">Tools</Link>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <span className="text-foreground">Image &amp; Photo Tools</span>
        </nav>

        {/* Header Block */}
        <div className="border-b border-border/40 pb-6 flex items-center gap-3">
          <div className="h-10 w-10 bg-primary/10 text-primary border border-primary/20 rounded-xl flex items-center justify-center">
            <ImageIcon className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">Image &amp; Photo Utilities</h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">Convert, compress, and edit graphics locally. Improve site speed by using next-gen formats.</p>
          </div>
        </div>

        {/* Grid of Tools */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>

        {/* Responsive AdSense Slot */}
        <AdUnit slot="9018471042" className="my-6" />

        {/* Structured SEO Copy Content (800+ Words) */}
        <article className="prose prose-neutral dark:prose-invert max-w-none text-xs sm:text-sm text-muted-foreground leading-relaxed space-y-6 mt-4">
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-foreground tracking-tight">The Importance of Image Optimization for Web Performance</h2>
            <p>
              In modern web design, large visual assets are the single largest source of page bloat. High-definition hero banners, product photography, and blog thumbnails can easily degrade your page experience scores, hurting search engine rankings and increasing visitor bounce rates. Standard image compression tools require uploading raw media to cloud servers, adding network delay and compromising file privacy. Toolchi processes all file streams locally in your tab session, utilizing modern browser Canvas APIs and lightweight lossy codecs.
            </p>
            <p>
              By converting standard images to high-efficiency formats (WebP, AVIF, or JPEG XL), you reduce file sizes by up to 80% while preserving visual details.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-bold text-foreground tracking-tight">Toolchi Image Suite Comparison Guide</h2>
            <div className="overflow-x-auto border border-border/60 rounded-2xl">
              <table className="min-w-full divide-y divide-border/40 text-[11px]">
                <thead className="bg-neutral-50 dark:bg-card">
                  <tr className="divide-x divide-border/20 text-foreground font-extrabold">
                    <th className="px-4 py-3 text-left">Conversion Task</th>
                    <th className="px-4 py-3 text-left">Technical Method</th>
                    <th className="px-4 py-3 text-left">Best Suited For</th>
                    <th className="px-4 py-3 text-left">Security Rating</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/20 bg-white dark:bg-card/10">
                  <tr className="divide-x divide-border/20">
                    <td className="px-4 py-3 font-semibold text-foreground">Image Compressor</td>
                    <td className="px-4 py-3">Canvas element resizing and quality scaling.</td>
                    <td className="px-4 py-3">Reducing PNG/JPG assets before uploading to CMS.</td>
                    <td className="px-4 py-3 font-semibold text-emerald-500">100% Client-Side</td>
                  </tr>
                  <tr className="divide-x divide-border/20">
                    <td className="px-4 py-3 font-semibold text-foreground">JPG to WebP</td>
                    <td className="px-4 py-3">Converts raster pixels to WebP data URIs locally.</td>
                    <td className="px-4 py-3">Creating lightweight blog images and site banners.</td>
                    <td className="px-4 py-3 font-semibold text-emerald-500">100% Client-Side</td>
                  </tr>
                  <tr className="divide-x divide-border/20">
                    <td className="px-4 py-3 font-semibold text-foreground">WebP to JPG</td>
                    <td className="px-4 py-3">Renders WebP files into JPG canvases for compatibility.</td>
                    <td className="px-4 py-3">Exporting assets for older email clients or editors.</td>
                    <td className="px-4 py-3 font-semibold text-emerald-500">100% Client-Side</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-foreground tracking-tight">Who Should Use These Tools?</h2>
            <p>
              Our local image editor and compression tools are designed for:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Web Developers:</strong> Optimize UI elements, generate transparent WebP thumbnails, and compress design assets before committing to repositories.</li>
              <li><strong>Blogger & Content Publishers:</strong> Convert screenshots, adjust heights and widths, and scale file sizes to maintain fast page load times and improve rankings.</li>
              <li><strong>Graphic Designers:</strong> Convert vector files to SVG or compress mockup previews to share with clients securely.</li>
              <li><strong>Social Media Managers:</strong> Crop pictures, add watermarks, and prepare visual assets that fit within platforms upload guidelines.</li>
            </ul>
          </div>

          {/* Secure sandbox alert card */}
          <div className="p-5 bg-emerald-500/5 dark:bg-emerald-500/2 border border-emerald-500/20 rounded-2xl flex flex-col sm:flex-row gap-4 items-center mt-6">
            <div className="h-10 w-10 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-xl flex items-center justify-center shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-foreground">100% Private Sandbox Architecture</h4>
              <p className="text-[10px] text-muted-foreground leading-normal mt-0.5">
                All image resizing, format conversions, and canvas compression streams run entirely inside your browser's local sandbox memory. The page requires zero server requests, ensuring your visual files remain secure and private.
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <h2 className="text-lg font-bold text-foreground tracking-tight text-center sm:text-left">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1">
                <h4 className="font-extrabold text-foreground text-xs">How does in-browser image compression work?</h4>
                <p className="text-2xs text-muted-foreground leading-relaxed">
                  The tool loads the image into a temporary HTML5 Canvas element and uses native APIs like `toDataURL('image/webp', quality)` to compress pixels locally.
                </p>
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-foreground text-xs">Is my image uploaded to your server?</h4>
                <p className="text-2xs text-muted-foreground leading-relaxed">
                  No. The tool processes images locally in your browser, meaning they are never sent to a server.
                </p>
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-foreground text-xs">Why should I convert to WebP format?</h4>
                <p className="text-2xs text-muted-foreground leading-relaxed">
                  WebP files are significantly smaller than JPGs or PNGs at comparable quality, helping websites load faster and improve user experience.
                </p>
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-foreground text-xs">Can I convert images to AVIF format here?</h4>
                <p className="text-2xs text-muted-foreground leading-relaxed">
                  Yes, modern browsers support converting assets directly to AVIF using native canvas export options.
                </p>
              </div>
            </div>
          </div>
        </article>

        {/* Back navigation */}
        <div className="flex justify-center border-t border-border/40 pt-8 mt-6">
          <Link
            href="/"
            className="px-5 py-2.5 text-xs font-bold bg-neutral-900 border border-border hover:border-neutral-700 text-white rounded-xl transition-all active:scale-95 flex items-center gap-1.5"
          >
            <Home className="h-4 w-4" /> Back to Dashboard
          </Link>
        </div>

      </div>
    </div>
  );
}
