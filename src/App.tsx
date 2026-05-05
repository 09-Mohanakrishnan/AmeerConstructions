import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Blogs from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';
import Packages from './pages/Packages';
import Contact from './pages/Contact';
import ServiceDetail from './pages/ServiceDetail';
import ProjectDetail from './pages/ProjectDetail';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

// Admin
import AdminLayout from './components/AdminLayout';
import AdminLogin from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ManageServices from './pages/admin/ManageServices';
import ManageBlogs from './pages/admin/ManageBlogs';
import ManageProjects from './pages/admin/ManageProjects';
import ManagePackages from './pages/admin/ManagePackages';
import ManageTestimonials from './pages/admin/ManageTestimonials';
import ManageEnquiries from './pages/admin/ManageEnquiries';

export default function App() {
  return (
    <AuthProvider>
      <Router>
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
      </Router>
    </AuthProvider>
  );
}
