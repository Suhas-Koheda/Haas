"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import { experience } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export default function Experience() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <Reveal className="mb-10 sm:mb-12">
      <SectionHeading index="04" title="Where I've worked" subtitle="fine-tuning · real-world data" id="experience" />
      <div className="space-y-3">
        {experience.map((exp, i) => {
          const open = expanded === i;
          return (
            <div
              key={exp.company}
              className={cn(
                "overflow-hidden rounded-xl border bg-card transition-colors",
                open ? "border-accent/40" : "border-line hover:border-line-strong"
              )}
            >
              <button
                onClick={() => setExpanded(open ? null : i)}
                className="w-full cursor-pointer p-4 text-left"
                aria-expanded={open}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <span className="font-display text-sm font-semibold text-fg sm:text-base">
                        {exp.company}
                      </span>
                      <span className="rounded-full border border-accent/30 bg-accent-soft px-2 py-0.5 font-mono text-[10px] text-accent">
                        {exp.type}
                      </span>
                    </div>
                    <p className="text-sm text-muted">{exp.role}</p>
                    <p className="mt-1 font-mono text-[11px] text-faint sm:hidden">
                      {exp.period} · {exp.location}
                    </p>
                  </div>
                  <div className="hidden text-right sm:block">
                    <p className="font-mono text-xs text-muted">{exp.period}</p>
                    <p className="mt-0.5 font-mono text-[11px] text-faint">{exp.location}</p>
                  </div>
                  <ChevronDown
                    className={cn(
                      "mt-1 h-4 w-4 shrink-0 text-faint transition-transform duration-200",
                      open && "rotate-180 text-accent"
                    )}
                  />
                </div>
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <ul className="space-y-2 border-t border-line px-4 pb-4 pt-3">
                      {exp.details.map((detail) => (
                        <li key={detail} className="flex items-start gap-2 text-sm text-muted">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </Reveal>
  );
}