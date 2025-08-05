"use client"

import { ReactNode } from "react"
import { useFormStatus } from "react-dom"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"

type FormSubmitProps = {
 children: ReactNode
 disabled?: boolean
 className?: string
 variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "primary"
}

export function FormSubmit({
 children,
 disabled,
 className,
 variant = "primary"
}: FormSubmitProps) {
 const { pending } = useFormStatus()

 return (
  <Button
   type="submit"
   variant={variant}
   size="sm"
   disabled={pending || disabled}
   className={cn(className)}
  >
   {children}
  </Button>
 )
}