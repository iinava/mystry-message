"use client"

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
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useDebounceCallback } from "usehooks-ts"; // Import debounce hook here
import { signupSchemaValidation } from "@/schemas/signUpSchema";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [usernameMessage, setusernameMessage] = useState("");
  const [isChekingUsername, setisChekingUsername] = useState(false);
  const [isSubmiting, setisSubmiting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const debounced = useDebounceCallback((value: string) => {
    setUsername(value);
  }, 300); // Use debounce hook here

  const form = useForm<z.infer<typeof signupSchemaValidation>>({
    resolver: zodResolver(signupSchemaValidation),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (username) {
        setisChekingUsername(true);
        setusernameMessage(""); // Reset message
        try {
          const response = await axios.get<Apiresponse>(
            `/api/check-username?username=${username}`
          );
          setusernameMessage(response.data.message);
        } catch (error) {
          const axiosError = error as AxiosError<Apiresponse>;
          setusernameMessage(
            axiosError.response?.data.message ?? "Error checking username"
          );
        } finally {
          setisChekingUsername(false);
        }
      }
    };
    checkUsernameUnique();
  }, [username]);

  const onsubmit = async (data: z.infer<typeof signupSchemaValidation>) => {
    setisSubmiting(true);
    try {
      const response = await axios.post<Apiresponse>("/api/signup", data);
      toast({
        title: "Success",
        description: response.data.message,
        variant: "success",
      });
      router.replace(`/verify/${username}`);
    } catch (error) {
      const axiosError = error as AxiosError<Apiresponse>;
      let errormessage = axiosError.response?.data.message;
      toast({
        title: "Signup failed",
        description: errormessage,
        variant: "destructive",
      });
    } finally {
      setisSubmiting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="w-full max-w-md p-8 space-y-8 rounded-lg shadow-md bg-zinc-950">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join mystry message
          </h1>
          <p className="mb-4">Sign up to start your anonymous adventure</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-6">
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="username"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        debounced(e.target.value);
                      }}
                    />
                  </FormControl>
                  <div className="h-1">
                    {isChekingUsername && <Loader2 className="animate-spin" />}
                    <p
                      className={`text-sm ${
                        usernameMessage === "username is unique"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {usernameMessage}
                    </p>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="password"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmiting}>
              {isSubmiting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait...
                </>
              ) : (
                "Signup"
              )}
            </Button>
          </form>
        </Form>

        <div className="text-center mt-4">
          <p>
            Already a member?{" "}
            <Link href="/signin" className="text-blue-600 hover:text-blue-800">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
