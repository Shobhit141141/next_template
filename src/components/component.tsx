"use client";
import { Button, Quote } from "@radix-ui/themes";
import toast from "react-hot-toast";

function Welcome() {
  return (
    <div className="flex items-center flex-col">
      <Quote>Welcome to the home page 🎉 !</Quote>
      <Button className="cursor-pointer" color="green" onClick={() => toast.success("Hello world!")}>Click me!</Button>
    </div>
  );
}

export default Welcome;
