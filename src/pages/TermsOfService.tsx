import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { Contact } from '../components/Sections';

export default function TermsOfService() {
  return (
    <>
      <PageHeader title="Terms of Service" breadcrumb="Terms of Service" />
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg max-w-none font-accent">
            <h2 className="text-3xl font-display font-black text-primary uppercase mb-8">1. Acceptance of Terms</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
            </p>

            <h2 className="text-3xl font-display font-black text-primary uppercase mb-8">2. Use of the Site</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              You agree to use the site only for lawful purposes and in a way that does not infringe the rights of, restrict or inhibit anyone else's use and enjoyment of the site.
            </p>

            <h2 className="text-3xl font-display font-black text-primary uppercase mb-8">3. Intellectual Property</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              All content on this site, including text, graphics, logos, and images, is the property of Ameer Civil Engineers Pvt Ltd and is protected by intellectual property laws.
            </p>

            <h2 className="text-3xl font-display font-black text-primary uppercase mb-8">4. Limitation of Liability</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Ameer Civil Engineers Pvt Ltd will not be liable for any damages arising from the use of this site.
            </p>

            <h2 className="text-3xl font-display font-black text-primary uppercase mb-8">5. Changes to Terms</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              We reserve the right to change these terms at any time. Your continued use of the site following any changes shall be deemed to be your acceptance of such change.
            </p>
          </div>
        </div>
      </section>
      <Contact />
    </>
  );
}
