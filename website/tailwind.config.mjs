/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    colors: {
      white: '#FFFFFF',
      black: '#000000',
      accent: '#C580FC',
      secondary: '#8500EF',
      transparent: 'transparent',
      gray: {
        50: '#FAFAF9',
        100: '#F5F5F4',
        200: '#E7E5E4',
        300: '#D6D3D1',
        400: '#A8A29E',
        500: '#78716C',
        600: '#57534E',
        700: '#44403C',
        800: '#292524',
        900: '#1C1917',
        950: '#0C0A09',
      },
    },
  },
  plugins: [],
};
