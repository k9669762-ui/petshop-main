import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: "#e0f7fa",
          100: "#b2ebf2",
          200: "#80deea",
          300: "#4dd0e1",
          400: "#26c6da",
          500: "#00bcd4",
          600: "#00acc1",
          700: "#0097a7",
          800: "#00838f",
          900: "#006064",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          50: "#fff3e0",
          100: "#ffe0b2",
          200: "#ffcc80",
          300: "#ffb74d",
          400: "#ffa726",
          500: "#ff9800",
          600: "#fb8c00",
          700: "#f57c00",
          800: "#ef6c00",
          900: "#e65100",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        // 🐠 Fish Colors
        fish: {
          cyan: "#06b6d4",
          blue: "#0ea5e9",
          teal: "#14b8a6",
          deep: "#0284c7",
          light: "#e0f2fe",
        },
        // 🦜 Bird Colors
        bird: {
          orange: "#f97316",
          yellow: "#fbbf24",
          red: "#ef4444",
          green: "#22c55e",
          light: "#fff7ed",
        },
        // General Colors
        coral: {
          DEFAULT: "#FF6B6B",
          foreground: "#ffffff",
        },
        gold: {
          DEFAULT: "#ffc107",
          foreground: "#1a1a1a",
        },
        emerald: {
          DEFAULT: "#10b981",
          foreground: "#ffffff",
        },
        ocean: {
          light: "#e0f7fa",
          DEFAULT: "#0097a7",
          dark: "#006064",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        swim: {
          "0%": { transform: "translateX(-100%) scaleX(1)" },
          "49%": { transform: "translateX(100vw) scaleX(1)" },
          "50%": { transform: "translateX(100vw) scaleX(-1)" },
          "99%": { transform: "translateX(-100%) scaleX(-1)" },
          "100%": { transform: "translateX(-100%) scaleX(1)" },
        },
        bubble: {
          "0%": { transform: "translateY(100vh) scale(0)", opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { transform: "translateY(-100vh) scale(1)", opacity: "0" },
        },
        wave: {
          "0%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(10deg)" },
          "75%": { transform: "rotate(-10deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 3s ease-in-out infinite",
        swim: "swim 15s linear infinite",
        bubble: "bubble 4s ease-in-out infinite",
        wave: "wave 2s ease-in-out infinite",
        shimmer: "shimmer 2s infinite linear",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
      },
      backgroundImage: {
        // 🐠 Fish/Aquatic Gradients
        "ocean-gradient": "linear-gradient(180deg, #006064 0%, #00bcd4 100%)",
        "fish-gradient": "linear-gradient(135deg, #00838f 0%, #00bcd4 50%, #4dd0e1 100%)",
        "deep-sea": "linear-gradient(180deg, #0d1b2a 0%, #1a4a5e 50%, #006064 100%)",
        
        // 🦜 Bird/Tropical Gradients  
        "bird-gradient": "linear-gradient(135deg, #ff9800 0%, #ffc107 50%, #ffeb3b 100%)",
        "tropical-gradient": "linear-gradient(135deg, #ff6b6b 0%, #ff9800 50%, #ffc107 100%)",
        "sunset-gradient": "linear-gradient(180deg, #ff9800 0%, #f44336 100%)",
        
        // Combined Theme
        "pet-gradient": "linear-gradient(135deg, #00bcd4 0%, #009688 25%, #4caf50 50%, #ff9800 75%, #f44336 100%)",
        "coral-gradient": "linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)",
        "glass": "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
        "glass-dark": "linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
