'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
    { question: "How do I book a service?", answer: "You can book directly via our website by clicking 'Book a Wash' or by downloading our mobile app for a more seamless experience." },
    { question: "Do you need access to water or power?", answer: "No. Our mobile units are fully self-sufficient, carrying their own water tanks and silent generators to perform the service anywhere." },
    { question: "What areas do you currently serve?", answer: "We are currently operating in major hubs of Bangalore and Hyderabad. We are expanding to Mumbai and Delhi very soon!" },
    { question: "Can I cancel or reschedule my booking?", answer: "Yes, you can reschedule or cancel up to 2 hours before the scheduled time via the app or by contacting our support." },
    { question: "Are your cleaning products eco-friendly?", answer: "Absolutely. we use biodegradable, pH-balanced formulas that are safe for your car's paint and the environment." },
];

export function FAQ() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
                <div
                    key={i}
                    className="glass rounded-3xl overflow-hidden border-white/5 hover:border-white/10 transition-colors"
                >
                    <button
                        onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                        className="w-full p-6 flex items-center justify-between text-left group"
                    >
                        <span className="text-lg font-bold text-white italic group-hover:text-primary transition-colors">{faq.question}</span>
                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all">
                            {activeIndex === i ? <Minus size={18} /> : <Plus size={18} />}
                        </div>
                    </button>

                    <AnimatePresence>
                        {activeIndex === i && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                            >
                                <div className="px-6 pb-6 text-slate-400 leading-relaxed font-medium">
                                    {faq.answer}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
}
