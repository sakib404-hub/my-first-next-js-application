"use client";

import { Button } from "@/components/ui/button";
import { Loader2, Lock } from "lucide-react";
import { useActionState } from "react";
import { createSubscriptionAction } from "../_actions/subscriptionActions";

const initialState = {
  success: false,
  message: "",
};

const SubscriptionButton = () => {
  const [state, formAction, isPending] = useActionState(
    createSubscriptionAction,
    initialState
  );

  return (
    <form action={formAction}>
      <input
        type="hidden"
        name="plan"
        value="premium"
      />

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isPending}
      >
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Processing Payment...
          </>
        ) : (
          <>
            <Lock className="h-4 w-4" />
            Subscribe Now
          </>
        )}
      </Button>

      {state.message && (
        <p
          className={`mt-3 text-center text-sm ${
            state.success
              ? "text-green-600"
              : "text-destructive"
          }`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
};

export default SubscriptionButton;