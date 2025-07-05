"use client";
import Link from 'next/link';
import { Construction } from 'lucide-react';

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--foreground)] flex flex-col justify-center items-center text-center py-12 px-4 sm:px-6 lg:px-8">
      <Construction size={64} className="text-[var(--primary)] mb-6" />
      <h1 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-4 font-mono"> {/* Title mono */}
        Blog Coming Soon!
      </h1>
      <p className="text-lg sm:text-xl text-[var(--muted-foreground)] mb-8 max-w-md font-sans"> {/* Paragraph sans */}
        I&apos;m currently working on curating some exciting content and articles. Please check back later!
      </p>
      <Link
        href="/"
        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-[var(--primary-foreground)] bg-[var(--primary)] hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary)] transition-colors font-sans" /* Button text sans */
      >
        Go back to Homepage
      </Link>
    </div>
  );
}
