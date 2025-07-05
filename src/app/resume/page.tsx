"use client";
import { useEffect, useState, Suspense } from 'react';
import { Eye, Download } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

type ResumeType = "kotlin" | "frontend" | "ai";

function ResumeContent() {
    const searchParams = useSearchParams();
    const [isMounted, setIsMounted] = useState(false);
    const [selectedResume, setSelectedResume] = useState<ResumeType>("kotlin");
    
    const resumePaths = {
        kotlin: "/resume/Suhas_Koheda_Resume_Kotlin.pdf",
        frontend: "/resume/Suhas_Koheda_Resume_frontend.pdf",
        ai: "/resume/Suhas_Koheda_Resume_AI.pdf"
    };
    
    useEffect(() => {
        setIsMounted(true);
        
        // Get the lang parameter from URL
        const langParam = searchParams.get('lang')?.toLowerCase();
        
        // Check if it's a valid resume type
        if (langParam && ['kotlin', 'frontend', 'ai'].includes(langParam)) {
            setSelectedResume(langParam as ResumeType);
        }
    }, [searchParams]);
    
    const currentResumePath = resumePaths[selectedResume];
    const resumeFileName = `Suhas_Koheda_Resume_${selectedResume}.pdf`;

    if (!isMounted) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-[var(--bg)] p-4">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold text-[var(--foreground)] mb-4">Loading Resume Viewer</h1>
                    <p className="text-[var(--muted-foreground)]">Please wait a moment...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--bg)] text-[var(--foreground)] py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-[var(--primary)] font-mono">My Resume</h1>
                    <p className="text-lg text-[var(--muted-foreground)] font-sans">
                        View my professional background and skills below, or download the PDF.
                    </p>
                </div>

                <div className="mb-6 flex flex-col sm:flex-row justify-center items-center gap-4 font-sans">
                    <div className="flex rounded-lg border border-[var(--border)] overflow-hidden">
                        <button 
                            onClick={() => setSelectedResume("kotlin")} 
                            className={`px-4 py-2 ${selectedResume === "kotlin" ? "bg-[var(--primary)] text-[var(--primary-foreground)]" : "bg-[var(--card)]"}`}
                        >
                            Kotlin
                        </button>
                        <button 
                            onClick={() => setSelectedResume("frontend")} 
                            className={`px-4 py-2 ${selectedResume === "frontend" ? "bg-[var(--primary)] text-[var(--primary-foreground)]" : "bg-[var(--card)]"}`}
                        >
                            Frontend
                        </button>
                        <button 
                            onClick={() => setSelectedResume("ai")} 
                            className={`px-4 py-2 ${selectedResume === "ai" ? "bg-[var(--primary)] text-[var(--primary-foreground)]" : "bg-[var(--card)]"}`}
                        >
                            AI
                        </button>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8 font-sans">
                    <a
                        href={currentResumePath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-[var(--primary-foreground)] bg-[var(--primary)] hover:bg-opacity-80 transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary)]"
                    >
                        <Eye size={20} className="mr-2" />
                        View in New Tab
                    </a>
                    <a
                        href={currentResumePath}
                        download={resumeFileName}
                        className="inline-flex items-center justify-center px-6 py-3 border border-[var(--border)] text-base font-medium rounded-md text-[var(--foreground)] bg-[var(--card)] hover:bg-[var(--muted)] transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary)]"
                    >
                        <Download size={20} className="mr-2" />
                        Download PDF
                    </a>
                </div>

                <div className="bg-[var(--card)] p-1 sm:p-2 rounded-lg shadow-xl border border-[var(--border)]">
                    <iframe
                        src={`${currentResumePath}#toolbar=0&navpanes=0&scrollbar=0`}
                        title={`Suhas Koheda ${selectedResume.toUpperCase()} Resume`}
                        className="w-full h-[calc(100vh-220px)] min-h-[500px] sm:min-h-[700px] rounded border-none"
                    />
                </div>
                <p className="text-center mt-6 text-sm text-[var(--muted-foreground)] font-sans">
                    Tip: For the best viewing experience or if the embedded view has issues, please use the &apos;View in New Tab&apos; or &apos;Download PDF&apos; buttons.
                </p>
            </div>
        </div>
    );
}

export default function ResumePage() {
    return (
        <Suspense fallback={
            <div className="flex justify-center items-center min-h-screen bg-[var(--bg)] p-4">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold text-[var(--foreground)] mb-4">Loading Resume Viewer</h1>
                    <p className="text-[var(--muted-foreground)]">Please wait a moment...</p>
                </div>
            </div>
        }>
            <ResumeContent />
        </Suspense>
    );
}