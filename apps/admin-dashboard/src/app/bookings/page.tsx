'use client';

import { useState } from 'react';
import {
    Search,
    Filter,
    Download,
    Plus,
    MoreHorizontal,
    Calendar,
    User,
    Car,
    Clock,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { motion, AnimatePresence } from 'framer-motion';

const bookingsData = [
    { id: 'BW-1001', customer: 'Liam Neeson', phone: '+91 98765 43210', service: 'Full Detailing', date: '2024-03-24', time: '10:30 AM', partner: 'Unassigned', status: 'Pending', amount: '₹2,450' },
    { id: 'BW-1002', customer: 'Sarah Connor', phone: '+91 87654 32109', service: 'Exterior Wash', date: '2024-03-24', time: '11:00 AM', partner: 'Marcus Wright', status: 'In Progress', amount: '₹500' },
    { id: 'BW-1003', customer: 'Bruce Wayne', phone: '+91 76543 21098', service: 'Ceramic Coating', date: '2024-03-23', time: '02:00 PM', partner: 'Alfred Pennyworth', status: 'Completed', amount: '₹12,000' },
    { id: 'BW-1004', customer: 'Ellen Ripley', phone: '+91 65432 10987', service: 'Interior Cleaning', date: '2024-03-25', time: '09:00 AM', partner: 'Bishop', status: 'Scheduled', amount: '₹1,500' },
    { id: 'BW-1005', customer: 'John Wick', phone: '+91 54321 09876', service: 'Engine Detailing', date: '2024-03-24', time: '04:30 PM', partner: 'Unassigned', status: 'Pending', amount: '₹3,500' },
];

export default function BookingsPage() {
    const [filterStatus, setFilterStatus] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredBookings = bookingsData.filter(b =>
        (filterStatus === 'All' || b.status === filterStatus) &&
        (b.customer.toLowerCase().includes(searchTerm.toLowerCase()) || b.id.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="space-y-8 animate-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Bookings</h1>
                    <p className="text-muted-foreground mt-1">Manage and monitor all car wash appointments.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-secondary text-foreground rounded-xl border border-border hover:bg-secondary/80 transition-all font-semibold">
                        <Download size={18} />
                        Export
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-bold hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-95">
                        <Plus size={20} />
                        New Booking
                    </button>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="bg-card border border-border p-4 rounded-2xl flex flex-col md:flex-row items-center gap-4">
                <div className="relative flex-1 w-full group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search by ID or customer name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-background border border-border rounded-xl py-2 pl-10 pr-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                    />
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                    {['All', 'Pending', 'Scheduled', 'In Progress', 'Completed', 'Cancelled'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={cn(
                                "px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap",
                                filterStatus === status
                                    ? "bg-primary/10 text-primary border border-primary/20 shadow-sm shadow-primary/10"
                                    : "text-muted-foreground hover:bg-secondary hover:text-foreground border border-transparent"
                            )}
                        >
                            {status}
                        </button>
                    ))}
                    <div className="h-6 w-[1px] bg-border mx-2 hidden md:block" />
                    <button className="p-2 rounded-xl border border-border text-muted-foreground hover:bg-secondary hover:text-foreground transition-all">
                        <Filter size={18} />
                    </button>
                </div>
            </div>

            {/* Bookings Table */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto overflow-y-hidden">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-secondary/50 text-muted-foreground text-xs uppercase tracking-wider font-bold">
                                <th className="px-6 py-5">Order ID</th>
                                <th className="px-6 py-5">Customer</th>
                                <th className="px-6 py-5">Service</th>
                                <th className="px-6 py-5">Date & Time</th>
                                <th className="px-6 py-5">Partner</th>
                                <th className="px-6 py-5">Amount</th>
                                <th className="px-6 py-5">Status</th>
                                <th className="px-6 py-5 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            <AnimatePresence mode="popLayout">
                                {filteredBookings.map((booking) => (
                                    <motion.tr
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        key={booking.id}
                                        className="hover:bg-secondary/30 transition-colors group"
                                    >
                                        <td className="px-6 py-5 text-sm font-bold text-primary">{booking.id}</td>
                                        <td className="px-6 py-5">
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-foreground group-hover:text-primary transition-colors">{booking.customer}</span>
                                                <span className="text-xs text-muted-foreground mt-0.5">{booking.phone}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-sm text-foreground">{booking.service}</td>
                                        <td className="px-6 py-5">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium">{booking.date}</span>
                                                <span className="text-xs text-muted-foreground mt-0.5">{booking.time}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            {booking.partner === 'Unassigned' ? (
                                                <button className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary rounded-lg text-xs font-bold hover:bg-primary transition-all hover:text-white">
                                                    <Car size={12} />
                                                    Assign
                                                </button>
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-[10px] font-bold">
                                                        {booking.partner.charAt(0)}
                                                    </div>
                                                    <span className="text-sm">{booking.partner}</span>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-5 font-bold text-sm">{booking.amount}</td>
                                        <td className="px-6 py-5">
                                            <div className={cn(
                                                "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider",
                                                booking.status === 'Completed' && "bg-emerald-500/10 text-emerald-500",
                                                booking.status === 'In Progress' && "bg-blue-500/10 text-blue-500",
                                                booking.status === 'Pending' && "bg-orange-500/10 text-orange-500",
                                                booking.status === 'Scheduled' && "bg-violet-500/10 text-violet-500",
                                                booking.status === 'Cancelled' && "bg-destructive/10 text-destructive",
                                            )}>
                                                {booking.status === 'In Progress' && <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />}
                                                {booking.status === 'Completed' && <CheckCircle2 size={10} />}
                                                {booking.status === 'Pending' && <AlertCircle size={10} />}
                                                {booking.status}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <button className="p-2 hover:bg-secondary rounded-lg text-muted-foreground transition-colors">
                                                <MoreHorizontal size={18} />
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                    {filteredBookings.length === 0 && (
                        <div className="py-20 flex flex-col items-center justify-center text-muted-foreground">
                            <Search size={48} className="mb-4 opacity-20" />
                            <p className="text-lg font-medium">No bookings found</p>
                            <p className="text-sm">Try adjusting your filters or search term</p>
                        </div>
                    )}
                </div>
                <div className="px-6 py-4 bg-secondary/20 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
                    <span>Showing {filteredBookings.length} of {bookingsData.length} records</span>
                    <div className="flex items-center gap-1">
                        <button className="p-2 rounded-lg hover:bg-secondary disabled:opacity-30" disabled>Previous</button>
                        <div className="px-4 py-2 bg-primary text-white rounded-lg font-bold">1</div>
                        <button className="p-2 rounded-lg hover:bg-secondary disabled:opacity-30" disabled>Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
