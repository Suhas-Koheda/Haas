import Link from "next/link";
import { Github, Linkedin, Twitter, Instagram } from "lucide-react";

export function Footer() {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-transparent backdrop-blur-sm border-t border-white/10 px-6 py-4 shadow-sm border-b">
            <div className="flex justify-center items-center space-x-6">
                <Link
                    href="https://github.com/suhas-koheda"
                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-110 group"
                >
                    <Github className="w-5 h-5 text-gray-600 dark:text-white group-hover:text-[#16161d] dark:group-hover:text-yellow-400 transition-colors" />
                </Link>

                <Link
                    href="https://linkedin.com/in/ssk450"
                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-110 group"
                >
                    <Linkedin className="w-5 h-5 text-gray-600 dark:text-white group-hover:text-blue-600 transition-colors" />
                </Link>

                <Link
                    href="https://twitter.com/singeltonbean"
                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-110 group"
                >
                    <Twitter className="w-5 h-5 text-gray-600 dark:text-white group-hover:text-sky-600 transition-colors" />
                </Link>

                <Link
                    href="https://instagram.com/yourusername"
                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-110 group"
                >
                    <Instagram className="w-5 h-5 text-gray-600 dark:text-white group-hover:text-pink-600 transition-colors" />
                </Link>
            </div>
        </div>
    );
}

