"use client";
import { Briefcase, Users, Edit3, CalendarDays } from 'lucide-react';
import { motion } from 'framer-motion';

interface ExperienceItemProps {
  title: string;
  organization: string;
  duration: string;
  descriptionPoints: string[];
  type: 'work' | 'responsibility';
  index: number;
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({ title, organization, duration, descriptionPoints, type, index }) => {
  const Icon = type === 'work' ? Briefcase : Users;
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="mb-8 p-6 rounded-lg border border-[var(--border)] shadow-lg bg-[var(--card)] hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-4 pt-1">
          <Icon size={24} className="text-[var(--primary)]" />
        </div>
        <div className="flex-grow font-sans"> {/* Apply font-sans to content area */}
          <h3 className="text-xl font-semibold text-[var(--card-foreground)] font-mono">{title}</h3> {/* Title mono */}
          <p className="text-md font-medium text-[var(--muted-foreground)] font-mono">{organization}</p> {/* Org mono */}
          <div className="mt-1 mb-3 flex items-center text-xs text-[var(--muted-foreground)] bg-[var(--background-alt)] px-2 py-1 rounded-md inline-flex">
            <CalendarDays size={14} className="mr-1.5" />
            <span>{duration}</span> {/* Duration will inherit font-sans */}
          </div>
          <ul className="list-disc list-inside space-y-1.5 text-sm text-[var(--muted-foreground)]"> {/* Description points will inherit font-sans */}
            {descriptionPoints.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

const experienceData = [
  {
    title: 'Web Developer',
    organization: 'Newton School Coding Club',
    duration: 'Sept 2024 – Present',
    descriptionPoints: [
      'Developed web applications using React/Next.js with high performance scores.',
      'Optimized load times through code improvements and best practices.',
    ],
    type: 'work' as 'work' | 'responsibility',
  },
  {
    title: 'Open Source Developer',
    organization: 'Google Developer Club (GDG), VIT Chennai',
    duration: 'Oct 2024 – Present',
    descriptionPoints: [
      'Contributed to multiple open-source projects with numerous merged PRs.',
      'Mentored students in open-source workflows and Git best practices.',
    ],
    type: 'work' as 'work' | 'responsibility',
  },
  {
    title: 'Design Lead',
    organization: 'Zero Bugs Club, VIT Chennai',
    duration: 'June 2024 – Sept 2024',
    descriptionPoints: [
      'Led a team of designers for various technical events and workshops.',
      'Oversaw creation of design assets for club activities, branding, and event promotions.',
    ],
    type: 'responsibility' as 'work' | 'responsibility',
  },
  {
    title: 'Content Writer & Designer',
    organization: 'Zero Bugs Club, VIT Chennai',
    duration: 'Feb 2023 – May 2024',
    descriptionPoints: [
      'Created engaging content for social media, blogs, and technical articles.',
      'Designed visually appealing graphics and promotional materials for club events.',
    ],
    type: 'responsibility' as 'work' | 'responsibility',
  },
];

const Experience = () => {
  return (
    <section className="py-12 sm:py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 sm:mb-14 text-[var(--foreground)]">
          Experience & Roles
        </h2>
        <div>
          {experienceData.map((exp, index) => (
            <ExperienceItem
              key={index}
              title={exp.title}
              organization={exp.organization}
              duration={exp.duration}
              descriptionPoints={exp.descriptionPoints}
              type={exp.type}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
