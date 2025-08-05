"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs/server"
import { ACTION, ENTITY_TYPE } from "@prisma/client"
import { prisma } from "@/lib/prisma"
import { createAuditLog } from "@/lib/create-audit-log"
import { createSafeAction } from "@/lib/create-safe-action"
import { incrementAvailableCount, hasAvailableCount } from "@/lib/org-limit"
import { checkSubscription } from "@/lib/subscription"
import { CreateBoard } from "./schema"
import { InputType, ReturnType } from "./types"

const handler = async (data: InputType): Promise<ReturnType> => {
 const { userId, orgId } = await auth()

 if (!userId || !orgId) {
  return {
   error: "Unauthorized"
  }
 }

 const canCreate = await hasAvailableCount()
 const isPro = await checkSubscription()

 if (!canCreate && !isPro) {
  return {
   error: "You have reached your limit of free boards. Please upgrade to create more."
  }
 }

 const { title, image } = data
 const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] = image.split("|")

 if (!imageId || !imageThumbUrl || !imageFullUrl || !imageLinkHTML || !imageUserName) {
  return {
   error: "Missing fields. Failed to create board"
  }
 }

 let board

 try {
  board = await prisma.board.create({
   data: {
    title,
    orgId,
    imageId,
    imageThumbUrl,
    imageFullUrl,
    imageUserName,
    imageLinkHTML
   }
  })

  if (!isPro) {
   await incrementAvailableCount()
  }

  await createAuditLog({
   entityTitle: board.title,
   entityId: board.id,
   entityType: ENTITY_TYPE.BOARD,
   action: ACTION.CREATE
  })
 } catch (error) {
  console.error(error)
  return {
   error: "Failed to create board"
  }
 }

 revalidatePath(`/board/${board.id}`)

 return {
  data: board
 }
}

export const createBoard = createSafeAction(CreateBoard, handler)