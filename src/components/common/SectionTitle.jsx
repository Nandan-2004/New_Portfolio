import React from 'react';
import { Sparkles } from 'lucide-react';

export default function SectionTitle({ title, subtitle, align = 'left' }) {
  const isCenter = align === 'center';

  return (
    <div className={`mb-10 sm:mb-14 ${isCenter ? 'text-center mx-auto' : ''}`}>
      <div 
        className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-400 mb-4 tracking-wider uppercase shadow-[0_0_15px_rgba(6,182,212,0.15)] ${
          isCenter ? 'mx-auto' : ''
        }`}
      >
        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
        <span>{subtitle || 'Overview'}</span>
      </div>
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight leading-tight">
        {title}
        <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">.</span>
      </h1>
    </div>
  );
}
