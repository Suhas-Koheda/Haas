
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
    id: 'speech-pipeline',
    name: 'Telugu Speech Pipeline',
    description: 'An automated, modular, and scalable pipeline for curating high-quality Telugu speech datasets from YouTube channels. Handles voice activity detection (VAD), speaker diarization, speaker attribution, and multilingual ASR transcription.',
    technologies: ['Python', 'PyAnote', 'Silero VAD', 'IndicConformer', 'yt-dlp', 'FFmpeg', 'PyTorch'],
    githubLink: 'https://github.com/Suhas-Koheda/speech-pipeline',
    primaryLanguage: 'Python',
    details: [
      "Designed an end-to-end pipeline to crawl YouTube video links, extract metadata, and download/resample audio to 16kHz mono WAV.",
      "Employed Silero VAD to detect speech segments, merging adjacent segments with gaps <= 0.5s and splitting long durations to optimize ASR training formats.",
      "Integrated PyAnote Speaker Diarization 3.1 to identify unique speaker turns and assign dominant speakers to segments using temporal overlap logic.",
      "Transcribed segmented audio chunks using AI4Bharat's IndicConformer (600M multilingual model) with RNN-T decoding."
    ]
  },
  {
    id: 's2s-dataset-builder',
    name: 'Telugu to Hindi S2S Dataset Notebook',
    description: 'An automated parallel Speech-to-Speech (S2S) dataset pipeline running on Kaggle T4 GPUs to stream, translate, and synthesize multilingual audio datasets.',
    technologies: ['Python', 'PyTorch', 'IndicTrans2', 'MMS-TTS', 'Hugging Face Hub'],
    githubLink: 'https://github.com/Suhas-Koheda/deeplearning',
    liveLink: '/blog/parallel-dataset',
    liveLinkText: 'Notebook',
    primaryLanguage: 'Python',
    details: [
      "Built a pipeline to stream source audio files from Hugging Face's ai4bharat/indicvoices Telugu split in real-time.",
      "Translated the source transcripts into Hindi utilizing the IndicTrans2 seq2seq model (dist-320M) on CUDA GPU.",
      "Synthesized corresponding Hindi audio waveforms from the translated transcripts using Facebook's MMS-TTS model.",
      "Casted and uploaded the processed audio and metadata chunks to the target nlpctx/telugu-hindi-s2s Hugging Face dataset repository."
    ]
  },
  {
    id: 'ai-video-editor',
    name: 'AI Video Knowledge Editor',
    description: 'An AI-powered video editor that automatically enriches standard video content with contextual Knowledge Cards by combining high-speed transcription, zero-shot entity recognition, and real-time semantic web retrieval.',
    technologies: ['Python', 'FastAPI', 'PySide6', 'Playwright', 'FFmpeg', 'faster-whisper', 'GLiNER', 'PostHog'],
    githubLink: 'https://github.com/Suhas-Koheda/video-editor',
    primaryLanguage: 'Python',
    details: [
      "Integrated faster-whisper for speech-to-text and Sarvam AI / local NLLB-200 for high-fidelity translation of Indic languages.",
      "Developed contextual entity ranking utilizing zero-shot GLiNER NER models combined with sliding window context and global frequency statistics.",
      "Implemented agentic semantic search with SentenceTransformers to dynamically query Wikipedia and DuckDuckGo for contextually relevant summaries.",
      "Built a desktop GUI (PySide6) and a headless FastAPI microservice supporting automated page screenshot capture via Playwright and overlay rendering via FFmpeg."
    ]
  },
  {
    id: 'java-code-optimizer',
    name: 'Java Code Optimizer',
    description: 'A web-based code refactoring application powered by a Salesforce CodeT5-small model fine-tuned on Java optimization datasets to transform inefficient code structures.',
    technologies: ['Java', 'Python', 'Flask', 'Hugging Face Transformers', 'CodeT5', 'PyTorch'],
    githubLink: 'https://github.com/Suhas-Koheda/deeplearning',
    primaryLanguage: 'Java',
    details: [
      "Fine-tuned Salesforce CodeT5-small on 6K Java optimization pairs (nlpctx/java_optimisation) using Seq2SeqTrainer for Java code refactoring.",
      "Built a web user interface with Flask allowing developers to submit Java snippets, select pre-loaded optimization examples, and view instant suggestions.",
      "Implemented automatic backend fallback to CPU when CUDA/GPU acceleration is unavailable.",
      "Added application health endpoints to monitor model loading state and host device resource utilization."
    ]
  },
  {
    id: 'resumeforge',
    name: 'ResumeForge',
    description: 'A professional LaTeX resume generator with an AI-powered node-based visual editor. Features live PDF preview, AI text polishing using Gemini, and a drag-and-drop canvas.',
    technologies: ['React', 'TypeScript', 'Vite', 'Express.js', 'PostgreSQL', 'Zustand', 'Gemini AI', 'Tectonic'],
    githubLink: 'https://github.com/Suhas-Koheda/resumeforge',
    primaryLanguage: 'TypeScript',
    details: [
      "Developed a node-based visual resume builder with drag-and-drop support.",
      "Integrated Google Gemini AI for automated bullet point polishing and experience metrics.",
      "Implemented a real-time LaTeX compilation engine using Tectonic for serverless PDF generation.",
      "Engineered local network synchronization for real-time cross-device editing and preview."
    ]
  },
  {
    id: 'indian-legal-analytics',
    name: 'Indian Legal Analytics ',
    description: 'A comprehensive dashboard for analyzing Supreme Court legal cases with advanced analytics and AI-powered insights. Features include Judge Analytics, Case Explorer, and a secure AI-powered Legal Assistant.',
    technologies: ['Python', 'Streamlit', 'LangChain', 'Google Gemini API', 'Docker'],
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
    description: 'Cross-platform movie browsing application with responsive UI supporting search, filtering, and detailed views. Implemented MVVM architecture with Coroutines and Flow.',
    technologies: ['Kotlin Multiplatform', 'Compose Multiplatform', 'Ktor', 'Voyager'],
    githubLink: 'https://github.com/Suhas-Koheda/MBuff',
    primaryLanguage: 'Kotlin',
    details: [
      "Developed for Android, iOS, and Desktop platforms.",
      "Managed state using Coroutines and Flow."
    ]
  },
  {
    id: 'habit-tracker-backend',
    name: 'Habit Tracker Backend',
    description: 'Developed JWT-authenticated REST API with multiple endpoints. Implemented habit tracking with Exposed ORM for improved performance.',
    technologies: ['Kotlin', 'Ktor', 'PostgreSQL', 'Exposed ORM', 'JWT'],
    githubLink: 'https://github.com/Suhas-Koheda/HabitTrackerBackend',
    primaryLanguage: 'Kotlin',
  },
  {
    id: 'langchain4j-gemini-starter',
    name: 'LangChain4j Gemini Starter',
    description: 'Implemented Spring Boot starter configuration files for Google Gemini AI within the LangChain4j framework, published to Maven Central.',
    technologies: ['Java', 'Spring Boot', 'LangChain4j', 'Google Gemini'],
    githubLink: 'https://github.com/langchain4j/langchain4j-spring/tree/main/langchain4j-spring-boot-starter-vertex-ai-gemini',
    liveLink: 'https://central.sonatype.com/artifact/dev.langchain4j/langchain4j-spring-boot-starter-vertex-ai-gemini',
    primaryLanguage: 'Java',
    details: [
      "Contributed to a major open-source AI Java library.",
      "Facilitated easier integration of Gemini AI for Spring Boot users."
    ]
  },
  {
    id: 'lms-java',
    name: 'Library Management System (LMS)',
    description: 'Automates library resource management including book inventory, member registrations, and transactions like book issues and returns.',
    technologies: ['Java', 'Spring Boot', 'Thymeleaf', 'MySQL'],
    githubLink: 'https://github.com/Suhas-Koheda/LMS-Java',
    primaryLanguage: 'Java',
  },
  {
    id: 'automated-manager',
    name: 'Automated Manager',
    description: 'A Python-based automation tool with Jupyter notebooks for data analysis and visualization, implementing machine learning algorithms and data processing pipelines.',
    technologies: ['Python', 'Jupyter Notebook', 'Scikit-learn', 'Pandas'],
    githubLink: 'https://github.com/Suhas-Koheda/AutomatedManager',
    primaryLanguage: 'Python',
    details: [
      "Created data visualization dashboards using Matplotlib and Seaborn",
      "Implemented machine learning models with Scikit-learn",
      "Developed interactive notebooks for data exploration and analysis"
    ]
  },
  {
    id: 'dusky-muse',
    name: 'The Dusky Muse',
    description: 'Freelance frontend web development project with modern UI design, responsive layouts, and optimized performance.',
    technologies: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    githubLink: 'https://github.com/Suhas-Koheda',
    liveLink: 'https://theduskymuse.com/',
    primaryLanguage: 'TypeScript',
    details: [
      "Designed and implemented a responsive, modern frontend with TypeScript and Next.js",
      "Created smooth animations and transitions using Framer Motion",
      "Optimized for performance and SEO with Next.js best practices"
    ]
  },
  {
    id: 'juphack',
    name: 'JupHack Project',
    description: 'Web3 contribution focusing on blockchain integration and decentralized applications. Implementing smart contract functionality and blockchain infrastructure.',
    technologies: ['Solidity', 'Web3.js', 'Ethereum', 'Smart Contracts'],
    githubLink: 'https://github.com/Suhas-Koheda/juphack',
    primaryLanguage: 'Web3',
    details: [
      "Implemented smart contract functionality with Solidity",
      "Integrated Web3.js for blockchain interactions",
      "Developed decentralized application architecture"
    ]
  },
  {
    id: 'bingo-social',
    name: 'Bingo Social',
    description: 'A social media web application built during DevsHouse Hackathon 2025. Features include user authentication, posts with likes/comments, real-time notifications, and responsive design.',
    technologies: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Shadcn UI', 'MongoDB'],
    githubLink: 'https://github.com/krishkalaria12/bingo',
    liveLink: 'https://bingo-social.vercel.app/',
    primaryLanguage: 'TypeScript',
    details: [
      "Built a complete social media platform within 48 hours during DevsHouse 2025",
      "Implemented user authentication, profiles, and social interactions",
      "Created responsive UI with Tailwind CSS and Shadcn components"
    ]
  },
  {
    id: 'fetchhive',
    name: 'FetchHive',
    description: 'A job board application developed during HackNight. Allows users to browse, filter and apply for job listings with a modern UI and efficient state management.',
    technologies: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Redux'],
    githubLink: 'https://github.com/krishkalaria12/fetchhive',
    liveLink: 'https://fetch-hive.vercel.app/',
    primaryLanguage: 'TypeScript',
    details: [
      "Developed during HackNight as a comprehensive job search platform",
      "Built with TypeScript and Next.js for type-safety and performance",
      "Implemented responsive filtering and search functionality"
    ]
  },
  {
    name: "YouTube Content Manager",
    description: "AI-powered assistant generating engaging, SEO-optimized video titles and descriptions using GitHub's AI models via a clean React interface.",
    technologies: ["React", "FastAPI", "Gemini AI", "Tailwind"],
    githubLink: "https://github.com/Suhas-Koheda/YoutubeGenerator",
    primaryLanguage: 'TypeScript',
    id: 'youtube-manager'
  },
  {
    name: "BloggerAI",
    description: "Research assistant generating formatted technical news summaries using Google Search API and AI processing.",
    technologies: ["Python", "Flask", "LangChain", "Agent"],
    githubLink: "https://github.com/Suhas-Koheda/bloggerai",
    primaryLanguage: 'Python',
    id: 'blogger-ai'
  }
];

export const languageFilters = ['All', 'Kotlin', 'Java', 'Python', 'TypeScript', 'Web3', 'Other'];
