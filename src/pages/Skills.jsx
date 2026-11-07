import React, { useState } from 'react';
import { Search, Terminal, Code2, Database, Cpu, Layers, Sparkles } from 'lucide-react';
import SEOHead from '../components/common/SEOHead';
import TerminalHeading from '../components/common/TerminalHeading';
import TerminalCard from '../components/common/TerminalCard';
import { skillCategories } from '../data/skills';

export default function Skills() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filterTabs = ['All', ...skillCategories.map((c) => c.title)];

  const displayedCategories = skillCategories.map((cat) => {
    const isCategoryMatched = selectedFilter === 'All' || selectedFilter === cat.title;
    if (!isCategoryMatched) return null;

    const filteredSkills = cat.skills.filter((s) => {
      const q = searchQuery.toLowerCase().trim();
      return (
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.role.toLowerCase().includes(q) ||
        s.summary.toLowerCase().includes(q)
      );
    });

    if (filteredSkills.length === 0) return null;

    return {
      ...cat,
      skills: filteredSkills
    };
  }).filter(Boolean);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-8">
      <SEOHead 
        title="Technical Skills & Competencies"
        description="Structured overview of Nandan Javagal's technical skills: Python, JavaScript, React.js, Python FastAPI, SQL Server, Dialog (Form.io), and AI/ML."
      />

      <TerminalHeading 
        command="cat technical_capabilities.cfg"
        title="Skills & Technologies"
        subtitle="Structured engineering capabilities across programming languages, AI/ML models, backend services, frontend applications, and developer tooling."
      />

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        
        {/* Category Filter Pills (strictly in requested order) */}
        <div className="flex flex-wrap gap-2">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                selectedFilter === tab
                  ? 'bg-slate-900 text-white font-bold shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full lg:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skills (e.g. FastAPI, React)..."
            className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 font-sans shadow-2xs"
          />
        </div>

      </div>

      {/* Categorized Skills Showcase in strict order */}
      {displayedCategories.length > 0 ? (
        <div className="space-y-8">
          {displayedCategories.map((category) => (
            <TerminalCard 
              key={category.id} 
              title={`sh -c '${category.command}'`}
              className="border-slate-200 shadow-xs"
            >
              <div className="space-y-4">
                
                {/* Category Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 border-b border-slate-100">
                  <div>
                    <h2 className="text-lg font-terminal font-bold text-slate-900">
                      {category.title}
                    </h2>
                    <p className="text-xs text-slate-500 font-sans">
                      {category.description}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 w-fit">
                    {category.skills.length} item{category.skills.length === 1 ? '' : 's'}
                  </span>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-1">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 hover:border-emerald-500/60 hover:bg-white transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-terminal font-bold text-sm text-slate-900">
                            {skill.name}
                          </h3>
                          <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            {skill.role}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 font-sans leading-relaxed">
                          {skill.summary}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </TerminalCard>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white border border-slate-200 rounded-xl p-8">
          <p className="text-slate-500 font-mono text-sm mb-3">
            No technical skills found matching "{searchQuery}".
          </p>
          <button
            onClick={() => { setSelectedFilter('All'); setSearchQuery(''); }}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg font-mono text-xs"
          >
            Reset Filters
          </button>
        </div>
      )}

    </div>
  );
}
