"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"
import { createSafeAction } from "@/lib/create-safe-action"
import { UpdateCardOrder } from "./schema"
import { InputType, ReturnType } from "./types"

const handler = async (data: InputType): Promise<ReturnType> => {
 const { userId, orgId } = await auth()

 if (!userId || !orgId) {
  return {
   error: "Unauthorized"
  }
 }

 const { items, boardId } = data

 let updatedCards

 try {
  const transaction = items.map((card) =>
   prisma.card.update({
    where: {
     id: card.id,
     list: {
      board: {
       orgId
      }
     }
    },
    data: {
     order: card.order,
     listId: card.listId
    }
   })
  )

  updatedCards = await prisma.$transaction(transaction)
 } catch (error) {
  console.error(error)
  return {
   error: "Failed to update card order"
  }
 }

 revalidatePath(`/board/${boardId}`)

 return {
  data: updatedCards
 }
}

export const updateCardOrder = createSafeAction(UpdateCardOrder, handler)