import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { getSkillIcon } from "../../lib/skillIcons";
import type { Skill } from "../../types/portfolio";

interface SkillSliderProps {
  skills: Skill[];
}

export default function SkillSlider({ skills }: SkillSliderProps) {
  const { colors, mode } = useTheme();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1.5 sm:gap-2 w-full">
      {skills.map((skill, index) => {
        const IconComponent = getSkillIcon(skill.icon);
        return (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, delay: index * 0.04 }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-all duration-300"
            style={{
              backgroundColor: mode === "dark"
                ? "rgba(24, 24, 27, 0.5)"
                : "rgba(255, 255, 255, 0.8)",
              borderColor: mode === "dark"
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.1)",
            }}
          >
            {IconComponent && (
              <IconComponent
                className="w-3.5 h-3.5 flex-shrink-0"
                style={{ color: skill.color }}
              />
            )}
            <span
              className="text-xs font-medium whitespace-nowrap leading-none"
              style={{ color: colors.foreground }}
            >
              {skill.name}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
