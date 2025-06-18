"use client";
import { Github } from "lucide-react";
import {useTheme} from "@/components/ThemeProvider";


export function ContributionsPage() {
    const { theme } = useTheme()

    // Define the light and dark mode SVGs
    const lightModeSVG = "https://wakatime.com/share/@018d187a-e9e9-413d-bc20-e3e9ce647cd0/0826d443-b677-4783-94b8-0408e461b42f.svg";
    const darkModeSVG = "https://wakatime.com/share/@018d187a-e9e9-413d-bc20-e3e9ce647cd0/9a13bc07-bdbd-4a20-8857-843998d3f4c0.svg";

    return (
        <div className="min-h-screen px-2">
            <div className="py-8">
                <div className="mb-8 sm:mb-12">
                    <h1 className="text-2xl font-bold text-foreground">
                        My Contributions
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl">
                        A visual representation of my coding activity and project contributions
                    </p>
                </div>
                <div className="w-full">
                    <div className="border border-border rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8">
                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <h2 className="text-xl sm:text-2xl font-semibold text-card-foreground mb-2">
                                    Coding Activity
                                </h2>
                                <p className="text-muted-foreground text-sm sm:text-base">
                                    Time spent on different languages and projects
                                </p>
                            </div>
                            <a
                                href="https://github.com/suhas-koheda"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors duration-200"
                                aria-label="Visit GitHub Profile"
                            >
                                <Github className="w-5 h-5 text-accent" />
                            </a>
                        </div>

                        {/* Responsive chart container */}
                        <div className="relative w-full overflow-x-auto scrollbar-hide flex items-center justify-center">
                            <div className="min-w-[600px]">
                                {/* Use img tag instead of embed for better control */}
                                <img
                                    src={theme === 'dark' ? darkModeSVG : lightModeSVG}
                                    alt="Coding activity chart"
                                    className="w-full h-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}