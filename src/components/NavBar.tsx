"use client"
import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navigation() {
    const { theme, toggleTheme } = useTheme();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav
            className="w-full  font-jetbrains-mono font-extrabold sticky top-0 z-50"
            style={{ background: "var(--bg)" }}
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex flex-1 justify-center lg:justify-start">
                        <div className="flex space-x-4 lg:space-x-8">
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

                    {/* Mobile menu button */}
                    <div className="md:hidden flex-1">
                        <button
                            onClick={toggleMobileMenu}
                            aria-label="Toggle mobile menu"
                            className="p-2 rounded-md hover:bg-[var(--muted)] transition-colors"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>

                    {/* Theme toggle button */}
                    <div className="flex items-center justify-end flex-1 md:flex-initial">
                        <button
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
                            className="p-2 rounded-full border border-[var(--border)] bg-[var(--bg)] hover:bg-[var(--muted)] transition-colors"
                        >
                            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                <div className={`md:hidden transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen
                        ? 'max-h-64 opacity-100'
                        : 'max-h-0 opacity-0 overflow-hidden'
                }`}>
                    <div className="px-2 pt-2 pb-3 space-y-1 border-t border-[var(--border)]">
                        <Link
                            href="/resume"
                            className="block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 hover:bg-[var(--muted)] text-[var(--foreground)] hover:text-[var(--primary)]"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Resume
                        </Link>
                        <Link
                            href="/projects"
                            className="block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 hover:bg-[var(--muted)] text-[var(--foreground)] hover:text-[var(--primary)]"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Projects
                        </Link>
                        <Link
                            href="/blog"
                            className="block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 hover:bg-[var(--muted)] text-[var(--foreground)] hover:text-[var(--primary)]"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Blog
                        </Link>
                        <Link
                            href="/research"
                            className="block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 hover:bg-[var(--muted)] text-[var(--foreground)] hover:text-[var(--primary)]"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Research
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}