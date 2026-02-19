import Name from "@/components/Name";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import OpenSourceContributions from "@/components/OpenSourceContributions";
import Experience from "@/components/Experience";
import { ContributionsPage } from "@/components/Contributions"; // Wakatime stats

export default function Home() {
    return (
        <main className="flex flex-col items-center bg-[var(--bg)]">
            <Name />
            <ContributionsPage />
            <Skills />
            <Projects /> 
            <OpenSourceContributions />
            <Experience />
            <Education />
        </main>
    );
}