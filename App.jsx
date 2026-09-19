import React, { useState, useEffect, useContext, createContext, useRef } from 'react';
import { 
  ArrowRight, Github, Linkedin, Mail, 
  ChevronRight, Terminal, Database, Code2, 
  Sparkles, FileText, Briefcase, X, Check, Copy,
  Cpu, Layers, Zap, Award, GraduationCap, MapPin, ExternalLink
} from 'lucide-react';

const initialData = {
  projects: [
    {
      id: 1,
      title: 'VertexML AutoML Platform',
      category: 'AI & Automation',
      description: 'Integrated automated preprocessing, model selection, hyperparameter tuning, training, and evaluation pipeline for deployable ML models. Presented paper at ECMI 2026 IEEE International Conference.',
      details: 'VertexML automates the tedious steps of model creation including feature scaling, missing value imputation, algorithm selection (XGBoost, LightGBM, Neural Nets), and hyperparameter optimization using Bayesian methods. Provides complete evaluation metrics and exportable model artifacts.',
      tech: ['Python', 'Machine Learning', 'AutoML', 'Scikit-Learn', 'Data Pipelines'],
      highlights: ['ECMI 2026 IEEE Published', 'Bayesian Optimization', 'Automated Feature Engineering']
    },
    {
      id: 2,
      title: 'Automated News Video Publishing System',
      category: 'AI & Automation',
      description: 'N8N pipeline automating news fetching, AI script generation, video rendering, YouTube uploads, and Telegram notifications.',
      details: 'An end-to-end autonomous content creation system. It ingests RSS news feeds, feeds context to LLM agents for script drafting, triggers automated video composition via API, and automatically publishes videos to YouTube channels with instant Telegram dispatch logs.',
      tech: ['N8N', 'AI Agents', 'Automation', 'Python', 'REST APIs'],
      highlights: ['100% Automated Pipeline', 'LLM Script Synthesis', 'Multi-channel Publishing']
    },
    {
      id: 3,
      title: 'Automated Legal Document Summarizer',
      category: 'NLP & Deep Learning',
      description: 'Streamlit app using FLAN-T5 for automated legal document summarization and key information extraction.',
      details: 'Designed for legal professionals to quickly parse lengthy contracts, court rulings, and agreements. Utilizes a fine-tuned FLAN-T5 model to extract key clauses, obligations, dates, and risk factors with concise bullet summaries.',
      tech: ['Python', 'FLAN-T5', 'Hugging Face', 'NLP', 'Streamlit'],
      highlights: ['FLAN-T5 Fine-tuned', 'Legal Risk Factor Extraction', 'Interactive Web UI']
    },
    {
      id: 4,
      title: 'Real-time Object Detection System',
      category: 'Computer Vision',
      description: 'Python-based computer vision system for real-time object detection and tracking in video streams using YOLOv8.',
      details: 'Real-time detection pipeline capable of processing high-FPS video streams with bounding box annotation, object count metrics, and edge-device hardware acceleration using PyTorch and OpenCV.',
      tech: ['Python', 'YOLOv8', 'OpenCV', 'PyTorch', 'Computer Vision'],
      highlights: ['High FPS Processing', 'Custom Trained YOLOv8', 'Edge Compatible']
    },
    {
      id: 5,
      title: 'Smart Water Monitoring System',
      category: 'IoT & ML',
      description: 'ESP32-based IoT solution with real-time water usage tracking, automated billing, and ML-driven forecasting.',
      details: 'Hardware-software hybrid system utilizing ESP32 microcontroller sensors for flow metering. Telemetry data is sent to a cloud dashboard for real-time consumption analytics, anomaly/leak detection, and predictive consumption forecasting.',
      tech: ['ESP32', 'IoT', 'Machine Learning', 'C++', 'Python'],
      highlights: ['Presented at S4SD Conference', 'Real-time Sensor Telemetry', 'ML Leak Forecasting']
    }
  ],
  experience: [
    {
      id: 1,
      role: 'Junior Software Engineer',
      company: 'Centre for Smart Governance, Bengaluru',
      period: 'July 1st 2026 - Present',
      description: 'Engineers state-level smart governance platforms and core digital infrastructure applications, enhancing software reliability, API design, and system scalability.',
      icon: <Terminal className="w-5 h-5" />
    },
    {
      id: 2,
      role: 'Software Engineer Trainee',
      company: 'Centre for Smart Governance, Bengaluru',
      period: 'Jan 2026 - June 2026',
      description: 'On-site internship. Supported full-stack software development tasks, database management, and module testing for government infrastructure solutions.',
      icon: <Code2 className="w-5 h-5" />
    },
    {
      id: 3,
      role: 'AI & ML Intern',
      company: 'Zoom In Data',
      period: 'Jul 2025 - Oct 2025',
      description: 'Remote internship. Contributed to core projects in artificial intelligence, machine learning data pre-processing, and model evaluation pipelines.',
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
    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-cyan-400 mb-4 tracking-wider uppercase">
      <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> {subtitle || 'Section'}
    </div>
    <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white tracking-tight">
      {title}<span className="text-cyan-400">.</span>
    </h2>
  </div>
);

const NavBar = () => {
  const { currentPath, navigate } = useContext(AppContext);
  const navLinks = ['Home', 'About', 'Projects', 'Contact'];

  return (
    <nav className="fixed bottom-6 sm:bottom-auto sm:top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] sm:w-auto max-w-[440px] sm:max-w-none">
      <div className="flex justify-center bg-[#09090b]/80 backdrop-blur-xl p-1.5 rounded-full border border-white/15 shadow-[0_0_30px_rgba(0,0,0,0.8)] transition-all duration-300">
        {navLinks.map((link) => {
          const path = link.toLowerCase();
          const isActive = currentPath === path;
          return (
            <button
              key={link}
              onClick={() => navigate(path)}
              className={`relative px-4 sm:px-6 py-2.5 rounded-full text-xs font-mono uppercase tracking-widest transition-all duration-300 ${
                isActive 
                  ? 'text-black bg-white font-bold shadow-[0_0_15px_rgba(255,255,255,0.4)]' 
                  : 'text-white/60 hover:text-white hover:bg-white/10'
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
    <div className="bg-white text-zinc-900 p-6 sm:p-12 font-sans max-w-4xl mx-auto rounded-xl shadow-2xl">
      <div className="border-b-2 border-zinc-900 pb-6 mb-6 text-center sm:text-left flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-zinc-900">Nandan Javagal</h1>
          <p className="text-sm font-semibold text-blue-700 tracking-wide mt-1">Junior Software Engineer | AI & ML Specialist</p>
        </div>
        <div className="flex flex-col text-xs font-medium text-zinc-700 space-y-1 text-center sm:text-right">
          <a href="mailto:nandanjavagal444@gmail.com" className="text-blue-600 hover:underline">nandanjavagal444@gmail.com</a>
          <span>Bengaluru, India</span>
          <div className="flex gap-2 justify-center sm:justify-end">
            <a href="https://www.linkedin.com/in/nandan-javagal" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">LinkedIn</a>
            <span>•</span>
            <a href="https://github.com/Nandan-2004" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">GitHub</a>
          </div>
        </div>
      </div>

      {/* Technical Skills */}
      <div className="mb-6">
        <h2 className="text-base font-bold uppercase tracking-widest mb-3 border-b border-zinc-300 pb-1 text-zinc-900 flex items-center gap-2">
          <Code2 className="w-4 h-4 text-blue-600" /> Technical Skills
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs text-zinc-800">
          <div className="font-bold sm:col-span-1">Programming:</div>
          <div className="sm:col-span-3">Python, JavaScript, HTML, CSS</div>
          
          <div className="font-bold sm:col-span-1">AI & ML:</div>
          <div className="sm:col-span-3">Machine Learning, Deep Learning, NLP, YOLOv8, OpenCV, Scikit-Learn, Pandas, NumPy</div>
          
          <div className="font-bold sm:col-span-1">Tools & Frameworks:</div>
          <div className="sm:col-span-3">React, Git, Streamlit, N8N Automation, Figma, REST APIs</div>
          
          <div className="font-bold sm:col-span-1">Systems & IoT:</div>
          <div className="sm:col-span-3">Linux OS, Windows OS, ESP32 Microcontrollers</div>
        </div>
      </div>

      {/* Experience */}
      <div className="mb-6">
        <h2 className="text-base font-bold uppercase tracking-widest mb-3 border-b border-zinc-300 pb-1 text-zinc-900 flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-blue-600" /> Work Experience
        </h2>
        
        <div className="mb-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline mb-1">
            <h3 className="font-bold text-sm text-zinc-900">Junior Software Engineer</h3>
            <span className="text-xs font-bold text-blue-700">July 1st 2026 - Present</span>
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
        <h2 className="text-base font-bold uppercase tracking-widest mb-3 border-b border-zinc-300 pb-1 text-zinc-900 flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-blue-600" /> Education
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
          <h2 className="text-xs font-bold uppercase tracking-widest mb-2 border-b border-zinc-300 pb-1 text-zinc-900 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-blue-600" /> Publications & Achievements
          </h2>
          <ul className="list-disc list-inside text-[11px] text-zinc-700 space-y-1">
            <li>Presented "VertexML: An Integrated AutoML Framework" Paper at ECMI 2026 IEEE International Conference</li>
            <li>Presented AutoML Survey paper at ETMIS 2025 International Conference</li>
            <li>Presented IoT Smart Water Monitoring research at S4SD Conference</li>
          </ul>
        </div>
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest mb-2 border-b border-zinc-300 pb-1 text-zinc-900 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-blue-600" /> Certifications
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
    <div className="relative min-h-screen flex flex-col justify-center pt-20 overflow-hidden bg-[#050505]">
      {/* Intact background video as requested */}
      <video
        autoPlay loop muted playsInline
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-50 pointer-events-none grayscale-[15%]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/30 to-[#050505]/90 z-0 pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-10 flex flex-col items-center text-center pb-20 mt-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono text-white/90 mb-8 animate-fade-down shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Junior Software Engineer @ Centre for Smart Governance
        </div>

        <h1 className="font-serif italic text-white leading-[0.95] tracking-tight text-[clamp(3.5rem,9vw,9.5rem)] animate-fade-rise drop-shadow-2xl">
          Build.<br/>
          Automate.<br/>
          Scale.
        </h1>
        
        <p className="text-white/80 text-base sm:text-xl max-w-2xl mt-8 leading-relaxed font-light animate-fade-rise delay-200">
          Crafting intelligent backend systems, AI automation pipelines, and scalable software solutions.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 animate-fade-rise delay-300 w-full sm:w-auto">
          <button 
            onClick={() => navigate('projects')}
            className="group px-8 py-4 bg-white text-black rounded-full text-xs font-mono tracking-widest font-bold uppercase overflow-hidden w-full sm:w-auto hover:bg-zinc-200 transition-all shadow-[0_0_25px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2"
          >
            Explore Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={() => navigate('contact')}
            className="group px-8 py-4 bg-black/60 backdrop-blur-md border border-white/20 text-white rounded-full text-xs font-mono tracking-widest font-bold uppercase hover:bg-white/10 transition-all w-full sm:w-auto"
          >
            Contact Me
          </button>
        </div>
      </div>
    </div>
  );
};

const About = () => {
  const { data } = useContext(AppContext);
  const [showCV, setShowCV] = useState(false);

  return (
    <div className="min-h-screen pt-28 sm:pt-36 pb-24 px-6 sm:px-10 max-w-7xl mx-auto">
      <FadeIn>
        <SectionTitle title="About & Experience" subtitle="Background & Work History" />
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-7 space-y-8">
          <FadeIn delay={100}>
            <p className="text-xl md:text-3xl font-serif leading-relaxed text-white/95">
              I am a Junior Software Engineer & AI Specialist dedicated to building 
              high-performance software systems and automated data workflows.
            </p>  
          </FadeIn>
          
          <FadeIn delay={200}>
            <p className="text-white/60 text-sm sm:text-base leading-relaxed font-light">
              Currently working at the <strong className="text-white font-semibold">Centre for Smart Governance</strong>, 
              I engineer robust software solutions for state government infrastructure. With a background in Computer Science (AI & ML) from Malnad College of Engineering, my expertise spans backend development, machine learning automation, and computer vision.
            </p>
          </FadeIn>

          <FadeIn delay={250} className="pt-4">
            <h3 className="text-white/90 text-xs font-mono font-bold tracking-widest uppercase mb-6 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" /> Core Skill Matrix
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-[#0e0e11] border border-white/10 p-5 rounded-xl">
                <h4 className="text-cyan-400 text-xs font-mono uppercase tracking-wider mb-3">Software & Engineering</h4>
                <div className="flex flex-wrap gap-2">
                  {['Python', 'JavaScript', 'React', 'HTML/CSS', 'Git', 'REST APIs', 'Linux'].map(skill => (
                    <span key={skill} className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-white/80">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-[#0e0e11] border border-white/10 p-5 rounded-xl">
                <h4 className="text-cyan-400 text-xs font-mono uppercase tracking-wider mb-3">AI & Data Science</h4>
                <div className="flex flex-wrap gap-2">
                  {['Machine Learning', 'Deep Learning', 'NLP', 'YOLOv8', 'OpenCV', 'AutoML', 'N8N'].map(skill => (
                    <span key={skill} className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-white/80">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={300} className="pt-6">
            <button 
              onClick={() => setShowCV(true)}
              className="group flex items-center justify-between px-6 py-4 bg-white/5 border border-white/15 rounded-xl hover:bg-white/10 hover:border-white/30 transition-all text-white font-mono text-xs uppercase tracking-widest w-full sm:w-auto gap-4"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-cyan-400" />
                <span>View Complete Resume / CV</span>
              </div>
              <ChevronRight className="w-4 h-4 text-white/50 group-hover:translate-x-1 transition-transform" />
            </button>
          </FadeIn>
        </div>

        <div className="lg:col-span-5 relative mt-4 lg:mt-0">
          <div className="mb-6 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-cyan-400" />
            <h3 className="text-white font-mono text-sm uppercase tracking-wider">Experience Timeline</h3>
          </div>

          <div className="relative border-l border-white/15 pl-6 space-y-8 ml-3">
            {data.experience.map((exp, index) => (
              <FadeIn key={exp.id} delay={index * 150} direction="left">
                <div className="relative group">
                  <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-cyan-400 ring-4 ring-[#050505]" />
                  <div className="bg-[#0c0c0e] border border-white/10 rounded-xl p-5 hover:border-cyan-500/40 transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">{exp.role}</h4>
                    </div>
                    <p className="text-white/70 text-xs font-semibold mb-2">{exp.company}</p>
                    <span className="inline-block px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[11px] font-mono text-cyan-400 mb-3">
                      {exp.period}
                    </span>
                    <p className="text-white/50 text-xs leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {showCV && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6">
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={() => setShowCV(false)} />
          <div className="relative bg-[#09090b] w-full max-w-5xl max-h-[92vh] rounded-2xl border border-white/20 shadow-2xl flex flex-col animate-fade-down overflow-hidden">
            <div className="flex justify-between items-center px-6 py-4 border-b border-white/10 bg-[#0f0f12]">
              <h2 className="text-xs font-mono font-bold text-white tracking-widest uppercase flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" /> Curriculum Vitae — Nandan Javagal
              </h2>
              <button 
                onClick={() => setShowCV(false)}
                className="p-1.5 bg-white/10 hover:bg-white/20 rounded-full text-white/70 hover:text-white transition-colors"
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

  const categories = ['All', 'AI & Automation', 'NLP & Deep Learning', 'Computer Vision', 'IoT & ML'];

  const filteredProjects = activeFilter === 'All' 
    ? data.projects 
    : data.projects.filter(p => p.category.toLowerCase().includes(activeFilter.toLowerCase()) || activeFilter.toLowerCase().includes(p.category.toLowerCase()));

  return (
    <div className="min-h-screen pt-28 sm:pt-36 pb-24 px-6 sm:px-10 max-w-7xl mx-auto">
      <FadeIn>
        <SectionTitle title="Engineered Systems & Projects" subtitle="Portfolio Showcase" />
      </FadeIn>

      {/* Filter Tabs */}
      <FadeIn delay={100}>
        <div className="flex flex-wrap gap-2 mb-10 border-b border-white/10 pb-6">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
                activeFilter === cat 
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.15)]' 
                  : 'bg-[#0c0c0e] text-white/50 border border-white/10 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </FadeIn>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredProjects.map((project, index) => (
          <FadeIn key={project.id} delay={index * 100} className="h-full">
            <div 
              onClick={() => setSelectedProject(project)}
              className="group h-full bg-[#0d0d10] border border-white/10 rounded-2xl p-6 sm:p-7 hover:border-cyan-500/50 hover:bg-[#121216] transition-all duration-300 flex flex-col justify-between cursor-pointer relative overflow-hidden shadow-xl"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-bl-full pointer-events-none group-hover:bg-cyan-500/10 transition-colors" />

              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[11px] font-mono text-cyan-400">
                    {project.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors leading-snug">
                  {project.title}
                </h3>

                <p className="text-white/60 text-xs sm:text-sm leading-relaxed mb-6 line-clamp-3 font-light">
                  {project.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tech.map(t => (
                    <span key={t} className="px-2.5 py-1 bg-black/40 border border-white/10 rounded text-[10px] font-mono text-white/70">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono uppercase text-cyan-400 group-hover:text-cyan-300">
                  <span>View Details</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Project Detail Modal (without external redirect links as requested) */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/85 backdrop-blur-md" 
            onClick={() => setSelectedProject(null)} 
          />
          <div className="relative bg-[#0a0a0d] w-full max-w-3xl max-h-[90vh] rounded-2xl border border-white/20 shadow-2xl flex flex-col animate-fade-down overflow-hidden">
            
            <div className="flex justify-between items-center px-6 py-5 border-b border-white/10 bg-[#0e0e12]">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                {selectedProject.category}
              </span>
              <button 
                onClick={() => setSelectedProject(null)}
                className="p-1.5 bg-white/10 hover:bg-white/20 rounded-full text-white/70 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 sm:p-10 overflow-y-auto custom-scrollbar flex-1 space-y-6">
              <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                {selectedProject.title}
              </h3>
              
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-white/50 mb-2">Overview</h4>
                <p className="text-white/80 text-sm sm:text-base leading-relaxed font-light">
                  {selectedProject.details || selectedProject.description}
                </p>
              </div>

              {selectedProject.highlights && (
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-3">Key Highlights</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {selectedProject.highlights.map((h, i) => (
                      <div key={i} className="p-3 bg-cyan-950/30 border border-cyan-500/20 rounded-lg text-xs font-medium text-cyan-200 flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-white/50 mb-3">Technologies & Tools</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map(tech => (
                    <span key={tech} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-mono text-white/80">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#0e0e12] border-t border-white/10 flex justify-end">
              <button 
                onClick={() => setSelectedProject(null)}
                className="px-6 py-2.5 bg-white text-black font-mono text-xs uppercase font-bold tracking-widest rounded-lg hover:bg-zinc-200 transition-colors"
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
          <p className="text-white/70 text-base sm:text-lg leading-relaxed font-light">
            Feel free to connect for software engineering, AI collaborations, or general inquiries. Direct channels are linked below.
          </p>
        </div>

        {/* Contact Links Grid (Form completely removed as requested) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
          {/* Email Card */}
          <div className="bg-[#0e0e12] border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-cyan-500/40 transition-all group shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Email</h3>
              <p className="text-white/50 text-xs mb-4">Direct email inbox</p>
              <p className="text-xs font-mono text-white/90 break-all bg-black/40 p-2.5 rounded border border-white/10 mb-6">
                {email}
              </p>
            </div>

            <div className="space-y-2">
              <a 
                href={`mailto:${email}`}
                className="w-full py-3 bg-white text-black font-mono text-xs uppercase font-bold tracking-widest rounded-xl hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
              >
                Send Email <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button 
                onClick={handleCopy}
                className="w-full py-2.5 bg-white/5 border border-white/10 text-white/80 font-mono text-xs uppercase font-medium tracking-wider rounded-xl hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied Address!' : 'Copy Address'}
              </button>
            </div>
          </div>

          {/* LinkedIn Card */}
          <div className="bg-[#0e0e12] border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-blue-500/40 transition-all group shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6">
                <Linkedin className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">LinkedIn</h3>
              <p className="text-white/50 text-xs mb-4">Professional profile & network</p>
              <p className="text-xs font-mono text-white/90 bg-black/40 p-2.5 rounded border border-white/10 mb-6">
                linkedin.com/in/nandan-javagal
              </p>
            </div>

            <a 
              href="https://www.linkedin.com/in/nandan-javagal" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full py-3 bg-[#0077b5] text-white font-mono text-xs uppercase font-bold tracking-widest rounded-xl hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
            >
              Open LinkedIn <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* GitHub Card */}
          <div className="bg-[#0e0e12] border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-purple-500/40 transition-all group shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-6">
                <Github className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">GitHub</h3>
              <p className="text-white/50 text-xs mb-4">Open-source code & repositories</p>
              <p className="text-xs font-mono text-white/90 bg-black/40 p-2.5 rounded border border-white/10 mb-6">
                github.com/Nandan-2004
              </p>
            </div>

            <a 
              href="https://github.com/Nandan-2004" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full py-3 bg-zinc-800 border border-white/20 text-white font-mono text-xs uppercase font-bold tracking-widest rounded-xl hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2"
            >
              Open GitHub <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Location Banner */}
        <div className="w-full bg-[#0a0a0e] border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-cyan-400">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Based in Bengaluru, India</h4>
              <p className="text-xs text-white/50">Junior Software Engineer @ Centre for Smart Governance</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono rounded-full">
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
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top left logo box removed completely as requested */}

      <NavBar />

      <main className="pb-20 sm:pb-0">
        {currentPath === 'home' && <Home />}
        {currentPath === 'about' && <About />}
        {currentPath === 'projects' && <Projects />}
        {currentPath === 'contact' && <Contact />}
      </main>

      {currentPath !== 'home' && (
        <footer className="border-t border-white/10 py-8 text-center px-6 mt-16 pb-28 sm:pb-8">
          <p className="text-white/40 text-xs font-mono uppercase tracking-widest mb-4">
            Designed & Built by Nandan Javagal — 2026
          </p>
          <div className="flex justify-center items-center gap-6">
            <a href="https://github.com/Nandan-2004" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://www.linkedin.com/in/nandan-javagal" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="mailto:nandanjavagal444@gmail.com" className="text-white/40 hover:text-white transition-colors">
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
