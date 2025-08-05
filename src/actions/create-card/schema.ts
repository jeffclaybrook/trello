import { z } from "zod"

export const CreateCard = z.object({
 title: z.string().min(3, { message: "Title must be at least 3 characters" }),
 boardId: z.string(),
 listId: z.string()
})