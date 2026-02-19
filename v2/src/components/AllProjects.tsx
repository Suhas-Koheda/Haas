"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, X } from "lucide-react";
import { projectsData, languageFilters } from "@/lib/projectsData";
import { motion, AnimatePresence } from "framer-motion";

export default function AllProjects() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filteredProjects = selectedFilter === "All" 
    ? projectsData 
    : projectsData.filter(p => (p.primaryLanguage === selectedFilter) || (p.technologies && p.technologies.includes(selectedFilter)));

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full py-4 mt-8 rounded-xl border border-dashed border-border text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors flex items-center justify-center gap-2 font-mono text-sm uppercase tracking-wider"
      >
        View All Projects
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-xl overflow-y-auto"
          >
            <div className="min-h-screen p-6 md:p-12 max-w-7xl mx-auto space-y-12">
              <div className="flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-md py-4 z-10 border-b border-border/50">
                <div className="flex items-center gap-4">
                  <h2 className="text-3xl font-bold tracking-tight">All Projects</h2>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-2">
                {languageFilters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`px-3 py-1 text-xs font-mono border rounded-full transition-colors ${
                      selectedFilter === filter 
                        ? "bg-foreground text-background border-foreground" 
                        : "border-border text-muted-foreground hover:border-foreground/50"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {/* Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <div 
                    key={project.id || project.name} 
                    className="flex flex-col bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow h-full"
                  >
                    <div className="flex items-start justify-between mb-4">
                      {project.githubLink ? (
                         <Link href={project.githubLink} target="_blank" className="flex items-center gap-2 hover:underline decoration-1 underline-offset-4 group">
                          <h3 className="text-lg font-semibold truncate max-w-[200px]" title={project.name}>
                            {project.name}
                          </h3>
                          <ArrowUpRight size={16} className="text-muted-foreground opacity-50 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      ) : (
                        <h3 className="text-lg font-semibold truncate" title={project.name}>
                          {project.name}
                        </h3>
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                      {project.description}
                    </p>

                    <div className="mt-auto pt-4 border-t border-border/50">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies?.slice(0, 4).map((tech) => (
                          <span 
                            key={tech} 
                            className="px-2 py-0.5 text-[10px] font-mono border border-border rounded-full text-muted-foreground bg-muted/30"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies?.length > 4 && (
                          <span className="px-2 py-0.5 text-[10px] font-mono text-muted-foreground">
                            +{project.technologies.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
