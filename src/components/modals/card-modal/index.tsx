"use client"

import { useQuery } from "@tanstack/react-query"
import { AuditLog } from "@prisma/client"
import { useCardModal } from "@/hooks/use-card-modal"
import { fetcher } from "@/lib/fetcher"
import { CardWithList } from "@/types"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Actions } from "./Actions"
import { Activity } from "./Activity"
import { Description } from "./Description"
import { Header } from "./Header"

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
    {!cardData ? <Header.Skeleton /> : <Header data={cardData} />}
    <div className="grid md:grid-cols-4 md:gap-4">
     <div className="col-span-3">
      <div className="space-y-6 w-full">
       {!cardData ? <Description.Skeleton /> : <Description data={cardData} />}
       {!auditLogsData ? <Activity.Skeleton /> : <Activity items={auditLogsData} />}
      </div>
     </div>
     {!cardData ? <Actions.Skeleton /> : <Actions data={cardData} />}
    </div>
   </DialogContent>
  </Dialog>
 )
}