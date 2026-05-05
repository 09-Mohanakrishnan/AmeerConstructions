import React, { useState, useEffect } from 'react';
import {
  Building2,
  Hammer,
  Ruler,
  CheckCircle2,
  ArrowRight,
  Clock,
  Briefcase,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ChevronRight,
  HardHat,
  CheckCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';
import { servicesData } from '../data/content';
import { isValidEmail, isValidPhone, isRequired } from '../lib/validation';

// Icon mapper: converts icon name strings from DB to React components
const iconMap: Record<string, React.ReactNode> = {
  Building2: <Building2 size={24} />,
  Clock: <Clock size={24} />,
  Hammer: <Hammer size={24} />,
  Ruler: <Ruler size={24} />,
  Briefcase: <Briefcase size={24} />,
  HardHat: <HardHat size={24} />,
};
const getIcon = (name: string) => iconMap[name] || <Building2 size={24} />;

export const Services = () => {
  const [services, setServices] = useState(servicesData);

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => { if (Array.isArray(data) && data.length > 0) setServices(data); })
      .catch(() => { });
  }, []);

  return (
    <section id="services" className="py-32 bg-white relative overflow-hidden">
      <div className="section-title-bg">SERVICES</div>
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <span className="text-accent font-accent font-bold uppercase tracking-[0.3em] text-sm">Our Expertise</span>
          <h2 className="text-4xl lg:text-6xl mt-4 text-primary font-black italic text-accent-headline">Professional Services</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s: any, i: number) => (
            <motion.div
              key={s._id || i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white group shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden flex flex-col"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/40 transition-colors" />
              </div>
              <div className="p-10 flex flex-col flex-grow">
                <h3 className="text-2xl mb-6 font-display font-black text-primary uppercase">{s.title}</h3>
                <p className="text-slate-500 leading-relaxed mb-10 font-accent font-medium flex-grow">
                  {s.shortDesc}
                </p>
                <Link to={`/services/${s.slug}`} className="btn-pro btn-pro-primary text-center w-full">
                  KNOW MORE
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const About = () => (
  <section id="about" className="py-32 bg-surface relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-col lg:flex-row items-center gap-24">
        <div className="lg:w-1/2 relative">
          <div className="grid grid-cols-2 gap-4">
            <div className="pt-12">
              <img
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800"
                alt="Construction"
                className="rounded-lg shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="pb-12">
              <img
                src="./images/engineering.jpg"
                alt="Engineering"
                className="rounded-lg shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-primary p-10 rounded-full w-40 h-40 flex flex-col items-center justify-center shadow-2xl border-8 border-surface z-20">
            <div className="text-4xl font-display font-black leading-none">25</div>
            <div className="text-[10px] font-display font-bold uppercase text-center mt-1">Years of <br />Success</div>
          </div>
        </div>

        <div className="lg:w-1/2">
          <span className="text-accent font-accent font-bold uppercase tracking-[0.3em] text-sm">About Company</span>
          <h2 className="text-4xl lg:text-6xl mt-4 mb-10 text-primary font-black italic leading-tight">We Build Your <br /><span className="text-accent-headline not-italic">Visions</span></h2>
          <p className="text-slate-600 mb-10 leading-relaxed text-lg font-accent font-medium">
            Ameer Civil Engineers is a leading name in the civil engineering industry.
            We specialize in delivering high-quality, sustainable, and innovative
            construction solutions that stand the test of time.
          </p>

          <div className="grid grid-cols-2 gap-8 mb-12">
            {[
              { title: "Quality Control", desc: "Rigorous standards for every project." },
              { title: "Expert Team", desc: "Certified professional engineers." },
              { title: "Safety First", desc: "Zero-accident workplace policy." },
              { title: "On Time", desc: "Strict adherence to project timelines." }
            ].map((item, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-accent" size={20} />
                  <span className="font-display font-black text-primary uppercase tracking-wide">{item.title}</span>
                </div>
                <p className="text-sm text-slate-500 font-accent ml-8">{item.desc}</p>
              </div>
            ))}
          </div>

          <Link to="/about" className="btn-pro btn-pro-primary inline-block text-center">
            LEARN MORE ABOUT US
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export const Projects = () => {
  const fallbackProjects = [
    { slug: "skyline-residency", title: "Skyline Residency", category: "Residential", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800" },
    { slug: "metro-tech-park", title: "Metro Tech Park", category: "Commercial", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800" },
    { slug: "grand-plaza-mall", title: "Grand Plaza Mall", category: "Commercial", img: "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&q=80&w=800" },
    { slug: "ocean-view-villas", title: "Ocean View Villas", category: "Residential", img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800" },
    { slug: "industrial-hub", title: "Industrial Hub", category: "Industrial", img: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&q=80&w=800" },
    { slug: "city-bridge", title: "City Bridge", category: "Infrastructure", img: "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&q=80&w=800" },
  ];
  const [projects, setProjects] = useState(fallbackProjects);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => { if (Array.isArray(data) && data.length > 0) setProjects(data); })
      .catch(() => { });
  }, []);

  return (
    <section id="projects" className="py-32 bg-primary text-white relative overflow-hidden">
      <div className="section-title-bg !text-white/5">PORTFOLIO</div>
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <span className="text-accent font-accent font-bold uppercase tracking-[0.3em] text-sm">Our Work</span>
            <h2 className="text-4xl lg:text-6xl mt-4 font-black italic text-accent-headline">Recent Projects</h2>
          </div>
          <div className="flex gap-8 font-display font-bold uppercase tracking-widest text-sm">
            <button className="text-accent border-b-2 border-accent pb-2">ALL</button>
            <button className="text-white/40 hover:text-white transition-colors pb-2">RESIDENTIAL</button>
            <button className="text-white/40 hover:text-white transition-colors pb-2">COMMERCIAL</button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              className="relative group overflow-hidden aspect-square"
            >
              <img
                src={p.img}
                alt={p.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                referrerPolicy="no-referrer"
              />
              {/* Mobile Link Overlay - Covers entire card for touch devices */}
              <Link 
                to={`/projects/${p.slug}`} 
                className="absolute inset-0 z-20 lg:hidden"
              />
              <div className="absolute inset-0 bg-accent/90 translate-y-full lg:translate-y-full group-hover:translate-y-0 lg:group-hover:translate-y-0 transition-transform duration-500 flex flex-col justify-center items-center p-10 text-center sm:translate-y-0 sm:bg-accent/40 lg:bg-accent/90 pointer-events-none lg:pointer-events-auto">
                <span className="text-primary font-accent font-bold text-xs uppercase tracking-[0.2em] mb-4">{p.category}</span>
                <h3 className="text-xl lg:text-3xl font-display font-black text-primary uppercase mb-4 lg:mb-8 leading-tight">{p.title}</h3>
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-primary text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                  <ArrowRight size={20} className="lg:hidden" />
                  <ArrowRight size={32} className="hidden lg:block" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const StatItem = ({ value, label, index }: { value: string, label: string, index: number }) => {
  const [count, setCount] = useState(0);
  const target = parseInt(value);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="text-5xl lg:text-6xl font-display font-black mb-2 text-accent">{count}{value.includes('+') ? '+' : ''}</div>
      <div className="text-xs lg:text-sm uppercase font-bold tracking-[0.3em] opacity-80">{label}</div>
    </motion.div>
  );
};

export const Stats = () => (
  <section className="py-20 bg-primary relative overflow-hidden">
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
    <div className="max-w-7xl mx-auto px-4 relative z-10">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-white text-center">
        <StatItem value="500+" label="Projects Completed" index={0} />
        <StatItem value="150+" label="Expert Workers" index={1} />
        <StatItem value="25+" label="Years Experience" index={2} />
        <StatItem value="40+" label="Awards Won" index={3} />
      </div>
    </div>
  </section>
);

export const Testimonials = () => {
  const fallbackTestimonials = [
    { name: "Rajesh Kumar", role: "CEO, TechPark", text: "Ameer Civil Engineers delivered our office complex ahead of schedule. Their attention to structural detail is unmatched." },
    { name: "Priya Sharma", role: "Homeowner", text: "Building our dream home was stress-free thanks to their professional team. Highly recommend for residential projects." },
    { name: "Suresh Raina", role: "MD, Industrial Hub", text: "Expert consultancy and quality execution. They are our go-to partner for all industrial construction needs." },
    { name: "Anil Kapoor", role: "Developer", text: "The most reliable civil engineers in Chennai. Their technical expertise is truly world-class." },
    { name: "Meera Nair", role: "Architect", text: "Collaborating with Ameer Civil Engineers is always a pleasure. They bring precision to every design." }
  ];
  const [testimonials, setTestimonials] = useState(fallbackTestimonials);

  useEffect(() => {
    fetch('/api/testimonials')
      .then(res => res.json())
      .then(data => { if (Array.isArray(data) && data.length > 0) setTestimonials(data); })
      .catch(() => { });
  }, []);

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="section-title-bg">REVIEWS</div>
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <span className="text-accent font-accent font-bold uppercase tracking-[0.3em] text-sm">Testimonials</span>
          <h2 className="text-4xl lg:text-6xl mt-4 text-primary font-black italic text-accent-headline">What Clients Say</h2>
        </div>

        <div className="relative">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
            className="flex gap-12 w-max"
          >
            {[...testimonials, ...testimonials].map((t, i) => (
              <div key={i} className="w-[400px] bg-surface p-12 rounded-xl relative group hover:bg-primary transition-all duration-500 shrink-0">
                <div className="text-accent text-8xl font-display font-black absolute -top-6 -left-4 opacity-20 group-hover:opacity-40">"</div>
                <p className="text-slate-600 group-hover:text-slate-300 italic mb-10 leading-relaxed font-accent font-medium relative z-10">
                  {t.text}
                </p>
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-accent rounded-full flex items-center justify-center font-display font-black text-primary text-xl overflow-hidden border-2 border-accent/20">
                    {(t as any).image ? (
                      <img src={(t as any).image} alt={t.name} className="w-full h-full object-cover" />
                    ) : (
                      t.name[0]
                    )}
                  </div>
                  <div>
                    <div className="font-display font-black text-primary uppercase tracking-wide group-hover:text-white">{t.name}</div>
                    <div className="text-xs text-accent uppercase font-bold tracking-widest">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Gradient Overlays */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-20" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-20" />
        </div>
      </div>
    </section>
  );
};

export const Team = () => (
  <section id="team" className="py-32 bg-white relative overflow-hidden">
    <div className="section-title-bg">OUR TEAM</div>
    <div className="max-w-7xl mx-auto px-4 relative z-10">
      <div className="text-center mb-20">
        <span className="text-accent font-accent font-bold uppercase tracking-[0.3em] text-sm">Experts</span>
        <h2 className="text-4xl lg:text-6xl mt-4 text-primary font-black italic text-accent-headline">Professional Team</h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { name: "Ameer Ahmed", role: "Founder & Chief Engineer", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400" },
          { name: "Sarah John", role: "Project Director", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400" },
          { name: "Vikram Singh", role: "Structural Consultant", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400" },
          { name: "Anita Desai", role: "Interior Architect", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400" }
        ].map((m, i) => (
          <div key={i} className="group">
            <div className="relative overflow-hidden mb-8 aspect-[3/4]">
              <img
                src={m.img}
                alt={m.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-accent/90 translate-y-full group-hover:translate-y-0 lg:translate-y-full lg:group-hover:translate-y-0 transition-transform duration-500 flex justify-center items-center gap-4 sm:translate-y-0 sm:bg-accent/20 lg:bg-accent/90">
                <Facebook size={20} className="text-primary hover:scale-125 cursor-pointer transition-transform" />
                <Twitter size={20} className="text-primary hover:scale-125 cursor-pointer transition-transform" />
                <Linkedin size={20} className="text-primary hover:scale-125 cursor-pointer transition-transform" />
              </div>
            </div>
            <h3 className="text-2xl font-display font-black text-primary uppercase text-center mb-1">{m.name}</h3>
            <p className="text-accent text-center text-xs uppercase font-bold tracking-[0.2em]">{m.role}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const Contact = () => {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [interest, setInterest] = useState('Construction');

  return (
    <section id="contact" className="py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-surface/50 -z-10" />
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-32">
          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-12">
              <div className="w-12 h-px bg-accent" />
              <h3 className="text-3xl font-display font-black uppercase italic">Project Inquiry</h3>
            </div>

            <h2 className="text-5xl lg:text-7xl font-display font-black uppercase italic leading-[0.85] mb-12 text-primary">
              Let's Build <br />
              <span className="text-accent-headline not-italic/10">Something Great</span>
            </h2>

            <div className="space-y-12">
              <div className="group cursor-pointer">
                <div className="text-xs font-display font-bold uppercase tracking-widest text-slate-400 mb-2 group-hover:text-accent transition-colors">Office Location</div>
                <div className="text-xl font-display font-black uppercase text-primary leading-tight">123 Construction Ave, <br />Chennai, Tamil Nadu 600001</div>
              </div>
              <div className="group cursor-pointer">
                <div className="text-xs font-display font-bold uppercase tracking-widest text-slate-400 mb-2 group-hover:text-accent transition-colors">Direct Contact</div>
                <div className="text-2xl font-display font-black uppercase text-accent">+91 98765 43210</div>
                <div className="text-lg font-display font-bold text-slate-400">info@ameerconstructions.com</div>
              </div>
            </div>
          </motion.div>

          {/* Form Side */}
          <div className="relative">
            {success ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-accent/5 p-16 text-center border-2 border-accent/20 rounded-3xl"
              >
                <div className="w-24 h-24 bg-accent text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                  <CheckCircle size={48} />
                </div>
                <h4 className="text-4xl font-display font-black text-primary uppercase mb-4 italic">Message Sent!</h4>
                <p className="text-slate-600 font-accent font-bold uppercase text-[10px] tracking-[0.3em] leading-relaxed mb-10">
                  Our specialists are reviewing your inquiry. We'll get back to you within 24 business hours.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="font-display font-black uppercase text-xs tracking-widest text-accent hover:underline"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form className="space-y-12" onSubmit={async (e) => {
                e.preventDefault();
                setErrors({});
                const formData = new FormData(e.currentTarget);
                const data = {
                  name: formData.get('name') as string,
                  email: formData.get('email') as string,
                  phone: formData.get('phone') as string,
                  subject: `Main Contact Form Inquiry`,
                  message: formData.get('message') as string,
                  interest: interest
                };

                const newErrors: Record<string, string> = {};
                if (!isRequired(data.name)) newErrors.name = 'Required';
                if (!isValidEmail(data.email)) newErrors.email = 'Invalid';
                if (!isValidPhone(data.phone)) newErrors.phone = 'Invalid';
                if (!isRequired(data.message)) newErrors.message = 'Required';

                if (Object.keys(newErrors).length > 0) {
                  setErrors(newErrors);
                  return;
                }

                setSubmitting(true);
                try {
                  const res = await fetch('/api/enquiries', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                  });
                  if (res.ok) setSuccess(true);
                } catch (err) {
                  alert('Submission failed.');
                } finally {
                  setSubmitting(false);
                }
              }}>
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="relative group">
                    <input name="name" type="text" className={`w-full bg-transparent border-b-2 ${errors.name ? 'border-accent' : 'border-slate-200'} py-4 text-primary font-display font-bold uppercase tracking-wider focus:outline-none focus:border-accent transition-colors peer placeholder-transparent`} placeholder=" " />
                    <label className={`absolute left-0 -top-4 text-[10px] text-accent font-display font-bold uppercase tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:text-slate-400 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-accent uppercase`}>
                      {errors.name ? 'Name Required' : 'Full Name'}
                    </label>
                  </div>
                  <div className="relative group">
                    <input name="email" type="email" className={`w-full bg-transparent border-b-2 ${errors.email ? 'border-accent' : 'border-slate-200'} py-4 text-primary font-display font-bold uppercase tracking-wider focus:outline-none focus:border-accent transition-colors peer placeholder-transparent`} placeholder=" " />
                    <label className={`absolute left-0 -top-4 text-[10px] text-accent font-display font-bold uppercase tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:text-slate-400 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-accent uppercase`}>
                      {errors.email ? 'Invalid Email' : 'Email Address'}
                    </label>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                  <div className="relative group">
                    <input name="phone" type="tel" className={`w-full bg-transparent border-b-2 ${errors.phone ? 'border-accent' : 'border-slate-200'} py-4 text-primary font-display font-bold uppercase tracking-wider focus:outline-none focus:border-accent transition-colors peer placeholder-transparent`} placeholder=" " />
                    <label className={`absolute left-0 -top-4 text-[10px] text-accent font-display font-bold uppercase tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:text-slate-400 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-accent uppercase`}>
                      {errors.phone ? 'Need 10+ digits' : 'Phone Number'}
                    </label>
                  </div>
                  <div className="relative group">
                    <div className="text-[10px] font-display font-bold uppercase tracking-widest text-slate-400 mb-4">Project Type</div>
                    <div className="flex flex-wrap gap-2">
                      {['Construction', 'Interior', 'Renovation'].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setInterest(type)}
                          className={`px-3 py-1.5 border-2 ${interest === type ? 'bg-accent border-accent text-white' : 'border-slate-100 text-primary'} text-[10px] font-display font-black uppercase tracking-widest transition-all`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="relative group">
                  <textarea name="message" className={`w-full bg-transparent border-b-2 ${errors.message ? 'border-accent' : 'border-slate-200'} py-4 text-primary font-display font-bold uppercase tracking-wider focus:outline-none focus:border-accent transition-colors peer placeholder-transparent`} placeholder=" " rows={2} />
                  <label className={`absolute left-0 -top-4 text-[10px] text-accent font-display font-bold uppercase tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:text-slate-400 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-accent uppercase`}>
                    {errors.message ? 'Message empty' : 'Tell us about your project'}
                  </label>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05, x: 20 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={submitting}
                  className="btn-pro btn-pro-primary w-full py-8 text-2xl flex items-center justify-center gap-6 shadow-[20px_20px_60px_rgba(255,122,61,0.15)] disabled:opacity-50"
                >
                  {submitting ? 'SENDING...' : (
                    <>
                      SEND INQUIRY <ArrowRight />
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "What types of construction projects do you handle?",
      a: "We handle a wide range of projects including residential homes, commercial office spaces, industrial facilities, and large-scale infrastructure developments."
    },
    {
      q: "How do you ensure project quality and safety?",
      a: "We adhere to strict international safety standards and quality control protocols. Our team undergoes regular training, and we use high-grade materials and advanced engineering techniques."
    },
    {
      q: "Can you help with project planning and estimation?",
      a: "Yes, we provide comprehensive consultancy services including feasibility studies, cost estimation, and detailed project planning to ensure your vision is viable and within budget."
    },
    {
      q: "What is your typical project timeline?",
      a: "Timelines vary based on project scale and complexity. However, we are known for our strict adherence to schedules and efficient project management to ensure on-time delivery."
    }
  ];

  return (
    <section className="py-32 bg-surface relative overflow-hidden">
      <div className="section-title-bg">QUESTIONS</div>
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <span className="text-accent font-accent font-bold uppercase tracking-[0.3em] text-sm">FAQ</span>
          <h2 className="text-4xl lg:text-6xl mt-4 text-primary font-black italic text-accent-headline">Common Queries</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white shadow-lg overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-8 flex justify-between items-center text-left hover:bg-slate-50 transition-colors"
              >
                <span className="text-xl font-display font-black text-primary uppercase tracking-wide">{faq.q}</span>
                <div className={cn(
                  "w-8 h-8 rounded-full border-2 border-accent flex items-center justify-center transition-transform duration-300",
                  openIndex === i ? "rotate-180 bg-accent text-primary" : "text-accent"
                )}>
                  <ChevronRight size={20} className="rotate-90" />
                </div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-8 pt-0 text-slate-600 font-accent font-medium leading-relaxed border-t border-slate-50">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
