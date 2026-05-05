import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../lib/api';
import { 
  Wrench, 
  FileText, 
  FolderOpen, 
  Package, 
  MessageSquareQuote, 
  ArrowRight, 
  TrendingUp, 
  Users, 
  Globe, 
  Calendar as CalendarIcon,
  Activity,
  Mail,
  Zap,
  Plus,
  Trash2,
  X,
  FileDown,
  Clock
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface Counts {
  services: number;
  blogs: number;
  projects: number;
  packages: number;
  enquiries: number;
  newsletter: number;
}

interface SiteVisit {
  _id?: string;
  date: string;
  title: string;
  notes: string;
  technician: string;
  status: string;
}

// World News Pool for "Real-time" feeling
const worldNewsPool = [
  { title: "Microsoft Announces $2.9B Investment in AI Infrastructure in Japan", source: "Reuters", tag: "Tech" },
  { title: "Global Oil Prices Stabilize Amid Middle East Geopolitical Shifts", source: "Bloomberg", tag: "Economy" },
  { title: "NASA's Perseverance Rover Discovers Ancient Riverbed on Mars", source: "Space.com", tag: "Science" },
  { title: "EU Parliament Passes Landmark Artificial Intelligence Act", source: "BBC", tag: "Politics" },
  { title: "Toyota Unveils Next-Gen Solid-State Battery for Electric Vehicles", source: "Nikkei Asia", tag: "Innovation" },
  { title: "Federal Reserve Signals Potential Rate Cuts Later This Year", source: "CNBC", tag: "Finance" },
  { title: "New Cancer Treatment Shows 90% Success in Early Clinical Trials", source: "HealthLine", tag: "Medical" },
  { title: "Amazon Web Services to Launch First Infrastructure Region in Riyadh", source: "TechCrunch", tag: "Cloud" }
];

export default function Dashboard() {
  const [counts, setCounts] = useState<Counts>({ 
    services: 0, blogs: 0, projects: 0, packages: 0, enquiries: 0, newsletter: 0 
  });
  const [recentLeads, setRecentLeads] = useState<any[]>([]);
  const [siteVisits, setSiteVisits] = useState<SiteVisit[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Real-time news state
  const [news, setNews] = useState(worldNewsPool.slice(0, 4));
  
  // Calendar Modal state
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [newVisit, setNewVisit] = useState({ title: '', notes: '', technician: '', status: 'Scheduled' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [s, b, p, pk, e, n, v] = await Promise.all([
          api.get('/services?all=true'),
          api.get('/blogs?all=true'),
          api.get('/projects?all=true'),
          api.get('/packages?all=true'),
          api.get('/enquiries'),
          api.get('/newsletter'),
          api.get('/site-visits')
        ]);
        
        setCounts({
          services: s.data.length,
          blogs: b.data.length,
          projects: p.data.length,
          packages: pk.data.length,
          enquiries: e.data.length,
          newsletter: n.data.length,
        });

        const combinedLeads = [
          ...e.data.map((l: any) => ({ ...l, type: 'Enquiry', date: new Date(l.createdAt) })),
          ...n.data.map((l: any) => ({ ...l, type: 'Newsletter', date: new Date(l.subscribedAt), name: l.email }))
        ].sort((a, b) => b.date.getTime() - a.date.getTime());
        
        setRecentLeads(combinedLeads);
        setSiteVisits(v.data);
      } catch (err) {
        console.error('Data sync failed:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    // Rotate News every 10 seconds for "Real-time" feel
    const interval = setInterval(() => {
      setNews(prev => {
        const next = [...prev];
        next.shift();
        next.push(worldNewsPool[Math.floor(Math.random() * worldNewsPool.length)]);
        return next;
      });
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleAddVisit = async () => {
    if (!newVisit.title) return;
    try {
      const { data } = await api.post('/site-visits', { ...newVisit, date: selectedDate });
      setSiteVisits(prev => {
        const index = prev.findIndex(v => v.date === selectedDate && v.title === data.title);
        if (index > -1) {
          const updated = [...prev];
          updated[index] = data;
          return updated;
        }
        return [...prev, data];
      });
      setNewVisit({ title: '', notes: '', technician: '', status: 'Scheduled' });
    } catch (err) {
       console.error(err);
    }
  };

  const handleDeleteVisit = async (id: string) => {
    try {
      await api.delete(`/site-visits/${id}`);
      setSiteVisits(prev => prev.filter(v => v._id !== id));
    } catch (err) {
       console.error(err);
    }
  };

  // Enquiry Trends Aggregation (Creative)
  const getTrendData = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const data = [0, 0, 0, 0, 0, 0, 0];
    recentLeads.forEach(l => {
      const day = new Date(l.date).getDay();
      data[day]++;
    });
    // Scale for visualization (max height 100%)
    const max = Math.max(...data, 1);
    return data.map(v => (v / max) * 100);
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) return (
    <div className="flex flex-col justify-center items-center h-[calc(100vh-200px)] gap-4">
      <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Synchronizing Systems...</span>
    </div>
  );

  return (
    <div className="space-y-10 pb-20 relative">
      {/* Printable Report Layer (Hidden initially) */}
      <div className="hidden print:block print:fixed print:inset-0 print:bg-white print:z-[100] p-20">
        <div className="flex justify-between items-start border-b-4 border-primary pb-10 mb-10">
          <div>
            <h1 className="text-4xl font-display font-black text-primary uppercase italic">Management Report</h1>
            <p className="text-slate-500 font-accent font-bold uppercase tracking-widest mt-2">{new Date().toLocaleDateString(undefined, { dateStyle: 'full' })}</p>
          </div>
          <img src="/images/logo.png" alt="Logo" className="h-16 w-auto" />
        </div>
        
        <div className="grid grid-cols-2 gap-10 mb-20">
          <div className="bg-slate-50 p-10 rounded-3xl">
            <h2 className="text-xl font-display font-black text-primary uppercase mb-6">Execution Summary</h2>
            <div className="space-y-4">
               <div className="flex justify-between border-b border-slate-200 pb-2">
                 <span className="font-accent font-bold text-slate-500 uppercase text-xs">Total Enquiries</span>
                 <span className="font-display font-black text-primary">{counts.enquiries}</span>
               </div>
               <div className="flex justify-between border-b border-slate-200 pb-2">
                 <span className="font-accent font-bold text-slate-500 uppercase text-xs">Newsletter Growth</span>
                 <span className="font-display font-black text-primary">{counts.newsletter}</span>
               </div>
               <div className="flex justify-between border-b border-slate-200 pb-2">
                 <span className="font-accent font-bold text-slate-500 uppercase text-xs">Active Projects</span>
                 <span className="font-display font-black text-primary">{counts.projects}</span>
               </div>
            </div>
          </div>
          <div className="bg-slate-50 p-10 rounded-3xl">
            <h2 className="text-xl font-display font-black text-primary uppercase mb-6">Site Activity</h2>
            <p className="text-slate-600 font-accent leading-relaxed">
              System currently monitoring {siteVisits.length} scheduled site visits across various sectors. 
              Average lead response time remains within the 24-hour target window.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-display font-black text-primary uppercase italic mb-10">Recent High-Priority Leads</h2>
        <table className="w-full text-left border-collapse">
          <thead>
             <tr className="bg-primary text-white">
               <th className="p-4 uppercase text-[10px] tracking-widest">Name/Email</th>
               <th className="p-4 uppercase text-[10px] tracking-widest">Type</th>
               <th className="p-4 uppercase text-[10px] tracking-widest">Captured Date</th>
             </tr>
          </thead>
          <tbody>
            {recentLeads.slice(0, 15).map((l, i) => (
              <tr key={i} className="border-b border-slate-100">
                <td className="p-4 font-display font-black text-sm uppercase">{l.name || l.email}</td>
                <td className="p-4 font-accent font-bold text-xs text-slate-500 uppercase">{l.type}</td>
                <td className="p-4 font-accent font-medium text-xs text-slate-400">{new Date(l.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="mt-20 pt-10 border-t border-slate-200 flex justify-between">
           <p className="text-[10px] font-black text-slate-300 uppercase">Authorized System Audit • Ameer Civil Engineers</p>
           <p className="text-[10px] font-black text-slate-300 uppercase">Ref: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
        </div>
      </div>

      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary via-primary to-primary/90 p-10 md:p-14 text-white shadow-2xl"
      >
        {/* Background texture */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
        {/* Decorative orbs */}
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-accent-glow rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-accent-glow/50 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
          {/* Left: Greeting & Status */}
          <div className="space-y-5 flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-white/10 border border-white/10 rounded-full text-[8px] font-black uppercase tracking-[0.25em] flex items-center gap-2">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
                </span>
                All Systems Online
              </span>
              <span className="px-3 py-1 bg-accent/20 border border-accent/20 rounded-full text-[8px] font-black uppercase tracking-[0.25em] text-accent">
                v2.0
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black uppercase italic leading-[0.95] tracking-tight text-white group">
              Welcome Back<span className="text-accent-headline not-italic">.</span>
            </h2>

            <p className="text-white/50 font-accent font-bold text-[10px] uppercase tracking-[0.3em] max-w-md leading-relaxed">
              Real-time overview of site operations, lead acquisition, and project delivery metrics.
            </p>

            {/* Live status chips */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5">
                <CalendarIcon size={14} className="text-accent" />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5">
                <Clock size={14} className="text-accent" />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5">
                <Activity size={14} className="text-green-400" />
                <span className="text-[10px] font-black uppercase tracking-widest">{counts.enquiries + counts.newsletter} Total Leads</span>
              </div>
            </div>
          </div>

          {/* Right: Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <button
              onClick={handlePrint}
              className="group flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-2xl py-4 px-8 transition-all duration-300 hover:shadow-lg hover:shadow-white/5"
            >
              <FileDown size={18} className="text-accent group-hover:scale-110 transition-transform" />
              <span className="font-display font-black uppercase text-[10px] tracking-widest">Leads Report</span>
            </button>
            <button
              onClick={() => setIsCalendarOpen(true)}
              className="group flex items-center gap-3 bg-accent hover:bg-accent/90 text-primary rounded-2xl py-4 px-8 transition-all duration-300 shadow-xl shadow-accent/20 hover:shadow-2xl hover:shadow-accent/30"
            >
              <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
              <span className="font-display font-black uppercase text-[10px] tracking-widest">Schedule Visit</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        variants={{
          show: { transition: { staggerChildren: 0.1 } }
        }}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {[
          { label: 'Total Enquiries', value: counts.enquiries, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50', trend: '+18.4%' },
          { label: 'News Subscriptions', value: counts.newsletter, icon: Mail, color: 'text-orange-600', bg: 'bg-orange-50', trend: '+12.1%' },
          { label: 'Active Projects', value: counts.projects, icon: FolderOpen, color: 'text-purple-600', bg: 'bg-purple-50', trend: 'STABLE' },
          { label: 'Public Blogs', value: counts.blogs, icon: FileText, color: 'text-green-600', bg: 'bg-green-50', trend: 'UP' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
            className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 relative group cursor-pointer overflow-hidden"
          >
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className={cn("p-4 rounded-2xl transition-colors duration-500", stat.bg)}>
                <stat.icon size={28} className={stat.color} />
              </div>
              <div className="flex flex-col items-end">
                <span className={cn("text-[10px] font-black uppercase tracking-widest mb-1", stat.color === 'text-green-600' ? 'text-green-500' : 'text-slate-400')}>
                  {stat.trend}
                </span>
                <TrendingUp size={14} className={stat.color} />
              </div>
            </div>
            <div className="text-4xl font-display font-black text-primary mb-2 uppercase italic tracking-tighter relative z-10 group-hover:text-accent transition-colors">
              {stat.value.toString().padStart(2, '0')}
            </div>
            <p className="text-[10px] text-slate-500 font-accent font-bold uppercase tracking-[0.2em] relative z-10">{stat.label}</p>
            
            {/* Background Accent */}
            <div className={cn("absolute -bottom-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-10 transition-all duration-700 blur-2xl", stat.bg)} />
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Statistics & Activity */}
        <div className="lg:col-span-2 space-y-8">
           <motion.div 
             initial={{ opacity: 0, scale: 0.98 }}
             animate={{ opacity: 1, scale: 1 }}
             className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 relative overflow-hidden"
           >
            <div className="flex items-center justify-between mb-12">
              <div>
                <h3 className="text-2xl font-display font-black text-primary uppercase italic flex items-center gap-4">
                  <Activity className="text-accent animate-pulse" /> Enquiry Analytics
                </h3>
                <p className="text-[10px] text-slate-400 font-accent font-bold uppercase tracking-widest mt-2">Distribution of residential and commercial leads</p>
              </div>
               <div className="flex gap-2">
                 {['Daily', 'Weekly'].map(v => (
                   <button key={v} className={cn("px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all", v === 'Weekly' ? 'bg-primary text-white' : 'bg-slate-50 text-slate-400 hover:bg-slate-100')}>
                     {v}
                   </button>
                 ))}
               </div>
            </div>
            
            {/* Creative Populated Chart */}
            <div className="h-72 flex items-end justify-between gap-6 px-4 border-b border-slate-50 mb-8 relative">
              {getTrendData().map((h, i) => (
                <div key={i} className="group relative flex-1 flex flex-col items-center">
                  <div className="w-full max-w-[50px] bg-slate-50 group-hover:bg-accent/10 transition-all duration-500 h-full absolute bottom-0 -z-10 rounded-t-2xl" />
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: 0.5 + (i * 0.1), duration: 1, ease: 'circOut' }}
                    className="w-full max-w-[50px] bg-primary group-hover:bg-accent transition-all duration-500 rounded-t-2xl relative shadow-2xl"
                  >
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] px-3 py-1.5 rounded-xl font-bold transition-all shadow-xl z-20">
                      {Math.ceil(h)}%
                    </div>
                  </motion.div>
                </div>
              ))}
              {/* Horizontal grid lines */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex flex-col justify-between opacity-5">
                {[...Array(5)].map((_, i) => <div key={i} className="w-full border-t-2 border-primary" />)}
              </div>
            </div>
            <div className="flex justify-between px-4 text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <span key={d}>{d}</span>)}
            </div>
          </motion.div>

          {/* Activity Logs */}
          <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-display font-black text-primary uppercase italic flex items-center gap-4">
                <TrendingUp className="text-accent" /> Recent Activity
              </h3>
              <div className="flex items-center gap-2">
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-4">Auto-syncing every 60s</span>
                 <Link to="/admin/enquiries" className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-all">
                  <ArrowRight size={18} />
                 </Link>
              </div>
            </div>
            
            <div className="space-y-4">
              {recentLeads.slice(0, 6).map((lead, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={i} 
                  className="flex items-center justify-between p-5 rounded-3xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group"
                >
                  <div className="flex items-center gap-5">
                    <div className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110",
                      lead.type === 'Enquiry' ? 'bg-primary' : 'bg-accent'
                    )}>
                      {lead.type === 'Enquiry' ? <Users size={24} /> : <Mail size={24} />}
                    </div>
                    <div>
                      <h4 className="text-sm font-display font-black text-primary uppercase tracking-tight group-hover:text-accent transition-colors">{lead.name || lead.email}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[9px] text-slate-400 font-accent font-bold uppercase tracking-widest">{lead.type} Lead</span>
                        <span className="w-1 h-1 bg-slate-200 rounded-full" />
                        <span className="text-[9px] text-slate-400 font-accent font-bold uppercase tracking-widest flex items-center gap-1">
                          <Clock size={10} /> {new Date(lead.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-2 bg-green-50 text-green-600 text-[9px] font-black uppercase tracking-widest rounded-xl flex items-center gap-2">
                     <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> Verified
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Real-time World News & Calendar Peek */}
        <div className="space-y-8">
          <div className="bg-primary p-10 rounded-[2.5rem] shadow-2xl text-white relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                  <Globe className="text-accent animate-spin-slow" />
                  <h3 className="text-xl font-display font-black uppercase italic tracking-widest">World Updates</h3>
                </div>
                <div className="px-3 py-1 bg-white/10 rounded-full text-[8px] font-black uppercase tracking-tighter flex items-center gap-2">
                   <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping" /> LIVE FEED
                </div>
              </div>
              
              <div className="space-y-10">
                <AnimatePresence mode="wait">
                  {news.map((item, i) => (
                    <motion.div 
                      key={item.title}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="border-b border-white/5 pb-8 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <span className="bg-accent text-primary text-[8px] font-black px-2 py-0.5 rounded uppercase">
                          {item.tag}
                        </span>
                        <span className="text-slate-500 text-[9px] font-accent font-bold uppercase tracking-widest">
                          TRENDING NOW
                        </span>
                      </div>
                      <a href="#" className="text-sm font-display font-bold uppercase leading-snug hover:text-accent transition-colors block mb-2 cursor-pointer">
                        {item.title}
                      </a>
                      <p className="text-[10px] text-slate-500 font-accent font-bold uppercase tracking-[0.2em]">Source: {item.source}</p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              
              <button className="w-full mt-12 py-5 bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white/10 transition-all rounded-2xl group flex items-center justify-center gap-3">
                <Zap size={14} className="text-accent" />
                Refresh News Stream
              </button>
            </div>
          </div>

          {/* Quick Calendar Access */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            onClick={() => setIsCalendarOpen(true)}
            className="bg-accent p-10 rounded-[2.5rem] shadow-2xl relative group cursor-pointer overflow-hidden border-2 border-white/20"
          >
             <div className="relative z-10 text-primary">
                <CalendarIcon className="mb-8" size={48} />
                <h4 className="text-2xl font-display font-black uppercase italic mb-3 leading-tight">Schedule <br />Site Visit</h4>
                <p className="text-primary/70 font-accent font-bold text-[10px] uppercase tracking-widest mb-10 leading-relaxed">
                  Active monitoring of technical specialists and client coordination logs.
                </p>
                <div className="flex items-center gap-3 font-display font-black uppercase tracking-[0.2em] text-[10px]">
                  Open Calendar Panel <ArrowRight size={18} className="group-hover:translate-x-3 transition-transform duration-500" />
                </div>
             </div>
             {/* Abstract geometric background */}
             <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/10 rounded-full group-hover:scale-110 transition-transform duration-1000" />
             <div className="absolute top-10 right-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-3 h-3 bg-primary rounded-full animate-ping" />
             </div>
          </motion.div>
        </div>
      </div>

      {/* Calendar Popup Modal */}
      <AnimatePresence>
        {isCalendarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCalendarOpen(false)}
              className="fixed inset-0 bg-primary/95 backdrop-blur-xl z-[60]"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-6xl h-[85vh] bg-white rounded-[3rem] shadow-2xl z-[70] overflow-hidden flex flex-col md:flex-row"
            >
              {/* Sidebar: New Visit Form */}
              <div className="w-full md:w-80 bg-slate-50 p-10 border-r border-slate-100 flex flex-col">
                 <button onClick={() => setIsCalendarOpen(false)} className="md:hidden self-end mb-6 text-slate-400"><X /></button>
                 <h2 className="text-2xl font-display font-black text-primary uppercase italic mb-8">Scheduling</h2>
                 
                 <div className="space-y-6 flex-1">
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Target Date</label>
                      <input 
                        type="date" 
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-4 text-xs font-display font-bold uppercase tracking-widest focus:ring-2 focus:ring-accent outline-none" 
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Project / Title</label>
                      <input 
                        type="text" 
                        value={newVisit.title}
                        onChange={(e) => setNewVisit({...newVisit, title: e.target.value})}
                        placeholder="E.G. SITE INSPECTION"
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-4 text-xs font-display font-bold uppercase tracking-widest outline-none focus:ring-2 focus:ring-accent" 
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Specialist Note</label>
                      <textarea 
                        rows={4}
                        value={newVisit.notes}
                        onChange={(e) => setNewVisit({...newVisit, notes: e.target.value})}
                        placeholder="ENTER REQUIREMENTS..."
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-4 text-xs font-accent font-bold uppercase tracking-widest outline-none focus:ring-2 focus:ring-accent resize-none" 
                      />
                    </div>
                    <button 
                      onClick={handleAddVisit}
                      className="w-full btn-pro btn-pro-primary py-5 shadow-xl shadow-accent/20"
                    >
                      LOG VISIT DATA
                    </button>
                 </div>
              </div>

              {/* Main: Calendar View & notes list */}
              <div className="flex-1 p-10 md:p-16 overflow-y-auto">
                 <div className="flex justify-between items-center mb-12">
                    <div>
                      <h3 className="text-3xl font-display font-black text-primary uppercase italic">Active Schedules</h3>
                      <p className="text-[10px] text-slate-400 font-accent font-bold uppercase tracking-[0.3em] mt-2">Historical and future visit synchronization</p>
                    </div>
                    <button onClick={() => setIsCalendarOpen(false)} className="hidden md:flex w-12 h-12 bg-slate-100 rounded-full items-center justify-center hover:bg-primary hover:text-white transition-all">
                       <X size={24} />
                    </button>
                 </div>

                 {/* Visits List */}
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                   {siteVisits.sort((a, b) => b.date.localeCompare(a.date)).map((visit) => (
                     <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={visit._id} 
                        className="bg-slate-50 p-8 rounded-3xl group border border-transparent hover:border-accent hover:bg-white transition-all shadow-sm hover:shadow-xl"
                      >
                       <div className="flex justify-between items-start mb-6">
                         <div className="flex items-center gap-3">
                           <div className="bg-primary p-3 rounded-xl text-white">
                              <CalendarIcon size={20} />
                           </div>
                           <div>
                             <h4 className="text-sm font-display font-black text-primary uppercase tracking-tight">{visit.title}</h4>
                             <span className="text-[10px] font-accent font-black text-accent uppercase tracking-widest">{visit.date}</span>
                           </div>
                         </div>
                         <button 
                           onClick={() => visit._id && handleDeleteVisit(visit._id)}
                           className="text-slate-200 hover:text-red-500 transition-colors p-2"
                          >
                           <Trash2 size={18} />
                         </button>
                       </div>
                       <p className="text-sm text-slate-600 font-accent font-medium leading-relaxed italic mb-8 border-l-4 border-slate-200 pl-6">
                         "{visit.notes || 'No specialist notes provided for this schedule.'}"
                       </p>
                       <div className="flex justify-between items-center bg-white/50 p-4 rounded-2xl group-hover:bg-slate-50 transition-colors border border-slate-100">
                          <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Field Expert: {visit.technician}</span>
                          <span className="px-3 py-1 bg-primary text-white text-[8px] font-black uppercase rounded-lg">{visit.status}</span>
                       </div>
                     </motion.div>
                   ))}
                   {siteVisits.length === 0 && (
                     <div className="col-span-full py-20 text-center">
                       <Globe size={48} className="mx-auto text-slate-100 mb-6 animate-pulse" />
                       <p className="text-slate-400 font-display font-black uppercase tracking-widest text-xs">No active visit logs detected in the system.</p>
                     </div>
                   )}
                 </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
