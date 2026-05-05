import React from 'react';
import { TopBar, Navbar, Footer, ScrollToTop } from './LayoutComponents';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Navbar />
      <main className="pt-0">{children}</main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};
