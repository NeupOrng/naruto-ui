// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  server: {
    port: 8080 // specify the port here
  },
  css: ['~~/assets/css/main.css'],
  modules: ['@element-plus/nuxt'],
  elementPlus: {
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
