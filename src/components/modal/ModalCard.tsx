"use client"

import { useQuery } from "@tanstack/react-query"
import { AuditLog } from "@prisma/client"
import { useCardModal } from "@/hooks/use-card-modal"
import { fetcher } from "@/lib/fetcher"
import { CardWithList } from "@/types"
import { Dialog, DialogContent } from "../ui/dialog"
import { ModalActions } from "./ModalActions"
import { ModalActivity } from "./ModalActivity"
import { ModalDescription } from "./ModalDescription"
import { ModalHeader } from "./ModalHeader"

export function CardModal() {
 const id = useCardModal((state) => state.id)
 const isOpen = useCardModal((state) => state.isOpen)
 const onClose = useCardModal((state) => state.onClose)

 const { data: cardData } = useQuery<CardWithList>({
  queryKey: ["card", id],
  queryFn: () => fetcher(`/api/cards/${id}`)
 })

 const { data: auditLogsData } = useQuery<AuditLog[]>({
  queryKey: ["card-logs", id],
  queryFn: () => fetcher(`/api/cards/${id}/logs`)
 })

 return (
  <Dialog open={isOpen} onOpenChange={onClose}>
   <DialogContent>
    {!cardData ? <ModalHeader.Skeleton /> : <ModalHeader data={cardData} />}
    <div className="grid md:grid-cols-4 md:gap-4">
     <div className="col-span-3">
      <div className="space-y-6 w-full">
       {!cardData ? <ModalDescription.Skeleton /> : <ModalDescription data={cardData} />}
       {!auditLogsData ? <ModalActivity.Skeleton /> : <ModalActivity items={auditLogsData} />}
      </div>
     </div>
     {!cardData ? <ModalActions.Skeleton /> : <ModalActions data={cardData} />}
    </div>
   </DialogContent>
  </Dialog>
 )
}