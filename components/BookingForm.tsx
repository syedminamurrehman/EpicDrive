"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Car } from "@/types";
import { useState, useEffect } from "react";
import { formatPrice, cn } from "@/lib/utils";
import { Calendar, Loader2, ArrowRight, CheckCircle2 } from "lucide-react";
import { carService } from "@/services/carService";
import { differenceInDays } from "date-fns";

const bookingSchema = z.object({
    fullName: z.string().min(3, "Full name required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().regex(/^((\+92)|(0092)|(0))3[0-9]{9}$/, "Enter a valid Pakistan phone number (03xx...)"),
    pickupDate: z.string().min(1, "Pickup date required"),
    returnDate: z.string().min(1, "Return date required"),
    termsAccepted: z.boolean().refine(val => val === true, "You must accept the terms and conditions"),
}).refine((data) => {
    const start = new Date(data.pickupDate);
    const end = new Date(data.returnDate);
    return end > start;
}, {
    message: "Return date must be after pickup date",
    path: ["returnDate"],
});

type BookingFormValues = z.infer<typeof bookingSchema>;

const BookingForm = ({ car }: { car: Car }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [pricingDetails, setPricingDetails] = useState<{
        days: number;
        weeks: number;
        months: number;
        remainingDays: number;
        total: number;
    } | null>(null);

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<BookingFormValues>({
        resolver: zodResolver(bookingSchema),
    });

    const pickupDate = watch("pickupDate");
    const returnDate = watch("returnDate");

    const today = new Date().toISOString().split('T')[0];

    useEffect(() => {
        if (pickupDate && returnDate) {
            const start = new Date(pickupDate);
            const end = new Date(returnDate);
            const totalDays = differenceInDays(end, start);

            if (totalDays > 0) {
                let months = Math.floor(totalDays / 30);
                let remainingAfterMonths = totalDays % 30;
                let weeks = Math.floor(remainingAfterMonths / 7);
                let remainingDays = remainingAfterMonths % 7;

                // Precision Pricing Logic:
                // If a month of daily rates is more expensive than the monthly rate, use monthly rate.
                // Same for weekly.
                const monthlyCharge = months * car.monthly_rate;
                const weeklyCharge = weeks * car.weekly_rate;
                const dailyCharge = remainingDays * car.daily_rate;

                setPricingDetails({
                    days: totalDays,
                    months,
                    weeks,
                    remainingDays,
                    total: monthlyCharge + weeklyCharge + dailyCharge
                });
            } else {
                setPricingDetails(null);
            }
        } else {
            setPricingDetails(null);
        }
    }, [pickupDate, returnDate, car]);

    const onSubmit = async (data: BookingFormValues) => {
        if (!pricingDetails) return;
        setIsSubmitting(true);
        try {
            await carService.createBooking({
                car_id: car.id,
                full_name: data.fullName,
                email: data.email,
                phone: data.phone,
                pickup_date: new Date(data.pickupDate).toISOString(),
                return_date: new Date(data.returnDate).toISOString(),
                total_cost: pricingDetails.total,
                status: 'pending'
            });
            setIsSuccess(true);
            reset();
        } catch (error) {
            console.error(error);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="bg-green-50 rounded-[3rem] border border-green-200 p-10 text-center space-y-6 animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
                    <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                    <h3 className="text-2xl font-black text-foreground tracking-tight">Booking Requested!</h3>
                    <p className="text-sm font-medium text-green-700/80 leading-relaxed">
                        Your request for the {car.brand} {car.name} has been received. Our team in Karachi will contact you within 30 minutes to confirm availability.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={() => setIsSuccess(false)}
                        className="flex-1 py-4 bg-accent border border-border text-foreground rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-border transition-all"
                    >
                        Book Another
                    </button>
                    <a
                        href={`https://wa.me/923369289269?text=Salam! I just requested a booking for ${car.brand} ${car.name}. Please confirm availability.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-[2] py-4 bg-[#25D366] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#128C7E] transition-all flex items-center justify-center space-x-2"
                    >
                        <span>Confirm via WhatsApp</span>
                    </a>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
                <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Full Name</label>
                    <input
                        {...register("fullName")}
                        className={cn(
                            "w-full p-4 bg-accent border rounded-2xl text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 transition-all outline-none",
                            errors.fullName ? "border-red-500 focus:ring-red-500/20" : "border-border focus:ring-primary/20 focus:border-primary/30"
                        )}
                        placeholder="Muhammad Ali"
                    />
                    {errors.fullName && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.fullName.message}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Email</label>
                        <input
                            {...register("email")}
                            className={cn(
                                "w-full p-4 bg-accent border rounded-2xl text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 transition-all outline-none",
                                errors.email ? "border-red-500 focus:ring-red-500/20" : "border-border focus:ring-primary/20 focus:border-primary/30"
                            )}
                            placeholder="ali@karachi.com"
                        />
                        {errors.email && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.email.message}</p>}
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Phone</label>
                        <input
                            {...register("phone")}
                            className={cn(
                                "w-full p-4 bg-accent border rounded-2xl text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 transition-all outline-none",
                                errors.phone ? "border-red-500 focus:ring-red-500/20" : "border-border focus:ring-primary/20 focus:border-primary/30"
                            )}
                            placeholder="0300 1234567"
                        />
                        {errors.phone && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.phone.message}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Pickup Date</label>
                        <div className="relative">
                            <input
                                type="date"
                                min={today}
                                {...register("pickupDate")}
                                className={cn(
                                    "w-full p-4 pl-12 bg-accent border rounded-2xl text-sm text-foreground transition-all outline-none appearance-none focus:ring-1 focus:ring-primary/30",
                                    errors.pickupDate ? "border-red-500" : "border-border focus:border-primary/30"
                                )}
                            />
                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                        </div>
                        {errors.pickupDate && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.pickupDate.message}</p>}
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Return Date</label>
                        <div className="relative">
                            <input
                                type="date"
                                min={pickupDate || today}
                                {...register("returnDate")}
                                className={cn(
                                    "w-full p-4 pl-12 bg-accent border rounded-2xl text-sm text-foreground transition-all outline-none appearance-none focus:ring-1 focus:ring-primary/30",
                                    errors.returnDate ? "border-red-500" : "border-border focus:border-primary/30"
                                )}
                            />
                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                        </div>
                        {errors.returnDate && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.returnDate.message}</p>}
                    </div>
                </div>
            </div>

            {pricingDetails && (
                <div className="p-6 bg-primary/5 rounded-[2rem] border border-primary/10 space-y-4 animate-in fade-in slide-in-from-top-2 duration-500">
                    <div className="flex justify-between items-center border-b border-primary/10 pb-3">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Duration</span>
                        <span className="text-sm font-black text-foreground">{pricingDetails.days} Days in Karachi</span>
                    </div>

                    <div className="space-y-2">
                        {pricingDetails.months > 0 && (
                            <div className="flex justify-between text-xs font-medium">
                                <span className="text-muted-foreground">{pricingDetails.months} Month(s)</span>
                                <span className="text-foreground">{formatPrice(pricingDetails.months * car.monthly_rate)}</span>
                            </div>
                        )}
                        {pricingDetails.weeks > 0 && (
                            <div className="flex justify-between text-xs font-medium">
                                <span className="text-muted-foreground">{pricingDetails.weeks} Week(s)</span>
                                <span className="text-foreground">{formatPrice(pricingDetails.weeks * car.weekly_rate)}</span>
                            </div>
                        )}
                        {pricingDetails.remainingDays > 0 && (
                            <div className="flex justify-between text-xs font-medium">
                                <span className="text-muted-foreground">{pricingDetails.remainingDays} Day(s)</span>
                                <span className="text-foreground">{formatPrice(pricingDetails.remainingDays * car.daily_rate)}</span>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-between items-center pt-3 border-t border-primary/20">
                        <span className="text-sm font-black text-foreground">Total Estimate</span>
                        <span className="text-2xl font-black text-primary">{formatPrice(pricingDetails.total)}</span>
                    </div>
                </div>
            )}

            <div className="space-y-4">
                <label className="flex items-start space-x-3 cursor-pointer group">
                    <div className="relative flex items-center mt-1">
                        <input
                            type="checkbox"
                            {...register("termsAccepted")}
                            className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-border bg-accent transition-all checked:bg-primary checked:border-primary"
                        />
                        <CheckCircle2 className="absolute h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100 left-[3px] transition-opacity" />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground select-none group-hover:text-foreground transition-colors">
                        I accept the <Link href="/terms" className="text-primary hover:underline font-bold">Rental Terms</Link> and <Link href="/privacy-policy" className="text-primary hover:underline font-bold">Privacy Policy</Link>. I understand a security deposit is required.
                    </span>
                </label>
                {errors.termsAccepted && (
                    <p className="text-[10px] text-red-500 font-bold ml-8">{errors.termsAccepted.message}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={isSubmitting || !pricingDetails}
                className="w-full py-5 bg-primary text-white rounded-[1.5rem] font-black text-sm uppercase tracking-widest flex items-center justify-center space-x-3 shadow-xl shadow-primary/20 hover:bg-primary/90 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 group"
            >
                {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                    <>
                        <span>Submit Booking Request</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                )}
            </button>
        </form>
    );
};

export default BookingForm;
