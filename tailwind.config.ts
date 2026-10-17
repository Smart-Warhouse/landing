import type { Config } from 'tailwindcss';

// Semantic colours only: every value is a `--sw-*` CSS variable that flips under `.dark`
// (src/index.css). Never put an opacity modifier on these: Tailwind 3 emits nothing for a bare var().
const v = (name: string) => `var(--sw-${name})`;

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: v('bg'),
        surface: { DEFAULT: v('surface'), 2: v('surface-2') },
        line: v('border'),
        ink: { DEFAULT: v('text'), 2: v('text-2'), 3: v('text-3') },
        accent: {
          DEFAULT: v('accent'),
          hover: v('accent-hover'),
          on: v('accent-on'),
          soft: v('accent-soft'),
        },
        lift: { DEFAULT: v('lift'), on: v('lift-on'), soft: v('lift-soft'), ink: v('lift-text') },
        success: { DEFAULT: v('success'), soft: v('success-soft') },
        warning: { DEFAULT: v('warning'), soft: v('warning-soft') },
        danger: { DEFAULT: v('danger'), soft: v('danger-soft') },
        info: { DEFAULT: v('info'), soft: v('info-soft') },
        ring: v('ring'),
        inverse: {
          DEFAULT: v('inverse'),
          2: v('inverse-2'),
          line: v('inverse-border'),
          ink: v('inverse-text'),
          'ink-2': v('inverse-text-2'),
        },
      },
      fontFamily: {
        sans: ['"Thmanyah Sans"', 'Lexend', 'system-ui', 'sans-serif'],
        display: ['"Thmanyah Serif Text"', '"Thmanyah Sans"', 'Lexend', 'serif'],
        en: ['Lexend', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      maxWidth: { content: '76rem' },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: { 'fade-up': 'fade-up 600ms cubic-bezier(0.16, 1, 0.3, 1) both' },
    },
  },
  plugins: [],
} satisfies Config;
