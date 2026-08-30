
export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  githubLink: string;
  liveLink?: string;
  liveLinkText?: string;
  primaryLanguage: 'Kotlin' | 'Java' | 'JavaScript' | 'Python' | 'HTML' | 'TypeScript' | 'Web3' | 'Other';
  details?: string[];
}

export const projectsData: Project[] = [
  {
    id: 'society-management',
    name: 'Society Management',
    description: 'Full-stack society complaint management system with admin dashboard. Features resident registration, complaint tracking with status history, admin analytics, and notice board with email notifications.',
    technologies: ['Python', 'FastAPI', 'React', 'TypeScript', 'SQLAlchemy', 'Docker'],
    githubLink: 'https://github.com/Suhas-Koheda/society-management',
    liveLink: 'https://society-management-production-e949.up.railway.app',
    liveLinkText: 'Live',
    primaryLanguage: 'Python',
    details: [
      "Built a full-stack complaint management system with FastAPI backend and React 19 frontend.",
      "Implemented role-based access with admin dashboard showing stats by status, category, and overdue count.",
      "Designed status history tracking (OPEN -> IN_PROGRESS -> RESOLVED) with priority assignment.",
      "Deployed with Docker on Railway with configurable overdue thresholds and email notifications."
    ]
  },
  {
    id: 'telugu-tiny-stories',
    name: 'Telugu Tiny Stories',
    description: 'A lightweight LLaMA-architecture language model implemented from scratch in PyTorch, trained on the Telugu subset of the TinyStories dataset with custom BPE tokenizer.',
    technologies: ['Python', 'PyTorch', 'Transformers', 'Hugging Face'],
    githubLink: 'https://github.com/Suhas-Koheda/telugu-tiny-stories',
    primaryLanguage: 'Python',
    details: [
      "Implemented a complete LLaMA-architecture decoder-only Transformer from scratch in PyTorch.",
      "Built a custom Byte-Pair Encoding (BPE) tokenizer tailored for Telugu text.",
      "Integrated RMSNorm, Rotary Position Embeddings (RoPE), and SwiGLU activation.",
      "Trained on Telugu TinyStories dataset with validation and checkpointing pipeline."
    ]
  },
  {
    id: 'project-questionaire',
    name: 'Project Questionaire',
    description: 'AI-powered interview question generator using LangGraph and Gemini AI. Analyzes project code, resume, and job description to generate HLD, LLD, behavioral, and project-specific questions.',
    technologies: ['Python', 'LangGraph', 'Gemini AI', 'Streamlit'],
    githubLink: 'https://github.com/Suhas-Koheda/project-questionaire',
    primaryLanguage: 'Python',
    details: [
      "Built an agentic pipeline using LangGraph StateGraph for multi-node question generation.",
      "Integrated Google Gemini AI for analyzing codebases, resumes, and job descriptions.",
      "Generated four categories: High-Level Design, Low-Level Design, Behavioral, and Project-Specific questions.",
      "Implemented PDF parsing and repository analysis for comprehensive project understanding."
    ]
  },
  {
    id: 'speech-pipeline',
    name: 'Telugu Speech Pipeline',
    description: 'An automated, modular pipeline for curating high-quality Telugu speech datasets from YouTube channels with VAD, speaker diarization, and ASR transcription.',
    technologies: ['Python', 'PyAnote', 'Silero VAD', 'IndicConformer', 'PyTorch'],
    githubLink: 'https://github.com/Suhas-Koheda/speech-pipeline',
    primaryLanguage: 'Python',
    details: [
      "Designed an end-to-end pipeline to crawl YouTube links, extract metadata, and download/resample audio to 16kHz mono WAV.",
      "Employed Silero VAD to detect speech segments, merging adjacent segments with gaps <= 0.5s.",
      "Integrated PyAnote Speaker Diarization 3.1 to identify unique speaker turns.",
      "Transcribed segmented audio using AI4Bharat's IndicConformer (600M multilingual model) with RNN-T decoding."
    ]
  },
  {
    id: 's2s-dataset-builder',
    name: 'Telugu to Hindi S2S Dataset',
    description: 'An automated parallel Speech-to-Speech dataset pipeline running on Kaggle T4 GPUs to stream, translate, and synthesize multilingual audio datasets.',
    technologies: ['Python', 'PyTorch', 'IndicTrans2', 'MMS-TTS', 'Hugging Face'],
    githubLink: 'https://github.com/Suhas-Koheda/deeplearning',
    liveLink: '/blog/parallel-dataset',
    liveLinkText: 'Notebook',
    primaryLanguage: 'Python',
    details: [
      "Built a pipeline to stream source audio from Hugging Face's ai4bharat/indicvoices Telugu split in real-time.",
      "Translated source transcripts into Hindi using IndicTrans2 seq2seq model (dist-320M) on CUDA GPU.",
      "Synthesized corresponding Hindi audio waveforms using Facebook's MMS-TTS model.",
      "Casted and uploaded processed audio chunks to the target nlpctx/telugu-hindi-s2s Hugging Face dataset."
    ]
  },
  {
    id: 'ai-video-editor',
    name: 'AI Video Knowledge Editor',
    description: 'An AI-powered video editor that enriches video content with contextual Knowledge Cards using Whisper, GLiNER, and semantic web retrieval.',
    technologies: ['Python', 'FastAPI', 'PySide6', 'Playwright', 'FFmpeg'],
    githubLink: 'https://github.com/Suhas-Koheda/video-editor',
    primaryLanguage: 'Python',
    details: [
      "Integrated faster-whisper for speech-to-text and Sarvam AI for high-fidelity Indic language translation.",
      "Developed contextual entity ranking using zero-shot GLiNER NER with sliding window context.",
      "Implemented agentic semantic search with SentenceTransformers for Wikipedia and DuckDuckGo queries.",
      "Built a desktop GUI (PySide6) and headless FastAPI microservice with Playwright screenshot capture."
    ]
  },
  {
    id: 'resumeforge',
    name: 'ResumeForge',
    description: 'A professional LaTeX resume generator with an AI-powered node-based visual editor. Features live PDF preview, AI text polishing, and drag-and-drop canvas.',
    technologies: ['React', 'TypeScript', 'Vite', 'Express.js', 'PostgreSQL', 'Gemini AI'],
    githubLink: 'https://github.com/Suhas-Koheda/resumeforge',
    primaryLanguage: 'TypeScript',
    details: [
      "Developed a node-based visual resume builder with drag-and-drop support.",
      "Integrated Google Gemini AI for automated bullet point polishing and experience metrics.",
      "Implemented real-time LaTeX compilation using Tectonic for serverless PDF generation.",
      "Engineered local network synchronization for real-time cross-device editing."
    ]
  },
  {
    id: 'indian-legal-analytics',
    name: 'Indian Legal Analytics',
    description: 'A comprehensive dashboard for analyzing Supreme Court legal cases with advanced analytics and Gemini-powered legal assistant.',
    technologies: ['Python', 'Streamlit', 'LangChain', 'Google Gemini', 'Docker'],
    githubLink: 'https://github.com/Suhas-Koheda/Indian-Legal-Analytics',
    primaryLanguage: 'Python',
    details: [
      "Built a comprehensive dashboard for Supreme Court legal cases analysis (1950-2025).",
      "Integrated LangChain and Google Gemini AI for advanced legal analysis and chatbot features.",
      "Implemented secure API key handling using browser session storage."
    ]
  },
  {
    id: 'moviebuff',
    name: 'MovieBuff',
    description: 'Cross-platform movie browsing application supporting Android, iOS, and Desktop using Kotlin Multiplatform with shared business logic.',
    technologies: ['Kotlin Multiplatform', 'Compose', 'Ktor', 'Voyager'],
    githubLink: 'https://github.com/Suhas-Koheda/MBuff',
    primaryLanguage: 'Kotlin',
    details: [
      "Developed for Android, iOS, and Desktop platforms with shared core logic.",
      "Managed state using Coroutines and Flow with MVVM architecture."
    ]
  },
  {
    id: 'langchain4j-gemini-starter',
    name: 'LangChain4j Gemini Starter',
    description: 'Spring Boot starter configuration for Google Gemini AI within LangChain4j, published to Maven Central and used by 260+ developers.',
    technologies: ['Java', 'Spring Boot', 'LangChain4j', 'Google Gemini'],
    githubLink: 'https://github.com/langchain4j/langchain4j-spring/tree/main/langchain4j-spring-boot-starter-vertex-ai-gemini',
    liveLink: 'https://central.sonatype.com/artifact/dev.langchain4j/langchain4j-spring-boot-starter-vertex-ai-gemini',
    primaryLanguage: 'Java',
    details: [
      "Contributed to a major open-source AI Java library.",
      "Published to Maven Central, used by 260+ developers."
    ]
  },
  {
    id: 'habit-tracker-backend',
    name: 'Habit Tracker Backend',
    description: 'JWT-authenticated REST API with habit tracking using Exposed ORM for improved performance.',
    technologies: ['Kotlin', 'Ktor', 'PostgreSQL', 'Exposed ORM', 'JWT'],
    githubLink: 'https://github.com/Suhas-Koheda/HabitTrackerBackend',
    primaryLanguage: 'Kotlin',
  },
  {
    id: 'lms-java',
    name: 'Library Management System',
    description: 'Automates library resource management including book inventory, member registrations, and transactions.',
    technologies: ['Java', 'Spring Boot', 'Thymeleaf', 'MySQL'],
    githubLink: 'https://github.com/Suhas-Koheda/LMS-Java',
    primaryLanguage: 'Java',
  },
  {
    id: 'youtube-manager',
    name: 'YouTube Content Manager',
    description: 'AI-powered assistant generating engaging, SEO-optimized video titles and descriptions using GitHub AI models.',
    technologies: ['React', 'FastAPI', 'Gemini AI', 'Tailwind'],
    githubLink: 'https://github.com/Suhas-Koheda/YoutubeGenerator',
    primaryLanguage: 'TypeScript',
  },
  {
    id: 'blogger-ai',
    name: 'BloggerAI',
    description: 'Research assistant generating formatted technical news summaries using Google Search API and AI processing.',
    technologies: ['Python', 'Flask', 'LangChain', 'Agent'],
    githubLink: 'https://github.com/Suhas-Koheda/bloggerai',
    primaryLanguage: 'Python',
  }
];

export const languageFilters = ['All', 'Kotlin', 'Java', 'Python', 'TypeScript', 'Web3', 'Other'];
