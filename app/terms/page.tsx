import Link from "next/link";
import { ArrowLeft, FileText, ShieldCheck, Scale, Info } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
    title: "Terms and Conditions | Epic Drive Karachi",
    description: "Rental terms and conditions for Epic Drive Karachi car rental services.",
};

const TermsPage = () => {
    return (
        <div className="min-h-screen bg-transparent relative">
            <Navbar />

            <main className="max-w-4xl mx-auto px-4 pt-36 pb-24 relative z-10">
                <div className="space-y-12">
                    {/* Hero Section */}
                    <div className="space-y-6">
                        <Link href="/" className="inline-flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors group">
                            <div className="w-10 h-10 rounded-xl bg-accent border border-border flex items-center justify-center group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
                                <ArrowLeft className="w-4 h-4" />
                            </div>
                            <span className="text-xs font-black uppercase tracking-[0.2em]">Back to Home</span>
                        </Link>
                        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest">
                            <Scale className="w-3 h-3" />
                            <span>Legal Documents</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black text-foreground tracking-tighter">TERMS & <span className="text-primary italic">CONDITIONS</span></h1>
                        <p className="text-muted-foreground font-medium text-lg">Last updated: March 2026</p>
                    </div>

                    {/* Content */}
                    <div className="grid gap-8">
                        <section className="bg-white/70 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-white/80 space-y-4 shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative overflow-hidden group hover:shadow-[0_20px_40px_rgba(59,130,246,0.1)] transition-all duration-500">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-white/10 pointer-events-none" />
                            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-80" />
                            <h2 className="text-xl font-black text-foreground flex items-center space-x-3 relative z-10">
                                <div className="p-2 bg-white rounded-xl text-primary border border-white/60 shadow-sm"><Info className="w-5 h-5" /></div>
                                <span>1. Rental Eligibility</span>
                            </h2>
                            <p className="text-muted-foreground text-sm leading-relaxed relative z-10">
                                To rent a vehicle from Epic Drive, the driver must be at least 21 years of age and possess a valid Pakistani Driving License or a valid International Driving Permit.
                            </p>
                        </section>

                        <section className="bg-white/70 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-white/80 space-y-4 shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative overflow-hidden group hover:shadow-[0_20px_40px_rgba(59,130,246,0.1)] transition-all duration-500">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-white/10 pointer-events-none" />
                            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-80" />
                            <h2 className="text-xl font-black text-foreground flex items-center space-x-3 relative z-10">
                                <div className="p-2 bg-white rounded-xl text-primary border border-white/60 shadow-sm"><ShieldCheck className="w-5 h-5" /></div>
                                <span>2. Security Deposit</span>
                            </h2>
                            <p className="text-muted-foreground text-sm leading-relaxed relative z-10">
                                A refundable security deposit is required at the time of vehicle pickup. The amount varies based on the vehicle category. This deposit will be returned within 24 hours of vehicle return, subject to inspection.
                            </p>
                        </section>

                        <section className="bg-white/70 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-white/80 space-y-4 shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative overflow-hidden group hover:shadow-[0_20px_40px_rgba(59,130,246,0.1)] transition-all duration-500">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-white/10 pointer-events-none" />
                            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-80" />
                            <h2 className="text-xl font-black text-foreground flex items-center space-x-3 relative z-10">
                                <div className="p-2 bg-white rounded-xl text-primary border border-white/60 shadow-sm"><FileText className="w-5 h-5" /></div>
                                <span>3. Usage Policy</span>
                            </h2>
                            <p className="text-muted-foreground text-sm leading-relaxed relative z-10">
                                Our vehicles are strictly for use within city limits unless prior written permission is obtained for inter-city travel. Smoking and pet transportation are prohibited in all vehicles.
                            </p>
                        </section>

                        <section className="bg-white/70 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-white/80 space-y-4 shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative overflow-hidden group hover:shadow-[0_20px_40px_rgba(59,130,246,0.1)] transition-all duration-500">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-white/10 pointer-events-none" />
                            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-80" />
                            <h2 className="text-xl font-black text-foreground flex items-center space-x-3 relative z-10">
                                <div className="p-2 bg-white rounded-xl text-primary border border-white/60 shadow-sm"><Scale className="w-5 h-5" /></div>
                                <span>4. Fuel Policy</span>
                            </h2>
                            <p className="text-muted-foreground text-sm leading-relaxed relative z-10">
                                Vehicles are provided with a full tank of fuel and must be returned with a full tank. Alternatively, a refueling charge will be applied.
                            </p>
                        </section>
                    </div>

                    <div className="bg-primary/5 p-10 rounded-[3rem] border border-primary/20 text-center space-y-4">
                        <p className="text-sm font-black text-primary uppercase tracking-widest">Need Clarification?</p>
                        <p className="text-muted-foreground text-sm font-medium">If you have any questions regarding our terms, please feel free to contact our support team.</p>
                        <Link href="/contact" className="inline-block px-10 py-5 bg-primary text-white rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-blue-400 active:scale-95 transition-all shadow-lg shadow-primary/20">Contact Us</Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default TermsPage;
