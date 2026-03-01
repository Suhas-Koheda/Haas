import Link from "next/link";
import { ArrowUpRight, Github, Linkedin, Mail, FileText, Trophy, GitFork } from "lucide-react";
import AllProjects from "@/components/AllProjects";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background pb-32">
      <div className="max-w-4xl mx-auto px-10 py-24 space-y-32">
        {/* Hero Section */}
        <section className="flex flex-col-reverse md:flex-row gap-12 items-start justify-between">
          <div className="space-y-8 flex-1">
            <div className="space-y-4">
              <p className="font-mono text-sm text-muted-foreground uppercase tracking-widest">
                Software Engineer
              </p>
              <h1 className="text-6xl md:text-7xl font-bold tracking-tighter">
                Suhas Koheda
              </h1>
            </div>
            <p className="text-xl font-light text-muted-foreground max-w-xl leading-relaxed">
              Building intelligent systems and robust backends. Passionate about AI/ML, distributed systems, and open source.
            </p>
            <div className="flex gap-4">
               <a 
                 href="mailto:sharmasuhas450@gmail.com"
                 className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors"
               >
                 Contact
               </a>
               <Link 
                 href="/resume.pdf"
                 target="_blank"
                 className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-border hover:bg-muted transition-colors"
               >
                 Resume
               </Link>
            </div>
          </div>
        </section>

        {/* Selected Projects */}
        <section className="space-y-12">
          <div className="flex items-baseline justify-between border-b border-border pb-4">
            <h2 className="text-2xl font-medium tracking-tight">Selected Projects</h2>
            <span className="text-sm text-muted-foreground font-mono">01 — {projects.length.toString().padStart(2, '0')}</span>
          </div>
          
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-12">
            {projects.map((project, i) => (
              <div key={i} className="group space-y-4 flex flex-col h-full bg-card/50 p-6 rounded-2xl border border-border/50 hover:border-border transition-colors">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-semibold">
                    {project.title}
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed text-sm grow">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="px-2.5 py-0.5 text-[10px] font-mono border border-border rounded-full text-muted-foreground bg-muted/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-3 pt-6 border-t border-border/10">
                  {project.githubLink && (
                    <Link 
                      href={project.githubLink} 
                      target="_blank" 
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-semibold rounded-xl border border-border hover:bg-muted transition-colors"
                    >
                      <Github size={14} />
                      Code
                    </Link>
                  )}
                  {project.liveLink && (
                    <Link 
                      href={project.liveLink} 
                      target="_blank" 
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-semibold rounded-xl bg-foreground text-background hover:bg-foreground/90 transition-colors shadow-lg shadow-foreground/5"
                    >
                      <ArrowUpRight size={14} />
                      Live
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <AllProjects />
        </section>
        
        {/* Open Source Section */}
        <section className="space-y-12">
           <div className="flex items-baseline justify-between border-b border-border pb-4">
            <h2 className="text-2xl font-medium tracking-tight">Open Source</h2>
          </div>
          
          <div className="border border-border rounded-xl p-8 hover:bg-muted/30 transition-colors">
            <div className="flex flex-col md:flex-row gap-6 justify-between items-start">
              <div className="space-y-4 max-w-2xl">
                <div className="flex items-center gap-3">
                   <GitFork size={24} className="text-muted-foreground" />
                   <h3 className="text-xl font-semibold">LangChain4j Gemini Starter</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Official Spring Boot starter for Gemini AI integration in LangChain4j. 
                  Published to Maven Central and used by 260+ developers to simplify AI integration in Java applications.
                </p>
                <div className="flex gap-2">
                   <span className="px-2.5 py-0.5 text-[10px] font-mono border border-border rounded-full text-muted-foreground bg-muted/30">Java</span>
                   <span className="px-2.5 py-0.5 text-[10px] font-mono border border-border rounded-full text-muted-foreground bg-muted/30">Spring Boot</span>
                </div>
              </div>
              <Link 
                href="https://github.com/langchain4j/langchain4j-spring/pull/74" 
                target="_blank"
                className="inline-flex items-center gap-2 text-sm font-medium hover:underline underline-offset-4"
              >
                View Contribution <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* Experience & Achievements */}
        <section className="grid md:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div className="flex items-baseline justify-between border-b border-border pb-4">
               <h2 className="text-xl font-medium tracking-tight">Experience</h2>
            </div>
            
            <div className="space-y-8">
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-medium text-lg">Daira Edtech</h3>
                  <span className="text-sm text-muted-foreground font-mono">July — Oct 2025</span>
                </div>
                <p className="text-muted-foreground text-sm">AI/ML Development Intern</p>
                <p className="text-sm text-muted-foreground/80 leading-relaxed">
                  Engineered AI tools using LangChain & RAG. Built document processing pipeline for 5,000+ resources. Reduced deployment time by 60% via CI/CD pipelines.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex items-baseline justify-between border-b border-border pb-4">
               <h2 className="text-xl font-medium tracking-tight">Achievements</h2>
            </div>
            
            <div className="space-y-6">
              <div className="flex gap-4 items-start group">
                <Trophy size={20} className="text-muted-foreground shrink-0 mt-0.5 group-hover:text-foreground transition-colors" />
                <div className="space-y-1">
                  <h3 className="font-medium">4th Place at Juphack 2025</h3>
                  <p className="text-sm text-muted-foreground">Among 100+ teams globally.</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start group">
                <Trophy size={20} className="text-muted-foreground shrink-0 mt-0.5 group-hover:text-foreground transition-colors" />
                <div className="space-y-1">
                  <h3 className="font-medium">Maven Central Publisher</h3>
                  <p className="text-sm text-muted-foreground">
                    Published LangChain4j Gemini Starter, used by 260+ developers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="space-y-12">
           <div className="flex items-baseline justify-between border-b border-border pb-4">
            <h2 className="text-2xl font-medium tracking-tight">About</h2>
            <span className="text-sm text-muted-foreground font-mono">04</span>
          </div>
          <div className="grid md:grid-cols-[1fr_2fr] gap-8">
            <div className="text-sm text-muted-foreground font-mono pt-1">
              Based in India.
            </div>
            <div className="space-y-6 text-lg leading-relaxed text-foreground/90">
              <p>
                I am a Computer Science student at VIT Chennai (Class of 2027), specializing in AI/ML with a CGPA of 9.0.
              </p>
              <p>
                My expertise lies in building scalable backend systems and intelligent AI applications. 
                I actively contribute to open-source, promoting accessible AI integration for the Java ecosystem.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="space-y-12">
          <div className="flex items-baseline justify-between border-b border-border pb-4">
            <h2 className="text-2xl font-medium tracking-tight">Let&apos;s Connect</h2>
            <span className="text-sm text-muted-foreground font-mono">05</span>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
             <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                   I&apos;m always open to discussing collaborative opportunities, new projects, or sharing ideas on AI and software engineering.
                </p>
                <div className="flex flex-col gap-4">
                   <a href="mailto:sharmasuhas450@gmail.com" className="flex items-center gap-3 text-lg font-medium hover:text-muted-foreground transition-colors">
                      <Mail size={20} />
                      sharmasuhas450@gmail.com
                   </a>
                   <a href="https://github.com/suhas-koheda" target="_blank" className="flex items-center gap-3 text-lg font-medium hover:text-muted-foreground transition-colors">
                      <Github size={20} />
                      github.com/suhas-koheda
                   </a>
                   <a href="https://www.linkedin.com/in/ssk450/" target="_blank" className="flex items-center gap-3 text-lg font-medium hover:text-muted-foreground transition-colors">
                      <Linkedin size={20} />
                      linkedin.com/in/ssk450
                   </a>
                </div>
             </div>
             
             <div className="bg-muted/30 p-8 rounded-2xl border border-border/50 flex flex-col justify-center items-center text-center space-y-4">
                <h3 className="text-xl font-semibold">Detailed Resume</h3>
                <p className="text-muted-foreground">
                   A comprehensive view of my technical skills, experience, and academic background.
                </p>
                <Link 
                   href="/resume.pdf" 
                   target="_blank"
                   className="inline-flex items-center gap-2 px-6 py-2.5 bg-foreground text-background rounded-full font-medium hover:scale-105 transition-transform"
                >
                   <FileText size={18} />
                   View Resume
                </Link>
             </div>
          </div>
        </section>
      </div>
    </main>
  );
}

const projects = [
  {
    title: "ResumeForge",
    description: "A professional LaTeX resume generator with an AI-powered node-based visual editor. Features live PDF preview and AI text polishing.",
    tags: ["React", "TypeScript", "Vite", "Gemini AI"],
    githubLink: "https://github.com/Suhas-Koheda/resumeforge",
    liveLink: "https://suhask.dev/resumebuilder/"
  },
  {
    title: "AI Video Knowledge Editor",
    description: "Specialized AI-powered video editing tool enriching content with contextual knowledge cards using Whisper, GLiNER, and semantic retrieval.",
    tags: ["Python", "FastAPI", "PySide6", "OpenAI Whisper"],
    githubLink: "https://github.com/Suhas-Koheda/suhas-koheda-video-editor" 
  },
  {
    title: "Indian Legal Analytics",
    description: "Full-stack legal analytics platform analyzing 42,000+ Supreme Court cases with interactive dashboards and Gemini-powered legal assistant.",
    tags: ["Python", "Streamlit", "LangChain", "Analytics"],
    githubLink: "https://github.com/Suhas-Koheda/IndianLegalAnalytics"
  },
  {
    title: "Automated Manager",
    description: "Automation system converting emails into calendar events. Processed 500+ daily emails with 95% accuracy.",
    tags: ["Python", "LangChain", "Google APIs"],
    githubLink: "https://github.com/Suhas-Koheda/suhas-koheda-automatedmanager"
  },
  {
    title: "MovieBuff",
    description: "Cross-platform movie browsing application supporting Android, iOS, and Desktop using Kotlin Multiplatform with shared business logic.",
    tags: ["Kotlin Multiplatform", "Compose", "Ktor"],
    githubLink: "https://github.com/Suhas-Koheda/MBuff"
  },
  {
    title: "BloggerAI",
    description: "Research assistant generating formatted technical news summaries using Google Search API and AI processing.",
    tags: ["Python", "Flask", "LangChain", "Agent"],
    githubLink: "https://github.com/Suhas-Koheda/suhas-koheda-bloggerai"
  },
  {
    title: "YouTube Content Manager",
    description: "AI-powered assistant generating engaging, SEO-optimized video titles and descriptions using GitHub's AI models via a clean React interface.",
    tags: ["React", "FastAPI", "Gemini AI", "Tailwind"],
    githubLink: "https://github.com/Suhas-Koheda/YoutubeGenerator"
  }
];
