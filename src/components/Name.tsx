"use client";

import { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import styles from "../app/styles.JumbledTransition.module.css";

import { Github, Linkedin, Mail, Phone, Briefcase } from 'lucide-react'; // Added Mail, Phone, Briefcase
import Link from 'next/link'; // Added Link

const TARGET_TEXT = "Suhas Koheda";
const JUMBLE_CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const SUBTITLE_TEXT = "Aspiring Software Engineer | AIML Student".split(""); // Updated Subtitle
const JUMBLE_DURATION = 1000;
const JUMBLE_INTERVAL = 20;
const LETTER_ANIMATION_DELAY = 0.08; // Slightly faster animation

const Name = () => {
    const [displayText, setDisplayText] = useState<string>("");
    const [jumbled, setJumbled] = useState<boolean>(true);

    const getJumbledText = (text: string): string => {
        return text.split('').map(char => {
            if (char === ' ') return ' ';
            return JUMBLE_CHARS[Math.floor(Math.random() * JUMBLE_CHARS.length)];
        }).join('');
    };

    useEffect(() => {
        setDisplayText(getJumbledText(TARGET_TEXT));

        const transitionTimer = setTimeout(() => {
            setJumbled(false);
        }, JUMBLE_DURATION);

        const jumbleIntervalId = setInterval(() => {
            if (jumbled) {
                setDisplayText(prevText => getJumbledText(TARGET_TEXT));
            }
        }, JUMBLE_INTERVAL);

        return () => {
            clearTimeout(transitionTimer);
            clearInterval(jumbleIntervalId);
        };
    }, [jumbled]); // Rerun effect if jumbled state changes

    useEffect(() => {
        if (!jumbled) {
            setDisplayText(TARGET_TEXT);
        }
    }, [jumbled]);


    return (
        <div className="bg-[var(--bg)] text-[var(--foreground)] w-full md:px-4 py-8 sm:py-12"> {/* Added padding */}
            <div className={`${styles.container} max-w-5xl mx-auto`} aria-label="Suhas Koheda, Aspiring Software Engineer, AIML Student"> {/* Centered content */}
                <div className="flex flex-col items-start space-y-6"> {/* Increased spacing */}
                    <div className="flex flex-col items-start bg-[var(--bg)] w-full">
                        <h1
                            className={`${styles.text} ${jumbled ? styles.jumbled : styles.revealed} text-left text-4xl sm:text-5xl md:text-6xl font-bold`} // Responsive text size
                            aria-live="polite"
                        >
                            {displayText}
                        </h1>
                        <motion.div
                            style={{ display: "flex" }}
                            className={`${styles.animatedName} w-full justify-start text-lg sm:text-xl text-muted-foreground`} // Responsive text size
                            aria-hidden="true"
                        >
                            <div className="flex items-start justify-start w-full">
                                {SUBTITLE_TEXT.map((letter, index) => (
                                    <motion.span
                                        className="mt-1" // Adjusted margin
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: JUMBLE_DURATION / 1000 + index * LETTER_ANIMATION_DELAY }} // Start after jumble
                                    >
                                        {letter === " " ? "\u00A0" : letter}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Contact Information */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: JUMBLE_DURATION / 1000 + SUBTITLE_TEXT.length * LETTER_ANIMATION_DELAY + 0.2 }}
                        className="flex flex-wrap gap-x-6 gap-y-3 items-center text-sm sm:text-base text-muted-foreground"
                    >
                        <a href="mailto:sharmasuhas450@gmail.com" className="flex items-center hover:text-[var(--primary)] transition-colors">
                            <Mail size={18} className="mr-2" />
                            sharmasuhas450@gmail.com
                        </a>
                        <a href="tel:+917396824087" className="flex items-center hover:text-[var(--primary)] transition-colors">
                            <Phone size={18} className="mr-2" />
                            +91-7396824087
                        </a>
                        <Link href="https://github.com/suhas-koheda" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-[var(--primary)] transition-colors">
                            <Github size={18} className="mr-2" />
                            github.com/suhas-koheda
                        </Link>
                        <Link href="https://linkedin.com/in/ssk450" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-[var(--primary)] transition-colors">
                            <Linkedin size={18} className="mr-2" />
                            linkedin.com/in/ssk450
                        </Link>
                         {/* Portfolio link can be the current page, or if you have a specific domain later: */}
                        <span className="flex items-center font-sans"> {/* Ensure contact links are sans-serif if not inheriting properly */}
                            <Briefcase size={18} className="mr-2" />
                            Portfolio (suhask.dev)
                        </span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: JUMBLE_DURATION / 1000 + SUBTITLE_TEXT.length * LETTER_ANIMATION_DELAY + 0.4, duration: 0.5 }}
                        className="relative w-full flex justify-start"
                    >
                        {/* Decorative element, kept as is */}
                        <div className="relative group">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10 blur-md">
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: JUMBLE_DURATION / 1000 + SUBTITLE_TEXT.length * LETTER_ANIMATION_DELAY + 0.6 }}
                className="max-w-5xl mx-auto px-2 bg-[var(--bg)] text-left w-full mt-6" // Centered and added margin
            >
                <p className="text-base sm:text-lg text-muted-foreground text-left font-sans"> {/* Added font-sans */}
                    I&apos;m a B.Tech Computer Science student at VIT Chennai specializing in AI & Machine Learning, passionate about Android, full-stack development, and contributing to open-source projects like LangChain4j. I thrive on building impactful applications and continuously expanding my skillset.
                </p>
            </motion.section>
        </div>
    );
};

export default Name;