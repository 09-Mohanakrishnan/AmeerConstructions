import React from 'react';
import { 
  Building2, 
  Hammer, 
  Ruler, 
  Briefcase, 
  Clock,
  HardHat
} from 'lucide-react';

export interface ServiceData {
  slug: string;
  title: string;
  icon: React.ReactNode;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  image: string;
  process: { title: string; desc: string }[];
  benefits: string[];
}

export interface ProjectData {
  slug: string;
  title: string;
  category: string;
  img: string;
  description: string;
  client: string;
  location: string;
  year: string;
  challenge: string;
  solution: string;
  specifications: { label: string; value: string }[];
  gallery: string[];
}

export const servicesData: ServiceData[] = [
  {
    slug: "construction",
    title: "Construction",
    icon: React.createElement(Building2, { size: 48 }),
    shortDesc: "End-to-end construction services for residential, commercial, and industrial projects.",
    fullDesc: "Our construction services cover everything from site preparation to final handover. We specialize in high-quality building solutions that prioritize safety, durability, and aesthetic appeal. Whether it's a new home, a corporate office, or a large-scale industrial facility, our team ensures every project is built to the highest standards.",
    features: [
      "Residential Building",
      "Commercial Complexes",
      "Industrial Facilities",
      "Foundation & Piling",
      "Structural Framework"
    ],
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1200",
    process: [
      { title: "Planning & Design", desc: "We work with architects to finalize blueprints and structural designs." },
      { title: "Site Preparation", desc: "Clearing the land and setting up the foundation for construction." },
      { title: "Structural Work", desc: "Building the core framework, including columns, beams, and slabs." },
      { title: "Finishing", desc: "Plastering, painting, and installing essential fixtures and fittings." }
    ],
    benefits: [
      "Superior structural integrity",
      "Strict adherence to safety codes",
      "On-time project delivery",
      "Cost-effective engineering solutions"
    ]
  },
  {
    slug: "interior",
    title: "Interior",
    icon: React.createElement(Clock, { size: 48 }),
    shortDesc: "Aesthetic and functional interior solutions tailored to client requirements.",
    fullDesc: "We believe that the interior of a building should be as well-engineered as its structure. Our interior design services focus on creating spaces that are both aesthetically pleasing and highly functional. We work closely with clients to understand their vision and requirements, delivering tailored solutions that enhance the user experience and reflect their brand or personal style.",
    features: [
      "Space Planning",
      "Material & Finish Selection",
      "Lighting Design",
      "Custom Furniture Design",
      "3D Visualization"
    ],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
    process: [
      { title: "Concept Design", desc: "Creating mood boards and initial layout concepts based on client needs." },
      { title: "Design Development", desc: "Finalizing materials, colors, and detailed 3D visualizations." },
      { title: "Execution", desc: "On-site implementation of the design with expert craftsmen." },
      { title: "Styling", desc: "Final touches and furniture placement to complete the space." }
    ],
    benefits: [
      "Optimized space utilization",
      "High-quality material selection",
      "Aesthetic and functional balance",
      "Personalized design approach"
    ]
  },
  {
    slug: "renovation",
    title: "Renovation",
    icon: React.createElement(Hammer, { size: 48 }),
    shortDesc: "Modernizing existing structures with the latest materials and technology.",
    fullDesc: "We specialize in breathing new life into existing structures. Whether it's a historic restoration or a modern office renovation, our team combines traditional craftsmanship with modern materials and techniques. We focus on enhancing functionality, improving energy efficiency, and increasing the overall value of the property while minimizing disruption to occupants.",
    features: [
      "Structural Strengthening",
      "Interior Remodeling",
      "Facade Restoration",
      "Energy Efficiency Upgrades",
      "Historic Preservation"
    ],
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1200",
    process: [
      { title: "Assessment", desc: "Evaluating the current state of the structure and identifying needs." },
      { title: "Demolition & Prep", desc: "Careful removal of old elements and preparation for new work." },
      { title: "Modernization", desc: "Installing new systems and modern finishes." },
      { title: "Quality Check", desc: "Ensuring the renovated space meets all modern standards." }
    ],
    benefits: [
      "Increased property value",
      "Improved energy efficiency",
      "Modernized aesthetics",
      "Extended structural lifespan"
    ]
  }
];

export const projectsData: ProjectData[] = [
  {
    slug: "skyline-residency",
    title: "Skyline Residency",
    category: "Residential",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
    description: "A luxury residential complex featuring 200 high-end apartments with modern amenities and sustainable design.",
    client: "Skyline Developers",
    location: "Chennai, TN",
    year: "2024",
    challenge: "The project required a deep foundation due to soil conditions and a fast-track construction schedule to meet market demand.",
    solution: "We implemented a specialized piling system and utilized pre-cast concrete elements to accelerate the construction timeline without compromising on quality.",
    specifications: [
      { label: "Total Area", value: "250,000 sq.ft" },
      { label: "Number of Units", value: "200" },
      { label: "Duration", value: "24 Months" },
      { label: "Certification", value: "IGBC Gold" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    slug: "metro-tech-park",
    title: "Metro Tech Park",
    category: "Commercial",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
    description: "A state-of-the-art IT park designed to house global technology companies, featuring smart building systems and green spaces.",
    client: "Metro Infra",
    location: "Bangalore, KA",
    year: "2023",
    challenge: "Integrating complex HVAC and electrical systems while maintaining a LEED Gold certification requirement.",
    solution: "Our team used BIM for advanced coordination of all MEP systems, ensuring optimal performance and energy efficiency.",
    specifications: [
      { label: "Total Area", value: "500,000 sq.ft" },
      { label: "Floors", value: "G + 12" },
      { label: "Duration", value: "36 Months" },
      { label: "Certification", value: "LEED Gold" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    slug: "grand-plaza-mall",
    title: "Grand Plaza Mall",
    category: "Commercial",
    img: "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&q=80&w=1200",
    description: "A premier shopping destination with a unique architectural design, featuring large spans and a glass atrium.",
    client: "Plaza Group",
    location: "Hyderabad, TS",
    year: "2023",
    challenge: "Designing a large-span roof structure for the atrium that could support heavy glass panels and withstand wind loads.",
    solution: "We designed a custom space-frame steel structure that provided the necessary strength while maintaining the aesthetic vision of the architect.",
    specifications: [
      { label: "Total Area", value: "1,000,000 sq.ft" },
      { label: "Atrium Height", value: "30 Meters" },
      { label: "Duration", value: "48 Months" },
      { label: "Parking Capacity", value: "2000 Cars" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1567449303078-57ad995bd301?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    slug: "ocean-view-villas",
    title: "Ocean View Villas",
    category: "Residential",
    img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200",
    description: "A collection of exclusive beachfront villas designed for maximum privacy and panoramic ocean views.",
    client: "Private Investors",
    location: "Pondicherry",
    year: "2022",
    challenge: "Protecting the structures from the corrosive coastal environment and ensuring stability on sandy terrain.",
    solution: "We used high-performance anti-corrosive concrete and a specialized raft foundation to ensure long-term durability and stability.",
    specifications: [
      { label: "Total Area", value: "50,000 sq.ft" },
      { label: "Villas", value: "10" },
      { label: "Duration", value: "18 Months" },
      { label: "Foundation", value: "Raft" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    slug: "industrial-hub",
    title: "Industrial Hub",
    category: "Industrial",
    img: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&q=80&w=1200",
    description: "A massive industrial facility designed for manufacturing and logistics, featuring heavy-duty flooring and high-clearance bays.",
    client: "LogiCorp",
    location: "Sriperumbudur, TN",
    year: "2022",
    challenge: "Designing a floor slab capable of supporting heavy machinery and high-rack storage loads without cracking.",
    solution: "We implemented a steel-fiber reinforced concrete slab with laser-level finishing to provide a durable and perfectly flat surface.",
    specifications: [
      { label: "Total Area", value: "1,000,000 sq.ft" },
      { label: "Flooring", value: "SFRC" },
      { label: "Duration", value: "12 Months" },
      { label: "Clearance", value: "12 Meters" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    slug: "city-bridge",
    title: "City Bridge",
    category: "Infrastructure",
    img: "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&q=80&w=1200",
    description: "A critical infrastructure project connecting two major parts of the city, designed to handle heavy traffic loads.",
    client: "City Municipal Corp",
    location: "Chennai, TN",
    year: "2021",
    challenge: "Constructing the bridge over a busy railway line with minimal disruption to train schedules.",
    solution: "We used incremental launching techniques to push the bridge girders into place during short nighttime windows provided by the railway authorities.",
    specifications: [
      { label: "Length", value: "500 Meters" },
      { label: "Lanes", value: "4" },
      { label: "Duration", value: "18 Months" },
      { label: "Type", value: "Girder" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1449156001935-d2863fb72690?auto=format&fit=crop&q=80&w=800"
    ]
  }
];
