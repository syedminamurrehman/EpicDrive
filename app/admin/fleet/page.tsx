"use client";

import Link from "next/link";
import { Plus, Search, Edit, Trash2, ExternalLink, Car as CarIcon, Loader2 } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Car } from "@/types";

export default function FleetPage() {
    const [cars, setCars] = useState<Car[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All Status");
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editValues, setEditValues] = useState<Partial<Car>>({});

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('cars')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setCars(data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditStart = (car: Car) => {
        setEditingId(car.id);
        setEditValues({
            status: car.status,
            daily_rate: car.daily_rate,
            weekly_rate: car.weekly_rate,
            monthly_rate: car.monthly_rate
        });
    };

    const handleSaveEdit = async (id: string) => {
        try {
            const { error } = await supabase
                .from('cars')
                .update(editValues)
                .eq('id', id);

            if (error) throw error;
            setCars(cars.map(c => c.id === id ? { ...c, ...editValues } as Car : c));
            setEditingId(null);
        } catch (error) {
            console.error(error);
            alert("Error updating car");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this vehicle?")) return;
        try {
            const { error } = await supabase.from('cars').delete().eq('id', id);
            if (error) throw error;
            setCars(cars.filter(car => car.id !== id));
        } catch (error) {
            console.error(error);
            alert("Error deleting vehicle");
        }
    };

    const filteredCars = cars.filter(car => {
        const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            car.brand.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "All Status" || car.status.toLowerCase() === statusFilter.toLowerCase();
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-foreground tracking-tight">Fleet Management</h1>
                    <p className="text-sm font-medium text-muted-foreground">Manage your vehicles, rates, and availability in Karachi.</p>
                </div>
                <Link
                    href="/admin/fleet/new"
                    className="px-8 py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center space-x-2 shadow-xl shadow-primary/20 hover:scale-105 transition-all"
                >
                    <Plus className="w-5 h-5" />
                    <span>Add New Vehicle</span>
                </Link>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-border shadow-sm overflow-hidden">
                {/* Table Filters */}
                <div className="p-8 border-b border-border flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            placeholder="Search by name, brand..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-accent/30 border border-border rounded-xl text-sm focus:bg-white outline-none transition-all"
                        />
                    </div>
                    <div className="flex items-center space-x-3 w-full md:w-auto">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="flex-1 md:flex-none px-6 py-3 bg-white border border-border rounded-xl text-xs font-bold uppercase tracking-widest outline-none cursor-pointer"
                        >
                            <option>All Status</option>
                            <option>Available</option>
                            <option>Rented</option>
                            <option>Maintenance</option>
                        </select>
                    </div>
                </div>

                {/* Fleet Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-[#FBFCFE] border-b border-border">
                            <tr>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Vehicle</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Status & Pricing</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={3} className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center space-y-4">
                                            <Loader2 className="w-8 h-8 text-primary animate-spin" />
                                            <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Loading Karachi Fleet...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredCars.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="px-8 py-20 text-center text-muted-foreground font-medium">No vehicles found matching your criteria.</td>
                                </tr>
                            ) : (
                                filteredCars.map((car) => (
                                    <tr key={car.id} className="hover:bg-accent/20 transition-all group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-16 h-12 bg-accent/50 rounded-xl overflow-hidden relative border border-border shrink-0 flex items-center justify-center">
                                                    {car.thumbnail_image ? (
                                                        <img
                                                            src={car.thumbnail_image}
                                                            className="object-contain p-2 w-full h-full"
                                                            alt={car.name}
                                                        />
                                                    ) : (
                                                        <CarIcon className="w-6 h-6 text-primary/40" />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-foreground">{car.brand} {car.name}</p>
                                                    <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Model {car.model_year}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            {editingId === car.id ? (
                                                <div className="flex flex-wrap items-center gap-4">
                                                    <select
                                                        value={editValues.status}
                                                        onChange={(e) => setEditValues({ ...editValues, status: e.target.value as any })}
                                                        className="px-3 py-1.5 bg-white border border-border rounded-lg text-[10px] font-black uppercase tracking-widest outline-none"
                                                    >
                                                        <option value="available">Available</option>
                                                        <option value="rented">Rented</option>
                                                        <option value="maintenance">Maintenance</option>
                                                    </select>
                                                    <div className="flex items-center space-x-2">
                                                        <span className="text-[10px] font-black text-muted-foreground uppercase">Daily:</span>
                                                        <input
                                                            type="number"
                                                            value={editValues.daily_rate}
                                                            onChange={(e) => setEditValues({ ...editValues, daily_rate: Number(e.target.value) })}
                                                            className="w-24 px-2 py-1 bg-white border border-border rounded text-xs font-black outline-none focus:border-primary"
                                                        />
                                                    </div>
                                                    <button
                                                        onClick={() => handleSaveEdit(car.id)}
                                                        className="px-4 py-1.5 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:scale-105 transition-all shadow-md shadow-primary/10"
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        onClick={() => setEditingId(null)}
                                                        className="px-4 py-1.5 bg-accent text-muted-foreground text-[10px] font-black uppercase tracking-widest rounded-lg"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col space-y-2">
                                                    <div className="flex items-center space-x-3">
                                                        <span className={cn(
                                                            "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                                                            car.status === 'available' ? "bg-green-100 text-green-700" :
                                                                car.status === 'rented' ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"
                                                        )}>
                                                            {car.status}
                                                        </span>
                                                        <p className="text-sm font-black text-foreground">{formatPrice(car.daily_rate)} <span className="text-[10px] text-muted-foreground">/ day</span></p>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <span className="px-2 py-0.5 bg-primary/5 text-primary rounded text-[9px] font-black uppercase tracking-tighter border border-primary/10">
                                                            {car.category}
                                                        </span>
                                                        <span className="text-[9px] text-muted-foreground font-medium italic">
                                                            {formatPrice(car.weekly_rate || 0)} wk • {formatPrice(car.monthly_rate || 0)} mo
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end space-x-2">
                                                {editingId !== car.id && (
                                                    <>
                                                        <button
                                                            onClick={() => handleEditStart(car)}
                                                            className="p-2.5 bg-accent text-primary rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm"
                                                            title="Edit Rates & Status"
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(car.id)}
                                                            className="p-2.5 bg-accent text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                                            title="Delete Vehicle"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                        <Link
                                                            href={`/cars/${car.id}`}
                                                            target="_blank"
                                                            className="p-2.5 bg-accent text-muted-foreground rounded-xl hover:bg-white transition-all shadow-sm"
                                                            title="Preview Page"
                                                        >
                                                            <ExternalLink className="w-4 h-4" />
                                                        </Link>
                                                    </>
                                                )}
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
