"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, Github, MoveUpRight } from "lucide-react";
import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import { projects } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const FILTERS = [
  { key: "all", label: "all" },
  { key: "llm", label: "llm" },
  { key: "voice", label: "voice" },
  { key: "systems", label: "systems" },
] as const;

type FilterKey = (typeof FILTERS)[number]["key"];

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const [filter, setFilter] = useState<FilterKey>("all");

  const inDomain = projects.filter((p) => filter === "all" || p.domain === filter);
  const visible = showAll ? inDomain : inDomain.filter((p) => p.featured);

  return (
    <Reveal className="mb-10 sm:mb-12">
      <SectionHeading index="06" title="Things I've built" subtitle="inference · shipped to production" id="projects" />
      <div className="mb-4 flex flex-wrap gap-1.5">
        {FILTERS.map((f) => {
          const count = projects.filter((p) => f.key === "all" || p.domain === f.key).length;
          const active = filter === f.key;
          return (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                "cursor-pointer rounded-full border px-3 py-1 font-mono text-[11px] transition-colors",
                active
                  ? "border-accent bg-accent text-bg"
                  : "border-line bg-card text-muted hover:border-line-strong hover:text-fg"
              )}
            >
              {f.label} <span className={active ? "opacity-70" : "text-faint"}>{count}</span>
            </button>
          );
        })}
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {visible.map((project, i) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
            whileHover={{ y: -4 }}
            className="group relative flex flex-col overflow-hidden rounded-xl border border-line bg-card p-4 transition-colors hover:border-accent/40"
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-accent opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-10" />
            <div className="mb-2 flex items-start justify-between gap-2">
              <h3 className="font-display text-sm font-semibold text-fg sm:text-base">
                {project.title}
              </h3>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} on GitHub`}
                className="shrink-0 text-faint transition-colors hover:text-accent"
              >
                <Github className="h-4 w-4" />
              </a>
            </div>
            <p className="mb-4 line-clamp-3 flex-1 text-xs leading-relaxed text-muted sm:text-sm">
              {project.description}
            </p>
            <div className="flex items-center justify-between gap-2">
              <a
                href={project.demo ?? project.github}
                target={project.demo?.startsWith("/") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-accent transition-colors hover:text-accent-2"
              >
                View project
                <MoveUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <div className="flex flex-wrap justify-end gap-1">
                {project.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-line bg-accent-soft px-2 py-0.5 font-mono text-[9px] text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
      <div className="mt-5 flex justify-center">
        <button
          onClick={() => setShowAll((s) => !s)}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-line px-4 py-2 font-mono text-xs text-muted transition-colors hover:border-accent hover:text-accent"
        >
          {showAll ? (
            <>
              show featured only <ChevronUp className="h-3.5 w-3.5" />
            </>
          ) : (
            <>
              show all {inDomain.length} projects <ChevronDown className="h-3.5 w-3.5" />
            </>
          )}
        </button>
      </div>
    </Reveal>
  );
}