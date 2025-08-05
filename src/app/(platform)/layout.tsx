import { ReactNode } from "react"
import { ClerkProvider } from "@clerk/nextjs"
import { Toaster } from "sonner"
import { ModalProvider } from "@/components/providers/ModalProvider"
import { QueryProvider } from "@/components/providers/QueryProvider"

export default function PlatformLayout({
 children
}: {
 children: ReactNode
}) {
 return (
  <ClerkProvider>
   <QueryProvider>
    <Toaster />
    <ModalProvider />
    {children}
   </QueryProvider>
  </ClerkProvider>
 )
}