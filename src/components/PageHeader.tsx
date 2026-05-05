import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PageHeaderProps {
  title: string;
  breadcrumb: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, breadcrumb }) => {
  return (
    <section className="relative py-32 bg-primary overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=2000" 
          alt="Page Header"
          className="w-full h-full object-cover opacity-30"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl lg:text-7xl font-display font-black text-white uppercase italic mb-6">
            {title}
          </h1>
          <div className="flex items-center gap-3 text-slate-400 font-display font-bold uppercase tracking-widest text-sm">
            <Link to="/" className="hover:text-accent transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-accent">{breadcrumb}</span>
          </div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-1 bg-accent" />
    </section>
  );
};
