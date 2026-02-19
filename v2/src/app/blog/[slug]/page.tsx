import BlogPostContent from '@/components/BlogPostContent';
import { getBlogPostContent } from '@/lib/blog';

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const content = await getBlogPostContent(params.slug);
  
  return (
    <main className="min-h-screen bg-background text-foreground pb-24">
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-24 space-y-16">
        <BlogPostContent content={content} />
      </div>
    </main>
  );
}
