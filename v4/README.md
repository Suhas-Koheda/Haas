# Suhas Koheda — Portfolio v4

Next.js portfolio with an **LLM × Voice AI** theme. Same content as `v3`
(profile, skills, GitHub stats, experience, education, projects, blog,
Spotify "on repeat", quotes, Hyderabad skyline), rebuilt as a Next.js
App Router application.

## Theme

- Black page with **Sarvam AI orange** (`#e6651b`) details, cream light mode toggle
- Streaming-token hero text, animated voice waveform, system-prompt bio card
- Interactive voice-AI concept demo (Telugu speech → streaming tokens)
- LLM/voice token ticker, research-focus cards, project filters (llm / voice / systems)
- Terminal-style section labels and monospace accents
- Blog supports Markdown **and** Jupyter notebooks (`.ipynb`) with
  code/output toggles, copy buttons, images, HTML tables and ANSI tracebacks

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS v4
- framer-motion, lucide-react
- react-markdown + remark-gfm + rehype-highlight

## Run

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # production build
pnpm start
```

## Content

All content lives in `src/data/portfolio.ts`. Blog posts are files in
`public/blog/` (`.md` or `.ipynb`), rendered at `/blog/<slug>`.