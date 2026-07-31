"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Check,
  CreditCard,
  ShieldCheck,
} from "lucide-react";
import SubscriptionButton from "./SubscriptionButton";

const features = [
  "Access to all premium features",
  "Unlimited content and resources",
  "Priority access to new features",
  "Advanced tools and functionality",
  "Ad-free experience",
];

const PaymentCard = () => {
  return (
    <Card className="mx-auto max-w-lg overflow-hidden shadow-sm">
      <CardHeader className="text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <CreditCard className="h-6 w-6 text-primary" />
        </div>

        <CardTitle className="text-xl">
          Premium Subscription
        </CardTitle>

        <CardDescription>
          Get access to everything with your premium membership.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Subscription Benefits */}
        <div className="rounded-lg border bg-muted/30 p-5">
          <h3 className="mb-4 font-semibold">
            What you&apos;ll get
          </h3>

          <div className="space-y-3">
            {features.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-3"
              >
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Check className="h-3.5 w-3.5 text-primary" />
                </div>

                <span className="text-sm text-muted-foreground">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
        {/* Subscription Button */}
        <SubscriptionButton />

        {/* Security */}
        <div className="flex items-start gap-3 rounded-lg bg-muted/50 p-4">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />

          <div>
            <p className="text-sm font-medium">
              Secure & Protected
            </p>

            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Your payment information is securely processed.
              We never store your card details.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentCard;