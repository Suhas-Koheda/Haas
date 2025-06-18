"use client"
import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon } from "lucide-react";

export default function Navigation() {
    const { theme, toggleTheme } = useTheme();
    return (
        <nav
            className="w-full shadow-sm border-b font-jetbrains-mono font-extrabold sticky"
            style={{ background: "var(--bg)" }}
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-1 flex justify-center md:justify-start">
                        <div className="flex space-x-8">
                            <Link
                                href="/resume"
                                className="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-[var(--muted)] text-[var(--foreground)] hover:text-[var(--primary)]"
                            >
                                Resume
                            </Link>
                            <Link
                                href="/projects"
                                className="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-[var(--muted)] text-[var(--foreground)] hover:text-[var(--primary)]"
                            >
                                Projects
                            </Link>
                            <Link
                                href="/blog"
                                className="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-[var(--muted)] text-[var(--foreground)] hover:text-[var(--primary)]"
                            >
                                Blog
                            </Link>
                            <Link
                                href="/research"
                                className="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-[var(--muted)] text-[var(--foreground)] hover:text-[var(--primary)]"
                            >
                                Research
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center justify-end flex-1">
                        <button
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
                            className="ml-4 p-2 rounded-full border border-[var(--border)] bg-[var(--bg)] hover:bg-[var(--muted)] transition-colors"
                        >
                            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

