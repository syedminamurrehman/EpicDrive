"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Car,
    BookOpen,
    Users,
    Settings,
    BarChart3,
    LogOut,
    ChevronRight,
    Menu,
    X
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        document.cookie = "admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        router.push("/admin/login");
        router.refresh();
    };

    const menuItems = [
        { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { name: "Manage Fleet", href: "/admin/fleet", icon: Car },
        { name: "Bookings", href: "/admin/bookings", icon: BookOpen },
        { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
        { name: "Customers", href: "/admin/customers", icon: Users },
    ];

    return (
        <div className="min-h-screen bg-[#F8F9FC] flex">
            {/* Sidebar */}
            <aside
                className={cn(
                    "bg-white border-r border-border transition-all duration-300 z-50 fixed lg:relative h-full",
                    isSidebarOpen ? "w-72" : "w-20"
                )}
            >
                <div className="h-full flex flex-col p-4">
                    {/* Logo Area */}
                    <div className="h-16 flex items-center px-4 mb-8">
                        <Link href="/" className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shrink-0">
                                <Car className="text-white w-6 h-6" />
                            </div>
                            {isSidebarOpen && (
                                <span className="text-xl font-bold tracking-tight text-foreground">
                                    Epic<span className="text-primary italic">Drive</span>
                                </span>
                            )}
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-2">
                        {menuItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center space-x-4 px-4 py-3.5 rounded-2xl transition-all group relative",
                                        isActive
                                            ? "bg-primary text-white shadow-lg shadow-primary/20"
                                            : "text-muted-foreground hover:bg-accent hover:text-primary"
                                    )}
                                >
                                    <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "group-hover:text-primary")} />
                                    {isSidebarOpen && <span className="text-sm font-bold tracking-wide">{item.name}</span>}
                                    {isActive && isSidebarOpen && (
                                        <ChevronRight className="w-4 h-4 ml-auto text-white/50" />
                                    )}
                                    {!isSidebarOpen && isActive && (
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-primary rounded-r-full" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User Section / Footer */}
                    <div className="mt-auto pt-8 border-t border-border px-2">
                        <button
                            onClick={handleLogout}
                            className="flex items-center space-x-4 w-full px-4 py-4 rounded-2xl text-red-500 hover:bg-red-50 transition-all font-bold"
                        >
                            <LogOut className="w-5 h-5" />
                            {isSidebarOpen && <span className="text-sm uppercase tracking-widest">Logout</span>}
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0">
                <header className="h-20 bg-white border-b border-border flex items-center justify-between px-8 sticky top-0 z-40">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 bg-accent text-primary rounded-xl hover:scale-105 transition-all"
                    >
                        {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>

                    <div className="flex items-center space-x-6">
                        <div className="hidden md:block text-right">
                            <p className="text-sm font-bold text-foreground">Admin User</p>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Super Admin</p>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center font-black text-primary">
                            A
                        </div>
                    </div>
                </header>

                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
