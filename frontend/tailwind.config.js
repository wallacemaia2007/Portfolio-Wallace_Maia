/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // ═══════════════════════════════════════
        // PALETA PRINCIPAL - Vermelho/Bege/Preto
        // ═══════════════════════════════════════

        primary: {
          DEFAULT: "#9B1B1F", // Red Medium
          light: "#B52228", // Red claro
          dark: "#6B0B0F", // Red Dark
        },

        beige: {
          DEFAULT: "#E8DDD3", // Beige principal
          light: "#F5F0EA", // Beige claro
          dark: "#E6D9CE", // Beige escuro
        },

        "custom-black": {
          DEFAULT: "#1C1A1A", // Preto principal (mais elegante)
          light: "#2A2727", // Preto suavizado
          lighter: "#3A3636", // Cinza escuro quente
        },

        // Acento verde (success/completed)
        accent: {
          DEFAULT: "#4CAF50",
          light: "#81C784",
          dark: "#388E3C",
        },
      },

      boxShadow: {
        sm: "0 1px 2px 0 rgba(155, 27, 31, 0.05)",
        md: "0 4px 6px -1px rgba(155, 27, 31, 0.1)",
        lg: "0 10px 15px -3px rgba(155, 27, 31, 0.1)",
        xl: "0 20px 25px -5px rgba(155, 27, 31, 0.1)",
        "2xl": "0 25px 50px -12px rgba(155, 27, 31, 0.25)",
        glow: "0 0 20px rgba(155, 27, 31, 0.3)",
        "glow-sm": "0 0 10px rgba(155, 27, 31, 0.2)",
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
