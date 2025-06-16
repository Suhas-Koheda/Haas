"use client"; // This is a Client Component

import { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import styles from "../app/styles.JumbledTransition.module.css"

const Name = () => {
    const targetText = "Suhas Koheda";
    const [displayText, setDisplayText] = useState<string>("");
    const [jumbled, setJumbled] = useState<boolean>(true);

    // Characters to use for jumbling
    const jumbleChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const name = "Suhas Koheda".split("");
    // Function to generate random jumbled text of same length
    const getJumbledText = (text: string): string => {
        return text.split('').map(char => {
            if (char === ' ') return ' '; // Keep spaces
            return jumbleChars[Math.floor(Math.random() * jumbleChars.length)];
        }).join('');
    };

    useEffect(() => {
        // Initial jumbled state
        setDisplayText(getJumbledText(targetText));

        // Transition to actual text after delay
        const transitionTimer = setTimeout(() => {
            setJumbled(false);
        }, 2000); // 2 seconds of jumbled state

        // Animation interval for jumbling effect
        const jumbleInterval = setInterval(() => {
            if (jumbled) {
                setDisplayText(getJumbledText(targetText));
            }
        }, 100); // Update jumble every 100ms

        return () => {
            clearTimeout(transitionTimer);
            clearInterval(jumbleInterval);
        };
    }, [jumbled]);

    useEffect(() => {
        if (!jumbled) {
            // When not jumbled, reveal the actual text
            setDisplayText(targetText);
        }
    }, [jumbled]);

    return (
        <div className={styles.container}>
            <h1 className={`${styles.text} ${jumbled ? styles.jumbled : styles.revealed}`}>
                {displayText}
            </h1>
            <motion.div style={{ display: "flex" }}>
                {name.map((letter, index) => (
                    <motion.span
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        {letter === " " ? "\u00A0" : letter}
                    </motion.span>
                ))}
            </motion.div>
        </div>
    );
};

export default Name;