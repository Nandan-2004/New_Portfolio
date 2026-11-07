export const projectsData = [
  // --- OFFICE / GOVERNMENT PROJECTS (Centre for Smart Governance) ---
  {
    id: 'migwdd-management',
    slug: 'migwdd-management',
    title: 'MIGWDD – Management Information System',
    projectType: 'office',
    organization: 'Centre for Smart Governance',
    category: 'Government & Enterprise Systems',
    tagline: 'State Department Management System Built with React.js & Python FastAPI',
    description: 'Government management information system for departmental administration, independently engineered with a React.js frontend, Python FastAPI backend services, SQL Server stored procedures, and role-based access controls.',
    overview: 'Developed for the Government of Karnataka to manage departmental administration. Built independently end-to-end spanning frontend user interfaces, backend REST APIs, relational database schemas, and reporting modules.',
    features: [
      'Independently developed the React.js frontend interface with modular UI components',
      'Engineered Python FastAPI backend APIs handling application business logic and integrations',
      'Authored and managed SQL Server operations, relational schemas, and stored procedures',
      'Implemented secure authentication, role-based access control (RBAC), and administrative reporting'
    ],
    tech: ['React.js', 'Python FastAPI', 'SQL Server', 'Stored Procedures', 'REST APIs', 'JSON'],
    architecture: 'Two-tier enterprise architecture consisting of a component-driven React.js single-page application communicating over authenticated REST API endpoints to a Python FastAPI backend service with transactional SQL Server stored procedures.',
    verified: true
  },
  {
    id: 'kfd-management',
    slug: 'kfd-management',
    title: 'Karnataka Forest Department (KFD) Platform',
    projectType: 'office',
    organization: 'Centre for Smart Governance',
    category: 'Government & Enterprise Systems',
    tagline: 'Checkpost & Manpower Management on Dialog (Form.io & Camunda Workflow)',
    description: 'State-level digital governance platform for the Karnataka Forest Department built on Dialog, an in-house low-code platform tool powered by Form.io and Camunda workflow engines.',
    overview: 'Automates checkpost operations, staff deployments, and incident tracking for forest administration across Karnataka. Built using Dialog, a low-code platform powered by Form.io form builders and Camunda workflow automation.',
    features: [
      'Built modules on Dialog (Form.io) for staff onboarding, attendance, deployment, and checkpost management',
      'Engineered team formation, staff assignment, and multi-tier role-based approval workflows on Camunda',
      'Implemented vehicle tracking through checkposts, inspection logs, and handling of offences and seized goods',
      'Improved operational analytics, tabular reports, and master-data integrations across departmental registries'
    ],
    tech: ['Dialog Low-Code Platform', 'Form.io', 'Camunda Workflow', 'JavaScript', 'JSON', 'REST APIs'],
    architecture: 'Workflow-driven enterprise architecture utilizing the Dialog low-code engine with Camunda BPMN state machines, dynamic Form.io JSON schema renderers, and REST service connectors.',
    verified: true
  },
  {
    id: 'dialog-systems',
    slug: 'dialog-systems',
    title: 'Hostel & Child Labour Monitoring Systems',
    projectType: 'office',
    organization: 'Centre for Smart Governance',
    category: 'Government & Enterprise Systems',
    tagline: 'Dynamic Form Automation & Workflow Digitization on Dialog (Form.io)',
    description: 'Digital governance platforms built on Dialog (Form.io) automating state hostel operations and child labour field monitoring workflows.',
    overview: 'Engineered dynamic Form.io forms, conditional field visibility rules, data validation scripts, and business-rule automations to digitize state welfare workflows.',
    features: [
      'Built dynamic Form.io forms for hostel workflows with field validations, conditional logic, and dynamic dropdowns',
      'Configured submission handling, status transitions, and data integrity fixes to improve user accuracy',
      'Developed child labour field monitoring forms with validation rules and business-rule automations',
      'Resolved functional issues and ensured master data consistency across departmental submissions'
    ],
    tech: ['Dialog Platform', 'Form.io', 'JavaScript', 'JSON', 'REST APIs'],
    architecture: 'Form.io schema-based UI rendering engine integrated with Dialog business-rule processors and relational backend databases.',
    verified: true
  },

  // --- PERSONAL & RESEARCH PROJECTS ---
  {
    id: 'vertexml',
    slug: 'vertexml',
    title: 'VertexML – AutoML Training Platform',
    projectType: 'personal',
    category: 'AI/ML',
    tagline: 'Automated ML Preprocessing, Model Selection & Evaluation Pipeline',
    description: 'Automated machine learning training platform integrating automated data preprocessing, model selection, hyperparameter tuning, and model evaluation for deployable ML models. Research paper presented at ECMI 2026 IEEE International Conference.',
    overview: 'End-to-end Python AutoML platform that simplifies machine learning development by automating tabular data cleaning, model exploration across algorithms, hyperparameter tuning, and exportable artifact packaging.',
    features: [
      'Automated feature scaling, missing value imputation, and categorical encoding',
      'Systematic algorithm comparison across Gradient Boosting, Random Forests, and Neural Networks',
      'Bayesian hyperparameter optimization for accelerated model convergence',
      'Generates deployment-ready serialized model artifacts accompanied by performance evaluation reports'
    ],
    tech: ['Python', 'Scikit-Learn', 'Machine Learning', 'Pandas', 'NumPy', 'AutoML'],
    architecture: 'Modular pipeline architecture separating data ingestion, feature transformation, model selection, Bayesian optimization, and model serialization.',
    github: 'https://github.com/Nandan-2004',
    verified: true
  },
  {
    id: 'automated-news-video',
    slug: 'automated-news-video',
    title: 'Automated News Video Publishing System',
    projectType: 'personal',
    category: 'Automation',
    tagline: 'Autonomous N8N Pipeline for News Aggregation, AI Scripting & Multi-Channel Uploads',
    description: 'End-to-end N8N automation pipeline that fetches news feeds, drafts AI video scripts, triggers video rendering compositions, and automatically uploads to YouTube with status alerts to Telegram.',
    overview: 'Hands-free content automation pipeline coordinating RSS news monitoring, LLM script synthesis, video composition rendering APIs, and multi-channel publication.',
    features: [
      'Autonomous scheduled RSS feed polling and news extraction',
      'LLM integration for contextual script drafting and executive summaries',
      'Automated video composition rendering and automated YouTube channel upload',
      'Instant webhook execution logging and push status alerts to Telegram'
    ],
    tech: ['N8N Automation', 'Python', 'AI Agents', 'REST APIs', 'JSON'],
    architecture: 'Event-driven N8N orchestration engine coordinating Python worker scripts, automated text-to-speech synthesis, video rendering webhooks, and REST API publication endpoints.',
    github: 'https://github.com/Nandan-2004',
    verified: true
  },
  {
    id: 'legal-summarizer',
    slug: 'legal-summarizer',
    title: 'Automated Legal Document Summarizer',
    projectType: 'personal',
    category: 'AI/ML',
    tagline: 'Streamlit Application Powered by FLAN-T5 for Contract Summarization',
    description: 'Interactive Streamlit NLP application utilizing fine-tuned FLAN-T5 language models for automated legal document summarization, key information extraction, and clause risk factor analysis.',
    overview: 'Engineered for analyzing lengthy agreements and contracts, leveraging fine-tuned transformer models to condense dense legal text into structured executive summaries.',
    features: [
      'Multi-page legal document parsing and token-level chunking',
      'Abstractive clause summarization using fine-tuned FLAN-T5 transformer models',
      'Key obligation, risk factor, and liability covenant extraction',
      'Interactive Streamlit web interface with clear clause-by-clause breakdown'
    ],
    tech: ['Python', 'FLAN-T5', 'Hugging Face', 'NLP', 'Deep Learning', 'Streamlit'],
    architecture: 'Transformer inference pipeline running fine-tuned FLAN-T5 models, wrapped in an interactive Streamlit UI for instant document processing.',
    github: 'https://github.com/Nandan-2004',
    verified: true
  },
  {
    id: 'object-detection-yolo',
    slug: 'object-detection-yolo',
    title: 'Object Detection using YOLOv8',
    projectType: 'personal',
    category: 'AI/ML',
    tagline: 'Real-Time Multi-Object Detection & Tracking in Video Streams',
    description: 'Python-based computer vision system for real-time multi-object detection, bounding box spatial tracking, and video stream analytics using YOLOv8 and OpenCV.',
    overview: 'High-throughput computer vision pipeline engineered for low-latency detection and tracking across high-FPS video streams with GPU acceleration support.',
    features: [
      'Real-time multi-object detection and spatial tracking in video feeds',
      'Custom optimized YOLOv8 weights tuned for rapid inference',
      'Frame-by-frame bounding box analytics and object count logging',
      'Engineered with OpenCV for efficient video frame buffering'
    ],
    tech: ['Python', 'YOLOv8', 'OpenCV', 'Computer Vision', 'Deep Learning'],
    architecture: 'High-performance video frame processing architecture leveraging OpenCV frame capture, parallel YOLOv8 tensor inference, and non-maximum suppression.',
    github: 'https://github.com/Nandan-2004',
    verified: true
  },
  {
    id: 'aquatrack',
    slug: 'aquatrack',
    title: 'Smart Water Monitoring System (IoT + ML)',
    projectType: 'personal',
    category: 'IoT',
    tagline: 'ESP32 IoT Solution with Flow Tracking, Billing & ML Forecasting',
    description: 'ESP32-based hardware-software IoT solution featuring real-time water flow telemetry, automated billing calculations, and machine learning consumption forecasting. Research paper presented at S4SD international conference.',
    overview: 'Combines embedded ESP32 sensor telemetry with machine learning forecasting algorithms to monitor volumetric water flow and detect leakage anomalies.',
    features: [
      'Real-time flow meter telemetry streaming via ESP32 microcontrollers',
      'Machine learning anomaly detection for pipe leakages and irregular consumption',
      'Automated consumption calculation, analytics dashboards, and billing forecasting',
      'Published research presented at the S4SD international conference'
    ],
    tech: ['ESP32', 'C', 'Python', 'IoT', 'Machine Learning', 'REST APIs'],
    architecture: 'Microcontroller telemetry streaming over HTTP/MQTT to a centralized Python service running predictive Scikit-Learn models for time-series flow forecasting.',
    github: 'https://github.com/Nandan-2004',
    verified: true
  }
];

export const projectCategories = [
  'All',
  'Office / CSG Projects',
  'Personal Projects',
  'AI/ML',
  'Automation',
  'IoT'
];
