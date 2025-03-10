"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number." }),
});

type FormValues = z.infer<typeof formSchema>;

export function Signup() {
  const [isLoading, setLoading] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      // Replace with your API endpoint
      const response = await axios.post("/api/auth/signup", {
        email: data.email,
        password: data.password,
      });

      // Handle successful response
      console.log("Signup successful:", response.data);
      alert(
        "Account created successfully! Please check your email to verify your account."
      );
      setOpen(false);
      form.reset();
    } catch (error) {
      console.error("Signup error:", error);

      // Handle specific error responses
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 409) {
          alert("Email is already registered. Please use a different email.");
        } else {
          alert(
            `Error: ${error.response.data.message || "Something went wrong. Please try again."}`
          );
        }
      } else {
        alert("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">Sign Up</Button>
      </DialogTrigger>
      <DialogContent className="bg-black sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-white">Create an account</DialogTitle>
          <DialogDescription className="text-gray-400">
            Enter your email and create a password to get started.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-right text-gray-300 font-bold !text-gray-300">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="your.email@example.com"
                      type="email"
                      autoComplete="email"
                      disabled={isLoading}
                      {...field}
                      className="col-span-3 bg-gray-1200 !border-gray-700 text-white font-bold"
                    />
                  </FormControl>
                  <FormMessage className="text-blue-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-right text-gray-300 font-bold !text-gray-300">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Create a secure password"
                      type="password"
                      autoComplete="new-password"
                      disabled={isLoading}
                      {...field}
                      className="col-span-3 bg-gray-1200 !border-gray-700 text-white font-bold"
                    />
                  </FormControl>
                  <FormMessage className="text-blue-400" />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full  text-gray-300"
              >
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
            </DialogFooter>

            <div className="text-center text-sm text-muted-foreground mt-4">
              Already have an account?{" "}
              <Button
                variant="link"
                className="p-0 h-auto"
                onClick={() => {
                  // Replace with your sign in logic or navigation
                  console.log("Navigate to sign in");
                }}
              >
                Sign in
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
