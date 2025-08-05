"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs/server"
import { ACTION, ENTITY_TYPE } from "@prisma/client"
import { prisma } from "@/lib/prisma"
import { createAuditLog } from "@/lib/create-audit-log"
import { createSafeAction } from "@/lib/create-safe-action"
import { DeleteList } from "./schema"
import { InputType, ReturnType } from "./types"

const handler = async (data: InputType): Promise<ReturnType> => {
 const { userId, orgId } = await auth()

 if (!userId || !orgId) {
  return {
   error: "Unauthorized"
  }
 }

 const { id, boardId } = data

 let list

 try {
  list = await prisma.list.delete({
   where: {
    id,
    boardId,
    board: {
     orgId
    }
   }
  })

  await createAuditLog({
   entityTitle: list.title,
   entityId: list.id,
   entityType: ENTITY_TYPE.LIST,
   action: ACTION.DELETE
  })
 } catch (error) {
  console.error(error)
  return {
   error: "Failed to delete list"
  }
 }

 revalidatePath(`/board/${boardId}`)

 return {
  data: list
 }
}

export const deleteList = createSafeAction(DeleteList, handler)