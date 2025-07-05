"use client";
import { GitMerge, Package, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface Contribution {
  name: string;
  description: string;
  technologies: string[];
  prLink: string;
  mavenLink?: string;
  org: string;
}

const contributionsData: Contribution[] = [
  {
    name: 'Spring Boot Starter for Gemini AI',
    description: 'Implemented Spring Boot starter configuration for Google\'s AI Gemini Pro, enabling seamless integration within the LangChain4j framework. This contribution is published to Maven Central.',
    technologies: ['Java', 'Spring Boot', 'LangChain4j', 'Gemini API'],
    prLink: 'https://github.com/langchain4j/langchain4j-spring/pull/74',
    mavenLink: 'https://central.sonatype.com/artifact/dev.langchain4j/langchain4j-spring-boot-starter-vertex-ai-gemini',
    org: 'LangChain4j'
  },
  // Future contributions can be added here
];

const OpenSourceContributions = () => {
  return (
    <section className="py-12 sm:py-16 px-4 bg-[var(--background-alt)]">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl font-bold text-center mb-10 sm:mb-14 text-[var(--foreground)]"
        >
          My Open Source Contributions
        </motion.h2>

        <div className="space-y-8">
          {contributionsData.map((contrib, index) => (
            <motion.div
              key={contrib.name}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="p-6 rounded-xl border border-[var(--border)] shadow-lg bg-[var(--card)] hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-start">
                <div className="flex-shrink-0 mr-0 mb-4 sm:mr-6 sm:mb-0 text-[var(--primary)]">
                  <Star size={32} />
                </div>
                <div className="flex-grow font-sans"> {/* Apply font-sans to content area */}
                  <h3 className="text-xl font-semibold text-[var(--card-foreground)] mb-1 font-mono">{contrib.name}</h3> {/* Contrib name mono */}
                  <p className="text-sm font-medium text-[var(--muted-foreground)] mb-2"> {/* Org line sans */}
                    Contribution to <span className="font-semibold text-[var(--primary)]">{contrib.org}</span>
                  </p>
                  <p className="text-sm text-[var(--muted-foreground)] mb-4"> {/* Description sans */}
                    {contrib.description}
                  </p>

                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-[var(--foreground)] mb-1.5 uppercase tracking-wider font-mono">Key Technologies:</h4> {/* Title mono */}
                    <div className="flex flex-wrap gap-1.5"> {/* Tech tags will inherit font-sans */}
                      {contrib.technologies.map(tech => (
                        <span key={tech} className={`px-2 py-0.5 text-xs rounded-full
                          bg-[var(--tag-bg)] text-[var(--tag-text)] border border-[var(--tag-border)]`}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 items-center text-sm">
                    <a
                      href={contrib.prLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors duration-200" // Links will inherit font-sans
                    >
                      <GitMerge size={16} className="mr-1.5" />
                      View Pull Request
                    </a>
                    {contrib.mavenLink && (
                      <a
                        href={contrib.mavenLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors duration-200" // Links will inherit font-sans
                      >
                        <Package size={16} className="mr-1.5" />
                        Maven Central
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          {contributionsData.length === 0 && (
            <p className="text-center text-[var(--muted-foreground)]">No open source contributions listed yet.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default OpenSourceContributions;
