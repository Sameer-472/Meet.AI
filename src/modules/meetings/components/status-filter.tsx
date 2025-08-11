import {
    CircleXIcon, CircleCheckIcon, ClockArrowUpIcon, VideoIcon, LoaderIcon,
    SearchIcon
} from "lucide-react";
import { MeetingStatus } from "../types";
import { useMeetingsFilters } from "../hooks/use-meeting-filters";
import CommandSelect from "@/components/command-select";


const options = [
    {
        id: MeetingStatus.Completed, value: MeetingStatus.Completed, label: "Upcoming", icon: ClockArrowUpIcon, children: (
            <div className="flex items-center gap-x-2">
                <CircleCheckIcon className="size-4 text-green-500" />
                {MeetingStatus.Completed}
            </div>
        )
    },
    {
        id: MeetingStatus.Processing, value: MeetingStatus.Processing, label: "Processing", icon: ClockArrowUpIcon, children: (
            <div className="flex items-center gap-x-2">
                <LoaderIcon />
                {MeetingStatus.Processing}
            </div>
        )
    },
    {
        id: MeetingStatus.Cancelled, value: MeetingStatus.Cancelled, label: "Cancelled", icon: ClockArrowUpIcon, children: (
            <div className="flex items-center gap-x-2">
                <CircleXIcon />
                {MeetingStatus.Cancelled}
            </div>
        )
    },
]

export const StatusFilter = () => {
    const [filters, setFilters] = useMeetingsFilters()
    

    return (
        <CommandSelect
            options={options}
            value={filters.status ?? ""}
            onSelect={(value) => setFilters({ status: value as MeetingStatus })}
            placeholder="Filter by status"
            className="w-[200px]"
        />
    )
}