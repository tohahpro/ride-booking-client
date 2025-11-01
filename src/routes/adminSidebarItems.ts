import AllRides from "@/pages/Admin/AllRides";
import ProfilePage from "@/pages/ProfilePage";
import type { ISidebarItem } from "@/types";
import { lazy } from "react";


const AllUsers = lazy(()=> import('@/pages/Admin/AllUsers'))
export const adminSidebarItems: ISidebarItem[] = [
    {
      title: "Dashboard",      
      items: [
        {
          title: "All Users",
          url: "/admin/all-users",
          component: AllUsers,
        },
        {
          title: "All Rides",
          url: "/admin/all-rides",
          component: AllRides,
        },
        {
          title: "Profile",
          url: "/admin/profile",
          component: ProfilePage,
        },
      ],
    },    
]