export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@pinia/nuxt"],
  css: ["~/assets/main.css"],
  experimental: {
    inlineRouteRules: true
  },
  nitro: {
    prerender: {
      routes: ["/", "/about", "/static", "/posts/1", "/posts/2", "/posts/3"]
    }
  },
  routeRules: {
    "/static": { prerender: true },
    "/about": { prerender: true }
  }
});
