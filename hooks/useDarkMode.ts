import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

export function useDarkMode() {
  const [theme, setTheme] = useState<Theme>("system");

  // Load stored preference
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored) {
      setTheme(stored);
    }
  }, []);

  // Apply theme and persist
  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = document.documentElement;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = (t: Theme) => {
      const effective =
        t === "system" ? (mediaQuery.matches ? "dark" : "light") : t;
      if (effective === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };

    applyTheme(theme);
    localStorage.setItem("theme", theme);

    if (theme === "system") {
      const handler = () => applyTheme("system");
      if (typeof mediaQuery.addEventListener === "function") {
        mediaQuery.addEventListener("change", handler);
        return () => mediaQuery.removeEventListener("change", handler);
      } else if (
        typeof (
          mediaQuery as MediaQueryList & {
            addListener?: (listener: (e: MediaQueryListEvent) => void) => void;
            removeListener?: (listener: (e: MediaQueryListEvent) => void) => void;
          }
        ).addListener === "function"
      ) {
        const legacy = mediaQuery as MediaQueryList & {
          addListener: (listener: (e: MediaQueryListEvent) => void) => void;
          removeListener: (listener: (e: MediaQueryListEvent) => void) => void;
        };
        legacy.addListener(handler);
        return () => legacy.removeListener(handler);
      }
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) =>
      prev === "light" ? "dark" : prev === "dark" ? "system" : "light"
    );
  };

  return { theme, setTheme, toggleTheme };
}
