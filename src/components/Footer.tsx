import Link from "next/link";
import { Github, Linkedin, Twitter, Instagram } from "lucide-react";

export function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="w-full border-t border-[var(--border)] mt-12"> {/* Changed to footer semantically, added margin-top */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-between items-center py-6 space-y-4 sm:space-y-0">
                    <div className="text-sm text-[var(--muted-foreground)]">
                        © {year} Suhas Koheda. All rights reserved.
                    </div>
                    <div className="flex items-center space-x-4 sm:space-x-5">
                        <Link
                            href="https://github.com/suhas-koheda"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Suhas Koheda's GitHub Profile"
                            className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-200"
                        >
                            <Github size={20} />
                        </Link>
                        <Link
                            href="https://linkedin.com/in/ssk450"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Suhas Koheda's LinkedIn Profile"
                            className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-200"
                        >
                            <Linkedin size={20} />
                        </Link>
                        <Link
                            href="https://x.com/haasbroo" // Updated Twitter link
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Suhas Koheda's Twitter Profile"
                            className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-200"
                        >
                            <Twitter size={20} />
                        </Link>
                        <Link
                            href="https://instagram.com/suhas_sharma_k" // Updated Instagram link
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Suhas Koheda's Instagram Profile"
                            className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-200"
                        >
                            <Instagram size={20} />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

