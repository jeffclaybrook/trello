import Image from "next/image"
import Link from "next/link"

export function Logo() {
 return (
  <Link href={"/"}>
   <div className="hidden md:flex items-center gap-x-2 hover:opacity-75 transition">
    <Image
     src="/logo.svg"
     alt="Trello logo"
     width={30}
     height={30}
    />
    <p className="text-lg text-neutral-700 pb-1">Trello</p>
   </div>
  </Link>
 )
}