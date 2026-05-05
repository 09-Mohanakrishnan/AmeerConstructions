import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { About as AboutSection, Stats, Team } from '../components/Sections';
import { motion } from 'motion/react';
import { Target, Eye, History, ShieldCheck, Zap, Users } from 'lucide-react';

export default function About() {
  const values = [
    { icon: <ShieldCheck className="text-accent" size={32} />, title: "Integrity", desc: "We maintain the highest ethical standards in all our interactions and decisions." },
    { icon: <Zap className="text-accent" size={32} />, title: "Innovation", desc: "We embrace new technologies and creative solutions to solve complex challenges." },
    { icon: <Users className="text-accent" size={32} />, title: "Collaboration", desc: "We work closely with our clients and partners to achieve shared success." },
    { icon: <Target className="text-accent" size={32} />, title: "Excellence", desc: "We strive for perfection in every detail of our engineering and construction." }
  ];

  return (
    <>
      <PageHeader title="About Our Company" breadcrumb="About Us" />
      <AboutSection />
      
      <section className="py-32 bg-surface">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-accent flex items-center justify-center text-primary">
                  <History size={24} />
                </div>
                <span className="text-accent font-accent font-bold uppercase tracking-[0.3em] text-sm">Our Journey</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-display font-black text-primary uppercase italic mb-8 leading-tight">
                Two Decades of <br /><span className="text-accent">Engineering Excellence</span>
              </h2>
              <div className="space-y-6 text-slate-600 leading-relaxed text-lg font-accent">
                <p>
                  Founded in 2001, Ameer Civil Engineers Pvt Ltd began as a small consultancy firm with a big vision. Over the last 25 years, we have grown into one of the most respected construction companies in South India.
                </p>
                <p>
                  Our journey has been marked by a relentless pursuit of quality and a commitment to pushing the boundaries of what's possible in civil engineering. From residential landmarks to critical infrastructure, we've left our mark on the landscape.
                </p>
                <p>
                  Today, we are a team of over 150 expert engineers, architects, and project managers, all dedicated to building a better future through sustainable and innovative construction practices.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=800" 
                  alt="Modern Building"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-12 -left-12 bg-primary p-12 text-white hidden md:block shadow-2xl">
                <div className="text-6xl font-display font-black text-accent mb-2">25+</div>
                <div className="text-sm uppercase font-bold tracking-widest opacity-80">Years of <br />Legacy</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Stats />

      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <span className="text-accent font-accent font-bold uppercase tracking-[0.3em] text-sm">Our Purpose</span>
            <h2 className="text-4xl lg:text-6xl mt-4 text-primary font-black italic">Mission & Vision</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-surface p-12 rounded-2xl border-l-8 border-accent shadow-xl"
            >
              <div className="w-16 h-16 bg-primary text-accent flex items-center justify-center rounded-full mb-8">
                <Target size={32} />
              </div>
              <h3 className="text-3xl font-display font-black text-primary uppercase italic mb-6">Our Mission</h3>
              <p className="text-slate-600 leading-relaxed text-lg font-accent">
                To provide high-quality construction services that exceed client expectations while maintaining the highest standards of safety, integrity, and sustainability. We believe in building long-term relationships by delivering exceptional value.
              </p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-surface p-12 rounded-2xl border-l-8 border-primary shadow-xl"
            >
              <div className="w-16 h-16 bg-accent text-primary flex items-center justify-center rounded-full mb-8">
                <Eye size={32} />
              </div>
              <h3 className="text-3xl font-display font-black text-primary uppercase italic mb-6">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed text-lg font-accent">
                To be the most trusted and preferred construction partner in the region, recognized for our commitment to excellence and our ability to handle complex engineering challenges. We aim to lead the industry in sustainable practices.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <span className="text-accent font-accent font-bold uppercase tracking-[0.3em] text-sm">Why Us</span>
            <h2 className="text-4xl lg:text-6xl mt-4 font-black italic uppercase">Core Values</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {values.map((v, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-white/5 flex items-center justify-center mx-auto mb-8 rounded-2xl border border-white/10 group-hover:bg-accent transition-colors">
                  {v.icon}
                </div>
                <h4 className="text-xl font-display font-black uppercase mb-4">{v.title}</h4>
                <p className="text-slate-400 font-accent">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Team />
    </>
  );
}
