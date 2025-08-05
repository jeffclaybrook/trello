"use client"

import { forwardRef } from "react"
import { useFormStatus } from "react-dom"
import { cn } from "@/lib/utils"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { FormErrors } from "./FormErrors"

type FormInputProps = {
 id: string
 label?: string
 type?: string
 placeholder?: string
 required?: boolean
 disabled?: boolean
 errors?: Record<string, string[] | undefined>
 className?: string
 onBlur?: () => void
 defaultValue?: string
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(({
 id,
 label,
 type,
 placeholder,
 required,
 disabled,
 errors,
 className,
 onBlur,
 defaultValue
}, ref) => {
 const { pending } = useFormStatus()

 return (
  <div className="space-y-2">
   <div className="space-y-1">
    {label ? (
     <Label htmlFor={id} className="text-xs font-semibold text-neutral-700">{label}</Label>
    ) : null}
    <Input
     ref={ref}
     type={type}
     id={id}
     name={id}
     placeholder={placeholder}
     disabled={pending || disabled}
     defaultValue={defaultValue}
     required={required}
     onBlur={onBlur}
     aria-describedby={`${id}-error`}
     className={cn(
      "text-sm px-2 py-1 h-7",
      className
     )}
    />
   </div>
   <FormErrors id={id} errors={errors} />
  </div>
 )
})

FormInput.displayName = "FormInput"