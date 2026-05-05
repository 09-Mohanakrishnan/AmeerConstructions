import React, { useState, useEffect } from 'react';
import { PageHeader } from '../components/PageHeader';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, Shield, Zap, Crown, Star, ArrowRight, ChevronDown, ChevronUp, Info, CheckCircle } from 'lucide-react';
import { Contact } from '../components/Sections';
import { isValidEmail, isRequired } from '../lib/validation';

const iconMap: Record<string, any> = { Shield, Crown, Star, Zap };
const getIconComponent = (name: string) => iconMap[name] || Shield;

const PackageDetailItem = ({ label, value, isIncluded }: any) => (
  <div className="flex items-center justify-between py-4 border-b border-slate-100 last:border-0">
    <div className="flex items-center gap-3">
      {isIncluded ? (
        <Check size={16} className="text-accent" />
      ) : (
        <X size={16} className="text-slate-300" />
      )}
      <span className={`text-sm font-accent ${isIncluded ? 'text-slate-700 font-medium' : 'text-slate-400'}`}>{label}</span>
    </div>
    <span className="text-xs font-display font-black text-primary uppercase tracking-wider">{value}</span>
  </div>
);

const PackageCard = ({ title, price, features, isPopular, icon: Icon, delay, onClick, isActive }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay }}
    viewport={{ once: true }}
    onClick={onClick}
    className={`relative cursor-pointer group bg-white p-8 lg:p-10 shadow-2xl border-t-8 transition-all duration-500 ${isActive ? 'border-accent -translate-y-4' : 'border-primary hover:border-accent/50'}`}
  >
    {isPopular && (
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-accent text-white px-6 py-2 font-display font-black uppercase text-xs tracking-widest">
        Most Popular
      </div>
    )}
    
    <div className="mb-8">
      <div className={`w-14 h-14 ${isActive ? 'bg-accent text-white' : 'bg-primary text-accent group-hover:bg-accent group-hover:text-white'} flex items-center justify-center mb-6 rounded-xl transition-colors`}>
        <Icon size={28} />
      </div>
      <h3 className="text-2xl font-display font-black text-primary uppercase italic mb-2">{title}</h3>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-display font-black text-primary italic">₹{price}</span>
        <span className="text-slate-400 font-accent font-bold uppercase text-[10px] tracking-widest">/ Per Sq.Ft</span>
      </div>
    </div>

    <ul className="space-y-4 mb-10">
      {features.slice(0, 5).map((feature: any, i: number) => (
        <li key={i} className="flex items-start gap-3">
          <Check size={14} className="text-accent mt-1 shrink-0" />
          <span className="font-accent text-xs text-slate-600 leading-relaxed font-medium">
            {feature.text}
          </span>
        </li>
      ))}
    </ul>

    <div className={`text-xs font-display font-black uppercase tracking-[0.2em] flex items-center gap-2 ${isActive ? 'text-accent' : 'text-primary group-hover:text-accent'}`}>
      {isActive ? 'Viewing Details' : 'View Full Specs'}
      <ArrowRight size={14} className={isActive ? 'translate-x-2' : 'group-hover:translate-x-2 transition-transform'} />
    </div>
  </motion.div>
);

export default function Packages() {
  const [activePkg, setActivePkg] = useState(1);

  const fallbackPackages = [
    {
      id: 0,
      title: "Silver Package",
      price: "1,850",
      icon: Shield,
      delay: 0,
      features: [
        { text: "Architectural 2D Plan", included: true },
        { text: "Structural Design & Drawings", included: true },
        { text: "Standard Vitrified Tiles Flooring", included: true },
        { text: "Internal Wall Painting (2 Coats)", included: true },
        { text: "Standard Electrical & Plumbing", included: true }
      ],
      details: {
        design: [
          { label: "Architectural Plan", value: "2D Plan", included: true },
          { label: "Structural Design", value: "Standard", included: true },
          { label: "3D Elevation", value: "Not Included", included: false },
          { label: "Site Visits", value: "Up to 5", included: true }
        ],
        civil: [
          { label: "Cement", value: "Dalmia / Coromandel", included: true },
          { label: "Steel", value: "iSteel / ARS", included: true },
          { label: "Bricks", value: "Standard Red Bricks", included: true },
          { label: "Aggregates", value: "20mm & 40mm", included: true }
        ],
        finishing: [
          { label: "Flooring", value: "Vitrified Tiles (₹50/sqft)", included: true },
          { label: "Main Door", value: "Teak Wood Frame", included: true },
          { label: "Windows", value: "Country Wood / Aluminum", included: true },
          { label: "Painting", value: "Asian Paints Tractor", included: true }
        ]
      }
    },
    {
      id: 1,
      title: "Gold Package",
      price: "2,150",
      icon: Crown,
      isPopular: true,
      delay: 0.2,
      features: [
        { text: "Architectural 2D & 3D Elevation", included: true },
        { text: "Structural Design & Soil Test", included: true },
        { text: "Premium Vitrified Tiles / Granite", included: true },
        { text: "Premium Emulsion Painting", included: true },
        { text: "Branded Electrical & Plumbing", included: true }
      ],
      details: {
        design: [
          { label: "Architectural Plan", value: "2D & 3D Elevation", included: true },
          { label: "Structural Design", value: "Advanced", included: true },
          { label: "Soil Testing", included: true, value: "Included" },
          { label: "Site Visits", value: "Up to 10", included: true }
        ],
        civil: [
          { label: "Cement", value: "Ultratech / Dalmia", included: true },
          { label: "Steel", value: "JSW / TATA Tiscon", included: true },
          { label: "Bricks", value: "Wire-cut Bricks", included: true },
          { label: "River Sand", value: "M-Sand (Double Washed)", included: true }
        ],
        finishing: [
          { label: "Flooring", value: "Premium Tiles (₹80/sqft)", included: true },
          { label: "Main Door", value: "Full Teak Wood", included: true },
          { label: "Windows", value: "UPVC with Mesh", included: true },
          { label: "Painting", value: "Asian Paints Royal", included: true }
        ]
      }
    },
    {
      id: 2,
      title: "Platinum Package",
      price: "2,450",
      icon: Star,
      delay: 0.4,
      features: [
        { text: "Full Architectural & Interior Design", included: true },
        { text: "Advanced Structural Engineering", included: true },
        { text: "Italian Marble / Premium Granite", included: true },
        { text: "Luxury Texture & Royal Painting", included: true },
        { text: "High-End Branded Fixtures", included: true }
      ],
      details: {
        design: [
          { label: "Architectural Plan", value: "Full Design Suite", included: true },
          { label: "Interior Design", value: "3D Walkthrough", included: true },
          { label: "Landscape Design", value: "Included", included: true },
          { label: "Site Visits", value: "Unlimited", included: true }
        ],
        civil: [
          { label: "Cement", value: "Ultratech Premium", included: true },
          { label: "Steel", value: "TATA Tiscon 550D", included: true },
          { label: "Bricks", value: "Premium Wire-cut", included: true },
          { label: "Waterproofing", value: "Dr. Fixit Full Suite", included: true }
        ],
        finishing: [
          { label: "Flooring", value: "Italian Marble / Granite", included: true },
          { label: "Main Door", value: "Designer Teak Wood", included: true },
          { label: "Windows", value: "Soundproof UPVC", included: true },
          { label: "Smart Home", value: "Basic Automation", included: true }
        ]
      }
    }
  ];

  const [packages, setPackages] = useState(fallbackPackages);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedPkgType, setSelectedPkgType] = useState('Gold');

  useEffect(() => {
    fetch('/api/packages')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          // Map string icon names from DB to React components
          const mapped = data.map((pkg: any, i: number) => ({
            ...pkg,
            id: pkg._id || i,
            icon: typeof pkg.icon === 'string' ? getIconComponent(pkg.icon) : pkg.icon,
            delay: i * 0.2,
          }));
          setPackages(mapped);
          // Set active to the popular one or first
          const popularIdx = mapped.findIndex((p: any) => p.isPopular);
          if (popularIdx !== -1) setActivePkg(mapped[popularIdx].id);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <PageHeader title="Construction Packages" breadcrumb="Our Packages" />
      
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-surface -z-10" />
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <span className="text-accent font-accent font-bold uppercase tracking-[0.4em] text-xs mb-6 block">Transparent Pricing</span>
            <h2 className="text-4xl lg:text-6xl font-display font-black text-primary uppercase italic leading-tight mb-8">
              Premium Construction <br />
              <span className="text-accent not-italic">Detailed Breakdown</span>
            </h2>
            <p className="text-slate-600 font-accent text-lg leading-relaxed">
              Select a package to view the detailed technical specifications and material standards. 
              We believe in complete transparency to help you build with confidence.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-stretch mb-24">
            {packages.map((pkg: any, i: number) => (
              <PackageCard 
                key={pkg.id} 
                {...pkg} 
                isActive={activePkg === pkg.id}
                onClick={() => setActivePkg(pkg.id)}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {packages.find(p => p.id === activePkg) && (
              <motion.div
                key={activePkg}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-surface p-8 lg:p-16 rounded-3xl shadow-inner border border-slate-100"
              >
                {(() => {
                  const currentPkg = packages.find(p => p.id === activePkg);
                  if (!currentPkg) return null;
                  
                  return (
                    <div className="flex flex-col lg:flex-row gap-16">
                      <div className="lg:w-1/3">
                        <div className="sticky top-32">
                          <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-accent flex items-center justify-center text-primary rounded-xl">
                              <Info size={24} />
                            </div>
                            <h3 className="text-3xl font-display font-black text-primary uppercase italic">
                              {currentPkg.title} <br />
                              <span className="text-accent not-italic text-xl">Full Specifications</span>
                            </h3>
                          </div>
                          <p className="text-slate-500 font-accent text-sm leading-relaxed mb-8">
                            This package is designed for clients who prioritize {currentPkg.id === 0 ? 'affordability' : currentPkg.id === 1 ? 'quality and value' : 'luxury and excellence'}. 
                            All materials are sourced from authorized dealers with full warranty.
                          </p>
                          <button className="btn-pro btn-pro-primary w-full py-4">
                            DOWNLOAD PDF BROCHURE
                          </button>
                        </div>
                      </div>

                      <div className="lg:w-2/3 grid md:grid-cols-2 gap-12">
                        <div>
                          <h4 className="text-xl font-display font-black text-primary uppercase mb-6 border-b-2 border-accent inline-block">Design & Engineering</h4>
                          <div className="space-y-1">
                            {currentPkg.details.design.map((item: any, i: number) => (
                              <PackageDetailItem key={i} {...item} />
                            ))}
                          </div>

                          <h4 className="text-xl font-display font-black text-primary uppercase mt-12 mb-6 border-b-2 border-accent inline-block">Civil & Structural</h4>
                          <div className="space-y-1">
                            {currentPkg.details.civil.map((item: any, i: number) => (
                              <PackageDetailItem key={i} {...item} />
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-xl font-display font-black text-primary uppercase mb-6 border-b-2 border-accent inline-block">Finishing & Aesthetics</h4>
                          <div className="space-y-1">
                            {currentPkg.details.finishing.map((item: any, i: number) => (
                              <PackageDetailItem key={i} {...item} />
                            ))}
                          </div>

                          <div className="mt-12 p-8 bg-primary text-white rounded-2xl relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                            <h5 className="text-lg font-display font-black uppercase mb-4 relative z-10">Note on Pricing</h5>
                            <p className="text-xs text-slate-400 font-accent leading-relaxed relative z-10">
                              * Prices are subject to change based on site location and soil conditions. <br />
                              * Electrical and Plumbing points are as per standard architectural drawings. <br />
                              * Any additional features will be charged extra.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <section className="py-32 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-display font-black uppercase italic leading-tight mb-8">
                Customized <br />
                <span className="text-accent not-italic">Solutions</span>
              </h2>
              <p className="text-slate-300 font-accent text-lg leading-relaxed mb-10">
                Don't see a package that fits your exact needs? We also provide fully customized 
                construction solutions. Our engineers will work with you to create a plan that 
                matches your specific requirements and budget constraints.
              </p>
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="bg-white/5 p-8 border border-white/10">
                  <h4 className="text-accent font-display font-black uppercase mb-4">Material Selection</h4>
                  <p className="text-sm text-slate-400 font-accent">Choose from a wide range of premium materials and finishes.</p>
                </div>
                <div className="bg-white/5 p-8 border border-white/10">
                  <h4 className="text-accent font-display font-black uppercase mb-4">Flexible Design</h4>
                  <p className="text-sm text-slate-400 font-accent">Modify layouts and structural elements to suit your lifestyle.</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-12 lg:p-16 shadow-2xl relative overflow-hidden">
              {/* Decorative Blueprint Lines */}
              <div className="absolute top-0 right-0 w-32 h-32 border-t border-r border-slate-100 -z-0 translate-x-16 -translate-y-16" />
              <div className="absolute bottom-0 left-0 w-32 h-32 border-b border-l border-slate-100 -z-0 -translate-x-16 translate-y-16" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-px bg-accent" />
                  <h3 className="text-3xl font-display font-black text-primary uppercase italic">Get Detailed Quote</h3>
                </div>
                
                {success ? (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="bg-accent/5 p-12 text-center rounded-2xl border-2 border-accent/20"
                  >
                    <div className="w-16 h-16 bg-accent text-white rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle size={32} />
                    </div>
                    <h4 className="text-2xl font-display font-black text-primary uppercase mb-4">Request Sent!</h4>
                    <p className="text-slate-600 font-display font-bold uppercase text-[10px] tracking-widest leading-loose">
                      Our engineering team will analyze your package choice and send a detailed estimation to your email shortly.
                    </p>
                    <button onClick={() => setSuccess(false)} className="mt-8 text-accent font-display font-black uppercase text-xs tracking-widest hover:underline">New Quote Request</button>
                  </motion.div>
                ) : (
                  <form className="space-y-10" onSubmit={async (e) => {
                    e.preventDefault();
                    setErrors({});
                    const formData = new FormData(e.currentTarget);
                    const data = {
                      name: formData.get('name') as string,
                      email: formData.get('email') as string,
                      phone: 'Not Provided',
                      subject: `Quote Request for ${selectedPkgType} Package`,
                      message: `A client requested a detailed quote for the ${selectedPkgType} package.`,
                      interest: selectedPkgType
                    };

                    if (!isRequired(data.name)) { setErrors(p => ({...p, name: 'Required'})); return; }
                    if (!isValidEmail(data.email)) { setErrors(p => ({...p, email: 'Invalid Email'})); return; }

                    setSubmitting(true);
                    try {
                      const res = await fetch('/api/enquiries', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data)
                      });
                      if (res.ok) setSuccess(true);
                    } catch (err) {
                      alert('Submission failed. Check connection.');
                    } finally {
                      setSubmitting(false);
                    }
                  }}>
                    <div className="relative group">
                      <input name="name" type="text" className={`w-full bg-transparent border-b-2 ${errors.name ? 'border-red-500' : 'border-slate-200'} py-4 text-primary font-display font-bold uppercase tracking-wider focus:outline-none focus:border-accent transition-colors peer placeholder-transparent`} id="name" placeholder=" " />
                      <label htmlFor="name" className={`absolute left-0 -top-4 text-[10px] text-accent font-display font-bold uppercase tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:text-slate-400 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-accent`}>
                        {errors.name ? 'Full Name is Required' : 'Full Name'}
                      </label>
                    </div>
                    <div className="relative group">
                      <input name="email" type="email" className={`w-full bg-transparent border-b-2 ${errors.email ? 'border-red-500' : 'border-slate-200'} py-4 text-primary font-display font-bold uppercase tracking-wider focus:outline-none focus:border-accent transition-colors peer placeholder-transparent`} id="email" placeholder=" " />
                      <label htmlFor="email" className={`absolute left-0 -top-4 text-[10px] text-accent font-display font-bold uppercase tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:text-slate-400 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-accent`}>
                        {errors.email ? 'Valid Email Required' : 'Email Address'}
                      </label>
                    </div>
                    <div className="relative group">
                      <div className="text-[10px] font-display font-bold uppercase tracking-widest text-slate-400 mb-4">Select Package</div>
                      <div className="flex gap-2">
                        {['Silver', 'Gold', 'Platinum'].map((pkg) => (
                          <button 
                            key={pkg}
                            type="button"
                            onClick={() => setSelectedPkgType(pkg)}
                            className={`flex-1 py-3 text-[10px] font-display font-black uppercase tracking-widest transition-all border-2 ${selectedPkgType === pkg ? 'bg-accent border-accent text-white' : 'bg-surface border-slate-100 text-primary hover:border-accent'}`}
                          >
                            {pkg}
                          </button>
                        ))}
                      </div>
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.05, x: 10 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={submitting}
                      className="btn-pro btn-pro-primary w-full py-6 text-xl shadow-[20px_20px_60px_rgba(254,94,20,0.2)] disabled:opacity-50"
                    >
                      {submitting ? 'PREPARING...' : 'REQUEST QUOTE'}
                    </motion.button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Contact />
    </>
  );
}
