/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // New Color Palette
        'primary-green': '#2E7D32', // Deep natural green for trust and nature
        'secondary-green': '#4CAF50', // Vibrant accent green
        'warm-accent': '#FF9800', // Orange for energy and action calls
        'neutral-dark': '#212121', // For primary text
        'neutral-medium': '#757575', // Secondary text
        'neutral-light': '#F5F5F5', // Backgrounds
        'pure-white': '#FFFFFF', // Containers, cards
      },
      fontFamily: {
        // New Typography
        display: ['"Playfair Display"', 'serif'], // Headings
        sans: ['Inter', 'sans-serif'], // Body Text
        serif: ['Lora', 'serif'], // Special Elements (e.g., for quotes/testimonials)
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
        'gradient-text': 'linear-gradient(to right, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'glow-red': '0 0 15px rgba(239, 68, 68, 0.5), 0 0 30px rgba(239, 68, 68, 0.3)',
        'card-hover': '0 10px 20px rgba(0, 0, 0, 0.2), 0 5px 10px rgba(0, 0, 0, 0.1)',
        'glow-green': '0 0 15px rgba(34, 197, 94, 0.5), 0 0 30px rgba(34, 197, 94, 0.3)',
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
        '.border-gradient-green-emerald': {
          'border-image': 'linear-gradient(to right, #22c55e, #10b981) 1',
          'border-width': '2px',
          'border-style': 'solid',
        },
      });
    },
  ],
}