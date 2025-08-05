/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import { DragDropContext, Droppable } from "@hello-pangea/dnd"
import { toast } from "sonner"
import { updateCardOrder } from "@/actions/update-card-order"
import { updateListOrder } from "@/actions/update-list-order"
import { useAction } from "@/hooks/use-action"
import { ListWithCards } from "@/types"
import { ListForm } from "./ListForm"
import { ListItem } from "./ListItem"

type ListContainerProps = {
 data: ListWithCards[]
 boardId: string
}

function reorder<T>(
 list: T[],
 startIndex: number,
 endIndex: number
) {
 const res = Array.from(list)
 const [removed] = res.splice(startIndex, 1)
 res.splice(endIndex, 0, removed)
 return res
}

export function ListContainer({
 data,
 boardId
}: ListContainerProps) {
 const [orderedData, setOrderedData] = useState(data)

 const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
  onSuccess: () => {
   toast.success("List reordered")
  },
  onError: (error) => {
   toast.error(error)
  }
 })

 const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
  onSuccess: () => {
   toast.success("Card reordered")
  },
  onError: (error) => {
   toast.error(error)
  }
 })

 useEffect(() => {
  setOrderedData(data)
 }, [data])

 const onDragEnd = (res: any) => {
  const { destination, source, type } = res

  if (!destination) {
   return
  }

  if (destination.droppableId === source.droppableId && destination.index === source.index) {
   return
  }

  if (type === "list") {
   const items = reorder(orderedData, source.index, destination.index).map((item, index) => ({ ...item, order: index }))
   setOrderedData(items)
   executeUpdateListOrder({ items, boardId })
  }

  if (type === "card") {
   const newOrderedData = [...orderedData]

   const sourceList = newOrderedData.find(list => list.id === source.droppableId)
   const destList = newOrderedData.find(list => list.id === destination.droppableId)

   if (!sourceList || !destList) {
    return
   }

   if (!sourceList.cards) {
    sourceList.cards = []
   }

   if (!destList.cards) {
    destList.cards = []
   }

   if (source.droppableId === destination.droppableId) {
    const reorderedCards = reorder(sourceList.cards, source.index, destination.index)
    reorderedCards.forEach((card, idx) => {
     card.order = idx
    })

    sourceList.cards = reorderedCards

    setOrderedData(newOrderedData)
    executeUpdateCardOrder({
     boardId: boardId,
     items: reorderedCards
    })
   } else {
    const [movedCard] = sourceList.cards.splice(source.index, 1)
    movedCard.listId = destination.droppableId
    destList.cards.splice(destination.index, 0, movedCard)
    sourceList.cards.forEach((card, idx) => {
     card.order = idx
    })
    destList.cards.forEach((card, idx) => {
     card.order = idx
    })
    setOrderedData(newOrderedData)
    executeUpdateCardOrder({
     boardId: boardId,
     items: destList.cards
    })
   }
  }
 }

 return (
  <DragDropContext onDragEnd={onDragEnd}>
   <Droppable
    droppableId="lists"
    type="list"
    direction="horizontal"
   >
    {(provided) => (
     <ol
      ref={provided.innerRef}
      className="flex gap-x-3 h-full"
      {...provided.droppableProps}
     >
      {orderedData.map((list, index) => (
       <ListItem
        key={list.id}
        index={index}
        data={list}
       />
      ))}
      {provided.placeholder}
      <ListForm />
      <div className="flex-shrink-0 w-1" />
     </ol>
    )}
   </Droppable>
  </DragDropContext>
 )
}