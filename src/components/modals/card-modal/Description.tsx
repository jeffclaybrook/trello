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
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { FormSubmit } from "@/components/form/FormSubmit"
import { FormTextarea } from "@/components/form/FormTextarea"

type DescriptionProps = {
 data: CardWithList
}

export function Description({ data }: DescriptionProps) {
 const params = useParams()
 const queryClient = useQueryClient()
 const [isEditing, setIsEditing] = useState<boolean>(false)
 const formRef = useRef<HTMLFormElement>(null)
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
   <AlignLeft className="h-5 w-5 mt-0.5 text-neutral-700" />
   <div className="w-full">
    <p className="font-semibold text-neutral-700 mb-2">Description</p>
    {isEditing ? (
     <form
      ref={formRef}
      action={onSubmit}
      className="space-y-2"
     >
      <FormTextarea
       id="description"
       placeholder="Add a more detailed description"
       defaultValue={data.description || undefined}
       errors={fieldErrors}
       ref={textareaRef}
       className="w-full mt-2"
      />
      <div className="flex items-center gap-x-2">
       <FormSubmit>Save</FormSubmit>
       <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={disableEditing}
       >
        Cancel
       </Button>
      </div>
     </form>
    ) : (
     <div
      role="button"
      onClick={enableEditing}
      className="min-h-[78px] bg-neutral-200 text-sm font-medium py-3 px-3.5 rounded-md"
     >
      {data.description || "Add a more detailed description..."}
     </div>
    )}
   </div>
  </div>
 )
}

Description.Skeleton = function DescriptionSkeleton() {
 return (
  <div className="flex items-start gap-x-3 w-full">
   <Skeleton className="h-6 w-6 bg-neutral-200" />
   <div className="w-full">
    <Skeleton className="h-6 w-24 mb-2 bg-neutral-200" />
    <Skeleton className="h-[78px] w-full bg-neutral-200" />
   </div>
  </div>
 )
}