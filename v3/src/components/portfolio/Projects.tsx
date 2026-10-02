import { motion } from "framer-motion";
import { Github, ExternalLink, MoveUpRight } from "lucide-react";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { ANIMATION } from "../../lib/constants";
import type { Project } from "../../types/portfolio";

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const { colors, mode } = useTheme();
  const [showAll, setShowAll] = useState(false);

  return (
    <motion.section
      variants={ANIMATION.fadeIn}
      className="mb-5 sm:mb-6 relative overflow-hidden"
    >
      <div className="relative z-10">
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
          <div
            className="h-6 sm:h-8 w-1 rounded-full"
            style={{ background: colors.primary }}
          />
          <h2 className="text-base sm:text-lg font-semibold" style={{ color: colors.foreground }}>
            Things I've built
          </h2>
        </div>

        <motion.div
          className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2 sm:gap-2.5"
          variants={ANIMATION.cardStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {projects.filter(p => showAll || p.featured).map((project, index) => (
            <motion.div
              key={project.id}
              variants={ANIMATION.cardItem}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              transition={ANIMATION.spring}
              className="group rounded-xl border overflow-hidden cursor-pointer"
              onClick={() => window.open(project.demo || project.github, "_blank", "noopener,noreferrer")}
              style={{
                backgroundColor: mode === "dark" ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.6)",
                borderColor: mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = mode === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)";
              }}
            >
              <div className="p-2.5 sm:p-3">
                <h3 className="font-semibold text-sm sm:text-base mb-1" style={{ color: colors.foreground }}>
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed line-clamp-2 mb-2 sm:mb-3" style={{ color: `${colors.foreground}99` }}>
                  {project.description}
                </p>
                <div className="flex items-center justify-between gap-2">
                  <a
                    href={project.demo || project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap cursor-pointer"
                    style={{ color: colors.primary }}
                  >
                    View Project
                    <MoveUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                  <div className="flex gap-1 flex-shrink-0">
                    {project.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full font-medium"
                        style={{
                          backgroundColor: mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
                          color: `${colors.foreground}b3`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <div className="flex justify-center mt-3 sm:mt-4">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs sm:text-sm font-medium border transition-all duration-200 cursor-pointer"
            style={{
              borderColor: mode === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)",
              color: colors.foreground,
            }}
          >
            {showAll ? "Show less" : "Show all projects"}
          </button>
        </div>
      </div>
    </motion.section>
  );
}
