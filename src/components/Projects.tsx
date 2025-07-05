"use client";
import React, { useState, useMemo } from 'react';
import { Github, ExternalLink, Briefcase, Code, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeProvider'; // Assuming you have a ThemeProvider

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  githubLink: string;
  liveLink?: string;
  primaryLanguage: 'Kotlin' | 'Java' | 'JavaScript' | 'Python' | 'HTML' | 'Other';
  details?: string[]; // Optional more detailed bullet points
}

const projectsData: Project[] = [
  {
    id: 'resume-matcher',
    name: 'Resume Matcher',
    description: 'AI-powered resume analysis backend that evaluates resume-job description compatibility. Implemented PDF processing, AI integration with Gemini API, and RESTful endpoints.',
    technologies: ['JavaScript', 'Node.js', 'Express', 'Multer', 'Langchain4j (conceptual)', 'Gemini API (conceptual)'], // Adjusted based on RM repo (JavaScript) and resume concept
    githubLink: 'https://github.com/Suhas-Koheda/RM',
    primaryLanguage: 'JavaScript',
    details: [
      "Designed REST API endpoints for file uploads and analysis requests.",
      "Conceptualized AI integration for text analysis and match scoring."
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
    description: 'A Python-based automation tool. (Further details would be added based on README or project specifics).',
    technologies: ['Python', 'Scripting'], // General placeholder
    githubLink: 'https://github.com/Suhas-Koheda/AutomatedManager',
    primaryLanguage: 'Python',
  },
  {
    id: 'nature-for-future',
    name: 'Nature for Future',
    description: 'A web project focused on nature or environmental themes. (Further details would be added based on README or project specifics).',
    technologies: ['HTML', 'CSS', 'JavaScript'], // Assuming basic web tech
    githubLink: 'https://github.com/Suhas-Koheda/Nature-for-future',
    primaryLanguage: 'HTML',
  },
];

const languageFilters: Array<'All' | Project['primaryLanguage']> = ['All', 'Kotlin', 'Java', 'JavaScript', 'Python', 'HTML'];


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

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut"
      }
    }),
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
  };


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
                variants={cardVariants}
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
                          ${isDarkMode ? 'bg-sky-800/50 text-sky-300 border border-sky-700/50' : 'bg-sky-100 text-sky-700 border border-sky-200'}`}>
                          {tech} {/* Tech tags can be sans-serif for readability */}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-5 sm:px-6 py-3 sm:py-4 bg-[var(--background-alt)] border-t border-[var(--border)]">
                  <div className="flex items-center justify-start space-x-4">
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors"
                      aria-label={`GitHub repository for ${project.name}`}
                    >
                      <Github size={18} className="mr-1.5" />
                      Source Code
                    </a>
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors"
                        aria-label={`Live demo of ${project.name}`}
                      >
                        <ExternalLink size={18} className="mr-1.5" />
                        Live/Details
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
