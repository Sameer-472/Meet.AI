import CommandSelect from "@/components/command-select"
import GeneratedAvatar from "@/components/generalComponents/generatedAvatar/generated-avatar"
import { useTRPC } from "@/trpc/client"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useMeetingsFilters } from "../hooks/use-meeting-filters"


export const AgentIdFilter = () => {
    const [filters, setFilters] = useMeetingsFilters();
    const trpc = useTRPC();

    const [agentSearch, setAgentSearch] = useState("");
    const { data } = useQuery(trpc.agents.getMany.queryOptions({
        search: agentSearch,
        page: 1,
        pageSize: 10
    }));
    return (
        <>
            <CommandSelect placeholder="Agent" className="h-9" options={(data?.items ?? []).map((agents) => ({
                id: agents.id,
                value: agents.id,
                label: agents.name,
                children: (
                    <div className="flex items-center gap-x-2">
                        <GeneratedAvatar variant="botttsNeutral" seed={agents.name} className="size-6" />
                        <span className="ml-2">{agents.name}</span>
                    </div>
                )
            }))}
                onSelect={(value) => setFilters({ agentId: value })}
                value={filters.agentId ?? ""}
            />
        </>
    )
}