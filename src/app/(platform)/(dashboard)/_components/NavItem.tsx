"use client"

import { useRouter, usePathname } from "next/navigation"
import { Activity, CreditCard, Layout, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"

export type OrganizationType = {
 id: string
 slug: string
 imageUrl: string
 name: string
}

type NavItemProps = {
 isExpanded: boolean
 isActive: boolean
 organization: OrganizationType
 onExpand: (id: string) => void
}

export function NavItem({
 isExpanded,
 isActive,
 organization,
 onExpand
}: NavItemProps) {
 const router = useRouter()
 const pathname = usePathname()

 const routes = [
  {
   label: "Boards",
   href: `/organization/${organization.id}`,
   icon: Layout
  },
  {
   label: "Activity",
   href: `/organization/${organization.id}/activity`,
   icon: Activity
  },
  {
   label: "Settings",
   href: `/organization/${organization.id}/settings`,
   icon: Settings
  },
  {
   label: "Billing",
   href: `/organization/${organization.id}/billing`,
   icon: CreditCard
  }
 ]

 const onClick = (href: string) => {
  router.push(href)
 }

 return (
  <AccordionItem value={organization.id} className="border-none">
   <AccordionTrigger
    onClick={() => onExpand(organization.id)}
    className={cn(
     "flex items-center gap-x-2 p-1.5 text-slate-700 rounded-md hover:bg-slate-500/10 transition text-start no-underline cursor-pointer hover:no-underline",
     isActive && !isExpanded && "bg-sky-500/10 text-sky-700"
    )}
   >
    <div className="flex items-center gap-x-2">
     <div className="size-7 relative">
      <Image
       src={organization.imageUrl}
       alt={organization.name}
       width={80}
       height={80}
       className="rounded-sm object-cover"
      />
     </div>
     <span className="font-medium text-sm">{organization.name}</span>
    </div>
   </AccordionTrigger>
   <AccordionContent className="text-slate-700 pt-1">
    {routes.map((route) => (
     <Button
      key={route.href}
      type="button"
      variant="ghost"
      size="sm"
      onClick={() => onClick(route.href)}
      className={cn(
       "justify-start w-full font-normal pl-10 mb-1 cursor-pointer",
       pathname === route.href && "bg-sky-500/10 text-sky-700"
      )}
     >
      <route.icon className="size-4 mr-2" />
      {route.label}
     </Button>
    ))}
   </AccordionContent>
  </AccordionItem>
 )
}

NavItem.Skeleton = function NavItemSkeleton() {
 return (
  <div className="flex items-center gap-x-2">
   <div className="size-10 relative shrink-0">
    <Skeleton className="h-full w-full absolute" />
   </div>
   <Skeleton className="h-10 w-full" />
  </div>
 )
}