// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/ui",
    "nuxt-icon",
    [
      "@nuxtjs/eslint-module",
      {
        /* module options */
      },
    ],
  ],
  devtools: { enabled: true },
});
