"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { useMobileSidebar } from "@/hooks/use-mobile-sidebar"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Sidebar } from "./Sidebar"

export function MobileSidebar() {
 const [isMounted, setIsMounted] = useState<boolean>(false)
 const pathname = usePathname()
 const onOpen = useMobileSidebar((state) => state.onOpen)
 const onClose = useMobileSidebar((state) => state.onClose)
 const isOpen = useMobileSidebar((state) => state.isOpen)

 useEffect(() => {
  // eslint-disable-next-line react-hooks/set-state-in-effect
  setIsMounted(true)
 }, [])

 useEffect(() => {
  onClose()
 }, [pathname, onClose])

 if (!isMounted) {
  return null
 }

 return (
  <>
   <Button
    type="button"
    variant="ghost"
    size="sm"
    onClick={onOpen}
    className="block md:hidden mr-2 cursor-pointer"
   >
    <Menu className="size-5" />
   </Button>
   <Sheet open={isOpen} onOpenChange={onClose}>
    <SheetContent side="left" className="p-2 pt-10">
     <Sidebar storageKey="t-sidebar-mobile-state" />
    </SheetContent>
   </Sheet>
  </>
 )
}