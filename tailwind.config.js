/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    borderWidth: {
      DEFAULT: '1px',
      0: '0',
      0.5: '.5',
      1: '1px',
      1.5: '1.5px',
      2: '2px',
      3: '3px',
      4: '4px',
      6: '6px',
      8: '8px'
    },
    colors: {
      orange: {
        300: '#FDBA74',
        600: '#EB5A0C'
      },
      white: '#ffffff',
      black: '#0D0D0D',
      gray: {
        100: '#F3F4F6',
        200: '#E5E7EB',
        400: '#9CA3AF',
        500: '#6B7280'
      },
      stone: {
        100: '#F5F5F4'
      },
      'navy-blue': '#663481',
      'navy-blue-light': '#9B70BE'
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      gridTemplateRows: {
        37: 'repeat(37, minmax(0, 1fr))',
        45: 'repeat(45, minmax(0, 1fr))'
      },
      gridRowEnd: {
        16: '16',
        37: '37',
        46: '46',
        38: '38'
      }
    }
  },
  plugins: []
}
