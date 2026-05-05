import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Menu, 
  X, 
  ChevronRight, 
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import { Logo } from './Logo';

export const TopBar = () => (
  <div className="hidden lg:block bg-primary text-white py-2 px-4 border-b border-white/5">
    <div className="max-w-7xl mx-auto flex justify-between items-center text-[13px] font-accent font-medium tracking-wide">
      <div className="flex gap-8">
        <div className="flex items-center gap-2">
          <Phone size={14} className="text-accent" />
          <span>+91 98765 43210</span>
        </div>
        <div className="flex items-center gap-2">
          <Mail size={14} className="text-accent" />
          <span>info@ameerconstructions.com</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={14} className="text-accent" />
          <span>Chennai, Tamil Nadu, India</span>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex gap-4 border-r border-white/10 pr-6">
          <Facebook size={15} className="hover:text-accent cursor-pointer transition-colors" />
          <Twitter size={15} className="hover:text-accent cursor-pointer transition-colors" />
          <Instagram size={15} className="hover:text-accent cursor-pointer transition-colors" />
          <Linkedin size={15} className="hover:text-accent cursor-pointer transition-colors" />
        </div>
        <div className="flex items-center gap-2">
          <Clock size={14} className="text-accent" />
          <span>Mon - Sat: 9:00 - 18:00</span>
        </div>
      </div>
    </div>
  </div>
);

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Projects', href: '/projects' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Packages', href: '/packages' },
  ];

  return (
    <nav className={cn(
      "fixed w-full z-50 transition-all duration-500",
      isScrolled || !isHome ? "top-0 bg-white shadow-xl py-3" : "lg:top-10 bg-transparent py-4"
    )}>
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="h-10 lg:h-14">
          <Logo variant={isScrolled || !isHome ? 'original' : 'light'} className="h-full" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.href}
              className={cn(
                "font-display text-base font-bold uppercase tracking-wider hover:text-accent transition-all relative group",
                isScrolled || !isHome ? "text-primary" : "text-white",
                location.pathname === link.href && "text-accent"
              )}
            >
              {link.name}
              <span className={cn(
                "absolute -bottom-1 left-0 h-0.5 bg-accent transition-all group-hover:w-full",
                location.pathname === link.href ? "w-full" : "w-0"
              )} />
            </Link>
          ))}
          <Link to="/contact" className="btn-pro btn-pro-primary py-3 px-6 text-base shadow-lg shadow-accent/20">
            GET A QUOTE
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className={cn(
            "lg:hidden p-2 rounded-lg",
            isScrolled || !isHome ? "text-primary bg-slate-100" : "text-white bg-white/10"
          )}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 w-full bg-white shadow-2xl border-t border-slate-100"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.href}
                  className={cn(
                    "font-display text-xl font-bold uppercase tracking-wide py-3 border-b border-slate-50",
                    location.pathname === link.href ? "text-accent" : "text-primary"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/contact" className="btn-pro btn-pro-primary mt-4 text-center">
                GET A QUOTE
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({ type: 'success', msg: 'Thank you for subscribing!' });
        setEmail('');
      } else {
        setStatus({ type: 'error', msg: data.message || 'Subscription failed' });
      }
    } catch {
      setStatus({ type: 'error', msg: 'Network error. Try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-primary text-white pt-32 pb-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5" />
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="lg:col-span-1">
            <Link to="/" className="h-14 mb-10 block">
              <Logo variant="light" className="h-full" />
            </Link>
            <p className="text-slate-400 leading-relaxed mb-10 font-accent font-medium">
              Building excellence since 1998. We are committed to delivering high-quality 
              construction and engineering solutions that stand the test of time.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <div key={i} className="w-12 h-12 bg-white/5 flex items-center justify-center hover:bg-accent hover:text-primary transition-all cursor-pointer group">
                  <Icon size={20} className="group-hover:scale-110 transition-transform" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xl font-display font-black uppercase tracking-widest mb-10 relative">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-accent" />
            </h4>
            <ul className="space-y-5 text-slate-400 font-display font-bold uppercase tracking-wider text-sm">
              <li><Link to="/" className="hover:text-accent transition-colors flex items-center gap-2"><ChevronRight size={14} /> Home</Link></li>
              <li><Link to="/about" className="hover:text-accent transition-colors flex items-center gap-2"><ChevronRight size={14} /> About Us</Link></li>
              <li><Link to="/services" className="hover:text-accent transition-colors flex items-center gap-2"><ChevronRight size={14} /> Our Services</Link></li>
              <li><Link to="/projects" className="hover:text-accent transition-colors flex items-center gap-2"><ChevronRight size={14} /> Recent Projects</Link></li>
              <li><Link to="/blogs" className="hover:text-accent transition-colors flex items-center gap-2"><ChevronRight size={14} /> Our Blogs</Link></li>
              <li><Link to="/packages" className="hover:text-accent transition-colors flex items-center gap-2"><ChevronRight size={14} /> Our Packages</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-display font-black uppercase tracking-widest mb-10 relative">
              Our Services
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-accent" />
            </h4>
            <ul className="space-y-5 text-slate-400 font-display font-bold uppercase tracking-wider text-sm">
              <li><Link to="/services" className="hover:text-accent transition-colors flex items-center gap-2"><ChevronRight size={14} /> Structural Design</Link></li>
              <li><Link to="/services" className="hover:text-accent transition-colors flex items-center gap-2"><ChevronRight size={14} /> Project Management</Link></li>
              <li><Link to="/services" className="hover:text-accent transition-colors flex items-center gap-2"><ChevronRight size={14} /> Renovation Works</Link></li>
              <li><Link to="/services" className="hover:text-accent transition-colors flex items-center gap-2"><ChevronRight size={14} /> Site Inspection</Link></li>
              <li><Link to="/services" className="hover:text-accent transition-colors flex items-center gap-2"><ChevronRight size={14} /> Civil Consultancy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-display font-black uppercase tracking-widest mb-10 relative">
              Newsletter
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-accent" />
            </h4>
            <p className="text-slate-400 mb-8 font-accent font-medium">Subscribe to our newsletter for latest updates and news.</p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-4">
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email" 
                className="bg-white/5 border-b-2 border-white/10 px-4 py-4 w-full focus:outline-none focus:border-accent font-display font-bold uppercase tracking-widest text-sm" 
              />
              <button disabled={loading} className="btn-pro btn-pro-primary w-full disabled:opacity-50">
                {loading ? 'SUBSCRIBING...' : 'SUBSCRIBE'}
              </button>
              {status && (
                <p className={cn(
                  "text-[10px] font-bold uppercase tracking-widest mt-2",
                  status.type === 'success' ? "text-green-500" : "text-accent"
                )}>
                  {status.msg}
                </p>
              )}
            </form>
          </div>
        </div>

        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-slate-500 text-xs font-display font-bold uppercase tracking-[0.2em]">
          <p>© 2026 Ameer Civil Engineers Pvt Ltd. Powered by <a href="https://www.freshdigihub.com/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">freshdigihub.com</a></p>
          <div className="flex gap-10">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 500);
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-accent text-white p-4 rounded-full shadow-2xl hover:bg-accent-dark transition-colors"
        >
          <ChevronRight size={24} className="-rotate-90" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
