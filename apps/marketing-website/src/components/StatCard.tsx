import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface StatCardProps {
    label: string;
    value: string;
    icon?: React.ReactNode;
    className?: string;
}

export function StatCard({ label, value, icon, className }: StatCardProps) {
    return (
        <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className={cn(
                "glass p-6 rounded-3xl flex flex-col gap-2 relative overflow-hidden group",
                className
            )}
        >
            <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">{label}</span>
                {icon && <div className="text-primary opacity-50 group-hover:opacity-100 transition-opacity">{icon}</div>}
            </div>
            <h3 className="text-3xl font-black text-white">{value}</h3>

            {/* Glow Effect */}
            <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all" />
        </motion.div>
    );
}
