import Link from 'next/link';
import { blogPosts } from '@/lib/blog';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';

export default function BlogIndex() {
  return (
    <main className="min-h-screen bg-background text-foreground pb-24">
      <div className="max-w-3xl mx-auto px-10 py-24 space-y-16">
        <Link 
          href="/"
          className="inline-flex items-center text-foreground hover:text-muted-foreground transition-colors group mb-8"
        >
          <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back
        </Link>
 
        <section className="space-y-4">
          <p className="font-mono text-sm text-muted-foreground uppercase tracking-widest">
            Writing
          </p>
          <h1 className="text-6xl font-bold tracking-tighter">Blog</h1>
          <p className="text-xl font-light text-muted-foreground max-w-xl leading-relaxed">
            Thoughts on software engineering, algorithms, and system design.
          </p>
        </section>

        <section className="space-y-12">
          {blogPosts.map((post) => (
            <Link 
              key={post.slug} 
              href={`/blog/${post.slug}`}
              className="group block space-y-3"
            >
              <div className="flex items-baseline justify-between">
                <h2 className="text-2xl font-semibold group-hover:underline decoration-1 underline-offset-4">
                  {post.title}
                </h2>
                <ArrowUpRight 
                  size={20} 
                  className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity ml-4 shrink-0" 
                />
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground font-mono">
                <time>{post.date}</time>
              </div>
              {post.description && (
                <p className="text-muted-foreground leading-relaxed">
                  {post.description}
                </p>
              )}
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
