import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AuthProvider } from './context/AuthContext';
// Loading Fallback
const LoadingScreen = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-white">
    <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4"></div>
    <div className="text-sm font-bold text-accent tracking-widest uppercase animate-pulse">Loading</div>
  </div>
);

// Lazy Loaded Public Pages
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const Services = React.lazy(() => import('./pages/Services'));
const Projects = React.lazy(() => import('./pages/Projects'));
const Blogs = React.lazy(() => import('./pages/Blogs'));
const BlogDetail = React.lazy(() => import('./pages/BlogDetail'));
const Packages = React.lazy(() => import('./pages/Packages'));
const Contact = React.lazy(() => import('./pages/Contact'));
const ServiceDetail = React.lazy(() => import('./pages/ServiceDetail'));
const ProjectDetail = React.lazy(() => import('./pages/ProjectDetail'));
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = React.lazy(() => import('./pages/TermsOfService'));

// Lazy Loaded Admin Pages
const AdminLayout = React.lazy(() => import('./components/AdminLayout'));
const AdminLogin = React.lazy(() => import('./pages/admin/Login'));
const Dashboard = React.lazy(() => import('./pages/admin/Dashboard'));
const ManageServices = React.lazy(() => import('./pages/admin/ManageServices'));
const ManageBlogs = React.lazy(() => import('./pages/admin/ManageBlogs'));
const ManageProjects = React.lazy(() => import('./pages/admin/ManageProjects'));
const ManagePackages = React.lazy(() => import('./pages/admin/ManagePackages'));
const ManageTestimonials = React.lazy(() => import('./pages/admin/ManageTestimonials'));
const ManageEnquiries = React.lazy(() => import('./pages/admin/ManageEnquiries'));

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <React.Suspense fallback={<LoadingScreen />}>
          <Routes>
            {/* Public pages wrapped in Layout */}
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/services" element={<Layout><Services /></Layout>} />
            <Route path="/services/:slug" element={<Layout><ServiceDetail /></Layout>} />
            <Route path="/projects" element={<Layout><Projects /></Layout>} />
            <Route path="/projects/:slug" element={<Layout><ProjectDetail /></Layout>} />
            <Route path="/blogs" element={<Layout><Blogs /></Layout>} />
            <Route path="/blogs/:id" element={<Layout><BlogDetail /></Layout>} />
            <Route path="/packages" element={<Layout><Packages /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />
            <Route path="/privacy-policy" element={<Layout><PrivacyPolicy /></Layout>} />
            <Route path="/terms-of-service" element={<Layout><TermsOfService /></Layout>} />

            {/* Admin Panel — no Layout wrapper */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="services" element={<ManageServices />} />
              <Route path="blogs" element={<ManageBlogs />} />
              <Route path="projects" element={<ManageProjects />} />
              <Route path="packages" element={<ManagePackages />} />
              <Route path="testimonials" element={<ManageTestimonials />} />
              <Route path="enquiries" element={<ManageEnquiries />} />
            </Route>
          </Routes>
        </React.Suspense>
      </Router>
    </AuthProvider>
  );
}
