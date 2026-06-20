import React, { useState, useEffect, useContext, createContext, useRef } from 'react';
import { 
  ArrowRight, Github, Linkedin, Mail, ExternalLink, 
  ChevronRight, Terminal, Database, Code2, 
  Layers, Lock, CheckCircle2, X, Plus, Trash2, Edit2, Mic, Play, Sparkles, User, FileText, Briefcase
} from 'lucide-react';
const initialData = {
  projects: [
    {
      id: 1,
      title: 'VertexML AutoML Platform',
      category: 'AI & Automation',
      description: 'Automated preprocessing, model selection, training, and evaluation pipeline for deployable ML models. Presented at ECMI 2026 IEEE International Conference.',
      tech: ['Python', 'Machine Learning', 'AutoML', 'Data Pipelines'],
      link: '#'
    },
    {
      id: 2,
      title: 'Automated News Video Publishing',
      category: 'AI Content Generation',
      description: 'N8N pipeline automating news fetching, AI script generation, video rendering, YouTube uploads, and Telegram notifications.',
      tech: ['N8N', 'AI Agents', 'Automation', 'API Integration'],
      link: '#'
    },
    {
      id: 3,
      title: 'Automated Legal Document Summarizer',
      category: 'NLP & Deep Learning',
      description: 'Streamlit app using FLAN-T5 for automated legal document summarization and key information extraction.',
      tech: ['Python', 'FLAN-T5', 'NLP', 'Streamlit'],
      link: '#'
    },
    {
      id: 4,
      title: 'Real-time Object Detection',
      category: 'Computer Vision',
      description: 'Python-based computer vision system for real-time object detection in video streams using YOLOv8.',
      tech: ['Python', 'YOLOv8', 'OpenCV', 'Deep Learning'],
      link: '#'
    },
    {
      id: 5,
      title: 'Smart Water Monitoring System',
      category: 'IoT + ML',
      description: 'ESP32-based IoT solution with real-time water usage tracking, automated billing, and ML-driven forecasting.',
      tech: ['ESP32', 'IoT', 'Machine Learning', 'Sensors'],
      link: '#'
    }
  ],
  blog: [
    {
      id: 1,
      title: 'VertexML: An Integrated AutoML Framework',
      date: 'March 2026',
      readTime: '12 min read',
      excerpt: 'Exploring the architecture behind our automated preprocessing and model selection pipeline presented at ECMI 2026.',
      tags: ['AutoML', 'Research', 'IEEE']
    },
    {
      id: 2,
      title: 'Automating Video Workflows with N8N',
      date: 'Jan 2026',
      readTime: '8 min read',
      excerpt: 'How to build an end-to-end pipeline fetching news, generating AI scripts, and rendering video automatically.',
      tags: ['Automation', 'N8N', 'GenAI']
    }
  ],
  experience: [
    {
      id: 1,
      role: 'Software Engineering Trainee',
      company: 'Centre for Smart Governance, Bengaluru',
      period: 'Jan 2026 - Present',
      description: 'On-site internship. Involved in supporting software development tasks and building end products for government infrastructure.',
      icon: <Terminal className="w-5 h-5" />
    },
    {
      id: 2,
      role: 'AI & ML Intern',
      company: 'Zoom In Data',
      period: 'Jul 2025 - Oct 2025',
      description: 'Remote internship. Contributed to core projects in artificial intelligence, machine learning, and data processing.',
      icon: <Database className="w-5 h-5" />
    }
  ]
};

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentPath, setCurrentPath] = useState('home');
  const [data, setData] = useState(initialData);
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = (path) => {
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AppContext.Provider value={{ currentPath, navigate, data, setData, isAdmin, setIsAdmin }}>
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
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0 translate-x-0' : `opacity-0 ${directionClasses[direction]}`
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const SectionTitle = ({ title, subtitle }) => (
  <div className="mb-16 md:mb-24 relative">
    <div className="absolute -left-4 top-0 w-1 h-full bg-white/20" />
    <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tight mb-4">
      {title}<span className="text-white/40">.</span>
    </h2>
    {subtitle && (
      <p className="text-white/50 text-sm md:text-base font-medium tracking-widest uppercase">
        {subtitle}
      </p>
    )}
  </div>
);

const NavBar = () => {
  const { currentPath, navigate } = useContext(AppContext);
  const navLinks = ['Home', 'About', 'Projects', 'Blog'];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-fade-down">
      {/* Sleek, glowing container */}
      <div className="flex bg-[#0a0a0a]/60 backdrop-blur-xl p-1.5 rounded-full border border-white/20 relative shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all duration-500">
        {navLinks.map((link) => {
          const path = link.toLowerCase();
          const isActive = currentPath === path;
          return (
            <button
              key={link}
              onClick={() => navigate(path)}
              className={`relative px-6 py-2.5 rounded-full text-xs tracking-widest font-sans font-medium uppercase transition-all duration-300 ${
                isActive ? 'text-white bg-[#333333]' : 'text-white/50 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="relative z-10">{link}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

const ResumeContent = () => {
  return (
    <div className="bg-white text-black p-8 sm:p-12 font-sans max-w-4xl mx-auto rounded-lg shadow-2xl">
      {/* Header */}
      <div className="border-b-2 border-black pb-4 mb-6 text-center sm:text-left">
        <h1 className="text-4xl font-bold uppercase tracking-tight mb-2 text-black">Nandan Javagal</h1>
        <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm font-medium text-gray-700">
          <span>+91-8277208861</span>
          <span>•</span>
          <span>nandanjavgal444@gmail.com</span>
          <span>•</span>
          <a href="#" className="text-blue-600 hover:underline">LinkedIn</a>
          <span>•</span>
          <a href="#" className="text-blue-600 hover:underline">GitHub</a>
        </div>
      </div>

      {/* Technical Skills */}
      <div className="mb-6">
        <h2 className="text-xl font-bold uppercase tracking-widest mb-3 border-b border-gray-300 pb-1 text-black">Technical Skills</h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-sm text-black">
          <div className="font-bold sm:col-span-1">Programming:</div>
          <div className="sm:col-span-3">Python, HTML, CSS</div>
          
          <div className="font-bold sm:col-span-1">AI & ML:</div>
          <div className="sm:col-span-3">Machine Learning, Deep Learning, NLP, YOLOv8, Pandas, NumPy</div>
          
          <div className="font-bold sm:col-span-1">Tools & Platforms:</div>
          <div className="sm:col-span-3">Git, Figma, N8N, Microsoft Office, Google Workspace</div>
          
          <div className="font-bold sm:col-span-1">Operating Systems:</div>
          <div className="sm:col-span-3">Windows OS, Linux OS</div>
        </div>
      </div>

      {/* Experience */}
      <div className="mb-6">
        <h2 className="text-xl font-bold uppercase tracking-widest mb-3 border-b border-gray-300 pb-1 text-black">Experience</h2>
        
        <div className="mb-4">
          <div className="flex justify-between items-baseline mb-1">
            <h3 className="font-bold text-lg text-black">Software Engineering Trainee</h3>
            <span className="text-sm font-medium">Jan 2026 - Present</span>
          </div>
          <div className="flex justify-between items-baseline mb-2">
            <span className="italic">Centre for Smart Governance, Bengaluru</span>
            <span className="text-sm">On-site Internship</span>
          </div>
          <ul className="list-disc list-inside text-sm text-black space-y-1">
            <li>Involved in supporting software development tasks and building end products</li>
          </ul>
        </div>

        <div>
          <div className="flex justify-between items-baseline mb-1">
            <h3 className="font-bold text-lg text-black">AI & ML Intern</h3>
            <span className="text-sm font-medium">Jul 2025 - Oct 2025</span>
          </div>
          <div className="flex justify-between items-baseline mb-2">
            <span className="italic">Zoom In Data</span>
            <span className="text-sm">Remote Internship</span>
          </div>
          <ul className="list-disc list-inside text-sm text-black space-y-1">
            <li>Contributed to projects in artificial intelligence and machine learning.</li>
          </ul>
        </div>
      </div>

      {/* Education */}
      <div className="mb-6">
        <h2 className="text-xl font-bold uppercase tracking-widest mb-3 border-b border-gray-300 pb-1 text-black">Education</h2>
        
        <div className="mb-3">
          <div className="flex justify-between items-baseline">
            <h3 className="font-bold text-black">Malnad College of Engineering</h3>
            <span className="text-sm font-medium">2026</span>
          </div>
          <div className="text-sm text-black">Hassan, India</div>
          <div className="text-sm italic text-black">B.E. in Computer Science and Engineering (AI & ML), CGPA: 7.5 till 7th Semester</div>
        </div>

        <div className="mb-3">
          <div className="flex justify-between items-baseline">
            <h3 className="font-bold text-black">Masters PU College</h3>
            <span className="text-sm font-medium">2022</span>
          </div>
          <div className="text-sm text-black">Hassan, India</div>
          <div className="text-sm italic text-black">Pre-University Course (PCMC), 78.56%</div>
        </div>

        <div>
          <div className="flex justify-between items-baseline">
            <h3 className="font-bold text-black">CKS English Medium High School</h3>
            <span className="text-sm font-medium">2020</span>
          </div>
          <div className="text-sm text-black">Hassan, India</div>
          <div className="text-sm italic text-black">SSLC, 71%</div>
        </div>
      </div>

      {/* Projects */}
      <div className="mb-6">
        <h2 className="text-xl font-bold uppercase tracking-widest mb-3 border-b border-gray-300 pb-1 text-black">Projects</h2>
        
        <div className="space-y-3">
          <div>
            <span className="font-bold text-black">VertexML AutoML Training Platform: </span>
            <span className="text-sm text-black">Automated preprocessing, model selection, training, and evaluation pipeline for deployable ML models.</span>
          </div>
          <div>
            <span className="font-bold text-black">Automated News Video Publishing System: </span>
            <span className="text-sm text-black">N8N pipeline automating news fetching, AI script generation, video rendering, YouTube uploads, and Telegram notifications.</span>
          </div>
          <div>
            <span className="font-bold text-black">Automated Legal Document Summarizer: </span>
            <span className="text-sm text-black">Streamlit app using FLAN-T5 for automated legal document summarization and key information extraction.</span>
          </div>
          <div>
            <span className="font-bold text-black">Object Detection using YOLOv8: </span>
            <span className="text-sm text-black">Python-based computer vision system for real-time object detection in video streams.</span>
          </div>
          <div>
            <span className="font-bold text-black">Smart Water Monitoring System (IoT+ML): </span>
            <span className="text-sm text-black">ESP32-based IoT solution with real-time water usage tracking, automated billing, and ML-driven forecasting.</span>
          </div>
        </div>
      </div>

      {/* Achievements & Certifications */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold uppercase tracking-widest mb-3 border-b border-gray-300 pb-1 text-black">Achievements</h2>
          <ul className="list-disc list-inside text-sm text-black space-y-1">
            <li>Presented "VertexML: An Integrated AutoML Framework" Paper at ECMI 2026 IEEE International Conference</li>
            <li>Presented AutoML Survey research paper at ETMIS 2025 International Conference</li>
            <li>Presented IoT-based Smart Water Monitoring research at S4SD international conference</li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-bold uppercase tracking-widest mb-3 border-b border-gray-300 pb-1 text-black">Certifications</h2>
          <ul className="list-disc list-inside text-sm text-black space-y-1">
            <li>Fundamentals of Machine Learning and AI - AWS Training & Certification (2026)</li>
            <li>Python - HackerRank (2023)</li>
            <li>Machine Learning - Great Learning (2024)</li>
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
      
      {/* Cinematic Video Background - Brightened for visibility */}
      <video
        autoPlay loop muted playsInline
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-60 pointer-events-none grayscale-[10%]"
      />
      {/* Lighter overlays to let video shine through while keeping text readable */}
      <div className="absolute inset-0 bg-[#050505]/30 z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/10 to-[#050505]/90 z-0 pointer-events-none" />

      {/* Centered Hero Content */}
      <div className="relative z-10 w-full max-w-[1000px] mx-auto px-6 sm:px-10 flex flex-col items-center text-center pb-20">
        
        <h1 className="font-serif italic text-white leading-[0.92] tracking-tight text-[clamp(4rem,10vw,10rem)] animate-fade-rise delay-100">
          Build.<br/>
          Automate.<br/>
          Scale.
        </h1>
        
        <p className="text-white/60 text-sm sm:text-base md:text-lg max-w-lg mt-8 leading-relaxed font-light animate-fade-rise delay-200">
          Building intelligent systems that transform data into real-world solutions.
        </p>

        <div className="flex flex-wrap justify-center gap-6 mt-12 animate-fade-rise delay-300">
          <button 
            onClick={() => navigate('projects')}
            className="group relative px-8 py-4 bg-white text-black rounded-full text-sm tracking-widest font-bold uppercase overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              See the work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          <button 
            onClick={() => navigate('contact')}
            className="group px-8 py-4 bg-transparent border border-white/20 text-white rounded-full text-sm tracking-widest font-bold uppercase hover:bg-white/5 transition-colors"
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
    <div className="min-h-screen pt-32 pb-20 px-6 sm:px-10 max-w-6xl mx-auto">
      <FadeIn>
        <SectionTitle title="About" subtitle="The Architecture Behind the Engineer" />
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        {/* Left Column: Bio */}
        <div className="lg:col-span-7 space-y-8">
          <FadeIn delay={100}>
            <p className="text-xl md:text-3xl font-serif leading-relaxed text-white/90">
              I am an AI & ML Engineer specializing in transforming complex data into 
              automated, deployable systems. From predictive modeling to real-time object detection.
            </p>
          </FadeIn>
          
          <FadeIn delay={200}>
            <p className="text-white/50 text-base md:text-lg leading-relaxed font-light">
              Currently pursuing a B.E. in Computer Science (AI & ML) at Malnad College of Engineering, 
              my work lives at the intersection of research and real-world application. I've engineered 
              automated pipelines like VertexML and AI-driven news systems, ensuring AI doesn't just stay in a Jupyter notebook—it scales.
            </p>
          </FadeIn>

          <FadeIn delay={300} className="pt-8 flex flex-col sm:flex-row gap-6 border-t border-white/10">
            {/* View CV Button -> Opens Local HTML Modal */}
            <button 
              onClick={() => setShowCV(true)}
              className="group flex items-center gap-3 px-6 py-4 bg-[#111] border border-white/10 rounded-xl hover:bg-white/5 hover:border-white/20 transition-all text-white font-medium"
            >
              <FileText className="w-5 h-5 text-white/60 group-hover:text-white" />
              <span>View Full Resumé</span>
              <ExternalLink className="w-4 h-4 ml-auto text-white/40 group-hover:translate-x-1 transition-all" />
            </button>
          </FadeIn>
        </div>

        {/* Right Column: Experience */}
        <div className="lg:col-span-5 relative">
          <div className="absolute left-[27px] top-4 bottom-4 w-px bg-white/10" />
          
          <div className="space-y-12">
            {data.experience.map((exp, index) => (
              <FadeIn key={exp.id} delay={index * 150} direction="left">
                <div className="relative pl-16">
                  <div className="absolute left-0 top-0 w-14 h-14 rounded-2xl bg-[#111] border border-white/10 flex items-center justify-center text-white/60 shadow-xl z-10">
                    {exp.icon || <Briefcase className="w-5 h-5" />}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
                  <p className="text-white/60 text-sm font-medium tracking-wide mb-3">{exp.company}</p>
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/40 mb-4 font-mono">
                    {exp.period}
                  </div>
                  <p className="text-white/40 text-sm leading-relaxed">{exp.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* Pure HTML CV Modal */}
      {showCV && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowCV(false)} />
          <div className="relative bg-[#050505] w-full max-w-5xl max-h-[90vh] rounded-2xl border border-white/20 shadow-2xl flex flex-col animate-fade-down overflow-hidden">
            
            <div className="flex justify-between items-center p-4 sm:p-6 border-b border-white/10 bg-[#0a0a0a]">
              <h2 className="text-lg font-bold text-white tracking-widest uppercase">Curriculum Vitae</h2>
              <button 
                onClick={() => setShowCV(false)}
                className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-white/60 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Scrollable Area for HTML Resume */}
            <div className="p-4 sm:p-8 overflow-y-auto custom-scrollbar flex-1 bg-gray-100">
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

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 sm:px-10 max-w-7xl mx-auto">
      <FadeIn>
        <SectionTitle title="Projects" subtitle="Selected Works & Systems" />
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.projects.map((project, index) => (
          <FadeIn key={project.id} delay={index * 100}>
            <div className="group h-full bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 hover:bg-[#111] transition-all duration-500 hover:-translate-y-2 relative overflow-hidden flex flex-col">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-[100px] -z-0 transition-transform group-hover:scale-110" />
              
              <div className="relative z-10 flex-1">
                <p className="text-white/40 text-xs tracking-widest font-mono uppercase mb-4">
                  {project.category}
                </p>
                <h3 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-white/90 transition-colors">
                  {project.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-8">
                  {project.description}
                </p>
              </div>

              <div className="relative z-10 mt-auto">
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.slice(0, 3).map(tech => (
                    <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/60">
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/60">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-6">
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-bold tracking-widest uppercase text-white/60 group-hover:text-white transition-colors">
                    Repo <ChevronRight className="w-4 h-4 ml-1" />
                  </a>
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-bold tracking-widest uppercase text-blue-400 hover:text-blue-300 transition-colors">
                      Live <ExternalLink className="w-4 h-4 ml-1.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
};

const Blog = () => {
  const { data } = useContext(AppContext);

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 sm:px-10 max-w-5xl mx-auto">
      <FadeIn>
        <SectionTitle title="Blog" subtitle="Research, Tutorials & Thoughts" />
      </FadeIn>

      <div className="space-y-6">
        {data.blog.map((post, index) => (
          <FadeIn key={post.id} delay={index * 100}>
            <article className="group relative block bg-transparent border-t border-white/10 py-10 hover:border-white/30 transition-colors">
              <div className="grid md:grid-cols-[1fr_3fr] gap-6 md:gap-12 items-baseline">
                
                <div className="text-white/40 text-sm font-mono tracking-wide flex md:flex-col gap-4 md:gap-2">
                  <span>{post.date}</span>
                  <span className="md:text-white/20">•</span>
                  <span>{post.readTime}</span>
                </div>

                <div>
                  <div className="flex flex-wrap gap-3 mb-4">
                    {post.tags.map(tag => (
                      <span key={tag} className="text-xs font-bold uppercase tracking-widest text-white/30 group-hover:text-white/60 transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-white/80 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-white/50 text-base leading-relaxed mb-6 max-w-2xl">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center text-sm font-bold tracking-widest uppercase text-white hover:underline decoration-white/30 underline-offset-4">
                    Read Article <ArrowRight className="w-4 h-4 ml-2 opacity-50" />
                  </span>
                </div>

              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </div>
  );
};

const Contact = () => {
  const [formState, setFormState] = useState({ name: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!formState.name || !formState.message) return;
    
    setStatus('sending');
    
    // Copy to clipboard as a fallback
    const mailText = `Hi Nandan, \n\n${formState.message}\n\nFrom,\n${formState.name}`;
    navigator.clipboard.writeText(mailText);

    // Trigger mailto client
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formState.name}`);
    const body = encodeURIComponent(mailText);
    window.location.href = `mailto:nandanjavgal444@gmail.com?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setStatus('sent');
      setFormState({ name: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-32 pb-20 px-6 sm:px-10">
      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24">
        
        <div>
          <FadeIn>
            <SectionTitle title="Initiate" subtitle="Start a conversation" />
            <p className="text-xl md:text-2xl font-serif text-white/80 leading-relaxed mb-12">
              Whether it's deploying scaleable AI pipelines, discussing research, or collaborating on a project—my inbox is open.
            </p>
            
            <div className="space-y-6">
              <a href="mailto:nandanjavgal444@gmail.com" className="flex items-center gap-6 group">
                <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white/40 text-xs font-bold tracking-widest uppercase mb-1">Email</p>
                  <p className="text-white text-lg font-medium group-hover:text-white/80 transition-colors">
                    nandanjavgal444@gmail.com
                  </p>
                </div>
              </a>
              <a href="#" className="flex items-center gap-6 group">
                <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#0077b5]/20 transition-colors">
                  <Linkedin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white/40 text-xs font-bold tracking-widest uppercase mb-1">LinkedIn</p>
                  <p className="text-white text-lg font-medium group-hover:text-white/80 transition-colors">
                    Nandan Javagal
                  </p>
                </div>
              </a>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={200} className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent rounded-3xl -z-10" />
          <form onSubmit={handleSubmit} className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 sm:p-12 space-y-8 shadow-2xl">
            
            <div className="space-y-2">
              <label className="text-white/40 text-xs font-bold tracking-widest uppercase">Your Name</label>
              <input
                type="text"
                value={formState.name}
                onChange={e => setFormState({...formState, name: e.target.value})}
                className="w-full bg-transparent border-b border-white/20 py-4 text-white text-lg focus:outline-none focus:border-white transition-colors"
                placeholder="John Doe"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-white/40 text-xs font-bold tracking-widest uppercase">Message</label>
              <textarea
                value={formState.message}
                onChange={e => setFormState({...formState, message: e.target.value})}
                className="w-full bg-transparent border-b border-white/20 py-4 text-white text-lg focus:outline-none focus:border-white transition-colors resize-none h-32"
                placeholder="Let's build something."
                required
              />
            </div>

            <button
              type="submit"
              disabled={status !== 'idle'}
              className="w-full py-5 bg-white text-black font-bold uppercase tracking-widest text-sm rounded-xl hover:bg-white/90 transition-colors disabled:opacity-50 flex justify-center items-center gap-3"
            >
              {status === 'idle' ? 'Launch Email Client' : status === 'sending' ? 'Preparing...' : 'Ready to Send!'}
              {status === 'sent' && <CheckCircle2 className="w-5 h-5 text-green-600" />}
            </button>
            <p className="text-xs text-white/30 text-center font-mono">
              (This will copy your message and open your email app)
            </p>
          </form>
        </FadeIn>

      </div>
    </div>
  );
};

const AdminLogin = ({ onLogin, onCancel }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple client-side password check
    if (password === 'admin123') {
      onLogin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6 relative">
      <button 
        onClick={onCancel}
        className="absolute top-8 left-6 sm:left-10 flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-medium"
      >
        <ArrowRight className="w-4 h-4 rotate-180" /> Return to Site
      </button>

      <div className="w-full max-w-md">
        <FadeIn>
          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            {/* Subtle glow effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-5 h-5 text-white/80" />
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight mb-2">Restricted Access</h2>
              <p className="text-sm text-white/40">Enter credentials to access the Command Center.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold tracking-widest uppercase text-white/40">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(false); }}
                  className={`w-full bg-transparent border ${error ? 'border-red-500/50 focus:border-red-500' : 'border-white/20 focus:border-white'} rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 ${error ? 'focus:ring-red-500' : 'focus:ring-white'} transition-all text-sm`}
                  placeholder="••••••••"
                  autoFocus
                />
                {error && <p className="text-xs text-red-400 mt-2 font-medium">Incorrect password. Please try again.</p>}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-lg hover:bg-white/90 transition-colors flex justify-center items-center gap-2"
              >
                Authenticate
              </button>
            </form>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

const AdminPanel = () => {
  const { data, setData, navigate, isAdmin, setIsAdmin } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('add');
  const [manageType, setManageType] = useState('projects'); 
  const [formType, setFormType] = useState('projects');
  const [editingId, setEditingId] = useState(null);
  
  const getInitialFormState = (type) => {
    if (type === 'projects') return { title: '', category: '', description: '', link: '', liveUrl: '', tech: '' };
    if (type === 'blog') return { title: '', date: '', readTime: '', excerpt: '', tags: '' };
    if (type === 'experience') return { role: '', company: '', period: '', description: '' };
    return {};
  };

  const [formData, setFormData] = useState(getInitialFormState('projects'));
  const [isGenerating, setIsGenerating] = useState(false);
  const [notification, setNotification] = useState(null);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleTypeChange = (type) => {
    setFormType(type);
    setFormData(getInitialFormState(type));
    setEditingId(null);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Process comma-separated strings into arrays for tech/tags
    const processedData = { ...formData };
    if (formType === 'projects' && typeof processedData.tech === 'string') {
      processedData.tech = processedData.tech.split(',').map(t => t.trim()).filter(t => t);
    }
    if (formType === 'blog' && typeof processedData.tags === 'string') {
      processedData.tags = processedData.tags.split(',').map(t => t.trim()).filter(t => t);
    }

    if (editingId) {
      // Update existing item
      setData(prev => ({
        ...prev,
        [formType]: prev[formType].map(item => item.id === editingId ? { ...item, ...processedData } : item)
      }));
      showNotification("Record updated successfully");
    } else {
      // Add new item
      const newItem = {
        id: Date.now(),
        ...processedData,
        ...(formType === 'blog' && !processedData.date ? { date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) } : {})
      };
      setData(prev => ({
        ...prev,
        [formType]: [newItem, ...prev[formType]]
      }));
      showNotification("New record created");
    }
    
    setFormData(getInitialFormState(formType));
    setEditingId(null);
  };

  const handleEditClick = (type, item) => {
    setFormType(type);
    setEditingId(item.id);
    
    // Prepare data for the form (convert arrays back to strings for inputs)
    const formPopulate = { ...item };
    if (type === 'projects' && Array.isArray(formPopulate.tech)) {
      formPopulate.tech = formPopulate.tech.join(', ');
    }
    if (type === 'blog' && Array.isArray(formPopulate.tags)) {
      formPopulate.tags = formPopulate.tags.join(', ');
    }
    
    setFormData(formPopulate);
    setActiveTab('add'); 
  };

  const handleDelete = (type, id) => {
    // Direct deletion without browser native confirm popup for cleaner UI
    setData(prev => ({
      ...prev,
      [type]: prev[type].filter(item => item.id !== id)
    }));
    showNotification("Record deleted permanently");
  };

  const simulateAISummary = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        excerpt: "An auto-generated executive summary extracting key metrics and architectural patterns from the provided text.",
        tags: "AI, GenAI, Pipeline",
        readTime: "5 min read"
      }));
      setIsGenerating(false);
      showNotification("Metadata auto-generated");
    }, 1500);
  };

  // If not authenticated, show login screen
  if (!isAdmin) {
    return (
      <AdminLogin 
        onLogin={() => setIsAdmin(true)} 
        onCancel={() => navigate('home')} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] relative pt-20 pb-20 px-6 sm:px-10 font-sans">
      
      {/* Absolute positioned Back Button & Logout */}
      <div className="absolute top-8 left-6 sm:left-10 right-6 sm:right-10 flex justify-between items-center z-50">
        <button 
          onClick={() => navigate('home')}
          className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-medium"
        >
          <ArrowRight className="w-4 h-4 rotate-180" /> Return to Site
        </button>
        <button 
          onClick={() => {
            setIsAdmin(false);
            navigate('home');
          }}
          className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-md transition-colors text-xs font-bold uppercase tracking-widest border border-red-500/20"
        >
          Logout
        </button>
      </div>

      {/* Top Banner Notification */}
      {notification && (
        <div className="fixed top-6 right-6 bg-[#111] border border-white/10 text-white px-6 py-4 rounded-lg shadow-xl z-50 animate-fade-down flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-green-500" />
          <span className="text-sm font-medium">{notification}</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto w-full mt-12">
        <FadeIn>
          <div className="mb-12 border-b border-white/10 pb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
              Content Management
            </h1>
            <p className="text-white/50 text-sm sm:text-base">
              Manage your portfolio projects, experience, and blog entries.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          {/* Main Tabs (Professional underline style) */}
          <div className="flex gap-8 mb-8 border-b border-white/10">
            <button 
              onClick={() => setActiveTab('add')}
              className={`pb-4 text-sm font-medium transition-all relative ${
                activeTab === 'add' ? 'text-white' : 'text-white/40 hover:text-white/80'
              }`}
            >
              {editingId ? 'Edit Record' : 'Create New'}
              {activeTab === 'add' && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white" />}
            </button>
            <button 
              onClick={() => setActiveTab('manage')}
              className={`pb-4 text-sm font-medium transition-all relative ${
                activeTab === 'manage' ? 'text-white' : 'text-white/40 hover:text-white/80'
              }`}
            >
              Manage Records
              {activeTab === 'manage' && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white" />}
            </button>
          </div>

          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl">
            
            {activeTab === 'add' && (
              <div className="grid lg:grid-cols-[200px_1fr] gap-10 lg:gap-16">
                <div>
                  <h3 className="text-white/80 text-xs font-semibold tracking-wider uppercase mb-4">
                    Content Type
                  </h3>
                  <div className="space-y-1">
                    {['projects', 'blog', 'experience'].map(type => (
                      <button
                        key={type}
                        onClick={() => handleTypeChange(type)}
                        disabled={editingId !== null} 
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all text-sm font-medium capitalize flex items-center justify-between ${
                          formType === type 
                            ? 'bg-white/10 text-white' 
                            : 'text-white/50 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed'
                        }`}
                      >
                        {type}
                        {formType === type && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </button>
                    ))}
                  </div>
                  {editingId && (
                    <button 
                      onClick={() => {
                        setEditingId(null);
                        setFormData(getInitialFormState(formType));
                      }}
                      className="mt-6 w-full px-4 py-3 border border-red-500/30 text-red-400 hover:bg-red-500/10 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2"
                    >
                      <X className="w-4 h-4" /> Cancel Edit
                    </button>
                  )}
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-6 max-w-3xl">
                  
                  {/* Dynamic Fields for PROJECTS */}
                  {formType === 'projects' && (
                    <>
                      <div className="space-y-2">
                        <label className="text-white/70 text-sm font-medium">Project Title</label>
                        <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all text-sm" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-white/70 text-sm font-medium">Category</label>
                        <input required type="text" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} placeholder="e.g. AI & Automation" className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all text-sm" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-white/70 text-sm font-medium">Description</label>
                        <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all text-sm h-32 resize-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-white/70 text-sm font-medium">Tech Stack <span className="text-white/30 text-xs font-normal">(comma separated)</span></label>
                        <input type="text" value={formData.tech} onChange={e => setFormData({...formData, tech: e.target.value})} placeholder="Python, YOLOv8, OpenCV" className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all text-sm" />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-white/70 text-sm font-medium">Repository URL <span className="text-white/30 text-xs font-normal">(Optional)</span></label>
                          <input type="text" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} placeholder="https://github.com/..." className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all text-sm" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-white/70 text-sm font-medium">Live URL <span className="text-white/30 text-xs font-normal">(Optional)</span></label>
                          <input type="text" value={formData.liveUrl || ''} onChange={e => setFormData({...formData, liveUrl: e.target.value})} placeholder="https://your-demo.com" className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all text-sm" />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Dynamic Fields for BLOG */}
                  {formType === 'blog' && (
                    <>
                      <div className="space-y-4 bg-white/5 border border-white/10 rounded-xl p-6 mb-8">
                        <div className="flex items-center gap-2 mb-1">
                          <Sparkles className="w-4 h-4 text-white/70" />
                          <h4 className="text-white font-medium text-sm">Auto-Generate Metadata</h4>
                        </div>
                        <p className="text-xs text-white/50 mb-4">Paste full article content below to automatically generate the excerpt, tags, and read time.</p>
                        <textarea className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-white/30 transition-all h-24 resize-none" placeholder="Paste article content..." />
                        <button type="button" onClick={simulateAISummary} disabled={isGenerating} className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-medium transition-all disabled:opacity-50">
                          {isGenerating ? 'Processing...' : 'Generate Metadata'}
                        </button>
                      </div>
                      <div className="space-y-2">
                        <label className="text-white/70 text-sm font-medium">Article Title</label>
                        <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all text-sm" />
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-white/70 text-sm font-medium">Date <span className="text-white/30 text-xs font-normal">(Optional)</span></label>
                          <input type="text" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} placeholder="e.g. March 2026" className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all text-sm" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-white/70 text-sm font-medium">Read Time</label>
                          <input type="text" value={formData.readTime} onChange={e => setFormData({...formData, readTime: e.target.value})} placeholder="e.g. 5 min read" className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all text-sm" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-white/70 text-sm font-medium">Excerpt</label>
                        <textarea required value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all text-sm h-24 resize-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-white/70 text-sm font-medium">Tags <span className="text-white/30 text-xs font-normal">(comma separated)</span></label>
                        <input type="text" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} placeholder="AutoML, AI, Research" className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all text-sm" />
                      </div>
                    </>
                  )}

                  {/* Dynamic Fields for EXPERIENCE */}
                  {formType === 'experience' && (
                    <>
                      <div className="space-y-2">
                        <label className="text-white/70 text-sm font-medium">Role / Job Title</label>
                        <input required type="text" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all text-sm" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-white/70 text-sm font-medium">Company / Organization</label>
                        <input required type="text" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all text-sm" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-white/70 text-sm font-medium">Period</label>
                        <input required type="text" value={formData.period} onChange={e => setFormData({...formData, period: e.target.value})} placeholder="Jan 2026 - Present" className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all text-sm" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-white/70 text-sm font-medium">Description</label>
                        <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all text-sm h-32 resize-none" />
                      </div>
                    </>
                  )}

                  <div className="pt-4 border-t border-white/10 mt-8">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-white text-black font-semibold text-sm rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                    >
                      {editingId ? 'Save Changes' : 'Publish Record'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'manage' && (
              <div className="relative z-10">
                <div className="flex gap-2 mb-6 border-b border-white/5 pb-4">
                  {['projects', 'blog', 'experience'].map(type => (
                    <button
                      key={type}
                      onClick={() => setManageType(type)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                        manageType === type ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                <div className="space-y-2">
                  {data[manageType]?.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-transparent border border-white/10 rounded-xl hover:border-white/30 transition-all group">
                      <div className="truncate pr-6">
                        <h4 className="text-white text-sm font-medium truncate flex items-center gap-3">
                          {item.title || item.role}
                          {item.liveUrl && <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-400 text-[10px] font-medium tracking-wide">Live</span>}
                        </h4>
                        <p className="text-white/40 text-xs truncate mt-1">{item.description || item.excerpt || item.company}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleEditClick(manageType, item)}
                          className="p-2 bg-white/5 hover:bg-white/20 text-white rounded-md transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(manageType, item.id)}
                          className="p-2 bg-white/5 hover:bg-red-500/20 text-red-400 rounded-md transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {data[manageType]?.length === 0 && (
                    <div className="text-center py-12 bg-transparent border border-white/10 rounded-xl border-dashed">
                      <p className="text-white/40 text-sm">No records found for {manageType}.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>
        </FadeIn>
      </div>
    </div>
  );
};

const VoiceAgent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-72 bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl animate-fade-down origin-bottom-right">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-bold tracking-widest uppercase text-white/60">Voice Assistant</span>
          </div>
          <p className="text-sm text-white/80 leading-relaxed mb-6">
            "Hi, I'm Nandan's AI agent. Ask me about his projects, tech stack, or experience."
          </p>
          <button 
            onClick={() => setIsListening(!isListening)}
            className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 transition-all ${
              isListening ? 'bg-red-500/20 text-red-500 border border-red-500/50' : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Mic className="w-4 h-4" />
            <span className="text-xs font-bold tracking-widest uppercase">
              {isListening ? 'Listening...' : 'Hold to Speak'}
            </span>
          </button>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform"
      >
        {isOpen ? <X className="w-6 h-6 text-black" /> : <Mic className="w-6 h-6 text-black" />}
      </button>
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

const MainLayout = () => {
  const { currentPath, isAdmin, navigate } = useContext(AppContext);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-white/20 font-sans">
      
      {/* Top Left Logo */}
      {currentPath !== 'admin' && (
        <div className="fixed top-6 left-6 sm:left-10 z-50">
          <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)] cursor-pointer">
            <span className="text-white font-bold tracking-widest uppercase text-sm sm:text-base drop-shadow-md">
              NJ.
            </span>
          </div>
        </div>
      )}

      {/* Main Navigation */}
      {currentPath !== 'admin' && <NavBar />}

      {/* Page Routing */}
      <main>
        {currentPath === 'home' && <Home />}
        {currentPath === 'about' && <About />}
        {currentPath === 'projects' && <Projects />}
        {currentPath === 'blog' && <Blog />}
        {currentPath === 'contact' && <Contact />}
        {currentPath === 'admin' && <AdminPanel />}
      </main>

      {/* Global AI Assistant */}
      {currentPath !== 'admin' && <VoiceAgent />}

      {/* Footer */}
      {currentPath !== 'admin' && currentPath !== 'home' && (
        <footer className="border-t border-white/10 py-8 text-center px-6 mt-20">
          <p className="text-white/30 text-xs font-bold tracking-widest uppercase mb-4">
            Architected by Nandan Javagal
          </p>
          <div className="flex justify-center items-center gap-6">
            <a href="#" className="text-white/30 hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
            <a href="#" className="text-white/30 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
            <a href="mailto:nandanjavgal444@gmail.com" className="text-white/30 hover:text-white transition-colors"><Mail className="w-5 h-5" /></a>
            <div className="w-px h-4 bg-white/10" />
            <button 
              onClick={() => navigate('admin')} 
              className="text-white/30 hover:text-white transition-colors"
              title="Command Center"
            >
              <Lock className="w-4 h-4" />
            </button>
          </div>
        </footer>
      )}
    </div>
};