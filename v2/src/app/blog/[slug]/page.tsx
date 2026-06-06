import BlogPostContent from '@/components/BlogPostContent';
import { getBlogPostContent, blogPosts } from '@/lib/blog';

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { content, isIpynb } = await getBlogPostContent(params.slug);
  
  return (
    <main className="min-h-screen bg-background text-foreground pb-24">
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-24 space-y-16">
        <BlogPostContent content={content} isIpynb={isIpynb} slug={params.slug} />
      </div>
    </main>
  );
}
