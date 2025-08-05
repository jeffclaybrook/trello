"use client"

import { useRef, useState } from "react"
import { Draggable, Droppable } from "@hello-pangea/dnd"
import { cn } from "@/lib/utils"
import { ListWithCards } from "@/types"
import { CardForm } from "./CardForm"
import { CardItem } from "./CardItem"
import { ListHeader } from "./ListHeader"

type ListItemProps = {
 data: ListWithCards
 index: number
}

export function ListItem({
 data,
 index
}: ListItemProps) {
 const textareaRef = useRef<HTMLTextAreaElement | null>(null)
 const [isEditing, setIsEditing] = useState<boolean>(false)

 const disableEditing = () => {
  setIsEditing(false)
 }

 const enableEditing = () => {
  setIsEditing(true)
  setTimeout(() => {
   textareaRef.current?.focus()
  })
 }

 return (
  <Draggable draggableId={data.id} index={index}>
   {(provided) => (
    <li
     ref={provided.innerRef}
     className="shrink-0 h-full w-[272px] select-none"
     {...provided.draggableProps}
    >
     <div className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2" {...provided.dragHandleProps}>
      <ListHeader data={data} onAddCard={enableEditing} />
      <Droppable droppableId={data.id} type="card">
       {(provided) => (
        <ol
         ref={provided.innerRef}
         className={cn(
          "flex flex-col gap-y-2 mx-1 px-1 py-0.5",
          data.cards.length > 0 ? "mt-2" : "mt-0"
         )}
         {...provided.droppableProps}
        >
         {data.cards.map((card, index) => (
          <CardItem
           key={card.id}
           index={index}
           data={card}
          />
         ))}
         {provided.placeholder}
        </ol>
       )}
      </Droppable>
      <CardForm
       listId={data.id}
       ref={textareaRef}
       isEditing={isEditing}
       enableEditing={enableEditing}
       disableEditing={disableEditing}
      />
     </div>
    </li>
   )}
  </Draggable>
 )
}