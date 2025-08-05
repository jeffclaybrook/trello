"use client"

import { RefObject, useRef, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useEventListener, useOnClickOutside } from "usehooks-ts"
import { Plus, X } from "lucide-react"
import { toast } from "sonner"
import { createList } from "@/actions/create-list"
import { useAction } from "@/hooks/use-action"
import { Button } from "@/components/ui/button"
import { FormInput } from "@/components/form/FormInput"
import { FormSubmit } from "@/components/form/FormSubmit"
import { ListWrapper } from "./ListWrapper"

export function ListForm() {
 const router = useRouter()
 const params = useParams()
 const formRef = useRef<HTMLFormElement | null>(null)
 const inputRef = useRef<HTMLInputElement | null>(null)
 const [isEditing, setIsEditing] = useState<boolean>(false)

 const disableEditing = () => {
  setIsEditing(false)
 }

 const enableEditing = () => {
  setIsEditing(true)
  setTimeout(() => {
   inputRef.current?.focus()
  })
 }

 const { execute, fieldErrors } = useAction(createList, {
  onSuccess: (data) => {
   toast.success(`List "${data.title}" created`)
   disableEditing()
   router.refresh()
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

 const onSubmit = (formData: FormData) => {
  const title = formData.get("title") as string
  const boardId = formData.get("boardId") as string

  execute({
   title,
   boardId
  })
 }

 if (isEditing) {
  return (
   <ListWrapper>
    <form
     action={onSubmit}
     ref={formRef}
     className="w-full p-3 rounded-md bg-white space-y-4 shadow-md"
    >
     <FormInput
      id="title"
      ref={inputRef}
      errors={fieldErrors}
      placeholder="Enter a list title..."
      className="text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition"
     />
     <input
      name="boardId"
      value={params.boardId}
      hidden
     />
     <div className="flex items-center gap-x-1">
      <FormSubmit>Add list</FormSubmit>
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
   </ListWrapper>
  )
 }

 return (
  <ListWrapper>
   <button
    onClick={enableEditing}
    className="flex items-center font-medium text-sm w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3"
   >
    <Plus className="h-4 w-4 mr-2" />
    Add a list
   </button>
  </ListWrapper>
 )
}