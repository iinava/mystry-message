import { z } from "zod";


export const messageSchemaValidation = z.object({
  content: z
    .string()
    .min(10, { message: "Please enter at least 10 characters" })
    .max(300, { message: "maximum 300 characters are allowed" }),
});
 
