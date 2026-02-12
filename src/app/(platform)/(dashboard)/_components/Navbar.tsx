import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FormPopover } from "@/components/form/FormPopover"
import { LogoButton } from "@/components/LogoButton"
import { MobileSidebar } from "./MobileSidebar"

export function Navbar() {
 return (
  <nav className="flex items-center fixed z-50 top-0 px-2 md:px-4 w-full h-14 border-b bg-white">
   <MobileSidebar />
   <div className="flex items-center gap-x-4">
    <div className="hidden md:flex">
     <LogoButton />
    </div>
    <FormPopover align="start" side="bottom" sideOffset={18}>
     <Button
      size="sm"
      className="rounded-sm hidden md:block h-auto py-1.5 px-2 bg-sky-700 text-primary-foreground hover:bg-sky-700/90 cursor-pointer"
     >
      Create
     </Button>
    </FormPopover>
    <FormPopover>
     <Button
      size="sm"
      className="rounded-sm md:hidden bg-sky-700 text-primary-foreground hover:bg-sky-700/90 cursor-pointer"
     >
      <Plus className="size-4" />
     </Button>
    </FormPopover>
   </div>
   <div className="flex items-center gap-x-2 ml-auto">
    <OrganizationSwitcher
     hidePersonal
     afterCreateOrganizationUrl={"/organization/:id"}
     afterLeaveOrganizationUrl={"/select-org"}
     afterSelectOrganizationUrl={"/organization/:id"}
     appearance={{
      elements: {
       rootBox: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
       }
      }
     }}
    />
    <UserButton
     appearance={{
      elements: {
       avatarBox: {
        width: 30,
        height: 30
       }
      }
     }}
    />
   </div>
  </nav>
 )
}