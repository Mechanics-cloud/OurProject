import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/common/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [require('tailwindcss-radix')()],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      colors: {
        accent: {
          100: '#73A5FF',
          300: '#4C8DFF',
          500: '#397DF6',
          700: '#2F68CC',
          900: '#234E99',
        },
        danger: {
          100: '#FF8099',
          300: '#F23D61',
          500: '#CC1439',
          700: '#990F2B',
          900: '#660A1D',
        },
        dark: {
          100: '#4C4C4C',
          300: '#333333',
          400: '#212121',
          500: '#171717',
          700: '#0D0D0D',
          900: '#000000',
        },
        light: {
          100: '#FFFFFF',
          300: '#F7FBFF',
          500: '#EDF3FA',
          700: '#D5DAE0',
          900: '#8D9094',
        },
        success: {
          100: '#80FFBF',
          300: '#22E584',
          500: '#14CC70',
          700: '#0F9954',
          900: '#0A6638',
        },
        warning: {
          100: '#FFD073',
          300: '#E5AC39',
          500: '#D99000',
          700: '#996600',
          900: '#664400',
        },
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      fontSize: {
        l: '18px',
        m: '16px',
        s: '14px',
        xl: '20px',
        xs: '12px',
        xxl: '26px',
      },
      fontWeight: {
        '400': '400',
        '500': '500',
        '600': '600',
        '700': '700',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['radix-state-active'],
      textColor: ['radix-state-active'],
    },
  },
}

export default config
