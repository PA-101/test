// Handles Stripe webhook events

export const handleWebhook = (stripe) => {
  return async (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      return res.status(400).send(err.message);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const userId = session.metadata.userId;

      console.log("Payment confirmed for:", userId);

      // FUTURE:
      // activate user in database
    }

    res.json({ received: true });
  };
};