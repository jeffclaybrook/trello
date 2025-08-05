import { Medal } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Marketing() {
 return (
  <div className="flex flex-col items-center justify-center">
   <div className="flex flex-col items-center justify-center">
    <div className="flex items-center mb-4 border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase">
     <Medal className="h-6 w-6 mr-2" />
     Number 1 task management
    </div>
    <h1 className="text-3xl text-center text-neutral-800 mb-6 md:text-6xl">Trello helps teams move</h1>
    <div className="text-3xl md:text-6xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 p-2 rounded-md pb-4 w-fit">work forward.</div>
   </div>
   <div className="text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto">Collaborate, manage projects, and reach new productivity peaks. From high rises to home offices, the way your team works is unique - accomplish it all with Trello.</div>
   <Button
    size="lg"
    className="mt-6"
    asChild
   >
    <Link href={"/sign-up"}>Get Trello for free</Link>
   </Button>
  </div>
 )
}