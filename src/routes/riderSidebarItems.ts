import RideHistoryDetails from "@/components/modules/Rider/RideHistoryDetails";
import History from "@/pages/Rider/History";
import type { ISidebarItem } from "@/types";
import { lazy } from "react";


const RiderRequest = lazy(()=> import('@/pages/Rider/riderRequest'))
export const riderSidebarItems: ISidebarItem[] = [
    {
      title: "Dashboard",      
      items: [
        {
          title: "Ride Request",
          url: "/rider/ride-request",
          component: RiderRequest,
        },
        {
          title: "History Details",
          url: "/rider/history",
          component: History,
        }, 
        
        
      ],
    }   
]

export const riderDynamicRoutes = [
  {
    url: "/rider/history/:id",
    component: RideHistoryDetails,
  },
];