"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Star, Shield } from "lucide-react";
import Link from "next/link";

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-10 z-10"
                    >
                        <div className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-md border border-white/60 text-primary rounded-full text-[10px] font-black tracking-[0.2em] uppercase shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                            >
                                <Star className="w-3.5 h-3.5" />
                                <span>Karachi's #1 Premium Rental</span>
                            </motion.div>
                            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black text-foreground leading-[0.95] tracking-tighter drop-shadow-sm">
                                DRIVE THE <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-indigo-600 italic animate-pulse-slow">FUTURE</span>
                            </h1>
                            <p className="text-xl text-muted-foreground font-medium max-w-xl leading-relaxed">
                                Experience the pinnacle of automotive luxury. From the streets of DHA to the roads of Bahria, we define elite transportation in Karachi.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-5">
                            <Link
                                href="/cars"
                                className="relative px-10 py-5 bg-gradient-to-br from-primary to-blue-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest flex items-center justify-center space-x-3 hover:scale-105 active:scale-95 transition-all shadow-[0_15px_30px_rgba(59,130,246,0.3)] hover:shadow-[0_20px_40px_rgba(59,130,246,0.4)] group overflow-hidden border border-white/20"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
                                <span className="relative z-10">Explore Fleet</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                            </Link>
                            <Link
                                href="/cars"
                                className="relative px-10 py-5 bg-white/70 backdrop-blur-2xl text-foreground rounded-[2rem] font-black text-xs uppercase tracking-widest flex items-center justify-center space-x-3 hover:bg-white active:scale-95 transition-all border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden"
                            >
                                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-80" />
                                <span className="relative z-10">Book Now</span>
                            </Link>
                        </div>

                        <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-10 mt-10">
                            <div className="space-y-2 p-5 rounded-[2rem] bg-white/40 backdrop-blur-md border border-white/60 shadow-[0_8px_20px_rgb(0,0,0,0.03)] relative overflow-hidden group hover:scale-105 transition-transform duration-500 flex flex-col items-center sm:items-start text-center sm:text-left">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                <p className="text-4xl lg:text-5xl font-black text-foreground tracking-tighter drop-shadow-sm">50+</p>
                                <p className="text-[10px] text-primary/80 uppercase tracking-widest font-black">Elite Fleet</p>
                            </div>
                            <div className="space-y-2 p-5 rounded-[2rem] bg-white/40 backdrop-blur-md border border-white/60 shadow-[0_8px_20px_rgb(0,0,0,0.03)] relative overflow-hidden group hover:scale-105 transition-transform duration-500 flex flex-col items-center sm:items-start text-center sm:text-left">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                <p className="text-4xl lg:text-5xl font-black text-foreground tracking-tighter drop-shadow-sm">4.9<span className="text-2xl text-muted-foreground/50">/5</span></p>
                                <p className="text-[10px] text-primary/80 uppercase tracking-widest font-black">Client Rating</p>
                            </div>
                            <div className="space-y-2 p-5 rounded-[2rem] bg-white/40 backdrop-blur-md border border-white/60 shadow-[0_8px_20px_rgb(0,0,0,0.03)] relative overflow-hidden group hover:scale-105 transition-transform duration-500 flex flex-col items-center sm:items-start text-center sm:text-left">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                <p className="text-4xl lg:text-5xl font-black text-foreground tracking-tighter drop-shadow-sm">24/7</p>
                                <p className="text-[10px] text-primary/80 uppercase tracking-widest font-black">Concierge</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Image Container with Ambient Glow */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="relative lg:h-[700px] flex items-center justify-center lg:justify-end"
                    >
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                                opacity: [0.4, 0.6, 0.4],
                                rotate: [0, 90, 0]
                            }}
                            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-[-10%] bg-gradient-to-tr from-primary/20 via-blue-400/10 to-transparent blur-[140px] rounded-full -z-10"
                        />

                        <div className="relative w-full max-w-2xl h-[400px] lg:h-full group perspective-1000">
                            <Image
                                src="/cars/hero-hiace.png"
                                alt="Premium Toyota Hiace for Rent in Karachi - Epic Drive"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-contain drop-shadow-[0_50px_50px_rgba(0,0,0,0.15)] group-hover:scale-105 group-hover:rotate-2 transition-all duration-1000 ease-out"
                                priority
                            />
                        </div>

                        {/* Floating Glass Cards */}
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-1/4 right-0 lg:-right-4 bg-white/80 backdrop-blur-2xl p-6 rounded-[2rem] z-20 hidden md:block border border-white/80 shadow-[0_20px_40px_rgba(0,0,0,0.08)] overflow-hidden"
                        >
                            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-80" />
                            <div className="flex items-center space-x-4 relative z-10">
                                <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-2xl flex items-center justify-center border border-white/60 shadow-sm">
                                    <Shield className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.25em] leading-none mb-1">Protection</p>
                                    <p className="text-sm font-black text-foreground">Full Coverage</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 15, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute bottom-1/4 left-0 lg:-left-4 bg-white/80 backdrop-blur-2xl p-6 rounded-[2rem] z-20 hidden md:block border border-white/80 shadow-[0_20px_40px_rgba(0,0,0,0.08)] overflow-hidden"
                        >
                            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-80" />
                            <div className="flex items-center space-x-4 relative z-10">
                                <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-2xl flex items-center justify-center border border-white/60 shadow-sm">
                                    <CheckCircle2 className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.25em] leading-none mb-1">Verified</p>
                                    <p className="text-sm font-black text-foreground">Certified Fleet</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default Hero;
