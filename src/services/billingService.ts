const API_URL = "https://leadrevive-backend-m3z6.onrender.com";

export const createCheckoutSession = async (
  plan: string,
  userId: string
) => {
  try {
    const res = await fetch(`${API_URL}/create-checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ plan, userId }),
    });

    if (!res.ok) {
      throw new Error("Failed to create checkout session");
    }

    return await res.json();
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return { error: true };
  }
};