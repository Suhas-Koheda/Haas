import Link from "next/link";
import { Github, Linkedin, Twitter, Instagram } from "lucide-react";

export function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="fixed bottom-0 left-0 right-0 backdrop-blur-md border-t border-[var(--border)] z-50 w-full ">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="flex flex-col sm:flex-row justify-between items-center py-4 space-y-4 sm:space-y-0">
                    <div className="text-sm text-[var(--muted-foreground)]">
                        © {year} Suhas Koheda. All rights reserved.
                    </div>
                    <div className="flex items-center space-x-4 sm:space-x-5">
                        <Link
                            href="https://github.com/suhas-koheda"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Suhas Koheda's GitHub Profile"
                            className="p-2 rounded-full hover:bg-white/10 transition-all duration-300 text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                        >
                            <Github size={20} />
                        </Link>
                        <Link
                            href="https://linkedin.com/in/ssk450"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Suhas Koheda's LinkedIn Profile"
                            className="p-2 rounded-full hover:bg-white/10 transition-all duration-300 text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                        >
                            <Linkedin size={20} />
                        </Link>
                        <Link
                            href="https://x.com/haasbroo"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Suhas Koheda's Twitter Profile"
                            className="p-2 rounded-full hover:bg-white/10 transition-all duration-300 text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                        >
                            <Twitter size={20} />
                        </Link>
                        <Link
                            href="https://instagram.com/suhas_sharma_k"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Suhas Koheda's Instagram Profile"
                            className="p-2 rounded-full hover:bg-white/10 transition-all duration-300 text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                        >
                            <Instagram size={20} />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

