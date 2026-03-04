'use client';

import {
    IndianRupee,
    ArrowUpRight,
    ArrowDownLeft,
    Download,
    Calendar,
    MoreVertical,
    Filter,
    Search,
    CheckCircle2,
    Clock,
    Wallet
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { motion } from 'framer-motion';

const transactions = [
    { id: 'TX-9482', date: '2024-03-24', type: 'Payout', amount: '₹12,450', partner: 'Marcus Wright', status: 'Success', method: 'UPI' },
    { id: 'TX-9321', date: '2024-03-24', type: 'Revenue', amount: '₹2,450', customer: 'John Doe', status: 'Settled', method: 'Card' },
    { id: 'TX-9210', date: '2024-03-23', type: 'Payout', amount: '₹8,900', partner: 'Harvey Specter', status: 'Pending', method: 'NEFT' },
    { id: 'TX-9105', date: '2024-03-23', type: 'Revenue', amount: '₹500', customer: 'Sarah Smith', status: 'Settled', method: 'UPI' },
    { id: 'TX-8942', date: '2024-03-22', type: 'Payout', amount: '₹32,100', partner: 'Mike Ross', status: 'Success', method: 'Bank Transfer' },
];

export default function PaymentsPage() {
    return (
        <div className="space-y-8 animate-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Financials</h1>
                    <p className="text-muted-foreground mt-1">Track platform revenue, payouts, and financial settlements.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-secondary rounded-xl px-4 py-2 border border-border">
                        <Calendar size={18} className="text-muted-foreground" />
                        <span className="text-sm font-bold whitespace-nowrap">Mar 2024</span>
                    </div>
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-bold hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-95">
                        <Download size={20} />
                        Export
                    </button>
                </div>
            </div>

            {/* Financial Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-card border border-border p-6 rounded-2xl flex flex-col justify-between group">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2.5 bg-blue-500/10 text-blue-500 rounded-xl">
                            <Wallet size={20} />
                        </div>
                        <span className="text-[10px] font-extrabold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full uppercase">+12%</span>
                    </div>
                    <p className="text-sm text-muted-foreground font-medium">Total Revenue</p>
                    <h4 className="text-2xl font-bold mt-1 group-hover:text-primary transition-colors">₹4,82,450</h4>
                </div>
                <div className="bg-card border border-border p-6 rounded-2xl flex flex-col justify-between group">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2.5 bg-emerald-500/10 text-emerald-500 rounded-xl">
                            <ArrowUpRight size={20} />
                        </div>
                    </div>
                    <p className="text-sm text-muted-foreground font-medium">Monthly Growth</p>
                    <h4 className="text-2xl font-bold mt-1 group-hover:text-emerald-500 transition-colors">₹84,200</h4>
                </div>
                <div className="bg-card border border-border p-6 rounded-2xl flex flex-col justify-between group">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2.5 bg-orange-500/10 text-orange-500 rounded-xl">
                            <ArrowDownLeft size={20} />
                        </div>
                    </div>
                    <p className="text-sm text-muted-foreground font-medium">Partner Payouts</p>
                    <h4 className="text-2xl font-bold mt-1 group-hover:text-orange-500 transition-colors">₹3,42,100</h4>
                </div>
                <div className="bg-card border border-border p-6 rounded-2xl flex flex-col justify-between group">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2.5 bg-violet-500/10 text-violet-500 rounded-xl">
                            <IndianRupee size={20} />
                        </div>
                    </div>
                    <p className="text-sm text-muted-foreground font-medium">Platform Fees</p>
                    <h4 className="text-2xl font-bold mt-1 group-hover:text-violet-500 transition-colors">₹56,150</h4>
                </div>
            </div>

            {/* Transaction Table */}
            <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border flex items-center justify-between bg-secondary/10">
                    <div className="flex items-center gap-4">
                        <div className="relative group min-w-[300px]">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={16} />
                            <input
                                type="text"
                                placeholder="Search transaction ID, partner..."
                                className="w-full bg-background border border-border rounded-xl py-2 pl-10 pr-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all text-xs"
                            />
                        </div>
                        <button className="flex items-center gap-2 px-3 py-2 bg-background border border-border rounded-xl text-xs font-bold hover:bg-secondary transition-all">
                            <Filter size={14} />
                            Status
                        </button>
                    </div>
                    <h3 className="text-sm font-bold">Latest Transactions</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-secondary/50 text-muted-foreground text-[10px] uppercase tracking-wider font-extrabold border-b border-border">
                                <th className="px-6 py-4">Transaction ID</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Type</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4">Entity</th>
                                <th className="px-6 py-4">Method</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {transactions.map((tx) => (
                                <tr key={tx.id} className="hover:bg-secondary/30 transition-colors border-b border-border last:border-0 group">
                                    <td className="px-6 py-4 text-xs font-bold font-mono text-primary">{tx.id}</td>
                                    <td className="px-6 py-4 text-xs text-muted-foreground font-medium">{tx.date}</td>
                                    <td className="px-6 py-4">
                                        <span className={cn(
                                            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold",
                                            tx.type === 'Revenue' ? "bg-emerald-500/10 text-emerald-500" : "bg-blue-500/10 text-blue-500"
                                        )}>
                                            {tx.type === 'Revenue' ? <ArrowUpRight size={10} /> : <ArrowDownLeft size={10} />}
                                            {tx.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-extrabold text-foreground">{tx.amount}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-semibold">{tx.partner || tx.customer}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-xs font-medium text-muted-foreground">{tx.method}</td>
                                    <td className="px-6 py-4">
                                        <div className={cn(
                                            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase",
                                            tx.status === 'Success' || tx.status === 'Settled' ? "text-emerald-500" : "text-orange-500"
                                        )}>
                                            <div className={cn(
                                                "w-1.5 h-1.5 rounded-full",
                                                tx.status === 'Success' || tx.status === 'Settled' ? "bg-emerald-500" : "bg-orange-500 animate-pulse"
                                            )} />
                                            {tx.status}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 hover:bg-secondary rounded-lg text-muted-foreground transition-colors opacity-0 group-hover:opacity-100">
                                            <MoreVertical size={16} />
                                        </button>
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
