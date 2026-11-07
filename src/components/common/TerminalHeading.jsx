import React from 'react';
import { Terminal } from 'lucide-react';

export default function TerminalHeading({ command, title, subtitle, align = 'left' }) {
  const isCenter = align === 'center';

  return (
    <div className={`mb-8 sm:mb-12 ${isCenter ? 'text-center mx-auto' : ''}`}>
      {/* Terminal prompt pill */}
      {command && (
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-xs font-mono text-emerald-800 mb-3 ${
          isCenter ? 'mx-auto' : ''
        }`}>
          <Terminal className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>nandan@portfolio:~$ {command}</span>
        </div>
      )}

      {/* Main Heading */}
      <h1 className="text-2xl sm:text-4xl font-terminal font-extrabold text-slate-900 tracking-tight">
        {title}
        <span className="text-emerald-600">_</span>
      </h1>

      {/* Subtitle */}
      {subtitle && (
        <p className="mt-2 text-sm sm:text-base text-slate-600 font-sans max-w-3xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
