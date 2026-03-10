"use client";

import { BarChart3, TrendingUp, Users, Calendar, DollarSign, ArrowUpRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export default function AnalyticsPage() {
    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-3xl font-black text-foreground tracking-tight">Fleet Analytics</h1>
                <p className="text-sm font-medium text-muted-foreground">Performance insights for Epic Drive Karachi operations.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard label="Monthly Revenue" value="PKR 4.8M" trend="+12.5%" icon={DollarSign} color="text-green-600" />
                <StatCard label="Active Customers" value="482" trend="+8%" icon={Users} color="text-primary" />
                <StatCard label="Fleet Utilization" value="92%" trend="+4.2%" icon={BarChart3} color="text-blue-600" />
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] border border-border shadow-sm h-96 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mb-4">
                    <TrendingUp className="w-8 h-8 text-primary opacity-40" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Revenue Growth Chart</h3>
                <p className="text-sm text-muted-foreground mt-2 max-w-sm">
                    Interactive data visualizations are being synchronized with your Karachi fleet data.
                </p>
                <div className="mt-8 flex space-x-2">
                    {[40, 70, 45, 90, 65, 80, 50, 95].map((h, i) => (
                        <div key={i} className="w-8 bg-primary/10 rounded-t-lg relative group overflow-hidden" style={{ height: `${h}%` }}>
                            <div className="absolute inset-x-0 bottom-0 bg-primary transition-all duration-1000" style={{ height: '0%' }} id={`bar-${i}`} />
                        </div>
                    ))}
                </div>
            </div>

            <script dangerouslySetInnerHTML={{
                __html: `
                setTimeout(() => {
                    for(let i=0; i<8; i++) {
                        const bar = document.getElementById('bar-' + i);
                        if(bar) bar.style.height = '100%';
                    }
                }, 100);
            `}} />
        </div>
    );
}

function StatCard({ label, value, trend, icon: Icon, color }: any) {
    return (
        <div className="bg-white p-8 rounded-[2rem] border border-border shadow-sm hover:translate-y-[-4px] transition-all">
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-accent rounded-xl">
                    <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex items-center space-x-1 text-[10px] font-black text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    <span>{trend}</span>
                    <ArrowUpRight className="w-3 h-3" />
                </div>
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">{label}</p>
            <h3 className="text-2xl font-black text-foreground">{value}</h3>
        </div>
    );
}
