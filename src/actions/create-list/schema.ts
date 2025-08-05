import { z } from "zod"

export const CreateList = z.object({
 title: z.string().min(3, { message: "Title must be at least 3 characters" }),
 boardId: z.string()
})