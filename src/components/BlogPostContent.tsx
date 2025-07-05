"use client";
// @typescript-eslint/no-unused-vars
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import { getBlogPost } from '@/services/blogService';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface BlogPostContentProps {
  slug: string;
}

const BlogPostContent = ({ slug }: BlogPostContentProps) => {
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadBlogPost() {
      try {
        setIsLoading(true);
        const postContent = await getBlogPost(slug);
        setContent(postContent);
      } catch (err) {
        console.error('Failed to load blog post:', err);
        setError('Failed to load blog post. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }

    loadBlogPost();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 size={36} className="animate-spin text-[var(--primary)]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-[var(--destructive)]">{error}</p>
        <Link href="/blog" className="mt-4 inline-flex items-center text-[var(--primary)]">
          <ArrowLeft size={16} className="mr-2" />
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <article className="prose prose-lg dark:prose-invert max-w-4xl mx-auto p-6 bg-[var(--card)] rounded-lg shadow-md font-sans">
      <Link href="/blog" className="mb-6 inline-flex items-center text-[var(--primary)] hover:underline">
        <ArrowLeft size={16} className="mr-2" />
        Back to Blog
      </Link>
      <div className="markdown-content markdown-body">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            
            h1: ({   ...props }) => (
              <h1 className="text-3xl font-bold mb-4 font-mono text-[var(--foreground)]" {...props} />
            ),
            h2: ({   ...props }) => (
              <h2 className="text-2xl font-bold mt-8 mb-4 font-mono text-[var(--foreground)]" {...props} />
            ),
            h3: ({   ...props }) => (
              <h3 className="text-xl font-bold mt-6 mb-3 font-mono text-[var(--foreground)]" {...props} />
            ),
            p: ({   ...props }) => (
              <p className="my-4 leading-relaxed text-[var(--foreground)]" {...props} />
            ),
            ul: ({   ...props }) => (
              <ul className="list-disc pl-6 my-4" {...props} />
            ),
            ol: ({   ...props }) => (
              <ol className="list-decimal pl-6 my-4" {...props} />
            ),
            li: ({   ...props }) => (
              <li className="mb-1 text-[var(--foreground)]" {...props} />
            ),
            a: ({   ...props }) => (
              <a className="text-[var(--primary)] hover:underline" {...props} />
            ),
            code: ({   className, ...props }) => {
              const isInline = !className || !className.includes('language-');
              return isInline ? (
                <code className="bg-[var(--muted)] px-1 py-0.5 rounded text-sm" {...props} />
              ) : (
                <code className={`text-sm ${className || ''}`} {...props} />
              );
            },
            pre: ({   children, ...props }) => {
              const codeElement = Array.isArray(children) 
                ? children.find(child => 
                    child.props?.className && 
                    typeof child.props.className === 'string' && 
                    child.props.className.includes('language-'))
                : null;
                
              let language = '';
              if (codeElement && codeElement.props.className) {
                const match = codeElement.props.className.match(/language-(\w+)/);
                language = match ? match[1] : '';
              }
              
              return (
                <div className="relative rounded-md overflow-hidden">
                  {language && 
                    <div className="px-4 py-1 bg-[var(--muted)] border-b border-[var(--border)] text-xs font-mono uppercase tracking-wider">
                      {language}
                    </div>
                  }
                  <pre className="bg-[var(--muted)] rounded-md overflow-x-auto my-6" {...props}>
                    {children}
                  </pre>
                </div>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </article>
  );
};

export default BlogPostContent;
