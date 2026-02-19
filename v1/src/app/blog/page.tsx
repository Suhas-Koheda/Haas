"use client";
import BlogList from '@/components/BlogList';

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--foreground)] py-12">
      <BlogList />
    </div>
  );
}
