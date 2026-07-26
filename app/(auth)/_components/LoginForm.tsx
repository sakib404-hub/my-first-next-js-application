"use clinet";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginAction } from "../_actions/authActions";

const LoginForm = () => {
  return (
    <form
      action={loginAction}
     className="space-y-4">
      <Card className="p-5 space-y-5">

    {/* for email  */}
     <Field>
        <FieldLabel htmlFor="email">
            Enter Your Email
        </FieldLabel>
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
        <FieldLabel htmlFor="password">
            Enter your password
        </FieldLabel>
          <Input
          name="password"
          type="password"
          placeholder="Enter Your Password"
          required
        ></Input>
     </Field>

        <Button type="submit">Login</Button>
      </Card>
    </form>
  );
};

export default LoginForm;
