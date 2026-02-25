<script setup lang="ts">
definePageMeta({
  ssr: false
});

const message = ref("Loading from client...");

onMounted(async () => {
  const response = await $fetch<{ message: string; renderedAt: string }>("/api/hello");
  message.value = `${response.message} (${response.renderedAt})`;
});
</script>

<template>
  <section class="card">
    <h2>Client-only Page (CSR)</h2>
    <p>This route disables SSR using <code>definePageMeta({ ssr: false })</code>.</p>
    <p><strong>Client API response:</strong> {{ message }}</p>
  </section>
</template>

