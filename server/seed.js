import mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

import Admin from './models/Admin.js';
import Service from './models/Service.js';
import Blog from './models/Blog.js';
import Project from './models/Project.js';
import Package from './models/Package.js';
import Testimonial from './models/Testimonial.js';

const services = [
  {
    slug: 'architectural-design',
    title: 'Architectural Design',
    icon: 'Building2',
    shortDesc: 'Innovative architectural solutions blending aesthetics with structural integrity.',
    fullDesc: 'Our architectural design services cover everything from conceptual sketches to detailed blueprints. We focus on modern, sustainable, and functional designs that reflect our clients\' vision while adhering to all safety and zoning regulations.',
    features: ['Modern 3D Elevation', 'Vastu Compliant Plans', 'Detailed Floor Layouts', 'Sustainable Design'],
    image: 'https://images.unsplash.com/photo-1487958444681-242de11d8021?auto=format&fit=crop&q=80&w=800',
    process: [
      { title: 'Concept', desc: 'Initial research and idea generation based on client requirements.' },
      { title: 'Drafting', desc: 'Creation of detailed technical drawings and 3D models.' },
      { title: 'Refinement', desc: 'Iterative feedback loops to perfect the design elements.' }
    ],
    benefits: ['Pre-visualization', 'Cost-effective planning', 'Space optimization']
  },
  {
    slug: 'civil-construction',
    title: 'Civil Construction',
    icon: 'Hammer',
    shortDesc: 'End-to-end construction services for residential and commercial projects.',
    fullDesc: 'We handle the complete construction lifecycle using premium materials and advanced engineering techniques. Our team ensures structural durability, timely delivery, and strict quality control at every stage of the build.',
    features: ['High-Grade Raw Materials', 'Expert Site Supervision', 'Quality Control Inspections', 'Safety Standard Compliance'],
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=800',
    process: [
      { title: 'Foundation', desc: 'Excavation and structural base implementation.' },
      { title: 'Superstructure', desc: 'Framework, brickwork, and slab casting.' },
      { title: 'Finishing', desc: 'Plastering, flooring, and exterior treatments.' }
    ],
    benefits: ['Long-term durability', 'Transparent billing', 'Timely completion']
  },
  {
    slug: 'structural-consultancy',
    title: 'Structural Consultancy',
    icon: 'Ruler',
    shortDesc: 'Advanced engineering analysis to ensure safety and stability.',
    fullDesc: 'Our structural engineering experts provide stability analysis, load calculations, and reinforcement details. We specialize in complex structures and seismic-resistant designs for all types of buildings.',
    features: ['Load Analysis', 'Feasibility Studies', 'Seismic Design', 'Renovation Stability'],
    image: 'https://images.unsplash.com/photo-1503387762-592dea58ef41?auto=format&fit=crop&q=80&w=800',
    process: [
      { title: 'Analysis', desc: 'Calculation of vertical and horizontal load stresses.' },
      { title: 'Design', desc: 'Detailing of reinforcement and structural members.' },
      { title: 'Optimization', desc: 'Ensuring structural safety with material efficiency.' }
    ],
    benefits: ['Uncompromised Safety', 'Material efficiency', 'Expert certification']
  }
];

const projects = [
  { slug: "skyline-residency", title: "Skyline Residency", category: "Residential", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800", description: "A high-rise residential complex featuring modern amenities and sustainable design.", client: "Skyline Developers", location: "Chennai, TN", year: "2024", challenge: "Optimizing space in a dense urban environment.", solution: "Smart floor planning and vertical landscaping.", specifications: [{ label: "Total Area", value: "25,000 sq.ft" }, { label: "Floors", value: "G+12" }], gallery: ["https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800"] },
  { slug: "metro-tech-park", title: "Metro Tech Park", category: "Commercial", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800", description: "State-of-the-art office spaces designed for maximum productivity.", client: "Metro Group", location: "Bangalore, KA", year: "2023", challenge: "Energy efficiency", solution: "Glass facade and LED automation", specifications: [{ label: "Energy Rating", value: "Platinum" }], gallery: ["https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800"] },
  { slug: "grand-plaza-mall", title: "Grand Plaza Mall", category: "Commercial", img: "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&q=80&w=800", description: "A premier shopping destination with integrated entertainment zones.", client: "Grand Retail", location: "Coimbatore, TN", year: "2023", challenge: "Large span structures", solution: "Specialized steel truss design", specifications: [{ label: "Retail Units", value: "150+" }], gallery: ["https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&q=80&w=800"] },
  { slug: "ocean-view-villas", title: "Ocean View Villas", category: "Residential", img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800", description: "Luxury seaside villas with panoramic ocean views.", client: "Private Client", location: "Pondicherry", year: "2024", challenge: "Saltwater corrosion", solution: "High-grade anti-corrosive treatments", specifications: [{ label: "Units", value: "12 Exclusive Villas" }], gallery: ["https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800"] },
  { slug: "industrial-hub", title: "Industrial Hub", category: "Industrial", img: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&q=80&w=800", description: "Massive warehousing facility for international logistics.", client: "Logix India", location: "Sriperumbudur, TN", year: "2022", challenge: "Heavy load flooring", solution: "Fiber reinforced concrete slabs", specifications: [{ label: "Built-up Area", value: "1,00,000 sq.ft" }], gallery: ["https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&q=80&w=800"] },
  { slug: "city-bridge", title: "City Bridge", category: "Infrastructure", img: "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&q=80&w=800", description: "A critical infrastructure project connecting two major city hubs.", client: "PWD", location: "Madurai, TN", year: "2023", challenge: "River flow management during construction", solution: "Temporary diversion and pre-cast segments", specifications: [{ label: "Span", value: "500 meters" }], gallery: ["https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&q=80&w=800"] }
];

const blogPosts = [
  { slug: "future-of-civil-engineering", title: "The Future of Civil Engineering", excerpt: "Exploring AI, 3D printing, and new sustainable materials shaping our cities.", content: "<p>Modern engineering is evolving...</p>", date: "March 15, 2026", author: "Ameer Ahmed", image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800", category: "Technology", tags: ["AI", "Innovation"] },
  { slug: "sustainable-construction", title: "Sustainable Construction", excerpt: "How green building practices are saving costs and the environment.", content: "<p>Going green is no longer an option...</p>", date: "March 10, 2026", author: "Sarah John", image: "https://images.unsplash.com/photo-1518005020451-aba3a5a58d50?auto=format&fit=crop&q=80&w=800", category: "Environment", tags: ["Green Building", "Sustainability"] },
  { slug: "quality-assurance-construction", title: "Quality Assurance in Construction", excerpt: "Why uncompromised quality is the backbone of structural safety.", content: "<p>Safety first...</p>", date: "March 5, 2026", author: "Vikram Singh", image: "https://images.unsplash.com/photo-1531834685032-c74618738a98?auto=format&fit=crop&q=80&w=800", category: "Safety", tags: ["Quality", "Safety"] }
];

const packages = [
  {
    title: "Silver Package",
    price: "1,850",
    icon: "Shield",
    features: [{ text: "Architectural 2D Plan" }, { text: "Structural Design" }, { text: "Vitrified Tiles" }],
    details: {
      design: [{ label: "Architectural Plan", value: "2D Plan", included: true }, { label: "3D Elevation", value: "No", included: false }],
      civil: [{ label: "Cement", value: "Dalmia", included: true }],
      finishing: [{ label: "Flooring", value: "Tiles", included: true }]
    }
  },
  {
    title: "Gold Package",
    price: "2,150",
    icon: "Crown",
    isPopular: true,
    features: [{ text: "2D & 3D Plans" }, { text: "Soil Test" }, { text: "Premium Tiles" }],
    details: {
      design: [{ label: "Architectural Plan", value: "2D & 3D", included: true }],
      civil: [{ label: "Cement", value: "Ultratech", included: true }],
      finishing: [{ label: "Flooring", value: "Premium Tiles", included: true }]
    }
  },
  {
    title: "Platinum Package",
    price: "2,450",
    icon: "Star",
    features: [{ text: "Full Design Suite" }, { text: "Interior Design" }, { text: "Italian Marble" }],
    details: {
      design: [{ label: "Interior Design", value: "3D Walkthrough", included: true }],
      civil: [{ label: "Cement", value: "Ultratech Premium", included: true }],
      finishing: [{ label: "Flooring", value: "Italian Marble", included: true }]
    }
  }
];

const testimonials = [
  { name: "Rajesh Kumar", role: "CEO, TechPark", text: "Ameer Civil Engineers delivered our office complex ahead of schedule. Their attention to structural detail is unmatched." },
  { name: "Priya Sharma", role: "Homeowner", text: "Building our dream home was stress-free thanks to their professional team." },
  { name: "Suresh Raina", role: "MD, Industrial Hub", text: "Expert consultancy and quality execution." }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing
    await Admin.deleteMany({});
    await Service.deleteMany({});
    await Blog.deleteMany({});
    await Project.deleteMany({});
    await Package.deleteMany({});
    await Testimonial.deleteMany({});

    // Create Admin
    await Admin.create({
      name: 'Admin',
      email: 'admin@ameerconstructions.com',
      password: 'Admin@123'
    });
    console.log('Admin account created.');

    // Seed data
    await Service.insertMany(services);
    await Blog.insertMany(blogPosts);
    await Project.insertMany(projects);
    await Package.insertMany(packages);
    await Testimonial.insertMany(testimonials);

    console.log('Database Seeded Successfully!');
    process.exit();
  } catch (error) {
    console.error('Seeding Error:', error);
    process.exit(1);
  }
};

seedDB();
