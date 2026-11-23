import Link from "next/link";
import { Clock, MoveUpRight } from "lucide-react";
import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import { blogs } from "@/data/portfolio";

export default function BlogList() {
  return (
    <Reveal className="mb-10 sm:mb-12">
      <SectionHeading index="07" title="Thoughts & Writing" subtitle="context.window · long-form tokens" id="writing" />
      <div className="space-y-3">
        {blogs.map((blog) => (
          <Link
            key={blog.slug}
            href={`/blog/${encodeURIComponent(blog.slug)}`}
            className="group flex gap-4 rounded-xl border border-line bg-card p-4 transition-all hover:border-accent/40 hover:bg-card-hover"
          >
            <div className="min-w-0 flex-1">
              <h3 className="mb-1 line-clamp-2 font-display text-sm font-semibold text-fg transition-colors group-hover:text-accent sm:text-base">
                {blog.title}
              </h3>
              <p className="mb-2 line-clamp-1 text-xs text-faint sm:text-sm">{blog.excerpt}</p>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[10px] text-faint">{blog.date}</span>
                <span className="flex items-center gap-1 font-mono text-[10px] text-faint">
                  <Clock className="h-2.5 w-2.5" />
                  {blog.readingTime}
                </span>
                {blog.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-line bg-accent-soft px-1.5 py-0.5 font-mono text-[9px] text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <MoveUpRight className="h-4 w-4 shrink-0 self-center text-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
          </Link>
        ))}
      </div>
    </Reveal>
  );
}