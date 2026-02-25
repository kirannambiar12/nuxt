export default defineEventHandler(() => {
  return {
    source: "Response returned from server route after client button click",
    time: new Date().toISOString()
  };
});
