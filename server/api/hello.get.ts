export default defineEventHandler(() => {
  return {
    message: "Hello from the Nuxt server API",
    renderedAt: new Date().toISOString()
  };
});
