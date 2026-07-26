import React from "react";
import { Button } from "@/components/ui/button";
import { getMe } from "@/services/getMe";

const HomePage = async() => {
  const user = await getMe();
  return (
    <div>
      This is the homepage!

      <Button size={"sm"} variant={"default"}>
        Click me
      </Button>
      
    </div>
  );
};

export default HomePage;
