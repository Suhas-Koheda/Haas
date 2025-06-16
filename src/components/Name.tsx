"use client";

import { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import styles from "../app/styles.JumbledTransition.module.css"

// Constants
const TARGET_TEXT = "Suhas Koheda";
const JUMBLE_CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const SUBTITLE_TEXT = "Backend Developer".split("");
const JUMBLE_DURATION = 500; // 2 seconds
const JUMBLE_INTERVAL = 20; // 100ms
const LETTER_ANIMATION_DELAY = 0.01; // 100ms per letter

const Name = () => {
    const [displayText, setDisplayText] = useState<string>("");
    const [jumbled, setJumbled] = useState<boolean>(true);

    // Function to generate random jumbled text of same length
    const getJumbledText = (text: string): string => {
        return text.split('').map(char => {
            if (char === ' ') return ' '; // Keep spaces
            return JUMBLE_CHARS[Math.floor(Math.random() * JUMBLE_CHARS.length)];
        }).join('');
    };

    useEffect(() => {
        // Initial jumbled state
        setDisplayText(getJumbledText(TARGET_TEXT));

        // Transition to actual text after delay
        const transitionTimer = setTimeout(() => {
            setJumbled(false);
        }, JUMBLE_DURATION);

        // Animation interval for jumbling effect
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
        <div className={styles.container} aria-label="Suhas Koheda, Backend Developer">
            <div className="flex flex-col">
                <h1
                    className={`${styles.text} ${jumbled ? styles.jumbled : styles.revealed}`}
                    aria-live="polite" // Announces changes to screen readers
                >
                    {displayText}
                </h1>
                <motion.div
                    style={{ display: "flex" }}
                    className={styles.animatedName}
                    aria-hidden="true" // Hide from screen readers as it's decorative
                >
                    {SUBTITLE_TEXT.map((letter, index) => (
                        <motion.span
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * LETTER_ANIMATION_DELAY }}
                        >
                            {letter === " " ? "\u00A0" : letter}
                        </motion.span>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Name;