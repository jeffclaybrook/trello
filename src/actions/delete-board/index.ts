"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs/server"
import { ACTION, ENTITY_TYPE } from "@prisma/client"
import { prisma } from "@/lib/prisma"
import { createAuditLog } from "@/lib/create-audit-log"
import { createSafeAction } from "@/lib/create-safe-action"
import { decrementAvailableCount } from "@/lib/org-limit"
import { checkSubscription } from "@/lib/subscription"
import { DeleteBoard } from "./schema"
import { InputType, ReturnType } from "./types"

const handler = async (data: InputType): Promise<ReturnType> => {
 const { userId, orgId } = await auth()

 if (!userId || !orgId) {
  return {
   error: "Unauthorized"
  }
 }

 const isPro = await checkSubscription()

 const { id } = data

 let board

 try {
  board = await prisma.board.delete({
   where: {
    id,
    orgId
   }
  })

  if (!isPro) {
   await decrementAvailableCount()
  }

  await createAuditLog({
   entityTitle: board.title,
   entityId: board.id,
   entityType: ENTITY_TYPE.BOARD,
   action: ACTION.DELETE
  })
 } catch (error) {
  console.error(error)
  return {
   error: "Failed to delete board"
  }
 }

 revalidatePath(`/organization/${orgId}`)
 redirect(`/organization/${orgId}`)
}

export const deleteBoard = createSafeAction(DeleteBoard, handler)