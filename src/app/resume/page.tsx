"use client";
import { Download, Eye } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ResumePage() {
    const resumePdfPath = "/resume/Suhas_Koheda_Kotlin_Resume.pdf";
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true); // Ensure component is mounted before rendering client-side dependent UI
    }, []);

    if (!isMounted) {
        // Fallback for SSR or initial render before hydration
        return (
            <div className="flex justify-center items-center min-h-screen bg-[var(--bg)] p-4">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold text-[var(--foreground)] mb-4">Loading Resume Viewer</h1>
                    <p className="text-[var(--muted-foreground)]">Please wait a moment...</p>
                     {/* Provide direct links as fallback during loading or if iframe fails for any reason */}
                    <div className="mt-6 space-y-2">
                        <p className="text-sm text-[var(--muted-foreground)]">If content doesn't load, use these links:</p>
                        <a
                            href={resumePdfPath}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-[var(--primary)] hover:underline"
                        >
                            View Resume in New Tab
                        </a>
                        <a
                            href={resumePdfPath}
                            download="Suhas_Koheda_Resume.pdf"
                            className="block text-[var(--primary)] hover:underline"
                        >
                            Download PDF
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--bg)] text-[var(--foreground)] py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-[var(--primary)] font-mono">My Resume</h1> {/* Title mono */}
                    <p className="text-lg text-[var(--muted-foreground)] font-sans"> {/* Description sans */}
                        View my professional background and skills below, or download the PDF.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8 font-sans"> {/* Buttons sans */}
                    <a
                        href={resumePdfPath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-[var(--primary-foreground)] bg-[var(--primary)] hover:bg-opacity-80 transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary)]"
                    >
                        <Eye size={20} className="mr-2" />
                        View in New Tab
                    </a>
                    <a
                        href={resumePdfPath}
                        download="Suhas_Koheda_Resume.pdf"
                        className="inline-flex items-center justify-center px-6 py-3 border border-[var(--border)] text-base font-medium rounded-md text-[var(--foreground)] bg-[var(--card)] hover:bg-[var(--muted)] transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary)]"
                    >
                        <Download size={20} className="mr-2" />
                        Download PDF
                    </a>
                </div>

                <div className="bg-[var(--card)] p-1 sm:p-2 rounded-lg shadow-xl border border-[var(--border)]">
                    <iframe
                        src={`${resumePdfPath}#toolbar=0&navpanes=0&scrollbar=0`}
                        title="Suhas Koheda Resume"
                        className="w-full h-[calc(100vh-220px)] min-h-[500px] sm:min-h-[700px] rounded border-none" // Removed redundant border
                    />
                </div>
                 <p className="text-center mt-6 text-sm text-[var(--muted-foreground)] font-sans"> {/* Tip sans */}
                    Tip: For the best viewing experience or if the embedded view has issues, please use the &apos;View in New Tab&apos; or &apos;Download PDF&apos; buttons.
                </p>
            </div>
        </div>
    );
}
