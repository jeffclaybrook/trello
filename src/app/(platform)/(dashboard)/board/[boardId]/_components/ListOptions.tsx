"use client"

import { useRef } from "react"
import { MoreHorizontal, X } from "lucide-react"
import { toast } from "sonner"
import { List } from "@prisma/client"
import { copyList } from "@/actions/copy-list"
import { deleteList } from "@/actions/delete-list"
import { useAction } from "@/hooks/use-action"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger, PopoverClose } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { FormSubmit } from "@/components/form/FormSubmit"

type ListOptionsProps = {
 data: List
 onAddCard: () => void
}

export function ListOptions({
 data,
 onAddCard
}: ListOptionsProps) {
 const closeRef = useRef<HTMLButtonElement | null>(null)

 const { execute: executeDelete } = useAction(deleteList, {
  onSuccess: (data) => {
   toast.success(`List "${data.title}" deleted`)
   closeRef.current?.click()
  },
  onError: (error) => {
   toast.error(error)
  }
 })

 const { execute: executeCopy } = useAction(copyList, {
  onSuccess: (data) => {
   toast.success(`List "${data.title}" copied`)
   closeRef.current?.click()
  },
  onError: (error) => {
   toast.error(error)
  }
 })

 const onDelete = (formData: FormData) => {
  const id = formData.get("id") as string
  const boardId = formData.get("boardId") as string

  executeDelete({
   id,
   boardId
  })
 }

 const onCopy = (formData: FormData) => {
  const id = formData.get("id") as string
  const boardId = formData.get("boardId") as string

  executeCopy({
   id,
   boardId
  })
 }

 return (
  <Popover>
   <PopoverTrigger asChild>
    <Button type="button" variant="ghost" className="h-auto w-auto p-2 cursor-pointer">
     <MoreHorizontal className="size-4" />
    </Button>
   </PopoverTrigger>
   <PopoverContent
    align="start"
    side="bottom"
    className="px-0 py-3"
   >
    <div className="text-sm font-medium text-center text-slate-600 pb-4">List actions</div>
    <PopoverClose ref={closeRef} asChild>
     <Button type="button" variant="ghost" className="h-auto w-auto p-2 absolute top-2 right-2 text-slate-600 cursor-pointer">
      <X className="size-4" />
     </Button>
    </PopoverClose>
    <Button
     type="button"
     variant="ghost"
     onClick={onAddCard}
     className="justify-start font-normal text-sm rounded-none w-full h-auto p-2 px-5 cursor-pointer"
    >
     Add card...
    </Button>
    <form action={onCopy}>
     <input
      id="id"
      name="id"
      value={data.id}
      hidden
     />
     <input
      id="boardId"
      name="boardId"
      value={data.boardId}
      hidden
     />
     <FormSubmit
      variant="ghost"
      className="justify-start rounded-none w-full h-auto p-2 px-5 font-normal text-sm"
     >
      Copy list...
     </FormSubmit>
    </form>
    <Separator />
    <form action={onDelete}>
     <input
      id="id"
      name="id"
      value={data.id}
      hidden
     />
     <input
      id="boardId"
      name="boardId"
      value={data.boardId}
      hidden
     />
     <FormSubmit
      variant="ghost"
      className="justify-start rounded-none w-full h-auto p-2 px-5 font-normal text-sm"
     >
      Delete this list
     </FormSubmit>
    </form>
   </PopoverContent>
  </Popover>
 )
}