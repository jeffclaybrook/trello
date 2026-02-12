import { z } from "zod"

export const updateListSchema = z.object({
 id: z.string(),
 boardId: z.string(),
 title: z.string().min(3, { message: "Title must be at least 3 characters" })
})