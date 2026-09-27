'use client';

import { useMemo } from 'react';

interface HeatmapProps {
  data: Record<string, number>;
  title: string;
  color?: string;
  link?: string;
}

export default function Heatmap({ data, title, color = '34, 197, 94', link }: HeatmapProps) {
  const { weeks, months, maxCount } = useMemo(() => {
    const today = new Date();
    const dates: Date[] = [];
    for (let i = 364; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      dates.push(d);
    }
    const weeks: Date[][] = [];
    for (let i = 0; i < dates.length; i += 7) {
      weeks.push(dates.slice(i, i + 7));
    }
    const months: { label: string; weekIndex: number }[] = [];
    let lastMonth = -1;
    weeks.forEach((week, i) => {
      const m = week[0].getMonth();
      if (m !== lastMonth) {
        months.push({ label: week[0].toLocaleString('default', { month: 'short' }), weekIndex: i });
        lastMonth = m;
      }
    });
    const maxCount = Math.max(...Object.values(data), 1);
    return { weeks, months, maxCount };
  }, [data]);

  const getColor = (count: number) => {
    if (count === 0) return 'hsl(var(--muted))';
    const intensity = count / maxCount;
    if (intensity <= 0.25) return `rgba(${color}, 0.25)`;
    if (intensity <= 0.5) return `rgba(${color}, 0.5)`;
    if (intensity <= 0.75) return `rgba(${color}, 0.75)`;
    return `rgba(${color}, 1)`;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">{title}</h3>
        {link && (
          <a href={link} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            View Profile →
          </a>
        )}
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-[750px]">
          <div className="flex gap-[3px] mb-1 ml-8">
            {months.map((m, i) => (
              <span key={i} className="text-[10px] text-muted-foreground" style={{ position: 'relative', left: m.weekIndex * 13 }}>
                {m.label}
              </span>
            ))}
          </div>
          <div className="flex gap-[3px]">
            <div className="flex flex-col gap-[3px] mr-2">
              {['Mon', 'Wed', 'Fri'].map((d) => (
                <span key={d} className="text-[10px] text-muted-foreground h-[10px] leading-[10px]">{d}</span>
              ))}
            </div>
            {weeks.map((week, i) => (
              <div key={i} className="flex flex-col gap-[3px]">
                {week.map((date, j) => {
                  const key = date.toISOString().split('T')[0];
                  const count = data[key] || 0;
                  return (
                    <div
                      key={j}
                      className="w-[10px] h-[10px] rounded-sm"
                      style={{ backgroundColor: getColor(count) }}
                      title={`${key}: ${count} contributions`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
        <span>Less</span>
        {[0, 0.25, 0.5, 0.75, 1].map((intensity, i) => (
          <div
            key={i}
            className="w-[10px] h-[10px] rounded-sm"
            style={{ backgroundColor: intensity === 0 ? 'hsl(var(--muted))' : `rgba(${color}, ${intensity})` }}
          />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}
