'use client';

import { Bell, Search, User } from 'lucide-react';
import { useAppDispatch } from '@/hooks/redux';
import { toggleSidebar } from '@/store/slices/uiSlice';
import { motion } from 'framer-motion';

export function Navbar() {
    return (
        <header className="h-16 sticky top-0 bg-background/80 backdrop-blur-md border-b border-border z-40 px-6 flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1 max-w-xl">
                <div className="relative w-full group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search analytics, bookings, partners..."
                        className="w-full bg-secondary/50 border-none rounded-xl py-2 pl-10 pr-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground text-sm"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2.5 rounded-xl hover:bg-secondary text-muted-foreground relative"
                >
                    <Bell size={20} />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-destructive rounded-full border-2 border-background" />
                </motion.button>

                <div className="h-8 w-[1px] bg-border mx-2" />

                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-3 pl-2 cursor-pointer group"
                >
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-semibold leading-none">Alex Rivera</p>
                        <p className="text-xs text-muted-foreground mt-1">Super Admin</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary/20 to-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:border-primary/40 transition-colors">
                        <User size={20} />
                    </div>
                </motion.div>
            </div>
        </header>
    );
}
