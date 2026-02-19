import type { Metadata } from "next";
import { JetBrains_Mono, } from "next/font/google";
import "./globals.css";
import { ProgressBarProvider } from "@/components/ProgressBarProvider";
import Navigation from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-jetbrains-mono",
    weight: ['400', '700', '800'],
    style: ['normal', 'italic'],
});

export const metadata: Metadata = {
    title: "Suhas Koheda | Portfolio",
    description: "Suhas Koheda - Software Developer Portfolio in Kotlin, Java, Next.js, and more."
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${jetbrainsMono.variable} font-mono antialiased bg-[var(--bg)] text-[var(--foreground)]`}
            >
                <ThemeProvider > 
                    <div className={"h-[5px]"} style={{ background: "var(--primary)" }} />
                    <div className="px-4 md:px-8 lg:px-16 xl:px-28 min-h-screen flex flex-col">
                        <Navigation />
                        <div className="flex-grow pb-28">
                            <ProgressBarProvider>{children}</ProgressBarProvider>
                        </div>
                        <Footer />
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}

