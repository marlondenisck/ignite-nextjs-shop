import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
  apiVersion: "2025-09-30.clover",
  appInfo: {
    name: "Ignite Shop",
    version: "0.1.0",
  },
})