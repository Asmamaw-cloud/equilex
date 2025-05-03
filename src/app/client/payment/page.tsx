"use client" 
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Loader } from "lucide-react";
import { toast } from "sonner";


const formSchema = z.object({
    amount: z.string(),
    currency: z.string(),
    email: z.string().email({
        message: "Invalid email address.",
      }),
    first_name: z.string(),
    last_name: z.string(),
    phone_number: z.string(),
});

const Payment = () => {
  const router = useRouter();
  let tempUserInfo: any;

  if (typeof window !== "undefined") {
    tempUserInfo = JSON.parse(localStorage.getItem("tempUserInfo") || "{}");
  }

  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
      // @ts-ignore
    defaultValues: {
      
     amount: "",
     currency:"ETB",
     email:"",
     first_name: "",
     last_name:"",
     phone_number: "",

    },
  });
  const createPayment = useMutation({
   
    mutationFn: (value: any) => {
        const tx_ref:string = `${value.first_name}-${Date.now()}`;
        const paymentInfo={...value,tx_ref:tx_ref}
        console.log(paymentInfo)
        return axios.post("/api/chapa", paymentInfo);
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
  
    
    console.log(values);

    createPayment.mutate(
      
        values
      ,
      {
        onSuccess: async (res) => {
          
          if(res.data.data !== null){
         
           window.location.href = res.data.data.data.checkout_url;
          }
         
        },
        onError: async (e) => {
          toast(
             `Couldn't,
            ${ e.message},`
          );
        
        },
      }
    );
  }
  return (
    <div className="h-screen flex items-center justify-center px-2">
      <Card className="w-[450px] mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Make payment</CardTitle>
              <CardDescription>create new payment transaction</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

               <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>amount</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
             
             
              <Button
                // disabled={registeringUser}
                type="submit"
                className="w-full"
              >
            { createPayment.isPending  && (
                  <Loader className="mr-1 h-4 w-4 animate-spin" />
                )}
                
                Pay
            
              </Button>

              <p className="text-center text-sm">Already have an account?</p>
              <Button asChild className="w-full" variant="outline">
                {/* <Link href={"/signin"}>pay</Link> */}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

    

export default Payment