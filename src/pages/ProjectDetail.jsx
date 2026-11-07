import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Terminal, Check, ExternalLink, Github, 
  Layers, AlertTriangle, Lightbulb, Shield, Building2 
} from 'lucide-react';
import SEOHead from '../components/common/SEOHead';
import TerminalCard from '../components/common/TerminalCard';
import { projectsData } from '../data/projects';

export default function ProjectDetail() {
  const { slug, id } = useParams();
  const projectIdentifier = slug || id;

  const project = projectsData.find(
    (p) => p.slug === projectIdentifier || p.id === projectIdentifier
  );

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <SEOHead title="Project Not Found" />
        <TerminalCard title="Error 404 - File Not Found">
          <div className="space-y-4 py-6">
            <h2 className="text-xl font-terminal font-bold text-slate-900">Project Not Found</h2>
            <p className="text-xs text-slate-600 font-sans">
              The project specification "{projectIdentifier}" does not exist in the portfolio.
            </p>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-lg text-xs font-mono font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Projects</span>
            </Link>
          </div>
        </TerminalCard>
      </div>
    );
  }

  // Related projects
  const relatedProjects = projectsData.filter((p) => p.id !== project.id).slice(0, 2);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 space-y-8">
      <SEOHead 
        title={`${project.title} — System Architecture`}
        description={project.description}
      />

      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-500 hover:text-emerald-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Projects</span>
        </Link>
        <span className="text-[11px] font-mono text-slate-400">
          ~/projects/{project.slug}/spec.md
        </span>
      </div>

      {/* Main Terminal Overview Card */}
      <TerminalCard title={`cat ~/projects/${project.slug}.spec`} className="shadow-xs">
        <div className="space-y-6">
          
          {/* Top Badges Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-1 rounded text-[11px] font-mono uppercase font-bold tracking-wider ${
                project.projectType === 'office'
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
              }`}>
                {project.projectType === 'office' ? '🏢 Office Project (CSG)' : '🔬 Personal Project'}
              </span>
              <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                {project.category}
              </span>
            </div>

            {/* Links */}
            <div className="flex items-center gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-700 hover:text-emerald-700 font-semibold"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </a>
              )}
            </div>
          </div>

          {/* Project Title and Tagline */}
          <div>
            <h1 className="text-2xl sm:text-4xl font-terminal font-extrabold text-slate-900 tracking-tight">
              {project.title}
            </h1>
            <p className="text-sm sm:text-base font-mono text-emerald-700 font-medium mt-1">
              {project.tagline}
            </p>
          </div>

          {/* Project Overview */}
          <div className="text-sm text-slate-700 leading-relaxed font-sans space-y-2">
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
              Engineering Scope & Overview
            </h2>
            <p>{project.overview || project.description}</p>
          </div>

          {/* Only show Problem & Solution for Personal Projects (excluded for Office projects as requested) */}
          {project.projectType === 'personal' && project.problem && project.solution && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-mono text-rose-700 font-bold">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Problem Statement</span>
                </div>
                <p className="text-xs text-slate-600 font-sans leading-relaxed">
                  {project.problem}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-800 font-bold">
                  <Lightbulb className="w-4 h-4" />
                  <span>Proposed Solution</span>
                </div>
                <p className="text-xs text-slate-700 font-sans leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>
          )}

          {/* Key Features / Responsibilities */}
          {project.features && (
            <div className="space-y-3 pt-2">
              <h2 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
                {project.projectType === 'office' ? 'Implemented Modules & Capabilities' : 'Key Technical Capabilities'}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 font-sans">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Architecture Overview */}
          {project.architecture && (
            <div className="space-y-3 pt-2">
              <h2 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-emerald-700" />
                <span>Architecture & System Design</span>
              </h2>
              <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs leading-relaxed border border-slate-800">
                <div className="text-emerald-400 font-bold mb-1">// Technical Design Specification</div>
                <p className="font-sans text-xs text-slate-300 leading-relaxed">
                  {project.architecture}
                </p>
              </div>
            </div>
          )}

          {/* Technology Stack Badges */}
          <div className="space-y-3 pt-2">
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-emerald-700" />
              <span>Technology Stack</span>
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 bg-white border border-slate-300 rounded-lg text-xs font-mono text-slate-800 shadow-2xs font-semibold"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

        </div>
      </TerminalCard>

      {/* Related Projects */}
      <div className="pt-6 border-t border-slate-200">
        <h2 className="text-sm font-terminal font-bold text-slate-900 mb-4">
          Explore Other Engineered Systems
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {relatedProjects.map((rel) => (
            <Link
              key={rel.id}
              to={`/projects/${rel.slug}`}
              className="p-4 rounded-xl bg-white border border-slate-200 hover:border-emerald-600/50 hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase">
                  {rel.category}
                </span>
                <h3 className="font-terminal font-bold text-slate-900 text-sm mt-0.5">
                  {rel.title}
                </h3>
                <p className="text-xs text-slate-500 font-sans mt-1 line-clamp-2">
                  {rel.tagline}
                </p>
              </div>
              <span className="text-xs font-mono text-emerald-700 font-semibold mt-3 inline-flex items-center gap-1">
                View Spec →
              </span>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
