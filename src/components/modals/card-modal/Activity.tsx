"use client"

import { ActivityIcon } from "lucide-react"
import { AuditLog } from "@prisma/client"
import { Skeleton } from "@/components/ui/skeleton"
import { ActivityItem } from "@/components/ActivityItem"

type ActivityProps = {
 items: AuditLog[]
}

export function Activity({ items }: ActivityProps) {
 return (
  <div className="flex items-start gap-x-3 w-full">
   <ActivityIcon className="h-5 w-5 mt-0.5 text-neutral-700" />
   <div className="w-full">
    <p className="text-neutral-700 font-semibold mb-2">Activity</p>
    <ol className="space-y-4 mt-2">
     {items.map((item) => (
      <ActivityItem
       key={item.id}
       data={item}
      />
     ))}
    </ol>
   </div>
  </div>
 )
}

Activity.Skeleton = function ActivitySkeleton() {
 return (
  <div className="flex items-start gap-x-3 w-full">
   <Skeleton className="h-6 w-6 bg-neutral-200" />
   <div className="w-full">
    <Skeleton className="h-6 w-24 mb-2 bg-neutral-200" />
    <Skeleton className="h-10 w-full bg-neutral-200" />
   </div>
  </div>
 )
}