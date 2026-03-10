import { carService } from "@/services/carService";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import {
    Users, Fuel, Gauge, ShieldCheck,
    Settings, Zap, Battery, Calendar,
    ArrowLeft, CheckCircle2, MapPin,
    Disc, Activity, Music, Shield, Info
} from "lucide-react";
import Link from "next/link";
import { cn, formatPrice } from "@/lib/utils";
import BookingForm from "@/components/BookingForm";
import CarGallery from "@/components/CarGallery";
import { Metadata } from "next";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const car = await carService.getCarById(id).catch(() => null);

    if (!car) return { title: "Vehicle Not Found" };

    const title = `${car.brand} ${car.name} (${car.model_year}) for Rent in Karachi`;
    const description = `Rent the ${car.brand} ${car.name} ${car.model_year} in Karachi. Features: ${car.category.toUpperCase()}, ${car.seating_capacity} seats, and ${car.airbags_count} airbags. Best daily rates at Epic Drive.`;

    return {
        title,
        description,
        keywords: [`rent ${car.brand} ${car.name}`, `${car.brand} rental karachi`, `hire ${car.name} in karachi`],
        openGraph: {
            title,
            description,
            images: [car.thumbnail_image],
        },
    };
}

export default async function CarDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const car = await carService.getCarById(id).catch(() => null);

    if (!car) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center space-y-4 bg-transparent">
                <Navbar />
                <div className="text-center space-y-6 pt-32">
                    <div className="w-24 h-24 bg-accent rounded-3xl flex items-center justify-center mx-auto border border-border shadow-lg">
                        <Info className="w-12 h-12 text-primary" />
                    </div>
                    <h1 className="text-4xl font-black text-foreground tracking-tighter">VEHICLE NOT FOUND</h1>
                    <p className="text-muted-foreground max-w-md mx-auto font-medium">The vehicle you're looking for might have been rented or moved to a different category.</p>
                    <Link href="/" className="inline-flex items-center space-x-2 px-8 py-5 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                        <ArrowLeft className="w-4 h-4" />
                        <span>Return to Home</span>
                    </Link>
                </div>
                <div className="mt-auto w-full">
                    <Footer />
                </div>
            </div>
        );
    }

    const isHybrid = car.category === 'hev' || car.category === 'phev';
    const isElectric = car.category === 'electric';
    const isInternalCombustion = car.category === 'petrol' || car.category === 'diesel';

    return (
        <main className="min-h-screen bg-transparent relative">
            <Navbar />

            <div className="pt-36 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Breadcrumbs / Back */}
                <Link href="/cars" className="inline-flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors mb-10 group">
                    <div className="w-10 h-10 rounded-xl bg-white/60 backdrop-blur-xl border border-white/80 shadow-sm flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-blue-600 group-hover:text-white group-hover:border-transparent transition-all">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-[0.2em] drop-shadow-sm">Back to Elite Fleet</span>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* Left Column: Image & Details */}
                    <div className="lg:col-span-8 space-y-14">

                        {/* Header */}
                        <div className="space-y-6">
                            <div className="flex flex-wrap gap-3">
                                <span className="px-4 py-2 bg-white/80 backdrop-blur-md border border-white/60 shadow-sm text-primary rounded-full text-[10px] font-black uppercase tracking-widest">
                                    {car.category}
                                </span>
                                <span className={cn(
                                    "px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border backdrop-blur-md shadow-sm",
                                    car.status === 'available' ? "bg-green-50/80 text-green-600 border-green-200/50" : "bg-blue-50/80 text-blue-600 border-blue-200/50"
                                )}>
                                    {car.status}
                                </span>
                            </div>
                            <h1 className="text-5xl lg:text-7xl font-black text-foreground tracking-tighter leading-[0.9] drop-shadow-sm">
                                {car.brand} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600 italic font-medium">{car.name}</span> <span className="text-foreground/10">{car.model_year}</span>
                            </h1>
                            <div className="flex flex-wrap items-center gap-6 text-muted-foreground font-medium">
                                <div className="flex items-center space-x-2">
                                    <MapPin className="w-4 h-4 text-primary" />
                                    <span className="text-sm">Available in Karachi</span>
                                </div>
                                <div className="flex items-center space-x-2 border-l pl-6 border-border">
                                    <ShieldCheck className="w-4 h-4 text-green-500" />
                                    <span className="text-sm">Verified & Insured</span>
                                </div>
                            </div>
                        </div>

                        {/* Gallery Section */}
                        <CarGallery
                            mainImage={car.thumbnail_image || "https://raw.githubusercontent.com/adrianhajdin/project_next14_car_showcase/main/public/hero.png"}
                            images={car.images || []}
                            carName={`${car.brand} ${car.name}`}
                        />

                        {/* Core Specs Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <SpecCard icon={Users} label="Seating" value={`${car.seating_capacity} Persons`} />
                            <SpecCard icon={Fuel} label="Category" value={car.category} />
                            <SpecCard icon={Shield} label="Safety" value={`${car.airbags_count} Airbags`} />
                            <SpecCard icon={Gauge} label="Driver Assist" value={car.engine_specs?.adas || car.electric_specs?.adas ? "ADAS" : "Standard"} />
                        </div>

                        {/* In-depth Specs Sections */}
                        <div className="space-y-16">
                            {/* Technical Specifications */}
                            <section className="space-y-8">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center border border-border">
                                        <Settings className="w-6 h-6 text-primary" />
                                    </div>
                                    <h3 className="text-2xl font-black text-foreground tracking-tight">Engine & Performance</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                                    {isInternalCombustion && car.engine_specs && (
                                        <>
                                            <SpecRow label="Engine Size" value={`${car.engine_specs.engine_size_cc} CC`} />
                                            <SpecRow label="Transmission" value={car.engine_specs.transmission} />
                                            <SpecRow label="Number of Gears" value={car.engine_specs.gears} />
                                            <SpecRow label="Mileage" value={`${car.engine_specs.mileage_kml} KM/L`} />
                                            <SpecRow label="Max Power" value={`${car.engine_specs.power_hp} HP`} />
                                            <SpecRow label="Max Torque" value={`${car.engine_specs.torque_nm} NM`} />
                                        </>
                                    )}
                                    {isHybrid && car.hybrid_specs && (
                                        <>
                                            <SpecRow label="Engine Size" value={`${car.hybrid_specs.engine_size_cc} CC`} />
                                            <SpecRow label="Battery Size" value={`${car.hybrid_specs.battery_size_kwh} kWh`} />
                                            <SpecRow label="EV Range (WLTP)" value={`${car.hybrid_specs.ev_range_wltp} KM`} />
                                            <SpecRow label="Combined Range" value={`${car.hybrid_specs.combined_range} KM`} />
                                            <SpecRow label="Max Power" value={`${car.hybrid_specs.power_hp} HP`} />
                                            {car.category === 'phev' && car.hybrid_specs.charging_time_50kw_dc && (
                                                <SpecRow label="DC Charging (50kW)" value={car.hybrid_specs.charging_time_50kw_dc} />
                                            )}
                                        </>
                                    )}
                                    {isElectric && car.electric_specs && (
                                        <>
                                            <SpecRow label="Motor Power" value={`${car.electric_specs.motor_power_kw} kW`} />
                                            <SpecRow label="Range (WLTP)" value={`${car.electric_specs.range_wltp} KM`} />
                                            <SpecRow label="DC Charging (50kW)" value={car.electric_specs.charging_time_50kw_dc} />
                                        </>
                                    )}
                                </div>
                            </section>

                            {/* Features & Details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                {/* Interior & Infotainment */}
                                <section className="space-y-6">
                                    <div className="flex items-center space-x-3">
                                        <Activity className="w-5 h-5 text-primary" />
                                        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-foreground">Interior & Tech</h4>
                                    </div>
                                    <div className="bg-white/60 backdrop-blur-xl rounded-[2.5rem] p-8 space-y-6 border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-80 pointer-events-none" />
                                        <div className="relative z-10 space-y-4">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-primary">Infotainment</p>
                                            <p className="text-sm font-medium leading-relaxed text-muted-foreground">{car.infotainment_details || "High-resolution touchscreen with Apple CarPlay and Android Auto integration."}</p>
                                        </div>
                                        <FeatureList items={car.interior_details?.split(',') || ['Premium Leather Seats', 'Dual Zone Climate', 'Ambient Lighting']} />
                                    </div>
                                </section>

                                {/* Exterior & Safety */}
                                <section className="space-y-6">
                                    <div className="flex items-center space-x-3">
                                        <ShieldCheck className="w-5 h-5 text-primary" />
                                        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-foreground">Exterior & Safety</h4>
                                    </div>
                                    <div className="bg-white/60 backdrop-blur-xl rounded-[2.5rem] p-8 space-y-6 border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-80 pointer-events-none" />
                                        <div className="relative z-10 space-y-4">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-primary">Safety System</p>
                                            <ul className="space-y-3">
                                                <li className="flex items-center space-x-2 text-sm font-medium text-muted-foreground">
                                                    <CheckCircle2 className="w-4 h-4 text-primary" />
                                                    <span>{car.airbags_count} Dual-stage Airbags</span>
                                                </li>
                                                <li className="flex items-center space-x-2 text-sm font-medium text-muted-foreground">
                                                    <CheckCircle2 className="w-4 h-4 text-primary" />
                                                    <span>Anti-lock Braking System (ABS)</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <FeatureList items={car.exterior_details?.split(',') || ['LED Headlamps', 'Automatic Fog lights', '17" Alloy Wheels']} />
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Dynamic Booking Card */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-36 space-y-8">
                            <div className="bg-white/70 backdrop-blur-3xl rounded-[3rem] border border-white/80 p-10 shadow-[0_20px_40px_rgba(0,0,0,0.08)] space-y-10 relative overflow-hidden">
                                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-80" />
                                <div className="space-y-2 relative z-10">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Premium Rental Rate</h4>
                                    <div className="flex items-baseline space-x-2">
                                        <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-primary to-blue-600 tracking-tighter">{formatPrice(car.daily_rate)}</span>
                                        <span className="text-sm font-bold text-muted-foreground">/day</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 relative z-10">
                                    <div className="p-6 bg-white/60 backdrop-blur-md rounded-3xl border border-white/60 shadow-sm hover:shadow-md hover:border-primary/30 transition-all flex flex-col items-start">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Weekly</p>
                                        <p className="text-lg font-black text-foreground">{formatPrice(car.weekly_rate)}</p>
                                        <p className="text-[9px] font-black text-green-600 mt-2 bg-green-50 px-2 py-0.5 rounded-full border border-green-200/50">SAVE 15%</p>
                                    </div>
                                    <div className="p-6 bg-white/60 backdrop-blur-md rounded-3xl border border-white/60 shadow-sm hover:shadow-md hover:border-primary/30 transition-all flex flex-col items-start">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Monthly</p>
                                        <p className="text-lg font-black text-foreground">{formatPrice(car.monthly_rate)}</p>
                                        <p className="text-[9px] font-black text-primary mt-2 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200/50">SAVE 30%</p>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-border/50 relative z-10">
                                    <BookingForm car={car} />
                                </div>
                            </div>

                            {/* Trust Badge */}
                            <div className="p-8 bg-gradient-to-br from-primary to-blue-600 rounded-[2.5rem] text-white space-y-4 shadow-2xl shadow-primary/20">
                                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                                    <Activity className="w-6 h-6" />
                                </div>
                                <h4 className="font-black text-xl tracking-tight">VIP Karachi Service</h4>
                                <p className="text-sm text-white/80 leading-relaxed font-medium">
                                    Direct delivery to DHA, Clifton, Bahria Town, or Jinnah International Airport. 24/7 Roadside assistance included.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <Footer />
        </main>
    );
}

function SpecCard({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
    return (
        <div className="bg-white/60 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] px-6 py-8 rounded-[2rem] border border-white/80 group hover:shadow-[0_20px_40px_rgba(59,130,246,0.15)] hover:-translate-y-1 transition-all duration-500 flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="w-12 h-12 rounded-2xl bg-white border border-white/60 shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                <Icon className="w-6 h-6 text-primary" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground mb-1">{label}</p>
            <p className="text-sm font-black text-foreground capitalize">{value}</p>
        </div>
    );
}

function SpecRow({ label, value }: { label: string; value: string | number }) {
    return (
        <div className="flex items-center justify-between py-4 border-b border-border/50 group hover:bg-white/40 px-3 -mx-3 rounded-2xl transition-all">
            <span className="text-sm font-bold text-muted-foreground group-hover:text-primary transition-colors">{label}</span>
            <span className="text-sm font-black text-foreground">{value}</span>
        </div>
    );
}

function FeatureList({ items }: { items: string[] }) {
    return (
        <ul className="space-y-3">
            {items.map((item, i) => (
                <li key={i} className="flex items-center space-x-3 text-sm font-bold text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full shadow-sm shadow-primary" />
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    );
}
