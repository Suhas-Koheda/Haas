const LOG_KEY = "haas_logs";
const MAX_LOGS = 500;

export interface LogEntry {
  time: string;
  message: string;
}

export function getLogs(): LogEntry[] {
  try {
    return JSON.parse(localStorage.getItem(LOG_KEY) || "[]");
  } catch {
    return [];
  }
}

export function log(message: string) {
  const entry: LogEntry = {
    time: new Date().toISOString(),
    message,
  };
  const logs = getLogs();
  logs.push(entry);
  while (logs.length > MAX_LOGS) logs.shift();
  try {
    localStorage.setItem(LOG_KEY, JSON.stringify(logs));
  } catch {
    /* storage full */
  }
  console.log(`[${entry.time}] ${message}`);
}

export function clearLogs() {
  localStorage.removeItem(LOG_KEY);
}

/**
 * Uploads the collected logs to GitHub as a gist.
 * Requires VITE_GITHUB_TOKEN with gist scope.
 */
export async function flushLogsToGitHub(): Promise<string | null> {
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  const logs = getLogs();
  if (!token || logs.length === 0) return null;

  const content = logs.map((l) => `[${l.time}] ${l.message}`).join("\n");
  const res = await fetch("https://api.github.com/gists", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      description: "Haas portfolio time-based logs",
      public: false,
      files: {
        "haas-logs.md": { content },
      },
    }),
  });
  if (!res.ok) {
    log(`Failed to upload logs: ${res.status}`);
    return null;
  }
  const json = await res.json();
  clearLogs();
  return json.html_url as string;
}
