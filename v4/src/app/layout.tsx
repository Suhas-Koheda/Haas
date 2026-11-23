import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { profile } from "@/data/portfolio";
import "./globals.css";
import "highlight.js/styles/github-dark.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: {
    default: `${profile.name} — AI Researcher & Engineer`,
    template: `%s — ${profile.name}`,
  },
  description: profile.bio,
  keywords: [
    "Suhas Koheda",
    "LLM",
    "Voice AI",
    "Speech",
    "AI Engineer",
    "Machine Learning",
    "PyTorch",
    "LangChain",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} — AI Researcher & Engineer`,
    description: profile.bio,
    type: "website",
    images: ["/assets/ogimg.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — AI Researcher & Engineer`,
    description: profile.bio,
    images: ["/assets/ogimg.png"],
  },
  icons: { icon: "/favicon.ico" },
};

const themeScript = `(function(){try{var t=localStorage.getItem("theme");document.documentElement.classList.toggle("dark",t!=="light")}catch(e){document.documentElement.classList.add("dark")}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${inter.variable} ${grotesk.variable} ${jetbrains.variable} font-sans antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}