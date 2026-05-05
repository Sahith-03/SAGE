import forms from '@tailwindcss/forms';
import containerQueries from '@tailwindcss/container-queries';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
      extend: {
          "colors": {
              "outline-variant": "#c3c6d1",
              "inverse-surface": "#2e3131",
              "secondary-fixed": "#d1e9d4",
              "on-secondary-fixed": "#0c1f13",
              "inverse-primary": "#a4c8ff",
              "on-tertiary-container": "#a5b2a5",
              "tertiary-fixed-dim": "#bdcabc",
              "error": "#ba1a1a",
              "surface": "#f8f9f9",
              "on-primary-fixed-variant": "#19487b",
              "surface-tint": "#366094",
              "primary-fixed": "#d4e3ff",
              "tertiary-container": "#39453b",
              "tertiary": "#232f25",
              "surface-container-low": "#f3f4f4",
              "on-surface": "#191c1c",
              "on-primary": "#ffffff",
              "surface-container-high": "#e7e8e8",
              "secondary-fixed-dim": "#b5ccb8",
              "on-surface-variant": "#42474f",
              "secondary-container": "#d1e9d4",
              "on-secondary": "#ffffff",
              "error-container": "#ffdad6",
              "surface-bright": "#f8f9f9",
              "on-secondary-fixed-variant": "#374b3c",
              "surface-dim": "#d9dada",
              "on-error": "#ffffff",
              "surface-container-highest": "#e1e3e3",
              "primary-fixed-dim": "#a4c8ff",
              "on-tertiary": "#ffffff",
              "background": "#f8f9f9",
              "surface-variant": "#e1e3e3",
              "surface-container": "#edeeee",
              "on-error-container": "#93000a",
              "primary": "#002d56",
              "outline": "#737780",
              "tertiary-fixed": "#d9e6d8",
              "secondary": "#4e6353",
              "on-secondary-container": "#546959",
              "on-tertiary-fixed": "#131e15",
              "on-background": "#191c1c",
              "surface-container-lowest": "#ffffff",
              "inverse-on-surface": "#f0f1f1",
              "on-tertiary-fixed-variant": "#3e4a3f",
              "on-primary-fixed": "#001c3a",
              "on-primary-container": "#89b1eb",
              "primary-container": "#124376"
          },
          "borderRadius": {
              "DEFAULT": "0.125rem",
              "lg": "0.25rem",
              "xl": "0.5rem",
              "full": "0.75rem"
          },
          "fontFamily": {
              "headline": ["Noto Serif", "serif"],
              "body": ["Manrope", "sans-serif"],
              "label": ["Manrope", "sans-serif"],
              "mono": ["Poppins", "sans-serif"]
          }
      },
  },
  plugins: [
    forms,
    containerQueries,
  ],
}
