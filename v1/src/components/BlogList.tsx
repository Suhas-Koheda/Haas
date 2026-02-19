"use client";

import { blogPosts } from '@/services/blogService';
import Link from 'next/link';
import { Calendar, ChevronRight } from 'lucide-react';

const BlogList = () => {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 font-mono text-[var(--foreground)]">Blog</h1>
      
      {blogPosts.length === 0 ? (
        <p className="text-lg text-[var(--muted-foreground)]">No blog posts available yet.</p>
      ) : (
        <div className="space-y-6">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${encodeURIComponent(post.slug)}`}
              className="block bg-[var(--card)] border border-[var(--border)] rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-bold mb-2 font-mono text-[var(--foreground)]">{post.title}</h2>
              <div className="flex items-center text-sm text-[var(--muted-foreground)] mb-4">
                <Calendar size={16} className="mr-2" />
                <span>{post.date}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[var(--primary)] inline-flex items-center">
                  Read more <ChevronRight size={16} className="ml-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;
