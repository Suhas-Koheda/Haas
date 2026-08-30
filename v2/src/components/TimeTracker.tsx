"use client";

import { useEffect, useRef } from "react";

interface TimeLog {
  page: string;
  enterTime: number;
  exitTime?: number;
  duration?: number;
}

function logToConsole(data: TimeLog) {
  const durationSec = data.duration ? (data.duration / 1000).toFixed(1) : "N/A";
  console.log(
    `[Analytics] Page: ${data.page} | Duration: ${durationSec}s | Enter: ${new Date(data.enterTime).toLocaleTimeString()} | Exit: ${data.exitTime ? new Date(data.exitTime).toLocaleTimeString() : "N/A"}`
  );
}

function sendToAnalytics(data: TimeLog) {
  try {
    const logs: TimeLog[] = JSON.parse(localStorage.getItem("timeLogs") || "[]");
    logs.push(data);
    localStorage.setItem("timeLogs", JSON.stringify(logs));
  } catch {
    // silently fail
  }
}

export function getTimeLogs(): TimeLog[] {
  try {
    return JSON.parse(localStorage.getItem("timeLogs") || "[]");
  } catch {
    return [];
  }
}

export function getPageTimeSummary(): Record<string, number> {
  const logs = getTimeLogs();
  const summary: Record<string, number> = {};
  for (const log of logs) {
    if (log.duration) {
      summary[log.page] = (summary[log.page] || 0) + log.duration;
    }
  }
  return summary;
}

export default function TimeTracker() {
  const enterTime = useRef<number>(Date.now());
  const pageRef = useRef<string>("");

  useEffect(() => {
    pageRef.current = window.location.pathname;
    enterTime.current = Date.now();

    const handleBeforeUnload = () => {
      const now = Date.now();
      const log: TimeLog = {
        page: pageRef.current,
        enterTime: enterTime.current,
        exitTime: now,
        duration: now - enterTime.current,
      };
      logToConsole(log);
      sendToAnalytics(log);
    };

    const handleRouteChange = () => {
      const now = Date.now();
      const log: TimeLog = {
        page: pageRef.current,
        enterTime: enterTime.current,
        exitTime: now,
        duration: now - enterTime.current,
      };
      logToConsole(log);
      sendToAnalytics(log);

      pageRef.current = window.location.pathname;
      enterTime.current = Date.now();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    const originalPushState = history.pushState;
    history.pushState = function (...args) {
      originalPushState.apply(this, args);
      handleRouteChange();
    };

    const originalReplaceState = history.replaceState;
    history.replaceState = function (...args) {
      originalReplaceState.apply(this, args);
      handleRouteChange();
    };

    window.addEventListener("popstate", handleRouteChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handleRouteChange);
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
    };
  }, []);

  return null;
}
