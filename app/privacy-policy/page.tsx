import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock, Eye, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
    title: "Privacy Policy | Epic Drive Karachi",
    description: "Privacy policy for Epic Drive Karachi car rental services.",
};

const PrivacyPage = () => {
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
                            <ShieldCheck className="w-3 h-3" />
                            <span>Data Protection</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black text-foreground tracking-tighter">PRIVACY <span className="text-primary italic">POLICY</span></h1>
                        <p className="text-muted-foreground font-medium text-lg">Last updated: March 2026</p>
                    </div>

                    {/* Content */}
                    <div className="grid gap-8">
                        <section className="bg-white p-10 rounded-[2.5rem] border border-border space-y-4 shadow-sm">
                            <h2 className="text-xl font-black text-foreground flex items-center space-x-3">
                                <div className="p-2 bg-accent rounded-xl text-primary border border-border"><Eye className="w-5 h-5" /></div>
                                <span>1. Information We Collect</span>
                            </h2>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                We collect information you provide directly to us when you request a booking, including your name, email address, phone number, and rental preferences. We also collect copies of identification for verification purposes at the time of pickup.
                            </p>
                        </section>

                        <section className="bg-white p-10 rounded-[2.5rem] border border-border space-y-4 shadow-sm">
                            <h2 className="text-xl font-black text-foreground flex items-center space-x-3">
                                <div className="p-2 bg-accent rounded-xl text-primary border border-border"><Lock className="w-5 h-5" /></div>
                                <span>2. How We Use Your Data</span>
                            </h2>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Your information is used solely to process your booking, communicate with you about your rental, and improve our services. We do not sell or share your personal information with third parties for marketing purposes.
                            </p>
                        </section>

                        <section className="bg-white p-10 rounded-[2.5rem] border border-border space-y-4 shadow-sm">
                            <h2 className="text-xl font-black text-foreground flex items-center space-x-3">
                                <div className="p-2 bg-accent rounded-xl text-primary border border-border"><CheckCircle2 className="w-5 h-5" /></div>
                                <span>3. Security Measures</span>
                            </h2>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                We implement a variety of security measures to maintain the safety of your personal information. All sensitive information provided is transmitted via Secure Socket Layer (SSL) technology.
                            </p>
                        </section>
                    </div>

                    <div className="bg-accent p-10 rounded-[3rem] border border-border space-y-6">
                        <h3 className="text-2xl font-black text-foreground tracking-tight">Your Rights</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed font-medium">
                            You have the right to access, correct, or delete your personal data. If you wish to exercise these rights, please contact us at support@epicdrive.pk.
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PrivacyPage;
