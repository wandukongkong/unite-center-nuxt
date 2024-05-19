import eslintPlugin from "vite-plugin-eslint";

export default defineNuxtConfig({
  modules: [
    "@nuxt/ui",
    "nuxt-icon",
    "nuxt-lodash",
    "@vueuse/motion/nuxt",
    "nuxt-lodash",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
  ],
  devtools: { enabled: true },
  vite: {
    plugin: [eslintPlugin()],
  },
  app: {
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
  },
});
