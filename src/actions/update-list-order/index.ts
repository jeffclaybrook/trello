"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"
import { createSafeAction } from "@/lib/create-safe-action"
import { UpdateListOrder } from "./schema"
import { InputType, ReturnType } from "./types"

const handler = async (data: InputType): Promise<ReturnType> => {
 const { userId, orgId } = await auth()

 if (!userId || !orgId) {
  return {
   error: "Unauthorized"
  }
 }

 const { items, boardId } = data

 let lists

 try {
  const transaction = items.map((list) =>
   prisma.list.update({
    where: {
     id: list.id,
     board: {
      orgId
     }
    },
    data: {
     order: list.order
    }
   })
  )

  lists = await prisma.$transaction(transaction)
 } catch (error) {
  console.error(error)
  return {
   error: "Failed to update list order"
  }
 }

 revalidatePath(`/board/${boardId}`)

 return {
  data: lists
 }
}

export const updateListOrder = createSafeAction(UpdateListOrder, handler)