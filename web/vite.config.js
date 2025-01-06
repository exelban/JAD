import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import tailwindcss from "tailwindcss"

export default defineConfig({
  base: "./",
  plugins: [vue()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  server: {
    port: 51345,
  },
})
