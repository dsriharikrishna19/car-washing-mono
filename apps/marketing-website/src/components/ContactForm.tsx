'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/utils/cn';

const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().min(10, "Please enter a valid phone number"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormData) => {
        // Simulate API call
        console.log(data);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="glass p-12 rounded-[3.5rem] flex flex-col items-center text-center gap-6"
            >
                <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 mb-2">
                    <CheckCircle2 size={48} />
                </div>
                <h3 className="text-3xl font-black text-white italic">MESSAGE RECEIVED!</h3>
                <p className="text-slate-400 max-w-xs mx-auto">Our detailing experts will reach out to you within the hour to confirm your sparkle.</p>
                <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-primary font-bold text-sm uppercase tracking-widest hover:underline"
                >
                    Send another message
                </button>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs font-black text-white uppercase tracking-widest ml-4 italic">Full Name</label>
                    <input
                        {...register('name')}
                        placeholder="John Doe"
                        className={cn(
                            "w-full bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all text-white font-medium",
                            errors.name && "border-destructive/50"
                        )}
                    />
                    {errors.name && <p className="text-[10px] font-bold text-destructive uppercase tracking-widest ml-4">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-black text-white uppercase tracking-widest ml-4 italic">Email Address</label>
                    <input
                        {...register('email')}
                        placeholder="john@example.com"
                        className={cn(
                            "w-full bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all text-white font-medium",
                            errors.email && "border-destructive/50"
                        )}
                    />
                    {errors.email && <p className="text-[10px] font-bold text-destructive uppercase tracking-widest ml-4">{errors.email.message}</p>}
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-black text-white uppercase tracking-widest ml-4 italic">Phone Number</label>
                <input
                    {...register('phone')}
                    placeholder="+91 98765 43210"
                    className={cn(
                        "w-full bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all text-white font-medium",
                        errors.phone && "border-destructive/50"
                    )}
                />
                {errors.phone && <p className="text-[10px] font-bold text-destructive uppercase tracking-widest ml-4">{errors.phone.message}</p>}
            </div>

            <div className="space-y-2">
                <label className="text-xs font-black text-white uppercase tracking-widest ml-4 italic">Message</label>
                <textarea
                    {...register('message')}
                    placeholder="Tell us about your ride..."
                    rows={4}
                    className={cn(
                        "w-full bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all text-white font-medium resize-none",
                        errors.message && "border-destructive/50"
                    )}
                />
                {errors.message && <p className="text-[10px] font-bold text-destructive uppercase tracking-widest ml-4">{errors.message.message}</p>}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transform active:scale-95 transition-all hover:shadow-2xl hover:shadow-primary/30 flex items-center justify-center gap-3 disabled:opacity-50"
            >
                {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                    <>
                        <Send size={18} />
                        Kickstart the Shine
                    </>
                )}
            </button>
        </form>
    );
}
