import eslintPlugin from "vite-plugin-eslint";

export default defineNuxtConfig({
  modules: ["@nuxt/ui", "nuxt-icon", "@vueuse/motion/nuxt"],
  devtools: { enabled: true },
  vite: {
    plugin: [eslintPlugin()],
  },
});
