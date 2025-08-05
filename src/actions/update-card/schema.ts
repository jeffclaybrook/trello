import { z } from "zod"

export const UpdateCard = z.object({
 title: z.optional(z.string().min(3, { message: "Title must be at least 3 characters" })),
 description: z.optional(z.string().min(3, { message: "Description must be at least 3 characters" })),
 boardId: z.string(),
 id: z.string()
})