import { auth } from "@clerk/nextjs/server"
import { prisma } from "./prisma"

const DAY_IN_MS = 86400000

export async function checkSubscription() {
 const { orgId } = await auth()

 if (!orgId) {
  return false
 }

 const orgSubscription = await prisma.orgSubscription.findUnique({
  where: {
   orgId
  },
  select: {
   stripeSubscriptionId: true,
   stripeCurrentPeriodEnd: true,
   stripeCustomerId: true,
   stripePriceId: true
  }
 })

 if (!orgSubscription) {
  return false
 }

 const periodEnd = orgSubscription.stripeCurrentPeriodEnd?.getTime()

 if (!orgSubscription.stripePriceId || !periodEnd) {
  return false
 }

 const isValid = periodEnd + DAY_IN_MS > Date.now()

 return !isValid
}