"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MeetingGetMany } from "../types"
import GeneratedAvatar from "@/components/generalComponents/generatedAvatar/generated-avatar"
import { CircleCheckIcon, CircleXIcon, ClockArrowUpIcon, ClockFadingIcon, LoaderIcon, CornerDownRightIcon, CornerRightDownIcon, VideoIcon, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import humanizeDuration from "humanize-duration"
import { format } from "date-fns";
import { cn } from "@/lib/utils"

// This type is used to define the shape of our data.
// You can use a Zod sch ema here if you want.
export type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
}

// type Meeting = MeetingGetMany[number]
function formatDuration(seconds: number) {
    return humanizeDuration(seconds * 1000, { largest: 1, round: true, units: ['s', 'm', 'h'] });
}

const statusIconsMap = {
    upcoming: ClockArrowUpIcon,
    active: LoaderIcon,
    completed: CircleCheckIcon,
    processing: LoaderIcon,
    cancelled: CircleXIcon,
}

const statusColorsMap = {
    upcoming: "text-yellow-500",
    active: "text-blue-500",
    completed: "text-green-500",
    processing: "text-orange-500",
    cancelled: "text-red-500",
}

export const columns: ColumnDef<MeetingGetMany[number]>[] = [
    {
        accessorKey: "name",
        header: "Meeting Name",
        cell: ({ row }) => {
            return (
                <div className="flex flex-col gap-y-1">
                    <span className="font-semibold capitalize">{row.original.name}</span>
                    <div className="flex items-center gap-x-2">
                        <div className="flex items-center gap-x-1">
                            <CornerDownRightIcon className="size-3 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground max-w-[200px] truncate captialize">
                                {row.original.agents.name}
                            </span>
                        </div>
                        <GeneratedAvatar
                            seed={row.original.agents.name}
                            variant="botttsNeutral" className="size-4" />
                        <span className="text-sm text-muted-foreground">
                            {row.original.startedAt ? format(row.original.startedAt, "MMM dd, yyyy") : ""}
                        </span>
                    </div>
                </div>
            )
        }
    },
    {
        accessorKey: "status",
        header: "Meeting Status",
        cell: ({ row }) => {
            const Icon = statusIconsMap[row.original.status] || ClockFadingIcon;
            (
                <Badge
                    variant="outline"
                    className={`flex items-center gap-x-1 ${statusColorsMap[row.original.status] || "text-gray-500"}`}
                >
                    <Icon className={cn(row.original.status === "processing" && "animate-spin")} />
                    <span className="capitalize">{row.original.status}</span>
                </Badge>
            )
        }
    },
    {
        accessorKey: "duration",
        header: "Meeting Status",
        cell: ({ row }) => {
            const Icon = statusIconsMap[row.original.status] || ClockFadingIcon;
            (
                <Badge
                    variant="outline"
                    className={`flex items-center gap-x-1 ${statusColorsMap[row.original.status] || "text-gray-500"}`}
                >
                    <Icon className={cn(row.original.status === "processing" && "animate-spin")} />
                    <span className="capitalize">{row.original.status}</span>
                </Badge>
            )
        }
    }
]