const simulateDelay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getInfo = async () => {
  await simulateDelay(1000);
  return {
    success: true,
    data: 'Немного информации о нас...',
  };
};
