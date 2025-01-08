import type { Config } from "tailwindcss";

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        "custom-background": "#461220",
        "custom-bg2": "#F1B5A5"
      },
    },
  },
  plugins: [],
} satisfies Config;
