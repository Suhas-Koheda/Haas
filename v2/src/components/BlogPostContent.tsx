"use client";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css'; // Or 'github.css' based on theme
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import IpynbRenderer from '@/components/IpynbRenderer';

interface BlogPostContentProps {
  content: string;
  isIpynb?: boolean;
}

export default function BlogPostContent({ content, isIpynb }: BlogPostContentProps) {
  return (
    <div className="space-y-8">
      <Link 
        href="/blog" 
        className="inline-flex items-center text-foreground hover:text-muted-foreground transition-colors group"
      >
        <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Blog
      </Link>
      
      {isIpynb ? (
        <div className="w-full">
          <IpynbRenderer notebook={content} />
        </div>
      ) : (
        <div className="prose prose-lg dark:prose-invert prose-neutral max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            h1: ({...props}) => <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8" {...props} />,
            h2: ({...props}) => <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mt-12 mb-4" {...props} />,
            h3: ({...props}) => <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mt-8 mb-4" {...props} />,
            p: ({...props}) => <p className="leading-7 [&:not(:first-child)]:mt-6 mb-4" {...props} />,
            ul: ({...props}) => <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props} />,
            ol: ({...props}) => <ol className="my-6 ml-6 list-decimal [&>li]:mt-2" {...props} />,
            code: ({className, children, ...props}: { className?: string; children?: React.ReactNode }) => {
              const match = /language-(\w+)/.exec(className || '');
              const isInline = !match;
              return isInline ? (
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold" {...props}>
                  {children}
                </code>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
            pre: ({children, ...props}) => (
              <pre className="mb-4 mt-6 overflow-x-auto rounded-lg border bg-muted p-4" {...props}>
                {children}
              </pre>
            ),
            blockquote: ({...props}) => <blockquote className="mt-6 border-l-2 pl-6 italic text-muted-foreground" {...props} />,
            a: ({...props}) => <a className="font-medium underline underline-offset-4 hover:text-primary transition-colors" {...props} />,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    )}
    </div>
  );
}
