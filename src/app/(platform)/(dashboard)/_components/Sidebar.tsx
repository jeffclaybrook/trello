/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useOrganization, useOrganizationList } from "@clerk/nextjs"
import { useLocalStorage } from "usehooks-ts"
import { Plus } from "lucide-react"
import { Accordion } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { NavItem, Organization } from "./NavItem"
import Link from "next/link"

type SidebarProps = {
 storageKey?: string
}

export function Sidebar({
 storageKey = "t-sidebar-state"
}: SidebarProps) {
 const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(storageKey, {})

 const {
  organization: activeOrganization,
  isLoaded: isLoadedOrg
 } = useOrganization()

 const {
  userMemberships,
  isLoaded: isLoadedOrgList
 } = useOrganizationList({
  userMemberships: {
   infinite: true
  }
 })

 const defaultAccordionValue: string[] = Object.keys(expanded).reduce((acc: string[], key: string) => {
  if (expanded[key]) {
   acc.push(key)
  }
  return acc
 }, [])

 const onExpand = (id: string) => {
  setExpanded((curr) => ({
   ...curr,
   [id]: !expanded[id]
  }))
 }

 if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
  return (
   <>
    <div className="flex items-center justify-between mb-2">
     <Skeleton className="h-10 w-[50%]" />
     <Skeleton className="h-10 w-10" />
    </div>
    <div className="space-y-2">
     <NavItem.Skeleton />
     <NavItem.Skeleton />
     <NavItem.Skeleton />
    </div>
   </>
  )
 }

 return (
  <>
   <div className="flex items-center mb-1 font-medium text-xs">
    <span className="pl-4">Workspaces</span>
    <Button
     type="button"
     variant="ghost"
     size="icon"
     className="ml-auto"
     asChild
    >
     <Link href={"/select-org"}>
      <Plus className="h-4 w-4" />
     </Link>
    </Button>
   </div>
   <Accordion
    type="multiple"
    defaultValue={defaultAccordionValue}
    className="space-y-2"
   >
    {userMemberships.data.map(({ organization }) => (
     <NavItem
      key={organization.id}
      isActive={activeOrganization?.id === organization.id}
      isExpanded={expanded[organization.id]}
      organization={organization as Organization}
      onExpand={onExpand}
     />
    ))}
   </Accordion>
  </>
 )
}