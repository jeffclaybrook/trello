"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs/server"
import { ACTION, ENTITY_TYPE } from "@prisma/client"
import { prisma } from "@/lib/prisma"
import { createAuditLog } from "@/lib/create-audit-log"
import { createSafeAction } from "@/lib/create-safe-action"
import { UpdateBoard } from "./schema"
import { InputType, ReturnType } from "./types"

const handler = async (data: InputType): Promise<ReturnType> => {
 const { userId, orgId } = await auth()

 if (!userId || !orgId) {
  return {
   error: "Unauthorized"
  }
 }

 const { title, id } = data

 let board

 try {
  board = await prisma.board.update({
   where: {
    id,
    orgId
   },
   data: {
    title
   }
  })

  await createAuditLog({
   entityTitle: board.title,
   entityId: board.id,
   entityType: ENTITY_TYPE.BOARD,
   action: ACTION.UPDATE
  })
 } catch (error) {
  console.error(error)
  return {
   error: "Failed to update board"
  }
 }

 revalidatePath(`/board/${id}`)

 return {
  data: board
 }
}

export const updateBoard = createSafeAction(UpdateBoard, handler)