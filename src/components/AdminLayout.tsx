import React, { useState } from 'react';
import { Link, useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {
  LayoutDashboard,
  Wrench,
  FileText,
  FolderOpen,
  Package,
  MessageSquareQuote,
  MessageSquare,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';
import { Logo } from './Logo';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

const sidebarLinks = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Enquiries', href: '/admin/enquiries', icon: MessageSquare },
  { name: 'Services', href: '/admin/services', icon: Wrench },
  { name: 'Blogs', href: '/admin/blogs', icon: FileText },
  { name: 'Projects', href: '/admin/projects', icon: FolderOpen },
  { name: 'Packages', href: '/admin/packages', icon: Package },
  { name: 'Testimonials', href: '/admin/testimonials', icon: MessageSquareQuote },
];

export default function AdminLayout() {
  const { admin, isAuthenticated, isLoading, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const isExpanded = isHovered || sidebarOpen;

  return (
    <div className="min-h-screen bg-slate-100 flex overflow-hidden">
      {/* Sidebar */}
      <aside
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "fixed inset-y-0 left-0 z-50 bg-primary text-white transition-all duration-300 ease-in-out lg:static lg:inset-0",
          isExpanded ? "w-64" : "w-20",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Logo */}
          <div className={cn("p-8 border-b border-white/5 transition-all", isExpanded ? "px-8" : "px-4")}>
            <Link to="/admin" className="block h-10">
              <Logo variant="light" className="h-full" />
            </Link>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {sidebarLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-semibold transition-all group overflow-hidden whitespace-nowrap",
                    isActive
                      ? "bg-accent text-primary shadow-lg shadow-accent/20"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <div className="min-w-[18px]">
                    <link.icon size={18} />
                  </div>
                  <motion.span 
                    animate={{ opacity: isExpanded ? 1 : 0, x: isExpanded ? 0 : -10 }}
                    transition={{ duration: 0.2 }}
                    className={cn(isExpanded ? "block" : "hidden lg:hidden")}
                  >
                    {link.name}
                  </motion.span>
                  {isActive && isExpanded && <ChevronRight size={14} className="ml-auto" />}
                </Link>
              );
            })}
          </nav>

          {/* Bottom */}
          <div className="p-4 border-t border-white/10 space-y-2">
            <div className={cn("flex items-center gap-3 px-4 py-3 rounded-xl transition-all overflow-hidden", isHovered ? "bg-white/5" : "")}>
              <div className="w-8 h-8 bg-accent rounded-full flex-shrink-0 flex items-center justify-center text-primary text-sm font-bold">
                {admin?.name?.[0] || 'A'}
              </div>
              <motion.div 
                animate={{ opacity: isExpanded ? 1 : 0 }}
                className={cn("flex-1 min-w-0 transition-opacity", isExpanded ? "block" : "hidden")}
              >
                <div className="text-sm font-semibold truncate">{admin?.name}</div>
                <div className="text-[10px] text-slate-400 truncate">{admin?.email}</div>
              </motion.div>
            </div>
            
            <button
              onClick={logout}
              className="flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-semibold text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all w-full overflow-hidden whitespace-nowrap"
            >
              <div className="min-w-[18px]">
                <LogOut size={18} />
              </div>
              <span className={cn(isExpanded ? "block" : "hidden")}>Logout</span>
            </button>
            <Link
              to="/"
              className="flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-semibold text-slate-400 hover:bg-white/5 hover:text-white transition-all w-full overflow-hidden whitespace-nowrap"
            >
              <div className="min-w-[18px]">
                <ChevronRight size={18} className="rotate-180" />
              </div>
              <span className={cn(isExpanded ? "block" : "hidden")}>View Site</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen max-h-screen overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 px-8 py-5 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 text-slate-600"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h1 className="text-2xl font-display font-black text-primary uppercase italic tracking-tight">
              {sidebarLinks.find((l) => l.href === location.pathname)?.name || 'Admin'}
            </h1>
          </div>
          
          <div className="flex items-center gap-6">
             <div className="hidden md:flex flex-col items-end">
                <span className="text-[10px] font-black uppercase text-slate-300 tracking-widest leading-none mb-1 text-accent">AMEER CIVIL ENGINEERS</span>
                <span className="text-[9px] font-accent font-bold uppercase text-slate-400 tracking-widest leading-none">Management Dashboard v2.0</span>
             </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 overflow-y-auto bg-slate-50/50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
