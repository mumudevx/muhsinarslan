// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  css: ["@/assets/css/tailwind.css"],

  modules: [
    "@nuxt/content",
    "@nuxt/image",
    "@nuxt/fonts",
    "@nuxt/eslint",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
  ],

  app: {
    head: {
      title: "Muhsin Arslan",
      htmlAttrs: {
        lang: "en",
      },
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
});
