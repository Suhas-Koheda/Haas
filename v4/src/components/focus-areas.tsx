"use client";

import { motion } from "framer-motion";
import { Brain, Mic, Workflow } from "lucide-react";
import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import { focusAreas } from "@/data/portfolio";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  brain: Brain,
  mic: Mic,
  workflow: Workflow,
};

export default function FocusAreas() {
  return (
    <Reveal className="mb-10 sm:mb-12">
      <SectionHeading index="01" title="Research focus" subtitle="attention.heads · where the compute goes" id="focus" />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {focusAreas.map((area, i) => {
          const Icon = ICONS[area.icon] ?? Brain;
          return (
            <motion.div
              key={area.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="rounded-xl border border-line bg-card p-4 transition-colors hover:border-line-strong"
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="rounded-lg bg-accent-soft p-2 text-accent">
                  <Icon className="h-4 w-4" />
                </span>
                <h3 className="font-display text-sm font-semibold text-fg">{area.label}</h3>
              </div>
              <p className="mb-3 font-mono text-[10px] tracking-wide text-faint">{area.tagline}</p>
              <ul className="space-y-2">
                {area.points.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-xs leading-relaxed text-muted">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </Reveal>
  );
}