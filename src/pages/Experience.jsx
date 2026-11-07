import React from 'react';
import { Briefcase, Building, Calendar, MapPin, Terminal, CheckCircle2, Layers } from 'lucide-react';
import SEOHead from '../components/common/SEOHead';
import TerminalHeading from '../components/common/TerminalHeading';
import TerminalCard from '../components/common/TerminalCard';
import { workExperience } from '../data/experience';

export default function Experience() {
  const practicalSkillsSummary = [
    'React.js Frontend Development',
    'Python FastAPI Backend APIs',
    'SQL Server & Stored Procedures',
    'Dialog Low-Code Platform',
    'Form.io Dynamic Forms',
    'Camunda Workflow Automation',
    'REST APIs & JSON Integration',
    'AI & Machine Learning Pipelines'
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 space-y-10">
      <SEOHead 
        title="Professional Experience"
        description="Software engineering timeline of Nandan Javagal: Junior Software Engineer at Centre for Smart Governance, government digital platforms, and AI/ML work."
      />

      <TerminalHeading 
        command="git log --graph --oneline --experience"
        title="Professional Experience"
        subtitle="Track record in state-level digital governance, full-stack development, database stored procedures, workflow automation, and machine learning pipelines."
      />

      {/* Practical Expertise Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <h2 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-3 flex items-center gap-1.5">
          <Layers className="w-4 h-4 text-emerald-700" />
          <span>Practical Engineering Areas & Production Focus</span>
        </h2>
        <div className="flex flex-wrap gap-2">
          {practicalSkillsSummary.map((skill, i) => (
            <span
              key={i}
              className="px-2.5 py-1 bg-slate-100 text-slate-800 text-xs font-mono rounded-lg border border-slate-200"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Vertical Timeline */}
      <div className="relative border-l-2 border-emerald-600/30 pl-6 sm:pl-8 space-y-10 ml-3 sm:ml-4">
        {workExperience.map((job) => (
          <div key={job.id} className="relative group">
            {/* Timeline Green Node */}
            <span className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-emerald-600 ring-4 ring-[#f8fafc] border border-white shadow-xs group-hover:scale-110 transition-transform" />

            <TerminalCard title={`commit ${job.command}`} className="shadow-xs hover:border-slate-300">
              <div className="space-y-4">
                
                {/* Role Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-lg sm:text-xl font-terminal font-bold text-slate-900">
                      {job.role}
                    </h3>
                    <p className="text-sm font-semibold text-emerald-700 font-mono mt-0.5">
                      {job.company}
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-xs font-mono border border-slate-200 w-fit">
                    {job.type}
                  </span>
                </div>

                {/* Date */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500">
                  <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                    {job.period}
                  </span>
                </div>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-slate-700 font-sans leading-relaxed">
                  {job.summary}
                </p>

                {/* Key Responsibilities */}
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
                    Contributions & Responsibilities:
                  </h4>
                  <ul className="space-y-2">
                    {job.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 font-sans leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies Used */}
                <div className="pt-3 border-t border-slate-100">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2 font-bold">
                    Technologies Applied:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {job.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-900 text-[11px] font-mono border border-emerald-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </TerminalCard>
          </div>
        ))}
      </div>

    </div>
  );
}
