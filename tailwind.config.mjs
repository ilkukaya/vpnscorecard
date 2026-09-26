import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,ts,md,mdx}'],
  theme: {
    container: { center: true, padding: '1rem' },
    extend: {
      colors: {
        paper: '#F7F6F2',
        ink: { DEFAULT: '#121417', 2: '#2D323B', 3: '#5B6270', 4: '#8A909B' },
        line: { DEFAULT: '#E4E1DA', strong: '#CFCAC0' },
        accent: { DEFAULT: '#0F7B5F', ink: '#0B5C47', wash: '#E6F2ED', bright: '#14A37E' },
        amber: { DEFAULT: '#E9A23B', wash: '#FBF1E1', ink: '#8A5A12' },
        tone: { top: '#0F7B5F', high: '#2F6FB0', mid: '#B7791F', low: '#B4462C' },
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', '"Noto Sans"', '"Noto Sans Arabic"', '"Noto Sans Devanagari"', '"Hiragino Sans"', '"Apple SD Gothic Neo"', '"Noto Sans JP"', '"Noto Sans KR"', 'sans-serif'],
        display: ['"Fraunces Variable"', 'Fraunces', 'Georgia', '"Noto Serif"', 'serif'],
      },
      maxWidth: { page: '76rem', prose: '44rem' },
      boxShadow: {
        card: '0 1px 0 rgba(18,20,23,.04), 0 1px 3px rgba(18,20,23,.06)',
        lift: '0 2px 4px rgba(18,20,23,.04), 0 12px 32px -12px rgba(18,20,23,.18)',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.ink.2'),
            '--tw-prose-headings': theme('colors.ink.DEFAULT'),
            '--tw-prose-links': theme('colors.accent.ink'),
            '--tw-prose-bold': theme('colors.ink.DEFAULT'),
            '--tw-prose-bullets': theme('colors.accent.DEFAULT'),
            '--tw-prose-counters': theme('colors.accent.DEFAULT'),
            '--tw-prose-quote-borders': theme('colors.accent.DEFAULT'),
            '--tw-prose-th-borders': theme('colors.line.strong'),
            '--tw-prose-td-borders': theme('colors.line.DEFAULT'),
            maxWidth: '44rem',
            'h2, h3': { fontFamily: theme('fontFamily.display').join(','), fontWeight: '600', letterSpacing: '-0.01em' },
            a: { textUnderlineOffset: '3px', textDecorationThickness: '1px' },
          },
        },
      }),
    },
  },
  plugins: [typography],
};
