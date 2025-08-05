import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"
import { Skeleton } from "@/components/ui/skeleton"
import { ActivityItem } from "@/components/ActivityItem"

export async function ActivityList() {
 const { orgId } = await auth()

 if (!orgId) {
  redirect("/select-org")
 }

 const auditLogs = await prisma.auditLog.findMany({
  where: {
   orgId
  },
  orderBy: {
   createdAt: "desc"
  }
 })

 return (
  <ol className="space-y-4 mt-4">
   <p className="hidden last:block text-xs text-center text-muted-foreground">No activity found inside this organization</p>
   {auditLogs.map((log) => (
    <ActivityItem key={log.id} data={log} />
   ))}
  </ol>
 )
}

ActivityList.Skeleton = function ActivityListSkeleton() {
 return (
  <ol className="space-y-4 mt-4">
   <Skeleton className="h-14 w-[80%]" />
   <Skeleton className="h-14 w-[50%]" />
   <Skeleton className="h-14 w-[70%]" />
   <Skeleton className="h-14 w-[80%]" />
   <Skeleton className="h-14 w-[75%]" />
  </ol>
 )
}