"use client"

import { toast } from "sonner"
import { stripeRedirect } from "@/actions/stripe-redirect"
import { useAction } from "@/hooks/use-action"
import { useProModal } from "@/hooks/use-pro-modal"
import { Button } from "../ui/button"
import { Dialog, DialogContent } from "../ui/dialog"
import Image from "next/image"

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
     <Image
      src="/hero.svg"
      alt="Hero"
      width={400}
      height={225}
      fill
      className="object-cover"
     />
    </div>
    <div>
     <h2 className="font-semibold text-xl">Upgrade to Trello Pro Today!</h2>
     <p className="font-semibold text-xs text-neutral-600">Explore the best of Trello</p>
     <div className="pl-3">
      <ul className="text-sm list-disc">
       {list.map((item, i) => (
        <li key={i}>{item}</li>
       ))}
      </ul>
     </div>
     <Button
      variant="primary"
      onClick={onClick}
      disabled={isLoading}
      className="w-full"
     >
      Upgrade
     </Button>
    </div>
   </DialogContent>
  </Dialog>
 )
}