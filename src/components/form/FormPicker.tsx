/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import { useFormStatus } from "react-dom"
import { Check, Loader2 } from "lucide-react"
import { defaultImages } from "@/constants/images"
import { unsplash } from "@/lib/unsplash"
import { cn } from "@/lib/utils"
import { FormErrors } from "./FormErrors"
import Image from "next/image"
import Link from "next/link"

type FormPickerProps = {
 id: string
 errors?: Record<string, string[] | undefined>
}

export function FormPicker({
 id,
 errors
}: FormPickerProps) {
 const { pending } = useFormStatus()
 const [images, setImages] = useState<Array<Record<string, any>>>(defaultImages)
 const [isLoading, setIsLoading] = useState<boolean>(true)
 const [selectedImageId, setSelectedImageId] = useState(null)

 useEffect(() => {
  const fetchImages = async () => {
   try {
    const res = await unsplash.photos.getRandom({
     collectionIds: ["317099"],
     count: 9
    })
    if (res && res.response) {
     const newImages = (res.response as Array<Record<string, any>>)
     setImages(newImages)
    } else {
     console.error("Failed to get images from Unsplash")
    }
   } catch (error) {
    console.error(error)
    setImages(defaultImages)
   } finally {
    setIsLoading(false)
   }
  }
  fetchImages()
 }, [])

 if (isLoading) {
  return (
   <div className="flex items-center justify-center p-6">
    <Loader2 className="h-6 w-6 text-sky-700 animate-spin" />
   </div>
  )
 }

 return (
  <div className="relative">
   <div className="grid grid-cols-3 gap-2 mb-2">
    {images.map((image) => (
     <div
      key={image.id}
      onClick={() => {
       if (pending) {
        return
       }
       setSelectedImageId(image.id)
      }}
      className={cn(
       "cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted",
       pending && "opacity-50 hover:opacity-50 cursor-auto"
      )}
     >
      <input
       type="radio"
       id={id}
       name={id}
       checked={selectedImageId === image.id}
       disabled={pending}
       value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
       className="hidden"
      />
      <Image
       src={image.urls.thumb}
       alt="Unsplash image"
       width={400}
       height={225}
       fill
       className="object-cover rounded-sm"
      />
      {selectedImageId === image.id && (
       <div className="flex items-center justify-center absolute inset-y-0 h-full w-full bg-black/30">
        <Check className="h-4 w-4 text-white" />
       </div>
      )}
      <Link
       href={image.links.html}
       target="_blank"
       className="opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/50"
      >
       {image.user.name}
      </Link>
     </div>
    ))}
   </div>
   <FormErrors id="image" errors={errors} />
  </div>
 )
}