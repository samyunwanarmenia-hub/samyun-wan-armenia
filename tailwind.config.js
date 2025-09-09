/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brandBlue: '#007BFF', // Added brandBlue
        brandBlueDark: '#126ee2', // New: Darker blue for FAB main button
        brandOrange: { // Extended brandOrange
          400: '#f6873b',
          500: '#f16100',
          600: '#d95700',
        },
        // ... keep existing colors
        // New primary (Soft Sage Green)
        primary: {
          50: '#f7fcf7',
          100: '#eaf4ea',
          200: '#d1e4d1',
          300: '#b8d4b8',
          400: '#9fc49f',
          500: '#86b486',
          600: '#6c906c',
          700: '#526c52',
          800: '#384838',
          900: '#1e241e',
        },
        // New secondary (Soft Blue/Gray)
        secondary: {
          50: '#f8fbfd',
          100: '#edf3f7',
          200: '#d5e2eb',
          300: '#bdd1de',
          400: '#a5c0d2',
          500: '#8dafd5', // Adjusted to be a bit more blue
          600: '#749bc8', // Adjusted
          700: '#5b789b',
          800: '#42556e',
          900: '#293241',
        },
        brandRed: { // Extended brandRed
          400: '#ef4444',
          500: '#dc2626',
          600: '#b91c1c',
        },
        yellow: { // Added yellow palette
          300: '#ffe08b', // Custom yellow for intro animation light mode
          500: '#facc15', // Tailwind default yellow-500 for intro animation dark mode
        }
      },
      textShadow: { // Custom text shadow utility
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        md: '0 4px 6px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
        'glossy-light': '0 0 5px rgba(255,255,255,0.8), 0 0 10px rgba(255,255,255,0.5)',
        'glossy-dark': '0 0 5px rgba(0,0,0,0.8), 0 0 10px rgba(0,0,0,0.5)',
      },
      // ... rest of the theme object
    },
  },
  plugins: [
    function ({ addUtilities, theme }) {
      const newUtilities = {
        '.text-shadow-glossy-light': {
          textShadow: theme('textShadow.glossy-light'),
        },
        '.text-shadow-glossy-dark': {
          textShadow: theme('textShadow.glossy-dark'),
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
}