import { ColorScheme } from "#build/components";
import eslintPlugin from "vite-plugin-eslint";

export default defineNuxtConfig({
  imports: {
    autoImport: true,
  },
  modules: [
    "@nuxt/ui",
    "nuxt-lodash",
    "nuxt-icon",
    "@vueuse/motion/nuxt",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "dayjs-nuxt",
    "@nuxtjs/device",
    "@nuxt/image",
    "@nuxtjs/color-mode",
    "nuxt-echarts",
    "nuxt-mongoose",
  ],
  serverMiddleware: [{ path: "/api", handler: "~/api/index.js" }],
  mongoose: {
    uri: "mongodb+srv://toutopia0:michael89!@pokemonunitecenter.elr1ojx.mongodb.net/",
    options: {},
    modelsDir: "models",
    devtools: true,
  },
  devtools: { enabled: false },
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
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "Unite Center",
      link: [{ rel: "icon", type: "image/x-icon", href: "/ball.ico" }],
      // meta: {
      //   // colorScheme: "light only",
      //   // supportedColorSchemes: "light",
      // },
    },
  },
  nitro: {},
  echarts: {
    ssr: true,
    renderer: ["canvas", "svg"],
    charts: ["BarChart"],
    components: ["DatasetComponent", "GridComponent", "TooltipComponent"],
  },
});
