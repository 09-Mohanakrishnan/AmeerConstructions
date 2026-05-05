import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { Services as ServicesSection, Contact } from '../components/Sections';
import { Building2, Ruler, Hammer, Briefcase, Clock, HardHat } from 'lucide-react';

export default function Services() {
  const detailedServices = [
    {
      title: "Construction",
      icon: <Building2 className="text-accent" size={40} />,
      details: [
        "Residential Building",
        "Commercial Complexes",
        "Industrial Facilities",
        "Foundation & Piling"
      ]
    },
    {
      title: "Interior Design",
      icon: <Clock className="text-accent" size={40} />,
      details: [
        "Space Planning",
        "Material Selection",
        "Lighting Design",
        "Custom Furniture"
      ]
    },
    {
      title: "Renovation Works",
      icon: <Hammer className="text-accent" size={40} />,
      details: [
        "Structural Strengthening",
        "Interior Remodeling",
        "Facade Restoration",
        "Modernization"
      ]
    }
  ];

  return (
    <>
      <PageHeader title="Our Expert Services" breadcrumb="Services" />
      <ServicesSection />
      
      <section className="py-32 bg-surface">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-display font-black text-primary uppercase italic">Detailed Expertise</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {detailedServices.map((service, idx) => (
              <div key={idx} className="bg-white p-12 shadow-xl border-b-4 border-accent">
                <div className="mb-8">{service.icon}</div>
                <h3 className="text-2xl font-display font-black text-primary uppercase mb-6">{service.title}</h3>
                <ul className="space-y-4">
                  {service.details.map((detail, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-600 font-accent font-medium">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Contact />
    </>
  );
}
