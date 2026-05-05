import React, { useState, useEffect } from 'react';
import { PageHeader } from '../components/PageHeader';
import { Contact } from '../components/Sections';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogPosts as fallbackBlogs } from '../data/blogs';
import { motion } from 'motion/react';

export default function Blogs() {
  const [blogPosts, setBlogPosts] = useState(fallbackBlogs);

  useEffect(() => {
    fetch('/api/blogs')
      .then(res => res.json())
      .then(data => { if (Array.isArray(data) && data.length > 0) setBlogPosts(data); })
      .catch(() => {});
  }, []);

  const [email, setEmail] = useState('');
  const [newsLoading, setNewsLoading] = useState(false);
  const [newsStatus, setNewsStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setNewsLoading(true);
    setNewsStatus(null);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (res.ok) {
        setNewsStatus({ type: 'success', msg: 'Subscribed successfully!' });
        setEmail('');
      } else {
        setNewsStatus({ type: 'error', msg: data.message || 'Subscription failed' });
      }
    } catch {
      setNewsStatus({ type: 'error', msg: 'Network error. Try again.' });
    } finally {
      setNewsLoading(false);
    }
  };

  return (
    <>
      <PageHeader title="Our Blogs" breadcrumb="Blogs" />
      
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-surface -z-10" />
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <span className="text-accent font-accent font-bold uppercase tracking-[0.4em] text-xs mb-6 block">Insights & News</span>
            <h2 className="text-4xl lg:text-6xl font-display font-black text-primary uppercase italic leading-tight mb-8">
              Stay Updated with <br />
              <span className="text-accent not-italic">Industry Trends</span>
            </h2>
            <p className="text-slate-600 font-accent text-lg leading-relaxed">
              Explore our latest articles on construction technology, sustainable engineering, 
              and innovative interior design solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {blogPosts.map((blog, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group flex flex-col bg-white shadow-2xl overflow-hidden relative"
              >
                <div className="relative h-72 overflow-hidden">
                  <img 
                    src={blog.image} 
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-6 left-6 bg-accent text-primary px-4 py-2 font-display font-black uppercase text-xs tracking-widest">
                    {blog.category}
                  </div>
                </div>
                <div className="p-10 flex flex-col flex-grow">
                  <div className="flex items-center gap-6 text-slate-400 text-[10px] font-display font-bold uppercase tracking-widest mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-accent" />
                      {new Date(blog.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <User size={14} className="text-accent" />
                      {blog.author}
                    </div>
                  </div>
                  <h3 className="text-2xl font-display font-black text-primary uppercase mb-6 group-hover:text-accent transition-colors leading-tight italic">
                    {blog.title}
                  </h3>
                  <p className="text-slate-500 font-accent font-medium text-sm leading-relaxed mb-10 flex-grow">
                    {blog.excerpt}
                  </p>
                  <Link 
                    to={`/blogs/${blog.slug || blog.id}`} 
                    className="text-primary font-display font-black uppercase tracking-widest text-xs flex items-center gap-3 group/link"
                  >
                    READ ARTICLE 
                    <div className="w-8 h-8 bg-surface flex items-center justify-center rounded-lg group-hover/link:bg-accent group-hover/link:text-white transition-all">
                      <ArrowRight size={14} />
                    </div>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="bg-accent p-12 lg:p-20 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl lg:text-5xl font-display font-black uppercase italic leading-tight mb-6 text-primary">
                Subscribe to Our <br />
                <span className="text-white not-italic">Newsletter</span>
              </h2>
              <p className="text-primary/80 font-accent font-bold text-lg">
                Get the latest industry insights and project updates delivered straight to your inbox.
              </p>
            </div>
            <div className="w-full lg:w-1/3">
              <form onSubmit={handleSubscribe} className="flex flex-col gap-4">
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email Address" 
                  className="bg-white/10 border-2 border-primary/20 px-6 py-5 w-full focus:outline-none focus:border-primary text-primary font-display font-bold uppercase tracking-widest placeholder:text-primary/50" 
                />
                <button disabled={newsLoading} className="btn-pro bg-primary text-white w-full py-5 disabled:opacity-50">
                  {newsLoading ? 'SUBSCRIBING...' : 'SUBSCRIBE NOW'}
                </button>
                {newsStatus && (
                  <p className={`text-xs font-bold uppercase tracking-widest mt-2 ${newsStatus.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                    {newsStatus.msg}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      <Contact />
    </>
  );
}
