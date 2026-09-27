'use client';

import { useState, useEffect } from 'react';
import Heatmap from './Heatmap';

type Tab = 'all' | 'github' | 'leetcode' | 'kaggle';

const GITHUB_USERNAME = 'suhas-koheda';
const LEETCODE_USERNAME = 'ssk450';
const KAGGLE_USERNAME = 'ssk450';

export default function ActivityHeatmaps() {
  const [activeTab, setActiveTab] = useState<Tab>('all');
  const [githubData, setGithubData] = useState<Record<string, number>>({});
  const [leetcodeData, setLeetcodeData] = useState<Record<string, number>>({});
  const [kaggleData, setKaggleData] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState({ github: true, leetcode: true, kaggle: true });
  const [errors, setErrors] = useState({ github: false, leetcode: false, kaggle: false });

  useEffect(() => {
    // Fetch GitHub events
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=100`)
      .then((r) => r.json())
      .then((events) => {
        const data: Record<string, number> = {};
        events.forEach((e: { created_at: string }) => {
          const date = e.created_at.split('T')[0];
          data[date] = (data[date] || 0) + 1;
        });
        setGithubData(data);
        setLoading((p) => ({ ...p, github: false }));
      })
      .catch(() => {
        setErrors((p) => ({ ...p, github: true }));
        setLoading((p) => ({ ...p, github: false }));
      });

    // Fetch LeetCode submissions
    fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `query recentSubmissions($username: String!) {
          recentSubmissionList(username: $username, limit: 100) {
            title
            timestamp
            statusDisplay
          }
        }`,
        variables: { username: LEETCODE_USERNAME },
      }),
    })
      .then((r) => r.json())
      .then((res) => {
        const submissions = res?.data?.recentSubmissionList || [];
        const data: Record<string, number> = {};
        submissions.forEach((s: { timestamp: string }) => {
          const date = new Date(parseInt(s.timestamp) * 1000).toISOString().split('T')[0];
          data[date] = (data[date] || 0) + 1;
        });
        setLeetcodeData(data);
        setLoading((p) => ({ ...p, leetcode: false }));
      })
      .catch(() => {
        setErrors((p) => ({ ...p, leetcode: true }));
        setLoading((p) => ({ ...p, leetcode: false }));
      });

    // Fetch Kaggle activity
    fetch(`https://www.kaggle.com/api/v1/users/${KAGGLE_USERNAME}/activity`)
      .then((r) => r.json())
      .then((data) => {
        const counts: Record<string, number> = {};
        if (Array.isArray(data)) {
          data.forEach((item: { date?: string }) => {
            if (item.date) {
              const date = item.date.split('T')[0];
              counts[date] = (counts[date] || 0) + 1;
            }
          });
        }
        setKaggleData(counts);
        setLoading((p) => ({ ...p, kaggle: false }));
      })
      .catch(() => {
        setErrors((p) => ({ ...p, kaggle: true }));
        setLoading((p) => ({ ...p, kaggle: false }));
      });
  }, []);

  const tabs: { id: Tab; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'github', label: 'GitHub' },
    { id: 'leetcode', label: 'LeetCode' },
    { id: 'kaggle', label: 'Kaggle' },
  ];

  const renderHeatmap = (
    platform: 'github' | 'leetcode' | 'kaggle',
    title: string,
    data: Record<string, number>,
    color: string,
    link: string
  ) => {
    if (loading[platform]) {
      return (
        <div key={platform} className="space-y-4">
          <h3 className="text-lg font-medium">{title}</h3>
          <div className="h-[120px] bg-muted/50 rounded-lg animate-pulse" />
        </div>
      );
    }
    if (errors[platform]) {
      return (
        <div key={platform} className="space-y-4">
          <h3 className="text-lg font-medium">{title}</h3>
          <div className="h-[120px] bg-muted/50 rounded-lg flex items-center justify-center text-sm text-muted-foreground">
            Failed to load data
          </div>
        </div>
      );
    }
    return <Heatmap key={platform} data={data} title={title} color={color} link={link} />;
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

      <div className="space-y-8">
        {(activeTab === 'all' || activeTab === 'github') &&
          renderHeatmap('github', 'GitHub Contributions', githubData, '34, 197, 94', `https://github.com/${GITHUB_USERNAME}`)}
        {(activeTab === 'all' || activeTab === 'leetcode') &&
          renderHeatmap('leetcode', 'LeetCode Submissions', leetcodeData, '249, 115, 22', `https://leetcode.com/${LEETCODE_USERNAME}`)}
        {(activeTab === 'all' || activeTab === 'kaggle') &&
          renderHeatmap('kaggle', 'Kaggle Activity', kaggleData, '59, 130, 246', `https://www.kaggle.com/${KAGGLE_USERNAME}`)}
      </div>
    </section>
  );
}
