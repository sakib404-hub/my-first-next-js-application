"use server";

export type SubscriptionState = {
  success: boolean;
  message: string;
};

export const createSubscriptionAction = async (
  prevState: SubscriptionState,
  formData: FormData
): Promise<SubscriptionState> => {
  try {
    // Get payment/subscription data
    const plan = formData.get("plan");

    console.log("Selected plan:", plan);

    // TODO:
    // 1. Validate user
    // 2. Create Stripe customer/subscription
    // 3. Create payment intent/session
    // 4. Return Stripe client secret if needed

    return {
      success: true,
      message: "Subscription created successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to create subscription.",
    };
  }
};