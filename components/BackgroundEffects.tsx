"use client";

import { motion } from "framer-motion";

const BackgroundEffects = () => {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-slate-50">
            {/* SVG Noise Overlay for Premium Texture */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none z-50">
                <svg width="100%" height="100%">
                    <filter id="noise">
                        <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
                        <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.25 0" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noise)" />
                </svg>
            </div>

            {/* Base Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-white via-[#f0f4f8] to-white" />

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,black,transparent)]" />

            {/* Premium Soft Blobs */}
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3],
                    x: [0, 60, 0],
                    y: [0, 40, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-[-15%] left-[-10%] w-[60%] h-[60%] bg-[#e0e7ff]/60 rounded-full blur-[140px]"
            />

            <motion.div
                animate={{
                    scale: [1, 1.25, 1],
                    opacity: [0.2, 0.4, 0.2],
                    x: [0, -50, 0],
                    y: [0, -80, 0],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-[#f3e8ff]/50 rounded-full blur-[160px]"
            />

            <motion.div
                animate={{
                    opacity: [0.15, 0.3, 0.15],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 14,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                }}
                className="absolute top-[30%] right-[10%] w-[40%] h-[40%] bg-[#dbeafe]/50 rounded-full blur-[130px]"
            />
        </div>
    );
};

export default BackgroundEffects;
