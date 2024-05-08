import { z } from "zod";

export const verifySchemaValidation =z.object({
    code:z.string().length(6,"verfication code should be 6 digits")
})