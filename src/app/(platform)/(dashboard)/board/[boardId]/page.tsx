import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server"
import { Prisma } from "@prisma/client"
import { prisma } from "@/lib/prisma"
import { ListContainer } from "./_components/ListContainer"

const listsQuery = Prisma.validator<Prisma.ListFindManyArgs>()({
 where: {
  boardId: ""
 },
 include: {
  cards: {
   orderBy: {
    order: "asc"
   }
  }
 },
 orderBy: {
  order: "asc"
 }
})

export default async function BoardPage({
 params
}: {
 params: Promise<{ boardId: string }>
}) {
 const { orgId } = await auth()
 const { boardId } = await params

 if (!orgId) {
  redirect("/select-org")
 }

 const lists = await prisma.list.findMany({
  ...listsQuery,
  where: {
   boardId: boardId,
   board: { orgId }
  }
 })

 return (
  <div className="h-full p-4 overflow-x-auto">
   <ListContainer boardId={boardId} data={lists} />
  </div>
 )
}