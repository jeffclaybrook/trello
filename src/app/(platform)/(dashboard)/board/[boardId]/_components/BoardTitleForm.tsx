"use client"

import { useRef, useState } from "react"
import { Board } from "@prisma/client"
import { toast } from "sonner"
import { updateBoard } from "@/actions/update-board"
import { useAction } from "@/hooks/use-action"
import { Button } from "@/components/ui/button"
import { FormInput } from "@/components/form/FormInput"

type BoardTitleFormProps = {
 data: Board
}

export function BoardTitleForm({ data }: BoardTitleFormProps) {
 const [title, setTitle] = useState(data.title)
 const [isEditing, setIsEditing] = useState<boolean>(false)
 const formRef = useRef<HTMLFormElement | null>(null)
 const inputRef = useRef<HTMLInputElement | null>(null)

 const disableEditing = () => {
  setIsEditing(false)
 }

 const enableEditing = () => {
  setIsEditing(true)
  setTimeout(() => {
   inputRef.current?.focus()
   inputRef.current?.select()
  })
 }

 const { execute } = useAction(updateBoard, {
  onSuccess: (data) => {
   toast.success(`Board "${data.title}" updated`)
   setTitle(data.title)
   disableEditing()
  },
  onError: (error) => {
   toast.error(error)
  }
 })

 const onSubmit = (formData: FormData) => {
  const title = formData.get("title") as string

  if (title === data.title) {
   return disableEditing()
  }

  execute({
   title,
   id: data.id
  })
 }

 const onBlur = () => {
  formRef.current?.requestSubmit()
 }

 if (isEditing) {
  return (
   <form
    action={onSubmit}
    ref={formRef}
    className="flex items-center gap-x-2"
   >
    <FormInput
     id="title"
     ref={inputRef}
     onBlur={onBlur}
     defaultValue={title}
     className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
    />
   </form>
  )
 }

 return (
  <Button
   variant="transparent"
   onClick={enableEditing}
   className="font-bold text-lg h-auto w-auto p-1 px-2"
  >
   {title}
  </Button>
 )
}