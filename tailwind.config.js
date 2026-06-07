/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#060608',
          50: '#0b0b0f',
          100: '#101015',
          200: '#16161d',
        },
        accent: {
          teal: '#5eead4',
          indigo: '#818cf8',
          fuchsia: '#e879f9',
          amber: '#fbbf24',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        content: '1180px',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      keyframes: {
        aurora: {
          '0%, 100%': { transform: 'translate(-10%, -10%) rotate(0deg)', opacity: '0.5' },
          '50%': { transform: 'translate(10%, 10%) rotate(180deg)', opacity: '0.8' },
        },
        'gradient-pan': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '0.6' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
      },
      animation: {
        aurora: 'aurora 18s ease-in-out infinite',
        'gradient-pan': 'gradient-pan 8s ease infinite',
        float: 'float 6s ease-in-out infinite',
        marquee: 'marquee 38s linear infinite',
        'fade-up': 'fade-up 0.6s ease-out both',
        'pulse-ring': 'pulse-ring 3s cubic-bezier(0.4,0,0.2,1) infinite',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
