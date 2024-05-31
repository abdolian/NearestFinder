import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fade-in 0.25s forwards ease-out',
        'slide-down': 'slide-down 0.25s forwards ease-out',
        'slide-up': 'slide-up 0.25s forwards ease-out',
        'spin': 'spin 1s linear infinite'
      },
      backgroundImage: {
        'hero-pattern': "url('/background.svg')"
      },
    },
    keyframes: {
      'fade-in': {
        'from': { opacity: '0' },
        'to': { opacity: '1' },
      },
      'slide-down': {
        'from': { transform: 'translateY(-7rem)' },
        'to': { transform: 'translateY(0%)' },
      },
      'slide-up': {
        'from': { transform: 'translateY(0%)' },
        'to': { transform: 'translateY(-7rem)' },
      },
      'spin': {
        'from': { transform: 'rotate(0deg)' },
        'to': { transform: 'rotate(360deg)' },
      },
    }
  },
  plugins: [],
};
export default config;
