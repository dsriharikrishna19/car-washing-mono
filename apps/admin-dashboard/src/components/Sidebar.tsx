'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { toggleSidebar } from '@/store/slices/uiSlice';
import {
    LayoutDashboard,
    Users,
    Calendar,
    Settings,
    ChevronLeft,
    ChevronRight,
    Car,
    CreditCard,
    BarChart3,
    LogOut
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { motion } from 'framer-motion';

const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/' },
    { name: 'Bookings', icon: Calendar, href: '/bookings' },
    { name: 'Users', icon: Users, href: '/users' },
    { name: 'Partners', icon: Car, href: '/partners' },
    { name: 'Services', icon: Settings, href: '/services' },
    { name: 'Payments', icon: CreditCard, href: '/payments' },
    { name: 'Analytics', icon: BarChart3, href: '/analytics' },
];

export function Sidebar() {
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((state) => state.ui.sidebarOpen);

    return (
        <motion.aside
            initial={false}
            animate={{ width: isOpen ? 260 : 80 }}
            className={cn(
                "h-screen sticky top-0 bg-card border-r border-border flex flex-col transition-all duration-300 ease-in-out z-50",
                !isOpen && "items-center"
            )}
        >
            <div className="h-16 flex items-center justify-between px-6 border-b border-border">
                {isOpen ? (
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent"
                    >
                        Sparkle Admin
                    </motion.span>
                ) : (
                    <Car className="text-primary" size={24} />
                )}
            </div>

            <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto custom-scrollbar">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group relative",
                                isActive
                                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                            )}
                        >
                            <item.icon size={22} className={cn(!isActive && "group-hover:scale-110 transition-transform")} />
                            {isOpen && (
                                <motion.span
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="font-medium whitespace-nowrap"
                                >
                                    {item.name}
                                </motion.span>
                            )}
                            {isActive && !isOpen && (
                                <div className="absolute left-0 w-1 h-6 bg-white rounded-full" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-3 border-t border-border">
                <button
                    onClick={() => dispatch(toggleSidebar())}
                    className="w-full flex items-center justify-center p-3 rounded-xl hover:bg-secondary text-muted-foreground transition-all"
                >
                    {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                </button>
                <button className="w-full flex items-center gap-4 px-4 py-3 mt-2 rounded-xl text-destructive hover:bg-destructive/10 transition-all group">
                    <LogOut size={22} className="group-hover:translate-x-1 transition-transform" />
                    {isOpen && <span className="font-medium">Logout</span>}
                </button>
            </div>
        </motion.aside>
    );
}
