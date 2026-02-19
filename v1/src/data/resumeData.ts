export interface ResumeData {
  id: string;
  title: string;
  category: ResumeCategory;
  latexContent: string;
}

export const resumeCategories = ['AI/ML', 'Frontend', 'Java', 'Kotlin'] as const;
export type ResumeCategory = typeof resumeCategories[number];

export const resumeData: ResumeData[] = [
  {
    id: 'ai-ml',
    title: 'AI/ML Resume',
    category: 'AI/ML',
    latexContent: `\\documentclass[a4paper,10pt]{article}

\\usepackage{geometry}
\\geometry{left=0.75in, right=0.75in, top=0.75in, bottom=0.5in}
\\usepackage{enumitem}
\\usepackage{hyperref}
\\usepackage{titlesec}
\\usepackage{parskip}
\\usepackage{multicol}
\\usepackage{sectsty}
\\usepackage{ragged2e}

% Define a custom section format with an underline
\\titleformat{\\section}{
    \\large\\bfseries}{}{0em}{\\titlerule[0.5pt]\\vspace{0.5ex}}
\\titleformat{\\subsection}{
    \\bfseries}{}{0em}{\\titlerule[0.5pt]\\vspace{0.5ex}}

% Compact spacing
\\setlength{\\parskip}{0.4em}
\\setlength{\\parindent}{0em}

% Add custom styles to sections
\\sectionfont{\\uppercase}
\\subsectionfont{\\underline}

\\begin{document}

\\begin{center}
    \\textbf{\\LARGE Suhas Koheda}\\\\
    \\href{mailto:sharmasuhas450@gmail.com}{sharmasuhas450@gmail.com} \\hspace{10pt} | \\hspace{10pt} +91-7396824087 \\hspace{10pt} | \\hspace{10pt} \\href{https://github.com/suhas-koheda}{github.com/suhas-koheda} \\hspace{10pt} | \\hspace{10pt} \\href{https://suhask.dev}{Portfolio} \\hspace{10pt} | \\hspace{10pt} \\href{https://www.linkedin.com/in/ssk450/}{LinkedIn}
\\end{center}

\\section*{Education}
\\hline
\\textbf{Vellore Institute of Technology}, Chennai, India \\hfill 2023 – 2027\\\\
Computer Science - AIML — CGPA: 9.0

\\textbf{Nine Education Academy}, Hyderabad \\hfill 2021 – 2023\\\\
Telangana State Board of Intermediate Education — Aggregate: 93.5\\%

\\textbf{Sri Sai Public School}, Hyderabad \\hfill 2020 – 2021\\\\
ICSE (Class X) — CGPA: 9.2 

\\section*{Technical Skills}
\\hline
\\textbf{AI/ML Development:} \\\\
Python — LangChain — OpenAI APIs - Scikit-learn

\\textbf{Web Development:} \\\\
Flask - Fast-API's — JavaScript — React — NextJS \\\\

\\textbf{Databases \\& Tools:} \\\\
MongoDB — PostgreSQL — Git — Linux - AWS EC2 - 

\\section*{Projects}
\\hline
\\hfill
\\hfill
\\textbf{Automated Manager} \\hfill \\textit{Python — Google APIs — Gemini AI — LangChain — OAuth 2.0} \\hfill July 2025\\
Developed an AI-powered system that monitors Gmail inboxes and automatically creates Google Calendar events from email content. Implemented OAuth authentication, real-time email watching, and duplicate prevention using Google's Gemini 1.5 Flash model. Features include background operation, detailed logging, and comprehensive error handling.

\\begin{flushright}
\\href{https://github.com/Suhas-Koheda/suhas-koheda-automatedmanager}{Code} \\hspace{10pt} | \\hspace{10pt} No live website
\\end{flushright}
\\hfill
\\hfill
\\textbf{BloggerAI} \\hfill \\textit{Python — Flask — LangChain — Google Search API — Gemini AI} \\hfill June 2025\\
Created a research assistant that generates formatted technical news summaries using Google Search API and AI processing. Implemented a tool-calling agent with custom prompt engineering to produce consistently structured outputs. Features include real-time web searching, multi-point summarization, and source attribution.

\\begin{flushright}
\\href{https://github.com/Suhas-Koheda/suhas-koheda-bloggerai}{Code} \\hspace{10pt} | \\hspace{10pt} No live website
\\end{flushright}

\\section*{Open Source Contributions}
\\hline
\\textbf{LangChain4j — Spring Boot Starter for Gemini AI} \\hfill \\textit{Java — Spring Boot} \\hfill Oct 2024\\\\
Implemented Spring Boot starter configuration files for Gemini AI, published to Maven Central.

\\hfill
\\begin{flushright}
    \\href{https://github.com/langchain4j/langchain4j-spring/pull/74}{Code} \\hspace{10pt} | \\hspace{10pt} \\href{https://mvnrepository.com/artifact/dev.langchain4j/langchain4j-google-ai-gemini-spring-boot-starter}{Maven Repository}
\\end{flushright}

\\textbf{LangChain4j — Brave API Web Search Integration} \\hfill \\textit{Java} \\hfill Ongoing\\\\
Developing Brave API integration for web search functionality.

\\hfill
\\begin{flushright}
    \\href{https://github.com/langchain4j/langchain4j/pull/2188}{Code} \\hspace{10pt} | \\hspace{10pt} No live website
\\end{flushright}


\\section*{Work Experience}
\\hline
\\textbf{Daira Edtech} — \\textit{AI/ML Development Intern} \\hfill Jul 2025 – Present\\\\
Contributing to the development of intelligent systems by utilizing LangChain, OpenAI APIs, RAG, embedding-based solutions, Python, and Django.

\\textbf{Newton School Coding Club} — \\textit{Web Developer} \\hfill Sept 2024 – Present\\\\
Developed web applications using React/Next.js

\\textbf{Google Developer Club (GDG), VIT Chennai} — \\textit{Open Source Developer} \\hfill Oct 2024 – Present\\\\
Contributed to multiple projects with merged PRs. 

\\section*{Positions of Responsibility}
\\hline
\\textbf{Zero Bugs Club, Chennai} — \\textit{Design Lead (June 2024 - Sept 2024), Content Writer, Designer (Feb 2023 - May 2024)}\\\\
Led team of designers for tech events. Created design assets for club activities and events.

\\end{document}`,
  },
  {
    id: 'frontend',
    title: 'Frontend Resume',
    category: 'Frontend',
    latexContent: `\\documentclass[a4paper,10pt]{article}

\\usepackage{geometry}
\\geometry{left=0.75in, right=0.75in, top=0.75in, bottom=0.5in}
\\usepackage{enumitem}
\\usepackage{hyperref}
\\usepackage{titlesec}
\\usepackage{parskip}
\\usepackage{multicol}
\\usepackage{sectsty}
\\usepackage{ragged2e}

% Define a custom section format with an underline
\\titleformat{\\section}{
    \\large\\bfseries}{}{0em}{\\titlerule[0.5pt]\\vspace{0.5ex}}
\\titleformat{\\subsection}{
    \\bfseries}{}{0em}{\\titlerule[0.5pt]\\vspace{0.5ex}}

% Compact spacing
\\setlength{\\parskip}{0.4em}
\\setlength{\\parindent}{0em}

% Add custom styles to sections
\\sectionfont{\\uppercase}
\\subsectionfont{\\underline}

\\begin{document}

\\begin{center}
    \\textbf{\\LARGE Suhas Koheda}\\\\
    \\href{mailto:sharmasuhas450@gmail.com}{sharmasuhas450@gmail.com} \\hspace{10pt} | \\hspace{10pt} +91-7396824087 \\hspace{10pt} | \\hspace{10pt} \\href{https://github.com/suhas-koheda}{github.com/suhas-koheda} \\hspace{10pt} | \\hspace{10pt} \\href{https://suhask.dev}{Portfolio} \\hspace{10pt} | \\hspace{10pt} \\href{https://www.linkedin.com/in/ssk450/}{LinkedIn}
\\end{center}

\\section*{Education}
\\hline
\\textbf{Vellore Institute of Technology}, Chennai, India \\hfill 2023 – 2027\\\\
Computer Science - AIML — CGPA: 9.0

\\textbf{Nine Education Academy}, Hyderabad \\hfill 2021 – 2023\\\\
Telangana State Board of Intermediate Education — Aggregate: 93.5\\%

\\textbf{Sri Sai Public School}, Hyderabad \\hfill 2020 – 2021\\\\
ICSE (Class X) — CGPA: 9.2 

\\section*{Technical Skills}
\\hline
\\textbf{Frontend Development:} \\\\
TypeScript — JavaScript — React — Next.js — Tailwind CSS — Shadcn UI 

\\textbf{Backend \\& APIs:} \\\\
Node.js — Express — Flask — FastAPI — RESTful APIs  

\\textbf{UI/UX \\& Styling:} \\\\
CSS3 — Tailwind CSS — Responsive Design — Figma 

\\textbf{Tools \\& Platforms:} \\\\
Git — GitHub — Vercel — AWS EC2 — MongoDB — PostgreSQL

\\textbf{Additional:} \\\\
Python — LangChain — OpenAI APIs (AI/ML exposure)  

\\section*{Freelance Work}
\\hline
\\textbf{The Dusky Muse} \\hfill \\textit{TypeScript — Next.js — Framer Motion} \\hfill Freelance Project\\\\
Modern frontend development with responsive design, smooth animations, and performance optimization.
\\begin{flushright}
    \\href{https://github.com/Suhas-Koheda}{Code} \\hspace{10pt} | \\hspace{10pt} \\href{https://theduskymuse.com/}{Live Website}
\\end{flushright}

\\section*{Projects}
\\hline
\\hfill
\\textbf{Solana Voice Assistant} \\hfill \\textit{Next.js — TypeScript — Tailwind CSS — Solana Web3.js} \\hfill [2025]
Developed a voice-controlled Solana wallet and token swap application using Jupiter Swap API. Implemented wallet generation, balance checking, and token swapping functionality through voice commands with Web Speech API. Designed an intuitive UI with animated voice feedback, real-time transaction status, and dark/light mode support. Integrated with Solana blockchain for secure wallet operations and Jupiter API for token swaps with route optimization.

\\begin{flushright}
\\href{https://github.com/goodfornothing-code/juphack}{Code} \\hspace{10pt} | \\hspace{10pt} \\href{https://juphack.vercel.app}{Live} 
\\end{flushright}


\\hfill
\\textbf{E-Commerce Frontend} \\hfill \\textit{Next.js — TypeScript — Tailwind CSS — ShadCN UI} \\hfill [2025]
Developed a responsive e-commerce frontend with modern UI components and interactive shopping features. Implemented product listings, category filtering, cart functionality, and checkout flows using Next.js App Router. Designed a component library with ShadCN UI and custom Tailwind configurations for consistent styling. Features include mobile-responsive layouts, animated transitions, and dark mode support.

\\begin{flushright}
\\href{https://github.com/Suhas-Koheda/suhas-koheda-ecommercefrontend}{Code} \\hspace{10pt} | \\hspace{10pt} No live website
\\end{flushright}

\\section*{Hackathon Contributions}
\\hline
\\textbf{Bingo Social} \\hfill \\textit{TypeScript — Next.js — MongoDB} \\hfill DevsHouse Hackathon 2025\\\\
A social media web application with user authentication, posts with likes/comments, and real-time notifications.

\\hfill
\\begin{flushright}
    \\href{https://github.com/krishkalaria12/bingo}{Code} \\hspace{10pt} | \\hspace{10pt} \\href{https://bingo-social.vercel.app/}{Live Demo}
\\end{flushright}

\\textbf{FetchHive} \\hfill \\textit{TypeScript — Next.js — Redux} \\hfill HackNight\\\\
A job board application allowing users to browse, filter and apply for job listings with modern UI.

\\hfill
\\begin{flushright}
    \\href{https://github.com/krishkalaria12/fetchhive}{Code} \\hspace{10pt} | \\hspace{10pt} \\href{https://fetch-hive.vercel.app/}{Live Demo}
\\end{flushright}

\\section*{Work Experience}
\\hline
\\textbf{Daira Edtech} — \\textit{AI/ML Development Intern} \\hfill Jul 2025 – Present\\\\
Contributing to the development of intelligent systems by utilizing LangChain, OpenAI APIs, RAG, embedding-based solutions, Python, and Django. Collaborating with frontend teams for seamless integration.

\\textbf{Newton School Coding Club} — \\textit{Web Developer} \\hfill Sept 2024 – Present\\\\
Developed web applications using React/Next.js

\\textbf{Google Developer Club (GDG), VIT Chennai} — \\textit{Open Source Developer} \\hfill Oct 2024 – Present\\\\
Contributed to multiple projects with merged PRs. 

\\section*{Positions of Responsibility}
\\hline
\\textbf{Zero Bugs Club, Chennai} — \\textit{Design Lead (June 2024 - Sept 2024), Content Writer, Designer (Feb 2023 - May 2024)}\\\\
Led team of designers for tech events. Created design assets for club activities and events.

\\end{document}`,
  },
  {
    id: 'java',
    title: 'Java/Backend Resume',
    category: 'Java',
    latexContent: `\\documentclass[a4paper,10pt]{article}

\\usepackage{geometry}
\\geometry{left=0.75in, right=0.75in, top=0.75in, bottom=0.5in}
\\usepackage{enumitem}
\\usepackage{hyperref}
\\usepackage{titlesec}
\\usepackage{parskip}
\\usepackage{multicol}
\\usepackage{sectsty}
\\usepackage{ragged2e}

% Define a custom section format with an underline
\\titleformat{\\section}{
    \\large\\bfseries}{}{0em}{\\titlerule[0.5pt]\\vspace{0.5ex}}
\\titleformat{\\subsection}{
    \\bfseries}{}{0em}{\\titlerule[0.5pt]\\vspace{0.5ex}}

% Compact spacing
\\setlength{\\parskip}{0.4em}
\\setlength{\\parindent}{0em}

% Add custom styles to sections
\\sectionfont{\\uppercase}
\\subsectionfont{\\underline}

\\begin{document}

\\begin{center}
    \\textbf{\\LARGE Suhas Koheda}\\\\
    \\href{mailto:sharmasuhas450@gmail.com}{sharmasuhas450@gmail.com} \\hspace{10pt} | \\hspace{10pt} +91-7396824087 \\hspace{10pt} | \\hspace{10pt} \\href{https://github.com/suhas-koheda}{github.com/suhas-koheda} \\hspace{10pt} | \\hspace{10pt} \\href{https://suhask.dev}{Portfolio} \\hspace{10pt} | \\hspace{10pt} \\href{https://www.linkedin.com/in/ssk450/}{LinkedIn}
\\end{center}

\\section*{Education}
\\hline
\\textbf{Vellore Institute of Technology}, Chennai, India \\hfill 2023 – 2027\\\\
Computer Science - AIML — CGPA: 9.0

\\textbf{Nine Education Academy}, Hyderabad \\hfill 2021 – 2023\\\\
Telangana State Board of Intermediate Education — Aggregate: 93.5\\%

\\textbf{Sri Sai Public School}, Hyderabad \\hfill 2020 – 2021\\\\
ICSE (Class X) — CGPA: 9.2 

\\section*{Technical Skills}
\\hline
\\textbf{Backend Development:} \\\\
Java — Spring Boot — Java Servlets — Kotlin — Ktor — RESTful APIs

\\textbf{Frameworks \\& Libraries:} \\\\
LangChain4j — Spring Framework — Hibernate — JPA — Exposed ORM

\\textbf{Databases \\& Storage:} \\\\
PostgreSQL — MySQL — MongoDB — H2 Database

\\textbf{Tools \\& Platforms:} \\\\
Maven — Gradle — Git — Docker — AWS EC2 — JWT Authentication

\\textbf{Additional Technologies:} \\\\
Kotlin Multiplatform — Android Development — AI Integration (Gemini API)

\\section*{Open Source Contributions}
\\hline
\\textbf{LangChain4j — Spring Boot Starter for Gemini AI} \\hfill \\textit{Java — Spring Boot} \\hfill Oct 2024\\\\
Implemented Spring Boot starter configuration files for Gemini AI, published to Maven Central. Created auto-configuration classes, property binding, and integration tests.

\\hfill
\\begin{flushright}
    \\href{https://github.com/langchain4j/langchain4j-spring/pull/74}{Code} \\hspace{10pt} | \\hspace{10pt} \\href{https://mvnrepository.com/artifact/dev.langchain4j/langchain4j-google-ai-gemini-spring-boot-starter}{Maven Repository}
\\end{flushright}

\\textbf{LangChain4j — Brave API Web Search Integration} \\hfill \\textit{Java} \\hfill Ongoing\\\\
Developing Brave API integration for web search functionality with proper error handling and rate limiting.

\\hfill
\\begin{flushright}
    \\href{https://github.com/langchain4j/langchain4j/pull/2188}{Code} \\hspace{10pt} | \\hspace{10pt} No live website
\\end{flushright}

\\section*{Projects}
\\hline
\\textbf{Resume Matcher} \\hfill \\textit{Kotlin — Spring Boot — Langchain4j — Google Gemini — Apache PDFBox} \\hfill May 2025\\\\
Developed AI-powered resume analysis backend that evaluates resume-job description compatibility. Implemented PDF processing, AI integration with Gemini API, and RESTful endpoints for frontend communication.

\\begin{itemize}
    \\item Designed REST API endpoints for file uploads, analysis requests, and history retrieval
    \\item Implemented PDF text extraction using Apache PDFBox and AI text analysis
    \\item Created comprehensive error handling and validation middleware
\\end{itemize}

\\begin{flushright}
\\href{https://github.com/suhas-koheda/RM}{Code} \\hspace{10pt} | \\hspace{10pt} No live website
\\end{flushright}

\\textbf{MovieBuff} \\hfill \\textit{Kotlin Multiplatform — Compose Multiplatform — Ktor} \\hfill May 2025\\\\
Developed cross-platform movie browsing application with MVVM architecture. Implemented Coroutines and Flow for state management across Android, iOS, and Desktop platforms.

\\begin{flushright}
\\href{https://github.com/Suhas-Koheda/MBuff}{Code} \\hspace{10pt} | \\hspace{10pt} No live website
\\end{flushright}

\\textbf{Habit Tracker Backend} \\hfill \\textit{Kotlin — Ktor — PostgreSQL — Exposed ORM} \\hfill Dec 2024\\\\
Developed JWT-authenticated REST API with multiple endpoints for habit management. Implemented database operations using Exposed ORM with PostgreSQL for improved performance and type safety.

\\begin{flushright}
\\href{https://github.com/Suhas-Koheda/HabitTrackerBackend}{Code} \\hspace{10pt} | \\hspace{10pt} No live website
\\end{flushright}

\\textbf{Library Management System} \\hfill \\textit{Java — Spring Boot — Thymeleaf — MySQL} \\hfill 2024\\\\
Comprehensive library resource management system including book inventory, member registrations, and transaction management. Implemented MVC architecture with Spring Boot and Thymeleaf templating.

\\begin{flushright}
\\href{https://github.com/Suhas-Koheda/LMS-Java}{Code} \\hspace{10pt} | \\hspace{10pt} No live website
\\end{flushright}

\\section*{Work Experience}
\\hline
\\textbf{Daira Edtech} — \\textit{AI/ML Development Intern} \\hfill Jul 2025 – Present\\\\
Contributing to the development of intelligent systems by utilizing LangChain, OpenAI APIs, RAG, embedding-based solutions, Python, and Django. Implementing backend services and API integrations.

\\textbf{Newton School Coding Club} — \\textit{Web Developer} \\hfill Sept 2024 – Present\\\\
Developed web applications using React/Next.js with Java Spring Boot backends

\\textbf{Google Developer Club (GDG), VIT Chennai} — \\textit{Open Source Developer} \\hfill Oct 2024 – Present\\\\
Contributed to multiple Java and Kotlin projects with numerous merged PRs 

\\section*{Positions of Responsibility}
\\hline
\\textbf{Zero Bugs Club, Chennai} — \\textit{Design Lead (June 2024 - Sept 2024), Content Writer, Designer (Feb 2023 - May 2024)}\\\\
Led team of designers for tech events. Created design assets and technical documentation for club activities.

\\end{document}`,
  },
  {
    id: 'kotlin',
    title: 'Kotlin Resume',
    category: 'Kotlin',
    latexContent: `\\documentclass[a4paper,10pt]{article}

\\usepackage{geometry}
\\geometry{left=0.75in, right=0.75in, top=0.75in, bottom=0.5in}
\\usepackage{enumitem}
\\usepackage{hyperref}
\\usepackage{titlesec}
\\usepackage{parskip}
\\usepackage{multicol}
\\usepackage{sectsty}
\\usepackage{ragged2e}

% Define a custom section format with an underline
\\titleformat{\\section}{
    \\large\\bfseries}{}{0em}{\\titlerule[0.5pt]\\vspace{0.5ex}}
\\titleformat{\\subsection}{
    \\bfseries}{}{0em}{\\titlerule[0.5pt]\\vspace{0.5ex}}

% Compact spacing
\\setlength{\\parskip}{0.4em}
\\setlength{\\parindent}{0em}

% Add custom styles to sections
\\sectionfont{\\uppercase}
\\subsectionfont{\\underline}

\\begin{document}

\\begin{center}
    \\textbf{\\LARGE Suhas Koheda}\\\\
    \\href{mailto:sharmasuhas450@gmail.com}{sharmasuhas450@gmail.com} \\hspace{10pt} | \\hspace{10pt} +91-7396824087 \\hspace{10pt} | \\hspace{10pt} \\href{https://github.com/suhas-koheda}{github.com/suhas-koheda} \\hspace{10pt} | \\hspace{10pt} \\href{https://suhask.dev}{Portfolio} \\hspace{10pt} | \\hspace{10pt} \\href{https://www.linkedin.com/in/ssk450/}{LinkedIn}
\\end{center}

\\section*{Education}
\\hline
\\textbf{Vellore Institute of Technology}, Chennai, India \\hfill 2023 – 2027\\\\
Computer Science - AIML — CGPA: 9.0

\\textbf{Nine Education Academy}, Hyderabad \\hfill 2021 – 2023\\\\
Telangana State Board of Intermediate Education — Aggregate: 93.5\\%

\\textbf{Sri Sai Public School}, Hyderabad \\hfill 2020 – 2021\\\\
ICSE (Class X) — CGPA: 9.2 

\\section*{Technical Skills}
\\hline
\\textbf{Kotlin Development:} \\\\
Kotlin — Kotlin Multiplatform (KMP) — Kotlin/JVM — Kotlin/Native

\\textbf{Frameworks \\& Libraries:} \\\\
Ktor — Spring Boot — Compose Multiplatform — Coroutines — Flow

\\textbf{Mobile \\& Cross-Platform:} \\\\
Android Development — iOS Development — Desktop Applications

\\textbf{Backend Technologies:} \\\\
RESTful APIs — JWT Authentication — Exposed ORM — PostgreSQL

\\textbf{Tools \\& Platforms:} \\\\
IntelliJ IDEA — Android Studio — Gradle — Git — Docker

\\section*{Projects}
\\hline
\\textbf{Resume Matcher} \\hfill \\textit{Kotlin — Spring Boot — Langchain4j — Google Gemini — Apache PDFBox} \\hfill May 2025\\\\
Developed AI-powered resume analysis backend using Kotlin and Spring Boot. Implemented PDF processing, AI integration with Gemini API, and comprehensive RESTful endpoints with proper error handling and validation.

\\begin{itemize}
    \\item Built robust REST API with Kotlin data classes and Spring Boot annotations
    \\item Integrated Google Gemini AI for intelligent text analysis and matching algorithms
    \\item Implemented file upload handling and PDF text extraction with Apache PDFBox
\\end{itemize}

\\begin{flushright}
\\href{https://github.com/suhas-koheda/RM}{Code} \\hspace{10pt} | \\hspace{10pt} No live website
\\end{flushright}

\\textbf{MovieBuff} \\hfill \\textit{Kotlin Multiplatform — Compose Multiplatform — Coil — Ktor — Voyager} \\hfill May 2025\\\\
Cross-platform movie browsing application supporting Android, iOS, and Desktop. Implemented MVVM architecture with Kotlin Coroutines and Flow for reactive state management across all platforms.

\\begin{itemize}
    \\item Developed shared business logic using Kotlin Multiplatform
    \\item Created responsive UI with Compose Multiplatform for consistent user experience
    \\item Implemented navigation using Voyager and network requests with Ktor client
\\end{itemize}

\\begin{flushright}
\\href{https://github.com/Suhas-Koheda/MBuff}{Code} \\hspace{10pt} | \\hspace{10pt} No live website
\\end{flushright}

\\textbf{Habit Tracker Backend} \\hfill \\textit{Kotlin — Ktor — PostgreSQL — Exposed ORM — JWT} \\hfill Dec 2024\\\\
Backend API for habit tracking application built with Ktor framework. Implemented JWT-based authentication, CRUD operations with Exposed ORM, and PostgreSQL database integration.

\\begin{itemize}
    \\item Designed RESTful API endpoints with Ktor routing and serialization
    \\item Implemented type-safe database operations using Exposed ORM
    \\item Added comprehensive authentication and authorization middleware
\\end{itemize}

\\begin{flushright}
\\href{https://github.com/Suhas-Koheda/HabitTrackerBackend}{Code} \\hspace{10pt} | \\hspace{10pt} No live website
\\end{flushright}

\\section*{Open Source Contributions}
\\hline
\\textbf{LangChain4j — Spring Boot Starter for Gemini AI} \\hfill \\textit{Java — Spring Boot} \\hfill Oct 2024\\\\
Contributed to major open-source AI library by implementing Spring Boot starter configuration for Google Gemini AI integration. Published to Maven Central for community use.

\\begin{flushright}
    \\href{https://github.com/langchain4j/langchain4j-spring/pull/74}{Code} \\hspace{10pt} | \\hspace{10pt} \\href{https://mvnrepository.com/artifact/dev.langchain4j/langchain4j-google-ai-gemini-spring-boot-starter}{Maven Repository}
\\end{flushright}

\\section*{Work Experience}
\\hline
\\textbf{Daira Edtech} — \\textit{AI/ML Development Intern} \\hfill Jul 2025 – Present\\\\
Contributing to the development of intelligent systems by utilizing LangChain, OpenAI APIs, RAG, embedding-based solutions, Python, and Django. Working on Kotlin integrations for Android applications.

\\textbf{Newton School Coding Club} — \\textit{Web Developer} \\hfill Sept 2024 – Present\\\\
Developed web applications using modern tech stacks including Kotlin backends

\\textbf{Google Developer Club (GDG), VIT Chennai} — \\textit{Open Source Developer} \\hfill Oct 2024 – Present\\\\
Contributed to multiple Kotlin and Android projects with numerous merged PRs

\\section*{Positions of Responsibility}
\\hline
\\textbf{Zero Bugs Club, Chennai} — \\textit{Design Lead (June 2024 - Sept 2024), Content Writer, Designer (Feb 2023 - May 2024)}\\\\
Led team of designers for tech events. Created technical documentation and design assets for club activities and programming workshops.

\\end{document}`,
  }
];
