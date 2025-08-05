"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs/server"
import { ACTION, ENTITY_TYPE } from "@prisma/client"
import { prisma } from "@/lib/prisma"
import { createAuditLog } from "@/lib/create-audit-log"
import { createSafeAction } from "@/lib/create-safe-action"
import { CreateCard } from "./schema"
import { InputType, ReturnType } from "./types"

const handler = async (data: InputType): Promise<ReturnType> => {
 const { userId, orgId } = await auth()

 if (!userId || !orgId) {
  return {
   error: "Unauthorized"
  }
 }

 const { title, boardId, listId } = data

 let card

 try {
  const list = await prisma.list.findUnique({
   where: {
    id: listId,
    board: {
     orgId
    }
   }
  })

  if (!list) {
   return {
    error: "List not found"
   }
  }

  const lastCard = await prisma.card.findFirst({
   where: {
    listId
   },
   orderBy: {
    order: "desc"
   },
   select: {
    order: true
   }
  })

  const newOrder = lastCard ? lastCard.order + 1 : 1

  card = await prisma.card.create({
   data: {
    title,
    listId,
    order: newOrder
   }
  })

  await createAuditLog({
   entityTitle: card.title,
   entityId: card.id,
   entityType: ENTITY_TYPE.CARD,
   action: ACTION.CREATE
  })
 } catch (error) {
  console.error(error)
  return {
   error: "Failed to create card"
  }
 }

 revalidatePath(`/board/${boardId}`)

 return {
  data: card
 }
}

export const createCard = createSafeAction(CreateCard, handler)