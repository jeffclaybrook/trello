import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"

export async function GET(
 req: Request,
 { params }: {
  params: {
   cardId: string
  }
 }
) {
 try {
  const { userId, orgId } = await auth()

  if (!userId || !orgId) {
   return new NextResponse("Unauthorized", { status: 401 })
  }

  const card = await prisma.card.findUnique({
   where: {
    id: params.cardId,
    list: {
     board: {
      orgId
     }
    }
   },
   include: {
    list: {
     select: {
      title: true
     }
    }
   }
  })

  return NextResponse.json(card)
 } catch (error) {
  console.error(error)
  return new NextResponse("Internal Error", { status: 500 })
 }
}