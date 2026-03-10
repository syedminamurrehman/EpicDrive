import { Search, CalendarDays, ShieldCheck, CarFront, Zap } from "lucide-react";

const steps = [
    {
        icon: Search,
        title: "Choose Vehicle",
        description: "Browse our premium fleet and select the car that fits your style and needs."
    },
    {
        icon: Zap,
        title: "Submit Request",
        description: "Select your dates and provide basic details. Our team will contact you within 30 minutes."
    },
    {
        icon: ShieldCheck,
        title: "Fast Verification",
        description: "Quick document check-up and security confirmation for a hassle-free experience."
    },
    {
        icon: CarFront,
        title: "Enjoy the Drive",
        description: "Pick up your keys or have the car delivered to your doorstep across Karachi."
    }
];

const HowItWorks = () => {
    return (
        <section className="py-32 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center space-y-4 mb-24">
                    <div className="inline-flex items-center space-x-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest">
                        <span>The Elite Protocol</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black text-foreground tracking-tighter">
                        HOW IT <span className="text-primary italic">WORKS</span>
                    </h2>
                    <p className="text-muted-foreground font-medium max-w-2xl mx-auto text-lg leading-relaxed">
                        We've simplified the car rental process to be as fast as Karachi's pulse. 4 simple steps to get you on the road.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {steps.map((step, index) => (
                        <div key={index} className="relative group">
                            {/* Connector Line */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-[60px] left-[70%] w-full h-px bg-gradient-to-r from-primary/30 to-transparent z-0">
                                    <div className="w-full h-full bg-gradient-to-r from-transparent via-primary/50 to-transparent blur-[2px]" />
                                </div>
                            )}

                            <div className="relative z-10 flex flex-col items-center text-center space-y-8 p-10 bg-white/70 backdrop-blur-2xl rounded-[3rem] border border-white/80 hover:border-white transition-all duration-700 hover:shadow-[0_20px_40px_rgba(59,130,246,0.15)] shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden">
                                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-80" />
                                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-white/10 pointer-events-none" />

                                <div className="relative w-24 h-24 bg-white text-primary rounded-[2.5rem] flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-blue-600 group-hover:text-white group-hover:scale-110 group-hover:-rotate-3 transition-all duration-700 shadow-xl shadow-black/[0.04] border border-white/60 group-hover:border-transparent group-hover:shadow-[0_15px_30px_rgba(59,130,246,0.3)] z-10">
                                    <step.icon className="w-10 h-10 transition-transform duration-700" />
                                </div>
                                <div className="space-y-4 relative z-10">
                                    <div className="flex items-center justify-center space-x-2">
                                        <div className="px-3 py-1 rounded-full bg-white/80 border border-white shadow-sm">
                                            <span className="text-primary font-black text-[10px] uppercase tracking-[0.3em]">Step 0{index + 1}</span>
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-black text-foreground tracking-tight">{step.title}</h3>
                                    <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>

                                {/* Orbit Effect */}
                                <div className="absolute inset-0 rounded-[3rem] border border-primary/0 group-hover:border-primary/20 transition-colors duration-700 pointer-events-none" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
