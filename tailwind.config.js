/* Tailwind Config - Liquid Glass Theme */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'ui-sans-serif', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
      },
      dropShadow: {
        glow: "0 6px 16px rgba(255,255,255,0.25)",
        lux: [
          "0 1px 1px rgba(255,255,255,0.25)",
          "0 30px 60px rgba(0,0,0,0.35)",
        ],
      },
      boxShadow: {
        glass: "0 10px 30px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255,255,255,0.06)",
      },
      colors: {
        aurelia: {
          50: "#fff1f4",
          100: "#ffe1e7",
          200: "#ffc7d0",
          300: "#ffa0af",
          400: "#fe8297",
          500: "#fe7390",
          600: "#f14a70",
          700: "#cf2e55",
          800: "#aa2848",
          900: "#8f2742",
        },
      },
      backgroundImage: {
        noise:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='128' height='128' viewBox='0 0 128 128'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/><feComponentTransfer><feFuncA type='table' tableValues='0 0.06'/></feComponentTransfer></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      },
      keyframes: {
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      animation: {
        'gradient-slow': 'gradient-shift 20s ease infinite',
      },
    },
  },
  plugins: [],
};
