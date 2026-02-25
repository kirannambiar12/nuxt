import { createError } from "h3";
import { interviewPosts } from "../../data/posts";

export default defineEventHandler((event) => {
  const id = Number(getRouterParam(event, "id"));
  const post = interviewPosts.find((item) => item.id === id);

  if (!post) {
    throw createError({
      statusCode: 404,
      statusMessage: "Post not found"
    });
  }

  return post;
});
