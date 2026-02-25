<script setup lang="ts">
const { data } = await useFetch("/api/interview");
</script>

<template>
  <section class="card">
    <h2>Home</h2>
    <p>
      This page is server-side rendered by default. It fetches data from a Nitro API route using
      <code>useFetch</code>.
    </p>
    <ul v-if="data?.highlights?.length">
      <li v-for="item in data.highlights" :key="item">{{ item }}</li>
    </ul>
  </section>
</template>

