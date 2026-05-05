import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { Contact as ContactSection } from '../components/Sections';

export default function Contact() {
  return (
    <>
      <PageHeader title="Get In Touch" breadcrumb="Contact" />
      <ContactSection />
      
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-24">
            <div>
              <h2 className="text-4xl font-display font-black text-primary uppercase italic mb-8">Frequently Asked Questions</h2>
              <div className="space-y-8">
                {[
                  { q: "What areas do you serve?", a: "We primarily serve South India, including Chennai, Bangalore, and Hyderabad, but we handle large-scale projects nationwide." },
                  { q: "Do you provide free estimations?", a: "Yes, we provide detailed initial project estimations and consultations free of charge for all prospective clients." },
                  { q: "Are you licensed and insured?", a: "Absolutely. Ameer Civil Engineers is fully licensed, insured, and compliant with all national building regulations and safety standards." }
                ].map((faq, i) => (
                  <div key={i} className="border-b border-slate-100 pb-8">
                    <h4 className="text-xl font-display font-black text-primary uppercase mb-4">{faq.q}</h4>
                    <p className="text-slate-600 font-accent leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-surface p-12 rounded-xl">
              <h2 className="text-4xl font-display font-black text-primary uppercase italic mb-8">Our Location</h2>
              <div className="aspect-video bg-slate-200 rounded-lg overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                {/* Placeholder for Google Map */}
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.561497353958!2d80.2707!3d13.0827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265ea4f7d333f%3A0x6347a4e9fd855c!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1625000000000!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
