<script setup lang="ts">
const route = useRoute();
const id = computed(() => route.params.id as string);

const { data: post, error } = await useFetch(() => `/api/posts/${id.value}`);
</script>

<template>
  <section class="card">
    <h2>Dynamic Route: /posts/{{ id }}</h2>
    <p v-if="error">Post was not found.</p>
    <template v-else-if="post">
      <h3>{{ post.title }}</h3>
      <p>{{ post.body }}</p>
    </template>
    <p class="muted">
      Try navigating to <NuxtLink to="/posts/2">/posts/2</NuxtLink> or
      <NuxtLink to="/posts/3">/posts/3</NuxtLink>.
    </p>
  </section>
</template>

