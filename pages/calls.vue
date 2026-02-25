<script setup lang="ts">
const { data: serverData } = await useFetch("/api/interview");

const clientMessage = ref("Click to make a client-side call");
const isLoading = ref(false);

const makeClientCall = async () => {
  isLoading.value = true;
  const response = await $fetch<{ source: string; time: string }>("/api/client-check");
  clientMessage.value = `${response.source} at ${response.time}`;
  isLoading.value = false;
};
</script>

<template>
  <section class="card">
    <h2>Server Call vs Client Call</h2>
    <p>
      <strong>Server-side call:</strong> <code>useFetch</code> executed while rendering this page.
    </p>
    <p class="muted">{{ serverData?.description }}</p>
    <button :disabled="isLoading" @click="makeClientCall">
      {{ isLoading ? "Calling..." : "Run Client Call" }}
    </button>
    <p><strong>Client-side call:</strong> {{ clientMessage }}</p>
  </section>
</template>

