import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Terminal, Code2, Database, ShieldCheck, 
  Cpu, FileText, ExternalLink, ChevronRight, Layers, Globe 
} from 'lucide-react';
import SEOHead from '../components/common/SEOHead';
import TerminalCard from '../components/common/TerminalCard';
import ResumeModal from '../components/common/ResumeModal';
import { contactInfo } from '../data/navigation';
import { projectsData } from '../data/projects';

export default function Home() {
  const [showCV, setShowCV] = useState(false);

  // Selected 4 featured projects (2 office, 2 personal)
  const featuredProjects = projectsData.slice(0, 4);

  const pillars = [
    {
      title: 'Software Engineering',
      desc: 'Clean service architecture, structured API design, relational data modeling, and robust backend logic in Python.',
      icon: <Terminal className="w-5 h-5 text-emerald-600" />
    },
    {
      title: 'AI/ML Development',
      desc: 'Automated machine learning pipelines, NLP language models, computer vision systems, and predictive data analysis.',
      icon: <Cpu className="w-5 h-5 text-emerald-600" />
    },
    {
      title: 'Full-Stack Applications',
      desc: 'Component-driven user interfaces in React.js paired with asynchronous Python FastAPI services and relational databases.',
      icon: <Layers className="w-5 h-5 text-emerald-600" />
    },
    {
      title: 'Workflow Automation',
      desc: 'Low-code platform orchestration on Dialog with Camunda workflow engines, Form.io builders, and autonomous pipelines.',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
      <SEOHead 
        title="Home"
        description="Nandan Javagal — Software Engineer specializing in AI/ML, Full-Stack Development and practical software engineering solutions."
      />

      {/* Terminal Hero Section */}
      <section className="pt-2">
        <TerminalCard title="nandan@portfolio: ~ (bash)" className="border-slate-300 shadow-sm">
          <div className="space-y-6">
            
            {/* Command Line Prompt Indicator */}
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200/80 w-fit">
              <span className="font-bold text-emerald-600">$</span>
              <span>whoami</span>
            </div>

            {/* Hero Heading */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl font-terminal font-extrabold text-slate-900 tracking-tight leading-tight">
                Hi, I'm <span className="text-emerald-700">Nandan Javagal</span>
                <span className="text-emerald-500 animate-pulse">_</span>
              </h1>
              <p className="text-base sm:text-xl font-mono text-slate-700 font-semibold">
                Software Engineer <span className="text-emerald-600">|</span> AI/ML <span className="text-emerald-600">|</span> Full-Stack Development
              </p>
            </div>

            {/* Objective, Professional Introduction */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-4xl font-sans">
              Software Engineer specializing in AI/ML, Full-Stack Development, and practical software engineering solutions. 
              Currently working as a Junior Software Engineer at the <strong className="text-slate-900 font-semibold">Centre for Smart Governance</strong>, 
              building departmental management platforms, workflow automation, and machine learning systems.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/projects"
                className="px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs uppercase font-bold tracking-wider transition-all shadow-sm flex items-center gap-2"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => setShowCV(true)}
                className="px-6 py-3 rounded-lg bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-mono text-xs uppercase font-semibold tracking-wider transition-all flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-emerald-600" />
                <span>Download Resume</span>
              </button>
            </div>

            {/* Global Availability Status Bar */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs font-mono text-slate-500 gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-slate-800 font-semibold">Status: Open for Software Engineering & AI/ML Opportunities</span>
              </div>
              <span className="text-emerald-700 font-medium flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                <span>Worldwide / Remote / Relocation</span>
              </span>
            </div>

          </div>
        </TerminalCard>
      </section>

      {/* Core Engineering Competencies */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 font-semibold">
          <Terminal className="w-4 h-4" />
          <span>~/capabilities/pillars.cfg</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-terminal font-bold text-slate-900">
          Core Engineering Competencies
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
          {pillars.map((pillar, i) => (
            <div 
              key={i}
              className="bg-white p-5 rounded-xl border border-slate-200 hover:border-emerald-600/50 hover:shadow-sm transition-all"
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-3">
                {pillar.icon}
              </div>
              <h3 className="font-terminal font-bold text-slate-900 text-sm mb-1.5">
                {pillar.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 mb-1 font-semibold">
              <Terminal className="w-4 h-4" />
              <span>~/projects --featured</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-terminal font-bold text-slate-900">
              Featured Systems & Applications
            </h2>
          </div>
          <Link
            to="/projects"
            className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-emerald-700 hover:text-emerald-800 font-semibold"
          >
            <span>All Projects</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className="terminal-card rounded-xl border border-slate-200 bg-white overflow-hidden flex flex-col justify-between hover:border-emerald-600/50 hover:shadow-sm transition-all"
            >
              <div className="p-6">
                
                {/* Project Tag */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`px-2.5 py-1 rounded text-[10px] font-mono uppercase font-bold tracking-wider ${
                    project.projectType === 'office'
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                  }`}>
                    {project.projectType === 'office' ? '🏢 Office Project (CSG)' : '🔬 Personal / Research Project'}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {project.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-terminal font-bold text-slate-900 mb-1">
                  <Link to={`/projects/${project.slug}`} className="hover:text-emerald-700 transition-colors">
                    {project.title}
                  </Link>
                </h3>
                <p className="text-xs font-mono text-emerald-700 mb-3">
                  {project.tagline}
                </p>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed mb-4 font-sans line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 mb-4">
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

              {/* Card Footer Link */}
              <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                <Link
                  to={`/projects/${project.slug}`}
                  className="text-xs font-mono text-emerald-700 hover:text-emerald-900 font-semibold flex items-center gap-1.5"
                >
                  <span>View Project Details</span>
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

        <div className="text-center sm:hidden pt-2">
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-700 font-bold"
          >
            <span>View All Engineered Systems</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Global Availability Section */}
      <section className="pt-4">
        <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-mono text-emerald-800 font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for Opportunities</span>
            </div>
            <h3 className="text-lg font-terminal font-bold text-slate-900">
              Open for Software Engineering & AI/ML Roles
            </h3>
            <p className="text-xs text-slate-600 font-sans max-w-2xl leading-relaxed">
              Available for full-time software engineering roles and practical freelance development across full-stack applications, Python backend services, and AI/ML pipelines. Open to worldwide remote opportunities and relocation.
            </p>
          </div>
          <Link
            to="/contact"
            className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-mono text-xs uppercase font-bold tracking-wider shrink-0 transition-all shadow-sm"
          >
            Get In Touch
          </Link>
        </div>
      </section>

      {/* CV Modal */}
      <ResumeModal isOpen={showCV} onClose={() => setShowCV(false)} />
    </div>
  );
}
