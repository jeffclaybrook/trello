/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { ReactNode, useRef } from "react"
import { useRouter } from "next/navigation"
import { X } from "lucide-react"
import { toast } from "sonner"
import { createBoard } from "@/actions/create-board"
import { useAction } from "@/hooks/use-action"
import { useProModal } from "@/hooks/use-pro-modal"
import { Button } from "../ui/button"
import { Popover, PopoverContent, PopoverTrigger, PopoverClose } from "../ui/popover"
import { FormInput } from "./FormInput"
import { FormPicker } from "./FormPicker"
import { FormSubmit } from "./FormSubmit"

type FormPopoverProps = {
 children: ReactNode
 side?: "left" | "right" | "top" | "bottom"
 align?: "start" | "center" | "end"
 sideOffset?: number
}

export function FormPopover({
 children,
 side = "bottom",
 align,
 sideOffset = 0
}: FormPopoverProps) {
 const router = useRouter()
 const proModal = useProModal()
 const closeRef = useRef<HTMLButtonElement | null>(null)

 const { execute, fieldErrors } = useAction(createBoard, {
  onSuccess: (data: any) => {
   toast.success("Board created")
   closeRef.current?.click()
   router.push(`/board/${data.id}`)
  },
  onError: (error) => {
   toast.error(error)
   proModal.onOpen()
  }
 })

 const onSubmit = (formData: FormData) => {
  const title = formData.get("title") as string
  const image = formData.get("image") as string
  execute({ title, image })
 }

 return (
  <Popover>
   <PopoverTrigger asChild>{children}</PopoverTrigger>
   <PopoverContent
    side={side}
    sideOffset={sideOffset}
    align={align}
    className="w-80 pt-3"
   >
    <div className="text-sm font-medium text-center text-neutral-600 pb-4">Create board</div>
    <PopoverClose ref={closeRef} asChild>
     <Button variant="ghost" className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600">
      <X className="h-4 w-4" />
     </Button>
    </PopoverClose>
    <form action={onSubmit} className="space-y-4">
     <div className="space-y-4">
      <FormPicker id="image" errors={fieldErrors} />
      <FormInput
       type="text"
       id="title"
       label="Board title"
       errors={fieldErrors}
      />
     </div>
     <FormSubmit className="w-full">Create</FormSubmit>
    </form>
   </PopoverContent>
  </Popover>
 )
}