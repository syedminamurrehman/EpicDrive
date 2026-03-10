"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface CarGalleryProps {
    images: string[];
    mainImage: string;
    carName: string;
}

export default function CarGallery({ images, mainImage, carName }: CarGalleryProps) {
    const allImages = [mainImage, ...(images || [])];
    const [activeIdx, setActiveIdx] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [zoomScale, setZoomScale] = useState(1);

    const nextImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setActiveIdx((prev) => (prev + 1) % allImages.length);
        setZoomScale(1);
    };

    const prevImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setActiveIdx((prev) => (prev - 1 + allImages.length) % allImages.length);
        setZoomScale(1);
    };

    const toggleZoom = () => {
        setZoomScale(prev => prev === 1 ? 2.5 : 1);
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isFullscreen) return;
            if (e.key === "ArrowRight") nextImage();
            if (e.key === "ArrowLeft") prevImage();
            if (e.key === "Escape") {
                setIsFullscreen(false);
                setZoomScale(1);
            }
        };

        if (isFullscreen) {
            document.body.classList.add('hide-navbar');
        } else {
            document.body.classList.remove('hide-navbar');
        }

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.classList.remove('hide-navbar');
        };
    }, [isFullscreen]);

    return (
        <div className="space-y-6">
            {/* Main Stage */}
            <div
                className="relative aspect-[16/9] rounded-[2.5rem] bg-white/60 backdrop-blur-2xl overflow-hidden group cursor-zoom-in shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white/80"
                onClick={() => setIsFullscreen(true)}
            >
                <div className="absolute top-0 inset-x-10 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-80 z-20" />
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIdx}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="relative w-full h-full"
                    >
                        <Image
                            src={allImages[activeIdx]}
                            alt={`${carName} - View ${activeIdx + 1}`}
                            fill
                            className="object-cover"
                            priority
                        />
                        {/* Watermark */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                            <p className="text-white/10 text-[5vw] font-black uppercase tracking-[0.4em] -rotate-12">
                                EpicDrive
                            </p>
                        </div>
                    </motion.div>
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                <div className="absolute bottom-8 right-8 flex space-x-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100 z-20">
                    <button className="p-4 bg-white/20 backdrop-blur-xl rounded-2xl text-white shadow-xl hover:bg-white hover:text-primary transition-all border border-white/30">
                        <Maximize2 className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation Arrows */}
                <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-20">
                    <button
                        onClick={prevImage}
                        className="p-4 bg-white/10 backdrop-blur-md rounded-2xl text-white opacity-0 group-hover:opacity-100 -translate-x-8 group-hover:translate-x-0 transition-all duration-500 pointer-events-auto hover:bg-primary"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={nextImage}
                        className="p-4 bg-white/10 backdrop-blur-md rounded-2xl text-white opacity-0 group-hover:opacity-100 translate-x-8 group-hover:translate-x-0 transition-all duration-500 pointer-events-auto hover:bg-primary"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none px-1">
                    {allImages.map((img, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveIdx(i)}
                            className={cn(
                                "relative shrink-0 w-32 aspect-video rounded-2xl overflow-hidden shadow-sm transition-all duration-300",
                                activeIdx === i
                                    ? "ring-4 ring-primary/20 scale-105 border-2 border-primary shadow-[0_8px_20px_rgba(59,130,246,0.15)]"
                                    : "border-2 border-white/60 bg-white/30 hover:border-primary/50 grayscale opacity-60 hover:grayscale-0 hover:opacity-100"
                            )}
                        >
                            <Image src={img} alt={`Thumbnail ${i}`} fill className="object-cover" />
                        </button>
                    ))}
                </div>
            )}

            {/* Fullscreen Zoom Viewer */}
            <AnimatePresence>
                {isFullscreen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center select-none"
                    >
                        {/* Header Controls */}
                        <div className="absolute top-8 right-8 z-[110] flex space-x-4">
                            <button
                                onClick={toggleZoom}
                                className="p-4 bg-white/10 hover:bg-white/20 rounded-2xl text-white transition-all backdrop-blur-md"
                                title="Zoom In/Out"
                            >
                                <ZoomIn className={cn("w-6 h-6 transition-transform", zoomScale > 1 && "rotate-45")} />
                            </button>
                            <button
                                onClick={() => { setIsFullscreen(false); setZoomScale(1); }}
                                className="p-4 bg-white/10 hover:bg-white/20 rounded-2xl text-white transition-all backdrop-blur-md"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Side Navigation */}
                        <button
                            onClick={prevImage}
                            className="absolute left-8 p-6 bg-white/5 hover:bg-primary rounded-3xl text-white/50 hover:text-white transition-all z-[110] hidden md:block"
                        >
                            <ChevronLeft className="w-10 h-10" />
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-8 p-6 bg-white/5 hover:bg-primary rounded-3xl text-white/50 hover:text-white transition-all z-[110] hidden md:block"
                        >
                            <ChevronRight className="w-10 h-10" />
                        </button>

                        {/* Image Canvas */}
                        <div className="w-full flex-1 flex items-center justify-center overflow-hidden relative">
                            <motion.div
                                animate={{ scale: zoomScale }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="relative w-full h-full cursor-grab active:cursor-grabbing"
                                drag={zoomScale > 1}
                                dragConstraints={{ left: -500, right: 500, top: -500, bottom: 500 }}
                            >
                                <Image
                                    src={allImages[activeIdx]}
                                    alt={`${carName} high res`}
                                    fill
                                    className="object-contain"
                                    quality={100}
                                />
                                {/* Watermark */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                                    <p className="text-white/10 text-[8vw] font-black uppercase tracking-[0.5em] -rotate-12 border-4 border-white/5 px-12 py-6 rounded-[2rem]">
                                        EpicDrive
                                    </p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Bottom Fullscreen Controls */}
                        <div className="w-full bg-black/60 backdrop-blur-2xl p-6 md:p-10 space-y-6 border-t border-white/5">
                            <div className="flex flex-col items-center space-y-1">
                                <p className="text-white/40 text-[10px] md:text-xs font-black uppercase tracking-[0.4em]">
                                    Perspective {activeIdx + 1} / {allImages.length}
                                </p>
                                <h4 className="text-white text-lg md:text-2xl font-black tracking-tight">{carName}</h4>
                            </div>

                            <div className="w-full overflow-hidden">
                                <div className="flex justify-center gap-3 md:gap-6 px-4 md:px-12 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory">
                                    {allImages.map((img, i) => (
                                        <button
                                            key={i}
                                            onClick={() => { setActiveIdx(i); setZoomScale(1); }}
                                            className={cn(
                                                "relative shrink-0 w-24 md:w-40 aspect-video rounded-xl md:rounded-2xl overflow-hidden border-2 transition-all duration-500 snap-center",
                                                activeIdx === i
                                                    ? "border-primary scale-110 shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)] z-10"
                                                    : "border-white/10 grayscale opacity-40 hover:opacity-100 hover:grayscale-0 hover:scale-105"
                                            )}
                                        >
                                            <Image src={img} alt={`Nav ${i}`} fill className="object-cover" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
