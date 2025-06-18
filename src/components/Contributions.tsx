"use client";
import { Github } from "lucide-react";
import {useTheme} from "@/components/ThemeProvider";

export function ContributionsPage() {
    const { theme } = useTheme()

    const lightModeSVG = "https://wakatime.com/share/@018d187a-e9e9-413d-bc20-e3e9ce647cd0/0826d443-b677-4783-94b8-0408e461b42f.svg";
    const darkModeSVG = "https://wakatime.com/share/@018d187a-e9e9-413d-bc20-e3e9ce647cd0/9a13bc07-bdbd-4a20-8857-843998d3f4c0.svg";

    return (
        <div className="px-2">
            <div className="py-8">
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
                        <div className="relative w-full overflow-x-auto scrollbar-hide flex items-center justify-center">
                            <div className="min-w-[600px]">
                                <img
                                    src={lightModeSVG}
                                    alt="Coding activity chart light"
                                    className={`w-full h-full ${theme === 'dark' ? 'hidden' : 'block'}`}
                                />
                                <img
                                    src={darkModeSVG}
                                    alt="Coding activity chart dark"
                                    className={`w-full h-full ${theme === 'dark' ? 'block' : 'hidden'}`}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

