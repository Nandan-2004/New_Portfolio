import React, { useState } from 'react';
import { Mail, Linkedin, Github, Copy, Check, ExternalLink, Globe, Clock, Terminal, MessageSquare } from 'lucide-react';
import SEOHead from '../components/common/SEOHead';
import TerminalHeading from '../components/common/TerminalHeading';
import TerminalCard from '../components/common/TerminalCard';
import { contactInfo } from '../data/navigation';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-10">
      <SEOHead 
        title="Contact & Inquiries"
        description="Direct contact channels for Nandan Javagal: Email, LinkedIn, and GitHub. Open for software engineering and AI/ML opportunities worldwide."
      />

      <TerminalHeading 
        command="cat ~/contact/connect.md"
        title="Contact & Inquiries"
        subtitle="Direct channels for recruiters, hiring managers, and clients seeking a Software Engineer specializing in full-stack applications, Python backend services, and AI/ML systems."
      />

      {/* Main Direct Channels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Direct Email Card */}
        <TerminalCard title="channel://email - direct inbox" className="shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-terminal font-bold text-base text-slate-900">
                  Primary Email
                </h3>
                <p className="text-xs text-slate-500 font-sans">
                  Direct personal & professional inbox
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 font-sans leading-relaxed">
              For job opportunities, technical project inquiries, or freelance proposals, emailing me directly is the fastest communication route.
            </p>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs text-slate-900 break-all select-all flex items-center justify-between gap-2">
              <span>{contactInfo.email}</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-1">
              <a
                href={`mailto:${contactInfo.email}`}
                className="flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-mono text-xs font-bold text-center transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <Mail className="w-4 h-4" />
                <span>Send Direct Mail</span>
              </a>
              <button
                onClick={handleCopyEmail}
                className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-mono text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 border border-slate-200"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy Address'}</span>
              </button>
            </div>
          </div>
        </TerminalCard>

        {/* Developer Profiles Card */}
        <TerminalCard title="channel://profiles - verified links" className="shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800">
                <Globe className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-terminal font-bold text-base text-slate-900">
                  Professional Networks
                </h3>
                <p className="text-xs text-slate-500 font-sans">
                  Verified code repositories & career background
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 font-sans leading-relaxed">
              Connect on LinkedIn or inspect source code, implementations, and open-source contributions directly on GitHub.
            </p>

            <div className="space-y-2.5 pt-1">
              {/* LinkedIn */}
              <a
                href={contactInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-emerald-500/60 hover:bg-slate-50 transition-all text-xs font-mono text-slate-900 bg-white"
              >
                <div className="flex items-center gap-2.5">
                  <Linkedin className="w-4 h-4 text-[#0077b5]" />
                  <span className="font-semibold">LinkedIn Profile</span>
                </div>
                <span className="text-[11px] text-slate-500 flex items-center gap-1">
                  Connect <ExternalLink className="w-3 h-3" />
                </span>
              </a>

              {/* GitHub */}
              <a
                href={contactInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-emerald-500/60 hover:bg-slate-50 transition-all text-xs font-mono text-slate-900 bg-white"
              >
                <div className="flex items-center gap-2.5">
                  <Github className="w-4 h-4 text-slate-900" />
                  <span className="font-semibold">GitHub Repositories</span>
                </div>
                <span className="text-[11px] text-slate-500 flex items-center gap-1">
                  View Code <ExternalLink className="w-3 h-3" />
                </span>
              </a>
            </div>
          </div>
        </TerminalCard>

      </div>

      {/* Global Opportunities & Response Time Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="font-terminal font-bold text-base text-slate-900">
              Current Availability Status
            </h3>
          </div>
          <span className="px-3 py-1 rounded bg-emerald-50 text-emerald-800 text-xs font-mono font-bold border border-emerald-200 w-fit">
            Open for Opportunities
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans">
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-1.5 text-slate-500 font-mono text-[10px] uppercase font-bold mb-1">
              <Globe className="w-3.5 h-3.5 text-emerald-600" />
              <span>Location Flexibility</span>
            </div>
            <p className="font-semibold text-slate-800">
              Open Worldwide (Remote / Relocation)
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-1.5 text-slate-500 font-mono text-[10px] uppercase font-bold mb-1">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              <span>Response Turnaround</span>
            </div>
            <p className="font-semibold text-slate-800">
              Typically within 24 Hours
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-1.5 text-slate-500 font-mono text-[10px] uppercase font-bold mb-1">
              <Terminal className="w-3.5 h-3.5 text-emerald-600" />
              <span>Target Engineering Roles</span>
            </div>
            <p className="font-semibold text-slate-800">
              Software Engineer / AI-ML / Full-Stack
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
