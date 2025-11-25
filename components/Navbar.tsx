'use client';

import Link from 'next/link';
import HealthStatus from './HealthStatus';

export default function Navbar() {
  const scrollToModel = () => {
    const element = document.getElementById('prediction-model');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 py-6 px-8 flex items-center justify-between bg-transparent">
      {/* Logo */}
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-medium tracking-tight text-white">Hagia</h1>
        <div className="hidden lg:block">
           <HealthStatus />
        </div>
      </div>

      {/* CTA Button */}
      <div>
        <button 
          onClick={scrollToModel}
          className="bg-[#0088FF] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#0077EE] transition-colors shadow-md shadow-blue-500/20"
        >
          Try our model
        </button>
      </div>
    </nav>
  );
}
