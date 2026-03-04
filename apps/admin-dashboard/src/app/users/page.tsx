'use client';

import { useState } from 'react';
import {
    Users,
    Search,
    Filter,
    MoreVertical,
    Mail,
    Phone,
    Calendar,
    Shield,
    Star,
    Download,
    Trash2,
    Lock
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { motion } from 'framer-motion';

const customers = [
    { id: 'C101', name: 'Liam Neeson', email: 'liam@example.com', phone: '9876543210', joined: '2024-01-15', totalSpend: '₹4,250', status: 'Active', bookings: 12 },
    { id: 'C102', name: 'Sarah Connor', email: 'sarah@skynet.com', phone: '8765432109', joined: '2024-02-10', totalSpend: '₹12,400', status: 'Active', bookings: 8 },
    { id: 'C103', name: 'Bruce Wayne', email: 'bruce@wayne.corp', phone: '7654321098', joined: '2023-11-20', totalSpend: '₹84,200', status: 'VIP', bookings: 24 },
    { id: 'C104', name: 'Ellen Ripley', email: 'ripley@weyland.com', phone: '6543210987', joined: '2024-03-01', totalSpend: '₹1,500', status: 'Active', bookings: 3 },
    { id: 'C105', name: 'John Wick', email: 'wick@continental.com', phone: '5432109876', joined: '2024-03-05', totalSpend: '₹3,500', status: 'Banned', bookings: 2 },
];

export default function UsersPage() {
    return (
        <div className="space-y-8 animate-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Customer Management</h1>
                    <p className="text-muted-foreground mt-1">View and manage all registered customers on the platform.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-foreground rounded-xl border border-border hover:bg-secondary/80 transition-all font-semibold">
                    <Download size={18} />
                    Export Data
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-card border border-border p-5 rounded-2xl flex items-center gap-4 group">
                    <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl group-hover:bg-blue-500 group-hover:text-white transition-all">
                        <Users size={20} />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Total Users</p>
                        <h4 className="text-xl font-bold">1,284</h4>
                    </div>
                </div>
                <div className="bg-card border border-border p-5 rounded-2xl flex items-center gap-4 group">
                    <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl group-hover:bg-emerald-500 group-hover:text-white transition-all">
                        <Shield size={20} />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Active Today</p>
                        <h4 className="text-xl font-bold">42</h4>
                    </div>
                </div>
                <div className="bg-card border border-border p-5 rounded-2xl flex items-center gap-4 group">
                    <div className="p-3 bg-violet-500/10 text-violet-500 rounded-xl group-hover:bg-violet-500 group-hover:text-white transition-all">
                        <Star size={20} />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">VIP Users</p>
                        <h4 className="text-xl font-bold">84</h4>
                    </div>
                </div>
                <div className="bg-card border border-border p-5 rounded-2xl flex items-center gap-4 group">
                    <div className="p-3 bg-destructive/10 text-destructive rounded-xl group-hover:bg-destructive group-hover:text-white transition-all">
                        <Lock size={20} />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Banned</p>
                        <h4 className="text-xl font-bold">12</h4>
                    </div>
                </div>
            </div>

            {/* Users List */}
            <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border flex items-center justify-between">
                    <div className="relative group min-w-[300px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={16} />
                        <input
                            type="text"
                            placeholder="Search name, email, phone..."
                            className="w-full bg-background border border-border rounded-xl py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-background border border-border rounded-xl text-sm font-bold hover:bg-secondary transition-all">
                        <Filter size={16} />
                        Filter
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-secondary/20 text-muted-foreground text-[10px] uppercase tracking-wider font-extrabold border-b border-border">
                                <th className="px-6 py-4">User Details</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Joined On</th>
                                <th className="px-6 py-4">Bookings</th>
                                <th className="px-6 py-4">Total Spends</th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {customers.map((user) => (
                                <tr key={user.id} className="hover:bg-secondary/30 transition-colors group">
                                    <td className="px-6 py-6">
                                        <div className="flex flex-col gap-1">
                                            <span className="font-bold text-foreground group-hover:text-primary transition-colors">{user.name}</span>
                                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                                <span className="flex items-center gap-1"><Mail size={12} /> {user.email}</span>
                                                <span className="flex items-center gap-1"><Phone size={12} /> {user.phone}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={cn(
                                            "px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest",
                                            user.status === 'Active' && "bg-emerald-500/10 text-emerald-500",
                                            user.status === 'VIP' && "bg-violet-500/10 text-violet-500",
                                            user.status === 'Banned' && "bg-destructive/10 text-destructive",
                                        )}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-xs font-medium text-muted-foreground">{user.joined}</td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-bold flex items-center gap-2">
                                            {user.bookings}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-extrabold text-sm">{user.totalSpend}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 hover:bg-secondary rounded-lg text-muted-foreground transition-all">
                                                <MoreVertical size={18} />
                                            </button>
                                            <button className="p-2 hover:bg-destructive/10 rounded-lg text-destructive transition-all">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
