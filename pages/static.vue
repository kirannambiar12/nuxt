<script setup lang="ts">
defineRouteRules({
  prerender: true
});

const buildConcepts = [
  "Nuxt can pre-render pages for static hosting",
  "API routes run in Nitro server/runtime",
  "You can mix SSR and static routes in one app"
];
</script>

<template>
  <section class="card">
    <h2>Static / Pre-rendered Page</h2>
    <p>This route is configured to be pre-rendered at build time.</p>
    <ul>
      <li v-for="item in buildConcepts" :key="item">{{ item }}</li>
    </ul>
  </section>
</template>

