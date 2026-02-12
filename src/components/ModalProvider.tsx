"use client"

import { useEffect, useState } from "react"
import { CardModal } from "./modal/ModalCard"
import { ProModal } from "./ProModal"

export function ModalProvider() {
 const [isMounted, setIsMounted] = useState<boolean>(false)

 useEffect(() => {
  // eslint-disable-next-line react-hooks/set-state-in-effect
  setIsMounted(true)
 }, [])

 if (!isMounted) {
  return null
 }

 return (
  <>
   <CardModal />
   <ProModal />
  </>
 )
}