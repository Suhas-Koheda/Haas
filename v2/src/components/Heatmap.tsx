'use client';

import { useMemo } from 'react';

interface HeatmapProps {
  data: Record<string, number>;
  title: string;
  color?: string;
  link?: string;
  dayData?: Record<string, { github: number; leetcode: number; kaggle: number }>;
}

export default function Heatmap({ data, title, color = '34, 197, 94', link, dayData }: HeatmapProps) {
  const { weeks, maxCount, hasAnyData } = useMemo(() => {
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
    const maxCount = Math.max(...Object.values(data), 1);
    const hasAnyData = Object.values(data).some((v) => v > 0);
    return { weeks, maxCount, hasAnyData };
  }, [data]);

  // Filter weeks to only show those with data
  const { filteredWeeks, monthLabels } = useMemo(() => {
    if (!hasAnyData) return { filteredWeeks: weeks, monthLabels: [] as { label: string; position: number }[] };
    
    // Find the first and last week with data
    let firstWeekIdx = 0;
    let lastWeekIdx = weeks.length - 1;
    
    for (let i = 0; i < weeks.length; i++) {
      const hasData = weeks[i].some((date) => {
        const key = date.toISOString().split('T')[0];
        return (data[key] || 0) > 0;
      });
      if (hasData) {
        firstWeekIdx = i;
        break;
      }
    }
    
    for (let i = weeks.length - 1; i >= 0; i--) {
      const hasData = weeks[i].some((date) => {
        const key = date.toISOString().split('T')[0];
        return (data[key] || 0) > 0;
      });
      if (hasData) {
        lastWeekIdx = i;
        break;
      }
    }
    
    // Add some padding
    firstWeekIdx = Math.max(0, firstWeekIdx - 1);
    lastWeekIdx = Math.min(weeks.length - 1, lastWeekIdx + 1);
    
    const filteredWeeks = weeks.slice(firstWeekIdx, lastWeekIdx + 1);
    
    // Calculate month labels for ALL months in the range
    const monthLabels: { label: string; position: number }[] = [];
    const seenMonths = new Set<string>();
    filteredWeeks.forEach((week, i) => {
      const month = week[0].getMonth();
      const year = week[0].getFullYear();
      const key = `${year}-${month}`;
      if (!seenMonths.has(key)) {
        seenMonths.add(key);
        monthLabels.push({ label: week[0].toLocaleString('default', { month: 'short' }), position: i });
      }
    });
    
    return { filteredWeeks, monthLabels };
  }, [weeks, data, hasAnyData]);

  const getColor = (count: number) => {
    if (count === 0) return 'hsl(var(--muted))';
    const intensity = count / maxCount;
    if (intensity <= 0.25) return `rgba(${color}, 0.25)`;
    if (intensity <= 0.5) return `rgba(${color}, 0.5)`;
    if (intensity <= 0.75) return `rgba(${color}, 0.75)`;
    return `rgba(${color}, 1)`;
  };

  const getTooltip = (date: Date) => {
    const key = date.toISOString().split('T')[0];
    const count = data[key] || 0;
    if (dayData && dayData[key]) {
      const d = dayData[key];
      const parts = [];
      if (d.github > 0) parts.push(`GitHub: ${d.github}`);
      if (d.leetcode > 0) parts.push(`LeetCode: ${d.leetcode}`);
      if (d.kaggle > 0) parts.push(`Kaggle: ${d.kaggle}`);
      return `${key}\n${parts.join(' | ')}`;
    }
    return `${key}: ${count} contributions`;
  };

  if (!hasAnyData) {
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
        <div className="h-[120px] bg-muted/50 rounded-lg flex items-center justify-center text-sm text-muted-foreground">
          No activity data available
        </div>
      </div>
    );
  }

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
            {monthLabels.map((m, i) => (
              <span key={i} className="text-[10px] text-muted-foreground" style={{ position: 'relative', left: m.position * 13 }}>
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
            {filteredWeeks.map((week, i) => (
              <div key={i} className="flex flex-col gap-[3px]">
                {week.map((date, j) => {
                  const key = date.toISOString().split('T')[0];
                  const count = data[key] || 0;
                  return (
                    <div
                      key={j}
                      className="w-[10px] h-[10px] rounded-sm cursor-pointer transition-transform hover:scale-125"
                      style={{ backgroundColor: getColor(count) }}
                      title={getTooltip(date)}
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
