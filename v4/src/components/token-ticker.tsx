import { tokenVocab } from "@/data/portfolio";

/** Infinite marquee of LLM / voice-AI vocabulary — the site's "token stream". */
export default function TokenTicker() {
  const tokens = [...tokenVocab, ...tokenVocab];
  return (
    <div
      className="relative mb-10 overflow-hidden rounded-xl border border-line bg-card py-2.5 sm:mb-12"
      aria-hidden="true"
    >
      <div className="token-marquee flex w-max items-center gap-6 px-3">
        {tokens.map((token, i) => (
          <span key={i} className="flex items-center gap-6 font-mono text-[11px] text-muted">
            <span className="whitespace-nowrap">{token}</span>
            <span className="text-faint">·</span>
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-bg to-transparent" />
    </div>
  );
}