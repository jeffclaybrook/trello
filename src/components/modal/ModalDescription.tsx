"use client"

import { RefObject, useRef, useState } from "react"
import { useParams } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"
import { useEventListener, useOnClickOutside } from "usehooks-ts"
import { AlignLeft } from "lucide-react"
import { toast } from "sonner"
import { updateCard } from "@/actions/update-card"
import { useAction } from "@/hooks/use-action"
import { CardWithList } from "@/types"
import { Button } from "../ui/button"
import { Skeleton } from "../ui/skeleton"
import { FormSubmit } from "../form/FormSubmit"
import { FormTextarea } from "../form/FormTextarea"

type ModalDescriptionProps = {
 data: CardWithList
}

export function ModalDescription({ data }: ModalDescriptionProps) {
 const [isEditing, setIsEditing] = useState<boolean>(false)
 const params = useParams()
 const queryClient = useQueryClient()
 const formRef = useRef<HTMLFormElement | null>(null)
 const textareaRef = useRef<HTMLTextAreaElement | null>(null)

 const enableEditing = () => {
  setIsEditing(true)
  setTimeout(() => {
   textareaRef.current?.focus()
  })
 }

 const disableEditing = () => {
  setIsEditing(false)
 }

 const onKeyDown = (e: KeyboardEvent) => {
  if (e.key === "Escape") {
   disableEditing()
  }
 }

 useEventListener("keydown", onKeyDown)
 useOnClickOutside(formRef as RefObject<HTMLElement>, disableEditing)

 const { execute, fieldErrors } = useAction(updateCard, {
  onSuccess: (data) => {
   queryClient.invalidateQueries({
    queryKey: ["card", data.id]
   })
   queryClient.invalidateQueries({
    queryKey: ["card-logs", data.id]
   })
   toast.success(`Card "${data.title}" updated`)
   disableEditing()
  },
  onError: (error) => {
   toast.error(error)
  }
 })

 const onSubmit = (formData: FormData) => {
  const description = formData.get("description") as string
  const boardId = params.boardId as string

  execute({
   id: data.id,
   description,
   boardId
  })
 }

 return (
  <div className="flex items-start gap-x-3 w-full">
   <AlignLeft className="size-5 mt-0.5 text-slate-700" />
   <div className="w-full">
    <p className="font-semibold text-slate-700 mb-2">Description</p>
    {isEditing ? (
     <form
      ref={formRef}
      action={onSubmit}
      className="space-y-2"
     >
      <FormTextarea
       ref={textareaRef}
       id="description"
       placeholder="Add a more detailed description"
       defaultValue={data.description || undefined}
       errors={fieldErrors}
       className="w-full mt-2"
      />
      <div className="flex items-center gap-x-2">
       <FormSubmit>Save</FormSubmit>
       <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={disableEditing}
        className="cursor-pointer"
       >
        Cancel
       </Button>
      </div>
     </form>
    ) : (
     <div
      role="button"
      onClick={enableEditing}
      className="min-h-[78px] bg-slate-200 text-sm font-medium py-3 px-3.5 rounded-md cursor-pointer"
     >
      {data.description || "Add a more detailed description..."}
     </div>
    )}
   </div>
  </div>
 )
}

ModalDescription.Skeleton = function ModalDescriptionSkeleton() {
 return (
  <div className="flex items-start gap-x-3 w-full">
   <Skeleton className="size-6 bg-slate-200" />
   <div className="w-full">
    <Skeleton className="h-6 w-24 mb-2 bg-slate-200" />
    <Skeleton className="h-[78px] w-full bg-slate-200" />
   </div>
  </div>
 )
}