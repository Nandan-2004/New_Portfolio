import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Home, Search, ArrowLeft } from 'lucide-react';
import SEOHead from '../components/common/SEOHead';
import TerminalCard from '../components/common/TerminalCard';

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <SEOHead 
        title="404 – Command Not Found"
        description="The requested route does not exist on Nandan Javagal's portfolio."
      />

      <TerminalCard title="bash: 404 - Not Found" className="shadow-md">
        <div className="py-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-rose-50 border border-rose-200 text-xs font-mono text-rose-700">
            <Terminal className="w-4 h-4" />
            <span>HTTP_ERROR: 404_ROUTE_NOT_FOUND</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-terminal font-extrabold text-slate-900 tracking-tight">
            4<span className="text-emerald-600">0</span>4
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 font-sans max-w-md mx-auto leading-relaxed">
            The route you attempted to execute was not recognized by the routing table.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <Link
              to="/"
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs font-semibold rounded-lg flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span>Return Home</span>
            </Link>

            <Link
              to="/projects"
              className="px-5 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-mono text-xs font-semibold rounded-lg flex items-center gap-2"
            >
              <Search className="w-4 h-4 text-emerald-600" />
              <span>Browse Projects</span>
            </Link>
          </div>
        </div>
      </TerminalCard>
    </div>
  );
}
