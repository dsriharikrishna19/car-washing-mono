'use client';

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const data = [
    { name: 'Mon', revenue: 4000, bookings: 24 },
    { name: 'Tue', revenue: 3000, bookings: 13 },
    { name: 'Wed', revenue: 2000, bookings: 98 },
    { name: 'Thu', revenue: 2780, bookings: 39 },
    { name: 'Fri', revenue: 1890, bookings: 48 },
    { name: 'Sat', revenue: 2390, bookings: 38 },
    { name: 'Sun', revenue: 3490, bookings: 43 },
];

export function RevenueChart() {
    return (
        <div className="h-[400px] w-full bg-card border border-border p-6 rounded-2xl shadow-sm">
            <div className="mb-6">
                <h3 className="text-lg font-bold">Revenue Overview</h3>
                <p className="text-sm text-muted-foreground">Weekly revenue performance trends</p>
            </div>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#64748b', fontSize: 12 }}
                        dy={10}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#64748b', fontSize: 12 }}
                        tickFormatter={(value) => `₹${value}`}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#0f172a',
                            border: '1px solid #1e293b',
                            borderRadius: '12px',
                            fontSize: '12px'
                        }}
                        itemStyle={{ color: '#f8fafc' }}
                    />
                    <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorRev)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
