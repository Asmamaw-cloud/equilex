"use client";

import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Account } from "@/server/user-management/Account";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Signin = () => {
  const [registeringUser, setRegisteringUser] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setRegisteringUser(true);
      const res = await Account.login(values.email, values.password);
      router.push("/");
      router.refresh();
    } catch (error) {
      return toast(
        "Couldn't log you in. Please check the credentials you provided."
      );
    } finally {
      setRegisteringUser(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center px-2">
      <Card className="w-[450px] mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Sign Into Your Acount</CardTitle>
              <CardDescription>SIgn in to get access</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                disabled={registeringUser}
                type="submit"
                className="w-full"
              >
                {registeringUser && (
                  <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                )}
                Sign In
              </Button>
              <p className="text-center text-sm">Don&apos;t have an account?</p>
              <Button asChild className="w-full" variant="outline">
                <Link href={"/signup"}>Create Account</Link>
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signin;
