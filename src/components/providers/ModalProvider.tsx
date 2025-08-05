"use client"

import { useEffect, useState } from "react"
import { CardModal } from "../modals/card-modal"
import { ProModal } from "../modals/ProModal"

export function ModalProvider() {
 const [isMounted, setIsMounted] = useState<boolean>(false)

 useEffect(() => {
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