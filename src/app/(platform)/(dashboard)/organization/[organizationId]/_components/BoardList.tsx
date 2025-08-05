import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server"
import { HelpCircle, User2 } from "lucide-react"
import { MAX_FREE_BOARDS } from "@/constants/boards"
import { prisma } from "@/lib/prisma"
import { getAvailableCount } from "@/lib/org-limit"
import { checkSubscription } from "@/lib/subscription"
import { Skeleton } from "@/components/ui/skeleton"
import { FormPopover } from "@/components/form/FormPopover"
import { Hint } from "@/components/Hint"
import Link from "next/link"

export async function BoardList() {
 const { orgId } = await auth()

 if (!orgId) {
  return redirect("/select-org")
 }

 const boards = await prisma.board.findMany({
  where: {
   orgId
  },
  orderBy: {
   createdAt: "desc"
  }
 })

 const availableCount = await getAvailableCount()
 const isPro = await checkSubscription()

 return (
  <div className="space-y-4">
   <div className="flex items-center font-semibold text-lg text-neutral-700">
    <User2 className="h-6 w-6 mr-2" />
    Your boards
   </div>
   <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
    {boards.map((board) => (
     <Link
      key={board.id}
      href={`/board/${board.id}`}
      className="group relative aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm h-full w-full p-2 overflow-hidden"
      style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
     >
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />
      <p className="font-semibold text-white relative">{board.title}</p>
     </Link>
    ))}
    <FormPopover side="right" sideOffset={10}>
     <div role="button" className="flex flex-col items-center justify-center gap-y-1 hover:opacity-75 transition aspect-video relative h-full w-full bg-muted rounded-sm">
      <p className="text-sm">Create new board</p>
      <span className="text-xs">{isPro ? "Unlimited" : `${MAX_FREE_BOARDS - availableCount} remaining`}</span>
      <Hint
       sideOffset={40}
       description={"Free Workspaces can have up to 5 open boards. For unlimited boards, upgrade this workspace."}
      >
       <HelpCircle className="absolute bottom-2 right-2 h-[14px] w-[14px]" />
      </Hint>
     </div>
    </FormPopover>
   </div>
  </div>
 )
}

BoardList.Skeleton = function BoardListSkeleton() {
 return (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
   <Skeleton className="h-full w-full p-2 aspect-video" />
   <Skeleton className="h-full w-full p-2 aspect-video" />
   <Skeleton className="h-full w-full p-2 aspect-video" />
   <Skeleton className="h-full w-full p-2 aspect-video" />
   <Skeleton className="h-full w-full p-2 aspect-video" />
   <Skeleton className="h-full w-full p-2 aspect-video" />
   <Skeleton className="h-full w-full p-2 aspect-video" />
   <Skeleton className="h-full w-full p-2 aspect-video" />
  </div>
 )
}