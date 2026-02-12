import { Board } from "@prisma/client"
import { BoardOptions } from "./BoardOptions"
import { BoardTitleForm } from "./BoardTitleForm"

type BoardNavbarProps = {
 data: Board
}

export async function BoardNavbar({ data }: BoardNavbarProps) {
 return (
  <div className="flex items-center gap-x-4 w-full h-14 z-[40] bg-black/50 fixed top-14 px-6 text-white">
   <BoardTitleForm data={data} />
   <div className="ml-auto">
    <BoardOptions id={data.id} />
   </div>
  </div>
 )
}