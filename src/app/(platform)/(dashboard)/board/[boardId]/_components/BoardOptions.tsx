"use client"

import { MoreHorizontal, X } from "lucide-react"
import { toast } from "sonner"
import { deleteBoard } from "@/actions/delete-board"
import { useAction } from "@/hooks/use-action"
import { Button } from "@/components/ui/button"
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

type BoardOptionsProps = {
 id: string
}

export function BoardOptions({ id }: BoardOptionsProps) {
 const { execute, isLoading } = useAction(deleteBoard, {
  onError: (error) => {
   toast.error(error)
  }
 })

 const onDelete = () => {
  execute({ id })
 }

 return (
  <Popover>
   <PopoverTrigger asChild>
    <Button variant="transparent" className="h-auto w-auto p-2">
     <MoreHorizontal className="h-4 w-4" />
    </Button>
   </PopoverTrigger>
   <PopoverContent
    side="bottom"
    align="start"
    className="px-0 pt-3 pb-3"
   >
    <div className="text-sm font-medium text-center text-neutral-600 mb-4">Board actions</div>
    <PopoverClose asChild>
     <Button variant="ghost" className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600">
      <X className="h-4 w-4" />
     </Button>
    </PopoverClose>
    <Button
     variant="ghost"
     onClick={onDelete}
     disabled={isLoading}
     className="justify-start rounded-none w-full h-auto p-2 px-5 font-normal text-sm"
    >
     Delete this board
    </Button>
   </PopoverContent>
  </Popover>
 )
}