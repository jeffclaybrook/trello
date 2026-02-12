import { ReactNode } from "react"
import { auth } from "@clerk/nextjs/server"
import { startCase } from "lodash"
import { OrgControl } from "./_components/OrgControl"

export async function generateMetadata() {
 const { orgSlug } = await auth()

 return {
  title: startCase(orgSlug || "organization")
 }
}

export default function OrganizationIdLayout({
 children
}: {
 children: ReactNode
}) {
 return (
  <>
   <OrgControl />
   {children}
  </>
 )
}