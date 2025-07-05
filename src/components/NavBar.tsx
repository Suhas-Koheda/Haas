"use client"
import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon, Menu, X, Home as HomeIcon, Briefcase, Edit, Microscope, FileText } from "lucide-react"; // Added more icons
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from 'next/navigation'; // To handle active link and project link behavior

export default function Navigation() {
    const { theme, toggleTheme } = useTheme();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    }

    const navLinks = [
        { href: "/", label: "Home", icon: <HomeIcon size={16} /> },
        { href: "/#projects-section", label: "Projects", icon: <Briefcase size={16} /> },
        { href: "/resume", label: "Resume", icon: <FileText size={16} /> },
        { href: "/blog", label: "Blog", icon: <Edit size={16} /> },
        { href: "/research", label: "Research", icon: <Microscope size={16} /> },
    ];

    // Smooth scroll for hash links
    const handleProjectsLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        closeMobileMenu();
        if (href.startsWith("/#")) {
            if (pathname === "/") { // If already on homepage, smooth scroll
                e.preventDefault();
                const targetId = href.substring(2); // Remove '/#'
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: "smooth" });
                }
            }
            // If not on homepage, Next.js Link will navigate to homepage and then browser handles hash
        }
    };


    return (
        <nav
            className="w-full font-sans sticky top-0 z-50 backdrop-blur-md bg-[var(--bg-transparent)] border-b border-[var(--border)] shadow-sm"
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo/Home link */}
                    <Link href="/" className="flex items-center text-xl font-bold text-[var(--primary)] hover:opacity-80 transition-opacity" onClick={closeMobileMenu}>
                        {/* Optional: <UserCircle size={24} className="mr-2"/> */}
                        Suhas Koheda
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
                        {navLinks.map(link => (
                            <Link
                                key={link.label}
                                href={link.href}
                                onClick={(e) => handleProjectsLinkClick(e, link.href)}
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-1.5
                                            hover:bg-[var(--muted)] hover:text-[var(--primary)]
                                            ${pathname === link.href || (link.href.startsWith("/#") && pathname === "/") ? 'text-[var(--primary)] bg-[var(--muted)]' : 'text-[var(--foreground)]'}`}
                            >
                                {link.icon}
                                <span>{link.label}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Mobile menu button & Theme Toggle (Grouped) */}
                    <div className="flex items-center">
                        <button
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
                            className="p-2 rounded-full hover:bg-[var(--muted)] transition-colors mr-2 md:mr-0"
                        >
                            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <div className="md:hidden">
                            <button
                                onClick={toggleMobileMenu}
                                aria-label="Toggle mobile menu"
                                className="p-2 rounded-md hover:bg-[var(--muted)] transition-colors"
                            >
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className={`md:hidden overflow-hidden`}
                        >
                            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-[var(--border)] mt-1">
                                {navLinks.map(link => (
                                    <Link
                                        key={`mobile-${link.label}`}
                                        href={link.href}
                                        onClick={(e) => handleProjectsLinkClick(e, link.href)}
                                        className={`block px-3 py-2.5 rounded-md text-base font-medium transition-colors duration-200 flex items-center space-x-2
                                                    hover:bg-[var(--muted)] hover:text-[var(--primary)]
                                                    ${pathname === link.href || (link.href.startsWith("/#") && pathname === "/") ? 'text-[var(--primary)] bg-[var(--muted)]' : 'text-[var(--foreground)]'}`}
                                    >
                                        {link.icon}
                                        <span>{link.label}</span>
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
}