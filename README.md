# Nuxt Basics Interview App

Basic Nuxt setup with key interview features:

- File-based routing (`pages/`)
- Shared layout + navigation (`layouts/default.vue`)
- Server-side rendering page (`/` and `/ssr`)
- Static pre-rendered pages (`/static`, `/about`)
- Client-side only page (`/client`)
- Server and client API calls (`/calls`)
- Pinia state management demo (`/pinia`)
- Dynamic routing (`/posts/[id]`)
- Nitro server API routes (`server/api/`)
- Basic unit test with Vitest (`tests/posts.test.ts`)

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Static generation

```bash
npm run generate
```

## Run tests

```bash
npm run test
```
