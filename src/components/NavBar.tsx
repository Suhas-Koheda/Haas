"use client"
import Link from "next/link";

export default function Navigation() {
    return (
        <nav className="w-full shadow-sm border-b bg-[#fff5e9] font-jetbrains-mono font-extrabold sticky">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/*/!* Logo/Brand - optional *!/*/}
                    {/*<div className="flex-shrink-0">*/}
                    {/*    <Link href="/" className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">*/}
                    {/*        Suhas Koheda*/}
                    {/*    </Link>*/}
                    {/*</div>*/}
                    <div className="hidden md:flex space-x-8">
                        <Link
                            href="/resume"
                            className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-gray-50"
                        >
                            Resume
                        </Link>
                        <Link
                            href="/projects"
                            className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-gray-50"
                        >
                            Projects
                        </Link>
                        <Link
                            href="/blog"
                            className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-gray-50"
                        >
                            Blog
                        </Link>
                        <Link
                            href="/research"
                            className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-gray-50"
                        >
                            Research
                        </Link>
                    </div>

                    {/* Mobile Navigation - Horizontal */}
                    <div className="md:hidden flex space-x-2">
                        <Link
                            href="/resume"
                            className="text-gray-700 hover:text-blue-600 px-2 py-1 rounded-md text-xs font-medium transition-colors duration-200 hover:bg-white"
                        >
                            Resume
                        </Link>
                        <Link
                            href="/projects"
                            className="text-gray-700 hover:text-blue-600 px-2 py-1 rounded-md text-xs font-medium transition-colors duration-200 hover:bg-white"
                        >
                            Projects
                        </Link>
                        <Link
                            href="/blog"
                            className="text-gray-700 hover:text-blue-600 px-2 py-1 rounded-md text-xs font-medium transition-colors duration-200 hover:bg-white"
                        >
                            Blog
                        </Link>
                        <Link
                            href="/research"
                            className="text-gray-700 hover:text-blue-600 px-2 py-1 rounded-md text-xs font-medium transition-colors duration-200 hover:bg-white"
                        >
                            Research
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}