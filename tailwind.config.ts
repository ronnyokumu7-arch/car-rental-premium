import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        /* ───────── Brand: Obsidian (near-black, warm-cool neutral) ───────── */
        obsidian: {
          50:  '#F6F6F7',
          100: '#E7E7EA',
          200: '#C9C9CF',
          300: '#A1A1AA',
          400: '#71717A',
          500: '#52525B',
          600: '#3F3F46',
          700: '#27272A',
          800: '#18181B',
          900: '#0E0E10',
          950: '#070708',
        },

        /* ───────── Accent: Copper (warm, metallic, jewelry-grade) ───────── */
        copper: {
          50:  '#FBF3EC',
          100: '#F6E2CF',
          200: '#EDC39B',
          300: '#E3A468',
          400: '#D98A44',
          500: '#C2702E', // primary CTA
          600: '#A85A22',
          700: '#87461B',
          800: '#653415',
          900: '#472410',
          950: '#29140A',
        },

        /* ───────── Secondary: Ivory / linen surfaces ───────── */
        ivory: {
          50:  '#FCFBF8',
          100: '#F7F4EE',
          200: '#EFEAE0',
          300: '#E3DCCD',
          400: '#D2C8B3',
          500: '#B8AC92',
        },

        /* ───────── Semantic tokens (light mode defaults) ───────── */
        background:        '#FCFBF8', // ivory-50
        surface:           '#FFFFFF',
        'surface-elevated':'#FFFFFF',
        'surface-sunken':  '#F7F4EE', // ivory-100
        border:            '#EFEAE0', // ivory-200
        'border-strong':   '#E3DCCD', // ivory-300

        ink: {
          DEFAULT: '#0E0E10', // obsidian-900
          muted:   '#52525B', // obsidian-500
          subtle:  '#A1A1AA', // obsidian-300
          inverted:'#FCFBF8', // ivory-50
        },

        success: { DEFAULT: '#15803D', soft: '#DCFCE7' },
        warning: { DEFAULT: '#B45309', soft: '#FEF3C7' },
        danger:  { DEFAULT: '#B91C1C', soft: '#FEE2E2' },
        info:    { DEFAULT: '#1D4ED8', soft: '#DBEAFE' },
      },

      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans:    ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono:    ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },

      borderRadius: {
        sm:  '0.25rem',
        md:  '0.5rem',
        lg:  '0.75rem',
        xl:  '1rem',
        '2xl':'1.25rem',
        '3xl':'1.75rem',
      },

      boxShadow: {
        /* Layered depth — the "expensive" feel */
        'card':      '0 1px 2px rgba(14,14,16,0.04), 0 4px 12px rgba(14,14,16,0.04)',
        'elevated':  '0 2px 4px rgba(14,14,16,0.05), 0 12px 32px rgba(14,14,16,0.08)',
        'luxe':      '0 8px 24px rgba(14,14,16,0.08), 0 32px 64px rgba(14,14,16,0.10)',
        'copper-glow':'0 8px 32px rgba(194,112,46,0.28)',
        'inner-line':'inset 0 1px 0 rgba(255,255,255,0.06)',
      },

      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-luxe':   'linear-gradient(135deg, #0E0E10 0%, #27272A 100%)',
        'gradient-copper': 'linear-gradient(135deg, #D98A44 0%, #C2702E 50%, #A85A22 100%)',
        'gradient-ivory':  'linear-gradient(180deg, #FCFBF8 0%, #F7F4EE 100%)',
        'sheen':           'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%)',
      },

      transitionTimingFunction: {
        'lux':   'cubic-bezier(0.22, 1, 0.36, 1)',
        'snap':  'cubic-bezier(0.4, 0, 0.2, 1)',
        'soft':  'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      transitionDuration: {
        '250':'250ms',
        '400':'400ms',
        '600':'600ms',
        '700': '700ms',
        '900': '900ms',
      },

      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'sheen-sweep': {
          '0%':   { transform: 'translateX(-120%)' },
          '100%': { transform: 'translateX(120%)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.6' },
        },
      },

      animation: {
        'fade-up':    'fade-up 600ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in':    'fade-in 400ms ease-out both',
        'sheen-sweep':'sheen-sweep 2.4s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
};
export default config;
