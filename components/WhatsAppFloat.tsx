"use client";

import { MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const WhatsAppFloat = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <a
            href="https://wa.me/923369289269?text=Salam! I have a question about car rentals in Karachi."
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
                "fixed bottom-8 right-8 z-[100] group flex items-center transition-all duration-500",
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
            )}
        >
            <div className="absolute right-full mr-4 px-4 py-2 bg-white rounded-2xl shadow-xl border border-border opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-x-4 group-hover:translate-x-0 hidden sm:block whitespace-nowrap">
                <p className="text-sm font-bold text-foreground">Chat with us! 👋</p>
                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Fast Karachi Support</p>
            </div>

            <div className="relative">
                <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-20" />
                <div className="relative w-16 h-16 bg-[#25D366] text-white rounded-[1.5rem] flex items-center justify-center shadow-2xl shadow-[#25D366]/40 hover:scale-110 active:scale-95 transition-all">
                    <MessageCircle className="w-8 h-8" />
                </div>
            </div>
        </a>
    );
};

export default WhatsAppFloat;
