'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from '@/components/Navbar';
import { StatCard } from '@/components/StatCard';
import { SmoothScroll } from '@/components/SmoothScroll';
import { FAQ } from '@/components/FAQ';
import { ContactForm } from '@/components/ContactForm';
import {
  ArrowRight,
  Play,
  Star,
  ShieldCheck,
  Clock,
  MapPin,
  CheckCircle2,
  ChevronRight,
  Download,
  Smartphone,
  MessageSquare,
  Calendar,
  Car
} from 'lucide-react';
import { cn } from '@/utils/cn';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef(null);
  const carRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Entrance
      gsap.from('.hero-content > *', {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out',
      });

      // Floating Stats Entrance
      gsap.from('.floating-stat', {
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        delay: 0.8,
        stagger: 0.3,
        ease: 'elastic.out(1, 0.5)',
      });

      // Scroll Animation for Section Reveals
      gsap.utils.toArray('.reveal').forEach((elem: any) => {
        gsap.fromTo(elem,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            scrollTrigger: {
              trigger: elem,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <SmoothScroll>
      <div ref={heroRef} className="relative min-h-screen bg-slate-950 overflow-hidden">
        <Navbar navLinks={navLinks} />

        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
        </div>

        {/* --- Hero Section --- */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

            <div className="hero-content relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-white/10 text-primary-300 text-xs font-bold tracking-widest uppercase mb-6"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Now Serving in Bangalore & Hyderabad
              </motion.div>

              <h1 className="text-5xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 italic">
                PREMIUM SHINE <br />
                <span className="text-gradient">AT YOUR DOOR.</span>
              </h1>

              <p className="text-lg lg:text-xl text-slate-400 max-w-lg mb-10 leading-relaxed font-medium">
                Experience the first-class car washing service that comes to you. Professional detailing, eco-friendly tech, and a sparkle that lasts.
              </p>

              <div className="flex flex-wrap gap-4 items-center">
                <button className="bg-primary text-white px-8 py-4 rounded-2xl font-black text-lg hover:shadow-2xl hover:shadow-primary/40 transition-all hover:-translate-y-1 active:scale-95 flex items-center gap-3 group">
                  Book Your Wash
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="glass text-white px-8 py-4 rounded-2xl font-black text-lg hover:bg-white/10 transition-all flex items-center gap-3">
                  <Play size={20} fill="currentColor" />
                  See It In Action
                </button>
              </div>

              <div className="mt-12 flex items-center gap-6">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-slate-950 bg-slate-800" />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 text-orange-400 mb-1">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                  <p className="text-xs font-bold text-white uppercase tracking-wider">10k+ Happy Customers</p>
                </div>
              </div>
            </div>

            <div className="relative group">
              {/* Car Graphic Placeholder / Animated Element */}
              <div ref={carRef} className="relative z-10 w-full aspect-square lg:aspect-video rounded-[3rem] overflow-hidden group shadow-2xl shadow-primary/10 transition-transform duration-500 hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-slate-900/40 to-primary/20 mix-blend-overlay z-10" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?q=80&w=2000')] bg-cover bg-center group-hover:scale-110 transition-transform duration-1000" />

                {/* Floating Overlay components */}
                <div className="floating-stat absolute top-10 left-10 z-20">
                  <StatCard label="Review" value="4.9/5" icon={<Star size={18} fill="currentColor" />} className="bg-slate-900/90 backdrop-blur-2xl px-6 py-4" />
                </div>
                <div className="floating-stat absolute bottom-10 right-10 z-20">
                  <StatCard label="Time" value="45 Min" icon={<Clock size={18} />} className="bg-primary/95 text-white" />
                </div>
              </div>

              {/* Background Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/20 blur-[100px] rounded-full -z-10 animate-pulse" />
            </div>

          </div>
        </section>

        {/* --- Services Section --- */}
        <section id="services" className="py-24 lg:py-40 px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="reveal flex flex-col items-center text-center mb-20">
              <h2 className="text-xs font-black text-primary uppercase tracking-[0.3em] mb-4">Our Services</h2>
              <h3 className="text-4xl lg:text-6xl font-black text-white italic tracking-tighter max-w-2xl">
                BEYOND JUST A <span className="text-gradient">THOROUGH WASH.</span>
              </h3>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: 'Exterior Magic', desc: 'Foam bath, touchless dry, tire glaze, and window shine for a mirror finish.', icon: <Car size={32} /> },
                { name: 'Full Detailing', desc: 'The ultimate restoration. Interior, exterior, and engine bay restoration.', icon: <ShieldCheck size={32} /> },
                { name: 'Interior Zen', desc: 'Deep steam cleaning, vacuuming, and leather conditioning for a fresh cabin.', icon: <CheckCircle2 size={32} /> },
                { name: 'Ceramic Shield', desc: 'Advanced nano-coating with 3 years warranty against dust, UV, and scratches.', icon: <ShieldCheck size={32} /> },
                { name: 'Engine Bay', desc: 'Degreasing and dressing to make your heartbeat look brand new.', icon: <Clock size={32} /> },
                { name: 'Weekly Sparkle', desc: 'Subscription based care to keep your ride perpetually showroom ready.', icon: <Calendar size={32} /> },
              ].map((service, i) => (
                <div
                  key={i}
                  className="reveal bg-slate-900/40 border border-white/5 p-10 rounded-[2.5rem] hover:bg-slate-900 transition-all hover:-translate-y-2 group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all">
                    {service.icon}
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-4 italic group-hover:text-primary transition-colors">{service.name}</h4>
                  <p className="text-slate-400 leading-relaxed mb-8">{service.desc}</p>
                  <button className="text-white font-black text-xs uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
                    Learn More <ChevronRight size={14} className="text-primary" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- How it Works --- */}
        <section id="how-it-works" className="py-24 lg:py-40 px-6 relative overflow-hidden bg-slate-900/20">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
            <div className="reveal">
              <h2 className="text-xs font-black text-primary uppercase tracking-[0.3em] mb-4">The Process</h2>
              <h3 className="text-4xl lg:text-6xl font-black text-white italic tracking-tighter mb-10">
                BOOK TO SHINE IN <br />
                <span className="text-gradient">3 SIMPLE STEPS.</span>
              </h3>

              <div className="space-y-12">
                {[
                  { step: '01', title: 'Schedule Online', desc: 'Pick a service and a time that suits you. Tell us where your ride is located.' },
                  { step: '02', title: 'Pro Team Arrives', desc: 'Our certified detailers arrive with fully equipped mobile units. No water or power needed.' },
                  { step: '03', title: 'Enjoy the Sparkle', desc: 'Inspect the work, rate us, and drive your renewed machine with pride.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-8 group">
                    <div className="text-4xl font-black text-white/5 group-hover:text-primary/20 transition-colors drop-shadow-sm select-none italic">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2 italic group-hover:text-primary transition-colors">{item.title}</h4>
                      <p className="text-slate-400 text-sm leading-relaxed max-w-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal relative">
              <div className="glass p-12 rounded-[3.5rem] border-primary/20 relative z-20 overflow-hidden group">
                <div className="absolute top-0 right-0 p-10 opacity-10 -mr-10 -mt-10 group-hover:rotate-12 transition-transform duration-700">
                  <Smartphone size={160} />
                </div>
                <div className="relative z-10 flex flex-col items-center text-center">
                  <h4 className="text-3xl font-black text-white mb-4 italic leading-tight">PREFER APP-ONLY <br />EXPERIENCE?</h4>
                  <p className="text-slate-400 mb-10 text-sm max-w-[240px]">Download the Sparkle app for one-tap bookings and real-time tracking.</p>
                  <div className="flex flex-col sm:flex-row gap-4 w-full">
                    <button className="flex-1 glass bg-white text-slate-950 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white hover:scale-105 transition-all">
                      <Download size={18} /> App Store
                    </button>
                    <button className="flex-1 glass bg-white text-slate-950 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white hover:scale-105 transition-all">
                      <Smartphone size={18} /> Play Store
                    </button>
                  </div>
                </div>
              </div>

              {/* Accent elements */}
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-600/30 blur-[100px] -z-10" />
            </div>
          </div>
        </section>

        {/* --- Simple Pricing --- */}
        <section id="pricing" className="py-24 lg:py-40 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="reveal flex flex-col items-center text-center mb-20">
              <h2 className="text-xs font-black text-primary uppercase tracking-[0.3em] mb-4">Pricing</h2>
              <h3 className="text-4xl lg:text-5xl font-black text-white italic tracking-tighter">
                FAIR PRICING FOR <span className="text-gradient">EXCEPTIONAL CARE.</span>
              </h3>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {[
                { name: 'Standard Wash', price: '499', features: ['Exterior Deep Wash', 'Tire Dressing', 'Glass Cleaning', '30 Mins Duration'] },
                { name: 'Elite Care', price: '1,299', popular: true, features: ['Interior Deep Scrub', 'Exterior Wash', 'Upholstery Vacuum', 'Odor Neutralizer', '90 Mins Duration'] },
                { name: 'Diamond Gloss', price: '5,999', features: ['Ceramic Wax Finish', 'Full Engine Bay Detailing', 'Clay Bar Treatment', 'Pest/Tar Removal', '4+ Hours Duration'] },
              ].map((plan, i) => (
                <div
                  key={i}
                  className={cn(
                    "reveal p-10 rounded-[3rem] border flex flex-col",
                    plan.popular
                      ? "glass border-primary/40  shadow-primary/10 relative -translate-y-4"
                      : "bg-slate-900/40 border-white/5"
                  )}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                      Highly Recommended
                    </div>
                  )}
                  <h4 className="text-lg font-bold text-slate-300 mb-2 italic uppercase tracking-widest leading-none">{plan.name}</h4>
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-xl font-bold text-slate-500 italic">₹</span>
                    <span className="text-6xl font-black text-white tracking-tighter italic">{plan.price}</span>
                  </div>

                  <ul className="space-y-4 mb-10 flex-1">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm text-slate-400 font-medium">
                        <CheckCircle2 size={16} className="text-primary" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <button className={cn(
                    "w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all active:scale-95",
                    plan.popular ? "bg-primary text-white hover:shadow-xl hover:shadow-primary/30" : "bg-white text-slate-900"
                  )}>
                    Select Plan
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- FAQ Section --- */}
        <section id="faq" className="py-24 lg:py-40 px-6 relative z-10 bg-slate-900/10">
          <div className="max-w-7xl mx-auto">
            <div className="reveal flex flex-col items-center text-center mb-20">
              <h2 className="text-xs font-black text-primary uppercase tracking-[0.3em] mb-4">Common Questions</h2>
              <h3 className="text-4xl lg:text-5xl font-black text-white italic tracking-tighter">
                FREQUENTLY ASKED <span className="text-gradient">QUESTIONS.</span>
              </h3>
            </div>

            <div className="reveal">
              <FAQ />
            </div>
          </div>
        </section>

        {/* --- Contact Section --- */}
        <section id="contact" className="py-24 lg:py-40 px-6 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[120px] rounded-full -z-10" />

          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
            <div className="reveal">
              <h2 className="text-xs font-black text-primary uppercase tracking-[0.3em] mb-4">Get In Touch</h2>
              <h3 className="text-4xl lg:text-6xl font-black text-white italic tracking-tighter mb-8 leading-none">
                READY TO GIVE YOUR CAR THE <span className="text-gradient">SPARKLE IT DESERVES?</span>
              </h3>
              <p className="text-slate-400 text-lg mb-10 max-w-md font-medium">Have a specific request or looking for a corporate deal? Send us a message and we'll get back to you shortly.</p>

              <div className="space-y-6">
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <MessageSquare size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 italic">Email Us</p>
                    <p className="text-lg font-bold text-white italic">hello@sparklewash.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <Smartphone size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 italic">Call Expert</p>
                    <p className="text-lg font-bold text-white italic">+91 1800-SPARKLE</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="reveal lg:pl-12">
              <div className="glass p-10 lg:p-14 rounded-[4rem]">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        {/* --- Footer & CTA --- */}
        <footer className="pt-20 pb-10 bg-slate-950 border-t border-white/5 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-12 mb-20">
              <div className="md:col-span-2">
                <Link href="/" className="flex items-center gap-2 mb-6 group">
                  <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white">
                    <Car size={24} />
                  </div>
                  <span className="text-xl font-black tracking-tighter text-white uppercase italic">SPARKLE</span>
                </Link>
                <p className="text-slate-500 text-sm max-w-sm leading-relaxed font-medium mb-8">
                  We're on a mission to bring high-end automotive care to your doorstep. Eco-friendly, professional, and reliable.
                </p>
                <div className="flex items-center gap-4">
                  {[MessageSquare, Smartphone, MapPin].map((Icon, i) => (
                    <div key={i} className="w-10 h-10 glass rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer">
                      <Icon size={18} />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="text-sm font-black text-white uppercase tracking-widest mb-6 italic">Navigation</h5>
                <ul className="space-y-4">
                  {navLinks.map((l, i) => (
                    <li key={i}><Link href={l.href} className="text-sm text-slate-500 hover:text-primary transition-colors font-medium">{l.name}</Link></li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="text-sm font-black text-white uppercase tracking-widest mb-6 italic">Support</h5>
                <ul className="space-y-4">
                  {['Help Center', 'Safety & Trust', 'Terms of Service', 'Privacy Policy'].map((l, i) => (
                    <li key={i}><Link href="#" className="text-sm text-slate-500 hover:text-primary transition-colors font-medium">{l}</Link></li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-xs text-slate-600 font-bold tracking-widest">© 2024 SPARKLE CAR WASH. ALL RIGHTS RESERVED.</p>
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest px-3 py-1 border border-slate-700 rounded-lg">ISO Certified Detailing</span>
                <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest px-3 py-1 border border-slate-700 rounded-lg">Secure Payments</span>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </SmoothScroll>
  );
}
