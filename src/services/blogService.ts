export async function getBlogPost(slug: string): Promise<string> {
  try {
    const response = await fetch(`/blog/${slug}.md`, {
      headers: {
        'Content-Type': 'text/markdown',
      },
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch blog post: ${response.status}`);
    }
    
    return await response.text();
  } catch (error) {
    console.error('Error fetching blog post:', error);
    throw error;
  }
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "GO",
    title: 'Why Does Your Go Server Log /favicon.ico Requests? (And How to Fix It)',
    date: 'July 5, 2025',
  },
  {
    slug: 'Writing and Publishing Gradle Plugins',
    title: 'Writing and Publishing Gradle Plugins',
    date: 'July 5, 2025',
  },
];
