import { Suspense } from "react"
import { checkSubscription } from "@/lib/subscription"
import { Separator } from "@/components/ui/separator"
import { ActivityList } from "./_components/ActivityList"
import { Info } from "../_components/Info"

export default async function Activity() {
 const isPro = await checkSubscription()

 return (
  <div className="w-full">
   <Info isPro={isPro} />
   <Separator className="my-2" />
   <Suspense fallback={<ActivityList.Skeleton />}>
    <ActivityList />
   </Suspense>
  </div>
 )
}