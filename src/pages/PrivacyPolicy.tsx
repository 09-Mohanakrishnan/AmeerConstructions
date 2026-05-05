import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { Contact } from '../components/Sections';

export default function PrivacyPolicy() {
  return (
    <>
      <PageHeader title="Privacy Policy" breadcrumb="Privacy Policy" />
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg max-w-none font-accent">
            <h2 className="text-3xl font-display font-black text-primary uppercase mb-8">Introduction</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              At Ameer Civil Engineers Pvt Ltd, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.
            </p>

            <h2 className="text-3xl font-display font-black text-primary uppercase mb-8">Information We Collect</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              We may collect personal information such as your name, email address, and phone number when you fill out our contact form or subscribe to our newsletter.
            </p>

            <h2 className="text-3xl font-display font-black text-primary uppercase mb-8">How We Use Your Information</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              We use the information we collect to respond to your inquiries, provide our services, and send you updates about our projects and news.
            </p>

            <h2 className="text-3xl font-display font-black text-primary uppercase mb-8">Data Security</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              We implement a variety of security measures to maintain the safety of your personal information. However, no method of transmission over the Internet is 100% secure.
            </p>

            <h2 className="text-3xl font-display font-black text-primary uppercase mb-8">Contact Us</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at info@ameerconstructions.com.
            </p>
          </div>
        </div>
      </section>
      <Contact />
    </>
  );
}
