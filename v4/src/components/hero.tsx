"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Download, Pause, Play, Repeat } from "lucide-react";
import Image from "next/image";
import VoiceDemo from "@/components/voice-demo";
import { onRepeat, profile, roles, socials } from "@/data/portfolio";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

const SOCIAL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
};

/** LLM-style streaming text: types out each role token by token, then deletes. */
function useStreamedRole() {
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const role = roles[roleIndex % roles.length];
    let i = 0;
    let deleting = false;
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (!deleting) {
        i++;
        setText(role.slice(0, i));
        if (i >= role.length) {
          deleting = true;
          timeout = setTimeout(tick, 2200);
          return;
        }
        timeout = setTimeout(tick, 42 + Math.random() * 40);
      } else {
        i -= 3;
        if (i <= 0) {
          setText("");
          setRoleIndex((r) => r + 1);
          return;
        }
        setText(role.slice(0, i));
        timeout = setTimeout(tick, 18);
      }
    };

    timeout = setTimeout(tick, 300);
    return () => clearTimeout(timeout);
  }, [roleIndex]);

  return text;
}

export default function Hero() {
  const streamedRole = useStreamedRole();
  const [playing, setPlaying] = useState(false);

  return (
    <section id="top" className="mb-10 scroll-mt-24 sm:mb-12">
      {/* Identity row */}
      <div className="mb-6 flex items-start gap-4 sm:gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative shrink-0"
        >
          <div className="avatar-ring absolute -inset-1 rounded-[22px] bg-[conic-gradient(from_0deg,var(--accent),var(--accent-2),transparent_65%,var(--accent))] opacity-70" />
          <Image
            src={profile.avatar}
            alt={profile.name}
            width={144}
            height={144}
            priority
            className="relative h-24 w-24 rounded-[18px] border border-line object-cover sm:h-32 sm:w-32"
          />
          <span className="absolute -bottom-1 -right-1 flex items-center gap-1 rounded-full border border-line bg-surface px-2 py-0.5 font-mono text-[9px] text-accent">
            <span className="pulse-dot h-1 w-1 rounded-full bg-accent" />
            online
          </span>
        </motion.div>

        <div className="min-w-0 flex-1 pt-1">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="font-display text-3xl font-bold tracking-tight text-fg sm:text-4xl"
          >
            {profile.name}
          </motion.h1>
          <div className="mt-2 flex h-6 items-center font-mono text-xs text-accent sm:text-sm">
            <span className="mr-2 text-faint">&gt;</span>
            <span>{streamedRole}</span>
            <span className="cursor-blink ml-0.5 inline-block h-4 w-[7px] bg-accent" />
          </div>
          <p className="mt-2 font-mono text-[11px] text-faint">
            {profile.location} · {profile.handle}
          </p>
        </div>

        <motion.a
          href={profile.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="hidden items-center gap-1.5 rounded-xl border border-line bg-card px-3 py-2 font-mono text-[11px] text-muted transition-colors hover:border-accent hover:text-accent sm:inline-flex"
        >
          <Download className="h-3 w-3" />
          resume.pdf
        </motion.a>
      </div>

      {/* System-prompt bio card */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="overflow-hidden rounded-2xl border border-line bg-card"
      >
        <div className="flex items-center justify-between border-b border-line px-4 py-2">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-accent/70" />
            <span className="h-2 w-2 rounded-full bg-accent-2/70" />
            <span className="h-2 w-2 rounded-full bg-line-strong" />
          </div>
          <span className="font-mono text-[10px] tracking-widest text-faint">
            system · prompt
          </span>
        </div>
        <p className="px-4 py-4 text-sm leading-relaxed text-muted sm:text-[15px]">
          {profile.bio}
        </p>
      </motion.div>

      {/* Voice AI concept demo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <VoiceDemo />
      </motion.div>

      {/* On repeat — Spotify */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-4"
      >
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <Repeat className="h-3.5 w-3.5 text-[#1DB954]" />
          <span className="text-faint">On repeat:</span>
          <span className="font-medium text-fg">
            {onRepeat.track} ; {onRepeat.artist}
          </span>
          <button
            onClick={() => setPlaying((p) => !p)}
            className="inline-flex cursor-pointer items-center gap-1 rounded-md border border-line bg-card px-2 py-0.5 text-xs font-medium text-fg transition-colors hover:border-line-strong"
          >
            {playing ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
            {playing ? "Pause" : "Play"}
          </button>
          <span className="ml-1 flex h-3 items-end gap-0.5">
            {[0, 0.2, 0.4].map((delay) => (
              <span
                key={delay}
                className="eq-bar h-full w-0.5 rounded-full bg-[#1DB954]"
                style={{ animationDelay: `${delay}s`, animationPlayState: playing ? "running" : "paused" }}
              />
            ))}
          </span>
        </div>
        {playing && (
          <div className="mt-3 overflow-hidden rounded-xl border border-line">
            <iframe
              src={onRepeat.spotifyEmbed}
              title={`${onRepeat.track} — ${onRepeat.artist}`}
              className="h-20 w-full border-0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            />
          </div>
        )}
      </motion.div>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45 }}
        className="mt-6 flex flex-wrap gap-3"
      >
        <a
          href={`mailto:${profile.email}`}
          className="cta-shimmer relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-accent to-accent-2 px-5 py-2.5 text-sm font-semibold text-bg shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <Calendar className="relative z-10 h-4 w-4" />
          <span className="relative z-10">Let&apos;s talk</span>
        </a>
        <a
          href="https://x.com/nlpctx"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-line-strong px-5 py-2.5 text-sm font-medium text-fg transition-all hover:border-accent hover:text-accent"
        >
          <Twitter className="h-4 w-4" />
          @nlpctx
        </a>
        <a
          href={profile.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-line px-5 py-2.5 text-sm font-medium text-muted transition-all hover:border-accent hover:text-accent sm:hidden"
        >
          <Download className="h-4 w-4" />
          Resume
        </a>
      </motion.div>

      {/* Socials */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.55 }}
        id="contact"
        className="mt-6 scroll-mt-24"
      >
        <p className="mb-2.5 font-mono text-[11px] tracking-widest text-faint">
          // find me on the internet
        </p>
        <div className="flex flex-wrap gap-2">
          {socials.map((social) => {
            const Icon = SOCIAL_ICONS[social.icon] ?? Mail;
            return (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-card px-3 py-1.5 text-sm text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <Icon className="h-3.5 w-3.5" />
                {social.name}
              </motion.a>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}