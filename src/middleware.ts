import { NextResponse } from "next/server"
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

const isPublicRoute = createRouteMatcher([
 "/",
 "/api/webhook"
])

export default clerkMiddleware(async (auth, req) => {
 const { userId, orgId, redirectToSignIn } = await auth()
 const pathname = req.nextUrl.pathname

 if (userId && !orgId && pathname !== "/select-org") {
  const orgSelection = new URL("/select-org", req.url)
  return NextResponse.redirect(orgSelection)
 }

 if (userId && isPublicRoute(req)) {
  const destination = orgId ? `/organization/${orgId}` : "/select-org"
  return NextResponse.redirect(new URL(destination, req.url))
 }

 if (!userId && !isPublicRoute) {
  return redirectToSignIn({ returnBackUrl: req.url })
 }

 return NextResponse.next()
})

export const config = {
 matcher: [
  "/",
  "/((?!.+\\.[\\w]+$|_next).*)",
  "/(api|trpc)(.*)"
 ]
}