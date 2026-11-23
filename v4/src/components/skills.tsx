"use client";

import { motion } from "framer-motion";
import {
  AudioWaveform,
  Brain,
  Code2,
  Cpu,
  Database,
  GitBranch,
  Globe,
  Hash,
  Languages,
  Layers,
  Mic,
  Package,
  Rocket,
  Search,
  Server,
  Terminal,
  Zap,
} from "lucide-react";
import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import { skills } from "@/data/portfolio";

const ICONS: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  code: Code2,
  brain: Brain,
  zap: Zap,
  layers: Layers,
  server: Server,
  terminal: Terminal,
  globe: Globe,
  database: Database,
  package: Package,
  rocket: Rocket,
  cpu: Cpu,
  mic: Mic,
  waveform: AudioWaveform,
  search: Search,
  graph: GitBranch,
  languages: Languages,
  hash: Hash,
};

export default function Skills() {
  return (
    <Reveal className="mb-10 sm:mb-12">
      <SectionHeading index="02" title="Capability stack" subtitle="model.weights · loaded" id="skills" />
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
        {skills.map((skill, i) => {
          const Icon = ICONS[skill.icon] ?? Code2;
          return (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              whileHover={{ y: -2 }}
              className="flex items-center gap-2 rounded-xl border border-line bg-card px-3 py-2 transition-colors hover:border-line-strong"
            >
              <Icon className="h-3.5 w-3.5 shrink-0" style={{ color: skill.color }} />
              <span className="whitespace-nowrap text-xs font-medium text-fg">{skill.name}</span>
            </motion.div>
          );
        })}
      </div>
    </Reveal>
  );
}