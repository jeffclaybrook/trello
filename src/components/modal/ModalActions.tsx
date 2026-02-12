"use client"

import { useParams } from "next/navigation"
import { Copy, Trash } from "lucide-react"
import { toast } from "sonner"
import { copyCard } from "@/actions/copy-card"
import { deleteCard } from "@/actions/delete-card"
import { useAction } from "@/hooks/use-action"
import { useCardModal } from "@/hooks/use-card-modal"
import { CardWithList } from "@/types"
import { Button } from "../ui/button"
import { Skeleton } from "../ui/skeleton"

type ModalActionProps = {
 data: CardWithList
}

export function ModalActions({ data }: ModalActionProps) {
 const params = useParams()
 const cardModal = useCardModal()

 const {
  execute: executeCopyCard,
  isLoading: isLoadingCopy
 } = useAction(copyCard, {
  onSuccess: (data) => {
   toast.success(`Card "${data.title}" copied`)
   cardModal.onClose()
  },
  onError: (error) => {
   toast.error(error)
  }
 })

 const {
  execute: executeDeleteCard,
  isLoading: isLoadingDelete
 } = useAction(deleteCard, {
  onSuccess: (data) => {
   toast.success(`Card "${data.title}" deleted`)
   cardModal.onClose()
  },
  onError: (error) => {
   toast.error(error)
  }
 })

 const onCopy = () => {
  const boardId = params.boardId as string
  executeCopyCard({
   id: data.id,
   boardId
  })
 }

 const onDelete = () => {
  const boardId = params.boardId as string
  executeDeleteCard({
   id: data.id,
   boardId
  })
 }

 return (
  <div className="space-y-2 mt-2">
   <p className="text-xs font-semibold">Actions</p>
   <Button
    type="button"
    onClick={onCopy}
    disabled={isLoadingCopy}
    className="justify-start w-full bg-slate-200 text-secondary-foreground hover:bg-slate-300 h-auto px-2 py-1.5 text-sm cursor-pointer"
   >
    <Copy className="size-4 mr-2" />
    Copy
   </Button>
   <Button
    type="button"
    onClick={onDelete}
    disabled={isLoadingDelete}
    className="justify-start w-full bg-slate-200 text-secondary-foreground hover:bg-slate-300 h-auto px-2 py-1.5 text-sm cursor-pointer"
   >
    <Trash className="size-4 mr-2" />
    Delete
   </Button>
  </div>
 )
}

ModalActions.Skeleton = function ModalActionsSkeleton() {
 return (
  <div className="space-y-2 mt-2">
   <Skeleton className="h-4 w-20 bg-slate-200" />
   <Skeleton className="h-8 w-full bg-slate-200" />
   <Skeleton className="h-8 w-full bg-slate-200" />
  </div>
 )
}