<script setup lang="ts">
const now = new Date().toISOString();
const { data } = await useFetch("/api/hello");
</script>

<template>
  <section class="card">
    <h2>SSR Page</h2>
    <p>This page demonstrates server-side rendering and data fetching on initial request.</p>
    <p><strong>Rendered at:</strong> {{ now }}</p>
    <p><strong>API message:</strong> {{ data?.message }}</p>
  </section>
</template>

