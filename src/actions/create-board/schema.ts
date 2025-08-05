import { z } from "zod"

export const CreateBoard = z.object({
 title: z.string().min(3, { message: "Title must be at least 3 characters" }),
 image: z.string()
})