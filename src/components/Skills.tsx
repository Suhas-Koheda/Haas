"use client";
import React from 'react';
import {
    Code, Database, Server, Globe, Smartphone, Cloud, GitMerge, Terminal, SearchCheck // Added GitMerge, Terminal, SearchCheck
} from 'lucide-react';
import { useTheme } from './ThemeProvider';

const Skills = () => { // Renamed component to Skills
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';

    // Define base colors for light mode, dark mode will invert or use theme variables
    const categoryStyles: Record<string, { bg: string, text: string, border: string, icon: string }> = {
        language: { bg: 'bg-sky-100', text: 'text-sky-800', border: 'border-sky-300', icon: 'text-sky-600' },
        framework: { bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-300', icon: 'text-emerald-600' },
        platform: { bg: 'bg-indigo-100', text: 'text-indigo-800', border: 'border-indigo-300', icon: 'text-indigo-600' },
        database: { bg: 'bg-rose-100', text: 'text-rose-800', border: 'border-rose-300', icon: 'text-rose-600' },
        tool: { bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-300', icon: 'text-amber-600' },
        api: { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-300', icon: 'text-purple-600' },
    };

    // Dark mode specific styles
    const darkCategoryStyles: Record<string, { bg: string, text: string, border: string, icon: string }> = {
        language: { bg: 'bg-sky-800/30', text: 'text-sky-300', border: 'border-sky-700', icon: 'text-sky-400' },
        framework: { bg: 'bg-emerald-800/30', text: 'text-emerald-300', border: 'border-emerald-700', icon: 'text-emerald-400' },
        platform: { bg: 'bg-indigo-800/30', text: 'text-indigo-300', border: 'border-indigo-700', icon: 'text-indigo-400' },
        database: { bg: 'bg-rose-800/30', text: 'text-rose-300', border: 'border-rose-700', icon: 'text-rose-400' },
        tool: { bg: 'bg-amber-800/30', text: 'text-amber-300', border: 'border-amber-700', icon: 'text-amber-400' },
        api: { bg: 'bg-purple-800/30', text: 'text-purple-300', border: 'border-purple-700', icon: 'text-purple-400' },
    };


    const techData = [
        { name: 'Java', icon: <Code size={16} />, category: 'language' },
        { name: 'Kotlin', icon: <Smartphone size={16} />, category: 'language' },
        { name: 'KMP', icon: <Smartphone size={16} />, category: 'framework' }, // Kotlin Multiplatform
        { name: 'Android', icon: <Smartphone size={16} />, category: 'platform' },
        { name: 'Java Servlets', icon: <Server size={16} />, category: 'framework' },
        { name: 'Spring Boot', icon: <Server size={16} />, category: 'framework' },
        { name: 'C', icon: <Code size={16} />, category: 'language' },
        { name: 'C++', icon: <Code size={16} />, category: 'language' },
        { name: 'Python', icon: <Code size={16} />, category: 'language' },
        { name: 'Flask', icon: <Server size={16} />, category: 'framework' },
        { name: 'JavaScript', icon: <Code size={16} />, category: 'language' },
        { name: 'NodeJS', icon: <Server size={16} />, category: 'framework' },
        { name: 'React', icon: <Globe size={16} />, category: 'framework' },
        { name: 'NextJS', icon: <Globe size={16} />, category: 'framework' },
        { name: 'MongoDB', icon: <Database size={16} />, category: 'database' },
        { name: 'PostgreSQL', icon: <Database size={16} />, category: 'database' },
        { name: 'Git', icon: <GitMerge size={16} />, category: 'tool' },
        { name: 'Linux', icon: <Terminal size={16} />, category: 'platform' },
        { name: 'Brave API', icon: <SearchCheck size={16} />, category: 'api' }, // Added Brave API
    ];

    return (
        <div className={`py-12 sm:py-16 px-4`}> {/* Removed min-h-screen, added padding */}
            <div className="max-w-5xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-[var(--foreground)]">
                    My Tech Arsenal
                </h2>

                <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
                    {techData.map((tech) => {
                        const styles = isDarkMode ? darkCategoryStyles[tech.category] : categoryStyles[tech.category];
                        return (
                            <div
                                key={tech.name}
                                className={`
                                    inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium border
                                    transition-all duration-200 hover:shadow-md hover:scale-105 cursor-default select-none
                                    ${styles.bg} ${styles.text} ${styles.border}
                                `}
                            >
                                <span className={styles.icon}>{tech.icon}</span>
                                <span>{tech.name}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Skills; // Exporting Skills
