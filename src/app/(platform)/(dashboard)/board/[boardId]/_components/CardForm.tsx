"use client"

import { KeyboardEventHandler, RefObject, forwardRef, useRef } from "react"
import { useParams } from "next/navigation"
import { useOnClickOutside, useEventListener } from "usehooks-ts"
import { Plus, X } from "lucide-react"
import { toast } from "sonner"
import { createCard } from "@/actions/create-card"
import { useAction } from "@/hooks/use-action"
import { Button } from "@/components/ui/button"
import { FormSubmit } from "@/components/form/FormSubmit"
import { FormTextarea } from "@/components/form/FormTextarea"

type CardFormProps = {
 listId: string
 enableEditing: () => void
 disableEditing: () => void
 isEditing: boolean
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(({
 listId,
 enableEditing,
 disableEditing,
 isEditing
}, ref) => {
 const params = useParams()
 const formRef = useRef<HTMLFormElement | null>(null)

 const { execute, fieldErrors } = useAction(createCard, {
  onSuccess: (data) => {
   toast.success(`Card "${data.title}" created`)
   formRef.current?.reset()
  },
  onError: (error) => {
   toast.error(error)
  }
 })

 const onKeyDown = (e: KeyboardEvent) => {
  if (e.key === "Escape") {
   disableEditing()
  }
 }

 useEventListener("keydown", onKeyDown)
 useOnClickOutside(formRef as RefObject<HTMLElement>, disableEditing)

 const onTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
   e.preventDefault()
   formRef.current?.requestSubmit()
  }
 }

 const onSubmit = (formData: FormData) => {
  const title = formData.get("title") as string
  const listId = formData.get("listId") as string
  const boardId = params.boardId as string

  execute({
   title,
   listId,
   boardId
  })
 }

 if (isEditing) {
  return (
   <form
    ref={formRef}
    action={onSubmit}
    className="space-y-4 m-1 py-0.5 px-1"
   >
    <FormTextarea
     id="title"
     ref={ref}
     placeholder="Enter a title for this card..."
     onKeyDown={onTextareaKeyDown}
     errors={fieldErrors}
    />
    <input
     id="listId"
     name="listId"
     value={listId}
     hidden
    />
    <div className="flex items-center gap-x-1">
     <FormSubmit>Add card</FormSubmit>
     <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={disableEditing}
     >
      <X className="h-5 w-5" />
     </Button>
    </div>
   </form>
  )
 }

 return (
  <div className="pt-2 px-2">
   <Button
    variant="ghost"
    size="sm"
    onClick={enableEditing}
    className="justify-start h-auto px-2 py-1.5 w-full text-muted-foreground text-sm"
   >
    <Plus className="h-4 w-4 mr-2" />
    Add a card
   </Button>
  </div>
 )
})

CardForm.displayName = "CardForm"