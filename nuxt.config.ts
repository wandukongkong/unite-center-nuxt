import eslintPlugin from "vite-plugin-eslint";

export default defineNuxtConfig({
  modules: ["@nuxt/ui", "nuxt-icon", "@vueuse/motion/nuxt", "nuxt-lodash"],
  devtools: { enabled: true },
  vite: {
    plugin: [eslintPlugin()],
  },
});
