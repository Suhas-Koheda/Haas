'use client';

import { useState, useEffect } from 'react';
import Heatmap from './Heatmap';

type Tab = 'all' | 'github' | 'leetcode' | 'kaggle';
type Platform = 'github' | 'leetcode' | 'kaggle';

const PLATFORMS: Record<Platform, { label: string; color: string; link: string }> = {
  github: { label: 'GitHub', color: '34, 197, 94', link: 'https://github.com/suhas-koheda' },
  leetcode: { label: 'LeetCode', color: '249, 115, 22', link: 'https://leetcode.com/U-Coder' },
  kaggle: { label: 'Kaggle', color: '59, 130, 246', link: 'https://www.kaggle.com/suhaskoheda' },
};

type DayData = { github: number; leetcode: number; kaggle: number };

export default function ActivityHeatmaps() {
  const [activeTab, setActiveTab] = useState<Tab>('all');
  const [data, setData] = useState<Record<string, DayData>>({});
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<Record<Platform, boolean>>({ github: false, leetcode: false, kaggle: false });

  useEffect(() => {
    const fetchAll = async () => {
      const newData: Record<string, DayData> = {};

      // GitHub
      try {
        const res = await fetch('/api/github');
        const json = await res.json();
        (json.events || []).forEach((e: { created_at: string }) => {
          const date = e.created_at.split('T')[0];
          if (!newData[date]) newData[date] = { github: 0, leetcode: 0, kaggle: 0 };
          newData[date].github++;
        });
      } catch {
        setErrors((p) => ({ ...p, github: true }));
      }

      // LeetCode
      try {
        const res = await fetch('/api/leetcode');
        const json = await res.json();
        (json.submissions || []).forEach((s: { timestamp: string }) => {
          const date = new Date(parseInt(s.timestamp) * 1000).toISOString().split('T')[0];
          if (!newData[date]) newData[date] = { github: 0, leetcode: 0, kaggle: 0 };
          newData[date].leetcode++;
        });
      } catch {
        setErrors((p) => ({ ...p, leetcode: true }));
      }

      // Kaggle
      try {
        const res = await fetch('/api/kaggle');
        const json = await res.json();
        const items = Array.isArray(json.data) ? json.data : [];
        items.forEach((item: { date?: string }) => {
          if (item.date) {
            const date = item.date.split('T')[0];
            if (!newData[date]) newData[date] = { github: 0, leetcode: 0, kaggle: 0 };
            newData[date].kaggle++;
          }
        });
      } catch {
        setErrors((p) => ({ ...p, kaggle: true }));
      }

      setData(newData);
      setLoading(false);
    };

    fetchAll();
  }, []);

  // Compute combined totals
  const combinedData = { github: 0, leetcode: 0, kaggle: 0 };
  Object.values(data).forEach((d) => {
    combinedData.github += d.github;
    combinedData.leetcode += d.leetcode;
    combinedData.kaggle += d.kaggle;
  });

  const tabs: { id: Tab; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'github', label: 'GitHub' },
    { id: 'leetcode', label: 'LeetCode' },
    { id: 'kaggle', label: 'Kaggle' },
  ];

  const getHeatmapData = (platform: Platform | 'all'): Record<string, number> => {
    const result: Record<string, number> = {};
    Object.entries(data).forEach(([date, d]) => {
      if (platform === 'all') {
        result[date] = d.github + d.leetcode + d.kaggle;
      } else {
        result[date] = d[platform];
      }
    });
    return result;
  };

  const getColor = (platform: Platform | 'all'): string => {
    if (platform === 'all') return '160, 160, 170';
    return PLATFORMS[platform].color;
  };

  return (
    <section className="space-y-8">
      <div className="flex items-baseline justify-between border-b border-border pb-4">
        <h2 className="text-2xl font-medium tracking-tight">Activity</h2>
      </div>

      <div className="flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
              activeTab === tab.id
                ? 'bg-foreground text-background'
                : 'border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading && (
        <div className="h-[120px] bg-muted/50 rounded-lg animate-pulse" />
      )}

      {!loading && activeTab === 'all' && (
        <Heatmap
          data={getHeatmapData('all')}
          title="Combined Activity"
          color={getColor('all')}
          dayData={data}
        />
      )}

      {!loading && activeTab !== 'all' && (
        <Heatmap
          data={getHeatmapData(activeTab as Platform)}
          title={`${PLATFORMS[activeTab as Platform].label} Activity`}
          color={getColor(activeTab as Platform)}
          link={PLATFORMS[activeTab as Platform].link}
        />
      )}

      {!loading && activeTab === 'all' && (
        <div className="grid grid-cols-3 gap-4 pt-4">
          {(Object.keys(PLATFORMS) as Platform[]).map((platform) => (
            <div key={platform} className="border border-border/50 p-4 rounded-xl text-center">
              <div className="text-2xl font-bold">{combinedData[platform]}</div>
              <div className="text-xs text-muted-foreground font-mono mt-1">{PLATFORMS[platform].label}</div>
            </div>
          ))}
        </div>
      )}

      {!loading && activeTab === 'all' && (errors.leetcode || errors.kaggle) && (
        <p className="text-xs text-muted-foreground">
          Note: LeetCode and Kaggle APIs limit historical data without authentication. GitHub shows full history.
        </p>
      )}
    </section>
  );
}
