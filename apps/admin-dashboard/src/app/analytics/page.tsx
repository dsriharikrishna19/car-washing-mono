'use client';

import { useEffect, useRef } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line
} from 'recharts';
import {
    TrendingUp,
    Users,
    Calendar,
    IndianRupee,
    Activity,
    ArrowUpRight,
    Monitor,
    Smartphone
} from 'lucide-react';
import { cn } from '@/utils/cn';
import gsap from 'gsap';

const revenueData = [
    { month: 'Jan', revenue: 45000 },
    { month: 'Feb', revenue: 52000 },
    { month: 'Mar', revenue: 48000 },
    { month: 'Apr', revenue: 61000 },
    { month: 'May', revenue: 55000 },
    { month: 'Jun', revenue: 67000 },
];

const categoryData = [
    { name: 'Wash', value: 400 },
    { name: 'Detailing', value: 300 },
    { name: 'Ceramic', value: 200 },
    { name: 'Interior', value: 100 },
];

const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b'];

export default function AnalyticsPage() {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.stat-card', {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out'
            });
            gsap.from('.chart-container', {
                scale: 0.95,
                opacity: 0,
                duration: 1,
                delay: 0.4,
                ease: 'power2.out'
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Analytics</h1>
                    <p className="text-muted-foreground mt-1">Deep dive into platform data and performance trends.</p>
                </div>
                <div className="flex items-center gap-3">
                    <select className="bg-secondary/50 border border-border px-4 py-2 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-primary/20">
                        <option>Last 6 Months</option>
                        <option>Last 12 Months</option>
                        <option>All Time</option>
                    </select>
                </div>
            </div>

            {/* Grid Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Avg. Order Value', value: '₹1,450', change: '+5.2%', icon: IndianRupee, color: 'text-blue-500' },
                    { label: 'Conversion Rate', value: '3.2%', change: '+0.8%', icon: Activity, color: 'text-emerald-500' },
                    { label: 'Active Sessions', value: '142', change: '+12%', icon: Users, color: 'text-violet-500' },
                    { label: 'Retention Rate', value: '68%', change: '+2.4%', icon: TrendingUp, color: 'text-orange-500' },
                ].map((stat, i) => (
                    <div key={i} className="stat-card bg-card border border-border p-6 rounded-2xl">
                        <div className="flex justify-between items-center mb-4">
                            <div className={cn("p-2 rounded-lg bg-secondary", stat.color)}>
                                <stat.icon size={20} />
                            </div>
                            <span className="text-[10px] font-bold text-emerald-500 px-2 py-0.5 bg-emerald-500/10 rounded-full">{stat.change}</span>
                        </div>
                        <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">{stat.label}</p>
                        <h4 className="text-2xl font-black mt-1">{stat.value}</h4>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Growth Chart */}
                <div className="lg:col-span-2 chart-container bg-card border border-border p-6 rounded-3xl">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-bold">Revenue Growth</h3>
                            <p className="text-xs text-muted-foreground">Monthly revenue trajectory for H1 2024</p>
                        </div>
                        <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase bg-primary/10 px-3 py-1.5 rounded-xl border border-primary/20">
                            <ArrowUpRight size={14} />
                            On Track
                        </div>
                    </div>
                    <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
                                <Tooltip
                                    cursor={{ fill: 'rgba(59, 130, 246, 0.05)' }}
                                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                                />
                                <Bar dataKey="revenue" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Category Distribution */}
                <div className="chart-container bg-card border border-border p-6 rounded-3xl flex flex-col">
                    <h3 className="text-lg font-bold mb-2">Service Breakdown</h3>
                    <p className="text-xs text-muted-foreground mb-8">Revenue share by category</p>
                    <div className="flex-1 h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="space-y-4 pt-6 mt-auto">
                        {categoryData.map((item, i) => (
                            <div key={i} className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: COLORS[i] }} />
                                    <span className="font-medium">{item.name}</span>
                                </div>
                                <span className="font-bold">{item.value}+</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-card border border-border p-8 rounded-3xl relative overflow-hidden group">
                    <h3 className="text-xl font-bold mb-2">Platform Distribution</h3>
                    <p className="text-sm text-muted-foreground mr-10 mb-6">User access behavior across devices over the last 30 days.</p>
                    <div className="flex items-center gap-10">
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                                <Smartphone size={24} />
                            </div>
                            <span className="text-xs font-bold uppercase">Mobile (82%)</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-12 h-12 bg-secondary text-muted-foreground rounded-2xl flex items-center justify-center">
                                <Monitor size={24} />
                            </div>
                            <span className="text-xs font-bold uppercase text-muted-foreground">Web (18%)</span>
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 p-10 opacity-5 -mr-10 -mt-10 group-hover:rotate-12 transition-transform duration-700">
                        <Monitor size={160} />
                    </div>
                </div>

                <div className="bg-gradient-to-br from-primary to-blue-700 p-8 rounded-3xl text-white relative overflow-hidden flex flex-col justify-between">
                    <div>
                        <h3 className="text-2xl font-black mb-2 leading-none">Intelligence Hub</h3>
                        <p className="text-sm text-blue-100/80 mb-6">Real-time predictive insights for demand forecasting.</p>
                    </div>
                    <div className="flex items-end justify-between">
                        <div className="space-y-1">
                            <p className="text-[10px] uppercase font-bold tracking-[2px] text-blue-100">Projected Peak</p>
                            <p className="text-xl font-bold">This Weekend (Sat, 11 AM)</p>
                        </div>
                        <button className="bg-white text-primary px-4 py-2 rounded-xl text-xs font-bold shadow-xl shadow-black/10 active:scale-95 transition-all">
                            Optimize Supply
                        </button>
                    </div>
                    {/* Background Decor */}
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                </div>
            </div>
        </div>
    );
}
