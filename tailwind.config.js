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
        // ... rest of the file
      },
      // ... rest of the theme object
    },
  },
  plugins: [],
}