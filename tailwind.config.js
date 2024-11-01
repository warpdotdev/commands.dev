module.exports = {
  darkMode: "class",
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
        "app-light": "rgba(0, 0, 0, 0.05)",
        "card-active-light": "rgba(0, 0, 0, 0.05)",
        "card-active-dark": "rgba(255, 255, 255, 0.05)",
        "card-hover-light": "rgba(0, 0, 0, 0.12)",
        "card-hover-dark": "rgba(255, 255, 255, 0.08)",
        "card-light": "rgba(255, 255, 255, 1)",
        "card-dark": "rgba(51, 51, 51, 1)",
        "card-border-light": "rgba(0, 0, 0, 0.2)",
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
        "toggle-light": "rgba(206, 206, 206, 1)",
        "toggle-dark": "rgba(51, 51, 51, 1)",
        "search-bar-light": "rgba(0, 0, 0, 0.05)",
        "link-text-light": "rgba(1, 115, 220, 1)",
        "link-text-dark": "rgba(1, 164, 220, 1)",
        "null-search-text": "rgba(90, 90, 90, 1)",
        "navbar-banner": "rgba(1, 164, 220, 1)",
      },
    },
  },
};
