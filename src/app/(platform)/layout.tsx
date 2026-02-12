import { ReactNode } from "react"
import { ClerkProvider } from "@clerk/nextjs"
import { Toaster } from "sonner"
import { ModalProvider } from "@/components/ModalProvider"
import { QueryProvider } from "@/components/QueryProvider"

export default function PlatformLayout({
 children
}: {
 children: ReactNode
}) {
 return (
  <ClerkProvider
   appearance={{
    theme: "simple"
   }}
  >
   <QueryProvider>
    <Toaster richColors />
    <ModalProvider />
    {children}
   </QueryProvider>
  </ClerkProvider>
 )
}