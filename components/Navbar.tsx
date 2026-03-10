"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isHidden, setIsHidden] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);

        // Listen for a custom event or check for a class to hide navbar
        const observer = new MutationObserver(() => {
            setIsHidden(document.body.classList.contains('hide-navbar'));
        });
        observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

        return () => {
            window.removeEventListener("scroll", handleScroll);
            observer.disconnect();
        };
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Browse Cars", href: "/cars" },
        { name: "Rental Terms", href: "/terms" },
    ];

    return (
        <nav className={cn(
            "fixed top-6 left-1/2 -translate-x-1/2 z-[90] transition-all duration-500",
            scrolled ? "w-[95%] max-w-5xl" : "w-[95%] max-w-6xl",
            isHidden && "opacity-0 -translate-y-20 pointer-events-none"
        )}>
            <div className={cn(
                "mx-auto rounded-full transition-all duration-500 px-3 py-3 md:px-6 md:py-2 border backdrop-blur-2xl flex items-center justify-between relative overflow-hidden",
                scrolled
                    ? "bg-white/70 border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
                    : "bg-white/40 border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)]"
            )}>
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-80 z-0" />

                <div className="relative z-10 flex w-full items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 group md:pr-4 md:border-r border-border/10">
                        <div className="relative w-8 h-8 rounded-lg flex items-center justify-center transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 drop-shadow-[0_5px_15px_rgba(59,130,246,0.3)] shrink-0 overflow-hidden">
                            <Image src="/logo.png" alt="Epic Drive Karachi Logo" fill className="object-cover" sizes="32px" priority />
                        </div>
                        <span className="text-lg font-black tracking-tighter text-foreground whitespace-nowrap">
                            EPIC<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600 italic">DRIVE</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-1 px-4 group/nav">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-all rounded-full hover:bg-white/80 hover:shadow-sm border border-transparent hover:border-white/50 group-hover/nav:opacity-50 hover:!opacity-100"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center space-x-3">
                        <Link
                            href="/cars"
                            className="hidden md:flex px-6 py-2.5 bg-foreground text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 hover:bg-gradient-to-r hover:from-primary hover:to-blue-600 active:scale-95 transition-all items-center space-x-2 shadow-[0_8px_20px_rgb(0,0,0,0.1)] hover:shadow-[0_10px_20px_rgba(59,130,246,0.3)] border border-transparent hover:border-white/20"
                        >
                            <span>Fleet</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </Link>

                        {/* Mobile Toggle */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white/60 text-foreground border border-white/60 shadow-sm hover:bg-white transition-all active:scale-95"
                        >
                            {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        className="absolute top-20 left-0 right-0 md:hidden bg-white/80 backdrop-blur-3xl rounded-[2rem] overflow-hidden p-6 z-40 shadow-[0_20px_40px_rgb(0,0,0,0.08)] border border-white/80"
                    >
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-80" />
                        <div className="space-y-2 text-center relative z-10">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="block px-6 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary hover:bg-white/60 hover:shadow-sm border border-transparent hover:border-white/50 rounded-2xl transition-all"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="pt-4 mt-2 border-t border-border/50">
                                <Link
                                    href="/cars"
                                    className="w-full py-4 bg-gradient-to-br from-primary to-blue-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest inline-block shadow-[0_10px_20px_rgba(59,130,246,0.3)] active:scale-95 transition-transform"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Book Now
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
