"use client";
import React from 'react';
import {
     Code, Database, Server, Globe,
    Smartphone, Cloud, Palette, Layers
} from 'lucide-react';
import { useTheme } from './ThemeProvider';

const TechTagsComponent = () => {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';

    const categoryColors: Record<string, string> = {
        language: 'bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-200',
        framework: 'bg-green-100 text-green-800 border-green-300 hover:bg-green-200',
        platform: 'bg-purple-100 text-purple-800 border-purple-300 hover:bg-purple-200',
        database: 'bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-200',
        api: 'bg-red-100 text-red-800 border-red-300 hover:bg-red-200',
        server: 'bg-pink-100 text-pink-800 border-pink-300 hover:bg-pink-200',
        design: 'bg-orange-100 text-orange-800 border-orange-300 hover:bg-orange-200',
    };

    const techData = [
        { name: 'Java', icon: <Code className="w-4 h-4" />, category: 'language' },
        { name: 'Kotlin', icon: <Smartphone className="w-4 h-4" />, category: 'language' },
        { name: 'Spring Boot', icon: <Server className="w-4 h-4" />, category: 'framework' },
        { name: 'Ktor', icon: <Server className="w-4 h-4" />, category: 'framework' },
        { name: 'Android', icon: <Smartphone className="w-4 h-4" />, category: 'platform' },
        { name: 'Python', icon: <Code className="w-4 h-4" />, category: 'language' },
        { name: 'TypeScript', icon: <Code className="w-4 h-4" />, category: 'language' },
        { name: 'React', icon: <Globe className="w-4 h-4" />, category: 'framework' },
        { name: 'Next.js', icon: <Globe className="w-4 h-4" />, category: 'framework' },
        { name: 'Vercel', icon: <Cloud className="w-4 h-4" />, category: 'platform' },
        { name: 'Flask', icon: <Server className="w-4 h-4" />, category: 'framework' },
        { name: 'MongoDB', icon: <Database className="w-4 h-4" />, category: 'database' },
        { name: 'MySQL', icon: <Database className="w-4 h-4" />, category: 'database' },
        { name: 'PostgreSQL', icon: <Database className="w-4 h-4" />, category: 'database' },
        { name: 'REST API', icon: <Server className="w-4 h-4" />, category: 'api' },
        { name: 'Single SPA', icon: <Layers className="w-4 h-4" />, category: 'framework' },
        { name: 'Nginx', icon: <Server className="w-4 h-4" />, category: 'server' },
        { name: 'AWS', icon: <Cloud className="w-4 h-4" />, category: 'platform' },
        { name: 'Figma', icon: <Palette className="w-4 h-4" />, category: 'design' },
        { name: 'C', icon: <Code className="w-4 h-4" />, category: 'language' },
        { name: 'C++', icon: <Code className="w-4 h-4" />, category: 'language' },
        { name: 'Flutter', icon: <Smartphone className="w-4 h-4" />, category: 'framework' }
    ];

    return (
        <div className={`${isDarkMode ? 'text-white' : 'text-gray-900'} min-h-screen p-6 transition-colors`}>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Tech Stack I Use</h2>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-4 justify-start sm:justify-center">
                {techData.map((tech, index) => (
                    <div
                        key={index}
                        className={`
              inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs sm:px-4 sm:py-2 sm:text-sm font-medium border
              transition-transform duration-200 hover:scale-105 hover:shadow-sm
              cursor-pointer select-none
              ${isDarkMode ? 'bg-gray-800 text-white border-gray-600 hover:bg-gray-700' : categoryColors[tech.category]}
            `}
                    >
                        {tech.icon}
                        <span>{tech.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TechTagsComponent;
