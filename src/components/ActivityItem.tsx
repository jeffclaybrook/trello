import { format } from "date-fns"
import { AuditLog } from "@prisma/client"
import { generateLogMessage } from "@/lib/generate-log-message"
import { Avatar, AvatarImage } from "./ui/avatar"

type ActivityItemProps = {
 data: AuditLog
}

export function ActivityItem({ data }: ActivityItemProps) {
 return (
  <li className="flex items-center gap-x-2">
   <Avatar className="size-8">
    <AvatarImage src={data.userImage} alt={data.userName} />
   </Avatar>
   <div className="flex flex-col space-y-0.5">
    <div className="flex items-center gap-1">
     <p className="text-sm text-muted-foreground font-semibold text-slate-700">{data.userName}</p>
     <p className="text-sm text-muted-foreground lowercase text-slate-700">{generateLogMessage(data)}</p>
    </div>
    <p className="text-xs text-muted-foreground">{format(new Date(data.createdAt), "MMM d, yyyy 'at' h:mm a")}</p>
   </div>
  </li>
 )
}