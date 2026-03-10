import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, ArrowRight } from "lucide-react";

const Footer = () => {
    return (
        <footer className="relative pt-32 pb-16 overflow-hidden border-t border-border bg-accent/50">
            {/* Ambient Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-primary/5 blur-[120px] -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
                    {/* Brand Section */}
                    <div className="space-y-8">
                        <Link href="/" className="flex items-center space-x-3 group">
                            <div className="relative w-10 h-10 rounded-xl flex items-center justify-center drop-shadow-[0_10px_20px_rgba(59,130,246,0.3)] group-hover:rotate-12 group-hover:scale-110 transition-all overflow-hidden shrink-0">
                                <Image src="/logo.png" alt="Epic Drive Footer Logo" fill className="object-cover" sizes="40px" />
                            </div>
                            <span className="text-2xl font-black tracking-tighter text-foreground">
                                EPIC<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600 italic">DRIVE</span>
                            </span>
                        </Link>
                        <p className="text-muted-foreground text-sm font-medium leading-relaxed max-w-xs">
                            Redefining the standard of luxury car rentals in Karachi. From verified elite fleets to 24/7 concierge support, we drive your ambition.
                        </p>
                        <div className="flex space-x-3">
                            {[Facebook, Instagram, Twitter].map((Icon, i) => (
                                <a key={i} href="#" className="w-11 h-11 rounded-2xl bg-accent border border-border flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm hover:shadow-lg hover:shadow-primary/20">
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="space-y-8">
                        <h4 className="text-xs font-black uppercase tracking-[0.3em] text-foreground">The Hub</h4>
                        <ul className="space-y-4">
                            {[
                                { name: 'Home', href: '/' },
                                { name: 'Browse Fleet', href: '/cars' },
                                { name: 'Rental Terms', href: '/terms' },
                                { name: 'Privacy Policy', href: '/privacy-policy' }
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link href={item.href} className="text-muted-foreground text-sm font-bold hover:text-primary transition-colors flex items-center group">
                                        <ArrowRight className="w-3 h-3 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Categories */}
                    <div className="space-y-8">
                        <h4 className="text-xs font-black uppercase tracking-[0.3em] text-foreground">Elite Categories</h4>
                        <ul className="space-y-4">
                            {['Luxury Sedans', 'Premium SUVs', 'Electric Future', 'Verified 4x4', 'Executive Fleet'].map((item) => (
                                <li key={item}>
                                    <Link href="/cars" className="text-muted-foreground text-sm font-bold hover:text-primary transition-colors flex items-center group">
                                        <ArrowRight className="w-3 h-3 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Interface */}
                    <div className="space-y-8">
                        <h4 className="text-xs font-black uppercase tracking-[0.3em] text-foreground">Concierge</h4>
                        <ul className="space-y-6">
                            <li className="flex items-start space-x-4">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                    <MapPin className="w-5 h-5 text-primary" />
                                </div>
                                <span className="text-muted-foreground text-sm font-medium leading-relaxed">DHA Phase 6, Main Shahrah-e-Faisal, Karachi</span>
                            </li>
                            <li className="flex items-center space-x-4">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                    <Phone className="w-5 h-5 text-primary" />
                                </div>
                                <span className="text-foreground text-sm font-black">+92 336 9289269</span>
                            </li>
                            <li className="flex items-center space-x-4">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                    <Mail className="w-5 h-5 text-primary" />
                                </div>
                                <span className="text-muted-foreground text-xs font-bold truncate">zexsoftwaresolution@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-24 pt-10 border-t border-border flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
                    <div className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em] space-y-2 text-center md:text-left">
                        <p>© 2026 EPIC DRIVE KARACHI. ALL RIGHTS RESERVED.</p>
                        <p className="text-muted-foreground/30">A PREMIUM TRANSPORTATION EXPERIENCE</p>
                    </div>
                    <div className="flex flex-col items-center md:items-end space-y-2">
                        <p className="text-muted-foreground/50 text-[10px] font-black uppercase tracking-widest">Designed & Developed with ❤️</p>
                        <p className="text-primary font-black text-xs italic tracking-tighter">FOR KARACHIITES</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
