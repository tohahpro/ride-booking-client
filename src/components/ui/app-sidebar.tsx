import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Link, useLocation } from "react-router"
import { getSidebarItems } from "@/utils/getSidebarItems"
import { useUserInfoQuery } from "@/redux/features/auth/auth.api"
import { cn } from "@/lib/utils"




export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const { data: userData } = useUserInfoQuery(undefined)
  const location = useLocation()

  const isActive = (href: string) => {
    return location.pathname === href
  }

  const data = {
    navMain: getSidebarItems(userData?.data?.data?.role)
  }
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link to="/" className="text-primary font-semibold text-lg hover:text-primary/90">
          Ride<span className="text-foreground">Flow</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel className="font-bold text-sm">{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link className={cn(
                        "flex-row items-center gap-2 py-1.5 block w-full px-2",
                        isActive(item.url) ? "text-primary font-medium bg-blue-100 rounded-none" : "text-muted-foreground"
                      )} to={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
