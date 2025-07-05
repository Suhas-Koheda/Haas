"use client";
import React from 'react';
import {
    Code, Database, Server, Globe, Smartphone, GitMerge, Terminal, SearchCheck
} from 'lucide-react';
import { useTheme } from './ThemeProvider';

const Skills = () => {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';

    const baseStyles = {
        bg: isDarkMode ? 'bg-neutral-800/30' : 'bg-neutral-100',
        text: isDarkMode ? 'text-neutral-300' : 'text-neutral-800',
        border: isDarkMode ? 'border-neutral-700' : 'border-neutral-300',
        icon: isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
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
        <div className={`py-12 sm:py-16 px-4`}>
            <div className="max-w-5xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-[var(--foreground)]">
                    My Tech Arsenal
                </h2>

                <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
                    {techData.map((tech) => (
                        <div
                            key={tech.name}
                            className={`
                                inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium border
                                transition-all duration-200 hover:shadow-md hover:scale-105 cursor-default select-none
                                ${baseStyles.bg} ${baseStyles.text} ${baseStyles.border}
                            `}
                        >
                            <span className={baseStyles.icon}>{tech.icon}</span>
                            <span>{tech.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Skills;
