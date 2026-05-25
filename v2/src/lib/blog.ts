import fs from 'fs';
import path from 'path';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description?: string;
  isIpynb?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "attention-mechanism-kv-cache",
    title: 'Deep Dive: Attention Mechanism & KV Cache',
    date: 'May 25, 2026',
    description: 'A detailed interactive notebook explaining Multi-Query Attention and KV cache indexing from scratch.',
    isIpynb: true,
  },
  {
    slug: "GO",
    title: 'Why Does Your Go Server Log /favicon.ico Requests?',
    date: 'Jul 5, 2025',
    description: 'Understanding browser behavior with favicon requests and how to handle them in Go.'
  },
  {
    slug: "Writing and Publishing Gradle Plugins",
    title: 'Writing and Publishing Gradle Plugins',
    date: 'Jul 5, 2025',
    description: 'A comprehensive guide to creating and publishing your own Gradle plugins.'
  },
];

export async function getBlogPostContent(slug: string): Promise<{ content: string; isIpynb: boolean }> {
  // Decode the slug to handle spaces and special characters
  const decodedSlug = decodeURIComponent(slug);
  const ipynbPath = path.join(process.cwd(), 'public', 'blog', `${decodedSlug}.ipynb`);
  const mdPath = path.join(process.cwd(), 'public', 'blog', `${decodedSlug}.md`);
  
  try {
    if (fs.existsSync(ipynbPath)) {
      const fileContent = await fs.promises.readFile(ipynbPath, 'utf8');
      return { content: fileContent, isIpynb: true };
    }
    const fileContent = await fs.promises.readFile(mdPath, 'utf8');
    return { content: fileContent, isIpynb: false };
  } catch (error) {
    console.error(`Error reading blog post ${decodedSlug}:`, error);
    throw new Error(`Failed to load blog post: ${decodedSlug}`);
  }
}
