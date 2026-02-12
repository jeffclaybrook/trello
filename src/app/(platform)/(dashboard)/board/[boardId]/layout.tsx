import { ReactNode } from "react"
import { notFound, redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"
import { BoardNavbar } from "./_components/BoardNavbar"

export async function generateMetadata({
 params
}: {
 params: Promise<{ boardId: string }>
}) {
 const { boardId } = await params
 const { orgId } = await auth()

 if (!orgId) {
  return {
   title: "Board"
  }
 }

 const board = await prisma.board.findUnique({
  where: {
   id: boardId,
   orgId
  }
 })

 return {
  title: board?.title || "Board"
 }
}

export default async function BoardLayout({
 children,
 params
}: {
 children: ReactNode
 params: Promise<{ boardId: string }>
}) {
 const { boardId } = await params
 const { orgId } = await auth()

 if (!orgId) {
  redirect("/select-org")
 }

 const board = await prisma.board.findUnique({
  where: {
   id: boardId,
   orgId
  }
 })

 if (!board) {
  notFound()
 }

 return (
  <div
   className="relative h-dvh bg-no-repeat bg-cover bg-center"
   style={{ backgroundImage: `url(${board.imageFullUrl})` }}
  >
   <BoardNavbar data={board} />
   <div className="absolute inset-0 bg-black/10" />
   <main className="relative pt-28 h-full">
    {children}
   </main>
  </div>
 )
}