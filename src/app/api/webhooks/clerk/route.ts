import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { Webhook } from "svix"
import { prisma } from "@/lib/prisma"

type ClerkWebhookEvent = {
 type: "user.created" | "user.deleted" | string
 data: {
  id: string
  primary_email_address_id?: string | null
  email_addresses?: Array<{
   id: string
   email_address: string
  }>
 }
}

export async function POST(req: Request) {
 const payload = await req.text()
 const headerList = await headers()
 const svix_id = headerList.get("svix-id")
 const svix_timestamp = headerList.get("svix-timestamp")
 const svix_signature = headerList.get("svix-signature")

 if (!svix_id || !svix_timestamp || !svix_signature) {
  return new NextResponse("Missing svix headers", { status: 400 })
 }

 const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!)

 let event: ClerkWebhookEvent

 try {
  event = wh.verify(payload, {
   "svix-id": svix_id,
   "svix-timestamp": svix_timestamp,
   "svix-signature": svix_signature
  }) as ClerkWebhookEvent
 } catch (error) {
  console.error(error)
  return new NextResponse("Invalid signature", { status: 400 })
 }

 if (event.type === "user.created") {
  const clerkUserId = event.data.id

  await prisma.user.upsert({
   where: { clerkUserId },
   update: {},
   create: { clerkUserId }
  })
 }

 if (event.type === "user.deleted") {
  const clerkUserId = event.data.id

  await prisma.user.deleteMany({
   where: { clerkUserId }
  })
 }

 return NextResponse.json({ ok: true })
}