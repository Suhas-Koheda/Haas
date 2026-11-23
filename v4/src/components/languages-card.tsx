"use client";

import { useTheme } from "@/components/theme-provider";
import { githubUsername } from "@/data/portfolio";

export default function LanguagesCard() {
  const { mode } = useTheme();

  const params =
    mode === "dark"
      ? "bg_color=120c07&title_color=e6651b&text_color=c4ac94&icon_color=f38858"
      : "bg_color=ffffff&title_color=e6651b&text_color=5c4632&icon_color=a5460f";

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://github-readme-stats.vercel.app/api/top-langs?username=${githubUsername}&layout=compact&langs_count=10&hide_border=true&${params}`}
        alt="Most used languages"
        className="block w-full"
      />
    </div>
  );
}