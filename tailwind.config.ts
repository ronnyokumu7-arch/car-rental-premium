import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          500: '#1a365d',
          700: '#0f2440',
          900: '#081529',
        },
        accent: {
          50: '#fdf8ed',
          100: '#faefd4',
          500: '#c9a227',
          600: '#a8861f',
          700: '#8a6d18',
        },
        porcelain: '#faf9f7',
        charcoal: {
          300: '#b5b5b5',
          400: '#8a8a8a',
          500: '#6b6b6b',
          700: '#3d3d3d',
          900: '#1a1a1a',
        },
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        sm: '0.25rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
      },
    },
  },
  plugins: [],
};

export default config;