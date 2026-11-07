import React from 'react';
import { X, FileText, Code2, Briefcase, GraduationCap, Award, Zap, Printer } from 'lucide-react';
import { contactInfo } from '../../data/navigation';
import { workExperience, educationList, achievements, certifications } from '../../data/experience';

export default function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
        aria-hidden="true" 
      />

      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-4xl max-h-[92vh] rounded-2xl border border-slate-300 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Top Bar */}
        <div className="flex justify-between items-center px-6 py-3.5 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <h2 className="text-xs font-mono font-bold text-slate-800 tracking-wider uppercase">
              Curriculum Vitae — Nandan Javagal
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              aria-label="Print or Save CV"
              className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors flex items-center gap-1.5 text-xs font-mono"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>
            <button 
              onClick={onClose}
              aria-label="Close CV Modal"
              className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Paper Body */}
        <div className="p-4 sm:p-8 overflow-y-auto custom-scrollbar flex-1 bg-slate-100/70 text-slate-900">
          <div className="bg-white p-6 sm:p-10 rounded-xl shadow-sm border border-slate-200 max-w-3xl mx-auto space-y-6">
            
            {/* Header */}
            <div className="border-b-2 border-slate-900 pb-5 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
              <div>
                <h1 className="text-3xl font-terminal font-extrabold text-slate-900 tracking-tight">
                  {contactInfo.name}
                </h1>
                <p className="text-sm font-semibold text-emerald-700 font-mono mt-0.5">
                  {contactInfo.headline}
                </p>
                <p className="text-xs text-slate-600 mt-0.5">
                  Junior Software Engineer @ Centre for Smart Governance
                </p>
              </div>
              <div className="flex flex-col text-xs font-mono text-slate-600 space-y-1 text-left sm:text-right">
                <a href={`mailto:${contactInfo.email}`} className="text-emerald-700 hover:underline">
                  {contactInfo.email}
                </a>
                <span>Open for Opportunities (Worldwide / Remote)</span>
                <div className="flex gap-2 justify-start sm:justify-end">
                  <a href={contactInfo.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">
                    LinkedIn
                  </a>
                  <span>•</span>
                  <a href={contactInfo.social.github} target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">
                    GitHub
                  </a>
                </div>
              </div>
            </div>

            {/* Technical Skills - Strictly in requested order */}
            <div>
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider mb-2.5 border-b border-slate-200 pb-1 text-slate-900 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-emerald-700" /> Technical Skills
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs text-slate-800">
                <div className="font-bold sm:col-span-1 text-slate-900">Programming Languages:</div>
                <div className="sm:col-span-3">Python, JavaScript, C, Java, SQL</div>

                <div className="font-bold sm:col-span-1 text-slate-900">AI & Machine Learning:</div>
                <div className="sm:col-span-3">Machine Learning, Deep Learning, NLP, YOLOv8, Pandas, NumPy, Scikit-learn, Hugging Face</div>

                <div className="font-bold sm:col-span-1 text-slate-900">Backend Development:</div>
                <div className="sm:col-span-3">Python FastAPI, REST APIs, JSON, SQL Server, Stored Procedures, API Integration</div>

                <div className="font-bold sm:col-span-1 text-slate-900">Frontend Development:</div>
                <div className="sm:col-span-3">React.js, HTML, CSS, JavaScript, Tailwind CSS</div>

                <div className="font-bold sm:col-span-1 text-slate-900">Tools & Low-Code:</div>
                <div className="sm:col-span-3">Dialog (Form.io), Camunda Workflow, N8N, Git, GitHub, VS Code, Postman, Swagger, Figma, Linux, Windows</div>
              </div>
            </div>

            {/* Professional Experience */}
            <div>
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider mb-2.5 border-b border-slate-200 pb-1 text-slate-900 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-emerald-700" /> Professional Experience
              </h2>
              <div className="space-y-4">
                {workExperience.map((exp) => (
                  <div key={exp.id} className="border-b border-slate-100 last:border-0 pb-3">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline mb-0.5">
                      <h3 className="font-bold text-sm text-slate-900">{exp.role}</h3>
                      <span className="text-xs font-mono text-emerald-700 font-semibold">{exp.period}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline mb-1.5">
                      <span className="italic text-xs text-slate-700">{exp.company}</span>
                      <span className="text-[11px] text-slate-500 font-mono">{exp.type}</span>
                    </div>
                    <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
                      {exp.responsibilities.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Education History */}
            <div>
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider mb-2.5 border-b border-slate-200 pb-1 text-slate-900 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-emerald-700" /> Education History
              </h2>
              <div className="space-y-2">
                {educationList.map((edu, idx) => (
                  <div key={idx} className="flex justify-between items-start text-xs border-b border-slate-100 last:border-0 pb-1.5">
                    <div>
                      <h3 className="font-bold text-slate-900">{edu.institution}</h3>
                      <p className="text-slate-600">{edu.degree}</p>
                    </div>
                    <div className="text-right font-mono text-[11px]">
                      <span className="font-bold text-emerald-800">{edu.score}</span>
                      <p className="text-slate-500">{edu.period}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements & Certifications */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <h2 className="text-xs font-mono font-bold uppercase tracking-wider mb-2 border-b border-slate-200 pb-1 text-slate-900 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-emerald-700" /> Research Publications
                </h2>
                <ul className="list-disc list-inside text-[11px] text-slate-700 space-y-1">
                  {achievements.map((item, idx) => (
                    <li key={idx}>
                      <span className="font-medium">{item.title}</span> — {item.venue}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-xs font-mono font-bold uppercase tracking-wider mb-2 border-b border-slate-200 pb-1 text-slate-900 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-emerald-700" /> Certifications
                </h2>
                <ul className="list-disc list-inside text-[11px] text-slate-700 space-y-1">
                  {certifications.map((item, idx) => (
                    <li key={idx}>
                      <span className="font-medium">{item.name}</span> — {item.issuer} ({item.year})
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>

        {/* Modal Bottom Bar */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button 
            onClick={onClose}
            className="px-5 py-1.5 bg-slate-900 text-white font-mono text-xs uppercase font-semibold rounded-lg hover:bg-slate-800 transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
