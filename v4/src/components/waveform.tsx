"use client";

import { cn } from "@/lib/utils";

/**
 * Animated voice-AI waveform. Bar heights are deterministic
 * (index-based) so server and client render identically.
 */
export default function Waveform({
  bars = 48,
  className,
  animated = true,
}: {
  bars?: number;
  className?: string;
  animated?: boolean;
}) {
  return (
    <div className={cn("flex h-8 items-center gap-[3px]", className)} aria-hidden="true">
      {Array.from({ length: bars }).map((_, i) => {
        const height = 22 + 78 * Math.abs(Math.sin(i * 0.55) * Math.cos(i * 0.23));
        const delay = (i % 12) * 0.11;
        const duration = 1 + (i % 5) * 0.16;
        return (
          <span
            key={i}
            className={cn("w-[3px] rounded-full", animated && "wave-bar")}
            style={{
              height: `${height}%`,
              background: `linear-gradient(to top, var(--accent), var(--accent-2))`,
              opacity: 0.35 + 0.65 * Math.abs(Math.sin(i * 0.4)),
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
            }}
          />
        );
      })}
    </div>
  );
}