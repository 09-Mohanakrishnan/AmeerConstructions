import React, { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { projectsData } from '../data/content';
import { ArrowLeft, Calendar, MapPin, User, Tag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Contact } from '../components/Sections';
import { isValidEmail, isValidPhone, isRequired } from '../lib/validation';

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<any>(projectsData.find(p => p.slug === slug) || null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setProject(data);
        }
      } catch {}
      finally { setLoading(false); }
    };
    fetchProject();
  }, [slug]);

  if (loading && !project) {
    return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" /></div>;
  }

  if (!project) {
    return <Navigate to="/projects" />;
  }

  return (
    <>
      <PageHeader title={project.title} breadcrumb={`Projects / ${project.title}`} />
      
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <Link to="/projects" className="inline-flex items-center gap-2 text-accent font-display font-bold uppercase tracking-widest text-sm mb-12 hover:gap-4 transition-all">
            <ArrowLeft size={16} /> Back to Projects
          </Link>

          <div className="grid lg:grid-cols-3 gap-24">
            <div className="lg:col-span-2">
              <div className="relative aspect-video overflow-hidden rounded-2xl mb-16 shadow-2xl">
                <img 
                  src={project.img} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="prose prose-xl max-w-none text-slate-600 font-accent">
                <h2 className="text-4xl font-display font-black text-primary uppercase italic mb-8">Project Overview</h2>
                <p className="mb-12 text-xl leading-relaxed">
                  {project.description}
                </p>

                <div className="grid md:grid-cols-2 gap-16 mb-16">
                  <div>
                    <h3 className="text-2xl font-display font-black text-primary uppercase italic mb-6">The Challenge</h3>
                    <p className="leading-relaxed">
                      {project.challenge}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-black text-primary uppercase italic mb-6">Our Solution</h3>
                    <p className="leading-relaxed">
                      {project.solution}
                    </p>
                  </div>
                </div>

                <h3 className="text-2xl font-display font-black text-primary uppercase italic mb-8">Technical Specifications</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-16">
                  {project.specifications?.map((spec, i) => (
                    <div key={i} className="bg-surface p-6 rounded-xl text-center border border-slate-100">
                      <div className="text-xs font-display font-bold uppercase tracking-widest text-slate-400 mb-2">{spec.label}</div>
                      <div className="text-lg font-display font-black text-primary uppercase">{spec.value}</div>
                    </div>
                  ))}
                </div>

                <h3 className="text-2xl font-display font-black text-primary uppercase italic mb-8">Project Gallery</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {project.gallery?.map((img, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      className="relative aspect-video overflow-hidden rounded-xl shadow-lg"
                    >
                      <img 
                        src={img} 
                        alt={`Gallery ${i + 1}`}
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-12">
                <div className="bg-surface p-12 rounded-2xl border-t-4 border-accent shadow-xl">
                  <h3 className="text-2xl font-display font-black text-primary uppercase mb-10">Project Details</h3>
                  <div className="space-y-8">
                    <div className="flex items-start gap-5">
                      <div className="w-12 h-12 bg-white flex items-center justify-center text-accent rounded-xl shadow-sm">
                        <User size={24} />
                      </div>
                      <div>
                        <div className="text-xs font-display font-bold uppercase tracking-widest text-slate-400 mb-1">Client</div>
                        <div className="text-lg font-display font-black text-primary uppercase">{project.client}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-5">
                      <div className="w-12 h-12 bg-white flex items-center justify-center text-accent rounded-xl shadow-sm">
                        <MapPin size={24} />
                      </div>
                      <div>
                        <div className="text-xs font-display font-bold uppercase tracking-widest text-slate-400 mb-1">Location</div>
                        <div className="text-lg font-display font-black text-primary uppercase">{project.location}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-5">
                      <div className="w-12 h-12 bg-white flex items-center justify-center text-accent rounded-xl shadow-sm">
                        <Calendar size={24} />
                      </div>
                      <div>
                        <div className="text-xs font-display font-bold uppercase tracking-widest text-slate-400 mb-1">Year</div>
                        <div className="text-lg font-display font-black text-primary uppercase">{project.year}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-5">
                      <div className="w-12 h-12 bg-white flex items-center justify-center text-accent rounded-xl shadow-sm">
                        <Tag size={24} />
                      </div>
                      <div>
                        <div className="text-xs font-display font-bold uppercase tracking-widest text-slate-400 mb-1">Category</div>
                        <div className="text-lg font-display font-black text-primary uppercase">{project.category}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-surface p-12 rounded-2xl border-t-4 border-accent shadow-xl relative overflow-hidden">
                  <h3 className="text-2xl font-display font-black text-primary uppercase mb-10">Enquire Now</h3>
                  
                  {success ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-10"
                    >
                      <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Tag size={40} />
                      </div>
                      <h4 className="text-2xl font-display font-black text-primary uppercase mb-2">Thank You!</h4>
                      <p className="text-slate-500 font-accent text-sm mb-6">Your enquiry has been received. Our team will contact you shortly.</p>
                      <button onClick={() => setSuccess(false)} className="text-accent font-display font-bold uppercase tracking-widest text-xs hover:underline">Send Another Enquiry</button>
                    </motion.div>
                  ) : (
                    <form className="space-y-6" onSubmit={async (e) => {
                      e.preventDefault();
                      setErrors({});
                      const formData = new FormData(e.currentTarget);
                      const data = {
                        name: formData.get('name') as string,
                        email: formData.get('email') as string,
                        phone: formData.get('phone') as string,
                        subject: `Project Inquiry: ${project.title}`,
                        message: formData.get('message') as string,
                        interest: project.category || 'General'
                      };

                      // Validation
                      const newErrors: Record<string, string> = {};
                      if (!isRequired(data.name)) newErrors.name = 'Name is required';
                      if (!isValidEmail(data.email)) newErrors.email = 'Valid email is required';
                      if (!isValidPhone(data.phone)) newErrors.phone = 'Valid phone is required (min 10 digits)';
                      if (!isRequired(data.message)) newErrors.message = 'Message is required';

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
                        if (res.ok) {
                          setSuccess(true);
                          (e.target as HTMLFormElement).reset();
                        } else {
                          const errData = await res.json();
                          alert(errData.message || 'Submission failed');
                        }
                      } catch (err) {
                        alert('Network error. Please try again.');
                      } finally {
                        setSubmitting(false);
                      }
                    }}>
                      <div className="relative group">
                        <input name="name" className={`w-full bg-transparent border-b-2 ${errors.name ? 'border-accent' : 'border-slate-200'} py-4 text-primary font-display font-bold uppercase tracking-wider focus:outline-none focus:border-accent transition-colors peer placeholder-transparent`} placeholder=" " />
                        <label className={`absolute left-0 -top-4 text-[10px] text-accent font-display font-bold uppercase tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:text-slate-400 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-accent`}>
                          {errors.name || 'Full Name'}
                        </label>
                      </div>
                      <div className="relative group">
                        <input name="email" type="email" className={`w-full bg-transparent border-b-2 ${errors.email ? 'border-accent' : 'border-slate-200'} py-4 text-primary font-display font-bold uppercase tracking-wider focus:outline-none focus:border-accent transition-colors peer placeholder-transparent`} placeholder=" " />
                        <label className={`absolute left-0 -top-4 text-[10px] text-accent font-display font-bold uppercase tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:text-slate-400 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-accent`}>
                          {errors.email || 'Email Address'}
                        </label>
                      </div>
                      <div className="relative group">
                        <input name="phone" className={`w-full bg-transparent border-b-2 ${errors.phone ? 'border-accent' : 'border-slate-200'} py-4 text-primary font-display font-bold uppercase tracking-wider focus:outline-none focus:border-accent transition-colors peer placeholder-transparent`} placeholder=" " />
                        <label className={`absolute left-0 -top-4 text-[10px] text-accent font-display font-bold uppercase tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:text-slate-400 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-accent`}>
                          {errors.phone || 'Phone Number'}
                        </label>
                      </div>
                      <div className="relative group">
                        <textarea name="message" rows={2} className={`w-full bg-transparent border-b-2 ${errors.message ? 'border-accent' : 'border-slate-200'} py-4 text-primary font-display font-bold uppercase tracking-wider focus:outline-none focus:border-accent transition-colors peer placeholder-transparent`} placeholder=" " />
                        <label className={`absolute left-0 -top-4 text-[10px] text-accent font-display font-bold uppercase tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:text-slate-400 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-accent`}>
                          {errors.message || 'Tell us about your project'}
                        </label>
                      </div>
                      <button type="submit" disabled={submitting} className="btn-pro btn-pro-primary w-full py-5 text-sm disabled:opacity-50">
                        {submitting ? 'SENDING...' : 'SEND ENQUIRY'}
                      </button>
                    </form>
                  )}
                </div>

                <div className="bg-primary p-12 rounded-2xl text-white relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                  <h3 className="text-2xl font-display font-black uppercase mb-6 relative z-10">Next Project</h3>
                  <div className="relative z-10">
                    <p className="text-slate-400 font-accent mb-8">Check out our other successful projects across various sectors.</p>
                    <Link to="/projects" className="btn-pro btn-pro-primary w-full">
                      VIEW ALL PROJECTS
                    </Link>
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
