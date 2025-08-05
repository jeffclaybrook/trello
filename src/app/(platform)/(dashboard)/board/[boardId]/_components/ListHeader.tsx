"use client"

import { useRef, useState } from "react"
import { useEventListener } from "usehooks-ts"
import { List } from "@prisma/client"
import { toast } from "sonner"
import { updateList } from "@/actions/update-list"
import { useAction } from "@/hooks/use-action"
import { FormInput } from "@/components/form/FormInput"
import { ListOptions } from "./ListOptions"

type ListHeaderProps = {
 data: List
 onAddCard: () => void
}

export function ListHeader({
 data,
 onAddCard
}: ListHeaderProps) {
 const formRef = useRef<HTMLFormElement | null>(null)
 const inputRef = useRef<HTMLInputElement | null>(null)
 const [title, setTitle] = useState(data.title)
 const [isEditing, setIsEditing] = useState<boolean>(false)

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

 const { execute } = useAction(updateList, {
  onSuccess: (data) => {
   toast.success(`Renamed to "${data.title}"`)
   setTitle(data.title)
   disableEditing()
  },
  onError: (error) => {
   toast.error(error)
  }
 })

 const onSubmit = (formData: FormData) => {
  const title = formData.get("title") as string
  const id = formData.get("id") as string
  const boardId = formData.get("boardId") as string

  if (title === data.title) {
   return disableEditing()
  }

  execute({
   title,
   id,
   boardId
  })
 }

 const onBlur = () => {
  formRef.current?.requestSubmit()
 }

 const onKeyDown = (e: KeyboardEvent) => {
  if (e.key === "Escape") {
   formRef.current?.requestSubmit()
  }
 }

 useEventListener("keydown", onKeyDown)

 return (
  <div className="flex items-start justify-between gap-x-2 pt-2 px-2 text-sm font-semibold">
   {isEditing ? (
    <form
     action={onSubmit}
     ref={formRef}
     className="flex-1 px-[2px]"
    >
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
     <FormInput
      id="title"
      ref={inputRef}
      placeholder="Enter a list title"
      onBlur={onBlur}
      defaultValue={title}
      className="text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white"
     />
     <button type="submit" hidden />
    </form>
   ) : (
    <div onClick={enableEditing} className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent">{title}</div>
   )}
   <ListOptions data={data} onAddCard={onAddCard} />
  </div>
 )
}