import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import GitHubChart from "@/components/github-chart";
import LanguagesCard from "@/components/languages-card";
import { githubUsername } from "@/data/portfolio";

async function fetchChart(color: string): Promise<string | null> {
  try {
    const res = await fetch(`https://ghchart.rshah.org/${color}/${githubUsername}`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

export default async function GitHubStats() {
  // Fetch server-side: ghchart has no CORS headers, so client fetches fail.
  const [blueSvg, orangeSvg] = await Promise.all([
    fetchChart("2f81f7"),
    fetchChart("e6651b"),
  ]);

  return (
    <Reveal className="mb-10 sm:mb-12">
      <SectionHeading
        index="03"
        title="Training signal"
        subtitle={`contributions · @${githubUsername}`}
        id="github"
      />
      <GitHubChart blueSvg={blueSvg} orangeSvg={orangeSvg} />
      <p className="mb-2 mt-5 font-mono text-[11px] tracking-widest text-faint">
        // languages I work with
      </p>
      <LanguagesCard />
    </Reveal>
  );
}