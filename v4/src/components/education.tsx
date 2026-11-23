"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, GraduationCap } from "lucide-react";
import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import { education } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export default function Education() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <Reveal className="mb-10 sm:mb-12">
      <SectionHeading index="05" title="Education" subtitle="pre-training · foundations" id="education" />
      <div className="space-y-3">
        {education.map((edu, i) => {
          const open = expanded === i;
          const hasDetails = (edu.details?.length ?? 0) > 0;
          return (
            <div
              key={edu.institution}
              className={cn(
                "overflow-hidden rounded-xl border bg-card transition-colors",
                open ? "border-accent-2/40" : "border-line hover:border-line-strong"
              )}
            >
              <button
                onClick={() => hasDetails && setExpanded(open ? null : i)}
                className={cn("w-full p-4 text-left", hasDetails && "cursor-pointer")}
                aria-expanded={open}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 shrink-0 text-accent-2" />
                      <span className="font-display text-sm font-semibold text-fg sm:text-base">
                        {edu.institution}
                      </span>
                    </div>
                    <p className="text-sm text-muted">
                      {edu.degree} in {edu.field}
                    </p>
                    {edu.grade && (
                      <p className="mt-1 font-mono text-[11px] text-accent">grade: {edu.grade}</p>
                    )}
                    <p className="mt-1 font-mono text-[11px] text-faint sm:hidden">
                      {edu.period} · {edu.location}
                    </p>
                  </div>
                  <div className="hidden text-right sm:block">
                    <p className="font-mono text-xs text-muted">{edu.period}</p>
                    <p className="mt-0.5 font-mono text-[11px] text-faint">{edu.location}</p>
                  </div>
                  {hasDetails && (
                    <ChevronDown
                      className={cn(
                        "mt-1 h-4 w-4 shrink-0 text-faint transition-transform duration-200",
                        open && "rotate-180 text-accent-2"
                      )}
                    />
                  )}
                </div>
              </button>
              <AnimatePresence initial={false}>
                {open && hasDetails && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <ul className="space-y-2 border-t border-line px-4 pb-4 pt-3">
                      {edu.details!.map((detail) => (
                        <li key={detail} className="flex items-start gap-2 text-sm text-muted">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-2" />
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