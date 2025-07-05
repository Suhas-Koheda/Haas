import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google"; // Added Inter
import "./globals.css";
import { ProgressBarProvider } from "@/components/ProgressBarProvider";
import Navigation from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-jetbrains-mono",
    weight: ['400', '700', '800'], // Ensure all used weights are included
    style: ['normal', 'italic'],
});

const inter = Inter({ // Added Inter font configuration
    subsets: ['latin'],
    variable: '--font-inter',
    weight: ['300', '400', '500', '600', '700'], // Common weights
});

export const metadata: Metadata = {
    title: "Suhas Koheda | Portfolio", // Updated title
    description: "Suhas Koheda - Software Developer Portfolio showcasing projects in Kotlin, Java, Next.js, and more.", // More descriptive
    // Consider adding OpenGraph and Twitter card metadata here for better sharing
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning> {/* suppressHydrationWarning often useful with ThemeProvider */}
            <body
                className={`${jetbrainsMono.variable} ${inter.variable} font-mono antialiased bg-[var(--bg)] text-[var(--foreground)]`} // Added inter.variable and default font-mono
            >
                <ThemeProvider > 
                    <div className={"h-[5px]"} style={{ background: "var(--primary)" }} /> {/* Use primary color for accent bar */}
                    <div className="px-4 md:px-8 lg:px-16 xl:px-28 min-h-screen flex flex-col"> {/* Use flexbox for fixed footer */}
                        <Navigation />
                        <div className="flex-grow pb-28"> {/* Increased padding to ensure content isn't hidden under fixed footer */}
                            <ProgressBarProvider>{children}</ProgressBarProvider>
                        </div>
                        <Footer />
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}

