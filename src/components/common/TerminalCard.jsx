import React from 'react';

export default function TerminalCard({ 
  title = 'bash - terminal', 
  children, 
  className = '', 
  headerClassName = '',
  accent = false 
}) {
  return (
    <div className={`terminal-card rounded-xl overflow-hidden bg-white border ${
      accent ? 'border-emerald-600/40 shadow-sm' : 'border-slate-200'
    } ${className}`}>
      {/* Terminal Titlebar Chrome */}
      <div className={`terminal-header-bar px-4 py-2.5 flex items-center justify-between bg-slate-100/90 border-b border-slate-200/90 ${headerClassName}`}>
        <div className="flex items-center gap-2">
          {/* Mac/Unix Window Dots */}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block border border-rose-500/30" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block border border-amber-500/30" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block border border-emerald-500/30" />
          </div>
          <span className="text-[11px] font-mono text-slate-500 ml-2 select-none tracking-tight">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
          <span className="text-emerald-600 font-bold">●</span>
          <span>utf-8</span>
        </div>
      </div>

      {/* Terminal Card Body */}
      <div className="p-5 sm:p-6">
        {children}
      </div>
    </div>
  );
}
