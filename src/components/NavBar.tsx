"use client"
import Link from "next/link";
import ThemeToggle from './ThemeToggle'; // Add this import

export default function Navigation() {
    return (
        <nav className="w-full shadow-sm border-b bg-[var(--background)] font-jetbrains-mono font-extrabold sticky"> {/* MODIFIED: Use CSS variable for background */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/*/!* Logo/Brand - optional *!/*/}
                    {/*<div className="flex-shrink-0">*/}
                    {/*    <Link href="/" className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">*/}
                    {/*        Suhas Koheda*/}
                    {/*    </Link>*/}
                    {/*</div>*/}
                    <div className="hidden md:flex space-x-8 items-center"> {/* Added items-center */}
                        <Link
                            href="/resume"
                            className="text-[var(--foreground)] hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-gray-50" // MODIFIED: Use CSS variable for text
                        >
                            Resume
                        </Link>
                        <Link
                            href="/projects"
                            className="text-[var(--foreground)] hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-gray-50" // MODIFIED: Use CSS variable for text
                        >
                            Projects
                        </Link>
                        <Link
                            href="/blog"
                            className="text-[var(--foreground)] hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-gray-50" // MODIFIED: Use CSS variable for text
                        >
                            Blog
                        </Link>
                        <Link
                            href="/research"
                            className="text-[var(--foreground)] hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-gray-50" // MODIFIED: Use CSS variable for text
                        >
                            Research
                        </Link>
                        <ThemeToggle /> {/* ADDED: ThemeToggle component */}
                    </div>

                    {/* Mobile Navigation - Horizontal */}
                    <div className="md:hidden flex space-x-2 items-center"> {/* Added items-center */}
                        <Link
                            href="/resume"
                            className="text-[var(--foreground)] hover:text-blue-600 px-2 py-1 rounded-md text-xs font-medium transition-colors duration-200 hover:bg-white" // MODIFIED: Use CSS variable for text
                        >
                            Resume
                        </Link>
                        <Link
                            href="/projects"
                            className="text-[var(--foreground)] hover:text-blue-600 px-2 py-1 rounded-md text-xs font-medium transition-colors duration-200 hover:bg-white" // MODIFIED: Use CSS variable for text
                        >
                            Projects
                        </Link>
                        <Link
                            href="/blog"
                            className="text-[var(--foreground)] hover:text-blue-600 px-2 py-1 rounded-md text-xs font-medium transition-colors duration-200 hover:bg-white" // MODIFIED: Use CSS variable for text
                        >
                            Blog
                        </Link>
                        <Link
                            href="/research"
                            className="text-[var(--foreground)] hover:text-blue-600 px-2 py-1 rounded-md text-xs font-medium transition-colors duration-200 hover:bg-white" // MODIFIED: Use CSS variable for text
                        >
                            Research
                        </Link>
                         <div className="md:hidden"> <ThemeToggle /> </div> {/* ADDED: ThemeToggle for mobile view, wrapped in a div for potential separate styling */}
                    </div>
                </div>
            </div>
        </nav>
    );
}