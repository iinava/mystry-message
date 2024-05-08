import { z } from "zod";

export const userNameValidation = z
  .string()
  .min(2, "username must be at least 2 characters")
  .max(20, "usernmae cannot be more than 20 characters")
  .regex(
    /^[a-zA-Z0-9_]+$/,
    "username should not contain any special characters"
  );
 

export const signupSchemaValidation = z.object({
    username: userNameValidation,
    email: z.string().email({message:"invalid email address"}),
    password: z.string().min(8, {message:"password must be at least 8 characters"}),
})