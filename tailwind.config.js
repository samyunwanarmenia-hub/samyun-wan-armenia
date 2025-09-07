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
        brandOrange: '#f16100', // New: Orange for FAB hover state
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
        brandRed: { // Ensure brandRed is defined if used elsewhere
          400: '#ef4444',
          600: '#dc2626',
        }
      },
      // ... rest of the theme object
    },
  },
  plugins: [],
}