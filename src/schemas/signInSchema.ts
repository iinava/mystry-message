import { z } from "zod";

export const signinSchemaValidation =z.object({
   identifier: z.string(),
   password: z.string(),
})