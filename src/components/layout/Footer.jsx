import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Terminal, Globe } from 'lucide-react';
import { contactInfo } from '../../data/navigation';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600 text-xs py-8 px-4 sm:px-8 mt-16">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        
        {/* Left: Monogram and identity */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-mono font-bold text-xs shadow-xs">
            NJ
          </span>
          <div>
            <p className="font-terminal font-bold text-slate-900 text-sm">
              Nandan Javagal
            </p>
            <p className="text-[11px] text-slate-500 font-sans">
              Software Engineer • Centre for Smart Governance
            </p>
          </div>
        </div>

        {/* Center: Social and contact links */}
        <div className="flex items-center gap-3">
          <a
            href={contactInfo.social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-emerald-700 transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={contactInfo.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-emerald-700 transition-colors"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${contactInfo.email}`}
            aria-label="Direct Email"
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-emerald-700 transition-colors"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Right: Status and copyright */}
        <div className="text-right sm:text-right flex flex-col items-center sm:items-end font-mono text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5 text-emerald-700 font-semibold mb-0.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Open for Opportunities (Worldwide)</span>
          </div>
          <span>© {new Date().getFullYear()} Nandan Javagal • Software Engineer</span>
        </div>

      </div>
    </footer>
  );
}
