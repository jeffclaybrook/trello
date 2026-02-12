"use client"

import { ActivityIcon } from "lucide-react"
import { AuditLog } from "@prisma/client"
import { Skeleton } from "../ui/skeleton"
import { ActivityItem } from "../ActivityItem"

type ModalActivtyProps = {
 items: AuditLog[]
}

export function ModalActivity({ items }: ModalActivtyProps) {
 return (
  <div className="flex items-start gap-x-3 w-full">
   <ActivityIcon className="size-5 mt-0.5 text-slate-700" />
   <div className="w-full">
    <p className="text-slate-700 font-semibold mb-2">Activity</p>
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

ModalActivity.Skeleton = function ModalActivitySkeleton() {
 return (
  <div className="flex items-start gap-x-3 w-full">
   <Skeleton className="size-6 bg-slate-200" />
   <div className="w-full">
    <Skeleton className="h-6 w-24 mb-2 bg-slate-200" />
    <Skeleton className="h-10 w-full bg-slate-200" />
   </div>
  </div>
 )
}