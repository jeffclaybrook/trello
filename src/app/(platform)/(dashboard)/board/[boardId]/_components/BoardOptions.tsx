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
    <Button type="button" className="h-auto w-auto p-2 bg-transparent text-white hover:bg-white/20 cursor-pointer">
     <MoreHorizontal className="size-4" />
    </Button>
   </PopoverTrigger>
   <PopoverContent
    align="start"
    side="bottom"
    className="px-0 py-3"
   >
    <div className="text-sm font-medium text-center text-slate-600 mb-4">Board actions</div>
    <PopoverClose asChild>
     <Button type="button" variant="ghost" className="h-auto w-auto p-2 absolute top-2 right-2 text-slate-600 cursor-pointer">
      <X className="size-4" />
     </Button>
    </PopoverClose>
    <Button
     type="button"
     variant="ghost"
     onClick={onDelete}
     disabled={isLoading}
     className="justify-start rounded-none w-full h-auto p-2 px-5 font-normal text-sm cursor-pointer"
    >
     Delete this board
    </Button>
   </PopoverContent>
  </Popover>
 )
}