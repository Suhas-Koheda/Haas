"use client";

import BlogPostContent from '@/components/BlogPostContent';

import { useParams } from 'next/navigation';
export const runtime = 'edge';
export default function BlogPostPage() {
  const { slug } = useParams();
  
  const blogSlug = Array.isArray(slug) ? slug.join('/') : (slug as string);
  
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--foreground)] py-12">
      <BlogPostContent slug={blogSlug} />
    </div>
  );
}
