"use client";

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { Eye, EyeOff, FileCode, Check, Copy } from 'lucide-react';

export interface IpynbCell {
  cell_type: 'markdown' | 'code' | 'raw';
  execution_count?: number | null;
  metadata?: Record<string, unknown>;
  source: string | string[];
  outputs?: IpynbOutput[];
}

export interface IpynbOutput {
  output_type: 'stream' | 'execute_result' | 'display_data' | 'error';
  name?: string; // for stream
  text?: string | string[]; // for stream
  data?: {
    'text/plain'?: string | string[];
    'text/html'?: string | string[];
    'image/png'?: string;
    'image/jpeg'?: string;
    'image/svg+xml'?: string | string[];
    'application/json'?: Record<string, unknown>;
    [key: string]: unknown;
  };
  execution_count?: number;
  ename?: string; // for error
  evalue?: string; // for error
  traceback?: string[]; // for error
}

export interface IpynbNotebook {
  cells: IpynbCell[];
  metadata?: {
    kernelspec?: {
      display_name?: string;
      language?: string;
      name?: string;
    };
    language_info?: {
      name?: string;
      version?: string;
    };
  };
  nbformat: number;
  nbformat_minor: number;
}

interface IpynbRendererProps {
  notebook: IpynbNotebook | string;
}

function joinSource(source: string | string[]): string {
  if (Array.isArray(source)) {
    return source.join('');
  }
  return source || '';
}

function ansiToHtml(lines: string[]): string {
  const joined = lines.join('\n');
  
  // Escape HTML
  let processed = joined
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
    
  // Regexp to match ANSI escape sequences
  const ansiRegex = /\x1B\[([0-9;]*)m/g;
  let openSpans = 0;
  
  processed = processed.replace(ansiRegex, (match, p1) => {
    if (p1 === '0' || p1 === '') {
      let closeTags = '';
      while (openSpans > 0) {
        closeTags += '</span>';
        openSpans--;
      }
      return closeTags;
    }
    
    const codes = p1.split(';');
    const classes: string[] = [];
    let isBold = false;
    
    for (let i = 0; i < codes.length; i++) {
      const code = parseInt(codes[i]);
      if (code === 1) {
        isBold = true;
      } else if (code >= 30 && code <= 37) {
        const colors = [
          'text-neutral-900 dark:text-neutral-400',
          'text-red-700 dark:text-red-400',
          'text-emerald-800 dark:text-emerald-400',
          'text-amber-800 dark:text-yellow-400',
          'text-blue-800 dark:text-blue-400',
          'text-purple-800 dark:text-purple-400',
          'text-teal-800 dark:text-cyan-400',
          'text-neutral-200 dark:text-neutral-100'
        ];
        classes.push(colors[code - 30]);
      } else if (code === 39) {
        classes.push('text-foreground');
      } else if (code >= 40 && code <= 47) {
        const bgColors = [
          'bg-black',
          'bg-red-500/10',
          'bg-emerald-500/10',
          'bg-yellow-500/10',
          'bg-blue-500/10',
          'bg-purple-500/10',
          'bg-cyan-500/10',
          'bg-neutral-200/10'
        ];
        classes.push(bgColors[code - 40]);
      }
    }
    
    if (isBold) classes.push('font-bold');
    
    if (classes.length > 0) {
      openSpans++;
      return `<span class="${classes.join(' ')}">`;
    }
    
    return '';
  });
  
  while (openSpans > 0) {
    processed += '</span>';
    openSpans--;
  }
  
  // Support literal representation in JSON too
  processed = processed.replace(/\\u001b\[([0-9;]*)m/g, (match, p1) => {
    if (p1 === '0' || p1 === '') return '</span>';
    const code = parseInt(p1.split(';')[0]);
    if (code === 31) return '<span class="text-red-700 dark:text-red-400">';
    if (code === 32) return '<span class="text-emerald-800 dark:text-emerald-400">';
    if (code === 36) return '<span class="text-teal-800 dark:text-cyan-400">';
    return '<span>';
  });

  return processed;
}

export default function IpynbRenderer({ notebook }: IpynbRendererProps) {
  const [showCode, setShowCode] = useState(true);
  const [showOutputs, setShowOutputs] = useState(true);
  const [copiedCellIndex, setCopiedCellIndex] = useState<number | null>(null);

  // Parse if string is passed
  let parsedNotebook: IpynbNotebook;
  try {
    parsedNotebook = typeof notebook === 'string' ? JSON.parse(notebook) : notebook;
  } catch {
    return (
      <div className="p-6 border border-red-500/20 bg-red-500/5 text-red-500 rounded-xl space-y-2">
        <h3 className="font-bold">Invalid Notebook Format</h3>
        <p className="text-sm">Failed to parse JSON. Make sure this is a valid .ipynb file.</p>
      </div>
    );
  }

  if (!parsedNotebook || !parsedNotebook.cells) {
    return (
      <div className="p-6 border border-red-500/20 bg-red-500/5 text-red-500 rounded-xl">
        <p className="text-sm">Notebook contains no cells or has an unrecognized schema.</p>
      </div>
    );
  }

  const kernelName = parsedNotebook.metadata?.kernelspec?.display_name || 
                     parsedNotebook.metadata?.language_info?.name || 'Python';

  const copyCellCode = (codeText: string, idx: number) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCellIndex(idx);
    setTimeout(() => setCopiedCellIndex(null), 2000);
  };

  const renderOutput = (output: IpynbOutput) => {
    switch (output.output_type) {
      case 'stream': {
        const isStderr = output.name === 'stderr';
        const text = joinSource(output.text || '');
        return (
          <pre className={`text-xs font-mono p-4 rounded-lg overflow-x-auto border ${
            isStderr 
              ? 'bg-red-500/5 border-red-500/10 text-red-600 dark:text-red-400' 
              : 'bg-muted/30 border-border/40 text-neutral-850 dark:text-neutral-300 dark:bg-muted/20'
          }`}>
            {text}
          </pre>
        );
      }
      case 'execute_result':
      case 'display_data': {
        if (!output.data) return null;
        
        // 1. Render Image (PNG)
        if (output.data['image/png']) {
          return (
            <div className="bg-white p-4 rounded-xl border border-border/80 inline-block max-w-full shadow-inner">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={`data:image/png;base64,${output.data['image/png']}`}
                alt="Cell Visualization Output"
                className="max-h-[500px] object-contain mx-auto"
              />
            </div>
          );
        }
        
        // 2. Render Image (JPEG)
        if (output.data['image/jpeg']) {
          return (
            <div className="bg-white p-4 rounded-xl border border-border/80 inline-block max-w-full shadow-inner">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={`data:image/jpeg;base64,${output.data['image/jpeg']}`}
                alt="Cell Visualization Output"
                className="max-h-[500px] object-contain mx-auto"
              />
            </div>
          );
        }
        
        // 3. Render SVG
        if (output.data['image/svg+xml']) {
          const svgContent = joinSource(output.data['image/svg+xml']);
          return (
            <div 
              className="bg-white p-4 rounded-xl border border-border inline-block max-w-full overflow-x-auto shadow-inner"
              dangerouslySetInnerHTML={{ __html: svgContent }}
            />
          );
        }

        // 4. Render HTML (e.g. Pandas DataFrames)
        if (output.data['text/html']) {
          const htmlContent = joinSource(output.data['text/html']);
          return (
            <div 
              className="overflow-x-auto p-2 text-sm bg-card rounded-xl border border-border/50 max-w-full scrollbar-thin
                         [&_table]:w-full [&_table]:border-collapse [&_th]:border [&_th]:border-border/60 [&_th]:p-2 [&_th]:bg-muted/40 [&_td]:border [&_td]:border-border/60 [&_td]:p-2 [&_tr:hover]:bg-muted/10 font-sans"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          );
        }

        // 5. Render plain text
        if (output.data['text/plain']) {
          const text = joinSource(output.data['text/plain']);
          return (
            <pre className="text-xs font-mono p-4 rounded-lg overflow-x-auto border border-border/40 bg-muted/10 text-neutral-850 dark:text-neutral-300">
              {text}
            </pre>
          );
        }
        
        return null;
      }
      case 'error': {
        const tracebackHtml = ansiToHtml(output.traceback || []);
        return (
          <div className="border border-red-500/20 bg-red-500/5 rounded-xl p-4 overflow-x-auto">
            <div className="text-red-700 dark:text-red-400 font-semibold text-xs mb-2 font-mono">
              {output.ename}: {output.evalue}
            </div>
            <pre 
              className="text-xs font-mono leading-relaxed whitespace-pre text-red-700 dark:text-red-300/90"
              dangerouslySetInnerHTML={{ __html: tracebackHtml }}
            />
          </div>
        );
      }
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Notebook Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 rounded-xl border border-border bg-card/50 backdrop-blur-sm shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
            <FileCode size={20} />
          </div>
          <div>
            <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Kernel</div>
            <div className="text-sm font-semibold">{kernelName}</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 self-stretch sm:self-auto">
          <button
            onClick={() => setShowCode(!showCode)}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
              showCode 
                ? 'bg-foreground text-background border-foreground' 
                : 'bg-transparent text-muted-foreground border-border hover:text-foreground'
            }`}
          >
            {showCode ? <EyeOff size={14} /> : <Eye size={14} />}
            {showCode ? 'Hide Code' : 'Show Code'}
          </button>
          
          <button
            onClick={() => setShowOutputs(!showOutputs)}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
              showOutputs 
                ? 'bg-foreground text-background border-foreground' 
                : 'bg-transparent text-muted-foreground border-border hover:text-foreground'
            }`}
          >
            {showOutputs ? <EyeOff size={14} /> : <Eye size={14} />}
            {showOutputs ? 'Hide Outputs' : 'Show Outputs'}
          </button>
        </div>
      </div>

      {/* Cells List */}
      <div className="space-y-6">
        {parsedNotebook.cells.map((cell, idx) => {
          const sourceText = joinSource(cell.source);
          
          if (cell.cell_type === 'markdown') {
            return (
              <div 
                key={idx} 
                className="prose prose-lg dark:prose-invert prose-neutral max-w-none pl-16 py-2 border-l-2 border-transparent text-neutral-900 dark:text-neutral-200 prose-p:text-neutral-900 dark:prose-p:text-neutral-300 prose-headings:text-neutral-950 dark:prose-headings:text-white prose-strong:text-black dark:prose-strong:text-white prose-code:text-black dark:prose-code:text-white"
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({...props}) => <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl mt-8 mb-4 border-b pb-2" {...props} />,
                    h2: ({...props}) => <h2 className="scroll-m-20 pb-1 text-2xl font-semibold tracking-tight mt-6 mb-3" {...props} />,
                    h3: ({...props}) => <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-4 mb-2" {...props} />,
                    p: ({...props}) => <p className="leading-7 [&:not(:first-child)]:mt-4 mb-3" {...props} />,
                    ul: ({...props}) => <ul className="my-4 ml-6 list-disc [&>li]:mt-1.5" {...props} />,
                    ol: ({...props}) => <ol className="my-4 ml-6 list-decimal [&>li]:mt-1.5" {...props} />,
                    pre: ({children}) => <pre className="p-4 bg-muted/40 rounded-xl border border-border/40 overflow-x-auto my-4">{children}</pre>,
                    code: ({className, children, ...props}: { className?: string; children?: React.ReactNode }) => {
                      const match = /language-(\w+)/.exec(className || '');
                      const isInline = !match;
                      return isInline ? (
                        <code className="relative rounded bg-muted/80 px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-neutral-900 dark:text-neutral-100" {...props}>
                          {children}
                        </code>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                    blockquote: ({...props}) => <blockquote className="mt-4 border-l-2 pl-4 italic text-neutral-700 dark:text-neutral-400" {...props} />,
                    a: ({...props}) => <a className="font-medium underline underline-offset-4 hover:text-emerald-500 transition-colors" {...props} />,
                  }}
                >
                  {sourceText}
                </ReactMarkdown>
              </div>
            );
          }

          if (cell.cell_type === 'code') {
            return (
              <div 
                key={idx} 
                className="group/cell relative border-l-2 border-transparent hover:border-emerald-500/20 transition-all duration-300"
              >
                {/* Code Input Area */}
                {showCode && (
                  <div className="flex items-start gap-4">
                    {/* Execution label */}
                    <div className="w-12 text-right select-none font-mono text-[10px] text-neutral-600 dark:text-neutral-400 pt-3 shrink-0">
                      {cell.execution_count !== undefined 
                        ? `In [${cell.execution_count || ' '}]:` 
                        : 'In [ ]:'}
                    </div>
                    {/* Code editor mockup */}
                    <div className="grow min-w-0">
                      <div className="relative rounded-xl overflow-hidden border border-border bg-muted/15 dark:bg-muted/5 hover:border-border-hover transition-colors">
                        <div className="flex justify-between items-center px-4 py-1.5 bg-muted/20 border-b border-border/40 text-[9px] font-mono text-neutral-600 dark:text-neutral-400">
                          <span className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            python
                          </span>
                          <button
                            onClick={() => copyCellCode(sourceText, idx)}
                            className="hover:text-foreground transition-colors flex items-center gap-1"
                            title="Copy code"
                          >
                            {copiedCellIndex === idx ? (
                              <>
                                <Check size={10} className="text-emerald-500" />
                                <span className="text-emerald-500">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy size={10} />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                        <div className="prose prose-sm max-w-none dark:prose-invert prose-neutral p-4 overflow-x-auto text-neutral-900 dark:text-neutral-200">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeHighlight]}
                            components={{
                              pre: ({children}) => <pre className="p-0 m-0 bg-transparent border-0 overflow-x-auto">{children}</pre>,
                              code: ({children}) => <code className="p-0 bg-transparent text-xs font-mono leading-relaxed text-neutral-900 dark:text-neutral-100">{children}</code>
                            }}
                          >
                            {`\`\`\`python\n${sourceText}\n\`\`\``}
                          </ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Code Outputs Area */}
                {showOutputs && cell.outputs && cell.outputs.length > 0 && (
                  <div className={`space-y-3 ${showCode ? 'mt-3' : ''}`}>
                    {cell.outputs.map((output, outIdx) => (
                      <div key={outIdx} className="flex items-start gap-4">
                        <div className="w-12 text-right select-none font-mono text-[10px] text-neutral-600 dark:text-neutral-400 pt-1.5 shrink-0">
                          {output.execution_count !== undefined 
                            ? `Out [${output.execution_count}]:` 
                            : ''}
                        </div>
                        <div className="grow min-w-0">
                          {renderOutput(output)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          // Fallback for raw cells or others
          return (
            <div key={idx} className="flex items-start gap-4">
              <div className="w-12 text-right select-none font-mono text-[10px] text-neutral-600 dark:text-neutral-400 pt-3 shrink-0">
                Raw:
              </div>
              <div className="grow min-w-0">
                <pre className="text-xs font-mono p-4 rounded-xl border border-border/50 bg-muted/10 text-neutral-850 dark:text-neutral-300 overflow-x-auto">
                  {sourceText}
                </pre>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
