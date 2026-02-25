<script setup lang="ts">
const counter = useCounterStore();
const isFetching = ref(false);

const loadMessage = async () => {
  isFetching.value = true;
  await counter.fetchServerMessage();
  isFetching.value = false;
};
</script>

<template>
  <section class="card">
    <h2>Pinia Demo</h2>
    <p>This page uses a shared Pinia store from <code>stores/counter.ts</code>.</p>
    <p><strong>Count:</strong> {{ counter.count }}</p>
    <p><strong>Double:</strong> {{ counter.doubleCount }}</p>
    <div style="display: flex; gap: 0.5rem; margin-bottom: 0.75rem">
      <button @click="counter.increment">Increment</button>
      <button @click="counter.reset">Reset</button>
      <button :disabled="isFetching" @click="loadMessage">
        {{ isFetching ? "Loading..." : "Fetch Server Message" }}
      </button>
    </div>
    <p class="muted">{{ counter.lastServerMessage }}</p>
  </section>
</template>

