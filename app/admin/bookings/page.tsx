"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
    Search,
    Filter,
    MoreHorizontal,
    Eye,
    CheckCircle2,
    XCircle,
    Clock,
    Mail,
    Phone,
    Calendar,
    Car as CarIcon,
    Loader2
} from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { Booking } from "@/types";

export default function BookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('bookings')
                .select(`
                    *,
                    car:cars(*)
                `)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setBookings(data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const updateBookingStatus = async (id: string, status: 'confirmed' | 'cancelled') => {
        try {
            const { error } = await supabase
                .from('bookings')
                .update({ status })
                .eq('id', id);

            if (error) throw error;
            setBookings(bookings.map(b => b.id === id ? { ...b, status } : b));
        } catch (error) {
            console.error(error);
            alert("Error updating status");
        }
    };

    const filteredBookings = bookings.filter(booking => {
        const matchesSearch =
            booking.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.car?.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "All" || booking.status.toLowerCase() === statusFilter.toLowerCase();
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-3xl font-black text-foreground tracking-tight">Booking Requests</h1>
                <p className="text-muted-foreground text-sm font-medium">Manage and monitor all vehicle rental requests in Karachi.</p>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        placeholder="Search by customer, car or email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-white border border-border rounded-[1.25rem] text-sm focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                    />
                </div>
                <div className="flex gap-2">
                    {["All", "Pending", "Confirmed", "Cancelled"].map((status) => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={cn(
                                "px-6 py-4 rounded-[1.25rem] text-xs font-black uppercase tracking-widest transition-all border",
                                statusFilter === status
                                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                                    : "bg-white text-muted-foreground border-border hover:border-primary/50"
                            )}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Bookings Table */}
            <div className="bg-white rounded-[2.5rem] border border-border overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-accent/30">
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Request Details</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Customer</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Duration</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Amount</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Status</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={6} className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center space-y-4">
                                            <Loader2 className="w-8 h-8 text-primary animate-spin" />
                                            <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Fetching Requests...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredBookings.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-8 py-20 text-center text-muted-foreground font-medium">No booking requests found.</td>
                                </tr>
                            ) : (
                                filteredBookings.map((booking) => (
                                    <tr key={booking.id} className="hover:bg-accent/10 transition-all group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-12 h-12 bg-accent/50 rounded-2xl flex items-center justify-center shrink-0">
                                                    <CarIcon className="w-6 h-6 text-primary" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center space-x-2">
                                                        <span className="text-sm font-bold text-foreground">{booking.car?.brand} {booking.car?.name}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-2 mt-1">
                                                        <Clock className="w-3 h-3 text-muted-foreground" />
                                                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                                            {new Date(booking.created_at).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="space-y-1">
                                                <p className="text-sm font-bold text-foreground">{booking.full_name}</p>
                                                <div className="flex items-center space-x-3 text-[10px] font-bold text-muted-foreground">
                                                    <span className="flex items-center space-x-1"><Mail className="w-3 h-3" /> <span>{booking.email}</span></span>
                                                    <span className="flex items-center space-x-1"><Phone className="w-3 h-3" /> <span>{booking.phone}</span></span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col space-y-1">
                                                <div className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-primary">
                                                    <Calendar className="w-3 h-3" />
                                                    <span>{booking.pickup_date} → {booking.return_date}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="text-sm font-black text-foreground">{formatPrice(booking.total_cost)}</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={cn(
                                                "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                                                booking.status === 'confirmed' ? "bg-green-100 text-green-700" :
                                                    booking.status === 'pending' ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"
                                            )}>
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end space-x-2">
                                                {booking.status === 'pending' && (
                                                    <>
                                                        <button
                                                            onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                                                            className="p-3 bg-green-50 text-green-600 rounded-xl hover:bg-green-600 hover:text-white transition-all shadow-sm"
                                                            title="Confirm Booking"
                                                        >
                                                            <CheckCircle2 className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                                                            className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
                                                            title="Cancel Booking"
                                                        >
                                                            <XCircle className="w-4 h-4" />
                                                        </button>
                                                    </>
                                                )}
                                                <button className="p-3 bg-accent text-muted-foreground rounded-xl hover:bg-white transition-all shadow-sm">
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </button>
                                            </div>
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
