import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { servicesData } from '../data/content';
import { CheckCircle2, ArrowRight, Building2, Clock, Hammer, Ruler, Briefcase, HardHat } from 'lucide-react';
import { motion } from 'motion/react';
import { Contact } from '../components/Sections';

const iconMap: Record<string, React.ReactNode> = {
  Building2: <Building2 size={32} className="text-accent" />,
  Clock: <Clock size={32} className="text-accent" />,
  Hammer: <Hammer size={32} className="text-accent" />,
  Ruler: <Ruler size={32} className="text-accent" />,
  Briefcase: <Briefcase size={32} className="text-accent" />,
  HardHat: <HardHat size={32} className="text-accent" />,
};
const getIcon = (name: string) => iconMap[name] || <Building2 size={32} className="text-accent" />;

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<any>(servicesData.find(s => s.slug === slug) || null);
  const [allServices, setAllServices] = useState<any[]>(servicesData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch(`/api/services/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setService(data);
        }
        const allRes = await fetch('/api/services');
        if (allRes.ok) {
          const allData = await allRes.json();
          if (Array.isArray(allData) && allData.length > 0) setAllServices(allData);
        }
      } catch {}
      finally { setLoading(false); }
    };
    fetchService();
  }, [slug]);

  if (loading && !service) {
    return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" /></div>;
  }

  if (!service) {
    return <Navigate to="/services" />;
  }

  return (
    <>
      <PageHeader title={service.title} breadcrumb={`Services / ${service.title}`} />
      
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-24">
            <div className="lg:w-2/3">
              <div className="mb-12">
                <div className="text-accent mb-6">{typeof service.icon === 'string' ? getIcon(service.icon) : service.icon}</div>
                <h2 className="text-4xl lg:text-5xl font-display font-black text-primary uppercase italic mb-8">
                  {service.title}
                </h2>
                <p className="text-xl text-slate-600 leading-relaxed font-accent mb-10">
                  {service.fullDesc}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-12 mb-16">
                <div className="relative aspect-video overflow-hidden rounded-xl">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="bg-surface p-10 rounded-xl">
                  <h3 className="text-2xl font-display font-black text-primary uppercase mb-6">Key Features</h3>
                  <ul className="space-y-4">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-700 font-accent font-medium">
                        <CheckCircle2 className="text-accent" size={20} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="prose prose-lg max-w-none text-slate-600 font-accent mb-16">
                <h3 className="text-3xl font-display font-black text-primary uppercase italic mb-6">Our Approach</h3>
                <p className="mb-6">
                  At Ameer Civil Engineers, we approach every project with a commitment to excellence and a focus on the unique needs of our clients. Our process begins with a thorough understanding of the project requirements, followed by meticulous planning and execution.
                </p>
                <div className="grid sm:grid-cols-2 gap-8 mt-12">
                  {service.process.map((step, i) => (
                    <div key={i} className="flex gap-6">
                      <div className="text-4xl font-display font-black text-accent/20">0{i + 1}</div>
                      <div>
                        <h4 className="text-xl font-display font-black text-primary uppercase mb-2">{step.title}</h4>
                        <p className="text-sm leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-primary p-12 rounded-xl text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                <div className="relative z-10">
                  <h3 className="text-3xl font-display font-black uppercase italic mb-8">Service Benefits</h3>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {service.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-accent flex items-center justify-center text-primary rounded-full">
                          <CheckCircle2 size={16} />
                        </div>
                        <span className="font-display font-bold uppercase tracking-wider text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/3">
              <div className="sticky top-32 space-y-12">
                <div className="bg-primary p-12 text-white rounded-xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                  <h3 className="text-2xl font-display font-black uppercase mb-6 relative z-10">All Services</h3>
                  <ul className="space-y-4 relative z-10">
                    {allServices.map((s: any) => (
                      <li key={s.slug}>
                        <a 
                          href={`/services/${s.slug}`}
                          className={cn(
                            "flex items-center justify-between p-4 border border-white/10 hover:bg-accent hover:text-primary transition-all font-display font-bold uppercase tracking-wider text-sm",
                            s.slug === slug ? "bg-accent text-primary" : "text-white"
                          )}
                        >
                          {s.title}
                          <ArrowRight size={16} />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-accent p-12 rounded-xl text-primary">
                  <h3 className="text-2xl font-display font-black uppercase mb-6">Need Help?</h3>
                  <p className="font-accent font-bold mb-8">
                    Contact our experts today for a free consultation and project estimation.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary text-white flex items-center justify-center rounded-full">
                        <CheckCircle2 size={20} />
                      </div>
                      <span className="font-display font-black uppercase text-sm tracking-widest">Expert Advice</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary text-white flex items-center justify-center rounded-full">
                        <CheckCircle2 size={20} />
                      </div>
                      <span className="font-display font-black uppercase text-sm tracking-widest">Free Estimation</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Contact />
    </>
  );
}

import { cn } from '../lib/utils';
