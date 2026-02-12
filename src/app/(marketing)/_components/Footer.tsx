import { Button } from "@/components/ui/button"
import { LogoButton } from "@/components/LogoButton"
import Link from "next/link"

export function Footer() {
 return (
  <footer className="fixed bottom-0 w-full p-4 border-t bg-slate-100">
   <div className="flex items-center justify-between w-full mx-auto md:max-w-screen-2xl">
    <LogoButton />
    <div className="flex items-center justify-between space-x-4 md:block md:w-auto w-full">
     <Button
      type="button"
      variant="ghost"
      size="sm"
      className="cursor-pointer"
      asChild
     >
      <Link href={"/privacy-policy"}>Privacy Policy</Link>
     </Button>
     <Button
      type="button"
      variant="ghost"
      size="sm"
      className="cursor-pointer"
      asChild
     >
      <Link href={"/terms-of-service"}>Terms of Service</Link>
     </Button>
    </div>
   </div>
  </footer>
 )
}