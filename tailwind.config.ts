import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-poppins)'],
        display: ['var(--font-poppins)'],
        poppins: ['var(--font-poppins)']
      },
      keyframes: {
        'pulse-glow': {
            '0%, 100%': { 
                transform: 'scale(1)',
                filter: 'drop-shadow(0 0 5px rgba(252, 211, 77, 0.4))'
            },
            '50%': { 
                transform: 'scale(1.05)',
                filter: 'drop-shadow(0 0 15px rgba(252, 211, 77, 0.7))'
            },
        },
      },
      animation: {
        'pulse-glow': 'pulse-glow 2.5s infinite ease-in-out',
      },
      // Perubahan ada di sini: kita tidak lagi menggunakan fungsi arrow
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-headings': '#fcd34d', // amber-300
            '--tw-prose-links': '#f59e0b',    // amber-500
            '--tw-prose-body': '#d4d4d8',     // neutral-300
            '--tw-prose-bold': '#ffffff',
            p: {
                fontSize: '1rem',
                lineHeight: '1.5',
            },
            h1: {
                fontFamily: 'var(--font-cinzel)',
                fontSize: '2.25rem', // 4xl
            },
            h2: {
                fontFamily: 'var(--font-cinzel)',
                fontSize: '1.875rem', // 3xl
            },
            h3: {
                fontFamily: 'var(--font-cinzel)',
                fontSize: '1.5rem', // 2xl
            },
            a: {
                transition: 'color 0.2s ease-in-out',
                '&:hover': {
                    color: '#fcd34d', // amber-300
                },
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config