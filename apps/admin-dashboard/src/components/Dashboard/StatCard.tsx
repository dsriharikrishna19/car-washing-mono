'use client';

import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface StatCardProps {
    title: string;
    value: string;
    change: string;
    isPositive: boolean;
    icon: LucideIcon;
    color: string;
}

export function StatCard({ title, value, change, isPositive, icon: Icon, color }: StatCardProps) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border p-6 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all group"
        >
            <div className="flex justify-between items-start mb-4">
                <div className={cn("p-3 rounded-xl", color)}>
                    <Icon size={24} className="text-white" />
                </div>
                <div className={cn(
                    "px-2 py-1 rounded-lg text-xs font-bold",
                    isPositive ? "bg-emerald-500/10 text-emerald-500" : "bg-destructive/10 text-destructive"
                )}>
                    {isPositive ? '+' : ''}{change}%
                </div>
            </div>
            <div>
                <p className="text-muted-foreground text-sm font-medium">{title}</p>
                <h3 className="text-3xl font-bold mt-1 tracking-tight group-hover:text-primary transition-colors">{value}</h3>
            </div>

            {/* Background Decor */}
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-5 transition-opacity">
                <Icon size={80} />
            </div>
        </motion.div>
    );
}
