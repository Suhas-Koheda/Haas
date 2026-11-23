"use client";

import { useTheme } from "@/components/theme-provider";
import { githubUsername } from "@/data/portfolio";

interface GitHubChartProps {
  blueSvg: string | null;
  orangeSvg: string | null;
}

export default function GitHubChart({ blueSvg, orangeSvg }: GitHubChartProps) {
  const { mode } = useTheme();
  const svg = mode === "dark" ? blueSvg : orangeSvg;
  const empty = mode === "dark" ? "#120c07" : "#ffffff";
  const color = mode === "dark" ? "2f81f7" : "e6651b";

  const html = svg
    ? svg.replace(/#ebedf0/gi, empty).replace(/#eeeeee/gi, empty)
    : null;

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface p-2">
      {html ? (
        <div
          className="[&>svg]:block [&>svg]:h-auto [&>svg]:w-full"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`https://ghchart.rshah.org/${color}/${githubUsername}`}
          alt="GitHub contribution chart"
          className="block w-full"
        />
      )}
    </div>
  );
}