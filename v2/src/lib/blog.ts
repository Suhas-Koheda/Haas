import fs from 'fs';
import path from 'path';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description?: string;
}

export const blogPosts: BlogPost[] = [
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

export async function getBlogPostContent(slug: string): Promise<string> {
  // Decode the slug to handle spaces and special characters
  const decodedSlug = decodeURIComponent(slug);
  const filePath = path.join(process.cwd(), 'public', 'blog', `${decodedSlug}.md`);
  try {
    const fileContent = await fs.promises.readFile(filePath, 'utf8');
    return fileContent;
  } catch (error) {
    console.error(`Error reading blog post ${decodedSlug}:`, error);
    // Fallback? Or throw
    throw new Error(`Failed to load blog post: ${decodedSlug}`);
  }
}
