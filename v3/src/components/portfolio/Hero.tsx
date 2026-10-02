import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Download, Calendar, Sun, Moon, Twitter, Repeat, Play, Pause } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { ANIMATION } from "../../lib/constants";
import type { Profile, Social } from "../../types/portfolio";
import Icon from "./Icon";

interface HeroProps {
  profile: Profile;
  roles: string[];
  socials: Social[];
}

export default function Hero({ profile, roles, socials }: HeroProps) {
  const { colors, mode, setMode } = useTheme();
  const [roleIndex, setRoleIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <motion.section
      variants={ANIMATION.fadeIn}
      className="mb-6"
    >
      <div className="flex items-start gap-4 sm:gap-5 mb-5">
        <motion.img
          whileHover={{ scale: 1.02 }}
          src={profile.avatar}
          alt={profile.name}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border shadow"
          style={{ borderColor: `${colors.foreground}1a` }}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight" style={{ color: colors.foreground }}>
              {profile.name}
            </h1>
            <button
              onClick={(e) => setMode(mode === "dark" ? "light" : "dark", e)}
              className="p-1.5 rounded-lg transition-colors cursor-pointer"
              style={{ color: `${colors.foreground}99` }}
              aria-label="Toggle theme"
            >
              {mode === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
          <div className="h-5 overflow-hidden mt-1">
            <AnimatePresence mode="wait">
              <motion.p
                key={roleIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-sm"
                style={{ color: `${colors.foreground}80` }}
              >
                {roles[roleIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
        <motion.a
          href={profile.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer"
          style={{
            backgroundColor: mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
            color: `${colors.foreground}b3`,
          }}
        >
          <Download className="w-3 h-3" />
          Resume
        </motion.a>
      </div>

      <p className="text-sm sm:text-base leading-relaxed mb-5" style={{ color: `${colors.foreground}b3` }}>
        {profile.bio}
      </p>

      <hr style={{ borderColor: `${colors.foreground}14` }} className="my-4" />

      <div className="flex items-center gap-2 text-sm mb-4">
        <Repeat className="w-3.5 h-3.5" style={{ color: "#1DB954" }} />
        <span style={{ color: `${colors.foreground}80` }}>On repeat:</span>
        <span className="font-medium" style={{ color: colors.foreground }}>Panjaa ; Yuvan Shankar Raja</span>
        <button
          onClick={() => setPlaying(!playing)}
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium cursor-pointer"
          style={{ backgroundColor: mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)", color: colors.foreground }}
        >
          {playing ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          {playing ? "Pause" : "Play"}
        </button>
        <span className="flex items-end gap-0.5 h-3 ml-1">
          <span className="w-0.5 h-full rounded-full eq-bar" style={{ backgroundColor: "#1DB954" }} />
          <span className="w-0.5 h-full rounded-full eq-bar" style={{ backgroundColor: "#1DB954", animationDelay: "0.2s" }} />
          <span className="w-0.5 h-full rounded-full eq-bar" style={{ backgroundColor: "#1DB954", animationDelay: "0.4s" }} />
        </span>
      </div>

      {playing && (
        <div className="mb-4 rounded-xl overflow-hidden border" style={{ borderColor: `${colors.foreground}14` }}>
          <iframe
            src="https://open.spotify.com/embed/track/0znGOM7mIuYsGgckd99sLh?utm_source=generator&theme=0&autoplay=1"
            title="Panjaa — Yuvan Shankar Raja"
            className="w-full h-20 border-0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          />
        </div>
      )}


      <hr style={{ borderColor: `${colors.foreground}14` }} className="my-4" />

      <div className="flex flex-wrap gap-2 sm:gap-3 mb-5 sm:mb-6">
        <motion.a
          href={`mailto:${profile.email}`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{ background: "linear-gradient(to right, #ea580c, #c2410c)", boxShadow: `0 10px 15px -3px ${colors.primary}40` }}
          className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium text-white relative overflow-hidden group transition-all duration-300 hover:shadow-lg cursor-pointer"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 relative z-10" />
          <span className="relative z-10">Let's talk</span>
        </motion.a>
        <motion.a
          href="https://x.com/nlpctx"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium border-2 transition-all duration-300 cursor-pointer"
          style={{
            borderColor: mode === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)",
            color: colors.foreground,
          }}
        >
          <Twitter className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          @nlpctx
        </motion.a>
      </div>

      <div>
        <p className="text-xs sm:text-sm mb-2 sm:mb-3" style={{ color: `${colors.foreground}99` }}>
          Find me on the <span style={{ color: colors.foreground }} className="font-medium">internet</span>
        </p>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {socials.map((social) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl text-xs sm:text-sm transition-all duration-200 cursor-pointer"
              style={{
                backgroundColor: mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                color: `${colors.foreground}b3`,
              }}
            >
              <Icon name={social.icon} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {social.name}
            </motion.a>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
