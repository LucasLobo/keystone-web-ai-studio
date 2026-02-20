import React from 'react';
import { LandingNav } from './LandingNav';
import { LandingFooter } from './LandingFooter';

interface LandingLayoutProps {
  children: React.ReactNode;
}

export const LandingLayout: React.FC<LandingLayoutProps> = ({ children }) => {
  return (
    <div className="bg-slate-50 font-sans min-h-screen flex flex-col relative">
      <LandingNav />
      <main className="flex-grow flex flex-col">
        {children}
      </main>
      <LandingFooter />
    </div>
  );
};
