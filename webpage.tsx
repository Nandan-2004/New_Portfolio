import React, { useState, useEffect, useContext, createContext, useRef } from 'react';
import logo from './logo.png';
import { 
  ArrowRight, Github, Linkedin, Mail, ExternalLink, 
  ChevronRight, Terminal, Database, Code2, 
  Layers, Lock, CheckCircle2, X, Plus, Trash2, Edit2, Sparkles, FileText, Briefcase,
  LayoutDashboard, FileEdit, Settings, LogOut, Search
} from 'lucide-react';

const initialData = {
  projects: [
    {
      id: 1,
      title: 'VertexML AutoML Platform',
      category: 'AI & Automation',
      description: 'Automated preprocessing, model selection, training, and evaluation pipeline for deployable ML models. Presented at ECMI 2026 IEEE International Conference.',
      tech: ['Python', 'Machine Learning', 'AutoML', 'Data Pipelines'],
      link: '#',
      liveUrl: 'https://github.com/nandan/vertexml'
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

const generateWithGemini = async (prompt, isJson = false, systemInstruction = "") => {
  const apiKey = ""; // Left empty as per Canvas runtime requirements
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

  const payload = {
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  };

  if (systemInstruction) {
    payload.systemInstruction = { parts: [{ text: systemInstruction }] };
  }

  if (isJson) {
    payload.generationConfig = {
      responseMimeType: "application/json",
      responseSchema: {
        type: "OBJECT",
        properties: {
          excerpt: { type: "STRING" },
          tags: { type: "STRING" },
          readTime: { type: "STRING" }
        }
      }
    };
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!text) {
      console.warn("API Error or Missing Key. Gemini Response:", data);
      return null; 
    }

    return isJson ? JSON.parse(text) : text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
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
  <div className="mb-12 md:mb-20 relative">
    <div className="absolute -left-4 top-0 w-1 h-full bg-white/20" />
    <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-white tracking-tight mb-4">
      {title}<span className="text-white/40">.</span>
    </h2>
    {subtitle && (
      <p className="text-white/50 text-xs md:text-sm font-medium tracking-widest uppercase">
        {subtitle}
      </p>
    )}
  </div>
);

const NavBar = () => {
  const { currentPath, navigate } = useContext(AppContext);
  const navLinks = ['Home', 'About', 'Projects', 'Blog', 'Contact'];

  return (
    <nav className="fixed bottom-6 sm:bottom-auto sm:top-6 left-1/2 -translate-x-1/2 z-50 animate-fade-down w-[calc(100%-3rem)] sm:w-auto max-w-[400px] sm:max-w-none">
      <div className="flex justify-start sm:justify-center bg-[#0a0a0a]/90 backdrop-blur-xl p-1.5 rounded-full border border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all duration-500 overflow-x-auto custom-scrollbar">
        {navLinks.map((link) => {
          const path = link.toLowerCase();
          const isActive = currentPath === path;
          return (
            <button
              key={link}
              onClick={() => navigate(path)}
              className={`relative px-4 sm:px-6 py-2.5 rounded-full text-[10px] sm:text-xs tracking-widest font-sans font-medium uppercase transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
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
    <div className="bg-white text-black p-6 sm:p-12 font-sans max-w-4xl mx-auto rounded-lg shadow-2xl">
      <div className="border-b-2 border-black pb-4 mb-6 text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight mb-2 text-black">Nandan Javagal</h1>
        <div className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-4 text-xs sm:text-sm font-medium text-gray-700">
          <a href="mailto:nandanjavagal444@gmail.com" className="text-blue-600 hover:underline">nandanjavagal444@gmail.com</a>
          <span className="hidden sm:inline">•</span>
          <a href="https://www.linkedin.com/in/nandan-javagal" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">LinkedIn</a>
          <span className="hidden sm:inline">•</span>
          <a href="https://github.com/Nandan-2004" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">GitHub</a>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg sm:text-xl font-bold uppercase tracking-widest mb-3 border-b border-gray-300 pb-1 text-black">Technical Skills</h2>
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

      <div className="mb-6">
        <h2 className="text-lg sm:text-xl font-bold uppercase tracking-widest mb-3 border-b border-gray-300 pb-1 text-black">Experience</h2>
        
        <div className="mb-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline mb-1">
            <h3 className="font-bold text-lg text-black">Software Engineering Trainee</h3>
            <span className="text-sm font-medium text-gray-600 sm:text-black mt-1 sm:mt-0">Jan 2026 - Present</span>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline mb-2">
            <span className="italic">Centre for Smart Governance, Bengaluru</span>
            <span className="text-sm text-gray-600 sm:text-black">On-site Internship</span>
          </div>
          <ul className="list-disc list-inside text-sm text-black space-y-1">
            <li>Involved in supporting software development tasks and building end products for government infrastructure.</li>
          </ul>
        </div>

        <div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline mb-1">
            <h3 className="font-bold text-lg text-black">AI & ML Intern</h3>
            <span className="text-sm font-medium text-gray-600 sm:text-black mt-1 sm:mt-0">Jul 2025 - Oct 2025</span>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline mb-2">
            <span className="italic">Zoom In Data</span>
            <span className="text-sm text-gray-600 sm:text-black">Remote Internship</span>
          </div>
          <ul className="list-disc list-inside text-sm text-black space-y-1">
            <li>Contributed to core projects in artificial intelligence, machine learning, and data processing.</li>
          </ul>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg sm:text-xl font-bold uppercase tracking-widest mb-3 border-b border-gray-300 pb-1 text-black">Education</h2>
        
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

      <div className="mb-6">
        <h2 className="text-lg sm:text-xl font-bold uppercase tracking-widest mb-3 border-b border-gray-300 pb-1 text-black">Projects</h2>
        
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <h2 className="text-lg sm:text-xl font-bold uppercase tracking-widest mb-3 border-b border-gray-300 pb-1 text-black">Achievements</h2>
          <ul className="list-disc list-inside text-sm text-black space-y-1">
            <li>Presented "VertexML: An Integrated AutoML Framework" Paper at ECMI 2026 IEEE International Conference</li>
            <li>Presented AutoML Survey research paper at ETMIS 2025 International Conference</li>
            <li>Presented IoT-based Smart Water Monitoring research at S4SD international conference</li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-bold uppercase tracking-widest mb-3 border-b border-gray-300 pb-1 text-black">Certifications</h2>
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
      <video
        autoPlay loop muted playsInline
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-60 pointer-events-none grayscale-[10%]"
      />
      <div className="absolute inset-0 bg-[#050505]/30 z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/10 to-[#050505]/90 z-0 pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-10 flex flex-col items-center text-center pb-20 mt-10">
        <h1 className="font-serif italic text-white leading-[1] sm:leading-[0.92] tracking-tight text-[clamp(3.5rem,10vw,10rem)] animate-fade-rise delay-100 drop-shadow-xl w-full break-words">
          Build.<br/>
          Automate.<br/>
          Scale.
        </h1>
        
        <p className="text-white/70 text-base sm:text-lg md:text-xl max-w-2xl mt-6 sm:mt-8 leading-relaxed font-light animate-fade-rise delay-200 px-4">
          Building intelligent systems that transform data into real-world solutions.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-10 animate-fade-rise delay-300 w-full sm:w-auto">
          <button 
            onClick={() => navigate('projects')}
            className="group relative px-6 sm:px-8 py-3.5 sm:py-4 bg-white text-black rounded-full text-xs sm:text-sm tracking-widest font-bold uppercase overflow-hidden w-full sm:w-auto hover:bg-gray-200 transition-colors"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              See the work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          <button 
            onClick={() => navigate('contact')}
            className="group px-6 sm:px-8 py-3.5 sm:py-4 bg-[#0a0a0a]/50 backdrop-blur-md border border-white/20 text-white rounded-full text-xs sm:text-sm tracking-widest font-bold uppercase hover:bg-white/10 transition-colors w-full sm:w-auto"
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
    <div className="min-h-screen pt-24 sm:pt-32 pb-20 px-6 sm:px-10 max-w-7xl mx-auto">
      <FadeIn>
        <SectionTitle title="About" subtitle="The Architecture Behind the Engineer" />
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        <div className="lg:col-span-7 space-y-8">
          <FadeIn delay={100}>
            <p className="text-xl md:text-3xl font-serif leading-relaxed text-white/90">
              I am an AI & ML Engineer specializing in transforming complex data into 
              automated, deployable systems. From predictive modeling to real-time object detection models.
            </p>  
          </FadeIn>
          
          <FadeIn delay={200}>
            <p className="text-white/50 text-sm sm:text-base md:text-lg leading-relaxed font-light">
              Currently pursuing a B.E. in Computer Science (AI & ML) at Malnad College of Engineering, 
              my work lives at the intersection of research and real-world application. I've engineered 
              automated pipelines like VertexML and AI-driven news systems, ensuring AI doesn't just stay in a notebook—it scales.
            </p>
          </FadeIn>

          <FadeIn delay={250} className="pt-8">
            <h3 className="text-white/80 text-xs font-bold tracking-widest uppercase mb-6 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-blue-400" /> Technical Arsenal
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <h4 className="text-white/40 text-[10px] uppercase tracking-widest mb-3 font-mono">AI & Machine Learning</h4>
                <div className="flex flex-wrap gap-2">
                  {['Deep Learning', 'NLP', 'Computer Vision', 'YOLOv8', 'AutoML', 'Pandas', 'NumPy'].map(skill => (
                    <span key={skill} className="px-3 py-1.5 bg-[#111] border border-white/10 rounded-lg text-xs text-white/70 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-white/40 text-[10px] uppercase tracking-widest mb-3 font-mono">Engineering & Tools</h4>
                <div className="flex flex-wrap gap-2">
                  {['Python', 'N8N Automation', 'Streamlit', 'Git', 'HTML/CSS', 'IoT (ESP32)'].map(skill => (
                    <span key={skill} className="px-3 py-1.5 bg-[#111] border border-white/10 rounded-lg text-xs text-white/70 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={300} className="pt-8 flex flex-col sm:flex-row gap-6 border-t border-white/10">
            <button 
              onClick={() => setShowCV(true)}
              className="group flex items-center gap-3 px-6 py-4 bg-[#111] border border-white/10 rounded-xl hover:bg-white/5 hover:border-white/20 transition-all text-white font-medium w-full sm:w-auto"
            >
              <FileText className="w-5 h-5 text-white/60 group-hover:text-white" />
              <span>View Full Resume</span>
              <ExternalLink className="w-4 h-4 ml-auto text-white/40 group-hover:translate-x-1 transition-all" />
            </button>
          </FadeIn>
        </div>

        <div className="lg:col-span-5 relative mt-8 lg:mt-0">
          <div className="absolute left-[27px] top-4 bottom-4 w-px bg-white/10 hidden sm:block" />
          
          <div className="space-y-12">
            {data.experience.map((exp, index) => (
              <FadeIn key={exp.id} delay={index * 150} direction="left">
                <div className="relative sm:pl-16">
                  <div className="absolute left-0 top-0 w-14 h-14 rounded-2xl bg-[#111] border border-white/10 items-center justify-center text-white/60 shadow-xl z-10 hidden sm:flex">
                    {exp.icon || <Briefcase className="w-5 h-5" />}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1">{exp.role}</h3>
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

      {showCV && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowCV(false)} />
          <div className="relative bg-[#050505] w-full max-w-5xl max-h-[95vh] rounded-2xl border border-white/20 shadow-2xl flex flex-col animate-fade-down overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-white/10 bg-[#0a0a0a]">
              <h2 className="text-sm sm:text-lg font-bold text-white tracking-widest uppercase">Curriculum Vitae</h2>
              <button 
                onClick={() => setShowCV(false)}
                className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-white/60 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
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
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="min-h-screen pt-24 sm:pt-32 pb-20 px-6 sm:px-10 max-w-7xl mx-auto">
      <FadeIn>
        <SectionTitle title="Projects" subtitle="Selected Works & Systems" />
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.projects.map((project, index) => (
          <FadeIn key={project.id} delay={index * 100} className="h-full">
            <div 
              onClick={() => setSelectedProject(project)}
              className="group h-full bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 sm:p-8 hover:bg-[#111] transition-all duration-500 hover:-translate-y-2 relative overflow-hidden flex flex-col cursor-pointer"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-[100px] -z-0 transition-transform group-hover:scale-110" />
              
              <div className="relative z-10 flex-1">
                <p className="text-white/40 text-[10px] sm:text-xs tracking-widest font-mono uppercase mb-4">
                  {project.category}
                </p>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 leading-tight group-hover:text-white/90 transition-colors">
                  {project.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-8 line-clamp-3">
                  {project.description}
                </p>
              </div>

              <div className="relative z-10 mt-auto">
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.slice(0, 3).map(tech => (
                    <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] sm:text-xs text-white/60">
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] sm:text-xs text-white/60">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-6">
                  <span className="inline-flex items-center text-xs sm:text-sm font-bold tracking-widest uppercase text-white/60 group-hover:text-white transition-colors">
                    View Details <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md" 
            onClick={() => setSelectedProject(null)} 
          />
          <div className="relative bg-[#050505] w-full max-w-3xl max-h-[90vh] rounded-2xl border border-white/20 shadow-2xl flex flex-col animate-fade-down overflow-hidden">
            
            <div className="flex justify-between items-center p-4 sm:p-6 border-b border-white/10 bg-[#0a0a0a]">
              <p className="text-white/40 text-[10px] sm:text-xs tracking-widest font-mono uppercase truncate pr-4">
                {selectedProject.category}
              </p>
              <button 
                onClick={() => setSelectedProject(null)}
                className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-white/60 hover:text-white transition-colors flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 sm:p-10 overflow-y-auto custom-scrollbar flex-1">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                {selectedProject.title}
              </h3>
              
              <div className="prose prose-invert max-w-none mb-10">
                <p className="text-white/70 text-base sm:text-lg leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              <div className="mb-10">
                <h4 className="text-white/40 text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-4">Technologies & Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map(tech => (
                    <span key={tech} className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/5 border border-white/10 rounded-full text-xs sm:text-sm text-white/80">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-8 border-t border-white/10">
                {selectedProject.link && selectedProject.link !== '#' && (
                  <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" className="px-6 py-3 sm:py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-xs sm:text-sm font-bold tracking-widest uppercase transition-all flex justify-center items-center gap-2">
                    <Github className="w-4 h-4" /> View Source
                  </a>
                )}
                {selectedProject.liveUrl && (
                  <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 sm:py-4 bg-white text-black hover:bg-gray-200 rounded-xl text-xs sm:text-sm font-bold tracking-widest uppercase transition-all flex justify-center items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </a>
                )}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

const Blog = () => {
  const { data } = useContext(AppContext);

  return (
    <div className="min-h-screen pt-24 sm:pt-32 pb-20 px-6 sm:px-10 max-w-5xl mx-auto">
      <FadeIn>
        <SectionTitle title="Blog" subtitle="Research, Tutorials & Thoughts" />
      </FadeIn>

      <div className="space-y-6">
        {data.blog.map((post, index) => (
          <FadeIn key={post.id} delay={index * 100}>
            <article className="group relative block bg-transparent border-t border-white/10 py-8 sm:py-10 hover:border-white/30 transition-colors">
              <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4 md:gap-12 items-baseline">
                
                <div className="text-white/40 text-xs sm:text-sm font-mono tracking-wide flex md:flex-col gap-4 md:gap-2">
                  <span>{post.date}</span>
                  <span className="md:text-white/20 hidden md:block">•</span>
                  <span>{post.readTime}</span>
                </div>

                <div>
                  <div className="flex flex-wrap gap-2 sm:gap-3 mb-4">
                    {post.tags.map(tag => (
                      <span key={tag} className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/30 group-hover:text-white/60 transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-white/80 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-6 max-w-2xl">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center text-xs sm:text-sm font-bold tracking-widest uppercase text-white hover:underline decoration-white/30 underline-offset-4 cursor-pointer">
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
  const { navigate } = useContext(AppContext);
  const [formState, setFormState] = useState({ name: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [aiPrompt, setAiPrompt] = useState('');
  const [isDrafting, setIsDrafting] = useState(false);
  const [showAiInput, setShowAiInput] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!formState.name || !formState.message) return;
    
    setStatus('sending');
    
    const mailText = `Hi Nandan, \n\n${formState.message}\n\nFrom,\n${formState.name}`;
    navigator.clipboard.writeText(mailText);

    const subject = encodeURIComponent(`Portfolio Inquiry from ${formState.name}`);
    const body = encodeURIComponent(mailText);
    window.location.href = `mailto:nandanjavagal444@gmail.com?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setStatus('sent');
      setFormState({ name: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    }, 1000);
  };

  const handleAIDraft = async () => {
    if (!aiPrompt) return;
    setIsDrafting(true);
    const prompt = `Draft a short, professional, and engaging inquiry email to Nandan (an AI & ML Engineer) based on these keywords: "${aiPrompt}". Keep it under 4 sentences. Do not include placeholders like [Your Name].`;
    const result = await generateWithGemini(prompt, false);
    
    if (result) {
      setFormState(prev => ({ ...prev, message: result }));
      setShowAiInput(false);
      setAiPrompt('');
    }
    setIsDrafting(false);
  };

  return (
    <div className="min-h-screen pt-24 sm:pt-32 pb-20 px-6 sm:px-10 max-w-4xl mx-auto flex flex-col items-center">
      <FadeIn className="w-full">
        <SectionTitle title="Contact" subtitle="Initiate a Conversation" />
        
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10 sm:mb-12">
          <a href="mailto:nandanjavagal444@gmail.com" className="flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-[#0a0a0a] border border-white/10 rounded-full text-white/70 hover:text-white hover:bg-white/5 hover:border-white/30 transition-all text-xs sm:text-sm font-medium tracking-wide">
            <Mail className="w-4 h-4" /> nandanjavagal444@gmail.com
          </a>
          <a href="https://www.linkedin.com/in/nandan-javagal" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-[#0a0a0a] border border-white/10 rounded-full text-white/70 hover:text-white hover:bg-white/5 hover:border-white/30 transition-all text-xs sm:text-sm font-medium tracking-wide">
            <Linkedin className="w-4 h-4" /> LinkedIn
          </a>
          <a href="https://github.com/Nandan-2004" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-[#0a0a0a] border border-white/10 rounded-full text-white/70 hover:text-white hover:bg-white/5 hover:border-white/30 transition-all text-xs sm:text-sm font-medium tracking-wide">
            <Github className="w-4 h-4" /> GitHub
          </a>
        </div>

        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 sm:p-12 shadow-2xl relative overflow-hidden w-full">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-white/40 text-[10px] sm:text-xs font-bold tracking-widest uppercase">Your Name</label>
              <input
                type="text"
                value={formState.name}
                onChange={e => setFormState({...formState, name: e.target.value})}
                className="w-full bg-transparent border-b border-white/20 py-3 sm:py-4 text-white text-base sm:text-lg focus:outline-none focus:border-white transition-colors"
                placeholder="John Doe"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 sm:gap-0">
                <label className="text-white/40 text-[10px] sm:text-xs font-bold tracking-widest uppercase">Message</label>
                <button 
                  type="button" 
                  onClick={() => setShowAiInput(!showAiInput)} 
                  className="text-xs text-[#0077b5] flex items-center gap-1 hover:text-blue-400 transition-colors"
                >
                  <Sparkles className="w-3 h-3" /> Draft with AI
                </button>
              </div>

              {showAiInput && (
                <div className="flex flex-col sm:flex-row gap-3 mb-4 animate-fade-down bg-white/5 p-3 rounded-xl border border-white/10">
                  <input 
                    type="text" 
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    placeholder="E.g. Collaborate on a computer vision project..." 
                    className="flex-1 bg-transparent border-b border-white/20 px-2 py-2 text-white text-sm focus:outline-none focus:border-[#0077b5] transition-colors"
                    onKeyDown={(e) => e.key === 'Enter' && handleAIDraft()}
                  />
                  <button 
                    type="button"
                    onClick={handleAIDraft}
                    disabled={isDrafting || !aiPrompt}
                    className="px-4 py-2 bg-[#0077b5]/20 text-[#0077b5] rounded-lg text-xs sm:text-sm font-bold uppercase tracking-widest hover:bg-[#0077b5]/30 transition-colors disabled:opacity-50 whitespace-nowrap"
                  >
                    {isDrafting ? 'Generating...' : 'Generate'}
                  </button>
                </div>
              )}

              <textarea
                value={formState.message}
                onChange={e => setFormState({...formState, message: e.target.value})}
                className="w-full bg-transparent border-b border-white/20 py-3 sm:py-4 text-white text-base sm:text-lg focus:outline-none focus:border-white transition-colors resize-none h-32"
                placeholder="Let's build something."
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 sm:py-4 bg-white text-black font-bold uppercase tracking-widest text-[10px] sm:text-xs rounded-lg hover:bg-white/90 transition-colors flex justify-center items-center gap-2"
            >
              {status === 'sending' ? 'Opening Mail Client...' : status === 'sent' ? 'Message Copied & Redirected!' : 'Send Message'}
            </button>
          </form>
        </div>
      </FadeIn>
    </div>
  );
};

const AdminLogin = ({ onLogin, onCancel }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'admin123') { 
      onLogin();
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4 sm:px-6 relative">
      <button 
        onClick={onCancel}
        className="absolute top-6 sm:top-8 left-4 sm:left-10 flex items-center gap-2 text-white/50 hover:text-white transition-colors text-xs sm:text-sm font-medium"
      >
        <ArrowRight className="w-4 h-4 rotate-180" /> Return to Site
      </button>

      <div className="w-full max-w-md">
        <FadeIn>
          <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6 sm:p-10 shadow-2xl relative">
            <div className="text-center mb-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-zinc-900 border border-neutral-800 rounded-md flex items-center justify-center mx-auto mb-4">
                <Lock className="w-5 h-5 text-white/80" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">Restricted Access</h2>
              <p className="text-xs sm:text-sm text-white/40">Enter credentials to access the Command Center.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-white/40 text-[10px] sm:text-xs font-bold tracking-widest uppercase">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-zinc-900/50 border border-neutral-800 rounded-md px-4 py-3 text-white text-sm sm:text-base focus:outline-none focus:border-neutral-500 focus:bg-zinc-900 transition-colors"
                  placeholder="••••••••"
                  required
                />
                {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-white text-black font-semibold text-sm rounded-md hover:bg-gray-200 transition-colors flex justify-center items-center gap-2"
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const getInitialFormState = (type) => {
    if (type === 'projects') return { title: '', category: '', description: '', link: '', liveUrl: '', tech: '' };
    if (type === 'blog') return { title: '', date: '', readTime: '', excerpt: '', tags: '' };
    if (type === 'experience') return { role: '', company: '', period: '', description: '' };
    return {};
  };

  const [formData, setFormData] = useState(getInitialFormState('projects'));
  const [isGenerating, setIsGenerating] = useState(false);
  const [notification, setNotification] = useState(null);
  const [rawContent, setRawContent] = useState('');

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleTypeChange = (type) => {
    setFormType(type);
    setFormData(getInitialFormState(type));
    setEditingId(null);
    setRawContent('');
    setSidebarOpen(false); // Close sidebar on mobile
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const processedData = { ...formData };
    if (formType === 'projects' && typeof processedData.tech === 'string') {
      processedData.tech = processedData.tech.split(',').map(t => t.trim()).filter(t => t);
    }
    if (formType === 'blog' && typeof processedData.tags === 'string') {
      processedData.tags = processedData.tags.split(',').map(t => t.trim()).filter(t => t);
    }

    if (editingId) {
      setData(prev => ({
        ...prev,
        [formType]: prev[formType].map(item => item.id === editingId ? { ...item, ...processedData } : item)
      }));
      showNotification("Record updated successfully");
    } else {
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
    const formPopulate = { ...item };
    if (type === 'projects' && Array.isArray(formPopulate.tech)) formPopulate.tech = formPopulate.tech.join(', ');
    if (type === 'blog' && Array.isArray(formPopulate.tags)) formPopulate.tags = formPopulate.tags.join(', ');
    setFormData(formPopulate);
    setActiveTab('add'); 
  };

  const handleDelete = (type, id) => {
    setData(prev => ({
      ...prev,
      [type]: prev[type].filter(item => item.id !== id)
    }));
    showNotification("Record deleted permanently");
  };

  const handleAIGeneration = async () => {
    if (!rawContent) {
      showNotification("Please paste some content first!");
      return;
    }
    setIsGenerating(true);
    const prompt = `Article Content:\n${rawContent}`;
    const systemPrompt = "Analyze the provided article. Return a JSON object with 'excerpt' (an engaging summary under 3 sentences), 'tags' (a single string of 3-5 comma separated tags relevant to the tech/topic), and 'readTime' (e.g. '5 min read' calculated based on word count).";
    const result = await generateWithGemini(prompt, true, systemPrompt);
    if (result) {
      setFormData(prev => ({
        ...prev,
        excerpt: result.excerpt || prev.excerpt,
        tags: result.tags || prev.tags,
        readTime: result.readTime || prev.readTime
      }));
      showNotification("Metadata generated via Gemini AI!");
    } else {
      showNotification("AI Generation failed. Please try again.");
    }
    setIsGenerating(false);
  };

  if (!isAdmin) {
    return <AdminLogin onLogin={() => setIsAdmin(true)} onCancel={() => navigate('home')} />;
  }

  return (
    <div className="flex h-screen bg-[#050505] text-zinc-300 font-sans overflow-hidden">
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/80 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar Workspace */}
      <aside className={`fixed inset-y-0 left-0 w-64 bg-[#0a0a0a] border-r border-neutral-800 flex flex-col z-50 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 sm:p-6 border-b border-neutral-800 flex justify-between items-center">
          <div>
            <h2 className="text-white font-semibold flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4" /> Command Center
            </h2>
            <p className="text-[10px] text-zinc-500 mt-1 uppercase tracking-widest">Workspace</p>
          </div>
          <button className="md:hidden text-zinc-500 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-8">
          <div>
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-3">Content Forms</h3>
            <div className="space-y-1">
              {['projects', 'blog', 'experience'].map(type => (
                <button
                  key={type}
                  onClick={() => {
                    handleTypeChange(type);
                    setActiveTab('add');
                  }}
                  disabled={editingId !== null}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium capitalize flex items-center gap-3 transition-colors ${
                    formType === type && activeTab === 'add' ? 'bg-zinc-900 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50 disabled:opacity-30'
                  }`}
                >
                  <FileEdit className="w-4 h-4" /> {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-3">Database</h3>
            <div className="space-y-1">
              {['projects', 'blog', 'experience'].map(type => (
                <button
                  key={type}
                  onClick={() => {
                    setManageType(type);
                    setActiveTab('manage');
                    setSidebarOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium capitalize flex items-center gap-3 transition-colors ${
                    manageType === type && activeTab === 'manage' ? 'bg-zinc-900 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
                  }`}
                >
                  <Database className="w-4 h-4" /> {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        
        {/* Top Navbar */}
        <header className="h-14 sm:h-16 border-b border-neutral-800 bg-[#050505]/80 backdrop-blur-md flex items-center justify-between px-4 sm:px-8 shrink-0 relative z-30">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-zinc-400 hover:text-white" onClick={() => setSidebarOpen(true)}>
              <LayoutDashboard className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center gap-2 text-sm text-zinc-400 bg-zinc-900/50 px-3 py-1.5 rounded-md border border-neutral-800 w-64">
              <Search className="w-4 h-4" /> <span className="text-xs">Search workspace...</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('home')} className="text-zinc-400 hover:text-white transition-colors text-xs sm:text-sm font-medium hidden sm:block">
              Return to Site
            </button>
            <button 
              onClick={() => { setIsAdmin(false); navigate('home'); }}
              className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-md transition-colors text-[10px] sm:text-xs font-bold uppercase tracking-widest border border-red-500/20"
            >
              <LogOut className="w-3 h-3" /> Logout
            </button>
          </div>
        </header>

        {/* Notifications */}
        {notification && (
          <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-white text-black px-4 sm:px-6 py-3 rounded-md shadow-xl z-50 animate-fade-down flex items-center gap-3 w-[90%] sm:w-auto">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
            <span className="text-xs sm:text-sm font-semibold">{notification}</span>
          </div>
        )}

        {/* Dynamic Content Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar">
          <div className="max-w-4xl mx-auto">
            
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                {activeTab === 'add' ? (editingId ? `Edit ${formType}` : `Create New ${formType}`) : `Manage ${manageType}`}
              </h1>
              <p className="text-sm text-zinc-500">
                {activeTab === 'add' ? 'Fill out the fields below to update the database.' : 'Select an item below to edit or remove it from the live site.'}
              </p>
            </div>

            {/* Content Forms (ADD/EDIT) */}
            {activeTab === 'add' && (
              <form onSubmit={handleFormSubmit} className="space-y-6 sm:space-y-8 pb-20">
                <div className="bg-[#0a0a0a] border border-neutral-800 rounded-lg p-4 sm:p-8">
                  {editingId && (
                    <div className="mb-6 flex justify-between items-center bg-blue-500/10 border border-blue-500/20 p-4 rounded-md">
                      <span className="text-sm text-blue-400 font-medium">Currently editing record ID: {editingId}</span>
                      <button type="button" onClick={() => { setEditingId(null); setFormData(getInitialFormState(formType)); }} className="text-xs text-blue-400 hover:text-white flex items-center gap-1">
                        <X className="w-3 h-3" /> Cancel
                      </button>
                    </div>
                  )}

                  {formType === 'projects' && (
                    <div className="space-y-5">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Project Title</label>
                        <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-zinc-900/50 border border-neutral-800 rounded-md px-4 py-2.5 text-white text-sm focus:outline-none focus:border-neutral-500 focus:bg-zinc-900 transition-colors" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Category</label>
                        <input required type="text" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} placeholder="e.g. AI & Automation" className="w-full bg-zinc-900/50 border border-neutral-800 rounded-md px-4 py-2.5 text-white text-sm focus:outline-none focus:border-neutral-500 focus:bg-zinc-900 transition-colors" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Description</label>
                        <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-zinc-900/50 border border-neutral-800 rounded-md px-4 py-2.5 text-white text-sm focus:outline-none focus:border-neutral-500 focus:bg-zinc-900 transition-colors h-32 resize-none" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Tech Stack <span className="text-zinc-600 font-normal normal-case tracking-normal">(comma separated)</span></label>
                        <input type="text" value={formData.tech} onChange={e => setFormData({...formData, tech: e.target.value})} placeholder="Python, YOLOv8, OpenCV" className="w-full bg-zinc-900/50 border border-neutral-800 rounded-md px-4 py-2.5 text-white text-sm focus:outline-none focus:border-neutral-500 focus:bg-zinc-900 transition-colors" />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Repository URL <span className="text-zinc-600 font-normal normal-case tracking-normal">(Optional)</span></label>
                          <input type="text" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} placeholder="https://github.com/..." className="w-full bg-zinc-900/50 border border-neutral-800 rounded-md px-4 py-2.5 text-white text-sm focus:outline-none focus:border-neutral-500 focus:bg-zinc-900 transition-colors" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Live URL <span className="text-zinc-600 font-normal normal-case tracking-normal">(Optional)</span></label>
                          <input type="text" value={formData.liveUrl || ''} onChange={e => setFormData({...formData, liveUrl: e.target.value})} placeholder="https://your-demo.com" className="w-full bg-zinc-900/50 border border-neutral-800 rounded-md px-4 py-2.5 text-white text-sm focus:outline-none focus:border-neutral-500 focus:bg-zinc-900 transition-colors" />
                        </div>
                      </div>
                    </div>
                  )}

                  {formType === 'blog' && (
                    <div className="space-y-5">
                      <div className="bg-blue-500/5 border border-blue-500/20 rounded-md p-4 sm:p-6 mb-6">
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles className="w-4 h-4 text-blue-400" />
                          <h4 className="text-blue-100 font-semibold text-sm">AI Content Analyzer</h4>
                        </div>
                        <p className="text-xs text-blue-200/50 mb-4">Paste full article below to auto-generate excerpt, tags, and read time.</p>
                        <textarea className="w-full bg-[#050505] border border-neutral-800 rounded-md px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-colors h-24 resize-none mb-3" placeholder="Paste raw article content..." value={rawContent} onChange={(e) => setRawContent(e.target.value)} />
                        <button type="button" onClick={handleAIGeneration} disabled={isGenerating || !rawContent} className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-md text-xs font-bold uppercase tracking-widest hover:bg-blue-500/30 transition-colors disabled:opacity-50">
                          {isGenerating ? 'Processing...' : 'Analyze Content'}
                        </button>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Article Title</label>
                        <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-zinc-900/50 border border-neutral-800 rounded-md px-4 py-2.5 text-white text-sm focus:outline-none focus:border-neutral-500 focus:bg-zinc-900 transition-colors" />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Date <span className="text-zinc-600 font-normal normal-case tracking-normal">(Optional)</span></label>
                          <input type="text" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} placeholder="e.g. March 2026" className="w-full bg-zinc-900/50 border border-neutral-800 rounded-md px-4 py-2.5 text-white text-sm focus:outline-none focus:border-neutral-500 focus:bg-zinc-900 transition-colors" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Read Time</label>
                          <input type="text" value={formData.readTime} onChange={e => setFormData({...formData, readTime: e.target.value})} placeholder="e.g. 5 min read" className="w-full bg-zinc-900/50 border border-neutral-800 rounded-md px-4 py-2.5 text-white text-sm focus:outline-none focus:border-neutral-500 focus:bg-zinc-900 transition-colors" />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Excerpt</label>
                        <textarea required value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} className="w-full bg-zinc-900/50 border border-neutral-800 rounded-md px-4 py-2.5 text-white text-sm focus:outline-none focus:border-neutral-500 focus:bg-zinc-900 transition-colors h-24 resize-none" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Tags <span className="text-zinc-600 font-normal normal-case tracking-normal">(comma separated)</span></label>
                        <input type="text" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} placeholder="AutoML, AI, Research" className="w-full bg-zinc-900/50 border border-neutral-800 rounded-md px-4 py-2.5 text-white text-sm focus:outline-none focus:border-neutral-500 focus:bg-zinc-900 transition-colors" />
                      </div>
                    </div>
                  )}

                  {formType === 'experience' && (
                    <div className="space-y-5">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Role / Job Title</label>
                        <input required type="text" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-zinc-900/50 border border-neutral-800 rounded-md px-4 py-2.5 text-white text-sm focus:outline-none focus:border-neutral-500 focus:bg-zinc-900 transition-colors" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Company / Organization</label>
                        <input required type="text" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full bg-zinc-900/50 border border-neutral-800 rounded-md px-4 py-2.5 text-white text-sm focus:outline-none focus:border-neutral-500 focus:bg-zinc-900 transition-colors" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Period</label>
                        <input required type="text" value={formData.period} onChange={e => setFormData({...formData, period: e.target.value})} placeholder="Jan 2026 - Present" className="w-full bg-zinc-900/50 border border-neutral-800 rounded-md px-4 py-2.5 text-white text-sm focus:outline-none focus:border-neutral-500 focus:bg-zinc-900 transition-colors" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Description</label>
                        <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-zinc-900/50 border border-neutral-800 rounded-md px-4 py-2.5 text-white text-sm focus:outline-none focus:border-neutral-500 focus:bg-zinc-900 transition-colors h-32 resize-none" />
                      </div>
                    </div>
                  )}

                  <div className="pt-6 mt-6 border-t border-neutral-800 flex justify-end">
                    <button type="submit" className="px-6 py-2.5 bg-white text-black font-semibold text-sm rounded-md hover:bg-gray-200 transition-colors w-full sm:w-auto">
                      {editingId ? 'Save Changes' : `Create ${formType}`}
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* List View (MANAGE) */}
            {activeTab === 'manage' && (
              <div className="bg-[#0a0a0a] border border-neutral-800 rounded-lg overflow-hidden w-full overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap sm:whitespace-normal">
                  <thead className="bg-zinc-900/50 border-b border-neutral-800 text-zinc-400 text-xs uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="px-4 sm:px-6 py-4 w-1/2">Title / Role</th>
                      <th className="px-4 sm:px-6 py-4 hidden sm:table-cell">Metadata</th>
                      <th className="px-4 sm:px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800 text-white">
                    {data[manageType]?.map(item => (
                      <tr key={item.id} className="hover:bg-zinc-900/30 transition-colors group">
                        <td className="px-4 sm:px-6 py-4">
                          <div className="font-medium text-white flex items-center gap-2">
                            {item.title || item.role}
                            {item.liveUrl && <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-400 text-[10px] font-mono tracking-wide">LIVE</span>}
                          </div>
                          <div className="text-zinc-500 text-xs mt-1 truncate max-w-xs sm:max-w-md">{item.description || item.excerpt || item.company}</div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 text-zinc-400 text-xs hidden sm:table-cell">
                          {manageType === 'projects' && <span className="px-2 py-1 bg-zinc-900 rounded">{item.category}</span>}
                          {manageType === 'blog' && <span>{item.date}</span>}
                          {manageType === 'experience' && <span>{item.period}</span>}
                        </td>
                        <td className="px-4 sm:px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleEditClick(manageType, item)} className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors" title="Edit">
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDelete(manageType, item.id)} className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors" title="Delete">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {data[manageType]?.length === 0 && (
                      <tr>
                        <td colSpan="3" className="px-6 py-12 text-center text-zinc-500 text-sm">
                          No records found in this workspace.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
};

const MainLayout = () => {
  const { currentPath, navigate } = useContext(AppContext);
  const [imgError, setImgError] = useState(false);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-white/20 font-sans">
      
      {currentPath !== 'admin' && (
        <div 
          onClick={() => navigate('home')}
          className="fixed top-4 sm:top-6 left-4 sm:left-10 z-50 flex items-center justify-center min-w-[50px] sm:min-w-[60px] min-h-[36px] sm:min-h-[40px] px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)] cursor-pointer hover:bg-white/20 transition-colors group"
        >
          {!imgError ? (
            <img 
              src={logo}
              alt="NJ Logo" 
              className="h-5 sm:h-6 w-auto object-contain group-hover:scale-105 transition-transform"
              onError={() => setImgError(true)}
            />
          ) : (
            <span className="text-white font-bold tracking-widest uppercase text-xs sm:text-sm drop-shadow-md group-hover:scale-105 transition-transform">
              NJ.
            </span>
          )}
        </div>
      )}

      {currentPath !== 'admin' && <NavBar />}

      <main className="pb-24 sm:pb-0">
        {currentPath === 'home' && <Home />}
        {currentPath === 'about' && <About />}
        {currentPath === 'projects' && <Projects />}
        {currentPath === 'blog' && <Blog />}
        {currentPath === 'contact' && <Contact />}
        {currentPath === 'admin' && <AdminPanel />}
      </main>

      {currentPath !== 'admin' && currentPath !== 'home' && (
        <footer className="border-t border-white/10 py-8 text-center px-6 mt-12 sm:mt-20 pb-32 sm:pb-8">
          <p className="text-white/30 text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-4">
            Architected by Nandan Javagal
          </p>
          <div className="flex justify-center items-center gap-4 sm:gap-6">
            <a href="https://github.com/Nandan-2004" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white transition-colors"><Github className="w-4 h-4 sm:w-5 sm:h-5" /></a>
            <a href="https://www.linkedin.com/in/nandan-javagal" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white transition-colors"><Linkedin className="w-4 h-4 sm:w-5 sm:h-5" /></a>
            <a href="mailto:nandanjavagal444@gmail.com" className="text-white/30 hover:text-white transition-colors"><Mail className="w-4 h-4 sm:w-5 sm:h-5" /></a>
            <div className="w-px h-4 bg-white/10" />
            <button 
              onClick={() => navigate('admin')} 
              className="text-white/30 hover:text-white transition-colors"
              title="Command Center"
            >
              <Lock className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
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