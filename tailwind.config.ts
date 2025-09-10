import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./hooks/**/*.{ts,tsx}"],
};

export default config;
