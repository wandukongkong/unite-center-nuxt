import eslintPlugin from "vite-plugin-eslint";

export default defineNuxtConfig({
  modules: ["@nuxt/ui", "nuxt-icon"],
  devtools: { enabled: true },
  vite: {
    plugin: [eslintPlugin()],
  },
});
