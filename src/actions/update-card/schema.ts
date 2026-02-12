import { z } from "zod"

export const updateCardSchema = z.object({
 id: z.string(),
 boardId: z.string(),
 title: z.optional(z.string().min(3, { message: "Title must be at least 3 characters" })),
 description: z.optional(z.string().min(3, { message: "Description must be at least 3 characters" }))
})