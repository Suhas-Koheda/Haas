"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  Home,
  FileText,
  FileCode,
  Github,
  Linkedin,
  Mail,
  Sun,
  Moon,
  PenTool,
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { icon: Home, label: "Home", href: "/", shortcut: "h" },
  { icon: PenTool, label: "Blog", href: "/blog", shortcut: "b" },
  { icon: FileCode, label: "IPYNB Viewer", href: "/ipynb", shortcut: "n" },
  { icon: FileText, label: "Resume", href: "/resume.pdf", external: true, shortcut: "r" },
  { icon: Github, label: "GitHub", href: "https://github.com/suhas-koheda", external: true, shortcut: "g" },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ssk450/",
    external: true,
    shortcut: "l",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:sharmasuhas450@gmail.com",
    external: true,
    shortcut: "e",
  },
];

export function BottomNav() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input or textarea
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA" ||
        e.metaKey || 
        e.ctrlKey || 
        e.altKey
      ) {
        return;
      }

      const key = e.key.toLowerCase();
      
      const item = navItems.find(item => item.shortcut === key);
      if (item) {
        if (item.external) {
          window.open(item.href, "_blank", "noopener,noreferrer");
        } else {
          router.push(item.href);
        }
      }

      if (key === "t") {
        setTheme(theme === "dark" ? "light" : "dark");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router, setTheme, theme]);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <nav 
        className={cn(
          "flex items-center gap-1 p-1.5 rounded-full",
          "bg-background/80 backdrop-blur-md border border-border shadow-sm",
          "transition-all duration-300 hover:shadow-md"
        )}
      >
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isExternal = item.external;
          const Component = isExternal ? "a" : Link;
          
          return (
            <div key={item.label} className="flex items-center group relative">
              <Component
                href={item.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className={cn(
                  "p-3 rounded-full hover:scale-105 transition-all duration-200",
                  "hover:bg-muted text-foreground hover:text-foreground",
                  "focus:outline-none focus:ring-2 focus:ring-foreground/20",
                  "relative"
                )}
                aria-label={item.label}
              >
                <Icon size={20} strokeWidth={2} />
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 
                               bg-foreground text-background text-[10px] font-mono px-1.5 py-0.5 rounded opacity-0 
                               group-hover:opacity-100 transition-opacity pointer-events-none">
                  {item.shortcut.toUpperCase()}
                </span>
              </Component>
              
              {index < navItems.length - 1 && (
                <div className="w-[1px] h-4 bg-border/60 mx-0.5" />
              )}
            </div>
          );
        })}

        <div className="w-[1px] h-4 bg-border/60 mx-0.5" />

        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className={cn(
            "p-3 rounded-full hover:scale-105 transition-all duration-200",
            "hover:bg-muted text-foreground hover:text-foreground",
            "focus:outline-none focus:ring-2 focus:ring-foreground/20",
            "group relative"
          )}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun size={20} strokeWidth={2} />
          ) : (
            <Moon size={20} strokeWidth={2} />
          )}
           <span className="absolute -top-8 left-1/2 -translate-x-1/2 
                               bg-foreground text-background text-[10px] font-mono px-1.5 py-0.5 rounded opacity-0 
                               group-hover:opacity-100 transition-opacity pointer-events-none">
             T
           </span>
        </button>
      </nav>
    </div>
  );
}
