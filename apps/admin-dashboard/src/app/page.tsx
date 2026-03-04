'use client';

import { StatCard } from '@/components/Dashboard/StatCard';
import { RevenueChart } from '@/components/Dashboard/RevenueChart';
import {
  Users,
  CalendarCheck,
  IndianRupee,
  Car,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  MoreVertical,
  User
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

const recentBookings = [
  { id: '1', customer: 'John Doe', service: 'Full Detailing', partner: 'Sam Wilson', date: 'Just now', amount: '₹2,450', status: 'In Progress' },
  { id: '2', customer: 'Sarah Smith', service: 'Exterior Wash', partner: 'None', date: '10 min ago', amount: '₹500', status: 'Pending' },
  { id: '3', customer: 'Robert Johnson', service: 'Interior Deep Clean', partner: 'Mike Ross', date: '25 min ago', amount: '₹1,200', status: 'Completed' },
  { id: '4', customer: 'Emily Brown', service: 'Ceramic Coating', partner: 'Harvey Specter', date: '1 hour ago', amount: '₹12,000', status: 'Scheduled' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back, Alex. Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-500 rounded-xl border border-emerald-500/20 text-sm font-semibold">
            <TrendingUp size={16} />
            +12.5% vs Last Week
          </div>
          <button className="bg-primary text-white px-5 py-2.5 rounded-xl font-bold hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-95">
            Download Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Bookings"
          value="1,284"
          change="8.2"
          isPositive={true}
          icon={CalendarCheck}
          color="bg-blue-500"
        />
        <StatCard
          title="Total Revenue"
          value="₹4,82,450"
          change="12.5"
          isPositive={true}
          icon={IndianRupee}
          color="bg-emerald-500"
        />
        <StatCard
          title="Active Users"
          value="842"
          change="4.1"
          isPositive={true}
          icon={Users}
          color="bg-violet-500"
        />
        <StatCard
          title="Service Partners"
          value="48"
          change="2.4"
          isPositive={false}
          icon={Car}
          color="bg-orange-500"
        />
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div className="bg-card border border-border p-6 rounded-2xl shadow-sm flex flex-col h-full">
          <h3 className="text-lg font-bold mb-6">Booking Distribution</h3>
          <div className="flex-1 flex flex-col justify-center space-y-6">
            {[
              { label: 'Wash', value: 45, color: 'bg-blue-500' },
              { label: 'Detailing', value: 30, color: 'bg-emerald-500' },
              { label: 'Coating', value: 15, color: 'bg-violet-500' },
              { label: 'Other', value: 10, color: 'bg-orange-500' },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">{item.label}</span>
                  <span className="text-muted-foreground">{item.value}%</span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className={cn("h-full rounded-full", item.color)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h3 className="text-lg font-bold">Recent Bookings</h3>
          <button className="text-primary text-sm font-semibold hover:underline">View All Bookings</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-secondary/50 text-muted-foreground text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-bold">Customer</th>
                <th className="px-6 py-4 font-bold">Service</th>
                <th className="px-6 py-4 font-bold">Partner</th>
                <th className="px-6 py-4 font-bold">Date</th>
                <th className="px-6 py-4 font-bold">Amount</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-secondary/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-medium group-hover:text-primary transition-colors">{booking.customer}</div>
                  </td>
                  <td className="px-6 py-4 text-sm">{booking.service}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
                        <User size={12} />
                      </div>
                      <span className="text-sm">{booking.partner}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{booking.date}</td>
                  <td className="px-6 py-4 font-bold text-sm">{booking.amount}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold",
                      booking.status === 'Completed' && "bg-emerald-500/10 text-emerald-500",
                      booking.status === 'In Progress' && "bg-blue-500/10 text-blue-500",
                      booking.status === 'Pending' && "bg-orange-500/10 text-orange-500",
                      booking.status === 'Scheduled' && "bg-violet-500/10 text-violet-500",
                    )}>
                      {booking.status === 'In Progress' && <Clock size={12} className="animate-spin" />}
                      {booking.status === 'Completed' && <CheckCircle2 size={12} />}
                      {booking.status === 'Scheduled' && <CalendarCheck size={12} />}
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-secondary rounded-lg text-muted-foreground">
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
