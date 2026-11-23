"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Reveal from "@/components/reveal";
import Waveform from "@/components/waveform";
import { profile, quotes } from "@/data/portfolio";

export default function Footer() {
  const [quote, setQuote] = useState(quotes[0]);

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  return (
    <footer>
      <Reveal className="py-8 text-center sm:py-10">
        <div className="mb-7 flex items-center justify-center gap-3">
          <div className="h-px w-14 bg-gradient-to-r from-transparent to-accent/50" />
          <Waveform bars={9} className="h-4" />
          <div className="h-px w-14 bg-gradient-to-l from-transparent to-accent/50" />
        </div>
        <blockquote className="mx-auto mb-7 max-w-md px-4">
          <p className="font-display text-lg italic leading-relaxed text-muted sm:text-xl">
            &ldquo;{quote}&rdquo;
          </p>
        </blockquote>
        <p className="font-mono text-[11px] text-faint">
          crafted with purpose — <span className="text-accent">@{profile.handle}</span>
        </p>
      </Reveal>

      <div className="flex items-center justify-between px-1 pb-2 font-mono text-[10px] text-faint">
        <span>{profile.name}</span>
        <span>2026</span>
      </div>
      <div className="relative left-1/2 w-screen -translate-x-1/2">
        <Image
          src="/hyderabad.png"
          alt="Hyderabad skyline"
          width={1600}
          height={400}
          className="block w-full"
          unoptimized
        />
      </div>
    </footer>
  );
}