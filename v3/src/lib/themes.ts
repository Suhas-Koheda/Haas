export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  highlight: string;
  muted: string;
  background: string;
  foreground: string;
  card: string;
  border: string;
}

export interface ThemePreset {
  name: string;
  light: ThemeColors;
  dark: ThemeColors;
}

export const THEME_PRESETS: Record<string, ThemePreset> = {
  ocean: {
    name: "Ocean",
    dark: {
      primary: "#f97316",
      secondary: "#023e8a",
      accent: "#f97316",
      highlight: "#48cae4",
      muted: "#90e0ef",
      background: "#16161d",
      foreground: "#fafafa",
      card: "rgba(255,255,255,0.02)",
      border: "rgba(255,255,255,0.08)",
    },
    light: {
      primary: "#f97316",
      secondary: "#023e8a",
      accent: "#f97316",
      highlight: "#48cae4",
      muted: "#90e0ef",
      background: "#fafafa",
      foreground: "#0a0a0a",
      card: "rgba(255,255,255,0.6)",
      border: "rgba(0,0,0,0.08)",
    },
  },
  midnight: {
    name: "Midnight",
    dark: {
      primary: "#f97316",
      secondary: "#4c1d95",
      accent: "#f97316",
      highlight: "#c4b5fd",
      muted: "#ddd6fe",
      background: "#16161d",
      foreground: "#fafafa",
      card: "rgba(255,255,255,0.02)",
      border: "rgba(255,255,255,0.08)",
    },
    light: {
      primary: "#f97316",
      secondary: "#4c1d95",
      accent: "#f97316",
      highlight: "#c4b5fd",
      muted: "#ddd6fe",
      background: "#fafafa",
      foreground: "#0a0a0a",
      card: "rgba(255,255,255,0.6)",
      border: "rgba(0,0,0,0.08)",
    },
  },
  sunset: {
    name: "Sunset",
    dark: {
      primary: "#f97316",
      secondary: "#c2410c",
      accent: "#f97316",
      highlight: "#fdba74",
      muted: "#fed7aa",
      background: "#16161d",
      foreground: "#fafafa",
      card: "rgba(255,255,255,0.02)",
      border: "rgba(255,255,255,0.08)",
    },
    light: {
      primary: "#f97316",
      secondary: "#c2410c",
      accent: "#f97316",
      highlight: "#fdba74",
      muted: "#fed7aa",
      background: "#fffbf5",
      foreground: "#1a1a1a",
      card: "rgba(255,255,255,0.7)",
      border: "rgba(0,0,0,0.08)",
    },
  },
  forest: {
    name: "Forest",
    dark: {
      primary: "#f97316",
      secondary: "#065f46",
      accent: "#f97316",
      highlight: "#34d399",
      muted: "#6ee7b7",
      background: "#16161d",
      foreground: "#fafafa",
      card: "rgba(255,255,255,0.02)",
      border: "rgba(255,255,255,0.08)",
    },
    light: {
      primary: "#f97316",
      secondary: "#065f46",
      accent: "#f97316",
      highlight: "#34d399",
      muted: "#6ee7b7",
      background: "#f5fdf8",
      foreground: "#1a1a1a",
      card: "rgba(255,255,255,0.7)",
      border: "rgba(0,0,0,0.08)",
    },
  },
  rose: {
    name: "Rose",
    dark: {
      primary: "#f97316",
      secondary: "#9f1239",
      accent: "#f97316",
      highlight: "#fb7185",
      muted: "#fda4af",
      background: "#16161d",
      foreground: "#fafafa",
      card: "rgba(255,255,255,0.02)",
      border: "rgba(255,255,255,0.08)",
    },
    light: {
      primary: "#f97316",
      secondary: "#9f1239",
      accent: "#f97316",
      highlight: "#fb7185",
      muted: "#fda4af",
      background: "#fffbfc",
      foreground: "#1a1a1a",
      card: "rgba(255,255,255,0.7)",
      border: "rgba(0,0,0,0.08)",
    },
  },
  monochrome: {
    name: "Monochrome",
    dark: {
      primary: "#f97316",
      secondary: "#525252",
      accent: "#f97316",
      highlight: "#d4d4d4",
      muted: "#e5e5e5",
      background: "#16161d",
      foreground: "#fafafa",
      card: "rgba(255,255,255,0.02)",
      border: "rgba(255,255,255,0.08)",
    },
    light: {
      primary: "#f97316",
      secondary: "#404040",
      accent: "#f97316",
      highlight: "#a3a3a3",
      muted: "#d4d4d4",
      background: "#fafafa",
      foreground: "#0a0a0a",
      card: "rgba(255,255,255,0.8)",
      border: "rgba(0,0,0,0.1)",
    },
  },
};

export function createThemeFromCoolors(hexCodes: string[], isDark: boolean): ThemeColors {
  const [primary, secondary, accent, highlight, muted] = hexCodes;
  return {
    primary: primary || "#0077b6",
    secondary: secondary || "#023e8a",
    accent: accent || "#00b4d8",
    highlight: highlight || "#48cae4",
    muted: muted || "#90e0ef",
    background: isDark ? "#0a0a0a" : "#fafafa",
    foreground: isDark ? "#fafafa" : "#0a0a0a",
    card: isDark ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.6)",
    border: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
  };
}

export function parseCoolorsUrl(url: string): string[] {
  const match = url.match(/coolors\.co\/([a-f0-9-]+)/i);
  if (!match) return [];
  return match[1].split("-").map((hex) => `#${hex}`);
}

export function getGradient(colors: ThemeColors): string {
  return `linear-gradient(to right, ${colors.primary}, ${colors.accent})`;
}

export function getSectionGradient(colors: ThemeColors, mode: "light" | "dark"): string {
  return mode === "dark" ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.6)";
}

export function getGlowColor(colors: ThemeColors, mode: "light" | "dark"): string {
  return "transparent";
}
