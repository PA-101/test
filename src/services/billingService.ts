// Mock billing service
export const billingService = {
  createCheckoutSession: async (plan: string) => {
    await new Promise((r) => setTimeout(r, 600));
    console.log("Creating checkout for plan:", plan);
    return { url: "#", sessionId: "mock-session-" + plan };
  },
};
