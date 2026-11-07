export const skillCategories = [
  {
    id: 'programming-languages',
    title: 'Programming Languages',
    command: 'cat languages.cfg',
    description: 'Core languages for systems engineering, algorithms, and data logic',
    skills: [
      { name: 'Python', role: 'Primary Language', summary: 'FastAPI services, AI/ML pipelines, automated workflows, and data analysis' },
      { name: 'JavaScript', role: 'Full-Stack & Web', summary: 'Modern ES6+, React.js ecosystem, asynchronous API integration' },
      { name: 'SQL', role: 'Relational Queries', summary: 'Complex queries, schema definition, indexing, and stored procedures' },
      { name: 'C', role: 'Systems & Embedded', summary: 'Low-level computing, memory management, and microcontroller programming' },
      { name: 'Java', role: 'Object-Oriented', summary: 'OOP principles, robust software architectures, and design patterns' }
    ]
  },
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning',
    command: 'python -m model_inference',
    description: 'Machine learning workflows, deep learning architectures, computer vision, and NLP',
    skills: [
      { name: 'Machine Learning', role: 'Core Discipline', summary: 'Supervised and unsupervised learning, model benchmarking, and cross-validation' },
      { name: 'Deep Learning', role: 'Neural Architectures', summary: 'Multi-layer neural networks, representation learning, and evaluation' },
      { name: 'NLP', role: 'Language Processing', summary: 'Text parsing, tokenization, transformer fine-tuning, and summarization' },
      { name: 'YOLOv8 & OpenCV', role: 'Computer Vision', summary: 'Real-time multi-object detection, image preprocessing, and video frame tracking' },
      { name: 'Pandas & NumPy', role: 'Data Manipulation', summary: 'Dataframe processing, numerical computation, and automated feature engineering' },
      { name: 'Scikit-Learn', role: 'Predictive Modeling', summary: 'Model pipelines, feature scaling, classification, and regression algorithms' },
      { name: 'Hugging Face', role: 'Transformers & LLMs', summary: 'Pretrained transformer pipelines, FLAN-T5 fine-tuning, and inference' }
    ]
  },
  {
    id: 'backend-development',
    title: 'Backend Development',
    command: 'curl -X GET /api/v1/health',
    description: 'API services, database systems, and enterprise data workflows',
    skills: [
      { name: 'Python FastAPI', role: 'Backend Framework', summary: 'Asynchronous REST endpoints, Pydantic data validation, and clean service layers' },
      { name: 'REST APIs & JSON', role: 'Service Contracts', summary: 'RESTful architecture, status codes, OpenAPI/Swagger specifications, and JSON payload handling' },
      { name: 'SQL Server', role: 'Enterprise Database', summary: 'Production relational databases, table relations, constraints, and query tuning' },
      { name: 'Stored Procedures', role: 'Database Logic', summary: 'Transactional stored procedures, execution efficiency, and business rules' },
      { name: 'API Integration', role: 'System Connectivity', summary: 'Inter-departmental service integration, webhooks, and secure authentication flows' }
    ]
  },
  {
    id: 'frontend-development',
    title: 'Frontend Development',
    command: 'npm list --frontend',
    description: 'Responsive user interfaces, single-page applications, and accessible components',
    skills: [
      { name: 'React.js', role: 'UI Framework', summary: 'Component-driven SPA architectures, hooks, state handling, and modular views' },
      { name: 'HTML5', role: 'Semantic Structure', summary: 'Semantic markup, accessible web standards, and search-friendly hierarchy' },
      { name: 'CSS3', role: 'Styling & Layouts', summary: 'Responsive design, Flexbox, Grid, clean typography, and UI consistency' },
      { name: 'Tailwind CSS', role: 'Utility Framework', summary: 'Utility-first styling, design system tokens, and fluid responsive scaling' }
    ]
  },
  {
    id: 'tools-platforms',
    title: 'Tools & Platforms',
    command: 'which git figma dialog n8n',
    description: 'Low-code platforms, developer environments, workflow tools, and operating systems',
    skills: [
      { name: 'Dialog (Form.io)', role: 'Low-Code Tool', summary: 'Low-code platform built with Camunda workflow and Form.io for rapid government workflow automation' },
      { name: 'N8N Automation', role: 'Workflow Orchestration', summary: 'Node-based event orchestration, automated webhook pipelines, and data synchronization' },
      { name: 'Git & GitHub', role: 'Version Control', summary: 'Branch management, pull requests, code reviews, and repository maintenance' },
      { name: 'VS Code', role: 'Primary IDE', summary: 'Code editing, debugging, terminal integration, and developer extensions' },
      { name: 'Postman & Swagger', role: 'API Testing & Docs', summary: 'Endpoint testing, automated collections, and interactive OpenAPI documentation' },
      { name: 'Figma', role: 'UI/UX Design', summary: 'Interface wireframing, component prototyping, and user workflow design' },
      { name: 'Linux & Windows', role: 'Operating Systems', summary: 'Command-line administration, shell scripting, environment configuration, and server tooling' }
    ]
  }
];
