import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // Enable dark mode with the 'class' strategy
  theme: {
    extend: {
      colors: {
        // CSS variables for background and foreground
        background: "var(--background)", // Customize this in global styles
        foreground: "var(--foreground)", // Customize this in global styles

        // Custom theme colors
        // primary: "var(--blue)", // Primary color
        secondary: "var(--eunry)", // Secondary color
        accent: "var(--pottersClay)", // Accent color

        // Status colors
        success: "#4caf50",
        warning: "#ff9800",
        error: "#f44336",
        disabled: "#e0e0e0",
        primary: "#1110EE",
        default: "#FFFFFF",

        // Lighter versions of your primary colors for hover effects
        "primary-light": "var(--blue-light)",
        "secondary-light": "var(--eunry-light)",
        "accent-light": "var(--pottersClay-light)",

        // Grayscale palette for backgrounds and text
        "gray-dark": "#333",
        "gray-light": "#f4f4f4",
        "text-primary": "#333",
        "text-secondary": "#666",
        "text-light": "#fff",
      },
      spacing: {
        // Custom spacing values
        18: "4.5rem", // custom spacing value
        72: "18rem", // custom spacing value
      },
      borderRadius: {
        // Add custom border-radius values
        "4xl": "2rem",
      },
      fontSize: {
        // Custom font size
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
      },
      fontFamily: {
        crimson: ["Crimson Text", "serif"],
      },
      boxShadow: {
        lg: "0px 10px 20px rgba(0, 0, 0, 0.15)", // Customize shadow if necessary
      },
    },
  },
  plugins: [
    // Use modern import syntax for Tailwind plugins
    forms,
    typography,
  ],
} satisfies Config;
