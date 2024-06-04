import eslintPlugin from "vite-plugin-eslint";

export default defineNuxtConfig({
  imports: {
    autoImport: true,
  },
  modules: [
    "@nuxt/ui",
    "nuxt-icon",
    "nuxt-lodash",
    "@vueuse/motion/nuxt",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "dayjs-nuxt",
    "@nuxtjs/device",
  ],
  devtools: { enabled: true },
  vite: {
    plugin: [eslintPlugin()],
    server: {
      hmr: {
        port: 3008,
      },
      watch: {
        usePolling: true,
      },
    },
  },
  app: {
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
  },
  nitro: {},
});
