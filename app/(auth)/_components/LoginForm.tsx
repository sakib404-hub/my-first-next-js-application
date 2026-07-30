"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginAction } from "../_actions/authActions";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [loginState, action, isPending] = useActionState(loginAction, null);
  // const router = useRouter();

  useEffect(() => {
    if (!loginState) {
      return;
    }

    if (!loginState.success) {
      toast.error(loginState.message || "Login Failed");
      return;
    }
  }, [loginState]);

  return (
    <form action={action} className="space-y-4">
      <Card className="p-5 space-y-5">
        {/* for email  */}
        <Field>
          <FieldLabel htmlFor="email">Enter Your Email</FieldLabel>
          <Input
            name="email"
            type="email"
            id="email"
            placeholder="example@gmail.com"
            required
          ></Input>
        </Field>

        {/* for password  */}
        <Field>
          <FieldLabel htmlFor="password">Enter your password</FieldLabel>
          <Input
            name="password"
            type="password"
            placeholder="Enter Your Password"
            required
          ></Input>
        </Field>

        <Button type="submit">{isPending ? "submiting..." : "Login"}</Button>
      </Card>
    </form>
  );
};

export default LoginForm;
