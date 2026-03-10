import {
    Car,
    BookOpen,
    TrendingUp,
    DollarSign,
    Clock,
    CheckCircle2,
    AlertCircle,
    ArrowUpRight,
    ArrowDownRight,
    Info
} from "lucide-react";
import { formatPrice, cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    let statsData: any = {
        totalCars: 0,
        totalBookings: 0,
        totalRevenue: 0,
        pendingRevenue: 0,
        availableFleet: 0,
        rentedFleet: 0,
        maintenanceFleet: 0
    };
    let recentBookings = [];

    try {
        // Fetch stats
        const { count: totalCars } = await supabase.from('cars').select('*', { count: 'exact', head: true });
        const { count: totalBookings } = await supabase.from('bookings').select('*', { count: 'exact', head: true });
        const { data: revenueData } = await supabase.from('bookings').select('total_cost, status').neq('status', 'cancelled');
        const { count: availableFleet } = await supabase.from('cars').select('*', { count: 'exact', head: true }).eq('status', 'available');
        const { count: rentedFleet } = await supabase.from('cars').select('*', { count: 'exact', head: true }).eq('status', 'rented');
        const { count: maintenanceFleet } = await supabase.from('cars').select('*', { count: 'exact', head: true }).eq('status', 'maintenance');

        const totalRevenue = revenueData?.filter((b: any) => b.status === 'confirmed').reduce((acc: number, curr: any) => acc + Number(curr.total_cost), 0) || 0;
        const pendingRevenue = revenueData?.filter((b: any) => b.status === 'pending').reduce((acc: number, curr: any) => acc + Number(curr.total_cost), 0) || 0;

        statsData = {
            totalCars: totalCars || 0,
            totalBookings: totalBookings || 0,
            totalRevenue,
            pendingRevenue,
            availableFleet: availableFleet || 0,
            rentedFleet: rentedFleet || 0,
            maintenanceFleet: maintenanceFleet || 0
        };

        // Fetch recent bookings
        const { data } = await supabase
            .from('bookings')
            .select(`
                *,
                car:cars(*)
            `)
            .order('created_at', { ascending: false })
            .limit(5);
        recentBookings = data || [];
    } catch (error: any) {
        console.error('ADMIN DASHBOARD DATA ERROR:', error);
    }

    const { totalCars, totalBookings, totalRevenue, pendingRevenue, availableFleet, rentedFleet, maintenanceFleet } = statsData;

    const stats = [
        { label: "Total Cars", value: totalCars?.toString() || "0", icon: Car, trend: "+2", isPositive: true },
        { label: "Bookings", value: totalBookings?.toString() || "0", icon: BookOpen, trend: "Requests", isPositive: true },
        { label: "Confirmed Revenue", value: formatPrice(totalRevenue), icon: DollarSign, trend: "Realized", isPositive: true },
        { label: "Pending Revenue", value: formatPrice(pendingRevenue), icon: Clock, trend: "Expected", isPositive: true },
    ];

    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-3xl font-black text-foreground tracking-tight">Dashboard Overview</h1>
                <p className="text-muted-foreground text-sm font-medium">Welcome back, Admin. Real-time fleet and booking analysis for Karachi.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-8 rounded-[2rem] border border-border shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all group">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-4 bg-accent rounded-2xl group-hover:bg-primary group-hover:text-white transition-all">
                                <stat.icon className="w-6 h-6 text-primary group-hover:text-white" />
                            </div>
                            <div className={cn(
                                "flex items-center space-x-1 px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                                stat.isPositive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                            )}>
                                <span>{stat.trend}</span>
                                {stat.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-1">{stat.label}</p>
                            <h3 className="text-3xl font-black text-foreground">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Bookings Table */}
                <div className="lg:col-span-2 bg-white rounded-[2rem] border border-border overflow-hidden">
                    <div className="p-8 border-b border-border flex justify-between items-center">
                        <h3 className="text-xl font-black text-foreground">Recent Bookings</h3>
                        <Link href="/admin/bookings" className="text-sm font-bold text-primary hover:underline">View All</Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-[#FBFCFE] border-b border-border">
                                <tr>
                                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Car</th>
                                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Customer</th>
                                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Status</th>
                                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Total</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {recentBookings?.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-8 py-10 text-center text-muted-foreground font-medium">No recent bookings found</td>
                                    </tr>
                                ) : (
                                    recentBookings?.map((booking) => (
                                        <tr key={booking.id} className="hover:bg-accent/30 transition-all cursor-default group">
                                            <td className="px-8 py-4">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center shrink-0">
                                                        <Car className="w-5 h-5 text-primary" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-foreground truncate max-w-[150px]">{booking.car?.brand} {booking.car?.name}</p>
                                                        <p className="text-[10px] text-muted-foreground font-bold">{new Date(booking.created_at).toLocaleDateString()}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-4">
                                                <p className="text-sm font-bold text-foreground">{booking.full_name}</p>
                                                <p className="text-[10px] text-muted-foreground font-bold italic">{booking.email}</p>
                                            </td>
                                            <td className="px-8 py-4">
                                                <span className={cn(
                                                    "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                                                    booking.status === 'confirmed' ? "bg-green-100 text-green-700" :
                                                        booking.status === 'pending' ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"
                                                )}>
                                                    {booking.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-4 text-sm font-black text-foreground">{formatPrice(booking.total_cost)}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Fleet Status Card */}
                <div className="bg-white rounded-[2rem] border border-border p-8 space-y-8">
                    <h3 className="text-xl font-black text-foreground">Fleet Status</h3>
                    <div className="space-y-6">
                        <StatusCard label="Available" count={availableFleet || 0} color="bg-green-500" />
                        <StatusCard label="Rented" count={rentedFleet || 0} color="bg-primary" />
                        <StatusCard label="Maintenance" count={maintenanceFleet || 0} color="bg-yellow-500" />
                    </div>
                    <div className="pt-8 border-t border-border">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Available Percentage</span>
                            <span className="text-sm font-black text-primary">
                                {(((availableFleet || 0) / (totalCars || 1)) * 100).toFixed(0)}%
                            </span>
                        </div>
                        <div className="w-full h-3 bg-accent rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary rounded-full shadow-lg shadow-primary/20 transition-all duration-1000"
                                style={{ width: `${((availableFleet || 0) / (totalCars || 1)) * 100}%` }}
                            />
                        </div>
                    </div>
                    <Link
                        href="/admin/fleet"
                        className="block w-full text-center py-4 bg-accent text-primary rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-all"
                    >
                        Manage Full Fleet
                    </Link>
                </div>
            </div>
        </div>
    );
}

function StatusCard({ label, count, color }: { label: string; count: number; color: string }) {
    return (
        <div className="flex items-center justify-between p-4 bg-[#FBFCFE] border border-border rounded-2xl">
            <div className="flex items-center space-x-3">
                <div className={cn("w-2 h-2 rounded-full", color)} />
                <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{label}</span>
            </div>
            <span className="text-lg font-black text-foreground">{count}</span>
        </div>
    );
}
