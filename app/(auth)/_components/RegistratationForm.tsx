"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { registerAction } from "../_actions/authActions";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { redirect } from "next/navigation";

const RegisterForm = () => {
  const [registerState, action, isPending] = useActionState(registerAction, null);

  useEffect(()=>{
    if(!registerState){
      return;
    }
    if(!registerState.success){
      toast(registerState.message || "Registratation Failed!");
      return;
    }
    toast.success(registerState.message || "Account Creation Successfull.");
    redirect('/login');

  }, [registerState])

  return (
    <form 
    action={action}
    className="space-y-4">
      <Card className="p-5 space-y-5">
        {/* Full Name */}
        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="John Doe"
            required
          />
        </Field>

        {/* Email */}
        <Field>
          <FieldLabel htmlFor="email">Email Address</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="example@gmail.com"
            required
          />
        </Field>

        {/* Password */}
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            required
          />
        </Field>

        {/* Confirm Password */}
        <Field>
          <FieldLabel htmlFor="confirmPassword">
            Confirm Password
          </FieldLabel>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            required
          />
        </Field>

        <Button type="submit" className="w-full">
        {
          isPending ? "Processing..." : "  Create Account"
        }
        </Button>
        <div>
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </Card>
    </form>
  );
};

export default RegisterForm;