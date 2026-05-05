import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { Projects as ProjectsSection, Testimonials } from '../components/Sections';

export default function Projects() {
  return (
    <>
      <PageHeader title="Our Portfolio" breadcrumb="Projects" />
      <ProjectsSection />
      
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-24 items-center">
            <div>
              <h2 className="text-4xl font-display font-black text-primary uppercase italic mb-8">Excellence in Every Detail</h2>
              <p className="text-slate-600 leading-relaxed text-lg font-accent mb-8">
                Our portfolio showcases a diverse range of projects, from luxury residential villas to complex industrial hubs. Each project is a testament to our commitment to quality and engineering precision.
              </p>
              <div className="space-y-6">
                {[
                  { label: "Residential Projects", value: "200+" },
                  { label: "Commercial Spaces", value: "150+" },
                  { label: "Industrial Facilities", value: "50+" },
                  { label: "Infrastructure Works", value: "100+" }
                ].map((stat, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-slate-100 pb-4">
                    <span className="font-display font-bold uppercase tracking-wider text-primary">{stat.label}</span>
                    <span className="text-accent font-display font-black text-2xl">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000" 
                alt="Construction Detail"
                className="rounded-lg shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-8 -left-8 bg-accent p-8 shadow-2xl hidden lg:block">
                <div className="text-primary font-display font-black text-4xl">100%</div>
                <div className="text-primary font-display font-bold uppercase text-xs tracking-widest">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />
    </>
  );
}
