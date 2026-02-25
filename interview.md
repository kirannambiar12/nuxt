# Nuxt Interview Notes (Project Walkthrough)

This file explains this project end-to-end so you can confidently discuss it in interviews.

---

## 1) Project Architecture at a Glance

- `pages/` => file-based routing (each `.vue` file becomes a route)
- `layouts/default.vue` => shared shell (header + navigation)
- `server/api/` => backend endpoints handled by Nitro
- `app.vue` => root app entry (`NuxtLayout` + `NuxtPage`)
- `nuxt.config.ts` => app config, route rules, prerender settings

This app demonstrates:
- SSR routes
- Static/pre-rendered routes
- Client-only route
- Pinia state management route
- Dynamic route params
- Server-side and client-side API calls

---

## 2) Route-by-Route Rendering Behavior

## `/` (`pages/index.vue`)
- Rendering: **SSR by default**
- Data call: `await useFetch('/api/interview')`
- Where call happens:
  - First load: server (during SSR)
  - Client navigation: can reuse payload/cache and fetch as needed

## `/ssr` (`pages/ssr.vue`)
- Rendering: **SSR**
- Data call: `await useFetch('/api/hello')`
- Shows request-time data (`new Date().toISOString()`), good to explain server-render timing.

## `/static` (`pages/static.vue`)
- Rendering: **prerendered/static**
- Why: `defineRouteRules({ prerender: true })` + `routeRules` in config
- Behavior:
  - HTML generated at build/generate time
  - Served as static file, no server render on each request

## `/about` (`pages/about.vue`)
- Rendering: **prerendered/static**
- Same concept as `/static`.

## `/client` (`pages/client.vue`)
- Rendering: **client-only (CSR)**
- Why: `definePageMeta({ ssr: false })`
- Data call:
  - inside `onMounted`, using `$fetch('/api/hello')`
  - call is made only after browser mounts component
- Good interview point: useful for browser-only APIs and interactions.

## `/calls` (`pages/calls.vue`)
- Rendering: mixed demo page
- Server-side call: `await useFetch('/api/interview')` (during SSR)
- Client-side call: button click -> `$fetch('/api/client-check')`
- Great page to explain "same app can do both SSR and CSR data fetching."

## `/pinia` (`pages/pinia.vue`)
- Rendering: SSR by default (like normal Nuxt page)
- Uses Pinia store: `useCounterStore()`
- Demonstrates:
  - reactive shared state (`count`)
  - derived state (`doubleCount`)
  - actions (`increment`, `reset`)
  - async store action with API call (`fetchServerMessage`)

## `/posts/[id]` (`pages/posts/[id].vue`)
- Rendering: SSR by default
- Dynamic route param: `useRoute().params.id`
- Data call: `useFetch(() => '/api/posts/${id.value}')`
- Route examples: `/posts/1`, `/posts/2`, `/posts/3`

---

## 3) Server API Flow (Nitro)

Files in `server/api/` behave like backend routes:

- `hello.get.ts` -> `GET /api/hello`
- `interview.get.ts` -> `GET /api/interview`
- `client-check.get.ts` -> `GET /api/client-check`
- `posts.get.ts` -> `GET /api/posts`
- `posts/[id].get.ts` -> `GET /api/posts/:id`

`posts/[id].get.ts` also demonstrates error handling with `createError({ statusCode: 404, ... })`.

---

## 4) Built-in Nuxt/Vue APIs You Should Explain

## `useFetch()`
- Nuxt composable for data fetching with SSR awareness.
- Supports server-side data fetch on initial request.
- Integrates with Nuxt payload/caching to avoid duplicate requests.
- Good for page-level data needed during render.

Example in this project:
- `pages/index.vue`
- `pages/ssr.vue`
- `pages/calls.vue`
- `pages/posts/[id].vue`

## `$fetch()`
- Lightweight fetch utility (from ofetch/Nuxt context).
- Usually used for event-driven or client-triggered calls (button click, onMounted).
- Does not automatically imply SSR unless you call it in SSR execution path.

Example in this project:
- `pages/client.vue` in `onMounted`
- `pages/calls.vue` button click handler

## `onMounted()`
- Vue lifecycle hook.
- Runs **only on client** after component is mounted in DOM.
- Use for browser-only logic (`window`, local storage, chart libs, etc.).

Example:
- `pages/client.vue`

## `definePageMeta()`
- Nuxt page-level metadata/config.
- In this project: `definePageMeta({ ssr: false })` to make route client-only.

## `defineRouteRules()`
- Route-level rendering and caching rules.
- In this project: `defineRouteRules({ prerender: true })` on static pages.

## `ref()`
- Vue reactive primitive for mutable state.
- Access/update via `.value` in script, directly in template.

Examples:
- `message` and `isLoading` in pages for UI state.

## `useRoute()`
- Access current route data (`params`, `query`, `path`).
- Used in dynamic routes to read param values.

## `computed()`
- Derived reactive values from other reactive sources.
- In dynamic route page, creates reactive `id` from route param.

## `defineStore()` (Pinia)
- Creates a global, reactive store shared across pages/components.
- In this project, `stores/counter.ts` defines:
  - state: `count`, `lastServerMessage`
  - getter-like derived state: `doubleCount` (using `computed`)
  - actions: `increment`, `reset`, `fetchServerMessage`
- Interview point: Pinia is the recommended state management solution for Vue/Nuxt.

---

## 5) How Requests Move Through the App

## First load of SSR page (example `/ssr`)
1. Browser requests `/ssr`
2. Nuxt server renders page on server
3. `useFetch('/api/hello')` executes on server
4. HTML + payload sent to browser
5. Client hydrates page

## Client navigation (`NuxtLink`) from one page to another
1. No full page reload
2. Nuxt loads new route component
3. Required data composables run (server/client depending on context and cache)
4. UI updates SPA-style

## Client-triggered call (`/calls` button)
1. User clicks button
2. `makeClientCall()` runs in browser
3. `$fetch('/api/client-check')` sends HTTP request to Nitro endpoint
4. Response updates reactive state (`clientMessage`)

---

## 6) Prerender / Static vs SSR vs CSR (Interview Cheat Sheet)

- **SSR**: HTML rendered per request on server. Better SEO + dynamic request-time data.
- **Prerender/Static**: HTML generated at build time. Fast delivery, CDN-friendly.
- **CSR (client-only)**: Rendering and data loading in browser. Good for highly interactive/browser-only pages.

Nuxt advantage: you can mix all 3 in one project route-by-route.

---

## 7) Production Build Output and Serving

## `npm run build` (`nuxt build`)
Build output is in `.output/`:

- `.output/server/` -> Nitro server bundle (Node entry, server runtime)
- `.output/public/` -> static client assets (JS/CSS and public files)

How it is served:
- `npm run preview` runs production server from `.output/server/`
- That server also serves static assets from `.output/public/`

## `npm run generate` (`nuxt generate`)
- Generates pre-rendered static site output (for static hosting flows).
- Static files are generated under `.output/public/`.
- Deploy that static folder to CDN/static host when running fully static mode.

---

## 8) Key Talking Points for Interviews

- Nuxt gives file-based routing and full-stack capability in one repo.
- `server/api` routes remove need for separate backend for simple APIs.
- `useFetch` is SSR-friendly; `$fetch` is great for event-driven calls.
- `definePageMeta({ ssr: false })` allows selective CSR route behavior.
- `defineRouteRules({ prerender: true })` allows selective static generation.
- Dynamic routes are automatic via file naming (`[id].vue`).
- Pinia is auto-integrated via `@pinia/nuxt` module and `stores/` convention.
- Build output in `.output` clearly separates server runtime and public assets.

---

## 9) Simple Test Case in This Project

- Test file: `tests/posts.test.ts`
- Runner: Vitest (`npm run test`)
- What it checks:
  - at least 3 mock posts exist
  - post IDs are numeric and unique

Why this is useful in interviews:
- shows you can add automated checks even in a basic starter
- shows understanding of unit test structure (`describe`, `it`, `expect`)

---

## 10) Suggested Next Improvements (Optional)

- Add middleware route guard example (`middleware/auth.ts`)
- Add runtime config and env variables (`useRuntimeConfig`)
- Add simple test setup (Vitest) for one API route and one page composable

