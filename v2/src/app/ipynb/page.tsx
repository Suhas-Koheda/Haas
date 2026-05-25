"use client";

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { ArrowLeft, Upload, FileCode, Trash2, BookOpen, AlertCircle } from 'lucide-react';
import IpynbRenderer, { IpynbNotebook } from '@/components/IpynbRenderer';

export default function IpynbViewerPage() {
  const [notebookData, setNotebookData] = useState<IpynbNotebook | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [fileSize, setFileSize] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [dragActive, setDragActive] = useState<boolean>(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const processFile = (file: File) => {
    if (!file.name.endsWith('.ipynb')) {
      setError('Please upload a file with the .ipynb extension.');
      return;
    }
    setError('');
    setFileName(file.name);
    setFileSize((file.size / 1024).toFixed(1) + ' KB');

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const parsed = JSON.parse(text);
        if (!parsed.cells) {
          throw new Error('Not a valid Jupyter Notebook format (missing cells array).');
        }
        setNotebookData(parsed as IpynbNotebook);
      } catch (err) {
        setError('Error parsing notebook file: ' + (err instanceof Error ? err.message : 'Invalid JSON'));
        setNotebookData(null);
      }
    };
    reader.readAsText(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const loadDemoNotebook = () => {
    setError('');
    setFileName('attention_mechanism_demo.ipynb');
    setFileSize('14.2 KB');
    setNotebookData(demoNotebookJson as IpynbNotebook);
  };

  const clearFile = () => {
    setNotebookData(null);
    setFileName('');
    setFileSize('');
    setError('');
  };

  return (
    <main className="min-h-screen bg-background text-foreground pb-32">
      <div className="max-w-4xl mx-auto px-6 md:px-10 py-24 space-y-12 animate-in fade-in duration-500">
        
        {/* Header */}
        <div className="space-y-4">
          <Link 
            href="/"
            className="inline-flex items-center text-foreground hover:text-muted-foreground transition-colors group mb-4"
          >
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          
          <div className="space-y-2">
            <p className="font-mono text-sm text-emerald-500 uppercase tracking-widest">
              Interactive Tool
            </p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
              Jupyter Notebook Viewer
            </h1>
            <p className="text-lg font-light text-muted-foreground max-w-xl leading-relaxed">
              Upload and render Jupyter (`.ipynb`) files directly in your browser. All parsing is done locally in your client.
            </p>
          </div>
        </div>

        {/* Dynamic Drag and Drop / Renderer Area */}
        {!notebookData ? (
          <div className="space-y-6">
            {/* Drag Zone */}
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 flex flex-col items-center justify-center min-h-[300px] ${
                dragActive 
                  ? 'border-emerald-500 bg-emerald-500/5' 
                  : 'border-border bg-card/20 hover:border-foreground/30 hover:bg-card/40'
              }`}
            >
              <input
                type="file"
                accept=".ipynb"
                onChange={handleFileInput}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              
              <div className="p-4 rounded-full bg-muted/60 mb-4 text-muted-foreground group-hover:scale-110 transition-transform">
                <Upload size={32} />
              </div>
              
              <h3 className="text-lg font-medium mb-1">
                Drag & drop your .ipynb file here
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                or click anywhere to select from your files
              </p>
              <div className="px-3 py-1.5 rounded-lg bg-muted text-xs font-mono text-muted-foreground border border-border">
                Supports Jupyter Notebook v4
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-3 p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-red-500 text-sm">
                <AlertCircle size={18} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Quick Demo Option */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl border border-border/80 bg-card/30">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="font-semibold text-sm">No notebook on hand?</h4>
                <p className="text-xs text-muted-foreground">
                  Load a sample neural network attention mechanism notebook to see the parser in action.
                </p>
              </div>
              <button
                onClick={loadDemoNotebook}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-foreground text-background text-xs font-semibold hover:bg-foreground/90 transition-colors shadow-md shrink-0 w-full sm:w-auto"
              >
                <BookOpen size={14} />
                Load Demo Notebook
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* File Info / Reset Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 rounded-xl border border-border bg-muted/30">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                  <FileCode size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm truncate max-w-[250px] sm:max-w-xs">{fileName}</h3>
                  <p className="text-xs text-muted-foreground">{fileSize}</p>
                </div>
              </div>
              
              <button
                onClick={clearFile}
                className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-red-500/20 text-red-500 text-xs font-medium hover:bg-red-500/10 transition-colors self-stretch sm:self-auto"
              >
                <Trash2 size={14} />
                Close Notebook
              </button>
            </div>

            {/* Rendered Notebook */}
            <div className="border border-border/60 rounded-2xl p-6 bg-card/10 shadow-sm">
              <IpynbRenderer notebook={notebookData} />
            </div>
          </div>
        )}

      </div>
    </main>
  );
}

// Detailed Demo Notebook JSON for standard visualization
const demoNotebookJson = {
 "cells": [
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "# Multi-Query Attention & KV Cache Mechanism\n",
    "\n",
    "This notebook demonstrates the mathematical representation and Python implementation of **Multi-Query Attention (MQA)** and **Key-Value (KV) Caching**, key optimizations used in modern Large Language Models (like LLaMA and DeepSeek) to speed up decoding speeds and reduce inference memory footprints.\n",
    "\n",
    "## 1. Concept: Multi-Query Attention vs. Multi-Head Attention\n",
    "\n",
    "- **Multi-Head Attention (MHA)**: Each query head has its own key and value head. Memory scale: $O(b \\times l \\times h \\times d)$.\n",
    "- **Multi-Query Attention (MQA)**: All query heads share a **single** key and value head. This drastically reduces KV Cache size in GPU memory by a factor of the number of heads $H$, allowing for much larger batch sizes and context lengths."
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 1,
   "metadata": {},
   "outputs": [],
   "source": [
    "import torch\n",
    "import torch.nn as nn\n",
    "import math\n",
    "\n",
    "print(f\"PyTorch version: {torch.__version__}\")"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 2,
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "PyTorch version: 2.1.0\n",
      "Initialized Input Tensor of shape: torch.Size([2, 8, 128])\n"
     ]
    }
   ],
   "source": [
    "# Define parameters\n",
    "batch_size = 2\n",
    "seq_len = 8\n",
    "dim = 128\n",
    "num_heads = 4\n",
    "head_dim = dim // num_heads # 32\n",
    "\n",
    "# Create sample input representation\n",
    "x = torch.randn(batch_size, seq_len, dim)\n",
    "print(f\"Initialized Input Tensor of shape: {x.shape}\")"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "## 2. Implementing MQA with KV Caching\n",
    "\n",
    "Here we implement the MultiQueryAttention module. Note that Key and Value project to a single head dimension `head_dim`, while Query projects to `dim` (representing `num_heads * head_dim`)."
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 3,
   "metadata": {},
   "outputs": [],
   "source": [
    "class MultiQueryAttention(nn.Module):\n",
    "    def __init__(self, dim, num_heads):\n",
    "        super().__init__()\n",
    "        self.dim = dim\n",
    "        self.num_heads = num_heads\n",
    "        self.head_dim = dim // num_heads\n",
    "        \n",
    "        # Query maintains full multi-head dimensionality\n",
    "        self.q_proj = nn.Linear(dim, dim, bias=False)\n",
    "        # Key and Value only project to ONE head dimension (shared by all Q heads)\n",
    "        self.k_proj = nn.Linear(dim, self.head_dim, bias=False)\n",
    "        self.v_proj = nn.Linear(dim, self.head_dim, bias=False)\n",
    "        \n",
    "        self.out_proj = nn.Linear(dim, dim, bias=False)\n",
    "\n",
    "    def forward(self, x, kv_cache=None):\n",
    "        B, S, C = x.shape\n",
    "        \n",
    "        # Project query, key, value\n",
    "        q = self.q_proj(x) # (B, S, C)\n",
    "        k = self.k_proj(x) # (B, S, H_D)\n",
    "        v = self.v_proj(x) # (B, S, H_D)\n",
    "        \n",
    "        # Reshape query: (B, num_heads, S, head_dim)\n",
    "        q = q.view(B, S, self.num_heads, self.head_dim).transpose(1, 2)\n",
    "        \n",
    "        # If cache is provided, append current state\n",
    "        if kv_cache is not None:\n",
    "            cached_k, cached_v = kv_cache\n",
    "            k = torch.cat([cached_k, k], dim=1) # (B, cached_S + S, H_D)\n",
    "            v = torch.cat([cached_v, v], dim=1) # (B, cached_S + S, H_D)\n",
    "        \n",
    "        new_kv_cache = (k, v)\n",
    "        \n",
    "        # Reshape key & value to add a head dimension of 1 for broadcasting\n",
    "        # Shapes: (B, 1, seq_len, head_dim)\n",
    "        k = k.unsqueeze(1)\n",
    "        v = v.unsqueeze(1)\n",
    "        \n",
    "        # Compute attention scores: Q @ K.T\n",
    "        # Q: (B, H, S, H_D) @ K: (B, 1, S, H_D).T -> (B, H, S, S)\n",
    "        attn_scores = torch.matmul(q, k.transpose(-2, -1)) / math.sqrt(self.head_dim)\n",
    "        attn_probs = torch.softmax(attn_scores, dim=-1)\n",
    "        \n",
    "        # Weighted sum: Probs @ V\n",
    "        # Probs: (B, H, S, S) @ V: (B, 1, S, H_D) -> (B, H, S, H_D)\n",
    "        context = torch.matmul(attn_probs, v)\n",
    "        \n",
    "        # Reshape context and project output\n",
    "        context = context.transpose(1, 2).contiguous().view(B, S, C)\n",
    "        output = self.out_proj(context)\n",
    "        \n",
    "        return output, new_kv_cache"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "## 3. Simulating Incremental Generation\n",
    "\n",
    "Let's instantiate the model and verify the shape of output and cache when doing sequence-by-sequence step evaluation (KV Cache active)."
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 4,
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "Initial computation output shape: torch.Size([2, 8, 128])\n",
      "Cache Key shape: torch.Size([2, 8, 32]), Value shape: torch.Size([2, 8, 32])\n",
      "--------------------------------------------------\n",
      "Simulating token generation at index S = 8:\n",
      "New token shape: torch.Size([2, 1, 128])\n",
      "Output token shape: torch.Size([2, 1, 128])\n",
      "Updated Cache Key shape: torch.Size([2, 9, 32]), Value shape: torch.Size([2, 9, 32])\n"
     ]
    }
   ],
   "source": [
    "mqa = MultiQueryAttention(dim=dim, num_heads=num_heads)\n",
    "output, cache = mqa(x)\n",
    "\n",
    "print(f\"Initial computation output shape: {output.shape}\")\n",
    "print(f\"Cache Key shape: {cache[0].shape}, Value shape: {cache[1].shape}\")\n",
    "print(\"-\" * 50)\n",
    "\n",
    "# Simulate generating a single token\n",
    "print(\"Simulating token generation at index S = 8:\")\n",
    "next_token_input = torch.randn(batch_size, 1, dim)\n",
    "print(f\"New token shape: {next_token_input.shape}\")\n",
    "\n",
    "next_output, updated_cache = mqa(next_token_input, kv_cache=cache)\n",
    "print(f\"Output token shape: {next_output.shape}\")\n",
    "print(f\"Updated Cache Key shape: {updated_cache[0].shape}, Value shape: {updated_cache[1].shape}\")"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "## 4. Visualizing Cache Memory Efficiency\n",
    "\n",
    "Let's compare the KV Cache sizes for different batch sizes, context sizes, and attention heads configuration."
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 5,
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "=== KV Cache Size Comparison (FP16 bytes) ===\n",
      "Setup: Batch size 4, Context length 4096, hidden_dim 4096, 32 heads\n",
      "Multi-Head Attention (MHA) KV Cache: 536.87 MB\n",
      "Multi-Query Attention (MQA) KV Cache: 16.78 MB\n",
      "MQA provides a 32.00x reduction in memory footprints!\n"
     ]
    }
   ],
   "source": [
    "def compare_cache_size(b, s, h_dim, num_heads):\n",
    "    head_dim = h_dim // num_heads\n",
    "    \n",
    "    # MHA stores (B, H, S, H_D) for both K and V\n",
    "    # Float16 takes 2 bytes\n",
    "    mha_elements = b * num_heads * s * head_dim * 2 # For K and V\n",
    "    mha_bytes = mha_elements * 2\n",
    "    \n",
    "    # MQA stores (B, S, H_D) for both K and V\n",
    "    mqa_elements = b * s * head_dim * 2\n",
    "    mqa_bytes = mqa_elements * 2\n",
    "    \n",
    "    print(\"=== KV Cache Size Comparison (FP16 bytes) ===\")\n",
    "    print(f\"Setup: Batch size {b}, Context length {s}, hidden_dim {h_dim}, {num_heads} heads\")\n",
    "    print(f\"Multi-Head Attention (MHA) KV Cache: {mha_bytes / 1024**2:.2f} MB\")\n",
    "    print(f\"Multi-Query Attention (MQA) KV Cache: {mqa_bytes / 1024**2:.2f} MB\")\n",
    "    print(f\"MQA provides a {mha_bytes/mqa_bytes:.2f}x reduction in memory footprints!\")\n",
    "\n",
    "compare_cache_size(4, 4096, 4096, 32)"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "## 5. Potential Error Cases during Initialization\n",
    "\n",
    "What happens if dimensions are misaligned? Below is an example exception trace showing dimension mismatch in PyTorch projection layers."
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 6,
   "metadata": {},
   "outputs": [
    {
     "ename": "RuntimeError",
     "evalue": "mat1 and mat2 shapes cannot be multiplied (2x100 and 128x128)",
     "output_type": "error",
     "traceback": [
      "\u001b[0;31m---------------------------------------------------------------------------\u001b[0m",
      "\u001b[0;31mRuntimeError\u001b[0m                              Traceback (most recent call last)",
      "\u001b[0;32m<ipython-input-6-5a02476b744a>\u001b[0m in <cell line: 3>\u001b[0;36m()\u001b[0m\n      1 \u001b[38;5;28;01mimport\u001b[39;00m \u001b[38;5;21;01mtorch\u001b[39;00m\n      2 bad_input = torch.randn(2, 8, 100) # Wrong hidden dimension!\n\u001b[1;32m----> 3\u001b[0m output, cache = mqa(bad_input)\n",
      "\u001b[0;31mRuntimeError\u001b[0m: mat1 and mat2 shapes cannot be multiplied (16x100 and 128x128)"
     ]
    }
   ],
   "source": [
    "# Intentionally trigger dimension misalignment\n",
    "bad_input = torch.randn(2, 8, 100) \n",
    "output, cache = mqa(bad_input)"
   ]
  }
 ],
 "metadata": {
  "kernelspec": {
   "display_name": "Python 3 (ipykernel)",
   "language": "python",
   "name": "python3"
  },
  "language_info": {
   "codemirror_mode": {
    "name": "ipython",
    "version": 3
   },
   "file_extension": ".py",
   "mimetype": "text/x-python",
   "name": "python",
   "nbconvert_exporter": "python",
   "pygments_lexer": "ipython3",
   "version": "3.10.8"
  }
 },
 "nbformat": 4,
 "nbformat_minor": 2
};
