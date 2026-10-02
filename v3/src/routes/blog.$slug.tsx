import { createFileRoute, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import BlogPostContent from "../components/BlogPostContent";

export const Route = createFileRoute("/blog/$slug")({ component: BlogPostPage });

function BlogPostPage() {
  const { slug } = useParams({ from: "/blog/$slug" });
  const [content, setContent] = useState<string | null>(null);
  const [isIpynb, setIsIpynb] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const decoded = decodeURIComponent(slug);
    async function load() {
      try {
        const res = await fetch(`/blog/${encodeURIComponent(decoded)}.ipynb`);
        if (res.ok && (res.headers.get("content-type") || "").includes("json")) {
          setContent(await res.text());
          setIsIpynb(true);
          return;
        }
      } catch {
        /* fall through */
      }
      try {
        const res = await fetch(`/blog/${encodeURIComponent(decoded)}.md`);
        if (res.ok) {
          const text = await res.text();
          if (!text.startsWith("<")) {
            setContent(text);
            setIsIpynb(false);
            return;
          }
        }
      } catch {
        /* fall through */
      }
      setError(true);
    }
    load();
  }, [slug]);

  return (
    <main className="min-h-screen pb-24" style={{ backgroundColor: "#0a0a0a", color: "#fafafa" }}>
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-16">
        {error ? (
          <p>Failed to load blog post.</p>
        ) : content === null ? (
          <p>Loading…</p>
        ) : (
          <BlogPostContent content={content} isIpynb={isIpynb} slug={decodeURIComponent(slug)} />
        )}
      </div>
    </main>
  );
}
