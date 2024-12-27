/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'], // Enables class-based dark mode
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}', // Add custom feature directories if any
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        border: 'hsl(var(--border))',
      },
      keyframes: {
        flip: {
          '0%': { transform: 'rotateY(0deg)' },
          '50%': { transform: 'rotateY(90deg)' },
          '100%': { transform: 'rotateY(180deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(-10px)' },
          '50%': { transform: 'translateY(10px)' },
        },
      },
      animation: {
        flip: 'flip 0.6s ease-in-out', // Smooth flip effect
        float: 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 10s linear infinite',
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'hsl(var(--foreground))',
            a: {
              color: 'hsl(var(--primary))',
              '&:hover': {
                color: 'hsl(var(--primary-foreground))',
              },
            },
            pre: {
              backgroundColor: 'hsl(var(--muted))',
              borderRadius: '8px',
              padding: '1rem',
              fontSize: '0.875rem',
              overflowX: 'auto',
              color: 'hsl(var(--foreground))',
              code: {
                background: 'transparent',
                color: 'inherit',
              },
            },
            code: {
              fontSize: '1.1rem',
              fontWeight: '600',
              color: 'hsl(var(--primary))',
            },
          },
        },
        dark: {
          css: {
            pre: {
              backgroundColor: 'hsl(var(--background))',
              color: 'hsl(var(--foreground))',
            },
          },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
};
