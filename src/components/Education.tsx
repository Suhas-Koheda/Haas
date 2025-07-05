"use client";
import { School, Award, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

interface EducationItemProps {
  institution: string;
  degree: string;
  duration: string;
  score: string;
  index: number;
}

const EducationItem: React.FC<EducationItemProps> = ({ institution, degree, duration, score, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="mb-8 p-6 rounded-lg border border-[var(--border)] shadow-lg bg-[var(--card)] hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-4">
          <School size={28} className="text-[var(--primary)]" />
        </div>
        <div className="font-sans"> {/* Apply font-sans to this container */}
          <h3 className="text-xl font-semibold text-[var(--card-foreground)] font-mono">{institution}</h3> {/* Keep institution mono or change if preferred */}
          <p className="text-md text-[var(--muted-foreground)]">{degree}</p>
          <div className="mt-2 flex items-center text-sm text-[var(--muted-foreground)]">
            <Calendar size={16} className="mr-2" />
            <span>{duration}</span>
          </div>
          <div className="mt-1 flex items-center text-sm text-[var(--muted-foreground)]">
            <Award size={16} className="mr-2" />
            <span>{score}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const educationData = [
  {
    institution: 'Vellore Institute of Technology, Chennai',
    degree: 'B.Tech Computer Science - AIML',
    duration: '2023 – 2027',
    score: 'CGPA: 9.0/10.0',
  },
  {
    institution: 'Nine Education Academy, Hyderabad',
    degree: 'Telangana State Board of Intermediate Education',
    duration: '2021 – 2023',
    score: 'Aggregate: 93.5%',
  },
  {
    institution: 'Sri Sai Public School, Hyderabad',
    degree: 'ICSE (Class X)',
    duration: '2020 – 2021',
    score: 'CGPA: 9.2/10.0',
  },
];

const Education = () => {
  return (
    <section className="py-12 sm:py-16 px-4 bg-[var(--background-alt)]"> {/* Using a slightly different background for section distinction */}
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 sm:mb-14 text-[var(--foreground)]">
          My Education
        </h2>
        <div>
          {educationData.map((edu, index) => (
            <EducationItem
              key={index}
              institution={edu.institution}
              degree={edu.degree}
              duration={edu.duration}
              score={edu.score}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
