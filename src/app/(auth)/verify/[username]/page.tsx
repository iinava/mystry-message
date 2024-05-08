"use client";

import { useToast } from "@/components/ui/use-toast";
import { verifySchemaValidation } from "@/schemas/verifySchema";
import { Apiresponse } from "@/types/apiResponse";
import axios, { AxiosError } from "axios";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import * as z from "zod";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function verifyAccount() {
  const router = useRouter();
  const params = useParams<{ username: string }>();
  const { toast } = useToast();

  const [hurray, sethurray] = useState(false);
  const [value, setvalue] = useState("");
  const onComplete = async (value: string) => {
    try {
      console.log(value,"api request passing of value");
      
      const response = await axios.post(`/api/verify-code`, {
        username: params.username,
        code: value,
      });
      sethurray(true);
      toast({
        title: "success",
        description: response.data.message,
      });
      router.replace("/signin");
    } catch (error) {
      const axiosError = error as AxiosError<Apiresponse>;
      let errormessage = axiosError.response?.data.message;
      toast({
        title: "signup failed",
        description: errormessage,
        variant: "destructive",
      });
      sethurray(false);
    }
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-black text-white">
      <div className="w-full max-w-md p-8 space-y-8 shadow-md rounded-3xl">
        <div className="text-center">
          {hurray ? (
            <h1 className="  text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
              Hurray Account verified <span>🎉😀</span>
            </h1>
          ) : (
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
              Verify Your Account
            </h1>
          )}

          <p className="mb-4">Enter the verification code sent to your email</p>
        </div>

        <div className="flex justify-center align-middle">
          <InputOTP
            onChange={(value: string) => {
              setvalue(value);
              console.log(value);
            }}
            onComplete={() => onComplete(value)}
            maxLength={6}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
      </div>
    </div>
  );
}
