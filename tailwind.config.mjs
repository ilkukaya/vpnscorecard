/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#1a1f36',
          DEFAULT: '#4f46e5',
          light: '#818cf8',
        },
        score: {
          excellent: '#10B981',
          great: '#3B82F6',
          good: '#8B5CF6',
          fair: '#F59E0B',
          poor: '#EF4444',
        },
        rank: {
          gold: '#F59E0B',
          silver: '#6B7280',
          bronze: '#B45309',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'gauge-fill': 'gaugeFill 1.5s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        gaugeFill: {
          '0%': { strokeDashoffset: '283' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
