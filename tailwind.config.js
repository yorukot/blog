/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-hover': 'var(--color-primary-hover)',
        accent: 'var(--color-accent)',
        'bg': 'var(--color-bg)',
        'bg-card': 'var(--color-bg-card)',
        'text': 'var(--color-text)',
        'text-muted': 'var(--color-text-muted)',
        'text-contrast': 'var(--color-text-contrast)',
      }
    }
  },
  plugins: [],
};
