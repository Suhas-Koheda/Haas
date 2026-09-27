import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Github, Linkedin, Mail, FileText, Trophy, GitFork } from "lucide-react";
import AllProjects from "@/components/AllProjects";
import ActivityHeatmaps from "@/components/ActivityHeatmaps";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background pb-32">
      <div className="max-w-4xl mx-auto px-10 py-24 space-y-32">

        {/* Hero Section - Name First */}
        <section className="flex flex-col-reverse md:flex-row gap-12 items-start justify-between">
          <div className="space-y-8 flex-1">
            <div className="space-y-4">
              <p className="font-mono text-sm text-muted-foreground uppercase tracking-widest">
                AI Researcher & Engineer
              </p>
              <h1 className="text-6xl md:text-7xl font-bold tracking-tighter">
                Suhas Koheda
              </h1>
            </div>
            <p className="text-xl font-light text-muted-foreground max-w-xl leading-relaxed">
              Building intelligent systems, robust backends, and AI-native automation. Passionate about attention architectures, self-supervised learning, and open source.
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
          <div className="relative w-44 h-56 md:w-52 md:h-64 shrink-0 rounded-2xl overflow-hidden border border-border/80 bg-muted/40 shadow-md">
            <Image
              src="/images/suhas.jpeg"
              alt="Suhas Koheda"
              fill
              priority
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-out"
            />
          </div>
        </section>

        {/* About Section - Second */}
        <section className="space-y-12">
          <div className="flex items-baseline justify-between border-b border-border pb-4">
            <h2 className="text-2xl font-medium tracking-tight">About</h2>
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

        {/* Selected Projects */}
        <section className="space-y-12">
          <div className="flex items-baseline justify-between border-b border-border pb-4">
            <h2 className="text-2xl font-medium tracking-tight">Selected Projects</h2>
            <span className="text-sm text-muted-foreground font-mono">01 — {projects.length.toString().padStart(2, '0')}</span>
          </div>

          <div className="grid md:grid-cols-2 gap-x-8 gap-y-12">
            {projects.map((project, i) => (
              <div key={i} className="group space-y-4 flex flex-col h-full">
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
                      className="px-2.5 py-0.5 text-[10px] font-mono border border-border rounded-full text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 pt-4">
                  {project.githubLink && (
                    <Link
                      href={project.githubLink}
                      target="_blank"
                      className="flex items-center gap-2 text-xs font-semibold hover:text-muted-foreground transition-colors"
                    >
                      <Github size={14} />
                      Code
                    </Link>
                  )}
                  {project.liveLink && (
                    <Link
                      href={project.liveLink}
                      target="_blank"
                      className="flex items-center gap-2 text-xs font-semibold hover:text-muted-foreground transition-colors"
                    >
                      <ArrowUpRight size={14} />
                      {project.liveLinkText || "Live"}
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

          <div className="p-8 border border-border/50">
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
                   <span className="px-2.5 py-0.5 text-[10px] font-mono border border-border rounded-full text-muted-foreground">Java</span>
                   <span className="px-2.5 py-0.5 text-[10px] font-mono border border-border rounded-full text-muted-foreground">Spring Boot</span>
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

        {/* Activity Heatmaps */}
        <ActivityHeatmaps />

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

        {/* Mindset & Evolution Section */}
        <section className="space-y-12">
          <div className="flex items-baseline justify-between border-b border-border pb-4">
            <h2 className="text-2xl font-medium tracking-tight">Technical Evolution</h2>
          </div>

          <div className="space-y-12">
            <div className="grid md:grid-cols-[1fr_2fr] gap-8">
              <div className="text-sm text-muted-foreground font-mono pt-1">
                The Shift
              </div>
              <div className="space-y-6 text-lg leading-relaxed text-foreground/90">
                <p>
                  Over the past year, my focus has shifted from building standalone applications to designing architecture-heavy, original systems. I&apos;ve transitioned from a &quot;student doing projects&quot; to an engineer building intelligent infrastructure, tools, and models.
                </p>
                <p className="text-base text-muted-foreground">
                  My work focuses on low-friction user experiences, AI-native workflows, and infrastructure abstractions that eliminate unnecessary setup and config overhead.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-[1fr_2fr] gap-8">
              <div className="text-sm text-muted-foreground font-mono pt-1">
                Core Stack & Areas
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { title: "Systems & AI", desc: "Attention architectures, MLA, latent space design, self-supervised systems" },
                  { title: "Infra & Event Systems", desc: "MongoDB change streams, custom authentication, async backends" },
                  { title: "Open Source Ecosystem", desc: "Official Spring Boot starter for Gemini integration in LangChain4j" },
                  { title: "Orchestration & Tools", desc: "Terminal-aware Local Agent Managers, automated tmux & API routers" },
                  { title: "Cross-Platform Mobile", desc: "Kotlin Multiplatform (KMP), Compose, Ktor for shared core logic" },
                  { title: "Backend Technologies", desc: "FastAPI background workers, Spring Boot, PostgreSQL & NoSQL" }
                ].map((item, i) => (
                  <div key={i} className="border border-border/50 p-4 rounded-xl space-y-1 hover:border-foreground/20 transition-all duration-300">
                    <h3 className="font-semibold text-xs text-foreground font-mono">{item.title}</h3>
                    <p className="text-[11px] text-muted-foreground leading-normal">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="space-y-12">
          <div className="flex items-baseline justify-between border-b border-border pb-4">
            <h2 className="text-2xl font-medium tracking-tight">Let&apos;s Connect</h2>
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

             <div className="p-8 border border-border/50 flex flex-col justify-center items-center text-center space-y-4">
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
    title: "Society Management",
    description: "Full-stack society complaint management system with admin dashboard, role-based access, and status tracking.",
    tags: ["Python", "FastAPI", "React", "TypeScript", "Docker"],
    githubLink: "https://github.com/Suhas-Koheda/society-management",
    liveLink: "https://society-management-production-e949.up.railway.app",
    liveLinkText: "Live"
  },
  {
    title: "Telugu Tiny Stories",
    description: "A LLaMA-architecture language model implemented from scratch in PyTorch, trained on Telugu TinyStories with custom BPE tokenizer.",
    tags: ["Python", "PyTorch", "Transformers", "NLP"],
    githubLink: "https://github.com/Suhas-Koheda/telugu-tiny-stories"
  },
  {
    title: "Project Questionaire",
    description: "AI-powered interview question generator using LangGraph and Gemini AI. Analyzes code, resume, and JD to generate HLD, LLD, behavioral questions.",
    tags: ["Python", "LangGraph", "Gemini AI", "Streamlit"],
    githubLink: "https://github.com/Suhas-Koheda/project-questionaire"
  },
  {
    title: "Telugu Speech Pipeline",
    description: "An automated speech ingestion pipeline curating high-quality datasets using VAD, speaker diarization, and ASR.",
    tags: ["Python", "PyTorch", "PyAnote", "IndicConformer"],
    githubLink: "https://github.com/Suhas-Koheda/speech-pipeline"
  },
  {
    title: "ResumeForge",
    description: "A professional LaTeX resume generator with an AI-powered node-based visual editor. Features live PDF preview and AI text polishing.",
    tags: ["React", "TypeScript", "Vite", "Gemini AI"],
    githubLink: "https://github.com/Suhas-Koheda/resumeforge"
  },
  {
    title: "AI Video Knowledge Editor",
    description: "An AI-powered video editor that automatically enriches standard video content with contextual Knowledge Cards.",
    tags: ["Python", "FastAPI", "PySide6", "Playwright"],
    githubLink: "https://github.com/Suhas-Koheda/video-editor"
  },
  {
    title: "Indian Legal Analytics",
    description: "Full-stack legal analytics platform analyzing 42,000+ Supreme Court cases with interactive dashboards and Gemini-powered legal assistant.",
    tags: ["Python", "Streamlit", "LangChain", "Analytics"],
    githubLink: "https://github.com/Suhas-Koheda/Indian-Legal-Analytics"
  },
  {
    title: "MovieBuff",
    description: "Cross-platform movie browsing application supporting Android, iOS, and Desktop using Kotlin Multiplatform with shared business logic.",
    tags: ["Kotlin Multiplatform", "Compose", "Ktor"],
    githubLink: "https://github.com/Suhas-Koheda/MBuff"
  }
];
