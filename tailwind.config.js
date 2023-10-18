/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
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
      'navy-blue': '#663481'
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      }
    }
  },
  plugins: []
}
