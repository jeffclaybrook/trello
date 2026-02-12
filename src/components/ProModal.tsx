"use client"

import { toast } from "sonner"
import { stripeRedirect } from "@/actions/stripe-redirect"
import { useAction } from "@/hooks/use-action"
import { useProModal } from "@/hooks/use-pro-modal"
import { Button } from "./ui/button"
import { Dialog, DialogContent } from "./ui/dialog"
import { HeroIcon } from "./Icons"

const list = [
 "Unlimited boards",
 "Advanced checklists",
 "Admin and security",
 "And more!"
]

export function ProModal() {
 const proModal = useProModal()

 const { execute, isLoading } = useAction(stripeRedirect, {
  onSuccess: (data) => {
   window.location.href = data
  },
  onError: (error) => {
   toast.error(error)
  }
 })

 const onClick = () => {
  execute({})
 }

 return (
  <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
   <DialogContent className="max-w-md p-0 overflow-hidden">
    <div className="flex items-center justify-center relative aspect-video">
     <HeroIcon className="w-full h-full" />
    </div>
    <div className="px-6 pb-6">
     <h2 className="font-semibold text-xl mb-1">Upgrade to Trello Pro today!</h2>
     <p className="font-semibold text-xs text-slate-600">Explore the best of Trello</p>
     <div className="pl-3 pt-3 mb-3">
      <ul className="text-sm list-disc space-y-2">
       {list.map((item, i) => (
        <li key={i}>{item}</li>
       ))}
      </ul>
     </div>
     <Button
      type="button"
      onClick={onClick}
      disabled={isLoading}
      className="w-full bg-sky-700 text-primary-foreground hover:bg-sky-700/90 cursor-pointer"
     >
      Upgrade
     </Button>
    </div>
   </DialogContent>
  </Dialog>
 )
}