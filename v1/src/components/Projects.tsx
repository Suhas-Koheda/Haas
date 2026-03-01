"use client";
import React, { useState, useMemo } from 'react';
import { Github, ExternalLink, Briefcase, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeProvider'; // Assuming you have a ThemeProvider

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  githubLink: string;
  liveLink?: string;
  primaryLanguage: 'Kotlin' | 'Java' | 'JavaScript' | 'Python' | 'HTML' | 'TypeScript' | 'Web3' | 'Other';
  details?: string[]; // Optional more detailed bullet points
}

const projectsData: Project[] = [
  {
    id: 'resumeforge',
    name: 'ResumeForge',
    description: 'A professional LaTeX resume generator with an AI-powered node-based visual editor. Features live PDF preview, AI text polishing using Gemini, and a drag-and-drop canvas.',
    technologies: ['React', 'TypeScript', 'Vite', 'Express.js', 'PostgreSQL', 'Zustand', 'Gemini AI', 'Tectonic'],
    githubLink: 'https://github.com/Suhas-Koheda/resumeforge',
    liveLink: 'https://suhask.dev/resumebuilder/',
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
    technologies: ['Python', 'Streamlit', 'Pandas', 'Matplotlib', 'LangChain', 'Google Gemini API', 'Docker'],
    githubLink: 'https://github.com/Suhas-Koheda/Indian-Legal-Analytics',
    primaryLanguage: 'Python',
    details: [
      "Built a comprehensive dashboard for Supreme Court legal cases analysis (1950-2025).",
      "Integrated LangChain and Google Gemini AI for advanced legal analysis and chatbot features.",
      "Implemented secure API key handling using browser session storage, ensuring sensitive credentials never leave the client.",
      "Developed automated preprocessing pipelines for large-scale legal metadata.",
      "Containerized the application using Docker for easy deployment and scalability."
    ]
  },
  {
    id: 'moviebuff',
    name: 'MovieBuff',
    description: 'Cross-platform movie browsing application with responsive UI supporting search, filtering, and detailed views. Implemented MVVM architecture with Coroutines and Flow.',
    technologies: ['Kotlin Multiplatform', 'Compose Multiplatform', 'Coil', 'Ktor', 'Voyager', 'TMDb API'],
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
    technologies: ['Java', 'Spring Boot', 'Thymeleaf', 'MySQL'], // Assuming tech based on typical Java LMS
    githubLink: 'https://github.com/Suhas-Koheda/LMS-Java',
    primaryLanguage: 'Java',
  },
  {
    id: 'automated-manager',
    name: 'Automated Manager',
    description: 'A Python-based automation tool with Jupyter notebooks for data analysis and visualization, implementing machine learning algorithms and data processing pipelines.',
    technologies: ['Python', 'Jupyter Notebook', 'Pandas', 'NumPy', 'Matplotlib', 'Scikit-learn'],
    githubLink: 'https://github.com/Suhas-Koheda/AutomatedManager',
    primaryLanguage: 'Python',
    details: [
      "Created data visualization dashboards using Matplotlib and Seaborn",
      "Implemented machine learning models with Scikit-learn",
      "Developed interactive notebooks for data exploration and analysis",
      "Maintained notebook-based workflows available on GitHub for reproducibility"
    ]
  },
  {
    id: 'nature-for-future',
    name: 'Nature for Future',
    description: 'A web project focused on nature or environmental themes. (Further details would be added based on README or project specifics).',
    technologies: ['HTML', 'CSS', 'JavaScript'], // Assuming basic web tech
    githubLink: 'https://github.com/Suhas-Koheda/Nature-for-future',
    primaryLanguage: 'HTML',
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
    technologies: ['Solidity', 'Web3.js', 'Ethereum', 'Smart Contracts', 'DApps'],
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
    technologies: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Shadcn UI', 'Clerk', 'MongoDB', 'Hackathon'],
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
    technologies: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Redux', 'Framer Motion', 'Hackathon'],
    githubLink: 'https://github.com/krishkalaria12/fetchhive',
    liveLink: 'https://fetch-hive.vercel.app/',
    primaryLanguage: 'TypeScript',
    details: [
      "Developed during HackNight as a comprehensive job search platform",
      "Built with TypeScript and Next.js for type-safety and performance",
      "Implemented responsive filtering and search functionality"
    ]
  },
];

const languageFilters: Array<'All' | Project['primaryLanguage']> = ['All', 'Kotlin', 'Java', 'Python', 'HTML', 'TypeScript', 'Web3'];


const Projects = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<'All' | Project['primaryLanguage']>('All');
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const filteredProjects = useMemo(() => {
    if (selectedLanguage === 'All') {
      return projectsData;
    }
    return projectsData.filter(project => project.primaryLanguage === selectedLanguage);
  }, [selectedLanguage]);

  // Define a custom function for the variants to resolve type issues
  const getCardVariants = () => ({
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeInOut" as const
      }
    }),
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
  });


  return (
    <section id="projects-section" className="py-12 sm:py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-[var(--foreground)]">
          My Projects & Contributions
        </h2>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
          {languageFilters.map(lang => (
            <button
              key={lang}
              onClick={() => setSelectedLanguage(lang)}
              className={`px-4 py-2 text-sm sm:text-base rounded-md font-medium transition-all duration-200 ease-in-out
                ${selectedLanguage === lang
                  ? 'bg-[var(--primary)] text-[var(--primary-foreground)] shadow-md scale-105'
                  : `bg-[var(--card)] text-[var(--muted-foreground)] border border-[var(--border)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]`}
              `}
            >
              <Filter size={14} className="inline mr-2 mb-0.5" />
              {lang}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="sync">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                custom={index}
                variants={getCardVariants()}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout // Added for smooth reordering if items change position
                className={`flex flex-col bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:scale-[1.02]`}
              >
                <div className="p-5 sm:p-6 flex-grow font-sans"> {/* Apply font-sans to content area */}
                  <div className="flex items-center mb-3">
                    <Briefcase size={20} className="text-[var(--primary)] mr-3 flex-shrink-0" />
                    <h3 className="text-lg sm:text-xl font-semibold text-[var(--card-foreground)] leading-tight font-mono"> {/* Project name mono */}
                      {project.name}
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-[var(--muted-foreground)] mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {project.details && project.details.length > 0 && (
                    <ul className="list-disc list-inside space-y-1 mb-4 text-xs sm:text-sm text-[var(--muted-foreground)] pl-1">
                      {project.details.map((detail, i) => <li key={i}>{detail}</li>)}
                    </ul>
                  )}

                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-[var(--foreground)] mb-1.5 uppercase tracking-wider font-mono">Technologies:</h4> {/* Title mono */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map(tech => (
                        <span key={tech} className={`px-2 py-0.5 text-xs rounded-full
                          ${isDarkMode ? 'bg-[#af8041]/20 text-[#af8041] border border-[#af8041]/40' : 'bg-[#af8041]/10 text-[#af8041] border border-[#af8041]/30'}`}>
                          {tech} {/* Tech tags can be sans-serif for readability */}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-5 sm:px-6 py-4 bg-[var(--background-alt)] border-t border-[var(--border)]">
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--muted)] hover:border-[var(--foreground)]/30 transition-all duration-200 shadow-sm"
                      aria-label={`GitHub repository for ${project.name}`}
                    >
                      <Github size={18} />
                      <span>Code</span>
                    </a>
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 transition-all duration-200 shadow-sm"
                        aria-label={`Live demo of ${project.name}`}
                      >
                        <ExternalLink size={18} />
                        <span>Live</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            className="text-center py-10 text-[var(--muted-foreground)]"
          >
            No projects found for &quot;{selectedLanguage}&quot;. Try a different filter!
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
