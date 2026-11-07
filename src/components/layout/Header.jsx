import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, FileText, Download } from 'lucide-react';
import { navRoutes } from '../../data/navigation';
import MobileNav from './MobileNav';
import ResumeModal from '../common/ResumeModal';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCV, setShowCV] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          scrolled 
            ? 'py-3 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm' 
            : 'py-4 bg-white/80 backdrop-blur-sm border-b border-slate-200/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          
          {/* Logo / Monogram */}
          <Link 
            to="/" 
            className="group flex items-center gap-2.5 font-terminal text-slate-900 font-bold tracking-tight text-base sm:text-lg"
            aria-label="Nandan Javagal Home"
          >
            <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-mono font-extrabold text-sm shadow-sm group-hover:bg-emerald-700 transition-colors">
              NJ
            </span>
            <span className="text-slate-900">
              nandanjavagal<span className="text-emerald-600">.in</span>
            </span>
            <span className="w-2 h-4 bg-emerald-500 animate-pulse hidden sm:inline-block ml-0.5" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/90 p-1.5 rounded-xl border border-slate-200/80">
            {navRoutes.map((route) => (
              <NavLink
                key={route.path}
                to={route.path}
                end={route.end}
                className={({ isActive }) =>
                  `px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all duration-150 ${
                    isActive
                      ? 'bg-white text-emerald-800 font-bold shadow-sm border border-slate-200/80'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`
                }
              >
                {route.label}
              </NavLink>
            ))}
          </nav>

          {/* Action Button: Resume */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => setShowCV(true)}
              className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-mono font-medium transition-all shadow-sm flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            className="md:hidden p-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 focus:outline-none focus:border-emerald-500"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileNav 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
        onOpenCV={() => setShowCV(true)}
      />

      {/* CV Modal */}
      <ResumeModal isOpen={showCV} onClose={() => setShowCV(false)} />
    </>
  );
}
