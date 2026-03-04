'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface RevealProps {
    children: ReactNode;
    delay?: number;
    width?: "fit-content" | "100%";
}

export function Reveal({ children, delay = 0.2, width = "fit-content" }: RevealProps) {
    return (
        <div style={{ position: "relative", width, overflow: "hidden" }}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 75 },
                    visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.5, delay }}
                viewport={{ once: true }}
            >
                {children}
            </motion.div>
        </div>
    );
}
