export const useCounterStore = defineStore("counter", () => {
  const count = ref(0);
  const lastServerMessage = ref("No server message yet");

  const doubleCount = computed(() => count.value * 2);

  const increment = () => {
    count.value += 1;
  };

  const reset = () => {
    count.value = 0;
  };

  const fetchServerMessage = async () => {
    const response = await $fetch<{ message: string; renderedAt: string }>("/api/hello");
    lastServerMessage.value = `${response.message} (${response.renderedAt})`;
  };

  return {
    count,
    doubleCount,
    lastServerMessage,
    increment,
    reset,
    fetchServerMessage
  };
});
