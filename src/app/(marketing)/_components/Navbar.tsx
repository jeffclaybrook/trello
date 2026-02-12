import { Button } from "@/components/ui/button"
import { LogoButton } from "@/components/LogoButton"
import Link from "next/link"

export function Navbar() {
 return (
  <nav className="flex items-center fixed top-0 w-full h-14 px-4 border-b bg-white">
   <div className="flex items-center justify-between w-full mx-auto md:max-w-screen-2xl">
    <LogoButton />
    <div className="flex items-center justify-between space-x-4 w-full md:block md:w-auto">
     <Button
      type="button"
      variant="outline"
      size="sm"
      className="cursor-pointer"
      asChild
     >
      <Link href={"/sign-in"}>Login</Link>
     </Button>
     <Button
      type="button"
      size="sm"
      className="cursor-pointer"
      asChild
     >
      <Link href={"/sign-up"}>Get Trello for free</Link>
     </Button>
    </div>
   </div>
  </nav>
 )
}