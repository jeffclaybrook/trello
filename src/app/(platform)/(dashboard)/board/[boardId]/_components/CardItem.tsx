"use client"

import { Draggable } from "@hello-pangea/dnd"
import { Card } from "@prisma/client"
import { useCardModal } from "@/hooks/use-card-modal"

type CardItemProps = {
 data: Card
 index: number
}

export function CardItem({
 data,
 index
}: CardItemProps) {
 const cardModal = useCardModal()

 return (
  <Draggable draggableId={data.id} index={index}>
   {(provided) => (
    <div
     role="button"
     ref={provided.innerRef}
     onClick={() => cardModal.onOpen(data.id)}
     className="truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-md"
     {...provided.draggableProps}
     {...provided.dragHandleProps}
    >
     {data.title}
    </div>
   )}
  </Draggable>
 )
}