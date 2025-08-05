import { z } from "zod"

export const UpdateBoard = z.object({
 title: z.string().min(3, { message: "Title must be at least 3 characters" }),
 id: z.string()
})