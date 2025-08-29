/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode based on class
  theme: {
    extend: {
      colors: {
        // Existing primary (green) and secondary (teal) are good.
        // Let's ensure they are used consistently.
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        secondary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        // New white palette for soft backgrounds
        white: {
          DEFAULT: '#FFFFFF',
          50: '#F9FAFB', // Very light gray for subtle backgrounds
          100: '#F3F4F6', // Light gray
          200: '#E5E7EB', // Slightly darker light gray
        },
        // New light green palette (already exists, ensuring it's consistent)
        lightGreen: {
          DEFAULT: '#A7F3D0', // A bright, light green
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
        },
        // Define a brand red/orange gradient for primary CTAs if needed,
        // but for now, we'll use direct gradient classes.
        // Let's add a specific green for accents
        accentGreen: {
          500: '#22c55e', // Primary green
          600: '#16a34a', // Darker green
        },
        // Define a brand red for primary actions
        brandRed: {
          500: '#ef4444',
          600: '#dc2626',
        },
        // Define a brand orange for secondary actions
        brandOrange: {
          500: '#f97316',
          600: '#ea580c',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Cal Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'shine': 'shine 2s infinite linear',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shine: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        fadeInUp: {
          from: {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%)',
        'gradient-text': 'linear-gradient(to right, var(--tw-gradient-stops))', // New text gradient
      },
      boxShadow: {
        'glow-red': '0 0 15px rgba(239, 68, 68, 0.5), 0 0 30px rgba(239, 68, 68, 0.3)', // Refined glow
        'card-hover': '0 10px 20px rgba(0, 0, 0, 0.2), 0 5px 10px rgba(0, 0, 0, 0.1)', // General card hover shadow
        'glow-green': '0 0 15px rgba(34, 197, 94, 0.5), 0 0 30px rgba(34, 197, 94, 0.3)', // New green glow
        'glow-green-dark': '0 0 15px rgba(34, 197, 94, 0.3), 0 0 30px rgba(34, 197, 94, 0.15)', // Dark mode green glow
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.text-gradient': {
          'background-image': 'linear-gradient(to right, var(--tw-gradient-stops))',
          '-webkit-background-clip': 'text',
          'background-clip': 'text',
          'color': 'transparent',
        },
        '.border-gradient-red-orange': {
          'border-image': 'linear-gradient(to right, #ef4444, #f97316) 1',
          'border-width': '2px',
          'border-style': 'solid',
        },
        '.border-gradient-green-emerald': { // New green gradient border
          'border-image': 'linear-gradient(to right, #22c55e, #10b981) 1',
          'border-width': '2px',
          'border-style': 'solid',
        },
      });
    },
  ],
}