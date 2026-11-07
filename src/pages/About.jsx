import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, GraduationCap, MapPin, Mail, Linkedin, Github, 
  Terminal, Award, CheckCircle2, ChevronRight, Briefcase, Sparkles, Globe, Zap 
} from 'lucide-react';
import SEOHead from '../components/common/SEOHead';
import TerminalHeading from '../components/common/TerminalHeading';
import TerminalCard from '../components/common/TerminalCard';
import ResumeModal from '../components/common/ResumeModal';
import { contactInfo } from '../data/navigation';
import { 
  educationList, achievements, certifications, 
  technicalInterests, professionalStrengths 
} from '../data/experience';

export default function About() {
  const [showCV, setShowCV] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
      <SEOHead 
        title="About Me"
        description="Professional background of Nandan Javagal, Junior Software Engineer at Centre for Smart Governance. Malnad College of Engineering AI/ML graduate."
      />

      <TerminalHeading 
        command="cat ~/about/profile.md"
        title="About Me"
        subtitle="Background, engineering philosophy, and career objectives as a software engineer and AI/ML developer."
      />

      {/* Two-Column Balanced Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (Col 5): Identity, Complete Education, Achievements */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Identity & Contact Card */}
          <TerminalCard title="nandan@developer: ~" className="shadow-xs">
            <div className="flex flex-col items-center text-center space-y-4">
              
              {/* Profile Avatar Box */}
              <div className="w-24 h-24 rounded-2xl bg-slate-900 text-white flex flex-col items-center justify-center border-2 border-emerald-500 shadow-sm relative">
                <span className="font-terminal font-extrabold text-2xl text-emerald-400">NJ</span>
                <span className="text-[10px] font-mono text-slate-400 mt-0.5">DEV_ID: 2004</span>
                <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white" title="Active & Available" />
              </div>

              <div>
                <h2 className="text-xl font-terminal font-bold text-slate-900">
                  {contactInfo.name}
                </h2>
                <p className="text-xs font-mono text-emerald-700 font-semibold mt-1">
                  Junior Software Engineer
                </p>
                <p className="text-xs text-slate-500 font-sans mt-0.5">
                  Centre for Smart Governance
                </p>
              </div>

              {/* Fast Facts */}
              <div className="w-full text-left space-y-2.5 pt-4 border-t border-slate-200 text-xs font-sans">
                <div className="flex items-center gap-2 text-slate-700">
                  <Globe className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Open to Relocation / Worldwide Remote</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Mail className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <a href={`mailto:${contactInfo.email}`} className="text-emerald-700 hover:underline font-mono">
                    {contactInfo.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>B.E. (AI & ML) — Malnad College</span>
                </div>
              </div>

              {/* Social and CV Actions */}
              <div className="w-full pt-3 border-t border-slate-200 flex items-center justify-center gap-2.5">
                <a
                  href={contactInfo.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={contactInfo.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <button
                  onClick={() => setShowCV(true)}
                  className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors flex items-center gap-1.5 text-xs font-mono font-semibold shadow-xs"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Curriculum Vitae</span>
                </button>
              </div>

            </div>
          </TerminalCard>

          {/* Complete Education History Card */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 font-semibold border-b border-slate-100 pb-2">
              <GraduationCap className="w-4 h-4" />
              <span>Academic Education History</span>
            </div>

            <div className="space-y-3.5">
              {educationList.map((edu, idx) => (
                <div key={idx} className="border-b border-slate-100 last:border-0 pb-3 last:pb-0">
                  <div className="flex items-start justify-between gap-1 mb-0.5">
                    <h3 className="font-terminal font-bold text-xs text-slate-900 leading-snug">
                      {edu.institution}
                    </h3>
                    <span className="text-[10px] font-mono text-slate-500 shrink-0">
                      {edu.period}
                    </span>
                  </div>
                  <p className="text-xs text-emerald-800 font-sans font-medium">
                    {edu.degree}
                  </p>
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mt-1">
                    <span>{edu.location}</span>
                    <span className="font-bold text-slate-700 bg-slate-100 px-1.5 py-0.2 rounded border border-slate-200">
                      {edu.score}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Research & Achievements Card */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 font-semibold border-b border-slate-100 pb-2">
              <Award className="w-4 h-4" />
              <span>Conference Research Papers</span>
            </div>

            <div className="space-y-2.5">
              {achievements.map((item, idx) => (
                <div key={idx} className="text-xs font-sans">
                  <p className="font-semibold text-slate-800 leading-snug">
                    {item.title}
                  </p>
                  <p className="text-[11px] font-mono text-emerald-700 mt-0.5">
                    {item.venue} ({item.year})
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (Col 7): In-Depth Bio, Objectives, Strengths & Interests */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Professional Introduction Card */}
          <TerminalCard title="nandan@portfolio: ~/bio.txt" className="shadow-xs">
            <div className="space-y-4 text-slate-700 text-sm leading-relaxed font-sans">
              <h2 className="text-lg font-terminal font-bold text-slate-900">
                Professional Overview
              </h2>
              <p>
                I am a Software Engineer currently working as a <strong className="text-slate-900 font-semibold">Junior Software Engineer at the Centre for Smart Governance (CSG)</strong>. 
                At CSG, I contribute to state-level digital transformation initiatives for government administration.
              </p>
              <p>
                My daily engineering work includes independently developing the React.js frontend interface and Python FastAPI backend APIs 
                for the <strong className="text-slate-900 font-semibold">MIGWDD Management Information System</strong>, designing database schemas and authoring 
                stored procedures in SQL Server, and implementing secure role-based access controls.
              </p>
              <p>
                Additionally, for the <strong className="text-slate-900 font-semibold">Karnataka Forest Department (KFD) Platform</strong>, I built modules on 
                <strong className="text-slate-900 font-semibold"> Dialog</strong>—a low-code platform tool powered by Form.io and Camunda workflow engines—covering checkpost tracking, 
                staff deployment, and team assignment lifecycles.
              </p>
              <p>
                I completed my Bachelor of Engineering in Computer Science and Engineering (Artificial Intelligence and Machine Learning) from 
                Malnad College of Engineering, Hassan with a CGPA of 7.8. Alongside full-stack engineering, I have authored and presented research papers 
                at IEEE and international conferences in AutoML, computer vision, and IoT systems.
              </p>
            </div>
          </TerminalCard>

          {/* Career Objectives */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 font-semibold">
              <Terminal className="w-4 h-4" />
              <span>~/career_objectives.sh</span>
            </div>
            <h3 className="text-sm font-terminal font-bold text-slate-900">
              Career Objectives
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
              To contribute to engineering-driven teams building scalable software platforms, full-stack microservices, 
              and practical AI/ML solutions. I focus on writing maintainable code, maintaining solid database integrity, 
              and solving real-world problems with practical engineering discipline.
            </p>
          </div>

          {/* Professional Strengths */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>~/professional_strengths.json</span>
            </div>
            <h3 className="text-sm font-terminal font-bold text-slate-900">
              Professional Strengths
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {professionalStrengths.map((strength, i) => (
                <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-all">
                  <div className="flex items-start gap-2 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <h4 className="font-terminal font-bold text-xs text-slate-900">
                      {strength.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 font-sans leading-relaxed pl-6">
                    {strength.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Interests */}
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-2.5">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
              Technical Interests & Engineering Focus
            </h3>
            <div className="flex flex-wrap gap-2">
              {technicalInterests.map((interest, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-white text-slate-800 text-xs font-mono rounded-lg border border-slate-200 shadow-2xs"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* CV Modal */}
      <ResumeModal isOpen={showCV} onClose={() => setShowCV(false)} />
    </div>
  );
}
