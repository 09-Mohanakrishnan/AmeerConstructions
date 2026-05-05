import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { Contact } from '../components/Sections';
import { Calendar, User, Tag, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { blogPosts as fallbackBlogs } from '../data/blogs';
import { motion } from 'motion/react';

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState<any>(null);
  const [allBlogs, setAllBlogs] = useState<any[]>(fallbackBlogs);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        // Try fetching from API
        const res = await fetch(`/api/blogs/${id}`);
        if (res.ok) {
          const data = await res.json();
          setBlog(data);
        } else {
          // Fallback to static data
          const found = fallbackBlogs.find(p => p.slug === id || p.id === id);
          setBlog(found || null);
        }
        // Fetch all blogs for sidebar
        const allRes = await fetch('/api/blogs');
        if (allRes.ok) {
          const allData = await allRes.json();
          if (Array.isArray(allData) && allData.length > 0) setAllBlogs(allData);
        }
      } catch (err) {
        console.error('Fetch error:', err);
        const found = fallbackBlogs.find(p => p.slug === id || p.id === id);
        setBlog(found || null);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-surface">
        <h2 className="text-4xl font-display font-black text-primary mb-6">Blog Not Found</h2>
        <Link to="/blogs" className="btn-pro btn-pro-primary">Back to Blogs</Link>
      </div>
    );
  }

  return (
    <>
      <PageHeader title="Blog Details" breadcrumb={blog.title} />
      
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Main Content */}
            <div className="lg:w-2/3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="relative h-[500px] overflow-hidden rounded-3xl mb-12 shadow-2xl">
                  <img 
                    src={blog.image} 
                    alt={blog.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-8 left-8 bg-accent text-primary px-6 py-3 font-display font-black uppercase text-sm tracking-widest rounded-lg">
                    {blog.category}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-8 text-slate-400 text-sm font-display font-bold uppercase tracking-widest mb-10 border-b border-slate-100 pb-10">
                  <div className="flex items-center gap-3">
                    <Calendar size={18} className="text-accent" />
                    {blog.date}
                  </div>
                  <div className="flex items-center gap-3">
                    <User size={18} className="text-accent" />
                    {blog.author}
                  </div>
                  <div className="flex items-center gap-3">
                    <Tag size={18} className="text-accent" />
                    {blog.tags.join(", ")}
                  </div>
                </div>

                <h1 className="text-4xl lg:text-6xl font-display font-black text-primary uppercase italic leading-tight mb-12">
                  {blog.title}
                </h1>

                <div 
                  className="prose prose-lg max-w-none font-accent text-slate-600 leading-relaxed mb-16
                    prose-headings:font-display prose-headings:font-black prose-headings:text-primary prose-headings:uppercase prose-headings:italic
                    prose-p:mb-8 prose-li:mb-4 prose-strong:text-primary prose-strong:font-black"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                <div className="flex flex-col sm:flex-row justify-between items-center gap-8 py-10 border-t border-b border-slate-100 mb-16">
                  <div className="flex items-center gap-6">
                    <span className="text-primary font-display font-black uppercase tracking-widest text-sm">Share this post:</span>
                    <div className="flex gap-4">
                      <button className="w-10 h-10 bg-surface flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-all rounded-lg">
                        <Facebook size={18} />
                      </button>
                      <button className="w-10 h-10 bg-surface flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-all rounded-lg">
                        <Twitter size={18} />
                      </button>
                      <button className="w-10 h-10 bg-surface flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-all rounded-lg">
                        <Linkedin size={18} />
                      </button>
                    </div>
                  </div>
                  <Link to="/blogs" className="flex items-center gap-3 text-primary font-display font-black uppercase tracking-widest text-sm hover:text-accent transition-colors">
                    <ArrowLeft size={18} /> Back to all blogs
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3">
              <div className="sticky top-32 space-y-12">
                {/* Search */}
                <div className="bg-surface p-10 rounded-3xl">
                  <h4 className="text-xl font-display font-black text-primary uppercase italic mb-8 border-b-2 border-accent inline-block">Search</h4>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Search blogs..." 
                      className="w-full bg-white border-2 border-slate-100 px-6 py-4 rounded-xl focus:outline-none focus:border-accent font-accent"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div className="bg-surface p-10 rounded-3xl">
                  <h4 className="text-xl font-display font-black text-primary uppercase italic mb-8 border-b-2 border-accent inline-block">Categories</h4>
                  <ul className="space-y-4">
                    {["Construction", "Interior Design", "Engineering", "Sustainability", "Safety"].map((cat, i) => (
                      <li key={i}>
                        <Link to="#" className="flex items-center justify-between group">
                          <span className="text-slate-600 font-accent font-bold group-hover:text-accent transition-colors">{cat}</span>
                          <span className="w-8 h-8 bg-white flex items-center justify-center rounded-lg text-xs font-display font-black text-primary group-hover:bg-accent group-hover:text-white transition-all">
                            {Math.floor(Math.random() * 10) + 1}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recent Posts */}
                <div className="bg-surface p-10 rounded-3xl">
                  <h4 className="text-xl font-display font-black text-primary uppercase italic mb-8 border-b-2 border-accent inline-block">Recent Posts</h4>
                  <div className="space-y-8">
                    {allBlogs.filter(p => (p.slug || p.id) !== id).slice(0, 3).map((post, i) => (
                      <Link key={i} to={`/blogs/${post.slug || post.id}`} className="flex gap-4 group">
                        <div className="w-20 h-20 shrink-0 overflow-hidden rounded-xl">
                          <img 
                            src={post.image} 
                            alt={post.title} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div>
                          <h5 className="text-sm font-display font-black text-primary uppercase leading-tight mb-2 group-hover:text-accent transition-colors">
                            {post.title}
                          </h5>
                          <span className="text-[10px] text-slate-400 font-display font-bold uppercase tracking-widest">{post.date}</span>
                        </div>
                      </Link>
                    ))}
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
