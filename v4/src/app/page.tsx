import Nav from "@/components/nav";
import Hero from "@/components/hero";
import TokenTicker from "@/components/token-ticker";
import FocusAreas from "@/components/focus-areas";
import Skills from "@/components/skills";
import GitHubStats from "@/components/github-stats";
import Experience from "@/components/experience";
import Education from "@/components/education";
import Projects from "@/components/projects";
import BlogList from "@/components/blog-list";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      {/* Ambient background: dot grid + drifting glow orbs */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, var(--dot) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
        aria-hidden="true"
      />
      <div
        className="glow-orb pointer-events-none fixed -top-32 left-1/4 h-96 w-96 rounded-full blur-3xl"
        style={{ background: "var(--glow)" }}
        aria-hidden="true"
      />
      <div
        className="glow-orb pointer-events-none fixed right-0 top-1/3 h-80 w-80 rounded-full blur-3xl"
        style={{ background: "var(--glow-2)", animationDelay: "-8s" }}
        aria-hidden="true"
      />

      <Nav />

      <main className="relative mx-auto max-w-3xl px-4 pb-0 pt-24 sm:px-6 sm:pt-28">
        <Hero />
        <TokenTicker />
        <FocusAreas />
        <Skills />
        <GitHubStats />
        <Experience />
        <Education />
        <Projects />
        <BlogList />
        <Footer />
      </main>
    </div>
  );
}