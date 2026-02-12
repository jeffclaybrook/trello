import { LogoIcon } from "./Icons"
import Link from "next/link"

export function LogoButton() {
 return (
  <Link href={"/"} className="cursor-pointer">
   <div className="hidden md:flex items-center gap-x-2 hover:opacity-75 transition">
    <LogoIcon className="size-7.5" />
    <p className="text-lg text-slate-700 pb-1">Trello</p>
   </div>
  </Link>
 )
}