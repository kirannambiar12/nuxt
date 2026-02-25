<template>
  <div class="layout">
    <header>
      <h1>Nuxt Basics - Interview Setup</h1>
      <p class="muted">SSR, static generation, CSR, API routes, and dynamic routing.</p>
      <nav class="nav">
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/ssr">SSR Page</NuxtLink>
        <NuxtLink to="/static">Static Page</NuxtLink>
        <NuxtLink to="/client">Client Page</NuxtLink>
        <NuxtLink to="/calls">Calls Demo</NuxtLink>
        <NuxtLink to="/pinia">Pinia Demo</NuxtLink>
        <NuxtLink to="/posts/1">Dynamic Route</NuxtLink>
        <NuxtLink to="/about">About</NuxtLink>
      </nav>
    </header>
    <main>
      <slot />
    </main>
  </div>
</template>
