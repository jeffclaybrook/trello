import { ReactNode } from "react"

export default function ClerkLayout({
 children
}: {
 children: ReactNode
}) {
 return (
  <div className="flex items-center justify-center h-dvh">
   {children}
  </div>
 )
}