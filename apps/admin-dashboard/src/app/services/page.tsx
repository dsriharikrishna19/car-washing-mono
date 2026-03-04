'use client';

import { useState } from 'react';
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    Layers,
    Settings,
    MoreVertical,
    CheckCircle,
    Clock,
    Car
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { motion } from 'framer-motion';

const categories = ['All', 'Express Wash', 'Interior', 'Detailing', 'Ceramic Coating'];

const servicesData = [
    { id: '1', name: 'Signature Exterior Wash', category: 'Express Wash', basePrice: '₹499', duration: '30-45 mins', status: 'Active', description: 'Foam wash, tire dressing, and windsheild cleaning.' },
    { id: '2', name: 'Premium Interior Deep Clean', category: 'Interior', basePrice: '₹1,299', duration: '90-120 mins', status: 'Active', description: 'Full vacuuming, upholstery shampoo, and dashboard polish.' },
    { id: '3', name: '9H Ceramic Coating', category: 'Ceramic Coating', basePrice: '₹12,000', duration: '24-48 hours', status: 'Active', description: 'Nano-tech coating with 3 years warranty.' },
    { id: '4', name: 'Engine Bay Detailing', category: 'Detailing', basePrice: '₹2,499', duration: '120 mins', status: 'Inactive', description: 'Steam cleaning and protective dressing for engine components.' },
    { id: '5', name: 'Full Ecosystem Detail', category: 'Detailing', basePrice: '₹5,999', duration: '4-6 hours', status: 'Active', description: 'Combined interior and exterior high-end detailing.' },
];

export default function ServicesPage() {
    const [activeTab, setActiveTab] = useState('All');

    const filteredServices = servicesData.filter(s => activeTab === 'All' || s.category === activeTab);

    return (
        <div className="space-y-8 animate-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Service Management</h1>
                    <p className="text-muted-foreground mt-1">Configure service offerings, pricing, and availability.</p>
                </div>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-bold hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-95">
                    <Plus size={20} />
                    Create Service
                </button>
            </div>

            {/* Category Tabs */}
            <div className="flex items-center gap-2 p-1.5 bg-secondary/50 rounded-2xl w-fit overflow-x-auto no-scrollbar border border-border">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveTab(cat)}
                        className={cn(
                            "px-5 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap",
                            activeTab === cat
                                ? "bg-primary text-white shadow-lg shadow-primary/20"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map((service) => (
                    <motion.div
                        layout
                        key={service.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-card border border-border p-6 rounded-2xl relative group flex flex-col justify-between"
                    >
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-secondary rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                    <Car size={24} />
                                </div>
                                <div className={cn(
                                    "px-2 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider",
                                    service.status === 'Active' ? "bg-emerald-500/10 text-emerald-500" : "bg-destructive/10 text-destructive"
                                )}>
                                    {service.status}
                                </div>
                            </div>
                            <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{service.name}</h3>
                            <p className="text-muted-foreground text-sm line-clamp-2 mb-4 leading-relaxed">
                                {service.description}
                            </p>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-border mt-auto">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-muted-foreground flex items-center gap-1.5">
                                    <Clock size={14} />
                                    {service.duration}
                                </span>
                                <span className="font-extrabold text-lg text-foreground">{service.basePrice}</span>
                            </div>

                            <div className="flex gap-2">
                                <button className="flex-1 bg-secondary text-foreground p-2.5 rounded-xl font-bold text-sm hover:bg-border transition-all flex items-center justify-center gap-2">
                                    <Edit2 size={14} />
                                    Edit
                                </button>
                                <button className="p-2.5 bg-secondary text-destructive rounded-xl hover:bg-destructive/10 transition-all">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
