"use client";

import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
    {
        question: "What documents do I need to rent a car?",
        answer: "To rent a car from Epic Drive, you need a valid Pakistani Driving License (original) and a copy of your CNIC. International visitors need a valid International Driving Permit."
    },
    {
        question: "Is there a security deposit?",
        answer: "Yes, a refundable security deposit is required for all rentals. The amount depends on the car category (starting from Rs. 50,000). It is returned within 24 hours of vehicle return after inspection."
    },
    {
        question: "Can I take the car outside Karachi?",
        answer: "Our standard rates are for within Karachi city limits. Inter-city travel is possible but requires prior approval and may involve additional charges or different terms."
    },
    {
        question: "What happens if the car breaks down?",
        answer: "We provide 24/7 roadside assistance within Karachi. If the car has a mechanical failure, we will replace it with a similar vehicle as quickly as possible."
    },
    {
        question: "Is fuel included in the rental price?",
        answer: "No, fuel is not included. We provide the car with a full tank, and it should be returned with a full tank. If not, refueling charges will apply."
    }
];

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <section className="py-32 relative">
            <div className="max-w-4xl mx-auto px-4 relative z-10">
                <div className="text-center space-y-4 mb-24">
                    <div className="inline-flex items-center space-x-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest leading-none">
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>Intelligence Center</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black text-foreground tracking-tighter">
                        ELITE <span className="text-primary italic">FAQS</span>
                    </h2>
                    <p className="text-muted-foreground font-medium text-lg">
                        Everything you need to know about navigating Karachi with the Epic fleet.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={cn(
                                "group bg-white rounded-[2rem] border transition-all duration-500 overflow-hidden shadow-sm",
                                activeIndex === index ? "border-primary/40 shadow-xl shadow-primary/10 translate-x-2" : "border-border hover:border-primary/20"
                            )}
                        >
                            <button
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                className="w-full p-8 text-left flex items-center justify-between"
                            >
                                <span className={cn(
                                    "font-black text-lg md:text-xl tracking-tight transition-all duration-300",
                                    activeIndex === index ? "text-primary" : "text-foreground group-hover:text-primary"
                                )}>
                                    {faq.question}
                                </span>
                                <div className={cn(
                                    "w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-500",
                                    activeIndex === index ? "bg-primary text-white rotate-180 shadow-lg shadow-primary/30" : "bg-accent text-primary group-hover:bg-primary/10"
                                )}>
                                    {activeIndex === index ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                                </div>
                            </button>
                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        <div className="px-8 pb-8 text-muted-foreground font-medium text-base leading-relaxed border-t border-border pt-6 mx-8">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>

            {/* Ambient Background Glow for FAQ */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 rounded-full blur-[120px] -z-10" />
        </section>
    );
};

export default FAQ;
