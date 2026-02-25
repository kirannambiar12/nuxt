export type InterviewPost = {
  id: number;
  title: string;
  body: string;
};

export const interviewPosts: InterviewPost[] = [
  {
    id: 1,
    title: "Understanding SSR in Nuxt",
    body: "SSR renders HTML on the server before sending it to the browser."
  },
  {
    id: 2,
    title: "Client-side Interactivity",
    body: "CSR is useful for browser-only features and interactive dashboards."
  },
  {
    id: 3,
    title: "Static Generation",
    body: "Nuxt can pre-render routes and deploy them as static assets."
  }
];
