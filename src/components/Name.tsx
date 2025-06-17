"use client";

import { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import styles from "../app/styles.JumbledTransition.module.css";
import { BriefcaseBusiness} from "lucide-react";

const TARGET_TEXT = "Suhas Koheda";
const JUMBLE_CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const SUBTITLE_TEXT = "Backend Developer".split("");
const JUMBLE_DURATION = 500;
const JUMBLE_INTERVAL = 20;
const LETTER_ANIMATION_DELAY = 0.01;

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

        const jumbleInterval = setInterval(() => {
            if (jumbled) {
                setDisplayText(getJumbledText(TARGET_TEXT));
            }
        }, JUMBLE_INTERVAL);

        return () => {
            clearTimeout(transitionTimer);
            clearInterval(jumbleInterval);
        };
    }, [jumbled]);

    useEffect(() => {
        if (!jumbled) {
            setDisplayText(TARGET_TEXT);
        }
    }, [jumbled]);

    return (
        < div className={"bg-bg text-foreground"}>
            <div className={styles.container} aria-label="Suhas Koheda, Backend Developer">
                <div className="flex flex-col items-center space-y-0">
                    <div className="flex flex-col items-center">
                        <h1
                            className={`${styles.text} ${jumbled ? styles.jumbled : styles.revealed}`}
                            aria-live="polite"
                        >
                            {displayText}
                        </h1>
                        <motion.div
                            style={{ display: "flex" }}
                            className={styles.animatedName}
                            aria-hidden="true"
                        >
                            <div className="flex items-start justify-between">
                            <BriefcaseBusiness className={"mt-0.5 mx-1"}/>{SUBTITLE_TEXT.map((letter, index) => (
                                <motion.span
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * LETTER_ANIMATION_DELAY }}
                                >
                                    {letter === " " ? "\u00A0" : letter}
                                </motion.span>
                            ))}
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                        className="relative"
                    >
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
                transition={{ duration: 0.8, delay: 1.2 }}
                className="max-w-5xl px-16 bg-bg"
            >
                {/*<h2 className="text-3xl font-bold mb-4 ">Who am I?</h2>*/}
                <p className="text-lg text-muted-foreground">
                    I'm a B.Tech student at VIT Chennai passionate about Android, full-stack development, and AI. I contribute to open-source (like LangChain4j) and love building impactful projects.
                </p>
            </motion.section>
        </div>
    );
};

export default Name;