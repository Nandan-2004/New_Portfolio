import React, { useState, useEffect, useContext, createContext, useRef } from 'react';
import { 
  ArrowRight, Github, Linkedin, Mail, 
  ChevronRight, Terminal, Database, Code2, 
  Sparkles, FileText, Briefcase, X, Check, Copy,
  Cpu, Layers, Zap, Award, GraduationCap, MapPin, ExternalLink,
  Search, ShieldCheck, Activity, Eye, Sliders
} from 'lucide-react';

const initialData = {
  projects: [
    {
      id: 1,
      title: 'VertexML AutoML Platform',
      category: 'AI & Automation',
      description: 'Integrated automated preprocessing, model selection, hyperparameter tuning, training, and evaluation pipeline for deployable ML models. Presented paper at ECMI 2026 IEEE International Conference.',
      details: 'VertexML automates complex machine learning workflows including feature scaling, missing data imputation, model selection (XGBoost, LightGBM, Random Forests, Neural Networks), and hyperparameter tuning using Bayesian optimization. Exports clean, deployable model artifacts with comprehensive performance metrics.',
      tech: ['Python', 'Machine Learning', 'AutoML', 'Scikit-Learn', 'Data Pipelines'],
      highlights: ['ECMI 2026 IEEE Published', 'Bayesian Optimization', 'Automated Feature Engineering'],
      metrics: { accuracy: '96.4%', speed: '10x Faster Tuning', status: 'IEEE Published' }
    },
    {
      id: 2,
      title: 'Automated News Video Publishing System',
      category: 'AI & Automation',
      description: 'Autonomous N8N pipeline fetching news feeds, drafting AI video scripts, rendering video compositions, and publishing across YouTube and Telegram.',
      details: 'An end-to-end autonomous content generation system. It monitors RSS news feeds, uses LLM agents for script drafting and summary synthesis, invokes video composition APIs, and posts published videos to YouTube channels with instant status alerts to Telegram.',
      tech: ['N8N', 'AI Agents', 'Automation', 'Python', 'REST APIs'],
      highlights: ['100% Autonomous Execution', 'LLM Script Generation', 'Multi-channel Distribution'],
      metrics: { channels: 'YouTube & Telegram', automation: '100% Hands-Free', latency: '< 5 Mins' }
    },
    {
      id: 3,
      title: 'Automated Legal Document Summarizer',
      category: 'NLP & Deep Learning',
      description: 'Streamlit NLP application leveraging fine-tuned FLAN-T5 LLM for domain-specific legal text summarization and risk factor extraction.',
      details: 'Tailored for legal professionals to analyze lengthy contracts and agreements. Uses a fine-tuned FLAN-T5 model to summarize complex clauses, identify key obligations, highlight potential legal risks, and present structured executive summaries.',
      tech: ['Python', 'FLAN-T5', 'Hugging Face', 'NLP', 'Streamlit'],
      highlights: ['Fine-tuned FLAN-T5 Model', 'Risk Factor Extraction', 'Interactive Web UI'],
      metrics: { reduction: '80% Reading Time', accuracy: 'High Precision', format: 'Streamlit Web App' }
    },
    {
      id: 4,
      title: 'Real-time Object Detection System',
      category: 'Computer Vision',
      description: 'High-performance computer vision system for real-time multi-object detection, tracking, and analytics in video streams using YOLOv8.',
      details: 'Real-time computer vision pipeline engineered for low latency object detection and tracking in high-FPS video streams. Built using YOLOv8, PyTorch, and OpenCV with support for edge-device GPU acceleration.',
      tech: ['Python', 'YOLOv8', 'OpenCV', 'PyTorch', 'Computer Vision'],
      highlights: ['Real-time 60+ FPS', 'Custom Trained YOLOv8', 'Edge Compatible'],
      metrics: { frameRate: '60+ FPS', model: 'YOLOv8', library: 'OpenCV & PyTorch' }
    },
    {
      id: 5,
      title: 'Smart Water Monitoring System',
      category: 'IoT & ML',
      description: 'ESP32-based hardware-software IoT solution featuring real-time water flow telemetry, automated billing, and ML consumption forecasting.',
      details: 'IoT solution utilizing ESP32 microcontrollers connected to water flow sensors. Sensor telemetry is streamed to a central dashboard for real-time water usage visualization, leak anomaly detection, and predictive ML forecasting.',
      tech: ['ESP32', 'IoT', 'Machine Learning', 'C++', 'Python'],
      highlights: ['S4SD Conference Paper', 'Real-time Sensor Telemetry', 'ML Anomaly Detection'],
      metrics: { platform: 'ESP32 IoT', paper: 'S4SD Conference', feature: 'Leak Detection' }
    }
  ],
  experience: [
    {
      id: 1,
      role: 'Junior Software Engineer',
      company: 'Centre for Smart Governance, Bengaluru',
      period: 'July 1st 2026 - Present',
      type: 'Full-Time',
      description: 'Engineers state-level smart governance platforms and core digital infrastructure applications, enhancing backend reliability, REST API architecture, and database scalability.',
      icon: <Terminal className="w-5 h-5" />
    },
    {
      id: 2,
      role: 'Software Engineer Trainee',
      company: 'Centre for Smart Governance, Bengaluru',
      period: 'Jan 2026 - June 2026',
      type: 'On-site Internship',
      description: 'Supported software development workflows, database management, backend unit testing, and web module maintenance for government digital infrastructure.',
      icon: <Code2 className="w-5 h-5" />
    },
    {
      id: 3,
      role: 'AI & ML Intern',
      company: 'Zoom In Data',
      period: 'Jul 2025 - Oct 2025',
      type: 'Remote Internship',
      description: 'Contributed to core machine learning models, dataset preprocessing pipelines, feature engineering, and model validation frameworks.',
      icon: <Database className="w-5 h-5" />
    }
  ]
};

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentPath, setCurrentPath] = useState('home');
  const [data, setData] = useState(initialData);

  const navigate = (path) => {
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AppContext.Provider value={{ currentPath, navigate, data, setData }}>
      {children}
    </AppContext.Provider>
  );
};

const FadeIn = ({ children, delay = 0, direction = 'up', className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const directionClasses = {
    up: 'translate-y-8',
    down: '-translate-y-8',
    left: 'translate-x-8',
    right: '-translate-x-8',
    none: ''
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0 translate-x-0' : `opacity-0 ${directionClasses[direction]}`
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const SectionTitle = ({ title, subtitle }) => (
  <div className="mb-12 md:mb-16 relative">
    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-400 mb-4 tracking-wider uppercase shadow-[0_0_15px_rgba(6,182,212,0.15)]">
      <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> {subtitle || 'Overview'}
    </div>
    <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-tight">
      {title}<span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">.</span>
    </h2>
  </div>
);

const NavBar = () => {
  const { currentPath, navigate } = useContext(AppContext);
  const navLinks = ['Home', 'About', 'Projects', 'Contact'];

  return (
    <nav className="fixed bottom-6 sm:bottom-auto sm:top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] sm:w-auto max-w-[420px] sm:max-w-none">
      <div className="flex justify-center bg-[#090d16]/80 backdrop-blur-xl p-1.5 rounded-full border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.9)] transition-all duration-300">
        {navLinks.map((link) => {
          const path = link.toLowerCase();
          const isActive = currentPath === path;
          return (
            <button
              key={link}
              onClick={() => navigate(path)}
              className={`relative px-4 sm:px-6 py-2.5 rounded-full text-xs font-mono uppercase tracking-widest transition-all duration-300 ${
                isActive 
                  ? 'text-black bg-gradient-to-r from-cyan-400 to-teal-300 font-bold shadow-[0_0_20px_rgba(6,182,212,0.5)]' 
                  : 'text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {link}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

const ResumeContent = () => {
  return (
    <div className="bg-white text-zinc-900 p-6 sm:p-12 font-sans max-w-4xl mx-auto rounded-2xl shadow-2xl">
      <div className="border-b-2 border-zinc-900 pb-6 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold uppercase tracking-tight text-zinc-900">Nandan Javagal</h1>
          <p className="text-sm font-semibold text-cyan-700 tracking-wide mt-1">Junior Software Engineer | AI & ML Specialist</p>
        </div>
        <div className="flex flex-col text-xs font-medium text-zinc-700 space-y-1 text-left sm:text-right">
          <a href="mailto:nandanjavagal444@gmail.com" className="text-cyan-700 hover:underline">nandanjavagal444@gmail.com</a>
          <span>Bengaluru, India</span>
          <div className="flex gap-2 justify-start sm:justify-end">
            <a href="https://www.linkedin.com/in/nandan-javagal" target="_blank" rel="noopener noreferrer" className="text-cyan-700 hover:underline font-semibold">LinkedIn</a>
            <span>•</span>
            <a href="https://github.com/Nandan-2004" target="_blank" rel="noopener noreferrer" className="text-cyan-700 hover:underline font-semibold">GitHub</a>
          </div>
        </div>
      </div>

      {/* Technical Skills */}
      <div className="mb-6">
        <h2 className="text-xs font-heading font-bold uppercase tracking-widest mb-3 border-b border-zinc-300 pb-1 text-zinc-900 flex items-center gap-2">
          <Code2 className="w-4 h-4 text-cyan-700" /> Technical Skills
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs text-zinc-800">
          <div className="font-bold sm:col-span-1">Programming:</div>
          <div className="sm:col-span-3">Python, JavaScript, HTML, CSS</div>
          
          <div className="font-bold sm:col-span-1">AI & ML:</div>
          <div className="sm:col-span-3">Machine Learning, Deep Learning, NLP, YOLOv8, OpenCV, Scikit-Learn, Pandas, NumPy</div>
          
          <div className="font-bold sm:col-span-1">Tools & Platforms:</div>
          <div className="sm:col-span-3">React, Git, Streamlit, N8N Automation, Figma, REST APIs</div>
          
          <div className="font-bold sm:col-span-1">Systems & Hardware:</div>
          <div className="sm:col-span-3">Linux OS, Windows OS, ESP32 Microcontrollers</div>
        </div>
      </div>

      {/* Experience */}
      <div className="mb-6">
        <h2 className="text-xs font-heading font-bold uppercase tracking-widest mb-3 border-b border-zinc-300 pb-1 text-zinc-900 flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-cyan-700" /> Work Experience
        </h2>
        
        <div className="mb-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline mb-1">
            <h3 className="font-bold text-sm text-zinc-900">Junior Software Engineer</h3>
            <span className="text-xs font-bold text-cyan-700">July 1st 2026 - Present</span>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline mb-1.5">
            <span className="italic text-xs font-semibold text-zinc-700">Centre for Smart Governance, Bengaluru</span>
            <span className="text-xs text-zinc-500">Full-Time</span>
          </div>
          <ul className="list-disc list-inside text-xs text-zinc-700 space-y-1">
            <li>Engineers state-level smart governance platforms and core digital infrastructure applications.</li>
            <li>Focuses on backend module stability, database design, and high-performance software architecture.</li>
          </ul>
        </div>

        <div className="mb-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline mb-1">
            <h3 className="font-bold text-sm text-zinc-900">Software Engineer Trainee</h3>
            <span className="text-xs font-bold text-zinc-600">Jan 2026 - June 2026</span>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline mb-1.5">
            <span className="italic text-xs font-semibold text-zinc-700">Centre for Smart Governance, Bengaluru</span>
            <span className="text-xs text-zinc-500">On-site Internship</span>
          </div>
          <ul className="list-disc list-inside text-xs text-zinc-700 space-y-1">
            <li>Supported software development workflows and assisted in building end products for government infrastructure.</li>
            <li>Engaged in code reviews, bug fixes, and testing of web modules.</li>
          </ul>
        </div>

        <div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline mb-1">
            <h3 className="font-bold text-sm text-zinc-900">AI & ML Intern</h3>
            <span className="text-xs font-bold text-zinc-600">Jul 2025 - Oct 2025</span>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline mb-1.5">
            <span className="italic text-xs font-semibold text-zinc-700">Zoom In Data</span>
            <span className="text-xs text-zinc-500">Remote Internship</span>
          </div>
          <ul className="list-disc list-inside text-xs text-zinc-700 space-y-1">
            <li>Contributed to core machine learning models, dataset preprocessing pipelines, and model evaluation metrics.</li>
          </ul>
        </div>
      </div>

      {/* Education */}
      <div className="mb-6">
        <h2 className="text-xs font-heading font-bold uppercase tracking-widest mb-3 border-b border-zinc-300 pb-1 text-zinc-900 flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-cyan-700" /> Education
        </h2>
        
        <div className="mb-2">
          <div className="flex justify-between items-baseline">
            <h3 className="font-bold text-xs text-zinc-900">Malnad College of Engineering</h3>
            <span className="text-xs font-semibold text-zinc-600">2026</span>
          </div>
          <div className="text-xs text-zinc-600">Hassan, India</div>
          <div className="text-xs italic text-zinc-800">B.E. in Computer Science and Engineering (AI & ML), CGPA: 7.5 (till 7th Sem)</div>
        </div>
      </div>

      {/* Achievements & Certifications */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xs font-heading font-bold uppercase tracking-widest mb-2 border-b border-zinc-300 pb-1 text-zinc-900 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-cyan-700" /> Publications & Research
          </h2>
          <ul className="list-disc list-inside text-[11px] text-zinc-700 space-y-1">
            <li>Presented "VertexML: An Integrated AutoML Framework" Paper at ECMI 2026 IEEE International Conference</li>
            <li>Presented AutoML Survey paper at ETMIS 2025 International Conference</li>
            <li>Presented IoT Smart Water Monitoring research at S4SD Conference</li>
          </ul>
        </div>
        <div>
          <h2 className="text-xs font-heading font-bold uppercase tracking-widest mb-2 border-b border-zinc-300 pb-1 text-zinc-900 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-cyan-700" /> Certifications
          </h2>
          <ul className="list-disc list-inside text-[11px] text-zinc-700 space-y-1">
            <li>Fundamentals of Machine Learning and AI - AWS Training (2026)</li>
            <li>Python Certification - HackerRank (2023)</li>
            <li>Machine Learning Specialization - Great Learning (2024)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const { navigate } = useContext(AppContext);

  return (
    <div className="relative min-h-screen flex flex-col justify-center pt-24 pb-20 overflow-hidden bg-[#030712]">
      {/* Background video preserved intact as requested */}
      <video
        autoPlay loop muted playsInline
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-45 pointer-events-none grayscale-[10%]"
      />
      
      {/* Ambient Radial Mesh Layer */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/40 to-[#030712]/90 z-0 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none animate-ambient-glow" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-10 flex flex-col items-center text-center mt-6">
        
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/80 backdrop-blur-xl border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-8 animate-fade-down shadow-[0_0_25px_rgba(6,182,212,0.2)]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          Junior Software Engineer @ Centre for Smart Governance
        </div>

        {/* Main Hero Headline */}
        <h1 className="font-heading font-black text-white leading-[0.92] tracking-tight text-[clamp(3.8rem,9.5vw,9.5rem)] animate-fade-rise drop-shadow-2xl">
          Build.<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">Automate.</span><br/>
          Scale.
        </h1>
        
        <p className="text-slate-300 text-base sm:text-xl max-w-2xl mt-8 leading-relaxed font-light animate-fade-rise delay-200">
          Crafting intelligent backend systems, AI automation pipelines, and robust digital infrastructure.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 animate-fade-rise delay-300 w-full sm:w-auto">
          <button 
            onClick={() => navigate('projects')}
            className="group px-8 py-4 bg-gradient-to-r from-cyan-400 to-teal-300 text-black rounded-full text-xs font-mono tracking-widest font-bold uppercase overflow-hidden w-full sm:w-auto transition-all shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] hover:scale-105 flex items-center justify-center gap-2"
          >
            Explore Systems & Work
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={() => navigate('contact')}
            className="group px-8 py-4 bg-slate-900/80 backdrop-blur-xl border border-white/15 text-white rounded-full text-xs font-mono tracking-widest font-bold uppercase hover:bg-white/10 hover:border-cyan-400/40 transition-all w-full sm:w-auto"
          >
            Get In Touch
          </button>
        </div>

        {/* Live Metrics Showcase Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-16 sm:mt-24 w-full max-w-4xl animate-fade-rise delay-300">
          <div className="glass-card p-4 sm:p-6 rounded-2xl border border-white/10 text-center group hover:border-cyan-500/40 transition-colors">
            <p className="text-2xl sm:text-4xl font-heading font-extrabold text-cyan-400 group-hover:scale-105 transition-transform">5+</p>
            <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mt-1">Deployed Systems</p>
          </div>
          <div className="glass-card p-4 sm:p-6 rounded-2xl border border-white/10 text-center group hover:border-teal-500/40 transition-colors">
            <p className="text-2xl sm:text-4xl font-heading font-extrabold text-teal-300 group-hover:scale-105 transition-transform">3</p>
            <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mt-1">Research Papers</p>
          </div>
          <div className="glass-card p-4 sm:p-6 rounded-2xl border border-white/10 text-center group hover:border-cyan-500/40 transition-colors">
            <p className="text-2xl sm:text-4xl font-heading font-extrabold text-cyan-400 group-hover:scale-105 transition-transform">2</p>
            <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mt-1">Govt Infrastructure Roles</p>
          </div>
          <div className="glass-card p-4 sm:p-6 rounded-2xl border border-white/10 text-center group hover:border-emerald-500/40 transition-colors">
            <p className="text-2xl sm:text-4xl font-heading font-extrabold text-emerald-400 group-hover:scale-105 transition-transform">100%</p>
            <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mt-1">Automated Workflows</p>
          </div>
        </div>

      </div>
    </div>
  );
};

const About = () => {
  const { data } = useContext(AppContext);
  const [showCV, setShowCV] = useState(false);
  const [activeSkillCategory, setActiveSkillCategory] = useState('All');

  const skillsList = [
    { name: 'Python', category: 'Backend & ML', level: '95%' },
    { name: 'JavaScript / React', category: 'Frontend & UI', level: '90%' },
    { name: 'Machine Learning', category: 'AI & Data', level: '92%' },
    { name: 'YOLOv8 & OpenCV', category: 'Computer Vision', level: '88%' },
    { name: 'NLP & FLAN-T5', category: 'AI & Data', level: '85%' },
    { name: 'N8N Automation', category: 'Automation', level: '95%' },
    { name: 'Git & Linux', category: 'DevOps & Tools', level: '90%' },
    { name: 'ESP32 Microcontrollers', category: 'IoT', level: '85%' }
  ];

  const filteredSkills = activeSkillCategory === 'All' 
    ? skillsList 
    : skillsList.filter(s => s.category === activeSkillCategory);

  return (
    <div className="min-h-screen pt-28 sm:pt-36 pb-24 px-6 sm:px-10 max-w-7xl mx-auto">
      <FadeIn>
        <SectionTitle title="About & Experience" subtitle="Background & History" />
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Left Column: Bio & Skills */}
        <div className="lg:col-span-7 space-y-8">
          <FadeIn delay={100}>
            <p className="text-xl md:text-3xl font-heading font-medium leading-relaxed text-slate-100">
              I am a Junior Software Engineer specializing in scalable backend services, AI data pipelines, and machine learning models.
            </p>  
          </FadeIn>
          
          <FadeIn delay={200}>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-light">
              Currently working at the <strong className="text-white font-semibold">Centre for Smart Governance, Bengaluru</strong>, 
              I engineer state-level software platforms for government infrastructure. My engineering foundation spans B.E. in Computer Science (AI & ML) from Malnad College of Engineering, with hands-on contributions in AutoML, computer vision, and workflow automation.
            </p>
          </FadeIn>

          {/* Skill Matrix */}
          <FadeIn delay={250} className="pt-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-slate-200 text-xs font-mono font-bold tracking-widest uppercase flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" /> Technical Capabilities
              </h3>
            </div>

            {/* Skill Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {['All', 'Backend & ML', 'Frontend & UI', 'AI & Data', 'Automation', 'IoT'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveSkillCategory(cat)}
                  className={`px-3 py-1 rounded-md text-[11px] font-mono transition-all ${
                    activeSkillCategory === cat 
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' 
                      : 'bg-slate-900/60 text-slate-400 border border-white/10 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredSkills.map(skill => (
                <div key={skill.name} className="glass-card p-4 rounded-xl border border-white/10 hover:border-cyan-500/30 transition-colors">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-slate-200">{skill.name}</span>
                    <span className="text-[10px] font-mono text-cyan-400">{skill.level}</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cyan-400 to-teal-300 rounded-full" style={{ width: skill.level }} />
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={300} className="pt-4">
            <button 
              onClick={() => setShowCV(true)}
              className="group flex items-center justify-between px-6 py-4 bg-slate-900/80 border border-white/15 rounded-xl hover:bg-slate-800/80 hover:border-cyan-400/50 transition-all text-white font-mono text-xs uppercase tracking-widest w-full sm:w-auto gap-4 shadow-lg"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-cyan-400" />
                <span>View Full Curriculum Vitae</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </button>
          </FadeIn>
        </div>

        {/* Right Column: Experience Timeline */}
        <div className="lg:col-span-5 relative mt-4 lg:mt-0">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-cyan-400" />
              <h3 className="text-slate-100 font-heading text-lg font-bold">Experience Timeline</h3>
            </div>
          </div>

          <div className="relative border-l border-white/15 pl-6 space-y-8 ml-3">
            {data.experience.map((exp, index) => (
              <FadeIn key={exp.id} delay={index * 150} direction="left">
                <div className="relative group">
                  <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-cyan-400 ring-4 ring-[#030712] shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
                  <div className="glass-card p-5 rounded-xl border border-white/10 hover:border-cyan-500/40 transition-all">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-base font-heading font-bold text-white group-hover:text-cyan-300 transition-colors">{exp.role}</h4>
                      <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] font-mono">
                        {exp.type}
                      </span>
                    </div>
                    <p className="text-slate-300 text-xs font-semibold mb-2">{exp.company}</p>
                    <span className="inline-block px-2.5 py-1 rounded bg-slate-900 border border-white/10 text-[11px] font-mono text-cyan-400 mb-3">
                      {exp.period}
                    </span>
                    <p className="text-slate-400 text-xs leading-relaxed font-light">{exp.description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* Resume Modal */}
      {showCV && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6">
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={() => setShowCV(false)} />
          <div className="relative bg-[#090d16] w-full max-w-5xl max-h-[92vh] rounded-2xl border border-white/20 shadow-2xl flex flex-col animate-fade-down overflow-hidden">
            <div className="flex justify-between items-center px-6 py-4 border-b border-white/10 bg-slate-950">
              <h2 className="text-xs font-mono font-bold text-white tracking-widest uppercase flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" /> Curriculum Vitae — Nandan Javagal
              </h2>
              <button 
                onClick={() => setShowCV(false)}
                className="p-1.5 bg-white/10 hover:bg-white/20 rounded-full text-slate-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 sm:p-8 overflow-y-auto custom-scrollbar flex-1 bg-zinc-200">
               <ResumeContent />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Projects = () => {
  const { data } = useContext(AppContext);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'AI & Automation', 'NLP & Deep Learning', 'Computer Vision', 'IoT & ML'];

  const filteredProjects = data.projects.filter(project => {
    const matchesCategory = activeFilter === 'All' || project.category.toLowerCase().includes(activeFilter.toLowerCase()) || activeFilter.toLowerCase().includes(project.category.toLowerCase());
    const matchesSearch = searchQuery === '' || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-28 sm:pt-36 pb-24 px-6 sm:px-10 max-w-7xl mx-auto">
      <FadeIn>
        <SectionTitle title="Engineered Systems & Projects" subtitle="Portfolio Showcase" />
      </FadeIn>

      {/* Filter & Search Bar */}
      <FadeIn delay={100}>
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-10 border-b border-white/10 pb-6">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
                  activeFilter === cat 
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.2)]' 
                    : 'bg-slate-900/80 text-slate-400 border border-white/10 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Live Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by tech or title..."
              className="w-full bg-slate-900/90 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400/50 transition-colors"
            />
          </div>

        </div>
      </FadeIn>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredProjects.map((project, index) => (
          <FadeIn key={project.id} delay={index * 100} className="h-full">
            <div 
              onClick={() => setSelectedProject(project)}
              className="glass-card glass-card-hover rounded-2xl p-6 sm:p-7 flex flex-col justify-between h-full cursor-pointer relative overflow-hidden group shadow-xl"
            >
              <div className="absolute top-0 right-0 w-28 h-28 bg-cyan-500/5 rounded-bl-full pointer-events-none group-hover:bg-cyan-500/10 transition-colors" />

              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[11px] font-mono text-cyan-300">
                    {project.category}
                  </span>
                </div>

                <h3 className="text-xl font-heading font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors leading-snug">
                  {project.title}
                </h3>

                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6 line-clamp-3 font-light">
                  {project.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tech.map(t => (
                    <span key={t} className="px-2.5 py-1 bg-slate-950/80 border border-white/10 rounded text-[10px] font-mono text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono uppercase text-cyan-400 group-hover:text-cyan-300">
                  <span>Explore Architecture</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </FadeIn>
        ))}

        {filteredProjects.length === 0 && (
          <div className="col-span-full py-16 text-center text-slate-500 font-mono text-sm glass-card rounded-2xl border border-white/10">
            No matching projects found for "{searchQuery}".
          </div>
        )}
      </div>

      {/* Project Detail Modal (Without external redirect links) */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/85 backdrop-blur-md" 
            onClick={() => setSelectedProject(null)} 
          />
          <div className="relative bg-[#090d16] w-full max-w-3xl max-h-[90vh] rounded-2xl border border-white/20 shadow-2xl flex flex-col animate-fade-down overflow-hidden">
            
            <div className="flex justify-between items-center px-6 py-5 border-b border-white/10 bg-slate-950">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                {selectedProject.category}
              </span>
              <button 
                onClick={() => setSelectedProject(null)}
                className="p-1.5 bg-white/10 hover:bg-white/20 rounded-full text-slate-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 sm:p-10 overflow-y-auto custom-scrollbar flex-1 space-y-6">
              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white leading-tight">
                {selectedProject.title}
              </h3>
              
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">Technical Summary</h4>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                  {selectedProject.details || selectedProject.description}
                </p>
              </div>

              {selectedProject.highlights && (
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-3">System Highlights</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {selectedProject.highlights.map((h, i) => (
                      <div key={i} className="p-3 bg-cyan-950/40 border border-cyan-500/25 rounded-xl text-xs font-medium text-cyan-200 flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedProject.metrics && (
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-3">Key Metrics</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {Object.entries(selectedProject.metrics).map(([key, val]) => (
                      <div key={key} className="glass-card p-3 rounded-xl border border-white/10 text-center">
                        <p className="text-xs font-mono text-cyan-400 font-bold uppercase">{val}</p>
                        <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">{key}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-3">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map(tech => (
                    <span key={tech} className="px-3 py-1.5 bg-slate-900 border border-white/10 rounded-lg text-xs font-mono text-slate-200">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-950 border-t border-white/10 flex justify-end">
              <button 
                onClick={() => setSelectedProject(null)}
                className="px-6 py-2.5 bg-gradient-to-r from-cyan-400 to-teal-300 text-black font-mono text-xs uppercase font-bold tracking-widest rounded-xl hover:opacity-90 transition-opacity"
              >
                Close View
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

const Contact = () => {
  const [copied, setCopied] = useState(false);

  const email = "nandanjavagal444@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="min-h-screen pt-28 sm:pt-36 pb-24 px-6 sm:px-10 max-w-4xl mx-auto flex flex-col items-center">
      <FadeIn className="w-full">
        <SectionTitle title="Get In Touch" subtitle="Contact & Profiles" />
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light">
            Feel free to connect for software engineering projects, AI collaborations, or professional inquiries. Direct channels are linked below.
          </p>
        </div>

        {/* Contact Links Grid (Form completely removed as requested) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
          
          {/* Email Card */}
          <div className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col justify-between group shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-heading font-bold text-white mb-1">Email</h3>
              <p className="text-slate-400 text-xs mb-4">Direct inbox</p>
              <p className="text-xs font-mono text-slate-200 break-all bg-slate-950/80 p-2.5 rounded-lg border border-white/10 mb-6">
                {email}
              </p>
            </div>

            <div className="space-y-2">
              <a 
                href={`mailto:${email}`}
                className="w-full py-3 bg-gradient-to-r from-cyan-400 to-teal-300 text-black font-mono text-xs uppercase font-bold tracking-widest rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
              >
                Send Email <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button 
                onClick={handleCopy}
                className="w-full py-2.5 bg-slate-900 border border-white/10 text-slate-200 font-mono text-xs uppercase font-medium tracking-wider rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied Address!' : 'Copy Address'}
              </button>
            </div>
          </div>

          {/* LinkedIn Card */}
          <div className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col justify-between group shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                <Linkedin className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-heading font-bold text-white mb-1">LinkedIn</h3>
              <p className="text-slate-400 text-xs mb-4">Professional profile & network</p>
              <p className="text-xs font-mono text-slate-200 bg-slate-950/80 p-2.5 rounded-lg border border-white/10 mb-6">
                linkedin.com/in/nandan-javagal
              </p>
            </div>

            <a 
              href="https://www.linkedin.com/in/nandan-javagal" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full py-3 bg-[#0077b5] text-white font-mono text-xs uppercase font-bold tracking-widest rounded-xl hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,119,181,0.3)]"
            >
              Open LinkedIn <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* GitHub Card */}
          <div className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col justify-between group shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                <Github className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-heading font-bold text-white mb-1">GitHub</h3>
              <p className="text-slate-400 text-xs mb-4">Open-source code & repos</p>
              <p className="text-xs font-mono text-slate-200 bg-slate-950/80 p-2.5 rounded-lg border border-white/10 mb-6">
                github.com/Nandan-2004
              </p>
            </div>

            <a 
              href="https://github.com/Nandan-2004" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full py-3 bg-slate-900 border border-white/20 text-white font-mono text-xs uppercase font-bold tracking-widest rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
            >
              Open GitHub <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

        {/* Location Banner */}
        <div className="w-full glass-card border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20 text-cyan-400">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-heading font-bold text-white">Based in Bengaluru, India</h4>
              <p className="text-xs text-slate-400">Junior Software Engineer @ Centre for Smart Governance</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono rounded-full flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Available for Opportunities
          </span>
        </div>

      </FadeIn>
    </div>
  );
};

const MainLayout = () => {
  const { currentPath } = useContext(AppContext);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 relative">
      {/* Top left logo box removed as requested */}

      <NavBar />

      <main className="pb-20 sm:pb-0">
        {currentPath === 'home' && <Home />}
        {currentPath === 'about' && <About />}
        {currentPath === 'projects' && <Projects />}
        {currentPath === 'contact' && <Contact />}
      </main>

      {currentPath !== 'home' && (
        <footer className="border-t border-white/10 py-8 text-center px-6 mt-16 pb-28 sm:pb-8">
          <p className="text-slate-400 text-xs font-mono uppercase tracking-widest mb-4">
            Designed & Built by Nandan Javagal — 2026
          </p>
          <div className="flex justify-center items-center gap-6">
            <a href="https://github.com/Nandan-2004" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://www.linkedin.com/in/nandan-javagal" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="mailto:nandanjavagal444@gmail.com" className="text-slate-400 hover:text-white transition-colors">
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </footer>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
