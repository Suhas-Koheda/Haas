"use client";

import { useState } from "react";
import { Check, Copy, Eye, EyeOff, FileCode } from "lucide-react";
import Markdown from "@/components/markdown";
import { cn } from "@/lib/utils";

interface IpynbCell {
  cell_type: "markdown" | "code" | "raw";
  execution_count?: number | null;
  source: string | string[];
  outputs?: IpynbOutput[];
}

interface IpynbOutput {
  output_type: "stream" | "execute_result" | "display_data" | "error";
  name?: string;
  text?: string | string[];
  data?: Record<string, string | string[] | undefined>;
  execution_count?: number;
  ename?: string;
  evalue?: string;
  traceback?: string[];
}

interface IpynbNotebook {
  cells: IpynbCell[];
  metadata?: {
    kernelspec?: { display_name?: string };
    language_info?: { name?: string };
  };
}

function joinSource(source: string | string[] | undefined): string {
  if (Array.isArray(source)) return source.join("");
  return source ?? "";
}

/** Convert ANSI-colored tracebacks to themed HTML spans. */
function ansiToHtml(lines: string[]): string {
  let html = lines
    .join("\n")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  let open = 0;
  html = html.replace(/\x1B\[([0-9;]*)m/g, (_match, codes: string) => {
    if (codes === "0" || codes === "") {
      let close = "";
      while (open > 0) {
        close += "</span>";
        open--;
      }
      return close;
    }
    const classes: string[] = [];
    for (const part of codes.split(";")) {
      const code = parseInt(part, 10);
      if (code === 1) classes.push("font-bold");
      else if (code >= 30 && code <= 37) {
        const colors = [
          "text-fg", "text-red-400", "text-emerald-400", "text-yellow-400",
          "text-blue-400", "text-purple-400", "text-cyan-400", "text-fg",
        ];
        classes.push(colors[code - 30]);
      }
    }
    if (classes.length === 0) return "";
    open++;
    return `<span class="${classes.join(" ")}">`;
  });
  while (open > 0) {
    html += "</span>";
    open--;
  }
  return html;
}

function Output({ output }: { output: IpynbOutput }) {
  switch (output.output_type) {
    case "stream": {
      const isStderr = output.name === "stderr";
      return (
        <pre
          className={cn(
            "overflow-x-auto rounded-lg border p-4 font-mono text-xs",
            isStderr
              ? "border-red-500/20 bg-red-500/5 text-red-400"
              : "border-line bg-card text-muted"
          )}
        >
          {joinSource(output.text)}
        </pre>
      );
    }
    case "execute_result":
    case "display_data": {
      const data = output.data;
      if (!data) return null;

      const png = data["image/png"];
      if (typeof png === "string") {
        return (
          <div className="inline-block max-w-full rounded-xl border border-line bg-white p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`data:image/png;base64,${png}`} alt="Cell output" className="mx-auto max-h-[500px] object-contain" />
          </div>
        );
      }
      const jpeg = data["image/jpeg"];
      if (typeof jpeg === "string") {
        return (
          <div className="inline-block max-w-full rounded-xl border border-line bg-white p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`data:image/jpeg;base64,${jpeg}`} alt="Cell output" className="mx-auto max-h-[500px] object-contain" />
          </div>
        );
      }
      const svg = data["image/svg+xml"];
      if (svg) {
        return (
          <div
            className="inline-block max-w-full overflow-x-auto rounded-xl border border-line bg-white p-4"
            dangerouslySetInnerHTML={{ __html: joinSource(svg) }}
          />
        );
      }
      const html = data["text/html"];
      if (html) {
        return (
          <div
            className="nb-html max-w-full overflow-x-auto rounded-xl border border-line bg-card p-3 text-sm text-muted"
            dangerouslySetInnerHTML={{ __html: joinSource(html) }}
          />
        );
      }
      const plain = data["text/plain"];
      if (plain) {
        return (
          <pre className="overflow-x-auto rounded-lg border border-line bg-card p-4 font-mono text-xs text-muted">
            {joinSource(plain)}
          </pre>
        );
      }
      return null;
    }
    case "error":
      return (
        <div className="overflow-x-auto rounded-xl border border-red-500/20 bg-red-500/5 p-4">
          <div className="mb-2 font-mono text-xs font-semibold text-red-400">
            {output.ename}: {output.evalue}
          </div>
          <pre
            className="whitespace-pre font-mono text-xs leading-relaxed text-red-300/90"
            dangerouslySetInnerHTML={{ __html: ansiToHtml(output.traceback ?? []) }}
          />
        </div>
      );
    default:
      return null;
  }
}

export default function Notebook({ notebook }: { notebook: string }) {
  const [showCode, setShowCode] = useState(true);
  const [showOutputs, setShowOutputs] = useState(true);
  const [copied, setCopied] = useState<number | null>(null);

  let parsed: IpynbNotebook;
  try {
    parsed = JSON.parse(notebook);
  } catch {
    return (
      <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6 text-red-400">
        <h3 className="font-bold">Invalid notebook format</h3>
        <p className="text-sm">Failed to parse JSON. Make sure this is a valid .ipynb file.</p>
      </div>
    );
  }

  if (!parsed?.cells) {
    return (
      <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6 text-sm text-red-400">
        Notebook contains no cells or has an unrecognized schema.
      </div>
    );
  }

  const kernel =
    parsed.metadata?.kernelspec?.display_name ?? parsed.metadata?.language_info?.name ?? "Python";

  const copyCell = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopied(idx);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Toolbar */}
      <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-line bg-card p-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-accent-soft p-2 text-accent">
            <FileCode size={20} />
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-faint">kernel</div>
            <div className="text-sm font-semibold text-fg">{kernel}</div>
          </div>
        </div>
        <div className="flex items-center gap-2 self-stretch sm:self-auto">
          <button
            onClick={() => setShowCode((s) => !s)}
            className={cn(
              "flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border px-3 py-1.5 font-mono text-xs transition-all sm:flex-initial",
              showCode
                ? "border-accent bg-accent text-bg"
                : "border-line text-muted hover:text-fg"
            )}
          >
            {showCode ? <EyeOff size={13} /> : <Eye size={13} />}
            {showCode ? "hide code" : "show code"}
          </button>
          <button
            onClick={() => setShowOutputs((s) => !s)}
            className={cn(
              "flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border px-3 py-1.5 font-mono text-xs transition-all sm:flex-initial",
              showOutputs
                ? "border-accent-2 bg-accent-2 text-bg"
                : "border-line text-muted hover:text-fg"
            )}
          >
            {showOutputs ? <EyeOff size={13} /> : <Eye size={13} />}
            {showOutputs ? "hide outputs" : "show outputs"}
          </button>
        </div>
      </div>

      {/* Cells */}
      <div className="space-y-6">
        {parsed.cells.map((cell, idx) => {
          const source = joinSource(cell.source);

          if (cell.cell_type === "markdown") {
            return <Markdown key={idx} content={source} />;
          }

          if (cell.cell_type === "code") {
            return (
              <div key={idx} className="group/cell">
                {showCode && (
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-12 shrink-0 select-none pt-3 text-right font-mono text-[10px] text-faint">
                      In [{cell.execution_count ?? " "}]:
                    </div>
                    <div className="min-w-0 grow">
                      <div className="overflow-hidden rounded-xl border border-line bg-[var(--code-bg)] transition-colors hover:border-line-strong">
                        <div className="flex items-center justify-between border-b border-line px-4 py-1.5 font-mono text-[9px] text-faint">
                          <span className="flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                            python
                          </span>
                          <button
                            onClick={() => copyCell(source, idx)}
                            className="flex cursor-pointer items-center gap-1 transition-colors hover:text-fg"
                            title="Copy code"
                          >
                            {copied === idx ? (
                              <>
                                <Check size={10} className="text-accent" />
                                <span className="text-accent">copied</span>
                              </>
                            ) : (
                              <>
                                <Copy size={10} />
                                <span>copy</span>
                              </>
                            )}
                          </button>
                        </div>
                        <div className="overflow-x-auto p-4 [&_pre]:m-0! [&_pre]:border-0! [&_pre]:bg-transparent! [&_pre]:p-0!">
                          <Markdown content={`\`\`\`python\n${source}\n\`\`\``} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {showOutputs && cell.outputs && cell.outputs.length > 0 && (
                  <div className={cn("space-y-3", showCode && "mt-3")}>
                    {cell.outputs.map((output, outIdx) => (
                      <div key={outIdx} className="flex items-start gap-3 sm:gap-4">
                        <div className="w-12 shrink-0 select-none pt-1.5 text-right font-mono text-[10px] text-faint">
                          {output.execution_count !== undefined ? `Out [${output.execution_count}]:` : ""}
                        </div>
                        <div className="min-w-0 grow">
                          <Output output={output} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <div key={idx} className="flex items-start gap-3 sm:gap-4">
              <div className="w-12 shrink-0 select-none pt-3 text-right font-mono text-[10px] text-faint">
                Raw:
              </div>
              <pre className="min-w-0 grow overflow-x-auto rounded-xl border border-line bg-card p-4 font-mono text-xs text-muted">
                {source}
              </pre>
            </div>
          );
        })}
      </div>
    </div>
  );
}