module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  variants: {
    extend: {
      backgroundColor: ["active"],
    },
  },
  theme: {
    extend: {
      colors: {
        "app-dark": "rgba(22, 22, 22, 1)",
        "card-active-light": "rgba(0, 0, 0, 0.05)",
        "card-active-dark": "rgba(255, 255, 255, 0.05)",
        "card-hover-light": "rgba(0, 0, 0, 0.12)",
        "card-hover-dark": "rgba(255, 255, 255, 0.12)",
        "card-light": "rgba(255, 255, 255, 1)",
        "card-dark": "rgba(255, 255, 255, 0.08)",
        "card-border-light": "rgba(0, 0, 0, 0.3)",
        "card-border-dark": "rgba(255, 255, 255, 0.08)",
        "pill-light": "rgba(0, 0, 0, 0.1)",
        "pill-dark": "rgba(255, 255, 255, 0.1)",
        "arg-highlight": "rgb(1, 164, 220)",
        "icon-light": "rgba(0, 0, 0, 1)",
        "icon-dark": "rgba(255, 255, 255, 1)",
        "command-light": "rgba(0, 0, 0, 0.05)",
        "command-dark": "rgba(255, 255, 255, 0.05)",
        "navbar-light": "rgba(255, 255, 255, 1)",
        "navbar-dark": "rgba(0, 0, 0, 1)",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
