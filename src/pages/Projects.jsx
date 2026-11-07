import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight, ExternalLink, Terminal, Shield, FolderGit2 } from 'lucide-react';
import SEOHead from '../components/common/SEOHead';
import TerminalHeading from '../components/common/TerminalHeading';
import { projectsData, projectCategories } from '../data/projects';

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projectsData.filter((project) => {
    // Category filtering
    let matchesCategory = true;
    if (activeCategory === 'Office / CSG Projects') {
      matchesCategory = project.projectType === 'office';
    } else if (activeCategory === 'Personal Projects') {
      matchesCategory = project.projectType === 'personal';
    } else if (activeCategory !== 'All') {
      matchesCategory = project.category.toLowerCase().includes(activeCategory.toLowerCase());
    }

    // Search query filtering
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      project.title.toLowerCase().includes(q) ||
      project.description.toLowerCase().includes(q) ||
      project.tech.some((t) => t.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8">
      <SEOHead 
        title="Projects & Engineered Systems"
        description="Software engineering systems, government platforms at CSG Bengaluru, and AI/ML projects built by Nandan Javagal."
      />

      <TerminalHeading 
        command="ls -la ~/projects/"
        title="Engineered Systems & Projects"
        subtitle="Practical development experience spanning state-level digital governance platforms at CSG and personal/academic AI & software projects."
      />

      {/* Filter Tabs and Search Bar */}
      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-8 pb-6 border-b border-slate-200">
        
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                activeCategory === cat
                  ? 'bg-slate-900 text-white font-bold shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by tech, title, or keyword..."
            className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 font-sans shadow-2xs"
          />
        </div>

      </div>

      {/* Notice Banner Explaining Distinction */}
      <div className="mb-8 p-4 rounded-xl bg-slate-100 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-mono text-slate-600 gap-2">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>
            <strong>Project Separation:</strong> Office projects developed for the Government of Karnataka at CSG are marked with 🏢. Personal & research projects are marked with 🔬.
          </span>
        </div>
        <span className="text-slate-400 font-sans shrink-0">
          Showing {filteredProjects.length} systems
        </span>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="terminal-card rounded-xl border border-slate-200 bg-white overflow-hidden flex flex-col justify-between hover:border-emerald-600/50 hover:shadow-md transition-all"
            >
              <div className="p-6">
                
                {/* Header Tag / Project Type */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`px-2.5 py-1 rounded text-[10px] font-mono uppercase font-bold tracking-wider ${
                    project.projectType === 'office'
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                  }`}>
                    {project.projectType === 'office' ? '🏢 Office (CSG Bengaluru)' : '🔬 Personal Project'}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">
                    {project.category}
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="text-xl font-terminal font-bold text-slate-900 mb-1">
                  <Link to={`/projects/${project.slug}`} className="hover:text-emerald-700 transition-colors">
                    {project.title}
                  </Link>
                </h3>
                
                {/* Tagline */}
                <p className="text-xs font-mono text-emerald-700 mb-3">
                  {project.tagline}
                </p>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 font-sans line-clamp-3">
                  {project.description}
                </p>

                {/* Key Features Quick Peek */}
                {project.features && (
                  <div className="mb-4 space-y-1 text-xs text-slate-600 font-sans">
                    <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold">Key Capabilities:</span>
                    <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-700">
                      {project.features.slice(0, 2).map((feat, i) => (
                        <li key={i} className="line-clamp-1">{feat}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-mono border border-slate-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>

              </div>

              {/* Card Footer Actions */}
              <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                <Link
                  to={`/projects/${project.slug}`}
                  className="text-xs font-mono text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-1.5"
                >
                  <span>Explore Architecture</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>

                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-slate-500 hover:text-slate-800 flex items-center gap-1"
                  >
                    <span>GitHub</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white border border-slate-200 rounded-xl p-8">
          <p className="text-slate-500 font-mono text-sm mb-3">
            No projects found matching "{searchQuery}" in category "{activeCategory}".
          </p>
          <button
            onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg font-mono text-xs"
          >
            Reset Filters
          </button>
        </div>
      )}

    </div>
  );
}
