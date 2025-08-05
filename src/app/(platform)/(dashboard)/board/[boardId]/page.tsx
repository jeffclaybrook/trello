import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"
import { ListContainer } from "./_components/ListContainer"

type BoardPageProps = {
 params: {
  boardId: string
 }
}

export default async function BoardPage({ params }: BoardPageProps) {
 const { orgId } = await auth()

 if (!orgId) {
  redirect("/select-org")
 }

 const lists = await prisma.list.findMany({
  where: {
   boardId: params.boardId,
   board: {
    orgId
   }
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

 return (
  <div className="h-full p-4 overflow-x-auto">
   <ListContainer boardId={params.boardId} data={lists} />
  </div>
 )
}