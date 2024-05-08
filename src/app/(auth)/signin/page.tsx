"use client";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { Apiresponse } from "@/types/apiResponse";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { signinSchemaValidation } from "@/schemas/signInSchema";
import { signIn } from "next-auth/react";
import { Result } from "postcss";
import { resourceLimits } from "worker_threads";
import { tree } from "next/dist/build/templates/app-page";

export default function signinPage() {
  const [isSubmiting, setisSubmiting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  //zod implementation
  const form = useForm<z.infer<typeof signinSchemaValidation>>({
    resolver: zodResolver(signinSchemaValidation),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onsubmit = async (data: z.infer<typeof signinSchemaValidation>) => {
  
    if(data.identifier==="" || data.password==""){
      toast({
        title: "operation failed 🥲",
        description: "please enter all fields",
        variant: "whiteboy",
      });
      return;
    }else{
      setisSubmiting(true)
    const result = await signIn("credentials", {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });
    console.log(result);
    if (result?.error) {
      if (result.error === "CredentialsSignin") {
        toast({
          title: "Login Failed",
          description: "Incorrect username or password",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      }
    }

    if (result?.url) {
      setisSubmiting(false)
      router.replace("/dashboard");
    }
  };
  }
    

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="w-full max-w-md p-8 space-y-8 rounded-lg shadow-md  bg-zinc-950">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join mystry message
          </h1>
          <p className="mb-4">Sign up to start your anonymous adventure</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-6">
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>email or username</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="password" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit"  disabled={isSubmiting}>
              {isSubmiting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  'please wait..'
                </>
              ) : (
                "Signin"
              )}
            </Button>
          </form>
        </Form>

        <div className="text-center mt-4">
          <p>
           not having an account 🫢
            <Link href="/signup" className="text-blue-600 hover:text-blue-800">
              Sign Up Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
