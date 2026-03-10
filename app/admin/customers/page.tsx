"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Search, User, Mail, Phone, MapPin, MoreVertical, ShieldCheck, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CustomersPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        // Simulate fetching
        setTimeout(() => setIsLoading(false), 800);
    }, []);

    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-3xl font-black text-foreground tracking-tight">Customer Directory</h1>
                <p className="text-sm font-medium text-muted-foreground">Manage and verify users across the Epic Drive platform.</p>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-border shadow-sm overflow-hidden">
                <div className="p-8 border-b border-border flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            placeholder="Search by name, email or city..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-accent/30 border border-border rounded-xl text-sm focus:bg-white outline-none transition-all"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-[#FBFCFE] border-b border-border">
                            <tr>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">User Profile</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Verification</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Bookings</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Joined At</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center space-y-4">
                                            <Loader2 className="w-8 h-8 text-primary animate-spin" />
                                            <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Loading Customers...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                [1, 2, 3, 4, 5].map((i) => (
                                    <tr key={i} className="hover:bg-accent/20 transition-all group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center font-black text-primary border-2 border-primary/10 group-hover:bg-primary group-hover:text-white transition-all">
                                                    {i === 1 ? "MA" : i === 2 ? "SY" : "UC"}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-foreground">
                                                        {i === 1 ? "Muhammad Ali" : i === 2 ? "Sara Yaseen" : "User " + i}
                                                    </p>
                                                    <div className="flex items-center space-x-2 text-[10px] text-muted-foreground font-medium">
                                                        <Mail className="w-3 h-3" />
                                                        <span>user{i}@example.com</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center space-x-2 px-3 py-1 bg-green-50 text-green-600 rounded-full w-fit">
                                                <ShieldCheck className="w-3 h-3" />
                                                <span className="text-[10px] font-black uppercase tracking-widest">Verified</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="text-sm font-black text-foreground">{i * 2 + 1}</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="text-xs font-bold text-muted-foreground">Jan 12, 2024</p>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <button className="p-2.5 bg-accent text-muted-foreground rounded-xl hover:bg-white transition-all">
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
