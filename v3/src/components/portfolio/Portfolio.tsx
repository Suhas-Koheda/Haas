import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ThemeProvider, useTheme } from "../../context/ThemeContext";
import { ANIMATION } from "../../lib/constants";
import { log, flushLogsToGitHub } from "../../lib/logger";
import { Hero, Experience, Education, Projects, SkillSlider, Blog, Footer, GitHubChart, SpotifyWidget, IllustrationOverlay } from "./index";
import type { PortfolioData } from "../../types/portfolio";

interface PortfolioProps {
  data: PortfolioData;
}

function PortfolioContent({ data }: PortfolioProps) {
  const { colors, mode } = useTheme();
  const [logUrl, setLogUrl] = useState<string | null>(null);

  useEffect(() => {
    log(`page loaded (${window.location.pathname})`);
    const onUnload = () => log("page unloaded");
    window.addEventListener("beforeunload", onUnload);
    return () => window.removeEventListener("beforeunload", onUnload);
  }, []);

  return (
    <div style={{ backgroundColor: colors.background, minHeight: "100vh" }}>
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, ${mode === "dark" ? `${colors.foreground}14` : `${colors.foreground}45`} 1.2px, transparent 1.2px)`,
          backgroundSize: "14px 14px",
        }}
      />
      <motion.div
        className="relative max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 pb-0"
        initial="hidden"
        animate="visible"
        variants={ANIMATION.stagger}
      >
        <Hero profile={data.profile} roles={data.roles} socials={data.socials} />

        <motion.section variants={ANIMATION.fadeIn} className="mb-6">
          <p className="text-xs sm:text-sm mb-2 sm:mb-3" style={{ color: `${colors.foreground}99` }}>
            My <span style={{ color: colors.foreground }} className="font-medium">skills</span>
          </p>
          <SkillSlider skills={data.skills} />
        </motion.section>

        <GitHubChart username={data.github} />
        <SpotifyWidget />
        <Experience experiences={data.experience} />
        <Education education={data.education} />
        <Projects projects={data.projects} />
        <Blog blogs={data.blogs} />
        <Footer quotes={data.quotes} handle={data.profile.handle} />

        <motion.div variants={ANIMATION.fadeIn} className="mt-0">
          <div className="flex items-center justify-between text-[10px] sm:text-xs px-1 mb-2" style={{ color: `${colors.foreground}80` }}>
            <span>{data.profile.name}</span>
            <span>2026</span>
          </div>
          <div className="relative left-1/2 -translate-x-1/2 w-dvw max-w-none">
            <img src="/hyderabad.png" alt="Hyderabad skyline" className="w-full block" />
          </div>
        </motion.div>
      </motion.div>

      {data.illustration && <IllustrationOverlay />}
      <button
        onClick={async () => {
          const url = await flushLogsToGitHub();
          if (url) setLogUrl(url);
        }}
        className="fixed bottom-4 left-4 z-50 px-3 py-1.5 rounded-lg text-xs font-medium border backdrop-blur-md cursor-pointer"
        style={{
          backgroundColor: "rgba(255,255,255,0.7)",
          borderColor: "rgba(0,0,0,0.1)",
          color: "#0a0a0a",
        }}
      >
        {logUrl ? "Logs uploaded ✓" : "Upload logs"}
      </button>
    </div>
  );
}

export default function Portfolio({ data }: PortfolioProps) {
  return (
    <ThemeProvider initialTheme={data.theme}>
      <PortfolioContent data={data} />
    </ThemeProvider>
  );
}
