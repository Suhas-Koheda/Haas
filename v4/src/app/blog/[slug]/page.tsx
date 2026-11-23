import fs from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Clock, FileCode } from "lucide-react";
import Markdown from "@/components/markdown";
import Notebook from "@/components/notebook";
import { blogs } from "@/data/portfolio";

const BLOG_DIR = path.join(process.cwd(), "public", "blog");

async function loadPost(slug: string): Promise<{ content: string; isIpynb: boolean } | null> {
  if (slug.includes("/") || slug.includes("..") || slug.includes("\\")) return null;
  try {
    const content = await fs.readFile(path.join(BLOG_DIR, `${slug}.ipynb`), "utf8");
    return { content, isIpynb: true };
  } catch {
    /* fall through to markdown */
  }
  try {
    const content = await fs.readFile(path.join(BLOG_DIR, `${slug}.md`), "utf8");
    return { content, isIpynb: false };
  } catch {
    return null;
  }
}

export function generateStaticParams() {
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const decoded = decodeURIComponent(slug);
  const post = blogs.find((b) => b.slug === decoded);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      images: [post.coverImage],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const decoded = decodeURIComponent(slug);
  const post = await loadPost(decoded);
  if (!post) notFound();

  const meta = blogs.find((b) => b.slug === decoded);

  return (
    <div className="relative min-h-screen">
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, var(--dot) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
        aria-hidden="true"
      />
      <main className="relative mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <Link
            href="/#writing"
            className="group inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            cd ~/writing
          </Link>
          {post.isIpynb && (
            <a
              href={`/blog/${encodeURIComponent(decoded)}.ipynb`}
              download={`${decoded}.ipynb`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 font-mono text-[11px] text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <FileCode size={13} />
              download .ipynb
            </a>
          )}
        </div>

        {meta && (
          <header className="mb-10">
            <p className="mb-3 font-mono text-[11px] tracking-widest text-accent">
              // blog.post
            </p>
            <h1 className="mb-4 font-display text-3xl font-bold tracking-tight text-fg sm:text-4xl">
              {meta.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] text-faint">
              <span>{meta.date}</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {meta.readingTime}
              </span>
              {meta.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-line bg-accent-soft px-2 py-0.5 text-[10px] text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>
        )}

        {post.isIpynb ? <Notebook notebook={post.content} /> : <Markdown content={post.content} />}
      </main>
    </div>
  );
}