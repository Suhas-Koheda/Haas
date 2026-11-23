"use client";

import { useEffect, useState } from "react";
import { Mic, Play, RotateCcw } from "lucide-react";
import Waveform from "@/components/waveform";
import { voiceDemo } from "@/data/portfolio";

/**
 * Concept demo of a voice-AI pipeline: press play and watch the
 * waveform "transcribe" Telugu speech into streaming tokens.
 */
export default function VoiceDemo() {
  const [playing, setPlaying] = useState(false);
  const [chars, setChars] = useState(0);
  const done = chars >= voiceDemo.telugu.length;

  useEffect(() => {
    if (!playing || done) return;
    const t = setTimeout(() => setChars((c) => c + 1), 65);
    return () => clearTimeout(t);
  }, [playing, chars, done]);

  const start = () => {
    setChars(0);
    setPlaying(true);
  };

  return (
    <div className="mt-4 overflow-hidden rounded-xl border border-line bg-card">
      <div className="flex items-center justify-between border-b border-line px-4 py-2">
        <span className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-faint">
          <Mic className="h-3 w-3 text-accent" />
          {voiceDemo.label}
        </span>
        <span className="rounded-full border border-line px-2 py-0.5 font-mono text-[9px] text-faint">
          concept demo
        </span>
      </div>
      <div className="flex items-center gap-4 px-4 py-3">
        <button
          onClick={playing && !done ? undefined : start}
          aria-label={done ? "Replay transcription" : "Play transcription demo"}
          className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-accent text-bg transition-transform hover:scale-105 active:scale-95"
        >
          {done ? <RotateCcw className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
        </button>
        <Waveform className="h-7 min-w-0 flex-1" bars={40} animated={playing && !done} />
        <span className="hidden shrink-0 font-mono text-[10px] text-faint sm:block">16kHz</span>
      </div>
      <div className="border-t border-line px-4 py-3">
        <p className="min-h-6 text-sm text-fg">
          {playing || done ? (
            <>
              {voiceDemo.telugu.slice(0, chars)}
              {!done && <span className="cursor-blink ml-0.5 inline-block h-3.5 w-[6px] bg-accent align-middle" />}
            </>
          ) : (
            <span className="font-mono text-[11px] text-faint">
              press play to stream tokens from the speech pipeline…
            </span>
          )}
        </p>
        {done && (
          <p className="mt-1.5 font-mono text-[11px] text-faint">↳ {voiceDemo.english}</p>
        )}
      </div>
    </div>
  );
}