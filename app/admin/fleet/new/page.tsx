"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FUEL_CATEGORIES, TRANSMISSION_TYPES } from "@/constants";
import { useState } from "react";
import { Loader2, Plus, ArrowLeft, Image as ImageIcon, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const carSchema = z.object({
    name: z.string().min(1, "Name is required"),
    brand: z.string().min(1, "Brand is required"),
    model_year: z.coerce.number().min(1900).max(new Date().getFullYear() + 1),
    category: z.string().min(1, "Category is required"),
    daily_rate: z.coerce.number().min(0),
    weekly_rate: z.coerce.number().min(0),
    monthly_rate: z.coerce.number().min(0),
    seating_capacity: z.coerce.number().min(1),
    airbags_count: z.coerce.number().min(0),
    thumbnail_image: z.string().min(1, "Thumbnail required"),

    // Spec fields
    engine_size_cc: z.coerce.number().optional(),
    transmission: z.string().default("Automatic"),
    gears: z.coerce.number().optional(),
    mileage_kml: z.coerce.number().optional(),
    power_hp: z.coerce.number().optional(),
    torque_nm: z.coerce.number().optional(),

    battery_size_kwh: z.coerce.number().optional(),
    ev_range_wltp: z.coerce.number().optional(),
    motor_power_kw: z.coerce.number().optional(),
    charging_time_50kw_dc: z.string().optional(),
    adas: z.boolean().default(false),
});

export default function NewCarPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: zodResolver(carSchema),
        defaultValues: {
            category: "petrol",
            transmission: "Automatic",
            seating_capacity: 5,
            airbags_count: 2
        }
    });

    const category = watch("category");

    const onSubmit = async (data: any) => {
        setIsSubmitting(true);
        try {
            // 1. Insert into 'cars' table
            const carData = {
                name: data.name,
                brand: data.brand,
                model_year: data.model_year,
                category: data.category,
                daily_rate: data.daily_rate,
                weekly_rate: data.weekly_rate,
                monthly_rate: data.monthly_rate,
                seating_capacity: data.seating_capacity,
                airbags_count: data.airbags_count,
                thumbnail_image: data.thumbnail_image,
                status: 'available'
            };

            const { data: car, error: carError } = await supabase
                .from('cars')
                .insert([carData])
                .select()
                .single();

            if (carError) throw carError;

            // 2. Insert into spec tables based on category
            if (['petrol', 'diesel', 'hev', 'phev', 'electric'].includes(data.category)) {
                if (['petrol', 'diesel', 'hev', 'phev'].includes(data.category)) {
                    await supabase.from('specs_engine').insert([{
                        car_id: car.id,
                        engine_size_cc: data.engine_size_cc,
                        transmission: data.transmission,
                        gears: data.gears,
                        mileage_kml: data.mileage_kml,
                        power_hp: data.power_hp,
                        torque_nm: data.torque_nm,
                        adas: data.adas
                    }]);
                }

                if (['hev', 'phev'].includes(data.category)) {
                    await supabase.from('specs_hybrid').insert([{
                        car_id: car.id,
                        battery_size_kwh: data.battery_size_kwh,
                        ev_range_wltp: data.ev_range_wltp,
                        charging_time_50kw_dc: data.category === 'phev' ? data.charging_time_50kw_dc : null
                    }]);
                }

                if (data.category === 'electric') {
                    await supabase.from('specs_electric').insert([{
                        car_id: car.id,
                        motor_power_kw: data.motor_power_kw,
                        range_wltp: data.ev_range_wltp,
                        charging_time_50kw_dc: data.charging_time_50kw_dc,
                        adas: data.adas
                    }]);
                }
            }

            alert("Vehicle added to Karachi Fleet successfully!");
            window.location.href = "/admin/fleet";
        } catch (err) {
            console.error(err);
            alert("Error adding car. Check console for details.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-20">
            <Link href="/admin/fleet" className="inline-flex items-center space-x-2 text-muted-foreground hover:text-primary transition-all font-bold group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-xs uppercase tracking-widest">Back to Fleet</span>
            </Link>

            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black text-foreground tracking-tight">Add New Vehicle</h1>
                    <p className="text-sm font-medium text-muted-foreground">Fill in details to expand your Karachi fleet.</p>
                </div>
                <button
                    onClick={handleSubmit(onSubmit)}
                    disabled={isSubmitting}
                    className="px-8 py-4 bg-primary text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest flex items-center space-x-2 shadow-xl shadow-primary/20 hover:scale-105 transition-all active:scale-95 disabled:opacity-50"
                >
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                    <span>Save Vehicle</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* General Information */}
                    <Section title="General Information">
                        <div className="grid grid-cols-2 gap-6">
                            <FormGroup label="Vehicle Name" error={errors.name?.message as string}>
                                <input {...register("name")} placeholder="Corolla Altis" className="form-input" />
                            </FormGroup>
                            <FormGroup label="Brand" error={errors.brand?.message as string}>
                                <input {...register("brand")} placeholder="Toyota" className="form-input" />
                            </FormGroup>
                        </div>
                        <div className="grid grid-cols-3 gap-6 mt-6">
                            <FormGroup label="Model Year" error={errors.model_year?.message as string}>
                                <input type="number" {...register("model_year")} className="form-input" />
                            </FormGroup>
                            <FormGroup label="Fuel Category">
                                <select {...register("category")} className="form-input appearance-none">
                                    {FUEL_CATEGORIES.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.label}</option>
                                    ))}
                                </select>
                            </FormGroup>
                            <FormGroup label="Seating" error={errors.seating_capacity?.message as string}>
                                <input type="number" {...register("seating_capacity")} className="form-input" />
                            </FormGroup>
                        </div>
                    </Section>

                    {/* Pricing */}
                    <Section title="Rental Rates (PKR)">
                        <div className="grid grid-cols-3 gap-6">
                            <FormGroup label="Daily Rate" error={errors.daily_rate?.message as string}>
                                <input type="number" {...register("daily_rate")} className="form-input" placeholder="15000" />
                            </FormGroup>
                            <FormGroup label="Weekly Rate" error={errors.weekly_rate?.message as string}>
                                <input type="number" {...register("weekly_rate")} className="form-input" placeholder="90000" />
                            </FormGroup>
                            <FormGroup label="Monthly Rate" error={errors.monthly_rate?.message as string}>
                                <input type="number" {...register("monthly_rate")} className="form-input" placeholder="320000" />
                            </FormGroup>
                        </div>
                    </Section>

                    {/* Technical Specifications */}
                    <Section title="Technical Specifications">
                        <p className="text-[10px] text-primary font-black uppercase tracking-widest mb-6">
                            Fields based on selected category: {category}
                        </p>

                        <div className="grid grid-cols-2 gap-6">
                            {['petrol', 'diesel', 'hev', 'phev'].includes(category) && (
                                <>
                                    <FormGroup label="Engine Size (CC)">
                                        <input type="number" {...register("engine_size_cc")} className="form-input" placeholder="1800" />
                                    </FormGroup>
                                    <FormGroup label="Transmission">
                                        <select {...register("transmission")} className="form-input">
                                            {TRANSMISSION_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                                        </select>
                                    </FormGroup>
                                    <FormGroup label="Max Power (HP)">
                                        <input type="number" {...register("power_hp")} className="form-input" />
                                    </FormGroup>
                                    <FormGroup label="Max Torque (NM)">
                                        <input type="number" {...register("torque_nm")} className="form-input" />
                                    </FormGroup>
                                </>
                            )}

                            {['hev', 'phev', 'electric'].includes(category) && (
                                <>
                                    <FormGroup label={category === 'electric' ? "Motor Power (kW)" : "Battery Size (kWh)"}>
                                        <input type="number" {...register(category === 'electric' ? "motor_power_kw" : "battery_size_kwh")} className="form-input" />
                                    </FormGroup>
                                    <FormGroup label="Range (WLTP KM)">
                                        <input type="number" {...register("ev_range_wltp")} className="form-input" />
                                    </FormGroup>
                                </>
                            )}
                        </div>

                        <div className="mt-8 pt-8 border-t border-border">
                            <label className="flex items-center space-x-3 cursor-pointer group">
                                <div className="relative">
                                    <input type="checkbox" {...register("adas")} className="sr-only peer" />
                                    <div className="w-12 h-6 bg-accent rounded-full peer peer-checked:bg-primary transition-all shadow-inner"></div>
                                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:left-7"></div>
                                </div>
                                <div>
                                    <p className="text-sm font-black text-foreground group-hover:text-primary transition-colors">Advanced Driver Assistance System (ADAS)</p>
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Enabling this will tag the vehicle with the "ADAS" badge</p>
                                </div>
                            </label>
                        </div>
                    </Section>
                </div>

                <div className="space-y-8">
                    <Section title="Media & Visuals">
                        <FormGroup label="Thumbnail URL" error={errors.thumbnail_image?.message as string}>
                            <input {...register("thumbnail_image")} className="form-input" placeholder="https://..." />
                        </FormGroup>
                        <div className="aspect-video bg-accent/30 rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center p-4">
                            {watch("thumbnail_image") ? (
                                <img src={watch("thumbnail_image")} className="w-full h-full object-contain rounded-xl" />
                            ) : (
                                <div className="text-center">
                                    <ImageIcon className="w-8 h-8 text-primary mx-auto mb-2 opacity-40" />
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Preview Area</p>
                                </div>
                            )}
                        </div>
                    </Section>

                    <div className="bg-primary p-8 rounded-[2rem] text-white space-y-4 shadow-xl shadow-primary/20">
                        <CheckCircle2 className="w-8 h-8" />
                        <h4 className="font-black text-xl">Verification</h4>
                        <p className="text-xs text-white/70 leading-relaxed font-medium">
                            Once saved, the vehicle will immediately appear in the Karachi fleet search results.
                        </p>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .form-input {
                    width: 100%;
                    padding: 1.15rem;
                    background-color: #F8F9FC;
                    border: 1px solid #DFE1E6;
                    border-radius: 1.25rem;
                    font-size: 0.875rem;
                    font-weight: 500;
                    transition: all 0.2s;
                    outline: none;
                }
                .form-input:focus {
                    background-color: white;
                    border-color: #0052CC;
                    box-shadow: 0 0 0 4px rgba(0, 82, 204, 0.1);
                }
            `}</style>
        </div>
    );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="bg-white p-10 rounded-[2.5rem] border border-border shadow-sm">
            <h3 className="text-xl font-black text-foreground mb-10">{title}</h3>
            {children}
        </div>
    );
}

function FormGroup({ label, children, error }: { label: string; children: React.ReactNode; error?: string }) {
    return (
        <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">{label}</label>
            {children}
            {error && <p className="text-[10px] text-red-500 font-bold ml-1">{error}</p>}
        </div>
    );
}
