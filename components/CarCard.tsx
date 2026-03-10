"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users, Fuel, Gauge, ShieldCheck, ArrowRight } from "lucide-react";
import { Car } from "@/types";
import { cn, formatPrice } from "@/lib/utils";

interface CarCardProps {
    car: Car;
}

const CarCard = ({ car }: CarCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="h-full"
        >
            <Link
                href={`/cars/${car.id}`}
                className="group bg-white rounded-[2rem] overflow-hidden shadow-lg shadow-black/5 hover:shadow-2xl hover:shadow-primary/15 transition-all duration-500 flex flex-col h-full border border-border"
            >
                {/* Image Container */}
                <div className="relative h-56 bg-white overflow-hidden">
                    <Image
                        src={car.thumbnail_image || "https://raw.githubusercontent.com/adrianhajdin/project_next14_car_showcase/main/public/hero.png"}
                        alt={car.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain p-6 group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-5 left-5 flex space-x-2 z-20">
                        <div className="bg-white/90 backdrop-blur-md text-primary px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm border border-border">
                            {car.category}
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-7 space-y-5 flex flex-col flex-grow bg-white relative">
                    <div className="absolute top-0 inset-x-7 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                    <div className="space-y-1">
                        <div className="flex justify-between items-start">
                            <h3 className="text-lg font-black text-foreground group-hover:text-primary transition-colors tracking-tight">
                                {car.brand} <span className="text-primary font-semibold italic">{car.name}</span>
                            </h3>
                            <span className="text-[10px] font-black text-muted-foreground bg-accent px-2.5 py-1 rounded-lg border border-border shadow-sm">{car.model_year}</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em]">Karachi Prestige Fleet</p>
                    </div>

                    {/* Specs Grid */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center space-x-2.5 p-2.5 rounded-xl bg-accent/50 group-hover:bg-accent transition-colors border border-border/50">
                            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Users className="w-3.5 h-3.5 text-primary" />
                            </div>
                            <span className="text-xs font-bold text-foreground">{car.seating_capacity} Seats</span>
                        </div>
                        <div className="flex items-center space-x-2.5 p-2.5 rounded-xl bg-accent/50 group-hover:bg-accent transition-colors border border-border/50">
                            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Fuel className="w-3.5 h-3.5 text-primary" />
                            </div>
                            <span className="text-xs font-bold capitalize text-foreground">{car.category}</span>
                        </div>
                        <div className="flex items-center space-x-2.5 p-2.5 rounded-xl bg-accent/50 group-hover:bg-accent transition-colors border border-border/50">
                            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Gauge className="w-3.5 h-3.5 text-primary" />
                            </div>
                            <span className="text-xs font-bold text-foreground">{car.engine_specs?.transmission || "Auto"}</span>
                        </div>
                        <div className="flex items-center space-x-2.5 p-2.5 rounded-xl bg-accent/50 group-hover:bg-accent transition-colors border border-border/50">
                            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                                <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                            </div>
                            <span className="text-xs font-bold text-foreground">
                                {car.engine_specs?.adas || car.electric_specs?.adas ? "ADAS" : "Safety+"}
                            </span>
                        </div>
                    </div>

                    {/* Price & Action */}
                    <div className="pt-5 mt-auto flex items-center justify-between relative">
                        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                        <div>
                            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Daily Rate</p>
                            <p className="text-2xl font-black text-foreground">
                                {formatPrice(car.daily_rate)}
                                <span className="text-xs font-bold text-muted-foreground ml-1">/day</span>
                            </p>
                        </div>
                        <div className="w-13 h-13 p-3.5 bg-gradient-to-br from-primary to-blue-600 text-white rounded-2xl flex items-center justify-center transition-all shadow-md group-hover:shadow-[0_10px_20px_rgba(59,130,246,0.3)] group-hover:scale-110 overflow-hidden relative">
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default CarCard;
