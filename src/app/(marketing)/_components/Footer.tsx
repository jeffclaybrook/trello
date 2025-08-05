import { Button } from "@/components/ui/button"
import { Logo } from "@/components/Logo"

export function Footer() {
 return (
  <footer className="fixed bottom-0 w-full p-4 border-t bg-slate-100">
   <div className="flex items-center justify-between w-full mx-auto md:max-w-screen-2xl">
    <Logo />
    <div className="flex items-venter justify-between space-x-4 md:block md:w-auto w-full">
     <Button variant="ghost" size="sm">Privacy Policy</Button>
     <Button variant="ghost" size="sm">Terms of Service</Button>
    </div>
   </div>
  </footer>
 )
}