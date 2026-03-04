'use client';

import { useState } from 'react';
import {
    Search,
    MapPin,
    Star,
    Car,
    Phone,
    MoreVertical,
    CheckCircle,
    BadgeCheck,
    TrendingUp,
    Clock
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { motion } from 'framer-motion';

const partners = [
    { id: 'P1', name: 'Marcus Wright', rating: 4.9, jobs: 124, status: 'Online', earnings: '₹18,500', phone: '9876543210', location: 'Indiranagar, BLR', verified: true },
    { id: 'P2', name: 'Harvey Specter', rating: 4.8, jobs: 89, status: 'Online', earnings: '₹12,400', phone: '8765432109', location: 'Koramangala, BLR', verified: true },
    { id: 'P3', name: 'Mike Ross', rating: 4.7, jobs: 215, status: 'Offline', earnings: '₹32,100', phone: '7654321098', location: 'HSR Layout, BLR', verified: true },
    { id: 'P4', name: 'Donna Paulsen', rating: 5.0, jobs: 56, status: 'Busy', earnings: '₹8,900', phone: '6543210987', location: 'Whitefield, BLR', verified: false },
    { id: 'P5', name: 'Louis Litt', rating: 4.2, jobs: 42, status: 'Offline', earnings: '₹6,200', phone: '5432109876', location: 'Jayanagar, BLR', verified: true },
];

export default function PartnersPage() {
    return (
        <div className="space-y-8 animate-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Service Partners</h1>
                    <p className="text-muted-foreground mt-1">Manage, verify and monitor platform car wash professionals.</p>
                </div>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-bold hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-95">
                    Invite New Partner
                </button>
            </div>

            {/* Partner Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-card border border-border p-6 rounded-2xl flex items-center justify-between">
                    <div>
                        <p className="text-sm text-muted-foreground mb-1">Active Partners</p>
                        <h4 className="text-3xl font-bold">32 <span className="text-sm font-medium text-emerald-500 text-[12px]">+4 today</span></h4>
                    </div>
                    <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl">
                        <CheckCircle size={24} />
                    </div>
                </div>
                <div className="bg-card border border-border p-6 rounded-2xl flex items-center justify-between">
                    <div>
                        <p className="text-sm text-muted-foreground mb-1">Avg. Daily Earnings</p>
                        <h4 className="text-3xl font-bold">₹1,850</h4>
                    </div>
                    <div className="p-3 bg-primary/10 text-primary rounded-xl">
                        <TrendingUp size={24} />
                    </div>
                </div>
                <div className="bg-card border border-border p-6 rounded-2xl flex items-center justify-between">
                    <div>
                        <p className="text-sm text-muted-foreground mb-1">Waitlist Applications</p>
                        <h4 className="text-3xl font-bold">14</h4>
                    </div>
                    <div className="p-3 bg-orange-500/10 text-orange-500 rounded-xl">
                        <Clock size={24} />
                    </div>
                </div>
            </div>

            {/* Partners List */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {partners.map((partner) => (
                    <motion.div
                        key={partner.id}
                        whileHover={{ scale: 1.01 }}
                        className="bg-card border border-border p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-start gap-4 relative group"
                    >
                        <div className="relative">
                            <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center text-xl font-bold text-primary border border-border">
                                {partner.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className={cn(
                                "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-4 border-card",
                                partner.status === 'Online' ? "bg-emerald-500" : partner.status === 'Busy' ? "bg-orange-500" : "bg-slate-500"
                            )} />
                        </div>

                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{partner.name}</h3>
                                {partner.verified && <BadgeCheck size={18} className="text-primary" />}
                            </div>

                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
                                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                    <MapPin size={14} />
                                    {partner.location}
                                </div>
                                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                    <Star size={14} className="text-orange-400 fill-orange-400" />
                                    <span className="font-bold text-foreground">{partner.rating}</span> ({partner.jobs} jobs)
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 bg-secondary/50 rounded-xl">
                                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Status</p>
                                    <p className={cn(
                                        "text-sm font-bold",
                                        partner.status === 'Online' ? "text-emerald-500" : partner.status === 'Busy' ? "text-orange-500" : "text-muted-foreground"
                                    )}>{partner.status}</p>
                                </div>
                                <div className="p-3 bg-secondary/50 rounded-xl">
                                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Life Earnings</p>
                                    <p className="text-sm font-bold text-foreground">{partner.earnings}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <button className="p-2 hover:bg-secondary rounded-xl text-muted-foreground transition-all">
                                <MoreVertical size={20} />
                            </button>
                            <button className="p-2.5 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-xl transition-all">
                                <Phone size={18} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
