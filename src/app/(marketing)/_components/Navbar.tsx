import { Button } from "@/components/ui/button"
import { Logo } from "@/components/Logo"
import Link from "next/link"

export function Navbar() {
 return (
  <nav className="flex items-center fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white">
   <div className="flex items-center justify-between w-full mx-auto md:max-w-screen-2xl">
    <Logo />
    <div className="flex items-center justify-between space-x-4 w-full md:block md:w-auto">
     <Button
      variant="outline"
      size="sm"
      asChild
     >
      <Link href={"/sign-in"}>Login</Link>
     </Button>
     <Button size="sm" asChild>
      <Link href={"/sign-up"}>Get Trello for free</Link>
     </Button>
    </div>
   </div>
  </nav>
 )
}