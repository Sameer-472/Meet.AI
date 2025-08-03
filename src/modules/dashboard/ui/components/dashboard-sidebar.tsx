"use client"

import { BotIcon, Calendar, Home, Inbox, Search, Settings, StarIcon, VideoIcon } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import { usePathname } from "next/navigation"
import DashboardUserButton from "./dashboard-user-button"

// Menu items.

const firstSection = [
    {
        icon: VideoIcon,
        title: "Meetings",
        url: '/meetings'
    },
    {
        icon: BotIcon,
        title: "Agents",
        url: '/agents'
    },

]

const secondSection = [
    {
        icon: StarIcon,
        title: "Upgrade",
        url: '/upgrade'
    },
]


export function DashboardSideBar() {

    const pathName = usePathname();
    // console.log()
    return (
        <Sidebar>

            <SidebarHeader className="text-sidebar-accent-foreground">
                <Link href={"/"} className="flex items-center gap-2 px-2 pt-2">
                    <img src={"/assets/logo.svg"} alt="logo" className="h-[32px] w-[32px]" />
                    <p>Meet AI</p>
                </Link>
            </SidebarHeader>
            <Separator />
            <SidebarContent>
                <SidebarGroup>
                    {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {firstSection.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={pathName == item.url}>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <Separator />
                <SidebarGroup>
                    {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {secondSection.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={pathName == item.url}>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <DashboardUserButton />
                {/* <UserButton */}
            </SidebarFooter>
        </Sidebar>
    )
}