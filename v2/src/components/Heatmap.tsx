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
  const { weeks, monthLabels, maxCount, hasAnyData } = useMemo(() => {
    const dataDates = Object.keys(data).filter((k) => data[k] > 0);
    const hasAnyData = dataDates.length > 0;

    if (!hasAnyData) {
      return { weeks: [], monthLabels: [] as { label: string; position: number }[], maxCount: 1, hasAnyData: false };
    }

    // Calculate date range from actual data
    const sortedDates = dataDates.sort();
    const earliestDate = new Date(sortedDates[0]);
    const latestDate = new Date(sortedDates[sortedDates.length - 1]);

    // Add padding: 1 week before and 1 week after
    const startDate = new Date(earliestDate);
    startDate.setDate(startDate.getDate() - 7);
    startDate.setDate(startDate.getDate() - startDate.getDay());

    const endDate = new Date(latestDate);
    endDate.setDate(endDate.getDate() + 7);
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

    // Generate all dates in range
    const dates: Date[] = [];
    const current = new Date(startDate);
    while (current <= endDate) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    // Group into weeks
    const weeks: Date[][] = [];
    for (let i = 0; i < dates.length; i += 7) {
      weeks.push(dates.slice(i, i + 7));
    }

    // Calculate month labels
    const monthLabels: { label: string; position: number }[] = [];
    const seenMonths = new Set<string>();
    weeks.forEach((week, i) => {
      const month = week[0].getMonth();
      const year = week[0].getFullYear();
      const key = `${year}-${month}`;
      if (!seenMonths.has(key)) {
        seenMonths.add(key);
        monthLabels.push({ label: week[0].toLocaleString('default', { month: 'short' }), position: i });
      }
    });

    const maxCount = Math.max(...Object.values(data), 1);
    return { weeks, monthLabels, maxCount, hasAnyData };
  }, [data]);

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
            {weeks.map((week, i) => (
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
