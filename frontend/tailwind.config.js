/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#9B1B1F",
          light: "#B52228",
          dark: "#6B0B0F",
        },
        success: {
          DEFAULT: "#4CAF50",
          light: "#81C784",
          dark: "#388E3C",
        },
        surface: {
          light: "#FFFFFF",
          dark: "#2D2D2D",
        },
        "surface-elevated": {
          light: "#FFFFFF",
          dark: "#404040",
        },
        "text-primary": {
          light: "#2D2D2D",
          dark: "#FFFFFF",
        },
        "text-secondary": {
          light: "#666666",
          dark: "#A0A0A0",
        },
        "text-muted": {
          light: "#9CA3AF",
          dark: "#6B7280",
        },
        border: {
          light: "#E5E7EB",
          dark: "#374151",
        },
        focus: "#9B1B1F",
        scrollbar: "#9B1B1F",
        beige: {
          DEFAULT: "#E8DDD3",
          light: "#F5F0EA",
          dark: "#E6D9CE",
        },
        "custom-black": {
          DEFAULT: "#1C1A1A",
          light: "#2A2727",
          lighter: "#3A3636",
        },
        accent: {
          DEFAULT: "#4CAF50",
          light: "#81C784",
          dark: "#388E3C",
        },
        section: {
          light: "#FFFFFF",
          dark: "#1C1A1A",
          alt: {
            light: "#F5F0EA",
            dark: "#2A2727",
          },
          card: {
            light: "#F8F8F8",
            dark: "#353535",
          },
        },
        // ── Dev Landing Blue Palette ──────────────────────────
        dev: {
          DEFAULT: "#1e90d4",
          light: "#3baee8",
          dark: "#1574a8",
          darker: "#0f5a85",
        },
        "dev-bg": {
          DEFAULT: "#0a1628",
          surface: "#0d2240",
          elevated: "#1a3a5c",
          card: "#122a47",
        },
        "dev-text": {
          DEFAULT: "#c8dff5",
          muted: "#7ba8cc",
          bright: "#e8f0f8",
        },
      },
      boxShadow: {
        "glow-sm": "0 0 10px rgba(155, 27, 31, 0.2)",
        glow: "0 0 20px rgba(155, 27, 31, 0.3)",
        "glow-lg": "0 0 30px rgba(155, 27, 31, 0.4)",
        // Dev blue glows
        "dev-glow-sm": "0 0 10px rgba(30, 144, 212, 0.2)",
        "dev-glow": "0 0 20px rgba(30, 144, 212, 0.3)",
        "dev-glow-lg": "0 0 30px rgba(30, 144, 212, 0.4)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.5s ease-out",
        "spin-slow": "spin 3s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
