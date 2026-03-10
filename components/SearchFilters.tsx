"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FUEL_CATEGORIES } from "@/constants";
import { cn } from "@/lib/utils";
import { Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

const SearchFilters = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentCategory = searchParams.get("category");

    // States
    const [isExpanded, setIsExpanded] = useState(false);
    const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
    const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
    const [adas, setAdas] = useState(searchParams.get("adas") || "All");
    const [sort, setSort] = useState(searchParams.get("sort") || "price_desc");

    const setCategory = (category: string | null) => {
        const params = new URLSearchParams(searchParams.toString());
        if (category) {
            params.set("category", category);
        } else {
            params.delete("category");
        }
        router.push(`/cars?${params.toString()}`, { scroll: false });
    };

    const applyFilters = () => {
        const params = new URLSearchParams(searchParams.toString());
        if (minPrice) params.set("minPrice", minPrice); else params.delete("minPrice");
        if (maxPrice) params.set("maxPrice", maxPrice); else params.delete("maxPrice");
        if (adas !== "All") params.set("adas", adas); else params.delete("adas");
        if (sort !== "newest") params.set("sort", sort); else params.delete("sort");

        router.push(`/cars?${params.toString()}`, { scroll: false });
    };

    const resetFilters = () => {
        setMinPrice("");
        setMaxPrice("");
        setAdas("All");
        setSort("price_desc");
        router.push("/cars", { scroll: false });
        setIsExpanded(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                {/* Category Rapid Selection */}
                <div className="flex items-center space-x-2 overflow-x-auto pb-2 no-scrollbar w-full md:w-auto">
                    <button
                        onClick={() => setCategory(null)}
                        className={cn(
                            "px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all border",
                            !currentCategory
                                ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                                : "bg-white/5 text-muted-foreground border-white/10 hover:border-primary/50 hover:text-primary"
                        )}
                    >
                        All Fleet
                    </button>
                    {FUEL_CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setCategory(cat.id)}
                            className={cn(
                                "px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all border",
                                currentCategory === cat.id
                                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                                    : "bg-accent text-muted-foreground border-border hover:border-primary/50 hover:text-primary"
                            )}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Search & Advanced Toggle */}
                <div className="flex items-center space-x-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search elite fleet..."
                            defaultValue={searchParams.get("query") || ""}
                            onChange={(e) => {
                                const params = new URLSearchParams(searchParams.toString());
                                if (e.target.value) params.set("query", e.target.value);
                                else params.delete("query");
                                router.push(`/cars?${params.toString()}`, { scroll: false });
                            }}
                            className="w-full pl-10 pr-4 py-3 bg-accent border border-border rounded-2xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                        />
                    </div>
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className={cn(
                            "p-3 rounded-2xl transition-all flex items-center space-x-2",
                            isExpanded ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-accent border border-border text-primary hover:bg-primary hover:text-white"
                        )}
                    >
                        <SlidersHorizontal className="w-5 h-5" />
                        <span className="text-xs font-black md:hidden uppercase tracking-widest">Filters</span>
                    </button>
                </div>
            </div>

            {/* Advanced Filters (Expandable) */}
            {isExpanded && (
                <div className="p-8 bg-white rounded-[2.5rem] border border-border grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 animate-in fade-in slide-in-from-top-4 duration-300 shadow-xl">
                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Price Range (PKR)</label>
                        <div className="flex items-center space-x-2">
                            <input
                                type="number"
                                placeholder="Min"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                                className="w-full p-3 bg-accent border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/20"
                            />
                            <span className="text-muted-foreground font-black">—</span>
                            <input
                                type="number"
                                placeholder="Max"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                                className="w-full p-3 bg-accent border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/20"
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">ADAS System</label>
                        <select
                            value={adas}
                            onChange={(e) => setAdas(e.target.value)}
                            className="w-full p-3 bg-accent border border-border rounded-xl text-sm text-foreground appearance-none cursor-pointer outline-none focus:ring-1 focus:ring-primary/20"
                        >
                            <option value="All" className="bg-white">All Vehicles</option>
                            <option value="true" className="bg-white">With ADAS</option>
                            <option value="false" className="bg-white">Standard</option>
                        </select>
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Sort Order</label>
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="w-full p-3 bg-accent border border-border rounded-xl text-sm text-foreground appearance-none cursor-pointer outline-none focus:ring-1 focus:ring-primary/20"
                        >
                            <option value="newest" className="bg-white">Newest First</option>
                            <option value="price_asc" className="bg-white">Price: Low to High</option>
                            <option value="price_desc" className="bg-white">Price: High to Low</option>
                        </select>
                    </div>

                    <div className="flex items-end space-x-3">
                        <button
                            onClick={applyFilters}
                            className="flex-1 py-3.5 bg-primary text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:bg-blue-400 active:scale-95 transition-all"
                        >
                            Apply
                        </button>
                        <button
                            onClick={resetFilters}
                            className="p-3.5 bg-accent text-muted-foreground border border-border rounded-xl font-black text-xs uppercase tracking-widest hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all"
                        >
                            Reset
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchFilters;

