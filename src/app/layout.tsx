import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import {ProgressBarProvider} from "@/components/ProgressBarProvider";
import Navigation from "@/components/NavBar";
import {Footer} from "@/components/Footer";

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
        <div className={"h-[5px] bg-[var(--foreground)]"}>
        </div>
        <Navigation/>
        <ProgressBarProvider >{children}</ProgressBarProvider>
        <Footer/>
        </body>
        </html>
    );
}