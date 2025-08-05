"use client"

import { useOrganization } from "@clerk/nextjs"
import { CreditCard } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"

type InfoProps = {
 isPro: boolean
}

export function Info({ isPro }: InfoProps) {
 const { organization, isLoaded } = useOrganization()

 if (!isLoaded) {
  return (
   <Info.Skeleton />
  )
 }

 return (
  <div className="flex items-center gap-x-4">
   <div className="relative h-[60px] w-[60px]">
    <Image
     src={organization?.imageUrl as string}
     alt="Organization"
     width={60}
     height={60}
     fill
     className="rounded-md object-cover"
    />
   </div>
   <div className="space-y-1">
    <p className="font-semibold text-xl">{organization?.name}</p>
    <div className="flex items-center text-xs text-muted-foreground">
     <CreditCard className="h-3 w-3 mr-1" />
     {isPro ? "Pro" : "Free"}
    </div>
   </div>
  </div>
 )
}

Info.Skeleton = function InfoSkeleton() {
 return (
  <div className="flex items-center gap-x-4">
   <div className="relative h-[60px] w-[60px]">
    <Skeleton className="h-full w-full absolute" />
   </div>
   <div className="space-y-2">
    <Skeleton className="h-10 w-[200px]" />
    <div className="flex items-center">
     <Skeleton className="h-4 w-4 mr-2" />
     <Skeleton className="h-4 w-[100px]" />
    </div>
   </div>
  </div>
 )
}