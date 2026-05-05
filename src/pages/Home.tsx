import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  About, 
  Services, 
  Projects, 
  Stats, 
  Testimonials, 
  Team, 
  Contact,
  FAQ 
} from '../components/Sections';

const Hero = () => (
  <section className="relative h-screen flex items-center overflow-hidden bg-primary">
    <div className="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=2000" 
        alt="Construction Site"
        className="w-full h-full object-cover opacity-50 scale-105 animate-pulse-slow"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/60 to-transparent" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-3xl"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-1 bg-accent" />
          <span className="text-accent font-accent font-bold text-sm tracking-[0.4em] uppercase">
            Professional Construction Services
          </span>
        </div>
        <h1 className="text-5xl lg:text-7xl xl:text-8xl font-display font-black text-white leading-[0.9] mb-8 uppercase italic">
          Building <br />
          <span className="text-accent not-italic">Stronger</span> <br />
          Future
        </h1>
        <p className="text-xl text-slate-300 mb-12 leading-relaxed max-w-xl font-accent font-medium">
          Ameer Civil Engineers delivers world-class structural engineering and 
          sustainable building solutions with precision and integrity.
        </p>
        <div className="flex flex-wrap gap-6">
          <Link to="/services" className="btn-pro btn-pro-primary min-w-[200px] text-center">
            OUR SERVICES
          </Link>
          <Link to="/projects" className="btn-pro border-2 border-white text-white hover:bg-white hover:text-primary min-w-[200px] text-center">
            VIEW PROJECTS
          </Link>
        </div>
      </motion.div>
    </div>

    {/* Innovative Architectural Element */}
    <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden xl:block z-20 pr-24">
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="relative w-[500px] h-[600px]"
      >
        {/* The "Blueprint" Frame */}
        <div className="absolute inset-0 border-2 border-accent/30 rounded-3xl backdrop-blur-sm bg-primary/20 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-20" />
          
          {/* Animated Scanning Line */}
          <motion.div 
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 w-full h-px bg-accent/50 z-30 shadow-[0_0_15px_rgba(255,77,0,0.5)]"
          />

          {/* Floating Data Points */}
          <div className="absolute inset-0 p-12 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="bg-accent/10 border border-accent/20 p-4 rounded-lg backdrop-blur-md">
                <div className="text-[10px] font-display font-black text-accent uppercase tracking-widest mb-1">Structural Integrity</div>
                <div className="text-2xl font-display font-black text-white italic">99.9%</div>
              </div>
              <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-accent rounded-full animate-ping" />
              </div>
            </div>

            <div className="relative h-48 flex items-center justify-center">
              {/* Abstract 3D-like wireframe (CSS only) */}
              <div className="relative w-32 h-32 border-2 border-accent rotate-45 animate-spin-slow">
                <div className="absolute inset-0 border border-white/30 -translate-x-4 -translate-y-4" />
                <div className="absolute inset-0 border border-white/30 translate-x-4 translate-y-4" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-display font-black text-white/40 uppercase tracking-[0.5em] -rotate-90">ENGINEERING</span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "75%" }}
                  transition={{ duration: 2, delay: 1 }}
                  className="h-full bg-accent"
                />
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-[10px] font-display font-black text-slate-400 uppercase tracking-widest mb-1">Project Status</div>
                  <div className="text-xl font-display font-black text-white uppercase italic">In Progress</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-display font-black text-slate-400 uppercase tracking-widest mb-1">Efficiency</div>
                  <div className="text-xl font-display font-black text-accent uppercase italic">Optimized</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-8 -right-8 w-24 h-24 border-t-2 border-r-2 border-accent" />
        <div className="absolute -bottom-8 -left-8 w-24 h-24 border-b-2 border-l-2 border-accent" />
      </motion.div>
    </div>
  </section>
);

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <About />
      <Projects />
      <Testimonials />
      <Team />
      <FAQ />
      <Contact />
    </>
  );
}
