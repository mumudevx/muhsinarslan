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
      script: [
        // Google tag (gtag.js) - Async Script
        {
          src: "https://www.googletagmanager.com/gtag/js?id=G-WZGLHRF43F",
          async: true,
          key: 'gtag-js-async' // Use key for uniqueness
        },
        // Google tag (gtag.js) - Inline Script
        {
          innerHTML: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WZGLHRF43F');
          `,
          type: 'text/javascript',
          key: 'gtag-js-inline' // Use key for uniqueness
        }
      ]
    },
  },
  ssr: false,
});
