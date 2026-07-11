import Link from "next/link";
import { Home, Search, Wrench } from "lucide-react";
import { TOOLS_REGISTRY } from "@/lib/tools-registry";
import ToolCard from "@/components/tools/ToolCard";

export default function NotFoundPage() {
  const popularTools = TOOLS_REGISTRY.filter((tool) => tool.popular).slice(0, 4);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-16">
      <section className="rounded-3xl border border-border bg-white p-8 text-center shadow-sm dark:bg-card">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
          <Wrench className="h-8 w-8" />
        </div>
        <h1 className="mt-6 text-3xl font-black tracking-tight text-foreground">Page not found</h1>
        <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
          The page may have moved, but Toolchi still has plenty of useful tools ready for you.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/tools" className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-extrabold text-white transition hover:bg-[#6530ef]">
            <Search className="h-4 w-4" />
            Browse tools
          </Link>
          <Link href="/" className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-white px-4 py-2.5 text-xs font-extrabold text-foreground transition hover:bg-neutral-50 dark:bg-card dark:hover:bg-neutral-900">
            <Home className="h-4 w-4" />
            Home
          </Link>
        </div>
      </section>

      {popularTools.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-extrabold text-foreground">Popular tools</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {popularTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
