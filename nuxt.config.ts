import { APP_NAME } from "./config/index";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  globalName: APP_NAME,
  typescript: {
    strict: true,
  },
  head: {
    title: APP_NAME,
    titleTemplate: `%s - ${APP_NAME}`,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ]
  },
  app: {
    head: {
      link: [{ rel: "icon", type: "image/png", href: "/icons/logo.png" }],
    },
  },
  modules: [
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          "Nunito Sans": {
            wght: [300, 400, 500, 600, 700, 800, 900],
          },
        },
        download: true,
        inject: true,
        display: "swap",
        useStylesheet: true,
      },
    ],
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "nuxt-svgo",
    "dayjs-nuxt",
    'nuxt-gtag',
    '@zadigetvoltaire/nuxt-gtm'
  ],
  pinia: {
    autoImports: [
      "defineStore", // import { defineStore } from 'pinia'
      ["defineStore", "definePiniaStore"], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
  gtag: {
    id: 'G-2G1L6BZS5Q',
    config: {
      page_title: 'Goborr'
    }
  },
  gtm: {
    id: 'GTM-NNSMBWK8'
  },
  css: ["~/styles/main.scss", "vue-toastification/dist/index.css"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
            '@use "@/styles/_variables.scss" as *; @use "@/styles/_mixins.scss" as *;',
        },
      },
    },
  },
  build: {
    transpile: ["vue-toastification"],
  },
});
