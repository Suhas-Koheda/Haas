import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import {ProgressBarProvider} from "@/components/ProgressBarProvider";
import Navigation from "@/components/NavBar";
import {Footer} from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-jetbrains-mono",
    weight: ['400', '700','800'],
    style: ['normal', 'italic'],
});

export const metadata: Metadata = {
    title: "Haas",
    description: "Suhas Koheda - Portfolio",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${jetbrainsMono.variable} font-mono antialiased`}
        >
        <ThemeProvider>
            <div className={"h-[5px]"} style={{ background: "var(--aztec)" }} />
            <div className="px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 2xl:px-64">
                <Navigation/>
                <ProgressBarProvider >{children}</ProgressBarProvider>
                <Footer/>
            </div>
        </ThemeProvider>
        </body>
        </html>
    );
}

