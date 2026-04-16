import type { Config } from 'tailwindcss';

export default {
  content: ['./app.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        shell: '#0f1115',
        panel: '#16181d',
        panelSoft: '#1d2127',
        preview: '#f8fafc',
        line: '#2a2f37',
      },
      boxShadow: {
        panel: '0 24px 60px rgba(0, 0, 0, 0.24)',
        preview: '0 24px 80px rgba(15, 23, 42, 0.12)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      fontFamily: {
        sans: ['Segoe UI', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config;

