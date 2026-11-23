"use client";

import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

const components: Components = {
  h1: ({ node, ...props }) => (
    <h1 className="mb-6 mt-10 font-display text-3xl font-bold tracking-tight text-fg first:mt-0" {...props} />
  ),
  h2: ({ node, ...props }) => (
    <h2 className="mb-4 mt-10 border-b border-line pb-2 font-display text-2xl font-semibold tracking-tight text-fg" {...props} />
  ),
  h3: ({ node, ...props }) => (
    <h3 className="mb-3 mt-8 font-display text-xl font-semibold tracking-tight text-fg" {...props} />
  ),
  h4: ({ node, ...props }) => (
    <h4 className="mb-2 mt-6 font-display text-lg font-semibold text-fg" {...props} />
  ),
  p: ({ node, ...props }) => <p className="mb-4 leading-7" {...props} />,
  ul: ({ node, ...props }) => <ul className="my-4 ml-6 list-disc [&>li]:mt-2" {...props} />,
  ol: ({ node, ...props }) => <ol className="my-4 ml-6 list-decimal [&>li]:mt-2" {...props} />,
  blockquote: ({ node, ...props }) => (
    <blockquote className="my-6 border-l-2 border-accent pl-5 italic text-faint" {...props} />
  ),
  a: ({ node, ...props }) => (
    <a className="font-medium text-accent underline underline-offset-4 transition-colors hover:text-accent-2" {...props} />
  ),
  strong: ({ node, ...props }) => <strong className="font-semibold text-fg" {...props} />,
  hr: () => <hr className="my-8 border-line" />,
  img: ({ node, ...props }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="my-6 max-w-full rounded-xl border border-line" alt="" {...props} />
  ),
  table: ({ node, ...props }) => (
    <div className="my-6 overflow-x-auto rounded-xl border border-line">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  th: ({ node, ...props }) => (
    <th className="border border-line bg-accent-soft px-3 py-2 text-left font-semibold text-fg" {...props} />
  ),
  td: ({ node, ...props }) => <td className="border border-line px-3 py-2" {...props} />,
  pre: ({ node, ...props }) => (
    <pre className="my-5 overflow-x-auto rounded-xl border border-line bg-[var(--code-bg)] p-4 text-[13px] leading-relaxed" {...props} />
  ),
  code: ({ node, className, children, ...props }) => {
    const isBlock = /language-(\w+)/.test(className ?? "");
    return isBlock ? (
      <code className={className} {...props}>{children}</code>
    ) : (
      <code className="rounded-md border border-line bg-accent-soft px-1.5 py-0.5 font-mono text-[0.85em] font-medium text-accent" {...props}>
        {children}
      </code>
    );
  },
};

export default function Markdown({ content }: { content: string }) {
  return (
    <div className="max-w-none text-[15px] leading-7 text-muted">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}