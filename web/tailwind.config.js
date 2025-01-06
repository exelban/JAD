export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: "selector",
  theme: {
    extend: {
      keyframes: {
        shaking: {
          "0%, 50%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(1deg)" },
          "75%": { transform: "rotate(-1deg)" },
        },
      },
      animation: {
        shaking: "shaking 400ms infinite",
      },
    },
  },
}